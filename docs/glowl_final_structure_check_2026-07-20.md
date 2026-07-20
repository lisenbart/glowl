# GLOWL — final structure check (verification)

Дата: **2026-07-20**  
Джерело: локальний код `/Users/dmytrolisenbart/Desktop/Glowl`  
Мета: підтвердити дослівний текст змінених елементів проти промта.

Легенда: ✅ збіг · ⚠️ частково · ❌ розбіжність

---

## 1. Hero eyebrow

| | |
|--|--|
| Очікувано | `AI-Native Production Studio` |
| Фактично | `AI-Native Production Studio` |
| Джерело | `site.hero.eyebrow` → `DirectionCards.tsx` (`.hero-eyebrow`, cyan, uppercase як Trusted by) |
| Статус | ✅ |

## 2. Hero body (`site.hero.paragraph`)

| | |
|--|--|
| Очікувано | `A new studio built by producers and directors with 35+ years in animation, film and commercial production — now working at the speed of AI.` |
| Фактично | `A new studio built by producers and directors with 35+ years in animation, film and commercial production — now working at the speed of AI.` |
| Джерело | `src/data/site.ts` |
| Статус | ✅ |

H1 і `audienceLine` — без змін (перевірено, не змінювались у цьому пакеті).

## 3. AI Positioning body (`site.aiPositioningLine`)

| | |
|--|--|
| H2 очікувано / факт | `Craft over automation` / `Craft over automation` → ✅ |
| Body очікувано | `AI is still a young technology — powerful, but not yet predictable enough to run on its own. That's exactly why this studio is led by people, not scripts: every frame is shaped, checked and finished by directors and artists who know what 'good' looks like.` |
| Body фактично | той самий рядок (повний абзац, не скорочений) |
| Джерело | `site.aiPositioningLine` → `AiPositioningSection.tsx` |
| Статус | ✅ |

Примітка реалізації: для довгого тексту додано `section-card-header__lead--secondary`, щоб на `md+` не спрацьовував `white-space: nowrap` у header lead.

## 4. Experience proof — sub-рядки

| Картка | Очікувано | Фактично | Статус |
|--------|-----------|----------|--------|
| 1 (1000+) | `projects led by our producer, Dmytro Lisenbart` | `projects led by our producer, Dmytro Lisenbart` | ✅ |
| 2 (awards) | `earned across Dmytro Lisenbart's career` | `earned across Dmytro Lisenbart's career` | ✅ |
| 3 (35+ years) | `of experience behind our producer` | `of experience behind our producer` | ✅ |
| 4 | без змін (`Canada · Ukraine · Poland` / `creative & production teams`) | без змін | ✅ |

Джерело: `ExperienceSection.tsx` → `experienceStats`. Aria-labels оновлені під новий sub.

## 5. Clients modal body

| | |
|--|--|
| Очікувано | `Brands our producer, Dmytro Lisenbart, has delivered for across commercial and gaming work.` |
| Фактично | `Brands our producer, Dmytro Lisenbart, has delivered for across commercial and gaming work.` |
| Джерело | `site.clientsModal.body` |
| Статус | ✅ |

---

## Межі промта (не чіпати) — контроль

| Пункт | Статус |
|-------|--------|
| Contact form / fake success | не змінювався |
| Coming-soon соцмережі | не змінювались |
| Footer founders line | лишився: `Co-founded by Dmytro Lisenbart (Producer) and Adrian Sakhaltuev (Director).` |
| og:image `header_01.png` | без змін у цьому пакеті |
| Порядок секцій / стек / незмонтовані компоненти | не чіпались |

---

## Підсумок

| Елемент | Статус |
|---------|--------|
| Hero eyebrow | ✅ |
| Hero body | ✅ |
| AI Positioning body | ✅ |
| Experience sub ×3 | ✅ |
| Clients modal body | ✅ |

**Усі перевірені пункти: ✅**

Кінець звіту.
