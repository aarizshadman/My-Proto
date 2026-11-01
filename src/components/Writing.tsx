import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Essay } from '../types';
import writingArt from '../assets/writing-art.webp';

interface WritingProps {
  onSelectEssay: (essay: Essay) => void;
}

export const Writing: React.FC<WritingProps> = ({ onSelectEssay }) => {
  return (
    <section id="writing" aria-labelledby="writing-heading">
      <div className="content-wrapper">
        <header className="section-header section-header-split">
          <div className="section-header-copy">
            <span className="section-label">Field Notes</span>
            <h2 id="writing-heading">Essays & Observations</h2>
            <p className="section-description">
              Candid reflections on software craft, studentship, and fighting accidental complexity.
              No corporate buzzwords or artificial authority.
            </p>
          </div>
          <div className="section-art-slot writing-art-slot">
            <div className="art-frame">
              <img
                src={writingArt}
                alt="Hand-drawn colored pencil illustration of a fine-nib fountain pen on deckle-edge notes paper with ripples and an origami crane taking flight"
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </header>

        <div className="essays-list">
          {portfolioData.essays.map((essay) => (
            <article
              key={essay.id}
              className="essay-card"
              onClick={() => onSelectEssay(essay)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectEssay(essay);
                }
              }}
              aria-label={`Read essay: ${essay.title}`}
            >
              <div className="essay-meta-row">
                <span>{essay.date}</span>
                <span>&bull;</span>
                <span>{essay.readTime}</span>
                <div className="essay-tags">
                  {essay.tags.map((tag) => (
                    <span key={tag} className="tech-tag" style={{ background: 'var(--bg-subtle)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="essay-title">{essay.title}</h3>

              <p className="essay-subtitle">{essay.subtitle}</p>

              <p className="essay-summary">{essay.summary}</p>

              <div className="essay-read-prompt">
                <span>Read note</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
