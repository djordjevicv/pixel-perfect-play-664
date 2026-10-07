import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LessonPractice } from "@/components/LessonPractice";
import { VisualExplainer } from "@/components/VisualExplainer";
import { ScriptProvider, useScript } from "@/i18n/script";

function DataPracticeHarness() {
  const { setScript } = useScript();
  return (
    <>
      <button type="button" onClick={() => setScript("cyrl")}>Ћирилица</button>
      <LessonPractice id="data" />
    </>
  );
}

describe("lesson interactions", () => {
  beforeEach(() => localStorage.clear());

  it("does not repeat completion when its parent rerenders", () => {
    const completed = vi.fn();
    function Harness() {
      const [, rerender] = useState(0);
      return (
        <VisualExplainer
          captions={["Prvi", "Poslednji"]}
          renderVisual={() => null}
          onLastStep={() => {
            completed();
            rerender((n) => n + 1);
          }}
        />
      );
    }

    render(<ScriptProvider><Harness /></ScriptProvider>);
    fireEvent.click(screen.getByRole("button", { name: "Sledeći korak" }));
    expect(completed).toHaveBeenCalledTimes(1);
  });

  it("updates validation feedback when the script changes", () => {
    render(<ScriptProvider><DataPracticeHarness /></ScriptProvider>);
    screen.getAllByRole("checkbox").slice(0, 3).forEach((checkbox) => fireEvent.click(checkbox));
    fireEvent.click(screen.getByRole("button", { name: "Proveri izbor" }));
    expect(screen.getByText(/Sačuvani su relevantni uslovi/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Ћирилица" }));
    expect(screen.getByText(/Сачувани су релевантни услови/)).toBeInTheDocument();
  });
});
