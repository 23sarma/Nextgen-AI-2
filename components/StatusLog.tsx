
import React, { useRef, useEffect } from 'react';

interface StatusLogProps {
  messages: string[];
}

export const StatusLog: React.FC<StatusLogProps> = ({ messages }) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = 0;
    }
  }, [messages]);
  
  return (
    <div className="status-log flex-grow flex flex-col bg-black/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-4 shadow-lg shadow-cyan-500/5 min-h-[200px] max-h-[40vh] overflow-hidden">
      <h2 className="text-lg font-bold text-white mb-2 flex-shrink-0">System Log</h2>
      <div ref={logContainerRef} className="flex-grow overflow-y-auto pr-2 font-mono text-sm space-y-1">
        {messages.map((msg, index) => (
          <p key={index} className={`opacity-80 ${index === 0 ? 'text-white animate-fade-in' : ''}`}>
            <span className="text-cyan-400 mr-2">{'>'}</span>{msg}
          </p>
        ))}
      </div>
    </div>
  );
};

// Add fade-in animation to tailwind.config.js or a style tag if needed.
// For simplicity here, we can rely on a basic effect or just class toggling.
// In index.html, you can add this style block:
/*
<style>
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fadeIn 0.5s ease-in-out; }
</style>
*/