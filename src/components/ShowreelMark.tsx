import { publicAsset } from "@/lib/publicAsset";

/** "O" mark — used before showreel / capability titles. */
export default function ShowreelMark({ className = "" }: { className?: string }) {
  return (
    <img
      src={publicAsset("/logos/O.png")}
      alt=""
      className={`showreel-mark${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      draggable={false}
    />
  );
}
