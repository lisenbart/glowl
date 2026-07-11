import { getVideoAllow, getVideoEmbedUrl, type VideoProvider } from "@/lib/videoEmbed";

interface VideoEmbedProps {
  provider: VideoProvider;
  videoId: string;
  title: string;
  autoplay?: boolean;
  className?: string;
}

export default function VideoEmbed({
  provider,
  videoId,
  title,
  autoplay = true,
  className = "absolute inset-0 h-full w-full border-0",
}: VideoEmbedProps) {
  return (
    <iframe
      src={getVideoEmbedUrl(provider, videoId, { autoplay })}
      title={title}
      allow={getVideoAllow(provider)}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      className={className}
    />
  );
}
