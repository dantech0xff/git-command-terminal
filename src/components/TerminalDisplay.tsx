import { RefObject } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TerminalEntry } from "@/types";
import { TerminalInput } from "./TerminalInput";
import { CommandSuggestions } from "./CommandSuggestions";

interface TerminalDisplayProps {
  entries: TerminalEntry[] | undefined;
  input: string;
  suggestions: string[];
  inputRef: RefObject<HTMLInputElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSuggestionClick: (suggestion: string) => void;
}

export function TerminalDisplay({
  entries,
  input,
  suggestions,
  inputRef,
  scrollRef,
  onInputChange,
  onSubmit,
  onKeyDown,
  onSuggestionClick,
}: TerminalDisplayProps) {
  return (
    <Card className="bg-card border border-border">
      <div className="p-3 sm:p-4 space-y-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm">
          <div className="flex gap-1">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-destructive"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-accent"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary"></div>
          </div>
          <span className="hidden sm:inline">Git Learning Terminal</span>
          <span className="sm:hidden">Terminal</span>
        </div>

        {/* Terminal Output */}
        <ScrollArea className="h-64 sm:h-80 lg:h-96">
          <div
            ref={scrollRef}
            className="space-y-1 text-xs sm:text-sm font-mono">
            {(!entries || entries.length === 0) && (
              <div className="text-muted-foreground">
                <p>Welcome to Git Command Terminal!</p>
                <p className="hidden sm:block">
                  Type any git command to learn how to use it. We support 50+
                  official Git commands!
                </p>
                <p className="sm:hidden">
                  Type git commands to learn (50+ supported)
                </p>
                <p>Examples: git init, git commit, git merge, git rebase</p>
              </div>
            )}

            {entries &&
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className={`break-words ${
                    entry.type === "command"
                      ? "text-primary font-medium"
                      : entry.type === "error"
                      ? "text-destructive"
                      : "text-card-foreground"
                  }`}>
                  {entry.content}
                </div>
              ))}
          </div>
        </ScrollArea>

        {/* Command Input */}
        <TerminalInput
          input={input}
          inputRef={inputRef}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          onKeyDown={onKeyDown}
        />

        {/* Live Suggestions */}
        <CommandSuggestions
          suggestions={suggestions}
          input={input}
          onSuggestionClick={onSuggestionClick}
        />
      </div>
    </Card>
  );
}
