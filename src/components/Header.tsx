"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between px-6 h-14">
        <a
          href="#work"
          className="font-display text-[22px] font-light tracking-tight transition-colors duration-200 hover:text-accent"
        >
          Ali Abuelhassan
        </a>
        <div className="flex items-center gap-7">
          <a
            href="#work"
            className="text-[11px] uppercase tracking-[0.14em] text-muted hover:text-foreground transition-colors duration-200"
          >
            Work
          </a>
          <a
            href="#tools"
            className="text-[11px] uppercase tracking-[0.14em] text-muted hover:text-foreground transition-colors duration-200"
          >
            Tools
          </a>
        </div>
      </nav>
    </header>
  );
}
