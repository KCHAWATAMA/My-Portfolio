/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';

export function ProfileMonogram({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full aspect-square overflow-hidden bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={content.profile.photoAlt}
      >
        {/* Subtle geometric framing */}
        <rect x="25" y="25" width="450" height="450" className="stroke-[#E4E2DC] dark:stroke-[#272B27]" strokeWidth="1" />
        <rect x="35" y="35" width="430" height="430" className="stroke-[#E4E2DC]/50 dark:stroke-[#272B27]/50" strokeWidth="0.5" />

        {/* Central Monogram */}
        <text
          x="250"
          y="235"
          textAnchor="middle"
          className="font-serif text-[72px] font-bold fill-[#0E6B5C] dark:fill-[#3FB59B]"
          style={{ letterSpacing: '4px' }}
        >
          KJC
        </text>

        {/* Hairline divider */}
        <line x1="150" y1="265" x2="350" y2="265" className="stroke-[#0E6B5C]/60 dark:stroke-[#3FB59B]/60" strokeWidth="1.5" />

        {/* Full Name */}
        <text
          x="250"
          y="310"
          textAnchor="middle"
          className="font-serif text-[17px] font-semibold fill-[#1B1B1B] dark:fill-[#ECEBE6]"
        >
          {content.profile.fullName}
        </text>

        {/* Role & Location */}
        <text
          x="250"
          y="340"
          textAnchor="middle"
          className="font-mono text-[11px] uppercase tracking-wider fill-[#0E6B5C] dark:fill-[#3FB59B]"
        >
          Data Scientist & Engineer
        </text>
        <text
          x="250"
          y="365"
          textAnchor="middle"
          className="font-mono text-[10px] fill-[#5A5A55] dark:fill-[#9E9D96]"
        >
          {content.profile.location}
        </text>
      </svg>
    </div>
  );
}
