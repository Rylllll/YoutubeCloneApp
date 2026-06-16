import { useQuery } from "@tanstack/react-query";
import { pexelsService } from "../services/pexels.service";
import { queryKeys } from "../lib/constants";

export function useVideo(id: string) {
  return useQuery({
    queryKey: queryKeys.video(id),
    queryFn: () => pexelsService.getVideoById(id),
    enabled: Boolean(id),
  });
}

export function useSuggestedVideos(excludeId: string) {
  return useQuery({
    queryKey: [...queryKeys.video(excludeId), "suggested"],
    queryFn: () => pexelsService.getSuggestedVideos(excludeId),
    enabled: Boolean(excludeId),
  });
}
