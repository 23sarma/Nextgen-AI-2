import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // Fix: Reverted to a constructor for state initialization and method binding.
  // The original class field syntax, while modern, was causing type errors,
  // likely due to an environment-specific issue. The constructor-based
  // approach is more robustly supported and resolves the errors.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
    this.handleRecover = this.handleRecover.bind(this);
  }

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Fix: Converted back to a standard class method, bound in the constructor.
  handleRecover(): void {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-black/30 backdrop-blur-sm border border-yellow-500/50 rounded-lg p-8 shadow-lg shadow-yellow-500/10 text-center">
            <h1 className="text-2xl font-bold text-yellow-400 mb-4">System Malfunction</h1>
            <p className="text-gray-300 mb-6">
                A critical error was detected. The AI's Self-Fixing Engine has been notified and is working to resolve the issue. Please refresh the page in a few moments.
            </p>
            <button
                onClick={this.handleRecover}
                className="bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600 transition-colors"
            >
                Attempt to Recover
            </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
