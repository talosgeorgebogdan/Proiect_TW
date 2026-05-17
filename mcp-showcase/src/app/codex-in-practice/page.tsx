import type { Metadata } from 'next';
import Link from 'next/link';

import ScrollAnimate from '../ScrollAnimate';
import SiteHeader from '../SiteHeader';

export const metadata: Metadata = {
  title: 'Codex In Practice | MCP Hub',
  description:
    'How Codex was used in practice for AI-assisted web development, including features, refinement, evaluation, best practices, and deployment.',
};

const featureCards = [
  {
    label: 'UI',
    icon: '🖼️',
    title: 'UI Generation',
    description:
      'Codex helped generate layout ideas, section structure, card patterns, and presentation-friendly page composition instead of starting from a blank screen.',
  },
  {
    label: 'LAY',
    icon: '🧱',
    title: 'Layout Creation',
    description:
      'It supported the transformation from one landing page into a small multi-page presentation site with clear routing, section rhythm, and visual hierarchy.',
  },
  {
    label: 'CODE',
    icon: '💡',
    title: 'Code Assistance',
    description:
      'Codex handled iterative editing, rewriting copy, refining TSX structure, and keeping the project aligned with Next.js App Router conventions.',
  },
  {
    label: 'VRFY',
    icon: '🧪',
    title: 'Verification',
    description:
      'It did not stop at generation. The workflow also included route checks, browser validation, and runtime verification after changes were made.',
  },
];

const processSteps = [
  {
    step: '01',
    icon: '✨',
    title: 'Generate',
    description:
      'Codex produced the first usable structures, content blocks, and component-level ideas for the site.',
  },
  {
    step: '02',
    icon: '🛠️',
    title: 'Customize',
    description:
      'The generated output was then refined by changing layout, content accuracy, navigation, page scope, and visual language.',
  },
  {
    step: '03',
    icon: '🔍',
    title: 'Evaluate',
    description:
      'Each pass was checked for clarity, route behavior, polish, and whether the result actually fit the assignment requirements.',
  },
  {
    step: '04',
    icon: '🚀',
    title: 'Prepare To Deploy',
    description:
      'The final structure was shaped into a deployment-ready Next.js site with clean navigation and presentation-focused pages.',
  },
];

const evaluationCards = [
  {
    title: 'Structure',
    score: 'Strong',
    icon: '🏗️',
    description:
      'The site is now organized into distinct pages with clearer responsibilities: general overview, MCPs used, skills used, and Codex in practice.',
  },
  {
    title: 'Responsiveness',
    score: 'Good',
    icon: '📱',
    description:
      'The design uses responsive spacing, stacked layouts, and breakpoint-based section behavior that hold together well across desktop and smaller screens.',
  },
  {
    title: 'Usability',
    score: 'Good',
    icon: '🧭',
    description:
      'The presentation flow is easy to follow, and the cross-page navigation now makes the site feel more like a guided showcase than isolated pages.',
  },
];

const limitCards = [
  {
    icon: '⚠️',
    title: 'Limitations',
    bullets: [
      'AI can generate generic layouts if visual direction is not stated clearly.',
      'Generated copy may sound correct while still missing assignment-specific requirements.',
      'Structure can look complete before the content is academically aligned.',
    ],
  },
  {
    icon: '✅',
    title: 'Best Practices',
    bullets: [
      'Treat AI output as a draft, not a finished deliverable.',
      'Iterate in small passes: generate, inspect, refine, verify.',
      'Keep humans responsible for truthfulness, polish, and final evaluation.',
    ],
  },
];

