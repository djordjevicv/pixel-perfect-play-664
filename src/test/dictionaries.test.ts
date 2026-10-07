import { describe, expect, it } from "vitest";
import { dictionaries } from "@/i18n/dictionaries";

describe("Serbian dictionaries", () => {
  it("Latin and Cyrillic share identical keys", () => {
    expect(Object.keys(dictionaries.cyrl).sort()).toEqual(Object.keys(dictionaries.latn).sort());
  });
  it("Cyrillic strings contain no Latin letters except allowed names", () => {
    const allowed = /Enter|OpenAI|MIT|\{[a-z]+\}/g;
    for (const [k, v] of Object.entries(dictionaries.cyrl)) {
      expect(v.replace(allowed, ""), k).not.toMatch(/[A-Za-zčćđšžČĆĐŠŽ]/);
    }
  });
  it("app name uses approved forms", () => {
    expect(dictionaries.latn["app.name"]).toBe("AI nije autoritet");
    expect(dictionaries.cyrl["app.name"]).toBe("АИ није ауторитет");
  });
});
