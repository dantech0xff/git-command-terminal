import { useState, useCallback } from "react";
import {
  CheckCircle,
  XCircle,
  BookOpen,
  Layers,
  GraduationCap,
  RotateCcw,
  ArrowRight,
  Terminal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { appStrings, interpolateString } from "@/config/strings";
import { getQuizByDifficulty } from "@/data/learning-data";
import type { DifficultyLevel, QuizQuestion } from "@/types";

interface QuizModeProps {
  onQuizComplete: (difficulty: DifficultyLevel, score: number, total: number) => void;
  onTryCommand: (command: string) => void;
}

type QuizPhase = "select" | "question" | "result" | "complete";

const difficultyConfig: Record<
  DifficultyLevel,
  { icon: React.ReactNode; color: string }
> = {
  beginner: {
    icon: <BookOpen size={18} />,
    color: "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30",
  },
  intermediate: {
    icon: <Layers size={18} />,
    color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30",
  },
  advanced: {
    icon: <GraduationCap size={18} />,
    color: "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30",
  },
};

export function QuizMode({ onQuizComplete, onTryCommand }: QuizModeProps) {
  const [phase, setPhase] = useState<QuizPhase>("select");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("beginner");

  const startQuiz = useCallback((diff: DifficultyLevel) => {
    const quizQuestions = getQuizByDifficulty(diff);
    setDifficulty(diff);
    setQuestions(quizQuestions);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
    setPhase("question");
  }, []);

  const handleAnswer = useCallback(
    (answerIdx: number) => {
      if (selectedAnswer !== null) return;
      setSelectedAnswer(answerIdx);
      const isCorrect = answerIdx === questions[currentIdx].correctAnswer;
      if (isCorrect) {
        setScore((s) => s + 1);
      }
      setPhase("result");
    },
    [selectedAnswer, questions, currentIdx]
  );

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questions.length) {
      setPhase("complete");
      onQuizComplete(difficulty, score + (selectedAnswer === questions[currentIdx].correctAnswer ? 0 : 0), questions.length);
    } else {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer(null);
      setPhase("question");
    }
  }, [currentIdx, questions, difficulty, score, selectedAnswer, onQuizComplete]);

  const resetQuiz = useCallback(() => {
    setPhase("select");
    setQuestions([]);
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setScore(0);
  }, []);

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
          {appStrings.sections.quiz.title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {appStrings.sections.quiz.subtitle}
        </p>
      </div>

      {phase === "select" && (
        <DifficultySelector onSelect={startQuiz} />
      )}

      {(phase === "question" || phase === "result") && questions.length > 0 && (
        <QuestionCard
          question={questions[currentIdx]}
          questionNumber={currentIdx + 1}
          totalQuestions={questions.length}
          selectedAnswer={selectedAnswer}
          showResult={phase === "result"}
          score={score}
          onAnswer={handleAnswer}
          onNext={handleNext}
          onTryCommand={onTryCommand}
          isLast={currentIdx + 1 >= questions.length}
        />
      )}

      {phase === "complete" && (
        <QuizResults
          score={score}
          total={questions.length}
          difficulty={difficulty}
          onRetry={() => startQuiz(difficulty)}
          onReset={resetQuiz}
        />
      )}
    </div>
  );
}

