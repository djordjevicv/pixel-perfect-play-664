import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { useDocumentTitle, useScript } from "@/i18n/script";
import type { DictKey } from "@/i18n/dictionaries";

export const Route = createFileRoute("/o-aplikaciji")({
  head: () => ({
    meta: [
      { title: "O aplikaciji — AI nije autoritet" },
      { name: "description", content: "Prototip sa hakatona za vežbanje pet navika promišljenog korišćenja AI. Svi razgovori su simulacije." },
      { property: "og:title", content: "O aplikaciji — AI nije autoritet" },
      { property: "og:description", content: "Prototip sa hakatona za vežbanje pet navika promišljenog korišćenja AI." },
    ],
  }),
  component: About,
});

const SOURCES: { key: DictKey; title: string; url: string }[] = [
  { key: "about.src.nist", title: "NIST AI 600-1: Generative AI Profile", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf" },
  { key: "about.src.openai", title: "OpenAI — Data Controls", url: "https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt" },
  { key: "about.src.anthropic", title: "Anthropic — Is my data used for model training?", url: "https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training" },
  { key: "about.src.sycophancy", title: "Towards Understanding Sycophancy in Language Models", url: "https://arxiv.org/abs/2310.13548" },
  { key: "about.src.affective", title: "OpenAI & MIT — Affective use study", url: "https://openai.com/index/affective-use-study/" },
];

function About() {
  const { t } = useScript();
  useDocumentTitle("meta.about.title");
  return (
    <section className="mx-auto max-w-3xl px-5 pt-12 sm:px-8 md:pt-16">
      <Link to="/" className="inline-flex min-h-11 items-center text-sm underline underline-offset-4">← {t("nav.backHome")}</Link>
      <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">{t("about.title")}</h1>
      <div className="mt-8 space-y-4 text-lg">
        {(["about.p1", "about.p2", "about.p3", "about.p4"] as const).map((k) => <p key={k}>{t(k)}</p>)}
      </div>
      <h2 className="mt-14 text-2xl font-semibold">{t("about.sources")}</h2>
      <ul className="mt-5 space-y-5">
        {SOURCES.map((s) => (
          <li key={s.url} className="border-l-2 border-border pl-4">
            <a href={s.url} target="_blank" rel="noreferrer" lang="en" className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4">
              {s.title} <ExternalLink aria-hidden className="h-4 w-4" />
              <span className="sr-only">({t("about.external")})</span>
            </a>
            <p className="mt-1 text-muted-foreground">{t(s.key)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
