import { RefObject } from "react";
import { CornerDownLeft } from "lucide-react";
import { appStrings } from "@/config/strings";

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
      <span className="text-primary font-mono text-sm">
        {appStrings.terminal.prompt}
      </span>
      <div className="flex-1 flex items-center bg-transparent px-2 py-1 ">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-xs sm:text-sm placeholder:text-muted-foreground"
          placeholder={appStrings.ui.placeholders.enterCommand}
          autoComplete="off"
        />
        <button
          type="submit"
          className="ml-2 p-1 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          title="Submit command (Enter)">
          <CornerDownLeft size={14} />
        </button>
      </div>
    </form>
  );
}
