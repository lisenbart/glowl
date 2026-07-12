import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { mainShowreel } from "@/data/reels";
import { sectionIds, site } from "@/data/site";
import ServicesStrip from "./ServicesStrip";
import VideoEmbed from "./VideoEmbed";

export default function DirectionCards() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <>
      <section
        id={sectionIds.work}
        className="showreel-hero scroll-mt-24 pt-16 md:pt-[4.5rem]"
        aria-label="Showreel"
      >
        <div className="video-stage relative aspect-video w-full overflow-hidden">
          {isPlaying ? (
            <VideoEmbed
              provider={mainShowreel.provider}
              videoId={mainShowreel.id}
              title={mainShowreel.title}
            />
          ) : (
            <>
              <img
                src={mainShowreel.poster}
                alt=""
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="showreel-stage-overlay" aria-hidden="true" />
              <button
                type="button"
                onClick={startPlayback}
                className="showreel-stage-play gradient-button"
                aria-label="Watch reel"
              >
                <Play fill="currentColor" className="showreel-stage-play-icon" aria-hidden="true" />
              </button>
            </>
          )}
          <div className="showreel-hero-fade" aria-hidden="true" />
        </div>
      </section>

      <section className="px-[var(--page-padding)]" aria-label="Introduction">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] text-center">
          <h1 className="hero-headline mx-auto w-full min-w-0 max-w-5xl font-display font-normal uppercase tracking-[0.04em] text-text-primary">
            <span className="hero-headline-row">{site.hero.headlineLine1}</span>{" "}
            <span className="hero-headline-row">
              {site.hero.headlineLine2BeforeAccent}
              <span className="accent-emerald">{site.hero.headlineAccent}</span>.
            </span>
          </h1>
          <p
            className="mx-auto mt-3 max-w-2xl font-sans text-text-secondary"
            style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 300 }}
          >
            {site.hero.paragraph}
          </p>
          <p className="hero-audience-line mx-auto mt-2.5 max-w-2xl">{site.hero.audienceLine}</p>
        </div>
      </section>

      <ServicesStrip />
    </>
  );
}
