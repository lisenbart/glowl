import { useEffect, useState, useCallback, type ReactNode, type MouseEvent } from "react";

/** App path without Vite base (e.g. `/` or `/services`). */
export function getAppPathname(): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  let path = window.location.pathname;
  if (base && path.startsWith(base)) {
    path = path.slice(base.length) || "/";
  }
  if (!path.startsWith("/")) path = `/${path}`;
  return path.replace(/\/$/, "") || "/";
}

/** Build a full URL path including Vite base. */
export function toAppHref(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  const normalized = path.startsWith("/") ? path.slice(1) : path;
  if (!normalized) return base;
  return `${base}${normalized}`;
}

export function navigate(path: string, options?: { replace?: boolean }) {
  const href = toAppHref(path);
  if (options?.replace) {
    window.history.replaceState({}, "", href);
  } else {
    window.history.pushState({}, "", href);
  }
  window.dispatchEvent(new Event("glowl:navigate"));
}

export function useAppPathname(): string {
  const [pathname, setPathname] = useState(getAppPathname);

  useEffect(() => {
    const sync = () => setPathname(getAppPathname());
    window.addEventListener("popstate", sync);
    window.addEventListener("glowl:navigate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("glowl:navigate", sync);
    };
  }, []);

  return pathname;
}

export function AppLink({
  to,
  children,
  className,
  ariaLabel,
  ariaCurrent,
  onNavigate,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaCurrent?: "page" | "true" | "false";
  onNavigate?: () => void;
}) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      event.preventDefault();
      navigate(to);
      onNavigate?.();
    },
    [to, onNavigate],
  );

  return (
    <a
      href={toAppHref(to)}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

/** Scroll to a section on the current page, or go home then scroll. */
export function navigateToSection(sectionId: string, onDone?: () => void) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    onDone?.();
    return;
  }

  try {
    sessionStorage.setItem("glowl-scroll-section", sectionId);
  } catch {
    /* ignore */
  }
  navigate("/");
  onDone?.();
}
