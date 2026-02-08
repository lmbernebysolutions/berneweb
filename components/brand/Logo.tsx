/**
 * DEPRECATED: Use TextLogo instead
 *
 * Logo.tsx was originally designed with the Schweinchen mascot embedded,
 * but has been replaced by TextLogo.tsx which shows only the text brand.
 *
 * The Schweinchen mascot is now strategically used in:
 * - Testimonials (as avatar replacements)
 * - Loading states
 * - Error pages (404)
 * - Future service cards and case studies
 *
 * With CSS filter visibility solution:
 * CSS: brightness-110 filter drop-shadow-[0_0_8px_rgba(3,249,249,0.4)]
 * This solves the Navy-on-Navy contrast problem without white containers.
 *
 * Import TextLogo instead:
 * import { TextLogo } from "@/components/brand/TextLogo";
 */

export {};
