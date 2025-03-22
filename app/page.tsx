"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi, I'm Lexa! Ask me anything about History." }]);
  const [input, setInput] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, userMessage] }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
  };

  return (
    <main className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lexa – Your AI History Tutor</h1>
      <div className="space-y-4 mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`p-3 rounded-md ${msg.role === "user" ? "bg-blue-100" : "bg-green-100"}`}>
            <strong>{msg.role === "user" ? "You" : "Lexa"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a History question..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </main>
  );
}
