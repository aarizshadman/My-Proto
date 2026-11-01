import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Project, Essay } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onSelectEssay: (essay: Essay) => void;
  onToggleTheme: () => void;
  onCopyEmail: () => void;
  onOpenResumeModal?: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: 'Section' | 'Project' | 'Essay' | 'Action';
  hint?: string;
  onExecute: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onSelectEssay,
  onToggleTheme,
  onCopyEmail,
  onOpenResumeModal,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build command items
  const items: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      title: 'Go to About / Intro',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#about';
        onClose();
      },
    },
    {
      id: 'nav-currently',
      title: 'Go to Currently Exploring',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#currently';
        onClose();
      },
    },
    {
      id: 'nav-projects',
      title: 'Go to Selected Projects',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#projects';
        onClose();
      },
    },
    {
      id: 'nav-writing',
      title: 'Go to Essays & Field Notes',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#writing';
        onClose();
      },
    },
    {
      id: 'nav-reading',
      title: 'Go to Reading Shelf & Influences',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#reading';
        onClose();
      },
    },
    {
      id: 'nav-journey',
      title: 'Go to Journey & Milestones',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#journey';
        onClose();
      },
    },
    {
      id: 'nav-contact',
      title: 'Go to Contact',
      category: 'Section',
      onExecute: () => {
        window.location.hash = '#contact';
        onClose();
      },
    },

    // Actions
    {
      id: 'action-copy-email',
      title: `Copy Email (${portfolioData.personal.email})`,
      category: 'Action',
      hint: 'Action',
      onExecute: () => {
        onCopyEmail();
        onClose();
      },
    },
    {
      id: 'action-toggle-theme',
      title: 'Toggle Light / Dark Theme',
      category: 'Action',
      hint: 'Appearance',
      onExecute: () => {
        onToggleTheme();
        onClose();
      },
    },
    ...(onOpenResumeModal
      ? [
          {
            id: 'action-view-cv',
            title: 'View Resume / CV (Curriculum Vitae)',
            category: 'Action' as const,
            hint: 'Document',
            onExecute: () => {
              onOpenResumeModal();
              onClose();
            },
          },
        ]
      : []),

    // Projects
    ...portfolioData.projects.map((proj) => ({
      id: `proj-${proj.id}`,
      title: `Project: ${proj.title} — ${proj.tagline}`,
      category: 'Project' as const,
      hint: proj.category,
      onExecute: () => {
        onSelectProject(proj);
        onClose();
      },
    })),

    // Essays
    ...portfolioData.essays.map((essay) => ({
      id: `essay-${essay.id}`,
      title: `Essay: ${essay.title}`,
      category: 'Essay' as const,
      hint: essay.readTime,
      onExecute: () => {
        onSelectEssay(essay);
        onClose();
      },
    })),
  ];

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev <= 0 ? Math.max(0, filteredItems.length - 1) : prev - 1
        );
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].onExecute();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command search palette"
    >
      <div className="cmd-palette-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrapper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, project, or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-autocomplete="list"
          />
        </div>

        <ul className="cmd-results-list" role="listbox">
          {filteredItems.length === 0 ? (
            <li style={{ padding: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matches found for "{query}"
            </li>
          ) : (
            filteredItems.map((item, index) => (
              <li
                key={item.id}
                role="option"
                aria-selected={selectedIndex === index}
                className={`cmd-item ${selectedIndex === index ? 'selected' : ''}`}
                onClick={() => item.onExecute()}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="cmd-item-title">{item.title}</span>
                <span className="cmd-item-category">
                  {item.hint ? `${item.hint} • ` : ''}{item.category}
                </span>
              </li>
            ))
          )}
        </ul>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵</kbd> &bull; Close with <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
};
