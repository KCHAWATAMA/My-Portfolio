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
    <footer className="mt-24 border-t border-[#E4E2DC] dark:border-[#2E332E] bg-[#FAFAF7] dark:bg-[#121412] text-[15px] text-[#4A4A45] dark:text-[#B4B3AC]">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Editorial rule & top section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-6 space-y-3">
            <p className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
              {content.profile.fullName}
            </p>
            <p className="max-w-md text-[15px] leading-relaxed">
              {content.profile.identityLine} Based in {content.profile.location}. {content.profile.availability}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="block text-[13px] uppercase font-mono text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold" style={{ letterSpacing: '0.06em' }}>
              Navigation
            </span>
            <ul className="space-y-1 text-[15px]">
              {content.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <span className="block text-[13px] uppercase font-mono text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold" style={{ letterSpacing: '0.06em' }}>
              Direct Channels
            </span>
            <ul className="space-y-1 text-[13px] font-mono">
              <li>
                <a
                  href={`mailto:${content.profile.email}`}
                  className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors break-all py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  {content.profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${content.profile.phone.replace(/\s+/g, '')}`}
                  className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  {content.profile.phone}
                </a>
              </li>
              <li>
                <a
                  href={content.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  href={content.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with last updated date, copyright and back-to-top */}
        <div className="pt-8 border-t border-[#E4E2DC] dark:border-[#2E332E] flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[13px] text-[#4A4A45] dark:text-[#B4B3AC]">
            <span>&copy; 2026 {content.profile.fullName}</span>
            <span aria-hidden="true">·</span>
            <span>Last updated: {content.lastUpdated}</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="min-h-[44px] flex items-center gap-2 px-4 py-2 border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] text-[#1B1B1B] dark:text-[#ECEBE6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </footer>
  );
}
