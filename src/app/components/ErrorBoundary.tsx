import React, { Component, ErrorInfo, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * Error boundary component to catch chunk loading failures and other React errors.
 * Provides a user-friendly error UI with retry functionality.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  private isChunkLoadError(error: Error | null): boolean {
    if (!error) return false;
    
    // Check for common chunk load error patterns
    const chunkLoadErrorPatterns = [
      /Loading chunk/i,
      /ChunkLoadError/i,
      /Failed to fetch dynamically imported module/i,
      /Loading CSS chunk/i,
      /networkerror/i,
    ];
    
    return chunkLoadErrorPatterns.some(pattern => 
      pattern.test(error.message) || pattern.test(error.name)
    );
  }

  private handleRetry = () => {
    // For chunk load errors, reload the page to fetch fresh chunks
    // For other errors, reset the error boundary state
    if (this.isChunkLoadError(this.state.error)) {
      window.location.reload();
    } else {
      this.setState({
        hasError: false,
        error: null,
        errorInfo: null,
      });
    }
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const isChunkError = this.isChunkLoadError(this.state.error);
      const errorMessage = isChunkError
        ? "Failed to load page content. This can happen after a deployment or due to network issues."
        : "Something went wrong while loading this page.";

      return (
        <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            <Alert variant="destructive" className="bg-[#131A23] border-red-500/50">
              <AlertTitle className="text-red-400 mb-2">
                {isChunkError ? "Loading Error" : "Application Error"}
              </AlertTitle>
              <AlertDescription className="text-gray-300 space-y-4">
                <p>{errorMessage}</p>
                <div className="flex gap-3">
                  <button
                    onClick={this.handleRetry}
                    className="px-4 py-2 bg-[#0066cc] hover:bg-[#0052a3] text-white rounded-md transition-colors text-sm font-medium"
                  >
                    {isChunkError ? "Reload Page" : "Try Again"}
                  </button>
                  <button
                    onClick={() => (window.location.href = "/")}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 rounded-md transition-colors text-sm font-medium"
                  >
                    Go Home
                  </button>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
