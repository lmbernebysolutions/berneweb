import { GridBeamsV2 } from "@/components/v2/GridBeamsV2";

/**
 * V2 TEST LAYOUT
 *
 * Wrapped über alle Routen unter app/(test)/.
 * Aktiviert GridBeamsV2 (weiße statt Cyan Beams) für den Sandbox-Bereich.
 *
 * Das globale Layout (app/layout.tsx) rendert weiterhin GridBeams (z-0).
 * GridBeamsV2 sitzt auf z-[1] und überblendet die Cyan-Beams.
 */
export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GridBeamsV2 />
      {children}
    </>
  );
}
