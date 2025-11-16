import React, { useState, useRef, useEffect } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, CpuChipIcon } from './components/icons';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

interface ChatProps {
  onSendMessage: (message: string) => Promise<string>;
}

const Chat: React.FC<ChatProps> = ({ onSendMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "I am NextGen AI. You can ask me about my current status or give me a new command." }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!userInput.trim() || isTyping) return;

    const userMessage: Message = { sender: 'user', text: userInput };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      const aiResponseText = await onSendMessage(userInput);
      const aiMessage: Message = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an error. My Self-Fixing engine is on it." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-cyan-500 text-white p-4 rounded-full shadow-lg hover:bg-cyan-600 transition-transform transform hover:scale-110 focus:outline-none z-50"
        aria-label="Toggle Chat"
      >
        <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-lg h-[70vh] max-h-[600px] bg-gray-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-lg shadow-2xl flex flex-col z-50 animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/20 flex-shrink-0">
            <div className="flex items-center gap-3">
                <CpuChipIcon className="w-6 h-6 text-cyan-400" />
                <h2 className="font-bold text-white">AI Command Console</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0"><CpuChipIcon className="w-5 h-5 text-cyan-300"/></div>}
                <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-300'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
             {isTyping && (
                <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0"><CpuChipIcon className="w-5 h-5 text-cyan-300"/></div>
                    <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-800 text-gray-300">
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-cyan-500/20 flex-shrink-0">
            <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg p-1">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything or give a command..."
                className="w-full bg-transparent text-white px-2 py-1 focus:outline-none"
                disabled={isTyping}
              />
              <button onClick={handleSend} disabled={isTyping || !userInput.trim()} className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 disabled:bg-gray-600">
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chat;
