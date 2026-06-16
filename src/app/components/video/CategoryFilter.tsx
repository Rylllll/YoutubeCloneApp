import { cn } from "../../../lib/utils";
import { CATEGORIES } from "../../../lib/constants";

interface CategoryFilterProps {
  active: string;
  onChange: (categoryId: string) => void;
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={cn(
            "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm transition-colors border border-transparent",
            active === category.id
              ? "bg-foreground text-background"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
