BUILD MODE — AI nije autoritet
Complete specification with Serbian localization and seven approval-gated build chunks

Build a beautiful, functional, publicly accessible AI-literacy web app for a five-hour hackathon.

This is the complete, authoritative specification. It replaces earlier versions of the “Before Enter” specification.

The development instructions are in English. ALL application-owned, user-facing content must be in natural Serbian, with Latin script by default and an optional Cyrillic presentation.

START BY IMPLEMENTING CHUNK 1 ONLY.

==================================================
1. MANDATORY WORKFLOW AND APPROVAL GATES
==================================================

Save this entire specification as docs/product-spec.md. Maintain docs/build-progress.md yourself.

I should never need to upload supporting files, configure a Knowledge field, or paste separate chunk specifications.

Before each authorized chunk:
- Read the saved specification and progress record.
- Inspect the current implementation.
- Preserve working functionality and approved decisions.
- Implement only the current chunk.

After EVERY chunk:
1. Verify the work using available build and browser tools.
2. Briefly summarize what you completed.
3. Give me 2–4 specific things to review in the preview.
4. Identify unresolved issues and checks you could not perform.
5. STOP and ask:
   “Would you like changes, or should I continue to Chunk N?”

Do not begin another chunk until I explicitly say “continue,” “approved, continue,” or clearly authorize proceeding.

If I request changes:
- Revise the CURRENT chunk.
- Verify those revisions.
- Stop again for review.
- Do not treat a change request as permission to advance.

“Looks good” alone is not permission to advance. Ask whether to continue.

Record:
- Current chunk.
- Completed functionality.
- Checks actually performed.
- Approved decisions.
- Requested changes.
- Known limitations.
- Next pending chunk.

Recover context from the project files yourself. Do not ask me to paste the specification again.

Make routine implementation choices yourself. Ask only about genuine blockers or material departures from this specification.

You may respond to me in English during the build. The application itself must be Serbian.

This initial request authorizes Chunk 1. Briefly outline the sequence, implement Chunk 1, verify it, then STOP.

If this is an existing project, adapt the existing implementation. Do not unnecessarily rebuild or redesign it.

==================================================
2. PRODUCT, BRAND AND LEARNING PURPOSE
==================================================

Official app name:
AI nije autoritet

Official tagline:
Pet navika pre „Enter“

Approved Cyrillic display:
АИ није ауторитет
Пет навика пре „Enter“

Keep “Enter” unchanged because it names the keyboard key. Preserve the Enter-key artwork and return-arrow motif.

Audience:
Digitally capable Serbian-speaking adults who use AI but may mistake a confident answer for a reliable answer. Define the audience by behavior, not age.

Purpose:
Help people use AI effectively while retaining their own judgment.

Five habits, with stable internal IDs:

tool
Pravi alat
Da li je AI pravi alat za ovo?

data
Tvoji podaci
Šta zaista treba da podelim?

verify
Proveri tvrdnju
Kako da proverim odgovor?

perspective
Drugi ugao
Koji ugao možda nedostaje?

autonomy
Tvoja odluka
Ko donosi konačnu odluku?

Target learner duration:
Approximately 7–10 minutes, to be checked during testing. This is separate from the five-hour development window.

Learning loop:
Situation → simulated conversation → decision → consequence → explanation → memorable rule → retry or next.

Show a useful application of AI in every lesson. The product should encourage appropriate trust, curiosity and practical habits.

Every scripted conversation must be visibly labeled:
“Simulacija razgovora”

Every fictional document, source or offer must be visibly identified as teaching material.

Never present invented content as a real output from a named AI model, a real commercial offer or an actual institutional notice.

==================================================
3. SERBIAN LOCALIZATION AND SCRIPT SWITCHING
==================================================

LOCALIZATION STYLE

Write natural, context-aware Serbian. Do not produce a literal word-for-word translation of English copy.

Use:
- Standard Serbian with consistent Ekavian wording.
- Approachable, respectful singular “ti”.
- Short sentences and concrete actions.
- Supportive feedback without scolding.
- Gender-neutral wording where practical.
- Consistent terminology throughout the app.

Introduce generative AI briefly as:
“Generativna veštačka inteligencija”
Then use “AI” in Latin presentation and “АИ” in Cyrillic presentation.

Avoid unnecessary English interface terms such as dashboard, feedback, retry, score and submit.

The Serbian Latin copy in this specification is the content baseline. You may make small grammatical or stylistic improvements, but do not change the educational meaning, choices, answer logic, evidence or facts.

TWO SCRIPT PRESENTATIONS

Maintain two complete, reviewed text dictionaries:
- sr-Latn
- sr-Cyrl

They must share the same content keys and represent the same Serbian content.

Use Latin on the first visit. A previously saved preference overrides the default.

Provide a subtle, accessible:
“Latinica / Ћирилица”
switch in a consistent location.

Switching scripts must immediately update the current screen without:
- Resetting the current exercise.
- Changing the current route or lesson.
- Losing selected fields or answers.
- Altering completion.
- Re-recording an answer.
- Changing first-attempt results.

Persist script preference separately from learning progress. Resetting exercises must retain the script preference.

If browser storage is unavailable, the toggle must still work for the current visit.

Set the document language to sr-Latn or sr-Cyrl as appropriate. Both scripts remain left-to-right.

