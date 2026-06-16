import { useInfiniteQuery } from "@tanstack/react-query";
import { pexelsService } from "../services/pexels.service";
import { queryKeys } from "../lib/constants";

export function useVideos(category = "popular") {
  return useInfiniteQuery({
    queryKey: queryKeys.videos(category),
    queryFn: ({ pageParam }) => pexelsService.getFeed(category, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
}
