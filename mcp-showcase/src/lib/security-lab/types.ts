export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type FilesystemScope = 'project' | 'repository' | 'unrestricted';
export type BrowserScope = 'none' | 'project' | 'broad';
export type CommandExecutionMode = 'disabled' | 'structured' | 'raw-user-input';
export type AuditCoverage = 'full' | 'partial' | 'none';

export type SecurityControlId =
  | 'scope_project_files'
  | 'scope_project_browser'
  | 'context_secret_redaction'
  | 'private_note_isolation'
  | 'structured_command_arguments'
  | 'command_allowlist'
  | 'approval_gate'
  | 'full_audit_logging';

export type LabPosture = {
  filesystemScope: FilesystemScope;
  browserScope: BrowserScope;
  commandExecution: CommandExecutionMode;
  promptContainsSecrets: boolean;
  promptContainsPrivateNotes: boolean;
  usesSecretDenylist: boolean;
  usesCommandAllowlist: boolean;
  usesStructuredArguments: boolean;
  destructiveActionsRequireApproval: boolean;
  deploysRequireConfirmation: boolean;
  auditCoverage: AuditCoverage;
  logsSensitiveActions: boolean;
};

export type AuditEvent = {
  time: string;
  actor: 'assistant' | 'developer' | 'reviewer' | 'system';
  action: string;
  status: 'allowed' | 'blocked' | 'review' | 'logged';
  detail: string;
};

export type ScenarioAsset = {
  name: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
};

export type TrustBoundary = {
  label: string;
  description: string;
};

export type SecurityScenario = {
  slug: string;
  title: string;
  summary: string;
  labGoal: string;
  threatModel: string;
  exposureNotes: string[];
  posture: LabPosture;
  events: AuditEvent[];
  assets: ScenarioAsset[];
  trustBoundaries: TrustBoundary[];
  attackerGoals: string[];
  reviewQuestions: string[];
  presentationTakeaways: string[];
  hardenedOutcome: string;
  recommendedControls: SecurityControlId[];
};

export type SecurityFinding = {
  id: string;
  title: string;
  severity: Severity;
  theme: string;
  detail: string;
  evidence: string;
  mitigation: string;
};

export type AuditResult = {
  riskScore: number;
  findingCounts: Record<Severity, number>;
  findings: SecurityFinding[];
};

export type SecurityControlDefinition = {
  id: SecurityControlId;
  label: string;
  shortLabel: string;
  category: 'Access' | 'Context' | 'Execution' | 'Visibility';
  description: string;
  impact: string;
};