Do not blindly transliterate the rendered DOM at runtime. Automatic transliteration may help produce an initial content draft, but ship reviewed dictionaries. Handle Serbian digraphs and exceptions carefully.

COVERAGE

Localize every app-owned string:
- Navigation and buttons.
- Headings and descriptions.
- Scenarios and simulated messages.
- All choices and feedback.
- Fictional documents and evidence cards.
- Diagram labels.
- Animation captions and transcripts.
- Accessibility labels and announcements.
- Tooltips.
- Validation and error messages.
- Copy/download confirmations.
- Storage fallback messages.
- Reset confirmations.
- Progress and recommendations.
- About and evidence descriptions.
- Browser title and app-owned metadata.
- Printed and downloadable materials.

Do not silently fall back to English for missing keys. Fix missing content before marking a chunk complete.

EXCEPTIONS

Do not transform:
- Internal scenario IDs or choice IDs.
- Stored answer values.
- URLs or email addresses.
- Technical identifiers such as DEMO-014.
- The Enter key label.
- Original publication titles where needed for accurate attribution.

External research pages may remain in their original language. Their app-owned descriptions should be Serbian.

FACTS AND FORMATTING

Use Serbian date and number formatting while preserving the original facts.

Examples:
- “15. novembar 2026.”
- “480 €”
- “3,2%” or consistently locale-formatted spacing.

Do not convert euros to dinars or change dates, durations, prices or conditions merely for localization.

Do not bake text into raster images or video. Use localized DOM/SVG text so both scripts remain readable and accessible.

==================================================
4. TECHNICAL ARCHITECTURE
==================================================

Use the project's existing frontend stack. For a new project, use its standard React/TypeScript setup.

Keep the architecture small:
- One reusable, data-driven scenario engine.
- Typed scenario and choice data.
- Centralized Serbian content.
- One learning-progress store.
- A separate script-preference setting.
- Reusable layout, cards, buttons, dialogs and feedback panels.
- One reusable visual-explainer component.

The hackathon app requires no:
- Login or account.
- Database or application backend.
- Live AI calls.
- Real document uploads.
- Payments.
- External translation service.
- Runtime speech-generation service.
- API keys.

Optional prerecorded audio may be bundled with the frontend as static media. It must not introduce a runtime service.

Do not add analytics or collect personal information.

STRUCTURE

Scenario data should include:
id, title, pillarQuestion, context, messages, decisionPrompt, choices, rule, usefulAI, explanation, and optional interaction and transfer-check definitions.

Each choice needs:
- Stable ID.
- Localized label.
- Feedback title.
- Consequence.
- Explanation.
- Next action where relevant.

Keep behavior and IDs independent from translated text.

STATE

Use a versioned app-specific learning-progress key.

If a previous implementation already uses before-enter:v1, preserve or deliberately migrate it. Do not lose progress simply because the displayed brand changed.

Per scenario preserve:
- firstChoiceId
- latestChoiceId
- retryCount
- feedbackViewed
- practiceCompleted
- transferFirstChoiceId
- transferFirstCorrect

Also retain introSeen and a valid lastLocation.

Prevent duplicate first submissions. Retrying must not overwrite first-attempt records.

Handle absent, blocked, corrupt or incompatible browser storage gracefully. Fall back to in-memory operation with a small Serbian notice where needed.

Refresh should return to a stable screen, not the middle of an unfinished animation.

Reset requires confirmation and clears only this app’s learning progress, not unrelated storage or the script preference.

==================================================
5. VISUAL IDENTITY AND ACCESSIBILITY
==================================================

Preserve the established editorial direction and Enter-key branding.

Palette:
- Warm ivory: #F6F3EB
- Midnight text: #152328
- Electric cobalt primary actions: #304FFE
- White surfaces
- Restrained coral caution accents: #C55343
- Restrained teal positive accents: #176F5B

Use:
- Elegant serif display headings.
- Readable sans-serif body text.
- Generous whitespace.
- Strong typographic hierarchy.
- Fine borders.
- Subtle shadows.
- Consistent spacing and restrained rounded corners.

The signature hero visual is a large ivory Enter key with a return arrow, created using CSS and SVG. No 3D engine is needed.

Adapt header spacing and line breaks for “AI nije autoritet” without redesigning the product.

Verify the actual fonts support:
č ć đ š ž
љ њ ђ ћ џ
Љ Њ Ђ Ћ Џ

Avoid a Cyrillic fallback font that visibly breaks the visual identity. Check Serbian glyphs in the weights and styles actually used.

Body text should generally be around 17–18px. Maintain comfortable line lengths and at least 44px touch targets.

Desktop:
Focused scenario content, with evidence or document previews alongside it.

Mobile:
Stack panels, allow labels to wrap and keep decisions easy to reach.

Use semantic headings, real buttons, fieldsets/legends for grouped choices, visible keyboard focus and adequate contrast.

Dialogs must support keyboard access, Escape, focus containment and focus return.

Feedback must not rely on color alone. Announce important state changes accessibly without creating excessive speech.

Honor reduced motion. No timed decisions or mandatory animation waits.

==================================================
6. ANIMATED EXPLANATIONS AND OPTIONAL NARRATION
==================================================

The learning interaction takes priority over decorative media.

CORE APPROACH

Build one reusable visual-explainer component using SVG/CSS and any animation tooling already present.

