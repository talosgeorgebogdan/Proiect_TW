'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import ScrollAnimate from '../ScrollAnimate';
import { accessScenarios, mfaMethods } from '@/lib/mfa-lab/data';
import { evaluateAccessAttempt, getGeneratedCode } from '@/lib/mfa-lab/engine';
import type { MfaMethodId, Severity } from '@/lib/mfa-lab/types';

const alertStyles: Record<Severity, string> = {
  critical: 'border-red-400/35 bg-red-500/10 text-red-100',
  high: 'border-orange-300/35 bg-orange-400/10 text-orange-100',
  medium: 'border-yellow-300/35 bg-yellow-300/10 text-yellow-50',
  low: 'border-emerald-300/35 bg-emerald-400/10 text-emerald-50',
};

const factorLegend = [
  {
    label: 'Knowledge',
    meaning: 'Something the user knows, such as a password.',
  },
  {
    label: 'Possession',
    meaning: 'Something the user has, such as a phone, passkey, or authenticator app.',
  },
  {
    label: 'Inherence',
    meaning: 'Something the user is, such as biometric confirmation.',
  },
];

function riskBadge(score: number) {
  if (score >= 70) return 'Strong policy';
  if (score >= 45) return 'Moderate policy';
  return 'Weak policy';
}

export default function MfaLabExperience() {
  const [selectedScenarioSlug, setSelectedScenarioSlug] = useState(accessScenarios[0].slug);
  const [completedMethods, setCompletedMethods] = useState<MfaMethodId[]>(['password']);
  const [verificationInputs, setVerificationInputs] = useState<Record<string, string>>({});
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const scenario =
    accessScenarios.find((item) => item.slug === selectedScenarioSlug) ?? accessScenarios[0];

  const evaluation = useMemo(
    () => evaluateAccessAttempt(scenario, completedMethods),
    [completedMethods, scenario]
  );

  function resetForScenario(slug: string) {
    setSelectedScenarioSlug(slug);
    setCompletedMethods(['password']);
    setVerificationInputs({});
  }

  function toggleMethod(methodId: MfaMethodId) {
    if (methodId === 'password') {
      return;
    }

    setCompletedMethods((current) =>
      current.includes(methodId)
        ? current.filter((item) => item !== methodId)
        : [...current, methodId]
    );
  }

  function updateVerificationInput(key: string, value: string) {
    setVerificationInputs((current) => ({
      ...current,
      [key]: value,
    }));
  }

  return (
    <>
      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute left-20 top-10 h-[340px] w-[340px] rounded-full bg-[#4F9CF9]/20 blur-[110px]"></div>
        <div className="absolute right-16 top-8 h-[320px] w-[320px] rounded-full bg-[#FFE492]/15 blur-[110px]"></div>
        <ScrollAnimate className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FFE492]"></span>
            Multi-factor authentication and suspicious access alerting
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
                MFA Secure Access Lab
              </h1>
              <p className="text-[18px] leading-[30px] text-white/90">
                This route follows the first project idea from the course sheet: a multi-factor
                authentication system with unauthorized access alerting. It explains the security
                design, while the separate login route now implements a real password + MFA gate
                for the website.
              </p>
              <p className="text-[18px] leading-[30px] text-white/80">
                Think of this page as the presentation companion to the working feature: you can
                select scenarios, compare factor strength, inspect alerts, and then jump into the
                actual sign-in flow to prove the implementation works.
              </p>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.22em] text-[#C4DEFD]">
                    Current policy score
                  </p>
                  <p className="mt-3 text-6xl font-bold text-white">{evaluation.policyScore}</p>
                  <p className="mt-3 text-lg font-medium text-[#FFE492]">
                    {riskBadge(evaluation.policyScore)}
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#032b59]/80 px-5 py-4 text-right">
                  <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                    Access result
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {evaluation.unlocked ? 'Access granted' : 'Access challenged'}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Required factors</p>
                  <p className="mt-2 text-lg font-semibold text-white">{scenario.requiredMethods.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Available methods</p>
                  <p className="mt-2 text-lg font-semibold text-white">{mfaMethods.length}</p>
                </div>
              </div>
              <Link
                href="/login"
                className="mt-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#FFE492] to-[#ffd966] px-6 py-4 text-[18px] font-semibold text-[#043873] transition-all hover:shadow-lg hover:shadow-[#FFE492]/40"
              >
                Open Real MFA Login
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {factorLegend.map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">{item.label}</p>
                <p className="mt-3 text-base leading-7 text-white/85">{item.meaning}</p>
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
                Access Scenarios
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                Each scenario represents a different risk level and decides how much
                authentication friction and alerting the system should apply.
              </p>
            </div>

            <div className="grid gap-4">
              {accessScenarios.map((item) => {
                const isActive = item.slug === scenario.slug;

                return (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => resetForScenario(item.slug)}
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
                          {item.riskLevel} risk
                        </p>
                        <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
                      </div>
                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          isActive ? 'bg-white/10 text-[#FFE492]' : 'bg-[#EAF4FF] text-[#043873]'
                        }`}
                      >
                        {isActive ? 'active' : 'select'}
                      </span>
                    </div>
                    <p className={`mt-5 leading-relaxed ${isActive ? 'text-white/82' : 'text-[#043873]/78'}`}>
                      {item.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[32px] border border-[#dbe8f7] bg-[#f8fbff] p-8 shadow-xl">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#4F9CF9]">
              Scenario details
            </p>
            <h3 className="mt-3 text-3xl font-bold text-[#043873]">{scenario.audience}</h3>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#dbe8f7] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4F9CF9]">Required factors</p>
                <p className="mt-2 leading-relaxed text-[#043873]/80">
                  {scenario.requiredMethods.join(', ')}
                </p>
              </div>
              <div className="rounded-2xl border border-[#dbe8f7] bg-white p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4F9CF9]">Recommended methods</p>
                <p className="mt-2 leading-relaxed text-[#043873]/80">
                  {scenario.recommendedMethods.join(', ')}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {scenario.triggers.map((trigger) => (
                <div key={trigger} className="rounded-2xl border border-[#dbe8f7] bg-white p-4">
                  <p className="leading-relaxed text-[#043873]/78">{trigger}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#043873] px-8 py-20 text-white lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">
              MFA Methods
            </h2>
            <p className="text-[18px] leading-[30px] text-white/82">
              The project requirement asks for password plus generated codes and at least
              five distinct methods. This route includes seven clearly separated factors.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mfaMethods.map((method) => {
              const generatedCode = getGeneratedCode(method, now);
              const enabled = completedMethods.includes(method.id);

              return (
                <div
                  key={method.id}
                  className={`rounded-[28px] border p-6 shadow-lg transition-all duration-300 ${
                    enabled
                      ? 'border-[#4F9CF9] bg-white/10'
                      : 'border-white/10 bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">
                        {method.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-bold text-white">{method.name}</h3>
                    </div>
                    {method.id === 'password' ? (
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-[#FFE492]">
                        always required
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleMethod(method.id)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          enabled
                            ? 'bg-[#4F9CF9] text-white'
                            : 'bg-white text-[#043873]'
                        }`}
                      >
                        {enabled ? 'selected' : 'enable'}
                      </button>
                    )}
                  </div>

                  <p className="mt-4 leading-relaxed text-white/82">{method.shortDescription}</p>
                  <p className="mt-4 text-sm leading-6 text-[#C4DEFD]">{method.securityValue}</p>
                  <p className="mt-4 text-sm leading-6 text-white/65">{method.limitations}</p>

                  {generatedCode ? (
                    <div className="mt-5 rounded-2xl border border-white/10 bg-[#032b59]/80 p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">
                        Generated demo code
                      </p>
                      <p className="mt-2 font-mono text-3xl font-bold tracking-[0.3em] text-[#FFE492]">
                        {generatedCode}
                      </p>
                      <p className="mt-2 text-xs text-white/60">
                        Rotates locally to simulate one-time verification behavior.
                      </p>
                      <input
                        value={verificationInputs[method.id] ?? ''}
                        onChange={(event) => updateVerificationInput(method.id, event.target.value)}
                        placeholder="Type the code if you want to compare visually"
                        className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40"
                      />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[32px] border border-white bg-white/90 p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
              Access evaluation
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-[48px]">
              Is the login strong enough?
            </h2>
            <p className="mt-4 text-[18px] leading-[30px] text-[#043873]/80">
              The engine checks whether the selected authentication methods satisfy the
              current risk scenario. Password is always present, but higher-risk logins need
              stronger step-up factors.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4F9CF9]">Completed methods</p>
                <p className="mt-3 text-lg font-semibold text-[#043873]">
                  {evaluation.completedMethods.join(', ')}
                </p>
              </div>
              <div className="rounded-2xl border border-[#dbe8f7] bg-[#f8fbff] p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[#4F9CF9]">Missing methods</p>
                <p className="mt-3 text-lg font-semibold text-[#043873]">
                  {evaluation.missingMethods.length > 0
                    ? evaluation.missingMethods.join(', ')
                    : 'none'}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[28px] bg-[#043873] p-6 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-[#C4DEFD]">Policy result</p>
              <p className="mt-3 text-2xl font-bold">
                {evaluation.unlocked ? 'Authentication requirements satisfied' : 'Additional verification required'}
              </p>
              <p className="mt-3 text-[17px] leading-[30px] text-white/80">
                {evaluation.summary}
              </p>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#dbe8f7] bg-[#043873] p-8 text-white shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4DEFD]">
              Unauthorized access alerting
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-[48px]">
              Security notification feed
            </h2>
            <div className="mt-8 space-y-4">
              {evaluation.alerts.length > 0 ? (
                evaluation.alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`rounded-2xl border p-5 ${alertStyles[alert.severity]}`}
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.18em]">
                      {alert.severity}
                    </p>
                    <p className="mt-2 text-lg font-semibold">{alert.title}</p>
                    <p className="mt-3 leading-relaxed text-current/85">{alert.detail}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="leading-relaxed text-white/78">
                    No suspicious alert is generated for this scenario once the required factors
                    are satisfied.
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#FFE492] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] rounded-[32px] bg-white/75 p-10 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[780px] space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
                Documentation angle
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
                What this demonstrates for the final project
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                This route supports the course requirement by explaining the MFA design, while the
                website now also includes a protected login route with password validation, real
                second-factor verification, and a secure portal that stays blocked until MFA
                succeeds.
              </p>
            </div>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl bg-[#043873] px-8 py-4 text-[18px] font-medium text-white transition-all hover:bg-[#032b59] hover:shadow-lg"
            >
              Try The Protected Portal
            </Link>
          </div>
        </ScrollAnimate>
      </section>
    </>
  );
}
