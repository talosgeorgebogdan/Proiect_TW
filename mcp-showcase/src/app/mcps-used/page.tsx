import Link from 'next/link';

import ScrollAnimate from '../ScrollAnimate';

const placeholders = [
  {
    badge: '01',
    title: 'Overview',
    description:
      'A quick explanation of which MCPs were connected in this project and why they mattered during development.',
  },
  {
    badge: '02',
    title: 'Per-MCP Breakdown',
    description:
      'A section for each MCP with what it does, how we used it, and the concrete benefit it brought to the workflow.',
  },
  {
    badge: '03',
    title: 'Live Examples',
    description:
      'A future space for screenshots, terminal snippets, or short demos showing the MCPs in action inside this project.',
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
            General Intro
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
          <span className="text-[#FFE492]">MCPs Used</span>
          <Link href="/skills-used" className="relative group hover:text-[#FFE492] transition-colors">
            Skills Used
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </Link>
        </nav>

        <div className="hidden md:flex flex-row items-center gap-4">
          <Link
            href="/skills-used"
            className="px-5 py-3 rounded-lg border border-white/15 text-[16px] font-medium text-white/90 hover:bg-white/10 transition-colors"
          >
            Next Page
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden px-8 py-20 lg:px-[220px] lg:py-[120px]">
        <div className="absolute left-1/2 top-10 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-[#4F9CF9]/25 blur-[100px]"></div>
        <ScrollAnimate className="relative z-10 max-w-[1200px] mx-auto flex flex-col gap-10">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-[#C4DEFD] backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFE492] animate-pulse"></span>
            Project-specific MCP walkthrough
          </div>

          <div className="max-w-[760px] space-y-6">
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white md:text-[64px]">
              MCPs Used In This Project
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              This page will document the MCP servers that helped us build the site, what each one unlocked, and how they changed the development workflow compared to using AI in isolation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Planned focus</p>
              <p className="mt-2 text-lg font-semibold text-white">What each MCP does</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Planned focus</p>
              <p className="mt-2 text-lg font-semibold text-white">How we used it here</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Planned focus</p>
              <p className="mt-2 text-lg font-semibold text-white">Why it actually helped</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-white px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] flex flex-col gap-8">
          <div className="max-w-[720px] space-y-4">
            <h2 className="text-4xl font-bold tracking-tight md:text-[56px]">Template Structure</h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              We are keeping this first version intentionally light, so the page already exists in the final style and we can fill each section carefully in the next iteration.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {placeholders.map((item) => (
              <div
                key={item.title}
                className="group rounded-3xl border border-[#dbe8f7] bg-white/90 p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <p className="mb-3 text-xs font-mono tracking-[0.2em] text-[#4F9CF9]">{item.badge}</p>
                <h3 className="mb-4 text-2xl font-bold text-[#043873]">{item.title}</h3>
                <p className="leading-relaxed text-[#043873]/80">{item.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="bg-[#FFE492] px-8 py-20 text-[#043873] lg:px-[220px] lg:py-[120px]">
        <ScrollAnimate className="mx-auto max-w-[1200px] rounded-[32px] bg-white/70 p-10 shadow-xl backdrop-blur">
          <div className="max-w-[720px] space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#4F9CF9]">
              Next iteration target
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-[52px]">
              Fill this page MCP by MCP
            </h2>
            <p className="text-[18px] leading-[30px] text-[#043873]/80">
              The next pass should turn this into a proper case-study page for `desktop-commander`, `next-devtools`, and `chrome-devtools`, including how they were used during the making of this project.
            </p>
          </div>
        </ScrollAnimate>
      </section>

      <footer className="bg-[#032b59] text-white py-12 px-8 lg:px-[220px] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[24px] bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">MCP Hub</span>
        </div>
        <p className="text-sm text-white/60 text-center md:text-left">
          A presentation site about MCPs, skills, and AI-assisted development workflows.
        </p>
        <div className="flex gap-4">
          <Link href="/skills-used" className="hover:text-[#FFE492] transition-colors font-medium">
            Continue to Skills
          </Link>
        </div>
      </footer>
    </div>
  );
}
