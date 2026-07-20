# GLOWL — повний звіт стану (факти)

Дата звіту: **2026-07-18** (оновлено після реструктуризації головної)  
Джерело: локальний репозиторій `/Users/dmytrolisenbart/Desktop/Glowl`  
Без оцінки якості та без рекомендацій — лише фіксація поточного стану.

---

## 1. Загальний контекст

### Хостинг і URL
- Хостинг: **GitHub Pages** (гілка `gh-pages`, публікація через GitHub Actions).
- Workflow: `.github/workflows/deploy.yml` — `push` на `main` або `workflow_dispatch`.
- Build env: `BASE_PATH=/glowl/`.
- Live URL (за `README.md` і деплой-конфігом): **https://lisenbart.github.io/glowl/**
- Git remote: `git@github.com:lisenbart/glowl.git`
- Локальний стан сторінки (нова структура) на момент звіту **ще не задеплоєний**: зміни незакомічені; live Pages відповідає останньому push (`d9db8cf`).

### Стек
- React **18.3** + TypeScript
- Vite **6.3** (`package.json`: `^6.3.5`)
- Tailwind CSS **4.1** (`@tailwindcss/vite`)
- Framer Motion **12**
- Lucide React
- Односторінковий SPA (без React Router)
- Немає Next.js у рантаймі (є залишковий `next-env.d.ts` у корені)

### Домен
- У коді / HTML canonical і Organization JSON-LD вказують: **https://glowlworks.com**
- Email у коді: `hello@glowlworks.com`
- У репозиторії немає DNS / Netlify / CNAME-файлів для apex-домену.
- Фактичний публічний перегляд зараз через GitHub Pages subdirectory `/glowl/`.
- Підключення кастомного домену до Pages у репо не задокументоване.

### Git-стан (на момент звіту)
- Гілка: **main**
- Tracking: `origin/main` (локально ahead немає; remote ще на старому коміті)
- Останній коміт на remote/HEAD: `d9db8cf` — *Frame showreel in a rounded card and remove bottom fade overlay.*
- Uncommitted / untracked (нова структура ще лише локально):

  **Modified**
  - `LOGO/glowl.ai`
  - `src/App.tsx`
  - `src/components/DirectionCards.tsx`
  - `src/components/HowWeWorkSection.tsx`
  - `src/components/SelectedWorkSection.tsx`
  - `src/data/selectedWork.ts`
  - `src/data/site.ts`
  - `src/styles/index.css`
  - `src/styles/theme-light.css`

  **Untracked**
  - `docs/` (цей звіт і попередній знімок того ж дня)
  - `src/PC/` (вихідні PNG для capabilities)
  - `src/components/AiPositioningSection.tsx`
  - `src/components/ClientsModal.tsx`
  - `src/components/ExperienceSection.tsx`
  - `src/components/TrustedBySection.tsx`

---

## 2. Структура сайту — новий порядок

### Маршрути / сторінки
- Один маршрут: **`/`** (SPA).
- Навігація секцій через hash/anchors (`#work`, `#services`, `#process`, `#contact`, `#estimate`, `#trusted`, `#experience`).
- Окремих сторінок `/film`, `/commercial` тощо немає.

### Порядок рендеру в `App.tsx` (зверху вниз)

| # | Шар | Компонент | Примітка |
|---|-----|-----------|----------|
| 1 | фон | `.cosmic-bg` (div) | декоративний |
| 2 | header | `Header` | fixed |
| 3 | main | `DirectionCards` | Hero → Trusted by → Experience → Showreel → Services strip |
| 4 | main | `AiPositioningSection` | окрема AI / craft секція |
| 5 | main | `HowWeWorkSection` | Capabilities + Process only |
| 6 | main | `ContactForm` | форма estimate |
| 7 | footer | `Footer` | |
| 8 | sticky mobile | `MobileEstimateCTA` | тільки `md:hidden`, після скролу |

### Секції всередині компонентів (фактичний порядок зверху вниз)

**`DirectionCards`**
1. `<section aria-label="Introduction" class="hero-intro">` — H1 + 2 paragraphs (**Hero перший**)
2. `TrustedBySection` — `<section id="trusted" aria-label="Trusted by">`
3. `ExperienceSection` — `<section id="experience" aria-label="Experience">` — компактна 2×2 proof-grid (без окремого H2-блоку)
4. `<section aria-label="Showreel" id="work">` — showreel card + poster / YouTube embed
5. `ServicesStrip` — `<section aria-label="Production types">` — marquee labels

