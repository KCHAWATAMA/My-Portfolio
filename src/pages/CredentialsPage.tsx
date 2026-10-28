/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content, Certificate } from '../content.ts';
import { Award, ExternalLink } from 'lucide-react';

export function CredentialsPage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-4" aria-labelledby="credentials-title">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#272B27] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Certifications and Training
          </p>
        </div>

        <h1 id="credentials-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
          Verified Credentials
        </h1>

        <p className="text-base text-[#5A5A55] dark:text-[#9E9D96] max-w-[68ch]">
          Professional qualifications in data analytics, supervised machine learning, database querying, and data governance.
        </p>
      </section>

      {/* Grid of Certificates */}
      <section aria-label="Certificates directory">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] flex flex-col justify-between space-y-4 hover:border-[#0E6B5C] dark:hover:border-[#3FB59B] transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                    <span className="text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="tabular-nums">{cert.year}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B] shrink-0 mt-1" aria-hidden="true" />
                    <h2 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] leading-snug">
                      {cert.title}
                    </h2>
                  </div>

                  <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96]">
                    Issuer: <span className="text-[#1B1B1B] dark:text-[#ECEBE6] font-medium">{cert.issuer}</span>
                  </p>
                </div>

                {/* Requirement 13: Credentials without a link show no "Verify" line */}
                {hasLiveLink && (
                  <div className="pt-4 border-t border-[#E4E2DC] dark:border-[#272B27]">
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Currently In Progress Note */}
      <section className="p-6 bg-[#F4F3EE] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-2">
        <span className="text-xs font-mono uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
          Active Studies in Progress
        </span>
        <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
          Preparing for Microsoft Certified: Power BI Data Analyst Associate (PL-300), Microsoft Azure Fundamentals (AZ-900), and Tableau Desktop Specialist examinations.
        </p>
      </section>

    </div>
  );
}
