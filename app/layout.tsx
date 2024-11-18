import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AIProvider from "@/components/ai-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavBar } from "@/components/nav-bar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gpt Demo",
  description: "Gpt Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <AIProvider>
          <SidebarProvider defaultOpen={false} >
           <div  className="flex flex-col w-full h-screen">
           <NavBar />
           {children}
           </div>
          </SidebarProvider>
        </AIProvider>
      </body>
    </html>
  );
}
