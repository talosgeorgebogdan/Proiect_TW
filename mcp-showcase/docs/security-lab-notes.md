# AI Security Audit Lab for MCP-Enabled Apps

## Current Direction

Working title:
- `AI Security Audit Lab for MCP-Enabled Apps`

Alternative framing for presentation:
- Security analysis and hardening of an AI-assisted application connected to MCP-style tools
- Educational audit platform for identifying and mitigating risks in AI-integrated web applications

Current branch for this work:
- `security-lab`

## Why This Still Fits MCP Hub

The existing website already explains MCPs, skills, and AI-assisted workflows. A security lab still fits naturally because MCP-based systems expose tools, context, files, prompts, and actions to an AI assistant. That gives the project a strong security angle around permissions, data exposure, logging, safe execution, and reviewability.

This remains stronger than adding an unrelated standalone security app because:
- it reuses the current project identity
- it is easy to justify academically
- it combines technical implementation with critical analysis
- it creates a live interactive demo instead of only static explanation

## Core Project Idea

The `Security Lab` route simulates the defensive audit of an MCP-enabled application.

The lab is meant to show:
- what resources and tools an AI assistant can access
- what risks appear when access is too broad or poorly controlled
- how those risks are detected
- what mitigation measures reduce the attack surface

The lab is defensive and educational. It does not perform real attacks against real targets.

## Main Security Themes

- Least privilege
- Data minimization
- Human-in-the-loop approval
- Secure tool invocation
- Secret protection
- Audit logging and traceability
- Defense in depth

## Implemented Route and Files

Implemented route:
- `src/app/security-lab/page.tsx`

Current supporting files:
- `src/app/security-lab/SecurityLabExperience.tsx`
- `src/lib/security-lab/types.ts`
- `src/lib/security-lab/scenarios.ts`
- `src/lib/security-lab/audit-engine.ts`

Minimal cross-site integration:
- `src/app/SiteHeader.tsx` includes a `Security Lab` navigation link

## Current Implemented Architecture

The feature is intentionally isolated so it is easy to remove or replace later if the project pivots toward the MFA fallback idea.

Current architecture split:

### 1. Server Route Wrapper

`page.tsx` keeps the route lightweight and server-led.

Responsibilities:
- reads the selected scenario from `searchParams`
- renders the shared site shell
- passes the initial scenario into the interactive client experience

### 2. Interactive Client Experience

`SecurityLabExperience.tsx` is the main UI surface.

Responsibilities:
- scenario selection
- control toggles
- live audit rescoring
- before vs after hardening comparison
- threat model canvas display
- presentation-focused summaries

### 3. Scenario Model

`scenarios.ts` now stores richer scenario metadata, not just posture values.

Each scenario currently includes:
- summary
- lab goal
- threat model
- exposure notes
- baseline posture
- event timeline
- protected assets
- trust boundaries
- attacker goals
- review questions
- presentation takeaways
- hardened outcome summary
- recommended controls

### 4. Rule-Based Audit Engine

`audit-engine.ts` contains the logic that converts posture into findings and risk score.

It now supports:
- baseline audit evaluation
- control application
- live recalculation after toggles
- hardened preset evaluation

This is still the safest and most academically defensible approach because it is explainable, deterministic, and easy to demonstrate.

## Current Scenarios

The lab currently includes four predefined scenarios:

### Scenario A: Over-Permissioned Assistant

Focus:
- broad filesystem access
- broad browser access
- deployment actions without strong confirmation

### Scenario B: Secret Leakage Through Context

Focus:
- token-like values in prompt context
- private notes mixed into operational context
- lack of prompt-time redaction

### Scenario C: Unsafe Tool Invocation

Focus:
- raw user input flowing into command execution
- no command allowlist
- missing structured arguments
- weak approval gating

### Scenario D: Missing Audit Trail

Focus:
- incomplete logging
- weak incident visibility
- poor reconstruction of blocked or repeated attempts

## Three-Phase Upgrade That Is Now Implemented

The earlier plan to improve the first version of the lab has now been implemented.

### Phase 1: Interactive Controls

Implemented:
- viewers can toggle defensive controls live
- the audit score and findings update immediately
- the route behaves more like a lab than a static presentation page

