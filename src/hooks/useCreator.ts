import { useQuery } from "@tanstack/react-query";
import { pexelsService } from "../services/pexels.service";
import { queryKeys } from "../lib/constants";

export function useCreator(id: string) {
  return useQuery({
    queryKey: queryKeys.creator(id),
    queryFn: () => pexelsService.getCreator(id),
    enabled: Boolean(id),
  });
}

export function useCreatorVideos(id: string) {
  return useQuery({
    queryKey: queryKeys.creatorVideos(id),
    queryFn: () => pexelsService.getCreatorVideos(id),
    enabled: Boolean(id),
  });
}
