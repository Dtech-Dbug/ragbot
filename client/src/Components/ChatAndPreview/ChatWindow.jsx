import React, { memo } from "react";
import { FiTrash2 } from 'react-icons/fi';
import { Loader } from "../Loader";

export const ChatWindow = memo(({ messages, messagesEndRef, input, setInput, sendMessage, loading, handleDeleteChatHistory }) => {
    return (
        <div className="w-1/2 flex flex-col p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold mb-4">Chat</h2>
                <button
                    onClick={handleDeleteChatHistory}
                    className="ml-4 text-gray-600 hover:text-red-600"
                    aria-label="Delete Chat"
                    title="Delete Chat History"
                >
                    <FiTrash2 size={20} />
                </button>
            </div>
            <div className="flex-grow overflow-auto border border-gray-300 rounded p-4 bg-gray-100">
                {messages.map(({ id, text, sender }) => (
                    <div
                        key={id}
                        className={`mb-3 max-w-[70%] p-2 rounded ${sender === "user"
                            ? "bg-blue-500 text-white self-end"
                            : "bg-gray-300 text-gray-800 self-start"
                            }`}
                    >
                        {text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 flex gap-2">
                {loading ? (
                    <Loader loadingMessage="Finding Answers..." />
                ) : (
                    <>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            Send
                        </button>
                    </>
                )}
            </div>
        </div>
    );
});

