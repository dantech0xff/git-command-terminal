<!--<!--

SYNC IMPACT REPORT - Constitution UpdateSYNC IMPACT REPORT - Constitution Update

══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════



Version Change: INITIAL (template) → 1.0.0 (first ratification)Version Change: INITIAL (template) → 1.0.0 (first ratification)



Modified Principles:Modified Principles:

  - NEW: I. Centralized Configuration  - NEW: I. Centralized Configuration

  - NEW: II. Handler-Based Architecture    - NEW: II. Handler-Based Architecture

  - NEW: III. Type Safety & Strict TypeScript  - NEW: III. Type Safety & Strict TypeScript

  - NEW: IV. Component Reusability  - NEW: IV. Component Reusability

  - NEW: V. Network Simulation & Real-World Readiness  - NEW: V. Network Simulation & Real-World Readiness

  - NEW: VI. Persistent State with GitHub Spark KV  - NEW: VI. Persistent State with GitHub Spark KV

  - NEW: VII. Accessibility & Theme System  - NEW: VII. Accessibility & Theme System



Added Sections:Added Sections:

  - Technical Stack Requirements  - Technical Stack Requirements

  - Development Workflow Standards  - Development Workflow Standards



Removed Sections:Removed Sections:

  - None (first ratification)  - None (first ratification)



Templates Requiring Updates:Templates Requiring Updates:

  ✅ plan-template.md - Constitution Check section aligned with principles  ✅ plan-template.md - Constitution Check section aligned with principles

  ✅ spec-template.md - Requirements structure matches architecture principles  ✅ spec-template.md - Requirements structure matches architecture principles

  ✅ tasks-template.md - Task organization reflects component patterns  ✅ tasks-template.md - Task organization reflects component patterns



Follow-up TODOs:Follow-up TODOs:

  - None  - None



Rationale:Rationale:

  This is the initial ratification of the Git Command Terminal project constitution,  This is the initial ratification of the Git Command Terminal project constitution,

  establishing governance based on existing architecture patterns documented in  establishing governance based on existing architecture patterns documented in

  README.md, PRD.md, and .github/copilot-instructions.md.  README.md, PRD.md, and .github/copilot-instructions.md.



══════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════

-->-->

# Git Command Terminal Constitution# Git Command Terminal Constitution

## Core Principles## Core Principles

### I. Centralized Configuration### I. Centralized Configuration

**Rule**: All user-facing text MUST be defined in `src/config/strings.ts` before use in components. Network behavior MUST be configured in `src/config/network.ts`. No hardcoded strings or network values in component files.**Rule**: All user-facing text MUST be defined in `src/config/strings.ts` before use in components. Network behavior MUST be configured in `src/config/network.ts`. No hardcoded strings or network values in component files.

**Rationale**: Centralized configuration enables:**Rationale**: Centralized configuration enables:

- Easy localization and content updates without touching component logic- Easy localization and content updates without touching component logic

- Consistent terminology across the entire application- Consistent terminology across the entire application

- Realistic network simulation that can be toggled globally- Realistic network simulation that can be toggled globally

- Single source of truth for all configuration values- Single source of truth for all configuration values

**Implementation**:**Implementation**:

- Import `appStrings` from `@/config/strings` and use `appStrings.section.property` pattern- Import `appStrings` from `@/config/strings` and use `appStrings.section.property` pattern

- Configure network delays and error rates in `src/config/network.ts`- Configure network delays and error rates in `src/config/network.ts`

- Add new text to config file FIRST, then use in components- Add new text to config file FIRST, then use in components

- Use TypeScript's const assertions for type-safe configuration- Use TypeScript's const assertions for type-safe configuration

### II. Handler-Based Architecture### II. Handler-Based Architecture

**Rule**: Complex component logic MUST be extracted to dedicated handler files in `src/handlers/`. Handlers receive state and state setters as parameters and return event handler functions.**Rule**: Complex component logic MUST be extracted to dedicated handler files in `src/handlers/`. Handlers receive state and state setters as parameters and return event handler functions.

**Rationale**: Handler separation:**Rationale**: Handler separation:

- Improves testability by isolating business logic from presentation- Improves testability by isolating business logic from presentation

- Reduces component file size and complexity- Reduces component file size and complexity

- Enables logic reuse across multiple components- Enables logic reuse across multiple components

- Makes state flow explicit and easier to debug- Makes state flow explicit and easier to debug

**Implementation**:**Implementation**:

- Create handlers in `src/handlers/[feature]-handlers.tsx`- Create handlers in `src/handlers/[feature]-handlers.tsx`

- Pass state and setters to handlers as parameters- Pass state and setters to handlers as parameters

