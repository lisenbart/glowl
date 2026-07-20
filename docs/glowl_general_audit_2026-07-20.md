# GLOWL — генеральний аудит-звіт (факти)

Дата звіту: **2026-07-20**  
Джерело: локальний репозиторій `/Users/dmytrolisenbart/Desktop/Glowl`  
Порівняння з lisenbart.com: локальний репозиторій `/Users/dmytrolisenbart/Desktop/Lisenbart Film` (`site/src/data/site.ts`, `work.ts`, `testimonials.ts`, `docs/full_copy_export_2026-07-18.md`)  
Мета: фіксація стану для стратегічного рішення «доопрацьовувати» / «перебудовувати».  
Без рекомендацій і без правок — лише факти.

---

## 1. Загальний стан коду

### Git / деплой на момент аудиту
- Гілка: **main** (`origin/main`)
- Останній коміт на remote/HEAD: `d9db8cf` — *Frame showreel in a rounded card and remove bottom fade overlay.*
- Локально є великий шар **uncommitted** змін (реструктуризація головної, Trusted by, Experience attribution, Footer founders, og:image тощо). Live GitHub Pages відповідає `d9db8cf`, не локальному стану.
- Live URL: **https://lisenbart.github.io/glowl/** (`BASE_PATH=/glowl/`)
- Canonical у коді: **https://glowlworks.com** (кастомний домен у репо не підключений: немає CNAME / DNS-конфігу)

### Компоненти: інвентар (`src/components/` — 19 файлів)

**Змонтовані в дерево `App.tsx` (прямо або транзитивно)**

| Компонент | Як підключений |
|-----------|----------------|
| `Header.tsx` | `App` |
| `HeaderConnectMenu.tsx` | `Header` |
| `SocialIconLinks.tsx` | `Header`, `HeaderConnectMenu`, `ContactForm`, `Footer` |
| `SocialComingSoonModal.tsx` | `SocialIconLinks` |
| `DirectionCards.tsx` | `App` |
| `TrustedBySection.tsx` | `DirectionCards` |
| `ExperienceSection.tsx` | `DirectionCards` |
| `ClientsModal.tsx` | `ExperienceSection` |
| `ServicesStrip.tsx` | `DirectionCards` |
| `VideoEmbed.tsx` | `DirectionCards` (showreel play) |
| `AiPositioningSection.tsx` | `App` |
| `HowWeWorkSection.tsx` | `App` |
| `ContactForm.tsx` | `App` |
| `Footer.tsx` | `App` |
| `MobileEstimateCTA.tsx` | `App` |

**Написані, але не підключені до `App.tsx` і ніде не імпортуються іншими змонтованими компонентами — 4 файли**

| Компонент | Спостережувана причина |
|-----------|------------------------|
| `SelectedWorkSection.tsx` | Залишок альтернативного «selected work» блоку; дані `selectedWork` зараз їдуть у Capabilities у `HowWeWorkSection`. Контракт полів вирівняно під `description` (раніше був розрив з `category`/`deliverable`). |
| `EstimateCTA.tsx` | Дубль inline CTA всередині Capabilities (`id="estimate"` уже там). Той самий copy/кнопки. |
| `ProjectGalleryModal.tsx` | Залежить від `projects.ts`; у поточному page flow галереї кейсів немає. |
| `VideoModal.tsx` | Очікує `Reel` з `reels[]`; live showreel використовує `VideoEmbed` + `mainShowreel`, не цей modal. |

### Файли даних (`src/data/` — 9 файлів)

| Файл | Використання в живому UI |
|------|---------------------------|
| `site.ts` | Так (основний copy/config) |
| `clients.ts` | Частково: масив `clients` → Trusted by + Clients modal. **`credentials` і `trustTagline` ніде не імпортуються.** |
| `selectedWork.ts` | Так → Capabilities |
| `stripServices.ts` | Так → Services strip |
| `socials.ts` | Так → SocialIconLinks |
| `services.ts` | Частково: `projectTypes` → Contact form. **`deliverables` ніде не імпортуються.** |
| `reels.ts` | Частково: `mainShowreel` → Showreel. **`reels[]` не рендериться в живому UI** (лише тип для незмонтованого `VideoModal`). |
| `directions.ts` | **Ні** — жодного імпорту в `src/` |
| `projects.ts` | **Ні в живому UI** — лише `ProjectGalleryModal` (незмонтований) |

