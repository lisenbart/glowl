import { site, sectionIds } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";
import { AppLink, navigateToSection } from "@/lib/routing";
import SocialIconLinks from "./SocialIconLinks";

const socialLinks = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "Vimeo", href: site.vimeo, external: true },
  { label: "YouTube", href: site.youtube, external: true },
];

function SectionFooterLink({ id, label }: { id: string; label: string }) {
  return (
    <a
      href={`#${id}`}
      className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
      onClick={(e) => {
        e.preventDefault();
        navigateToSection(id);
      }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const logoSrc = publicAsset("/logos/glowl-logo-color.png");

  return (
    <footer className="w-full max-w-full min-w-0 px-[var(--page-padding)] pb-24 pt-7 md:pb-12 md:pt-14">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8 lg:gap-12">
              <div className="min-w-0">
                <AppLink
                  to="/"
                  className="inline-flex min-w-0"
                  ariaLabel="GLOWL home"
                  onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  <img
                    src={logoSrc}
                    alt="GLOWL"
                    className="site-footer-logo h-8 w-auto max-w-[11.5rem] object-contain object-left sm:h-9 sm:max-w-[13rem] md:h-10 md:max-w-[14.5rem]"
                    width={1546}
                    height={311}
                  />
                </AppLink>
                <SocialIconLinks className="mt-4 md:mt-5" size="md" />
                <p className="mt-3 hidden max-w-sm text-sm font-light leading-relaxed text-text-secondary md:block">
                  Commercials, game content and films — from creative development to final delivery.
                </p>
                <button
                  type="button"
                  onClick={() => navigateToSection(sectionIds.contact)}
                  className="gradient-button btn-on-accent mt-4 hidden rounded-full px-5 py-2.5 text-xs font-medium tracking-wide sm:inline-flex md:mt-6 md:text-sm"
                >
                  Get a Project Estimate
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-0 md:contents">
                <nav aria-label="Footer navigation">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">Navigate</p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    <li>
                      <AppLink
                        to="/"
                        className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
                        onNavigate={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        Home
                      </AppLink>
                    </li>
                    <li>
                      <AppLink
                        to="/services"
                        className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
                        onNavigate={() => window.scrollTo({ top: 0 })}
                      >
                        Services
                      </AppLink>
                    </li>
                    <li>
                      <SectionFooterLink id={sectionIds.contact} label="Contact" />
                    </li>
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

            <div className="mt-5 flex flex-col gap-2 border-t border-[var(--separator)] pt-4 md:mt-10 md:pt-6">
              <div className="flex flex-row items-center justify-between gap-3 text-[10px] font-light text-text-secondary/80 md:text-[11px]">
                <span className="truncate">{site.locations}</span>
                <span className="shrink-0">
                  © {new Date().getFullYear()} {site.name}
                </span>
              </div>
              <p className="text-[10px] font-light text-text-tertiary md:text-[11px]">
                Co-founded by Adrian Sakhaltuev (Director) and Dmytro Lisenbart (Producer).
              </p>
            </div>
          </div>
        </article>
      </div>
    </footer>
  );
}
