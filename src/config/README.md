# String Configuration Guide

This document explains how to use the centralized string configuration system in the Git Command Terminal application.

## Overview

All user-facing text, error messages, UI labels, and other configurable string values have been extracted into a centralized configuration file at `src/config/strings.ts`. This allows for easy localization, content management, and consistent messaging across the application.

## Configuration Structure

The string configuration is organized into logical categories:

### Application Metadata

```typescript
app: {
  title: "Git Command Terminal",
  description: "Interactive Git command learning tool",
  version: "1.0.0",
}
```

### UI Elements

```typescript
ui: {
  buttons: { clear: "Clear", submit: "Submit", ... },
  labels: { name: "Name", email: "Email", ... },
  placeholders: { enterCommand: "Type a git command...", ... },
}
```

### Page Sections

```typescript
sections: {
  terminal: { title: "Interactive Terminal", ... },
  reviews: { title: "User Reviews", ... },
  testimonials: { title: "What Our Users Say", ... },
}
```

### Error Messages

```typescript
errors: {
  reviews: { title: "Failed to load reviews", ... },
  network: { title: "Network Error", ... },
  validation: { required: "This field is required", ... },
}
```

### Loading States

```typescript
loading: {
  reviews: { title: "Loading reviews...", ... },
  testimonials: { title: "Loading testimonials...", ... },
}
```

### Success Messages

```typescript
success: {
  reviewSubmitted: "Review submitted successfully!",
  themeChanged: "Switched to {themeName} theme",
}
```

## Usage Examples

### Basic String Access

```typescript
import { appStrings } from "@/config/strings";

// Simple string usage
<h1>{appStrings.app.title}</h1>
<button>{appStrings.ui.buttons.submit}</button>
```

### String Interpolation

```typescript
import { strings } from "@/config/strings";

// For messages with variables
const message = strings.buildSuccessMessage("themeChanged", {
  themeName: "Dark Theme",
});
// Result: "Switched to Dark Theme theme"
```

### Utility Functions

```typescript
import { strings } from "@/config/strings";

// Get nested string values
const errorTitle = strings.get("errors.network.title");

// Build validation errors
const error = strings.buildValidationError("name", "required");

// Get theme name
const themeName = strings.getThemeName("matrix");
```

## Adding New Strings

### 1. Add to Configuration

Add new strings to the appropriate category in `src/config/strings.ts`:

```typescript
export const appStrings = {
  // ... existing categories
  newFeature: {
    title: "New Feature Title",
    description: "Feature description",
    buttons: {
      enable: "Enable Feature",
      configure: "Configure",
    },
  },
} as const;
```

### 2. Use in Components

Import and use the new strings:

```typescript
import { appStrings } from "@/config/strings";

export function NewFeature() {
  return (
    <div>
      <h2>{appStrings.newFeature.title}</h2>
      <p>{appStrings.newFeature.description}</p>
      <button>{appStrings.newFeature.buttons.enable}</button>
    </div>
  );
}
```

## String Interpolation

For messages with dynamic content, use the interpolation helper:

```typescript
// In strings.ts
success: {
  itemsLoaded: "Loaded {count} items in {time}ms",
}

// In component
import { interpolateString, appStrings } from "@/config/strings";

const message = interpolateString(appStrings.success.itemsLoaded, {
  count: 25,
  time: 150
});
// Result: "Loaded 25 items in 150ms"
```

## Localization Support

The string configuration system is designed to support future localization:

### 1. Create Locale Files

```typescript
// src/config/strings.en.ts
export const stringsEN = { ... };

// src/config/strings.es.ts
export const stringsES = { ... };
```

### 2. Add Language Switching

```typescript
// src/config/strings.ts
import { stringsEN } from "./strings.en";
import { stringsES } from "./strings.es";

const locales = { en: stringsEN, es: stringsES };
export const appStrings = locales[currentLocale] || stringsEN;
```

## Best Practices

### 1. Categorization

- Group related strings together
- Use descriptive category names
- Maintain consistent structure

### 2. Naming Conventions

- Use camelCase for keys
- Be descriptive but concise
- Include context when needed

### 3. Interpolation

- Use `{variableName}` for placeholders
- Provide default values when possible
- Document expected variables

### 4. Consistency

- Use consistent terminology across the app
- Maintain the same tone and style
- Follow established patterns

## Migration Guide

When converting hardcoded strings:

### 1. Identify the String

```typescript
// Before
<button>Submit Review</button>
```

### 2. Add to Configuration

```typescript
// In strings.ts
ui: {
  buttons: {
    submitReview: "Submit Review",
  },
}
```

### 3. Update Component

```typescript
// After
import { appStrings } from "@/config/strings";
<button>{appStrings.ui.buttons.submitReview}</button>;
```

## Environment-Specific Strings

The configuration includes environment-specific content:

```typescript
development: {
  networkStatus: { title: "Network Status" },
  logging: { prefix: "[DEV]" },
}
```

Use these for features that should only appear in development or localhost environments.

## Type Safety

The configuration is strongly typed with TypeScript:

```typescript
export const appStrings = {
  // ... configuration
} as const;
```

This provides:

- IntelliSense autocompletion
- Compile-time error checking
- Refactoring support

## File Organization

```
src/config/
├── strings.ts          # Main configuration file
├── strings.en.ts       # English locale (future)
├── strings.es.ts       # Spanish locale (future)
└── README.md          # This documentation
```

## Related Files

The string configuration integrates with:

- `src/utils/environment.ts` - Environment detection
- `src/config/network.ts` - Network simulation strings
- All components using text content

## Testing Strings

When testing components that use strings:

```typescript
import { appStrings } from "@/config/strings";

test("displays correct title", () => {
  render(<Component />);
  expect(
    screen.getByText(appStrings.sections.reviews.title)
  ).toBeInTheDocument();
});
```

This ensures tests remain in sync with string changes.
