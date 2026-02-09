import React, { useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, User } from "lucide-react";

function Chatbot({ chatOpen, setChatOpen, messages, input, setInput, onSendMessage, isTyping }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, chatOpen]);

    if (!chatOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl border border-slate-200 dark:border-slate-800 z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Header */}
            <div className="bg-indigo-600 p-4 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">EduBot</h3>
                        <p className="text-[10px] text-indigo-100 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                            AI Assistant Online
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => setChatOpen(false)}
                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="h-80 md:h-96 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50"
            >
                {messages.length === 0 && (
                    <div className="text-center py-10 px-4">
                        <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                            <MessageSquare size={24} />
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Hello! I'm EduBot.</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ask me about roadmaps, your progress, or what to learn next!</p>
                    </div>
                )}

                {messages.map((m, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 ${m.sender === "bot" ? "flex-row" : "flex-row-reverse"}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${m.sender === "bot"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}>
                            {m.sender === "bot" ? <Bot size={16} /> : <User size={16} />}
                        </div>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.sender === "bot"
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-tl-none"
                            : "bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none rounded-tr-none"
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-slate-100 dark:border-slate-700">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                {/* Quick Actions */}
                {!isTyping && messages.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide no-scrollbar">
                        {[
                            { label: "My Progress", icon: "📊" },
                            { label: "Next Steps", icon: "🚀" },
                            { label: "Roadmap Help", icon: "🗺️" },
                            { label: "Motivation", icon: "✨" }
                        ].map((action, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setInput(action.label);
                                    // We'll let the user click send or handle it automatically
                                }}
                                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs rounded-full border border-slate-200 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all flex items-center gap-1.5"
                            >
                                <span>{action.icon}</span>
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}

                <div className="relative flex items-center">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm pr-12 pl-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all border-none"
                        placeholder="Type a message..."
                        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                    />
                    <button
                        onClick={onSendMessage}
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
                    >
                        <Send size={18} />
                    </button>
                </div>
                <p className="text-[9px] text-center text-slate-400 mt-2">EduBot can help with navigation, progress & motivation.</p>
            </div>
        </div>
    );
}

export default Chatbot;
