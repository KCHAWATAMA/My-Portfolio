/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Edit Pictures Page (#/admin - unlinked in navigation).
 * Allows testing and previewing device-local pictures across all visual slots.
 */

import React, { useState, useEffect } from 'react';
import { content } from '../content.ts';
import { PICTURE_SLOTS, PictureSlotInfo, setSlotPreview, removeSlotPreview, usePictureSlot } from '../utils/pictureStore.ts';
import { VisualSlot } from '../components/VisualSlot.tsx';
import { Upload, Trash2, AlertCircle, CheckCircle2, FileText, ArrowLeft, Info } from 'lucide-react';

function SlotAdminCard({ slot }: { slot: PictureSlotInfo }) {
  const { effectiveUrl, isPreview } = usePictureSlot(slot.id);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    setErrorMsg(null);
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg('Invalid file format. Please upload JPG, PNG, or WEBP only.');
      return;
    }
    const maxBytes = 5 * 1024 * 1024; // 5 MB
    if (file.size > maxBytes) {
      setErrorMsg('File exceeds 5 MB limit. Please optimize or compress the image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setSlotPreview(slot.id, dataUrl);
      }
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="p-6 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        
        {/* Header: Slot ID & Name */}
        <div className="flex items-start justify-between gap-2 border-b border-[#E4E2DC] dark:border-[#272B27] pb-2">
          <div>
            <span className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold block">
              {slot.id}
            </span>
            <h3 className="font-serif text-base font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
              {slot.name}
            </h3>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27] text-[#5A5A55] dark:text-[#9E9D96]">
            {slot.aspectRatio}
          </span>
        </div>

        {/* Location & Specs */}
        <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96]">
          <strong>Appears in:</strong> {slot.location}
        </p>

        <div className="grid grid-cols-2 gap-2 text-xs font-mono p-2.5 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27]">
          <div>
            <span className="text-[10px] text-[#5A5A55] dark:text-[#9E9D96] uppercase block">Recommended Size</span>
            <span className="text-[#1B1B1B] dark:text-[#ECEBE6] text-[11px]">{slot.recommendedSize}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#5A5A55] dark:text-[#9E9D96] uppercase block">GitHub File Name</span>
            <code className="text-[#0E6B5C] dark:text-[#3FB59B] text-[11px]">{slot.fileName}</code>
          </div>
        </div>

        {/* Current Visual Thumbnail Preview */}
        <div className="border border-[#E4E2DC] dark:border-[#272B27]">
          <VisualSlot
            slotId={slot.id}
            altText={`Preview for ${slot.name}`}
            fallbackType={slot.fallbackType}
            projectSlug={slot.projectSlug}
            aspectRatio={slot.aspectRatio}
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 text-xs font-mono">
          {isPreview ? (
            <span className="text-[#0E6B5C] dark:text-[#3FB59B] flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Active local preview</span>
            </span>
          ) : effectiveUrl ? (
            <span className="text-[#5A5A55] dark:text-[#9E9D96] flex items-center gap-1">
              <span>Image from content.ts</span>
            </span>
          ) : (
            <span className="text-[#5A5A55] dark:text-[#9E9D96] flex items-center gap-1">
              <span>Drawn fallback visual active</span>
            </span>
          )}
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-2 text-xs font-mono text-red-700 bg-red-50 dark:bg-red-950/30 dark:text-red-400 border border-red-200 dark:border-red-900/50 flex items-start gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{errorMsg}</span>
          </div>
        )}
      </div>

      {/* Upload Drag & Drop Box */}
      <div className="pt-2 space-y-2">
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center p-4 border border-dashed cursor-pointer transition-colors ${
            isDragging
              ? 'border-[#0E6B5C] dark:border-[#3FB59B] bg-[#0E6B5C]/5 dark:bg-[#3FB59B]/5'
              : 'border-[#E4E2DC] dark:border-[#272B27] hover:border-[#0E6B5C] dark:hover:border-[#3FB59B] bg-[#F8F7F3] dark:bg-[#151815]'
          }`}
        >
          <Upload className="w-4 h-4 text-[#0E6B5C] dark:text-[#3FB59B] mb-1" aria-hidden="true" />
          <span className="text-xs font-medium text-[#1B1B1B] dark:text-[#ECEBE6]">
            Choose picture or drop here
          </span>
          <span className="text-[10px] text-[#5A5A55] dark:text-[#9E9D96] font-mono mt-0.5">
            JPG, PNG, WEBP (max 5 MB)
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>

        {isPreview && (
          <button
            type="button"
            onClick={() => removeSlotPreview(slot.id)}
            className="w-full py-1.5 px-3 text-xs font-mono text-red-600 dark:text-red-400 hover:text-red-700 border border-red-200 dark:border-red-900/40 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Remove preview (restore drawn visual)</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function AdminPicturesPage() {
  useEffect(() => {
    // Add noindex tag to page
    let metaTag = document.querySelector('meta[name="robots"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.setAttribute('name', 'robots');
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute('content', 'noindex');

    document.title = 'Edit Pictures | Kuzivakwashe Joshua Chawatama';

    return () => {
      metaTag?.setAttribute('content', 'all');
    };
  }, []);

  const hasCvUrl = Boolean(content.profile.cvUrl && content.profile.cvUrl.trim() !== '');

  return (
    <div className="space-y-12 sm:space-y-16 py-4" aria-labelledby="admin-title">
      
      {/* Top navigation back */}
      <div className="flex items-center justify-between border-b border-[#E4E2DC] dark:border-[#272B27] pb-4">
        <a
          href="#/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#0E6B5C] dark:text-[#3FB59B] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Back to portfolio</span>
        </a>
        <span className="font-mono text-xs uppercase text-[#5A5A55] dark:text-[#9E9D96]">
          Local Media Workbench (#/admin)
        </span>
      </div>

      {/* Header */}
      <section className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-8 h-px bg-[#0E6B5C] dark:bg-[#3FB59B]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-wider text-[#0E6B5C] dark:text-[#3FB59B] font-semibold">
            Picture Slots Management
          </p>
        </div>

        <h1 id="admin-title" className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1B1B1B] dark:text-[#ECEBE6]">
          Edit Pictures and Media Previews
        </h1>

        <p className="text-sm text-[#5A5A55] dark:text-[#9E9D96] max-w-[68ch]">
          Preview device-local images across every picture slot. Real images automatically replace drawn visuals site-wide without layout shift.
        </p>
      </section>

      {/* Prominent device-only banner */}
      <div className="p-4 sm:p-5 bg-[#0E6B5C]/10 dark:bg-[#3FB59B]/10 border border-[#0E6B5C]/30 dark:border-[#3FB59B]/30 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#0E6B5C] dark:text-[#3FB59B] shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1 text-xs">
          <p className="font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
            Previews are only visible on this device.
          </p>
          <p className="text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
            To publish permanently, upload the file to <code className="font-mono text-[#0E6B5C] dark:text-[#3FB59B]">public/images</code> on GitHub with the exact name shown on the card, then set the corresponding path in <code className="font-mono text-[#0E6B5C] dark:text-[#3FB59B]">src/content.ts</code>.
          </p>
        </div>
      </div>

      {/* Alt Text Writing Reminder */}
      <div className="p-4 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] flex items-center justify-between gap-4 text-xs">
        <span className="font-mono text-[#5A5A55] dark:text-[#9E9D96]">
          <strong>Accessibility reminder:</strong> Always ensure meaningful <code className="font-mono">altText</code> is configured in <code className="font-mono">src/content.ts</code> for every project and gallery item before deploying.
        </span>
      </div>

      {/* Slots Grid */}
      <section aria-label="Picture slots list" className="space-y-6">
        <h2 className="font-serif text-xl font-semibold text-[#1B1B1B] dark:text-[#ECEBE6] border-b border-[#E4E2DC] dark:border-[#272B27] pb-2">
          Configured Visual Slots ({PICTURE_SLOTS.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PICTURE_SLOTS.map((slot) => (
            <SlotAdminCard key={slot.id} slot={slot} />
          ))}
        </div>
      </section>

      {/* Requirement C9: CV Section */}
      <section aria-label="Curriculum Vitae section" className="p-6 sm:p-8 bg-[#FFFFFF] dark:bg-[#181B18] border border-[#E4E2DC] dark:border-[#272B27] space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#0E6B5C] dark:text-[#3FB59B]" aria-hidden="true" />
          <h2 className="font-serif text-lg font-semibold text-[#1B1B1B] dark:text-[#ECEBE6]">
            Curriculum Vitae Configuration
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono p-4 bg-[#F4F3EE] dark:bg-[#121412] border border-[#E4E2DC] dark:border-[#272B27]">
          <div>
            <span className="text-[10px] text-[#5A5A55] dark:text-[#9E9D96] uppercase block">Current Status</span>
            <span className={hasCvUrl ? 'text-[#0E6B5C] dark:text-[#3FB59B] font-semibold' : 'text-[#5A5A55] dark:text-[#9E9D96]'}>
              {hasCvUrl ? `Configured: ${content.profile.cvUrl}` : 'Not set (Download CV button is hidden)'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5A5A55] dark:text-[#9E9D96] uppercase block">Target Upload Path on GitHub</span>
            <code className="text-[#0E6B5C] dark:text-[#3FB59B]">public/cv/Kuzivakwashe-Chawatama-CV.pdf</code>
          </div>
        </div>

        <p className="text-xs text-[#5A5A55] dark:text-[#9E9D96] leading-relaxed">
          When ready to publish your CV, upload <code className="font-mono">Kuzivakwashe-Chawatama-CV.pdf</code> to <code className="font-mono">public/cv/</code> in your repository and set <code className="font-mono">cvUrl: "/cv/Kuzivakwashe-Chawatama-CV.pdf"</code> in <code className="font-mono">src/content.ts</code>. The "Download CV" buttons will then appear automatically.
        </p>
      </section>

    </div>
  );
}
