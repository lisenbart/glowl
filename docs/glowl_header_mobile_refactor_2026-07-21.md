# GLOWL — Header mobile/tablet refactor (2026-07-21)

Короткий звіт по змінах у Header. Інші секції сайту не змінювались.

## Що змінено

**Нижче 1024px (mobile / tablet)**
- У шапці лишаються лише **логотип** (ліворуч) і кнопка **Menu / X** (праворуч).
- Прибрано з шапки: nav-pills (Home / Services / Contact), theme toggle, окремі social-іконки.
- Відкривається меню з трьома блоками:
  - **Navigate** — Home, Services, Contact
  - **Connect** — Email, LinkedIn, Vimeo, YouTube (без inactive WhatsApp / Facebook / Instagram / TikTok)
  - **Theme** — Light mode / Dark mode

**Від 1024px (desktop)**
- Поточний desktop Header збережено без візуального редизайну.

## Файли

- `src/components/Header.tsx`
- `src/components/HeaderConnectMenu.tsx`
- `src/styles/index.css`

## Поведінка

- Backdrop / Escape закривають меню; після закриття фокус повертається на кнопку.
- Background scroll блокується, поки меню відкрите.
- Contact веде на `#contact` (існуючий routing / scroll).
- External links (LinkedIn, Vimeo, YouTube) — у новій вкладці.
- Aria: «Open menu» / «Close menu»; `role="dialog"`.

## Перевірки

- `npx tsc --noEmit` — pass  
- `npm run build` — pass  

## Скріншоти

- `glowl_audit_screenshots/header-desktop-1440.png`
- `glowl_audit_screenshots/header-tablet-768.png`
- `glowl_audit_screenshots/header-mobile-390.png`
- `glowl_audit_screenshots/header-mobile-320.png`
- `glowl_audit_screenshots/mobile-menu-390.png`
- `glowl_audit_screenshots/mobile-menu-320.png`
