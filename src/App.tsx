import { useState, useRef } from "react";
import { useKV } from "@github/spark/hooks";
import { Toaster } from "sonner";
import { AppHeader } from "./components/AppHeader";
import { TerminalSection } from "./components/TerminalSection";
import { CommandDetails } from "./components/CommandDetails";
import { HelpTips } from "./components/HelpTips";
import { Testimonials } from "./components/Testimonials";
import { ReviewsSection } from "./components/ReviewsSection";
import { AppFooter } from "./components/AppFooter";
import { LoadingState, ErrorState } from "./components/LoadingStates";
import { NetworkStatus, useNetworkStatus } from "./components/NetworkStatus";
import { NetworkDemo } from "./components/NetworkDemo";
import { TerminalEntry, Review, Testimonial } from "./types";
import { useReviews, useAllTestimonials } from "./hooks/useData";
import { isLocalhost } from "./utils/environment";
import { appStrings } from "./config/strings";
import { useThemeHandlers } from "./handlers/theme-handlers";
import { useTerminalHandlers } from "./handlers/terminal-handlers";
import { useReviewHandlers } from "./handlers/review-handlers";

function App() {
  const [input, setInput] = useState("");
  const [entries, setEntries] = useKV<TerminalEntry[]>("terminal-history", []);
  const [commandHistory, setCommandHistory] = useKV<string[]>(
    "command-history",
    []
  );
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentCommand, setCurrentCommand] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentThemeId, setCurrentThemeId] = useState("matrix");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Use the new data hooks
  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
    submitReview,
    deleteReview,
  } = useReviews();

  const {
    testimonials: allTestimonials,
    loading: testimonialsLoading,
    error: testimonialsError,
  } = useAllTestimonials();

  // Aggregate network status
  const networkStatus = useNetworkStatus(
    { loading: reviewsLoading, error: reviewsError },
    { loading: testimonialsLoading, error: testimonialsError }
  );

  // Use theme handlers
  const { handleThemeChange } = useThemeHandlers({
    currentThemeId,
    setCurrentThemeId,
  });

  // Use terminal handlers
  const {
    addEntry,
    handleSubmit,
    handleKeyDown,
    handleSuggestionClick,
    clearTerminal,
  } = useTerminalHandlers({
    input,
    setInput,
    entries,
    setEntries,
    commandHistory,
    setCommandHistory,
    historyIndex,
    setHistoryIndex,
    currentCommand,
    setCurrentCommand,
    suggestions,
    setSuggestions,
    inputRef,
  });

  // Use review handlers
  const { handleReviewSubmit } = useReviewHandlers({
    submitReview,
  });

  return (
    <div className="min-h-screen bg-background p-2 sm:p-4">
      {/* Network Status Indicator - only show in localhost mode */}
      {isLocalhost() && (
        <NetworkStatus
          loading={networkStatus.loading}
          error={networkStatus.error}
        />
      )}

      <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
        <AppHeader
          currentThemeId={currentThemeId}
          onThemeChange={handleThemeChange}
          onClearTerminal={clearTerminal}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <TerminalSection
            entries={entries}
            input={input}
            suggestions={suggestions}
            inputRef={inputRef}
            scrollRef={scrollRef}
            onInputChange={setInput}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            onSuggestionClick={handleSuggestionClick}
          />

          <div className="space-y-4">
            {currentCommand && <CommandDetails command={currentCommand} />}
            <HelpTips />
          </div>
        </div>

        {testimonialsLoading ? (
          <LoadingState
            title={appStrings.loading.testimonials.title}
            description={appStrings.loading.testimonials.description}
          />
        ) : testimonialsError ? (
          <ErrorState
            title={appStrings.errors.testimonials.title}
            description={testimonialsError}
          />
        ) : (
          <Testimonials testimonials={allTestimonials} />
        )}

        {/* <ReviewsSection
          reviews={reviews}
          reviewsLoading={reviewsLoading}
          reviewsError={reviewsError}
          onSubmitReview={handleReviewSubmit}
        /> */}

        <AppFooter />
      </div>

      {/* Development Network Demo - only show in localhost mode */}
      {isLocalhost() && <NetworkDemo />}

      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--popover)",
            color: "var(--popover-foreground)",
            border: "1px solid var(--border)",
          },
        }}
      />
    </div>
  );
}

export default App;
