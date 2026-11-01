import React from 'react';
import { portfolioData } from '../data/portfolioData';
import readingArt from '../assets/reading-art.webp';

export const ReadingShelf: React.FC = () => {
  return (
    <section id="reading" aria-labelledby="reading-heading">
      <div className="content-wrapper">
        <header className="section-header section-header-split">
          <div className="section-header-copy">
            <span className="section-label">Influences</span>
            <h2 id="reading-heading">Reading Shelf & Papers</h2>
            <p className="section-description">
              Books, papers, and essays that continuously shape how I reason about
              software systems, user interfaces, and intellectual honesty.
            </p>
          </div>
          <div className="section-art-slot reading-art-slot">
            <div className="art-frame">
              <img
                src={readingArt}
                alt="Hand-drawn colored pencil illustration of a stack of clothbound classic books with an open book revealing abstract syntax trees and orbital rings"
                width={1200}
                height={896}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </header>

        <div className="books-grid">
          {portfolioData.readingShelf.map((item, idx) => (
            <div key={idx} className="book-card">
              <div className="book-header">
                <h3 className="book-title">{item.title}</h3>
                <span className="book-type-badge">{item.type}</span>
              </div>
              <span className="book-author">by {item.author}</span>
              <p className="book-takeaway">{item.takeaway}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
