# 🚀 Git Command Terminal

An interactive terminal-style web application that teaches users Git commands through hands-on exploration and contextual learning. Perfect for developers who want to master Git in an authentic, engaging environment.

![Git Command Terminal Screenshot](https://github.com/user-attachments/assets/ab4155a9-5bae-40da-8d5b-8b148b621b45)

## ✨ Features

- **🖥️ Authentic Terminal Experience** - Real terminal feel with prompt, cursor, and scrolling output
- **📚 Interactive Learning** - Type Git commands and get comprehensive explanations with usage examples
- **🔗 Smart Suggestions** - Contextually relevant command suggestions to encourage exploration
- **📈 Command History** - Persistent history with arrow key navigation between sessions
- **⚡ Real-time Feedback** - Instant command parsing with autocomplete (Tab key)
- **🎯 Progressive Learning** - Related commands help users discover Git's interconnected workflow
- **🎨 Theme Customization** - 6 beautiful themes including Matrix, Oceanic, Sunset, Midnight, Light, and Neon Cyberpunk
- **⭐ Community Reviews** - User rating and review system for community feedback
- **🗣️ Testimonials** - Curated positive reviews from users sharing their learning experiences
- **💾 Data Persistence** - All preferences, history, and reviews saved using GitHub Spark KV storage

## 🛠️ Technologies Used

### Frontend

- **React 19** with TypeScript for modern, type-safe development
- **Vite 6** for lightning-fast development and building
- **Tailwind CSS 4** for utility-first styling with excellent DX

### UI & Design

- **Radix UI** components for accessible, high-quality primitives
- **Radix Colors** for consistent, beautiful color systems
- **JetBrains Mono** font for authentic terminal typography
- **Phosphor Icons** for crisp, modern iconography
- **Framer Motion** for smooth, purposeful animations
- **Sonner** for elegant toast notifications

### Development Tools

- **ESLint** with TypeScript support for code quality
- **GitHub Spark** for state management and KV storage
- **PostCSS** with Tailwind for CSS processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dantech0xff/git-command-terminal.git
   cd git-command-terminal
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start learning Git commands!

### Available Scripts

```bash
npm run dev      # Start development server (runs on http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint for code quality
npm run optimize # Optimize Vite dependencies
npm run kill     # Kill process on port 5000 (if needed)
```

## 🎯 How to Use

1. **Start typing** any Git command in the terminal (e.g., `git init`, `git commit`, `git push`)
2. **Press Enter** to see detailed command information including:
   - Command description and purpose
   - Proper usage syntax
   - Real-world examples
   - Related commands to explore next
3. **Navigate history** using ↑/↓ arrow keys
4. **Use Tab** for command autocomplete
5. **Click related commands** to discover Git workflows
6. **Customize themes** using the theme selector in the sidebar
7. **Share your experience** by leaving a review with rating and comments
8. **Your progress is saved** automatically between sessions

### Available Themes

- **Matrix Terminal** - Classic green-on-black hacker aesthetic
- **Oceanic Blue** - Calming blue tones for extended sessions
- **Sunset Orange** - Warm orange gradients for a cozy feel
- **Midnight Purple** - Deep purple theme for night coding
- **Light Terminal** - Clean light theme for bright environments
- **Neon Cyberpunk** - Vibrant neon colors for a futuristic experience

### Example Commands to Try

- `git init` - Initialize a new repository
- `git add` - Stage changes for commit
- `git commit` - Save changes to repository
- `git push` - Upload changes to remote repository
- `git pull` - Download changes from remote repository

## 🤝 Contributing

We welcome contributions! Here's how you can help improve the Git Command Terminal:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Run the linter: `npm run lint`
5. Test your changes: `npm run dev`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to your branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Areas for Contribution

- **New Git Commands** - Add support for additional Git commands in `/src/lib/git-commands.ts`
- **UI Improvements** - Enhance the terminal interface and user experience
- **Theme Development** - Create new color themes in `/src/lib/themes.ts`
- **Educational Content** - Improve command explanations and examples
- **Accessibility** - Help make the app more accessible to all users
- **Performance** - Optimize loading times and interactions
- **Documentation** - Improve guides and help content
- **Review System** - Enhance the community feedback features in `/src/components/ReviewForm.tsx`, `/src/components/ReviewList.tsx`, and `/src/components/ReviewsSection.tsx`
- **Network Simulation** - Improve the mock API system in `/src/services/api.ts`
- **Configuration** - Enhance the string and network configuration systems in `/src/config/`
- **Event Handlers** - Improve component interaction logic in `/src/handlers/`

### Code Standards

- Use TypeScript for all new code
- Follow existing code style and patterns
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AppHeader.tsx   # Application header with theme selector
│   ├── AppFooter.tsx   # Application footer
│   ├── TerminalSection.tsx    # Main terminal container
│   ├── TerminalInput.tsx      # Command input interface
│   ├── TerminalDisplay.tsx    # Command output display
│   ├── CommandDetails.tsx     # Command information panel
│   ├── CommandSuggestions.tsx # Related command suggestions
│   ├── ReviewForm.tsx         # User review submission form
│   ├── ReviewList.tsx         # Display user reviews
│   ├── ReviewsSection.tsx     # Reviews container component
│   ├── Testimonials.tsx       # Community testimonials
│   ├── StarRating.tsx         # Star rating component
│   ├── NetworkStatus.tsx      # Network activity indicator
│   ├── NetworkDemo.tsx        # Network simulation controls (dev)
│   ├── LoadingStates.tsx      # Loading and error states
│   ├── HelpTips.tsx          # User guidance tips
│   └── ui/                   # Radix UI component wrappers (shadcn/ui)
│       ├── button.tsx        # Button components
│       ├── card.tsx          # Card components
│       ├── input.tsx         # Input components
│       ├── dialog.tsx        # Dialog components
│       ├── carousel.tsx      # Carousel for testimonials
│       ├── scroll-area.tsx   # Scroll area for terminal
│       ├── sonner.tsx        # Toast notifications
│       └── [50+ other UI components]
├── config/              # Configuration and settings
│   ├── strings.ts      # Centralized text content and labels
│   ├── network.ts      # Network simulation configuration
│   └── README.md       # Configuration system documentation
├── handlers/            # Component event handlers
│   ├── review-handlers.tsx   # Review system handlers
│   ├── terminal-handlers.tsx # Terminal interaction handlers
│   └── theme-handlers.tsx    # Theme switching handlers
├── hooks/              # Custom React hooks
│   ├── useData.ts      # Data fetching and state management
│   └── use-mobile.ts   # Mobile device detection
├── lib/                # Core application logic
│   ├── git-commands.ts # Git command definitions and parsing
│   ├── themes.ts       # Theme definitions and management
│   └── utils.ts        # Utility functions
├── services/           # External service integrations
│   └── api.ts          # API service layer with network simulation
├── styles/             # CSS and theme files
│   └── theme.css       # Radix color imports
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared type definitions
├── utils/              # Additional utility functions
│   └── environment.ts  # Environment detection utilities
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
├── ErrorFallback.tsx   # Error boundary component
├── index.css           # Global styles and custom CSS
├── main.css           # Additional styling
└── vite-end.d.ts      # Vite environment type definitions
```

### Key Architecture Features

#### Network Simulation System

The application includes a sophisticated network simulation system that prepares it for real-world deployment:

- **Mock API Layer** (`/src/services/api.ts`) - Simulates REST endpoints with realistic delays
- **Network Configuration** (`/src/config/network.ts`) - Configurable response times and error rates
- **Loading States** - Comprehensive loading and error handling throughout the UI
- **Development Tools** - Network demo widget for testing various network conditions

#### Configuration Management

- **Centralized Strings** (`/src/config/strings.ts`) - All user-facing text in one location for easy localization
- **Type-Safe Configuration** - Strongly typed configuration with IntelliSense support
- **Environment Detection** (`/src/utils/environment.ts`) - Smart environment-specific features

#### Component Architecture

- **Atomic Design** - Reusable UI components built on Radix UI primitives
- **Custom Hooks** - Dedicated hooks for data fetching and mobile detection
- **Error Boundaries** - Graceful error handling with fallback components
- **Theme System** - Dynamic theme switching with persistent preferences

See [NETWORK_SIMULATION.md](NETWORK_SIMULATION.md) and [src/config/README.md](src/config/README.md) for detailed documentation.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [GitHub Spark](https://github.com/github/spark-template) for rapid development
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Inspired by the need for better Git education tools

---

**Happy Learning!** 🎉 Master Git commands in an environment that feels like home.
