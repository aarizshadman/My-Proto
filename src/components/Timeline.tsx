import React from 'react';
import { portfolioData } from '../data/portfolioData';
import journeyArt from '../assets/journey-art.webp';

export const Timeline: React.FC = () => {
  return (
    <section id="journey" aria-labelledby="journey-heading">
      <div className="content-wrapper">
        <header className="section-header section-header-split">
          <div className="section-header-copy">
            <span className="section-label">Path</span>
            <h2 id="journey-heading">Journey & Milestones</h2>
            <p className="section-description">
              A chronological timeline of studies, projects, and inflection points along the way.
            </p>
          </div>
          <div className="section-art-slot journey-art-slot">
            <div className="art-frame">
              <img
                src={journeyArt}
                alt="Hand-drawn colored pencil illustration of an antique celestial astrolabe with compass star and winding contour path with milestone flags"
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </header>

        <div className="timeline-stream">
          {portfolioData.timeline.map((item, idx) => (
            <div key={idx} className="timeline-node">
              <span className="timeline-dot" aria-hidden="true"></span>
              
              <div className="timeline-meta">
                <span>{item.year}</span>
                {item.period && (
                  <span className="timeline-period-badge">{item.period}</span>
                )}
              </div>

              <h3 className="timeline-title">{item.title}</h3>
              <p className="timeline-role">{item.roleOrContext}</p>
              <p className="timeline-desc">{item.description}</p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="timeline-highlights">
                  {item.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="timeline-highlight-item">
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
