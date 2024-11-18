"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserMessage from "./user-message";
import { useUIState, useActions } from "ai/rsc";
import AIProvider from "./ai-provider";
import { Plus, Send } from "lucide-react";

export function ChatApp() {
  const [messages, setMessages] = useUIState<typeof AIProvider>();
  const { sendMessage } = useActions();
  const [input, setInput] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || input.trim() == "") return;
    setInput("");
    setMessages((prevMessage) => [
      ...prevMessage,
      {
        id: crypto.randomUUID(),
        role: "user",
        display: <UserMessage>{input}</UserMessage>,
      },
    ]);
    const res = await sendMessage(input);
    setMessages((prevMessage) => [...prevMessage, res]);
  };
  return (
    <div className={`flex h-screen`}>
      <div className="w-64 bg-gray-100 border-r dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2 space-y-2">
            {["React Basics", "CSS Flexbox", "JavaScript Arrays"].map(
              (chat, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {chat}
                </Button>
              )
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h1 className="text-xl font-bold dark:text-white">Chat Gpt demo</h1>
        </header>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id}>{message.display}</div>
            ))}
          </div>
        </ScrollArea>
        <footer className="p-4 border-t dark:border-gray-700">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              value={input}
              name="message"
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </footer>
      </div>
    </div>
  );
}
