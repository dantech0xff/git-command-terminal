import { useState, useRef, useCallback } from "react";
import { useKV } from "@github/spark/hooks";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AppHeader } from "./components/AppHeader";
import { TerminalSection } from "./components/TerminalSection";
import { CommandDetails } from "./components/CommandDetails";
import { HelpTips } from "./components/HelpTips";
import { GitHubButtons } from "./components/GitHubButtons";
import { Testimonials } from "./components/Testimonials";
import { ReviewsSection } from "./components/ReviewsSection";
import { AppFooter } from "./components/AppFooter";
import { LoadingState, ErrorState } from "./components/LoadingStates";
import { NetworkStatus, useNetworkStatus } from "./components/NetworkStatus";
import { NetworkDemo } from "./components/NetworkDemo";
import { LearningPathSection } from "./components/LearningPath";
import { QuizMode } from "./components/QuizMode";
import { LearningProgressCard } from "./components/LearningProgress";
import { TerminalEntry, Review, Testimonial, LearningProgress, DifficultyLevel } from "./types";
import { useReviews, useAllTestimonials } from "./hooks/useData";
import { isLocalhost } from "./utils/environment";
import { appStrings } from "./config/strings";
import { useThemeHandlers } from "./handlers/theme-handlers";
import { useTerminalHandlers } from "./handlers/terminal-handlers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
  const [showTerminal, setShowTerminal] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<"terminal" | "learn" | "quiz">("terminal");
  const [learningProgress, setLearningProgress] = useKV<LearningProgress>(
    "learning-progress",
    { commandsExplored: [], quizScores: [], completedTopics: [] }
  );

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
    scrollRef,
  });

  // Track commands explored for learning progress
  const trackCommandExplored = useCallback(
    (command: string) => {
      if (
        learningProgress &&
        !learningProgress.commandsExplored.includes(command)
      ) {
        setLearningProgress({
          ...learningProgress,
          commandsExplored: [...learningProgress.commandsExplored, command],
        });
      }
    },
    [learningProgress, setLearningProgress]
  );

  // Handle quiz completion
  const handleQuizComplete = useCallback(
    (difficulty: DifficultyLevel, score: number, total: number) => {
      if (learningProgress) {
        setLearningProgress({
          ...learningProgress,
          quizScores: [
            ...learningProgress.quizScores,
            { difficulty, score, total, timestamp: Date.now() },
          ],
        });
      }
    },
    [learningProgress, setLearningProgress]
  );

  // Handle "Try in Terminal" from learning/quiz
  const handleTryCommand = useCallback(
    (command: string) => {
      setActiveTab("terminal");
      setShowTerminal(true);
      setInput(command);
      trackCommandExplored(command);
      setTimeout(() => inputRef.current?.focus(), 100);
    },
    [setInput, trackCommandExplored]
  );

  // Track when a command is submitted in terminal
  const handleTerminalSubmit = useCallback(() => {
    if (input.trim()) {
      trackCommandExplored(input.trim());
    }
    handleSubmit();
  }, [input, trackCommandExplored, handleSubmit]);

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
          showTerminal={showTerminal}
          showInfoPanel={showInfoPanel}
          onToggleTerminal={() => setShowTerminal(!showTerminal)}
          onToggleInfoPanel={() => setShowInfoPanel(!showInfoPanel)}
        />

        {/* Learning Mode Tabs */}
        <div className="flex gap-1 bg-muted/30 p-1 rounded-lg border border-border">
          {(["terminal", "learn", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {appStrings.learning.tabs[tab]}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "terminal" && (
            <motion.div
              key="terminal-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`grid gap-4 ${
                showTerminal && showInfoPanel
                  ? "grid-cols-1 xl:grid-cols-3"
                  : "grid-cols-1"
              }`}>
                {showTerminal && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={showInfoPanel ? "xl:col-span-2" : "col-span-full"}>
                    <TerminalSection
                      entries={entries}
                      input={input}
                      suggestions={suggestions}
                      inputRef={inputRef}
                      scrollRef={scrollRef}
                      onInputChange={setInput}
                      onSubmit={handleTerminalSubmit}
                      onKeyDown={handleKeyDown}
                      onSuggestionClick={handleSuggestionClick}
                    />
                  </motion.div>
                )}

                {showInfoPanel && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="space-y-4">
                    <AnimatePresence mode="wait">
                      {currentCommand && (
                        <motion.div
                          key="command-details"
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}>
                          <CommandDetails command={currentCommand} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    {learningProgress && (
                      <LearningProgressCard progress={learningProgress} />
                    )}
                    <motion.div
                      layout
                      transition={{ duration: 0.3, ease: "easeOut" }}>
                      <HelpTips />
                    </motion.div>
                    <GitHubButtons />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "learn" && (
            <motion.div
              key="learn-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <LearningPathSection
                completedTopics={learningProgress?.completedTopics ?? []}
                onTryCommand={handleTryCommand}
              />
            </motion.div>
          )}

          {activeTab === "quiz" && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <QuizMode
                onQuizComplete={handleQuizComplete}
                onTryCommand={handleTryCommand}
              />
            </motion.div>
          )}
        </AnimatePresence>

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
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
