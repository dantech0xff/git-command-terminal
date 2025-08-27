import { gitCommands } from "../data/git-commands-data";

export interface GitCommand {
  command: string;
  description: string;
  usage: string;
  examples: string[];
  relatedCommands: string[];
  category: "main" | "ancillary" | "plumbing" | "interaction" | "guides";
}

// Re-export the commands data for backwards compatibility
export { gitCommands };

export function parseGitCommand(input: string): string | null {
  const trimmed = input.trim().toLowerCase();

  // Direct match
  if (gitCommands[trimmed]) {
    return trimmed;
  }

  // Try to match command with additional arguments
  for (const command in gitCommands) {
    if (trimmed.startsWith(command.toLowerCase())) {
      return command;
    }
  }

  return null;
}

export function getCommandSuggestions(partial: string): string[] {
  const trimmed = partial.trim().toLowerCase();

  return Object.keys(gitCommands)
    .filter((command) => command.toLowerCase().includes(trimmed))
    .slice(0, 8); // Increased from 5 to 8 due to more commands
}

export function getCommandsByCategory(
  category?: "main" | "ancillary" | "plumbing" | "interaction" | "guides"
): GitCommand[] {
  if (!category) {
    return Object.values(gitCommands);
  }

  return Object.values(gitCommands).filter((cmd) => cmd.category === category);
}

export function getMainCommands(): GitCommand[] {
  return getCommandsByCategory("main");
}

export function searchCommands(query: string): GitCommand[] {
  const lowerQuery = query.toLowerCase();

  return Object.values(gitCommands).filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.examples.some((example) => example.toLowerCase().includes(lowerQuery))
  );
}

// Get total count of commands
export function getCommandCount(): number {
  return Object.keys(gitCommands).length;
}

// Get random command for learning
export function getRandomCommand(): GitCommand {
  const commands = Object.values(gitCommands);
  const randomIndex = Math.floor(Math.random() * commands.length);
  return commands[randomIndex];
}
