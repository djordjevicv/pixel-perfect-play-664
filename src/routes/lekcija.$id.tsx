import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, RotateCcw, TriangleAlert } from "lucide-react";
import { restoreChoice, SCENARIOS } from "@/content/scenarios";
import { HABIT_IDS, markFeedbackViewed, markPracticeCompleted, recordChoice, startRetry, updateProgress, useProgress, type HabitId } from "@/lib/progress";
import { useScript } from "@/i18n/script";
import { LessonPractice, VerifySourceDialog } from "@/components/LessonPractice";
import { VisualExplainer } from "@/components/VisualExplainer";
import { LessonVisual } from "@/components/LessonVisual";

export const Route = createFileRoute("/lekcija/$id")({
  remountDeps: ({ params }) => params.id,
  beforeLoad: ({ params }) => {
    if (!HABIT_IDS.includes(params.id as HabitId) || !SCENARIOS[params.id as HabitId]) throw notFound();
  },
  component: Lesson,
});

function Lesson() {
  const { id: rawId } = Route.useParams();
  const id = rawId as HabitId;
  const { script, t } = useScript();
  const scenario = SCENARIOS[id]!;
  const text = scenario.text[script];
  const saved = useProgress().scenarios[id];
  const restoredChoice = restoreChoice(scenario, saved?.latestChoiceId);
  const [choice, setChoice] = useState(restoredChoice);
  const [submitted, setSubmitted] = useState(Boolean(restoredChoice));
  const [showExplainer, setShowExplainer] = useState(false);
  const index = HABIT_IDS.indexOf(id);
  const next = HABIT_IDS[index + 1];
  const selected = choice ? text.choices[choice] : null;
  const simpleCompletion = id === "tool" || id === "perspective" || id === "autonomy";

  useEffect(() => updateProgress((p) => ({ ...p, lastLocation: `/lekcija/${id}` })), [id]);
  useEffect(() => { document.title = `${text.title} — ${t("app.name")}`; }, [text.title, t]);
  const submit = () => {
    if (!choice || submitted) return;
    recordChoice(id, choice);
    markFeedbackViewed(id);
    setSubmitted(true);
  };
  const retry = () => {
    startRetry(id);
    setChoice("");
    setSubmitted(false);
    setShowExplainer(false);
  };
  const completeExplanation = () => {
    if (simpleCompletion) markPracticeCompleted(id);
  };
  const practice = useMemo(() => submitted ? <LessonPractice id={id} /> : null, [submitted, id]);

  return <section className="mx-auto max-w-5xl px-5 pt-10 sm:px-8 md:pt-14">
    <Link to="/navike" className="inline-flex min-h-11 items-center gap-2 text-sm underline underline-offset-4"><ArrowLeft aria-hidden className="h-4 w-4" />{t("nav.backHabits")}</Link>
    <p className="eyebrow mt-5">{t("lesson.habitLabel", { n: index + 1 })}</p>
    <h1 className="mt-2 max-w-3xl text-4xl font-semibold sm:text-5xl">{text.title}</h1>
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <h2 className="text-lg font-semibold">{t("lesson.context")}</h2>
        <p className="mt-2 text-lg">{text.context}</p>
        <p className="mt-3 text-sm text-muted-foreground"><TriangleAlert aria-hidden className="mr-1 inline h-4 w-4" />{text.fictionalNote}</p>
        {id === "verify" && <div className="mt-5"><VerifySourceDialog /></div>}
      </div>
      <div className="conversation-card">
        <p className="eyebrow flex items-center gap-2"><MessageCircle aria-hidden className="h-4 w-4" />{t("lesson.sim")}</p>
        <div className="mt-4 space-y-3">
          {text.messages.map((message) => <div key={message.text} className={`chat-bubble ${message.role === "assistant" ? "is-ai" : "is-user"}`}>
            <strong>{message.role === "assistant" ? t("lesson.ai") : t("lesson.you")}</strong>
            <p>{message.text}</p>
          </div>)}
        </div>
      </div>
    </div>

    <form className="mt-8 rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-7" onSubmit={(e) => { e.preventDefault(); submit(); }}>
      <fieldset disabled={submitted}>
        <legend className="text-2xl font-semibold font-display">{text.question}</legend>
        <div className="mt-5 grid gap-3">
          {scenario.choiceIds.map((choiceId, i) => <label key={choiceId} className={`decision-choice ${choice === choiceId ? "is-selected" : ""}`}>
            <input type="radio" name="choice" value={choiceId} checked={choice === choiceId} onChange={() => setChoice(choiceId)} />
            <span className="choice-letter" aria-hidden>{String.fromCharCode(65 + i)}</span>
            <span>{text.choices[choiceId]!.label}</span>
          </label>)}
        </div>
      </fieldset>
      {!submitted && <button className="btn-primary mt-5" type="submit" disabled={!choice}>{t("lesson.check")}</button>}
    </form>

    {submitted && selected && <div className={`feedback-panel ${scenario.choiceTone[choice] === "good" ? "is-good" : "is-caution"}`} role="status">
      <p className="eyebrow flex items-center gap-2">{scenario.choiceTone[choice] === "good" ? <CheckCircle2 aria-hidden className="h-4 w-4" /> : <TriangleAlert aria-hidden className="h-4 w-4" />}{scenario.choiceTone[choice] === "good" ? t("lesson.good") : t("lesson.caution")}</p>
      <h2 className="mt-2 text-2xl font-semibold">{selected.feedbackTitle}</h2>
      <p className="mt-2 text-lg">{selected.consequence}</p>
      <p className="mt-3 text-sm text-muted-foreground">{t("lesson.firstAttempt")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" className="btn-quiet" onClick={retry}><RotateCcw aria-hidden className="h-4 w-4" />{t("lesson.retry")}</button>
        <button type="button" className="btn-primary" onClick={() => setShowExplainer(true)}>{t("lesson.showExplanation")}</button>
      </div>
    </div>}

    {practice}

    {submitted && showExplainer && <div className="mt-7">
      <VisualExplainer captions={text.explainer.captions} onLastStep={completeExplanation} renderVisual={(step) => <LessonVisual id={id} step={step} labels={text.explainer.labels} />} />
    </div>}

    {submitted && <div className="mt-7 grid gap-4 sm:grid-cols-2">
      <div className="rule-card"><p className="eyebrow">{t("lesson.rule")}</p><p className="mt-2 text-xl font-semibold">{text.rule}</p></div>
      <div className="rule-card"><p className="eyebrow">{t("lesson.whereAI")}</p><p className="mt-2">{text.usefulAI}</p></div>
    </div>}

    {submitted && <div className="mt-8 flex flex-wrap gap-3">
      <Link to="/provera/$id" params={{ id }} className="btn-primary">{script === "latn" ? "Probaj novi primer" : "Пробај нови пример"}<ArrowRight aria-hidden className="h-5 w-5" /></Link>
      {next ? <Link to="/lekcija/$id" params={{ id: next }} className="btn-quiet">{t("lesson.next")}</Link> : <Link to="/napredak" className="btn-quiet">{t("nav.progress")}</Link>}
    </div>}
  </section>;
}
