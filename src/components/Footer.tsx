/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-24 border-t border-[#E4E2DC] dark:border-[#272B27] bg-[#FAFAF7] dark:bg-[#121412] text-sm text-[#5A5A55] dark:text-[#9E9D96]">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Editorial rule & top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-6 space-y-3">
            <p className="font-serif text-lg text-[#1B1B1B] dark:text-[#ECEBE6]">
              {content.profile.fullName}
            </p>
            <p className="max-w-md text-xs leading-relaxed">
              {content.profile.identityLine} Based in {content.profile.location}. {content.profile.availability}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="block text-xs uppercase tracking-wider font-mono text-[#1B1B1B] dark:text-[#ECEBE6]">
              Navigation
            </span>
            <ul className="space-y-1 text-xs">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="block text-xs uppercase tracking-wider font-mono text-[#1B1B1B] dark:text-[#ECEBE6]">
              Direct Channels
            </span>
            <ul className="space-y-1 text-xs font-mono">
              <li>
                <a
                  href={`mailto:${content.profile.email}`}
                  className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors break-all"
                >
                  {content.profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.profile.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors"
                >
                  {content.profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={content.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={content.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with last updated date, copyright and back-to-top */}
        <div className="pt-8 border-t border-[#E4E2DC] dark:border-[#272B27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#5A5A55] dark:text-[#9E9D96]">
            <span>&copy; 2026 {content.profile.fullName}</span>
            <span aria-hidden="true">·</span>
            <span>Last updated: {content.lastUpdated}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] text-[#1B1B1B] dark:text-[#ECEBE6] transition-colors cursor-pointer"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
}
