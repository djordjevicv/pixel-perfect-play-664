import { HABITS } from "@/lib/habits";

export function EnterMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="44" height="32" rx="5" />
      <path d="M34 11v9H14" />
      <path d="M19 15l-5 5 5 5" />
    </svg>
  );
}

/** Signature hero: ivory Enter keycap with the five habit icons in orbit. */
export function EnterKeyHero({ label }: { label: string }) {
  return (
    <div role="img" aria-label={label} className="relative mx-auto aspect-square w-full max-w-[440px]">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full text-foreground/30" aria-hidden>
        <circle cx="200" cy="200" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 7" className="orbit" />
      </svg>
      <div className="keycap absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="keycap-top">
          <svg viewBox="0 0 100 100" className="h-1/2 w-1/2 text-foreground" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M78 22v34H26" />
            <path d="M40 40L24 56l16 16" />
          </svg>
        </div>
      </div>
      {HABITS.map((h, i) => {
        const angle = (-90 + i * 72) * (Math.PI / 180);
        const x = 50 + 40 * Math.cos(angle);
        const y = 50 + 40 * Math.sin(angle);
        const Icon = h.icon;
        return (
          <span
            key={h.id}
            className="orbit-badge absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/70 bg-background"
            style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 120}ms` }}
            aria-hidden
          >
            <Icon className="h-6 w-6" strokeWidth={1.6} />
          </span>
        );
      })}
    </div>
  );
}
