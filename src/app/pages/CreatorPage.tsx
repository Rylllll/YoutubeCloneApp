import { useParams } from "react-router";
import { CreatorHeader } from "../components/creator/CreatorHeader";
import { VideoGrid } from "../components/video/VideoGrid";
import { ErrorState } from "../components/shared/ErrorState";
import { EmptyState } from "../components/shared/EmptyState";
import { Skeleton } from "../components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import { useCreator, useCreatorVideos } from "../../hooks/useCreator";

const CREATOR_TABS = ["Home", "Videos", "Playlists", "Community", "About"] as const;

export function CreatorPage() {
  const { id = "" } = useParams();
  const creator = useCreator(id);
  const videos = useCreatorVideos(id);

  if (creator.isError) return <ErrorState onRetry={creator.refetch} />;
  if (!creator.isLoading && !creator.data) return <EmptyState title="Creator not found" />;

  return (
    <section className="mx-auto max-w-[1600px]">
      {creator.isLoading || !creator.data ? (
        <div className="space-y-4">
          <Skeleton className="h-44 w-full rounded-xl" />
          <div className="flex items-center gap-4">
            <Skeleton className="size-24 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      ) : (
        <CreatorHeader creator={creator.data} />
      )}

      <Tabs defaultValue="Videos" className="mt-6">
        <TabsList className="h-auto w-full justify-start gap-2 rounded-none border-b border-border bg-transparent p-0">
          {CREATOR_TABS.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="rounded-none border-b-2 border-transparent px-2 pb-3 pt-1 data-[state=active]:border-b-foreground "
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="Videos" className="mt-6">
          <VideoGrid
            videos={videos.data ?? []}
            isLoading={videos.isLoading}
            isError={videos.isError}
            onRetry={videos.refetch}
            emptyTitle="No uploads yet"
          />
        </TabsContent>

        <TabsContent value="Home" className="mt-6">
          <VideoGrid
            videos={(videos.data ?? []).slice(0, 8)}
            isLoading={videos.isLoading}
            emptyTitle="Nothing here yet"
          />
        </TabsContent>

        {(["Playlists", "Community", "About"] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <EmptyState title={`${tab} coming soon`} message="This section isn't available for this creator yet." />
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
