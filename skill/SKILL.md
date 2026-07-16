---
name: arabic-native-localization
description: Use whenever generating, reviewing, translating, or refactoring Arabic (ar) interface text in application code — locale JSON/TS files, UI labels, buttons, validation and error messages, empty states, notifications, toasts, dashboards, forms, onboarding, mobile screens, landing pages, and SaaS interfaces. Produces natural Arabic product copy written for native speakers, not literal English translations, and handles RTL layout concerns. Apply this even when the user just says "add Arabic", "translate to Arabic", "the Arabic sounds off/robotic", "fix the ar locale", or adds Arabic strings to any web, mobile, or marketing project. Not for dialect translation of prose documents unrelated to a product UI.
user-invocable: true
argument-hint: "[translate|review|audit <path or strings>]"
---

# Arabic Native Localization

## Purpose

Generate Arabic interface text that sounds as though the product was originally designed in Arabic — not word-for-word translation, but clear, natural, professional Arabic that fits the user's action, role, screen, and product context.

Arabic copy must be understandable on first read, sound natural to native speakers, use consistent product terminology, fit the available UI space, respect Arabic grammar, preserve the intended UX meaning, and work correctly in RTL.

## Default language style

Use Modern Standard Arabic suitable for professional digital products. Tone: clear, human, direct, professional, friendly without being casual — fit for SaaS, business, operations, mobile, and admin apps. Do not use regional dialect unless the project explicitly requests one.

**Regional register** — keep MSA by default. Use Egyptian, Gulf, Levantine, or other regional forms only when the product explicitly asks. Do not mix Eastern Arabic digits (`٠١٢`) and Western digits (`012`) without an explicit product-level rule; preserve the project's current digit convention.

## Modes

When the user selects a mode (or the task clearly matches one), follow that mode's workflow **and** use its output template. Do not return unstructured general commentary.

| Mode | Use when | Required output |
|---|---|---|
| `translate` | Creating new strings or filling missing Arabic values | Diff-style `key → Arabic` (include English when creating both locales), terminology locks, ambiguities, validation status |
| `review` | Reviewing existing Arabic UI copy | Findings in the five review categories below only |
| `audit` | Auditing a full locale or repository | Key counts, missing/extra keys, placeholders, untranslated values, plural families, punctuation, validator exit status |

### Translate output template

```text
## Terminology locks

- English concept → approved Arabic term
- English concept → existing project term retained

## Translations

- `namespace.key`
  - EN: ...
  - AR: ...

## Ambiguities

- `namespace.key`: explain the missing product or UI context.
- None, when no ambiguities remain.

## Validation

- Locale validation: passed / failed / not run
- Remaining issues: ...
```

Omit the EN line when English already exists and is unchanged.

### Review output template

Use these exact top-level categories (no competing classification):

```text
## Literal translations

- `key`: current → proposed
  - Reason: ...

## Inconsistent terminology

- `key`: current → approved project term
  - Conflicts with: ...

## Missing or untranslated strings

- `key`: ...

## RTL and bidi issues

- Surface/file: ...
  - Issue: ...
  - Recommended correction: ...

## Recommended replacements

- `key`
  - Current: ...
  - Replacement: ...

## Validation

- Locale validation: passed / failed / not run
- Remaining issues: ...
```

While reviewing, check native quality, context accuracy, terminology consistency, UI length, grammar, interpolation, RTL, and tone — then **map every finding into the categories above**.

When unsure about tone, register, or UI phrasing, skim [references/examples.md](references/examples.md).

### Audit output template

```text
## Audit summary

- Locale files inspected: ...
- English key count: ...
- Arabic key count: ...
- Missing Arabic keys: ...
- Extra Arabic keys: ... (if checked)
- Placeholder mismatches: ...
- Suspected untranslated values: ...
- Incomplete plural families: ...
- Typography / punctuation warnings: ...
- Validator command: ...
- Validator exit status: ...
- Files changed: ... (if changes were requested)
```

## Core rule

**Translate the user intent, not the English sentence structure.** This is the single idea the whole skill turns on — an Arabic sentence that mirrors English word order is almost always wrong even when every word is technically correct.

