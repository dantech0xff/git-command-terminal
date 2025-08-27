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
import { ReviewsSection } from "./components/ReviewsSection";
import { AppFooter } from "./components/AppFooter";
import { LoadingState, ErrorState } from "./components/LoadingStates";
import { NetworkStatus, useNetworkStatus } from "./components/NetworkStatus";
import { NetworkDemo } from "./components/NetworkDemo";
import { TerminalEntry, Review, Testimonial } from "./types";
import { useReviews, useAllTestimonials } from "./hooks/useData";
import { isLocalhost } from "./utils/environment";
import { appStrings, strings } from "./config/strings";

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
      toast.success(
        strings.buildSuccessMessage("themeChanged", { themeName: theme.name })
      );
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

    // Check for clear command
    if (input.trim().toLowerCase() === "clear") {
      clearTerminal();
      setInput("");
      return;
    }

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
      addEntry(
        "output",
        `${appStrings.terminal.output.command}: ${gitCmd.command}`
      );
      addEntry(
        "output",
        `${appStrings.terminal.output.description}: ${gitCmd.description}`
      );
      addEntry(
        "output",
        `${appStrings.terminal.output.usage}: ${gitCmd.usage}`
      );

      if (gitCmd.examples.length > 0) {
        addEntry("output", appStrings.terminal.output.examples);
        gitCmd.examples.forEach((example: string) => {
          addEntry("output", `  ${example}`);
        });
      }
    } else {
      setCurrentCommand(null);
      addEntry(
        "error",
        `${appStrings.terminal.errors.commandNotFound}: ${input}`
      );
      addEntry("error", appStrings.terminal.errors.tryTheseCommands);
      addEntry("error", `  ${appStrings.terminal.errors.commonCommands}`);

      const suggestions = getCommandSuggestions(input);
      if (suggestions.length > 0) {
        addEntry("error", appStrings.terminal.errors.didYouMean);
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
