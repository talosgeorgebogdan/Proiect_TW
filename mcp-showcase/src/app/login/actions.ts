'use server';

import { randomUUID } from 'node:crypto';

import { redirect } from 'next/navigation';

import {
  clearAuthenticatedSession,
  clearPendingChallenge,
  createAuthenticatedSession,
  createPendingChallenge,
  describeFactor,
  getDemoUser,
  getMaskedRecoveryContacts,
  readPendingChallenge,
} from '@/lib/mfa-lab/auth';
import type {
  AuditEvent,
  DeliveryPreview,
  LoginFormState,
  PendingChallengeCookie,
  RealSecondFactorId,
  VerifyFormState,
} from '@/lib/mfa-lab/auth-types';
import { listAuditEventsForUser, pushAuditEvent, pushDeliveryPreview } from '@/lib/mfa-lab/auth-store';
import {
  buildOtpAuthUri,
  createAttemptId,
  createNumericOtp,
  hashOtpCode,
  normalizeOtpCode,
  verifyPassword,
  verifyTotpCode,
} from '@/lib/mfa-lab/auth-utils';

const initialVerifyState: VerifyFormState = {
  error: null,
  info: null,
};

function createEvent(partial: Omit<AuditEvent, 'id' | 'createdAt'>): AuditEvent {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

function createDeliveryPreview(partial: Omit<DeliveryPreview, 'id' | 'createdAt'>): DeliveryPreview {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    ...partial,
  };
}

function updateAttempts(challenge: PendingChallengeCookie) {
  return {
    ...challenge,
    attemptsRemaining: Math.max(challenge.attemptsRemaining - 1, 0),
  };
}

async function persistChallenge(challenge: PendingChallengeCookie) {
  if (challenge.attemptsRemaining <= 0 || challenge.expiresAt <= Date.now()) {
    await clearPendingChallenge();
    return null;
  }

  await createPendingChallenge(challenge);
  return challenge;
}

async function logInvalidSecondFactor(challenge: PendingChallengeCookie, detail: string) {
  const updatedChallenge = updateAttempts(challenge);
  await persistChallenge(updatedChallenge);

  pushAuditEvent(
    createEvent({
      userId: updatedChallenge.userId,
      attemptId: updatedChallenge.attemptId,
      severity: 'high',
      title: 'Second factor rejected',
      detail,
    })
  );

  return updatedChallenge;
}

export async function beginPasswordSignIn(
  _previousState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  const email = String(formData.get('email') ?? '').trim().toLowerCase();
  const password = String(formData.get('password') ?? '');
  const user = getDemoUser();

  if (email !== user.email || !verifyPassword(user, password)) {
    pushAuditEvent(
      createEvent({
        userId: user.id,
        severity: 'high',
        title: 'Invalid primary credentials',
        detail: `A password sign-in failed for ${email || 'an empty email field'}.`,
      })
    );

    return {
      error: 'The email or password was not accepted.',
      email,
    };
  }

  const challenge: PendingChallengeCookie = {
    attemptId: createAttemptId(),
    userId: user.id,
    email: user.email,
    selectedFactor: 'totp',
    availableFactors: user.availableFactors,
    completedFactors: ['password'],
    issuedAt: Date.now(),
    expiresAt: Date.now() + 10 * 60 * 1000,
    attemptsRemaining: 5,
  };

  await clearAuthenticatedSession();
  await createPendingChallenge(challenge);

  pushAuditEvent(
    createEvent({
      userId: user.id,
      attemptId: challenge.attemptId,
      severity: 'low',
      title: 'Password accepted',
      detail: 'Primary credentials were validated and MFA step-up is now required.',
    })
  );

  redirect('/login/verify');
}

