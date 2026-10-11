import { fireEvent, render, screen, within } from "@testing-library/react";
import { useState, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LessonPractice } from "@/components/LessonPractice";
import { VisualExplainer } from "@/components/VisualExplainer";
import { ScriptProvider, useScript } from "@/i18n/script";
import { __resetForTests, markPracticeCompleted, PROGRESS_KEY, type HabitId } from "@/lib/progress";
import { LessonCompletionActions } from "@/routes/lekcija.$id";
import { ProgressPage } from "@/routes/napredak";

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>("@tanstack/react-router");
  return {
    ...actual,
    Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
  };
});

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
  beforeEach(() => {
    localStorage.clear();
    __resetForTests();
  });

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

  it.each(["correct answer", "learning aid"])("completes the verification practice with a %s", (path) => {
    render(<ScriptProvider><LessonPractice id="verify" /></ScriptProvider>);
    if (path === "correct answer") {
      screen.getAllByRole("checkbox").slice(0, 2).forEach((checkbox) => fireEvent.click(checkbox));
      fireEvent.click(screen.getByRole("button", { name: "Proveri izbor" }));
    } else {
      fireEvent.click(screen.getByRole("button", { name: "Prikaži koristan izbor" }));
    }

    const progress = JSON.parse(localStorage.getItem(PROGRESS_KEY)!);
    expect(progress.scenarios.verify.practiceCompleted).toBe(true);
  });

  it.each([
    ["verify", "Završi praktičnu vežbu"],
    ["perspective", "Pregledaj objašnjenje"],
    ["autonomy", "Pregledaj objašnjenje"],
  ] as const)("keeps %s navigation hidden until completion", (id, instruction) => {
    const nextById: Partial<Record<HabitId, HabitId>> = { verify: "perspective", perspective: "autonomy" };
    const { rerender } = render(
      <ScriptProvider><LessonCompletionActions id={id} next={nextById[id]} completed={false} /></ScriptProvider>,
    );
    expect(screen.getByRole("status")).toHaveTextContent(instruction);
    expect(screen.queryByRole("link", { name: /Probaj novi primer/ })).not.toBeInTheDocument();

    rerender(<ScriptProvider><LessonCompletionActions id={id} next={nextById[id]} completed /></ScriptProvider>);
    expect(screen.getByRole("status")).toHaveTextContent("Navika je završena");
    expect(screen.getByRole("link", { name: /Probaj novi primer/ })).toBeInTheDocument();
  });

  it("shows completion and new examples for habits three through five in progress", () => {
    (["verify", "perspective", "autonomy"] as const).forEach(markPracticeCompleted);
    render(<ScriptProvider><ProgressPage /></ScriptProvider>);

    for (const name of ["Proveri tvrdnju", "Drugi ugao", "Tvoja odluka"]) {
      const card = screen.getByRole("heading", { name }).closest("li")!;
      expect(within(card).getByText(/Vežba završena/)).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: "Probaj novi primer" })).toBeInTheDocument();
    }
  });
});