- Return object with handler functions (e.g., `{ handleSubmit, handleKeyDown }`)- Return object with handler functions (e.g., `{ handleSubmit, handleKeyDown }`)

- Keep components focused on rendering and UI concerns- Keep components focused on rendering and UI concerns

### III. Type Safety & Strict TypeScript### III. Type Safety & Strict TypeScript

**Rule**: All code MUST use strict TypeScript with explicit types. Shared types MUST be defined in `src/types/index.ts`. Use `as const` for string literal configurations.**Rule**: All code MUST use strict TypeScript with explicit types. Shared types MUST be defined in `src/types/index.ts`. Use `as const` for string literal configurations.

**Rationale**: Type safety:**Rationale**: Type safety:

- Catches bugs at compile time rather than runtime

- Catches bugs at compile time rather than runtime- Provides excellent IDE autocomplete and documentation

- Provides excellent IDE autocomplete and documentation- Makes refactoring safer and faster

- Makes refactoring safer and faster- Documents expected data structures

- Documents expected data structures

**Implementation**:

**Implementation**:- Enable all strict TypeScript compiler options

- Define shared types in `src/types/index.ts`

- Enable all strict TypeScript compiler options- Use path aliases (`@/`) consistently

- Define shared types in `src/types/index.ts`- Avoid `any` type unless absolutely necessary with justification

- Use path aliases (`@/`) consistently

- Avoid `any` type unless absolutely necessary with justification### IV. Component Reusability

### IV. Component Reusability**Rule**: UI components in `src/components/ui/` are shadcn/ui Radix wrappers and MUST NOT be modified directly. All new UI patterns MUST use existing Radix primitives. Custom components MUST be atomic and reusable.

**Rule**: UI components in `src/components/ui/` are shadcn/ui Radix wrappers and MUST NOT be modified directly. All new UI patterns MUST use existing Radix primitives. Custom components MUST be atomic and reusable.**Rationale**: Component discipline ensures:

- Consistent UI behavior and accessibility patterns

**Rationale**: Component discipline ensures:- Easier maintenance when shadcn/ui updates

- Predictable component API across the application

- Consistent UI behavior and accessibility patterns- Faster development using proven primitives

- Easier maintenance when shadcn/ui updates

- Predictable component API across the application**Implementation**:

- Faster development using proven primitives- Never modify files in `src/components/ui/`

- Import Radix components for new UI patterns

**Implementation**:- Build custom components by composing Radix primitives

- Keep components focused on single responsibility

- Never modify files in `src/components/ui/`

- Import Radix components for new UI patterns### V. Network Simulation & Real-World Readiness

- Build custom components by composing Radix primitives

- Keep components focused on single responsibility**Rule**: All API calls MUST go through `src/services/api.ts` with mock implementations that simulate realistic network delays and error conditions. Loading and error states MUST be implemented for all async operations.

### V. Network Simulation & Real-World Readiness**Rationale**: Network simulation:

- Prepares codebase for real backend integration with zero component changes

**Rule**: All API calls MUST go through `src/services/api.ts` with mock implementations that simulate realistic network delays and error conditions. Loading and error states MUST be implemented for all async operations.- Tests loading and error states during development

- Provides realistic user experience feedback before production

**Rationale**: Network simulation:- Makes network characteristics configurable for testing

- Prepares codebase for real backend integration with zero component changes**Implementation**:

- Tests loading and error states during development- Define all API calls in `src/services/api.ts`

- Provides realistic user experience feedback before production- Use network config from `src/config/network.ts`

- Makes network characteristics configurable for testing- Implement loading states with `LoadingStates` component

- Handle errors gracefully with user-friendly messages

**Implementation**:- Show `NetworkDemo` widget in development for testing scenarios

- Define all API calls in `src/services/api.ts`### VI. Persistent State with GitHub Spark KV

- Use network config from `src/config/network.ts`

- Implement loading states with `LoadingStates` component**Rule**: Data that MUST persist across sessions MUST use `useKV()` from `@github/spark/hooks`. Ephemeral UI state uses `useState()`. No localStorage access directly.

- Handle errors gracefully with user-friendly messages

- Show `NetworkDemo` widget in development for testing scenarios**Rationale**: GitHub Spark KV provides:

- Consistent persistence API across the application

### VI. Persistent State with GitHub Spark KV- Framework integration for optimal performance

- Type-safe storage with TypeScript support

**Rule**: Data that MUST persist across sessions MUST use `useKV()` from `@github/spark/hooks`. Ephemeral UI state uses `useState()`. No localStorage access directly.- Seamless state synchronization

**Rationale**: GitHub Spark KV provides:**Implementation**:

- Use `useKV("key-name")` for persistent data (theme, history, reviews)

- Consistent persistence API across the application- Use `useState()` only for transient UI state (input values, modal visibility)

