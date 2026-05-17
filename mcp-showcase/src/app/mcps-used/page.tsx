import type { Metadata } from 'next';
import Link from 'next/link';

import ScrollAnimate from '../ScrollAnimate';

export const metadata: Metadata = {
  title: 'MCPs Used | MCP Hub',
  description:
    'Project-specific overview of the MCP servers used to build the site and how they improved the workflow.',
};

const mcpCards = [
  {
    code: 'DC',
    name: 'Desktop Commander',
    accent: '#4F9CF9',
    icon: 'terminal',
    summary:
      'This was the local workspace bridge. It let the assistant inspect files, read project structure, manage small edits, and understand what already existed in the repo before changing anything.',
    whatItDoes:
      'Provides local filesystem access and command execution so the assistant can work directly with the project instead of guessing from chat context alone.',
    howWeUsedIt:
      'We used it to inspect the repo, read key files like `page.tsx`, `layout.tsx`, and project instructions, check git status, and manage project housekeeping such as the new `.gitignore`.',
    whyItHelped:
      'It turned the assistant from a generic explainer into a real pair-programming collaborator with awareness of the current codebase.',
    role: 'Core build workflow',
  },
  {
    code: 'ND',
    name: 'Next DevTools MCP',
    accent: '#FFE492',
    icon: 'spark',
    summary:
      'This was the runtime intelligence layer for the Next.js app. It let us confirm the dev server, check route health, and verify that new pages actually worked in the running application.',
    whatItDoes:
      'Connects the assistant to a running Next.js 16 development server so it can inspect routes, gather diagnostics, and validate runtime behavior.',
    howWeUsedIt:
      'We used it to confirm the app was running on `localhost:3000`, check `get_errors`, load the new `/mcps-used` and `/skills-used` routes, and verify that the browser-facing result matched the code changes.',
    whyItHelped:
      'It gave us confidence that the site was not only coded correctly, but also rendering correctly in the actual Next.js environment.',
    role: 'Primary verification workflow',
  },
  {
    code: 'CD',
    name: 'Chrome DevTools MCP',
    accent: '#C4DEFD',
    icon: 'browser',
    summary:
      'This played a lighter but still useful role. It confirmed browser automation connectivity and helped prove that browser-side tooling was available for interactive inspection when needed.',
    whatItDoes:
      'Exposes a real browser context to the assistant for page inspection, screenshots, console access, and interactive UI verification.',
    howWeUsedIt:
      'In this project, we primarily used it to verify that the browser-side MCP pipeline was connected and responsive before leaning more heavily on Next-focused verification tools.',
    whyItHelped:
      'Even a small validation step matters, because once browser control is confirmed, richer visual and interaction testing becomes available for later iterations.',
    role: 'Supportive verification layer',
  },
];

const journey = [
  {
    step: '01',
    title: 'Connect The Local Workspace',
    description:
      'We first needed direct awareness of the project files, instructions, and existing app structure.',
  },
  {
    step: '02',
    title: 'Connect The Next.js Runtime',
    description:
      'Once the dev server was running, we connected the assistant to the live application instead of trusting static code alone.',
  },
  {
    step: '03',
    title: 'Verify Browser Tooling',
    description:
      'We also confirmed browser automation support so the project could be tested beyond simple code edits.',
  },
];

const impactCards = [
  {
    label: 'Context',
    title: 'Less Guessing',
    description:
      'MCPs gave the assistant real project context instead of making it infer everything from partial prompts.',
  },
  {
    label: 'Verification',
    title: 'Faster Feedback',
    description:
      'We could check routes, runtime status, and browser behavior as soon as changes were made.',
  },
  {
    label: 'Workflow',
    title: 'More Trust',
    description:
      'Each MCP reduced the gap between a chat response and a grounded, verifiable development action.',
  },
];

