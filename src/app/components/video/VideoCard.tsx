import { useRef, useState } from "react";
import { Link } from "react-router";
import { Heart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageWithFallback } from "../error/ImageWithFallback";
import { useFavorites } from "../../../hooks/useFavorites";
import { cn, formatDuration } from "../../../lib/utils";
import { getMockViews, getMockPublishedDate } from "../../../lib/metadata";
import type { Video } from "../../../types/video";

interface VideoCardProps {
  video: Video;
  compact?: boolean;
}

export function VideoCard({ video, compact = false }: VideoCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorited = isFavorite(video.id);
  const duration = formatDuration(video.duration);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const onEnter = () => {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  };
  const onLeave = () => {
    setHovering(false);
    const el = videoRef.current;
    if (el) {
      el.pause();
      el.currentTime = 0;
    }
  };

  return (
    <div className="group flex cursor-pointer flex-col gap-3">
      <Link
        to={`/video/${video.id}`}
        className="relative block aspect-video overflow-hidden rounded-xl bg-muted"
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        <ImageWithFallback
          src={video.thumbnail}
          alt={video.title}
          className={cn(
            "size-full object-cover transition-transform duration-300 group-hover:scale-105",
            hovering,
          )}
        />
        {video.previewUrl && (
          <video
            ref={videoRef}
            src={video.previewUrl}
            muted
            loop
            playsInline
            preload="none"
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity",
              hovering ? "opacity-100" : "opacity-0",
            )}
          />
        )}
        {duration && (
          <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium text-white">
            {duration}
          </span>
        )}
        <button
          type="button"
          aria-label={favorited ? "Remove from liked videos" : "Add to liked videos"}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(video);
          }}
          className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
        >
          <Heart className={cn("size-4", favorited && "fill-red-500 text-red-500")} />
        </button>
      </Link>

      <div className="flex gap-3">
        {!compact && (
          <Link to={`/creator/${video.channelId}`} className="shrink-0">
            <Avatar className="size-9">
              <AvatarImage src={video.channelAvatar ?? video.thumbnail} alt={video.channelTitle} />
              <AvatarFallback>{video.channelTitle.charAt(0)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
        <div className="min-w-0">
          <Link to={`/video/${video.id}`}>
            <h3 className="line-clamp-2 text-[16px] font-medium leading-snug text-foreground">{video.title}</h3>
          </Link>
          {!compact && (
            <Link
              to={`/creator/${video.channelId}`}
              className="mt-1 block text-[14px] text-muted-foreground hover:text-foreground"
            >
              {video.channelTitle}
            </Link>
          )}
          <p className="text-[14px] text-muted-foreground">
            {getMockViews(video.id)} · {getMockPublishedDate(video.id)}
          </p>
        </div>
      </div>
    </div>
  );
}
