import { useState } from "react";
import { Copy, ExternalLink, Info, Lock, Scale } from "lucide-react";
import type { HabitId } from "@/lib/progress";
import { markPracticeCompleted } from "@/lib/progress";
import { useScript } from "@/i18n/script";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const copy = {
  latn: {
    practice: "Praktična vežba",
    dataTitle: "Sastavi koristan upit sa što manje podataka",
    fakeDoc: "Izmišljeni dokument za vežbu",
    preview: "Šta bi bilo poslato",
    prefix: "Ukratko mi objasni ove uslove otkazivanja.",
    nothingSent: "Ovo je samo prikaz. Ništa se ne šalje.",
    retained: "Relevantni uslovi sačuvani: {n}/2",
    identity: "Suvišni podaci o identitetu uključeni: {n}/3",
    check: "Proveri izbor",
    reveal: "Prikaži koristan izbor",
    dataSuccess: "Sačuvani su relevantni uslovi, a suvišni podaci o identitetu su uklonjeni.",
    dataIdentity: "Ukloni ime, imejl i broj rezervacije: ne pomažu da se objasne uslovi.",
    dataTerms: "Za objašnjenje su potrebna oba uslova otkazivanja.",
    dataClarify: "Ova vežba koristi izmišljene podatke. Nije alat za bezbedno uklanjanje podataka iz stvarnih dokumenata. Uklanjanje direktnih identifikatora ne garantuje anonimnost.",
    verifySource: "Izvor za vežbu · Odmor na obali od 290 €",
    sourceLabel: "Izmišljeni izvor za vežbu — nije stvarna ponuda",
    sourceTitle: "Odmor na obali od 290 €",
    published: "Objavljeno 12. marta 2022.",
    sourceTerms: ["Dva noćenja", "Radni dani van glavne sezone", "Doručak nije uključen", "Bez povraćaja novca pri otkazivanju", "290 € po osobi"],
    verifyTitle: "Koja dva razloga pokazuju da poređenje nije odgovarajuće?",
    evidence: ["Ponuda iz izvora je iz 2022. godine.", "Broj noćenja i uključene usluge se razlikuju.", "Cena je izražena u evrima.", "Izvor ima naslov."],
    verifySuccess: "Tačno — datum i različiti uslovi čine prvobitno poređenje nepouzdanim.",
    verifyRetry: "Izaberi tačno dva razloga koja utiču na uporedivost ponuda.",
    compareTitle: "Sada uporedi iste uslove",
    yourOffer: "Tvoja ponuda",
    matchedOffer: "Uporediva ponuda",
    offerTerms: "3 noćenja · doručak · povraćaj novca",
    compareResult: "Kada uporedimo iste uslove, razlika je {difference} € po osobi, odnosno približno {percent}%. Sama ta razlika ne govori koja je ponuda bolja za tebe. Druge važne razlike i dalje treba proveriti.",
    promptTitle: "Od navijanja do korisnog pitanja",
    before: "Pre",
    after: "Posle",
    promptBefore: "Ovo je savršeno. Reci mi da sam u pravu.",
    promptAfter: "Tek počinjem da se bavim fotografijom. Uporedi kupovinu fotoaparata, iznajmljivanje i korišćenje telefona prema mom budžetu i tome koliko ću fotografisati. Navedi najjači razlog protiv kupovine sada, izdvoji informacije koje nedostaju i razdvoji činjenice od pretpostavki.",
    promptLabel: "Primer upita — odgovor se ne generiše uživo.",
    copyPrompt: "Kopiraj upit",
    copied: "Upit je kopiran.",
    copyFailed: "Kopiranje nije uspelo. Označi tekst iznad i kopiraj ga ručno.",
    peopleNote: "Kada procenjuješ ljude, oslanjaj se na relevantne podatke, a ne na stereotipe ili osobine koje nisu važne za odluku.",
  },
  cyrl: {
    practice: "Практична вежба",
    dataTitle: "Састави користан упит са што мање података",
    fakeDoc: "Измишљени документ за вежбу",
    preview: "Шта би било послато",
    prefix: "Укратко ми објасни ове услове отказивања.",
    nothingSent: "Ово је само приказ. Ништа се не шаље.",
    retained: "Релевантни услови сачувани: {n}/2",
    identity: "Сувишни подаци о идентитету укључени: {n}/3",
    check: "Провери избор",
    reveal: "Прикажи користан избор",
    dataSuccess: "Сачувани су релевантни услови, а сувишни подаци о идентитету су уклоњени.",
    dataIdentity: "Уклони име, имејл и број резервације: не помажу да се објасне услови.",
    dataTerms: "За објашњење су потребна оба услова отказивања.",
    dataClarify: "Ова вежба користи измишљене податке. Није алат за безбедно уклањање података из стварних докумената. Уклањање директних идентификатора не гарантује анонимност.",
    verifySource: "Извор за вежбу · Одмор на обали од 290 €",
    sourceLabel: "Измишљени извор за вежбу — није стварна понуда",
    sourceTitle: "Одмор на обали од 290 €",
    published: "Објављено 12. марта 2022.",
    sourceTerms: ["Два ноћења", "Радни дани ван главне сезоне", "Доручак није укључен", "Без повраћаја новца при отказивању", "290 € по особи"],
    verifyTitle: "Која два разлога показују да поређење није одговарајуће?",
    evidence: ["Понуда из извора је из 2022. године.", "Број ноћења и укључене услуге се разликују.", "Цена је изражена у еврима.", "Извор има наслов."],
    verifySuccess: "Тачно — датум и различити услови чине првобитно поређење непоузданим.",
    verifyRetry: "Изабери тачно два разлога која утичу на упоредивост понуда.",
    compareTitle: "Сада упореди исте услове",
    yourOffer: "Твоја понуда",
    matchedOffer: "Упоредива понуда",
    offerTerms: "3 ноћења · доручак · повраћај новца",
    compareResult: "Када упоредимо исте услове, разлика је {difference} € по особи, односно приближно {percent}%. Сама та разлика не говори која је понуда боља за тебе. Друге важне разлике и даље треба проверити.",
    promptTitle: "Од навијања до корисног питања",
    before: "Пре",
    after: "После",
    promptBefore: "Ово је савршено. Реци ми да сам у праву.",
    promptAfter: "Тек почињем да се бавим фотографијом. Упореди куповину фотоапарата, изнајмљивање и коришћење телефона према мом буџету и томе колико ћу фотографисати. Наведи најјачи разлог против куповине сада, издвоји информације које недостају и раздвоји чињенице од претпоставки.",
    promptLabel: "Пример упита — одговор се не генерише уживо.",
    copyPrompt: "Копирај упит",
    copied: "Упит је копиран.",
    copyFailed: "Копирање није успело. Означи текст изнад и копирај га ручно.",
    peopleNote: "Када процењујеш људе, ослањај се на релевантне податке, а не на стереотипе или особине које нису важне за одлуку.",
  },
} as const;

