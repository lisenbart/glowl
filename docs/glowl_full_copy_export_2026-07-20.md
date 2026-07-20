# GLOWL — Full copy export

**Date:** 2026-07-20  
**Scope:** User-facing copy currently in code after: tenure unified to 20+, hiring placeholders, standalone AI section (no emoji), synced Header/Footer nav, End-to-end production section removed.  
**Pages:** Home (`/`), Services (`/services`)  
**Method:** Literal export from source — no rewrite, no quality judgment.

---

## Consistency check: tenure

| String | Occurrences in `src/` (user-facing) | Locations |
|--------|-------------------------------------|-----------|
| `20+ years` | Yes — consistent | Hero lead (`site.ts`); Adrian fact + modalBody; Dmytro fact + modalBody (`founders.ts`) |
| `35+ years` | **None** in `src/` | — |

---

## Global chrome (all pages)

### Meta / document (`index.html` + `src/data/site.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| document `<title>` | GLOWL — Cinematic Production for Brands, Games and New Worlds | `index.html` |
| meta description | GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers. | `index.html` |
| canonical | https://glowlworks.com | `index.html` |
| og:type | website | `index.html` |
| og:title | GLOWL — Cinematic Production for Brands, Games and New Worlds | `index.html` |
| og:description | GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers. | `index.html` |
| og:image | `%BASE_URL%images/header_01.png` | `index.html` |
| site.meta.title | GLOWL — Cinematic Production for Brands, Games and New Worlds | `src/data/site.ts` → `site.meta.title` |
| site.meta.description | GLOWL creates commercials, brand films, game trailers, cinematics and AI-assisted visual production for brands, agencies, game teams and producers. | `src/data/site.ts` → `site.meta.description` |

**Note:** Home and `/services` share the same document meta (SPA; no per-route title/description override in code).

### JSON-LD (`index.html`)

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

Also mirrored: `site.organizationDescription` = `Cinematic production studio for commercials, games and new worlds.` (`src/data/site.ts`).

---

### Header (`src/components/Header.tsx` + `src/data/site.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label (nav) | Main navigation | `Header.tsx` |
| aria-label (logo link) | GLOWL home | `Header.tsx` |
| img alt | GLOWL | `Header.tsx` |
| tagline line 1 | Creative partner for | `site.tagline.line1` |
| tagline line 2 | brands, games and new worlds | `site.tagline.line2` |
| nav | Home | `Header.tsx` |
| nav | Services | `Header.tsx` |
| nav | Contact | `Header.tsx` |
| aria-label (theme, dark) | Switch to light mode | `Header.tsx` |
| aria-label (theme, light) | Switch to dark mode | `Header.tsx` |
| aria-label (email icon) | Email us at hello@glowlworks.com | `Header.tsx` + `site.email` |

#### Header Connect menu (`src/components/HeaderConnectMenu.tsx`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label (closed) | Open connect menu | `HeaderConnectMenu.tsx` |
| aria-label (open) | Close connect menu | `HeaderConnectMenu.tsx` |
| aria-label (panel) | Connect with GLOWL | `HeaderConnectMenu.tsx` |
| eyebrow / label | Connect | `HeaderConnectMenu.tsx` |
| item title | Email | `HeaderConnectMenu.tsx` |
| item sub | hello@glowlworks.com | `site.email` |

#### Social icon links (`src/components/SocialIconLinks.tsx` + `src/data/socials.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label (group) | Social media | `SocialIconLinks.tsx` |
| label | LinkedIn | `socials.ts` |
| label | WhatsApp | `socials.ts` |
| label | Facebook | `socials.ts` |
| label | Instagram | `socials.ts` |
| label | TikTok | `socials.ts` |
| aria-label (inactive) | {label} — coming soon | `SocialIconLinks.tsx` |

---

