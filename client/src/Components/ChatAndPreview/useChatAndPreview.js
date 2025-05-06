import { useContext, useState, useEffect, useRef, useCallback } from "react";
import { AppProviderContext } from "../../Provider";
import { BASE_URL } from "../../constants";

export const useChatAndPreview = () => {
    const { setFile } = useContext(AppProviderContext)
    const [loading, setLoading] = useState(false); // seperate loading state for chat messages to prevent re-renders for all provider children
    const [messages, setMessages] = useState(localStorage.getItem("messages") ? JSON.parse(localStorage.getItem("messages")) : [
        { id: 1, text: "Hello! How can I assist you?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        localStorage.setItem("messages", JSON.stringify(messages));
    }, [messages]);



    const handleDeleteFile = () => {
        setFile(null)
    }


    const handleDeleteChatHistory = () => {
        const initialMessage = [
            { id: 1, text: "Hello! How can I assist you?", sender: "bot" }
        ];
        setMessages(initialMessage);
        localStorage.setItem("messages", JSON.stringify(initialMessage));
    }

    const sendMessage = useCallback(async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");

        try {
            setLoading(true)
            const resp = await fetch(`${BASE_URL}/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [
                        { role: 'user', content: input }
                    ]
                }),
            });

            if (!resp.ok) {
                throw new Error("Failed to get response from assistant");
            }

            const data = await resp.json();

            // Adjust this depending on your backend response structure
            const assistantText = data.message?.content || data.content || "No response";
            setLoading(false)

            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: assistantText, sender: "bot" }
            ]);
        } catch (err) {
            alert(`oops something went wrong, error - ${err}`)
            setLoading(false)
        }
    }, [input])



    return {
        handleDeleteFile,
        sendMessage,
        messages,
        messagesEndRef,
        setInput,
        input,
        handleDeleteChatHistory,
        loading
    }

}