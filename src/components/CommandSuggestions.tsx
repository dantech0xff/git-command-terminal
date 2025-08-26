interface CommandSuggestionsProps {
  suggestions: string[];
  input: string;
  onSuggestionClick: (suggestion: string) => void;
}

export function CommandSuggestions({
  suggestions,
  input,
  onSuggestionClick,
}: CommandSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="text-xs text-muted-foreground">
      <div className="mb-1">
        <span>{input.trim() ? "Suggestions" : "Related Commands"}: </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 5).map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-accent hover:text-accent-foreground underline suggestion-link bg-muted/30 px-2 py-1 rounded text-xs">
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
