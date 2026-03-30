import Header from "@/components/Header";
import BrowserFrame from "@/components/BrowserFrame";
import ToolBar from "@/components/ToolBar";

const FIRST = "Ali";
const LAST = "Abuelhassan";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 pb-28">
        {/* Hero — letter-by-letter stagger */}
        <section className="pt-20 pb-24">
          <h1 className="font-display font-light leading-[0.9] tracking-tight text-foreground mb-6 text-[72px] md:text-[108px] lg:text-[128px]">
            {FIRST.split("").map((char, i) => (
              <span
                key={`f${i}`}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {char}
              </span>
            ))}
            <br />
            {LAST.split("").map((char, i) => (
              <span
                key={`l${i}`}
                className="inline-block animate-fade-in-up"
                style={{ animationDelay: `${140 + i * 30}ms` }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p
            className="text-[10px] uppercase tracking-[0.24em] text-muted font-medium animate-fade-in-up"
            style={{ animationDelay: "520ms" }}
          >
            Product Designer &amp; Builder
          </p>
        </section>

        {/* Featured Project */}
        <section id="work" className="pb-20 animate-fade-in-up stagger-1">
          <BrowserFrame
            url="https://theinvisiblehand.replit.app/"
            title="The Invisible Hand"
            subtitle="A behavioral economics game exploring decision-making under pressure."
            featured
            badge="Featured"
          />
        </section>

        {/* Project Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-24">
          <div className="animate-fade-in-up stagger-2">
            <BrowserFrame
              url="https://hoa-trak.replit.app/"
              title="HOA Track"
              subtitle="A lightweight tool for managing HOA workflows and visibility."
            />
          </div>
          <div className="animate-fade-in-up stagger-3">
            <BrowserFrame
              url="https://finalself-mvp.vercel.app/"
              title="Final Self"
              subtitle="A court submission workflow tool for changing your name in California."
            />
          </div>
        </section>

        {/* Tools */}
        <ToolBar />
      </main>
    </>
  );
}
