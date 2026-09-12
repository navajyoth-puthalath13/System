import { useMediaQuery } from "@/hooks/use-media-query";

/** Breakpoint (px) below which the viewport is treated as mobile. */
export const MOBILE_BREAKPOINT = 768;

/**
 * @name useIsMobile
 * @description True when the viewport is narrower than the mobile breakpoint.
 * @type registry:hook
 * @dependencies use-media-query
 *
 * @example
 * const isMobile = useIsMobile();
 */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}
