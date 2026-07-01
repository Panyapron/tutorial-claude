import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Learn Claude - สื่อการเรียนรู้ Claude",
  description: "เรียนรู้ Claude ตั้งแต่เริ่มต้น: Prompt, MCP, Skills, Claude Code และ Harness แบบ visual",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-apple-bg text-apple-ink min-h-screen antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
