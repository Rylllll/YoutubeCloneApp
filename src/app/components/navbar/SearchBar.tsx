import { useState, type FormEvent, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search, Mic, X, History } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearch } from "../../../hooks/useSearch";
import { useDebounce } from "../../../hooks/useDebounce";
import { ImageWithFallback } from "../error/ImageWithFallback";

export function SearchBar() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("yt-recent-searches") || "[]");
    } catch {
      return [];
    }
  });

  const debouncedValue = useDebounce(value, 300);
  const { data } = useSearch(debouncedValue);

  const topVideos = data?.pages[0]?.videos?.slice(0, 8) ?? [];
  const uniqueVideos: typeof topVideos = [];
  const seenTitles = new Set<string>();
  for (const v of topVideos) {
    if (!seenTitles.has(v.title)) {
      seenTitles.add(v.title);
      uniqueVideos.push(v);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const saveRecentSearch = (q: string) => {
    if (!q.trim()) return;
    const updated = [q.trim(), ...recentSearches.filter((s) => s.toLowerCase() !== q.trim().toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    localStorage.setItem("yt-recent-searches", JSON.stringify(updated));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    saveRecentSearch(q);
    setFocused(false);
    navigate(q ? `/?q=${encodeURIComponent(q)}` : "/");
  };

  const onSelectSuggestion = (suggestion: string) => {
    setValue(suggestion);
    saveRecentSearch(suggestion);
    setFocused(false);
    navigate(`/?q=${encodeURIComponent(suggestion)}`);
  };

  const removeRecentSearch = (e: React.MouseEvent, q: string) => {
    e.stopPropagation();
    const updated = recentSearches.filter(s => s !== q);
    setRecentSearches(updated);
    localStorage.setItem("yt-recent-searches", JSON.stringify(updated));
  };

  const showRecentSearches = focused && debouncedValue.trim().length === 0 && recentSearches.length > 0;
  const showSuggestions = focused && debouncedValue.trim().length > 0 && uniqueVideos.length > 0;

  return (
    <div className="flex w-full max-w-2xl items-center gap-2" ref={containerRef}>
      <form onSubmit={onSubmit} className="flex flex-1 relative">
        <div className="relative flex-1">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            placeholder="Search"
            aria-label="Search"
            className="h-10 rounded-l-full rounded-r-none border-black/40 border-r-0 pl-4 pr-9 text-[16px] focus-visible:ring-0 focus-visible:border-blue-500 bg-white dark:bg-white/10 backdrop-blur-[2px] dark:text-white text-black placeholder:text-black/40 dark:placeholder:text-muted-foreground "
          />
          {value && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => {
                setValue("");
                const input = containerRef.current?.querySelector("input");
                input?.focus();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white dark:text-muted-foreground dark:hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <Button
          type="submit"
          variant="secondary"
          aria-label="Search"
          className="h-10 rounded-l-none rounded-r-full px-5 bg-black/50 dark:bg-white/10 hover:bg-black/60 dark:hover:bg-white/20 backdrop-blur-[2px] text-white dark:text-foreground border-transparent"
        >
          <Search className="size-5" />
        </Button>

        {showSuggestions && (
          <div className="absolute top-full left-0 right-14 mt-1 bg-white dark:bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg py-3 z-50 text-black dark:text-white">
            {uniqueVideos.map((video, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectSuggestion(video.title)}
                className="w-full flex items-center gap-4 px-4 py-1.5 hover:bg-white/10 text-left"
              >
                <Search className="size-4 dark:text-white/70 text-black shrink-0" />
                <span className="font-medium truncate text-[15px] flex-1">{video.title}</span>
              </button>
            ))}
          </div>
        )}

        {showRecentSearches && (
          <div className="absolute top-full left-0 right-14 mt-1 bg-white dark:bg-black/90 backdrop-blur-md border border-white/10 rounded-xl shadow-lg py-3 z-50 text-black dark:text-white">
            {recentSearches.map((suggestion, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onSelectSuggestion(suggestion)}
                className="w-full flex items-center gap-4 px-4 py-1.5 hover:bg-white/10 text-left group"
              >
                <History className="size-4 dark:text-white/70 text-black shrink-0" />
                <span className="font-bold truncate text-[15px] flex-1 text-purple-400">{suggestion}</span>
                <span
                  onClick={(e) => removeRecentSearch(e, suggestion)}
                  className="text-[13px] text-blue-400 hover:underline hidden group-hover:block"
                >
                  Remove
                </span>
              </button>
            ))}
          </div>
        )}
      </form>
      <Button variant="secondary" size="icon" aria-label="Search with your voice" className="size-10 shrink-0 rounded-full ml-1 sm:ml-2 bg-black/50 dark:bg-white/10 hover:bg-black/60 dark:hover:bg-white/20 backdrop-blur-[2px] text-white dark:text-foreground border-transparent">
        <Mic className="size-5" />
      </Button>
    </div>
  );
}
