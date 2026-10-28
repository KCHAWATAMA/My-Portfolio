/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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

    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] dark:bg-[#121412] text-[#1B1B1B] dark:text-[#ECEBE6] transition-colors">
      <SkipLink />
      <Header currentPath={currentHash} />
      
      <main id="main-content" tabIndex={-1} className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 focus:outline-hidden">
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
