import { useState, useCallback, useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { mainShowreel } from "@/data/reels";
import { sectionIds } from "@/data/site";
import ServicesStrip from "./ServicesStrip";

export default function DirectionCards() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, [isPlaying]);

  return (
    <>
      <section
        id={sectionIds.work}
        className="showreel-hero scroll-mt-24 pt-16 md:pt-[4.5rem]"
        aria-label="Showreel"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-black">
          {isPlaying ? (
            <video
              ref={videoRef}
              src={mainShowreel.video}
              poster={mainShowreel.poster}
              controls
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
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
                aria-label="Play showreel"
              >
                <Play fill="currentColor" className="showreel-stage-play-icon" aria-hidden="true" />
                <span>Watch Reel</span>
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
            className="mx-auto max-w-4xl whitespace-nowrap font-display font-light uppercase leading-[0.92] tracking-[0.04em] text-white"
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
