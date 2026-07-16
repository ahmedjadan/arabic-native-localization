# arabic-native-localization

A [Claude](https://claude.com/claude-code) skill that generates **natural, native-quality Arabic UI copy** — the kind a native Arabic-speaking product team would actually write — instead of literal, machine-sounding translations from English.

It works across any project type: web, mobile, and landing pages. It knows locale files (`ar.json`, next-intl, i18next, etc.), UI copy patterns (buttons, errors, empty states, confirmations), Arabic grammar (gender, plurals, definite articles, punctuation), RTL layout concerns, and domain vocabulary spanning e-commerce, finance/fintech, healthcare, education, travel, real estate, food delivery, HR, CRM, social apps, government services, construction/field-ops, and AI features.

## Install

Install into your personal skills directory (available in every project):

```bash
npx arabic-native-localization
```

Or scope it to a single project:

```bash
npx arabic-native-localization --project
```

Then restart Claude Code (or open a new session). The skill loads automatically whenever you work on Arabic locale text, and you can invoke it explicitly:

```
/arabic-native-localization translate <strings or path>
/arabic-native-localization review src/locales/ar.json
/arabic-native-localization audit src/locales
```

### Options

| Flag | Effect |
|---|---|
| `-g, --global` | Install into `~/.claude/skills` (default) |
| `-p, --project` | Install into `./.claude/skills` |
| `-d, --dir <path>` | Install into `<path>/arabic-native-localization` |
| `-f, --force` | Overwrite an existing installation |
| `-h, --help` | Show help |

## What it does

- **Translate intent, not sentence structure** — the core rule. Arabic that mirrors English word order is wrong even when every word is correct.
- **Glossary-first** — locks the project's existing Arabic terms before translating.
- **Stable modes** — `translate`, `review`, and `audit` each require a fixed output contract.
- **Consistent terminology** — the same concept reads identically on every screen; ships a canonical glossary and domain vocabularies.
- **Correct grammar** — gender-neutral where the user's gender is unknown, real plural forms (not `${count} مشروع`), proper Arabic punctuation (`،` `؟` `…`).
- **i18n adapters** — i18next suffixes, ICU / next-intl, Expo / React Native patterns without inventing key shapes.
- **Real UI-copy patterns** — buttons name their action, empty states say what to do next, errors never leak internals, placeholders show examples.
- **RTL-aware** — logical CSS properties, icon mirroring rules, bidi isolation for mixed-direction content.
- **Locale-file safe** — preserves keys, placeholders (`{{email}}`), and interpolation byte-for-byte; only the words change.
- **Mechanical validation** — `npm run check:locale -- --source en.json --target ar.json` catches missing keys, placeholder mismatches, incomplete plural families, and suspected untranslated values.

Grounded in real authorities, not just an opinionated glossary: Unicode CLDR's Arabic plural rules, the Unicode Bidirectional Algorithm, W3C Internationalization's Arabic script notes, and major i18n libraries (i18next, FormatJS) — see [`skill/references/resources.md`](skill/references/resources.md) for the full list.

### Locale validator

```bash
npm run check:locale -- --source path/to/en.json --target path/to/ar.json
npm run check:locale -- --source en.json --target ar.json --check-extra --punctuation
npm run test:locale
```

## Uninstall

```bash
rm -rf ~/.claude/skills/arabic-native-localization
```

## License

MIT
