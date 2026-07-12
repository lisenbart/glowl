import { useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence } from "framer-motion";
import { Facebook, Instagram, Linkedin, ChevronRight } from "lucide-react";
import { isSocialChannelActive, socialNetworks, type SocialNetworkId } from "@/data/socials";
import SocialComingSoonModal from "./SocialComingSoonModal";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  );
}

const iconMap: Record<SocialNetworkId, ComponentType<{ className?: string }>> = {
  linkedin: Linkedin,
  whatsapp: WhatsAppIcon,
  facebook: Facebook,
  instagram: Instagram,
  tiktok: TikTokIcon,
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
