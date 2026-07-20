import { useState, useCallback } from "react";
import { Play } from "lucide-react";
import { mainShowreel } from "@/data/reels";
import { sectionIds, site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";
import { AppLink } from "@/lib/routing";
import FoundersSection from "./FoundersSection";
import VideoEmbed from "./VideoEmbed";

export default function DirectionCards() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  return (
    <>
      <section
        className="hero-intro scroll-mt-24 px-[var(--page-padding)] pt-24 md:pt-[4.5rem]"
        aria-label="Introduction"
      >
        <div className="mx-auto w-full min-w-0 max-w-[920px]">
          <article className="how-ios-card">
            <div className="how-ios-card-inner">
              <div className="hero-layout">
                <div className="hero-media">
                  <img
                    src={publicAsset("/images/header_01.png")}
                    alt=""
                    className="hero-media-image"
                    fetchPriority="high"
                  />
                </div>
                <div className="hero-copy">
                  <h1 className="hero-headline hero-headline--primary w-full min-w-0 font-display font-normal uppercase tracking-[0.04em]">
                    {site.hero.headline}
                  </h1>
                  <p className="hero-subtitle mt-3 w-full min-w-0 font-sans text-text-secondary">
                    {site.hero.paragraph}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <FoundersSection />

      <section
        id={sectionIds.work}
        className="showreel-hero scroll-mt-24 px-[var(--page-padding)]"
        aria-label="Showreel"
      >
        <div className="showreel-card mx-auto w-full min-w-0 max-w-[920px]">
          <div className="showreel-section__frame">
            <div className="showreel-section__header">
              <h2 className="how-col-title how-col-title-cyan showreel-section__title">
                Showreel
              </h2>
            </div>
            <div className="showreel-section__body">
              <div className="showreel-section__media">
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
                </div>
              </div>

              <div className="capabilities-cta capabilities-cta--in-showreel" aria-label="What we make">
                <div className="capabilities-cta__copy">
                  <h3 className="capabilities-cta__title how-col-title how-col-title-cyan">
                    What we make
                  </h3>
                  <p className="capabilities-cta__text">
                    Work by direction — advertising, gaming, film, and social.
                  </p>
                </div>
                <AppLink
                  to="/services"
                  className="gradient-button-emerald btn-on-accent capabilities-cta__button inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium"
                >
                  See what we make →
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
