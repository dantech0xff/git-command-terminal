import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingStates";
import { appStrings } from "@/config/strings";

interface NetworkStatusProps {
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export function NetworkStatus({ loading, error, onRetry }: NetworkStatusProps) {
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    if (loading || error) {
      setShowStatus(true);
      if (!loading && !error) {
        // Auto-hide after successful load
        const timer = setTimeout(() => setShowStatus(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [loading, error]);

  if (!showStatus) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`
        px-4 py-2 rounded-lg shadow-lg border text-sm font-medium
        ${
          error
            ? "bg-destructive/90 text-destructive-foreground border-destructive"
            : "bg-primary/90 text-primary-foreground border-primary"
        }
      `}>
        <div className="flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" />}
          {error ? (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{appStrings.errors.network.title}</span>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="ml-2 underline hover:no-underline">
                  {appStrings.ui.buttons.retry}
                </button>
              )}
            </>
          ) : (
            <>
              <span>{appStrings.development.networkStatus.success}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Hook to aggregate loading and error states from multiple sources
export function useNetworkStatus(
  ...states: Array<{ loading: boolean; error: string | null }>
) {
  const loading = states.some((state) => state.loading);
  const errors = states
    .filter((state) => state.error)
    .map((state) => state.error);
  const error = errors.length > 0 ? errors.join(", ") : null;

  return { loading, error };
}
