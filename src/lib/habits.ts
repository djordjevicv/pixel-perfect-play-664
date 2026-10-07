import { Wrench, Lock, FileText, Users, Compass, type LucideIcon } from "lucide-react";
import type { HabitId } from "./progress";
import { isReady } from "@/content/scenarios";

export type Habit = { id: HabitId; icon: LucideIcon; ready: boolean };

export const HABITS: Habit[] = (
  [
    ["tool", Wrench],
    ["data", Lock],
    ["verify", FileText],
    ["perspective", Users],
    ["autonomy", Compass],
  ] as const
).map(([id, icon]) => ({ id, icon, ready: isReady(id) }));
