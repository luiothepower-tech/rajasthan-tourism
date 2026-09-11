import React, { ErrorInfo, ReactNode } from 'react';
import { Compass, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Defensively log to console for debugging without leaking to UI
    console.error('[Rajasthan Tourism Experience ErrorBoundary]:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.hash = '#/';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-stone-900">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E7DFD5] shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F9EBE5] text-[#B85D38] mx-auto flex items-center justify-center shadow-xs">
              <Compass className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-[#B85D38]">
                Sanctuary Safeguard
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900">
                A Momentary Sandstorm
              </h2>
              <p className="text-sm text-stone-600 leading-relaxed">
                An unexpected interruption occurred while exploring the royal annals. Your voyage has been protected.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#B85D38] hover:bg-[#9E4A2A] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Experience</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#/';
                  this.setState({ hasError: false, error: undefined });
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
