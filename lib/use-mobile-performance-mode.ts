"use client";

import { useMediaQuery } from "./use-media-query";

// Default to TRUE on SSR so mobile users never briefly mount the heavy R3F
// scene during hydration. Desktop sees the static fallback for one frame
// before hydration flips it back to false — a much cheaper trade-off.
export function useMobilePerformanceMode(): boolean {
  return useMediaQuery("(pointer: coarse), (max-width: 767px)", true);
}
