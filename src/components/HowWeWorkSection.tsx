import { useEffect, useState } from "react";
import {
  Brain,
  Calendar,
  Clapperboard,
  FileText,
  Gamepad2,
  MessageSquare,
  Megaphone,
  Rocket,
  Sparkles,
  Target,
  Box,
  Trophy,
  Users,
  ArrowRight,
} from "lucide-react";
import { sectionIds, scrollToSection } from "@/data/site";
import type { LucideIcon } from "lucide-react";

const steps = [
  {
    num: "01",
    title: "Brief",
    text: "We align on goals, references and deliverables.",
    icon: FileText,
    accent: "var(--cyan)",
  },
  {
    num: "02",
    title: "Proposal",
    text: "We shape the approach, timeline and production estimate.",
    icon: MessageSquare,
    accent: "var(--violet)",
  },
  {
    num: "03",
    title: "Production",
    text: "We manage the full process and deliver final assets ready to launch.",
    icon: Clapperboard,
    accent: "var(--magenta)",
  },
] as const;

const produceItems: { id: string; label: string; icon: LucideIcon }[] = [
  { id: "commercials", label: "Commercials & Brand Films", icon: Megaphone },
  { id: "trailers", label: "Game Trailers & Cinematics", icon: Gamepad2 },
  { id: "product", label: "Product Animation", icon: Box },
  { id: "gameplay", label: "Gameplay Creatives", icon: Target },
  { id: "motion", label: "Motion Design / VFX", icon: Sparkles },
  { id: "ai", label: "AI-assisted Visual Production", icon: Brain },
];

type ExperienceStat = {
  id: string;
  icon: LucideIcon;
  lines: { text: string; tone?: "primary" | "accent"; size?: "hero" | "medium" | "compact" }[];
  subtext: string;
};

const experienceStats: ExperienceStat[] = [
  {
    id: "projects",
    icon: Rocket,
    lines: [{ text: "1000+", tone: "accent", size: "hero" }],
    subtext: "projects delivered",
  },
  {
    id: "awards",
    icon: Trophy,
    lines: [
      { text: "15 awards", tone: "accent", size: "medium" },
      { text: "45 selections", tone: "primary", size: "medium" },
    ],
    subtext: "international festival recognition",
  },
  {
    id: "timeline",
    icon: Calendar,
    lines: [{ text: "Since 2006", tone: "accent", size: "hero" }],
    subtext: "production experience",
  },
  {
    id: "teams",
    icon: Users,
    lines: [{ text: "Canada • Ukraine • Poland", tone: "primary", size: "compact" }],
    subtext: "creative & production teams",
  },
];

function experienceLineClass(tone: ExperienceStat["lines"][number]["tone"], size: ExperienceStat["lines"][number]["size"]) {
  const toneClass =
    tone === "accent" ? "how-experience-stat-accent" : "how-experience-stat-primary";
  const sizeClass =
    size === "hero"
      ? "how-experience-stat-line-hero"
      : size === "compact"
        ? "how-experience-stat-line-compact"
        : "how-experience-stat-line-medium";
  return `${toneClass} ${sizeClass}`;
}

function ExperienceStatCard({ stat }: { stat: ExperienceStat }) {
  return (
    <li className="how-experience-stat">
      <span className="how-experience-stat-icon-wrap" aria-hidden="true">
        <stat.icon className="how-experience-stat-icon" strokeWidth={1.5} />
      </span>
      <div className="how-experience-stat-copy">
        <div className="how-experience-stat-lines">
          {stat.lines.map((line) => (
            <span key={line.text} className={experienceLineClass(line.tone, line.size)}>
              {line.text}
            </span>
          ))}
        </div>
        <p className="how-experience-stat-sub">{stat.subtext}</p>
      </div>
    </li>
  );
}

function ProductionProcessFlow() {
  const [litCount, setLitCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) return;

    const id = window.setInterval(() => {
      setLitCount((current) => (current >= steps.length ? 0 : current + 1));
    }, 1400);

    return () => window.clearInterval(id);
  }, []);

  const visibleCount = reducedMotion ? steps.length : litCount;
  const allLit = visibleCount === steps.length;

  return (
    <div
      id={sectionIds.process}
      className={`how-process scroll-mt-24${allLit ? " how-process--complete" : ""}`}
      aria-label="From brief to final delivery"
    >
      {steps.map((step, index) => (
        <div key={step.num} className="how-process-group">
          <div
            className={`how-process-card${index < visibleCount ? " how-process-card--active" : " how-process-card--pending"}`}
            style={{ ["--step-accent" as string]: step.accent }}
          >
            <div className="how-process-card-top">
              <span className="how-process-num">{step.num}</span>
              <step.icon className="how-process-icon" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h3 className="how-process-card-title">{step.title}</h3>
            <p className="how-process-card-text">{step.text}</p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`how-process-connector${!reducedMotion && visibleCount > index + 1 ? " how-process-connector-active" : ""}`}
              aria-hidden="true"
            >
              <span className="how-process-line" />
              <span className="how-process-dot" />
              <span className="how-process-line" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function shuffleIndices(count: number) {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

function WhatWeProduceCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [ctaPulse, setCtaPulse] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) return;

    let queue = shuffleIndices(produceItems.length);
    let position = 0;

    const advance = () => {
      if (position >= queue.length) {
        setCtaPulse(true);
        window.setTimeout(() => setCtaPulse(false), 2200);
        queue = shuffleIndices(produceItems.length);
        position = 0;
      }
      setActiveIndex(queue[position]);
      position += 1;
    };

    advance();
    const id = window.setInterval(advance, 2200);

    return () => window.clearInterval(id);
  }, []);

  return (
    <article className="how-ios-card how-ios-card-cyan">
      <div className="how-ios-card-inner">
        <h2 className="how-col-title how-col-title-cyan">What we produce</h2>
        <ul className="how-produce-grid">
          {produceItems.map((item, index) => (
            <li
              key={item.id}
              className={`how-produce-cell${
                reducedMotion || index === activeIndex ? " how-produce-cell-active" : ""
              }`}
            >
              <item.icon className="how-produce-icon" strokeWidth={1.5} aria-hidden="true" />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <div className="how-talk-cta-wrap">
          <button
            type="button"
            onClick={() => scrollToSection(sectionIds.contact)}
            className={`how-talk-cta${ctaPulse ? " how-talk-cta-pulse" : ""}`}
          >
            Need something else? Let&apos;s talk
            <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function HowWeWorkSection() {
  return (
    <section
      id={sectionIds.services}
      className="how-section scroll-mt-24 px-[var(--page-padding)] pt-6 pb-[var(--section-spacing)] md:pt-8"
      aria-label="How we work"
    >
      <div className="mx-auto flex max-w-[920px] flex-col gap-4 md:gap-5">
        <article className="how-ios-card how-ios-card-emerald">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title how-col-title-emerald">Production, end to end</h2>
            <p className="how-lead">
              A clear, collaborative process from first brief to final delivery.
            </p>

            <ProductionProcessFlow />
          </div>
        </article>

        <WhatWeProduceCard />

        <article className="how-ios-card how-experience-card" aria-label="Experience">
          <div className="how-ios-card-inner how-experience-inner">
            <div className="how-experience-header">
              <h2 className="how-col-title how-col-title-experience">Experience</h2>
              <p className="how-experience-lead">
                Proven production experience, built across commercial and cinematic work.
              </p>
            </div>
            <ul className="how-experience-grid">
              {experienceStats.map((stat) => (
                <ExperienceStatCard key={stat.id} stat={stat} />
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
