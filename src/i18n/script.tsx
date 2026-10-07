import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type DictKey, type Script } from "./dictionaries";

export const SCRIPT_KEY = "ai-nije-autoritet:script";

type Ctx = {
  script: Script;
  setScript: (s: Script) => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  storageOk: boolean;
};

const ScriptContext = createContext<Ctx | null>(null);

export function translate(script: Script, key: DictKey, vars?: Record<string, string | number>) {
  let s = dictionaries[script][key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
  return s;
}

export function ScriptProvider({ children }: { children: ReactNode }) {
  const [script, setScriptState] = useState<Script>("latn");
  const [storageOk, setStorageOk] = useState(true);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(SCRIPT_KEY);
      if (saved === "latn" || saved === "cyrl") setScriptState(saved);
    } catch {
      setStorageOk(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = script === "cyrl" ? "sr-Cyrl" : "sr-Latn";
  }, [script]);

  const setScript = useCallback((s: Script) => {
    setScriptState(s);
    try {
      window.localStorage.setItem(SCRIPT_KEY, s);
    } catch {
      setStorageOk(false);
    }
  }, []);

  const t = useCallback<Ctx["t"]>((key, vars) => translate(script, key, vars), [script]);

  return (
    <ScriptContext.Provider value={{ script, setScript, t, storageOk }}>
      {children}
    </ScriptContext.Provider>
  );
}

export function useScript() {
  const ctx = useContext(ScriptContext);
  if (!ctx) throw new Error("useScript must be used inside ScriptProvider");
  return ctx;
}

/** Keeps the browser tab title in the selected script. */
export function useDocumentTitle(key: DictKey) {
  const { t } = useScript();
  useEffect(() => {
    document.title = t(key);
  }, [t, key]);
}