Examples of controls:
- restrict filesystem scope
- restrict browser scope
- redact secrets before prompt assembly
- isolate private notes
- require structured execution arguments
- allowlist commands
- require approval gates
- enable full audit logging

### Phase 2: Before vs After Hardening

Implemented:
- baseline score is shown
- current interactive score is shown
- hardened target score is shown
- the scenario includes a recommended hardening path

This gives the presentation a better narrative:
- insecure setup
- findings
- defensive controls
- reduced risk after hardening

### Phase 3: Presentation Polish

Implemented:
- threat model canvas
- attacker goals
- asset list
- trust boundaries
- review questions
- presentation takeaways

This makes the feature easier to explain during the live demo and easier to write about in the final documentation.

## Current UI Sections

The current `/security-lab` route includes:
- introduction and live audit score
- scenario selector
- live defensive control workspace
- attack surface snapshot
- threat model panel
- threat model canvas
- findings and hardening comparison
- review questions
- incident timeline
- presentation takeaways
- security skill status
- reversible-by-design closeout section

## Current Audit Logic

The current audit engine raises findings based on posture and controls rather than fake exploitation.

Examples of implemented rule behavior:
- unrestricted filesystem access raises a high least-privilege finding
- prompt secrets raise a critical secret-protection finding
- raw user input reaching command execution raises a critical tool-invocation finding
- missing approval gates raises a critical human-in-the-loop finding
- missing or partial audit logging raises traceability findings

Benefits of the current approach:
- easy to explain
- technically valid for an educational project
- safe for academic use
- visually demonstrable
- easy to extend with more scenarios later

## Current Deliverables Already Achieved

Already implemented:
- a new interactive `Security Lab` page in the site
- several predefined security scenarios
- automatic findings with severity and explanation
- mitigation recommendations
- a clear visual comparison between insecure and hardened states
- architecture that is isolated enough to be removed later if necessary

## What Still Can Be Improved Later

Good next improvements if we keep this direction:
- persist selected scenario and enabled controls more fully in the URL
- add lightweight visual charts for score deltas
- add export-friendly report sections or screenshot mode
- add more scenarios
- add academic documentation screenshots and captions
- add a final “limitations and future work” subsection directly in the route

## Evaluation Criteria Mapping

### 1. Clarity and Relevance of Topic

Strong because the project directly addresses digital security in modern AI-connected applications.

### 2. Technical Implementation

Now stronger because the lab includes:
- scenario modeling
- rule-based detection
- severity scoring
- live interactivity
- hardening comparison
- logging simulation
- mitigation logic

### 3. Documentation

Strong if the final report explains:
- why this topic was chosen
- what was implemented
- how each scenario works
- how the audit engine works
- what security principles were applied
- what limitations remain

### 4. Originality and Critical Thinking

Very strong because this is not a generic cipher or login demo. It addresses current risks around AI tooling and MCP-style architectures.

### 5. Final Presentation

Strong because the project can be shown live:
- choose a scenario
- toggle controls
- inspect findings
- compare before and after hardening
- explain the threat model and mitigation story

## Documentation Checklist For Later

When writing the final report, make sure to capture:
- project motivation
- relation to MCP-enabled systems
- security objectives
- chosen threat scenarios
- architecture of the audit lab
- explanation of the audit rules
- screenshots of each module
- sample findings and mitigations
- limitations and future improvements

## Good Phrases For The Report

- The project focuses on defensive security analysis for AI-assisted applications.
- The goal is not offensive exploitation, but the identification and mitigation of insecure design patterns.
- The lab simulates realistic risks associated with AI systems that have access to tools, files, prompts, and execution environments.
- The implemented controls are based on least privilege, data minimization, approval-based execution, and auditability.
- The final lab combines scenario modeling, live defensive controls, and explainable risk scoring.

## Known Limitations

- The lab simulates an audit environment rather than scanning a live external target.
- Findings are rule-based and educational, not equivalent to a full enterprise security platform.
- The focus is application-layer security in AI-integrated systems, not network intrusion detection or hardware security.
- The current route demonstrates principles and design quality rather than integrating with a real backend policy engine.

## Fallback Option

If this direction later feels too abstract during final polishing, the backup idea is still:

`MCP Hub Secure Access Lab`

That version would focus on:
- login
- MFA
- suspicious access detection
- alerts
- audit logs

This remains a safe fallback because it fits the current site and has a clearer traditional security angle.