export async function chooseSecondFactor(
  _previousState: VerifyFormState,
  formData: FormData
): Promise<VerifyFormState> {
  const factor = String(formData.get('factor') ?? '') as RealSecondFactorId;
  const challenge = await readPendingChallenge();
  const user = getDemoUser();

  if (!challenge) {
    redirect('/login');
  }

  if (!challenge.availableFactors.includes(factor)) {
    return {
      ...initialVerifyState,
      error: 'That MFA method is not enabled for this demo account.',
    };
  }

  const nextChallenge: PendingChallengeCookie = {
    ...challenge,
    selectedFactor: factor,
    pushApprovedAt: factor === 'push' ? undefined : challenge.pushApprovedAt,
  };

  if (factor === 'email-otp' || factor === 'sms-otp') {
    const otp = createNumericOtp();
    const maskedContacts = getMaskedRecoveryContacts();

    if (factor === 'email-otp') {
      nextChallenge.emailCodeHash = hashOtpCode(otp);
    } else {
      nextChallenge.smsCodeHash = hashOtpCode(otp);
    }

    pushDeliveryPreview(
      createDeliveryPreview({
        attemptId: challenge.attemptId,
        channel: factor,
        destination: factor === 'email-otp' ? maskedContacts.email : maskedContacts.phone,
        code: otp,
        summary:
          factor === 'email-otp'
            ? 'A one-time code was delivered through the demo email outbox.'
            : 'A one-time code was delivered through the demo SMS outbox.',
      })
    );
  }

  await createPendingChallenge(nextChallenge);

  pushAuditEvent(
    createEvent({
      userId: user.id,
      attemptId: challenge.attemptId,
      severity: factor === 'push' ? 'medium' : 'low',
      title: 'Second factor selected',
      detail: `${describeFactor(factor)} is now the active challenge.`,
    })
  );

  return {
    error: null,
    info:
      factor === 'totp'
        ? 'Use the authenticator app entry or the manual secret shown on the page.'
        : factor === 'push'
        ? 'Approve the request in the trusted-device simulator before finishing sign-in.'
        : `A fresh ${describeFactor(factor).toLowerCase()} was issued for this attempt.`,
  };
}

export async function approvePushChallenge(): Promise<void> {
  const challenge = await readPendingChallenge();

  if (!challenge) {
    redirect('/login');
  }

  const updatedChallenge: PendingChallengeCookie = {
    ...challenge,
    pushApprovedAt: Date.now(),
  };

  await createPendingChallenge(updatedChallenge);

  pushAuditEvent(
    createEvent({
      userId: challenge.userId,
      attemptId: challenge.attemptId,
      severity: 'low',
      title: 'Push request approved',
      detail: 'The trusted-device simulator approved the sign-in request.',
    })
  );
}

export async function verifySecondFactor(
  _previousState: VerifyFormState,
  formData: FormData
): Promise<VerifyFormState> {
  const challenge = await readPendingChallenge();

  if (!challenge) {
    redirect('/login');
  }

  const code = normalizeOtpCode(String(formData.get('code') ?? ''));
  let factorAccepted = false;

  if (challenge.selectedFactor === 'totp') {
    factorAccepted = verifyTotpCode(getDemoUser().totpSecret, code);
  }

  if (challenge.selectedFactor === 'email-otp') {
    factorAccepted = hashOtpCode(code) === challenge.emailCodeHash;
  }

  if (challenge.selectedFactor === 'sms-otp') {
    factorAccepted = hashOtpCode(code) === challenge.smsCodeHash;
  }

  if (challenge.selectedFactor === 'push') {
    factorAccepted = Boolean(challenge.pushApprovedAt);
  }

  if (!factorAccepted) {
    const updatedChallenge = await logInvalidSecondFactor(
      challenge,
      `${describeFactor(challenge.selectedFactor)} did not validate for the pending sign-in.`
    );

    return {
      error:
        updatedChallenge?.attemptsRemaining === 0
          ? 'Too many invalid attempts. Start again from the login page.'
          : 'The second factor could not be validated yet.',
      info: null,
    };
  }

  await createAuthenticatedSession({
    userId: challenge.userId,
    email: challenge.email,
    completedFactors: [...challenge.completedFactors, challenge.selectedFactor],
  });
  await clearPendingChallenge();

  pushAuditEvent(
    createEvent({
      userId: challenge.userId,
      attemptId: challenge.attemptId,
      severity: 'low',
      title: 'Full MFA sign-in completed',
      detail: `Access was granted after password + ${describeFactor(challenge.selectedFactor)}.`,
    })
  );

  redirect('/secure-portal');
}

export async function signOut(): Promise<void> {
  const user = getDemoUser();

  pushAuditEvent(
    createEvent({
      userId: user.id,
      severity: 'low',
      title: 'Session ended',
      detail: 'The MFA session was closed from the protected portal.',
    })
  );

  await clearAuthenticatedSession();
  await clearPendingChallenge();
  redirect('/login');
}

export async function getPortalSummary() {
  const user = getDemoUser();
  return {
    totpSetupUri: buildOtpAuthUri(user),
    recentEvents: listAuditEventsForUser(user.id),
  };
}
