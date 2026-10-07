import { ArrowRight, Bot, CheckCircle2, CircleHelp, Database, UserRound } from "lucide-react";
import type { HabitId } from "@/lib/progress";
import type { ExplainerLabels } from "@/content/types";

export function LessonVisual({ id, step, labels }: { id: HabitId; step: number; labels: ExplainerLabels }) {
  const nodes = [labels.task, labels.fact, labels.official, labels.combine, labels.ai];
  const Icon = id === "autonomy" ? UserRound : id === "data" ? Database : step >= 2 ? CheckCircle2 : CircleHelp;
  return <div className="lesson-visual">
    <div className="visual-node is-main"><Icon aria-hidden /><span>{nodes[0]}</span></div>
    <ArrowRight aria-hidden className="visual-arrow" />
    <div className={`visual-node ${step >= 1 ? "is-active" : ""}`}><span>{nodes[Math.min(step + 1, 3)]}</span></div>
    <ArrowRight aria-hidden className="visual-arrow" />
    <div className={`visual-node ${step >= 2 ? "is-active" : ""}`}>{id === "autonomy" ? <UserRound aria-hidden /> : <Bot aria-hidden />}<span>{nodes[4]}</span></div>
  </div>;
}
