import { useEffect, useState } from "react";
import {
  Calendar,
  Clapperboard,
  FileText,
  MessageSquare,
  Rocket,
  Trophy,
  Users,
} from "lucide-react";
import { selectedWork } from "@/data/selectedWork";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, scrollToSection, site } from "@/data/site";
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

function ProductionCapabilitiesCard() {
  return (
    <article className="how-ios-card how-ios-card-cyan" aria-label="Production capabilities">
      <div className="how-ios-card-inner">
        <h2 className="how-col-title how-col-title-cyan">Production capabilities</h2>
        <p className="how-support-line">{site.aiPositioningLine}</p>

        <ul className="capability-grid">
          {selectedWork.map((item) => (
            <li key={item.id} className="capability-card">
              <div className="capability-media">
                <img
                  src={publicAsset(item.image)}
                  alt=""
                  className="capability-image"
                  loading="lazy"
                />
                <div className="capability-scrim" aria-hidden="true" />
                <h3 className="capability-title">{item.title}</h3>
              </div>
            </li>
          ))}
        </ul>

        <div id={sectionIds.estimate} className="capability-cta scroll-mt-24" aria-label="Get an estimate">
          <h3 className="capability-cta-title">Have a project in mind?</h3>
          <p className="capability-cta-text">
            Send us your brief, references or even an early idea. We'll review it and propose the most effective
            production approach.
          </p>

          <div className="estimate-cta-actions mt-7 flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection(sectionIds.contact)}
              className="gradient-button btn-on-accent w-full min-w-0 max-w-full rounded-full px-5 py-3 text-sm font-medium md:w-auto md:px-6"
            >
              Get a Project Estimate
            </button>
            <a href={`mailto:${site.email}`} className="estimate-cta-secondary w-full min-w-0 max-w-full md:w-auto">
              Email Us Directly
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function HowWeWorkSection() {
  return (
    <section
      id={sectionIds.services}
      className="how-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="How we work"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-[920px] flex-col gap-[var(--block-stack-gap)]">
        <ProductionCapabilitiesCard />

        <article className="how-ios-card how-ios-card-emerald">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title how-col-title-emerald">End-to-end production</h2>
            <p className="how-lead">
              A clear, collaborative process from first brief to final delivery.
            </p>

            <ProductionProcessFlow />
          </div>
        </article>

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
