/**
 * ThemeAwareLogo — Hydration-safe, CSS-only theme-switching logo.
 *
 * Strategy:
 *   • Both <Image> nodes are rendered on the server (no JS state read at all).
 *   • Visibility is controlled purely by Tailwind utility classes that react to
 *     the `.dark` class on <html> (set by next-themes):
 *       - Light logo: `block dark:hidden`   → visible in light, hidden in dark
 *       - Dark  logo: `hidden dark:block`   → hidden in light, visible in dark
 *
 * Why this is hydration-safe:
 *   • Server HTML and client HTML are identical — neither reads `theme` state.
 *   • next-themes sets `.dark` on <html> before the first paint (suppressed with
 *     suppressHydrationWarning on <html>), so the CSS swap is instant & flicker-free.
 *
 * LCP notes:
 *   • `priority` pre-loads both images; the browser will only display one but
 *     network cost is negligible for small logo assets.
 *   • Explicit `width` / `height` prevent layout shift.
 */

import Image from "next/image";

interface ThemeAwareLogoProps {
  /** Rendered width in px (passed to next/image, used for srcset sizing). */
  width?: number;
  /** Rendered height in px. */
  height?: number;
  /** Extra Tailwind / CSS classes applied to both wrapper <span> elements. */
  className?: string;
  /** Pre-load both images as high-priority (recommended when logo is above the fold). */
  priority?: boolean;
}

export default function ThemeAwareLogo({
  width = 150,
  height = 50,
  className = "h-10 w-auto object-contain",
  priority = true,
}: ThemeAwareLogoProps) {
  return (
    <>
      {/* ── Light-mode logo — visible by default, hidden when .dark is on <html> ── */}
      <Image
        src="/logo_light-mode.png"
        alt="Arunika"
        width={width}
        height={height}
        priority={priority}
        className={`block dark:hidden ${className}`}
      />

      {/* ── Dark-mode logo — hidden by default, visible when .dark is on <html> ── */}
      <Image
        src="/logo_dark-mode.png"
        alt="Arunika"
        width={width}
        height={height}
        priority={priority}
        className={`hidden dark:block ${className}`}
      />
    </>
  );
}