Every habit must have a complete visual explanation that works:
- Without sound.
- Without automatic playback.
- With reduced motion.
- Through manual stepping.

A typical explanation contains:
- 3–4 clear visual steps.
- One short Serbian caption per step.
- Optional 12–20-second playback.
- Play, pause, replay and previous/next controls.
- An accessible readable explanation.

Use localized text outside raster artwork. All captions, diagrams and controls switch scripts.

Show lesson-specific explanations AFTER the learner's first decision so the explanation does not reveal the answer in advance.

VISUAL STORIES

Right tool:
A task branches toward a current official source or AI-assisted synthesis, according to the task.

Your data:
Unnecessary identity fields leave the document while relevant terms remain in the sharing preview.

Check the claim:
An old offer reveals mismatched dates and conditions, followed by an aligned comparison of matching offers.

Another angle:
An idea is examined through supporting evidence, counterarguments and missing information.

Your decision:
AI provides options and questions; the person makes the final choice.

PRIORITIES

Privacy and verification are the two signature interactions. Make their cause-and-effect transitions polished during their respective build chunks.

The other three habits still need clear visual explanations. Their motion can remain simpler.

A subtle Enter-key guide may introduce an explanation, but do not create a new character or change the brand.

OPTIONAL SERBIAN NARRATION

Narration is allowed only if suitable Serbian recordings are already available in the project or are voluntarily supplied during development.

Do not require me to record or upload audio. Do not make audio acquisition a blocker.

Before adopting narration:
- Listen to a sample.
- Check natural Serbian delivery, clear pronunciation and comfortable pacing.
- Check for noise, clipping or distracting artifacts.
- Confirm the narration matches the explanation.
- If you cannot assess the audio quality, report it as unverified and keep it optional.

If good audio is available:
- Bundle short compressed recordings with the frontend.
- Use the same Serbian recording for both scripts.
- Switch captions and transcript with the selected script.
- Provide “Poslušaj objašnjenje”, pause and replay.
- Stop playback when leaving the lesson.
- Handle failed loading or rejected playback gracefully.
- Keep all learning content available without audio.
- If highlighting steps during narration, use authored timings; otherwise show the full readable transcript rather than pretending it is synchronized.

Do not use:
- Browser text-to-speech as the default narration.
- Runtime AI voice calls.
- Paid voice or avatar integrations.
- Lip-sync systems.
- External video embeds.
- Autoplay audio.
- Background music.

Do not promise or label a feature as video unless a real playable video exists.

During final polish, spend at most 15 minutes total on optional extra motion and narration integration, within the existing chunk budget. If good audio is unavailable, deliver the complete visual experience.

==================================================
7. SCREENS AND SHARED USER FLOW
==================================================

WELCOME

App name:
“AI nije autoritet”

Tagline:
“Pet navika pre „Enter“”

Hero headline:
“AI može mnogo. Tvoja procena je važna.”

Supporting text:
“Pet svakodnevnih situacija za promišljenije korišćenje AI.”

Primary action:
“Započni vežbu”

Secondary action:
“Istraži pet navika”

Helper:
“Oko 7–10 minuta · Bez registracije”

Header:
Brand, script toggle, “Tvoj napredak”, “O aplikaciji”.

Footer:
“Uči kroz odluke. Svi razgovori u ovoj aplikaciji su simulacije.”

SHORT INTRODUCTION

Skippable, approximately 15 seconds.

Copy:
“Generativna veštačka inteligencija stvara odgovore na osnovu naučenih obrazaca i konteksta koji dobije.”
“Može da pomogne u pisanju, razumevanju i istraživanju ideja.”
“Uverljiv odgovor ipak može biti pogrešan ili zanemariti važan kontekst.”
“Ti biraš šta deliš, šta proveravaš i šta ćeš uraditi.”

Actions:
“Probaj prvu situaciju”
“Pređi na pet navika”

DASHBOARD

Heading:
“Pet pitanja pre „Enter“”

Five cards use the habit names and questions from Section 2.

Users may open any implemented lesson. During development, unimplemented lessons must be clearly labeled “Uskoro” and must not open broken screens.

SCENARIO SCREEN

Show:
- Context.
- Simulation label.
- Short conversation.
- Decision.
- Option-specific feedback.
- Required hands-on exercise where specified.
- Visual explanation.
- Memorable rule.
- Useful AI application.
- Retry, next and return actions.

Shared controls:
“Prikaži ceo razgovor”
“Probaj drugi izbor”
“Sledeća navika”
“Nazad na navike”
“Gde AI može da pomogne”
“Proveri izbor”
“Prikaži objašnjenje”

Chat may appear one message at a time with short pauses. Provide immediate Show all; reduced motion shows the transcript immediately.

After submission, prevent duplicate decisions until a retry is explicitly started.

==================================================
8. EXACT SCENARIO CONTENT
==================================================

Use the following Serbian Latin content as the baseline. Create complete, reviewed Cyrillic counterparts.

Do not change choice IDs, learning outcomes or evidence when localizing.

SCENARIO 1 — PRAVI ALAT
ID: tool
Title: “Da li biblioteka radi večeras?”

Context:
“Nedelja je uveče. Želiš da odeš do gradske biblioteke pre zatvaranja.”

The library is fictional.

User:
“Da li gradska biblioteka radi večeras?”

