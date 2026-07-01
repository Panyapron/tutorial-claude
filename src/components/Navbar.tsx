"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-violet-500/20 flex-shrink-0">
              C
            </div>
            <span className="font-semibold text-white hidden sm:inline truncate">Learn Claude</span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/learn"
              className={cn(
                "px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap",
                pathname.startsWith("/learn")
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              บทเรียน
            </Link>
            <Link
              href="/playground"
              className={cn(
                "px-2.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors whitespace-nowrap",
                pathname === "/playground"
                  ? "bg-violet-500/10 text-violet-400"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
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
