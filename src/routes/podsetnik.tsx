import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Copy, Download, Printer } from "lucide-react";
import { useScript } from "@/i18n/script";

export const Route = createFileRoute("/podsetnik")({ component: Takeaway });

const content = {
  latn: {
    title: "Pet pitanja pre „Enter“",
    items: [
      ["Da li je AI pravi alat za ovo?", "Za podatke koji se menjaju proveri aktuelan, nadležan izvor."],
      ["Šta zaista treba da podelim?", "Sačuvaj koristan kontekst, ukloni suvišne identifikacione podatke i proveri podešavanja privatnosti."],
      ["Kako da proverim odgovor?", "Otvori izvor. Proveri datum, uslove i da li zaista podržava tvrdnju."],
      ["Koji ugao možda nedostaje?", "Traži protivargumente, informacije koje nedostaju i druge mogućnosti."],
      ["Ko donosi konačnu odluku?", "Koristi AI da sagledaš opcije, a zadrži sopstvenu procenu."],
    ],
    footer: "AI može da bude koristan. Temeljnost provere prilagodi posledicama odluke.",
    copy: "Kopiraj podsetnik", download: "Preuzmi podsetnik", print: "Štampaj / sačuvaj kao PDF",
    copied: "Podsetnik je kopiran.", failed: "Kopiranje nije uspelo. Označi tekst podsetnika i kopiraj ga ručno.", back: "Nazad na napredak",
  },
  cyrl: {
    title: "Пет питања пре „Enter“",
    items: [
      ["Да ли је АИ прави алат за ово?", "За податке који се мењају провери актуелан, надлежан извор."],
      ["Шта заиста треба да поделим?", "Сачувај користан контекст, уклони сувишне идентификационе податке и провери подешавања приватности."],
      ["Како да проверим одговор?", "Отвори извор. Провери датум, услове и да ли заиста подржава тврдњу."],
      ["Који угао можда недостаје?", "Тражи противаргументе, информације које недостају и друге могућности."],
      ["Ко доноси коначну одлуку?", "Користи АИ да сагледаш опције, а задржи сопствену процену."],
    ],
    footer: "АИ може да буде користан. Темељност провере прилагоди последицама одлуке.",
    copy: "Копирај подсетник", download: "Преузми подсетник", print: "Штампај / сачувај као PDF",
    copied: "Подсетник је копиран.", failed: "Копирање није успело. Означи текст подсетника и копирај га ручно.", back: "Назад на напредак",
  },
} as const;

function Takeaway() {
  const { script } = useScript();
  const c = content[script];
  const [status, setStatus] = useState<"copied" | "failed" | null>(null);
  const text = useMemo(() => `${c.title}\n\n${c.items.map(([q, a], i) => `${i + 1}. ${q}\n${a}`).join("\n\n")}\n\n${c.footer}`, [c]);
  useEffect(() => { document.title = `${c.title} — ${script === "latn" ? "AI nije autoritet" : "АИ није ауторитет"}`; }, [c.title, script]);
  const copyText = async () => {
    try { await navigator.clipboard.writeText(text); setStatus("copied"); }
    catch { setStatus("failed"); }
  };
  const download = () => {
    const url = URL.createObjectURL(new Blob(["\ufeff", text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = script === "latn" ? "pet-pitanja-pre-enter.txt" : "пет-питања-пре-enter.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  return <section className="takeaway mx-auto max-w-4xl px-5 pt-12 sm:px-8 md:pt-16">
    <Link to="/napredak" className="no-print inline-flex min-h-11 items-center text-sm underline underline-offset-4">← {c.back}</Link>
    <article id="takeaway-text" className="mt-5 rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-10">
      <p className="eyebrow">{script === "latn" ? "AI nije autoritet" : "АИ није ауторитет"}</p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">{c.title}</h1>
      <ol className="mt-8 space-y-6">
        {c.items.map(([question, answer], i) => <li key={question} className="grid gap-3 border-t border-border pt-5 sm:grid-cols-[2rem_1fr]">
          <span className="font-display text-2xl text-primary">{i + 1}</span>
          <div><h2 className="text-xl font-semibold">{question}</h2><p className="mt-1 text-muted-foreground">{answer}</p></div>
        </li>)}
      </ol>
      <p className="mt-8 border-t border-border pt-6 font-semibold">{c.footer}</p>
    </article>
    <div className="no-print mt-6 flex flex-wrap gap-3">
      <button type="button" className="btn-primary" onClick={copyText}><Copy aria-hidden className="h-4 w-4" />{c.copy}</button>
      <button type="button" className="btn-quiet" onClick={download}><Download aria-hidden className="h-4 w-4" />{c.download}</button>
      <button type="button" className="btn-quiet" onClick={() => window.print()}><Printer aria-hidden className="h-4 w-4" />{c.print}</button>
    </div>
    {status && <p role="status" className="no-print mt-3 text-sm">{c[status]}</p>}
  </section>;
}
