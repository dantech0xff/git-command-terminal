export interface Theme {
  id: string
  name: string
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    muted: string
    mutedForeground: string
    border: string
    input: string
    ring: string
  }
}

export const themes: Theme[] = [
  {
    id: 'matrix',
    name: 'Matrix Terminal',
    colors: {
      background: 'oklch(0.15 0.02 240)',
      foreground: 'oklch(0.7 0.15 145)',
      card: 'oklch(0.18 0.02 240)',
      cardForeground: 'oklch(0.8 0.02 240)',
      popover: 'oklch(0.18 0.02 240)',
      popoverForeground: 'oklch(0.8 0.02 240)',
      primary: 'oklch(0.7 0.15 145)',
      primaryForeground: 'oklch(0.15 0.02 240)',
      secondary: 'oklch(0.25 0.02 240)',
      secondaryForeground: 'oklch(0.8 0.02 240)',
      accent: 'oklch(0.7 0.15 45)',
      accentForeground: 'oklch(0.15 0.02 240)',
      destructive: 'oklch(0.65 0.2 25)',
      destructiveForeground: 'oklch(0.15 0.02 240)',
      muted: 'oklch(0.22 0.02 240)',
      mutedForeground: 'oklch(0.6 0.02 240)',
      border: 'oklch(0.25 0.02 240)',
      input: 'oklch(0.25 0.02 240)',
      ring: 'oklch(0.7 0.15 145)'
    }
  },
  {
    id: 'oceanic',
    name: 'Oceanic Blue',
    colors: {
      background: 'oklch(0.16 0.05 220)',
      foreground: 'oklch(0.85 0.08 200)',
      card: 'oklch(0.19 0.05 220)',
      cardForeground: 'oklch(0.9 0.05 200)',
      popover: 'oklch(0.19 0.05 220)',
      popoverForeground: 'oklch(0.9 0.05 200)',
      primary: 'oklch(0.65 0.2 200)',
      primaryForeground: 'oklch(0.16 0.05 220)',
      secondary: 'oklch(0.26 0.05 220)',
      secondaryForeground: 'oklch(0.85 0.05 200)',
      accent: 'oklch(0.7 0.2 180)',
      accentForeground: 'oklch(0.16 0.05 220)',
      destructive: 'oklch(0.65 0.25 15)',
      destructiveForeground: 'oklch(0.16 0.05 220)',
      muted: 'oklch(0.24 0.05 220)',
      mutedForeground: 'oklch(0.65 0.05 200)',
      border: 'oklch(0.28 0.05 220)',
      input: 'oklch(0.28 0.05 220)',
      ring: 'oklch(0.65 0.2 200)'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    colors: {
      background: 'oklch(0.17 0.06 30)',
      foreground: 'oklch(0.9 0.08 60)',
      card: 'oklch(0.2 0.06 30)',
      cardForeground: 'oklch(0.92 0.06 60)',
      popover: 'oklch(0.2 0.06 30)',
      popoverForeground: 'oklch(0.92 0.06 60)',
      primary: 'oklch(0.7 0.2 45)',
      primaryForeground: 'oklch(0.17 0.06 30)',
      secondary: 'oklch(0.27 0.06 30)',
      secondaryForeground: 'oklch(0.9 0.06 60)',
      accent: 'oklch(0.75 0.25 75)',
      accentForeground: 'oklch(0.17 0.06 30)',
      destructive: 'oklch(0.65 0.3 25)',
      destructiveForeground: 'oklch(0.17 0.06 30)',
      muted: 'oklch(0.25 0.06 30)',
      mutedForeground: 'oklch(0.7 0.06 60)',
      border: 'oklch(0.3 0.06 30)',
      input: 'oklch(0.3 0.06 30)',
      ring: 'oklch(0.7 0.2 45)'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Purple',
    colors: {
      background: 'oklch(0.12 0.08 280)',
      foreground: 'oklch(0.88 0.1 300)',
      card: 'oklch(0.15 0.08 280)',
      cardForeground: 'oklch(0.9 0.08 300)',
      popover: 'oklch(0.15 0.08 280)',
      popoverForeground: 'oklch(0.9 0.08 300)',
      primary: 'oklch(0.68 0.2 290)',
      primaryForeground: 'oklch(0.12 0.08 280)',
      secondary: 'oklch(0.22 0.08 280)',
      secondaryForeground: 'oklch(0.88 0.08 300)',
      accent: 'oklch(0.72 0.25 320)',
      accentForeground: 'oklch(0.12 0.08 280)',
      destructive: 'oklch(0.65 0.3 15)',
      destructiveForeground: 'oklch(0.12 0.08 280)',
      muted: 'oklch(0.2 0.08 280)',
      mutedForeground: 'oklch(0.65 0.08 300)',
      border: 'oklch(0.25 0.08 280)',
      input: 'oklch(0.25 0.08 280)',
      ring: 'oklch(0.68 0.2 290)'
    }
  },
  {
    id: 'light',
    name: 'Light Terminal',
    colors: {
      background: 'oklch(0.98 0.02 90)',
      foreground: 'oklch(0.2 0.05 240)',
      card: 'oklch(1 0 0)',
      cardForeground: 'oklch(0.15 0.05 240)',
      popover: 'oklch(1 0 0)',
      popoverForeground: 'oklch(0.15 0.05 240)',
      primary: 'oklch(0.4 0.15 240)',
      primaryForeground: 'oklch(0.98 0.02 90)',
      secondary: 'oklch(0.95 0.02 90)',
      secondaryForeground: 'oklch(0.2 0.05 240)',
      accent: 'oklch(0.5 0.2 200)',
      accentForeground: 'oklch(0.98 0.02 90)',
      destructive: 'oklch(0.55 0.25 25)',
      destructiveForeground: 'oklch(0.98 0.02 90)',
      muted: 'oklch(0.94 0.02 90)',
      mutedForeground: 'oklch(0.5 0.05 240)',
      border: 'oklch(0.88 0.02 90)',
      input: 'oklch(0.88 0.02 90)',
      ring: 'oklch(0.4 0.15 240)'
    }
  },
  {
    id: 'neon',
    name: 'Neon Cyberpunk',
    colors: {
      background: 'oklch(0.08 0.03 300)',
      foreground: 'oklch(0.9 0.2 320)',
      card: 'oklch(0.12 0.03 300)',
      cardForeground: 'oklch(0.92 0.18 320)',
      popover: 'oklch(0.12 0.03 300)',
      popoverForeground: 'oklch(0.92 0.18 320)',
      primary: 'oklch(0.7 0.3 320)',
      primaryForeground: 'oklch(0.08 0.03 300)',
      secondary: 'oklch(0.18 0.03 300)',
      secondaryForeground: 'oklch(0.9 0.18 320)',
      accent: 'oklch(0.75 0.35 180)',
      accentForeground: 'oklch(0.08 0.03 300)',
      destructive: 'oklch(0.65 0.35 15)',
      destructiveForeground: 'oklch(0.08 0.03 300)',
      muted: 'oklch(0.16 0.03 300)',
      mutedForeground: 'oklch(0.7 0.15 320)',
      border: 'oklch(0.22 0.03 300)',
      input: 'oklch(0.22 0.03 300)',
      ring: 'oklch(0.7 0.3 320)'
    }
  }
]

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVariable = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    root.style.setProperty(`--${cssVariable}`, value)
  })
}

export const getCurrentTheme = (): string => {
  if (typeof window === 'undefined') return 'matrix'
  return localStorage.getItem('git-terminal-theme') || 'matrix'
}

export const setCurrentTheme = (themeId: string) => {
  if (typeof window === 'undefined') return
  localStorage.setItem('git-terminal-theme', themeId)
}