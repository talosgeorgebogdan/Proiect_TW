import ScrollAnimate from './ScrollAnimate';

export default function McpShowcase() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden scroll-smooth">
      {/* Navbar / Header */}
      <header className="flex flex-row justify-between items-center py-4 px-8 lg:px-[220px] bg-[#043873]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10 h-[92px] shadow-lg">
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* Animated Logo */}
          <div className="w-[37px] h-[29px] bg-gradient-to-br from-[#4F9CF9] to-[#FFE492] rounded-sm flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#4F9CF9]/50 transition-all">
            <div className="w-4 h-4 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-[28px] tracking-tight bg-gradient-to-r from-white to-[#C4DEFD] bg-clip-text text-transparent">MCP Hub</span>
        </div>
        
        <nav className="hidden lg:flex flex-row items-center gap-8 text-[18px] font-medium">
          <a href="#what-is-mcp" className="relative group hover:text-[#FFE492] transition-colors">
            What is MCP?
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#three-primitives" className="relative group hover:text-[#FFE492] transition-colors">
            Primitives
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#skills" className="relative group hover:text-[#FFE492] transition-colors">
            Skills
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#ecosystem" className="relative group hover:text-[#FFE492] transition-colors">
            Ecosystem
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFE492] group-hover:w-full transition-all duration-300"></span>
          </a>
        </nav>

        <div className="hidden md:flex flex-row items-center gap-6">
          <button className="px-10 py-4 bg-gradient-to-r from-[#FFE492] to-[#ffd966] text-[#043873] rounded-lg font-medium text-[18px] hover:shadow-lg hover:shadow-[#FFE492]/50 transition-all hover:scale-105">
            Read Docs
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col xl:flex-row items-center justify-between py-12 px-8 lg:px-[220px] gap-16 min-h-[829px] relative overflow-hidden">
        <ScrollAnimate className="flex flex-col xl:flex-row items-center justify-between gap-16 w-full z-10">
          {/* Left Column: Heading & CTA */}
          <div className="flex flex-col items-start gap-6 w-full xl:w-[656px]">
            <h1 className="font-bold text-5xl md:text-[64px] leading-tight tracking-tight text-white">
              The Universal Protocol for AI Context
            </h1>
            <p className="text-[18px] leading-[30px] text-white/90">
              The Model Context Protocol (MCP) is an open standard that bridges the gap between foundation models and your data. It acts as a universal "USB-C port" for AI.
            </p>
            <a href="#what-is-mcp" className="px-6 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2 mt-4">
              Learn How it Works <span className="text-xl leading-none">↓</span>
            </a>
          </div>

          {/* Right Column: Architecture Graphic */}
          <div className="w-full xl:w-[824px] h-[549px] flex items-center justify-center relative">
            <div className="absolute w-[400px] h-[400px] bg-[#4F9CF9]/30 rounded-full blur-[80px]"></div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 z-10 relative">
              {/* LLM Node */}
              <div className="w-32 h-32 bg-white text-[#043873] rounded-2xl flex flex-col items-center justify-center font-bold shadow-2xl border border-gray-200">
                <span className="text-3xl">🤖</span>
                <span>LLM</span>
              </div>
              {/* Connection */}
              <div className="flex flex-col items-center">
                <div className="h-16 w-1 md:w-16 md:h-1 bg-[#FFE492] rounded animate-pulse"></div>
                <span className="text-[#FFE492] text-xs font-mono absolute -top-4 md:-top-6">Requests</span>
              </div>
              {/* MCP Node */}
              <div className="w-40 h-40 bg-[#4F9CF9] text-white rounded-full flex flex-col items-center justify-center font-bold shadow-[0_0_40px_rgba(79,156,249,0.5)] border-4 border-[#C4DEFD]">
                <span className="text-4xl mb-1">⚡</span>
                <span className="text-xl">MCP</span>
              </div>
              {/* Connection */}
              <div className="flex flex-col items-center">
                <div className="h-16 w-1 md:w-16 md:h-1 bg-[#FFE492] rounded animate-pulse"></div>
                <span className="text-[#FFE492] text-xs font-mono absolute -bottom-4 md:-bottom-6">Context</span>
              </div>
              {/* Data Nodes */}
              <div className="flex flex-row md:flex-col gap-4">
                <div className="w-24 h-24 bg-[#043873] border-2 border-[#4F9CF9] text-white rounded-xl flex items-center justify-center font-bold shadow-lg">Local FS</div>
                <div className="w-24 h-24 bg-[#043873] border-2 border-[#4F9CF9] text-white rounded-xl flex items-center justify-center font-bold shadow-lg">GitHub</div>
              </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: What is MCP? */}
      <section id="what-is-mcp" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-b from-white to-gray-50 text-[#212529]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight bg-gradient-to-r from-[#043873] to-[#4F9CF9] bg-clip-text text-transparent">What exactly is an MCP?</h2>
            <p className="text-[20px] leading-[32px] text-gray-600 max-w-3xl mx-auto">
              Before MCP, every AI model needed custom integration code. Today, MCPs enable plug-and-play connectivity with zero friction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-2xl hover:shadow-[#4F9CF9]/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#4F9CF9] text-white rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🔌</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Standardized Interface</h3>
              <p className="text-gray-700 leading-relaxed">One protocol for all models. Claude, Gemini, GPT, or local models—they all speak the same language. No more fragmented integrations.</p>
            </div>
            <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border-2 border-yellow-200 shadow-lg hover:shadow-2xl hover:shadow-[#FFE492]/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#FFE492] text-[#043873] rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Secure & Local-First</h3>
              <p className="text-gray-700 leading-relaxed">You control the server. Grant AI access to local files, private databases, and APIs without exposing credentials.</p>
            </div>
            <div className="group bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-2xl hover:shadow-green-300/30 hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 bg-[#0acf83] text-white rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Future-Proof</h3>
              <p className="text-gray-700 leading-relaxed">Plug-and-play server ecosystem. New integrations? Just add an MCP. No code changes needed.</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: Core Primitives */}
      <section id="three-primitives" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-br from-[#032b59] to-[#043873] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F9CF9]/10 rounded-full blur-3xl -mr-48"></div>
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight bg-gradient-to-r from-[#FFE492] to-[#C4DEFD] bg-clip-text text-transparent">The Three Primitives</h2>
            <p className="text-[20px] leading-[32px] text-white/80 max-w-3xl mx-auto">
              MCP standardizes three fundamental ways for AI to interact with your world. It is not just about executing code.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#4F9CF9] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#4F9CF9]/20">
                <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform">🛠️</div>
                <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Tools (Skills)</h3>
                <p className="text-white/90 leading-relaxed">Actionable functions the AI can execute. Deploy to production, commit code, restart servers—all from natural language.</p>
             </div>
             <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#FFE492] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#FFE492]/20">
                <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">📄</div>
                <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Resources</h3>
                <p className="text-white/90 leading-relaxed">Expose live data to the AI. Database schemas, API endpoints, design files—give agents real-time context.</p>
             </div>
             <div className="group bg-white/5 border border-white/20 p-8 rounded-2xl backdrop-blur hover:bg-white/15 hover:border-[#C4DEFD] hover:-translate-y-4 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#C4DEFD]/20">
                <div className="text-5xl mb-6 drop-shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform">📝</div>
                <h3 className="text-2xl font-bold mb-3 text-[#FFE492]">Prompts</h3>
                <p className="text-white/90 leading-relaxed">Pre-defined templates that guide AI on how to use skills perfectly. Reduce mistakes and increase reliability.</p>
             </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: Architecture */}
      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gray-50 text-[#212529]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16 items-center">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#043873]">How the Protocol Works</h2>
            <p className="text-[20px] leading-[32px] text-gray-600 max-w-3xl mx-auto">
              A standard request lifecycle between your AI Assistant and an MCP Server.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6">
             <div className="flex flex-col items-center gap-4 w-48 text-center group">
               <div className="w-24 h-24 bg-[#043873] text-white rounded-full flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:scale-110 transition-transform">🧠</div>
               <h4 className="font-bold text-xl text-[#043873]">1. Reasoning</h4>
               <p className="text-sm text-gray-500">The LLM decides a tool is needed based on your prompt.</p>
             </div>

             <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative"><div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div></div>

             <div className="flex flex-col items-center gap-4 w-48 text-center group">
               <div className="w-24 h-24 bg-[#4F9CF9] text-white rounded-2xl rotate-3 flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:rotate-0 group-hover:scale-110 transition-all">💻</div>
               <h4 className="font-bold text-xl text-[#043873]">2. MCP Client</h4>
               <p className="text-sm text-gray-500">Your IDE or chat app automatically routes the request.</p>
             </div>

             <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative"><div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div></div>

             <div className="flex flex-col items-center gap-4 w-48 text-center group">
               <div className="w-24 h-24 bg-[#FFE492] text-[#043873] rounded-xl -rotate-3 flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:rotate-0 group-hover:scale-110 transition-all">🔌</div>
               <h4 className="font-bold text-xl text-[#043873]">3. Transport</h4>
               <p className="text-sm text-gray-500">JSON-RPC packets are sent over STDIO or SSE.</p>
             </div>

             <div className="hidden lg:flex flex-1 h-0 border-t-4 border-dashed border-[#4F9CF9]/40 relative"><div className="absolute -top-[14px] right-0 text-[#4F9CF9] text-2xl">▶</div></div>

             <div className="flex flex-col items-center gap-4 w-48 text-center group">
               <div className="w-24 h-24 bg-[#0acf83] text-white rounded-full flex items-center justify-center text-4xl shadow-xl z-10 relative group-hover:scale-110 transition-transform">📦</div>
               <h4 className="font-bold text-xl text-[#043873]">4. MCP Server</h4>
               <p className="text-sm text-gray-500">Executes local code or hits an API, then returns data.</p>
             </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: Skills */}
      <section id="skills" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#FFE492] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">From Servers to Skills</h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80">
              If the <strong>MCP Server</strong> is the bridge, <strong>Skills</strong> (or Tools) are the vehicles that cross it. <br/><br/>
              When an MCP Server connects to your AI, it registers a list of specific skills it can perform. For example, a GitHub MCP exposes skills like <code>search_repositories</code> and <code>create_issue</code>. The LLM intelligently decides <em>when</em> to call a skill based on your prompt.
            </p>
          </div>
          <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-xl font-mono text-sm border-2 border-white/20">
             <div className="text-gray-400 mb-4">// Example: How an AI sees a registered Skill</div>
             <div className="text-purple-600">const</div> <div className="inline text-blue-600">githubMcp</div> <div className="inline text-gray-800">= {'{'}</div>
             <div className="ml-4 mt-2 text-gray-800">skills: [</div>
             <div className="ml-8 text-gray-800">{'{'}</div>
             <div className="ml-12 text-blue-500">name: <span className="text-green-600">'get_profile'</span>,</div>
             <div className="ml-12 text-blue-500">description: <span className="text-green-600">'Fetch live user data'</span>,</div>
             <div className="ml-12 text-blue-500">parameters: <span className="text-gray-800">{'{'} username: 'string' {'}'}</span></div>
             <div className="ml-8 text-gray-800">{'}'}</div>
             <div className="ml-4 text-gray-800">]</div>
             <div className="text-gray-800">{'}'};</div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: Use Cases */}
      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-gradient-to-br from-[#C4DEFD] via-[#dde9f8] to-[#f0f6ff] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">Imagine What You Can Build</h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80 max-w-3xl mx-auto">
              MCPs transform AI from a chatbot into a productive agent embedded in your workflow. Here are real-world scenarios:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:animate-bounce">📊</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Database Architect</h3>
               <p className="text-[#043873]/80 leading-relaxed">Ask your AI agent to analyze user retention with a Postgres MCP. It writes the SQL, executes it securely, and charts results instantly.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ SQL analysis, dashboards, migrations</p>
               </div>
            </div>
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-purple-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:animate-pulse">🚢</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">DevOps Auto-Pilot</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect GitHub and Vercel MCPs. Tell your AI: "Roll back the latest commit and redeploy." It orchestrates the entire workflow.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ CI/CD, deployments, rollbacks</p>
               </div>
            </div>
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-pink-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:hover:rotate-12 transition-transform">🎨</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Design Engineer</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect the Figma MCP. Let AI read design tokens and scaffold pixel-perfect React components automatically.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ Component generation, design sync</p>
               </div>
            </div>
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-green-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform">🔍</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Security Auditor</h3>
               <p className="text-[#043873]/80 leading-relaxed">Use Brave Search MCP to research vulnerabilities. Combine with GitHub MCP to audit and patch dependencies automatically.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ Vulnerability scanning, patches</p>
               </div>
            </div>
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-orange-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform">📧</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Slack Notifier</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect Slack MCP to send intelligent summaries, alerts, and updates to your team automatically based on events.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ Notifications, team updates</p>
               </div>
            </div>
            <div className="group bg-white/90 backdrop-blur p-10 rounded-3xl shadow-lg border border-white hover:shadow-2xl hover:shadow-indigo-200 hover:-translate-y-3 transition-all duration-300">
               <div className="text-6xl mb-6 drop-shadow-md group-hover:scale-110 transition-transform">☁️</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Cloud Infrastructure</h3>
               <p className="text-[#043873]/80 leading-relaxed">AWS S3 MCP for file management, Lambda for serverless functions—build entire infrastructure with natural language.</p>
               <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-mono text-[#4F9CF9]">→ Cloud ops, infrastructure as code</p>
               </div>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Integrations Section (Sponsors from Figma) */}
      <section id="ecosystem" className="flex flex-col items-center justify-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 bg-white text-[#212529]">
        <ScrollAnimate className="flex flex-col items-center justify-center gap-16 w-full">
          <h2 className="text-5xl md:text-[72px] font-bold tracking-tight text-center">Seamless Integrations</h2>
          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-[30px] w-full font-bold text-xl text-gray-600 max-w-[1200px]">
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#043873] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">❖</span> Vercel</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-black hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl text-black"></span> GitHub</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#ff3e00] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">🦁</span> Brave</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#0acf83] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">🎨</span> Figma</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#e01e5a] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">#</span> Slack</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#336791] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">🐘</span> Postgres</div>
            <div className="flex items-center gap-3 px-8 py-5 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-xl hover:text-[#F24E1E] hover:-translate-y-2 transition-all cursor-default"><span className="text-4xl">🪣</span> AWS S3</div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Extension / IDE Section (Customise it to your needs from Figma) */}
      <section className="flex flex-col xl:flex-row items-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 lg:gap-[98px] bg-[#043873] text-white">
        <ScrollAnimate className="flex flex-col xl:flex-row items-center gap-16 lg:gap-[98px] w-full">
          <div className="flex-1 flex flex-col items-start gap-6 z-10">
            <h2 className="text-5xl md:text-[72px] font-bold leading-tight tracking-tight text-white">
              Plug into your favorite IDE
            </h2>
            <p className="text-[18px] leading-[30px] text-white/90 mb-4">
              The Model Context Protocol (MCP) is natively supported in modern AI IDEs like Cursor, Windsurf, and VS Code. Securely connect your local context, databases, and external APIs directly to your AI workflow.
            </p>
            <button className="px-8 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2">
              View Documentation <span className="text-xl leading-none">→</span>
            </button>
          </div>

          {/* Placeholder for the Extension Illustration */}
          <div className="flex-1 w-full xl:w-[686px] h-[479px] bg-[#C4DEFD] rounded-lg shadow-xl relative overflow-hidden flex items-center justify-center border-4 border-[#C4DEFD]/50">
            <div className="bg-[#043873] w-3/4 h-3/4 rounded shadow-2xl flex flex-col overflow-hidden">
               <div className="h-8 bg-[#032b59] flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div><div className="w-3 h-3 rounded-full bg-yellow-400"></div><div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="p-6 font-mono text-sm text-[#FFE492] opacity-80">
                  <p>$ gemini mcp add github</p>
                  <p className="text-green-400 mt-2">✔ Successfully connected to GitHub MCP Server.</p>
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

      {/* Footer */}
      <footer className="bg-[#032b59] text-white py-12 px-8 lg:px-[220px] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[24px] bg-white rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-xl tracking-tight">MCP Hub</span>
        </div>
        <p className="text-sm text-white/60 text-center md:text-left">
          Built for university presentation purposes to showcase the future of AI tools and MCPs.
        </p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-[#FFE492] transition-colors font-medium">↑ Back to Top</a>
        </div>
      </footer>

    </div>
  );
}