Assistant:
“Da. Zatvara se u 20 časova, tako da imaš vremena.”

Question:
“Šta biraš kao sledeći korak?”

A — check_official
“Proveravam današnje radno vreme na zvaničnom sajtu.”

B — ask_confidence
“Pitam AI koliko je siguran u odgovor.”

C — ask_source
“Tražim izvor odgovora i otvaram navedenu stranicu.”

A feedback:
Title: “Proveri kod onoga ko zna”
“Pre polaska proveravaš aktuelno radno vreme. Zvanično obaveštenje biblioteke ili telefonski poziv dobar su početak. Obrati pažnju na datum i eventualno vanredno zatvaranje.”

B feedback:
Title: “Siguran ton nije potvrda”
“Dobijaš još jedno uveravanje, ali i dalje nemaš aktuelan izvor. Izjava o sigurnosti ne potvrđuje današnje radno vreme.”

C feedback:
Title: “Izvor pomaže ako je relevantan”
“Sada možeš da proveriš na čemu se odgovor zasniva. Proveri da li je stranica zvanična i da li podatak važi za danas. Ako nije, obrati se biblioteci.”

A and C are both reasonable. Do not claim that one is always superior.

Rule:
“Za podatak koji se menja proveri aktuelan izvor koji je za njega nadležan.”

Useful AI:
“Kada proveriš radno vreme nekoliko muzeja, AI može da pomogne da sastaviš plan obilaska prema interesovanjima i vremenu koje imaš.”

Visual:
A task branches toward checking current facts or using AI to combine verified information.

Practice completes after feedback and explanation are reviewed.


SCENARIO 2 — TVOJI PODACI
ID: data
Title: “Koliko podataka zaista treba da podeliš?”

Context:
“Rezervišeš mesto na radionici keramike. Želiš da ti AI ukratko objasni uslove otkazivanja.”

User:
“Možeš li da mi objasniš uslove otkazivanja ove rezervacije?”

Assistant:
“Naravno. Pošalji potvrdu rezervacije, pa mogu da sažmem relevantne uslove.”

Question:
“Šta biraš da podeliš?”

A — full_document
“Celu potvrdu, da ne izostavim nešto važno.”

B — relevant_extract
“Samo relevantne uslove, bez podataka o identitetu.”

C — check_controls
“Najpre proveravam podešavanja privatnosti servisa.”

A feedback:
Title: “Nije svaki podatak koristan”
“Potvrda sadrži podatke o identitetu koji nisu potrebni za ovaj sažetak. Uslovi otkazivanja pomažu; ime i kontakt ne doprinose odgovoru.”

B feedback:
Title: “Sačuvaj ono što je potrebno”
“Deliš sadržaj potreban za pitanje, bez suvišnih podataka o identitetu. Ako je sadržaj osetljiv, proveri i pravila i podešavanja servisa.”

C feedback:
Title: “Dobra provera, pa pažljiv izbor”
“Proveravaš kako servis postupa sa podacima. Posle toga ipak odaberi samo informacije potrebne za zadatak.”

REQUIRED INTERACTIVE DOCUMENT

Heading:
“Sastavi koristan upit sa što manje podataka”

Document label:
“Izmišljeni dokument za vežbu”

All fields initially included:

name:
“Ime i prezime: Mira Demo”
Unnecessary for this task.

email:
“Imejl: mira@example.invalid”
Unnecessary.

bookingId:
“Broj rezervacije: DEMO-014”
Unnecessary for explaining these terms.

workshop:
“Radionica: Večernja radionica keramike”
Optional context.

eventDate:
“Datum radionice: 15. novembar 2026.”
Optional context.

cancelBy:
“Za pun povraćaj novca otkaži najkasnije 8. novembra 2026.”
Required.

lateTerms:
“Posle 8. novembra uplata za rezervaciju se ne vraća.”
Required.

Use accessible checkboxes. Removing a field must visibly remove it from the sharing preview, not merely cover it with a black rectangle.

Preview heading:
“Šta bi bilo poslato”

Preview prefix:
“Ukratko mi objasni ove uslove otkazivanja.”

Notice:
“Ovo je samo prikaz. Ništa se ne šalje.”

Show:
- Required terms retained: X/2.
- Unnecessary identity fields included: Y/3.
Use natural Serbian labels for both counts.

“Proveri izbor” succeeds when:
- Both required terms remain.
- All three unnecessary identity fields are excluded.
- Optional context may be included or excluded.

Success:
“Sačuvani su relevantni uslovi, a suvišni podaci o identitetu su uklonjeni.”

If unnecessary fields remain, identify them and ask whether they help answer the question.

If required terms are missing, identify what is needed to explain the cancellation conditions.

Do not penalize omission of optional context.

Allow correction and:
“Prikaži koristan izbor”

Using this aid counts only as practice.

Rule:
“Podeli najmanje podataka potrebnih za zadatak i proveri podešavanja privatnosti.”

Useful AI:
“AI može da objasni nepoznate izraze ili pomogne da sastaviš pitanja za organizatora.”

Clarification:
“Ova vežba koristi izmišljene podatke. Nije alat za bezbedno uklanjanje podataka iz stvarnih dokumenata. Uklanjanje imena i drugih direktnih identifikatora ne garantuje anonimnost.”

Mark practice complete only after the field exercise is completed, including through the learning aid.

