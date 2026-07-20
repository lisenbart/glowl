# GLOWL — Site State Report for Design Prompting

**Date:** 2026-07-21  
**Stage:** Internal prototype (structure largely settled; visual system not approved)  
**Purpose of this file:** Give GPT / a designer enough accurate context to write a **design prompt** for the next visual pass. Structure and approved copy should be treated as constraints, not as optional content.

---

## 1. What this site is

**GLOWL** (GLOWL WORKS) is a cinematic production studio for:

- advertising / brand films
- gaming content (trailers, cinematics, performance creatives)
- film & entertainment
- performance & social

**Core positioning:**  
Experienced directors and producers lead every project. Production may be traditional, fully AI-generated, or hybrid. AI is one production method among others — not a gimmick, not a cost/speed pitch.

**Audience:** brands, agencies, game teams, producers — professionals speaking to professionals.

**Voice:** clear, calm, confident, specific, forward-looking, natural native English.  
Avoid: startup jargon, SaaS marketing, defensive AI explanations, speed/price as main value, generic agency filler, translated-sounding copy.

---

## 2. Current page architecture (KEEP)

### Home — required order

1. **Header** (shared)
2. **Hero** — founders + approved headline + CTAs + compact client experience
3. **Showreel + What We Make** — one combined section
4. **AI Approach**
5. **Contact** — form card + “Your Project Team” card
6. **Footer** (shared)

### Services — required order

1. **Services Hero**
2. **What We Make** — 4 direction cards (2×2)
3. **Production Capabilities** — 6 items
4. **Contact** (same dual-card pattern as Home)
5. **Footer**

### Explicitly removed / not on Home

- Standalone “Team” section
- Standalone “Selected Work” placeholder cards
- Standalone full “What We Make” section (it lives inside Showreel on Home; full version on Services)

---

## 3. Approved copy (DO NOT REWRITE)

### Hero

- **Eyebrow:** `Cinematic production for brands, games and entertainment.`
- **H1:** `Every Process. One Standard.`
- **Body:** `Whether handcrafted, fully AI-generated, or somewhere in between, every project is shaped by experienced directors and producers from first idea to final frame.`
- **Primary CTA:** `View Our Work` → Showreel (`#work`)
- **Secondary CTA:** `Start a Project` → Contact (`#contact`)

### AI section

- **H2:** `The Process Follows the Idea.`
- **Body:** `AI can expand visual development, build worlds, create individual sequences, or produce a complete film. For each brief, experienced directors and producers define its role and lead every creative and production decision.`
- Marquee label includes: `AI Production` (among Commercials, Brand Films, Game Trailers, etc.)

### Footer body

`Commercials, game content and films — from creative development to final delivery.`

### Contact

- **H2:** `Let's talk about your project.`
- **Lead:** `Tell us what you're making. Our production team will review the brief and come back with a clear next step.`
- **Panel:** `Your Project Team`
  - Line Producer — `Production planning, coordination and delivery.`
  - Client Manager — `Clear communication from brief to final delivery.`
- Form fields: Name, Work email, Brief
- Actions: `Send it over` / `Email Us Directly`

### Showreel companion

- **Showreel** (H2)
- **What We Make** (companion H3)
- Body: `Advertising, gaming and cinematic work — shaped around the idea, the audience and the brief.`
- CTA: `Explore Our Capabilities` → `/services`

### Services Hero

- **H1:** `Production Built Around the Brief.`
- **Lead:** `From creative development and direction through animation, AI production and final delivery.`

---

## 4. Current Hero composition (structure)

Desktop intent:

1. Full-width centered eyebrow (one line)
2. Two columns under it:
   - **Left:** Adrian + Dmytro (portraits, names, roles) — top aligned with H1
   - **Right:** H1 + body + CTAs centered in the text column
3. Under portraits: proof line  
   `20+ years each · Experience across 2,000+ projects · 15 awards & 45 selections · Canada · Ukraine · Poland`
4. Bottom of Hero card: **Selected Client Experience** label + short lead + brand marquee  
   Brands (founder experience, not claimed as exclusive GLOWL clients): Nestlé, Playtika, MasterCard, Voodoo, Samsung, Plarium, McDonald's, Moon Active

Founders:

- Adrian Sakhaltuev — Director & Co-Founder
- Dmytro Lisenbart — Executive Producer & Co-Founder  
  (portrait click opens existing profile popover; no “More” buttons in Hero)

Mobile intent:

1. Eyebrow  
2. H1 / body / CTAs  
3. Founders  
4. Client experience strip  

---

## 5. Current visual system (honest status)

### What exists today

- Dark theme default + light theme
- Fonts: **Montserrat** (display) + **DM Sans** (body)
- Accent cyan `#42d9ff` + violet/magenta supporting accents
- Repeated pattern: almost every section wrapped in a large rounded “glass/iOS” card (`--card-radius: 28px`, near-black translucent panels)
- Content max-width ~920px
- Gradient primary buttons; outlined secondary buttons
- Header: logo + tagline + Home/Services/Contact capsules + socials/email (desktop); connect menu on smaller screens

### Why it currently “feels wrong”

This is the key input for the design prompt:

