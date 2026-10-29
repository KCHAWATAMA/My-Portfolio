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
    <header className="sticky top-0 z-40 w-full bg-[#FAFAF7]/90 dark:bg-[#121412]/90 backdrop-blur-md border-b border-[#E4E2DC] dark:border-[#2E332E] transition-colors">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-20 min-w-0">
          
          {/* Brand title: short name below sm (640px), full name from sm up; min-w-0 truncate as last resort */}
          <a
            href="#/"
            className="text-lg sm:text-xl font-serif font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors min-w-0 truncate focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
            title={content.profile.fullName}
          >
            <span className="sm:hidden">K. J. Chawatama</span>
            <span className="hidden sm:inline">{content.profile.fullName}</span>
          </a>

          {/* Full navigation from lg breakpoint up; active link is underlined */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-medium text-[#4A4A45] dark:text-[#B4B3AC]" aria-label="Main navigation">
            {content.navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap transition-colors py-2 focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none ${
                    active
                      ? 'text-[#0B5A4D] dark:text-[#3FB59B] font-semibold underline underline-offset-8 decoration-2 decoration-[#0B5A4D] dark:decoration-[#3FB59B]'
                      : 'hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right controls: Theme toggle + Email link (lg+) + Mobile menu trigger (both 44x44px, shrink-0, always fully visible) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Theme toggle rendered as an icon button: exactly 44x44px */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-11 h-11 shrink-0 p-2.5 border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[#4A4A45]" aria-hidden="true" />
              ) : (
                <Sun className="w-4 h-4 text-[#ECEBE6]" aria-hidden="true" />
              )}
            </button>

            {/* Email me button: hidden below lg breakpoint (available inside mobile drawer), shown from lg up */}
            <a
              href={`mailto:${content.profile.email}`}
              className="hidden lg:inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
            >
              Email me
            </a>

            {/* Mobile menu trigger below lg: exactly 44x44px, shrink-0, never pushed off screen */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 shrink-0 p-2.5 text-[#4A4A45] dark:text-[#B4B3AC] hover:text-[#1B1B1B] dark:hover:text-[#ECEBE6] border border-[#E4E2DC] dark:border-[#2E332E] transition-colors cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
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

        {/* Mobile dropdown drawer below lg */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E4E2DC] dark:border-[#2E332E]">
            <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
              {content.navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`min-h-[44px] flex items-center px-3 py-2 text-[15px] ${
                      active
                        ? 'text-[#0B5A4D] dark:text-[#3FB59B] font-semibold underline underline-offset-4 decoration-2'
                        : 'text-[#4A4A45] dark:text-[#B4B3AC]'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
              <div className="pt-2 border-t border-[#E4E2DC] dark:border-[#2E332E]">
                <a
                  href={`mailto:${content.profile.email}`}
                  className="flex items-center justify-center min-h-[44px] px-4 py-2.5 text-center text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] dark:bg-[#3FB59B] dark:text-[#121412]"
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
