import { site, scrollToSection, sectionIds } from "@/data/site";

const navLinks = [
  { id: sectionIds.work, label: "Work" },
  { id: sectionIds.services, label: "Services" },
  { id: sectionIds.process, label: "Process" },
  { id: sectionIds.contact, label: "Contact" },
];

const socialLinks = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "LinkedIn", href: site.linkedin, external: true },
  { label: "Vimeo", href: site.vimeo, external: true },
  { label: "YouTube", href: site.youtube, external: true },
];

function FooterLink({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="text-sm font-light text-text-secondary transition-colors hover:text-white"
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id);
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="px-[var(--page-padding)] pb-24 pt-10 md:pb-12 md:pt-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="glass-panel-glow overflow-hidden rounded-[24px] md:rounded-[32px]">
          <div className="glass-panel px-6 py-8 md:px-10 md:py-10">
            <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8 lg:gap-12">
              <div className="min-w-0">
                <a
                  href="#top"
                  className="inline-flex min-w-0 flex-col gap-2"
                  aria-label="GLOWL home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <span
                    className="font-display font-extralight uppercase leading-none tracking-[0.1em] text-white"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
                  >
                    GLOWL
                  </span>
                  <span
                    className="font-sans uppercase leading-snug text-white/50"
                    style={{ fontSize: "clamp(9px, 1vw, 11px)", letterSpacing: "0.14em" }}
                  >
                    Creative partner for AI-era moving image
                  </span>
                </a>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-text-secondary">
                  Commercials, gaming creatives and cinematic content — produced through an expert-led process
                  supported by AI.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection(sectionIds.contact)}
                  className="gradient-button mt-6 rounded-full px-5 py-2.5 text-xs font-medium tracking-wide text-white md:text-sm"
                >
                  Get a Project Estimate
                </button>
              </div>

              <nav aria-label="Footer navigation">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">Navigate</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <FooterLink id={link.id} label={link.label} />
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Social links">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">Connect</p>
                <ul className="mt-4 flex flex-col gap-3">
                  {socialLinks.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm font-light text-text-secondary transition-colors hover:text-white"
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/8 pt-6 text-[11px] font-light text-text-secondary/60 md:flex-row md:items-center md:justify-between">
              <span>{site.locations}</span>
              <span>© {new Date().getFullYear()} {site.name}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
