import { cn } from "@/lib/cn";
import { type StackItem } from "./data";

interface MarqueeProps {
  items: StackItem[];
  direction?: "left" | "right";
  durationSeconds?: number;
}

export function Marquee({
  items,
  direction = "left",
  durationSeconds = 40,
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40 bg-gradient-to-l from-background to-transparent"
      />

      <div
        className={cn(
          "flex w-max gap-4 sm:gap-6 px-4",
          direction === "left" ? "marquee-track" : "marquee-track-reverse",
        )}
        style={
          {
            "--marquee-duration": `${durationSeconds}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={`${item.name}-${i}`}
              className="flex items-center gap-4 rounded-xl border border-white/5 bg-neutral-900/40 px-6 py-4 backdrop-blur-sm transition-colors hover:bg-neutral-800/60 hover:border-white/10"
            >
              <Icon className={cn("w-6 h-6", item.color)} />
              <span className="font-sans font-medium text-lg text-white whitespace-nowrap tracking-wide">
                {item.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