### Footer (`src/components/Footer.tsx` + `src/data/site.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| brand | GLOWL | `Footer.tsx` |
| aria-label (logo) | GLOWL home | `Footer.tsx` |
| tagline line 1 | Creative partner for | `site.tagline.line1` |
| tagline line 2 | brands, games and new worlds | `site.tagline.line2` |
| body (md+) | Commercials, gaming creatives and cinematic content — produced through an expert-led process supported by AI. | `Footer.tsx` |
| CTA button | Get a Project Estimate | `Footer.tsx` |
| nav label | Navigate | `Footer.tsx` |
| aria-label | Footer navigation | `Footer.tsx` |
| nav | Home | `Footer.tsx` |
| nav | Services | `Footer.tsx` |
| nav | Contact | `Footer.tsx` |
| nav label | Connect | `Footer.tsx` |
| aria-label | Social links | `Footer.tsx` |
| connect link | Email | `Footer.tsx` |
| connect link | Vimeo | `Footer.tsx` |
| connect link | YouTube | `Footer.tsx` |
| caption | Canada · Ukraine · Poland | `site.locations` |
| caption | © {year} GLOWL WORKS | `Footer.tsx` + `site.name` |
| caption | Co-founded by Adrian Sakhaltuev (Director) and Dmytro Lisenbart (Producer). | `Footer.tsx` |

---

### Mobile sticky CTA (`src/components/MobileEstimateCTA.tsx`)

| Type | Exact text | Source |
|------|------------|--------|
| button | Get an Estimate | `MobileEstimateCTA.tsx` |

---

### Social coming-soon modal (`src/components/SocialComingSoonModal.tsx` + `site.socialComingSoon`)

| Type | Exact text | Source |
|------|------------|--------|
| eyebrow | {channelLabel} (e.g. WhatsApp / Facebook / Instagram / TikTok) | prop from `SocialIconLinks` |
| H2 | Almost there | `site.socialComingSoon.title` |
| body | Sorry — this channel is still in the works. For now, drop us a line and we'll get back to you. | `site.socialComingSoon.body` |
| CTA | Email Us | `site.socialComingSoon.cta` |
| button / aria-label | Close | `site.socialComingSoon.closeLabel` |

---

## Home (`/`)

Order top → bottom (after Header): Hero → Founders → Showreel → AI → Contact → Footer.

### 1. Hero / Introduction (`DirectionCards.tsx` + `site.hero`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | Introduction | `DirectionCards.tsx` |
| H1 | AI-Native Production Studio | `site.hero.headline` |
| body | Films, games and brand worlds — 20+ years of craft, now at the speed of AI. | `site.hero.paragraph` |

---

### 2. Founders (`FoundersSection.tsx` + `src/data/founders.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | The people behind it | `FoundersSection.tsx` |
| H2 | The People Behind It | `foundersSection.title` |

#### Card 1 — Adrian Sakhaltuev

| Type | Exact text | Source |
|------|------------|--------|
| name | Adrian Sakhaltuev | `founders[0].name` |
| role | Head Director | `founders[0].role` |
| fact (card) | 20+ years in animation · 1000+ projects delivered | `founders[0].fact` |
| button microcopy | More | `FoundersSection.tsx` |
| aria-label | Adrian Sakhaltuev, Head Director. 20+ years in animation · 1000+ projects delivered. More. | composed in `FoundersSection.tsx` |
| popover role | Head Director | `founders[0].role` |
| popover H2 | Adrian Sakhaltuev | `founders[0].modalTitle` |
| popover body | 20+ years in animation, film and commercial production — with 1000+ projects delivered across his career. GLOWL is a new studio built on that experience: producers and directors who know what good looks like, now working at the speed of AI. | `founders[0].modalBody` |
| popover close aria | Close | `site.clientsModal.closeLabel` via `PersonPopover.tsx` |

#### Card 2 — Dmytro Lisenbart

