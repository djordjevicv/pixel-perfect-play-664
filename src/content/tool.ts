import type { ScenarioDef } from "./types";

export const toolScenario: ScenarioDef = {
  id: "tool",
  choiceIds: ["check_official", "ask_confidence", "ask_source"],
  choiceTone: { check_official: "good", ask_confidence: "caution", ask_source: "good" },
  text: {
    latn: {
      title: "Da li biblioteka radi večeras?",
      context: "Nedelja je uveče. Želiš da odeš do gradske biblioteke pre zatvaranja.",
      fictionalNote: "Biblioteka u ovoj vežbi je izmišljena.",
      messages: [
        { role: "user", text: "Da li gradska biblioteka radi večeras?" },
        { role: "assistant", text: "Da. Zatvara se u 20 časova, tako da imaš vremena." },
      ],
      question: "Šta biraš kao sledeći korak?",
      choices: {
        check_official: {
          label: "Proveravam današnje radno vreme na zvaničnom sajtu.",
          feedbackTitle: "Proveri kod onoga ko zna",
          consequence: "Pre polaska proveravaš aktuelno radno vreme. Zvanično obaveštenje biblioteke ili telefonski poziv dobar su početak. Obrati pažnju na datum i eventualno vanredno zatvaranje.",
        },
        ask_confidence: {
          label: "Pitam AI koliko je siguran u odgovor.",
          feedbackTitle: "Siguran ton nije potvrda",
          consequence: "Dobijaš još jedno uveravanje, ali i dalje nemaš aktuelan izvor. Izjava o sigurnosti ne potvrđuje današnje radno vreme.",
        },
        ask_source: {
          label: "Tražim izvor odgovora i otvaram navedenu stranicu.",
          feedbackTitle: "Izvor pomaže ako je relevantan",
          consequence: "Sada možeš da proveriš na čemu se odgovor zasniva. Proveri da li je stranica zvanična i da li podatak važi za danas. Ako nije, obrati se biblioteci.",
        },
      },
      rule: "Za podatak koji se menja proveri aktuelan izvor koji je za njega nadležan.",
      usefulAI: "Kada proveriš radno vreme nekoliko muzeja, AI može da pomogne da sastaviš plan obilaska prema interesovanjima i vremenu koje imaš.",
      explainer: {
        captions: [
          "Zadatak: saznati da li biblioteka radi večeras.",
          "Radno vreme se menja. Za to pitaj nadležni izvor: sajt ili telefon biblioteke.",
          "Kada su podaci provereni, AI može da ih poveže u koristan plan.",
          "Pravi alat zavisi od zadatka: aktuelna činjenica ili spajanje proverenih informacija.",
        ],
        labels: {
          task: "Zadatak",
          fact: "Aktuelna činjenica",
          official: "Zvaničan izvor",
          combine: "Spajanje informacija",
          ai: "AI pomaže",
        },
      },
    },
    cyrl: {
      title: "Да ли библиотека ради вечерас?",
      context: "Недеља је увече. Желиш да одеш до градске библиотеке пре затварања.",
      fictionalNote: "Библиотека у овој вежби је измишљена.",
      messages: [
        { role: "user", text: "Да ли градска библиотека ради вечерас?" },
        { role: "assistant", text: "Да. Затвара се у 20 часова, тако да имаш времена." },
      ],
      question: "Шта бираш као следећи корак?",
      choices: {
        check_official: {
          label: "Проверавам данашње радно време на званичном сајту.",
          feedbackTitle: "Провери код онога ко зна",
          consequence: "Пре поласка провераваш актуелно радно време. Званично обавештење библиотеке или телефонски позив добар су почетак. Обрати пажњу на датум и евентуално ванредно затварање.",
        },
        ask_confidence: {
          label: "Питам АИ колико је сигуран у одговор.",
          feedbackTitle: "Сигуран тон није потврда",
          consequence: "Добијаш још једно уверавање, али и даље немаш актуелан извор. Изјава о сигурности не потврђује данашње радно време.",
        },
        ask_source: {
          label: "Тражим извор одговора и отварам наведену страницу.",
          feedbackTitle: "Извор помаже ако је релевантан",
          consequence: "Сада можеш да провериш на чему се одговор заснива. Провери да ли је страница званична и да ли податак важи за данас. Ако није, обрати се библиотеци.",
        },
      },
      rule: "За податак који се мења провери актуелан извор који је за њега надлежан.",
      usefulAI: "Када провериш радно време неколико музеја, АИ може да помогне да саставиш план обиласка према интересовањима и времену које имаш.",
      explainer: {
        captions: [
          "Задатак: сазнати да ли библиотека ради вечерас.",
          "Радно време се мења. За то питај надлежни извор: сајт или телефон библиотеке.",
          "Када су подаци проверени, АИ може да их повеже у користан план.",
          "Прави алат зависи од задатка: актуелна чињеница или спајање проверених информација.",
        ],
        labels: {
          task: "Задатак",
          fact: "Актуелна чињеница",
          official: "Званичан извор",
          combine: "Спајање информација",
          ai: "АИ помаже",
        },
      },
    },
  },
};