### Зламані контракти даних
- На момент аудиту **активних зламаних контрактів між змонтованими компонентами і їх data-джерелами немає**.
- `SelectedWorkSection` (незмонтований) зараз читає `title` + `description` — сумісний з поточним `selectedWork.ts`.
- Застарілий/суперечливий **непідключений** текст у `clients.credentials`: досі містить «Production experience since 2006» і «1000+ commercial projects» без founders-attribution — суперечить уже оновленому Experience UI, але на сторінку не потрапляє.

### Технічний борг (факти)
- `next-env.d.ts` у корені — залишок Next.js (`/// <reference types="next" />`); runtime — Vite + React SPA.
- Залежність `picomatch` у `package.json` — **не імпортується** в `src/`.
- Дублікати логіки/патернів:
  - Inline Capabilities CTA ≈ `EstimateCTA.tsx` (майже ідентичний copy).
  - `scrollToSection` / contact focus — той самий патерн, що на lisenbart.com.
  - `SocialIconLinks` + `SocialComingSoonModal` + `HeaderConnectMenu` + `MobileEstimateCTA` + `publicAsset` — структурні близнюки відповідних файлів Lisenbart.
- `public/videos/` — порожня; `reels[].video` вказує на відсутні mp4.
- `public/images/reels/*.svg` — SVG-плейсхолдери для незмонтованих reel-карток.
- `src/PC/` — untracked вихідні PNG; live capabilities беруться з `public/images/capabilities/`.

---

## 2. Завершеність функціоналу

### Contact form
- UI форми змонтований, валідація працює (`contactSubmit.ts`).
- `site.contactEndpoint: ""` (порожній рядок).
- При submit без endpoint: `console.info` з payload → `await` 600ms → **`success: true` з повідомленням успіху** (fake success path).
- Реальної відправки на Formspree/backend **немає**.

### Соцмережі (`site.social` / footer Connect)
| Канал | Статус |
|-------|--------|
| LinkedIn | **active** (`https://linkedin.com/company/glowlworks`) |
| WhatsApp | coming soon (`active: false`, `href: ""`) |
| Facebook | coming soon |
| Instagram | coming soon |
| TikTok | coming soon |
| Email | працює (`mailto:hello@glowlworks.com`) |
| Vimeo / YouTube (footer Connect) | посилання присутні (`site.vimeo`, `site.youtube`) |

Підсумок іконок у header social row: **1 active / 4 coming soon**.

### Портфоліо / кейси в UI
- **Жодного іменованого проєкту/кейсу** (назва клієнта + назва роботи + рік) у змонтованому UI немає.
- Є: один **showreel** (YouTube id `-cdiXSJczdU` + poster) — підключений.
- Є: **4 категорійні capability-картки** з PNG і generic descriptions/formats — не кейси.
- `projects.ts` містить 9 типових назв («Luxury Product Launch Film» тощо) — **не змонтовані**.

### Домен
- Публічний перегляд: **GitHub Pages subdirectory** `https://lisenbart.github.io/glowl/`.
- `https://glowlworks.com` — лише canonical / Organization JSON-LD у коді; підключення apex до хостингу в репозиторії не зафіксоване.

---

## 3. Повна структура й копірайт — поточний локальний стан

Порядок зверху вниз (локальний код після реструктуризації):

1. Header  
2. Hero (Introduction)  
3. Trusted by  
4. Experience proof  
5. Showreel (`#work`)  
6. Services strip  
7. AI / Craft (`AiPositioningSection`)  
8. Production capabilities + inline Estimate CTA (`#services`, `#estimate`)  
9. End-to-end production / Process (`#process`)  
10. Contact form (`#contact`)  
11. Footer  
12. MobileEstimateCTA (`md:hidden`)

### Статус попередніх правок (застосовано / ні)

| Правка | Статус у локальному коді |
|--------|---------------------------|
| Experience attribution (founders / 35+ years) | **Застосовано** |
| Clients modal body про founders | **Застосовано** |
| Footer founders line | **Застосовано** |
| og:image / preload → `header_01.png` | **Застосовано** |
| Роздільник локацій `·` в Experience | **Застосовано** |
| AiPositioning copy (окремий промт) | **Не змінювався** — лишається placeholder |
| Commit / deploy нової структури | **Ні** — uncommitted; live Pages = старіший знімок |

---

### Meta / SEO (`index.html` + `site.ts`)

| Тип | Текст | Джерело |
|-----|-------|---------|
| title | GLOWL — Cinematic Production for Brands, Games and New Worlds | `index.html` / `site.meta.title` |
| description | GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers. | |
| canonical | https://glowlworks.com | |
| og:image | `%BASE_URL%images/header_01.png` | `index.html` (узгоджено з `site.meta.ogImage`) |
| preload | `%BASE_URL%images/header_01.png` | `index.html` |

