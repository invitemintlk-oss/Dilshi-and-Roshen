import React from 'react';

/**
 * Full-bleed background image for a section, with a soft cream wash so text stays readable.
 * The parent section must be `relative overflow-hidden` and its content `relative z-10`.
 */
export const SectionBackground: React.FC<{ src: string; wash?: number; position?: string }> = ({
  src,
  wash = 0.45,
  position = 'center',
}) => (
  <>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 z-0 h-full w-full object-cover pointer-events-none"
      style={{ objectPosition: position }}
    />
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: `rgba(255, 246, 240, ${wash})` }}
    />
  </>
);
