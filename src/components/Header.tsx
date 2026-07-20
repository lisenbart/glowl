import { useEffect, useState } from "react";
import { Moon, Send, Sun } from "lucide-react";
import { sectionIds, site } from "@/data/site";
import { useTheme } from "@/hooks/useTheme";
import { publicAsset } from "@/lib/publicAsset";
import { AppLink, navigateToSection, useAppPathname } from "@/lib/routing";
import HeaderConnectMenu from "./HeaderConnectMenu";
import SocialIconLinks from "./SocialIconLinks";

function SectionNavLink({
  id,
  label,
  className,
}: {
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigateToSection(id);
      }}
    >
      {label}
    </a>
  );
}

function navCapsuleClass(active: boolean, page = false) {
  const activeClass = !active
    ? ""
    : page
      ? " site-header-capsule--active site-header-capsule--page"
      : " site-header-capsule--active";
  return `site-header-capsule${activeClass}`;
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = useAppPathname();
  const isHome = pathname === "/";
  const isServices = pathname === "/services";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHomeTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const logoSrc =
    theme === "light"
      ? publicAsset("/logos/glowl-logo-black.png")
      : publicAsset("/logos/glowl-logo-white.png");

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full max-w-full overflow-x-clip">
      <nav
        className={`site-header-nav transition-all duration-300${scrolled ? " site-header-nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="site-header-bar mx-auto min-h-[4.25rem] w-full min-w-0 max-w-[1440px] px-[var(--page-padding)] py-2.5 md:min-h-16 md:py-3">
          <div className="site-header-bar__start flex shrink-0 items-center gap-2 md:gap-3">
            <button
              type="button"
              className="theme-toggle site-header-desktop-only shrink-0"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <AppLink
              to="/"
              className="relative z-10 flex min-w-0 shrink items-center gap-2.5 md:gap-4"
              ariaLabel="GLOWL home"
              onNavigate={goHomeTop}
            >
              <img
                src={logoSrc}
                alt="GLOWL"
                className="h-[2.65rem] w-auto max-w-[6.75rem] shrink-0 object-contain object-left md:h-[2.2rem] md:max-w-none"
                width={2100}
                height={795}
              />
              <span
                className="site-header-tagline site-header-desktop-only font-sans flex-col justify-center gap-px leading-none uppercase"
                style={{
                  fontSize: "clamp(7px, 1.05vw, 10px)",
                  letterSpacing: "0.14em",
                  maxHeight: "2.2rem",
                }}
              >
                <span className="whitespace-nowrap">{site.tagline.line1}</span>
                <span className="whitespace-nowrap">{site.tagline.line2}</span>
              </span>
            </AppLink>
          </div>

          <div className="site-header-bar__free site-header-desktop-only">
            <ul className="site-header-capsules site-header-capsules--bar flex items-center gap-0.5 sm:gap-1 xl:gap-1.5">
              <li>
                <AppLink
                  to="/"
                  className={navCapsuleClass(isHome)}
                  ariaCurrent={isHome ? "page" : undefined}
                  onNavigate={goHomeTop}
                >
                  Home
                </AppLink>
              </li>
              <li>
                <AppLink
                  to="/services"
                  className={navCapsuleClass(isServices, true)}
                  ariaCurrent={isServices ? "page" : undefined}
                  onNavigate={() => window.scrollTo({ top: 0 })}
                >
                  Services
                </AppLink>
              </li>
              <li>
                <SectionNavLink
                  id={sectionIds.contact}
                  label="Contact"
                  className={navCapsuleClass(false)}
                />
              </li>
            </ul>
          </div>

          <div className="site-header-bar__end header-contacts flex shrink-0 items-center justify-end gap-1.5 md:gap-2">
            <div className="header-desktop-social flex min-w-0 items-center gap-1.5 lg:gap-2">
              <SocialIconLinks className="min-w-0" />
              <a
                href={`mailto:${site.email}`}
                className="theme-toggle shrink-0"
                aria-label={`Email us at ${site.email}`}
              >
                <Send size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
            <HeaderConnectMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
