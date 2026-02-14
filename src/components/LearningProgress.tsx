import { Terminal, Award, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { appStrings, interpolateString } from "@/config/strings";
import { getCommandCount } from "@/lib/git-commands";
import type { LearningProgress as LearningProgressType } from "@/types";

interface LearningProgressProps {
  progress: LearningProgressType;
}

const MAX_RECENT_QUIZZES = 5;

export function LearningProgressCard({ progress }: LearningProgressProps) {
  const totalCommands = getCommandCount();
  const exploredCount = progress.commandsExplored.length;
  const exploredPercent =
    totalCommands > 0 ? Math.round((exploredCount / totalCommands) * 100) : 0;
  const quizCount = progress.quizScores.length;
  const topicCount = progress.completedTopics.length;

  if (exploredCount === 0 && quizCount === 0) {
    return (
      <Card className="bg-card border border-border p-3 sm:p-4">
        <h3 className="font-medium text-foreground mb-2 text-sm flex items-center gap-2">
          <Award size={14} />
          {appStrings.sections.progress.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {appStrings.learning.progress.noProgress}
        </p>
      </Card>
    );
  }

  return (
    <Card className="bg-card border border-border p-3 sm:p-4 space-y-3">
      <h3 className="font-medium text-foreground text-sm flex items-center gap-2">
        <Award size={14} />
        {appStrings.sections.progress.title}
      </h3>

      <div className="space-y-3">
        {/* Commands Explored */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <Terminal size={12} />
              {appStrings.learning.progress.commandsExplored}
            </span>
            <span className="text-foreground font-medium">
              {exploredCount}{" "}
              <span className="text-muted-foreground font-normal">
                {interpolateString(
                  appStrings.learning.progress.totalCommands,
                  { total: totalCommands }
                )}
              </span>
            </span>
          </div>
          <Progress value={exploredPercent} className="h-1.5" />
        </div>

        {/* Quiz Scores */}
        {quizCount > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground flex items-center gap-1">
              <BookOpen size={12} />
              {appStrings.learning.progress.quizzesTaken}
            </span>
            <span className="text-foreground font-medium">{quizCount}</span>
          </div>
        )}

        {/* Recent quiz results */}
        {progress.quizScores.length > 0 && (
          <div className="space-y-1">
            <div className="text-xs text-muted-foreground">Recent quizzes:</div>
            <div className="flex flex-wrap gap-1">
              {progress.quizScores.slice(-MAX_RECENT_QUIZZES).map((qs, i) => (
                <span
                  key={i}
                  className={`text-xs px-1.5 py-0.5 rounded border ${
                    qs.score / qs.total >= 0.8
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : qs.score / qs.total >= 0.5
                        ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {qs.score}/{qs.total} ({qs.difficulty})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Topics completed */}
        {topicCount > 0 && (
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {appStrings.learning.progress.topicsCompleted}
            </span>
            <span className="text-foreground font-medium">{topicCount}</span>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        {appStrings.learning.progress.keepGoing}
      </p>
    </Card>
  );
}
