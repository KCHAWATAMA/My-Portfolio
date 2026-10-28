/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { content } from '../content.ts';
import { Mail, Phone, Linkedin, Github, MapPin, Send, Copy, Check } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(content.profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subjectLine = encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || 'Portfolio Visitor'}`
    );
    const bodyContent = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${content.profile.email}?subject=${subjectLine}&body=${bodyContent}`;
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-4" aria-labelledby="contact-title">
      
      {/* Header */}
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#272B27] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Inquiries and Communications
          </p>
        </div>

        <h1 id="contact-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
          Contact Kuzivakwashe Joshua Chawatama
        </h1>

        <p className="text-base text-[#5A5A55] dark:text-[#9E9D96] max-w-[68ch]">
          Based in Al Wakra, Qatar. Available immediately for data science, machine learning, and backend engineering positions.
        </p>
      </section>

      {/* Grid: Direct Contact Details & Mailto Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-6">
            <h2 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] border-b border-[#E4E2DC] dark:border-[#272B27] pb-3">
              Direct Contact Information
            </h2>

            <ul className="space-y-4 text-xs font-mono">
              <li className="space-y-1">
                <span className="text-[#5A5A55] dark:text-[#9E9D96] block uppercase tracking-wider text-[11px]">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${content.profile.email}`}
                    className="text-[#0E6B5C] dark:text-[#3FB59B] font-medium hover:underline break-all"
                  >
                    {content.profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 border border-[#E4E2DC] dark:border-[#272B27] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] text-[#5A5A55] dark:text-[#9E9D96] transition-colors cursor-pointer shrink-0"
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </li>

              <li className="space-y-1">
                <span className="text-[#5A5A55] dark:text-[#9E9D96] block uppercase tracking-wider text-[11px]">
                  Phone Number
                </span>
                <a
                  href={`tel:${content.profile.phone.replace(/\s+/g, '')}`}
                  className="text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0E6B5C] dark:hover:text-[#3FB59B] transition-colors block"
                >
                  {content.profile.phone}
                </a>
              </li>

              <li className="space-y-1">
                <span className="text-[#5A5A55] dark:text-[#9E9D96] block uppercase tracking-wider text-[11px]">
                  Location & Availability
                </span>
                <div className="flex items-start gap-1.5 text-[#1B1B1B] dark:text-[#ECEBE6] font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#0E6B5C] dark:text-[#3FB59B] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p>{content.profile.location}</p>
                    <p className="text-xs font-mono text-[#0E6B5C] dark:text-[#3FB59B] font-semibold mt-0.5">
                      {content.profile.availability}
                    </p>
                  </div>
                </div>
              </li>

              <li className="space-y-1 pt-2 border-t border-[#E4E2DC] dark:border-[#272B27]">
                <span className="text-[#5A5A55] dark:text-[#9E9D96] block uppercase tracking-wider text-[11px]">
                  Online Profiles
                </span>
                <div className="space-y-2 pt-1 font-sans">
                  <a
                    href={content.profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
                  >
                    <Linkedin className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>LinkedIn (linkedin.com/in/kuzivakwashej)</span>
                  </a>
                  <a
                    href={content.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
                  >
                    <Github className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>GitHub (github.com/KCHAWATAMA)</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Client-Side Mailto Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-6">
            <div className="border-b border-[#E4E2DC] dark:border-[#272B27] pb-3">
              <h2 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
                Compose Direct Message
              </h2>
              <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96] mt-1 font-sans">
                This form prepares a message and launches your local email client with no intermediary backend server.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="sender-name" className="block text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                    Your Name
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3 py-2 text-xs bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0E6B5C] dark:focus:border-[#3FB59B]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="sender-email" className="block text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                    Your Email Address
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@organization.com"
                    className="w-full px-3 py-2 text-xs bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0E6B5C] dark:focus:border-[#3FB59B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email-subject" className="block text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                  Subject Line
                </label>
                <input
                  id="email-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Engineering Opportunity / Project Discussion"
                  className="w-full px-3 py-2 text-xs bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0E6B5C] dark:focus:border-[#3FB59B]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email-message" className="block text-xs font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                  Message Content
                </label>
                <textarea
                  id="email-message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note or question here..."
                  className="w-full px-3 py-2 text-xs bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0E6B5C] dark:focus:border-[#3FB59B] resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-medium text-[#FAFAF7] bg-[#0E6B5C] hover:bg-[#0A4F44] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Email Client (Mailto)</span>
                </button>

                <span className="text-[11px] font-mono text-[#5A5A55] dark:text-[#9E9D96]">
                  Opens your default mail app
                </span>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  );
}
