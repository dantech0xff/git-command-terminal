import { useState, useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Terminal, Copy, Star, StarHalf, User, Heart, Palette, Globe, Code } from '@phosphor-icons/react'
import { gitCommands, parseGitCommand, getCommandSuggestions, type GitCommand } from '@/lib/git-commands'
import { themes, applyTheme, getCurrentTheme, setCurrentTheme } from '@/lib/themes'
import { toast, Toaster } from 'sonner'

interface TerminalEntry {
  id: string
  type: 'command' | 'output' | 'error'
  content: string
  timestamp: number
}

interface Review {
  id: string
  name: string
  rating: number
  comment: string
  timestamp: number
}

interface Testimonial {
  id: string
  name: string
  role: string
  rating: number
  comment: string
  avatar: string
}

function App() {
  const [input, setInput] = useState('')
  const [entries, setEntries] = useKV<TerminalEntry[]>('terminal-history', [])
  const [commandHistory, setCommandHistory] = useKV<string[]>('command-history', [])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [currentCommand, setCurrentCommand] = useState<GitCommand | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [currentThemeId, setCurrentThemeId] = useState('matrix')
  
  // Review state
  const [reviews, setReviews] = useKV<Review[]>('user-reviews', [
    {
      id: 'demo-1',
      name: 'Jordan Smith',
      rating: 5,
      comment: 'This is exactly what I needed to finally understand Git! The terminal interface makes it feel like real practice.',
      timestamp: Date.now() - 86400000 * 2 // 2 days ago
    },
    {
      id: 'demo-2', 
      name: 'Taylor Johnson',
      rating: 4,
      comment: 'Great tool for learning. Would love to see more advanced Git workflows covered in the future.',
      timestamp: Date.now() - 86400000 * 5 // 5 days ago
    }
  ])
  const [reviewName, setReviewName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Base testimonials data
  const baseTestimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      role: 'Junior Developer',
      rating: 5,
      comment: 'This terminal helped me learn Git commands so much faster! The interactive approach makes it easy to understand what each command does.',
      avatar: '👩‍💻'
    },
    {
      id: '2', 
      name: 'Mike Rodriguez',
      role: 'CS Student',
      rating: 5,
      comment: 'Perfect for beginners! I went from being scared of Git to confidently using it in my projects. The command suggestions are brilliant.',
      avatar: '👨‍🎓'
    },
    {
      id: '3',
      name: 'Alex Kim',
      role: 'Bootcamp Graduate',
      rating: 4,
      comment: 'Great learning tool. The terminal interface feels authentic and the explanations are clear and concise.',
      avatar: '🧑‍💻'
    }
  ]

  // Combine testimonials with user reviews
  const allTestimonials = [
    ...baseTestimonials,
    ...reviews.map(review => ({
      id: review.id,
      name: review.name,
      role: 'Community Member',
      rating: review.rating,
      comment: review.comment,
      avatar: '👤'
    }))
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [entries])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Initialize theme from localStorage and apply theme on mount and when theme changes
  useEffect(() => {
    // Initialize theme from localStorage on mount
    const savedTheme = getCurrentTheme()
    setCurrentThemeId(savedTheme)
    
    const theme = themes.find(t => t.id === savedTheme) || themes[0]
    applyTheme(theme)
  }, [])

  useEffect(() => {
    const theme = themes.find(t => t.id === currentThemeId) || themes[0]
    applyTheme(theme)
  }, [currentThemeId])

  const handleThemeChange = (themeId: string) => {
    setCurrentThemeId(themeId)
    setCurrentTheme(themeId)
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      toast.success(`Switched to ${theme.name} theme`)
    }
  }

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

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      timestamp: Date.now()
    }

    setReviews(currentReviews => [newReview, ...currentReviews])
    setReviewName('')
    setReviewComment('')
    setReviewRating(5)
    setShowReviewForm(false)
    toast.success('Thank you for your review!')
  }

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star 
            key={i} 
            size={16} 
            weight="fill" 
            className={`${interactive ? 'cursor-pointer hover:text-accent' : ''} text-accent`}
            onClick={interactive ? () => onClick?.(i) : undefined}
          />
        )
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf 
            key={i} 
            size={16} 
            weight="fill" 
            className={`${interactive ? 'cursor-pointer hover:text-accent' : ''} text-accent`}
            onClick={interactive ? () => onClick?.(i) : undefined}
          />
        )
      } else {
        stars.push(
          <Star 
            key={i} 
            size={16} 
            weight="regular" 
            className={`${interactive ? 'cursor-pointer hover:text-accent' : ''} text-muted-foreground`}
            onClick={interactive ? () => onClick?.(i) : undefined}
          />
        )
      }
    }
    return stars
  }

  useEffect(() => {
    let newSuggestions = getCommandSuggestions(input)
    
    // Add related commands if we have a current command and no input
    if (!input.trim() && currentCommand && currentCommand.relatedCommands.length > 0) {
      newSuggestions = [...currentCommand.relatedCommands, ...newSuggestions]
    }
    
    setSuggestions(newSuggestions)
  }, [input, currentCommand])

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3 text-foreground">
          <Terminal size={24} weight="bold" />
          <h1 className="text-xl font-bold">Git Command Terminal</h1>
          <div className="ml-auto flex gap-2 items-center">
            {/* Theme Selector */}
            <div className="flex items-center gap-2">
              <Palette size={16} className="text-muted-foreground" />
              <Select value={currentThemeId} onValueChange={handleThemeChange}>
                <SelectTrigger className="w-40 h-8 text-xs theme-selector">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme.id} value={theme.id} className="text-xs">
                      {theme.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={clearTerminal}
              className="text-xs hover:text-foreground"
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
                {suggestions.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <span>{input.trim() ? 'Suggestions' : 'Related Commands'}: </span>
                    {suggestions.slice(0, 5).map((suggestion, index) => (
                      <span key={suggestion}>
                        <button
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-accent hover:text-accent-foreground underline suggestion-link"
                        >
                          {suggestion}
                        </button>
                        {index < Math.min(4, suggestions.length - 1) && ', '}
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
                              className="h-6 w-6 p-0 copy-button"
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

        {/* Testimonials Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">What Users Say</h2>
            <p className="text-muted-foreground">Hear from developers who improved their Git skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {allTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-card border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <div className="font-medium text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {renderStars(testimonial.rating)}
                </div>
                
                <p className="text-sm text-card-foreground leading-relaxed">
                  "{testimonial.comment}"
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">User Reviews</h2>
              <p className="text-muted-foreground">Share your experience with the community</p>
            </div>
            <Button 
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="flex items-center gap-2"
            >
              <Heart size={16} />
              Leave Review
            </Button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <Card className="bg-card border border-border p-6 mb-6">
              <h3 className="font-medium text-foreground mb-4">Share Your Review</h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Name
                  </label>
                  <Input
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-background"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Rating
                  </label>
                  <div className="flex items-center gap-1">
                    {renderStars(reviewRating, true, setReviewRating)}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {reviewRating} star{reviewRating !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Review
                  </label>
                  <Textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Tell us about your experience with Git Command Terminal..."
                    className="bg-background min-h-[100px]"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Submit Review</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowReviewForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Display Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="bg-card border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{review.name}</div>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(review.timestamp).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-sm text-card-foreground leading-relaxed">
                  {review.comment}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 border-t border-border pt-8 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <Code size={16} className="text-primary" />
              </div>
              <div className="text-center md:text-left">
                <div className="font-medium text-foreground">Built by Dan</div>
                <div className="text-sm text-muted-foreground">Passionate about making Git accessible to everyone</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://dantech.academy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Globe size={16} />
                Visit My Blog
              </a>
              <div className="text-xs text-muted-foreground">
                © 2024 Git Command Terminal
              </div>
            </div>
          </div>
        </footer>
      </div>
      <Toaster 
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--popover)',
            color: 'var(--popover-foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </div>
  )
}

export default App