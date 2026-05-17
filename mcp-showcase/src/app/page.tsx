import type { Metadata } from 'next';
import Link from 'next/link';

import ScrollAnimate from './ScrollAnimate';
import SiteHeader from './SiteHeader';

export const metadata: Metadata = {
  title: 'Overview | MCP Hub',
  description:
    'General introduction to Model Context Protocol servers, skills, and AI-powered development workflows.',
};

const skillCards = [
  {
    badge: '01',
    icon: 'spark',
    title: 'Reusable Expertise',
    description:
      'Skills package domain knowledge and good habits so the assistant can approach a task like a specialist, not a blank slate.',
  },
  {
    badge: '02',
    icon: 'map',
    title: 'Better Workflow Memory',
    description:
      'They teach the assistant what to inspect first, how to structure a solution, and how to verify the result before stopping.',
  },
  {
    badge: '03',
    icon: 'shield',
    title: 'Safer Collaboration',
    description:
      'Skills reduce randomness by giving the AI stronger defaults for architecture, testing, and iteration quality.',
  },
];

const useCases = [
  {
    label: 'DB',
    icon: 'database',
    title: 'Database Architect',
    description:
      'Ask your AI agent to analyze user retention with a Postgres MCP. It can write the SQL, execute it securely, and summarize the results.',
    footer: '-> SQL analysis, dashboards, migrations',
  },
  {
    label: 'CI',
    icon: 'deploy',
    title: 'DevOps Auto-Pilot',
    description:
      'Connect GitHub and Vercel MCPs. A request like rollback the latest commit and redeploy can be translated into a real workflow.',
    footer: '-> CI/CD, deployments, rollbacks',
  },
  {
    label: 'UI',
    icon: 'figma',
    title: 'Design Engineer',
    description:
      'Connect the Figma MCP and let the assistant inspect structure, components, and design intent before generating React code.',
    footer: '-> component generation, design sync',
  },
  {
    label: 'SEC',
    icon: 'shield',
    title: 'Security Auditor',
    description:
      'Use search and repository MCPs together so the assistant can research issues, inspect code, and recommend safer changes.',
    footer: '-> vulnerability scanning, patches',
  },
  {
    label: 'MSG',
    icon: 'message',
    title: 'Team Notifier',
    description:
      'Connect communication tools so updates, summaries, and alerts can move from AI reasoning into team workflows.',
    footer: '-> notifications, team updates',
  },
  {
    label: 'OPS',
    icon: 'cloud',
    title: 'Cloud Infrastructure',
    description:
      'Use cloud-facing MCPs for file management, deployments, and broader operational tasks through natural language instructions.',
    footer: '-> cloud ops, infrastructure as code',
  },
];

const integrations = [
  ['VC', 'Vercel', '#043873'],
  ['GH', 'GitHub', '#111827'],
  ['BR', 'Brave', '#ff3e00'],
  ['FG', 'Figma', '#0acf83'],
  ['SL', 'Slack', '#e01e5a'],
  ['PG', 'Postgres', '#336791'],
  ['S3', 'AWS S3', '#F24E1E'],
];

