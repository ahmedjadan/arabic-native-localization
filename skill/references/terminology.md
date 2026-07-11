# Arabic Terminology Reference

Load this when translating or reviewing a real batch of strings. Pick terminology by domain, then use it **consistently** across every screen. If the project already has an established Arabic term for a concept, that term wins over the defaults here.

## Table of contents
- [Avoid literal translation (full table)](#avoid-literal-translation-full-table)
- [Accounts and users](#accounts-and-users)
- [Statuses](#statuses)
- [CRUD actions](#crud-actions)
- [Navigation](#navigation)
- [Loanwords and technical terms](#loanwords-and-technical-terms)
- [Domain: e-commerce & retail](#domain-e-commerce--retail)
- [Domain: finance & fintech](#domain-finance--fintech)
- [Domain: healthcare](#domain-healthcare)
- [Domain: education & e-learning](#domain-education--e-learning)
- [Domain: travel & hospitality](#domain-travel--hospitality)
- [Domain: real estate & property](#domain-real-estate--property)
- [Domain: food & delivery](#domain-food--delivery)
- [Domain: HR & recruiting](#domain-hr--recruiting)
- [Domain: CRM & sales](#domain-crm--sales)
- [Domain: social & community](#domain-social--community)
- [Domain: government & public services](#domain-government--public-services)
- [Domain: construction & field operations](#domain-construction--field-operations)
- [Domain: AI features](#domain-ai-features)

This list is a starting point, not a ceiling — if the product's domain isn't here, apply the same instinct: find how established apps in that space already talk to Arabic-speaking users, and then stay consistent with that choice across every screen of the current project.

## Avoid literal translation (full table)

Expressions that mirror English but feel unnatural in Arabic.

| English concept | Avoid | Prefer |
|---|---|---|
| Get started | احصل على البدء | ابدأ الآن |
| Learn more | تعلم المزيد | معرفة المزيد |
| Try again | حاول ثانية | إعادة المحاولة |
| Something went wrong | شيء ما سار بشكل خاطئ | حدث خطأ |
| No data available | لا توجد بيانات متاحة | لا توجد بيانات حاليًا |
| Take action | خذ إجراء | اتخذ إجراءً |
| Mark as complete | ضع علامة كمكتمل | تحديد كمكتمل |
| Check in | تحقق في | تسجيل الحضور |
| Check out | تحقق من | تسجيل الانصراف |
| Overview | فوق العرض | نظرة عامة |
| Insights | رؤى | مؤشرات أو تحليلات |
| Activity | نشاط | النشاط أو سجل النشاط |
| Workspace | مساحة العمل | مساحة العمل أو بيئة العمل |
| Onboarding | على متن الطائرة | التهيئة أو بدء الاستخدام |
| Feed | تغذية | موجز أو آخر التحديثات |
| Submission | تقديم | طلب أو عملية إرسال |
| Assignee | المحال إليه | المسؤول |
| Owner | المالك | المسؤول أو المالك حسب السياق |
| Due date | تاريخ الاستحقاق | تاريخ الاستحقاق |
| Needs attention | يحتاج انتباه | بحاجة إلى مراجعة |
| Resolve issue | حل المشكلة | معالجة المشكلة |
| Live | حي | مباشر |
| Update | تحديث | تحديث أو مستجد حسب السياق |

## Accounts and users

Preferred: `الحساب`, `المستخدم`, `عضو الفريق`, `المسؤول`, `مدير النظام`, `العميل`, `جهة الاتصال`, `الملف الشخصي`, `الصلاحيات`, `الدور الوظيفي`, `الدعوات`.

Ambiguous — resolve by context:
- `role` → `الدور`, `الصلاحية`, or `المسمى الوظيفي` depending on meaning.
- `account` → `الحساب`, `العميل`, or `الجهة` depending on the data model.
- `member` → usually `عضو`, not `مستخدم`, when it refers to an organization/team.

## Statuses

Short, scannable, and translated the **same way on every page**: `مسودة`, `قيد المراجعة`, `بانتظار الموافقة`, `معتمد`, `مرفوض`, `مكتمل`, `ملغى`, `متوقف`, `نشط`, `غير نشط`, `متأخر`, `مستحق`, `منتهي`, `بحاجة إلى مراجعة`.

## CRUD actions

`إضافة`, `إنشاء`, `تعديل`, `تحديث`, `حفظ`, `حذف`, `أرشفة`, `استعادة`, `نسخ`, `تنزيل`, `رفع`, `استيراد`, `تصدير`, `إرسال`, `اعتماد`, `رفض`, `إلغاء`.

Distinguish carefully:
- `إضافة` — attaching an existing item / adding a record to a collection.
- `إنشاء` — creating a brand-new entity or workflow.
- `تعديل` — entering edit mode.
- `تحديث` — refreshing data or submitting revised data.

## Navigation

`الرئيسية`, `نظرة عامة`, `المشاريع`, `الفريق`, `الحضور`, `المهام`, `المعدات`, `المصروفات`, `التقارير`, `الإشعارات`, `صندوق الوارد`, `الإعدادات`, `الدعم`, `تسجيل الخروج`. Use `لوحة التحكم` only when the page is genuinely a dashboard — not as a generic word for every home screen.

## Loanwords and technical terms

Prefer the clear Arabic term: `الإعدادات`, `الصلاحيات`, `الإشعارات`, `المرفقات`, `النسخ الاحتياطي`, `رمز التحقق`, `تسجيل الدخول`, `تسجيل الخروج`, `قاعدة البيانات`, `واجهة برمجة التطبيقات`.

Keep transliterated/Latin when the audience knows them better that way: `API`, `GPS`, `QR`, `PDF`, `Excel`, `WhatsApp`, `SaaS`. Don't force an obscure Arabic coinage that makes the UI harder to read. On first use in explanatory content, pair the abbreviation with its Arabic meaning where useful, e.g. `نظام تحديد المواقع GPS`.

## Domain: e-commerce & retail

`المتجر`, `السلة`, `الطلب`, `تأكيد الطلب`, `طريقة الدفع`, `الدفع عند الاستلام`, `الشحن`, `تتبّع الشحنة`, `التوصيل`, `المرتجعات`, `استرداد المبلغ`, `المخزون`, `نفد من المخزون`, `كود الخصم`, `التقييمات`, `المفضلة`, `متابعة الطلب`.

## Domain: finance & fintech

`الميزانية`, `المصروفات`, `الإيرادات`, `الرصيد`, `المبلغ`, `الإجمالي`, `الضريبة`, `الفاتورة`, `الدفعة`, `المعاملة`, `المبلغ المستحق`, `المبلغ المدفوع`, `المتبقي`, `تجاوز الميزانية`, `مركز التكلفة`, `المحفظة`, `التحويل`, `بطاقة الدفع`.

## Domain: healthcare

`المريض`, `الطبيب`, `الموعد`, `حجز موعد`, `السجل الطبي`, `الوصفة الطبية`, `الأعراض`, `التشخيص`, `نتائج التحاليل`, `العيادة`, `التأمين الطبي`, `الاستشارة`, `متابعة الحالة`, `تذكير بالدواء`. Be especially careful with tone here — see the Error messages and Confirmation dialogs guidance in [SKILL.md](../SKILL.md): medical contexts amplify the cost of a robotic or alarming phrasing.

## Domain: education & e-learning

`الطالب`, `المعلم`, `الدورة التدريبية`, `المقرر`, `الدرس`, `الواجب`, `الاختبار`, `الدرجة`, `الشهادة`, `التسجيل في الدورة`, `التقدّم الدراسي`, `المحاضرة`, `لوحة الطالب`, `المسار التعليمي`.

## Domain: travel & hospitality

`الحجز`, `الرحلة`, `الفندق`, `تسجيل الوصول`, `تسجيل المغادرة`, `تأكيد الحجز`, `إلغاء الحجز`, `الوجهة`, `تاريخ السفر`, `عدد الضيوف`, `الغرفة`, `وسائل الراحة`. Note `تسجيل الوصول`/`تسجيل المغادرة` (hotel check-in/out) is a different concept from attendance check-in/out (`تسجيل الحضور`/`تسجيل الانصراف`) — don't reuse one for the other even though the English word is the same.

## Domain: real estate & property

`العقار`, `الوحدة السكنية`, `الإيجار`, `عقد الإيجار`, `المالك`, `المستأجر`, `معاينة العقار`, `السعر`, `المساحة`, `الموقع`, `طلب صيانة`.

## Domain: food & delivery

`الطلب`, `المطعم`, `قائمة الطعام`, `السلة`, `التوصيل`, `الوقت المتوقع للتوصيل`, `حالة الطلب`, `تتبّع الطلب`, `مندوب التوصيل`, `التقييم`.

## Domain: HR & recruiting

`المرشّح`, `الوظيفة الشاغرة`, `طلب التوظيف`, `السيرة الذاتية`, `المقابلة`, `العرض الوظيفي`, `الموظف`, `الإجازة`, `الراتب`, `الأداء الوظيفي`, `التقييم السنوي`.

## Domain: CRM & sales

`العملاء`, `جهات الاتصال`, `الفرص`, `سجل التواصل`, `المتابعة`, `مسؤول الحساب`, `مرحلة العميل`, `حالة الطلب`, `الملاحظات`, `آخر تواصل`, `الإجراء التالي`.

## Domain: social & community

`المنشور`, `التعليق`, `الإعجاب`, `المتابِعون`, `تتابعهم`, `المجموعة`, `الدعوة`, `الإشعارات`, `الرسائل`, `الملف الشخصي`, `مشاركة`, `حظر`, `الإبلاغ عن مشكلة`.

## Domain: government & public services

`الخدمة`, `الطلب`, `المعاملة`, `رقم المعاملة`, `الجهة المختصة`, `الموافقة`, `الرفض`, `المستندات المطلوبة`, `حالة الطلب`, `رسوم الخدمة`, `تذكير بالموعد`. Tone here should lean more formal/administrative than a consumer app — see the "formal, operational, consumer-facing, or administrative" question in [SKILL.md](../SKILL.md).

## Domain: construction & field operations

`موقع العمل`, `المشروع`, `طاقم الموقع`, `المشرف الميداني`, `مدير المشروع`, `الوردية`, `الحضور والانصراف`, `المعدة`, `سجل الصيانة`, `استهلاك الوقود`, `المواد`, `الكميات المنفذة`, `التقرير اليومي`, `نطاق الموقع`, `خارج نطاق الموقع`, `بحاجة إلى مراجعة`.

## Domain: AI features

Preferred: `ملخص ذكي`, `تحليل المشروع`, `اسأل عن المشروع`, `إنشاء الملخص`, `تحديث التحليل`, `اقتراحات`, `مؤشرات تحتاج إلى مراجعة`.

Avoid hype unless marketing explicitly wants it: `مدعوم بقوة الذكاء الاصطناعي الثوري`, `تجربة سحرية`, `مساعد خارق`.

AI copy should make clear whether content is generated, may need review, or reflects current data: `تم إنشاء هذا الملخص بناءً على آخر بيانات متاحة.` · `راجع النتائج قبل اتخاذ أي إجراء.` · `حدّث التحليل للحصول على أحدث البيانات.`
