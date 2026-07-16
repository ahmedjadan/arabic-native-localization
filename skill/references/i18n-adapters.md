# i18n Library Adapters

Copy-ready plural and interpolation patterns. **Never invent plural key shapes.** Detect the installed library, inspect existing locale keys, and use the matching adapter below. Project configuration and existing key conventions always win.

## Adapter selection rule

1. Find which i18n package the project uses (`i18next`, `next-intl`, `react-intl` / FormatJS, `i18n-js`, Expo localization helpers, etc.).
2. Open an existing Arabic locale file and match its plural style (suffix keys vs ICU message).
3. Do not mix styles in the same project.

When implementing plural or interpolation syntax from the skill, load this file.

---

## i18next

Modern Arabic plural suffixes:

- `_zero`
- `_one`
- `_two`
- `_few`
- `_many`
- `_other`

```json
{
  "projects_zero": "لا توجد مشاريع",
  "projects_one": "مشروع واحد",
  "projects_two": "مشروعان",
  "projects_few": "{{count}} مشاريع",
  "projects_many": "{{count}} مشروعًا",
  "projects_other": "{{count}} مشروع"
}
```

```ts
t("projects", { count })
```

Do **not** mix legacy suffixes (`_plural`, language-code suffixes) with the modern set above inside the same project. If the installed i18next version or config uses a different convention, follow that convention.

Interpolation: keep `{{name}}` byte-for-word unchanged; only translate surrounding text.

---

## next-intl and FormatJS (ICU)

Prefer a single ICU plural message when the project already uses ICU:

```json
{
  "projectsCount": "{count, plural, zero {لا توجد مشاريع} one {مشروع واحد} two {مشروعان} few {# مشاريع} many {# مشروعًا} other {# مشروع}}"
}
```

With another argument preserved:

```json
{
  "membersInProject": "{count, plural, zero {لا يوجد أعضاء في {project}} one {عضو واحد في {project}} two {عضوان في {project}} few {# أعضاء في {project}} many {# عضوًا في {project}} other {# عضو في {project}}}"
}
```

```ts
t("projectsCount", { count })
t("membersInProject", { count, project: projectName })
```

Arabic ICU categories: `zero`, `one`, `two`, `few`, `many`, `other`.

Keep messages as valid ICU. Do not manually split an ICU string into arbitrary suffix keys unless the project already stores plurals that way.

---

## Expo, React Native, and i18n-js

Preserve the project’s existing translation helper (`t`, `i18n.t`, etc.). Pass counts through that API — do not concatenate Arabic fragments in JSX.

```tsx
t("projects", { count })
```

If the project uses i18n-js-style plural objects, match the shape already in the locale files rather than inventing a new one.

### Direction and layout (one-liners)

```tsx
import { I18nManager, Text } from "react-native";

// Read current RTL state — do not force reload unless the project already does
I18nManager.isRTL

<Text style={{ writingDirection: "rtl", textAlign: "left" /* logical start via I18nManager */ }}>
  {label}
</Text>

// Prefer start/end over left/right when the project uses them
style={{ marginStart: 16, paddingEnd: 8, alignItems: "flex-start" }}
```

Isolate LTR technical values (email, phone, codes, IDs) so digits and `@` do not reorder inside Arabic sentences — e.g. wrap in a nested `Text` with `writingDirection: "ltr"` or use platform bidi isolation the project already uses.

Follow the project’s established language-switching strategy. Do **not** assume `I18nManager.forceRTL` + full app reload is required on every change.
