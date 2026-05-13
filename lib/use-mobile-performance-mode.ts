"use client";

import { useMediaQuery } from "./use-media-query";

export function useMobilePerformanceMode(): boolean {
  return useMediaQuery("(pointer: coarse), (max-width: 767px)");
}
