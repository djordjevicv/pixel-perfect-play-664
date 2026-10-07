import type { Script } from "@/i18n/dictionaries";
import type { HabitId } from "@/lib/progress";

export type Tone = "good" | "caution";

export type ExplainerLabels = {
  task: string;
  fact: string;
  official: string;
  combine: string;
  ai: string;
};

export type ScenarioText = {
  title: string;
  context: string;
  fictionalNote: string;
  messages: { role: "user" | "assistant"; text: string }[];
  question: string;
  choices: Record<string, { label: string; feedbackTitle: string; consequence: string }>;
  rule: string;
  usefulAI: string;
  explainer: { captions: string[]; labels: ExplainerLabels };
};

export type ScenarioDef = {
  id: HabitId;
  choiceIds: string[];
  choiceTone: Record<string, Tone>;
  text: Record<Script, ScenarioText>;
};
