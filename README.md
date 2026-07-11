# arabic-native-localization

A [Claude](https://claude.com/claude-code) skill that generates **natural, native-quality Arabic UI copy** — the kind a native Arabic-speaking product team would actually write — instead of literal, machine-sounding translations from English.

It works across any project type: web, mobile, and landing pages. It knows locale files (`ar.json`, next-intl, i18next, etc.), UI copy patterns (buttons, errors, empty states, confirmations), Arabic grammar (gender, plurals, definite articles, punctuation), RTL layout concerns, and domain vocabulary for construction/field-ops, finance, CRM, and AI features.

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
/arabic-native-localization review src/locales/ar.json
/arabic-native-localization translate <strings>
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
- **Consistent terminology** — the same concept reads identically on every screen; ships a canonical glossary and domain vocabularies.
- **Correct grammar** — gender-neutral where the user's gender is unknown, real plural forms (not `${count} مشروع`), proper Arabic punctuation (`،` `؟` `…`).
- **Real UI-copy patterns** — buttons name their action, empty states say what to do next, errors never leak internals, placeholders show examples.
- **RTL-aware** — logical CSS properties, icon mirroring rules, bidi isolation for mixed-direction content.
- **Locale-file safe** — preserves keys, placeholders (`{{email}}`), and interpolation byte-for-byte; only the words change.

## Uninstall

```bash
rm -rf ~/.claude/skills/arabic-native-localization
```

## License

MIT
