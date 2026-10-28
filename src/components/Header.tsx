/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { content } from '../content.ts';
import { useTheme } from './ThemeContext.tsx';
import { Sun, Moon, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
}

export function Header({ currentPath }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '#/' && (currentPath === '#/' || currentPath === '' || currentPath === '#')) {
      return true;
    }
    return currentPath === href || currentPath.startsWith(href + '/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/95 dark:bg-[#121412]/95 backdrop-blur-xs border-b border-[#E4E2DC] dark:border-[#272B27] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          
          {/* Zone 1: Brand title, single line text */}
          <a
            href="#/"
            className="text-base sm:text-lg font-serif font-semibold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors whitespace-nowrap shrink-0"
          >
            {content.profile.fullName}
          </a>

          {/* Zone 2: 4-5 nav links, 1-2 word labels, single line */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A5A55] dark:text-[#9E9D96]" aria-label="Main navigation">
            {content.navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors py-1 relative ${
                    active
                      ? 'text-[#0E6B5C] dark:text-[#3FB59B] font-semibold'
                      : 'hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0E6B5C] dark:bg-[#3FB59B]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action + theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#5A5A55] dark:text-[#9E9D96] border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] transition-colors cursor-pointer"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#5A5A55]" aria-hidden="true" />
                  <span className="hidden sm:inline">Theme: Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#ECEBE6]" aria-hidden="true" />
                  <span className="hidden sm:inline">Theme: Light</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${content.profile.email}`}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors whitespace-nowrap"
            >
              Email me
            </a>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5A5A55] dark:text-[#9E9D96] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] border border-[#E4E2DC] dark:border-[#272B27] transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E4E2DC] dark:border-[#272B27]">
            <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
              {content.navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-2 py-1.5 text-sm ${
                      active
                        ? 'text-[#0E6B5C] dark:text-[#3FB59B] font-semibold'
                        : 'text-[#5A5A55] dark:text-[#9E9D96]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#272B27]">
                <a
                  href={`mailto:${content.profile.email}`}
                  className="block px-3 py-2 text-center text-sm font-medium text-[#FAFAF7] bg-[#0E6B5C] dark:bg-[#3FB59B] dark:text-[#121412]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Email me
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
