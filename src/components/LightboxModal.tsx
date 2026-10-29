/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
  title?: string;
  caption?: string;
}

export function LightboxModal({
  isOpen,
  onClose,
  imageUrl,
  altText,
  title,
  caption
}: LightboxModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      closeBtnRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || altText || "Image viewer"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-[#121412] border border-[#2E332E] p-4 sm:p-6 space-y-4">
        
        {/* Top bar with close button */}
        <div className="flex items-center justify-between gap-4 border-b border-[#2E332E] pb-3 text-[13px] font-mono">
          <span className="text-[#3FB59B] truncate font-semibold">
            {title || altText}
          </span>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 min-h-[44px] px-3.5 py-2 text-[13px] text-[#ECEBE6] hover:text-[#3FB59B] border border-[#2E332E] hover:border-[#3FB59B] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#3FB59B] outline-none"
            aria-label="Close image preview"
          >
            <span>Close (Esc)</span>
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Image container with fixed 16:10 frame and object-contain */}
        <div className="relative w-full aspect-[16/10] bg-[#181B18] overflow-hidden flex items-center justify-center border border-[#2E332E]">
          <img
            src={imageUrl}
            alt={altText}
            width={1600}
            height={1000}
            loading="lazy"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Caption */}
        {caption && (
          <p className="text-[13px] text-[#B4B3AC] font-sans leading-relaxed">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
}
