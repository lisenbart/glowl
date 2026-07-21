import { site } from "@/data/site";
import { ServicesMarquee } from "./ServicesStrip";

export default function AiPositioningSection() {
  return (
    <section
      className="ai-positioning scroll-mt-24"
      aria-label="How we work with AI"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                The Process Follows the Idea.
              </h2>
              <p className="section-card-header__lead section-card-header__lead--secondary how-support-line">
                {site.aiPositioningLine}
              </p>
            </div>

            <div className="ai-positioning__strip">
              <ServicesMarquee />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
