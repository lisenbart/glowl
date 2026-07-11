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
      className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
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
    <footer className="px-[var(--page-padding)] pb-24 pt-7 md:pb-12 md:pt-14">
      <div className="mx-auto max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8 lg:gap-12">
              <div className="min-w-0">
                <a
                  href="#top"
                  className="inline-flex min-w-0 flex-col gap-1 md:gap-2"
                  aria-label="GLOWL home"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <span
                    className="font-display font-extralight uppercase leading-none tracking-[0.1em] text-text-primary"
                    style={{ fontSize: "clamp(1.35rem, 3vw, 2rem)" }}
                  >
                    GLOWL
                  </span>
                  <span
                    className="font-sans uppercase leading-snug text-text-tertiary"
                    style={{ fontSize: "clamp(8px, 1vw, 11px)", letterSpacing: "0.14em" }}
                  >
                    Creative partner for AI-era moving image
                  </span>
                </a>
                <p className="mt-3 hidden max-w-sm text-sm font-light leading-relaxed text-text-secondary md:block">
                  Commercials, gaming creatives and cinematic content — produced through an expert-led process
                  supported by AI.
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection(sectionIds.contact)}
                  className="gradient-button btn-on-accent mt-4 hidden rounded-full px-5 py-2.5 text-xs font-medium tracking-wide sm:inline-flex md:mt-6 md:text-sm"
                >
                  Get a Project Estimate
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-0 md:contents">
                <nav aria-label="Footer navigation">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">Navigate</p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    {navLinks.map((link) => (
                      <li key={link.id}>
                        <FooterLink id={link.id} label={link.label} />
                      </li>
                    ))}
                  </ul>
                </nav>

                <nav aria-label="Social links">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">Connect</p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
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
            </div>

            <div className="mt-5 flex flex-row items-center justify-between gap-3 border-t border-[var(--separator)] pt-4 text-[10px] font-light text-text-secondary/80 md:mt-10 md:pt-6 md:text-[11px]">
              <span className="truncate">{site.locations}</span>
              <span className="shrink-0">© {new Date().getFullYear()} {site.name}</span>
            </div>
          </div>
        </article>
      </div>
    </footer>
  );
}
