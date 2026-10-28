/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-20 sm:py-28 text-center space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
        <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
          Error 404 / Document Not Located
        </span>
        <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
        Page Not Found
      </h1>

      <p className="text-base text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
        The requested address does not correspond to an existing record or case study in this portfolio prototype.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#/"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] dark:bg-[#3FB59B] dark:text-[#121412] hover:bg-[#0A4F44] dark:hover:bg-[#4FD3B6] transition-colors"
        >
          <Home className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Return to Home</span>
        </a>

        <a
          href="#/projects"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1B1B1B] dark:text-[#ECEBE6] border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Browse Projects</span>
        </a>
      </div>
    </div>
  );
}
