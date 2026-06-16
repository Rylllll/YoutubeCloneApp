import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: LucideIcon;
}

export function EmptyState({
  title = "Nothing here yet",
  message = "Try a different search or category.",
  icon: Icon = Inbox,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center text-muted-foreground">
      <Icon className="size-10 opacity-50" />
      <p className="text-foreground">{title}</p>
      <p className="max-w-sm text-sm">{message}</p>
    </div>
  );
}