**`AiPositioningSection`**
1. `<section aria-label="How we work with AI">` — картка `how-ios-card-cyan`, H2 + placeholder lead

**`HowWeWorkSection`** (`id="services"`, `aria-label="How we work"`)
1. `ProductionCapabilitiesCard` — H2 + 4 image cards (новий пріоритет) + inline CTA (`id="estimate"`)
2. End-to-end production card — H2 + `ProductionProcessFlow` (`id="process"`)
3. **Experience у цьому компоненті відсутній** (перенесено вище)

**`ContactForm`** (`id="contact"`)
1. Section heading + lead + social icons
2. Inquiry form card

### Підтвердження вимог реструктуризації

| Вимога | Статус у коді |
|--------|----------------|
| Hero перед Showreel | Так — Introduction перший у `DirectionCards` |
| Trusted by підключено | Так — `TrustedBySection` одразу після Hero; дані з `clients` через `site.trustedBy.brands` |
| AI / майстерність окремою секцією | Так — `AiPositioningSection` між Services strip і Capabilities |
| Capabilities: Commercial перший, Gaming останній | Так — порядок у `selectedWork.ts`; Commercial `featured`, Gaming `secondary` |
| Process + Experience «об’єднання» | Experience винесено в зону Hero/Trusted by як compact proof; перед Contact лишився лише Process |

### Навігація

**Header (`Header.tsx`)**
- Theme toggle (dark/light)
- Logo (light/dark варіанти) + tagline (від `sm`)
- Desktop nav (`lg+`): Work, Services, Process, Contact
- Desktop social (`lg+`): LinkedIn / WhatsApp / Facebook / Instagram / TikTok + email icon
- Mobile (`<lg`): `HeaderConnectMenu` (Connect panel) + burger menu з тими ж 4 пунктами
- Пунктів Trusted / Experience / AI у header nav немає

**Footer (`Footer.tsx`)**
- Brand wordmark `GLOWL` + tagline
- Social icons
- Desktop-only short description + CTA button
- Navigate: Work / Services / Process / Contact
- Connect: Email / Vimeo / YouTube
- Locations + copyright year + `GLOWL WORKS`

**Mobile sticky bar (`MobileEstimateCTA.tsx`)**
- Кнопка `Get an Estimate` → скрол до `#contact`

### Компоненти у файлах: підключені vs не підключені до `App.tsx`

**Підключені (нові / змінені в структурі)**
- `TrustedBySection.tsx`
- `ExperienceSection.tsx` (+ `ClientsModal.tsx` з Experience)
- `AiPositioningSection.tsx`

**Є у файлах, але не змонтовані в `App.tsx`**
- `SelectedWorkSection.tsx` (контракт даних оновлено під `description`; секція все одно не в App)
- `EstimateCTA.tsx` (окрема секція; CTA зараз inline у capabilities)
- `ProjectGalleryModal.tsx`
- `VideoModal.tsx`

---

## 3. Повний копірайт (дослівно)

### Meta / SEO (`index.html` + `src/data/site.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| `<title>` | GLOWL — Cinematic Production for Brands, Games and New Worlds | `index.html`; також `site.meta.title` |
| meta description | GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers. | `index.html`; `site.meta.description` |
| canonical | https://glowlworks.com | `index.html`; `site.canonical` |
| og:type | website | `index.html` |
| og:title | GLOWL — Cinematic Production for Brands, Games and New Worlds | `index.html` |
| og:description | (як description) | `index.html` |
| og:image | `%BASE_URL%images/header_02.png` | `index.html` |
| preload image | `%BASE_URL%images/header_02.png` | `index.html` |
| site.meta.ogImage | `/images/header_01.png` (через `publicAsset`) | `src/data/site.ts` — у `index.html` не використовується напряму |

