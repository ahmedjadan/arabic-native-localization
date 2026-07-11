---
name: arabic-native-localization
description: Use whenever generating, reviewing, translating, or refactoring Arabic (ar) interface text in application code — locale JSON/TS files, UI labels, buttons, validation and error messages, empty states, notifications, toasts, dashboards, forms, onboarding, mobile screens, landing pages, and SaaS interfaces. Produces natural Arabic product copy written for native speakers, not literal English translations, and handles RTL layout concerns. Apply this even when the user just says "add Arabic", "translate to Arabic", "the Arabic sounds off/robotic", "fix the ar locale", or adds Arabic strings to any web, mobile, or marketing project. Not for dialect translation of prose documents unrelated to a product UI.
user-invocable: true
argument-hint: "[review|translate <path or strings>]"
---

# Arabic Native Localization

## Purpose

Generate Arabic interface text that sounds as though the product was originally designed in Arabic — not word-for-word translation, but clear, natural, professional Arabic that fits the user's action, role, screen, and product context.

Arabic copy must be understandable on first read, sound natural to native speakers, use consistent product terminology, fit the available UI space, respect Arabic grammar, preserve the intended UX meaning, and work correctly in RTL.

## Default language style

Use Modern Standard Arabic suitable for professional digital products. Tone: clear, human, direct, professional, friendly without being casual — fit for SaaS, business, operations, mobile, and admin apps. Do not use regional dialect unless the project explicitly requests one.

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

## Arabic grammar rules

**Definite articles** — use `ال` only where natural: `إعدادات المشروع`, `أعضاء الفريق`, `حالة الطلب`. Avoid `الإعدادات الخاصة بالمشروع`.

**Gender** — the user's gender is usually unknown, so avoid gendered wording: prefer `يمكنك متابعة الطلب.` / `تم إرسال دعوتك.` / `أدخل بيانات الحساب.` Never use slash forms like `مرحبًا بكِ أو بكَ`. When the product genuinely knows the user's gender, handle it through localization logic, not inline slashes.

**Singular / dual / plural** — do NOT build Arabic plurals by copying English `${count} مشروع` for every count. Arabic has zero/one/two/few/many/other forms. Use the i18n library's plural API:
```json
{ "projects_zero": "لا توجد مشاريع", "projects_one": "مشروع واحد", "projects_two": "مشروعان", "projects_few": "{{count}} مشاريع", "projects_many": "{{count}} مشروعًا", "projects_other": "{{count}} مشروع" }
```

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

**Before translating any real batch of strings, read [references/terminology.md](references/terminology.md)** — it has the full literal-translation table, the canonical glossary (accounts/users, statuses, CRUD verbs, navigation), loanword guidance (which terms stay as `API`/`GPS`/`PDF`), and domain vocabularies spanning e-commerce, finance/fintech, healthcare, education, travel, real estate, food delivery, HR, CRM, social, government services, construction/field-ops, and AI features — pick whichever matches the product, and use the same reasoning to extend to any domain not listed. Match the project's existing Arabic terminology over these defaults when it already has one.

When a question isn't settled by that glossary — an unfamiliar plural form, a bidi edge case, whether a rule here still matches current practice — see [references/resources.md](references/resources.md) for the external authorities (Unicode CLDR, W3C i18n, MDN, major i18n libraries) this skill's grammar and RTL rules are grounded in.

## RTL requirements

When generating UI code with Arabic support: set app/document direction to `rtl` for Arabic. Prefer logical CSS properties over hardcoded sides — `margin-inline-start/end`, `padding-inline-start/end`, `border-inline-start/end`, `text-align: start` — not `margin-left`/`text-align: left` unless there's a deliberate visual reason.

Mirror directional icons (back/next arrows, breadcrumb separators, steppers, drawer direction, chevrons). Do NOT mirror play icons, universal media controls, brand logos, checkmarks, download icons, or clock icons.

Isolate mixed-direction content (IDs, phone numbers, emails, codes) with `<bdi>{value}</bdi>` or `unicode-bidi: isolate`.

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

## Reviewing Arabic text

When asked to review (not implement), check each of these and group findings by category:

1. **Native quality** — does it read naturally on its own, independent of the English?
2. **Context accuracy** — does each term match the actual feature and action?
3. **Terminology consistency** — same concept translated the same way everywhere (`مستخدم`/`عضو`/`موظف`, `اعتماد`/`موافقة`, `تسجيل حضور`/`تسجيل دخول`)?
4. **UI length** — anything likely to overflow buttons, tabs, badges, table headers, or mobile cards?
5. **Grammar** — gender agreement, plural forms, definite articles, prepositions, number agreement.
6. **Interpolation** — placeholders intact and naturally placed?
7. **RTL** — layout direction, icon direction, text alignment, mixed-direction content.
8. **Tone** — remove robotic, promotional, or bureaucratic wording unless the domain requires it.

Return review findings grouped as: (1) incorrect/literal translations, (2) inconsistent terminology, (3) missing translations, (4) RTL issues, (5) recommended replacements.

## When implementing

Modify the relevant locale files; touch UI code only where needed for correct localization or RTL. Reuse existing shared keys. Avoid unrelated refactors. In your summary, list major terminology decisions, flag ambiguous strings that need product context, note any missing English source copy that blocked an accurate translation, and run whatever locale validation / typecheck / lint / tests the project has.

## Quality standard

Before finalizing any Arabic copy, ask: **would a native Arabic-speaking product team realistically write this exact text?** If no, rewrite it. The final text must not feel translated — it must feel designed.