- Framework integration for optimal performance- Follow GitHub Spark patterns in `vite.config.ts`

- Type-safe storage with TypeScript support- Never access localStorage or sessionStorage directly

- Seamless state synchronization

### VII. Accessibility & Theme System

**Implementation**:

**Rule**: All themes MUST maintain WCAG AA contrast ratios. Interactive elements MUST have clear hover and focus states. Theme switching MUST be smooth with no flash of unstyled content.

- Use `useKV("key-name")` for persistent data (theme, history, reviews)

- Use `useState()` only for transient UI state (input values, modal visibility)**Rationale**: Accessibility ensures:

- Follow GitHub Spark patterns in `vite.config.ts`- Application is usable by all developers regardless of visual ability

- Never access localStorage or sessionStorage directly- Professional appearance across different lighting conditions

- Reduced eye strain during extended learning sessions

### VII. Accessibility & Theme System- Inclusive design that respects user preferences

**Rule**: All themes MUST maintain WCAG AA contrast ratios. Interactive elements MUST have clear hover and focus states. Theme switching MUST be smooth with no flash of unstyled content.**Implementation**:

- Define themes in `src/lib/themes.ts` using OKLCH color space

**Rationale**: Accessibility ensures:- Test contrast ratios for all text on background combinations

- Use Radix Color scales for consistent, accessible colors

- Application is usable by all developers regardless of visual ability- Persist theme preference with `useKV("selected-theme")`

- Professional appearance across different lighting conditions- Apply themes via CSS custom properties in `src/styles/theme.css`

- Reduced eye strain during extended learning sessions

- Inclusive design that respects user preferences## Technical Stack Requirements

**Implementation**:**Core Framework**: React 19 with TypeScript, Vite 6 build system, GitHub Spark for state management

- Define themes in `src/lib/themes.ts` using OKLCH color space**UI Layer**: Radix UI primitives via shadcn/ui, Tailwind CSS 4 for styling, Phosphor Icons, JetBrains Mono font

- Test contrast ratios for all text on background combinations

- Use Radix Color scales for consistent, accessible colors**State Management**: GitHub Spark KV storage via `useKV()` hooks for persistence, React useState for ephemeral state

- Persist theme preference with `useKV("selected-theme")`

- Apply themes via CSS custom properties in `src/styles/theme.css`**Development Tools**: ESLint with TypeScript support, strict TypeScript configuration, path aliases for clean imports

## Technical Stack Requirements**Rationale**: Technology choices reflect:

- Modern React patterns (React 19 features, hooks-first architecture)

**Core Framework**: React 19 with TypeScript, Vite 6 build system, GitHub Spark for state management- Type safety and developer experience (TypeScript, ESLint, path aliases)

- Accessibility focus (Radix UI for ARIA compliance, WCAG contrast requirements)

**UI Layer**: Radix UI primitives via shadcn/ui, Tailwind CSS 4 for styling, Phosphor Icons, JetBrains Mono font- Maintainability (Vite for fast builds, shadcn/ui for upgradable components)

**State Management**: GitHub Spark KV storage via `useKV()` hooks for persistence, React useState for ephemeral state**Constraints**:

- Do NOT install alternative UI libraries (e.g., Material-UI, Ant Design) - use Radix

**Development Tools**: ESLint with TypeScript support, strict TypeScript configuration, path aliases for clean imports- Do NOT install alternative state libraries (e.g., Redux, Zustand) - use GitHub Spark KV

- Do NOT modify shadcn/ui components in `src/components/ui/` - compose new ones

**Rationale**: Technology choices reflect:- Do NOT bypass centralized strings or network config - follow patterns

- Modern React patterns (React 19 features, hooks-first architecture)## Development Workflow Standards

- Type safety and developer experience (TypeScript, ESLint, path aliases)

- Accessibility focus (Radix UI for ARIA compliance, WCAG contrast requirements)**File Organization**:

- Maintainability (Vite for fast builds, shadcn/ui for upgradable components)1. New text → Add to `src/config/strings.ts` first

2. Complex logic → Extract to `src/handlers/[feature]-handlers.tsx`

**Constraints**:3. Shared types → Define in `src/types/index.ts`

4. New Git commands → Add to `src/data/git-commands-data.ts` with full metadata

- Do NOT install alternative UI libraries (e.g., Material-UI, Ant Design) - use Radix5. UI components → Compose from existing `src/components/ui/` primitives

- Do NOT install alternative state libraries (e.g., Redux, Zustand) - use GitHub Spark KV

- Do NOT modify shadcn/ui components in `src/components/ui/` - compose new ones**Code Quality Gates**:

- Do NOT bypass centralized strings or network config - follow patterns- TypeScript compiler MUST pass with zero errors (strict mode enabled)

