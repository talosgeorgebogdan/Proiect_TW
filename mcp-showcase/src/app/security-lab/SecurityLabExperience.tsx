'use client';

import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';

import ScrollAnimate from '../ScrollAnimate';
import {
  applyControls,
  runSecurityAudit,
  securityLabControls,
} from '@/lib/security-lab/audit-engine';
import {
  securityLabScenarios,
  securitySkillStatus,
} from '@/lib/security-lab/scenarios';
import type { SecurityControlDefinition, SecurityControlId, Severity } from '@/lib/security-lab/types';

const severityStyles: Record<Severity, string> = {
  critical: 'border-red-400/35 bg-red-500/10 text-red-100',
  high: 'border-orange-300/35 bg-orange-400/10 text-orange-100',
  medium: 'border-yellow-300/35 bg-yellow-300/10 text-yellow-50',
  low: 'border-emerald-300/35 bg-emerald-400/10 text-emerald-50',
};

const severityLabelStyles: Record<Severity, string> = {
  critical: 'bg-red-500 text-white',
  high: 'bg-orange-400 text-[#1f2937]',
  medium: 'bg-[#FFE492] text-[#043873]',
  low: 'bg-emerald-400 text-[#043873]',
};

const metricDescriptions = [
  {
    label: 'Phase 1',
    title: 'Interactive Controls',
    value:
      'Toggle defensive controls and watch the findings re-score live instead of staying locked to static scenarios.',
  },
  {
    label: 'Phase 2',
    title: 'Before vs After Hardening',
    value:
      'Show the insecure baseline beside the hardened version so the mitigation story becomes visual and measurable.',
  },
  {
    label: 'Phase 3',
    title: 'Presentation Polish',
    value:
      'Surface threat-model language, review questions, and takeaways that are easy to explain during the final demo.',
  },
];

function formatCapabilityLabel(value: string) {
  return value.replace(/-/g, ' ');
}

function riskBand(score: number) {
  if (score >= 80) return 'Critical attention';
  if (score >= 55) return 'High risk';
  if (score >= 30) return 'Needs hardening';
  return 'Mostly controlled';
}

function scoreDeltaLabel(delta: number) {
  if (delta === 0) return 'No change';
  return delta > 0 ? `-${delta} risk points` : `+${Math.abs(delta)} risk points`;
}

function groupControls() {
  return securityLabControls.reduce<Record<string, SecurityControlDefinition[]>>((groups, control) => {
    groups[control.category] ??= [];
    groups[control.category].push(control);
    return groups;
  }, {});
}

