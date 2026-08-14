import { Component } from "react";
import ErrorIcon from "~icons/material-symbols/error-outline";
import RefreshIcon from "~icons/material-symbols/refresh";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturó un error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-24 min-h-screen">
          <ErrorIcon
            className="text-6xl mb-4 text-red-500 dark:text-red-400"
            aria-hidden="true"
          />
          <p className="text-xl font-bold text-on-surface mb-2">
            Algo salió mal
          </p>
          <p className="text-on-surface-variant font-medium mb-8 max-w-md">
            Ocurrió un error inesperado en la aplicación.
          </p>
          <button
            onClick={this.handleReload}
            className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <RefreshIcon className="text-sm" aria-hidden="true" />
            Recargar página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
