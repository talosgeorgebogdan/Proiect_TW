import ScrollAnimate from './ScrollAnimate';

export default function McpShowcase() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden scroll-smooth">
      {/* Navbar / Header */}
      <header className="flex flex-row justify-between items-center py-4 px-8 lg:px-[220px] bg-[#043873]/95 backdrop-blur sticky top-0 z-50 border-b border-white/10 h-[92px]">
        <div className="flex items-center gap-2">
          {/* Simple CSS Logo */}
          <div className="w-[37px] h-[29px] bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-[28px] tracking-tight">MCP Hub</span>
        </div>
        
        <nav className="hidden lg:flex flex-row items-center gap-8 text-[18px] font-medium">
          <a href="#what-is-mcp" className="hover:text-[#FFE492] transition-colors">What is MCP?</a>
          <a href="#skills" className="hover:text-[#FFE492] transition-colors">Skills</a>
          <a href="/playground" className="hover:text-[#FFE492] transition-colors">Playground</a>
          <a href="#ecosystem" className="hover:text-[#FFE492] transition-colors">Ecosystem</a>
        </nav>

        <div className="hidden md:flex flex-row items-center gap-6">
          <button className="px-10 py-4 bg-[#FFE492] text-[#043873] rounded-lg font-medium text-[18px] hover:bg-yellow-300 transition-colors">
            Read Docs
          </button>
          <a href="/playground" className="px-6 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2">
            Try Assistant <span className="text-xl leading-none">→</span>
          </a>
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
      <section id="what-is-mcp" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-white text-[#212529]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#043873]">What exactly is an MCP?</h2>
            <p className="text-[20px] leading-[32px] text-gray-600 max-w-3xl mx-auto">
              Historically, integrating an AI assistant with external tools meant writing custom API wrappers for every new model. The Model Context Protocol changes everything.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#4F9CF9]/10 text-[#4F9CF9] rounded-lg flex items-center justify-center text-2xl mb-6">🔌</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Standardized</h3>
              <p className="text-gray-600 leading-relaxed">It provides a universal API. Whether you are using Claude, Gemini, or a local model, they all use the exact same protocol to request data and trigger actions.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-[#FFE492]/20 text-[#d4b127] rounded-lg flex items-center justify-center text-2xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">Secure & Local</h3>
              <p className="text-gray-600 leading-relaxed">MCP operates on a client-server model where you control the server. You can grant AI agents secure access to your local file system or private databases without exposing your credentials.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-6">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-[#043873]">What to Expect</h3>
              <p className="text-gray-600 leading-relaxed">Expect seamless "plug-and-play" capabilities. If an MCP server exists for a platform (like Slack or Notion), your AI assistant can immediately read and write to it.</p>
            </div>
          </div>
        </ScrollAnimate>
      </section>

      {/* Presentation: Core Primitives */}
      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#032b59] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16 relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#FFE492]">The Three Primitives</h2>
            <p className="text-[20px] leading-[32px] text-white/80 max-w-3xl mx-auto">
              MCP standardizes three fundamental ways for AI to interact with your world. It is not just about executing code.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-6 drop-shadow-md">🛠️</div>
                <h3 className="text-2xl font-bold mb-3 text-[#4F9CF9]">Tools (Skills)</h3>
                <p className="text-white/80 leading-relaxed">Actionable functions the AI can execute. Tell the agent to "Deploy to Vercel", "Commit to GitHub", or "Restart Server".</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-6 drop-shadow-md">📄</div>
                <h3 className="text-2xl font-bold mb-3 text-[#4F9CF9]">Resources</h3>
                <p className="text-white/80 leading-relaxed">Expose live data to the AI. Let the agent read a local database schema, a live Figma file, or a REST API endpoint directly.</p>
             </div>
             <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-6 drop-shadow-md">📝</div>
                <h3 className="text-2xl font-bold mb-3 text-[#4F9CF9]">Prompts</h3>
                <p className="text-white/80 leading-relaxed">Pre-defined templates provided by the server to guide the AI on exactly how to use the available tools flawlessly.</p>
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
      <section className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#C4DEFD] text-[#043873]">
        <ScrollAnimate className="max-w-[1200px] mx-auto flex flex-col gap-16">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-[64px] font-bold tracking-tight">Imagine What You Can Build</h2>
            <p className="text-[20px] leading-[32px] text-[#043873]/80 max-w-3xl mx-auto">
              With MCPs, AI is no longer trapped in a text box. It becomes a capable agent natively embedded inside your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 p-8 rounded-3xl shadow-lg border border-white hover:-translate-y-2 transition-transform duration-300">
               <div className="text-6xl mb-6 drop-shadow-md animate-bounce">📊</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Database Architect</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect a Postgres MCP. Ask your AI to analyze user retention, write the SQL query, execute it locally, and chart the results in your chat.</p>
            </div>
            <div className="bg-white/80 p-8 rounded-3xl shadow-lg border border-white hover:-translate-y-2 transition-transform duration-300">
               <div className="text-6xl mb-6 drop-shadow-md animate-pulse">🚢</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">DevOps Auto-Pilot</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect GitHub and Vercel MCPs. Tell your AI: "Rollback the latest commit on main and redeploy the production environment."</p>
            </div>
            <div className="bg-white/80 p-8 rounded-3xl shadow-lg border border-white hover:-translate-y-2 transition-transform duration-300">
               <div className="text-6xl mb-6 drop-shadow-md hover:rotate-12 transition-transform">🎨</div>
               <h3 className="text-2xl font-bold mb-3 text-[#043873]">Design Engineer</h3>
               <p className="text-[#043873]/80 leading-relaxed">Connect the Figma MCP. Let the AI safely read your team's design tokens and instantly scaffold pixel-perfect React components.</p>
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
