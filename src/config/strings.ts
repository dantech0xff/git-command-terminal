/**
 * Application string configuration
 * Centralized location for all user-facing text, error messages, and configurable values
 */

export const appStrings = {
  // Application metadata
  app: {
    title: "Git Command Terminal",
    description: "Interactive Git command learning tool",
    version: "1.0.0",
  },

  // UI Labels and Buttons
  ui: {
    buttons: {
      clear: "Clear",
      leaveReview: "Leave Review",
      submit: "Submit",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      save: "Save",
      loadMore: "Load More",
      retry: "Retry",
      close: "Close",
    },
    labels: {
      name: "Name",
      email: "Email",
      rating: "Rating",
      comment: "Comment",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      theme: "Theme",
    },
    placeholders: {
      enterCommand: "Type a git command...",
      enterName: "Enter your name",
      enterEmail: "Enter your email",
      enterComment: "Share your experience...",
      searchCommand: "Search commands...",
    },
  },

  // Page sections and headings
  sections: {
    terminal: {
      title: "Interactive Terminal",
      subtitle: "Practice Git commands in a safe environment",
    },
    reviews: {
      title: "User Reviews",
      subtitle: "Share your experience with the community",
    },
    testimonials: {
      title: "What Our Users Say",
      subtitle: "Success stories from the community",
    },
    commandDetails: {
      title: "Command Details",
      subtitle: "Learn more about the selected command",
    },
    helpTips: {
      title: "Tips",
      subtitle: "Helpful shortcuts and features",
    },
  },

  // Help tips and instructions
  tips: {
    navigation: {
      history: "Use ↑/↓ arrows for history",
      autocomplete: "Press Tab for command autocomplete",
      autocompleteMobile: "Tab for autocomplete",
      relatedCommands: "Click related commands to explore",
      relatedCommandsMobile: "Click suggestions",
      persistence: "Your history is saved between sessions",
      persistenceMobile: "History is saved",
    },
  },

  // Terminal and command-related messages
  terminal: {
    prompt: "$",
    errors: {
      commandNotFound: "Command not found",
      tryTheseCommands: "Try one of these commands:",
      commonCommands:
        "git init, git add, git commit, git push, git pull, git status, git log, git branch",
      didYouMean: "Did you mean:",
      networkError: "Network connection failed",
      serverError: "Server error occurred",
    },
    prompts: {
      enterCommand: "Enter a git command...",
      helpText: "Type any git command to learn how to use it",
      welcomeMessage:
        "Welcome to Git Command Terminal! We support 50+ official Git commands.",
      exampleCommand: "Example: git init, git commit, git merge, git rebase",
    },
    output: {
      command: "Command",
      description: "Description",
      usage: "Usage",
      examples: "Examples",
    },
  },

  // Loading states
  loading: {
    reviews: {
      title: "Loading reviews...",
      description: "Fetching user reviews",
    },
    testimonials: {
      title: "Loading testimonials...",
      description: "Fetching user testimonials and reviews",
    },
    submitting: {
      title: "Submitting...",
      description: "Saving your review",
    },
    deleting: {
      title: "Deleting...",
      description: "Removing review",
    },
  },

  // Error states
  errors: {
    reviews: {
      title: "Failed to load reviews",
      description: "Unable to fetch reviews at this time",
      fetch: "Failed to fetch reviews",
      submit: "Failed to submit review",
      delete: "Failed to delete review",
      update: "Failed to update review",
    },
    testimonials: {
      title: "Failed to load testimonials",
      description: "Unable to fetch testimonials at this time",
      fetch: "Failed to fetch testimonials",
    },
    network: {
      title: "Network Error",
      description: "Please check your connection and try again",
      timeout: "Request timed out",
      serverError: "Server error occurred",
      unknownError: "Unknown error",
    },
    validation: {
      required: "This field is required",
      invalidEmail: "Please enter a valid email address",
      minLength: "Must be at least {min} characters",
      maxLength: "Must be no more than {max} characters",
      invalidRating: "Please select a rating",
    },
  },

  // Success messages
  success: {
    reviewSubmitted: "Review submitted successfully!",
    reviewDeleted: "Review deleted successfully!",
    reviewUpdated: "Review updated successfully!",
    themeChanged: "Switched to {themeName} theme",
    dataSaved: "Data saved successfully",
  },

  // Network simulation and development
  development: {
    networkStatus: {
      title: "Network Status",
      loading: "Loading",
      error: "Error",
      idle: "Idle",
      success: "Success",
    },
    networkDemo: {
      title: "Network Demo",
      subtitle: "Test network operations in development",
      fetchReviews: "Fetch Reviews",
      fetchTestimonials: "Fetch Testimonials",
      submitReview: "Submit Review",
      simulateError: "Simulate Error",
    },
    logging: {
      prefix: "[DEV]",
      warningPrefix: "[DEV WARNING]",
      errorPrefix: "[DEV ERROR]",
    },
  },

  // Footer content
  footer: {
    copyright: "© {year} Git Command Terminal",
    builtBy: "Built by Dan",
    tagline: "Passionate about making Git accessible to everyone",
    visitBlog: "Dan Tech Academy",
    blogUrl: "https://dantech.academy",
    madeWith: "Made with ❤️ for developers",
    version: "Version {version}",
    links: {
      github: "GitHub",
      documentation: "Documentation",
      support: "Support",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
  },

  // Form validation and feedback
  forms: {
    review: {
      title: "Leave a Review",
      subtitle: "Help others by sharing your experience",
      nameLabel: "Your Name",
      ratingLabel: "Rating",
      commentLabel: "Your Review",
      submitButton: "Submit Review",
      cancelButton: "Cancel",
      editButton: "Edit Review",
      saveButton: "Save Changes",
      deleteButton: "Delete Review",
    },
    validation: {
      nameRequired: "Please enter your name",
      ratingRequired: "Please select a rating",
      commentRequired: "Please enter a comment",
      commentMinLength: "Comment must be at least 10 characters",
      commentMaxLength: "Comment must be no more than 500 characters",
    },
  },

  // API and network operation names
  apiOperations: {
    fetchReviews: "fetchReviews",
    fetchTestimonials: "fetchTestimonials",
    submitReview: "submitReview",
    deleteReview: "deleteReview",
    updateReview: "updateReview",
  },

  // Theme configuration
  themes: {
    matrix: "Matrix Terminal",
    oceanic: "Oceanic Blue",
    sunset: "Sunset Orange",
    midnight: "Midnight Purple",
    light: "Light Terminal",
    neon: "Neon Cyberpunk",
  },

  // Default user roles and community content
  community: {
    defaultRole: "Community Member",
    roles: {
      seniorDeveloper: "Senior Developer",
      juniorDeveloper: "Junior Developer",
      student: "CS Student",
      bootcampGraduate: "Bootcamp Graduate",
      teamLead: "Team Lead",
      communityMember: "Community Member",
    },
  },

  // Date and time formatting
  dateTime: {
    formats: {
      short: "MMM DD, YYYY",
      long: "MMMM DD, YYYY at HH:mm",
      relative: "relative",
    },
    timeAgo: {
      justNow: "Just now",
      minutesAgo: "{minutes} minutes ago",
      hoursAgo: "{hours} hours ago",
      daysAgo: "{days} days ago",
      weeksAgo: "{weeks} weeks ago",
      monthsAgo: "{months} months ago",
    },
  },

  // Accessibility labels
  a11y: {
    closeDialog: "Close dialog",
    openMenu: "Open menu",
    selectTheme: "Select theme",
    starRating: "Star rating: {rating} out of 5",
    loadingSpinner: "Loading...",
    errorIcon: "Error",
    successIcon: "Success",
    warningIcon: "Warning",
    infoIcon: "Information",
  },

  // Environment-specific content
  environments: {
    development: "development",
    production: "production",
    localhost: "localhost",
  },
} as const;

// Type-safe string interpolation helper
export function interpolateString(
  template: string,
  variables: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return variables[key]?.toString() || match;
  });
}

// Convenience functions for common string operations
export const strings = {
  get: (path: string) => {
    return path.split(".").reduce((obj, key) => obj?.[key], appStrings);
  },

  interpolate: interpolateString,

  // Theme-specific getters
  getThemeName: (themeId: string) => {
    return (
      appStrings.themes[themeId as keyof typeof appStrings.themes] || themeId
    );
  },

  // Error message builders
  buildValidationError: (field: string, rule: string, ...args: any[]) => {
    const template =
      appStrings.errors.validation[
        rule as keyof typeof appStrings.errors.validation
      ];
    if (typeof template === "string" && args.length > 0) {
      return interpolateString(template, args[0]);
    }
    return template || `Validation error for ${field}`;
  },

  // Success message builders
  buildSuccessMessage: (type: string, data?: Record<string, any>) => {
    const template =
      appStrings.success[type as keyof typeof appStrings.success];
    if (typeof template === "string" && data) {
      return interpolateString(template, data);
    }
    return template || `Operation successful`;
  },
};

export default appStrings;
