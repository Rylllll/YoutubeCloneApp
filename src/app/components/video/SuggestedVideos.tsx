import { Link } from "react-router";
import { Skeleton } from "../ui/skeleton";
import { ImageWithFallback } from "../error/ImageWithFallback";
import { formatDuration } from "../../../lib/utils";
import { getMockViews, getMockPublishedDate } from "../../../lib/metadata";
import type { Video } from "../../../types/video";

interface SuggestedVideosProps {
  videos: Video[];
  isLoading?: boolean;
}

export function SuggestedVideos({ videos, isLoading }: SuggestedVideosProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex gap-2">
            <Skeleton className="aspect-video w-40 shrink-0 rounded-lg" />
            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {videos.map((video) => {
        const duration = formatDuration(video.duration);
        return (
          <Link key={video.id} to={`/video/${video.id}`} className="group flex gap-2">
            <div className="relative w-40 shrink-0 overflow-hidden rounded-lg">
              <ImageWithFallback src={video.thumbnail} alt={video.title} className="aspect-video w-full object-cover" />
              {duration && (
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 text-xs text-white">
                  {duration}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="line-clamp-2 text-sm font-medium text-foreground">{video.title}</h4>
              <p className="mt-1 text-xs text-muted-foreground">{video.channelTitle}</p>
              <p className="text-xs text-muted-foreground">
                {getMockViews(video.id)} · {getMockPublishedDate(video.id)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
