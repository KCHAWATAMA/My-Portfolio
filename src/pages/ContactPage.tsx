/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { content } from '../content.ts';
import { Phone, Linkedin, Github, MapPin, Send, Copy, Check, Clock } from 'lucide-react';

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
      <section className="space-y-4 border-b border-[#E4E2DC] dark:border-[#2E332E] pb-8">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0B5A4D] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-[13px] uppercase tracking-[0.06em] text-[#0B5A4D] dark:text-[#3FB59B] font-semibold">
            Inquiries and Communications
          </p>
        </div>

        <h1 id="contact-title" className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
          Contact Kuzivakwashe Joshua Chawatama
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 max-w-[68ch]">
          <p className="text-lg text-[#4A4A45] dark:text-[#B4B3AC] leading-[1.6]">
            Based in Al Wakra, Qatar. Available immediately for data science, machine learning, and backend engineering positions.
          </p>
        </div>

        {/* Response time note */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#F8F7F3] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] text-[13px] font-mono text-[#0B5A4D] dark:text-[#3FB59B]">
          <Clock className="w-4 h-4" aria-hidden="true" />
          <span className="font-semibold">Response time: Usually within 24 hours</span>
        </div>
      </section>

      {/* Grid: Direct Contact Details & Mailto Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-6">
            <h2 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] border-b border-[#E4E2DC] dark:border-[#2E332E] pb-3 leading-[1.2]">
              Direct Contact Information
            </h2>

            <ul className="space-y-4 text-[13px] font-mono">
              <li className="space-y-1">
                <span className="text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em]">
                  Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${content.profile.email}`}
                    className="text-[#0B5A4D] dark:text-[#3FB59B] font-semibold hover:underline break-all py-1 min-h-[24px] inline-flex items-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                  >
                    {content.profile.email}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="min-h-[44px] min-w-[44px] p-2 border border-[#E4E2DC] dark:border-[#2E332E] hover:border-[#1B1B1B] dark:hover:border-[#ECEBE6] text-[#4A4A45] dark:text-[#B4B3AC] transition-colors cursor-pointer shrink-0 flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                    aria-label="Copy email address"
                    title="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B]" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </li>

              <li className="space-y-1">
                <span className="text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em]">
                  Phone Number
                </span>
                <a
                  href={`tel:${content.profile.phone.replace(/\s+/g, '')}`}
                  className="text-[#1B1B1B] dark:text-[#ECEBE6] hover:text-[#0B5A4D] dark:hover:text-[#3FB59B] transition-colors py-1 min-h-[24px] inline-flex items-center font-semibold focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  {content.profile.phone}
                </a>
              </li>

              <li className="space-y-1">
                <span className="text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em]">
                  Location & Availability
                </span>
                <div className="flex items-start gap-2 text-[#1B1B1B] dark:text-[#ECEBE6] font-sans py-1">
                  <MapPin className="w-4 h-4 text-[#0B5A4D] dark:text-[#3FB59B] shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-[15px]">{content.profile.location}</p>
                    <p className="text-[13px] font-mono text-[#0B5A4D] dark:text-[#3FB59B] font-semibold mt-0.5">
                      {content.profile.availability}
                    </p>
                  </div>
                </div>
              </li>

              <li className="space-y-2 pt-2 border-t border-[#E4E2DC] dark:border-[#2E332E]">
                <span className="text-[#4A4A45] dark:text-[#B4B3AC] block uppercase tracking-[0.06em]">
                  Online Profiles
                </span>
                <div className="space-y-2 font-sans">
                  <a
                    href={content.profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] hover:underline py-1 min-h-[24px] focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none font-semibold"
                  >
                    <Linkedin className="w-4 h-4" aria-hidden="true" />
                    <span>LinkedIn (linkedin.com/in/kuzivakwashej)</span>
                  </a>
                  <a
                    href={content.profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[14px] text-[#0B5A4D] dark:text-[#3FB59B] hover:underline py-1 min-h-[24px] focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none font-semibold"
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>GitHub (github.com/KCHAWATAMA)</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Client-Side Mailto Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#2E332E] space-y-6">
            <div className="border-b border-[#E4E2DC] dark:border-[#2E332E] pb-3">
              <h2 className="font-serif text-xl font-bold text-[#1B1B1B] dark:text-[#ECEBE6] leading-[1.2]">
                Compose Direct Message
              </h2>
              <p className="text-[15px] text-[#4A4A45] dark:text-[#B4B3AC] mt-1 font-sans leading-relaxed">
                This form prepares a message and launches your local email client with no intermediary backend server.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="sender-name" className="block text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] uppercase tracking-[0.06em]">
                    Your Name
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-[14px] bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0B5A4D] dark:focus:border-[#3FB59B] outline-none focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B]"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="sender-email" className="block text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] uppercase tracking-[0.06em]">
                    Your Email Address
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. name@organization.com"
                    className="w-full min-h-[44px] px-3.5 py-2.5 text-[14px] bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0B5A4D] dark:focus:border-[#3FB59B] outline-none focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email-subject" className="block text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] uppercase tracking-[0.06em]">
                  Subject Line
                </label>
                <input
                  id="email-subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Engineering Opportunity / Project Discussion"
                  className="w-full min-h-[44px] px-3.5 py-2.5 text-[14px] bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0B5A4D] dark:focus:border-[#3FB59B] outline-none focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email-message" className="block text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC] uppercase tracking-[0.06em]">
                  Message Content
                </label>
                <textarea
                  id="email-message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note or question here..."
                  className="w-full p-3.5 text-[14px] bg-[#F8F7F3] dark:bg-[#151815] border border-[#E4E2DC] dark:border-[#2E332E] text-[#1B1B1B] dark:text-[#ECEBE6] focus:border-[#0B5A4D] dark:focus:border-[#3FB59B] resize-y outline-none focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center min-h-[44px] gap-2 px-6 py-2.5 text-[15px] font-medium text-[#FAFAF7] bg-[#0B5A4D] hover:bg-[#08453B] dark:bg-[#3FB59B] dark:text-[#121412] dark:hover:bg-[#4FD3B6] transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0B5A4D] dark:focus-visible:ring-[#3FB59B] outline-none"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Open Email Client (Mailto)</span>
                </button>

                <span className="text-[13px] font-mono text-[#4A4A45] dark:text-[#B4B3AC]">
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
