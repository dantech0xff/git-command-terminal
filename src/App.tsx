import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Terminal, Copy } from '@phosphor-icons/react'
import { gitCommands, parseGitCommand, getCommandSuggestions, type GitCommand } from '@/lib/git-commands'

interface TerminalEntry {
  id: string
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: number
}

function App() {
  const [input, setInput] = useState('')
  const [entries, setEntries] = useKV<TerminalEntry[]>('terminal-history', [])
  const [commandHistory, setCommandHistory] = useKV<string[]>('command-history', [])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentCommand, setCurrentCommand] = useState<GitCommand | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const addEntry = (type: TerminalEntry['type'], content: string) => {
    const newEntry: TerminalEntry = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: Date.now()
    }
    setEntries(currentEntries => [...currentEntries, newEntry])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add command to history
    addEntry('command', `$ ${input}`)
    setCommandHistory(currentHistory => [...currentHistory, input])
    setHistoryIndex(-1)

    // Parse and process command
    const command = parseGitCommand(input)
    
    if (command && gitCommands[command]) {
      const gitCmd = gitCommands[command]
      setCurrentCommand(gitCmd)
      
      // Add command output
      addEntry('output', `Command: ${gitCmd.command}`)
      addEntry('output', `Description: ${gitCmd.description}`)
      addEntry('output', `Usage: ${gitCmd.usage}`)
      
      if (gitCmd.examples.length > 0) {
        addEntry('output', 'Examples:')
        gitCmd.examples.forEach(example => {
          addEntry('output', `  ${example}`)
        })
      }
    } else {
      setCurrentCommand(null)
      addEntry('error', `Command not found: ${input}`)
      addEntry('error', 'Try one of these common Git commands:')
      addEntry('error', '  git init, git add, git commit, git push, git pull')
      
      // Show suggestions for partial matches
      const suggestions = getCommandSuggestions(input)
      if (suggestions.length > 0) {
        addEntry('error', 'Did you mean:')
        suggestions.forEach(suggestion => {
          addEntry('error', `  ${suggestion}`)
        })
      }
    }

    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex] || '')
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const suggestions = getCommandSuggestions(input)
      if (suggestions.length > 0) {
        setInput(suggestions[0])
      }
    }
  }

  const handleSuggestionClick = (command: string) => {
    setInput(command)
    inputRef.current?.focus()
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const clearTerminal = () => {
    setEntries([])
    setCurrentCommand(null)
  }

  useEffect(() => {
    setSuggestions(getCommandSuggestions(input))
  }, [input])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 text-foreground">
          <Terminal size={24} weight="bold" />
          <h1 className="text-xl font-bold">Git Command Terminal</h1>
          <div className="ml-auto flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearTerminal}
              className="text-xs"
            >
              Clear
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Terminal */}
          <div className="lg:col-span-2">
            <Card className="bg-card border border-border">
              <div className="p-4 space-y-4">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-destructive"></div>
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                  </div>
                  <span>Git Learning Terminal</span>
                </div>

                {/* Terminal Output */}
                <ScrollArea className="h-96">
                  <div ref={scrollRef} className="space-y-1 text-sm font-mono">
                    {entries.length === 0 && (
                      <div className="text-muted-foreground">
                        <p>Welcome to Git Command Terminal!</p>
                        <p>Type a git command to learn how to use it.</p>
                        <p>Example: git init</p>
                      </div>
                    )}
                    
                    {entries.map((entry) => (
                      <div
                        key={entry.id}
                        className={`${
                          entry.type === 'command'
                            ? 'text-primary font-medium'
                            : entry.type === 'error'
                            ? 'text-destructive'
                            : 'text-card-foreground'
                        }`}
                      >
                        {entry.content}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Command Input */}
                <form onSubmit={handleSubmit} className="flex items-center gap-2">
                  <span className="text-primary font-mono">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none outline-none text-foreground font-mono text-sm placeholder:text-muted-foreground"
                    placeholder="Enter git command..."
                    autoComplete="off"
                  />
                  <span className="text-primary font-mono terminal-cursor">|</span>
                </form>

                {/* Live Suggestions */}
                {input.trim() && suggestions.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span>Suggestions: </span>
                    {suggestions.slice(0, 3).map((suggestion, index) => (
                      <span key={suggestion}>
                        <button
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-accent hover:text-accent-foreground underline"
                        >
                          {suggestion}
                        </button>
                        {index < Math.min(2, suggestions.length - 1) && ', '}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Current Command Details */}
            {currentCommand && (
              <Card className="bg-card border border-border p-4">
                <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                  <Terminal size={16} />
                  Command Details
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-primary font-mono font-medium mb-1">
                      {currentCommand.command}
                    </div>
                    <div className="text-card-foreground">
                      {currentCommand.description}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground font-medium mb-1">Usage:</div>
                    <code className="text-xs bg-muted text-muted-foreground p-2 rounded block">
                      {currentCommand.usage}
                    </code>
                  </div>

                  {currentCommand.examples.length > 0 && (
                    <div>
                      <div className="text-muted-foreground font-medium mb-2">Examples:</div>
                      <div className="space-y-1">
                        {currentCommand.examples.map((example, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <code className="text-xs bg-muted text-muted-foreground p-1 rounded flex-1">
                              {example}
                            </code>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(example)}
                              className="h-6 w-6 p-0"
                            >
                              <Copy size={12} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Related Commands */}
            {currentCommand && currentCommand.relatedCommands.length > 0 && (
              <Card className="bg-card border border-border p-4">
                <h3 className="font-medium text-foreground mb-3">Related Commands</h3>
                <div className="space-y-2">
                  {currentCommand.relatedCommands.map((command) => (
                    <Button
                      key={command}
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick(command)}
                      className="w-full justify-start text-xs font-mono h-8"
                    >
                      {command}
                    </Button>
                  ))}
                </div>
              </Card>
            )}

            {/* Quick Commands */}
            <Card className="bg-card border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Quick Start</h3>
              <div className="space-y-2">
                {['git init', 'git status', 'git add', 'git commit', 'git push'].map((command) => (
                  <Button
                    key={command}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSuggestionClick(command)}
                    className="w-full justify-start text-xs font-mono h-8"
                  >
                    {command}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Help */}
            <Card className="bg-card border border-border p-4">
              <h3 className="font-medium text-foreground mb-3">Tips</h3>
              <div className="text-xs text-muted-foreground space-y-2">
                <p>• Use ↑/↓ arrows to navigate command history</p>
                <p>• Press Tab for command autocomplete</p>
                <p>• Click related commands to explore</p>
                <p>• Your history is saved between sessions</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App