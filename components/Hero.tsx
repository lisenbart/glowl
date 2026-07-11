export default function Hero() {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden"
      aria-label="Hero"
    >
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          minHeight: "clamp(520px, 78vh, 900px)",
          aspectRatio: "16 / 9",
          maxHeight: "900px",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030510]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 55%, rgba(3,5,16,0.4) 80%, #030510 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
