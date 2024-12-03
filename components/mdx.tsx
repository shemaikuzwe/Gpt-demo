import React from "react";;
import { highlight } from 'sugar-high';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Heading1Props = React.ComponentPropsWithoutRef<"h1">;
type Heading2Props = React.ComponentPropsWithoutRef<"h2">;
type ParagraphProps = React.ComponentPropsWithoutRef<"p">;
type ListProps = React.ComponentPropsWithoutRef<"ul">;
type ListItemProps = React.ComponentPropsWithoutRef<"li">;
type AnchorProps = React.ComponentPropsWithoutRef<"a">;
type BlockquoteProps = React.ComponentPropsWithoutRef<"blockquote">;
type emProps = React.ComponentPropsWithoutRef<"em">;
const component = {
  table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <Table className="w-full border border-border rounded-md">
      <TableHeader className="bg-muted">
        <TableRow className="px-4 py-2 text-inherit border">
          {data.headers.map((header, index) => (
            <TableHead
              key={index}
              className="px-3 py-1 font-semibold border bg-muted text-inherit"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
  ol: (props: ListProps) => (
    <ol className=" list-decimal pl-5 space-y-2" {...props} />
  ),
  ul: (props: ListProps) => (
    <ul className=" list-disc pl-5 space-y-1" {...props} />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  strong: (props: React.ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-medium" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className = 'text-blue-500 hover:text-blue-700';
      return (
        <a href={href} className={className} target="_blank" {...props}>
          {children}
        </a>
      );
  },
  p: (props: ParagraphProps) => (
    <p className="text-gray-800 leading-snug" {...props} />
  ),
  h1: (props: Heading1Props) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />
  ),
  em: (props:emProps) => (
    <em className="font-medium" {...props} />
  ),
  h2: (props: Heading2Props) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />
  ),
  h3: (props: Heading1Props) => (
    <h1 className="font-medium pt-12 mb-0 fade-in" {...props} />
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-gray-300 pl-4 text-gray-700"
      {...props}
    />
  ),
  code: ({ children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
};

declare global {
  type MDXProvidedComponents = typeof component;
}
export function useMDXComponents(): MDXProvidedComponents {
  return component;
}