# Arabic Localization Resources

External references for calibrating native register, pluralization, and RTL/bidi handling. Consult these when [terminology.md](terminology.md) doesn't settle a question, when a rule in this skill needs double-checking against the current standard, or when reviewing why a piece of generated Arabic still feels off. None of this overrides the skill's own instincts — an established term already used in the project wins over any external source, and clarity for the actual end user always wins over an academically "correct" but confusing coinage.

## Native register & style

- **Arabic Wikipedia's Manual of Style** (search Wikipedia for `ويكيبيديا:دليل الأسلوب`) — punctuation, numeral, and definite-article conventions enforced by a large community of native editors. A good check for whether phrasing reads as written by a human, not just whether it's grammatically defensible.
- **Academy of the Arabic Language, Cairo** (`مجمع اللغة العربية`) — the body that coins official Arabic terms for new technical/scientific concepts. Worth checking before inventing a translation for a brand-new tech term — but this skill's rule to prefer clarity over an obscure official coinage still governs whether to actually use it in a product UI.
- **Real, well-localized apps in the target market** — banking, delivery, and telecom apps built for Gulf/Egypt/Levant audiences. A dictionary tells you what a word means; a live product tells you how that word is actually phrased in a button today. This beats any static reference when calibrating tone.

## Pluralization

Backs the "don't build Arabic plurals by concatenation" rule in [SKILL.md](../SKILL.md) — Arabic has six grammatical plural categories, not the two most i18n tooling defaults to.

- **Unicode CLDR — Language Plural Rules** — https://cldr.unicode.org/index/cldr-spec/plural-rules — the authoritative source defining Arabic's six categories (zero/one/two/few/many/other) and the exact numeric ranges each one covers.
- **MDN — `Intl.PluralRules`** — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules — resolves the correct plural category for a given count at runtime, no library needed.
- **i18next — Plurals** — https://www.i18next.com/translation-function/plurals — how a common i18n library exposes Arabic-aware plural keys; matches the `_zero/_one/_two/_few/_many/_other` suffix pattern this skill recommends.
- **FormatJS (ICU MessageFormat)** — https://formatjs.io — the `plural` syntax used by `react-intl` and other ICU-based i18n setups.

## RTL & bidirectional text

- **Unicode Bidirectional Algorithm (UAX #9)** — https://unicode.org/reports/tr9/ — the spec behind `unicode-bidi: isolate` and `<bdi>`; useful when a mixed Arabic/Latin string (an ID, email, or phone number) renders in an unexpected order.
- **W3C Internationalization — Arabic script notes** — https://r12a.github.io/scripts/arab/ — practical, example-driven notes on Arabic script behavior, mirroring, and RTL layout.
- **rtlcss** — https://rtlcss.com — the standard tool for converting physical CSS (`margin-left`) into logical, RTL-safe output; useful context for this skill's logical-properties rule.

## Terminology lookups

- **Microsoft Language Portal** — https://www.microsoft.com/en-us/language — searchable EN→AR terminology as used across a large, professionally localized product suite. A reasonable sanity check when [terminology.md](terminology.md) doesn't cover a term.
