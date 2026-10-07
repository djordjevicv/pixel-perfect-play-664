import { Link } from "@tanstack/react-router";
import { useScript } from "@/i18n/script";
import { completedCount, HABIT_IDS, useProgress, useStorageFailed } from "@/lib/progress";
import { EnterMark } from "./EnterKey";

export function SiteHeader() {
  const { t, script, setScript, storageOk } = useScript();
  const progress = useProgress();
  const progressStorageFailed = useStorageFailed();
  const done = completedCount(progress);

  return (
    <header className="border-b border-border/70">
      <a href="#main" className="skip-link">{t("nav.skip")}</a>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 py-4 sm:px-8">
        <Link to="/" className="focus-ring flex min-h-11 items-center gap-3 rounded-md" aria-label={`${t("app.name")} — ${t("nav.home")}`}>
          <EnterMark className="h-9 w-12 shrink-0 text-foreground" />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-xl font-semibold sm:text-2xl">{t("app.name")}</span>
            <span className="text-sm text-muted-foreground">{t("app.tagline")}</span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px]">
          <Link to="/napredak" className="focus-ring flex min-h-11 items-center gap-2 rounded-md" aria-label={t("nav.progressAria", { n: done })}>
            <span>{t("nav.progress")}</span>
            <span className="tabular-nums text-muted-foreground">{done}/5</span>
            <span className="hidden gap-1 sm:flex" aria-hidden>
              {HABIT_IDS.map((id) => (
                <span key={id} className={`h-3 w-3 rounded-full border border-foreground/60 ${progress.scenarios[id]?.practiceCompleted ? "bg-positive border-positive" : ""}`} />
              ))}
            </span>
          </Link>
          <Link to="/o-aplikaciji" className="focus-ring flex min-h-11 items-center rounded-md" activeProps={{ className: "underline underline-offset-4" }}>
            {t("nav.about")}
          </Link>
          <div role="group" aria-label={t("nav.script")} className="script-toggle">
            <button type="button" lang="sr-Latn" aria-pressed={script === "latn"} onClick={() => setScript("latn")}>Latinica</button>
            <button type="button" lang="sr-Cyrl" aria-pressed={script === "cyrl"} onClick={() => setScript("cyrl")}>Ћирилица</button>
          </div>
        </nav>
      </div>
      {(!storageOk || progressStorageFailed) && (
        <p role="status" className="bg-caution/10 px-5 py-2 text-center text-sm text-foreground">{t("storage.unavailable")}</p>
      )}
    </header>
  );
}

export function SiteFooter() {
  const { t } = useScript();
  return (
    <footer className="mx-auto mt-16 max-w-6xl px-5 pb-10 sm:px-8">
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span className="h-px flex-1 bg-border" />
        <p className="text-center">{t("footer.text")}</p>
        <span className="h-px flex-1 bg-border" />
      </div>
    </footer>
  );
}
