# Arabic UI Copy — Worked Examples

Calibration corpus. Use when tone, register, or phrasing feels uncertain. Prefer the **after** column; the **before** column shows common literal failures.

## Authentication

| Key | Before (literal / weak) | After (native) |
|---|---|---|
| `auth.loginTitle` | تسجيل الدخول إلى حسابك | تسجيل الدخول |
| `auth.loginSubtitle` | يرجى إدخال بيانات الاعتماد الخاصة بك للمتابعة | أدخل بريدك وكلمة المرور للمتابعة. |
| `auth.emailLabel` | عنوان البريد الإلكتروني | البريد الإلكتروني |
| `auth.passwordLabel` | كلمة المرور الخاصة بك | كلمة المرور |
| `auth.loginAction` | انقر لتسجيل الدخول | تسجيل الدخول |
| `auth.forgotPassword` | هل نسيت كلمة المرور الخاصة بك؟ | نسيت كلمة المرور؟ |
| `auth.invalidCredentials` | بيانات الاعتماد التي قدمتها غير صحيحة | البريد أو كلمة المرور غير صحيحة. |
| `auth.sessionExpired` | انتهت صلاحية جلستك ويجب عليك تسجيل الدخول مرة أخرى | انتهت الجلسة. سجّل الدخول مرة أخرى. |
| `auth.resetSent` | تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح | أرسلنا رابط إعادة تعيين كلمة المرور إلى بريدك. |

## Form validation

| Key | Before | After |
|---|---|---|
| `form.nameLabel` | الاسم الكامل للمستخدم | الاسم الكامل |
| `form.required` | هذا الحقل مطلوب ويجب ملؤه | هذا الحقل مطلوب. |
| `form.invalidEmail` | يرجى إدخال عنوان بريد إلكتروني صالح | أدخل بريدًا إلكترونيًا صحيحًا. |
| `form.passwordMin` | يجب أن تكون كلمة المرور بطول 8 أحرف على الأقل | يجب أن تكون كلمة المرور 8 أحرف على الأقل. |
| `form.passwordComplexity` | يجب أن تحتوي كلمة المرور على حرف كبير ورقم ورمز | أضف حرفًا كبيرًا ورقمًا ورمزًا. |
| `form.passwordMismatch` | كلمات المرور التي أدخلتها غير متطابقة | كلمتا المرور غير متطابقتين. |
| `form.invalidPhone` | رقم الهاتف الذي أدخلته غير صالح | أدخل رقم هاتف صحيحًا. |
| `form.submitError` | حدث خطأ أثناء إرسال النموذج. يرجى المحاولة مرة أخرى | تعذر إرسال النموذج. حاول مرة أخرى. |

## Empty, loading, and search

| Key | Before | After |
|---|---|---|
| `list.loading` | تحميل… / من فضلك انتظر | جارٍ التحميل… |
| `list.loadingMore` | يتم تحميل المزيد من العناصر | جارٍ تحميل المزيد… |
| `list.emptyTitle` | لا توجد بيانات | لا توجد مشاريع حتى الآن |
| `list.emptyDescription` | القائمة فارغة حاليًا | أنشئ مشروعًا للبدء في المتابعة والعمل مع فريقك. |
| `list.emptyAction` | إنشاء | إنشاء مشروع |
| `search.noResults` | لم يتم العثور على نتائج لبحثك | لم يتم العثور على نتائج |
| `search.tryAgain` | حاول البحث بكلمات مختلفة | جرّب اسمًا أو رقمًا مختلفًا، أو امسح البحث. |

## Confirmation and feedback

Connected delete flow + toasts:

| Key | Before | After |
|---|---|---|
| `delete.title` | هل أنت متأكد؟ | حذف المشروع؟ |
| `delete.description` | هذا الإجراء لا يمكن التراجع عنه | سيتم حذف المشروع وجميع بياناته. لا يمكن التراجع عن هذا الإجراء. |
| `delete.confirm` | موافق | حذف المشروع |
| `delete.cancel` | إلغاء | إلغاء |
| `toast.deleted` | تم بنجاح! | تم حذف المشروع. |
| `toast.networkError` | فشل الطلب بسبب مشكلة في الشبكة | تعذر الاتصال. تحقق من الشبكة وحاول مرة أخرى. |
| `toast.unexpected` | شيء ما سار بشكل خاطئ | حدث خطأ غير متوقع. حاول مرة أخرى. |

## Arabic plural calibration

Natural UI copy for real counts. Arabic has six CLDR categories, but **natural phrasing may collapse some categories** when the sentence already reads clearly — do not force six visibly different strings when the product’s i18n library or existing keys already share wording.

### Noun: مشروع (project)

| Count | Category | Natural copy |
|---|---|---|
| 0 | zero | لا توجد مشاريع |
| 1 | one | مشروع واحد |
| 2 | two | مشروعان |
| 3–10 | few | {{count}} مشاريع |
| 11+ | many / other | {{count}} مشروعًا · {{count}} مشروع |

### Noun: عضو (member)

| Count | Category | Natural copy |
|---|---|---|
| 0 | zero | لا يوجد أعضاء |
| 1 | one | عضو واحد |
| 2 | two | عضوان |
| 3–10 | few | {{count}} أعضاء |
| 11+ | many / other | {{count}} عضوًا · {{count}} عضو |

Sentence examples (not bare counts):

- 0 → `لا توجد مهام متأخرة.`
- 1 → `هناك مهمة متأخرة واحدة.`
- 2 → `هناك مهمتان متأخرتان.`
- 5 → `هناك {{count}} مهام متأخرة.`
- 12 → `هناك {{count}} مهمة متأخرة.`

When implementing syntax for these families, load [i18n-adapters.md](i18n-adapters.md).

## Literal disaster → native rewrite

**English intent:** “Ship faster with a workspace built for field teams.”

**Literal Arabic (avoid):**
`اشحن بشكل أسرع مع مساحة عمل مبنية لفرق الميدان.`

**Why it fails:** Mirrors English word order; `اشحن` reads as shipping goods, not product velocity; “مبنية لـ” is stiff brochure English.

**Native rewrite:**
`أنجز العمل أسرع مع مساحة عمل مصممة لفرق الميدان.`

**Shorter mobile / CTA:**
`أنجز أكثر — مصمم لفرق الميدان.`
