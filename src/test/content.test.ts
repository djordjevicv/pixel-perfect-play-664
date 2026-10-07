import { describe, expect, it } from "vitest";
import { CHECKS } from "@/content/checks";
import { restoreChoice, SCENARIOS } from "@/content/scenarios";
import { MATCHED_DIFFERENCE, MATCHED_OFFERS, MATCHED_PERCENT } from "@/components/LessonPractice";
import { HABIT_IDS } from "@/lib/progress";

describe("lesson content", () => {
  it("ships every lesson and transfer check in both scripts", () => {
    for (const id of HABIT_IDS) {
      const scenario = SCENARIOS[id];
      expect(scenario, id).toBeDefined();
      expect(Object.keys(scenario!.text.latn.choices)).toEqual(Object.keys(scenario!.text.cyrl.choices));
      expect(CHECKS[id].choiceIds).toContain(CHECKS[id].correctId);
    }
  });

  it("keeps the matched-offer calculation honest", () => {
    expect(MATCHED_OFFERS).toEqual({ current: 480, matched: 465 });
    expect(MATCHED_DIFFERENCE).toBe(15);
    expect(MATCHED_PERCENT).toBe(3.2);
  });

  it("rejects a stored choice that does not belong to the lesson", () => {
    expect(restoreChoice(SCENARIOS.tool!, "check_official")).toBe("check_official");
    expect(restoreChoice(SCENARIOS.tool!, "removed_choice")).toBe("");
  });
});
