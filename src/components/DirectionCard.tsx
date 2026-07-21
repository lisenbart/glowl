import type { ProductionDirection } from "@/data/productionDirections";
import { publicAsset } from "@/lib/publicAsset";

export default function DirectionCard({ direction }: { direction: ProductionDirection }) {
  return (
    <li className="direction-card">
      <div className="direction-card__media">
        <span className="direction-card__plate" aria-hidden="true" />
        {/* Temporary prototype media — replace after approval. */}
        <img
          src={publicAsset(direction.image)}
          alt=""
          className="direction-card__image"
          loading="lazy"
        />
        <div className="direction-card__scrim" aria-hidden="true" />
        <h3 className="direction-card__title">
          <span>{direction.title}</span>
        </h3>
      </div>
      <div className="direction-card__body">
        <p className="direction-card__description">{direction.description}</p>
      </div>
    </li>
  );
}
