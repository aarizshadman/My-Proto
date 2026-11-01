import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowGlyph } from './ArrowGlyph';
import portrait from '../assets/portrait.webp';

interface HeroProps {
  onCopyEmail: () => void;
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopyEmail, onOpenResumeModal }) => {
  const { personal, currently } = portfolioData;

  return (
    <section id="about" className="hero-section" aria-label="About Aariz Shadman">
      {/* Soft painterly washes behind the hero */}
      <div className="hero-glow hero-glow-a" aria-hidden="true"></div>
      <div className="hero-glow hero-glow-b" aria-hidden="true"></div>

      <div className="content-wrapper hero-inner">
        {/* Illustrated portrait — in-flow on small screens, parked in the
            empty gutter beside the headline on wide screens. */}
        <div className="hero-portrait">
          <img
            src={portrait}
            alt="Pen-and-ink illustrated portrait of Aariz Shadman"
            width={768}
            height={768}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </div>

        {/* Status Pill & Location */}
        <div className="hero-status-row">
          <div className="hero-status-pill">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>
              {currently.statusBadge} &bull; {personal.location}
            </span>
          </div>

          <span className="hero-meta-chip">
            Open to summer &rsquo;26 systems internships &amp; lab collaborations
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Exploring software systems, compilers &amp; <em>tactile tools</em>.
        </h1>

        {/* Lead Bio */}
        <p className="hero-bio-lead">{personal.bioIntro}</p>

        {/* Expanded Personal Story */}
        <div className="hero-bio-expanded">
          {personal.bioExpanded.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            <span>Selected Projects</span>
            <ArrowGlyph />
          </a>

          <a href="#writing" className="btn btn-secondary">
            <span>Read Field Notes</span>
          </a>

          {onOpenResumeModal && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onOpenResumeModal}
              title="View formatted Resume / CV"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
              </svg>
              <span>View CV</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-ghost"
            onClick={onCopyEmail}
            title="Click to copy email address"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>Copy Email</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
