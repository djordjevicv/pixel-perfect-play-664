import type { HabitId } from "@/lib/progress";
import type { ScenarioDef } from "./types";
import { toolScenario } from "./tool";
import { dataScenario, verifyScenario, perspectiveScenario, autonomyScenario } from "./remaining";

/** Implemented lessons. A habit is "ready" exactly when it appears here. */
export const SCENARIOS: Partial<Record<HabitId, ScenarioDef>> = {
  tool: toolScenario,
  data: dataScenario,
  verify: verifyScenario,
  perspective: perspectiveScenario,
  autonomy: autonomyScenario,
};

export const isReady = (id: HabitId) => Boolean(SCENARIOS[id]);

export function restoreChoice(scenario: ScenarioDef, stored: string | null | undefined) {
  return stored && scenario.choiceIds.includes(stored) ? stored : "";
}
