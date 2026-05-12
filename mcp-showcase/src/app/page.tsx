'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

export default function McpShowcase() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput('');
  };

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
          <a href="#playground" className="hover:text-[#FFE492] transition-colors">Playground</a>
          <a href="#ecosystem" className="hover:text-[#FFE492] transition-colors">Ecosystem</a>
        </nav>

        <div className="hidden md:flex flex-row items-center gap-6">
          <button className="px-10 py-4 bg-[#FFE492] text-[#043873] rounded-lg font-medium text-[18px] hover:bg-yellow-300 transition-colors">
            Read Docs
          </button>
          <a href="#playground" className="px-6 py-4 bg-[#4F9CF9] text-white rounded-lg font-medium text-[18px] hover:bg-blue-500 transition-colors flex items-center gap-2">
            Try Assistant <span className="text-xl leading-none">→</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col xl:flex-row items-center justify-between py-12 px-8 lg:px-[220px] gap-16 min-h-[829px] relative overflow-hidden">
        
        {/* Left Column: Heading & CTA */}
        <div className="flex flex-col items-start gap-6 w-full xl:w-[656px] z-10">
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
        <div className="w-full xl:w-[824px] h-[549px] flex items-center justify-center relative z-10">
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
      </section>

      {/* Presentation: What is MCP? */}
      <section id="what-is-mcp" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-white text-[#212529]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
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
        </div>
      </section>

      {/* Presentation: Skills */}
      <section id="skills" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#FFE492] text-[#043873]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
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
        </div>
      </section>

      {/* Interactive Playground (Moved Chat Here) */}
      <section id="playground" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#C4DEFD] flex flex-col items-center">
        <div className="text-center mb-12 max-w-2xl">
          <h2 className="text-5xl font-bold text-[#043873] mb-4">Interactive Playground</h2>
          <p className="text-lg text-[#043873]/80">Experience it yourself. Ask the assistant below to fetch a live GitHub profile or explain what the Vercel MCP does. Watch as it triggers the skills in real-time.</p>
        </div>

        <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col text-gray-800 z-10 overflow-hidden border border-white/40">
          <div className="bg-gray-50 border-b border-gray-100 p-4">
            <h2 className="text-xl font-bold text-center text-[#043873]">MCP AI Assistant</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-10">Ask me about Vercel, GitHub, or Brave MCPs!</p>
          )}
          
          {messages.map(m => (
            <div key={m.id} className={`p-4 rounded-lg ${m.role === 'user' ? 'bg-[#C4DEFD] ml-auto w-3/4' : 'bg-gray-100 w-3/4'}`}>
              <strong className="block mb-1 text-sm text-gray-600">
                {m.role === 'user' ? 'You' : 'AI'}
              </strong>
              
              {m.parts?.map((part, index) => {
                if (part.type === 'text') {
                  return <div key={index} className="text-gray-800 whitespace-pre-wrap mb-2">{part.text}</div>;
                }
                if (part.type === 'tool-invocation') {
                  const toolInvocation = part.toolInvocation;
                  return (
                    <div key={toolInvocation.toolCallId} className="bg-blue-50 border border-blue-200 p-3 mt-3 rounded-md text-sm text-blue-900">
                  <div className="font-semibold flex items-center gap-2">
                    <span className="animate-pulse h-2 w-2 bg-[#4F9CF9] rounded-full"></span>
                    Skill Triggered: {toolInvocation.toolName}
                  </div>
                  {toolInvocation.state === 'result' && (
                    <div className="mt-3">
                      {toolInvocation.toolName === 'getMcpInfo' ? (
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-gray-800">
                          <h3 className="font-bold text-lg capitalize mb-1">{toolInvocation.args.serverName} MCP</h3>
                          <p className="text-sm">{toolInvocation.result.info}</p>
                        </div>
                      ) : toolInvocation.toolName === 'getGithubProfile' ? (
                        toolInvocation.result.error ? (
                          <div className="text-red-500 text-sm">Error: {toolInvocation.result.error}</div>
                        ) : (
                          <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden w-full max-w-sm font-sans mt-2">
                            <div className="h-16 bg-gradient-to-r from-gray-800 to-gray-900 relative">
                              <img src={toolInvocation.result.avatar_url} alt="Avatar" className="absolute -bottom-6 left-4 w-16 h-16 rounded-full border-4 border-white bg-white" />
                            </div>
                            <div className="pt-8 pb-4 px-4">
                              <a href={toolInvocation.result.html_url} target="_blank" rel="noreferrer" className="font-bold text-gray-900 hover:text-blue-600 hover:underline text-lg flex items-baseline gap-2">
                                {toolInvocation.result.name || toolInvocation.result.login}
                                <span className="text-gray-400 text-sm font-normal">@{toolInvocation.result.login}</span>
                              </a>
                              {toolInvocation.result.bio && (
                                <p className="text-sm text-gray-600 mt-2 leading-snug">{toolInvocation.result.bio}</p>
                              )}
                              <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <span className="font-semibold text-gray-700">{toolInvocation.result.followers}</span> followers
                                </div>
                                <a href={toolInvocation.result.html_url} target="_blank" rel="noreferrer" className="ml-auto text-[#4F9CF9] hover:text-blue-600 font-medium text-xs border border-[#C4DEFD] hover:bg-blue-50 rounded-full px-3 py-1 transition-colors">
                                  View Profile
                                </a>
                              </div>
                            </div>
                          </div>
                        )
                      ) : null}
                    </div>
                  )}
                </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-auto flex gap-2 p-4 border-t border-gray-100 bg-gray-50">
          <input
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]"
            value={input}
              placeholder="E.g., Fetch the github profile for torvalds"
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit" 
              className="bg-[#4F9CF9] hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Send
          </button>
        </form>
      </div>
      </section>

      {/* Integrations Section (Sponsors from Figma) */}
      <section id="ecosystem" className="flex flex-col items-center justify-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 bg-white text-[#212529]">
        <h2 className="text-5xl md:text-[72px] font-bold tracking-tight text-center">Seamless Integrations</h2>
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-[100px] w-full font-bold text-2xl text-gray-400">
          {/* Placeholder Logos */}
          <div className="flex items-center gap-2 hover:text-[#043873] transition-colors"><span className="text-4xl">❖</span> Vercel</div>
          <div className="flex items-center gap-2 hover:text-black transition-colors"><span className="text-4xl"></span> GitHub</div>
          <div className="flex items-center gap-2 hover:text-[#ff3e00] transition-colors"><span className="text-4xl">🦁</span> Brave Search</div>
          <div className="flex items-center gap-2 hover:text-[#0acf83] transition-colors"><span className="text-4xl">🎨</span> Figma</div>
          <div className="flex items-center gap-2 hover:text-[#e01e5a] transition-colors"><span className="text-4xl">#</span> Slack</div>
        </div>
      </section>

      {/* Extension / IDE Section (Customise it to your needs from Figma) */}
      <section className="flex flex-col xl:flex-row items-center py-20 lg:py-[140px] px-8 lg:px-[220px] gap-16 lg:gap-[98px] bg-[#043873] text-white">
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
      </section>

    </div>
  );
}
