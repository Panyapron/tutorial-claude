"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/learn", label: "บทเรียน", match: (p: string) => p.startsWith("/learn") },
    { href: "/glossary", label: "Glossary", match: (p: string) => p === "/glossary" },
    { href: "/troubleshooting", label: "FAQ", match: (p: string) => p === "/troubleshooting" },
    { href: "/playground", label: "Playground", match: (p: string) => p === "/playground" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-11">
          <Link href="/" className="flex items-center gap-2 min-w-0 flex-shrink-0">
            <span className="text-white text-[15px] font-semibold tracking-tight truncate">Learn Claude</span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[11px] sm:text-[13px] font-normal tracking-wide transition-colors whitespace-nowrap",
                  link.match(pathname) ? "text-white" : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
