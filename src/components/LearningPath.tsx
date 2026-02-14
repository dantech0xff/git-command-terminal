import { useState } from "react";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Layers,
  Terminal,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { appStrings, interpolateString } from "@/config/strings";
import { learningPaths } from "@/data/learning-data";
import type { DifficultyLevel, LearningPath as LearningPathType } from "@/types";

interface LearningPathProps {
  completedTopics: string[];
  onTryCommand: (command: string) => void;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

const difficultyIcons: Record<DifficultyLevel, React.ReactNode> = {
  beginner: <BookOpen size={16} />,
  intermediate: <Layers size={16} />,
  advanced: <GraduationCap size={16} />,
};

export function LearningPathSection({
  completedTopics,
  onTryCommand,
}: LearningPathProps) {
  const [expandedPath, setExpandedPath] = useState<string | null>("beginner");

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
          {appStrings.sections.learningPath.title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {appStrings.sections.learningPath.subtitle}
        </p>
      </div>

      <div className="space-y-3">
        {learningPaths.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            isExpanded={expandedPath === path.id}
            onToggle={() =>
              setExpandedPath(expandedPath === path.id ? null : path.id)
            }
            completedTopics={completedTopics}
            onTryCommand={onTryCommand}
          />
        ))}
      </div>
    </div>
  );
}

function LearningPathCard({
  path,
  isExpanded,
  onToggle,
  completedTopics,
  onTryCommand,
}: {
  path: LearningPathType;
  isExpanded: boolean;
  onToggle: () => void;
  completedTopics: string[];
  onTryCommand: (command: string) => void;
}) {
  const completedCount = path.topics.filter((t) =>
    completedTopics.includes(t.id)
  ).length;
  const totalTopics = path.topics.length;

  return (
    <Card className="bg-card border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-3 sm:p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors text-left"
      >
        <div
          className={`p-2 rounded-lg border ${difficultyColors[path.difficulty]}`}
        >
          {difficultyIcons[path.difficulty]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-foreground text-sm sm:text-base">
            {path.title}
          </div>
          <div className="text-xs text-muted-foreground mt-0.5">
            {path.description}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs px-1.5 py-0">
              {interpolateString(appStrings.learning.paths.topicsCount, {
                count: totalTopics,
              })}
            </Badge>
            {completedCount > 0 && (
              <span className="text-xs text-primary">
                {completedCount}/{totalTopics}{" "}
                {appStrings.learning.paths.completed.toLowerCase()}
              </span>
            )}
          </div>
        </div>
        <ChevronRight
          size={16}
          className={`text-muted-foreground transition-transform ${
            isExpanded ? "rotate-90" : ""
          }`}
        />
      </button>

      {isExpanded && (
        <div className="border-t border-border px-3 sm:px-4 py-2 sm:py-3 space-y-2">
          {path.topics.map((topic) => {
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <div
                key={topic.id}
                className={`p-2 sm:p-3 rounded-lg border ${
                  isCompleted
                    ? "bg-primary/10 border-primary/30"
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-medium text-foreground text-xs sm:text-sm flex items-center gap-1.5">
                      {isCompleted && (
                        <span className="text-primary text-xs">✓</span>
                      )}
                      {topic.title}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {topic.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {topic.commands.map((cmd) => (
                    <Button
                      key={cmd}
                      variant="ghost"
                      size="sm"
                      onClick={() => onTryCommand(cmd)}
                      className="h-6 px-2 text-xs font-mono text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <Terminal size={10} className="mr-1" />
                      {cmd}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
