import type { SecurityScenario } from './types';

export const securityLabScenarios: SecurityScenario[] = [
  {
    slug: 'over-permissioned-assistant',
    title: 'Over-Permissioned Assistant',
    summary:
      'The assistant can see too much of the workspace and can trigger sensitive actions with very little friction.',
    labGoal:
      'Show how broad access expands the attack surface even before a single exploit attempt happens.',
    threatModel:
      'Primary risk: accidental or prompted access to secrets, deployment tooling, and unrelated project files.',
    exposureNotes: [
      'Repository-wide file access includes configuration and local environment files.',
      'Browser automation is not scoped to project-only pages.',
      'Deployment actions can be initiated without a separate human confirmation checkpoint.',
    ],
    posture: {
      filesystemScope: 'unrestricted',
      browserScope: 'broad',
      commandExecution: 'structured',
      promptContainsSecrets: false,
      promptContainsPrivateNotes: false,
      usesSecretDenylist: false,
      usesCommandAllowlist: true,
      usesStructuredArguments: true,
      destructiveActionsRequireApproval: false,
      deploysRequireConfirmation: false,
      auditCoverage: 'partial',
      logsSensitiveActions: true,
    },
    events: [
      {
        time: '09:12',
        actor: 'developer',
        action: 'Workspace attached',
        status: 'allowed',
        detail: 'The assistant received access to the full repository tree and local config folders.',
      },
      {
        time: '09:15',
        actor: 'assistant',
        action: 'Deploy preview',
        status: 'allowed',
        detail: 'Preview deployment started immediately after a natural-language request.',
      },
      {
        time: '09:17',
        actor: 'reviewer',
        action: 'Audit observation',
        status: 'review',
        detail: 'No extra confirmation step was required before a high-impact action.',
      },
    ],
  },
  {
    slug: 'secret-leakage-through-context',
    title: 'Secret Leakage Through Context',
    summary:
      'The assistant is asked to reason over prompts that still contain token-like values and internal notes.',
    labGoal:
      'Demonstrate why prompt filtering and data minimization matter before context reaches the model.',
    threatModel:
      'Primary risk: confidential data becomes visible in model context, outputs, logs, or later summaries.',
    exposureNotes: [
      'Prompt payload includes token-like strings copied from setup notes.',
      'Private planning notes are mixed into the same context as technical instructions.',
      'No denylist excludes `.env`-style data from being referenced.',
    ],
    posture: {
      filesystemScope: 'repository',
      browserScope: 'project',
      commandExecution: 'disabled',
      promptContainsSecrets: true,
      promptContainsPrivateNotes: true,
      usesSecretDenylist: false,
      usesCommandAllowlist: true,
      usesStructuredArguments: true,
      destructiveActionsRequireApproval: true,
      deploysRequireConfirmation: true,
      auditCoverage: 'partial',
      logsSensitiveActions: false,
    },
    events: [
      {
        time: '10:03',
        actor: 'developer',
        action: 'Prompt pasted',
        status: 'allowed',
        detail: 'Setup instructions were pasted together with a token-like value and reviewer notes.',
      },
      {
        time: '10:04',
        actor: 'assistant',
        action: 'Context summary',
        status: 'logged',
        detail: 'The assistant summarized the request without proving that sensitive text was redacted first.',
      },
      {
        time: '10:06',
        actor: 'reviewer',
        action: 'Leak check',
        status: 'review',
        detail: 'Audit notes show missing prompt filtering and incomplete redaction coverage.',
      },
    ],
  },
  {
    slug: 'unsafe-command-execution',
    title: 'Unsafe Tool Invocation',
    summary:
      'A user request can flow into command execution with weak validation and no strong approval barrier.',
    labGoal:
      'Make the shell/tool boundary visible and show why structure beats raw command strings.',
    threatModel:
      'Primary risk: destructive or unexpected commands run because user input is treated like shell syntax.',
    exposureNotes: [
      'Commands are assembled directly from natural-language input.',
      'There is no clear allowlist for sensitive tool operations.',
      'Destructive actions do not require a separate approval checkpoint.',
    ],
    posture: {
      filesystemScope: 'repository',
      browserScope: 'none',
      commandExecution: 'raw-user-input',
      promptContainsSecrets: false,
      promptContainsPrivateNotes: false,
      usesSecretDenylist: true,
      usesCommandAllowlist: false,
      usesStructuredArguments: false,
      destructiveActionsRequireApproval: false,
      deploysRequireConfirmation: true,
      auditCoverage: 'partial',
      logsSensitiveActions: false,
    },
    events: [
      {
        time: '11:21',
        actor: 'developer',
        action: 'Bulk cleanup request',
        status: 'allowed',
        detail: 'The request included free-form path and command wording rather than structured arguments.',
      },
      {
        time: '11:22',
        actor: 'assistant',
        action: 'Shell invocation',
        status: 'allowed',
        detail: 'Tool execution accepted the raw command string without an approval pause.',
      },
      {
        time: '11:24',
        actor: 'reviewer',
        action: 'Abuse-path review',
        status: 'review',
        detail: 'The execution path shows no strong boundary between user intent and shell syntax.',
      },
    ],
  },
  {
    slug: 'missing-audit-trail',
    title: 'Missing Audit Trail',
    summary:
      'Sensitive actions are limited, but the system cannot explain who did what and when with enough detail.',
    labGoal:
      'Show that safe permissions are not enough if incident visibility is weak.',
    threatModel:
      'Primary risk: privileged actions happen without enough evidence for review, containment, or rollback.',
    exposureNotes: [
      'Security-relevant actions are not logged consistently.',
      'Reviewers can see outputs but not the exact approval or denial history.',
      'Timeline data is incomplete for repeated suspicious attempts.',
    ],
    posture: {
      filesystemScope: 'project',
      browserScope: 'project',
      commandExecution: 'structured',
      promptContainsSecrets: false,
      promptContainsPrivateNotes: false,
      usesSecretDenylist: true,
      usesCommandAllowlist: true,
      usesStructuredArguments: true,
      destructiveActionsRequireApproval: true,
      deploysRequireConfirmation: true,
      auditCoverage: 'none',
      logsSensitiveActions: false,
    },
    events: [
      {
        time: '13:05',
        actor: 'assistant',
        action: 'Protected file read',
        status: 'blocked',
        detail: 'The action was denied, but only a generic error message was retained.',
      },
      {
        time: '13:08',
        actor: 'assistant',
        action: 'Retry with different wording',
        status: 'blocked',
        detail: 'Repeated access attempts were not escalated into a reviewable timeline.',
      },
      {
        time: '13:14',
        actor: 'reviewer',
        action: 'Incident reconstruction',
        status: 'review',
        detail: 'The team could not tell which requests were blocked, who approved them, or what data was touched.',
      },
    ],
  },
];

export const securitySkillStatus = [
  {
    name: 'security-best-practices',
    status: 'active in session',
    detail:
      'Used as the secure-by-default coding lens for the React and Next.js implementation.',
  },
  {
    name: 'security-threat-model',
    status: 'active in session',
    detail:
      'Used to frame trust boundaries, attacker goals, and abuse paths for each audit scenario.',
  },
  {
    name: 'security-ownership-map',
    status: 'active in session',
    detail:
      'Available for follow-up repository ownership analysis, but not pinned in the local skills lock file.',
  },
] as const;