### JSON-LD Organization
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

---

### Header

| Тип | Текст | Джерело |
|-----|-------|---------|
| brand / alt | GLOWL | |
| tagline | Creative partner for / brands, games and new worlds | `site.tagline` |
| nav | Work · Services · Process · Contact | → `#work` `#services` `#process` `#contact` |
| theme aria | Switch to light/dark mode | |
| email aria | Email us at hello@glowlworks.com | |
| Connect | Connect / Email / Open channel / Coming soon | |
| social coming-soon modal | Almost there / Sorry — this channel is still in the works… / Email Us / Close | `site.socialComingSoon` |

---

### Hero (Introduction)

| Тип | Текст | Джерело |
|-----|-------|---------|
| H1 | Films, games and brand worlds brought to light. | `site.hero` |
| body | Commercials, game trailers and cinematic content shaped by experienced artists, directors and producers — with AI used where it helps the work move faster without losing the eye. | |
| audience | For brands, agencies, game teams, producers and entertainment projects. | |

---

### Trusted by

| Тип | Текст | Джерело |
|-----|-------|---------|
| label | Trusted by | `site.trustedBy.label` |
| brands (text) | Playtika · Moon Active · Plarium · Voodoo | `clients` |

---

### Experience proof

| Тип | Текст | Джерело |
|-----|-------|---------|
| card1 | 1000+ / projects behind our founders / View clients | `ExperienceSection` |
| card2 | 15 awards / 45 selections / earned across our founders' careers / Festival recognition | |
| card3 | 35+ years / of experience behind our founders / About the studio | |
| card4 | Canada · Ukraine · Poland / creative & production teams / Global team | |

### Clients modal

| Тип | Текст | Джерело |
|-----|-------|---------|
| H2 | Selected clients | `site.clientsModal` |
| body | Brands our founders have delivered for across commercial and gaming work. | |
| list | Playtika, Moon Active, Plarium, Voodoo | `clients` |
| CTA | Get an Estimate | → `#contact` |
| Close | Close | |

---

### Showreel

| Тип | Текст | Джерело |
|-----|-------|---------|
| aria | Showreel | |
| play | Watch reel | |
| title | GLOWL Showreel | `mainShowreel` |
| youtube | `-cdiXSJczdU` | |

---

### Services strip

| Labels | Commercials · Brand Films · Game Trailers · Cinematics · Product Animation · Title Sequences · Music Videos · AI-assisted Production |
| Джерело | `stripServices.ts` |

---

### AI / майстерність (placeholder)

| Тип | Текст | Джерело |
|-----|-------|---------|
| aria | How we work with AI | |
| H2 | Craft over automation | `AiPositioningSection` inline |
| lead | AI helps us move faster. Directors, artists and producers keep the work sharp. | `site.aiPositioningLine` |

---

### Production capabilities

| Тип | Текст | Джерело |
|-----|-------|---------|
| H2 | Production capabilities | |
| lead | Commercial and advertising production first — with film, social and gaming where the brief calls for it. | |
| 1 (featured) | Commercial / Advertising + description + formats | `selectedWork` |
| 2 | Film & Entertainment + … | |
| 3 | Performance & Social + … | |
| 4 (secondary) | Gaming + … | |
| CTA H3 | Have a project in mind? | |
| CTA body | Send us your brief, references or even an early idea. We'll review it and propose the most effective production approach. | |
| buttons | Get a Project Estimate · Email Us Directly | |

---

### Process

| Тип | Текст |
|-----|-------|
| H2 | End-to-end production |
| lead | A clear, collaborative process from first brief to final delivery. |
| 01 Brief | We align on goals, references and deliverables. |
| 02 Proposal | We shape the approach, timeline and production estimate. |
| 03 Production | We manage the full process and deliver final assets ready to launch. |

---

### Contact form

| Тип | Текст |
|-----|-------|
| H2 | Request an estimate |
| lead | No commitment. We respond within 24 hours. |
| fields | Name * · Work email * · Company optional · Project type * · Deadline optional · Brief * · Attach file optional |
| select empty | Select type |
| options | Commercial Animation; Gaming & Interactive; Game Trailers & Playable Ads; Gameplay Creatives; Performance Creatives; Film & Entertainment; Music Video; Motion Design; Other |
| submit | Request an Estimate |
| loading | Sending... |
| success | Thank you. We've received your request and will review it shortly. |
| success secondary | Send another request |

---

### Footer

