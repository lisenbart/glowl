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

type ExperiencePart = { value: string; bold?: boolean };

const experienceItems: { icon: LucideIcon; parts: ExperiencePart[] }[] = [
  {
    icon: Rocket,
    parts: [
      { value: "1000+", bold: true },
      { value: " projects delivered" },
    ],
  },
  {
    icon: Trophy,
    parts: [
      { value: "15", bold: true },
      { value: " winners and " },
      { value: "45", bold: true },
      { value: " selections at World Festivals Class A" },
    ],
  },
  {
    icon: Calendar,
    parts: [
      { value: "Production experience since " },
      { value: "2006", bold: true },
    ],
  },
  {
    icon: Users,
    parts: [{ value: "Creative & production teams across Canada, Ukraine & Poland" }],
  },
];

function ExperienceText({ parts }: { parts: ExperiencePart[] }) {
  return (
    <>
      {parts.map((part, index) =>
        part.bold ? (
          <strong key={index} className="how-exp-bold">
            {part.value}
          </strong>
        ) : (
          <span key={index}>{part.value}</span>
        ),
      )}
    </>
  );
}

function WhatWeProduceCard() {
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) return;

    const id = window.setInterval(() => {
      setStep((current) => (current >= 7 ? 0 : current + 1));
    }, 850);

    return () => window.clearInterval(id);
  }, []);

  const activeCount = reducedMotion
    ? produceItems.length
    : step === 0
      ? 0
      : step >= 6
        ? produceItems.length
        : step;
  const ctaPulse = !reducedMotion && step === 7;

  return (
    <article className="how-ios-card">
      <div className="how-ios-card-inner">
        <h2 className="how-col-title how-col-title-cyan">What we produce</h2>
        <ul className="how-produce-grid">
          {produceItems.map((item, index) => (
            <li
              key={item.id}
              className={`how-produce-cell${index < activeCount ? " how-produce-cell-active" : ""}`}
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
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title how-col-title-emerald">Production, end to end</h2>
            <p className="how-lead">
              A clear, collaborative process from first brief to final delivery.
            </p>

            <div
              id={sectionIds.process}
              className="how-process scroll-mt-24"
              aria-label="From brief to final delivery"
            >
              {steps.map((step, index) => (
                <div key={step.num} className="how-process-group">
                  <div
                    className="how-process-card"
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
                    <div className="how-process-connector" aria-hidden="true">
                      <span className="how-process-line" />
                      <span className="how-process-dot" />
                      <span className="how-process-line" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </article>

        <WhatWeProduceCard />

        <article className="how-ios-card" aria-label="Experience">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title how-col-title-magenta">Experience</h2>
            <ul className="how-ios-group how-experience-group">
              {experienceItems.map((item, index) => (
                <li
                  key={item.parts.map((p) => p.value).join("")}
                  className={index < experienceItems.length - 1 ? "how-ios-row how-experience-row" : "how-ios-row how-ios-row-last how-experience-row"}
                >
                  <span className="how-experience-icon-wrap">
                    <item.icon className="how-experience-icon" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="how-experience-copy">
                    <ExperienceText parts={item.parts} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
