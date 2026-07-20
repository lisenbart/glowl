import { featuredProjects, featuredProjectsSection } from "@/data/featuredProjects";
import ProjectCard from "./ProjectCard";

/**
 * Future case-study section — not mounted on Home or Services.
 * Kept for when real project content replaces the placeholder templates.
 */
export default function SelectedWorkSection() {
  return (
    <section className="selected-work scroll-mt-24 px-[var(--page-padding)]" aria-label="Selected work">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="section-card-header">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                {featuredProjectsSection.title}
              </h2>
              <p className="section-card-header__lead how-support-line">
                {featuredProjectsSection.lead}
              </p>
            </div>
            <ul className="selected-work-grid">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