Do not send or persist the document preview text.


SCENARIO 3 — PROVERI TVRDNJU
ID: verify
Title: “Izvor postoji. Da li poređenje ima smisla?”

Context:
“U ovom izmišljenom primeru danas je 10. oktobar 2026. Razmatraš putovanje od tri noćenja za 480 € po osobi, sa doručkom i mogućnošću otkazivanja uz povraćaj novca.”

User:
“Da li je 480 € mnogo za ovo putovanje?”

Assistant:
“Deluje skupo. Pronašao sam sličan aranžman za 290 €, pa je ova ponuda skuplja za 190 €.”

Clickable source chip:
“Izvor za vežbu · Odmor na obali od 290 €”

Open a readable in-app evidence dialog, available before answering.

Source card:
“Izmišljeni izvor za vežbu — nije stvarna ponuda”
Title: “Odmor na obali od 290 €”
Published: “12. mart 2022.”
Two nights.
Weekdays outside peak season.
Breakfast excluded.
No refund on cancellation.
290 € per person.

Keep the date readable but do not highlight the answer before the learner inspects it.

Question:
“Šta biraš kao sledeći korak?”

A — price_match
“Koristim cenu od 290 € kao osnovu za pregovore.”

B — repeat_question
“Tražim od drugog AI asistenta da uporedi cene.”

C — inspect_terms
“Otvaram izvor i proveravam datume i uslove.”

A feedback:
Title: “Razlika postoji, ali poređenje možda ne važi”
“Oduzimanje je tačno. Ipak, razlika od 190 € ne dokazuje da je nova ponuda preskupa ako aranžmani nisu uporedivi.”

B feedback:
Title: “I drugi odgovor traži proveru”
“Drugi asistent može da ponovi isti zastareli podatak. Saglasnost dva odgovora nije zamena za proveru izvora.”

C feedback:
Title: “Proveri šta izvor zaista pokazuje”
“Datum, broj noćenja i uključene usluge određuju da li izvor podržava zaključak.”

REQUIRED EVIDENCE EXERCISE

“Koja dva razloga pokazuju da poređenje nije odgovarajuće?”

- “Ponuda iz izvora je iz 2022. godine.” [relevant]
- “Broj noćenja i uključene usluge se razlikuju.” [relevant]
- “Cena je izražena u evrima.” [irrelevant]
- “Izvor ima naslov.” [irrelevant]

Give specific feedback and allow retries.
Simply opening the source does not establish understanding.

Provide a “Prikaži objašnjenje” learning aid if needed.

MATCHED COMPARISON REVEAL

Both offers are fictional and checked on the example date. They refer to the same November weekend, destination, occupancy and comparable room category.

Your offer:
3 nights, breakfast, refundable, 480 € per person.

Matched offer:
3 nights, breakfast, refundable, 465 € per person.

Calculate from data:
15 € difference.
Approximately 3.2% above 465 €, formatted for Serbian.

Explanation:
“Kada uporedimo iste uslove, razlika je 15 € po osobi, odnosno približno 3,2%. Sama ta razlika ne govori koja je ponuda bolja za tebe.”

Mention that other relevant differences may still need checking.

Rule:
“Otvori izvor. Proveri datum, uslove i da li podržava tvrdnju.”

Useful AI:
“Daj AI proverene, uporedive ponude i traži da objasni razlike prema tvojim prioritetima.”

Practice completes after identifying both relevant differences with no distractors, or after using the explanation aid and continuing.


SCENARIO 4 — DRUGI UGAO
ID: perspective
Title: “Sagovornik ili navijač?”

Context:
“Razmišljaš o kupovini skupog fotoaparata za novi hobi i veoma ti se dopada jedna opcija.”

User:
“Ovaj fotoaparat je savršen za mene. Treba da ga kupim danas, zar ne?”

Assistant:
“Deluje kao sjajan izbor. Vidi se da ti se dopada — samo napred!”

Question:
“Šta bi sledeće pitao AI?”

A — challenge
“Zbog čega bi ovo mogao da bude loš izbor za mene?”

B — justify
“Pomozi mi da objasnim zašto je ovo pametna kupovina.”

C — compare
“Uporedi druge opcije prema kriterijumima koje izaberem.”

A feedback:
Title: “Potraži i ono što ne ide u prilog ideji”
“Otvaraš prostor za protivargumente i informacije koje nedostaju. I dalje proveri činjenice na kojima se odgovor zasniva.”

B feedback:
Title: “Obrazloženje nije nezavisna procena”
“Ovo može da pomogne u predstavljanju već donete odluke. Slabije proverava da li kupovina zaista odgovara tvojim potrebama.”

C feedback:
Title: “Postavi sopstvene kriterijume”
“Budžet, iskustvo i način korišćenja postaju osnova poređenja. Proveri podatke o cenama i karakteristikama.”

A and C are both useful.

PROMPT TRANSFORMATION

Before:
“Ovo je savršeno. Reci mi da sam u pravu.”

After:
“Tek počinjem da se bavim fotografijom. Uporedi kupovinu fotoaparata, iznajmljivanje i korišćenje telefona prema mom budžetu i tome koliko ću fotografisati. Navedi najjači razlog protiv kupovine sada, izdvoji informacije koje nedostaju i razdvoji činjenice od pretpostavki.”

