import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout & Global Components
import { TopNavbar, PageView } from './components/common/TopNavbar';
import { StickyRevealFooter } from './components/motion/StickyRevealFooter';
import { PageCurtains } from './components/motion/PageCurtains';
import { LoadingScreen } from './components/common/LoadingScreen';

// Page Views
import { HomePage } from './components/pages/HomePage';
import { WorkspacePage } from './components/pages/WorkspacePage';
import { FrameworkPage } from './components/pages/FrameworkPage';
import { WidgetsPage } from './components/pages/WidgetsPage';
import { LawsPage } from './components/pages/LawsPage';
import { ResourcesPage } from './components/pages/ResourcesPage';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageView>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling and sync with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // Sync hash routing on initial load and hash changes
  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      if (['home', 'workspace', 'framework', 'widgets', 'laws', 'resources'].includes(hash)) {
        setActivePage(hash);
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  return (
    <div className="voral-viewport-frame font-main min-h-screen bg-[#F4F3F1] text-[#111111] relative flex flex-col">
      {/* Sabi OS Boot Sequence Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Top Fixed / Sticky Navigation Bar */}
      <TopNavbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      {/* Main Content Viewport: Full width edge-to-edge layout across the entire display! */}
      <div className="relative z-10 flex flex-col flex-1 min-h-screen bg-[#F4F3F1] overflow-x-clip w-full">
        <PageCurtains pageKey={activePage}>
          <main className={`flex-1 w-full ${activePage !== 'home' ? 'pt-24 sm:pt-32 2xl:pt-36' : ''}`}>
            {activePage === 'home' && (
              <HomePage
                onNavigate={(page) => {
                  setActivePage(page as PageView);
                  window.location.hash = page;
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activePage === 'workspace' && (
              <WorkspacePage />
            )}

            {activePage === 'framework' && (
              <FrameworkPage />
            )}

            {activePage === 'widgets' && (
              <WidgetsPage />
            )}

            {activePage === 'laws' && (
              <LawsPage />
            )}

            {activePage === 'resources' && (
              <ResourcesPage />
            )}
          </main>
        </PageCurtains>

        {/* Seamless Motion Reveal Footer */}
        <StickyRevealFooter />
      </div>
    </div>
  );
};
