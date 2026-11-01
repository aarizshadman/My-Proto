import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import projectsArt from '../assets/projects-art.webp';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Systems',
    'AI & Tools',
    'Web Experiments',
    'Campus Tools',
  ];

  const getCategoryCount = (cat: ProjectCategory) => {
    if (cat === 'All') return portfolioData.projects.length;
    return portfolioData.projects.filter((p) => p.category === cat).length;
  };

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="content-wrapper">
        <header className="section-header section-header-split">
          <div className="section-header-copy">
            <span className="section-label">Selected Work</span>
            <h2 id="projects-heading">Projects &amp; Builds</h2>
            <p className="section-description">
              Software built out of curiosity or student necessity.
              Focused on systems fundamentals, clean interfaces, and low-overhead architecture.
            </p>
          </div>
          <div className="section-art-slot projects-art-slot">
            <div className="art-frame">
              <img
                src={projectsArt}
                alt="Hand-drawn architectural blueprint illustration of modular systems data blocks, mechanical gears, circuits, and network nodes"
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </header>

        {/* Filter Bar with Search Input & Category Chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div className="projects-filter-bar" role="tablist" aria-label="Project Categories" style={{ margin: 0 }}>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category} ({getCategoryCount(category)})
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div style={{ position: 'relative', flex: '1 1 180px', minWidth: 0, maxWidth: '100%' }}>
              <input
                type="text"
                placeholder="Filter by tech or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.35rem 0.75rem 0.35rem 2rem',
                  fontSize: '0.8rem',
                  fontFamily: 'inherit',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-medium)',
                  background: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
              />
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ position: 'absolute', left: '0.65rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear project filter search"
                  title="Clear search"
                  style={{ position: 'absolute', right: '0.6rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.75rem' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project Cards Stack */}
        {filteredProjects.length === 0 ? (
          <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-surface)', border: '1px dashed var(--border-medium)', borderRadius: 'var(--radius-md)' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              No projects found matching "{searchQuery}" in {activeCategory}.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="projects-stack">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-meta-row">
                  <div className="project-header-left">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="project-status-badge">{project.status}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {project.category}
                    </span>
                  </div>
                </div>

                <p className="project-tagline">{project.tagline}</p>

                <p className="project-narrative">{project.problem}</p>

                {project.metrics && (
                  <div>
                    <span className="project-metrics-pill">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                      </svg>
                      <span>{project.metrics}</span>
                    </span>
                  </div>
                )}

                {/* Technologies */}
                <div className="project-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="project-footer-actions">
                  <button
                    type="button"
                    className="project-action-link"
                    onClick={() => onSelectProject(project)}
                    style={{ fontWeight: 600, color: 'var(--accent-primary)' }}
                  >
                    <span>Architecture &amp; Story</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link"
                        aria-label={`${project.title} source code on GitHub`}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <span>Code</span>
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-link"
                        aria-label={`${project.title} live preview or demo`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
