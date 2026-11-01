import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { portfolioData } from './data/portfolioData';
import { Project, Essay } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Pathways } from './components/Pathways';
import { Currently } from './components/Currently';
import { Projects } from './components/Projects';
import { Writing } from './components/Writing';
import { ReadingShelf } from './components/ReadingShelf';
import { Timeline } from './components/Timeline';
import { Contact } from './components/Contact';
import { Toast } from './components/Toast';
import { Reveal } from './components/Reveal';

// Lazy-load modal overlays so initial page bundle is as light as possible
const ProjectModal = lazy(() =>
  import('./components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);
const EssayModal = lazy(() =>
  import('./components/EssayModal').then((m) => ({ default: m.EssayModal }))
);
const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);
const CommandPalette = lazy(() =>
  import('./components/CommandPalette').then((m) => ({ default: m.CommandPalette }))
);

export const App: React.FC = () => {
  // Theme state with local persistence and system fallback
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('aariz_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('aariz_theme', theme);
  }, [theme]);

  // Track scroll position for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  // Safe clipboard copying with document.execCommand fallback
  const handleCopyEmail = useCallback(() => {
    const email = portfolioData.personal.email;
    const fallbackCopy = () => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast(`Copied email to clipboard: ${email}`);
      } catch {
        showToast(`Email: ${email}`);
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email)
        .then(() => showToast(`Copied email to clipboard: ${email}`))
        .catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  }, [showToast]);

  // Global keyboard shortcuts for Cmd+K and /
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      } else if (e.key === '/' && !isCmdOpen && !selectedProject && !selectedEssay && !isResumeOpen) {
        e.preventDefault();
        setIsCmdOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isCmdOpen, selectedProject, selectedEssay, isResumeOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container" data-theme={theme}>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenCmdPalette={() => setIsCmdOpen(true)}
        onOpenResumeModal={() => setIsResumeOpen(true)}
      />

      <main>
        <Hero
          onCopyEmail={handleCopyEmail}
          onOpenResumeModal={() => setIsResumeOpen(true)}
        />

        {/* Hand-drawn squiggle divider (SPC-style) */}
        <div className="squiggle-divider hero-squiggle" aria-hidden="true">
          <img
            src="/img/squiggle.svg"
            alt=""
            width={1700}
            height={340}
            loading="eager"
            decoding="async"
          />
        </div>

        <Pathways />

        {/* Ghost-white band with faint orbit linework */}
        <div className="band-ghost band-plate band-has-deco">
          <div className="band-deco band-deco-tr" aria-hidden="true">
            <img src="/img/orbit.svg" alt="" loading="lazy" decoding="async" />
          </div>
          <Reveal>
            <Currently />
          </Reveal>
        </div>

        <Reveal>
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
        </Reveal>

        {/* Light steel-blue band for field notes */}
        <div className="band-steel band-plate">
          <Reveal>
            <Writing onSelectEssay={(essay) => setSelectedEssay(essay)} />
          </Reveal>
        </div>

        <Reveal>
          <ReadingShelf />
        </Reveal>

        {/* Ghost band for the journey timeline */}
        <div className="band-ghost band-plate band-has-deco">
          <div className="band-deco band-deco-bl" aria-hidden="true">
            <img src="/img/orbit.svg" alt="" loading="lazy" decoding="async" />
          </div>
          <Reveal>
            <Timeline />
          </Reveal>
        </div>

        <Reveal>
          <Contact
            onCopyEmail={handleCopyEmail}
            onOpenResumeModal={() => setIsResumeOpen(true)}
          />
        </Reveal>
      </main>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Back to top"
          title="Scroll back to top"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-secondary)',
            display: 'grid',
            placeItems: 'center',
            boxShadow: 'var(--shadow-md)',
            zIndex: 40,
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      )}

      {/* Modals & Dialogs (Loaded dynamically on user interaction) */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {selectedEssay && (
          <EssayModal
            essay={selectedEssay}
            onClose={() => setSelectedEssay(null)}
            onShowToast={showToast}
          />
        )}

        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        )}

        {isCmdOpen && (
          <CommandPalette
            isOpen={isCmdOpen}
            onClose={() => setIsCmdOpen(false)}
            onSelectProject={(project) => setSelectedProject(project)}
            onSelectEssay={(essay) => setSelectedEssay(essay)}
            onToggleTheme={toggleTheme}
            onCopyEmail={handleCopyEmail}
            onOpenResumeModal={() => setIsResumeOpen(true)}
          />
        )}
      </Suspense>

      {/* Subtle Toast Feedback */}
      <Toast message={toastMessage} />
    </div>
  );
};

export default App;
