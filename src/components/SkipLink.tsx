/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1B1B1B] focus:text-[#FAFAF7] dark:focus:bg-[#ECEBE6] dark:focus:text-[#121412] focus:font-medium focus:text-sm focus:border focus:border-[#0E6B5C] focus:rounded-none"
    >
      Skip to main content
    </a>
  );
}