export default function CodexInPracticePage() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden">
      <SiteHeader currentPage="codex" />

      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute left-1/2 top-8 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#4F9CF9]/25 blur-[110px]"></div>
        <ScrollAnimate className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFE492] animate-pulse"></span>
            The AI-assisted development process behind the site
          </div>

          <div className="max-w-[860px] space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
              Codex In Practice
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              This page explains how Codex functioned as the main AI-assisted web development tool for the project. It covers what features were used, how the generated output was refined, how the final result can be evaluated, and what limitations and best practices matter when building with AI.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">This page covers</p>
              <p className="mt-2 text-lg font-semibold text-white">Codex as the AI platform/tool</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">This page covers</p>
              <p className="mt-2 text-lg font-semibold text-white">Generation, refinement, and evaluation</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">This page covers</p>
              <p className="mt-2 text-lg font-semibold text-white">Best practices and deployment path</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">What Codex Was Used For</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The assignment mentions platforms such as Lovable, but the actual tool used in this project was Codex. In practice, it filled the same broader academic role: accelerating web development through AI-assisted generation, iteration, and guided refinement.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-[#dbe8f7] bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.22em] text-[#4F9CF9]">{item.label}</span>
                  <span className={`flex h-18 w-18 items-center justify-center rounded-3xl text-4xl shadow-xl transition-all duration-300 ${index === 0 ? 'bg-[#EAF4FF]' : index === 1 ? 'bg-[#FFF4C8]' : index === 2 ? 'bg-[#E9F7FF]' : 'bg-[#E8FFF4]'} group-hover:scale-110 ${index % 2 === 0 ? 'group-hover:-rotate-6' : 'group-hover:rotate-6'}`}>
                    {item.icon}
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
            <h2 className="text-5xl font-bold tracking-tight md:text-[64px]">How The Site Was Built With Codex</h2>
            <p className="text-[18px] leading-[30px] text-white/85">
              The workflow was not one-shot generation. It was iterative. Codex helped produce the initial structure, then each pass of the site was customized, checked, and refined until it better matched the project goals.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {processSteps.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur transition-all duration-300 hover:-translate-y-3 hover:bg-white/10"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.22em] text-[#C4DEFD]">{item.step}</span>
                  <span className={`flex h-18 w-18 items-center justify-center rounded-3xl text-4xl shadow-xl ring-4 ring-white/10 transition-all duration-300 ${index === 0 ? 'bg-[#4F9CF9]' : index === 1 ? 'bg-[#FFE492] text-[#043873]' : index === 2 ? 'bg-white text-[#043873]' : 'bg-[#0acf83]'} group-hover:scale-110 ${index % 2 === 0 ? 'group-hover:-rotate-6' : 'group-hover:rotate-6'}`}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">{item.title}</h3>
                <p className="leading-relaxed text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-8">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">Evaluating The Generated Output</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              An AI-generated site should not only look impressive. It should also be evaluated critically for structure, responsiveness, and usability after the generation phase is over.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {evaluationCards.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-white bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="rounded-full bg-[#043873]/5 px-4 py-2 text-sm font-semibold text-[#4F9CF9]">
                    {item.score}
                  </span>
                  <span className={`flex h-18 w-18 items-center justify-center rounded-3xl text-4xl shadow-xl transition-all duration-300 ${index === 0 ? 'bg-[#EAF4FF]' : index === 1 ? 'bg-[#FFF4C8]' : 'bg-[#E8FFF4]'} group-hover:scale-110 ${index % 2 === 0 ? 'group-hover:-rotate-6' : 'group-hover:rotate-6'}`}>
                    {item.icon}
                  </span>
                </div>
                <h3 className="mb-4 text-2xl font-bold text-[#043873]">{item.title}</h3>
                <p className="leading-relaxed text-[#043873]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto grid max-w-[1200px] gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {limitCards.map((item, index) => (
            <div
              key={item.title}
              className={`rounded-[32px] p-10 shadow-xl ${index === 0 ? 'bg-gradient-to-br from-[#FFF4C8] to-white border border-[#FFE492]/40' : 'bg-gradient-to-br from-[#EAF4FF] to-white border border-[#4F9CF9]/20'}`}
            >
              <div className="mb-6 flex items-center gap-4">
                <span className={`flex h-18 w-18 items-center justify-center rounded-3xl text-4xl shadow-xl ${index === 0 ? 'bg-[#FFE492] text-[#043873]' : 'bg-[#4F9CF9] text-white'}`}>
                  {item.icon}
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-[#043873]">{item.title}</h2>
              </div>
              <div className="space-y-4">
                {item.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3">
                    <span className="mt-1 text-[#4F9CF9]">•</span>
                    <p className="leading-relaxed text-[#043873]/80">{bullet}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollAnimate>
      </section>

      <section className="bg-[#FFE492] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] rounded-[32px] bg-white/75 p-10 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[780px] space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
                Deployment
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
                Deployment-ready with a clear path to Vercel
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                Because the project is built with Next.js, the most natural deployment platform is Vercel. The site is already structured like a presentation-ready web app, so deployment mainly means pushing the repository and connecting it to a production environment. In an academic presentation, this section can be used to explain the deployment workflow even if the live deployment is handled at the final step.
              </p>
            </div>

            <div className="rounded-3xl bg-[#043873] px-8 py-8 text-white shadow-2xl lg:max-w-[320px]">
              <p className="text-sm font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">
                Typical flow
              </p>
              <div className="mt-4 space-y-3 text-[17px] leading-7 text-white/85">
                <p>1. Push the repository</p>
                <p>2. Connect the project to Vercel</p>
                <p>3. Build and review the production output</p>
                <p>4. Share the deployed presentation link</p>
              </div>
            </div>
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
            <Link href="/skills-used" className="hover:text-[#FFE492] transition-colors">
              Skills Used
            </Link>
            <Link href="/codex-in-practice" className="font-medium text-[#FFE492]">
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
