import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-start">
      <div className="flex items-start space-x-2 max-w-[70%] ">
        <Avatar>
          <AvatarFallback>User</AvatarFallback>
          <AvatarImage src="/palceholder.svg" />
        </Avatar>
        <div className="rounded-lg p-3 bg-gray-200 dark:bg-gray-700 dark:text-white">
          {children}
        </div>
      </div>
    </div>
  );
}
