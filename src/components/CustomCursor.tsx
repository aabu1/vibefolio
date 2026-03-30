"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    // Console easter egg — for the curious ones
    console.log(
      "%c Ali Abuelhassan ",
      "background: #b8975a; color: #0c0b0a; font-size: 13px; font-weight: bold; padding: 3px 8px;"
    );
    console.log(
      "%chello, curious one — this is exactly the kind of attention to detail I bring to the work.",
      "color: #ede8df; font-size: 12px; font-style: italic;"
    );

    let x = -100, y = -100, tx = -100, ty = -100;
    let hovering = false;
    let prevHovering = false;
    let raf = 0;

    document.documentElement.style.cursor = "none";
    el.style.opacity = "0";

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      el.style.opacity = "1";
    };
    const onOver = (e: MouseEvent) => {
      hovering = !!(e.target as Element).closest("a, button");
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!el) return;
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el.style.transform = `translate(${x}px, ${y}px)`;

      if (hovering !== prevHovering) {
        prevHovering = hovering;
        const size = hovering ? 20 : 6;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.marginLeft = `${-size / 2}px`;
        el.style.marginTop = `${-size / 2}px`;
        el.style.opacity = hovering ? "0.22" : "0.55";
      }
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none rounded-full bg-foreground"
      style={{
        width: 6,
        height: 6,
        marginLeft: -3,
        marginTop: -3,
        zIndex: 99999,
        opacity: 0,
        transition: "width 0.2s ease-out, height 0.2s ease-out, margin 0.2s ease-out, opacity 0.3s ease-out",
      }}
    />
  );
}
