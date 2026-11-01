import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenCmdPalette: () => void;
  onOpenResumeModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  onOpenCmdPalette,
  onOpenResumeModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = React.useRef<HTMLElement>(null);

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Collaborate', href: '#collaborate', id: 'collaborate' },
    { label: 'Currently', href: '#currently', id: 'currently' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Writing', href: '#writing', id: 'writing' },
    { label: 'Reading', href: '#reading', id: 'reading' },
    { label: 'Journey', href: '#journey', id: 'journey' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Track scroll reading progress and active section
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Scrollspy
      const sectionElements = navLinks.map((link) => ({
        id: link.id,
        el: document.getElementById(link.id),
      }));

      const scrollPosition = window.scrollY + 120;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keep the drawer usable with touch, mouse, and keyboard:
  // Escape closes it, outside clicks close it, and it never outlives a
  // resize back to the desktop breakpoint.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      {/* Subtle Scroll Reading Progress Bar */}
      <div
        className="header-progress-bar"
        style={{
          width: `${scrollProgress}%`,
          height: '2px',
          backgroundColor: 'var(--accent-primary)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          transition: 'width 80ms ease-out',
          zIndex: 60,
        }}
        aria-hidden="true"
      />

      <div className="content-wrapper header-inner">
        <a href="#about" className="brand-link" aria-label="Go to top / Aariz Shadman home">
          <div className="brand-monogram" aria-hidden="true">
            A
          </div>
          <div className="brand-info">
            <span className="brand-name">{portfolioData.personal.name}</span>
            <span className="brand-subtitle">student &amp; builder</span>
          </div>
        </a>

        {/* Desktop Navigation with dynamic scrollspy */}
        <nav aria-label="Main Navigation">
          <ul className="nav-links">
            {navLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick actions: Command palette trigger & Theme Toggle */}
        <div className="header-actions">
          {onOpenResumeModal && (
            <button
              type="button"
              className="cv-quick-btn"
              onClick={onOpenResumeModal}
              title="View formatted CV / Resume"
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                padding: '0.35rem 0.65rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-medium)',
                background: 'var(--bg-surface)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              CV
            </button>
          )}

          <button
            type="button"
            className="cmd-trigger-btn"
            onClick={onOpenCmdPalette}
            title="Search portfolio (Cmd+K or /)"
            aria-label="Open command palette"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>Search</span>
            <kbd className="cmd-kbd">⌘K</kbd>
          </button>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="mobile-nav-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {mobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile / compact drawer */}
      {mobileMenuOpen && (
        <nav
          className="mobile-menu-drawer"
          id="mobile-navigation-menu"
          aria-label="Mobile Navigation"
        >
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`mobile-menu-link ${activeSection === item.id ? 'active' : ''}`}
              aria-current={activeSection === item.id ? 'true' : undefined}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          {onOpenResumeModal && (
            <button
              type="button"
              className="mobile-menu-link"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResumeModal();
              }}
            >
              View Quick Resume / CV
            </button>
          )}
        </nav>
      )}
    </header>
  );
};
