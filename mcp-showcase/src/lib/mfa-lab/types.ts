export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type MfaMethodId =
  | 'password'
  | 'totp'
  | 'email-otp'
  | 'sms-otp'
  | 'push'
  | 'webauthn'
  | 'biometric';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type MfaMethod = {
  id: MfaMethodId;
  name: string;
  category: 'Knowledge' | 'Possession' | 'Inherence';
  shortDescription: string;
  securityValue: string;
  limitations: string;
  generatedCredential?: 'totp' | 'email' | 'sms';
};

export type AccessScenario = {
  slug: string;
  title: string;
  audience: string;
  description: string;
  riskLevel: RiskLevel;
  triggers: string[];
  requiredMethods: MfaMethodId[];
  recommendedMethods: MfaMethodId[];
  alertReasons: string[];
};

export type AccessAlert = {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
};

export type AccessEvaluation = {
  policyScore: number;
  unlocked: boolean;
  completedMethods: MfaMethodId[];
  missingMethods: MfaMethodId[];
  alerts: AccessAlert[];
  summary: string;
};