| Type | Exact text | Source |
|------|------------|--------|
| name | Dmytro Lisenbart | `founders[1].name` |
| role | General Producer | `founders[1].role` |
| fact (card) | 20+ years in producing · 1000+ projects delivered | `founders[1].fact` |
| button microcopy | More | `FoundersSection.tsx` |
| aria-label | Dmytro Lisenbart, General Producer. 20+ years in producing · 1000+ projects delivered. More. | composed in `FoundersSection.tsx` |
| popover role | General Producer | `founders[1].role` |
| popover H2 | Dmytro Lisenbart | `founders[1].modalTitle` |
| popover body | 20+ years in producing across film and commercial production — with 1000+ projects delivered and 15 awards & 45 selections across his career. GLOWL is a new studio built on that experience: producers and directors who know what good looks like, now working at the speed of AI. | `founders[1].modalBody` |

#### Card 3 — hiring placeholder

| Type | Exact text | Source |
|------|------------|--------|
| name / title | Line Producer | `founders[2].name` |
| role | _(empty — not rendered)_ | `founders[2].role` |
| fact | We're hiring for this role. | `founders[2].fact` |
| modalTitle / modalBody (data only; card not clickable) | Line Producer / We're hiring for this role. | `founders[2]` |

#### Card 4 — hiring placeholder

| Type | Exact text | Source |
|------|------------|--------|
| name / title | Client Manager | `founders[3].name` |
| role | _(empty — not rendered)_ | `founders[3].role` |
| fact | We're hiring for this role. | `founders[3].fact` |
| modalTitle / modalBody (data only; card not clickable) | Client Manager / We're hiring for this role. | `founders[3]` |

#### Proof strip

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | Studio proof | `FoundersSection.tsx` |
| link / fact | 2000+ projects | `proofStrip.projectsLabel` |
| aria-label (link) | 2000+ projects. View clients. | `FoundersSection.tsx` |
| fact | 15 awards & 45 selections | `proofStrip.awardsLabel` |
| fact | Canada · Ukraine · Poland | `proofStrip.locationsLabel` |

#### Trusted by (`TrustedBySection.tsx` + `site.trustedBy` + `clients.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| label / aria-label | Trusted by : | `site.trustedBy.label` |
| brands (marquee) | Nestlé · Playtika · MasterCard · Voodoo · Samsung · Plarium · McDonald's · Moon Active | `src/data/clients.ts` → `clients` |

#### Clients modal (`ClientsModal.tsx` + `site.clientsModal`)

| Type | Exact text | Source |
|------|------------|--------|
| H2 | Selected clients | `site.clientsModal.title` |
| body | Brands our producers, Adrian Sakhaltuev and Dmytro Lisenbart, have delivered for across commercial and gaming work. | `site.clientsModal.body` |
| list aria | Selected clients | `ClientsModal.tsx` |
| list items | Nestlé, Playtika, MasterCard, Voodoo, Samsung, Plarium, McDonald's, Moon Active | `clients.ts` |
| CTA | Get an Estimate | `site.clientsModal.cta` |
| button / aria-label | Close | `site.clientsModal.closeLabel` |

---

### 3. Showreel (`DirectionCards.tsx` + `reels.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | Showreel | `DirectionCards.tsx` |
| H2 | Showreel | `DirectionCards.tsx` |
| video title (embed) | GLOWL Showreel | `mainShowreel.title` (`reels.ts`) |
| aria-label (play) | Watch reel | `DirectionCards.tsx` |

#### Showreel CTA (“What we make”)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | What we make | `DirectionCards.tsx` |
| H3 | What we make | `DirectionCards.tsx` |
| body | Work by direction — advertising, gaming, film, and social. | `DirectionCards.tsx` |
| CTA link | Explore by direction → | `DirectionCards.tsx` |

---

### 4. AI section (`AiPositioningSection.tsx` + `site.aiPositioningLine` + marquee)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | How we work with AI | `AiPositioningSection.tsx` |
| H2 | People still call the shots. | `AiPositioningSection.tsx` (no emoji) |
| body | AI is still a young technology — powerful, but not yet predictable enough to run on its own. That's why this studio is led by people, not prompts: every frame gets a human check before it's called finished. | `site.aiPositioningLine` |
| marquee aria | Production types | `ServicesStrip.tsx` |
| marquee labels | Commercials; Brand Films; Game Trailers; Cinematics; Product Animation; Title Sequences; Music Videos; AI-assisted Production | `src/data/stripServices.ts` |

