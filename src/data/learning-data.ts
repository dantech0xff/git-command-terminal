import type { LearningPath, QuizQuestion } from "@/types";

export const learningPaths: LearningPath[] = [
  {
    id: "beginner",
    title: "Git Fundamentals",
    description:
      "Start your Git journey with the essential commands every developer needs to know.",
    difficulty: "beginner",
    topics: [
      {
        id: "setup",
        title: "Setting Up Git",
        description:
          "Initialize repositories and configure your Git environment.",
        commands: ["git init", "git config", "git clone"],
        difficulty: "beginner",
        order: 1,
      },
      {
        id: "basic-workflow",
        title: "Basic Workflow",
        description:
          "Learn the core add-commit-push workflow used in every Git project.",
        commands: ["git add", "git commit", "git status", "git push"],
        difficulty: "beginner",
        order: 2,
      },
      {
        id: "viewing-history",
        title: "Viewing History",
        description:
          "Explore your project's history and understand what changed.",
        commands: ["git log", "git diff", "git show"],
        difficulty: "beginner",
        order: 3,
      },
      {
        id: "undoing-changes",
        title: "Undoing Changes",
        description:
          "Learn how to safely undo mistakes and restore previous states.",
        commands: ["git restore", "git reset", "git checkout"],
        difficulty: "beginner",
        order: 4,
      },
    ],
  },
  {
    id: "intermediate",
    title: "Branching & Collaboration",
    description:
      "Master branching strategies and collaborative workflows used in team environments.",
    difficulty: "intermediate",
    topics: [
      {
        id: "branching",
        title: "Branching Basics",
        description: "Create, switch, and manage branches for parallel development.",
        commands: ["git branch", "git switch", "git checkout"],
        difficulty: "intermediate",
        order: 1,
      },
      {
        id: "merging",
        title: "Merging & Rebasing",
        description:
          "Combine branches and maintain a clean project history.",
        commands: ["git merge", "git rebase", "git cherry-pick"],
        difficulty: "intermediate",
        order: 2,
      },
      {
        id: "remote-work",
        title: "Working with Remotes",
        description:
          "Collaborate with others through remote repositories.",
        commands: ["git remote", "git fetch", "git pull", "git push"],
        difficulty: "intermediate",
        order: 3,
      },
      {
        id: "stashing",
        title: "Stashing & Cleaning",
        description:
          "Temporarily save work and keep your working directory clean.",
        commands: ["git stash", "git clean", "git worktree"],
        difficulty: "intermediate",
        order: 4,
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Git Mastery",
    description:
      "Deep dive into advanced Git features for power users and maintainers.",
    difficulty: "advanced",
    topics: [
      {
        id: "rewriting-history",
        title: "Rewriting History",
        description:
          "Advanced techniques for modifying commit history safely.",
        commands: ["git rebase", "git reset", "git reflog", "git filter-branch"],
        difficulty: "advanced",
        order: 1,
      },
      {
        id: "debugging",
        title: "Debugging with Git",
        description:
          "Use Git's built-in tools to find bugs and understand code changes.",
        commands: ["git bisect", "git blame", "git grep"],
        difficulty: "advanced",
        order: 2,
      },
      {
        id: "submodules-subtrees",
        title: "Submodules & Subtrees",
        description:
          "Manage complex projects with nested repositories.",
        commands: ["git submodule", "git subtree"],
        difficulty: "advanced",
        order: 3,
      },
      {
        id: "plumbing",
        title: "Git Internals",
        description:
          "Understand Git's internal workings and plumbing commands.",
        commands: ["git cat-file", "git hash-object", "git rev-parse"],
        difficulty: "advanced",
        order: 4,
      },
    ],
  },
];

export const quizQuestions: QuizQuestion[] = [
  // Beginner questions
  {
    id: "q1",
    question: "Which command initializes a new Git repository?",
    options: ["git start", "git init", "git create", "git new"],
    correctAnswer: 1,
    explanation:
      "'git init' creates a new Git repository by initializing the .git directory in your project folder.",
    difficulty: "beginner",
    relatedCommand: "git init",
  },
  {
    id: "q2",
    question: "What does 'git add .' do?",
    options: [
      "Adds a new file called '.'",
      "Stages all changes in the current directory",
      "Creates a new branch",
      "Commits all changes",
    ],
    correctAnswer: 1,
    explanation:
      "'git add .' stages all modified and new files in the current directory and its subdirectories for the next commit.",
    difficulty: "beginner",
    relatedCommand: "git add",
  },
  {
    id: "q3",
    question: "Which command shows the current state of your working directory?",
    options: ["git log", "git status", "git show", "git diff"],
    correctAnswer: 1,
    explanation:
      "'git status' displays the state of the working directory and staging area, showing which changes have been staged and which haven't.",
    difficulty: "beginner",
    relatedCommand: "git status",
  },
  {
    id: "q4",
    question: "What flag is used with 'git commit' to add a message?",
    options: ["-msg", "-m", "--text", "-t"],
    correctAnswer: 1,
    explanation:
      "The '-m' flag allows you to write the commit message inline, e.g., 'git commit -m \"Your message\"'.",
    difficulty: "beginner",
    relatedCommand: "git commit",
  },
  {
    id: "q5",
    question: "Which command downloads a repository from a remote server?",
    options: ["git pull", "git fetch", "git clone", "git download"],
    correctAnswer: 2,
    explanation:
      "'git clone' creates a local copy of a remote repository, including all files, branches, and commit history.",
    difficulty: "beginner",
    relatedCommand: "git clone",
  },

  // Intermediate questions
  {
    id: "q6",
    question: "What is the difference between 'git fetch' and 'git pull'?",
    options: [
      "They are the same command",
      "'git fetch' downloads changes without merging; 'git pull' fetches and merges",
      "'git pull' is faster than 'git fetch'",
      "'git fetch' only works with GitHub",
    ],
    correctAnswer: 1,
    explanation:
      "'git fetch' downloads changes from the remote but doesn't merge them. 'git pull' is essentially 'git fetch' followed by 'git merge'.",
    difficulty: "intermediate",
    relatedCommand: "git fetch",
  },
  {
    id: "q7",
    question: "Which command is used to create a new branch?",
    options: [
      "git new-branch",
      "git branch <name>",
      "git create <name>",
      "git fork <name>",
    ],
    correctAnswer: 1,
    explanation:
      "'git branch <name>' creates a new branch. Use 'git switch <name>' or 'git checkout <name>' to switch to it.",
    difficulty: "intermediate",
    relatedCommand: "git branch",
  },
  {
    id: "q8",
    question: "What does 'git stash' do?",
    options: [
      "Permanently deletes changes",
      "Temporarily shelves changes so you can work on something else",
      "Creates a new commit",
      "Pushes changes to remote",
    ],
    correctAnswer: 1,
    explanation:
      "'git stash' temporarily saves your modified tracked files and staged changes so you can switch context. Use 'git stash pop' to restore them.",
    difficulty: "intermediate",
    relatedCommand: "git stash",
  },
  {
    id: "q9",
    question: "What happens during a merge conflict?",
    options: [
      "Git automatically chooses the best version",
      "The merge is cancelled",
      "Git marks conflicting areas for manual resolution",
      "Both versions are deleted",
    ],
    correctAnswer: 2,
    explanation:
      "When Git can't automatically merge changes, it marks the conflicting sections in the files with conflict markers (<<<, ===, >>>) for you to resolve manually.",
    difficulty: "intermediate",
    relatedCommand: "git merge",
  },
  {
    id: "q10",
    question: "What does 'git rebase' do compared to 'git merge'?",
    options: [
      "They do the same thing",
      "Rebase replays commits on top of another branch, creating a linear history",
      "Rebase is only for deleting branches",
      "Merge is faster than rebase",
    ],
    correctAnswer: 1,
    explanation:
      "'git rebase' moves or replays a sequence of commits to a new base commit, creating a cleaner, linear project history compared to merge commits.",
    difficulty: "intermediate",
    relatedCommand: "git rebase",
  },

  // Advanced questions
  {
    id: "q11",
    question: "What does 'git bisect' help you do?",
    options: [
      "Split a repository in half",
      "Find the commit that introduced a bug using binary search",
      "Create two branches from one",
      "Merge two repositories",
    ],
    correctAnswer: 1,
    explanation:
      "'git bisect' uses binary search to efficiently find the specific commit that introduced a bug by marking commits as good or bad.",
    difficulty: "advanced",
    relatedCommand: "git bisect",
  },
  {
    id: "q12",
    question: "What is 'git reflog' used for?",
    options: [
      "Viewing remote logs",
      "Recording when branch tips and HEAD were updated locally",
      "Deleting log files",
      "Filtering commits by author",
    ],
    correctAnswer: 1,
    explanation:
      "'git reflog' records updates to branch tips and HEAD, allowing you to recover lost commits and undo operations that aren't visible in 'git log'.",
    difficulty: "advanced",
    relatedCommand: "git reflog",
  },
  {
    id: "q13",
    question: "What does 'git cherry-pick' do?",
    options: [
      "Selects the best branch",
      "Applies a specific commit from one branch to another",
      "Removes unwanted commits",
      "Picks the latest commit automatically",
    ],
    correctAnswer: 1,
    explanation:
      "'git cherry-pick' applies the changes from a specific commit onto the current branch, useful for selectively applying fixes without merging entire branches.",
    difficulty: "advanced",
    relatedCommand: "git cherry-pick",
  },
  {
    id: "q14",
    question: "What does 'git blame' show you?",
    options: [
      "A list of errors in the code",
      "Who last modified each line of a file and when",
      "Merge conflict details",
      "Uncommitted changes",
    ],
    correctAnswer: 1,
    explanation:
      "'git blame' shows the author and commit information for each line in a file, helping you understand who made what changes and when.",
    difficulty: "advanced",
    relatedCommand: "git blame",
  },
  {
    id: "q15",
    question: "What is a Git submodule?",
    options: [
      "A smaller version of Git",
      "A repository embedded inside another repository",
      "A type of branch",
      "A Git plugin",
    ],
    correctAnswer: 1,
    explanation:
      "Git submodules allow you to include and track external repositories within your main repository, useful for managing dependencies or shared code.",
    difficulty: "advanced",
    relatedCommand: "git submodule",
  },
];

export function getQuizByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced"
): QuizQuestion[] {
  return quizQuestions.filter((q) => q.difficulty === difficulty);
}

export function getLearningPath(
  difficulty: "beginner" | "intermediate" | "advanced"
): LearningPath | undefined {
  return learningPaths.find((p) => p.difficulty === difficulty);
}
