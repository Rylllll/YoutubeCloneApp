import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "../lib/constants";
import type { Video } from "../types/video";

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<Video[]>(STORAGE_KEYS.favorites, []);

  const isFavorite = useCallback((id: string) => favorites.some((v) => v.id === id), [favorites]);

  const toggleFavorite = useCallback(
    (video: Video) =>
      setFavorites((prev) =>
        prev.some((v) => v.id === video.id) ? prev.filter((v) => v.id !== video.id) : [video, ...prev],
      ),
    [setFavorites],
  );

  return { favorites, isFavorite, toggleFavorite };
}
