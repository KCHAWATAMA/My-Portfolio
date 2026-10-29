/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content, Certificate, Badge } from '../content.ts';
import { Award, ExternalLink } from 'lucide-react';

export function CredentialsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-4" aria-labelledby="credentials-title">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            Certifications and Training
          </p>
        </div>

        <h1 id="credentials-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
          Verified Credentials
        </h1>

        <p className="text-lg text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] max-w-[68ch]">
          Professional qualifications in data analytics, supervised machine learning, database querying, and data governance.
        </p>
      </section>

      {/* Grid of Certificates - cards with consistent 24px (p-6) padding, equal heights, and hover lift */}
      <section aria-label="Certificates directory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {content.credentials.map((cert: Certificate, index: number) => {
            const hasLiveLink = Boolean(
              cert.verifyUrl &&
              cert.verifyUrl.trim() !== '' &&
              cert.verifyUrl !== '[ADD LINK]' &&
              cert.verifyUrl !== '[ADD]'
            );

            return (
              <div
                key={cert.id}
                className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between space-y-4 hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none h-full"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                    <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="tabular-nums">{cert.year}</span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Award className="w-5 h-5 text-[#0B5A4D] dark:text-[#3FB59B] shrink-0 mt-0.5" aria-hidden="true" />
                    <h2 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                      {cert.title}
                    </h2>
                  </div>

                  <p className="text-[14px] text-[#4A4A45] dark:text-[#B4B3AC]">
                    Issuer: <span className="text-[#1B1B1B] dark:text-[#ECEBE6] font-medium">{cert.issuer}</span>
                  </p>
                </div>

                {/* Credentials without a link show no "Verify" line */}
                {hasLiveLink && (
                  <div className="pt-4 border-t border-[#E4E2DC] dark:border-[#2E332E]">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] gap-1.5 text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] hover:underline focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Badges Section */}
      <section className="space-y-6 pt-4 border-t border-[#E4E2DC] dark:border-[#2E332E]" aria-labelledby="badges-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
              <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
                Official Recognitions
              </p>
            </div>
            <h2 id="badges-heading" className="font-serif text-2xl sm:text-3xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
              Badges
            </h2>
            <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] leading-relaxed max-w-[65ch]">
              Digital credentials and participation badges earned across developer programs and community challenges.
            </p>
          </div>

          {content.profile.developerProfileUrl && (
            <div className="shrink-0">
              <a
                href={content.profile.developerProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] gap-2 px-5 py-2.5 text-[14px] font-semibold text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
              >
                <span>View my Google Developer profile</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>

        {/* Responsive grid of cards (1 column mobile, 2 md, 3 lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {content.badges.map((badge: Badge, index: number) => (
            <div
              key={badge.title + index}
              className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] flex flex-col justify-between space-y-4 hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                  <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold" style={{ letterSpacing: '0.06em' }}>
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <span className="tabular-nums">{badge.date}</span>
                </div>

                <div className="flex items-start gap-2.5">
                  <Award className="w-5 h-5 text-[#0B5A4D] dark:text-[#3FB59B] shrink-0 mt-0.5" aria-hidden="true" />
                  <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                    {badge.title}
                  </h3>
                </div>

                <p className="text-[14px] text-[#4A4A45] dark:text-[#B4B3AC]">
                  Issuer: <span className="text-[#1B1B1B] dark:text-[#ECEBE6] font-medium">{badge.issuer}</span>
                </p>

                {badge.note && (
                  <p className="text-[13px] text-[#4A4A45] dark:text-[#B4B3AC] italic leading-[1.5]">
                    {badge.note}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-[#E4E2DC] dark:border-[#2E332E]">
                <a
                  href={badge.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center min-h-[44px] gap-1.5 text-[14px] font-semibold text-[#0B5A4D] dark:text-[#3FB59B] hover:underline focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  <span>View badge</span>
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Currently In Progress Note */}
      <section className="p-6 bg-[#F8F7F3] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-2">
        <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
          Active Studies in Progress
        </span>
        <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
          Preparing for Microsoft Certified: Power BI Data Analyst Associate (PL-300), Microsoft Azure Fundamentals (AZ-900), and Tableau Desktop Specialist examinations.
        </p>
      </section>

    </div>
  );
}
