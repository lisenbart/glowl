# GLOWL — повний звіт сайту для аналізу

**Дата:** 2026-07-20  
**Репозиторій:** `/Users/dmytrolisenbart/Desktop/Glowl`  
**Живий сайт (GH Pages):** https://lisenbart.github.io/glowl/  
**Canonical / бренд URL:** https://glowlworks.com  
**Локально (типово):** `http://localhost:5173/` · мережа: `http://192.168.0.43:5173/` (IP може змінюватись)

Цей документ фіксує **поточний стан продукту** після сесії змін (роутинг `/services`, об’єднання AI+process, навігація-капсули, форма, showreel CTA тощо) — для UX/контент/технічного аналізу.

---

## 1. Короткий вердикт

GLOWL — односторінковий маркетинговий SPA продакшн-студії з другою сторінкою **Services**. Стек сучасний (Vite 6 + React 18 + TS + Tailwind 4), без React Router — власний History API роутер. Візуально сильний glass/iOS-кард UI, dark/light theme, акцент на trust (founders + clients) і showreel.

**Головні продуктові поверхні**
1. Home — герой, команда, showreel, процес+AI, форма  
2. Services — capabilities grid + estimate CTA + форма  

**Критичні технічні зауваги для аналізу**
- Форма не шле дані на бекенд (`contactEndpoint: ""`) — лише console у dev  
- `public/videos/` порожня, хоча в data є посилання на mp4  
- Частина компонентів/data у репо не підключена до живих сторінок  

---

## 2. Стек і збірка

| Шар | Технологія |
|-----|------------|
| UI | React 18.3, Framer Motion, Lucide |
| Збірка | Vite 6.3, `@vitejs/plugin-react` |
| Стилі | Tailwind CSS 4 (`@tailwindcss/vite`) + великі custom CSS |
| Мова | TypeScript 5.7 (`strict`) |
| Шрифти | DM Sans (UI), Montserrat (display) |

**Скрипти**
- `npm run dev` → `vite --host`  
- `npm run build` → `vite build` + копія `dist/index.html` → `dist/404.html` (SPA на GH Pages)  
- `npm run preview` → `vite preview`  

**Base path:** `process.env.BASE_PATH || "/"` · у CI для Pages: `/glowl/`  
**Alias:** `@` → `./src`

---

## 3. Архітектура застосунку

```
App
├── cosmic-bg
├── Header
├── HomePage | ServicesPage
├── Footer
└── MobileEstimateCTA
```

### Роутинг (`src/lib/routing.tsx`)

| Шлях | Поведінка |
|------|-----------|
| `/` | HomePage |
| `/services` | ServicesPage |
| `/capabilities` | replace → `/services` |

- `pushState` / `popstate` + кастомна подія `glowl:navigate`  
- `AppLink`, `navigateToSection` (скрол на поточній сторінці або home + `sessionStorage`)  
- Deep links на GH Pages через `404.html` = копія `index.html`

---

## 4. Карта сторінок і секцій

### 4.1 Home (`/`) — порядок зверху вниз

| # | Блок | Компонент | Заголовок / суть |
|---|------|-----------|------------------|
| 1 | Hero | `DirectionCards` | **AI-Native Production Studio** + lead з `site.hero` · зображення `header_01.png` |
| 2 | Founders | `FoundersSection` | **The People Behind It** · 4 профілі · proof strip · Trusted by marquee |
| 3 | Showreel | `DirectionCards` (`#work`) | **Showreel** · YouTube embed · CTA **What we make** → `/services` |
| 4 | Process + AI | `HowWeWorkSection` (`#process`) | **End-to-end production** · 3 кроки · під ними **People still call the shots. 🙂** + AI copy + services marquee |
| 5 | Contact | `ContactForm` (`#contact`) | **Request an estimate** · форма всередині картки |

### 4.2 Services (`/services`)

| # | Блок | Компонент | Заголовок / суть |
|---|------|-----------|------------------|
| 1 | Capabilities | `ProductionCapabilitiesCard` (`#services`) | **Production capabilities** · 4 напрямки з `selectedWork` · CTA «Have a project in mind?» (`#estimate`) |
| 2 | Contact | `ContactForm` | Та сама форма estimate |

