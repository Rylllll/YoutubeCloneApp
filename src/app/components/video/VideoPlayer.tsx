import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import { ImageWithFallback } from "../error/ImageWithFallback";
import type { Video } from "../../../types/video";

interface VideoPlayerProps {
  video: Video;
}

export function VideoPlayer({ video }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const sources = video.sources?.length ? video.sources : video.previewUrl ? [{ link: video.previewUrl, width: 0, height: 0, quality: "" }] : [];
  const mainSource = sources[0]?.link;

  useEffect(() => {
    setStatus("loading");
    setAutoplayBlocked(false);
    const el = ref.current;
    if (!el) return;
    el.play().catch(() => setAutoplayBlocked(true));
  }, [video.id, mainSource]);

  if (!mainSource) {
    return (
      <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-xl bg-black">
        <ImageWithFallback src={video.thumbnail} alt={video.title} className="size-full object-cover" />
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-xl bg-black">
      <video
        ref={ref}
        key={video.id}
        src={mainSource}
        poster={video.thumbnail}
        controls
        autoPlay
        playsInline
        className="size-full object-contain"
        onLoadedData={() => setStatus("ready")}
        onCanPlay={() => setStatus("ready")}
        onPlaying={() => {
          setStatus("ready");
          setAutoplayBlocked(false);
        }}
        onError={() => setStatus("error")}
      />

      {status === "loading" && (
        <div className="pointer-events-none absolute inset-0 grid place-items-center bg-black/30">
          <Loader2 className="size-8 animate-spin text-white" />
        </div>
      )}

      {status === "error" && (
        <ImageWithFallback src={video.thumbnail} alt={video.title} className="absolute inset-0 size-full object-cover" />
      )}

      {autoplayBlocked && status !== "error" && (
        <button
          type="button"
          aria-label="Play video"
          onClick={() => {
            setAutoplayBlocked(false);
            ref.current?.play().catch(() => {});
          }}
          className="absolute inset-0 grid place-items-center bg-black/40"
        >
          <span className="grid size-16 place-items-center rounded-full bg-red-600 text-white shadow-lg">
            <Play className="ml-1 size-7 fill-current" />
          </span>
        </button>
      )}
    </AspectRatio>
  );
}
