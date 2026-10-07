import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from "lucide-react";
import { useScript } from "@/i18n/script";

const STEP_MS = 4500;

/**
 * Reusable step-based explainer. Never autoplays; works fully with manual stepping
 * and reduced motion. `renderVisual` draws the SVG for the current step.
 */
export function VisualExplainer({
  captions,
  renderVisual,
  onLastStep,
}: {
  captions: string[];
  renderVisual: (step: number) => ReactNode;
  onLastStep?: () => void;
}) {
  const { t } = useScript();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = captions.length - 1;
  const onLastStepRef = useRef(onLastStep);

  useEffect(() => {
    onLastStepRef.current = onLastStep;
  }, [onLastStep]);

  useEffect(() => {
    if (step === last) onLastStepRef.current?.();
  }, [step, last]);

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setStep((s) => Math.min(s + 1, last)), STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, step, last]);

  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6" aria-labelledby="explainer-title">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 id="explainer-title" className="text-2xl font-semibold">{t("explainer.title")}</h3>
        <p className="text-sm text-muted-foreground tabular-nums">{t("explainer.step", { n: step + 1, total: captions.length })}</p>
      </div>
      <div className="mt-4 overflow-hidden rounded-md bg-background" aria-hidden>
        {renderVisual(step)}
      </div>
      <p className="mt-4 min-h-[3.2em] text-lg" aria-live="polite">{captions[step]}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="icon-btn" onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)); }} disabled={step === 0} aria-label={t("explainer.prev")}>
          <ChevronLeft aria-hidden className="h-5 w-5" />
        </button>
        {playing ? (
          <button type="button" className="icon-btn px-4" onClick={() => setPlaying(false)}>
            <Pause aria-hidden className="h-5 w-5" /> {t("explainer.pause")}
          </button>
        ) : (
          <button type="button" className="icon-btn px-4" onClick={() => { if (step === last) setStep(0); setPlaying(true); }}>
            <Play aria-hidden className="h-5 w-5" /> {t("explainer.play")}
          </button>
        )}
        <button type="button" className="icon-btn" onClick={() => { setPlaying(false); setStep((s) => Math.min(last, s + 1)); }} disabled={step === last} aria-label={t("explainer.next")}>
          <ChevronRight aria-hidden className="h-5 w-5" />
        </button>
        <button type="button" className="icon-btn px-4" onClick={() => { setStep(0); setPlaying(false); }}>
          <RotateCcw aria-hidden className="h-5 w-5" /> {t("explainer.replay")}
        </button>
      </div>
      <details className="mt-4 text-muted-foreground">
        <summary className="cursor-pointer min-h-11 flex items-center">{t("explainer.transcript")}</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-6">
          {captions.map((c) => <li key={c}>{c}</li>)}
        </ol>
      </details>
    </section>
  );
}
