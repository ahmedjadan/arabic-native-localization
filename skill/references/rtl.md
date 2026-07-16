# RTL and Bidirectional Text Cookbook

Practical patterns that expand the skill’s RTL rules. Prefer logical properties and isolation; do not double-mirror.

## Mixed-direction values

Phone, email, ID, and code values are LTR. Isolate them inside Arabic UI copy.

**Web:**

```tsx
<p>
  رقم الطلب: <bdi>{orderId}</bdi>
</p>
<a href={`mailto:${email}`}>
  <bdi>{email}</bdi>
</a>
<span dir="auto">{phone}</span>
```

CSS alternative: `unicode-bidi: isolate` on the value span.

**React Native:**

```tsx
<Text>
  البريد:{" "}
  <Text style={{ writingDirection: "ltr" }}>{email}</Text>
</Text>
```

## Icons — mirror vs leave

| Mirror in RTL | Do not mirror |
|---|---|
| Back / next chevrons | Play / pause |
| Breadcrumb separators | Brand logos |
| Stepper direction | Checkmarks |
| Drawer open direction | Download / upload |
| Forward navigation arrows | Clock / time icons |

Avoid applying a global scale-X flip on icons that were already direction-aware — that double-mirrors them.

## Logical layout

**CSS:** `margin-inline-start/end`, `padding-inline-start/end`, `border-inline-start/end`, `inset-inline-start`, `text-align: start`.

**React Native:** `marginStart` / `marginEnd`, `paddingStart` / `paddingEnd`, `start` / `end` in positioning when supported; `flex-start` respects direction.

Hardcode `left` / `right` only for deliberate non-mirroring visuals (e.g. a brand watermark anchored to a physical corner).

## Document / app direction

Set `dir="rtl"` (or the framework equivalent) when the active locale is Arabic. Prefer the project’s existing locale → direction bridge over inventing a second one.
