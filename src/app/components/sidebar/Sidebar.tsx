import type { ComponentType } from "react";
import { Link, useLocation } from "react-router";
import {
  MdHome,
  MdSubscriptions,
  MdHistory,
  MdWatchLater,
  MdThumbUp,
  MdOutlineSportsEsports,
  MdLibraryMusic,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { HiTrendingUp } from "react-icons/hi";
import { cn } from "../../../lib/utils";

interface SidebarProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

interface NavItem {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

const PRIMARY: NavItem[] = [
  { to: "/", label: "Home", icon: MdHome },
  { to: "/?q=shorts", label: "Shorts", icon: SiYoutubeshorts },
  { to: "/?q=vlog", label: "Subscriptions", icon: MdSubscriptions },
];

const LIBRARY: NavItem[] = [
  { to: "/?view=recent", label: "History", icon: MdHistory },
  { to: "/?category=popular", label: "Trending", icon: HiTrendingUp },
  { to: "/?q=music", label: "Music", icon: MdLibraryMusic },
  { to: "/?q=gaming", label: "Gaming", icon: MdOutlineSportsEsports },
  { to: "/?q=nature", label: "Watch Later", icon: MdWatchLater },
  { to: "/?view=favorites", label: "Liked Videos", icon: MdThumbUp },
];

const COLLAPSED_ITEMS: NavItem[] = [
  ...PRIMARY,
  { to: "/?view=recent", label: "You", icon: MdOutlineVideoLibrary },
];

export function Sidebar({ collapsed = false, onNavigate }: SidebarProps) {
  const location = useLocation();
  const fullPath = `${location.pathname}${location.search}`;

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = fullPath === item.to || (item.to === "/" && fullPath === "/");
    return (
      <Link
        key={item.to + item.label}
        to={item.to}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={cn(
          "flex items-center rounded-xl transition-colors",
          collapsed ? "flex-col justify-center gap-1.5 px-1 py-4 text-center" : "gap-6 px-3 py-2.5",
          active ? "bg-accent font-medium text-accent-foreground" : "text-foreground hover:bg-accent/60",
        )}
      >
        <Icon className="size-6 shrink-0" />
        <span className={cn("text-sm", collapsed ? "text-[10px]" : "truncate")}>{item.label}</span>
      </Link>
    );
  };

  return (
    <nav className={cn("flex flex-col gap-1 p-2", collapsed ? "w-[72px] items-stretch" : "w-60")}>
      {collapsed ? (
        COLLAPSED_ITEMS.map(renderItem)
      ) : (
        <>
          {PRIMARY.map(renderItem)}
          <div className="my-2 border-t border-border" />
          <p className="px-3 py-1 text-sm font-medium text-foreground">You</p>
          {LIBRARY.map(renderItem)}
        </>
      )}
    </nav>
  );
}