### JSON-LD Organization (`index.html`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "GLOWL WORKS",
  "url": "https://glowlworks.com",
  "email": "hello@glowlworks.com",
  "description": "Cinematic production studio for commercials, games and new worlds.",
  "areaServed": ["Canada", "Ukraine", "Poland"],
  "knowsAbout": ["Commercials", "Brand Films", "Game Trailers", "Cinematics", "AI-assisted Production"]
}
```
Дубль description: `site.organizationDescription`.

Інших JSON-LD на сайті немає.

---

### Header

| Тип | Текст | Джерело |
|-----|-------|---------|
| aria-label logo | GLOWL home | `Header.tsx` |
| img alt | GLOWL | `Header.tsx` |
| tagline line 1 | Creative partner for | `site.tagline.line1` |
| tagline line 2 | brands, games and new worlds | `site.tagline.line2` |
| nav | Work | `Header.tsx` → `#work` |
| nav | Services | → `#services` |
| nav | Process | → `#process` |
| nav | Contact | → `#contact` |
| aria theme dark | Switch to light mode | `Header.tsx` |
| aria theme light | Switch to dark mode | `Header.tsx` |
| aria email | Email us at hello@glowlworks.com | `Header.tsx` + `site.email` |
| aria burger | Open menu / Close menu | `Header.tsx` |
| Connect trigger | Open connect menu / Close connect menu | `HeaderConnectMenu.tsx` |
| Connect panel label | Connect | `HeaderConnectMenu.tsx` |
| Connect email title | Email | `HeaderConnectMenu.tsx` |
| Connect email sub | hello@glowlworks.com | `site.email` |
| Connect social sub (active) | Open channel | `SocialIconLinks.tsx` |
| Connect social sub (inactive) | Coming soon | `SocialIconLinks.tsx` |
| Social aria active | LinkedIn / WhatsApp / Facebook / Instagram / TikTok | `socials.ts` labels |
| Social aria inactive | `{Label} — coming soon` | `SocialIconLinks.tsx` |

### Social coming-soon modal

| Тип | Текст | Джерело |
|-----|-------|---------|
| eyebrow | {channelLabel} | динамічно |
| H2 | Almost there | `site.socialComingSoon.title` |
| body | Sorry — this channel is still in the works. For now, drop us a line and we'll get back to you. | `site.socialComingSoon.body` |
| CTA button | Email Us | `site.socialComingSoon.cta` |
| secondary | Close | `site.socialComingSoon.closeLabel` |

Соцмережі (`site.social` / `socials.ts`):
- LinkedIn: active, `https://linkedin.com/company/glowlworks`
- WhatsApp / Facebook / Instagram / TikTok: `active: false`, `href: ""`

Додаткові посилання в `site.ts`: Vimeo `https://vimeo.com/glowlworks`, YouTube `https://youtube.com/@glowlworks`.

---

### Introduction / Hero (`DirectionCards` + `site.hero`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Introduction | `DirectionCards.tsx` |
| H1 part 1 | Films, games and brand worlds | `site.hero.headlineLine1` |
| H1 part 2 | brought to | `site.hero.headlineLine2BeforeAccent` |
| H1 accent | light | `site.hero.headlineAccent` |
| H1 повний рендер | Films, games and brand worlds brought to light. | збірка рядків + крапка в JSX |
| body | Commercials, game trailers and cinematic content shaped by experienced artists, directors and producers — with AI used where it helps the work move faster without losing the eye. | `site.hero.paragraph` |
| caption/audience | For brands, agencies, game teams, producers and entertainment projects. | `site.hero.audienceLine` |

---

### Trusted by (`TrustedBySection` + `site.trustedBy` + `clients.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Trusted by | `TrustedBySection.tsx` |
| section id | trusted | `sectionIds.trusted` |
| eyebrow / label | Trusted by | `site.trustedBy.label` |
| brand | Playtika | `clients` → `site.trustedBy.brands` |
| brand | Moon Active | |
| brand | Plarium | |
| brand | Voodoo | |

Формат: **текстові назви** (не image-логотипи).

---

### Experience proof (`ExperienceSection.tsx`)