export const MATCHED_OFFERS = { current: 480, matched: 465 } as const;
export const MATCHED_DIFFERENCE = MATCHED_OFFERS.current - MATCHED_OFFERS.matched;
export const MATCHED_PERCENT = Math.round((MATCHED_DIFFERENCE / MATCHED_OFFERS.matched) * 1000) / 10;

const fields = {
  latn: [
    ["name", "Ime i prezime: Mira Demo", "identity"],
    ["email", "Imejl: mira@example.invalid", "identity"],
    ["bookingId", "Broj rezervacije: DEMO-014", "identity"],
    ["workshop", "Radionica: Večernja radionica keramike", "optional"],
    ["eventDate", "Datum radionice: 15. novembar 2026.", "optional"],
    ["cancelBy", "Za pun povraćaj novca otkaži najkasnije 8. novembra 2026.", "required"],
    ["lateTerms", "Posle 8. novembra uplata za rezervaciju se ne vraća.", "required"],
  ],
  cyrl: [
    ["name", "Име и презиме: Мира Демо", "identity"],
    ["email", "Имејл: mira@example.invalid", "identity"],
    ["bookingId", "Број резервације: DEMO-014", "identity"],
    ["workshop", "Радионица: Вечерња радионица керамике", "optional"],
    ["eventDate", "Датум радионице: 15. новембар 2026.", "optional"],
    ["cancelBy", "За пун повраћај новца откажи најкасније 8. новембра 2026.", "required"],
    ["lateTerms", "После 8. новембра уплата за резервацију се не враћа.", "required"],
  ],
} as const;

