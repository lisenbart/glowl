/**
 * Standalone Team section — not mounted on Home after the Hero/Contact redistribution.
 * Retained so founder profile data, cards and popovers can be reused later.
 */
import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { founders, foundersSection, type FounderPerson } from "@/data/founders";
import { sectionIds } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";
import { publicAsset } from "@/lib/publicAsset";
import PersonPopover from "./PersonPopover";

type ActivePerson = {
  person: FounderPerson;
  clickPoint: ClickPoint;
};

function FounderCard({
  person,
  onOpen,
}: {
  person: FounderPerson;
  onOpen: (person: FounderPerson, clickPoint: ClickPoint) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen(person, { x: event.clientX, y: event.clientY });
  };

  const avatar = (
    <span className="founder-card-avatar founder-card-avatar--large" aria-hidden="true">
      {person.photo ? (
        <img
          src={publicAsset(person.photo)}
          alt=""
          className="founder-card-photo"
          loading="lazy"
        />
      ) : (
        <span className="founder-card-initials">{person.initials}</span>
      )}
    </span>
  );

  return (
    <li className="how-experience-stat how-experience-stat--interactive founder-profile-card founder-profile-card--vertical">
      <button
        type="button"
        className="founder-profile-button"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`${person.name}, ${person.role}. ${person.fact}. More.`}
      >
        {avatar}
        <span className="founder-card-name">{person.name}</span>
        {person.role ? <span className="founder-card-role">{person.role}</span> : null}
        <span className="founder-card-fact">{person.fact}</span>
        <span className="founder-card-about gradient-button-emerald btn-on-accent" aria-hidden="true">
          More
        </span>
      </button>
    </li>
  );
}

export default function FoundersSection() {
  const [activePerson, setActivePerson] = useState<ActivePerson | null>(null);

  return (
    <section
      id={sectionIds.founders}
      className="founders-section scroll-mt-24 px-[var(--page-padding)]"
      aria-label={foundersSection.title}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title founders-title">
                {foundersSection.title}
              </h2>
            </div>

            <ul className="founders-grid">
              {founders.map((person) => (
                <FounderCard
                  key={person.id}
                  person={person}
                  onOpen={(nextPerson, clickPoint) => setActivePerson({ person: nextPerson, clickPoint })}
                />
              ))}
            </ul>
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
