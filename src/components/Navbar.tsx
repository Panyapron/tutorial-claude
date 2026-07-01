"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-11">
          <Link href="/" className="flex items-center gap-2 min-w-0">
            <span className="text-white text-[15px] font-semibold tracking-tight truncate">Learn Claude</span>
          </Link>

          <div className="flex items-center gap-5 sm:gap-8">
            <Link
              href="/learn"
              className={cn(
                "text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors whitespace-nowrap",
                pathname.startsWith("/learn") ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              บทเรียน
            </Link>
            <Link
              href="/playground"
              className={cn(
                "text-[12px] sm:text-[13px] font-normal tracking-wide transition-colors whitespace-nowrap",
                pathname === "/playground" ? "text-white" : "text-white/60 hover:text-white"
              )}
            >
              Playground
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
