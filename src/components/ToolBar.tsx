const tools = [
  {
    name: "Claude Code",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M4.709 15.955l4.72-2.756.08-.046 2.503-1.46 2.503 1.46.08.046 4.72 2.756-2.46 1.435-4.843-2.826-4.843 2.826-2.46-1.435zm7.303-13.91l6.066 3.54v3.09L12.012 5.6 5.946 8.676V5.585l6.066-3.54zm6.066 7.47v3.09l-2.503 1.46V10.976l2.503-1.46zM5.946 9.514l2.503 1.461v3.09l-2.503-1.46v-3.09zm6.066 10.93l6.066-3.54v2.866l-6.066 3.54-6.066-3.54v-2.866l6.066 3.54z" />
      </svg>
    ),
  },
  {
    name: "Vercel / v0",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M12 2L2 19.5h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "Replit",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M2 4a2 2 0 012-2h7v7H2V4zm0 9h9v9H4a2 2 0 01-2-2v-7zm11-11h7a2 2 0 012 2v16a2 2 0 01-2 2h-7V2z" />
      </svg>
    ),
  },
  {
    name: "Cursor",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
        <path d="M5.5 3.21a1 1 0 00-1.3 1.3l7.54 17.2a.5.5 0 00.93-.07l1.89-6.2 6.2-1.89a.5.5 0 00.07-.93L5.5 3.21z" />
      </svg>
    ),
  },
];

export default function ToolBar() {
  return (
    <section id="tools" className="animate-fade-in-up stagger-4" aria-label="Tools used">
      <p className="text-[10px] uppercase tracking-[0.22em] text-accent/50 mb-5 font-medium select-none">
        Built with
      </p>
      <div className="flex flex-wrap gap-2" role="list">
        {tools.map((tool) => (
          <div
            key={tool.name}
            role="listitem"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded border border-border bg-card text-[12px] font-medium tracking-wide text-foreground/60 transition-colors duration-200 hover:border-accent/40 hover:text-foreground"
          >
            <span className="text-foreground/40">{tool.icon}</span>
            {tool.name}
          </div>
        ))}
      </div>
    </section>
  );
}
