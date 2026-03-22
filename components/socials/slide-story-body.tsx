import type { ReactNode } from 'react';

/** Socials-V2 gedämpfter Fließtext; Highlights per <strong> (#fff, bold) */
export const SLIDE_STORY_TEXT_MUTED = 'rgba(156, 174, 201, 1)';
export const SLIDE_STORY_TEXT_STRONG = '#ffffff';

export function SlideStoryBody({ children }: { children: ReactNode }) {
  return (
    <div style={{ borderLeft: '4px solid rgba(255,255,255,0.2)', paddingLeft: '16px', marginLeft: '24px', marginRight: '16px' }}>
      <p
        className="text-[13px] font-medium leading-[1.6] [&_strong]:font-bold [&_strong]:text-[#ffffff]"
        style={{ color: SLIDE_STORY_TEXT_MUTED }}
      >
        {children}
      </p>
    </div>
  );
}
