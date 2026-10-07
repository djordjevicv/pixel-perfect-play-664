import { useScript } from "@/i18n/script";
import { HABITS } from "@/lib/habits";
import type { DictKey } from "@/i18n/dictionaries";
import { Link } from "@tanstack/react-router";
import { useProgress } from "@/lib/progress";

export function HabitGrid() {
  const { t } = useScript();
  const progress = useProgress();
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {HABITS.map((h, i) => {
        const Icon = h.icon;
        const name = t(`habit.${h.id}.name` as DictKey);
        return (
          <li key={h.id}>
            <article className="habit-card" aria-label={h.ready ? name : t("habits.soonAria", { name })}>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span className="tabular-nums">0{i + 1}</span>
                {!h.ready && (
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide">
                    {t("habits.soon")}
                  </span>
                )}
              </div>
              <Icon aria-hidden className="h-9 w-9" strokeWidth={1.5} />
              <h3 className="text-2xl font-semibold leading-tight">{name}</h3>
              <p className="text-muted-foreground">{t(`habit.${h.id}.question` as DictKey)}</p>
              {h.ready && <Link to="/lekcija/$id" params={{ id: h.id }} className="mt-auto inline-flex min-h-11 items-center font-semibold underline decoration-primary decoration-2 underline-offset-4">
                {progress.scenarios[h.id]?.practiceCompleted ? t("habits.completed") : t("habits.open")} →
              </Link>}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