### 4.3 Об’єднаний експеримент (поточний)

Раніше окремі блоки:
- Craft / People still call the shots (AI)
- End-to-end production

**Зараз в одному `how-ios-card`:**
1. Заголовок End-to-end production + lead  
2. Картки Brief → Proposal → Production  
3. Роздільник  
4. Підзаголовок People still call the shots. 🙂 (менший кегль) + AI-текст + marquee напрямків  

---

## 5. Навігація і UX chrome

### Header
- Капсули: **Home** | **Services** | **Contact** (Work/Process прибрані з хедера)  
- Home — нейтральна активна капсула  
- Services — активна капсула з cyan «page»-станом (окрема сторінка)  
- Меню завжди видиме на всіх брейкпоінтах; центрується у **вільному місці** між логотипом (+ слоган) і контактами  
- Слоган біля логотипу: зберігається від `sm+`, з ellipsis при нестачі місця  
- Контакти desktop (`lg+`): соцмережі + mailto  
- Контакти mobile: іконка Connect (`HeaderConnectMenu`) коли соцряд ховається  
- Theme toggle dark/light  

### Footer
- Navigate: Home, Work, Services, Process, Contact (Work/Process лишились у футері)  
- Connect: Email, Vimeo, YouTube  
- Estimate CTA, локації, ©, co-founders  

### Mobile
- Sticky **Get an Estimate** після ~65% висоти екрана  

---

## 6. Контент і copy (ключові рядки)

| Ключ | Текст |
|------|--------|
| Brand | GLOWL / GLOWL WORKS |
| Tagline | Creative partner for / brands, games and new worlds |
| Hero H1 | AI-Native Production Studio |
| Hero lead | Films, games and brand worlds — 20+ years of craft, now at the speed of AI. |
| AI H3 | People still call the shots. 🙂 |
| AI body | AI is still a young technology — powerful, but not yet predictable enough to run on its own. That's why this studio is led by people, not prompts: every frame gets a human check before it's called finished. |
| Process H2 | End-to-end production |
| Process lead | A clear, collaborative process from first brief to final delivery. |
| Showreel CTA | What we make · Work by direction — advertising, gaming, film, and social. · Explore by direction → |
| Services H2 | Production capabilities |
| Form H2 | Request an estimate |
| Form lead | No commitment. We respond within 24 hours. |
| Email | hello@glowlworks.com |
| Locations | Canada · Ukraine · Poland |

### Founders (порядок)
1. Adrian Sakhaltuev — Head Director  
2. Dmytro Lisenbart — General Producer  
3. Livia Ital — Line Producer (placeholder)  
4. Emma Wood — Client Manager (placeholder)  

### Capabilities (порядок)
1. Advertising (featured)  
2. Gaming  
3. Film & Entertainment  
4. Performance & Social  

---

## 7. Інтерактив і медіа

| Фіча | Як працює |
|------|-----------|
| Showreel | Poster → play → YouTube embed (`reels.ts` / `mainShowreel`) |
| Founders | Клік → `PersonPopover` біля курсора |
| Clients | Proof strip → `ClientsModal` зі списком брендів |
| Process | Покрокове «запалювання» карток (1.4s), вимикається при reduced-motion |
| Marquee | Services strip + Trusted by (CSS animation, pause on hover) |
| Theme | `localStorage["glowl-theme"]`, `data-theme` на `<html>` |
| Form | Валідація + honeypot; без endpoint — лог у консоль |
| Social inactive | Coming soon modal |

**Favicon:** `public/logos/O.png`

---

## 8. Дані та ассети

### `src/data/`
| Файл | Роль |
|------|------|
| `site.ts` | Бренд, hero, AI, contact, sectionIds |
| `founders.ts` | Команда + proof |
| `clients.ts` | Trusted by / modal |
| `reels.ts` | Showreel + (невикористаний) список reels |
| `selectedWork.ts` | Services cards |
| `services.ts` | Project types форми |
| `stripServices.ts` | Marquee в process/AI |
| `socials.ts` | Канали з `site.social` |
| `directions.ts`, `projects.ts` | Є в репо, майже не в live UI |

