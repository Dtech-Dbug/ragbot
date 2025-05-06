import React from "react";
import { FiTrash2 } from 'react-icons/fi';
import { FilePreview } from "./FilePreview";
import { ChatWindow } from "./ChatWindow";
import { useChatAndPreview } from "./useChatAndPreview";


export default function ChatPreview() {
    const { handleDeleteFile, sendMessage, messages, messagesEndRef, input, setInput, handleDeleteChatHistory, loading } = useChatAndPreview()

    return (
        <div className="flex h-screen bg-gray-50">
            {/* File preview side */}
            <div className="w-1/2 p-6 border-r border-gray-300 bg-white overflow-auto">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">File Preview</h2>
                    <button
                        onClick={handleDeleteFile} // your delete handler function
                        className="ml-4 text-gray-600 hover:text-red-600"
                        aria-label="Delete file"
                        title="Delete file"
                    >
                        <FiTrash2 size={20} />
                    </button>
                </div>
                <FilePreview />
            </div>

            {/* Chat side */}
            <ChatWindow
                messages={messages}
                messagesEndRef={messagesEndRef}
                input={input}
                setInput={setInput}
                sendMessage={sendMessage}
                loading={loading}
                handleDeleteChatHistory={handleDeleteChatHistory} // your delete handler function
            />

        </div>
    );
}
