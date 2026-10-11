import type { Script } from "@/i18n/dictionaries";
import type { HabitId } from "@/lib/progress";

type CheckText = { question: string; choices: Record<string, string>; feedback: string };
export type TransferCheck = { choiceIds: string[]; correctId: string; text: Record<Script, CheckText> };

export const CHECKS: Record<HabitId, TransferCheck> = {
  tool: {
    choiceIds: ["old_itinerary", "official_status", "assistant_memory"], correctId: "official_status",
    text: {
      latn: { question: "Let ti je danas. Gde prvo proveravaš da li je vreme polaska promenjeno?", choices: { old_itinerary: "U planu puta koji je poslat prošlog meseca.", official_status: "U aktuelnom prikazu statusa leta kod avio-kompanije.", assistant_memory: "Pitam AI koje je uobičajeno vreme tog leta." }, feedback: "Za promenljiv podatak o polasku proveri aktuelne informacije avio-kompanije. AI zatim može da pomogne da prilagodiš plan." },
      cyrl: { question: "Лет ти је данас. Где прво провераваш да ли је време поласка промењено?", choices: { old_itinerary: "У плану пута који је послат прошлог месеца.", official_status: "У актуелном приказу статуса лета код авио-компаније.", assistant_memory: "Питам АИ које је уобичајено време тог лета." }, feedback: "За променљив податак о поласку провери актуелне информације авио-компаније. АИ затим може да помогне да прилагодиш план." },
    },
  },
  data: {
    choiceIds: ["complete_offer", "identity_only", "relevant_paragraph"], correctId: "relevant_paragraph",
    text: {
      latn: { question: "Želiš objašnjenje stručnog pasusa iz ponude za posao. Šta je dovoljno da podeliš?", choices: { complete_offer: "Celu ponudu, sa ličnim podacima i potpisom.", identity_only: "Ime i adresu, bez samog pasusa.", relevant_paragraph: "Relevantan pasus, bez nepotrebnih podataka o identitetu." }, feedback: "Sačuvaj sadržaj potreban za pitanje. Ukloni suvišne identifikacione podatke i proveri pravila servisa pre deljenja osetljivog sadržaja." },
      cyrl: { question: "Желиш објашњење стручног пасуса из понуде за посао. Шта је довољно да поделиш?", choices: { complete_offer: "Целу понуду, са личним подацима и потписом.", identity_only: "Име и адресу, без самог пасуса.", relevant_paragraph: "Релевантан пасус, без непотребних података о идентитету." }, feedback: "Сачувај садржај потребан за питање. Уклони сувишне идентификационе податке и провери правила сервиса пре дељења осетљивог садржаја." },
    },
  },
  verify: {
    choiceIds: ["claim_fit", "layout", "repetitions"], correctId: "claim_fit",
    text: {
      latn: { question: "AI tvrdi da studija dokazuje da jedan kurs pomaže svima. Studija je obuhvatila samo odrasle iz jednog grada. Šta proveravaš?", choices: { claim_fit: "Da li metod i rezultati podržavaju tako širok zaključak.", layout: "Da li sajt na kome je studija izgleda profesionalno.", repetitions: "Da li AI ponavlja isti zaključak kada ga ponovo pitam." }, feedback: "Stvarna studija ne potvrđuje automatski svaki širi zaključak. Proveri ko je učestvovao, šta je ispitivano i kakva su ograničenja." },
      cyrl: { question: "АИ тврди да студија доказује да један курс помаже свима. Студија је обухватила само одрасле из једног града. Шта провераваш?", choices: { claim_fit: "Да ли метод и резултати подржавају тако широк закључак.", layout: "Да ли сајт на коме је студија изгледа професионално.", repetitions: "Да ли АИ понавља исти закључак када га поново питам." }, feedback: "Стварна студија не потврђује аутоматски сваки шири закључак. Провери ко је учествовао, шта је испитивано и каква су ограничења." },
    },
  },
  perspective: {
    choiceIds: ["praise", "disconfirm", "confidence"], correctId: "disconfirm",
    text: {
      latn: { question: "Veruješ da će tvoja poslovna ideja uspeti. Kojim zahtevom najbolje proveravaš tu pretpostavku?", choices: { praise: "Napiši oduševljenu najavu mog novog posla.", disconfirm: "Navedi rizike neuspeha i dokaze koji bi promenili procenu.", confidence: "Reci koliko si siguran da će ideja uspeti." }, feedback: "Potraži i dokaze protiv početne pretpostavke. AI može da pomogne da postaviš bolja pitanja, a važne činjenice treba proveriti." },
      cyrl: { question: "Верујеш да ће твоја пословна идеја успети. Којим захтевом најбоље провераваш ту претпоставку?", choices: { praise: "Напиши одушевљену најаву мог новог посла.", disconfirm: "Наведи ризике неуспеха и доказе који би променили процену.", confidence: "Реци колико си сигуран да ће идеја успети." }, feedback: "Потражи и доказе против почетне претпоставке. АИ може да помогне да поставиш боља питања, а важне чињенице треба проверити." },
    },
  },
  autonomy: {
    choiceIds: ["obey", "support", "repeat"], correctId: "support",
    text: {
      latn: { question: "Imaš ponudu za novi posao. Plata je veća, ali pozicija donosi više odgovornosti i manje slobodnog vremena. Kako koristiš AI pre odluke?", choices: { obey: "Tražim da uporedi obe opcije prema plati, obavezama i slobodnom vremenu, pa biram onu koju oceni boljom.", support: "Opisujem svoje prioritete, tražim argumente za i protiv, proveravam ključne informacije i zatim odlučujem.", repeat: "Dajem podatke o obe opcije i prihvatam preporuku ako je detaljno i uverljivo obrazložena." }, feedback: "AI može da pomogne da uporediš opcije i sagledaš posledice prema svojim prioritetima. Ključne informacije proveravaš, a konačna odluka ostaje tvoja." },
      cyrl: { question: "Имаш понуду за нови посао. Плата је већа, али позиција доноси више одговорности и мање слободног времена. Како користиш АИ пре одлуке?", choices: { obey: "Тражим да упореди обе опције према плати, обавезама и слободном времену, па бирам ону коју оцени бољом.", support: "Описујем своје приоритете, тражим аргументе за и против, проверавам кључне информације и затим одлучујем.", repeat: "Дајем податке о обе опције и прихватам препоруку ако је детаљно и уверљиво образложена." }, feedback: "АИ може да помогне да упоредиш опције и сагледаш последице према својим приоритетима. Кључне информације провераваш, а коначна одлука остаје твоја." },
    },
  },
};
