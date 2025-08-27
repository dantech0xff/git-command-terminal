import { useEffect } from "react";
import {
  parseGitCommand,
  gitCommands,
  getCommandSuggestions,
} from "@/lib/git-commands";
import { TerminalEntry } from "@/types";
import { appStrings } from "@/config/strings";

interface UseTerminalHandlersProps {
  input: string;
  setInput: (input: string) => void;
  entries: TerminalEntry[];
  setEntries: (
    entries:
      | TerminalEntry[]
      | ((current: TerminalEntry[] | null) => TerminalEntry[])
  ) => void;
  commandHistory: string[];
  setCommandHistory: (
    history: string[] | ((current: string[] | null) => string[])
  ) => void;
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  currentCommand: any;
  setCurrentCommand: (command: any) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function useTerminalHandlers({
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
}: UseTerminalHandlersProps) {
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

  const clearTerminal = () => {
    setEntries([]);
    setCurrentCommand(null);
  };

  // Shared function to execute a git command
  const executeCommand = (commandInput: string) => {
    // Add command to history
    addEntry("command", `$ ${commandInput}`);
    setCommandHistory((currentHistory) => [
      ...(currentHistory ?? []),
      commandInput,
    ]);
    setHistoryIndex(-1);

    // Parse and process command
    const command = parseGitCommand(commandInput);

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
        `${appStrings.terminal.errors.commandNotFound}: ${commandInput}`
      );
      addEntry("error", appStrings.terminal.errors.tryTheseCommands);
      addEntry("error", `  ${appStrings.terminal.errors.commonCommands}`);

      const suggestions = getCommandSuggestions(commandInput);
      if (suggestions.length > 0) {
        addEntry("error", appStrings.terminal.errors.didYouMean);
        suggestions.forEach((suggestion) => {
          addEntry("error", `  ${suggestion}`);
        });
      }
    }
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

    executeCommand(input);
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

    // Execute the command immediately using shared logic
    executeCommand(command);

    // Clear the input after execution
    setInput("");
    inputRef.current?.focus();
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
  }, [input, currentCommand, setSuggestions]);

  return {
    addEntry,
    handleSubmit,
    handleKeyDown,
    handleSuggestionClick,
    clearTerminal,
  };
}