Окремого H2 / lead більше немає (було в старому Experience-блоці всередині `HowWeWorkSection`).

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Experience | `ExperienceSection.tsx` |
| section id | experience | `sectionIds.experience` |
| stat | 1000+ | `experienceStats` |
| sub | projects delivered | |
| hint | View clients | |
| aria | 1000 plus projects delivered. View clients. | |
| action | opens `ClientsModal` | |
| stat lines | 15 awards / 45 selections | |
| sub | international festival recognition | |
| hint | Festival recognition | |
| aria | 15 awards and 45 selections. Request an estimate. | |
| action | scroll to `#contact` | |
| stat | Since 2006 | |
| sub | production experience | |
| hint | About the studio | |
| aria | Production experience since 2006. Request an estimate. | |
| action | scroll to `#contact` | |
| stat | Canada • Ukraine • Poland | (bullet `•`, не middle-dot `·`) |
| sub | creative & production teams | |
| hint | Global team | |
| aria | Canada, Ukraine, Poland creative and production teams. Request an estimate. | |
| action | scroll to `#contact` | |

### Clients modal (`ClientsModal` + `site.clientsModal` + `clients.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| H2 | Selected clients | `site.clientsModal.title` |
| body | A sample of brands and studios we've produced for across commercial and gaming work. | `site.clientsModal.body` |
| list | Playtika / Moon Active / Plarium / Voodoo | `clients` |
| CTA | Get an Estimate | `site.clientsModal.cta` → `#contact` |
| secondary / aria close | Close | `site.clientsModal.closeLabel` |

---

### Showreel (`DirectionCards` + `reels.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Showreel | `DirectionCards.tsx` |
| button aria | Watch reel | `DirectionCards.tsx` |
| video title (embed) | GLOWL Showreel | `mainShowreel.title` |
| poster | `/images/showreel-poster.png` | `mainShowreel.poster` |
| provider / id | youtube / `-cdiXSJczdU` | `mainShowreel` |

---

### Services strip (`ServicesStrip` + `stripServices.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Production types | `ServicesStrip.tsx` |
| label | Commercials | `stripServices` |
| label | Brand Films | |
| label | Game Trailers | |
| label | Cinematics | |
| label | Product Animation | |
| label | Title Sequences | |
| label | Music Videos | |
| label | AI-assisted Production | |

---

### AI / майстерність секція (`AiPositioningSection` + `site.ts`) — placeholder

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | How we work with AI | `AiPositioningSection.tsx` |
| H2 | Craft over automation | inline у `AiPositioningSection.tsx` |
| lead (placeholder) | AI helps us move faster. Directors, artists and producers keep the work sharp. | `site.aiPositioningLine` |

Примітка: цей рядок раніше був support-line під Capabilities; зараз винесений у власну секцію як тимчасовий placeholder. Під Capabilities замість нього — новий support-line (див. нижче).

---

### Production capabilities (`HowWeWorkSection` + `selectedWork.ts`)

Порядок карток у даних і UI:

1. **Commercial / Advertising** (`featured: true`)
2. **Film & Entertainment**
3. **Performance & Social**
4. **Gaming** (`secondary: true`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| article aria | Production capabilities | `HowWeWorkSection.tsx` |
| H2 | Production capabilities | inline |
| support / lead | Commercial and advertising production first — with film, social and gaming where the brief calls for it. | inline (новий; замість `aiPositioningLine`) |
| H3 | Commercial / Advertising | `selectedWork` |
| description | Brand films, commercials and product visuals — from concept through final delivery. | |
| formats | TV & digital ads; brand films; product animation; explainer videos | |
| H3 | Film & Entertainment | |
| description | Short films, music videos and cinematic storytelling across 2D, 3D and mixed media. | |
| formats | short films; music videos; title sequences; motion & VFX | |
| H3 | Performance & Social | |
| description | Social campaign assets and performance creatives shaped for platforms and paid media. | |
| formats | social content; reels & shorts; performance creatives; campaign cutdowns | |
| H3 | Gaming | |
| description | Trailers, cinematics and performance creatives — built for the pace and scale of game production. | |
| formats | game trailers; cinematics; gameplay ads; playable ads | |
| card images | `/images/capabilities/{commercial,film-entertainment,performance-social,gaming}.png` | `selectedWork.image` |
| H3 CTA | Have a project in mind? | inline |
| body CTA | Send us your brief, references or even an early idea. We'll review it and propose the most effective production approach. | inline |
| button | Get a Project Estimate | inline |
| link | Email Us Directly | inline → `mailto:hello@glowlworks.com` |

---

### End-to-end production (Process)

| Тип | Текст | Джерело |
|-----|-------|---------|
| H2 | End-to-end production | inline |
| lead | A clear, collaborative process from first brief to final delivery. | inline |
| process aria | From brief to final delivery | `ProductionProcessFlow` |
| 01 H3 | Brief | `steps` |
| 01 body | We align on goals, references and deliverables. | |
| 02 H3 | Proposal | |
| 02 body | We shape the approach, timeline and production estimate. | |
| 03 H3 | Production | |
| 03 body | We manage the full process and deliver final assets ready to launch. | |

---

### Contact form

| Тип | Текст | Джерело |
|-----|-------|---------|
| section aria | Contact form | `ContactForm.tsx` |
| H2 | Request an estimate | inline |
| lead | No commitment. We respond within 24 hours. | inline |
| label | Name * | |
| label | Work email * | |
| label | Company optional | hint `optional` |
| label | Project type * | |
| select empty | Select type | |
| options | Commercial Animation; Gaming & Interactive; Game Trailers & Playable Ads; Gameplay Creatives; Performance Creatives; Film & Entertainment; Music Video; Motion Design; Other | `projectTypes` у `services.ts` |
| label | Deadline optional | |
| placeholder | e.g. March 2026 | |
| label | Brief * | |
| placeholder | Deliverables, references, timeline... | |
| label | Attach file optional | |
| submit | Request an Estimate | |
| loading | Sending... | |
| success | Thank you. We've received your request and will review it shortly. | |
| success secondary | Send another request | |
| validation | Name is required | `contactSubmit.ts` |
| validation | Work email is required | |
| validation | Enter a valid email | |
| validation | Select a project type | |
| validation | Project description is required | |
| validation | File must be under 10MB | |
| validation | Unsupported file type | |
| error fetch | Could not send your request. Please try again. | |
| honeypot block | Submission blocked. | |

---

### Footer

| Тип | Текст | Джерело |
|-----|-------|---------|
| brand | GLOWL | inline |
| tagline | Creative partner for / brands, games and new worlds | `site.tagline` |
| body (md+) | Commercials, gaming creatives and cinematic content — produced through an expert-led process supported by AI. | inline |
| button (sm+) | Get a Project Estimate | |
| nav label | Navigate | |
| nav items | Work / Services / Process / Contact | |
| connect label | Connect | |
| connect items | Email / Vimeo / YouTube | |
| locations | Canada · Ukraine · Poland | `site.locations` |
| copyright | © {currentYear} GLOWL WORKS | `site.name` |

---

### Mobile sticky CTA

| Тип | Текст | Джерело |
|-----|-------|---------|
| button | Get an Estimate | `MobileEstimateCTA.tsx` |

---

### Дані в репо, які **не рендеряться** на головній (але існують у коді)

**`src/data/reels.ts` → `reels[]`**
- Commercial Animation — Brand films, product campaigns and social content.
- Gaming & Interactive — Trailers, gameplay creatives, cinematics and performance ads.
- Film & Entertainment — Short films, music videos and cinematic storytelling.

**`src/data/directions.ts`**
- Commercials / Gaming / Film & Entertainment + CTA: View Commercial Work / View Gaming Work / View Film Work

**`src/data/projects.ts`**
- Luxury Product Launch Film (Brand Film, 2025)
- Global Campaign Series (Commercial, 2024)
- Social Content System (Campaign Assets, 2024)
- Game Launch Trailer (Cinematic Trailer, 2025)
- UA Performance Creatives (Gameplay Ads, 2024)
- Mobile Performance Pack (Performance Creatives, 2024)
- Short Film — Neon District (Concept Film, 2025)
- Artist Music Video (Music Video, 2024)
- Series Title Sequence (Title Design, 2023)

**`src/data/clients.ts` — додаткові поля (крім масиву `clients`, який уже рендериться)**
- credentials: 1000+ commercial projects; Production experience since 2006; Creative and production teams across Canada, Ukraine and Poland; Full-cycle concept, design, animation and post-production
- trustTagline: Built for agencies, game teams, producers and brands.

**`src/data/services.ts` → `deliverables`**
- Commercials and brand films; Product animation; Game trailers and cinematics; Gameplay and performance creatives; Game trailers and playable ads; Social campaign assets; Music videos; Title sequences; Motion design and VFX; AI-assisted visual production

**`SelectedWorkSection.tsx` (не в App)**
- H2: Selected work
- Рендерить `item.title` + `item.description` з поточного `selectedWork.ts`

**`EstimateCTA.tsx` (не в App)**
- H2: Have a project in mind?
- body + buttons як у inline CTA capabilities

---

## 4. Trusted by — перевірка підключення

| Перевірка | Факт |
|-----------|------|
| Джерело даних | `src/data/clients.ts` → `export const clients = ["Playtika", "Moon Active", "Plarium", "Voodoo"]` |
| Підключення до UI | `site.trustedBy.brands = clients` у `site.ts`; `TrustedBySection` мапить `trustedBy.brands` |
| Рендер на сторінці | Так — одразу після Hero, перед Experience proof і Showreel |
| Формат | Тихий trust-strip: uppercase eyebrow **Trusted by** + горизонтальний ряд **текстових назв** (не SVG/PNG лого) |
| Повторне використання | Ті самі 4 назви також у `ClientsModal` (відкривається з картки «1000+») |
| CSS | `.trusted-by`, `.trusted-by__label`, `.trusted-by__list`, `.trusted-by__item` у `index.css` (+ light overrides) |

---

## 5. Заглушки й плейсхолдери — оновлений стан

### Що змінилось відносно попереднього звіту

| Що | Було | Стало |
|----|------|-------|
| `clients` у UI | дані є, UI не показує | рендеряться в Trusted by + Clients modal |
| Experience | окремий блок перед Contact у `HowWeWorkSection` | компактний proof біля Hero; перед Contact немає |
| AI line | support під Capabilities | окрема секція `AiPositioningSection` (placeholder-текст той самий) |
| Capabilities order / titles | Commercial, Gaming, Film, Performance | Commercial / Advertising (featured) → Film → Performance → Gaming (secondary) |
| Capabilities body | лише image + title | + description + format tags |
| Capabilities support line | `aiPositioningLine` | новий рядок про commercial-first пріоритет |
| `SelectedWorkSection` data contract | зламаний (`category` / `deliverable`) | виправлений під `description`; секція все одно не в App |
| `site.locations` | `Warsaw · Ukraine · Canada` | `Canada · Ukraine · Poland` |
| Нові секції | — | Trusted by, AI positioning, ExperienceSection, ClientsModal |

### Що досі незавершене / не підключене

| Що | Статус |
|----|--------|
| `site.contactEndpoint: ""` | Форма **не відправляє** на бекенд; у `contactSubmit.ts` лог у `console.info` + штучна затримка 600ms + fake success |
| WhatsApp / Facebook / Instagram / TikTok | `active: false`, порожній `href` → modal «Almost there» |
| `public/videos/` | порожня директорія (локальні mp4 з README відсутні) |
| `reels[]` posters | SVG плейсхолдери `public/images/reels/*.svg` (дані не на головній) |
| `projectsByCategory` / `projects.ts` | вигадані/типові назви кейсів (не на головній) |
| `credentials` / `trustTagline` з `clients.ts` | не рендеряться (лише масив `clients`) |
| `directions.ts` | не імпортується в App |
| `SelectedWorkSection` / `EstimateCTA` / `ProjectGalleryModal` / `VideoModal` | код є, на сторінку не змонтовані |
| AI секція copy | тимчасовий placeholder (`Craft over automation` + старий `aiPositioningLine`) |
| Нова структура сторінки | лише локально; не в останньому коміті / не на live Pages |

### Реальний / підключений контент на локальній головній

| Що | Статус |
|----|--------|
| Brand copy (hero, AI section, process, experience proof, contact, footer) | у коді, рендериться |
| Trusted by (4 клієнти) | рендериться |
| Showreel YouTube id `-cdiXSJczdU` + poster `showreel-poster.png` | підключено |
| Capability images (4 PNG) | у `public/images/capabilities/`, рендеряться |
| Logo light/dark | `public/logos/glowl-logo-*.png` |
| LinkedIn | active URL |
| Email | `hello@glowlworks.com` |
| Vimeo / YouTube URLs у footer | посилання присутні |

---

## 6. Консистентність даних

### Locations

| Місце | Значення | Статус |
|-------|----------|--------|
| `site.locations` (Footer) | `Canada · Ukraine · Poland` | виправлено (було `Warsaw · Ukraine · Canada`) |
| Experience proof | `Canada • Ukraine • Poland` | ті самі три локації; роздільник **•** (U+2022), не **·** (U+00B7) |
| JSON-LD `areaServed` | `["Canada", "Ukraine", "Poland"]` | узгоджено за змістом |
| `clients.credentials` рядок | «…across Canada, Ukraine and Poland» | узгоджено за змістом (не рендериться на UI) |

Warsaw у `site.locations` більше немає.

### og:image

| Місце | Файл | Статус |
|-------|------|--------|
| `index.html` `og:image` | `header_02.png` | **не виправлено** |
| `index.html` preload | `header_02.png` | як вище |
| `site.meta.ogImage` | `header_01.png` | розбіжність лишається; поле не підключене до HTML |

Обидва файли існують у `public/images/`.

### Інші невідповідності (факти)

- Canonical / Organization URL: `https://glowlworks.com` vs live Pages: `https://lisenbart.github.io/glowl/`
- README згадує `header_01` як hero background і локальні videos — поточний UI використовує showreel poster + YouTube, не hero background image як повноекранний фон
- Локальна нова структура ≠ live deploy (поки немає commit + push)

### Джерела зображень capabilities
- У `src/PC/` (untracked): `Animation film.png`, `Film.png`, `Performance & Social.png`, `commercial.png`, `shooting.png`
- У `public/images/capabilities/` (tracked): фінальні файли для сайту

---

## 7. Візуальний стан (текстовий опис)

### Тема
- Два режими: **dark** (дефолт) і **light** (`data-theme`, `localStorage` key `glowl-theme`).
- Dark: фон `#030510`, світлий текст, кольорові glow-бордери карток (violet/cyan/emerald/magenta).
- Light: фон `#f3f2ed` (porcelain/fog), графітовий текст, стриманіші акценти тієї ж палітри, `--card-radius: 28px`.

### Палітра (CSS variables, dark)
- Accents: cyan `#42d9ff`, violet `#7b42ff`, magenta `#ef3dd2`, pink `#ff3a91`, orange `#ff7047`, blue `#1f7aff`
- Section title gradients (emerald / cyan / experience purple)
- CTA gradients (cyan→violet; emerald button)

### Типографіка
- Sans: **DM Sans** (Google Fonts)
- Display: **Montserrat**
- Hero H1: uppercase display, accent слово `light` з градієнтом/emerald класом
- Section titles: display + gradient classes у dark; у light — graphite (`theme-light.css`)

### Нові / змінені секції (опис)

**Trusted by**
- Тихий strip під Hero: centered uppercase label, ряд текстових брендів у muted secondary color.
- Без карток, без glow-бордерів, без цитат; max-width **920px** (як how-we-work / contact).
- Візуально легший за Experience cards і Showreel; відповідає «trust-strip» патерну.

**Experience proof (біля Hero)**
- Ті самі interactive glass-статисти (іконка + цифри + hint + chevron), але з класами `--compact` / `--proof`.
- 2×2 grid, max-width **920px**, без обгортки `how-ios-card` і без H2 «Experience».
- Картка «1000+» відкриває Clients modal; інші скролять до Contact.

**Showreel**
- Після Trusted by + Experience; у рамці `.showreel-card` з `--card-radius`, без bottom fade.

**AI / Craft over automation**
- Окрема cyan `how-ios-card` (як capabilities), max-width **920px**.
- Centered `section-card-header`: H2 gradient cyan + support line.
- Компактніший vertical padding (`.ai-positioning`), без додаткових ілюстрацій чи CTA.

**Capabilities**
- Featured Commercial: на `sm+` full-width (`grid-column: 1 / -1`), media aspect **21 / 9**.
- Gaming: `.capability-card--secondary` (знижена opacity / трохи менший title).
- Під image: description + format tags у body.
- Inline estimate CTA без змін за змістом.

**Process**
- Без змін композиції: 3 step cards у emerald `how-ios-card`, spring icon animation.
- Experience більше не йде одразу після Process перед Contact.

### Композиція секцій (ширини)
- How-we-work / AI / Trusted / Experience / contact / footer cards: **920px**
- Showreel / intro / strip: до **1440px**
- Картки: rounded `28px`, border + shadow («how-ios-card») де застосовано

### Анімації / інтерактив
- Framer Motion: mobile menu, connect panel, coming-soon modal, clients modal, form success
- Process cards: послідовне «запалювання» 01→02→03, connector pulse; іконки — scale + rotate spring
- Services strip: CSS marquee
- Capability cards: hover zoom/saturate (desktop hover)
- Experience stats: click → modal або scroll to contact
- Theme toggle
- Showreel: click-to-play → YouTube iframe
- Mobile sticky CTA після ~65% viewport scroll
- `prefers-reduced-motion`: частина анімацій process вимикається

### Загальний характер (опис без оцінки)
- Студійний one-pager: cinematic dark UI + світла editorial-варіація.
- Позиціонування в структурі: commercial/advertising перший у capabilities; gaming збережений, але secondary.
- Trust + proof цифри підняті під Hero; AI винесено в окремий блок між showreel-зоною і capabilities.
- Форма estimate як основний conversion-блок; Contact / деплой-конфіг не змінювались у цій ітерації.

---

## 8. Історія проєкту в репо

### Документи / брифи
- `docs/glowl_full_report_2026-07-18.md` — цей файл (повний актуальний звіт після реструктуризації).
- `README.md` — локальний dev, GitHub Pages URL, assets table, Formspree note, stack.

### Ключові коміти (хронологія на remote; повідомлення як є)
| Commit | Message |
|--------|---------|
| `88ac658` | Initial commit |
| `9cc49d5` | Migrate GLOWL WORKS site to Vite + React with GitHub Pages deploy. |
| `f47b78d` | Update GitHub Pages URL for lisenbart/glowl repo. |
| `2a99677` | Fix GitHub Pages deploy to serve built Vite assets. |
| `88b3939` | Deploy built dist to gh-pages branch for GitHub Pages. |
| `f45c424` | Fix public asset paths for GitHub Pages subdirectory deploy. |
| `1c0726f` | Redesign Experience section as a glowing 2x2 glass stats grid. |
| `ca2d7b4` | Polish UX, unify card styling, and add flexible showreel embeds. |
| `f39d2f4` | Add iOS light theme, unify section headers, and refresh showreel branding. |
| `c3cfb50` | Unify production capabilities layout, fix mobile overflow, and improve header connect UX. |
| `1d5f7d2` | Add visual capability cards with imagery and polish production section layout. |
| `492a579` | Enhance End-to-end production cards with larger icons and spring motion. |
| `d9db8cf` | Frame showreel in a rounded card and remove bottom fade overlay. |

### Локальні зміни після `d9db8cf` (ще не в коміті)
1. Порядок сторінки: Hero → Trusted by → Experience → Showreel → Services strip → AI → Capabilities → Process → Contact.
2. Нові компоненти: `TrustedBySection`, `ExperienceSection`, `AiPositioningSection`, `ClientsModal`.
3. Capabilities: commercial-first порядок, featured/secondary вага, descriptions + format tags.
4. `site.locations` → `Canada · Ukraine · Poland`.
5. `SelectedWorkSection` приведено до нового shape `selectedWork` (залишається поза App).

---

## Додаток: ключові шляхи файлів

```
src/App.tsx
src/data/site.ts
src/data/selectedWork.ts
src/data/clients.ts
src/data/reels.ts
src/data/stripServices.ts
src/data/services.ts
src/data/socials.ts
src/data/directions.ts          # не в App
src/data/projects.ts            # не в App
src/components/Header.tsx
src/components/DirectionCards.tsx
src/components/TrustedBySection.tsx
src/components/ExperienceSection.tsx
src/components/ClientsModal.tsx
src/components/ServicesStrip.tsx
src/components/AiPositioningSection.tsx
src/components/HowWeWorkSection.tsx
src/components/ContactForm.tsx
src/components/Footer.tsx
src/components/MobileEstimateCTA.tsx
src/components/SelectedWorkSection.tsx   # не в App
src/components/EstimateCTA.tsx           # не в App
src/styles/index.css
src/styles/theme-light.css
src/styles/fonts.css
index.html
.github/workflows/deploy.yml
README.md
docs/glowl_full_report_2026-07-18.md
public/images/capabilities/*
public/images/showreel-poster.png
public/logos/*
```

Кінець звіту.
