# Build progress — AI nije autoritet

Status: implementation complete; automated checks passing

## Completed
- Editorial landing page and CSS/SVG Enter-key hero, responsive header, intro, lesson dashboard and about/evidence page.
- Serbian Latin and Cyrillic presentation with an independent, persistent script preference.
- One typed scenario engine for all five lessons, all 15 choices, feedback, retries and manual visual explanations.
- Privacy document exercise with a live, non-persisted sharing preview and learning aid.
- Verification source dialog, evidence-selection exercise and matched 480 € / 465 € comparison (15 €, approximately 3.2%).
- Prompt transformation with clipboard fallback and human-decision explanation.
- Five optional new-situation checks with immutable first attempts and honest three-state progress.
- Progress reset that preserves the script preference.
- Localized takeaway with copy, UTF-8 text download and browser print/PDF styling.
- Versioned progress store `ai-nije-autoritet:progress:v1`, including legacy `before-enter:v1` reading and in-memory fallback.

## Checks performed
- TypeScript type-check passes with `npm run typecheck`.
- All automated tests pass, including regressions for lesson navigation, malformed saved choices, explainer completion and live script switching.
- ESLint passes with no errors.
- Production build passes with `npm run build`.
- The local production preview returned HTTP 200 for all 11 public routes.
- `git diff --check` reports no whitespace errors.

## Known limitations
- A full visual review in desktop and mobile browsers is still recommended.
- Server-rendered HTML starts in Latin; a saved Cyrillic preference applies after hydration.
- The public Lovable URL has not been published or checked in a signed-out session.