Bad:
```json
{ "startShift": "ابدأ ورديتك", "markAttendance": "علم الحضور", "checkIn": "تحقق في", "checkOut": "تحقق من" }
```
Better:
```json
{ "startShift": "ابدأ الدوام", "markAttendance": "تسجيل الحضور", "checkIn": "تسجيل الحضور", "checkOut": "تسجيل الانصراف" }
```

Choose the final wording from the product context — a construction site may say "الوردية" where an office attendance system says "الدوام".

When unsure about tone, register, or UI phrasing, skim [references/examples.md](references/examples.md).

## Glossary-first project workflow

Before translating or rewriting, lock the project's vocabulary:

1. Locate locale setup and files: `ar.json`, `en.json`, `messages/ar`, `locales/ar`, `translations/ar`, i18next resources, next-intl messages, FormatJS messages, Expo / React Native translation modules, or other locale structures in the repo.
2. Determine the i18n library and key organization.
3. Extract existing Arabic for recurring concepts: core nouns, main actions, statuses, navigation labels, domain entities, repeated validation and feedback language.
4. Build a temporary terminology-lock list for this task.
5. Prefer established project terms over defaults in [references/terminology.md](references/terminology.md), unless an existing term is clearly incorrect, misleading, or inconsistent.
6. Call out intentional terminology changes — never silently replace established terms.
7. Only then translate or rewrite new strings.

`references/terminology.md` is a **fallback and calibration** source, not permission to overwrite a product's established vocabulary.

## Context before translating

Never translate isolated strings blind. First determine: What screen is this? What action is the user taking? What role uses this interface? Is the string a title, button, label, message, status, tooltip, or explanation? Is it describing the system or instructing the user? Does the product already have established Arabic terminology to stay consistent with? Is the tone formal, operational, consumer-facing, or administrative?

When any of these are genuinely unknowable from the code and the answer changes the wording, translate with the most likely reading and flag it — don't silently guess.

## UI copy rules

**Page titles** — concise noun phrases: `نظرة عامة`, `الحضور والانصراف`, `إدارة المعدات`, `أعضاء الفريق`, `إعدادات المشروع`. Avoid padded phrases like `الصفحة الخاصة بإدارة المعدات`.

**Buttons** — name the action clearly: `حفظ التغييرات`, `إضافة عضو`, `إنشاء مشروع`, `إرسال الطلب`, `تسجيل الحضور`, `اعتماد الطلب`, `رفض الطلب`, `إعادة المحاولة`. Avoid vague `موافق` / `تنفيذ` / `التالي` unless surrounding context makes the action unmistakable.

**Form labels** — short nouns: `اسم المشروع`, `رقم الهاتف`, `تاريخ البدء`, `نوع المعدة`. Don't turn a label into an instruction (`يرجى إدخال اسم المشروع الخاص بك هنا`) — push explanation into helper text.

**Placeholders** — show an example or clarify the expected value; don't just echo the label.
```json
{ "projectNameLabel": "اسم المشروع", "projectNamePlaceholder": "مثال: مشروع برج النخيل" }
```
Not `"projectNamePlaceholder": "أدخل اسم المشروع"` — that repeats the label without adding value.

**Helper text** — one short sentence: `سيظهر هذا الاسم لأعضاء الفريق.` · `يجب أن يكون الموقع داخل نطاق المشروع.` · `يمكنك تعديل هذه البيانات لاحقًا.`

**Confirmation dialogs** — say what will happen, whether it can be undone, and what the confirm button does. Never let `هل أنت متأكد؟` be the entire message.
```json
{ "deleteTitle": "حذف المعدة؟", "deleteDescription": "سيتم حذف المعدة وسجلها من المشروع. لا يمكن التراجع عن هذا الإجراء.", "cancel": "إلغاء", "confirmDelete": "حذف المعدة" }
```

**Success messages** — state what completed: `تم حفظ التغييرات.` · `تمت إضافة العضو بنجاح.` · `تم تسجيل الحضور.` Avoid celebration in operational apps (`رائع جدًا! لقد نجحت العملية بنجاح!`).

