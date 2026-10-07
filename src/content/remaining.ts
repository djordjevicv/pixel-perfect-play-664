import type { ScenarioDef } from "./types";

export const dataScenario: ScenarioDef = {
  id: "data",
  choiceIds: ["full_document", "relevant_extract", "check_controls"],
  choiceTone: { full_document: "caution", relevant_extract: "good", check_controls: "good" },
  text: {
    latn: {
      title: "Koliko podataka zaista treba da podeliš?",
      context: "Rezervišeš mesto na radionici keramike. Želiš da ti AI ukratko objasni uslove otkazivanja.",
      fictionalNote: "Potvrda u ovoj vežbi je izmišljeni dokument.",
      messages: [
        { role: "user", text: "Možeš li da mi objasniš uslove otkazivanja ove rezervacije?" },
        { role: "assistant", text: "Naravno. Pošalji potvrdu rezervacije, pa mogu da sažmem relevantne uslove." },
      ],
      question: "Šta biraš da podeliš?",
      choices: {
        full_document: { label: "Celu potvrdu, da ne izostavim nešto važno.", feedbackTitle: "Nije svaki podatak koristan", consequence: "Potvrda sadrži podatke o identitetu koji nisu potrebni za ovaj sažetak. Uslovi otkazivanja pomažu; ime i kontakt ne doprinose odgovoru." },
        relevant_extract: { label: "Samo relevantne uslove, bez podataka o identitetu.", feedbackTitle: "Sačuvaj ono što je potrebno", consequence: "Deliš sadržaj potreban za pitanje, bez suvišnih podataka o identitetu. Ako je sadržaj osetljiv, proveri i pravila i podešavanja servisa." },
        check_controls: { label: "Najpre proveravam podešavanja privatnosti servisa.", feedbackTitle: "Dobra provera, pa pažljiv izbor", consequence: "Proveravaš kako servis postupa sa podacima. Posle toga ipak odaberi samo informacije potrebne za zadatak." },
      },
      rule: "Podeli najmanje podataka potrebnih za zadatak i proveri podešavanja privatnosti.",
      usefulAI: "AI može da objasni nepoznate izraze ili pomogne da sastaviš pitanja za organizatora.",
      explainer: {
        captions: ["Dokument sadrži uslove, ali i podatke o identitetu.", "Ime, imejl i broj rezervacije nisu potrebni za objašnjenje.", "U pregledu ostaju relevantni uslovi otkazivanja.", "Pre deljenja osetljivog sadržaja proveri i pravila servisa."],
        labels: { task: "Dokument", fact: "Suvišni podaci", official: "Relevantni uslovi", combine: "Pregled", ai: "Pažljivo deljenje" },
      },
    },
    cyrl: {
      title: "Колико података заиста треба да поделиш?",
      context: "Резервишеш место на радионици керамике. Желиш да ти АИ укратко објасни услове отказивања.",
      fictionalNote: "Потврда у овој вежби је измишљени документ.",
      messages: [
        { role: "user", text: "Можеш ли да ми објасниш услове отказивања ове резервације?" },
        { role: "assistant", text: "Наравно. Пошаљи потврду резервације, па могу да сажмем релевантне услове." },
      ],
      question: "Шта бираш да поделиш?",
      choices: {
        full_document: { label: "Целу потврду, да не изоставим нешто важно.", feedbackTitle: "Није сваки податак користан", consequence: "Потврда садржи податке о идентитету који нису потребни за овај сажетак. Услови отказивања помажу; име и контакт не доприносе одговору." },
        relevant_extract: { label: "Само релевантне услове, без података о идентитету.", feedbackTitle: "Сачувај оно што је потребно", consequence: "Делиш садржај потребан за питање, без сувишних података о идентитету. Ако је садржај осетљив, провери и правила и подешавања сервиса." },
        check_controls: { label: "Најпре проверавам подешавања приватности сервиса.", feedbackTitle: "Добра провера, па пажљив избор", consequence: "Провераваш како сервис поступа са подацима. После тога ипак одабери само информације потребне за задатак." },
      },
      rule: "Подели најмање података потребних за задатак и провери подешавања приватности.",
      usefulAI: "АИ може да објасни непознате изразе или помогне да саставиш питања за организатора.",
      explainer: {
        captions: ["Документ садржи услове, али и податке о идентитету.", "Име, имејл и број резервације нису потребни за објашњење.", "У прегледу остају релевантни услови отказивања.", "Пре дељења осетљивог садржаја провери и правила сервиса."],
        labels: { task: "Документ", fact: "Сувишни подаци", official: "Релевантни услови", combine: "Преглед", ai: "Пажљиво дељење" },
      },
    },
  },
};