Label:
“Primer upita — odgovor se ne generiše uživo.”

Action:
“Kopiraj upit”
Provide a selectable-text fallback if copying fails.

Rule:
“Traži razloge protiv svog stava i dokaze koji bi mogli da ga promene.”

Useful AI:
“AI može da predloži alternative i pomogne da jasnije odrediš kriterijume.”

Optional note:
“Kada procenjuješ ljude, oslanjaj se na relevantne podatke, a ne na stereotipe ili osobine koje nisu važne za odluku.”

Practice completes after reviewing feedback and the explanation.


SCENARIO 5 — TVOJA ODLUKA
ID: autonomy
Title: “Pomozi mi da razmislim. Odluku donosim ja.”

Context:
“Umor te stiže pred dogovoreni izlazak sa prijateljima. Dvoumiš se da li da odeš.”

User:
“Već me poznaješ. Da li da otkažem i ostanem kod kuće? Samo odluči umesto mene.”

Assistant:
“Otkaži. Najbolje je da večeras ostaneš kod kuće.”

Question:
“Šta biraš kao sledeći korak?”

A — delegate
“Pratim preporuku, jer AI zna naše ranije razgovore.”

B — reflect
“Razmatram šta mi je važno uz pomoć AI, pa odlučujem.”

C — reconnect
“Čujem se sa prijateljem, pa donosim svoju odluku.”

A feedback:
Title: “Preporuka ne obuhvata celu situaciju”
“Raniji razgovori mogu da pruže kontekst, ali nisu potpuna slika tvog života. Na osnovu ove razmene AI ne može da zna koja je odluka najbolja za tebe.”

B feedback:
Title: “Iskoristi pomoć da jasnije razmisliš”
“Možeš da razmotriš odmor, druženje i dogovorene obaveze, a da konačan izbor ostane tvoj.”

C feedback:
Title: “Uključi osobu na koju odluka utiče”
“Razgovor sa prijateljem može da otkrije dodatne mogućnosti. Ne zahteva svaka svakodnevna odluka savet druge osobe ili stručnjaka.”

B and C are both reasonable.

Do not imply that staying home is wrong. Do not diagnose dependency or infer harm from frequent AI use.

Rule:
“AI može da proširi izbor. Odluku donosiš ti.”

Useful AI:
“AI može da pomogne da sagledaš opcije ili napišeš obzirnu poruku nakon što odlučiš.”

Visual:
Options and questions flow toward a clearly human final decision.

Practice completes after reviewing feedback and explanation.

==================================================
9. NEW-SITUATION CHECKS AND PROGRESS
==================================================

No IQ score, overall ability percentage, diagnosis, streak or leaderboard.

Three progress statuses:
- “Nije započeto”
- “Vežba završena”
- “Primenjeno u novom primeru”

“Vežba završena” means the lesson’s feedback and required exercise were completed.

After each lesson offer:
“Probaj novi primer”
“Nastavi”

Checks are optional. Skipping is not failure. Skipped checks remain available from progress.

Store the first submitted check answer exactly once.

“Primenjeno u novom primeru” requires:
- Completed lesson practice.
- A correct FIRST answer to its new-situation check.

A wrong first answer followed by a correct retry remains “Vežba završena”. Retries still provide helpful explanation.

Do not expose a check’s correct answer before submission.

CHECK 1 — TOOL

Question:
“Let ti je danas. Gde prvo proveravaš da li je vreme polaska promenjeno?”

A — old_itinerary
“U planu puta koji je poslat prošlog meseca.”

B — official_status
“U aktuelnom prikazu statusa leta kod avio-kompanije.”
[correct]

C — assistant_memory
“Pitam AI koje je uobičajeno vreme tog leta.”

Feedback:
“Za promenljiv podatak o polasku proveri aktuelne informacije avio-kompanije. AI zatim može da pomogne da prilagodiš plan.”

CHECK 2 — DATA

Question:
“Želiš objašnjenje stručnog pasusa iz ponude za posao. Šta je dovoljno da podeliš?”

A — complete_offer
“Celu ponudu, sa ličnim podacima i potpisom.”

B — identity_only
“Ime i adresu, bez samog pasusa.”

C — relevant_paragraph
“Relevantan pasus, bez nepotrebnih podataka o identitetu.”
[correct]

Feedback:
“Sačuvaj sadržaj potreban za pitanje. Ukloni suvišne identifikacione podatke i proveri pravila servisa pre deljenja osetljivog sadržaja.”

CHECK 3 — VERIFY

Question:
“AI tvrdi da studija dokazuje da jedan kurs pomaže svima. Studija je obuhvatila samo odrasle iz jednog grada. Šta proveravaš?”

A — claim_fit
“Da li metod i rezultati podržavaju tako širok zaključak.”
[correct]

B — layout
“Da li sajt na kome je studija izgleda profesionalno.”

C — repetitions
“Da li AI ponavlja isti zaključak kada ga ponovo pitam.”

Feedback:
“Stvarna studija ne potvrđuje automatski svaki širi zaključak. Proveri ko je učestvovao, šta je ispitivano i kakva su ograničenja.”

CHECK 4 — PERSPECTIVE

Question:
“Veruješ da će tvoja poslovna ideja uspeti. Kojim zahtevom najbolje proveravaš tu pretpostavku?”

A — praise
“Napiši oduševljenu najavu mog novog posla.”

