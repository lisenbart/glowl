export type VideoProvider = "youtube" | "vimeo";

export interface HostedVideo {
  title: string;
  poster: string;
  provider: VideoProvider;
  /** Video ID, or a full YouTube/Vimeo URL */
  id: string;
}

const YOUTUBE_ID_RE = /^[\w-]{6,}$/;
const VIMEO_ID_RE = /^\d+$/;

export function parseVideoId(input: string, provider: VideoProvider): string {
  const trimmed = input.trim();

  if (provider === "youtube") {
    const short = trimmed.match(/youtu\.be\/([\w-]+)/);
    if (short) return short[1];

    const watch = trimmed.match(/[?&]v=([\w-]+)/);
    if (watch) return watch[1];

    const embed = trimmed.match(/youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/);
    if (embed) return embed[1];

    if (YOUTUBE_ID_RE.test(trimmed)) return trimmed;
  }

  if (provider === "vimeo") {
    const fromUrl = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (fromUrl) return fromUrl[1];

    if (VIMEO_ID_RE.test(trimmed)) return trimmed;
  }

  return trimmed;
}

export function getVideoEmbedUrl(
  provider: VideoProvider,
  id: string,
  { autoplay = true }: { autoplay?: boolean } = {}
): string {
  const videoId = parseVideoId(id, provider);
  const autoplayParam = autoplay ? "1" : "0";

  if (provider === "youtube") {
    const params = new URLSearchParams({
      autoplay: autoplayParam,
      rel: "0",
      modestbranding: "1",
      playsinline: "1",
    });
    return `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;
  }

  const params = new URLSearchParams({
    autoplay: autoplayParam,
    title: "0",
    byline: "0",
    portrait: "0",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${videoId}?${params}`;
}

export function getVideoAllow(provider: VideoProvider): string {
  if (provider === "vimeo") {
    return "autoplay; fullscreen; picture-in-picture; clipboard-write";
  }
  return "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
}