function DifficultySelector({
  onSelect,
}: {
  onSelect: (diff: DifficultyLevel) => void;
}) {
  const difficulties: DifficultyLevel[] = [
    "beginner",
    "intermediate",
    "advanced",
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {difficulties.map((diff) => (
        <Card
          key={diff}
          className="bg-card border border-border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => onSelect(diff)}
        >
          <div className="text-center space-y-2">
            <div
              className={`inline-flex p-3 rounded-lg border ${difficultyConfig[diff].color}`}
            >
              {difficultyConfig[diff].icon}
            </div>
            <div className="font-medium text-foreground text-sm capitalize">
              {appStrings.learning.difficulty[diff]}
            </div>
            <p className="text-xs text-muted-foreground">
              {getQuizByDifficulty(diff).length} questions
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  showResult,
  score,
  onAnswer,
  onNext,
  onTryCommand,
  isLast,
}: {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  showResult: boolean;
  score: number;
  onAnswer: (idx: number) => void;
  onNext: () => void;
  onTryCommand: (command: string) => void;
  isLast: boolean;
}) {
  const progressPercent = (questionNumber / totalQuestions) * 100;

  return (
    <Card className="bg-card border border-border p-3 sm:p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {interpolateString(appStrings.learning.quiz.questionOf, {
              current: questionNumber,
              total: totalQuestions,
            })}
          </span>
          <span>
            {interpolateString(appStrings.learning.quiz.score, {
              score,
              total: totalQuestions,
            })}
          </span>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      <div className="text-sm sm:text-base font-medium text-foreground">
        {question.question}
      </div>

      <div className="space-y-2">
        {question.options.map((option, idx) => {
          let optionStyle =
            "border-border hover:bg-muted/50 text-card-foreground";
          if (showResult) {
            if (idx === question.correctAnswer) {
              optionStyle = "border-green-500/50 bg-green-500/10 text-green-400";
            } else if (
              idx === selectedAnswer &&
              idx !== question.correctAnswer
            ) {
              optionStyle = "border-red-500/50 bg-red-500/10 text-red-400";
            } else {
              optionStyle = "border-border/50 text-muted-foreground opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => onAnswer(idx)}
              disabled={showResult}
              className={`w-full text-left p-2.5 sm:p-3 rounded-lg border text-xs sm:text-sm transition-colors ${optionStyle} ${
                !showResult ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-2">
                {showResult && idx === question.correctAnswer && (
                  <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                )}
                {showResult &&
                  idx === selectedAnswer &&
                  idx !== question.correctAnswer && (
                    <XCircle size={14} className="text-red-400 flex-shrink-0" />
                  )}
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="space-y-3">
          <div
            className={`p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            <div className="font-medium mb-1">
              {selectedAnswer === question.correctAnswer
                ? appStrings.learning.quiz.correct
                : appStrings.learning.quiz.incorrect}
            </div>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onTryCommand(question.relatedCommand)}
              className="text-xs text-primary"
            >
              <Terminal size={12} className="mr-1" />
              {appStrings.learning.quiz.relatedCommand}: {question.relatedCommand}
            </Button>
            <Button size="sm" onClick={onNext} className="text-xs">
              {isLast
                ? appStrings.learning.quiz.showResults
                : appStrings.learning.quiz.nextQuestion}
              <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

function QuizResults({
  score,
  total,
  difficulty,
  onRetry,
  onReset,
}: {
  score: number;
  total: number;
  difficulty: DifficultyLevel;
  onRetry: () => void;
  onReset: () => void;
}) {
  const percentage = Math.round((score / total) * 100);

  return (
    <Card className="bg-card border border-border p-4 sm:p-6 text-center space-y-4">
      <div className="text-4xl sm:text-5xl font-bold text-primary">
        {percentage}%
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        {appStrings.learning.quiz.quizComplete}
      </h3>
      <p className="text-sm text-muted-foreground">
        {interpolateString(appStrings.learning.quiz.greatJob, { score, total })}
      </p>
      <Badge
        variant="outline"
        className={`${difficultyConfig[difficulty].color} capitalize`}
      >
        {appStrings.learning.difficulty[difficulty]}
      </Badge>
      <p className="text-xs text-muted-foreground">
        {appStrings.learning.quiz.keepPracticing}
      </p>
      <div className="flex justify-center gap-2">
        <Button variant="outline" size="sm" onClick={onRetry} className="text-xs">
          <RotateCcw size={12} className="mr-1" />
          {appStrings.learning.quiz.tryAgain}
        </Button>
        <Button size="sm" onClick={onReset} className="text-xs">
          {appStrings.learning.quiz.selectDifficulty}
        </Button>
      </div>
    </Card>
  );
}
