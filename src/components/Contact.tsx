import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import contactArt from '../assets/contact-art.webp';

interface ContactProps {
  onCopyEmail: () => void;
  onOpenResumeModal?: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, onOpenResumeModal }) => {
  const { personal, colophon } = portfolioData;
  const [showContactForm, setShowContactForm] = useState(false);

  return (
    <>
      <section id="contact" aria-labelledby="contact-heading">
        <div className="content-wrapper">
          <header className="section-header section-header-split">
            <div className="section-header-copy">
              <span className="section-label">Say Hello</span>
              <h2 id="contact-heading">Get in Touch</h2>
              <p className="section-description">
                Always up for conversations on systems, good books, or student collaborations.
              </p>
            </div>
            <div className="section-art-slot contact-art-slot">
              <div className="art-frame">
                <img
                  src={contactArt}
                  alt="Hand-drawn colored pencil illustration of an open wax-sealed envelope with a soaring origami paper airplane and flight trail"
                  width={800}
                  height={597}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </header>

          <div className="contact-card">
            <h3 className="contact-statement">
              Always up for conversations on systems, good books, or student collaborations.
            </h3>
            <p className="contact-paragraph">
              Whether you want to critique one of my projects, swap paper recommendations,
              or discuss internships and research opportunities, my inbox is always open.
            </p>

            <div className="contact-actions-row">
              <button
                type="button"
                className="email-copy-group"
                onClick={onCopyEmail}
                title="Click to copy email address"
              >
                <span>{personal.email}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowContactForm(!showContactForm)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>{showContactForm ? 'Close Form' : 'Send Me a Message'}</span>
              </button>

              {onOpenResumeModal && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onOpenResumeModal}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                  <span>View Quick CV</span>
                </button>
              )}
            </div>

            {showContactForm && (
              <Web3ContactForm onClose={() => setShowContactForm(false)} />
            )}

            <div className="contact-social-links">
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>GitHub</span>
              </a>
              <a href={personal.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <span>X / Twitter</span>
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="loop-cta-band grain" aria-label="Get in touch">
        <div className="content-wrapper">
          <div className="loop-cta-inner">
            <h2>Curious what you&rsquo;re building?</h2>
            <div className="loop-cta-actions">
              <a href={`mailto:${personal.email}`} className="btn btn-primary" aria-label={`Email ${personal.email}`}>
                <span>Say hello</span>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M0 14L28 14" stroke="currentColor"></path>
                  <path d="M14 0.5L28 14" stroke="currentColor"></path>
                  <path d="M14 28L28 14" stroke="currentColor"></path>
                </svg>
              </a>
              <button type="button" className="btn btn-secondary" onClick={onCopyEmail} title="Click to copy email address">
                <span>Copy Email</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="content-wrapper">
          <div className="colophon-grid">
            <div className="colophon-block">
              <h4>Colophon &amp; Philosophy</h4>
              <p>A personal corner of the internet built with care. {colophon.designInspiration}</p>
              <p style={{ marginTop: '0.4rem' }}>Typography set in {colophon.typography}.</p>
            </div>
            <div className="colophon-block">
              <h4>Stack &amp; Performance</h4>
              <p>{colophon.builtWith.join(' • ')}</p>
              <p style={{ marginTop: '0.4rem' }}>
                Zero tracker scripts. Zero unnecessary JavaScript. Keyboard navigation enabled via <kbd>⌘K</kbd>.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; {new Date().getFullYear()} {personal.name}</span>
            <span>Last updated: {colophon.lastUpdated}</span>
          </div>
        </div>
      </footer>
    </>
  );
};

/* ════════════════════════════════════════════════════════
   Web3Forms Contact Form
   ════════════════════════════════════════════════════════ */

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface Web3ContactFormProps {
  onClose: () => void;
}

const Web3ContactForm: React.FC<Web3ContactFormProps> = ({ onClose }) => {
  const [name, setName]               = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject]         = useState('');
  const [message, setMessage]         = useState('');
  const [status, setStatus]           = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg]       = useState('');

  const WEB3FORMS_ACCESS_KEY = '18cc5b6b-d683-4657-a9f7-54d2c1e250d4';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal:  controller.signal,
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email:     senderEmail,
          subject:   subject || `New message from ${name}`,
          message,
          from_name: 'Portfolio Contact Form',
        }),
      });

      clearTimeout(timeoutId);
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setName(''); setSenderEmail(''); setSubject(''); setMessage('');
      } else {
        setStatus('error');
        setErrorMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err: unknown) {
      clearTimeout(timeoutId);
      setStatus('error');
      if (err instanceof Error && err.name === 'AbortError') {
        setErrorMsg('Request timed out. Please try again.');
      } else {
        setErrorMsg('Network error. Please check your connection and try again.');
      }
    }
  };

  const inputStyle: React.CSSProperties = {
    width:        '100%',
    padding:      '0.6rem 0.85rem',
    fontSize:     '0.88rem',
    fontFamily:   'inherit',
    borderRadius: 'var(--radius-sm)',
    border:       '1px solid var(--border-medium)',
    background:   'var(--bg-surface)',
    color:        'var(--text-primary)',
    outline:      'none',
    transition:   'border-color 0.15s ease',
    boxSizing:    'border-box',
  };

  return (
    <div style={{ background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border-medium)', marginBottom: '1.75rem', animation: 'slideUp 150ms ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', margin: 0 }}>Send a Message</h4>
        <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.2rem' }} aria-label="Close form">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✉️</div>
          <p style={{ color: 'var(--text-primary)', fontWeight: 500, marginBottom: '0.25rem' }}>Message sent!</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Thanks for reaching out. I will get back to you soon.</p>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')} style={{ marginTop: '1rem', fontSize: '0.82rem' }}>Send another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
              <input id="contact-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={inputStyle} />
              <input id="contact-email" type="email" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="your@email.com" required style={inputStyle} />
            </div>
            <input id="contact-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject (e.g. Internship opportunity, paper swap)" style={inputStyle} />
            <textarea id="contact-message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here..." required style={{ ...inputStyle, resize: 'vertical' }} />
            {status === 'error' && <p style={{ color: '#e05252', fontSize: '0.82rem', margin: 0 }}>⚠️ {errorMsg}</p>}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button id="contact-submit" type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem', opacity: status === 'sending' ? 0.7 : 1 }}>
                {status === 'sending' ? <span>Sending...</span> : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                    <span>Send Message</span>
                  </>
                )}
              </button>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Powered by Web3Forms · No spam</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
