import { Link } from "react-router";
import { Menu, Video, Bell, User } from "lucide-react";
import { Button } from "../ui/button";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "../layout/ThemeToggle";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 sm:gap-6 bg-white/95 dark:bg-black backdrop-blur-xl px-4">
      {/* Left: menu + logo */}
      <div className="flex items-center gap-1 sm:gap-3">
        <Button variant="ghost" size="icon" aria-label="Toggle sidebar" onClick={onToggleSidebar}>
          <Menu className="size-5" />
        </Button>
        <Link to="/" className="flex items-center gap-1" aria-label="YouTube home">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg" alt="YouTube Logo" className="h-[20px] w-auto" />
          <span className="hidden text-[20px] font-bold tracking-tighter text-foreground sm:inline">
            YouTube
          </span>
        </Link>
      </div>

      {/* Center: search */}
      <div className="flex flex-1 justify-center px-4 sm:px-8 max-w-[720px]">
        <SearchBar />
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-0.5 sm:gap-1">
        <Button variant="ghost" className="hidden gap-2 rounded-full px-6 sm:flex bg-black/10 dark:bg-white/10">
          <Video className="size-5" /> <span className="text-sm">Create</span>
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="hidden sm:inline-flex">
          <Bell className="size-5" />
        </Button>
        <ThemeToggle />
        <Button variant="ghost" size="icon" aria-label="Account" className="rounded-full">
          <span className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground">
            <User className="size-4" />
          </span>
        </Button>
      </div>
    </header>
  );
}
