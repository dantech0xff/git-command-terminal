import { RefObject } from "react";
import { TerminalDisplay } from "./TerminalDisplay";
import { TerminalEntry } from "@/types";

interface TerminalSectionProps {
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

export function TerminalSection({
  entries,
  input,
  suggestions,
  inputRef,
  scrollRef,
  onInputChange,
  onSubmit,
  onKeyDown,
  onSuggestionClick,
}: TerminalSectionProps) {
  return (
    <div className="xl:col-span-2">
      <TerminalDisplay
        entries={entries}
        input={input}
        suggestions={suggestions}
        inputRef={inputRef}
        scrollRef={scrollRef}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
        onSuggestionClick={onSuggestionClick}
      />
    </div>
  );
}
