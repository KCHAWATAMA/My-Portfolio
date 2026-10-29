/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * IndexedDB & Memory store for local picture previews.
 * Wraps all storage in try/catch and falls back to in-memory state.
 */

import { useState, useEffect } from 'react';

export interface PictureSlotInfo {
  id: string;
  name: string;
  location: string;
  recommendedSize: string;
  fileName: string;
  aspectRatio: '16:10' | '1:1';
  fallbackType: 'profileMonogram' | 'resultsMiniChart' | 'pipelineDiagram' | 'explainability' | 'dashboardSketch' | 'proofTiles';
  projectSlug?: string;
}

export const PICTURE_SLOTS: PictureSlotInfo[] = [
  {
    id: 'hero-photo',
    name: 'Hero Profile Photo',
    location: 'Home page hero (right column on desktop, above name on mobile)',
    recommendedSize: '800 × 800 px (1:1 square)',
    fileName: 'profile.jpg',
    aspectRatio: '1:1',
    fallbackType: 'profileMonogram'
  },
  {
    id: 'about-photo',
    name: 'About Page Profile Photo',
    location: 'About page biography sidebar',
    recommendedSize: '800 × 800 px (1:1 square)',
    fileName: 'profile.jpg',
    aspectRatio: '1:1',
    fallbackType: 'profileMonogram'
  },
  {
    id: 'aerotwin-card',
    name: 'AeroTwin Project Card',
    location: 'Home & Projects catalog card header',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'aerotwin-dashboard.png',
    aspectRatio: '16:10',
    fallbackType: 'resultsMiniChart',
    projectSlug: 'aerotwin'
  },
  {
    id: 'aerotwin-fig-1',
    name: 'AeroTwin Figure 1',
    location: 'AeroTwin Case Study Gallery (Figure 1: Pipeline)',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'aerotwin-pipeline.png',
    aspectRatio: '16:10',
    fallbackType: 'pipelineDiagram',
    projectSlug: 'aerotwin'
  },
  {
    id: 'aerotwin-fig-2',
    name: 'AeroTwin Figure 2',
    location: 'AeroTwin Case Study Gallery (Figure 2: Explainability)',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'aerotwin-shap.png',
    aspectRatio: '16:10',
    fallbackType: 'explainability',
    projectSlug: 'aerotwin'
  },
  {
    id: 'sensorstream-card',
    name: 'SensorStream Project Card',
    location: 'Home & Projects catalog card header',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'sensorstream-dashboard.png',
    aspectRatio: '16:10',
    fallbackType: 'pipelineDiagram',
    projectSlug: 'sensorstream'
  },
  {
    id: 'sensorstream-fig-1',
    name: 'SensorStream Figure 1',
    location: 'SensorStream Case Study Gallery (Figure 1: Pipeline)',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'sensorstream-pipeline.png',
    aspectRatio: '16:10',
    fallbackType: 'pipelineDiagram',
    projectSlug: 'sensorstream'
  },
  {
    id: 'sensorstream-fig-2',
    name: 'SensorStream Figure 2',
    location: 'SensorStream Case Study Gallery (Figure 2: Wireframe)',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'sensorstream-powerbi.png',
    aspectRatio: '16:10',
    fallbackType: 'dashboardSketch',
    projectSlug: 'sensorstream'
  },
  {
    id: 'kaributech-card',
    name: 'KaribuTech Banking Card',
    location: 'Home & Projects catalog card header',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'kaributech-proof.png',
    aspectRatio: '16:10',
    fallbackType: 'proofTiles',
    projectSlug: 'kaributech-banking'
  },
  {
    id: 'kaributech-fig-1',
    name: 'KaribuTech Figure 1',
    location: 'KaribuTech Case Study Gallery (Figure 1: Pipeline)',
    recommendedSize: '1600 × 1000 px (16:10)',
    fileName: 'kaributech-pipeline.png',
    aspectRatio: '16:10',
    fallbackType: 'pipelineDiagram',
    projectSlug: 'kaributech-banking'
  }
];

// In-memory cache fallback
const memoryCache = new Map<string, string>();
const DB_NAME = 'portfolio_picture_previews';
const DB_VERSION = 1;
const STORE_NAME = 'slots';

function openDB(): Promise<IDBDatabase | null> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'slotId' });
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

export async function getSlotPreview(slotId: string): Promise<string | null> {
  if (memoryCache.has(slotId)) {
    return memoryCache.get(slotId) || null;
  }
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      try {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(slotId);
        req.onsuccess = () => {
          const result = req.result ? req.result.dataUrl : null;
          if (result) memoryCache.set(slotId, result);
          resolve(result);
        };
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  } catch {
    return null;
  }
}

export async function setSlotPreview(slotId: string, dataUrl: string): Promise<void> {
  memoryCache.set(slotId, dataUrl);
  try {
    const db = await openDB();
    if (db) {
      await new Promise<void>((resolve) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put({ slotId, dataUrl, timestamp: Date.now() });
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }
  } catch {
    // Memory fallback already set
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('picture-slot-updated', { detail: { slotId, dataUrl } }));
  }
}

export async function removeSlotPreview(slotId: string): Promise<void> {
  memoryCache.delete(slotId);
  try {
    const db = await openDB();
    if (db) {
      await new Promise<void>((resolve) => {
        try {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.delete(slotId);
          tx.oncomplete = () => resolve();
          tx.onerror = () => resolve();
        } catch {
          resolve();
        }
      });
    }
  } catch {
    // In-memory cleared
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('picture-slot-updated', { detail: { slotId, dataUrl: null } }));
  }
}

export function usePictureSlot(slotId?: string, defaultUrl?: string) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!slotId) return;

    let isMounted = true;
    getSlotPreview(slotId).then((data) => {
      if (isMounted) setPreviewUrl(data);
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ slotId: string; dataUrl: string | null }>;
      if (customEvent.detail && customEvent.detail.slotId === slotId) {
        setPreviewUrl(customEvent.detail.dataUrl);
      }
    };

    window.addEventListener('picture-slot-updated', handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener('picture-slot-updated', handleUpdate);
    };
  }, [slotId]);

  // Order of priority:
  // (1) preview picture set on Edit pictures page
  // (2) imageUrl in content.ts
  // (3) null (which triggers drawn fallback visual)
  if (previewUrl && previewUrl.trim() !== '') {
    return { effectiveUrl: previewUrl, isPreview: true };
  }
  if (defaultUrl && defaultUrl.trim() !== '') {
    return { effectiveUrl: defaultUrl, isPreview: false };
  }
  return { effectiveUrl: null, isPreview: false };
}
