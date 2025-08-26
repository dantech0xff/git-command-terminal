import { RefObject } from "react";

interface TerminalInputProps {
  input: string;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export function TerminalInput({
  input,
  inputRef,
  onInputChange,
  onSubmit,
  onKeyDown,
}: TerminalInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-1 sm:gap-2">
      <span className="text-primary font-mono text-sm">$</span>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyDown}
        className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs sm:text-sm placeholder:text-muted-foreground"
        placeholder="Enter git command..."
        autoComplete="off"
      />
      <span className="text-primary font-mono terminal-cursor text-sm">|</span>
    </form>
  );
}
