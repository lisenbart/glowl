/** Decorative emoji for section titles — keep outside gradient text fill. */
export default function TitleEmoji({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span
      className={`section-title-emoji${className ? ` ${className}` : ""}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
