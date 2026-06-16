import { useSearchParams } from "react-router";
import { CategoryFilter } from "../components/video/CategoryFilter";
import { VideoGrid } from "../components/video/VideoGrid";
import { InfiniteScrollSentinel } from "../components/shared/InfiniteScrollSentinel";
import { useVideos } from "../../hooks/useVideos";
import { useSearch } from "../../hooks/useSearch";
import { useDebounce } from "../../hooks/useDebounce";
import { useFavorites } from "../../hooks/useFavorites";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";

export function HomePage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const view = params.get("view");
  const category = params.get("category") ?? "popular";

  const debouncedQuery = useDebounce(query);
  const isSearching = debouncedQuery.trim().length > 0;

  const { favorites } = useFavorites();
  const { recent } = useRecentlyViewed();

  const feed = useVideos(category);
  const search = useSearch(debouncedQuery);

  const setCategory = (id: string) => setParams(id === "popular" ? {} : { category: id });

  if (view === "favorites") {
    return (
      <section className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-foreground">Favorites</h1>
        <VideoGrid videos={favorites} emptyTitle="No favorites yet" emptyMessage="Tap the heart on any video to save it here." />
      </section>
    );
  }
  if (view === "recent") {
    return (
      <section className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-foreground">Recently viewed</h1>
        <VideoGrid videos={recent} emptyTitle="Nothing watched yet" emptyMessage="Videos you open will show up here." />
      </section>
    );
  }

  if (isSearching) {
    const videos = search.data?.pages.flatMap((p) => p.videos) ?? [];
    return (
      <section className="mx-auto max-w-[1600px]">
        <h1 className="mb-6 text-foreground">Results for “{debouncedQuery}”</h1>
        <VideoGrid
          videos={videos}
          isLoading={search.isLoading}
          isError={search.isError}
          onRetry={search.refetch}
          emptyTitle="No videos found"
          emptyMessage="Try different keywords."
        />
        <InfiniteScrollSentinel
          hasMore={Boolean(search.hasNextPage)}
          isLoading={search.isFetchingNextPage}
          onLoadMore={search.fetchNextPage}
        />
      </section>
    );
  }

  const videos = feed.data?.pages.flatMap((p) => p.videos) ?? [];

  return (
    <section className="mx-auto max-w-[1600px]">
      <div className="sticky top-0 z-10 -mx-4 mb-4 bg-white dark:bg-black/40 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <CategoryFilter active={category} onChange={setCategory} />
      </div>
      <VideoGrid
        videos={videos}
        isLoading={feed.isLoading}
        isError={feed.isError}
        onRetry={feed.refetch}
        emptyTitle="No videos in this category"
      />
      <InfiniteScrollSentinel
        hasMore={Boolean(feed.hasNextPage)}
        isLoading={feed.isFetchingNextPage}
        onLoadMore={feed.fetchNextPage}
      />
    </section>
  );
}
