 import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            background: 'var(--bg-canvas, #fbfbf9)',
            color: 'var(--text-primary, #181816)',
          }}
        >
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              background: '#e0533c',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              marginBottom: '1.25rem',
              boxShadow: '0 4px 12px rgba(224, 83, 60, 0.25)',
            }}
          >
            !
          </div>

          <h1
            style={{
              fontSize: '1.4rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Something went wrong
          </h1>

          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--text-secondary, #6b6b66)',
              maxWidth: '460px',
              marginBottom: '1.5rem',
              lineHeight: 1.5,
            }}
          >
            An unexpected error occurred while rendering this page. You can reload
            the page or try refreshing your cache.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: '8px',
                background: '#181816',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </button>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: '0.65rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 500,
                borderRadius: '8px',
                background: 'transparent',
                color: '#181816',
                border: '1px solid #d4d4cc',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>

          {this.state.error && (
            <details
              style={{
                marginTop: '2rem',
                maxWidth: '600px',
                width: '100%',
                textAlign: 'left',
                fontSize: '0.8rem',
                color: '#888880',
                background: '#f4f4f0',
                padding: '0.75rem 1rem',
                borderRadius: '6px',
              }}
            >
              <summary style={{ cursor: 'pointer', fontWeight: 500 }}>
                Error details
              </summary>
              <pre
                style={{
                  marginTop: '0.5rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  fontFamily: 'monospace',
                }}
              >
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}
