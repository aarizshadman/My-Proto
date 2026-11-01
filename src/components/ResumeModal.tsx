import React, { useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const { personal, projects, timeline } = portfolioData;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div className="modal-container" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header with Print Button */}
        <div className="modal-header-sticky">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600 }}>
              Curriculum Vitae / Quick Resume
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handlePrint}
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
              title="Print or Save as PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close CV modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* CV Content */}
        <div className="modal-body print-area">
          <header style={{ borderBottom: '1px solid var(--border-medium)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
            <h2 id="cv-modal-title" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
              {personal.name}
            </h2>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-text)', marginBottom: '0.5rem' }}>
              {personal.title} &bull; {personal.location}
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>{personal.email}</span>
              <span>github.com/aarizshadman</span>
              <span>aarizshadman.dev</span>
            </div>
          </header>

          {/* Education */}
          <section style={{ padding: '0 0 1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              Education
            </h3>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.25rem 1rem' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>{personal.degree}</strong>
                <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>2023 &ndash; {personal.expectedGraduation}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Focus: Systems Programming, Distributed Primitives, Algorithms, Computer Architecture.
              </p>
            </div>
          </section>

          {/* Technical Selected Work */}
          <section style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              Selected Projects & Engineering Builds
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.slice(0, 4).map((p) => (
                <div key={p.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.2rem 1rem' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {p.title} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.85rem' }}>&ndash; {p.tagline}</span>
                    </span>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{p.year}</span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    {p.problem}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                    {p.technologies.map((t) => (
                      <span key={t} className="tech-tag" style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem' }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Competencies */}
          <section style={{ padding: '1.25rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              Core Competencies & Tooling
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>Languages:</strong>
                <span>Go, TypeScript, Rust, Python, C basics</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>Systems & Primitives:</strong>
                <span>File I/O, Crash Recovery (WAL), Skiplists, Sockets</span>
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '0.2rem' }}>Web & Interface:</strong>
                <span>React, Canvas API, IndexedDB, Web Workers, Pure CSS</span>
              </div>
            </div>
          </section>

          {/* Milestones */}
          <section style={{ padding: '1.25rem 0 0' }}>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              Activities & Milestones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {timeline.map((item, idx) => (
                <div key={idx} style={{ fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.15rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <span>{item.title}</span>
                    <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.year}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
