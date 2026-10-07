import { beforeEach, describe, expect, it } from "vitest";
import {
  __resetForTests,
  markPracticeCompleted,
  recordChoice,
  recordTransferChoice,
  sanitize,
  useProgress,
} from "@/lib/progress";
import { renderHook } from "@testing-library/react";

describe("learning progress", () => {
  beforeEach(() => {
    localStorage.clear();
    __resetForTests();
  });

  it("keeps first lesson and transfer answers immutable", () => {
    recordChoice("tool", "ask_confidence");
    recordChoice("tool", "check_official");
    recordTransferChoice("tool", "old_itinerary", false);
    recordTransferChoice("tool", "official_status", true);
    markPracticeCompleted("tool");

    const { result } = renderHook(() => useProgress());
    expect(result.current.scenarios.tool).toMatchObject({
      firstChoiceId: "ask_confidence",
      latestChoiceId: "check_official",
      transferFirstChoiceId: "old_itinerary",
      transferFirstCorrect: false,
      practiceCompleted: true,
    });
  });

  it("drops malformed persisted data", () => {
    expect(sanitize({ lastLocation: "bad", scenarios: { tool: { retryCount: -4 } } })).toMatchObject({
      lastLocation: "/",
      scenarios: { tool: { retryCount: 0 } },
    });
  });
});
