import React from 'react';

/**
 * The three-stroke arrow glyph used across South Park Commons-style buttons.
 */
export const ArrowGlyph: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="btn-arrow"
  >
    <path d="M0 14L28 14" stroke="currentColor"></path>
    <path d="M14 0.5L28 14" stroke="currentColor"></path>
    <path d="M14 28L28 14" stroke="currentColor"></path>
  </svg>
);

export default ArrowGlyph;
