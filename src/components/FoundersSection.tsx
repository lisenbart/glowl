import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { founders, foundersSection, proofStrip, type FounderPerson } from "@/data/founders";
import { sectionIds } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";
import { publicAsset } from "@/lib/publicAsset";
import ClientsModal from "./ClientsModal";
import PersonPopover from "./PersonPopover";
import TrustedBySection from "./TrustedBySection";

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
    <span
      className={`founder-card-avatar founder-card-avatar--large${person.placeholder ? " founder-card-avatar--open-role" : ""}`}
      aria-hidden="true"
    >
      {person.photo ? (
        <img
          src={publicAsset(person.photo)}
          alt=""
          className="founder-card-photo"
          loading="lazy"
        />
      ) : person.initials ? (
        <span className="founder-card-initials">{person.initials}</span>
      ) : person.placeholder ? (
        <img
          src={publicAsset("/logos/O.png")}
          alt=""
          className="founder-card-mark"
          loading="lazy"
          draggable={false}
        />
      ) : (
        <span className="founder-card-silhouette" />
      )}
    </span>
  );

  const body = (
    <>
      {avatar}
      <span className="founder-card-name">{person.name}</span>
      {person.role ? <span className="founder-card-role">{person.role}</span> : null}
      <span className="founder-card-fact">{person.fact}</span>
    </>
  );

  if (person.placeholder) {
    return (
      <li className="how-experience-stat founder-profile-card founder-profile-card--vertical founder-profile-card--open-role">
        <div className="founder-profile-button founder-profile-button--static">
          {body}
        </div>
      </li>
    );
  }

  return (
    <li className="how-experience-stat how-experience-stat--interactive founder-profile-card founder-profile-card--vertical">
      <button
        type="button"
        className="founder-profile-button"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`${person.name}, ${person.role}. ${person.fact}. More.`}
      >
        {body}
        <span className="founder-card-about gradient-button-emerald btn-on-accent" aria-hidden="true">
          More
        </span>
      </button>
    </li>
  );
}

export default function FoundersSection() {
  const [activePerson, setActivePerson] = useState<ActivePerson | null>(null);
  const [clientsOpen, setClientsOpen] = useState(false);

  return (
    <section
      id={sectionIds.founders}
      className="founders-section scroll-mt-24 px-[var(--page-padding)]"
      aria-label="The people behind it"
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

            <div className="proof-strip" aria-label="Studio proof">
              <button
                type="button"
                className="proof-strip__link"
                onClick={() => setClientsOpen(true)}
                aria-haspopup="dialog"
                aria-label={`${proofStrip.projectsLabel}. View clients.`}
              >
                {proofStrip.projectsLabel}
              </button>
              <span className="proof-strip__sep" aria-hidden="true">
                ·
              </span>
              <span>{proofStrip.awardsLabel}</span>
              <span className="proof-strip__sep" aria-hidden="true">
                ·
              </span>
              <span>{proofStrip.locationsLabel}</span>
            </div>

            <TrustedBySection />
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
        {clientsOpen ? <ClientsModal onClose={() => setClientsOpen(false)} /> : null}
      </AnimatePresence>
    </section>
  );
}