### `public/`
- `images/` — hero, showreel poster, founders, capabilities  
- `logos/` — O, white/black/full logos  
- `videos/` — **порожньо** (розрив із `reels.ts`)  

---

## 9. Дизайн-система (стилі)

| Файл | Обсяг / роль |
|------|----------------|
| `styles/index.css` | ~3.4k рядків: токени dark, компоненти, layout |
| `styles/theme-light.css` | ~0.9k рядків: light overrides |
| `styles/fonts.css` | підключення шрифтів |

**Патерни**
- Контентна ширина ~920px  
- `how-ios-card` — уніфіковані скляні/фарфорові картки  
- CSS variables: `--cyan`, `--violet`, `--magenta`, spacing, card radius/shadows  
- Light base ≈ `#f3f2ed`  

**Нещодавні UI-рішення**
- Header capsules + окремий active для Services  
- Форма: title/lead всередині картки + separator  
- Профілі: фото пропорційно до ширини картки (~55%)  
- AI title: always one line + менший кегль у спільному блоці з process  

---

## 10. Інвентар компонентів

### Live (підключені)
`Header`, `Footer`, `MobileEstimateCTA`, `HeaderConnectMenu`, `SocialIconLinks`, `SocialComingSoonModal`, `DirectionCards`, `FoundersSection`, `PersonPopover`, `ClientsModal`, `TrustedBySection`, `HowWeWorkSection`, `ServicesStrip`/`ServicesMarquee`, `TitleEmoji`, `ContactForm`, `ProductionCapabilitiesCard`, `VideoEmbed`

### Present але не в App/pages
`EstimateCTA`, `SelectedWorkSection`, `ShowreelMark`, `VideoModal`, `ProjectGalleryModal`

### Pages
`HomePage.tsx`, `ServicesPage.tsx`

---

## 11. Deploy / CI

- Workflow: push `main` → Node 22 → `npm ci` → build з `BASE_PATH=/glowl/` → `gh-pages`  
- Перевірки: `dist/index.html` існує, містить `/glowl/assets/`, без `/src/main.tsx`  
- Live: https://lisenbart.github.io/glowl/  

---

## 12. Аналітичні лінзи (для наступної роботи)

### UX / IA
- Home vs Services: чи достатньо CTA з showreel?  
- Footer досі має Work/Process — розсинхрон із хедером  
- Contact у хедері без active-стану на `/` коли форма у в’юпорті  
- Об’єднаний process+AI: чи читається ієрархія (H2 vs менший H3)?  

### Контент
- Placeholder founders (Livia, Emma)  
- AI copy + «people not prompts» — перевірити тон для бренду  
- Capabilities descriptions / formats  

### Техборг
- Підключити `contactEndpoint` (Formspree/backend)  
- Відео-файли або прибрати dead paths  
- Прибрати/підключити orphan-компоненти  
- Єдиний source of truth для nav (header = footer)  

### Performance / SEO
- OG image через `%BASE_URL%`  
- Canonical `glowlworks.com` vs GH Pages host  
- Poster/hero preload уже в `index.html`  

### Доступність
- Showreel play button, popovers Escape  
- Form labels + honeypot  
- Reduced motion на process  

---

## 13. Швидкі посилання для рев’ю

| Середовище | URL |
|------------|-----|
| Local | http://127.0.0.1:5173/ або http://localhost:5173/ |
| Mobile LAN | http://192.168.0.43:5173/ |
| Services | …/services |
| GH Pages | https://lisenbart.github.io/glowl/ |
| Services (Pages) | https://lisenbart.github.io/glowl/services |

---

## 14. Історія звітів у `docs/`

| Файл | Примітка |
|------|----------|
| `docs/glowl_full_report_2026-07-18.md` | Раніший повний звіт |
| `docs/glowl_general_audit_2026-07-20.md` | Аудит того ж дня |
| `docs/glowl_final_structure_check_2026-07-20.md` | Structure check |
| **`docs/glowl_site_analysis_report_2026-07-20.md`** | **Цей файл — актуальний зріз після вечірніх змін** |

---

*Згенеровано для аналізу. Джерело істини — код у репозиторії; при розходженні з GH Pages перевірити, чи задеплоєно останній `main`.*
