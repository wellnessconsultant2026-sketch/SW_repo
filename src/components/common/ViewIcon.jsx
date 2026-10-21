import React from 'react';

export default function ViewIcon({ size = 15, className = '', color = 'currentColor' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      {/* Precision optical lens */}
      <circle
        cx="10.5"
        cy="10.5"
        r="7"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Refined diagonal stem */}
      <path
        d="M15.8 15.8L21 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Celestial 4-pointed star glint inside lens */}
      <path
        d="M10.5 7.5 Q10.5 10.5 7.5 10.5 Q10.5 10.5 10.5 13.5 Q10.5 10.5 13.5 10.5 Q10.5 10.5 10.5 7.5 Z"
        fill={color}
      />
    </svg>
  );
}
