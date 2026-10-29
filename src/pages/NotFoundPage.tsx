/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, BookOpen } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-20 sm:py-28 text-center space-y-6 max-w-xl mx-auto">
      <div className="flex items-center justify-center gap-3">
        <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
        <span className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
          Error 404 / Document Not Located
        </span>
        <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
        Page Not Found
      </h1>

      <p className="text-[17px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
        This page does not exist. Go back to the home page.
      </p>

      <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#/"
          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] dark:bg-[#3FB59B] dark:text-[#121412] hover:bg-[#08453B] dark:hover:bg-[#4FD3B6] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Home page</span>
        </a>

        <a
          href="#/projects"
          className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[15px] font-medium text-[#1B1B1B] dark:text-[#ECEBE6] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] transition-colors focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
        >
          <BookOpen className="w-4 h-4" aria-hidden="true" />
          <span>Browse Projects</span>
        </a>
      </div>
    </div>
  );
}
