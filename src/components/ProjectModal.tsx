import React, { useEffect } from 'react';
import { Project } from '../types';
import { LoomKVSimulator, SynapseVisSimulator } from './ProjectSimulators';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Header */}
        <div className="modal-header-sticky">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="project-status-badge">{project.status}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {project.category} &bull; {project.year}
            </span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close project modal"
            title="Press Esc to close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h2 id="modal-project-title" style={{ fontSize: '1.9rem', marginBottom: '0.5rem' }}>
            {project.title}
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', fontWeight: 450 }}>
            {project.tagline}
          </p>

          {project.metrics && (
            <div className="project-metrics-pill" style={{ marginBottom: '1.75rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span>{project.metrics}</span>
            </div>
          )}

          {/* Breakdown Sections */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                The Problem
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>{project.problem}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                Architecture & Implementation
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>{project.architecture}</p>
              {project.id === 'loom-kv' && <LoomKVSimulator />}
              {project.id === 'synapse-vis' && <SynapseVisSimulator />}
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.4rem' }}>
                Learnings & Engineering Trade-offs
              </h3>
              <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)' }}>{project.learnings}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '0.6rem' }}>
                Technologies & Tools
              </h3>
              <div className="project-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', marginTop: '0.5rem' }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span>View Repository</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>Live Demo / Spec</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