function DataPractice() {
  const { script } = useScript();
  const c = copy[script];
  const localizedFields = fields[script];
  const [selected, setSelected] = useState<Set<string>>(() => new Set(localizedFields.map(([id]) => id)));
  const [result, setResult] = useState<"success" | { identity: boolean; missingTerms: boolean } | null>(null);
  const required = localizedFields.filter(([id, , kind]) => kind === "required" && selected.has(id)).length;
  const identity = localizedFields.filter(([id, , kind]) => kind === "identity" && selected.has(id)).length;
  const toggle = (id: string) => setSelected((old) => {
    const next = new Set(old);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setResult(null);
    return next;
  });
  const check = () => {
    if (required === 2 && identity === 0) {
      setResult("success");
      markPracticeCompleted("data");
    } else setResult({ identity: identity > 0, missingTerms: required < 2 });
  };
  const reveal = () => {
    setSelected(new Set(localizedFields.filter(([, , kind]) => kind !== "identity").map(([id]) => id)));
    setResult("success");
    markPracticeCompleted("data");
  };
  const message = result === "success"
    ? c.dataSuccess
    : result
      ? [result.identity ? c.dataIdentity : "", result.missingTerms ? c.dataTerms : ""].filter(Boolean).join(" ")
      : "";

  return <section className="practice-panel" aria-labelledby="data-practice">
    <p className="eyebrow">{c.practice}</p>
    <h2 id="data-practice" className="mt-1 text-2xl font-semibold">{c.dataTitle}</h2>
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <fieldset className="document-card">
        <legend className="font-semibold">{c.fakeDoc}</legend>
        <div className="mt-4 space-y-2">
          {localizedFields.map(([id, label]) => <label key={id} className="field-choice">
            <input type="checkbox" checked={selected.has(id)} onChange={() => toggle(id)} />
            <span>{label}</span>
          </label>)}
        </div>
      </fieldset>
      <div className="document-card" aria-live="polite">
        <h3 className="text-xl font-semibold">{c.preview}</h3>
        <p className="mt-3 font-semibold">{c.prefix}</p>
        <div className="mt-3 space-y-2 border-l-2 border-primary pl-4">
          {localizedFields.filter(([id]) => selected.has(id)).map(([id, label]) => <p key={id}>{label}</p>)}
        </div>
        <p className="mt-5 text-sm text-muted-foreground"><Lock className="mr-1 inline h-4 w-4" aria-hidden />{c.nothingSent}</p>
      </div>
    </div>
    <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
      <span className="status-chip">{c.retained.replace("{n}", String(required))}</span>
      <span className="status-chip">{c.identity.replace("{n}", String(identity))}</span>
    </div>
    <div className="mt-5 flex flex-wrap gap-3">
      <button className="btn-primary" type="button" onClick={check}>{c.check}</button>
      <button className="btn-quiet" type="button" onClick={reveal}>{c.reveal}</button>
    </div>
    {message && <p role="status" className={`feedback-inline ${result === "success" ? "is-good" : ""}`}>{message}</p>}
    <p className="mt-5 text-sm text-muted-foreground"><Info className="mr-1 inline h-4 w-4" aria-hidden />{c.dataClarify}</p>
  </section>;
}

export function VerifySourceDialog() {
  const { script } = useScript();
  const c = copy[script];
  return <Dialog>
    <DialogTrigger asChild><button type="button" className="source-chip">{c.verifySource} <ExternalLink aria-hidden className="h-4 w-4" /></button></DialogTrigger>
    <DialogContent closeLabel={script === "latn" ? "Zatvori" : "Затвори"}>
      <DialogHeader>
        <p className="eyebrow">{c.sourceLabel}</p>
        <DialogTitle>{c.sourceTitle}</DialogTitle>
        <DialogDescription>{c.published}</DialogDescription>
      </DialogHeader>
      <ul className="mt-4 list-disc space-y-2 pl-5">{c.sourceTerms.map((term) => <li key={term}>{term}</li>)}</ul>
    </DialogContent>
  </Dialog>;
}

