/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1B1B1B] focus:text-[#FAFAF7] dark:focus:bg-[#ECEBE6] dark:focus:text-[#121412] focus:font-medium focus:text-[15px] focus:border focus:border-[#0B5A4D] dark:focus:border-[#3FB59B] focus:rounded-none min-h-[44px] flex items-center"
    >
      Skip to main content
    </a>
  );
}