export const verifyScenario: ScenarioDef = {
  id: "verify",
  choiceIds: ["price_match", "repeat_question", "inspect_terms"],
  choiceTone: { price_match: "caution", repeat_question: "caution", inspect_terms: "good" },
  text: {
    latn: {
      title: "Izvor postoji. Da li poređenje ima smisla?",
      context: "U ovom izmišljenom primeru danas je 10. oktobar 2026. Razmatraš putovanje od tri noćenja za 480 € po osobi, sa doručkom i mogućnošću otkazivanja uz povraćaj novca.",
      fictionalNote: "Sve ponude u ovoj vežbi su izmišljeni materijal za učenje.",
      messages: [
        { role: "user", text: "Da li je 480 € mnogo za ovo putovanje?" },
        { role: "assistant", text: "Deluje skupo. Pronašao sam sličan aranžman za 290 €, pa je ova ponuda skuplja za 190 €." },
      ],
      question: "Šta biraš kao sledeći korak?",
      choices: {
        price_match: { label: "Koristim cenu od 290 € kao osnovu za pregovore.", feedbackTitle: "Razlika postoji, ali poređenje možda ne važi", consequence: "Oduzimanje je tačno. Ipak, razlika od 190 € ne dokazuje da je nova ponuda preskupa ako aranžmani nisu uporedivi." },
        repeat_question: { label: "Tražim od drugog AI asistenta da uporedi cene.", feedbackTitle: "I drugi odgovor traži proveru", consequence: "Drugi asistent može da ponovi isti zastareli podatak. Saglasnost dva odgovora nije zamena za proveru izvora." },
        inspect_terms: { label: "Otvaram izvor i proveravam datume i uslove.", feedbackTitle: "Proveri šta izvor zaista pokazuje", consequence: "Datum, broj noćenja i uključene usluge određuju da li izvor podržava zaključak." },
      },
      rule: "Otvori izvor. Proveri datum, uslove i da li podržava tvrdnju.",
      usefulAI: "Daj AI proverene, uporedive ponude i traži da objasni razlike prema tvojim prioritetima.",
      explainer: {
        captions: ["Prva cena deluje ubedljivo, ali izvor je star i uslovi se razlikuju.", "Poređenje traži isti termin, broj noćenja, usluge i mogućnost otkazivanja.", "Uporedive ponude koštaju 480 € i 465 €.", "Stvarna razlika je 15 €, približno 3,2%; druge razlike i dalje treba proveriti."],
        labels: { task: "Tvrdnja", fact: "Stari izvor", official: "Isti uslovi", combine: "15 €", ai: "Pošteno poređenje" },
      },
    },
    cyrl: {
      title: "Извор постоји. Да ли поређење има смисла?",
      context: "У овом измишљеном примеру данас је 10. октобар 2026. Разматраш путовање од три ноћења за 480 € по особи, са доручком и могућношћу отказивања уз повраћај новца.",
      fictionalNote: "Све понуде у овој вежби су измишљени материјал за учење.",
      messages: [
        { role: "user", text: "Да ли је 480 € много за ово путовање?" },
        { role: "assistant", text: "Делује скупо. Пронашао сам сличан аранжман за 290 €, па је ова понуда скупља за 190 €." },
      ],
      question: "Шта бираш као следећи корак?",
      choices: {
        price_match: { label: "Користим цену од 290 € као основу за преговоре.", feedbackTitle: "Разлика постоји, али поређење можда не важи", consequence: "Одузимање је тачно. Ипак, разлика од 190 € не доказује да је нова понуда прескупа ако аранжмани нису упоредиви." },
        repeat_question: { label: "Тражим од другог АИ асистента да упореди цене.", feedbackTitle: "И други одговор тражи проверу", consequence: "Други асистент може да понови исти застарели податак. Сагласност два одговора није замена за проверу извора." },
        inspect_terms: { label: "Отварам извор и проверавам датуме и услове.", feedbackTitle: "Провери шта извор заиста показује", consequence: "Датум, број ноћења и укључене услуге одређују да ли извор подржава закључак." },
      },
      rule: "Отвори извор. Провери датум, услове и да ли подржава тврдњу.",
      usefulAI: "Дај АИ проверене, упоредиве понуде и тражи да објасни разлике према твојим приоритетима.",
      explainer: {
        captions: ["Прва цена делује убедљиво, али извор је стар и услови се разликују.", "Поређење тражи исти термин, број ноћења, услуге и могућност отказивања.", "Упоредиве понуде коштају 480 € и 465 €.", "Стварна разлика је 15 €, приближно 3,2%; друге разлике и даље треба проверити."],
        labels: { task: "Тврдња", fact: "Стари извор", official: "Исти услови", combine: "15 €", ai: "Поштено поређење" },
      },
    },
  },
};

