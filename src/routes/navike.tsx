import { createFileRoute, Link } from "@tanstack/react-router";
import { useDocumentTitle, useScript } from "@/i18n/script";
import { HabitGrid } from "@/components/HabitGrid";
import { completedCount, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/navike")({
  head: () => ({
    meta: [
      { title: "Pet pitanja pre „Enter“ — AI nije autoritet" },
      { name: "description", content: "Pet navika za promišljeno korišćenje AI: pravi alat, podaci, provera, drugi ugao i tvoja odluka." },
      { property: "og:title", content: "Pet pitanja pre „Enter“ — AI nije autoritet" },
      { property: "og:description", content: "Pet navika za promišljeno korišćenje AI: pravi alat, podaci, provera, drugi ugao i tvoja odluka." },
    ],
  }),
  component: Habits,
});

function Habits() {
  const { t } = useScript();
  useDocumentTitle("meta.habits.title");
  const done = completedCount(useProgress());
  return (
    <section className="mx-auto max-w-6xl px-5 pt-12 sm:px-8 md:pt-16">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← {t("nav.backHome")}</Link>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold sm:text-5xl">{t("habits.title")}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{t("habits.sub")}</p>
        </div>
        <p className="text-muted-foreground tabular-nums">{t("habits.done", { n: done })}</p>
      </div>
      <div className="mt-8"><HabitGrid /></div>
    </section>
  );
}
