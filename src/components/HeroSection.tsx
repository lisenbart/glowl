import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
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

const DMYTRO_START_DELAY_MS = 1000;

function FounderPortraitVideo({
  src,
  poster,
  startDelayMs,
}: {
  src: string;
  poster?: string;
  startDelayMs: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let startTimer = 0;
    /** True after we start (or finish) a play for the current visit into view. */
    let playedThisVisit = false;
    let isInView = false;

    const clearStartTimer = () => {
      window.clearTimeout(startTimer);
      startTimer = 0;
    };

    const freezeOnLastFrame = () => {
      video.pause();
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.05);
        } catch {
          /* ignore */
        }
      }
    };

    const playOnce = () => {
      if (cancelled || !isInView || playedThisVisit) return;
      playedThisVisit = true;
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }
      void video.play().catch(() => {
        // Allow a later retry only if still in view and this play never started.
        playedThisVisit = false;
      });
    };

    const onEnded = () => {
      freezeOnLastFrame();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || cancelled) return;

        // threshold 0: true while any pixel is visible; false only when fully gone.
        if (entry.isIntersecting) {
          if (isInView) return;
          isInView = true;
          if (playedThisVisit) return;
          clearStartTimer();
          if (startDelayMs > 0) {
            startTimer = window.setTimeout(playOnce, startDelayMs);
          } else {
            playOnce();
          }
          return;
        }

        // Fully left the viewport — arm for a fresh single play on next entry.
        isInView = false;
        clearStartTimer();
        playedThisVisit = false;
        video.pause();
        try {
          video.currentTime = 0;
        } catch {
          /* ignore */
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    video.loop = false;
    video.addEventListener("ended", onEnded);
    observer.observe(video);

    return () => {
      cancelled = true;
      clearStartTimer();
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      video.pause();
    };
  }, [src, startDelayMs]);

  return (
    <video
      ref={videoRef}
      className="hero-founders__photo hero-founders__video"
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      loop={false}
    />
  );
}

function HeroFounder({
  person,
  videoStartDelayMs = 0,
  onOpen,
}: {
  person: FounderPerson;
  videoStartDelayMs?: number;
  onOpen: (person: FounderPerson, clickPoint: ClickPoint) => void;
}) {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen(person, { x: event.clientX, y: event.clientY });
  };

  return (
    <li className="hero-founders__person">
      <span className="hero-founders__plate" aria-hidden="true" />
      <button
        type="button"
        className="hero-founders__trigger"
        onClick={handleClick}
        aria-haspopup="dialog"
        aria-label={`${person.name}, ${person.role}. Open profile.`}
      >
        <span className="hero-founders__media" aria-hidden="true">
          <span className="hero-founders__portrait">
            {person.video ? (
              <FounderPortraitVideo
                src={publicAsset(person.video)}
                poster={person.photo ? publicAsset(person.photo) : undefined}
                startDelayMs={videoStartDelayMs}
              />
            ) : person.photo ? (
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
          <span className="hero-founders__info">
            <Info size={14} strokeWidth={2.5} aria-hidden="true" />
          </span>
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
  const [adrian, dmytro] = heroFounders;

  return (
    <section
      className="hero-intro scroll-mt-24 px-[var(--page-padding)] pt-24 md:pt-[4.5rem]"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1100px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="hero-frame">
              <div className="hero-frame__copy">
                {site.tagline ? (
                  <p className="hero-eyebrow hero-eyebrow--banner hero-eyebrow--lead">
                    {site.tagline}
                  </p>
                ) : null}
                <h1 className="hero-headline hero-headline--primary w-full min-w-0 font-display">
                  <span className="hero-headline__line">Every Process.</span>
                  <span className="hero-headline__line">One Standard.</span>
                </h1>
                <p className="hero-subtitle mt-3 w-full min-w-0 font-sans">
                  {site.hero.paragraph}
                </p>
                <div className="hero-cta-row">
                  <button
                    type="button"
                    className="gradient-button btn-on-accent px-5 py-3 text-sm font-medium"
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

              <ul className="hero-frame__founders" aria-label="Founders">
                {adrian ? (
                  <HeroFounder
                    person={adrian}
                    videoStartDelayMs={0}
                    onOpen={(nextPerson, clickPoint) =>
                      setActivePerson({ person: nextPerson, clickPoint })
                    }
                  />
                ) : null}
                {dmytro ? (
                  <HeroFounder
                    person={dmytro}
                    videoStartDelayMs={DMYTRO_START_DELAY_MS}
                    onOpen={(nextPerson, clickPoint) =>
                      setActivePerson({ person: nextPerson, clickPoint })
                    }
                  />
                ) : null}
              </ul>

              <ul className="hero-proof-rail" aria-label="Experience">
                {clientExperienceProof.heroProofFacts.map((fact) => (
                  <li key={fact} className="hero-proof-rail__item">
                    {fact}
                  </li>
                ))}
              </ul>
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
