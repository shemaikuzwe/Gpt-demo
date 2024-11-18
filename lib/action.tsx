"use server";
import React from "react";
import { getMutableAIState, streamUI } from "ai/rsc";
import { ClientMessage } from "./type";
import { google } from "@ai-sdk/google";
import AIProvider from "@/components/ai-provider";
import { CoreMessage } from "ai";
import ChatMessage from "@/components/chat-message";
import { SpinnerMessage } from "@/components/spinner-message";
import { Markdown } from "@/components/markdown";

const message = `\You are a highly capable programming assistant.
If a user ask anything not related to programming , respond saying that you are a Programming assistant you cannot do that.and suggest what you can assist them,
if a user  impossible tasks such as Running codes and other programming tasks  you are not capable , respond Saying that the This feature is currently unavailable and may added in the future.
your answers should be well explained.if a user asks other questions that does not relate to programming tell user that you don't know it.
`;

export async function sendMessage(
  userMessage: string
): Promise<ClientMessage> {
  const state = getMutableAIState<typeof AIProvider>();

  state.update({
    ...state.get(),
    messages: [
      ...state.get()?.messages,
      {
        id: crypto.randomUUID(),
        role: "user",
        content: userMessage,
      },
    ],
  });
  const result = await streamUI({
    model: google("gemini-1.5-flash-latest"),
    initial:<SpinnerMessage/>,
    system: message,
    messages: [
      ...state.get()?.messages.map((message) => ({
        role: message.role,
        content: message.content,
        id: message.id,
      })),
    ] as CoreMessage[],
    text: async ({ done, content }) => {
      if (done) {
        state.done({
          ...state.get(),
          messages: [
            ...state.get()?.messages,
            {
              id: crypto.randomUUID(),
              role: "assistant",
              content: content,
            },
          ],
        });
      }
      return <ChatMessage> <Markdown>{content}</Markdown></ChatMessage>;
    },
  });
  return {
    id: crypto.randomUUID(),
    role: "assistant",
    display: result.value,
  };
}