export default function SecurityLabExperience({
  initialScenarioSlug,
}: {
  initialScenarioSlug: string;
}) {
  const [selectedScenarioSlug, setSelectedScenarioSlug] = useState(initialScenarioSlug);
  const [enabledControls, setEnabledControls] = useState<SecurityControlId[]>([]);
  const [showComparison, setShowComparison] = useState(true);
  const [isPending, startTransition] = useTransition();

  const groupedControls = useMemo(() => groupControls(), []);

  const scenario =
    securityLabScenarios.find((item) => item.slug === selectedScenarioSlug) ??
    securityLabScenarios[0];

  const baselineAudit = useMemo(() => runSecurityAudit(scenario), [scenario]);
  const currentPosture = useMemo(
    () => applyControls(scenario.posture, enabledControls),
    [enabledControls, scenario]
  );
  const currentAudit = useMemo(
    () => runSecurityAudit(scenario, currentPosture),
    [currentPosture, scenario]
  );
  const hardenedPosture = useMemo(
    () => applyControls(scenario.posture, scenario.recommendedControls),
    [scenario]
  );
  const hardenedAudit = useMemo(
    () => runSecurityAudit(scenario, hardenedPosture),
    [hardenedPosture, scenario]
  );

  const hardenedDelta = baselineAudit.riskScore - hardenedAudit.riskScore;
  const liveDelta = baselineAudit.riskScore - currentAudit.riskScore;

  function selectScenario(slug: string) {
    startTransition(() => {
      setSelectedScenarioSlug(slug);
      setEnabledControls([]);
      setShowComparison(true);
    });
  }

  function toggleControl(controlId: SecurityControlId) {
    setEnabledControls((current) =>
      current.includes(controlId)
        ? current.filter((item) => item !== controlId)
        : [...current, controlId]
    );
  }

  function applyHardeningPreset() {
    setEnabledControls(scenario.recommendedControls);
  }

  function resetControls() {
    setEnabledControls([]);
  }

  return (
    <>
      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute left-20 top-10 h-[340px] w-[340px] rounded-full bg-[#4F9CF9]/20 blur-[110px]"></div>
        <div className="absolute right-16 top-8 h-[320px] w-[320px] rounded-full bg-[#FFE492]/15 blur-[110px]"></div>
        <ScrollAnimate className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FFE492]"></span>
            Defensive audit lab for MCP-enabled applications
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
                Security Lab
              </h1>
              <p className="text-[18px] leading-[30px] text-white/90">
                This route now behaves like a small interactive audit workbench. You can
                start from a risky MCP-enabled scenario, toggle defensive controls, compare
                insecure and hardened states, and explain the results using threat-model
                language instead of abstract theory.
              </p>
              <p className="text-[18px] leading-[30px] text-white/80">
                The active scenario is{' '}
                <span className="font-semibold text-[#FFE492]">{scenario.title}</span>.
                Its audit score updates from the same local rule engine, which keeps the
                feature easy to evolve or replace later.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                    Live audit score
                  </p>
                  <p className="mt-3 text-6xl font-bold text-white">{currentAudit.riskScore}</p>
                  <p className="mt-3 text-lg font-medium text-[#FFE492]">
                    {riskBand(currentAudit.riskScore)}
                  </p>
                  <p className="mt-2 text-sm text-white/65">{scoreDeltaLabel(liveDelta)}</p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#032b59]/80 px-5 py-4 text-right">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                    Threat focus
                  </p>
                  <p className="mt-2 max-w-[220px] text-sm leading-6 text-white/75">
                    {scenario.threatModel}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {(['critical', 'high', 'medium', 'low'] as Severity[]).map((severity) => (
                  <div
                    key={severity}
                    className={`rounded-2xl border px-4 py-4 ${severityStyles[severity]}`}
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.18em]">
                      {severity}
                    </p>
                    <p className="mt-2 text-3xl font-bold">
                      {currentAudit.findingCounts[severity]}
                    </p>
                    <p className="mt-1 text-sm text-current/80">live findings</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {metricDescriptions.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">{item.label}</p>
                <p className="mt-3 text-lg font-semibold text-white">{item.title}</p>
                <p className="mt-3 text-base leading-7 text-white/85">{item.value}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-8">
            <div className="max-w-[760px] space-y-4">
              <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">
                Scenario Selector
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                Each preset models one defensive audit angle from the lab notes: permissions,
                prompt exposure, tool invocation, or incident visibility.
              </p>
            </div>

            <div className="grid gap-4">
              {securityLabScenarios.map((item) => {
                const isActive = item.slug === scenario.slug;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => selectScenario(item.slug)}
                    className={`rounded-[28px] border p-6 text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                      isActive
                        ? 'border-[#4F9CF9] bg-[#043873] text-white'
                        : 'border-[#dbe8f7] bg-white/90 text-[#043873]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-xs font-mono uppercase tracking-[0.22em] ${
                            isActive ? 'text-[#C4DEFD]' : 'text-[#4F9CF9]'
                          }`}
                        >
                          Audit scenario
                        </p>
                        <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                      </div>
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          isActive ? 'bg-white/10 text-[#FFE492]' : 'bg-[#EAF4FF] text-[#043873]'
                        }`}
                      >
                        {isActive ? 'active' : 'open'}
                      </span>
                    </div>
                    <p
                      className={`mt-5 leading-relaxed ${
                        isActive ? 'text-white/82' : 'text-[#043873]/78'
                      }`}
                    >
                      {item.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#dbe8f7] bg-[#f8fbff] p-8 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F9CF9]">
                  Phase 1 workspace
                </p>
                <h3 className="mt-3 text-3xl font-bold text-[#043873]">Live defensive controls</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={applyHardeningPreset}
                  className="rounded-xl bg-[#043873] px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-[#032b59]"
                >
                  Apply hardening preset
                </button>
                <button
                  type="button"
                  onClick={resetControls}
                  className="rounded-xl border border-[#c9ddf7] bg-white px-5 py-3 text-sm font-semibold text-[#043873] transition-all hover:border-[#4F9CF9]"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowComparison((current) => !current)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  showComparison
                    ? 'bg-[#4F9CF9] text-white shadow-lg'
                    : 'bg-white text-[#043873] ring-1 ring-[#dbe8f7]'
                }`}
              >
                {showComparison ? 'Comparison mode on' : 'Comparison mode off'}
              </button>
              {isPending ? (
                <span className="rounded-full bg-[#EAF4FF] px-4 py-2 text-sm text-[#4F9CF9]">
                  Updating scenario...
                </span>
              ) : null}
            </div>

            <div className="mt-8 space-y-6">
              {Object.entries(groupedControls).map(([category, controls]) => (
                <div key={category}>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4F9CF9]">
                    {category}
                  </p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {controls.map((control) => {
                      const enabled = enabledControls.includes(control.id);

                      return (
                        <button
                          key={control.id}
                          type="button"
                          onClick={() => toggleControl(control.id)}
                          className={`rounded-[24px] border p-5 text-left transition-all ${
                            enabled
                              ? 'border-[#043873] bg-[#043873] text-white shadow-xl'
                              : 'border-[#dbe8f7] bg-white text-[#043873] hover:border-[#4F9CF9]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="text-lg font-semibold">{control.shortLabel}</p>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                                enabled
                                  ? 'bg-white/10 text-[#FFE492]'
                                  : 'bg-[#EAF4FF] text-[#043873]'
                              }`}
                            >
                              {enabled ? 'enabled' : 'off'}
                            </span>
                          </div>
                          <p className={`mt-3 leading-relaxed ${enabled ? 'text-white/80' : 'text-[#043873]/75'}`}>
                            {control.description}
                          </p>
                          <p className={`mt-4 text-sm ${enabled ? 'text-[#C4DEFD]' : 'text-[#4F9CF9]'}`}>
                            {control.impact}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#043873] px-8 py-20 text-white lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4DEFD]">
              Attack surface snapshot
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-[52px]">
              What the assistant can currently reach
            </h2>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Filesystem scope
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  {formatCapabilityLabel(currentPosture.filesystemScope)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Browser scope
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  {formatCapabilityLabel(currentPosture.browserScope)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Command mode
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  {formatCapabilityLabel(currentPosture.commandExecution)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Audit coverage
                </p>
                <p className="mt-3 text-2xl font-bold text-white">
                  {formatCapabilityLabel(currentPosture.auditCoverage)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#FFE492] to-[#f8df7e] p-8 text-[#043873] shadow-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
              Threat model
            </p>
            <h3 className="mt-4 text-3xl font-bold">Why this scenario matters</h3>
            <p className="mt-5 text-[18px] leading-[30px] text-[#043873]/82">
              {scenario.threatModel}
            </p>
            <div className="mt-8 space-y-4">
              {scenario.exposureNotes.map((note) => (
                <div
                  key={note}
                  className="flex items-start gap-3 rounded-2xl border border-[#043873]/10 bg-white/50 p-4"
                >
                  <span className="mt-1 text-[#4F9CF9]">-</span>
                  <p className="leading-relaxed text-[#043873]/82">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">
              Threat Model Canvas
            </h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The lab now exposes the defensive reasoning directly: what we are protecting,
              where trust boundaries sit, and what an attacker is trying to achieve.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-[30px] border border-white bg-white/90 p-8 shadow-lg">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F9CF9]">
                Assets
              </p>
              <div className="mt-5 space-y-4">
                {scenario.assets.map((asset) => (
                  <div key={asset.name} className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-[#043873]">{asset.name}</p>
                      <span className="rounded-full bg-[#043873] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#FFE492]">
                        {asset.priority}
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed text-[#043873]/75">{asset.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white bg-white/90 p-8 shadow-lg">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F9CF9]">
                Trust boundaries
              </p>
              <div className="mt-5 space-y-4">
                {scenario.trustBoundaries.map((boundary) => (
                  <div key={boundary.label} className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-4">
                    <p className="text-lg font-semibold text-[#043873]">{boundary.label}</p>
                    <p className="mt-3 leading-relaxed text-[#043873]/75">{boundary.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white bg-white/90 p-8 shadow-lg">
              <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F9CF9]">
                Attacker goals
              </p>
              <div className="mt-5 space-y-4">
                {scenario.attackerGoals.map((goal) => (
                  <div key={goal} className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-4">
                    <p className="leading-relaxed text-[#043873]/80">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#043873] px-8 py-20 text-white lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">
              Findings and Hardening
            </h2>
            <p className="text-[18px] leading-[30px] text-white/82">
              This is the core demo surface: the live audit result updates with your control
              changes, and comparison mode shows what the recommended hardening path buys you.
            </p>
          </div>

          {showComparison ? (
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Baseline
                </p>
                <p className="mt-4 text-5xl font-bold text-white">{baselineAudit.riskScore}</p>
                <p className="mt-3 text-lg text-[#FFE492]">{riskBand(baselineAudit.riskScore)}</p>
              </div>

              <div className="rounded-[30px] border border-[#4F9CF9] bg-[#4F9CF9]/12 p-8 shadow-2xl">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                  Current interactive state
                </p>
                <p className="mt-4 text-5xl font-bold text-white">{currentAudit.riskScore}</p>
                <p className="mt-3 text-lg text-[#FFE492]">{scoreDeltaLabel(liveDelta)}</p>
              </div>

              <div className="rounded-[30px] border border-emerald-300/30 bg-emerald-400/10 p-8 shadow-2xl">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-emerald-100">
                  Hardened target
                </p>
                <p className="mt-4 text-5xl font-bold text-white">{hardenedAudit.riskScore}</p>
                <p className="mt-3 text-lg text-emerald-100">{scoreDeltaLabel(hardenedDelta)}</p>
              </div>
            </div>
          ) : null}

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-6">
              {currentAudit.findings.map((finding) => (
                <div
                  key={`${finding.id}-${finding.title}`}
                  className="rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-lg backdrop-blur"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-[760px]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-mono tracking-[0.18em] text-[#C4DEFD]">
                          {finding.id}
                        </span>
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${severityLabelStyles[finding.severity]}`}
                        >
                          {finding.severity}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80">
                          {finding.theme}
                        </span>
                      </div>
                      <h3 className="mt-5 text-2xl font-bold text-white">{finding.title}</h3>
                      <p className="mt-4 leading-relaxed text-white/80">{finding.detail}</p>
                    </div>

                    <div className="w-full rounded-[28px] bg-[#032b59] p-6 text-white lg:max-w-[360px]">
                      <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                        Recommended hardening
                      </p>
                      <p className="mt-4 text-[17px] leading-[30px] text-white/84">
                        {finding.mitigation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4DEFD]">
                  Recommended hardening path
                </p>
                <p className="mt-4 text-3xl font-bold text-white">Before vs after</p>
                <p className="mt-4 text-[17px] leading-[30px] text-white/80">
                  {scenario.hardenedOutcome}
                </p>

                <div className="mt-6 space-y-3">
                  {scenario.recommendedControls.map((controlId) => {
                    const control = securityLabControls.find((item) => item.id === controlId);

                    if (!control) {
                      return null;
                    }

                    return (
                      <div
                        key={control.id}
                        className="rounded-2xl border border-white/10 bg-[#032b59]/80 p-4"
                      >
                        <p className="font-semibold text-white">{control.label}</p>
                        <p className="mt-2 text-sm leading-6 text-[#C4DEFD]">{control.impact}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4DEFD]">
                  Review questions
                </p>
                <div className="mt-5 space-y-4">
                  {scenario.reviewQuestions.map((question) => (
                    <div key={question} className="rounded-2xl border border-white/10 bg-[#032b59]/80 p-4">
                      <p className="leading-relaxed text-white/84">{question}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[32px] border border-[#dbe8f7] bg-white/90 p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
              Incident timeline
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-[48px]">
              Reviewable event stream
            </h2>
            <div className="mt-8 space-y-4">
              {scenario.events.map((event) => (
                <div
                  key={`${event.time}-${event.action}`}
                  className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm font-mono tracking-[0.18em] text-[#4F9CF9]">
                      {event.time}
                    </p>
                    <span className="rounded-full bg-[#043873] px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#FFE492]">
                      {event.status}
                    </span>
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#043873]">{event.action}</p>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#4F9CF9]">
                    {event.actor}
                  </p>
                  <p className="mt-3 leading-relaxed text-[#043873]/75">{event.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[32px] border border-[#dbe8f7] bg-white/90 p-8 shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
                Presentation takeaways
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-[48px]">
                Final-demo talking points
              </h2>
              <div className="mt-8 space-y-4">
                {scenario.presentationTakeaways.map((takeaway) => (
                  <div
                    key={takeaway}
                    className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-5"
                  >
                    <p className="leading-relaxed text-[#043873]/78">{takeaway}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-[#dbe8f7] bg-gradient-to-br from-[#043873] to-[#032b59] p-8 text-white shadow-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4DEFD]">
                Security skills status
              </p>
              <div className="mt-6 space-y-4">
                {securitySkillStatus.map((skill) => (
                  <div key={skill.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-white">{skill.name}</p>
                      <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFE492]">
                        {skill.status}
                      </span>
                    </div>
                    <p className="mt-3 leading-relaxed text-white/75">{skill.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#FFE492] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] rounded-[32px] bg-white/75 p-10 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[780px] space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
                Reversible by design
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
                Still easy to replace if the project pivots
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                Even with the new interactivity, the lab stays isolated to one route plus a
                local model and engine. If you switch to the MFA fallback later, we can remove
                this feature without touching the rest of the site architecture.
              </p>
            </div>

            <Link
              href="/codex-in-practice"
              className="inline-flex items-center justify-center rounded-xl bg-[#043873] px-8 py-4 text-[18px] font-medium text-white transition-all hover:bg-[#032b59] hover:shadow-lg"
            >
              Continue Through The Site
            </Link>
          </div>
        </ScrollAnimate>
      </section>
    </>
  );
}
