import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { Route as LessonRoute } from "@/routes/lekcija.$id";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches every public screen instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    for (const path of ["/", "/uvod", "/navike", "/lekcija/tool", "/provera/tool", "/napredak", "/podsetnik", "/o-aplikaciji"]) {
      expect(router.matchRoutes(path).at(-1)?.routeId, path).not.toBe(rootRouteId);
    }
  });

  it("remounts the lesson UI when its lesson id changes", () => {
    const remount = LessonRoute.options.remountDeps!;
    expect(remount({ params: { id: "tool" } } as never)).toBe("tool");
    expect(remount({ params: { id: "data" } } as never)).toBe("data");
  });
});
