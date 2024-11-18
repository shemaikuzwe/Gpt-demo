import { CoreMessage } from "ai";

export type Message = CoreMessage & {
  id: string;
};
type Role = "user" | "assistant";
export type ClientMessage = {
  id: string;
  role: Role;
  display: React.ReactNode;
};
export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = ClientMessage[];