---

### 5. Contact form (`ContactForm.tsx` + `services.ts` + `contactSubmit.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | Contact form | `ContactForm.tsx` |
| H2 | Request an estimate | `ContactForm.tsx` |
| lead | No commitment. We respond within 24 hours. | `ContactForm.tsx` |
| label | Name | `ContactForm.tsx` |
| label | Work email | `ContactForm.tsx` |
| label | Company | `ContactForm.tsx` |
| microcopy | optional | `OPTIONAL_HINT` in `ContactForm.tsx` |
| label | Project type | `ContactForm.tsx` |
| select placeholder | Select type | `ContactForm.tsx` |
| option | Commercial Animation | `projectTypes` (`services.ts`) |
| option | Gaming & Interactive | `projectTypes` |
| option | Game Trailers & Playable Ads | `projectTypes` |
| option | Gameplay Creatives | `projectTypes` |
| option | Performance Creatives | `projectTypes` |
| option | Film & Entertainment | `projectTypes` |
| option | Music Video | `projectTypes` |
| option | Motion Design | `projectTypes` |
| option | Other | `projectTypes` |
| label | Deadline | `ContactForm.tsx` |
| placeholder | e.g. March 2026 | `ContactForm.tsx` |
| label | Brief | `ContactForm.tsx` |
| placeholder | Deliverables, references, timeline... | `ContactForm.tsx` |
| label | Attach file | `ContactForm.tsx` |
| aria-label | Remove file | `ContactForm.tsx` |
| submit (idle) | Request an Estimate | `ContactForm.tsx` |
| submit (loading) | Sending... | `ContactForm.tsx` |
| success body | Thank you. We've received your request and will review it shortly. | `ContactForm.tsx` / `contactSubmit.ts` |
| success link | Send another request | `ContactForm.tsx` |
| validation | Name is required | `contactSubmit.ts` |
| validation | Work email is required | `contactSubmit.ts` |
| validation | Enter a valid email | `contactSubmit.ts` |
| validation | Select a project type | `contactSubmit.ts` |
| validation | Project description is required | `contactSubmit.ts` |
| validation | File must be under 10MB | `contactSubmit.ts` + `site.maxUploadBytes` |
| validation | Unsupported file type | `contactSubmit.ts` |
| validation | Submission blocked. | `contactSubmit.ts` (honeypot) |
| server error | Could not send your request. Please try again. | `contactSubmit.ts` |

---

### Removed from Home (not present)

- **End-to-end production** / Brief → Proposal → Production — component deleted (`HowWeWorkSection.tsx`); `sectionIds.process` removed from `site.ts`.
- Process-step copy is **not** in the live UI.

---

## Services (`/services`)

Order: Production capabilities → Contact → Footer.

### 1. Production capabilities (`ProductionCapabilitiesCard.tsx` + `selectedWork.ts`)

| Type | Exact text | Source |
|------|------------|--------|
| section aria | Services | `ServicesPage.tsx` |
| article aria | Production capabilities | `ProductionCapabilitiesCard.tsx` |
| H2 | Production capabilities | `ProductionCapabilitiesCard.tsx` |
| lead | Advertising and gaming production first — with film and social where the brief calls for it. | `ProductionCapabilitiesCard.tsx` |

#### Direction 1 — Advertising

| Type | Exact text | Source |
|------|------------|--------|
| H3 | Advertising | `selectedWork[0].title` |
| body | Brand films, commercials and product visuals — from concept through final delivery. | `selectedWork[0].description` |
| format tags | TV & digital ads; brand films; product animation; explainer videos | `selectedWork[0].formats` |

#### Direction 2 — Gaming

