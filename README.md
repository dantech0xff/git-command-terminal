# 🚀 Git Command Terminal

An interactive terminal-style web application that teaches users Git commands through hands-on exploration and contextual learning. Perfect for developers who want to master Git in an authentic, engaging environment.

![Git Command Terminal Screenshot](https://github.com/user-attachments/assets/65425df2-3bdb-4dda-947c-024c16b750a0)

## ✨ Features

- **🖥️ Authentic Terminal Experience** - Real terminal feel with prompt, cursor, and scrolling output
- **📚 Interactive Learning** - Type Git commands and get comprehensive explanations with usage examples
- **🔗 Smart Suggestions** - Contextually relevant command suggestions to encourage exploration
- **📈 Command History** - Persistent history with arrow key navigation between sessions
- **⚡ Real-time Feedback** - Instant command parsing with autocomplete (Tab key)
- **🎯 Progressive Learning** - Related commands help users discover Git's interconnected workflow

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
   Navigate to `http://localhost:5000` to start learning Git commands!

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run optimize # Optimize dependencies
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
6. **Your progress is saved** automatically between sessions

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
- **Educational Content** - Improve command explanations and examples
- **Accessibility** - Help make the app more accessible to all users
- **Performance** - Optimize loading times and interactions
- **Documentation** - Improve guides and help content

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
│   └── ui/             # Radix UI component wrappers
├── lib/                # Core application logic
│   ├── git-commands.ts # Git command definitions and parsing
│   └── utils.ts        # Utility functions
├── styles/             # CSS and theme files
│   └── theme.css       # Radix color imports
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [GitHub Spark](https://github.com/github/spark) for rapid development
- UI components powered by [Radix UI](https://www.radix-ui.com/)
- Icons from [Phosphor Icons](https://phosphoricons.com/)
- Inspired by the need for better Git education tools

---

**Happy Learning!** 🎉 Master Git commands in an environment that feels like home.