1. **Too many nested cards** — page reads as a stack of identical rounded panels, not as one cinematic composition.
2. **Product/SaaS vibe** — glass cards, pill buttons, cyan glow accents feel closer to a tech dashboard than a film/production house.
3. **Weak cinematic atmosphere** — dark navy/black background with soft glows, but little real photographic depth, film grain, editorial scale, or motion as presence.
4. **Hero trust block is functional, not editorial** — founders + proof + marquee are correct structurally, but visually they still feel like UI widgets inside a card.
5. **Services direction cards** use temporary stock-like imagery; format tags were removed (descriptions only) — still look like product tiles.
6. **Contact dual-card layout** works structurally (team left / form right) but can feel like an admin panel next to a form.
7. **Brand signal is diluted** — after removing the old full-bleed hero media, the first viewport leans on type + portraits + UI chrome more than on a dominant cinematic image/film plane.
8. **Inconsistent polish level** — structure has been refactored many times; visual language was never redesigned as one system.

### Important clarification

- Structure is mostly good.
- Copy direction (approved strings) is mostly good.
- **Design system / atmosphere / composition language is not good enough yet.**

The next prompt should redesign **look and composition**, not invent a new sitemap.

---

## 6. Temporary / unfinished content

Treat as placeholders for design, not as final assets:

- Showreel poster / YouTube embed
- Direction card images (Advertising, Gaming, Film & Entertainment, Performance & Social)
- Founder portraits (usable, but not final art-directed)
- Proof claims (`2000+ projects`, awards, locations) — **prototype; verify before public launch**
- Client marquee = founder experience brands, wording already careful
- Selected Work templates exist in code but are **not mounted**
- Contact endpoint not connected
- No Privacy/Terms, no SEO pass, no real case-study routes

---

## 7. Brand logic the design must express

1. **Directors & producers own the standard** — Hero founders support the H1, they do not replace it.
2. **Work before biography** — Showreel comes early; team bios are secondary (popovers).
3. **Services explain craft** — Advertising / Gaming / Film / Social + capabilities.
4. **AI is calm and production-led** — never hype, never “faster/cheaper”.
5. **Contact feels operationally trustworthy** — project support roles reassure without fake hiring language.

---

## 8. What the next DESIGN prompt should ask for

Ask GPT / the designer to produce a **visual redesign brief + art direction** for the existing architecture, covering:

### A. Overall art direction

- One clear cinematic direction for a production house (not SaaS, not generic agency, not purple-glow AI startup)
- Reference mood: film title cards, high-end production company sites, editorial motion-design studios
- Define: background language, typography hierarchy, color usage, button language, motion principles
- Keep dark + light themes workable, but dark may remain primary

### B. Hero redesign

- Keep approved copy and founder presence
- Make first viewport feel like **one composition**, not a dashboard card
- Brand/product name should remain strong
- Prefer a dominant cinematic visual plane if reintroducing media (image or muted video slot)
- Founders should feel editorial and equal, not like two CRM profile cards
- Proof + client strip should feel quiet and confident, not like a stats widget row

### C. Showreel + What We Make

- One connected section
- Video primary
- Companion panel secondary but intentional
- Avoid another identical glass card clone if the system changes

### D. AI section

- Keep approved copy
- Visually distinct but calm
- Marquee should feel like craft vocabulary, not a feature ticker

### E. Services

- 2×2 direction grid stays
- Cards should feel like production directions, not app modules
- Capabilities should feel like a disciplined production list, not feature chips

### F. Contact

- Keep two-part idea (form + project team)
- Make it feel premium and human, not admin UI
- Roles remain unnamed/unfilled (icon + function only)

### G. Responsive

- Must work at 1440 / 1024 / 768 / 390 / 320
- No horizontal overflow
- Hero mobile order: eyebrow → message/CTAs → founders

### H. Explicitly out of scope for the design prompt

- Do not rewrite approved Hero / AI / Footer strings
- Do not invent fake case studies or client attributions
- Do not add Selected Work placeholders back to Home
- Do not invent hiring copy
- Do not invent SEO/legal/backend work

---

## 9. Suggested starter prompt for GPT (optional seed)

You can paste this into GPT as a starting point:

> You are an art director for a high-end cinematic production studio website called GLOWL.  
> The information architecture and approved English copy are already locked (see attached site report).  
> Do not rewrite the approved Hero, AI, or Footer strings.  
> The current visual system feels too much like a SaaS/product UI: repeated glass cards, cyan glow, pill buttons, nested panels, weak cinematic atmosphere.  
> Write a precise design prompt for redesigning the look and composition of Home and Services while preserving the current section order and content roles.  
> Emphasize one cohesive first-viewport composition, editorial founder presentation, film/production-house atmosphere, restrained motion, and a clear typography/color system that is not purple-startup and not generic agency.  
> Output: (1) art direction summary, (2) section-by-section visual direction, (3) component rules, (4) mobile rules, (5) what to keep vs replace from the current UI.

---

## 10. Technical notes (for implementers later)

- Stack: Vite + React + TypeScript + Tailwind 4 + Framer Motion
- Routing: custom History API (`/` and `/services`)
- Deploy base can be `/` or GitHub Pages subdirectory
- Shared data files already exist for directions, capabilities, founders, client experience
- Light theme must not be deleted in the design pass

---

## 11. Bottom line

| Layer | Status |
|------|--------|
| Brand idea | Clear |
| Approved copy | Locked and usable |
| Page structure | Mostly correct for prototype |
| Visual design | Not approved — needs a real cinematic redesign |
| Real work / claims / endpoint | Still temporary |

**Use this report to generate a design prompt, not another structural rewrite.**
