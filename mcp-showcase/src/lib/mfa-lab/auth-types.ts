import type { MfaMethodId, Severity } from './types';

export type RealSecondFactorId = Extract<MfaMethodId, 'totp' | 'email-otp' | 'sms-otp' | 'push'>;

export type LoginFormState = {
  error: string | null;
  email: string;
};

export type VerifyFormState = {
  error: string | null;
  info: string | null;
};

export type PendingChallengeCookie = {
  attemptId: string;
  userId: string;
  email: string;
  selectedFactor: RealSecondFactorId;
  availableFactors: RealSecondFactorId[];
  completedFactors: MfaMethodId[];
  issuedAt: number;
  expiresAt: number;
  attemptsRemaining: number;
  emailCodeHash?: string;
  smsCodeHash?: string;
  pushApprovedAt?: number;
};

export type AuthenticatedSession = {
  sessionId: string;
  userId: string;
  email: string;
  completedFactors: MfaMethodId[];
  createdAt: number;
};

export type AuditEvent = {
  id: string;
  userId: string;
  attemptId?: string;
  createdAt: string;
  severity: Severity;
  title: string;
  detail: string;
};

export type DeliveryPreview = {
  id: string;
  attemptId: string;
  channel: Extract<RealSecondFactorId, 'email-otp' | 'sms-otp'>;
  destination: string;
  code: string;
  createdAt: string;
  summary: string;
};

export type DemoUser = {
  id: string;
  fullName: string;
  email: string;
  passwordSalt: string;
  passwordHash: string;
  totpSecret: string;
  recoveryEmail: string;
  phoneNumber: string;
  availableFactors: RealSecondFactorId[];
};