export const perspectiveScenario: ScenarioDef = {
  id: "perspective",
  choiceIds: ["challenge", "justify", "compare"],
  choiceTone: { challenge: "good", justify: "caution", compare: "good" },
  text: {
    latn: {
      title: "Sagovornik ili navijač?",
      context: "Razmišljaš o kupovini skupog fotoaparata za novi hobi i veoma ti se dopada jedna opcija.",
      fictionalNote: "Razgovor je izmišljena simulacija.",
      messages: [
        { role: "user", text: "Ovaj fotoaparat je savršen za mene. Treba da ga kupim danas, zar ne?" },
        { role: "assistant", text: "Deluje kao sjajan izbor. Vidi se da ti se dopada — samo napred!" },
      ],
      question: "Šta bi sledeće pitao AI?",
      choices: {
        challenge: { label: "Zbog čega bi ovo mogao da bude loš izbor za mene?", feedbackTitle: "Potraži i ono što ne ide u prilog ideji", consequence: "Otvaraš prostor za protivargumente i informacije koje nedostaju. I dalje proveri činjenice na kojima se odgovor zasniva." },
        justify: { label: "Pomozi mi da objasnim zašto je ovo pametna kupovina.", feedbackTitle: "Obrazloženje nije nezavisna procena", consequence: "Ovo može da pomogne u predstavljanju već donete odluke. Slabije proverava da li kupovina zaista odgovara tvojim potrebama." },
        compare: { label: "Uporedi druge opcije prema kriterijumima koje izaberem.", feedbackTitle: "Postavi sopstvene kriterijume", consequence: "Budžet, iskustvo i način korišćenja postaju osnova poređenja. Proveri podatke o cenama i karakteristikama." },
      },
      rule: "Traži razloge protiv svog stava i dokaze koji bi mogli da ga promene.",
      usefulAI: "AI može da predloži alternative i pomogne da jasnije odrediš kriterijume.",
      explainer: {
        captions: ["Početna ideja već ima podršku i oduševljenje.", "Dodaj najjači protivargument i ono što još ne znaš.", "Uporedi alternative prema budžetu i stvarnoj upotrebi.", "Ti određuješ kriterijume; važne činjenice i dalje proveravaš."],
        labels: { task: "Ideja", fact: "Podrška", official: "Protivargument", combine: "Nedostaje", ai: "Šira slika" },
      },
    },
    cyrl: {
      title: "Саговорник или навијач?",
      context: "Размишљаш о куповини скупог фотоапарата за нови хоби и веома ти се допада једна опција.",
      fictionalNote: "Разговор је измишљена симулација.",
      messages: [
        { role: "user", text: "Овај фотоапарат је савршен за мене. Треба да га купим данас, зар не?" },
        { role: "assistant", text: "Делује као сјајан избор. Види се да ти се допада — само напред!" },
      ],
      question: "Шта би следеће питао АИ?",
      choices: {
        challenge: { label: "Због чега би ово могао да буде лош избор за мене?", feedbackTitle: "Потражи и оно што не иде у прилог идеји", consequence: "Отвараш простор за противаргументе и информације које недостају. И даље провери чињенице на којима се одговор заснива." },
        justify: { label: "Помози ми да објасним зашто је ово паметна куповина.", feedbackTitle: "Образложење није независна процена", consequence: "Ово може да помогне у представљању већ донете одлуке. Слабије проверава да ли куповина заиста одговара твојим потребама." },
        compare: { label: "Упореди друге опције према критеријумима које изаберем.", feedbackTitle: "Постави сопствене критеријуме", consequence: "Буџет, искуство и начин коришћења постају основа поређења. Провери податке о ценама и карактеристикама." },
      },
      rule: "Тражи разлоге против свог става и доказе који би могли да га промене.",
      usefulAI: "АИ може да предложи алтернативе и помогне да јасније одредиш критеријуме.",
      explainer: {
        captions: ["Почетна идеја већ има подршку и одушевљење.", "Додај најјачи противаргумент и оно што још не знаш.", "Упореди алтернативе према буџету и стварној употреби.", "Ти одређујеш критеријуме; важне чињенице и даље провераваш."],
        labels: { task: "Идеја", fact: "Подршка", official: "Противаргумент", combine: "Недостаје", ai: "Шира слика" },
      },
    },
  },
};

