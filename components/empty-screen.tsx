import { exampleMessages } from "@/lib/data";
import React from "react";

interface Props {
  input: string;
  formRef: React.RefObject<HTMLFormElement | null>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}
export default function EmptyScreen({ formRef, setInput, input }: Props) {
  return (
    <div className="flex flex-col sm:mt-20 items-center justify-center p-4 w-full  ">
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <div className="w-full grid gap-2 sm:grid-cols-1 lg:grid-cols-2">
          {exampleMessages.map((example, index) => (
            <div
              key={example.heading}
              onClick={() => {
                setInput(example.message);
                if (input) {
                  formRef.current?.requestSubmit();
                }
                return;
              }}
              className={`cursor-pointer rounded-md border bg-white p-2 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900 ${
                index > 1 && "hidden md:block"
              }`}
            >
              <div className="text-sm font-semibold">{example.heading}</div>
              <div className="text-sm text-zinc-600">{example.subheading}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
