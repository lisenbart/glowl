import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { mainShowreel } from "@/data/reels";
import { sectionIds } from "@/data/site";
import { AppLink } from "@/lib/routing";
import VideoEmbed from "./VideoEmbed";

export default function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <section
      id={sectionIds.work}
      className="showreel-hero scroll-mt-24"
      aria-label="Showreel"
    >
      <div className="showreel-card mx-auto w-full min-w-0 max-w-[1100px]">
        <div className="showreel-section__frame">
          <div className="showreel-section__header">
            <h2 className="how-col-title how-col-title-cyan showreel-section__title">Showreel</h2>
          </div>

          <div className="showreel-compose showreel-section__body">
            <div className="showreel-stage-wrap showreel-section__media">
              <div className="video-stage relative aspect-video w-full overflow-hidden">
                {isPlaying ? (
                  <VideoEmbed
                    provider={mainShowreel.provider}
                    videoId={mainShowreel.id}
                    title={mainShowreel.title}
                  />
                ) : (
                  <>
                    {/* Temporary showreel poster — replace when final reel assets are ready. */}
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
                      className="showreel-stage-play"
                      aria-label="Watch reel"
                    >
                      <Play fill="currentColor" className="showreel-stage-play-icon" aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>
            </div>

            <div
              className="showreel-companion how-ios-card"
              aria-label="What we make"
            >
              <div className="showreel-companion__inner how-ios-card-inner">
                <div className="capabilities-cta__copy">
                  <h3 className="capabilities-cta__title how-col-title">
                    What We Make
                  </h3>
                  <p className="capabilities-cta__text">
                    Advertising, gaming and cinematic work — shaped around the idea, the audience and the
                    brief.
                  </p>
                </div>
                <AppLink
                  to="/services"
                  className="gradient-button-emerald capabilities-cta__button inline-flex items-center justify-center px-5 py-3 text-sm font-medium"
                  onNavigate={() => window.scrollTo({ top: 0 })}
                >
                  Explore Our Capabilities
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
