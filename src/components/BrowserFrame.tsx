"use client";

import { useState } from "react";

interface BrowserFrameProps {
  url: string;
  title: string;
  subtitle: string;
  featured?: boolean;
  badge?: string;
}

export default function BrowserFrame({
  url,
  title,
  subtitle,
  featured = false,
  badge,
}: BrowserFrameProps) {
  const [iframeError, setIframeError] = useState(false);
  const [active, setActive] = useState(false);
  const displayUrl = url.replace("https://", "").replace(/\/$/, "");

  return (
    <div className="group flex flex-col gap-5">
      {/* Browser window */}
      <div
        className={`relative rounded-lg border bg-card overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          active
            ? "shadow-2xl shadow-black/60 -translate-y-1.5 border-accent/40 ring-1 ring-accent/20"
            : "border-border group-hover:shadow-2xl group-hover:shadow-black/60 group-hover:-translate-y-1.5 group-hover:border-border/60"
        }`}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-card">
          <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${active ? "bg-[#ff6159]/60" : "bg-border group-hover:bg-[#ff6159]/60"}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${active ? "bg-[#ffbd2e]/60" : "bg-border group-hover:bg-[#ffbd2e]/60"}`} />
            <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-500 ${active ? "bg-[#28c840]/60" : "bg-border group-hover:bg-[#28c840]/60"}`} />
          </div>
          <div className="flex-1 mx-6">
            <div className="bg-background/50 rounded px-3 py-1 text-[10px] text-muted/50 text-center font-mono truncate select-none">
              {displayUrl}
            </div>
          </div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted/40 hover:text-accent transition-colors duration-200"
            aria-label={`Open ${title} in new tab`}
            title="Open in new tab"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Iframe area */}
        <div
          className={`relative ${featured ? "aspect-video" : "aspect-[4/5.4]"}`}
        >
          {badge && (
            <span className="absolute top-3 left-3 z-10 bg-accent text-background text-[9px] font-medium tracking-[0.16em] uppercase px-2.5 py-1 pointer-events-none">
              {badge}
            </span>
          )}
          {!iframeError ? (
            <>
              <iframe
                src={url}
                title={title}
                className={`w-full h-full border-0 ${active ? "" : "pointer-events-none"}`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onError={() => setIframeError(true)}
                tabIndex={active ? 0 : -1}
              />
              {!active && (
                <button
                  onClick={() => setActive(true)}
                  className="absolute inset-0 z-10 flex items-center justify-center bg-transparent cursor-pointer group/overlay"
                  aria-label={`Interact with ${title}`}
                >
                  <span className="opacity-0 group-hover:opacity-100 group-hover/overlay:opacity-100 transition-opacity duration-300 bg-background/80 backdrop-blur-sm text-foreground text-xs font-medium tracking-wide uppercase px-4 py-2 rounded-full border border-border/60">
                    Click to interact
                  </span>
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-card gap-2">
              <p className="text-sm text-muted">Preview unavailable</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-accent"
              >
                Open project &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Title + subtitle */}
      <div className="px-0.5">
        <h3
          className={`font-display font-light tracking-tight leading-none transition-colors duration-300 group-hover:text-accent ${
            featured ? "text-[36px] md:text-[44px]" : "text-[26px]"
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-muted leading-relaxed ${
            featured ? "text-sm mt-3" : "text-[13px] mt-2"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
