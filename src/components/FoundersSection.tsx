import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";
import { heroFounders, type FounderPerson } from "@/data/founders";
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
        /* ignore */
      }
      void video.play().catch(() => {
        playedThisVisit = false;
      });
    };

    const onEnded = () => {
      freezeOnLastFrame();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || cancelled) return;

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
      preload="metadata"
      loop={false}
    />
  );
}

function FounderCard({
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
                loading="lazy"
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

export default function FoundersSection() {
  const [activePerson, setActivePerson] = useState<ActivePerson | null>(null);
  const [adrian, dmytro] = heroFounders;

  return (
    <section
      id="founders"
      className="founders-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-labelledby="founders-heading"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1100px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header founders-section__header">
              <h2
                id="founders-heading"
                className="how-col-title how-col-title-cyan section-card-header__title"
              >
                The people behind the work
              </h2>
              <p className="section-card-header__lead how-support-line">
                Direction and producing under one standard — from first idea to final frame.
              </p>
            </div>

            <ul className="hero-frame__founders founders-section__pair" aria-label="Founders">
              {adrian ? (
                <FounderCard
                  person={adrian}
                  videoStartDelayMs={0}
                  onOpen={(nextPerson, clickPoint) =>
                    setActivePerson({ person: nextPerson, clickPoint })
                  }
                />
              ) : null}
              {dmytro ? (
                <FounderCard
                  person={dmytro}
                  videoStartDelayMs={DMYTRO_START_DELAY_MS}
                  onOpen={(nextPerson, clickPoint) =>
                    setActivePerson({ person: nextPerson, clickPoint })
                  }
                />
              ) : null}
            </ul>

            <ClientExperienceBlock />
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
