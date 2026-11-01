import React, { useEffect, useRef } from 'react';
import cubeArt from '../assets/rubiks-cube.webp';
import { ArrowGlyph } from './ArrowGlyph';
import { Reveal } from './Reveal';

type Pt = { x: number; y: number };

/** Turn a polyline into a rounded-corner SVG path (SPC connector style). */
function roundedPath(points: Pt[], radius: number): string {
  const pts = points.filter(
    (p, i) => i === 0 || Math.abs(p.x - points[i - 1].x) > 0.5 || Math.abs(p.y - points[i - 1].y) > 0.5
  );
  if (pts.length < 2) return '';

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const p = pts[i];
    if (i === pts.length - 1) {
      d += ` L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      continue;
    }
    const prev = pts[i - 1];
    const next = pts[i + 1];
    const inLen = Math.hypot(p.x - prev.x, p.y - prev.y);
    const outLen = Math.hypot(next.x - p.x, next.y - p.y);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    const ax = p.x - ((p.x - prev.x) / inLen) * r;
    const ay = p.y - ((p.y - prev.y) / inLen) * r;
    const bx = p.x + ((next.x - p.x) / outLen) * r;
    const by = p.y + ((next.y - p.y) / outLen) * r;
    d += ` L ${ax.toFixed(1)} ${ay.toFixed(1)}`;
    d += ` Q ${p.x.toFixed(1)} ${p.y.toFixed(1)}, ${bx.toFixed(1)} ${by.toFixed(1)}`;
  }
  return d;
}

const PATHWAYS = [
  {
    key: 'build',
    title: 'Build Together',
    meta: ['Collaboration', 'Open Source', 'Systems'],
    body: "Peers to go deep with on storage engines, compilers, and tactile interfaces — pairing on hard problems, trading prototypes, and keeping each other honest about first principles.",
  },
  {
    key: 'learn',
    title: 'Internships & Labs',
    meta: ["Summer '26", 'Research', 'Mentorship'],
    body: "Open to systems internships and lab collaborations where careful engineering matters more than hype. If you're building software that's slow to adopt and fast to feel, let's talk.",
  },
] as const;

export const Pathways: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const cta = ctaRef.current;
    if (!section || !svg || !cta) return;

    const cards = Array.from(section.querySelectorAll<HTMLElement>('[data-pathway]'));
    if (!cards.length) return;

    const desktop = window.matchMedia('(min-width: 992px)');
    let frame = 0;

    const compute = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!desktop.matches) return;

        const sectionRect = section.getBoundingClientRect();
        const ctaRect = cta.getBoundingClientRect();
        const firstRect = cards[0].getBoundingClientRect();

        const top = firstRect.top - sectionRect.top;
        const height = ctaRect.bottom - firstRect.top + 8;
        const left = -sectionRect.left;
        const width = document.documentElement.clientWidth;

        svg.style.top = `${top}px`;
        svg.style.height = `${height}px`;
        svg.style.left = `${left}px`;
        svg.style.width = `${width}px`;
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

        const ctaX = ctaRect.left + ctaRect.width / 2;
        const ctaY = ctaRect.top - firstRect.top;

        for (const card of cards) {
          const key = card.dataset.pathway;
          if (!key) continue;
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.bottom - firstRect.top;
          const midY = (cy + ctaY) / 2;
          const d = roundedPath(
            [
              { x: cx, y: cy },
              { x: cx, y: midY },
              { x: ctaX, y: midY },
              { x: ctaX, y: ctaY },
            ],
            8
          );
          svg
            .querySelector(`[data-line="${key}"] path`)
            ?.setAttribute('d', d);
        }
      });
    };

    compute();
    window.addEventListener('resize', compute);
    window.addEventListener('load', compute);
    const observer = new ResizeObserver(compute);
    observer.observe(section);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', compute);
      window.removeEventListener('load', compute);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="collaborate"
      className="pathways-section"
      data-section="pathways"
      aria-labelledby="pathways-heading"
      ref={sectionRef}
    >
      <div className="content-wrapper">
        <header className="section-header">
          <span className="section-label">How to start</span>
        </header>

        <div className="pathway-intro">
          <Reveal>
            <h3 id="pathways-heading">
              Exploring the frontier?
              <br />
              Two ways to start
            </h3>
            <p>
              The path from a blank page to a working system is rarely a straight line.
              I do my best work around people who care about fundamentals — so there are
              two ways to pull me into your orbit:
            </p>
          </Reveal>
          <Reveal className="pathway-cube" delay={120}>
            <div className="cube-frame">
              <img
                src={cubeArt}
                alt="Hand-drawn illustration of two hands solving a Rubik's cube marked with −1 and 0"
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
              />
            </div>
          </Reveal>
        </div>

        <div className="pathway-cards">
          {PATHWAYS.map((pathway, index) => (
            <Reveal key={pathway.key} delay={index * 110}>
              <div className="pathway-card" data-pathway={pathway.key} tabIndex={0}>
                <h4>{pathway.title}</h4>
                <p className="pathway-meta">
                  {pathway.meta.map((m, i) => (
                    <React.Fragment key={m}>
                      {i > 0 && <span className="dot">&middot;</span>}
                      <span>{m}</span>
                    </React.Fragment>
                  ))}
                </p>
                <p>{pathway.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="pathway-cta-row">
          <a
            href="#contact"
            className="btn btn-secondary pathway-cta"
            data-pathway-apply
            ref={ctaRef}
          >
            <span>Say hello</span>
            <ArrowGlyph />
          </a>
        </div>
      </div>

      <svg className="pathway-svg" data-pathway-svg aria-hidden="true" ref={svgRef}>
        <g className="pathway-line" data-line="build">
          <path d="" pathLength={1}></path>
        </g>
        <g className="pathway-line" data-line="learn">
          <path d="" pathLength={1}></path>
        </g>
      </svg>
    </section>
  );
};

export default Pathways;