function AnimatedIcon({
  kind,
  className = '',
}: {
  kind:
    | 'spark'
    | 'map'
    | 'shield'
    | 'database'
    | 'deploy'
    | 'figma'
    | 'message'
    | 'cloud'
    | 'plug'
    | 'server'
    | 'tool'
    | 'resource'
    | 'prompt'
    | 'brain'
    | 'route'
    | 'rpc'
    | 'act';
  className?: string;
}) {
  const base = `h-8 w-8 ${className}`;

  switch (kind) {
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M12 2l1.8 5.2L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.8L12 2z" fill="currentColor" />
        </svg>
      );
    case 'map':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2V6z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9 4v14M15 6v14" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M12 3l7 3v5c0 4.5-2.9 8.5-7 10-4.1-1.5-7-5.5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M9.5 12l1.7 1.7 3.3-3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'database':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <ellipse cx="12" cy="6" rx="6.5" ry="3" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5.5 6v8c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3V6" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5.5 10c0 1.7 2.9 3 6.5 3s6.5-1.3 6.5-3" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'deploy':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M12 3v12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="4" y="16" width="16" height="4" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M12 3H9a3 3 0 100 6h3V3zM12 9H9a3 3 0 100 6h3V9zM12 15H9a3 3 0 106 0v-3h-3v3zM12 3h3a3 3 0 110 6h-3V3zM12 9h3a3 3 0 110 6h-3V9z" fill="currentColor" />
        </svg>
      );
    case 'message':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M5 6.5h14a2 2 0 012 2v7a2 2 0 01-2 2H11l-4 3v-3H5a2 2 0 01-2-2v-7a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M8 18h9a4 4 0 001-7.9A5.5 5.5 0 007.3 8.4 4.5 4.5 0 008 18z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'plug':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M9 8V3M15 8V3M8 8h8v3a4 4 0 11-8 0V8zm4 7v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'server':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <rect x="4" y="5" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <rect x="4" y="14" width="16" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="8" cy="7.5" r="0.9" fill="currentColor" />
          <circle cx="8" cy="16.5" r="0.9" fill="currentColor" />
        </svg>
      );
    case 'tool':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M14 5a4 4 0 00-5 5L4 15l5 5 5-5a4 4 0 005-5l-3 3-4-4 3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case 'resource':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M7 3h7l5 5v13H7a2 2 0 01-2-2V5a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'prompt':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M6 4h12a2 2 0 012 2v9a2 2 0 01-2 2H9l-5 3v-3H6a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M8 9h8M8 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'brain':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M9 5a3 3 0 00-3 3v1a2.5 2.5 0 001 4.8V15a3 3 0 003 3h1V5H9zM15 5a3 3 0 013 3v1a2.5 2.5 0 01-1 4.8V15a3 3 0 01-3 3h-1V5h2z" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      );
    case 'route':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <circle cx="6" cy="6" r="2" fill="currentColor" />
          <circle cx="18" cy="18" r="2" fill="currentColor" />
          <path d="M8 6h4a4 4 0 014 4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'rpc':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-pulse`}>
          <path d="M5 8h14M5 12h14M5 16h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'act':
      return (
        <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-bounce`}>
          <path d="M12 4l7 4v8l-7 4-7-4V8l7-4z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 8v8M8.5 10l3.5 2 3.5-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function McpShowcase() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden scroll-smooth">
      <SiteHeader
        currentPage="overview"
        cta={{ href: '#what-is-mcp', label: 'Start Here' }}
        sectionLinks={[
          { href: '#what-is-mcp', label: 'What is MCP?' },
          { href: '#mcp-vs-skills', label: 'MCP vs Skills' },
          { href: '#three-primitives', label: 'Primitives' },
          { href: '#skills', label: 'Skills' },
          { href: '#ecosystem', label: 'Ecosystem' },
        ]}
      />

      <section className="flex flex-col xl:flex-row items-center justify-between py-12 px-8 lg:px-[220px] gap-16 min-h-[829px] relative overflow-hidden">
        <ScrollAnimate className="flex flex-col xl:flex-row items-center justify-between gap-16 w-full z-10">
          <div className="flex flex-col items-start gap-6 w-full xl:w-[656px]">
            <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#C4DEFD]">
              <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur">
                <span className="inline-flex items-center gap-2">
                  <AnimatedIcon kind="plug" className="h-4 w-4" />
                  open protocol
                </span>
              </span>
              <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur">
                <span className="inline-flex items-center gap-2">
                  <AnimatedIcon kind="resource" className="h-4 w-4" />
                  real context
                </span>
              </span>
              <span className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur">
                <span className="inline-flex items-center gap-2">
                  <AnimatedIcon kind="spark" className="h-4 w-4" />
                  skill-guided AI
                </span>
              </span>
            </div>

            <h1 className="font-bold text-5xl md:text-[64px] leading-tight tracking-tight text-white">
              The Universal Protocol for AI Context
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              The Model Context Protocol (MCP) is an open standard that lets AI assistants discover tools, reach live data, and take useful actions through one shared interface. It acts like a universal connection layer between models and the systems where work actually happens.
            </p>
            <a
              href="#what-is-mcp"
              className="px-6 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2 mt-4"
            >
              Learn How it Works <span className="text-xl leading-none">↓</span>
            </a>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">MCP gives AI</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Access to tools, resources, and prompts
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Skills give AI</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Better instincts for using those capabilities well
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.2em] text-[#C4DEFD]">Together they create</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  More reliable and explainable workflows
                </p>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[824px] h-[549px] flex items-center justify-center relative">
            <div className="absolute w-[400px] h-[400px] bg-[#4F9CF9]/30 rounded-full blur-[80px]"></div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 z-10 relative">
              <div className="w-32 h-32 bg-white text-[#043873] rounded-2xl flex flex-col items-center justify-center font-bold shadow-2xl border border-gray-200">
                <AnimatedIcon kind="brain" className="mb-2 text-[#4F9CF9]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#4F9CF9]">Model</span>
                <span className="text-2xl mt-2">LLM</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-16 w-1 md:w-16 md:h-1 bg-[#FFE492] rounded animate-pulse"></div>
                <span className="text-[#FFE492] text-xs font-mono absolute -top-4 md:-top-6">Requests</span>
              </div>

              <div className="w-40 h-40 bg-[#4F9CF9] text-white rounded-full flex flex-col items-center justify-center font-bold shadow-[0_0_40px_rgba(79,156,249,0.5)] border-4 border-[#C4DEFD]">
                <AnimatedIcon kind="plug" className="mb-2 text-[#FFE492]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C4DEFD]">Protocol</span>
                <span className="text-xl mt-2">MCP</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="h-16 w-1 md:w-16 md:h-1 bg-[#FFE492] rounded animate-pulse"></div>
                <span className="text-[#FFE492] text-xs font-mono absolute -bottom-4 md:-bottom-6">Context</span>
              </div>

              <div className="flex flex-row md:flex-col gap-4">
                <div className="w-24 h-24 bg-[#043873] border-2 border-[#4F9CF9] text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                  Local FS
                </div>
                <div className="w-24 h-24 bg-[#043873] border-2 border-[#4F9CF9] text-white rounded-xl flex items-center justify-center font-bold shadow-lg">
                  GitHub
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section id="what-is-mcp" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-b from-white to-gray-50 text-[#212529]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight bg-gradient-to-r from-[#043873] to-[#4F9CF9] bg-clip-text text-transparent">
              What exactly is an MCP?
            </h2>
            <p className="text-[20px] leading-[32px] text-gray-600 max-w-3xl mx-auto">
              Before MCP, every model-to-tool connection had to be built differently. MCP changes that by defining a shared way for assistants to inspect capabilities, request actions, and receive structured responses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-2xl hover:shadow-[#4F9CF9]/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-18 h-18 bg-[#4F9CF9] text-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-xl drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                🔌
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Standardized Interface</h3>
              <p className="text-gray-700 leading-relaxed">
                One protocol for many assistants. Claude, Gemini, GPT, or local models can all connect through the same contract instead of bespoke one-off integrations.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-2xl hover:shadow-[#FFE492]/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-18 h-18 bg-[#FFE492] text-[#043873] rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-xl drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                🛡️
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Secure & Local-First</h3>
              <p className="text-gray-700 leading-relaxed">
                You decide what the AI can reach. That means local files, private tools, and team systems stay under your control instead of being flattened into public prompts.
              </p>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:shadow-green-300/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-18 h-18 bg-[#0acf83] text-white rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-xl drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                🚀
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Future-Proof</h3>
              <p className="text-gray-700 leading-relaxed">
                As new tools appear, assistants do not need to relearn everything from scratch. Add a compatible MCP server and the ecosystem can expand cleanly.
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section id="mcp-vs-skills" className="py-20 lg:py-[120px] px-8 lg:px-[220px] bg-[#EAF4FF] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-12">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">
              MCPs and Skills Are Not The Same
            </h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80 max-w-3xl mx-auto">
              They complement each other. MCPs expose capability. Skills improve how the assistant reasons about that capability.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg border border-blue-100">
              <div className="inline-flex px-4 py-2 rounded-full bg-[#4F9CF9] text-white text-sm font-semibold tracking-[0.15em] uppercase">
                <AnimatedIcon kind="server" className="mr-2 h-4 w-4" />
                MCP
              </div>
              <h3 className="text-3xl font-bold mt-6 mb-4">Connection and capability layer</h3>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                An MCP server tells the assistant what tools, resources, and prompts exist. It is the bridge to real systems like browsers, files, documentation, databases, and deployment tools.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg border border-yellow-100">
              <div className="inline-flex px-4 py-2 rounded-full bg-[#FFE492] text-[#043873] text-sm font-semibold tracking-[0.15em] uppercase">
                <AnimatedIcon kind="spark" className="mr-2 h-4 w-4" />
                Skill
              </div>
              <h3 className="text-3xl font-bold mt-6 mb-4">Guidance and best-practice layer</h3>
              <p className="text-[18px] leading-[30px] text-[#043873]/80">
                A skill teaches the assistant how to work well in a domain. It can encode better architecture habits, testing loops, design expectations, or platform-specific conventions.
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section id="three-primitives" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-br from-[#032b59] to-[#043873] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F9CF9]/10 rounded-full blur-3xl -mr-48"></div>
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight bg-gradient-to-r from-[#FFE492] to-[#C4DEFD] bg-clip-text text-transparent">
              The Three Primitives
            </h2>
            <p className="text-[20px] leading-[32px] text-white/80 max-w-3xl mx-auto">
              MCP standardizes three fundamental ways for AI to interact with your world. It is not just about executing code.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#4F9CF9] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#4F9CF9]/20">
              <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform">🛠️</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Tools</h3>
              <p className="text-white/90 leading-relaxed">
                Actionable functions the AI can execute. This is where assistants stop only describing work and start doing work.
              </p>
            </div>
            <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#FFE492] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#FFE492]/20">
              <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">📄</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Resources</h3>
              <p className="text-white/90 leading-relaxed">
                Expose live information to the AI. Instead of guessing, the assistant can inspect actual project state or external system context.
              </p>
            </div>
            <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#C4DEFD] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#C4DEFD]/20">
              <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform">📝</div>
              <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Prompts</h3>
              <p className="text-white/90 leading-relaxed">
                Pre-defined instructions that teach the assistant how to frame a task, when to use a tool, and what a good answer should look like.
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gray-50 text-[#212529]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16 items-center">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#043873]">
              How the Protocol Works
            </h2>
            <p className="text-[20px] leading-[32px] text-gray-600 max-w-3xl mx-auto">
              A standard request lifecycle between your AI assistant and an MCP server.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6">
            <div className="flex flex-col items-center gap-4 w-48 text-center group">
              <div className="w-24 h-24 bg-[#043873] text-white rounded-full flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:scale-110 transition-transform">🧠</div>
              <h4 className="font-bold text-xl text-[#043873]">1. Reasoning</h4>
              <p className="text-sm text-gray-500">
                The assistant decides a tool or resource is needed based on your goal.
              </p>
            </div>

            <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative">
              <div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div>
            </div>

            <div className="flex flex-col items-center gap-4 w-48 text-center group">
              <div className="w-24 h-24 bg-[#4F9CF9] text-white rounded-2xl rotate-3 flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:rotate-0 group-hover:scale-110 transition-all">💻</div>
              <h4 className="font-bold text-xl text-[#043873]">2. MCP Client</h4>
              <p className="text-sm text-gray-500">
                Your IDE or AI interface routes the request to the correct connected system.
              </p>
            </div>

            <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative">
              <div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div>
            </div>

            <div className="flex flex-col items-center gap-4 w-48 text-center group">
              <div className="w-24 h-24 bg-[#FFE492] text-[#043873] rounded-xl -rotate-3 flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:rotate-0 group-hover:scale-110 transition-all">🔌</div>
              <h4 className="font-bold text-xl text-[#043873]">3. Transport</h4>
              <p className="text-sm text-gray-500">
                Structured messages move across the connection, usually through JSON-RPC.
              </p>
            </div>

            <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative">
              <div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div>
            </div>

            <div className="flex flex-col items-center gap-4 w-48 text-center group">
              <div className="w-24 h-24 bg-[#0acf83] text-white rounded-full flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:scale-110 transition-transform">📦</div>
              <h4 className="font-bold text-xl text-[#043873]">4. MCP Server</h4>
              <p className="text-sm text-gray-500">
                The server executes the action or returns the requested context back to the assistant.
              </p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      <section id="skills" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#FFE492] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">
              From Servers to Skills
            </h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80">
              If the <strong>MCP Server</strong> is the bridge, a <strong>skill</strong> is the guide that helps the assistant cross the bridge intelligently.
              <br />
              <br />
              In practice, skills capture reusable workflows and platform knowledge. They teach the assistant what to inspect first, how to structure a solution, and how to verify quality before claiming the work is done.
            </p>
          </div>
          <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-xl font-mono text-sm border-2 border-white/20">
            <div className="text-gray-400 mb-4">// Example: How an AI sees a registered skill</div>
            <div className="text-purple-600">const</div>{' '}
            <div className="inline text-blue-600">githubMcp</div>{' '}
            <div className="inline text-gray-800">= {'{'}</div>
            <div className="ml-4 mt-2 text-gray-800">skills: [</div>
            <div className="ml-8 text-gray-800">{'{'}</div>
            <div className="ml-12 text-blue-500">
              name: <span className="text-green-600">&apos;get_profile&apos;</span>,
            </div>
            <div className="ml-12 text-blue-500">
              description:{' '}
              <span className="text-green-600">&apos;Fetch live user data&apos;</span>,
            </div>
            <div className="ml-12 text-blue-500">
              parameters:{' '}
              <span className="text-gray-800">{'{'} username: &apos;string&apos; {'}'}</span>
            </div>
            <div className="ml-8 text-gray-800">{'}'}</div>
            <div className="ml-4 text-gray-800">]</div>
            <div className="text-gray-800">{'}'};</div>
          </div>
        </ScrollAnimate>

        <ScrollAnimate className="max-w-[1200px] mx-auto mt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {skillCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white/90 border border-white rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#043873] text-white flex items-center justify-center font-bold text-lg mb-6 group-hover:bg-[#4F9CF9] transition-colors">
                  <AnimatedIcon kind={card.icon as 'spark' | 'map' | 'shield'} className="h-7 w-7" />
                </div>
                <p className="text-xs font-mono tracking-[0.2em] text-[#4F9CF9] mb-2">{card.badge}</p>
                <h3 className="text-2xl font-bold mb-4 text-[#043873]">{card.title}</h3>
                <p className="text-[#043873]/80 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">
              Imagine What You Can Build
            </h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80 max-w-3xl mx-auto">
              MCPs transform AI from a chatbot into a productive agent embedded in your workflow. Here are real-world scenarios:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((item) => (
              <div
                key={item.title}
                className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-18 w-18 items-center justify-center rounded-3xl bg-white text-4xl shadow-xl ring-1 ring-[#d7e8ff] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300">
                    {item.label === 'DB'
                      ? '📊'
                      : item.label === 'CI'
                      ? '🚢'
                      : item.label === 'UI'
                      ? '🎨'
                      : item.label === 'SEC'
                      ? '🔍'
                      : item.label === 'MSG'
                      ? '📧'
                      : '☁️'}
                  </div>
                  <div className="text-sm font-mono font-bold tracking-[0.2em] text-[#4F9CF9]">
                    {item.label}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-[#043873]">{item.title}</h3>
                <p className="text-[#043873]/80 leading-relaxed">{item.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-mono text-[#4F9CF9]">{item.footer}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section id="ecosystem" className="flex flex-col items-center justify-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 bg-white text-[#212529]">
        <ScrollAnimate className="flex flex-col items-center justify-center gap-16 w-full">
          <h2 className="text-5xl md:text-[72px] font-bold tracking-tight text-center">
            Seamless Integrations
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-[30px] w-full font-bold text-xl text-gray-600 max-w-[1200px]">
            {integrations.map(([code, name, color]) => (
              <div
                key={name}
                className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all cursor-default"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-lg ring-1 ring-gray-100 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6" style={{ color }}>
                  {code === 'VC'
                    ? '❖'
                    : code === 'GH'
                    ? '⚙️'
                    : code === 'BR'
                    ? '🦁'
                    : code === 'FG'
                    ? '🎨'
                    : code === 'SL'
                    ? '#'
                    : code === 'PG'
                    ? '🐘'
                    : '🪣'}
                </span>
                {name}
              </div>
            ))}
          </div>
        </ScrollAnimate>
      </section>

      <section className="flex flex-col xl:flex-row items-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 lg:gap-[98px] bg-[#043873] text-white">
        <ScrollAnimate className="flex flex-col xl:flex-row items-center gap-16 lg:gap-[98px] w-full">
          <div className="flex-1 flex flex-col items-start gap-6 z-10">
            <h2 className="text-5xl md:text-[72px] font-bold leading-tight tracking-tight text-white">
              Plug into your favorite IDE
            </h2>
            <p className="text-[18px] leading-[30px] text-white/90 mb-4">
              The Model Context Protocol (MCP) is natively supported in modern AI IDEs like Cursor, Windsurf, and VS Code. Securely connect your local context, databases, and external APIs directly to your AI workflow.
            </p>
            <Link
              href="/mcps-used"
              className="px-8 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2"
            >
              See The MCP Stack <span className="text-xl leading-none">→</span>
            </Link>
          </div>

          <div className="flex-1 w-full xl:w-[686px] h-[479px] bg-[#C4DEFD] rounded-lg shadow-xl relative overflow-hidden flex items-center justify-center border-4 border-[#C4DEFD]/50">
            <div className="bg-[#043873] w-3/4 h-3/4 rounded shadow-2xl flex flex-col overflow-hidden">
              <div className="h-8 bg-[#032b59] flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6 font-mono text-sm text-[#FFE492] opacity-80">
                <p>$ gemini mcp add github</p>
                <p className="text-green-400 mt-2">[OK] Successfully connected to GitHub MCP Server.</p>
                <p className="mt-4 text-blue-300">Agents now have access to:</p>
                <ul className="list-disc ml-6 mt-2 text-white">
                  <li>github_create_pull_request</li>
                  <li>github_search_repositories</li>
                  <li>github_get_issue</li>
                </ul>
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
            Built for university presentation purposes to showcase the future of AI tools and MCPs.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/80">
            <Link href="/" className="font-medium text-[#FFE492]">
              Overview
            </Link>
            <Link href="/mcps-used" className="hover:text-[#FFE492] transition-colors">
              MCPs Used
            </Link>
            <Link href="/skills-used" className="hover:text-[#FFE492] transition-colors">
              Skills Used
            </Link>
            <Link href="/codex-in-practice" className="hover:text-[#FFE492] transition-colors">
              Codex In Practice
            </Link>
          </div>
          <a href="#" className="hover:text-[#FFE492] transition-colors font-medium">
            Back to Top
          </a>
        </div>
      </footer>
    </div>
  );
}
