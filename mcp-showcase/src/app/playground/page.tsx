import ChatPlayground from '../ChatPlayground';

export default function PlaygroundPage() {
  return (
    <div className="min-h-screen bg-[#043873] font-sans text-white overflow-x-hidden scroll-smooth flex flex-col">
      {/* Minimal Header */}
      <header className="flex flex-row justify-between items-center py-4 px-8 lg:px-[220px] bg-[#043873]/95 backdrop-blur sticky top-0 z-50 border-b border-white/10 h-[92px]">
        <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-[37px] h-[29px] bg-white rounded-sm flex items-center justify-center">
            <div className="w-4 h-4 bg-[#043873] rounded-sm"></div>
          </div>
          <span className="font-bold text-[28px] tracking-tight">MCP Hub</span>
        </a>
        <div className="hidden md:flex flex-row items-center gap-6">
          <a href="/" className="px-6 py-4 bg-[#FFE492] text-[#043873] rounded-lg font-medium text-[18px] hover:bg-yellow-300 transition-colors flex items-center gap-2">
            ← Back to Home
          </a>
        </div>
      </header>

      <ChatPlayground />
    </div>
  );
}