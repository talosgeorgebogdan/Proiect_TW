export type Severity = 'critical' | 'high' | 'medium' | 'low';

export type FilesystemScope = 'project' | 'repository' | 'unrestricted';
export type BrowserScope = 'none' | 'project' | 'broad';
export type CommandExecutionMode = 'disabled' | 'structured' | 'raw-user-input';
export type AuditCoverage = 'full' | 'partial' | 'none';

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

export type SecurityScenario = {
  slug: string;
  title: string;
  summary: string;
  labGoal: string;
  threatModel: string;
  exposureNotes: string[];
  posture: LabPosture;
  events: AuditEvent[];
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
