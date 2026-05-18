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
    assets: [
      {
        name: 'Environment configuration',
        priority: 'high',
        description: 'Local secrets, deployment configuration, and repository metadata must stay out of casual task scope.',
      },
      {
        name: 'Deployment pipeline',
        priority: 'high',
        description: 'Preview and production deployment actions can change live outputs quickly.',
      },
      {
        name: 'Project source tree',
        priority: 'medium',
        description: 'Normal code access is useful, but unrestricted traversal widens the blast radius.',
      },
    ],
    trustBoundaries: [
      {
        label: 'User request -> assistant capability selection',
        description: 'Natural-language intent should not automatically expand access beyond the task boundary.',
      },
      {
        label: 'Assistant -> local filesystem and deployment tools',
        description: 'Sensitive capability boundaries should require explicit narrowing and confirmation.',
      },
    ],
    attackerGoals: [
      'Exfiltrate secrets by steering the assistant toward unrelated files.',
      'Trigger a deployment or remote side effect without extra human review.',
      'Expand task scope from routine analysis into operational control.',
    ],
    reviewQuestions: [
      'Which files are truly needed for this task?',
      'Can any remote side effect run without a second checkpoint?',
      'Is browser automation limited to the project surface?',
    ],
    presentationTakeaways: [
      'Least privilege is the first control, not the last cleanup step.',
      'High-impact tools should feel expensive to invoke.',
      'Broad access can be risky even without a classic exploit chain.',
    ],
    hardenedOutcome:
      'After hardening, the assistant stays inside project-scoped files, browser access is narrowed, and high-impact actions require a human checkpoint.',
    recommendedControls: [
      'scope_project_files',
      'scope_project_browser',
      'approval_gate',
      'full_audit_logging',
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
    assets: [
      {
        name: 'Prompt context',
        priority: 'high',
        description: 'Anything passed into the model can appear in outputs, logs, or later summaries.',
      },
      {
        name: 'Secrets and tokens',
        priority: 'high',
        description: 'Token-like values are especially dangerous because they are immediately reusable if leaked.',
      },
      {
        name: 'Private reviewer notes',
        priority: 'medium',
        description: 'Internal commentary should not travel with operational task context.',
      },
    ],
    trustBoundaries: [
      {
        label: 'Human prompt assembly -> model context',
        description: 'A filtering layer should separate raw source material from what is actually exposed to the model.',
      },
      {
        label: 'Model context -> audit logs and summaries',
        description: 'Sensitive text should be redacted before it can echo into later artifacts.',
      },
    ],
    attackerGoals: [
      'Surface secrets in a summary, log line, or copied response.',
      'Preserve private notes in model-visible context for later leakage.',
      'Increase the amount of sensitive data retained by the workflow.',
    ],
    reviewQuestions: [
      'What text reaches the model that does not need to?',
      'Is secret scanning happening before context is assembled?',
      'Can internal notes be separated from execution prompts?',
    ],
    presentationTakeaways: [
      'Data minimization is a model-input problem, not only a storage problem.',
      'Prompt assembly deserves the same care as API request validation.',
      'A clean context window is a defensive control.',
    ],
    hardenedOutcome:
      'After hardening, secrets are scrubbed before prompt assembly, private notes stay out of model context, and audit logs capture the redaction decision path.',
    recommendedControls: [
      'context_secret_redaction',
      'private_note_isolation',
      'full_audit_logging',
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
    assets: [
      {
        name: 'Shell execution surface',
        priority: 'high',
        description: 'A raw command path can quickly turn ordinary intent into destructive execution.',
      },
      {
        name: 'Workspace integrity',
        priority: 'high',
        description: 'Loose command construction threatens files, branches, and generated artifacts.',
      },
      {
        name: 'Approval workflow',
        priority: 'medium',
        description: 'Weak checkpoints make it harder to stop risky execution before it happens.',
      },
    ],
    trustBoundaries: [
      {
        label: 'User text -> tool arguments',
        description: 'Free-form input should be normalized into typed arguments before it reaches any shell boundary.',
      },
      {
        label: 'Tool planner -> execution layer',
        description: 'The execution layer should enforce allowlists and approval checks instead of trusting intent alone.',
      },
    ],
    attackerGoals: [
      'Inject shell semantics by shaping the wording of a normal request.',
      'Reach destructive commands that were never meant to be broadly available.',
      'Convert a simple automation feature into a system control surface.',
    ],
    reviewQuestions: [
      'Where does natural language turn into executable syntax?',
      'Are destructive actions structurally blocked until approved?',
      'Can a command family be reduced to a narrow allowlist?',
    ],
    presentationTakeaways: [
      'Structured arguments are a security control, not just a code-style preference.',
      'Approval checkpoints matter most when the tool boundary is powerful.',
      'The shell is an execution surface, not a neutral formatter.',
    ],
    hardenedOutcome:
      'After hardening, command requests are typed, allowlisted, and approval-gated before any execution reaches the shell layer.',
    recommendedControls: [
      'structured_command_arguments',
      'command_allowlist',
      'approval_gate',
      'full_audit_logging',
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
    assets: [
      {
        name: 'Audit timeline',
        priority: 'high',
        description: 'Reviewers need enough evidence to reconstruct intent, approval, and result.',
      },
      {
        name: 'Incident response confidence',
        priority: 'high',
        description: 'Weak visibility slows containment and makes accountability harder.',
      },
      {
        name: 'Control effectiveness evidence',
        priority: 'medium',
        description: 'Without logs, even blocked actions are difficult to prove during review.',
      },
    ],
    trustBoundaries: [
      {
        label: 'Sensitive action -> logging layer',
        description: 'Every privileged decision should cross a reliable logging boundary with structured metadata.',
      },
      {
        label: 'Reviewer -> incident reconstruction',
        description: 'The review interface should show enough context to explain repeated or suspicious behavior.',
      },
    ],
    attackerGoals: [
      'Hide suspicious repetition inside generic denial messages.',
      'Force the team to guess what happened during an incident.',
      'Exploit gaps between access control and accountability.',
    ],
    reviewQuestions: [
      'What evidence survives a blocked or approved sensitive action?',
      'Can repeated attempts be tied together in one timeline?',
      'Do reviewers know who approved a high-impact action?',
    ],
    presentationTakeaways: [
      'Security controls are weaker when their decisions are not reviewable.',
      'Logs are part of the control surface, not just a debugging convenience.',
      'Auditability improves both defense and academic explainability.',
    ],
    hardenedOutcome:
      'After hardening, blocked and approved actions are visible in one structured timeline with actor, timestamp, approval state, and outcome.',
    recommendedControls: ['full_audit_logging'],
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
