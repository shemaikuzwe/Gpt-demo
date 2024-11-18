"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react'
import { useUIState, useActions } from "ai/rsc"
import UserMessage from "./user-message"
import AIProvider from "./ai-provider"

export function ChatApp() {
  const [messages, setMessages] = useUIState<typeof AIProvider>()
  const { sendMessage } = useActions()
  const [input, setInput] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input || input.trim() === "") return
    
    setInput("")
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: crypto.randomUUID(),
        role: "user",
        display: <UserMessage>{input}</UserMessage>,
      },
    ])
    
    const res = await sendMessage(input)
    setMessages((prevMessages) => [...prevMessages, res])
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message) => (
            <div key={message.id}>{message.display}</div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t bg-background p-4">
        <div className="mx-auto max-w-2xl">
          <form onSubmit={handleSubmit} className="flex space-x-2">
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
  )
}