| Тип | Текст | Джерело |
|-----|-------|---------|
| brand | GLOWL | |
| tagline | Creative partner for / brands, games and new worlds | |
| body (md+) | Commercials, gaming creatives and cinematic content — produced through an expert-led process supported by AI. | inline |
| button | Get a Project Estimate | |
| Navigate | Work / Services / Process / Contact | |
| Connect | Email / Vimeo / YouTube | |
| locations | Canada · Ukraine · Poland | `site.locations` |
| founders | Co-founded by Dmytro Lisenbart (Producer) and Adrian Sakhaltuev (Director). | inline Footer |
| copyright | © {year} GLOWL WORKS | |

### Mobile sticky CTA
| button | Get an Estimate |

---

## 4. Диференціація від lisenbart.com

### Дані / claims / формулювання, що збігаються або майже збігаються

| GLOWL | lisenbart.com (джерело) |
|-------|-------------------------|
| 1000+ (projects) | `personalProof`: «1000+ projects delivered»; bio/producing track |
| 15 awards / 45 selections | `work.ts` laurels на film case: `["15 awards", "45 selections", "7.9 IMDb"]` |
| 35+ years | `personalProof` / bio: «35 years in animation» |
| Canada · Ukraine · Poland (порядок на GLOWL: Canada first) | About/locations: Ukraine · Canada · Poland (+ Remote worldwide у footer) |
| Playtika, Plarium, Moon Active | Trusted by / commercial games reel / testimonials |
| Voodoo | testimonials (`company: "Voodoo"`) |
| Label «Trusted by» + strip брендів | той самий патерн `TrustedBySection` / `site.trustedBy.label` |
| Social coming-soon title «Almost there» | `site.socialComingSoon.title` |
| Ім’я Dmytro Lisenbart + роль Producer/director lineage | Hero/About на lisenbart.com |
| Патерни UI: Header connect menu, social icons + coming-soon modal, mobile sticky CTA, `publicAsset`, contact scroll+focus email | паралельні компоненти в обох репо |
| Fake/placeholder contact path при порожньому endpoint | аналогічна архітектура `contactSubmit` (на Lisenbart endpoint може бути інший — тут фіксуємо лише спільний патерн) |

### Унікальне для GLOWL (не повторюється як бренд/продукт на lisenbart.com)

| Елемент |
|---------|
| Бренд **GLOWL / GLOWL WORKS** |
| Tagline «brands, games and new worlds» / H1 «brought to light» |
| Email `hello@glowlworks.com`, company LinkedIn `/company/glowlworks` |
| Co-founder рядок з **Adrian Sakhaltuev (Director)** |
| Односторінковий studio-offer (не personal Film/Commercial hub з двома шляхами) |
| Capabilities порядок: Commercial/Advertising featured → Gaming secondary |
| AI-секція «Craft over automation» + `aiPositioningLine` |
| Showreel YouTube id `-cdiXSJczdU` / GLOWL poster |
| Clients attribution copy («behind our founders» / modal body) як формулювання саме цього сайту |
| Capability category cards + format tags як поточна структура оферу |
| Process Brief → Proposal → Production як окремий studio block |
| Meta/title про «Cinematic Production for Brands, Games and New Worlds» |

---

## 5. Візуальна й структурна цілісність

### Тон / зміст: місця напруги (фактично спостережувані)

1. **Founders vs company voice**  
   Experience + Clients modal атрибутують цифри/клієнтів засновникам; Hero, Capabilities CTA, Footer body, AI line говорять від «ми / студія» без уточнення founders.

2. **Trusted by label**  
   Eyebrow «Trusted by» без слова founders; уточнення з’являється лише в Clients modal після кліку на «1000+».

3. **AI**  
   Hero вже містить AI-речення; окрема секція повторює споріднену думку placeholder-ом («Craft over automation» + старий support-рядок) — дубль теми з різною вагою.

4. **Capabilities vs відсутність кейсів**  
   Категорії описані як production offer; під ними немає доказів у вигляді іменованих робіт (окрім showreel вище по сторінці).

5. **Непідключені `credentials`**  
   У data досі «since 2006» / «1000+ commercial projects» без founders — суперечність у репо, не на екрані.

### Порядок секцій як наратив

Фактична дуга:

> Intro brand → trust logos → proof numbers (founders) → showreel → service labels → AI craft claim → capability offer (commercial-first) → process → estimate form

