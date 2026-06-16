import { VideoCard } from "./VideoCard";
import { VideoCardSkeleton } from "./VideoCardSkeleton";
import { EmptyState } from "../shared/EmptyState";
import { ErrorState } from "../shared/ErrorState";
import { PAGE_SIZE } from "../../../lib/constants";
import type { Video } from "../../../types/video";

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyMessage?: string;
  compact?: boolean;
}

export function VideoGrid({
  videos,
  isLoading,
  isError,
  onRetry,
  emptyTitle,
  emptyMessage,
  compact,
}: VideoGridProps) {
  if (isError) return <ErrorState onRetry={onRetry} />;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) return <EmptyState title={emptyTitle} message={emptyMessage} />;

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} compact={compact} />
      ))}
    </div>
  );
}