export default function McpsUsedPage() {
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
          <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[#FFE492]">
            MCPs Used
          </span>
          <Link href="/skills-used" className="relative group hover:text-[#FFE492] transition-colors">
            Skills Used
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
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
            href="/skills-used"
            className="px-5 py-3 rounded-lg border border-white/15 text-[16px] font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Next Page
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute left-1/2 top-8 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#4F9CF9]/25 blur-[110px]"></div>
        <ScrollAnimate className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFE492] animate-pulse"></span>
            Real MCP stack used while building the project
          </div>

          <div className="max-w-[820px] space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
              The MCPs Behind The Build
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              This page explains the Model Context Protocol servers we actually connected during development. Instead of talking about MCPs in the abstract, it shows how they gave the assistant local context, runtime awareness, and browser-side verification while building this site.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Used for</p>
              <p className="mt-2 text-lg font-semibold text-white">Reading and shaping the workspace</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Used for</p>
              <p className="mt-2 text-lg font-semibold text-white">Checking the live Next.js app</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Used for</p>
              <p className="mt-2 text-lg font-semibold text-white">Confirming browser tooling was available</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto flex max-w-[1200px] flex-col gap-10">
          <div className="max-w-[760px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">How The Workflow Evolved</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The project did not start with design alone. It started by connecting the assistant to the right layers of context so every later design and code decision could be grounded in the real environment.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {journey.map((item, index) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-[#dbe8f7] bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-[0.22em] text-[#4F9CF9]">{item.step}</span>
                  <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#EAF4FF] text-4xl shadow-lg ring-1 ring-[#d7e8ff] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    {index === 0 ? '🗂️' : index === 1 ? '⚙️' : '🌐'}
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
            <h2 className="text-5xl font-bold tracking-tight md:text-[64px]">MCP By MCP</h2>
            <p className="text-[18px] leading-[30px] text-white/85">
              Each MCP played a different role. Some were essential every step of the way, while others supported confidence and verification at key moments.
            </p>
          </div>

          <div className="grid gap-8">
            {mcpCards.map((item, index) => (
              <div
                key={item.name}
                className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur lg:p-10"
              >
                <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-7">
                    <div className="flex flex-wrap items-center gap-4">
                      <span
                        className="flex h-20 w-20 items-center justify-center rounded-[28px] shadow-2xl text-4xl ring-4 ring-white/10 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300"
                        style={{ backgroundColor: item.accent, color: item.code === 'ND' ? '#043873' : '#043873' }}
                      >
                        {item.code === 'DC' ? '🖥️' : item.code === 'ND' ? '⚡' : '🌐'}
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
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">What it does</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.whatItDoes}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">How we used it</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.howWeUsedIt}</p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-[#032b59]/70 p-5">
                        <p className="text-xs font-mono uppercase tracking-[0.18em] text-[#C4DEFD]">Why it helped</p>
                        <p className="mt-3 leading-relaxed text-white/80">{item.whyItHelped}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 rounded-[28px] bg-gradient-to-br from-white/10 to-white/5 p-8">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C4DEFD]">Project usage snapshot</p>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                        {index === 0 ? 'heavy use' : index === 1 ? 'frequent use' : 'light use'}
                      </span>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#043873]/60 p-6">
                      <div className="mb-4 flex items-center gap-3 text-[#FFE492]">
                        <span className="text-2xl drop-shadow-md">📌</span>
                        <span className="text-sm font-mono tracking-[0.18em] uppercase">Contribution</span>
                      </div>
                      <p className="text-[17px] leading-[30px] text-white/80">
                        {index === 0
                          ? 'Without this MCP, the assistant would not have been able to inspect the repo, understand local files, or work with the codebase in a grounded way.'
                          : index === 1
                          ? 'Without this MCP, we would have been validating the app much more blindly, with less visibility into route behavior and runtime status.'
                          : 'Without this MCP, we would have had one less proof point that the browser-side toolchain was ready for richer visual testing.'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#043873]/60 p-6">
                      <div className="mb-4 flex items-center gap-3 text-[#FFE492]">
                        <span className="text-2xl drop-shadow-md">🛡️</span>
                        <span className="text-sm font-mono tracking-[0.18em] uppercase">Why it matters in AI development</span>
                      </div>
                      <p className="text-[17px] leading-[30px] text-white/80">
                        MCPs matter because they move the assistant closer to evidence. The more grounded the assistant is in the actual environment, the more trustworthy its suggestions become.
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
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">Why These MCPs Changed The Project</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              Together, these MCPs made the workflow feel less like prompting a distant chatbot and more like collaborating with an assistant that could actually inspect, verify, and respond to the real project.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {impactCards.map((item) => (
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
                Next page
              </p>
              <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
                Continue from MCPs to skills
              </h2>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                If MCPs are the connection layer, the next page shows the development skills that guided how the assistant used those connections while building this project.
              </p>
            </div>

            <Link
              href="/skills-used"
              className="inline-flex items-center justify-center rounded-xl bg-[#043873] px-8 py-4 text-[18px] font-medium text-white transition-all hover:bg-[#032b59] hover:shadow-lg"
            >
              Open Skills Used
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
            <Link href="/mcps-used" className="font-medium text-[#FFE492]">
              MCPs Used
            </Link>
            <Link href="/skills-used" className="hover:text-[#FFE492] transition-colors">
              Skills Used
            </Link>
            <Link href="/codex-in-practice" className="hover:text-[#FFE492] transition-colors">
              Codex In Practice
            </Link>
          </div>
          <Link href="/skills-used" className="hover:text-[#FFE492] transition-colors font-medium">
            Continue to Skills
          </Link>
        </div>
      </footer>
    </div>
  );
}
