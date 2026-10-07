import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, TriangleAlert } from "lucide-react";
import { CHECKS } from "@/content/checks";
import { HABIT_IDS, recordTransferChoice, type HabitId, useProgress } from "@/lib/progress";
import { useScript } from "@/i18n/script";

export const Route = createFileRoute("/provera/$id")({
  beforeLoad: ({ params }) => { if (!HABIT_IDS.includes(params.id as HabitId)) throw notFound(); },
  component: Transfer,
});

function Transfer() {
  const { id: rawId } = Route.useParams();
  const id = rawId as HabitId;
  const { script, t } = useScript();
  const check = CHECKS[id];
  const text = check.text[script];
  const saved = useProgress().scenarios[id];
  const [choice, setChoice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const correct = choice === check.correctId;
  const firstWasCorrect = saved?.transferFirstCorrect;
  useEffect(() => { document.title = `${script === "latn" ? "Novi primer" : "Нови пример"} — ${t("app.name")}`; }, [script, t]);

  const submit = () => {
    if (!choice || submitted) return;
    recordTransferChoice(id, choice, correct);
    setSubmitted(true);
  };

  return <section className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 md:pt-16">
    <Link to="/lekcija/$id" params={{ id }} className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft aria-hidden className="h-4 w-4" />{script === "latn" ? "Nazad na lekciju" : "Назад на лекцију"}</Link>
    <p className="eyebrow mt-5">{script === "latn" ? "Novi primer · nije obavezan" : "Нови пример · није обавезан"}</p>
    <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{text.question}</h1>
    <form className="mt-8" onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <fieldset disabled={submitted} className="grid gap-3">
        <legend className="sr-only">{text.question}</legend>
        {check.choiceIds.map((choiceId, i) => <label key={choiceId} className={`decision-choice ${choice === choiceId ? "is-selected" : ""}`}>
          <input type="radio" name="check-choice" value={choiceId} checked={choice === choiceId} onChange={() => setChoice(choiceId)} />
          <span className="choice-letter" aria-hidden>{String.fromCharCode(65 + i)}</span>
          <span>{text.choices[choiceId]}</span>
        </label>)}
      </fieldset>
      {!submitted && <button type="submit" className="btn-primary mt-5" disabled={!choice}>{t("lesson.check")}</button>}
    </form>
    {submitted && <div className={`feedback-panel ${correct ? "is-good" : "is-caution"}`} role="status">
      <p className="eyebrow flex items-center gap-2">{correct ? <CheckCircle2 aria-hidden className="h-4 w-4" /> : <TriangleAlert aria-hidden className="h-4 w-4" />}{correct ? (script === "latn" ? "Dobar izbor" : "Добар избор") : (script === "latn" ? "Pokušaj ponovo" : "Покушај поново")}</p>
      <p className="mt-2 text-lg">{text.feedback}</p>
      {firstWasCorrect === false && <p className="mt-3 text-sm text-muted-foreground">{script === "latn" ? "Novi pokušaj pomaže vežbanju, ali prvi odgovor ostaje zabeležen." : "Нови покушај помаже вежбању, али први одговор остаје забележен."}</p>}
      <div className="mt-5 flex flex-wrap gap-3">
        {!correct && <button type="button" className="btn-quiet" onClick={() => { setChoice(""); setSubmitted(false); }}>{script === "latn" ? "Probaj ponovo" : "Пробај поново"}</button>}
        <Link to="/napredak" className="btn-primary">{script === "latn" ? "Pogledaj napredak" : "Погледај напредак"}<ArrowRight aria-hidden className="h-5 w-5" /></Link>
      </div>
    </div>}
  </section>;
}