- ESLint MUST pass with zero warnings (`npm run lint`)

## Development Workflow Standards- All user-facing text MUST be in centralized config

- All API calls MUST use mock service layer

**File Organization**:- All persistent state MUST use `useKV()`

1. New text → Add to `src/config/strings.ts` first**Architecture Decisions**:

2. Complex logic → Extract to `src/handlers/[feature]-handlers.tsx`- Component too complex? → Extract handlers to `src/handlers/`

3. Shared types → Define in `src/types/index.ts`- Need new UI pattern? → Compose Radix primitives, don't create from scratch

4. New Git commands → Add to `src/data/git-commands-data.ts` with full metadata- Data persists? → Use `useKV()`, not `useState()`

5. UI components → Compose from existing `src/components/ui/` primitives- Making API call? → Add to `src/services/api.ts`, configure in `src/config/network.ts`

- Adding text? → Define in `src/config/strings.ts` first

**Code Quality Gates**:

**Reference Documentation**:

- TypeScript compiler MUST pass with zero errors (strict mode enabled)- Architecture patterns: `.github/copilot-instructions.md`

- ESLint MUST pass with zero warnings (`npm run lint`)- Project requirements: `PRD.md`

- All user-facing text MUST be in centralized config- Setup and usage: `README.md`

- All API calls MUST use mock service layer- Network simulation: `NETWORK_SIMULATION.md`

- All persistent state MUST use `useKV()`- Configuration: `src/config/README.md`

**Architecture Decisions**:## Governance

- Component too complex? → Extract handlers to `src/handlers/`This constitution supersedes all other development practices and guidelines. All code changes, feature additions, and architectural decisions MUST comply with these principles.

- Need new UI pattern? → Compose Radix primitives, don't create from scratch

- Data persists? → Use `useKV()`, not `useState()`**Amendment Process**:

- Making API call? → Add to `src/services/api.ts`, configure in `src/config/network.ts`1. Proposed changes MUST document impact on existing principles

- Adding text? → Define in `src/config/strings.ts` first2. Version bump MUST follow semantic versioning (MAJOR for incompatible changes, MINOR for additions, PATCH for clarifications)

3. All dependent templates MUST be updated before constitution amendment is finalized

**Reference Documentation**:4. Changes MUST be documented in Sync Impact Report

- Architecture patterns: `.github/copilot-instructions.md`**Compliance Verification**:

- Project requirements: `PRD.md`- Plan template includes Constitution Check section validating principles

- Setup and usage: `README.md`- Spec template requires alignment with architecture patterns

- Network simulation: `NETWORK_SIMULATION.md`- Tasks template organizes work according to component separation principles

- Configuration: `src/config/README.md`- All PRs and code reviews MUST verify constitutional compliance

## Governance**Version Control**:

- MAJOR version: Breaking architectural changes (e.g., removing handler pattern, changing state management)

This constitution supersedes all other development practices and guidelines. All code changes, feature additions, and architectural decisions MUST comply with these principles.- MINOR version: New principle added or existing principle materially expanded

- PATCH version: Clarifications, wording improvements, non-semantic refinements

**Amendment Process**:

**Justification Requirements**:

1. Proposed changes MUST document impact on existing principles- Any complexity violation MUST be justified in plan.md with explanation

2. Version bump MUST follow semantic versioning (MAJOR for incompatible changes, MINOR for additions, PATCH for clarifications)- Simpler alternatives MUST be documented as rejected with rationale

3. All dependent templates MUST be updated before constitution amendment is finalized- Technical debt introduced MUST include remediation plan

4. Changes MUST be documented in Sync Impact Report

**Runtime Development Guidance**: Use `.github/copilot-instructions.md` for AI agent development patterns and common gotchas

**Compliance Verification**:

**Version**: 1.0.0 | **Ratified**: 2025-10-28 | **Last Amended**: 2025-10-28

- Plan template includes Constitution Check section validating principles
- Spec template requires alignment with architecture patterns
- Tasks template organizes work according to component separation principles
- All PRs and code reviews MUST verify constitutional compliance

**Version Control**:

- MAJOR version: Breaking architectural changes (e.g., removing handler pattern, changing state management)
- MINOR version: New principle added or existing principle materially expanded
- PATCH version: Clarifications, wording improvements, non-semantic refinements

**Justification Requirements**:

- Any complexity violation MUST be justified in plan.md with explanation
- Simpler alternatives MUST be documented as rejected with rationale
- Technical debt introduced MUST include remediation plan

**Runtime Development Guidance**: Use `.github/copilot-instructions.md` for AI agent development patterns and common gotchas

**Version**: 1.0.0 | **Ratified**: 2025-10-28 | **Last Amended**: 2025-10-28
