import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { mainShowreel } from "@/data/reels";
import { sectionIds } from "@/data/site";
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
        <div className="relative aspect-video w-full overflow-hidden bg-black">
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

      <ServicesStrip />

      <section className="px-[var(--page-padding)] pb-4 pt-5 md:pb-5 md:pt-6" aria-label="Introduction">
        <div className="mx-auto max-w-[1440px] text-center">
          <h1
            className="mx-auto max-w-4xl whitespace-nowrap font-display font-normal uppercase leading-[0.92] tracking-[0.04em] text-white"
            style={{
              fontSize: "clamp(0.85rem, 2.85vw, 2.65rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Experience-led. <span className="accent-emerald">AI</span>-enhanced. Production-ready.
          </h1>
          <p
            className="mx-auto mt-3 max-w-2xl font-sans text-text-secondary"
            style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 300 }}
          >
            Commercials, game creatives and cinematic content, produced through a complete expert-led process supported by AI.
          </p>
        </div>
      </section>
    </>
  );
}
