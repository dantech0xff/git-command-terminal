# Git Command Learning Terminal

An interactive terminal-style web application that teaches users Git commands through hands-on exploration and contextual learning.

**Experience Qualities**:
1. **Authentic** - Feels like using a real terminal with proper syntax highlighting and command history
2. **Educational** - Provides clear, actionable explanations that build understanding progressively  
3. **Discoverable** - Suggests related commands to encourage exploration and deeper learning

**Complexity Level**: Light Application (multiple features with basic state)
- Interactive command input with real-time feedback and command history persistence between sessions

## Essential Features

**Command Input & Processing**
- Functionality: Accept Git commands and display comprehensive usage instructions
- Purpose: Core learning mechanism for understanding Git syntax and options
- Trigger: User types a Git command and presses Enter
- Progression: Type command → Parse input → Display explanation → Show related commands → Select next command
- Success criteria: Accurate command parsing with helpful error messages for invalid syntax

**Related Command Suggestions**
- Functionality: Display contextually relevant Git commands after each query
- Purpose: Encourage exploration and teach command relationships
- Trigger: After displaying any command explanation
- Progression: Show explanation → Display 3-5 related commands → User clicks suggestion → Load new command
- Success criteria: Suggestions are contextually relevant and lead to logical learning progression

**Command History**
- Functionality: Maintain persistent history of entered commands with navigation
- Purpose: Allow users to revisit and reference previous commands
- Trigger: Up/down arrow keys or history display
- Progression: Navigate history → Select previous command → Re-execute or modify
- Success criteria: History persists between sessions and supports keyboard navigation

**Terminal Interface**
- Functionality: Authentic terminal appearance with prompt, cursor, and scrolling output
- Purpose: Create familiar environment for developers learning Git
- Trigger: App loads with terminal-ready state
- Progression: Display prompt → Accept input → Show output → Continue interaction
- Success criteria: Feels like real terminal with proper keyboard shortcuts and visual feedback

## Edge Case Handling

- **Invalid Commands**: Display helpful error messages with suggested corrections
- **Partial Commands**: Offer autocomplete suggestions for incomplete Git commands  
- **Empty Input**: Show help text with common starting commands
- **Long Output**: Implement proper scrolling with command history preservation
- **Mobile Usage**: Adapt terminal interface for touch input with virtual keyboard support

## Design Direction

The design should evoke the focused, technical atmosphere of a developer's terminal environment while remaining approachable for learners - think VS Code's integrated terminal with enhanced educational features.

## Color Selection

Complementary (opposite colors) - Using classic terminal green on dark background with orange accents for interactivity and warmth.

- **Primary Color**: Terminal Green (`oklch(0.7 0.15 145)`) - Communicates authenticity and technical proficiency
- **Secondary Colors**: Dark Terminal Background (`oklch(0.15 0.02 240)`) for immersion, Light Gray (`oklch(0.8 0.02 240)`) for secondary text
- **Accent Color**: Warm Orange (`oklch(0.7 0.15 45)`) - Highlights interactive elements and calls attention to learning opportunities
- **Foreground/Background Pairings**: 
  - Background (`oklch(0.15 0.02 240)`): Terminal Green text (`oklch(0.7 0.15 145)`) - Ratio 5.2:1 ✓
  - Card (`oklch(0.18 0.02 240)`): Light Gray text (`oklch(0.8 0.02 240)`) - Ratio 5.8:1 ✓  
  - Primary (`oklch(0.7 0.15 145)`): Dark text (`oklch(0.15 0.02 240)`) - Ratio 5.2:1 ✓
  - Accent (`oklch(0.7 0.15 45)`): Dark text (`oklch(0.15 0.02 240)`) - Ratio 5.1:1 ✓

## Font Selection

Monospace typography that emphasizes code readability and terminal authenticity while maintaining excellent legibility for educational content.

- **Typographic Hierarchy**: 
  - H1 (App Title): JetBrains Mono Bold/24px/tight letter spacing
  - Terminal Prompt: JetBrains Mono Regular/16px/normal spacing  
  - Command Output: JetBrains Mono Regular/14px/relaxed line height
  - Suggestions: JetBrains Mono Medium/14px/normal spacing

## Animations

Subtle typing animations and smooth transitions that enhance the terminal experience without overwhelming the educational content.

- **Purposeful Meaning**: Cursor blinking and text appearing reinforces the authentic terminal feeling while drawing attention to new content
- **Hierarchy of Movement**: Command input gets immediate feedback, output appears with gentle fade-in, suggestions slide in smoothly

## Component Selection

- **Components**: Custom terminal interface built with shadcn Card and Input components, Button for command suggestions, ScrollArea for output history
- **Customizations**: Terminal-styled input with custom prompt prefix, syntax-highlighted output display, command suggestion chips
- **States**: Input focused/blurred, command processing/complete, suggestion hover/selected, history navigation active
- **Icon Selection**: Terminal icon for app header, ArrowUp/ArrowDown for history, Copy for command examples, ExternalLink for documentation
- **Spacing**: Consistent 4px terminal line spacing, 8px between command blocks, 16px section padding
- **Mobile**: Responsive terminal with touch-friendly command suggestions, virtual keyboard optimization, swipe gestures for history