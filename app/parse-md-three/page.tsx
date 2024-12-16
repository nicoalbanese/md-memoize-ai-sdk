"use client";

import { useChat } from "ai/react";
import { MemoizedMarkdown } from "./markdown";

export default function Page() {
  const { messages } = useChat({
    id: "chat",
  });

  return (
    <div className="flex flex-col w-full max-w-xl py-24 mx-auto stretch">
      <div className="space-y-8 mb-4">
        {messages.map((message) => (
          <div key={message.id}>
            <div className="font-bold mb-2">
              {message.role === "user" ? "You" : "Assistant"}
            </div>
            <div className="prose space-y-2">
              <MemoizedMarkdown id={message.id} content={message.content} />
            </div>
          </div>
        ))}
      </div>

      <Chat />
    </div>
  );
}

const Chat = () => {
  const { input, handleSubmit, handleInputChange } = useChat({ id: "chat" });
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="fixed bottom-0 w-full max-w-xl p-2 mb-8 border border-gray-300 rounded shadow-xl"
        placeholder="Say something..."
        value={input}
        onChange={handleInputChange}
      />
    </form>
  );
};
