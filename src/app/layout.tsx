import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {
  Sidebar,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/custom/app-sidebar";
import { Icons } from "@/components/icons";
import { FreshtrackTrigger } from "@/components/custom/freshtrack-trigger";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="absolute w-screen h-screen">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
