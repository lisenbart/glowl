import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence } from "framer-motion";
import { Linkedin, ChevronRight } from "lucide-react";
import { isSocialChannelActive, socialNetworks, type SocialNetworkId } from "@/data/socials";
import SocialComingSoonModal from "./SocialComingSoonModal";

function VimeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22.4 7.15c-.1 2.2-1.64 5.22-4.62 9.05-3.08 4-5.68 6-7.8 6-1.32 0-2.44-1.22-3.36-3.65L5.05 12.1C4.4 9.9 3.68 8.8 2.9 8.8c-.17 0-.77.36-1.8 1.08L0 8.4C1.23 7.33 2.44 6.26 3.63 5.2c1.63-1.4 2.85-2.14 3.66-2.2 1.9-.19 3.07 1.12 3.51 3.9.48 3 1.1 4.85 1.88 5.56.7.66 1.33.98 1.88.98.53 0 1.33-.84 2.4-2.52.96-1.57 1.47-2.77 1.53-3.6.12-1.37-.4-2.06-1.54-2.06-.55 0-1.11.12-1.7.37 1.13-3.7 3.28-5.5 6.46-5.4 2.35.07 3.46 1.6 3.32 4.58z" />
    </svg>
  );
}

const iconMap: Record<SocialNetworkId, ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  vimeo: VimeoIcon,
};

interface SocialIconLinksProps {
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md";
  layout?: "row" | "stack";
  onItemClick?: () => void;
}

export default function SocialIconLinks({
  className = "",
  iconClassName = "",
  size = "sm",
  layout = "row",
  onItemClick,
}: SocialIconLinksProps) {
  const [pendingChannel, setPendingChannel] = useState<string | null>(null);
  const linkClass = `social-icon-link ${size === "md" ? "social-icon-link--md" : ""}`.trim();
  const stackClass = `header-connect-social-item ${size === "md" ? "header-connect-social-item--md" : ""}`.trim();
  const iconClass = iconClassName || "social-icon-link-svg";

  const handleComingSoon = (label: string) => {
    onItemClick?.();
    setPendingChannel(label);
  };

  const renderNetwork = (network: (typeof socialNetworks)[number]) => {
    const Icon = iconMap[network.id];
    const isActive = isSocialChannelActive(network.id);

    if (layout === "stack") {
      if (isActive) {
        return (
          <a
            key={network.id}
            href={network.href}
            className={stackClass}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={network.label}
            role="menuitem"
            onClick={onItemClick}
          >
            <span className="header-connect-item-icon" aria-hidden="true">
              <Icon className={iconClass} />
            </span>
            <span className="header-connect-item-copy">
              <span className="header-connect-item-title">{network.label}</span>
              <span className="header-connect-item-sub">Open channel</span>
            </span>
            <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        );
      }

      return (
        <button
          key={network.id}
          type="button"
          className={stackClass}
          aria-label={`${network.label} — coming soon`}
          role="menuitem"
          onClick={() => handleComingSoon(network.label)}
        >
          <span className="header-connect-item-icon" aria-hidden="true">
            <Icon className={iconClass} />
          </span>
          <span className="header-connect-item-copy">
            <span className="header-connect-item-title">{network.label}</span>
            <span className="header-connect-item-sub">Coming soon</span>
          </span>
          <ChevronRight className="header-connect-item-chevron" size={16} strokeWidth={1.75} aria-hidden="true" />
        </button>
      );
    }

    if (isActive) {
      return (
        <a
          key={network.id}
          href={network.href}
          className={linkClass}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={network.label}
          role="listitem"
          onClick={onItemClick}
        >
          <Icon className={iconClass} />
        </a>
      );
    }

    return (
      <button
        key={network.id}
        type="button"
        className={linkClass}
        aria-label={`${network.label} — coming soon`}
        role="listitem"
        onClick={() => handleComingSoon(network.label)}
      >
        <Icon className={iconClass} />
      </button>
    );
  };

  return (
    <>
      <div
        className={`${layout === "stack" ? "header-connect-social-list" : `social-icons-row ${size === "md" ? "social-icons-row--md" : ""}`} ${className}`.trim()}
        role={layout === "stack" ? "group" : "list"}
        aria-label="Social media"
      >
        {socialNetworks.map((network) => renderNetwork(network))}
      </div>

      <AnimatePresence>
        {pendingChannel && (
          <SocialComingSoonModal channelLabel={pendingChannel} onClose={() => setPendingChannel(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
