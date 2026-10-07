import { useSyncExternalStore } from "react";

export const PROGRESS_KEY = "ai-nije-autoritet:progress:v1";
const LEGACY_KEY = "before-enter:v1";

export const HABIT_IDS = ["tool", "data", "verify", "perspective", "autonomy"] as const;
export type HabitId = (typeof HABIT_IDS)[number];

export type ScenarioProgress = {
  firstChoiceId: string | null;
  latestChoiceId: string | null;
  retryCount: number;
  feedbackViewed: boolean;
  practiceCompleted: boolean;
  transferFirstChoiceId: string | null;
  transferFirstCorrect: boolean | null;
};

export type Progress = {
  version: 1;
  introSeen: boolean;
  lastLocation: string;
  scenarios: Partial<Record<HabitId, ScenarioProgress>>;
};

const empty = (): Progress => ({ version: 1, introSeen: false, lastLocation: "/", scenarios: {} });
export const emptyScenario = (): ScenarioProgress => ({
  firstChoiceId: null,
  latestChoiceId: null,
  retryCount: 0,
  feedbackViewed: false,
  practiceCompleted: false,
  transferFirstChoiceId: null,
  transferFirstCorrect: null,
});

let state: Progress = empty();
let loaded = false;
let storageFailed = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

const str = (v: unknown) => (typeof v === "string" ? v : null);

/** Accepts unknown data and returns a valid Progress, dropping anything malformed. */
export function sanitize(raw: unknown): Progress {
  const out = empty();
  if (!raw || typeof raw !== "object") return out;
  const r = raw as Record<string, unknown>;
  out.introSeen = r["introSeen"] === true;
  if (typeof r["lastLocation"] === "string" && r["lastLocation"].startsWith("/")) out.lastLocation = r["lastLocation"];
  const sc = r["scenarios"];
  if (sc && typeof sc === "object") {
    for (const id of HABIT_IDS) {
      const s = (sc as Record<string, unknown>)[id];
      if (!s || typeof s !== "object") continue;
      const e = s as Record<string, unknown>;
      out.scenarios[id] = {
        firstChoiceId: str(e["firstChoiceId"]),
        latestChoiceId: str(e["latestChoiceId"]),
        retryCount: typeof e["retryCount"] === "number" && e["retryCount"] >= 0 ? Math.floor(e["retryCount"]) : 0,
        feedbackViewed: e["feedbackViewed"] === true,
        practiceCompleted: e["practiceCompleted"] === true,
        transferFirstChoiceId: str(e["transferFirstChoiceId"]),
        transferFirstCorrect: typeof e["transferFirstCorrect"] === "boolean" ? e["transferFirstCorrect"] : null,
      };
    }
  }
  return out;
}

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY) ?? localStorage.getItem(LEGACY_KEY);
    if (!raw) return;
    state = sanitize(JSON.parse(raw));
  } catch {
    state = empty();
  }
}

function save() {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
  } catch {
    storageFailed = true; // keep working in memory
  }
}

export function updateProgress(fn: (p: Progress) => Progress) {
  load();
  state = fn(state);
  save();
  emit();
}

function updateScenario(id: HabitId, fn: (s: ScenarioProgress) => ScenarioProgress) {
  updateProgress((p) => ({
    ...p,
    scenarios: { ...p.scenarios, [id]: fn(p.scenarios[id] ?? emptyScenario()) },
  }));
}

/** Records a decision. The first attempt is never overwritten. */
export function recordChoice(id: HabitId, choiceId: string) {
  updateScenario(id, (s) => ({ ...s, firstChoiceId: s.firstChoiceId ?? choiceId, latestChoiceId: choiceId }));
}
export function startRetry(id: HabitId) {
  updateScenario(id, (s) => ({ ...s, retryCount: s.retryCount + 1, latestChoiceId: null }));
}
export function markFeedbackViewed(id: HabitId) {
  updateScenario(id, (s) => (s.feedbackViewed ? s : { ...s, feedbackViewed: true }));
}
export function markPracticeCompleted(id: HabitId) {
  updateScenario(id, (s) => (s.practiceCompleted ? s : { ...s, practiceCompleted: true }));
}
export function recordTransferChoice(id: HabitId, choiceId: string, correct: boolean) {
  updateScenario(id, (s) => s.transferFirstChoiceId ? s : {
    ...s,
    transferFirstChoiceId: choiceId,
    transferFirstCorrect: correct,
  });
}

/** Clears only learning progress; the separately stored script preference stays intact. */
export function resetProgress() {
  state = empty();
  loaded = true;
  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(LEGACY_KEY);
  } catch {
    storageFailed = true;
  }
  emit();
}

export function completedCount(p: Progress) {
  return HABIT_IDS.filter((id) => p.scenarios[id]?.practiceCompleted).length;
}

/** Test helper: reset in-memory store. */
export function __resetForTests() {
  state = empty();
  loaded = false;
  storageFailed = false;
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const serverSnapshot = empty();
export function useProgress(): Progress {
  return useSyncExternalStore(subscribe, () => (load(), state), () => serverSnapshot);
}
export function useStorageFailed(): boolean {
  return useSyncExternalStore(subscribe, () => storageFailed, () => false);
}