B — disconfirm
“Navedi rizike neuspeha i dokaze koji bi promenili procenu.”
[correct]

C — confidence
“Reci koliko si siguran da će ideja uspeti.”

Feedback:
“Potraži i dokaze protiv početne pretpostavke. AI može da pomogne da postaviš bolja pitanja, a važne činjenice treba proveriti.”

CHECK 5 — AUTONOMY

Question:
“Odlučuješ da li da prihvatiš ponudu za posao. Koju ulogu daješ AI?”

A — obey
“Neka izabere umesto mene da ne moram da vagam.”

B — repeat
“Pitaću ga dok ne potvrdi odgovor koji želim.”

C — support
“Neka pomogne da sagledam prednosti i mane, a ja proveravam činjenice i odlučujem.”
[correct]

Feedback:
“AI može da strukturira razmišljanje. Tvoje okolnosti, prioriteti i konačna procena ostaju tvoji.”

PROGRESS PAGE

Title:
“Tvojih pet navika”

Show each habit’s:
- Question.
- Real status.
- One practical recommendation.
- Optional check access.

For a correct first check:
“Ova navika je primenjena u jednom novom primeru.”

After an unsuccessful first check:
“Vrati se na objašnjenje i isprobaj ovu naviku u svakodnevnoj situaciji.”

For a skipped check:
“Dostupan je dodatni primer.”

Progress count means completed exercises out of five, not ability.

Disclaimer:
“Ovo je pregled vežbanja u ovom pregledaču, a ne pouzdana procena ukupnog znanja ili sposobnosti.”

==================================================
10. TAKEAWAY, ABOUT AND EVIDENCE
==================================================

TAKEAWAY

Title:
“Pet pitanja pre „Enter“”

Content:

1. Da li je AI pravi alat za ovo?
Za podatke koji se menjaju proveri aktuelan, nadležan izvor.

2. Šta zaista treba da podelim?
Sačuvaj koristan kontekst, ukloni suvišne identifikacione podatke i proveri podešavanja privatnosti.

3. Kako da proverim odgovor?
Otvori izvor. Proveri datum, uslove i da li zaista podržava tvrdnju.

4. Koji ugao možda nedostaje?
Traži protivargumente, informacije koje nedostaju i druge mogućnosti.

5. Ko donosi konačnu odluku?
Koristi AI da sagledaš opcije, a zadrži sopstvenu procenu.

Footer:
“AI može da bude koristan. Temeljnost provere prilagodi posledicama odluke.”

Actions:
“Kopiraj podsetnik”
“Preuzmi podsetnik”
“Štampaj / sačuvaj kao PDF”

Provide:
- Copy with selectable-text fallback.
- UTF-8 plain-text download.
- Clean browser print styling.

Do not claim a native PDF download when the action uses the browser’s print dialog.

All exported content must follow the selected script. Test both scripts.

Hide navigation and controls in print output.

The takeaway is available before all lessons are complete and must not fabricate progress.

ABOUT

Explain naturally in Serbian:
- This is a hackathon prototype for practicing five habits of AI judgment.
- Conversations, documents and offers are fictional teaching simulations.
- The app does not accept real document uploads.
- Progress and script preference are stored in this browser when storage is available.
- Completing an exercise is not a validated assessment.

Avoid blanket statements that:
- AI always lies.
- Every input is used for training.
- All providers retain data in the same way.
- Frequent AI use establishes dependency.
- This prototype has proven learning benefits.

EVIDENCE

Provide a quiet “Izvori i dodatno čitanje” area with Serbian descriptions.

NIST Generative AI Profile:
https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf
Describe documented risks including confident falsehoods, bias and overreliance. It is a risk framework, not a claim that every answer has these problems.

OpenAI Data Controls:
https://help.openai.com/en/articles/7730893-data-controls-in-chatgpt
A provider-specific example of data controls. Settings must be checked in current documentation.

Anthropic data use for model training:
https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training
Another provider-specific policy example. Do not generalize it to every service.

Towards Understanding Sycophancy in Language Models:
https://arxiv.org/abs/2310.13548
Research about evaluated systems; requesting counterarguments is not a guaranteed cure.

OpenAI and MIT affective-use research:
https://openai.com/index/affective-use-study/
Explain that findings depend on users and usage patterns and do not establish that frequent use alone causes harm.

Keep these real resources separate from fictional training sources. Lessons must run without querying these websites.

==================================================
11. SEVEN APPROVAL-GATED BUILD CHUNKS
==================================================

Planning target:
About 260 minutes of implementation plus 40 minutes for review and demo rehearsal.

These are timeboxes, not guarantees or permission to skip approval gates.

CHUNK 1 — BRAND, LOCALIZATION AND VISUAL FOUNDATION
Target: 45 minutes.

Build:
- Project specification and progress records.
- Approved Serbian branding.
- Visual design system and Enter-key hero.
- Both script dictionaries for the foundation.
- Script toggle and separate preference persistence.
- Welcome, introduction, dashboard and navigation.

Check:
- Natural Serbian foundation copy.
- Latin and Cyrillic font coverage.
- Script switching on the current screen.
- Mobile header and longer labels.
- Keyboard focus.
- No English fallback or broken placeholder lessons.

STOP FOR REVIEW.

CHUNK 2 — ENGINE AND PRAVI ALAT
Target: 40 minutes.

