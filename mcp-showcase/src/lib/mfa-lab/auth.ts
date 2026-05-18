import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import type {
  AuthenticatedSession,
  DemoUser,
  PendingChallengeCookie,
  RealSecondFactorId,
} from './auth-types';
import {
  createSessionId,
  createSignedToken,
  maskEmailAddress,
  maskPhoneNumber,
  readSignedToken,
} from './auth-utils';

const SESSION_COOKIE = 'mfa_session';
const CHALLENGE_COOKIE = 'mfa_pending_challenge';

const demoUser: DemoUser = {
  id: 'student-demo-user',
  fullName: 'Andrei Popescu',
  email: 'student@mcp-hub.local',
  passwordSalt: 'mfa-lab-demo-salt',
  passwordHash:
    '7ab69c330f9143d9854e9fd7f016058db2d40ec0533f1f140dcd2259417e6b2bd24cea2a2f65e97d3399f05adad242f3857e9185e8ad41bf3cf23c6d822c8aba',
  totpSecret: 'JBSWY3DPEHPK3PXP',
  recoveryEmail: 'alerts@campus-mfa.local',
  phoneNumber: '+40 722 123 456',
  availableFactors: ['totp', 'email-otp', 'sms-otp', 'push'],
};

function baseCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };
}

export function getDemoUser() {
  return demoUser;
}

export function describeFactor(factor: RealSecondFactorId) {
  switch (factor) {
    case 'totp':
      return 'Authenticator TOTP';
    case 'email-otp':
      return 'Email OTP';
    case 'sms-otp':
      return 'SMS OTP';
    case 'push':
      return 'Push approval';
  }
}

export function getMaskedRecoveryContacts() {
  return {
    email: maskEmailAddress(demoUser.recoveryEmail),
    phone: maskPhoneNumber(demoUser.phoneNumber),
  };
}

export async function createPendingChallenge(challenge: PendingChallengeCookie) {
  const store = await cookies();
  store.set(CHALLENGE_COOKIE, createSignedToken(challenge), {
    ...baseCookieOptions(),
    maxAge: 60 * 10,
  });
}

export async function readPendingChallenge() {
  const store = await cookies();
  const raw = store.get(CHALLENGE_COOKIE)?.value;
  const challenge = readSignedToken<PendingChallengeCookie>(raw);

  if (!challenge || challenge.expiresAt <= Date.now()) {
    return null;
  }

  return challenge;
}

export async function clearPendingChallenge() {
  const store = await cookies();
  store.delete(CHALLENGE_COOKIE);
}

export async function createAuthenticatedSession({
  userId,
  email,
  completedFactors,
}: Omit<AuthenticatedSession, 'sessionId' | 'createdAt'>) {
  const session: AuthenticatedSession = {
    sessionId: createSessionId(),
    userId,
    email,
    completedFactors,
    createdAt: Date.now(),
  };

  const store = await cookies();
  store.set(SESSION_COOKIE, createSignedToken(session), {
    ...baseCookieOptions(),
    maxAge: 60 * 60 * 8,
  });

  return session;
}

export async function readAuthenticatedSession() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  return readSignedToken<AuthenticatedSession>(raw);
}

export async function clearAuthenticatedSession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function requireAuthenticatedSession() {
  const session = await readAuthenticatedSession();

  if (!session) {
    redirect('/login');
  }

  return session;
}
