"use client";

import React, { RefObject, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useUIState, useActions } from "ai/rsc";
import UserMessage from "./user-message";
import AIProvider from "./ai-provider";
import EmptyScreen from "@/components/empty-screen";
import useScroll from "@/hooks/use-scroll";
import { ScrollAnchor } from "./scroll-anchor";
export function ChatApp() {
  const [messages, setMessages] = useUIState<typeof AIProvider>();
  const { sendMessage } = useActions();
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || input.trim() === "") return;

    setInput("");
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        display: <UserMessage>{input}</UserMessage>,
      },
    ]);

    const res = await sendMessage(input);
    setMessages((prevMessages) => [...prevMessages, res]);
  };
  const {
    isAtBottom,
    scrollToBottom,
    messagesRef,
    visibilityRef,
    handleScroll,
  } = useScroll();
  return (
    <div className="flex overflow-hidden h-[90vh] flex-col  sm:ml-20">
      <ScrollArea
        className="flex-grow w-full overflow-y-auto"
        onScrollCapture={handleScroll}
        ref={visibilityRef}
       
      >
        {messages.length == 0 ? (
          <EmptyScreen input={input} formRef={formRef} setInput={setInput}  />
        ) : (
          <div className="mx-auto max-md:w-full space-y-4" ref={messagesRef}>
            {messages.map((message) => (
              <div key={message.id}>{message.display}</div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="mx-auto flex justify-center items-center p-4">
        <ScrollAnchor isAtBottom={isAtBottom} scrollToBottom={scrollToBottom} />
      </div>
      <div className="sticky bottom-0 left-0 w-full shadow-sm mb-10">
        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="flex space-x-2"
            ref={formRef}
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
