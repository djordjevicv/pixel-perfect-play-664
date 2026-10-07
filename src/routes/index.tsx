import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useDocumentTitle, useScript } from "@/i18n/script";
import { EnterKeyHero } from "@/components/EnterKey";
import { HabitGrid } from "@/components/HabitGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI nije autoritet — Pet navika pre „Enter“" },
      { name: "description", content: "Pet svakodnevnih situacija za promišljenije korišćenje AI." },
      { property: "og:title", content: "AI nije autoritet — Pet navika pre „Enter“" },
      { property: "og:description", content: "Pet svakodnevnih situacija za promišljenije korišćenje AI." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const { t } = useScript();
  useDocumentTitle("meta.home.title");
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 sm:px-8 md:grid-cols-[1.25fr_1fr] md:pt-16">
        <div className="fade-up">
          <h1 className="text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
            {t("welcome.headline1")}
            <br />
            {t("welcome.headline2")}
          </h1>
          <p className="mt-6 max-w-xl text-xl text-muted-foreground">{t("welcome.sub")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/uvod" className="btn-primary">
              {t("welcome.start")} <ArrowRight aria-hidden className="h-5 w-5" />
            </Link>
            <Link to="/navike" className="btn-quiet">{t("welcome.explore")}</Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("welcome.helper")}</p>
        </div>
        <EnterKeyHero label={t("welcome.heroAlt")} />
      </section>

      <section className="mx-auto mt-14 max-w-6xl px-5 sm:px-8" aria-labelledby="five-q">
        <div className="border-t border-border pt-10">
          <h2 id="five-q" className="text-3xl font-semibold sm:text-4xl">{t("habits.title")}</h2>
          <div className="mt-6"><HabitGrid /></div>
        </div>
      </section>
    </>
  );
}
