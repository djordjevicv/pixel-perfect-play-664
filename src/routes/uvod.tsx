import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDocumentTitle, useScript } from "@/i18n/script";
import { updateProgress } from "@/lib/progress";
import { HABITS } from "@/lib/habits";

export const Route = createFileRoute("/uvod")({
  head: () => ({
    meta: [
      { title: "Uvod — AI nije autoritet" },
      { name: "description", content: "Kratko o tome kako generativna AI stvara odgovore i zašto je tvoja procena važna." },
      { property: "og:title", content: "Uvod — AI nije autoritet" },
      { property: "og:description", content: "Kratko o tome kako generativna AI stvara odgovore i zašto je tvoja procena važna." },
    ],
  }),
  component: Intro,
});

function Intro() {
  const { t } = useScript();
  useDocumentTitle("meta.intro.title");
  const firstReady = HABITS[0]?.ready ?? false;

  useEffect(() => {
    updateProgress((p) => ({ ...p, introSeen: true, lastLocation: "/uvod" }));
  }, []);

  const lines = ["intro.l1", "intro.l2", "intro.l3", "intro.l4"] as const;

  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 md:pt-20">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">{t("intro.eyebrow")}</p>
        <Link to="/navike" className="min-h-11 inline-flex items-center text-sm underline underline-offset-4">{t("intro.skip")}</Link>
      </div>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("intro.title")}</h1>
      <ol className="mt-10 space-y-6">
        {lines.map((k, i) => (
          <li key={k} className="fade-up flex gap-5 text-xl leading-relaxed" style={{ animationDelay: `${i * 900}ms` }}>
            <span className="font-display text-2xl text-primary tabular-nums" aria-hidden>{i + 1}</span>
            <span className={i === 3 ? "font-semibold" : ""}>{t(k)}</span>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex flex-wrap items-center gap-3">
        {firstReady ? <Link to="/lekcija/$id" params={{ id: "tool" }} className="btn-primary">
          {t("intro.tryFirst")} <ArrowRight aria-hidden className="h-5 w-5" />
        </Link> : <button type="button" className="btn-primary" disabled aria-describedby="first-soon">{t("intro.tryFirst")}</button>}
        <Link to="/navike" className="btn-quiet">{t("intro.goHabits")}</Link>
      </div>
      {!firstReady && <p id="first-soon" className="mt-3 text-sm text-muted-foreground">{t("intro.firstSoon")}</p>}
    </section>
  );
}