Спостережувані розриви:
- Після showreel іде marquee labels, потім окрема AI-картка, потім знову capabilities — AI стоїть між «доказами роботи» і «офером», без CTA.
- Experience interactive hints («Festival recognition», «About the studio») ведуть у `#contact`, не в окремі секції про фестивалі/about (таких секцій немає).
- Services strip і Capabilities частково перекривають тематику (типи продакшену).

### CTA, що ведуть до `#contact` (змонтований UI)

| # | Джерело | Лейбл / тригер |
|---|---------|----------------|
| 1 | Header nav | Contact |
| 2 | Footer nav | Contact |
| 3 | Experience card «15 awards…» | click → contact |
| 4 | Experience card «35+ years» | click → contact |
| 5 | Experience card «Canada · …» | click → contact |
| 6 | Capabilities | Get a Project Estimate |
| 7 | Clients modal | Get an Estimate |
| 8 | Footer button | Get a Project Estimate |
| 9 | Mobile sticky | Get an Estimate |
| 10 | Contact form | Request an Estimate (destination itself) |

Окремо (не `#contact`, але conversion-суміжні): Header/Connect/Capabilities **Email** (`mailto:`), Footer Email/Vimeo/YouTube.

Підрахунок: **9 шляхів скролу/відкриття до `#contact`** + сама форма. Три з чотирьох Experience-карток ведуть у contact; один — у clients modal (який знову має CTA в contact).

---

## 6. Рівень готовності до публічного запуску (підрахунок)

### A. Змонтовані visitor-facing блоки сторінки (12 одиниць)

| # | Блок | Класифікація |
|---|------|--------------|
| 1 | Header | готовий контент/chrome |
| 2 | Hero | готовий |
| 3 | Trusted by | готовий (дані підключені) |
| 4 | Experience | готовий (оновлена attribution) |
| 5 | Showreel | готовий (реальний YouTube) |
| 6 | Services strip | готовий |
| 7 | AI positioning | **явний placeholder** |
| 8 | Capabilities (+ inline CTA) | готовий як category-offer; **0 іменованих кейсів** |
| 9 | Process | готовий |
| 10 | Contact form | UI готовий; **submit = fake success** |
| 11 | Footer (locations + founders + ©) | готовий |
| 12 | MobileEstimateCTA | готовий |

**Підрахунок блоків**
- Повністю готові як контент/chrome: **10 / 12 = 83%**
- Явний placeholder або нефункціональний backend: **2 / 12 = 17%** (AI copy; Contact submit)

**Окрема метрика портфоліо**
- Іменовані кейси в UI: **0**
- Реальний підключений відео-доказ: **1** (showreel)
- Category capability cards: **4** (не кейси)

### B. Компонентний шар коду

- Файлів у `src/components/`: **19**
- Змонтовані в live tree: **15 / 19 = 79%**
- Незмонтовані: **4 / 19 = 21%**

### C. Data-шар

- Файлів у `src/data/`: **9**
- Повністю або частково в живому UI: **7** (`site`, `clients`, `selectedWork`, `stripServices`, `socials`, `services`/`projectTypes`, `reels`/`mainShowreel`)
- Цілком поза живим UI: **2** (`directions.ts`, `projects.ts`) = **22%** data-файлів
- Додатково мертві експорти всередині «живих» файлів: `credentials`, `trustTagline`, `deliverables`, `reels[]`

### D. Зведена оцінка «готового vs заглушок» для рішення про запуск

Якщо рахувати **лише те, що бачить відвідувач на змонтованій сторінці** (розділ 6A):

| Категорія | Частка |
|-----------|--------|
| Реальний підключений контент / працюючий chrome | **≈ 83%** блоків |
| Placeholder copy або fake conversion backend | **≈ 17%** блоків |
| Іменоване портфоліо-кейси | **0%** від очікуваного portfolio surface (відсутнє) |

Якщо додати **незмонтований код** як частку кодової бази, а не сторінки: **≈ 21%** component-файлів і **≈ 22%** data-файлів не беруть участі в live UI.

**Інфраструктурні факти, що не входять у % блоків, але впливають на «публічний запуск»:**
- Contact не відправляє дані назовні
- 4/5 header social каналів — coming soon
- Кастомний домен у коді заявлений, хостинг — GitHub Pages `/glowl/`
- Нова структура й attribution-правки **не задеплоєні** (лише локально)

---

## Додаток: ключові шляхи

```
src/App.tsx
src/components/*          # 19 файлів; 4 незмонтовані
src/data/*                # 9 файлів; directions + projects поза UI
src/lib/contactSubmit.ts  # fake success при порожньому endpoint
index.html                # og:image = header_01.png
docs/glowl_general_audit_2026-07-20.md
```

Кінець звіту.
