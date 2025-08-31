# Git Command Terminal - AI Agent Instructions

## Project Overview

Interactive React app teaching Git commands through terminal simulation. Built with **GitHub Spark** framework, using TypeScript, Vite 6, and React 19 with extensive UI component system.

## Critical Architecture Patterns

### Data Layer

- **GitHub Spark KV storage** via `useKV()` hooks for persistence (theme, history, reviews)
- **Mock API simulation** in `src/services/api.ts` with configurable network delays/errors
- **Custom hooks pattern**: `useReviews()`, `useTestimonials()` in `src/hooks/useData.ts` handle async data + local state sync

### Component Structure

- **Handler separation**: Logic extracted to `src/handlers/` (terminal-handlers.tsx, theme-handlers.tsx, review-handlers.tsx)
- **Radix UI + shadcn/ui**: All UI components in `src/components/ui/` are Radix wrappers, don't modify directly
- **Centralized strings**: All text in `src/config/strings.ts` - use `appStrings.section.property` pattern

### Git Command System

- **Command data**: 100+ Git commands in `src/data/git-commands-data.ts` with structured metadata
- **Command parsing**: `parseGitCommand()` handles partial matches and suggestions
- **Terminal simulation**: `TerminalEntry` types for command/output/error display

## Essential Development Patterns

### String Management

```typescript
// Always use centralized strings
import { appStrings } from "@/config/strings";
const text = appStrings.ui.buttons.submit; // Never hardcode text
```

### Network Simulation

```typescript
// API calls include realistic delays + error simulation
await apiService.fetchReviews(); // Uses configured network timing
```

### Theme System

- 6 themes in `src/lib/themes.ts` using OKLCH color space
- CSS custom properties in `src/styles/theme.css`
- Theme switching persisted via `useKV("selected-theme")`

### Handler Pattern

```typescript
// Extract complex logic to handlers
const { handleSubmit, handleKeyDown } = useTerminalHandlers({
  input,
  setInput,
  entries,
  setEntries, // Pass state + setters
});
```

## Development Workflow

### Key Commands

```bash
npm run dev      # Vite dev server on localhost:5173
npm run build    # TypeScript + Vite production build
npm run lint     # ESLint with TypeScript rules
```

### File Modification Guidelines

- **Component logic**: Extract to `src/handlers/` if complex
- **New text**: Add to `src/config/strings.ts` first
- **UI components**: Use existing `src/components/ui/` wrappers
- **Git commands**: Add to `src/data/git-commands-data.ts` with full metadata

### Dependencies

- **@github/spark**: Core framework - use `useKV()` for persistence
- **@radix-ui/\***: UI primitives - don't install alternatives
- **@tailwindcss/vite**: Tailwind 4 + Vite integration
- **sonner**: Toast notifications - use `toast.success()` etc.

### Environment Detection

```typescript
import { isLocalhost } from "@/utils/environment";
// Show dev-only features like NetworkDemo
```

## Integration Points

### GitHub Spark Integration

- `sparkPlugin()` in `vite.config.ts` - don't remove
- `@github/spark/hooks` for `useKV()` storage
- Icon proxy plugin for Phosphor icons

### Network Layer

- Mock API with `src/config/network.ts` controls response timing
- Development network demo widget (localhost only)
- Error simulation for testing loading states

### Type Safety

- Strict TypeScript with `src/types/index.ts` shared types
- `as const` pattern for string configs
- Path aliases: `@/` maps to `src/`

## Common Gotchas

- Don't modify `src/components/ui/` - these are shadcn/ui imports
- Always add strings to config before using in components
- Use `useKV()` not `useState()` for data that should persist
- Network simulation is enabled by default - check `src/config/network.ts` for realistic API timing
- Import git commands from `src/lib/git-commands.ts`, not data file directly
