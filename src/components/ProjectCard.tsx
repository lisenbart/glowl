import type { FeaturedProject } from "@/data/featuredProjects";
import { publicAsset } from "@/lib/publicAsset";

export default function ProjectCard({ project }: { project: FeaturedProject }) {
  return (
    <li className="project-card">
      <div className="project-card__media" aria-hidden="true">
        <img
          src={publicAsset(project.image)}
          alt=""
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__scrim" />
      </div>
      <div className="project-card__body">
        <p className="project-card__eyebrow">{project.eyebrow}</p>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <p className="project-card__role">{project.role}</p>
      </div>
    </li>
  );
}
