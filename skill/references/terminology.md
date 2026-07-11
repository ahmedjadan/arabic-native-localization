# Arabic Terminology Reference

Load this when translating or reviewing a real batch of strings. Pick terminology by domain, then use it **consistently** across every screen. If the project already has an established Arabic term for a concept, that term wins over the defaults here.

## Table of contents
- [Avoid literal translation (full table)](#avoid-literal-translation-full-table)
- [Accounts and users](#accounts-and-users)
- [Statuses](#statuses)
- [CRUD actions](#crud-actions)
- [Navigation](#navigation)
- [Loanwords and technical terms](#loanwords-and-technical-terms)
- [Domain: construction & field operations](#domain-construction--field-operations)
- [Domain: finance](#domain-finance)
- [Domain: CRM](#domain-crm)
- [Domain: AI features](#domain-ai-features)

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

## Domain: construction & field operations

`موقع العمل`, `المشروع`, `طاقم الموقع`, `المشرف الميداني`, `مدير المشروع`, `الوردية`, `الحضور والانصراف`, `المعدة`, `سجل الصيانة`, `استهلاك الوقود`, `المواد`, `الكميات المنفذة`, `التقرير اليومي`, `نطاق الموقع`, `خارج نطاق الموقع`, `بحاجة إلى مراجعة`.

## Domain: finance

`الميزانية`, `المصروفات`, `الإيرادات`, `الرصيد`, `المبلغ`, `الإجمالي`, `الضريبة`, `الفاتورة`, `الدفعة`, `المعاملة`, `المبلغ المستحق`, `المبلغ المدفوع`, `المتبقي`, `تجاوز الميزانية`, `مركز التكلفة`.

## Domain: CRM

`العملاء`, `جهات الاتصال`, `الفرص`, `سجل التواصل`, `المتابعة`, `مسؤول الحساب`, `مرحلة العميل`, `حالة الطلب`, `الملاحظات`, `آخر تواصل`, `الإجراء التالي`.

## Domain: AI features

Preferred: `ملخص ذكي`, `تحليل المشروع`, `اسأل عن المشروع`, `إنشاء الملخص`, `تحديث التحليل`, `اقتراحات`, `مؤشرات تحتاج إلى مراجعة`.

Avoid hype unless marketing explicitly wants it: `مدعوم بقوة الذكاء الاصطناعي الثوري`, `تجربة سحرية`, `مساعد خارق`.

AI copy should make clear whether content is generated, may need review, or reflects current data: `تم إنشاء هذا الملخص بناءً على آخر بيانات متاحة.` · `راجع النتائج قبل اتخاذ أي إجراء.` · `حدّث التحليل للحصول على أحدث البيانات.`
