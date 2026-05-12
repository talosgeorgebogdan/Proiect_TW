'use client';

import { useChat } from '@ai-sdk/react';
import ScrollAnimate from './ScrollAnimate';

export default function ChatPlayground() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section id="playground" className="py-20 lg:py-[140px] px-8 lg:px-[220px] bg-[#C4DEFD] flex flex-col items-center">
      <ScrollAnimate className="flex flex-col items-center w-full">
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
                
                {m.content && <div className="text-gray-800 whitespace-pre-wrap mb-2">{m.content}</div>}

                {m.toolInvocations?.map(toolInvocation => (
                  <div key={toolInvocation.toolCallId} className="bg-blue-50 border border-blue-200 p-3 mt-3 rounded-md text-sm text-blue-900">
                    <div className="font-semibold flex items-center gap-2">
                      <span className="animate-pulse h-2 w-2 bg-[#4F9CF9] rounded-full"></span>
                      Skill Triggered: {toolInvocation.toolName}
                    </div>
                    {toolInvocation.state !== 'result' && (
                      <div className="mt-4 mb-2 flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-[#4F9CF9] border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm font-medium text-[#4F9CF9]">Executing skill...</span>
                      </div>
                    )}
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
                      ) : toolInvocation.toolName === 'getNpmPackage' ? (
                        toolInvocation.result.error ? (
                          <div className="text-red-500 text-sm">Error: {toolInvocation.result.error}</div>
                        ) : (
                          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 w-full max-w-sm font-sans mt-2">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                                <span className="text-[#CB3837] text-2xl">📦</span> {toolInvocation.result.name}
                              </h3>
                              <span className="bg-blue-50 text-[#043873] border border-blue-100 text-xs font-mono px-2 py-1 rounded-full font-semibold">v{toolInvocation.result.version}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-5 leading-relaxed">{toolInvocation.result.description}</p>
                            <div className="flex justify-between items-center text-xs font-medium border-t border-gray-100 pt-3">
                              <span className="text-gray-500 bg-gray-50 px-2 py-1 rounded">License: {toolInvocation.result.license}</span>
                              {toolInvocation.result.homepage && (
                                <a href={toolInvocation.result.homepage} target="_blank" rel="noreferrer" className="text-[#4F9CF9] hover:text-blue-600 flex items-center gap-1 transition-colors">
                                  Homepage <span className="text-lg leading-none">↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                          )
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-auto flex gap-2 p-4 border-t border-gray-100 bg-gray-50">
            <input
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F9CF9]"
              value={input}
            placeholder="E.g., What is the latest version of tailwindcss on npm?"
              onChange={handleInputChange}
            />
            <button 
              type="submit" 
              className="bg-[#4F9CF9] hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </ScrollAnimate>
    </section>
  );
}