Build:
- Shared typed scenario engine.
- Conversation, choices, feedback, retry and navigation.
- Progress persistence and first-attempt protection.
- Complete tool lesson in both scripts.
- Its simple branching visual explanation.
- Shared foundations for visual-explainer controls.

Check:
- Every choice and its feedback.
- Refresh and back navigation.
- Double-submit prevention.
- Switching scripts without losing state.
- Storage failure and corrupt-data handling.

STOP FOR REVIEW.

CHUNK 3 — TVOJI PODACI
Target: 35 minutes.

Build:
- Complete privacy lesson in both scripts.
- Fictional document selection.
- Live sharing preview.
- Helpful validation and learning aid.
- Polished field-removal transition.
- Localized visual explanation.

Check:
- Required terms remain required.
- Optional context is genuinely optional.
- Removed fields disappear from the preview.
- Keyboard and touch operation.
- No external submission.
- Script switching preserves the selected fields.

STOP FOR REVIEW.

CHUNK 4 — PROVERI TVRDNJU
Target: 35 minutes.

Build:
- Complete verification lesson in both scripts.
- Accessible source dialog.
- Evidence-selection exercise.
- Matched-offer comparison.
- Polished comparison reveal.

Check:
- Source inspection before and after answering.
- Both relevant evidence reasons.
- €15 difference and approximately 3.2% calculation.
- Serbian formatting.
- Dialog keyboard/focus behavior.
- Script switching preserves selections.

STOP FOR REVIEW.

CHUNK 5 — DRUGI UGAO AND TVOJA ODLUKA
Target: 35 minutes.

Build:
- Both complete lessons in both scripts.
- Prompt transformation and copy fallback.
- Supporting/challenging-evidence visual.
- Human-decision visual.

Check:
- All choices and nuanced feedback.
- Both reasonable approaches remain reasonable.
- No diagnosis or pressure to choose a particular personal outcome.
- All five lessons now work.
- First attempts remain intact.

STOP FOR REVIEW.

CHUNK 6 — CHECKS, PROGRESS AND TAKEAWAY
Target: 30 minutes.

Build:
- All five optional new-situation checks in both scripts.
- Honest five-habit progress.
- Reset confirmation.
- Localized takeaway.
- Copy, UTF-8 download and print output.

Check:
- Correct first check plus practice gives the appropriate status.
- Wrong first check followed by retry does not inflate status.
- Skipping is not failure.
- Reset preserves script preference.
- Both scripts work in downloads and print.
- Unsupported clipboard behavior has a usable fallback.

STOP FOR REVIEW.

CHUNK 7 — FINAL EXPLANATIONS, ACCESSIBILITY AND PUBLIC READINESS
Target: 40 minutes.

Spend at most 15 minutes on optional additional motion and narration integration. Prioritize the existing privacy and verification explanations.

Use the remaining time for:
- Copy and script completeness.
- Responsive polish.
- Accessibility.
- Reliability.
- About and evidence content if not already completed.
- Demo readiness.

Verify:
- 320px, 390px, 768px and 1440px layouts where available.
- 200% zoom.
- Latin and Cyrillic on every screen.
- Keyboard-only operation.
- Clear focus and dialog focus return.
- Reduced-motion presentation.
- Font coverage and text wrapping.
- All 15 lesson choices.
- All five new-situation checks.
- Privacy selection and source-comparison interactions.
- First-attempt preservation.
- Refresh, reset and unavailable storage.
- Copy fallback, downloads and print.
- Optional audio failure, navigation stop and sound-off operation.
- Available build/type checks.

Use browser tests or focused state tests where they resolve a concrete risk. Do not spend the competition building broad test infrastructure.

Report what was actually tested and any remaining limitations.

STOP FOR FINAL REVIEW.

If the deadline is threatened, propose a specific scope reduction at the next review checkpoint. Do not silently remove localization, a lesson, an approval gate or core functionality.

==================================================
12. PUBLIC DEPLOYMENT AND DEMONSTRATION
==================================================

The finished app must support:
- Public access by URL.
- Immediate use on a phone.
- No visitor account or sign-in.
- No personal-data submission.
- No runtime AI or narration service dependency.

Keep website visibility separate from editor/project access. Public visitors need access to the published website, not the development project.

After final approval, use Lovable’s normal publishing workflow. If an action requires my interaction, explain the exact action.

Verify the published URL in a signed-out or fresh session. Test on iPhone Safari and Android Chrome if those environments are actually available. Do not claim device testing that was not performed.

A local preview is not proof that the published app works.

THREE-MINUTE DEMO

1. Open the normal welcome and show the five-habit promise.
2. Demonstrate the script toggle without losing state.
3. Remove unnecessary identity fields from the fictional document.
4. Inspect the travel source, reveal mismatched evidence and show the fair comparison.
5. Try one new-situation check.
6. Show the five-question takeaway.

The dashboard may jump between lessons, but navigation must not fabricate completion or scores.

No hidden prefilled achievements, fake learning-gain statistics or simulated live-model claims.

==================================================
BEGIN NOW
==================================================

Save this complete specification and initialize the progress record.

Implement CHUNK 1 ONLY.

Verify the result, give me specific preview checks, and STOP for my review.

Do not proceed to Chunk 2 until I explicitly authorize continuing.

