import React, { useEffect, useState, useRef } from 'react';
import { Essay } from '../types';

interface EssayModalProps {
  essay: Essay | null;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const EssayModal: React.FC<EssayModalProps> = ({ essay, onClose, onShowToast }) => {
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (essay) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [essay, onClose]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;
    if (maxScroll > 0) {
      setScrollPercentage((scrollTop / maxScroll) * 100);
    }
  };

  const handleCopyLink = () => {
    if (!essay) return;
    const url = `${window.location.origin}/#essay-${essay.id}`;
    navigator.clipboard.writeText(url).then(() => {
      onShowToast?.(`Copied link to essay: "${essay.title}"`);
    });
  };

  if (!essay) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-essay-title"
    >
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="modal-container"
        style={{ position: 'relative' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Reading Progress Indicator */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: `${scrollPercentage}%`,
            height: '3px',
            backgroundColor: 'var(--accent-primary)',
            zIndex: 30,
            transition: 'width 60ms ease-out',
          }}
          aria-hidden="true"
        />

        {/* Sticky Header with Font Controls & Share */}
        <div className="modal-header-sticky">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {essay.date} &bull; {essay.readTime}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Text scaling buttons */}
            <div style={{ display: 'flex', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setFontSizeMultiplier((prev) => Math.max(0.9, prev - 0.1))}
                aria-label="Decrease text size"
                title="Decrease font size"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSizeMultiplier((prev) => Math.min(1.3, prev + 0.1))}
                aria-label="Increase text size"
                title="Increase font size"
                style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', background: 'var(--bg-surface)', color: 'var(--text-secondary)', borderLeft: '1px solid var(--border-medium)' }}
              >
                A+
              </button>
            </div>

            {/* Copy link button */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCopyLink}
              title="Copy link to this essay"
              style={{ fontSize: '0.75rem', padding: '0.3rem 0.55rem' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              <span>Link</span>
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close reading view"
              title="Press Esc to close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.85rem' }}>
            {essay.tags.map((tag) => (
              <span key={tag} className="tech-tag" style={{ background: 'var(--bg-subtle)' }}>
                {tag}
              </span>
            ))}
          </div>

          <h2 id="modal-essay-title" style={{ fontSize: `${2.1 * fontSizeMultiplier}rem`, lineHeight: 1.2, marginBottom: '0.65rem' }}>
            {essay.title}
          </h2>

          <p style={{ fontSize: `${1.1 * fontSizeMultiplier}rem`, fontStyle: 'italic', color: 'var(--text-muted)', marginBottom: '1.75rem', fontFamily: 'var(--font-serif)' }}>
            {essay.subtitle}
          </p>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <div className="essay-body-content" style={{ fontSize: `${1.05 * fontSizeMultiplier}rem` }}>
              {essay.content.map((paragraph, index) => (
                <p key={index} style={{ fontSize: `${1.05 * fontSizeMultiplier}rem` }}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Written by Aariz Shadman &bull; {essay.date}
            </span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
            >
              Done reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
