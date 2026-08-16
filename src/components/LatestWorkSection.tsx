import { useCallback, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { latestWorkProjects, latestWorkSection } from "@/data/latestWork";
import { sectionIds } from "@/data/site";
import VideoEmbed from "./VideoEmbed";

export default function LatestWorkSection() {
  const projects = latestWorkProjects;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const project = projects[activeIndex] ?? projects[0];
  const hasMultiple = projects.length > 1;

  const startPlayback = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const showProject = useCallback((index: number) => {
    setActiveIndex(index);
    setIsPlaying(false);
  }, []);

  if (!project) return null;

  return (
    <section
      id={sectionIds.latest}
      className="showreel-hero latest-work latest-work--lead scroll-mt-24"
      aria-labelledby="latest-work-heading"
    >
      <div className="showreel-card mx-auto w-full min-w-0 max-w-[1100px]">
        <div className="showreel-section__frame">
          <div className="showreel-section__header latest-work__header">
            <h2
              id="latest-work-heading"
              className="how-col-title how-col-title-cyan showreel-section__title"
            >
              {latestWorkSection.title}
            </h2>
            <p className="latest-work__eyebrow how-support-line">{latestWorkSection.eyebrow}</p>
          </div>

          <div className="latest-work__stage-wrap showreel-section__media">
            <div className="video-stage relative aspect-video w-full overflow-hidden">
              {isPlaying ? (
                <VideoEmbed
                  provider={project.video.provider}
                  videoId={project.video.id}
                  title={project.video.title}
                />
              ) : (
                <>
                  {project.video.poster ? (
                    <img
                      src={project.video.poster}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="latest-work__poster-fallback" aria-hidden="true" />
                  )}
                  <div className="showreel-stage-overlay" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={startPlayback}
                    className="showreel-stage-play"
                    aria-label={`Play ${project.title}`}
                  >
                    <Play fill="currentColor" className="showreel-stage-play-icon" aria-hidden="true" />
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="latest-work__meta">
            <h3 className="latest-work__title">{project.title}</h3>
            <p className="latest-work__subtitle">{project.subtitle}</p>

            {hasMultiple ? (
              <div className="latest-work__nav" role="group" aria-label="More projects">
                <button
                  type="button"
                  className="latest-work__nav-btn"
                  aria-label="Previous project"
                  disabled={activeIndex === 0}
                  onClick={() => showProject(Math.max(0, activeIndex - 1))}
                >
                  <ChevronLeft size={18} strokeWidth={2} aria-hidden="true" />
                </button>
                <span className="latest-work__nav-count">
                  {activeIndex + 1} / {projects.length}
                </span>
                <button
                  type="button"
                  className="latest-work__nav-btn"
                  aria-label="Next project"
                  disabled={activeIndex >= projects.length - 1}
                  onClick={() => showProject(Math.min(projects.length - 1, activeIndex + 1))}
                >
                  <ChevronRight size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
