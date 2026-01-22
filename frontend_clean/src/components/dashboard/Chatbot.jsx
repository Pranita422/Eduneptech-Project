import React from "react";

function Chatbot({ chatOpen, setChatOpen, messages, input, setInput, onSendMessage }) {
    if (!chatOpen) return null;

    return (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-xl p-4 border border-gray-300">
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-violet-700">🤖 EduBot</h3>
                <button
                    onClick={() => setChatOpen(false)}
                    className="text-red-500 text-xl font-bold"
                >
                    ✖
                </button>
            </div>
            <div className="h-64 overflow-y-auto border p-2 rounded text-sm">
                {messages.map((m, i) => (
                    <p key={i}>
                        <strong>{m.sender}:</strong> {m.text}
                    </p>
                ))}
            </div>
            <div className="flex mt-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 border p-2 rounded"
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                />
                <button
                    onClick={onSendMessage}
                    className="ml-2 bg-violet-600 text-white px-3 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbot;
