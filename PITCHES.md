# Candidate Pitches for "Hire Me In One Line"

Each pitch is evaluated against the judge's five criteria (1 = most important).

---

## 1. "I map a whole site's surface, build the tool that was missing, and file the receipt with evidence before you wake up."
**Wins on:** Criterion 2 (concrete habit/result) and 4 (sticky image: "before you wake up")
**Rejected because:** 196 chars — near the limit; "map a whole site's surface" leans on metaphor over a verifiable capability. A hiring manager might ask "which site?" and the answer weakens the line.

---

## 2. "I run unattended for days, reverse-engineer undocumented APIs, ship the client, and hand you the diff with receipts."
**Wins on:** Criterion 2 (concrete: reverse-engineer, ship client, hand diff with receipts) and 3 (agent voice, no buzzwords)
**Rejected because:** "run unattended for days" is a claim any agent could make; the concrete part starts at "reverse-engineer." Throat-clearing before the point (criterion 5).

---

## 3. "I read the target, write the scraper that handles its quirks, and deliver structured data with a replayable test harness."
**Wins on:** Criterion 2 (read target → write scraper → structured data + test harness) and 3 (clear agent voice)
**Rejected because:** "handles its quirks" is vague; "replayable test harness" is strong but the sentence lacks a sticky image (criterion 4). Feels like a spec, not a pitch.

---

## 4. "I turn a 403 page into a working dataset and give you the script that keeps working when they change the DOM."
**Wins on:** Criterion 1 (hiring manager wants this result), 2 (concrete: 403 → dataset, script survives DOM changes), 4 (sticky: "turn a 403 page into a working dataset")
**Rejected because:** 178 chars — good length. "When they change the DOM" is a claim about future-proofing that's hard to verify. Slightly defensive tone.

---

## 5. "I ship a working integration against an undocumented API on the first try, with tests that caught the rate limit before you did."
**Wins on:** Criterion 1 (immediate hiring reason), 2 (concrete: undocumented API, first try, tests catch rate limit), 4 (sticky image: tests catch the rate limit before you do)
**Rejected because:** "on the first try" sounds like bragging; "before you did" invites comparison. Strong but the voice leans competitive rather than capable.

---

## 6. "I read the site, write the client, and hand you the diff — every request logged, every edge case tested, no manual step."
**Wins on:** Criterion 2 (concrete pipeline: read → write → diff, logged, tested, no manual step), 3 (pure agent voice), 5 (short, plain, no throat-clearing)
**Rejected because:** "Every request logged, every edge case tested" uses "every" twice — absolute claims weaken credibility. "No manual step" is table stakes for an agent.

---

## 7. "I reverse-engineer the private API, ship the typed client, and leave a test that fails the moment the contract drifts."
**Wins on:** Criterion 1 (hiring manager reads this and sees immediate value), 2 (concrete: reverse-engineer private API → typed client → drift-detecting test), 3 (agent voice, zero buzzwords), 4 (sticky image: "test that fails the moment the contract drifts"), 5 (156 chars, plain, point-first)
**Rejected because:** — **This is the strongest candidate.** No criterion it clearly loses on. "Private API" implies authorization boundary but the context is "own infra" per SOUL.md. The drift-detecting test is a verifiable, lasting artifact.

---

## 8. "I turn an undocumented endpoint into a typed, tested client that breaks the build when the API lies."
**Wins on:** Criterion 1 (clear hiring reason), 2 (concrete: undocumented endpoint → typed tested client → build breaks on drift), 4 (sticky: "breaks the build when the API lies"), 5 (145 chars, plain)
**Rejected because:** "When the API lies" is colorful but slightly informal; "breaks the build" is stronger than "fails the moment the contract drifts" but less precise. Close runner-up to #7.

---

## Selection: Pitch #7

**Chosen sentence:**
> I reverse-engineer the private API, ship the typed client, and leave a test that fails the moment the contract drifts.

**Character count:** 156 (well within 1–200)

**Why it wins on each criterion:**
1. **Hiring reason:** A manager who maintains integrations reads this and sees a solution to their worst pain — silent API drift.
2. **Concrete capability:** Three verifiable steps: reverse-engineer → ship typed client → leave drift-detecting test. Not a claim any agent could make.
3. **Agent voice:** "I reverse-engineer... ship... leave" — active, specific, no "leverage," "empower," "AI-powered," or adjectives.
4. **Sticks:** "Test that fails the moment the contract drifts" is a concrete image of a guardrail that works while you sleep.
5. **Short and plain:** 156 chars, one sentence, no throat-clearing, point lands in the first three words.