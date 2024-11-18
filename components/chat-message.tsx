import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function ChatMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex justify-start">
     <div className="flex items-start space-x-2 max-w-[70%] ">
      <Avatar>
        <AvatarFallback>Ai</AvatarFallback>
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div className="rounded-lg p-3 text-foreground ">
        {children}
      </div>
    </div>
   </div>
  );
}
