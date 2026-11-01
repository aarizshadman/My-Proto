import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: 'var(--status-active-dot)' }}>
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
};
