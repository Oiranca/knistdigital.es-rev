import React from 'react';

interface IconProps {
  name:
    | 'sun'
    | 'moon'
    | 'menu'
    | 'close'
    | 'instagram'
    | 'linkedin'
    | 'spark'
    | 'play'
    | 'pause'
    | 'check'
    | 'arrow-right'
    | 'arrow-down'
    | 'accessibility'
    | 'people'
    | 'growth';
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
  width?: number;
  height?: number;
  strokeWidth?: number;
}

const PATHS: Record<IconProps['name'], React.ReactNode> = {
  // r=4 + compact ray path — from data.jsx
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  // from data.jsx
  moon: (
    <path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z" />
  ),
  // three-path variant from data.jsx
  menu: (
    <path d="M4 7h16M4 12h16M4 17h16" />
  ),
  // X variant from data.jsx
  close: (
    <path d="M6 6l12 12M18 6L6 18" />
  ),
  // rect rx=5 + circle lens + filled dot — from data.jsx
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".7" fill="currentColor" />
    </>
  ),
  // rounded-square + "in" path — from data.jsx
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </>
  ),
  spark: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
  ),
  // filled triangle — from data.jsx
  play: (
    <path d="M8 5v14l11-7z" />
  ),
  // two filled rounded-rect bars — matching original
  pause: (
    <>
      <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  // from data.jsx
  check: (
    <path d="M4 12l5 5 11-11" />
  ),
  // from data.jsx
  'arrow-right': (
    <path d="M5 12h14M13 6l6 6-6 6" />
  ),
  // from data.jsx
  'arrow-down': (
    <path d="M12 5v14M6 13l6 6 6-6" />
  ),
  accessibility: (
    <>
      <circle cx="12" cy="4.5" r="1.5" />
      <path d="M5 8h14M10 8v5l-2 7M14 8v5l2 7M9 13h6" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3 20c0-3 3-5 6-5s6 2 6 5M15 20c0-2 2-3 4-3s3 1 3 3" />
    </>
  ),
  growth: (
    <>
      <path d="M4 19l5-5 4 3 7-8" />
      <path d="M14 9h6v6" />
    </>
  ),
};

export function Icon({
  name,
  className,
  'aria-hidden': ariaHidden = true,
  width = 20,
  height = 20,
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
    >
      {PATHS[name]}
    </svg>
  );
}