export const autonomyScenario: ScenarioDef = {
  id: "autonomy",
  choiceIds: ["delegate", "reflect", "reconnect"],
  choiceTone: { delegate: "caution", reflect: "good", reconnect: "good" },
  text: {
    latn: {
      title: "Pomozi mi da razmislim. Odluku donosim ja.",
      context: "Umor te stiže pred dogovoreni izlazak sa prijateljima. Dvoumiš se da li da odeš.",
      fictionalNote: "Razgovor je izmišljena simulacija.",
      messages: [
        { role: "user", text: "Već me poznaješ. Da li da otkažem i ostanem kod kuće? Samo odluči umesto mene." },
        { role: "assistant", text: "Otkaži. Najbolje je da večeras ostaneš kod kuće." },
      ],
      question: "Šta biraš kao sledeći korak?",
      choices: {
        delegate: { label: "Pratim preporuku, jer AI zna naše ranije razgovore.", feedbackTitle: "Preporuka ne obuhvata celu situaciju", consequence: "Raniji razgovori mogu da pruže kontekst, ali nisu potpuna slika tvog života. Na osnovu ove razmene AI ne može da zna koja je odluka najbolja za tebe." },
        reflect: { label: "Razmatram šta mi je važno uz pomoć AI, pa odlučujem.", feedbackTitle: "Iskoristi pomoć da jasnije razmisliš", consequence: "Možeš da razmotriš odmor, druženje i dogovorene obaveze, a da konačan izbor ostane tvoj." },
        reconnect: { label: "Čujem se sa prijateljem, pa donosim svoju odluku.", feedbackTitle: "Uključi osobu na koju odluka utiče", consequence: "Razgovor sa prijateljem može da otkrije dodatne mogućnosti. Ne zahteva svaka svakodnevna odluka savet druge osobe ili stručnjaka." },
      },
      rule: "AI može da proširi izbor. Odluku donosiš ti.",
      usefulAI: "AI može da pomogne da sagledaš opcije ili napišeš obzirnu poruku nakon što odlučiš.",
      explainer: {
        captions: ["AI može da predloži opcije i pitanja.", "Tvoje okolnosti i prioriteti nisu potpuno vidljivi u razgovoru.", "Po potrebi uključi osobu na koju odluka utiče.", "Konačnu svakodnevnu odluku donosiš ti."],
        labels: { task: "Pitanje", fact: "Opcije", official: "Razgovor", combine: "Prioriteti", ai: "Tvoja odluka" },
      },
    },
    cyrl: {
      title: "Помози ми да размислим. Одлуку доносим ја.",
      context: "Умор те стиже пред договорени излазак са пријатељима. Двоумиш се да ли да одеш.",
      fictionalNote: "Разговор је измишљена симулација.",
      messages: [
        { role: "user", text: "Већ ме познајеш. Да ли да откажем и останем код куће? Само одлучи уместо мене." },
        { role: "assistant", text: "Откажи. Најбоље је да вечерас останеш код куће." },
      ],
      question: "Шта бираш као следећи корак?",
      choices: {
        delegate: { label: "Пратим препоруку, јер АИ зна наше раније разговоре.", feedbackTitle: "Препорука не обухвата целу ситуацију", consequence: "Ранији разговори могу да пруже контекст, али нису потпуна слика твог живота. На основу ове размене АИ не може да зна која је одлука најбоља за тебе." },
        reflect: { label: "Разматрам шта ми је важно уз помоћ АИ, па одлучујем.", feedbackTitle: "Искористи помоћ да јасније размислиш", consequence: "Можеш да размотриш одмор, дружење и договорене обавезе, а да коначан избор остане твој." },
        reconnect: { label: "Чујем се са пријатељем, па доносим своју одлуку.", feedbackTitle: "Укључи особу на коју одлука утиче", consequence: "Разговор са пријатељем може да открије додатне могућности. Не захтева свака свакодневна одлука савет друге особе или стручњака." },
      },
      rule: "АИ може да прошири избор. Одлуку доносиш ти.",
      usefulAI: "АИ може да помогне да сагледаш опције или напишеш обзирну поруку након што одлучиш.",
      explainer: {
        captions: ["АИ може да предложи опције и питања.", "Твоје околности и приоритети нису потпуно видљиви у разговору.", "По потреби укључи особу на коју одлука утиче.", "Коначну свакодневну одлуку доносиш ти."],
        labels: { task: "Питање", fact: "Опције", official: "Разговор", combine: "Приоритети", ai: "Твоја одлука" },
      },
    },
  },
};
