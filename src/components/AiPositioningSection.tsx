import { site } from "@/data/site";
import { ServicesMarquee } from "./ServicesStrip";

const productionSpectrum = [
  "Visual Development",
  "World Building",
  "Individual Sequences",
  "Complete Films",
] as const;

export default function AiPositioningSection() {
  return (
    <section
      className="ai-positioning scroll-mt-24"
      aria-label="How we work with AI"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1100px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner ai-positioning__inner">
            <div className="ai-positioning__layout">
              <div className="ai-positioning__copy section-card-header">
                <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                  The Process Follows the Idea.
                </h2>
                <p className="section-card-header__lead section-card-header__lead--secondary how-support-line">
                  {site.aiPositioningLine}
                </p>
              </div>

              <ol className="ai-spectrum" aria-label="Production spectrum">
                {productionSpectrum.map((step, index) => (
                  <li key={step} className="ai-spectrum__step">
                    <span className="ai-spectrum__index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ai-spectrum__label">{step}</span>
                  </li>
                ))}
              </ol>
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
