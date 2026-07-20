import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { clientExperienceProof } from "@/data/clientExperience";
import { heroFounders, type FounderPerson } from "@/data/founders";
import { sectionIds, site, scrollToSection } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";
import { publicAsset } from "@/lib/publicAsset";
import { ClientExperienceBlock } from "./ClientExperienceSection";
import PersonPopover from "./PersonPopover";

type ActivePerson = {
  person: FounderPerson;
  clickPoint: ClickPoint;
};

function HeroFounder({
  person,
  onOpen,
}: {
  person: FounderPerson;
  onOpen: (person: FounderPerson, clickPoint: ClickPoint) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen(person, { x: event.clientX, y: event.clientY });
  };

  return (
    <li className="hero-founders__person">
      <button
        type="button"
        className="hero-founders__trigger"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`${person.name}, ${person.role}. Open profile.`}
      >
        <span className="hero-founders__portrait" aria-hidden="true">
          {person.photo ? (
            <img
              src={publicAsset(person.photo)}
              alt=""
              className="hero-founders__photo"
              fetchPriority="high"
            />
          ) : (
            <span className="hero-founders__initials">{person.initials}</span>
          )}
        </span>
        <span className="hero-founders__meta">
          <span className="hero-founders__name">{person.name}</span>
          <span className="hero-founders__role">{person.role}</span>
        </span>
      </button>
    </li>
  );
}

export default function HeroSection() {
  const [activePerson, setActivePerson] = useState<ActivePerson | null>(null);

  return (
    <section
      className="hero-intro scroll-mt-24 px-[var(--page-padding)] pt-24 md:pt-[4.5rem]"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="hero-layout hero-layout--founders">
              {site.hero.eyebrow ? (
                <p className="hero-eyebrow hero-eyebrow--banner">{site.hero.eyebrow}</p>
              ) : null}

              <div className="hero-layout__main">
                <div className="hero-founders" aria-label="Founders">
                  <ul className="hero-founders__pair">
                    {heroFounders.map((person) => (
                      <HeroFounder
                        key={person.id}
                        person={person}
                        onOpen={(nextPerson, clickPoint) =>
                          setActivePerson({ person: nextPerson, clickPoint })
                        }
                      />
                    ))}
                  </ul>
                  <p className="hero-founders__proof">{clientExperienceProof.heroExperienceLine}</p>
                </div>

                <div className="hero-copy">
                  <h1 className="hero-headline hero-headline--primary w-full min-w-0 font-display font-normal uppercase tracking-[0.04em]">
                    {site.hero.headline}
                  </h1>
                  <p className="hero-subtitle mt-3 w-full min-w-0 font-sans text-text-secondary">
                    {site.hero.paragraph}
                  </p>
                  <div className="hero-cta-row">
                    <button
                      type="button"
                      className="gradient-button btn-on-accent rounded-full px-5 py-3 text-sm font-medium"
                      onClick={() => scrollToSection(sectionIds.work)}
                    >
                      View Our Work
                    </button>
                    <button
                      type="button"
                      className="estimate-cta-secondary"
                      onClick={() => scrollToSection(sectionIds.contact)}
                    >
                      Start a Project
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ClientExperienceBlock compact />
          </div>
        </article>
      </div>

      <AnimatePresence>
        {activePerson ? (
          <PersonPopover
            key={activePerson.person.id}
            person={activePerson.person}
            clickPoint={activePerson.clickPoint}
            onClose={() => setActivePerson(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
