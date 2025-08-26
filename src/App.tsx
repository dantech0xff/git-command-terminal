import { useState, useRef, useEffect } from "react";
import { useKV } from "@github/spark/hooks";
import {
  parseGitCommand,
  gitCommands,
  getCommandSuggestions,
} from "@/lib/git-commands";
import {
  getCurrentTheme,
  setCurrentTheme,
  themes,
  applyTheme,
} from "@/lib/themes";
import { toast, Toaster } from "sonner";
import { AppHeader } from "./components/AppHeader";
import { TerminalSection } from "./components/TerminalSection";
import { CommandDetails } from "./components/CommandDetails";
import { HelpTips } from "./components/HelpTips";
import { Testimonials } from "./components/Testimonials";
import { ReviewForm } from "./components/ReviewForm";
import { ReviewList } from "./components/ReviewList";
import { AppFooter } from "./components/AppFooter";
import { LoadingState, ErrorState } from "./components/LoadingStates";
import { NetworkStatus, useNetworkStatus } from "./components/NetworkStatus";
import { NetworkDemo } from "./components/NetworkDemo";
import { TerminalEntry, Review, Testimonial } from "./types";
import { useReviews, useAllTestimonials } from "./hooks/useData";
import { isLocalhost } from "./utils/environment";

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
  const [showReviewForm, setShowReviewForm] = useState(false);

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

  // Theme management
  useEffect(() => {
    const savedTheme = getCurrentTheme();
    setCurrentThemeId(savedTheme);
    const theme = themes.find((t) => t.id === savedTheme) || themes[0];
    applyTheme(theme);
  }, []);

  useEffect(() => {
    const theme = themes.find((t) => t.id === currentThemeId) || themes[0];
    applyTheme(theme);
  }, [currentThemeId]);

  const handleThemeChange = (themeId: string) => {
    setCurrentThemeId(themeId);
    setCurrentTheme(themeId);
    const theme = themes.find((t) => t.id === themeId);
    if (theme) {
      toast.success(`Switched to ${theme.name} theme`);
    }
  };

  // Terminal functionality
  const addEntry = (type: TerminalEntry["type"], content: string) => {
    const newEntry: TerminalEntry = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: Date.now(),
    };
    setEntries((currentEntries) => [...(currentEntries ?? []), newEntry]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to history
    addEntry("command", `$ ${input}`);
    setCommandHistory((currentHistory) => [...(currentHistory ?? []), input]);
    setHistoryIndex(-1);

    // Parse and process command
    const command = parseGitCommand(input);

    if (command && gitCommands[command]) {
      const gitCmd = gitCommands[command];
      setCurrentCommand(gitCmd);

      // Add command output
      addEntry("output", `Command: ${gitCmd.command}`);
      addEntry("output", `Description: ${gitCmd.description}`);
      addEntry("output", `Usage: ${gitCmd.usage}`);

      if (gitCmd.examples.length > 0) {
        addEntry("output", "Examples:");
        gitCmd.examples.forEach((example: string) => {
          addEntry("output", `  ${example}`);
        });
      }
    } else {
      setCurrentCommand(null);
      addEntry("error", `Command not found: ${input}`);
      addEntry("error", "Try one of these common Git commands:");
      addEntry("error", "  git init, git add, git commit, git push, git pull");

      const suggestions = getCommandSuggestions(input);
      if (suggestions.length > 0) {
        addEntry("error", "Did you mean:");
        suggestions.forEach((suggestion) => {
          addEntry("error", `  ${suggestion}`);
        });
      }
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory && commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0 && commandHistory) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] || "");
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestions = getCommandSuggestions(input);
      if (suggestions.length > 0) {
        setInput(suggestions[0]);
      }
    }
  };

  const handleSuggestionClick = (command: string) => {
    setInput(command);
    inputRef.current?.focus();
  };

  const clearTerminal = () => {
    setEntries([]);
    setCurrentCommand(null);
  };

  const handleReviewSubmit = async (review: Review) => {
    try {
      await submitReview({
        name: review.name,
        rating: review.rating,
        comment: review.comment,
      });
      setShowReviewForm(false);
    } catch (error) {
      // Error is already handled in the hook
      console.error("Failed to submit review:", error);
    }
  };

  // Update suggestions
  useEffect(() => {
    let newSuggestions = getCommandSuggestions(input);

    if (
      !input.trim() &&
      currentCommand &&
      currentCommand.relatedCommands?.length > 0
    ) {
      newSuggestions = [...currentCommand.relatedCommands, ...newSuggestions];
    }

    setSuggestions(newSuggestions);
  }, [input, currentCommand]);

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
            title="Loading testimonials..."
            description="Fetching user testimonials and reviews"
          />
        ) : testimonialsError ? (
          <ErrorState
            title="Failed to load testimonials"
            description={testimonialsError}
          />
        ) : (
          <Testimonials testimonials={allTestimonials} />
        )}

        <div className="mt-8 sm:mt-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                User Reviews
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Share your experience with the community
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-2 text-sm px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Leave Review
            </button>
          </div>

          {showReviewForm && (
            <ReviewForm
              onSubmit={handleReviewSubmit}
              onCancel={() => setShowReviewForm(false)}
            />
          )}

          {reviewsLoading ? (
            <LoadingState
              title="Loading reviews..."
              description="Fetching user reviews"
            />
          ) : reviewsError ? (
            <ErrorState
              title="Failed to load reviews"
              description={reviewsError}
            />
          ) : (
            <ReviewList reviews={reviews || []} />
          )}
        </div>

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
