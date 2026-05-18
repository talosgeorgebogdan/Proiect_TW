import type {
  AuditResult,
  LabPosture,
  SecurityFinding,
  SecurityScenario,
  Severity,
} from './types';

const severityWeights: Record<Severity, number> = {
  critical: 35,
  high: 22,
  medium: 12,
  low: 6,
};

function compareSeverity(left: Severity, right: Severity) {
  return severityWeights[right] - severityWeights[left];
}

function buildFinding(
  scenario: SecurityScenario,
  overrides: Omit<SecurityFinding, 'evidence'>
): SecurityFinding {
  return {
    ...overrides,
    evidence: scenario.summary,
  };
}

function evaluatePosture(scenario: SecurityScenario, posture: LabPosture): SecurityFinding[] {
  const findings: SecurityFinding[] = [];

  if (posture.filesystemScope === 'unrestricted') {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-001',
        title: 'Filesystem access exceeds the immediate task scope',
        severity: 'high',
        theme: 'Least privilege',
        detail:
          'The assistant can traverse beyond the current project boundary, increasing the chance of accidental data exposure.',
        mitigation:
          'Restrict file access to task-specific paths and denylist secret-bearing files such as `.env` and deployment configs.',
      })
    );
  }

  if (posture.browserScope === 'broad') {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-002',
        title: 'Browser tooling is not scoped to the audited workspace',
        severity: 'medium',
        theme: 'Attack surface',
        detail:
          'Broad browser automation increases the blast radius if the assistant is prompted toward unrelated or sensitive pages.',
        mitigation:
          'Limit browser tooling to project-owned origins and require explicit escalation for broader navigation.',
      })
    );
  }

  if (!posture.deploysRequireConfirmation) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-003',
        title: 'High-impact actions can run without human confirmation',
        severity: 'high',
        theme: 'Human-in-the-loop',
        detail:
          'Deployment or release-adjacent actions are reachable without a separate approval checkpoint.',
        mitigation:
          'Add a confirmation gate for deployments, remote writes, and other irreversible actions.',
      })
    );
  }

  if (posture.promptContainsSecrets) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-004',
        title: 'Secret-like values are present in model context',
        severity: 'critical',
        theme: 'Secret protection',
        detail:
          'Token-like values reaching the prompt create immediate exposure risk through outputs, logs, and downstream summaries.',
        mitigation:
          'Run prompt-time secret scanning and redact sensitive values before they enter the model context.',
      })
    );
  }

  if (posture.promptContainsPrivateNotes) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-005',
        title: 'Private notes are mixed into operational context',
        severity: 'high',
        theme: 'Data minimization',
        detail:
          'Internal review notes and task instructions are bundled together, making over-sharing more likely.',
        mitigation:
          'Separate operational prompts from internal notes and pass only the minimum context required for the task.',
      })
    );
  }

  if (!posture.usesSecretDenylist) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-006',
        title: 'No denylist protects obvious secret-bearing files',
        severity: 'medium',
        theme: 'Secret protection',
        detail:
          'The environment lacks explicit exclusions for files that commonly contain keys, tokens, or credentials.',
        mitigation:
          'Block `.env`, credential files, and deployment secrets by default, then allow access only when truly necessary.',
      })
    );
  }

  if (posture.commandExecution === 'raw-user-input') {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-007',
        title: 'Raw user input reaches command execution',
        severity: 'critical',
        theme: 'Secure tool invocation',
        detail:
          'Natural-language input is being treated like shell-ready syntax, which creates a direct injection path.',
        mitigation:
          'Replace raw command strings with structured tool arguments and validate every field before execution.',
      })
    );
  }

  if (!posture.usesCommandAllowlist) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-008',
        title: 'Sensitive commands are not allowlisted',
        severity: 'high',
        theme: 'Secure tool invocation',
        detail:
          'The system accepts a broader command set than the task requires, making misuse easier.',
        mitigation:
          'Define a narrow allowlist for command families and reject anything outside the approved set.',
      })
    );
  }

  if (!posture.usesStructuredArguments) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-009',
        title: 'Tool calls do not enforce structured arguments',
        severity: 'high',
        theme: 'Input validation',
        detail:
          'Without schema-backed arguments, validation happens too late and attacker-controlled strings keep their ambiguity.',
        mitigation:
          'Model sensitive tool invocations as typed, bounded arguments instead of free-form text.',
      })
    );
  }

  if (!posture.destructiveActionsRequireApproval) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-010',
        title: 'Destructive actions are missing an approval barrier',
        severity: 'critical',
        theme: 'Human-in-the-loop',
        detail:
          'Deletion, overwrite, or high-impact write paths can proceed without a separate reviewer checkpoint.',
        mitigation:
          'Require explicit approval before destructive commands, file mutations, or remote side effects are executed.',
      })
    );
  }

  if (posture.auditCoverage === 'none') {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-011',
        title: 'Security-relevant actions are not audit logged',
        severity: 'high',
        theme: 'Traceability',
        detail:
          'Blocked, approved, and retried actions cannot be reconstructed after the fact.',
        mitigation:
          'Record actor, timestamp, tool, result, and approval state for every sensitive action.',
      })
    );
  } else if (posture.auditCoverage === 'partial') {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-012',
        title: 'Audit coverage is incomplete',
        severity: 'medium',
        theme: 'Traceability',
        detail:
          'Some sensitive paths are visible, but the timeline is too partial for confident incident review.',
        mitigation:
          'Expand audit coverage to include denials, retries, approvals, and context-redaction decisions.',
      })
    );
  }

  if (!posture.logsSensitiveActions) {
    findings.push(
      buildFinding(scenario, {
        id: 'LAB-013',
        title: 'Sensitive events do not receive dedicated logging',
        severity: 'medium',
        theme: 'Incident visibility',
        detail:
          'Even when actions are blocked, the team lacks enough detail to detect patterns or explain risk to reviewers.',
        mitigation:
          'Elevate privileged and suspicious actions into a reviewable security timeline with severity labels.',
      })
    );
  }

  return findings.sort((left, right) => compareSeverity(left.severity, right.severity));
}

export function runSecurityAudit(scenario: SecurityScenario): AuditResult {
  const findings = evaluatePosture(scenario, scenario.posture);
  const findingCounts: AuditResult['findingCounts'] = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const finding of findings) {
    findingCounts[finding.severity] += 1;
  }

  const riskScore = Math.min(
    100,
    findings.reduce((score, finding) => score + severityWeights[finding.severity], 0)
  );

  return {
    riskScore,
    findingCounts,
    findings,
  };
}
