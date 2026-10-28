/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface PlaceholderBoxProps {
  label: string; // e.g. "[ADD SCREENSHOT]" or "[ADD PHOTO]"
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:2' | '21:9';
  altText: string;
  caption?: string;
  className?: string;
  imageUrl?: string;
}

export function PlaceholderBox({
  label,
  aspectRatio = '16:9',
  altText,
  caption,
  className = '',
  imageUrl
}: PlaceholderBoxProps) {
  const aspectClass = {
    '16:9': 'aspect-[16/9]',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square',
    '3:2': 'aspect-[3/2]',
    '21:9': 'aspect-[21/9]'
  }[aspectRatio];

  return (
    <figure className="w-full">
      <div
        className={`relative w-full ${aspectClass} bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden ${className}`}
        role="img"
        aria-label={altText}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="space-y-2 max-w-xs">
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] px-2 py-1 border border-[#0E6B5C]/30 dark:border-[#3FB59B]/30 bg-transparent">
              {label}
            </span>
            <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96] font-sans line-clamp-2">
              {altText}
            </p>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-xs text-[#5A5A55] dark:text-[#9E9D96] font-sans leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