| Type | Exact text | Source |
|------|------------|--------|
| H3 | Gaming | `selectedWork[1].title` |
| body | Trailers, cinematics and performance creatives — built for the pace and scale of game production. | `selectedWork[1].description` |
| format tags | game trailers; cinematics; gameplay ads; playable ads | `selectedWork[1].formats` |

#### Direction 3 — Film & Entertainment

| Type | Exact text | Source |
|------|------------|--------|
| H3 | Film & Entertainment | `selectedWork[2].title` |
| body | Short films, music videos and cinematic storytelling across 2D, 3D and mixed media. | `selectedWork[2].description` |
| format tags | short films; music videos; title sequences; motion & VFX | `selectedWork[2].formats` |

#### Direction 4 — Performance & Social

| Type | Exact text | Source |
|------|------------|--------|
| H3 | Performance & Social | `selectedWork[3].title` |
| body | Social campaign assets and performance creatives shaped for platforms and paid media. | `selectedWork[3].description` |
| format tags | social content; reels & shorts; performance creatives; campaign cutdowns | `selectedWork[3].formats` |

#### Estimate block (inside capabilities card)

| Type | Exact text | Source |
|------|------------|--------|
| aria-label | Get an estimate | `ProductionCapabilitiesCard.tsx` |
| H3 | Have a project in mind? | `ProductionCapabilitiesCard.tsx` |
| body | Send us your brief, references or even an early idea. We'll review it and propose the most effective production approach. | `ProductionCapabilitiesCard.tsx` |
| CTA | Get a Project Estimate | `ProductionCapabilitiesCard.tsx` |
| secondary CTA | Email Us Directly | `ProductionCapabilitiesCard.tsx` |

### 2. Contact form

Same copy as Home Contact (`ContactForm.tsx`) — see above.

---

## CTA / button inventory (site-wide)

| Exact button / link text | Where used |
|--------------------------|------------|
| Home | Header nav; Footer nav |
| Services | Header nav; Footer nav |
| Contact | Header nav; Footer nav |
| Explore by direction → | Home Showreel CTA → `/services` |
| More | Founders cards (Adrian, Dmytro) |
| 2000+ projects | Proof strip → opens Clients modal |
| Get an Estimate | Clients modal CTA; Mobile sticky bar |
| Close | Clients modal; Social coming-soon; Person popover (aria + button) |
| Email Us | Social coming-soon modal |
| Get a Project Estimate | Footer; Services capabilities estimate block |
| Email Us Directly | Services capabilities estimate block |
| Watch reel | Showreel play control (aria-label) |
| Request an Estimate | Contact form submit |
| Sending... | Contact form submit (loading) |
| Send another request | Contact form success state |
| Email | Header connect menu; Footer Connect |
| Vimeo | Footer Connect |
| YouTube | Footer Connect |
| Open connect menu / Close connect menu | Header connect trigger (aria) |
| Switch to light mode / Switch to dark mode | Header theme toggle (aria) |
| Remove file | Contact attach field (aria) |

---

## Data present in code but not rendered in current UI

(For editors: not on page; do not treat as live copy.)

| Text | Source |
|------|--------|
| `deliverables[]` labels | `src/data/services.ts` |
| `credentials[]`, `trustTagline` | `src/data/clients.ts` |
| `directions[]` (Commercials / Gaming / Film CTAs) | `src/data/directions.ts` |
| `EstimateCTA` section copy (“Have a project in mind?” etc.) | `src/components/EstimateCTA.tsx` — **not mounted** (duplicate of capabilities CTA) |
| `SelectedWorkSection` | `src/components/SelectedWorkSection.tsx` — **not mounted** |

---

## Page structure snapshot (post-removal)

**Home:** Header → Hero → Founders (+ Trusted by) → Showreel → AI (“People still call the shots.”) → Contact → Footer  

**Services:** Header → Production capabilities → Contact → Footer  

Spacing between Home sections uses `.site-main-stack { gap: var(--block-stack-gap) }` — removing End-to-end production leaves no empty placeholder section; Showreel → AI → Contact remain adjacent siblings in the stack.
