import { useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import { pexelsService } from "../services/pexels.service";
import { queryKeys } from "../lib/constants";

export function useSearch(query: string) {
  return useInfiniteQuery({
    queryKey: queryKeys.search(query),
    queryFn: ({ pageParam }) => pexelsService.searchVideos(query, pageParam),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
    enabled: query.trim().length > 0,
    placeholderData: keepPreviousData,
  });
}
