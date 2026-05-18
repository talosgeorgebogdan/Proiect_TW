import type {
  AuditResult,
  LabPosture,
  SecurityControlDefinition,
  SecurityControlId,
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

export const securityLabControls: SecurityControlDefinition[] = [
  {
    id: 'scope_project_files',
    label: 'Restrict filesystem scope',
    shortLabel: 'Project-only files',
    category: 'Access',
    description:
      'Shrink file access to the active project boundary and make secret exclusions explicit.',
    impact: 'Reduces accidental data exposure and limits secret discovery paths.',
  },
  {
    id: 'scope_project_browser',
    label: 'Restrict browser scope',
    shortLabel: 'Project-only browser',
    category: 'Access',
    description:
      'Keep browser automation focused on project-owned pages instead of broader browsing surfaces.',
    impact: 'Cuts down unrelated navigation risk and narrows the reachable attack surface.',
  },
  {
    id: 'context_secret_redaction',
    label: 'Redact secrets before prompt assembly',
    shortLabel: 'Secret redaction',
    category: 'Context',
    description:
      'Scrub token-like values before they can enter model context or downstream summaries.',
    impact: 'Protects credentials and reduces leakage across prompts, logs, and outputs.',
  },
  {
    id: 'private_note_isolation',
    label: 'Separate internal notes from execution context',
    shortLabel: 'Note isolation',
    category: 'Context',
    description:
      'Keep private planning notes out of the operational prompt sent to the model.',
    impact: 'Improves data minimization and prevents over-sharing of reviewer material.',
  },
  {
    id: 'structured_command_arguments',
    label: 'Use structured execution arguments',
    shortLabel: 'Structured arguments',
    category: 'Execution',
    description:
      'Replace raw command text with typed and validated tool arguments.',
    impact: 'Removes ambiguity at the shell boundary and lowers command injection risk.',
  },
  {
    id: 'command_allowlist',
    label: 'Allowlist sensitive commands',
    shortLabel: 'Command allowlist',
    category: 'Execution',
    description:
      'Define a narrow command family set instead of accepting broad execution requests.',
    impact: 'Limits what the assistant can do even when user intent is unclear or risky.',
  },
  {
    id: 'approval_gate',
    label: 'Require approval for high-impact actions',
    shortLabel: 'Approval gate',
    category: 'Execution',
    description:
      'Pause destructive writes, deploys, and other sensitive actions until a human approves them.',
    impact: 'Adds a strong human-in-the-loop boundary before irreversible steps.',
  },
  {
    id: 'full_audit_logging',
    label: 'Log all sensitive decisions',
    shortLabel: 'Full audit logging',
    category: 'Visibility',
    description:
      'Record approvals, denials, retries, and context-safety decisions in one reviewable timeline.',
    impact: 'Improves accountability, incident response, and presentation clarity.',
  },
];

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

export function applyControls(
  posture: LabPosture,
  controlIds: SecurityControlId[]
): LabPosture {
  const next = { ...posture };

  for (const controlId of controlIds) {
    switch (controlId) {
      case 'scope_project_files':
        next.filesystemScope = 'project';
        next.usesSecretDenylist = true;
        break;
      case 'scope_project_browser':
        if (next.browserScope !== 'none') {
          next.browserScope = 'project';
        }
        break;
      case 'context_secret_redaction':
        next.promptContainsSecrets = false;
        next.usesSecretDenylist = true;
        break;
      case 'private_note_isolation':
        next.promptContainsPrivateNotes = false;
        break;
      case 'structured_command_arguments':
        next.commandExecution = 'structured';
        next.usesStructuredArguments = true;
        break;
      case 'command_allowlist':
        next.usesCommandAllowlist = true;
        break;
      case 'approval_gate':
        next.destructiveActionsRequireApproval = true;
        next.deploysRequireConfirmation = true;
        break;
      case 'full_audit_logging':
        next.auditCoverage = 'full';
        next.logsSensitiveActions = true;
        break;
    }
  }

  return next;
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

export function runSecurityAudit(
  scenario: SecurityScenario,
  posture: LabPosture = scenario.posture
): AuditResult {
  const findings = evaluatePosture(scenario, posture);
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
