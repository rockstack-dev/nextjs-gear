import { Colors, getBadgeColor } from "@/lib/colors";
import clsx from "clsx";

interface Props {
  color?: Colors | null;
  size?: "sm" | "md";
}

export default function ColorBadge({ color, size = "md" }: Props) {
  return (
    <span
      className={clsx(
        "inline-flex flex-shrink-0 items-center rounded-full text-xs font-medium",
        getBadgeColor(color),
        size === "md" && "p-1",
        size === "sm" && "p-0.5"
      )}
    >
      <svg className={clsx(size === "md" && "h-2 w-2", size === "sm" && "h-1.5 w-1.5")} fill="currentColor" viewBox="0 0 8 8">
        <circle cx={4} cy={4} r={3} />
      </svg>
    </span>
  );
}