**Error messages** — explain the problem and the next action; never leak internals: `تعذر حفظ التغييرات. حاول مرة أخرى.` · `لم نتمكن من رفع الملف. تأكد من نوع الملف وحجمه.` · `انتهت الجلسة. سجّل الدخول مرة أخرى.` · `لا تملك صلاحية تنفيذ هذا الإجراء.` Never show `حدث خطأ 500 في الـ API` or raw schema/DB errors to users (log those for developers instead).

**Empty states** — say what's missing and what the user can do next:
```json
{ "emptyTitle": "لا توجد معدات حتى الآن", "emptyDescription": "أضف معدات المشروع لمتابعة حالتها واستخدامها وتكاليفها.", "emptyAction": "إضافة معدة" }
```
Avoid bare `لا توجد بيانات` / `فارغ` unless space is extremely tight.

**Loading states** — natural Arabic: `جارٍ التحميل…` · `جارٍ حفظ التغييرات…` · `جارٍ رفع الملف…`. Not `تحميل…` / `يتم التحميل…` / `من فضلك انتظر…`.

**Search / filters** — `بحث`, `ابحث بالاسم أو الرقم`, `لم يتم العثور على نتائج`, `مسح البحث`; `تصفية`, `عوامل التصفية`, `تطبيق التصفية`, `جميع الحالات`. Use `فلترة` only when the project deliberately adopts common technical loanwords.

**Length budgets** — Arabic UI text is often materially longer than English (roughly 20–40% as a design warning, not a law). Prefer shorter verbs and drop filler for buttons, tabs, badges, table headers, mobile nav, and toasts when space is tight.

**Accessibility strings** — for `aria-label` / `accessibilityLabel` on icon-only controls, name the action directly (`حفظ`, `حذف`, `رجوع`). Avoid redundant suffixes like `زر` when the accessibility API already announces the control role.

## Arabic grammar rules

**Definite articles** — use `ال` only where natural: `إعدادات المشروع`, `أعضاء الفريق`, `حالة الطلب`. Avoid `الإعدادات الخاصة بالمشروع`.

**Gender** — the user's gender is usually unknown, so avoid gendered wording: prefer `يمكنك متابعة الطلب.` / `تم إرسال دعوتك.` / `أدخل بيانات الحساب.` Never use slash forms like `مرحبًا بكِ أو بكَ`. When the product genuinely knows the user's gender, handle it through localization logic, not inline slashes.

**Singular / dual / plural** — do NOT build Arabic plurals by copying English `${count} مشروع` for every count. Arabic has zero/one/two/few/many/other forms. Use the i18n library's plural API. Natural phrasing may collapse some categories when context already reads clearly — see [references/examples.md](references/examples.md).

```json
{ "projects_zero": "لا توجد مشاريع", "projects_one": "مشروع واحد", "projects_two": "مشروعان", "projects_few": "{{count}} مشاريع", "projects_many": "{{count}} مشروعًا", "projects_other": "{{count}} مشروع" }
```

When implementing plural or interpolation syntax, load [references/i18n-adapters.md](references/i18n-adapters.md). Never invent plural key shapes — detect the installed library and match existing keys.

**Numbers / dates / currency** — never hand-concatenate. Use locale-aware formatters: `new Intl.NumberFormat(locale).format(value)`, `new Intl.DateTimeFormat(locale, options).format(date)`.

**Punctuation** — use Arabic marks with no space before them: comma `،`, question mark `؟`, ellipsis `…`. Correct: `هل تريد حذف المشروع؟` · `تم حفظ التغييرات، ويمكنك المتابعة الآن.` Wrong: `هل تريد حذف المشروع ?` · `تم حفظ التغييرات , ...`.

## Terminology and avoiding literal translation

Consistency matters as much as correctness — the same concept must read identically on every screen (`مشروع` not sometimes `بروجكت`; `حفظ` and `تحديث` used for their distinct meanings, not interchangeably).

A handful of the most common traps:

| English | Avoid (literal) | Prefer |
|---|---|---|
| Get started | احصل على البدء | ابدأ الآن |
| Try again | حاول ثانية | إعادة المحاولة |
| Something went wrong | شيء ما سار بشكل خاطئ | حدث خطأ |
| Check in / out | تحقق في / تحقق من | تسجيل الحضور / تسجيل الانصراف |
| Needs attention | يحتاج انتباه | بحاجة إلى مراجعة |
| Overview | فوق العرض | نظرة عامة |
| Assignee | المحال إليه | المسؤول |

**Before translating any real batch of strings, read [references/terminology.md](references/terminology.md)** after completing the glossary-first workflow — full literal-translation table, canonical glossary, loanword guidance, and domain vocabularies. Match the project's existing Arabic terminology over these defaults when it already has one.

When a question isn't settled by that glossary — an unfamiliar plural form, a bidi edge case, whether a rule here still matches current practice — see [references/resources.md](references/resources.md) for external authorities.

## RTL requirements

When generating UI code with Arabic support: set app/document direction to `rtl` for Arabic. Prefer logical CSS properties over hardcoded sides — `margin-inline-start/end`, `padding-inline-start/end`, `border-inline-start/end`, `text-align: start` — not `margin-left`/`text-align: left` unless there's a deliberate visual reason.

Mirror directional icons (back/next arrows, breadcrumb separators, steppers, drawer direction, chevrons). Do NOT mirror play icons, universal media controls, brand logos, checkmarks, download icons, or clock icons.

Isolate mixed-direction content (IDs, phone numbers, emails, codes) with `<bdi>{value}</bdi>` or `unicode-bidi: isolate`.

For practical phone/email/ID examples, React Native isolation, and double-mirroring pitfalls, see [references/rtl.md](references/rtl.md).

## Working with locale files

1. Preserve existing key structure and naming convention — don't rename keys just to improve wording.
2. Don't delete English strings; add missing Arabic keys wherever an English key exists.
3. Never hardcode Arabic in components when the app has an i18n system — put it in locale files and use the project's translation hook (`t("...")`).
4. Keep placeholders, HTML tags, markdown tokens, and interpolation syntax **byte-for-byte unchanged** — `{{email}}` stays `{{email}}`. Only the surrounding words are translated.
5. Never translate identifiers, URLs, emails, file extensions, or internal enum values.
6. Report missing or unused keys you notice.

Use semantic keys (`projects.empty.title`), never English-sentence keys (`noProjectsYetCreateYourFirstProject`). Follow the project's convention if it already has one.

## When generating a new UI feature

Move every user-facing string into locale files, generate **both** English and Arabic values when the repo supports both, use the project's existing translation utility, make the component respond to locale direction, use locale-aware number/date/currency formatting, include pluralization wherever counts appear, and keep terminology consistent with sibling screens. Never concatenate Arabic sentence fragments in code.

```tsx
// Bad
<p>تم العثور على {count} من المشاريع</p>
<Button>حفظ</Button>
// Better
<p>{t("projects.resultsCount", { count })}</p>
<Button>{t("common.save")}</Button>
```

## When implementing

1. Identify the source and target locale files.
2. Detect the i18n library.
3. Lock project terminology (glossary-first workflow).
4. Implement translations using the project's existing key and plural conventions ([references/i18n-adapters.md](references/i18n-adapters.md)).
5. When Node.js and compatible JSON locale files are available, run the validator:

```bash
node skill/scripts/check-locale.mjs --source path/to/en.json --target path/to/ar.json
# optional: --check-extra --punctuation --allowlist path.json --format json
```

Or from the package root: `npm run check:locale -- --source ... --target ...`.

6. Fix required validation failures.
7. Report the command, result, warnings, and any checks that could not run.

Never claim validation passed without actually running the script. If the project's locale format is unsupported (non-JSON, arrays-as-values, etc.), say so and manually report the equivalent checks.

Modify only the relevant locale files; touch UI code only where needed for correct localization or RTL. Reuse existing shared keys. Avoid unrelated refactors. In your summary, list major terminology decisions, flag ambiguous strings, and note any missing English source copy that blocked an accurate translation.

## Quality standard

Before finalizing any Arabic copy, ask: **would a native Arabic-speaking product team realistically write this exact text?** If no, rewrite it. The final text must not feel translated — it must feel designed.
