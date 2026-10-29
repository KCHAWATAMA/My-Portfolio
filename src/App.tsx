/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { content } from './content.ts';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { SkipLink } from './components/SkipLink.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { ProjectsPage } from './pages/ProjectsPage.tsx';
import { CaseStudyPage } from './pages/CaseStudyPage.tsx';
import { AboutPage } from './pages/AboutPage.tsx';
import { CredentialsPage } from './pages/CredentialsPage.tsx';
import { ContactPage } from './pages/ContactPage.tsx';
import { AdminPicturesPage } from './pages/AdminPicturesPage.tsx';
import { NotFoundPage } from './pages/NotFoundPage.tsx';

function MainRouter() {
  const [currentHash, setCurrentHash] = useState<string>(() => {
    return window.location.hash || '#/';
  });

  useEffect(() => {
    const handleHashChange = () => {
      const newHash = window.location.hash || '#/';
      setCurrentHash(newHash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync document title and meta description dynamically
  useEffect(() => {
    const cleanHash = currentHash.split('?')[0].replace(/\/$/, '') || '#';
    let title = `${content.profile.fullName} | Data Scientist`;
    let description = content.profile.pitch;

    if (cleanHash === '#/projects') {
      title = `Projects | ${content.profile.fullName}`;
      description = "Machine learning systems, streaming data simulations, and enterprise rule architectures.";
    } else if (cleanHash.startsWith('#/projects/')) {
      const slug = cleanHash.replace('#/projects/', '');
      const project = content.projects.find((p) => p.slug === slug);
      if (project) {
        title = `${project.title} — Case Study | ${content.profile.fullName}`;
        description = project.summary;
      }
    } else if (cleanHash === '#/about') {
      title = `About | ${content.profile.fullName}`;
      description = "Academic background in Data Science and Informatics, commercial banking engineering, and Qatar availability.";
    } else if (cleanHash === '#/credentials') {
      title = `Credentials & Certifications | ${content.profile.fullName}`;
      description = "Verified professional certifications in Google Data Analytics, Excel, Supervised ML, SQL, Python, and Data Protection.";
    } else if (cleanHash === '#/contact') {
      title = `Contact | ${content.profile.fullName} — Data Scientist in Qatar`;
      description = "Get in touch directly with Kuzivakwashe Joshua Chawatama in Al Wakra, Qatar. Available immediately.";
    } else if (cleanHash === '#/admin') {
      title = `Picture Manager (Local Preview) | ${content.profile.fullName}`;
      description = "Prototype picture upload and preview manager.";
    }

    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
  }, [currentHash]);

  // Determine active view based on hash
  const renderRoute = () => {
    const cleanHash = currentHash.split('?')[0].replace(/\/$/, '') || '#';

    if (cleanHash === '#' || cleanHash === '#/' || cleanHash === '') {
      return <HomePage />;
    }

    if (cleanHash === '#/projects') {
      return <ProjectsPage />;
    }

    if (cleanHash.startsWith('#/projects/')) {
      const slug = cleanHash.replace('#/projects/', '');
      return <CaseStudyPage slug={slug} />;
    }

    if (cleanHash === '#/about') {
      return <AboutPage />;
    }

    if (cleanHash === '#/credentials') {
      return <CredentialsPage />;
    }

    if (cleanHash === '#/contact') {
      return <ContactPage />;
    }

    if (cleanHash === '#/admin') {
      return <AdminPicturesPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] dark:bg-[#121412] text-[#1B1B1B] dark:text-[#ECEBE6] transition-colors">
      <SkipLink />
      <Header currentPath={currentHash} />
      
      <main id="main-content" tabIndex={-1} className="flex-grow max-w-7xl 2xl:max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 focus:outline-hidden">
        {renderRoute()}
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainRouter />
    </ThemeProvider>
  );
}
