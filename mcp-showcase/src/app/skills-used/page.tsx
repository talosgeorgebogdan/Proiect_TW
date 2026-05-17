import type { Metadata } from 'next';
import Link from 'next/link';

import ScrollAnimate from '../ScrollAnimate';

export const metadata: Metadata = {
  title: 'Skills Used | MCP Hub',
  description:
    'Project-specific overview of the installed skills that guided structure, verification, and design decisions.',
};

const skillCards = [
  {
    code: 'NX',
    name: 'vercel-nextjs',
    accent: '#4F9CF9',
    icon: 'layers',
    summary:
      'This skill acted like a Next.js specialist sitting beside the project. It reinforced App Router thinking, route structure awareness, and the habit of treating the running app as the real source of truth.',
    intent:
      'Designed to guide building, debugging, and architecting Next.js applications with stronger framework awareness.',
    influence:
      'It supported how the pages were approached structurally, especially around route creation, App Router conventions, and keeping the work aligned with a modern Next.js workflow.',
    value:
      'It reduced the risk of treating the app like generic React and kept the implementation grounded in how a Next.js site should actually evolve.',
    role: 'Framework guidance',
  },
  {
    code: 'RB',
    name: 'vercel-react-best-practices',
    accent: '#FFE492',
    icon: 'check',
    summary:
      'This skill played a quieter quality role. It did not dictate the whole project, but it helped frame a review mindset around JSX structure, semantics, and cleaner component decisions.',
    intent:
      'Designed as a compact React review checklist focused on structure, hooks, accessibility, performance, and TypeScript patterns.',
    influence:
      'Its biggest contribution here was reinforcing cleaner TSX composition and making sure the presentation pages stayed readable, semantic, and not overly tangled.',
    value:
      'It helps the assistant pause and think like a reviewer instead of only thinking like a generator.',
    role: 'Quality control',
  },
  {
    code: 'VF',
    name: 'vercel-verification',
    accent: '#C4DEFD',
    icon: 'pulse',
    summary:
      'This skill had a very practical effect because the project repeatedly depended on live verification. It encouraged checking the running app, not just trusting the edit.',
    intent:
      'Designed to verify the full story of a feature by looking at the browser, runtime, and real application state with evidence.',
    influence:
      'It aligned well with the way we used the Next.js runtime and browser tools to check routes, console output, and whether changes actually appeared in the app.',
    value:
      'It makes AI-assisted development safer by rewarding proof over assumption.',
    role: 'Verification mindset',
  },
  {
    code: 'FB',
    name: 'frontend-app-builder',
    accent: '#0acf83',
    icon: 'spark',
    summary:
      'This was the strongest design-oriented skill for the site itself. It pushed toward an intentional visual direction rather than a generic or flat interface.',
    intent:
      'Designed to help create visually driven frontends with stronger composition, clearer art direction, and more thoughtful presentation choices.',
    influence:
      'It matched the landing-page-first nature of this project and supported decisions around section rhythm, card styling, emphasis, and presentation energy.',
    value:
      'It helps the assistant build pages that feel designed, not merely assembled.',
    role: 'Design direction',
  },
];

const timeline = [
  {
    step: '01',
    title: 'Install Skills For Better Defaults',
    description:
      'Instead of relying only on base model behavior, we installed targeted skills so the assistant could work with stronger domain-specific instincts.',
  },
  {
    step: '02',
    title: 'Let Skills Shape Decisions',
    description:
      'The effect was not a visible plugin menu on the page, but a shift in how routing, design choices, and verification were approached during implementation.',
  },
  {
    step: '03',
    title: 'Use MCPs And Skills Together',
    description:
      'MCPs connected the assistant to real project context, while skills helped it behave more like a specialist once that context was available.',
  },
];