function VerifyPractice() {
  const { script } = useScript();
  const c = copy[script];
  const [selected, setSelected] = useState(new Set<number>());
  const [status, setStatus] = useState<"success" | "retry" | null>(null);
  const toggle = (index: number) => setSelected((old) => {
    const next = new Set(old);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setStatus(null);
    return next;
  });
  const finish = (aid = false) => {
    const correct = selected.size === 2 && selected.has(0) && selected.has(1);
    if (correct || aid) {
      if (aid) setSelected(new Set([0, 1]));
      setStatus("success");
      markPracticeCompleted("verify");
    } else setStatus("retry");
  };
  const compareResult = c.compareResult
    .replace("{difference}", String(MATCHED_DIFFERENCE))
    .replace("{percent}", MATCHED_PERCENT.toLocaleString("sr-RS"));
  return <section className="practice-panel" aria-labelledby="verify-practice">
    <p className="eyebrow">{c.practice}</p>
    <h2 id="verify-practice" className="mt-1 text-2xl font-semibold">{c.verifyTitle}</h2>
    <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
      <legend className="sr-only">{c.verifyTitle}</legend>
      {c.evidence.map((label, index) => <label key={label} className="field-choice rounded-md border border-border bg-card p-4">
        <input type="checkbox" checked={selected.has(index)} onChange={() => toggle(index)} />
        <span>{label}</span>
      </label>)}
    </fieldset>
    <div className="mt-5 flex flex-wrap gap-3">
      <button className="btn-primary" type="button" onClick={() => finish()}>{c.check}</button>
      <button className="btn-quiet" type="button" onClick={() => finish(true)}>{c.reveal}</button>
    </div>
    {status && <p role="status" className={`feedback-inline ${status === "success" ? "is-good" : ""}`}>{status === "success" ? c.verifySuccess : c.verifyRetry}</p>}
    {status === "success" && <div className="mt-6 rounded-md border border-positive/40 bg-positive/5 p-5">
      <h3 className="text-xl font-semibold">{c.compareTitle}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="offer-card"><span>{c.yourOffer}</span><strong>{MATCHED_OFFERS.current} €</strong><small>{c.offerTerms}</small></div>
        <div className="offer-card"><span>{c.matchedOffer}</span><strong>{MATCHED_OFFERS.matched} €</strong><small>{c.offerTerms}</small></div>
      </div>
      <p className="mt-4"><Scale className="mr-2 inline h-5 w-5" aria-hidden />{compareResult}</p>
    </div>}
  </section>;
}

function PromptPractice() {
  const { script } = useScript();
  const c = copy[script];
  const [status, setStatus] = useState<"copied" | "copyFailed" | null>(null);
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(c.promptAfter);
      setStatus("copied");
    } catch {
      setStatus("copyFailed");
    }
  };
  return <section className="practice-panel" aria-labelledby="prompt-practice">
    <p className="eyebrow">{c.practice}</p>
    <h2 id="prompt-practice" className="mt-1 text-2xl font-semibold">{c.promptTitle}</h2>
    <div className="mt-5 grid gap-4 lg:grid-cols-2">
      <div className="rounded-md border border-caution/30 bg-caution/5 p-4"><strong>{c.before}</strong><p className="mt-2">{c.promptBefore}</p></div>
      <div className="rounded-md border border-positive/40 bg-positive/5 p-4"><strong>{c.after}</strong><p className="mt-2 select-text">{c.promptAfter}</p></div>
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{c.promptLabel}</p>
    <button className="btn-quiet mt-4" type="button" onClick={copyText}><Copy aria-hidden className="h-4 w-4" />{c.copyPrompt}</button>
    {status && <p className="mt-3 text-sm" role="status">{c[status]}</p>}
    <p className="mt-5 text-sm text-muted-foreground">{c.peopleNote}</p>
  </section>;
}

export function LessonPractice({ id }: { id: HabitId }) {
  if (id === "data") return <DataPractice />;
  if (id === "verify") return <VerifyPractice />;
  if (id === "perspective") return <PromptPractice />;
  return null;
}
