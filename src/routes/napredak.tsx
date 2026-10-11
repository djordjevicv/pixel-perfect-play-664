import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Circle, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { HABITS } from "@/lib/habits";
import { completedCount, resetProgress, useProgress } from "@/lib/progress";
import { useScript } from "@/i18n/script";
import type { DictKey } from "@/i18n/dictionaries";

export const Route = createFileRoute("/napredak")({ component: ProgressPage });

const recommendation = {
  latn: {
    tool: "Za promenljive podatke pronađi aktuelan, nadležan izvor.", data: "Pre deljenja zadrži samo podatke potrebne za zadatak.", verify: "Proveri datum, uslove i domet tvrdnje.", perspective: "Potraži protivargument i informacije koje nedostaju.", autonomy: "Koristi AI za opcije, a odluku zadrži za sebe.",
  },
  cyrl: {
    tool: "За променљиве податке пронађи актуелан, надлежан извор.", data: "Пре дељења задржи само податке потребне за задатак.", verify: "Провери датум, услове и домет тврдње.", perspective: "Потражи противаргумент и информације које недостају.", autonomy: "Користи АИ за опције, а одлуку задржи за себе.",
  },
} as const;

export function ProgressPage() {
  const { script, t } = useScript();
  const progress = useProgress();
  const done = completedCount(progress);
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { document.title = `${script === "latn" ? "Tvojih pet navika" : "Твојих пет навика"} — ${t("app.name")}`; }, [script, t]);
  return <section className="mx-auto max-w-5xl px-5 pt-12 sm:px-8 md:pt-16">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><p className="eyebrow">{done}/5</p><h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{script === "latn" ? "Tvojih pet navika" : "Твојих пет навика"}</h1></div>
      <Link to="/podsetnik" className="btn-quiet">{script === "latn" ? "Otvori podsetnik" : "Отвори подсетник"}</Link>
    </div>
    <p className="mt-4 max-w-3xl text-muted-foreground">{script === "latn" ? "Ovo je pregled vežbanja u ovom pregledaču, a ne pouzdana procena ukupnog znanja ili sposobnosti." : "Ово је преглед вежбања у овом прегледачу, а не поуздана процена укупног знања или способности."}</p>
    <ol className="mt-8 grid gap-4">
      {HABITS.map((habit, index) => {
        const s = progress.scenarios[habit.id];
        const applied = Boolean(s?.practiceCompleted && s.transferFirstCorrect);
        const completed = Boolean(s?.practiceCompleted);
        const status = applied ? (script === "latn" ? "Primenjeno u novom primeru" : "Примењено у новом примеру") : completed ? (script === "latn" ? "Vežba završena" : "Вежба завршена") : (script === "latn" ? "Nije započeto" : "Није започето");
        const Icon = applied ? Sparkles : completed ? CheckCircle2 : Circle;
        return <li key={habit.id} className="progress-card">
          <div className="flex gap-4"><Icon aria-hidden className={`mt-1 h-6 w-6 shrink-0 ${completed ? "text-positive" : "text-muted-foreground"}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm text-muted-foreground">0{index + 1} · {status}</p>
              <h2 className="mt-1 text-2xl font-semibold">{t(`habit.${habit.id}.name` as DictKey)}</h2>
              <p className="mt-1">{t(`habit.${habit.id}.question` as DictKey)}</p>
              <p className="mt-3 text-sm text-muted-foreground">{recommendation[script][habit.id]}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to="/lekcija/$id" params={{ id: habit.id }} className="btn-quiet">{completed ? (script === "latn" ? "Ponovi lekciju" : "Понови лекцију") : t("habits.open")}</Link>
                {completed && <Link to="/provera/$id" params={{ id: habit.id }} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">{s?.transferFirstChoiceId ? (script === "latn" ? "Ponovi novi primer" : "Понови нови пример") : (script === "latn" ? "Probaj novi primer" : "Пробај нови пример")}</Link>}
              </div>
            </div>
          </div>
        </li>;
      })}
    </ol>
    <div className="mt-10 border-t border-border pt-6">
      {!confirm ? <button type="button" className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4" onClick={() => setConfirm(true)}><RotateCcw aria-hidden className="h-4 w-4" />{script === "latn" ? "Obriši napredak" : "Обриши напредак"}</button> : <div className="rounded-md border border-caution/40 bg-caution/5 p-4">
        <p className="font-semibold">{script === "latn" ? "Obrisati sve završene vežbe? Izabrano pismo ostaje sačuvano." : "Обрисати све завршене вежбе? Изабрано писмо остаје сачувано."}</p>
        <div className="mt-3 flex gap-3"><button type="button" className="btn-quiet" onClick={() => setConfirm(false)}>{script === "latn" ? "Odustani" : "Одустани"}</button><button type="button" className="btn-primary" onClick={() => { resetProgress(); setConfirm(false); }}>{script === "latn" ? "Obriši" : "Обриши"}</button></div>
      </div>}
    </div>
  </section>;
}