const reflections = [
  {
    label: 'Behavior',
    title: 'Stronger Defaults',
    description:
      'Skills quietly improved the baseline decision-making style of the assistant before any single command or edit happened.',
  },
  {
    label: 'Design',
    title: 'More Intentional UI',
    description:
      'Instead of drifting toward generic layouts, the workflow stayed focused on a presentational, high-contrast, polished site identity.',
  },
  {
    label: 'Reliability',
    title: 'Better Review Habits',
    description:
      'The project benefited from a more disciplined loop: build, inspect, verify, and refine instead of stopping after the first plausible output.',
  },
];

export default function SkillsUsedPage() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden">
      <header className="flex flex-row justify-between items-center py-4 px-8 lg:px-[220px] bg-[#043873]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 h-[92px] shadow-lg">
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-[37px] h-[29px] bg-gradient-to-br from-[#4F9CF9] to-[#FFE492] rounded-sm flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#4F9CF9]/50 transition-all">
            <div className="w-4 h-4 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-[28px] tracking-tight bg-gradient-to-r from-white to-[#C4DEFD] bg-clip-text text-transparent">
            MCP Hub
          </span>
        </Link>

        <nav className="hidden lg:flex flex-row items-center gap-8 text-[18px] font-medium">
          <Link href="/" className="relative group hover:text-[#FFE492] transition-colors">
            Overview
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link href="/mcps-used" className="relative group hover:text-[#FFE492] transition-colors">
            MCPs Used
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[#FFE492]">
            Skills Used
          </span>
          <Link href="/codex-in-practice" className="relative group hover:text-[#FFE492] transition-colors">
            Codex In Practice
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="hidden md:flex flex-row items-center gap-4">
          <Link
            href="/"
            className="px-5 py-3 rounded-lg border border-white/15 text-[16px] font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Overview
          </Link>
          <Link
            href="/mcps-used"
            className="px-5 py-3 rounded-lg border border-white/15 text-[16px] font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Previous Page
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute right-16 top-10 h-[380px] w-[380px] rounded-full bg-[#FFE492]/20 blur-[110px]"></div>
        <ScrollAnimate className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#4F9CF9] animate-pulse"></span>
            Installed skills that shaped the development workflow
          </div>

          <div className="max-w-[820px] space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
              The Skills Behind The Decisions
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              Skills are not external services like MCPs. They are local instruction layers that help the assistant behave more like a specialist. In this project, they influenced how the site was structured, reviewed, verified, and visually refined.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Skills changed</p>
              <p className="mt-2 text-lg font-semibold text-white">How the assistant approached the work</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Skills changed</p>
              <p className="mt-2 text-lg font-semibold text-white">What good output looked like</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Skills changed</p>
              <p className="mt-2 text-lg font-semibold text-white">How much we trusted the final result</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">How Skills Fit Into The Workflow</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The effect of a skill is subtle compared to an MCP. An MCP gives the assistant access to something real. A skill shapes how the assistant thinks once that access exists.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-[#dbe8f7] bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.22em] text-[#4F9CF9]">{item.step}</span>
                  <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF4FF] text-4xl shadow-lg ring-1 ring-[#d7e8ff] group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {index === 0 ? '🧭' : index === 1 ? '🧱' : '🔗'}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[#043873]">{item.title}</h3>
                <p className="leading-relaxed text-[#043873]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#043873] px-8 py-20 text-white lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <div className="max-w-[800px] space-y-5">
            <h2 className="text-5xl font-bold tracking-tight md:text-[64px]">Skill By Skill</h2>
            <p className="text-[18px] leading-[30px] text-white/85">
              These were the local skills installed for the project. Each one contributed a different kind of guidance: framework awareness, review discipline, verification habits, or design direction.
            </p>
          </div>

          <div className="grid gap-8">
            {skillCards.map((item) => (
              <div
                key={item.name}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur lg:p-10"
              >
                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-7">
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className="flex h-20 w-20 items-center justify-center rounded-[28px] shadow-2xl text-[#043873] ring-4 ring-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ backgroundColor: item.accent }}
                      >
                        <span className="text-4xl drop-shadow-md">
                          {item.code === 'NX'
                            ? '▲'
                            : item.code === 'RB'
                            ? '✅'
                            : item.code === 'VF'
                            ? '📡'
                            : '🎨'}
                        </span>
                      </span>
                      <div>
                        <p className="text-xs font-mono tracking-[0.22em] text-[#C4DEFD]">{item.code}</p>
                        <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[#FFE492]">
                        {item.role}
                      </span>
                    </div>

                    <p className="max-w-[720px] text-[18px] leading-[30px] text-white/85">
                      {item.summary}
                    </p>

                    <div className="grid gap-5 md:grid-cols-3">
                      <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">Intent</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.intent}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">Influence here</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.influence}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">Value</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.value}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 p-8">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4DEFD]">How to think about it</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                        local guidance
                      </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#043873]/60 p-6">
                      <div className="mb-4 flex items-center gap-3 text-[#FFE492]">
                        <span className="text-2xl drop-shadow-md">🧭</span>
                        <span className="text-sm font-mono tracking-[0.18em] uppercase">What makes skills different</span>
                      </div>
                      <p className="text-[17px] leading-[30px] text-white/80">
                        This skill did not fetch data or control the app directly. Instead, it shaped the assistant&apos;s behavior so the work reflected better defaults for this kind of project.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#043873]/60 p-6">
                      <div className="mb-4 flex items-center gap-3 text-[#FFE492]">
                        <span className="text-2xl drop-shadow-md">✨</span>
                        <span className="text-sm font-mono tracking-[0.18em] uppercase">Why it mattered here</span>
                      </div>
                      <p className="text-[17px] leading-[30px] text-white/80">
                        In this project, the best results came from combining live MCP context with skills that improved structure, review habits, and visual decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">What Skills Added To The Project</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The most important thing these skills added was not a flashy feature. It was a better development posture: more framework awareness, more thoughtful UI decisions, and more respect for verification.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {reflections.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <p className="mb-3 text-xs font-mono tracking-[0.2em] text-[#4F9CF9]">{item.label}</p>
                <h3 className="mb-4 text-2xl font-bold text-[#043873]">{item.title}</h3>
                <p className="leading-relaxed text-[#043873]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#FFE492] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] rounded-[32px] bg-white/75 p-10 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px] space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
                Final perspective
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
                MCPs connected the assistant. Skills refined the assistant.
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                That combination is the main lesson of this project: better AI development does not come only from access to tools, but also from giving the assistant better habits for how to use them.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-[#043873] px-8 py-4 text-[18px] font-medium text-white transition-all hover:bg-[#032b59] hover:shadow-lg"
            >
              Back To Main Page
            </Link>
          </div>
        </ScrollAnimate>
      </section>

      <footer className="bg-[#032b59] text-white py-12 px-8 lg:px-[220px] border-t border-white/10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[24px] bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-[#043873] rounded-sm"></div>
            </div>
            <span className="font-bold text-xl tracking-tight">MCP Hub</span>
          </div>
          <p className="text-sm text-white/60 text-center md:text-left">
            A presentation site about MCPs, skills, and AI-assisted development workflows.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/80">
            <Link href="/" className="hover:text-[#FFE492] transition-colors">
              Overview
            </Link>
            <Link href="/mcps-used" className="hover:text-[#FFE492] transition-colors">
              MCPs Used
            </Link>
            <Link href="/skills-used" className="font-medium text-[#FFE492]">
              Skills Used
            </Link>
            <Link href="/codex-in-practice" className="hover:text-[#FFE492] transition-colors">
              Codex In Practice
            </Link>
          </div>
          <Link href="/" className="hover:text-[#FFE492] transition-colors font-medium">
            Back to Main Page
          </Link>
        </div>
      </footer>
    </div>
  );
}
