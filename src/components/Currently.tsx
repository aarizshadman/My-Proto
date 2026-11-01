import React from 'react';
import { portfolioData } from '../data/portfolioData';
import currentlyArt from '../assets/currently-art.webp';

export const Currently: React.FC = () => {
  const { currently } = portfolioData;

  return (
    <section id="currently" aria-labelledby="currently-heading">
      <div className="content-wrapper">
        <header className="section-header section-header-split">
          <div className="section-header-copy">
            <span className="section-label">Field Status</span>
            <h2 id="currently-heading">Currently Exploring</h2>
            <p className="section-description">
              Inspired by the South Park Commons ethos of following authentic curiosity:
              what I'm reading, tinkering with, and wrestling with this semester.
            </p>
          </div>
          <div className="section-art-slot currently-art-slot">
            <div className="art-frame">
              <img
                src={currentlyArt}
                alt="Hand-drawn colored pencil sketch of an open field notebook with data tree diagrams, precision brass compass, caliper, and glowing prism"
                width={800}
                height={597}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </header>

        {/* Status Snapshot Cards */}
        <div className="currently-grid">
          <div className="currently-card">
            <div className="card-header-tag">
              <span className="card-label">Active Focus</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
              </svg>
            </div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 500 }}>
              {currently.focus}
            </p>
          </div>

          <div className="currently-card">
            <div className="card-header-tag">
              <span className="card-label">Currently Reading</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            </div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontFamily: 'var(--font-serif)' }}>
              {currently.readingBook.title}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              by {currently.readingBook.author} &bull; {currently.readingBook.status}
            </p>
          </div>

          <div className="currently-card">
            <div className="card-header-tag">
              <span className="card-label">Tinkering With</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem' }}>
              {currently.tinkeringWith}
            </p>
          </div>
        </div>

        {/* Active Inquiry Questions */}
        <div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            Questions on my mind:
          </h3>
          <div className="inquiry-list">
            {currently.currentInquiries.map((inquiry, idx) => (
              <div key={idx} className="inquiry-item">
                <div className="inquiry-header">
                  <h4 className="inquiry-question">{inquiry.question}</h4>
                  <span className="inquiry-status">{inquiry.status}</span>
                </div>
                <p className="inquiry-context">{inquiry.context}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
