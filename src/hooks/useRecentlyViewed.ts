import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../lib/constants";
import type { Video } from "../types/video";

const MAX_RECENT = 12;

export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage<Video[]>(STORAGE_KEYS.recentlyViewed, []);

  const addRecent = useCallback(
    (video: Video) =>
      setRecent((prev) => [video, ...prev.filter((v) => v.id !== video.id)].slice(0, MAX_RECENT)),
    [setRecent],
  );

  const clearRecent = useCallback(() => setRecent([]), [setRecent]);

  return { recent, addRecent, clearRecent };
}
