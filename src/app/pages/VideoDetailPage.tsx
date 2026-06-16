import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useState } from "react";
import { ThumbsUp } from "lucide-react";
import { VideoPlayer } from "../components/video/VideoPlayer";
import { SuggestedVideos } from "../components/video/SuggestedVideos";
import { ErrorState } from "../components/shared/ErrorState";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Separator } from "../components/ui/separator";
import { useVideo, useSuggestedVideos } from "../../hooks/useVideo";
import { useFavorites } from "../../hooks/useFavorites";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import { cn } from "../../lib/utils";
import { getMockViews, getMockPublishedDate, getMockSubscribers } from "../../lib/metadata";

export function VideoDetailPage() {
  const { id = "" } = useParams();
  const { data: video, isLoading, isError, refetch } = useVideo(id);
  const suggested = useSuggestedVideos(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentlyViewed();
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (video) addRecent(video);
  }, [video, addRecent]);

  if (isError) return <ErrorState onRetry={refetch} />;

  return (
    <div className="mx-auto flex max-w-[1600px] flex-col gap-6 lg:flex-row">
      <div className="min-w-0 flex-1">
        {isLoading || !video ? (
          <>
            <Skeleton className="aspect-video w-full rounded-xl" />
            <Skeleton className="mt-4 h-6 w-3/4" />
            <Skeleton className="mt-3 h-24 w-full" />
          </>
        ) : (
          <>
            <VideoPlayer video={video} />

            <h1 className="mt-4 text-[18px] font-medium text-foreground">{video.title}</h1>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link to={`/creator/${video.channelId}`} className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={video.channelAvatar ?? video.thumbnail} alt={video.channelTitle} />
                    <AvatarFallback>{video.channelTitle.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[14px] font-medium text-foreground">{video.channelTitle}</p>
                    <p className="text-xs text-muted-foreground">{getMockSubscribers(video.channelId)}</p>
                  </div>
                </Link>
                <Button
                  onClick={() => setSubscribed((s) => !s)}
                  variant={subscribed ? "secondary" : "default"}
                  className="ml-2 rounded-full"
                >
                  {subscribed ? "Subscribed" : "Subscribe"}
                </Button>
              </div>

              <Button
                variant="secondary"
                className="rounded-full gap-2"
                onClick={() => toggleFavorite(video)}
              >
                <ThumbsUp className={cn("size-4", isFavorite(video.id) && "fill-current")} />
                {isFavorite(video.id) ? "Liked" : "Like"}
              </Button>
            </div>

            <div className="mt-4 rounded-xl bg-muted/60 p-4 text-sm">
              <p className="font-medium text-foreground">
                {getMockViews(video.id)} · {getMockPublishedDate(video.id)}
              </p>
              <p className="mt-2 whitespace-pre-line text-foreground">
                Watch “{video.title}” by {video.channelTitle}.{" "}
                {[video.quality, video.width && video.height ? `${video.width}×${video.height}` : null]
                  .filter(Boolean)
                  .join(" · ")}
                {video.sourceUrl ? (
                  <>
                    {" "}
                    Source:{" "}
                    <a className="text-blue-500 hover:underline" href={video.sourceUrl} target="_blank" rel="noreferrer">
                      Pexels
                    </a>
                    .
                  </>
                ) : null}
              </p>
            </div>
          </>
        )}
      </div>

      <aside className="w-full shrink-0 lg:w-96">
        <h2 className="mb-3 text-foreground">Up next</h2>
        <Separator className="mb-3" />
        <SuggestedVideos videos={suggested.data ?? []} isLoading={suggested.isLoading} />
      </aside>
    </div>
  );
}
