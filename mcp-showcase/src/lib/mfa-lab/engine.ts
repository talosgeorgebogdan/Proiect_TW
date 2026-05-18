import type {
  AccessAlert,
  AccessEvaluation,
  AccessScenario,
  MfaMethod,
  MfaMethodId,
  Severity,
} from './types';

const methodWeights: Record<MfaMethodId, number> = {
  password: 12,
  totp: 18,
  'email-otp': 12,
  'sms-otp': 10,
  push: 16,
  webauthn: 26,
  biometric: 20,
};

const severityOrder: Record<Severity, number> = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
};

function sortAlerts(alerts: AccessAlert[]) {
  return [...alerts].sort(
    (left, right) => severityOrder[right.severity] - severityOrder[left.severity]
  );
}

export function evaluateAccessAttempt(
  scenario: AccessScenario,
  completedMethods: MfaMethodId[]
): AccessEvaluation {
  const uniqueMethods = Array.from(new Set(completedMethods));
  const missingMethods = scenario.requiredMethods.filter(
    (methodId) => !uniqueMethods.includes(methodId)
  );

  const baseScore = uniqueMethods.reduce(
    (score, methodId) => score + methodWeights[methodId],
    0
  );

  const policyScore = Math.min(
    100,
    baseScore + (scenario.riskLevel === 'critical' ? 10 : scenario.riskLevel === 'high' ? 6 : 0)
  );

  const alerts: AccessAlert[] = scenario.alertReasons.map((reason, index) => ({
    id: `${scenario.slug}-${index}`,
    severity:
      scenario.riskLevel === 'critical'
        ? 'critical'
        : scenario.riskLevel === 'high'
        ? 'high'
        : 'medium',
    title: reason,
    detail:
      missingMethods.length === 0
        ? 'The access attempt was challenged correctly, but the event should still be reviewed.'
        : 'Additional verification is still missing, so the attempt remains flagged.',
  }));

  if (missingMethods.length > 0) {
    alerts.unshift({
      id: `${scenario.slug}-missing-methods`,
      severity: scenario.riskLevel === 'critical' ? 'critical' : 'high',
      title: 'Required factor set not completed',
      detail: `Missing methods: ${missingMethods.join(', ')}.`,
    });
  }

  return {
    policyScore,
    unlocked: missingMethods.length === 0,
    completedMethods: uniqueMethods,
    missingMethods,
    alerts: sortAlerts(alerts),
    summary:
      missingMethods.length === 0
        ? 'The policy requirements are satisfied for this scenario.'
        : 'The policy is not yet satisfied, so access should remain blocked or challenged.',
  };
}

export function getGeneratedCode(
  method: MfaMethod,
  now: Date = new Date()
): string | null {
  const seed =
    `${method.id}-${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()}-${now.getUTCHours()}-${Math.floor(now.getUTCMinutes() / 1)}-${Math.floor(now.getUTCSeconds() / 30)}`;

  if (!method.generatedCredential) {
    return null;
  }

  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) % 1000000;
  }

  return hash.toString().padStart(6, '0');
}
