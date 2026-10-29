/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { content } from '../content.ts';
import { VisualSlot } from '../components/VisualSlot.tsx';
import { GraduationCap, Briefcase, Globe, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="space-y-16 sm:space-y-20 py-4" aria-labelledby="about-page-title">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            Background and History
          </p>
        </div>

        <h1 id="about-page-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
          About Kuzivakwashe Joshua Chawatama
        </h1>

        <p className="text-lg text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] max-w-[68ch]">
          Data scientist and engineer with academic rigor and hands-on experience in commercial banking software.
        </p>
      </section>

      {/* Story & Photo Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start" aria-labelledby="story-title">
        
        {/* Photo Slot (Square crop, subtle 1px hairline border, no circle, no shadow) */}
        <div className="md:col-span-5 space-y-3">
          <div className="w-full aspect-square border border-[#E4E2DC] dark:border-[#2E332E] overflow-hidden">
            <VisualSlot
              slotId="about-photo"
              imageUrl={content.profile.photoUrl}
              altText={content.profile.photoAlt}
              fallbackType="profileMonogram"
              aspectRatio="1:1"
              enableLightbox={true}
            />
          </div>

          <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-2 text-[13px] font-mono">
            <div className="flex justify-between">
              <span className="text-[#4A4A45] dark:text-[#B4B3AC]">Location:</span>
              <span className="text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold">{content.profile.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A45] dark:text-[#B4B3AC]">Status:</span>
              <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">{content.profile.availability}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#4A4A45] dark:text-[#B4B3AC]">Degree:</span>
              <span className="text-[#1B1B1B] dark:text-[#ECEBE6]">BSc Hons Data Science (2.1)</span>
            </div>
          </div>
        </div>

        {/* 3-Paragraph Story */}
        <div className="md:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
            <h2 id="story-title" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
              01. Journey from Zimbabwe to Qatar
            </h2>
          </div>

          <div className="space-y-4 text-[17px] text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.6] max-w-[68ch]">
            {content.about.paragraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </section>

      {/* Education Section */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#2E332E] pt-12" aria-labelledby="education-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="education-title" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            02. Formal Education
          </h2>
        </div>

        <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                <h3 className="font-serif text-2xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                  {content.education.degree}
                </h3>
              </div>
              <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] mt-1">
                {content.education.institution}
              </p>
            </div>

            <div className="text-[13px] font-mono sm:text-right">
              <span className="block font-semibold text-[#0B5A4D] dark:text-[#3FB59B]">
                {content.education.classification}
              </span>
              <span className="text-[#4A4A45] dark:text-[#B4B3AC]">
                Graduated {content.education.graduationDate}
              </span>
            </div>
          </div>

          {/* Class 1 Results */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
              <span className="text-[13px] font-mono uppercase tracking-[0.06em] text-[#1B1B1B] dark:text-[#ECEBE6] font-semibold">
                Class 1 Academic Distinctions:
              </span>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[14px] text-[#4A4A45] dark:text-[#B4B3AC]">
              {content.education.class1Results.map((subject) => (
                <li key={subject} className="flex items-start gap-2 p-3 bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E]">
                  <span className="text-[#0B5A4D] dark:text-[#3FB59B] font-mono font-bold" aria-hidden="true">✓</span>
                  <span>{subject}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section (Newest First) - cards with consistent 24px padding & hover lift */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#2E332E] pt-12" aria-labelledby="experience-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="experience-title" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            03. Experience Timeline (Newest First)
          </h2>
        </div>

        <div className="space-y-6">
          {content.timeline.map((entry, index) => (
            <div
              key={`${entry.company}-${index}`}
              className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-3">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                  <h3 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                    {entry.role}
                  </h3>
                </div>
                <span className="text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                  {entry.period}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                <span className="font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">{entry.company}</span>
                <span aria-hidden="true">·</span>
                <span>{entry.type}</span>
              </div>

              {entry.bullets && entry.bullets.length > 0 && (
                <ul className="pt-2 space-y-2 text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6] list-disc list-inside">
                  {entry.bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Languages Section */}
      <section className="space-y-6 border-t border-[#E4E2DC] dark:border-[#2E332E] pt-12" aria-labelledby="languages-title">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <h2 id="languages-title" className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            04. Languages
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {content.languages.map((item) => (
            <div
              key={item.language}
              className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#0B5A4D] dark:hover:border-[#3FB59B] hover:-translate-y-0.5 transition-all duration-150 motion-reduce:hover:translate-y-0 motion-reduce:transition-none space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                <h3 className="font-serif text-lg font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                  {item.language}
                </h3>
              </div>
              <p className="text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
                {item.proficiency} Proficiency
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
