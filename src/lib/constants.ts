export const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;

export const PEXELS_API_BASE_URL = "https://api.pexels.com/videos";

export const USE_MOCK_DATA = !PEXELS_API_KEY;

export const PAGE_SIZE = 12;

export const STORAGE_KEYS = {
  favorites: "pexels-clone:favorites",
  recentlyViewed: "pexels-clone:recently-viewed",
} as const;

export const SEARCH_DEBOUNCE_MS = 400;

export const CATEGORIES = [
  { id: "popular", label: "Popular" },
  { id: "nature", label: "Nature" },
  { id: "ocean", label: "Ocean" },
  { id: "city", label: "City" },
  { id: "technology", label: "Technology" },
  { id: "animals", label: "Animals" },
  { id: "food", label: "Food" },
  { id: "travel", label: "Travel" },
] as const;

export const queryKeys = {
  videos: (category: string) => ["videos", "feed", category] as const,
  video: (id: string) => ["videos", "detail", id] as const,
  search: (query: string) => ["videos", "search", query] as const,
  creator: (id: string) => ["creator", id] as const,
  creatorVideos: (id: string) => ["creator", id, "videos"] as const,
};
