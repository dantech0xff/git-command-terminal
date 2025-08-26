export interface GitCommand {
  command: string;
  description: string;
  usage: string;
  examples: string[];
  relatedCommands: string[];
}

export const gitCommands: Record<string, GitCommand> = {
  'git init': {
    command: 'git init',
    description: 'Initialize a new Git repository in the current directory',
    usage: 'git init [directory]',
    examples: [
      'git init',
      'git init my-project',
      'git init --bare shared-repo.git'
    ],
    relatedCommands: ['git clone', 'git config', 'git status', 'git add']
  },
  
  'git clone': {
    command: 'git clone',
    description: 'Clone a repository from a remote source',
    usage: 'git clone <repository> [directory]',
    examples: [
      'git clone https://github.com/user/repo.git',
      'git clone git@github.com:user/repo.git my-folder',
      'git clone --depth 1 https://github.com/user/repo.git'
    ],
    relatedCommands: ['git init', 'git remote', 'git fetch', 'git pull']
  },

  'git add': {
    command: 'git add',
    description: 'Add file contents to the staging area',
    usage: 'git add <pathspec>',
    examples: [
      'git add .',
      'git add file.txt',
      'git add src/',
      'git add -A',
      'git add -p'
    ],
    relatedCommands: ['git status', 'git commit', 'git reset', 'git diff']
  },

  'git commit': {
    command: 'git commit',
    description: 'Record changes to the repository',
    usage: 'git commit [options]',
    examples: [
      'git commit -m "Add new feature"',
      'git commit -am "Fix bug and update docs"',
      'git commit --amend',
      'git commit --no-verify'
    ],
    relatedCommands: ['git add', 'git status', 'git log', 'git push']
  },

  'git status': {
    command: 'git status',
    description: 'Show the working tree status',
    usage: 'git status [options]',
    examples: [
      'git status',
      'git status -s',
      'git status --porcelain',
      'git status --ignored'
    ],
    relatedCommands: ['git add', 'git diff', 'git commit', 'git reset']
  },

  'git diff': {
    command: 'git diff',
    description: 'Show changes between commits, commit and working tree, etc',
    usage: 'git diff [options] [<commit>] [--] [<path>...]',
    examples: [
      'git diff',
      'git diff --staged',
      'git diff HEAD~1',
      'git diff main..feature-branch',
      'git diff --name-only'
    ],
    relatedCommands: ['git status', 'git add', 'git log', 'git show']
  },

  'git log': {
    command: 'git log',
    description: 'Show commit logs',
    usage: 'git log [options] [revision range] [[--] path...]',
    examples: [
      'git log',
      'git log --oneline',
      'git log --graph --all',
      'git log -p',
      'git log --since="2 weeks ago"'
    ],
    relatedCommands: ['git show', 'git diff', 'git blame', 'git reflog']
  },

  'git branch': {
    command: 'git branch',
    description: 'List, create, or delete branches',
    usage: 'git branch [options] [<pattern>]',
    examples: [
      'git branch',
      'git branch feature-login',
      'git branch -d old-feature',
      'git branch -a',
      'git branch -r'
    ],
    relatedCommands: ['git checkout', 'git switch', 'git merge', 'git push']
  },

  'git checkout': {
    command: 'git checkout',
    description: 'Switch branches or restore working tree files',
    usage: 'git checkout [options] <branch>',
    examples: [
      'git checkout main',
      'git checkout -b new-feature',
      'git checkout -- file.txt',
      'git checkout HEAD~1'
    ],
    relatedCommands: ['git switch', 'git branch', 'git merge', 'git restore']
  },

  'git switch': {
    command: 'git switch',
    description: 'Switch branches',
    usage: 'git switch [options] <branch>',
    examples: [
      'git switch main',
      'git switch -c new-feature',
      'git switch -'
    ],
    relatedCommands: ['git checkout', 'git branch', 'git merge', 'git restore']
  },

  'git merge': {
    command: 'git merge',
    description: 'Join two or more development histories together',
    usage: 'git merge [options] <commit>...',
    examples: [
      'git merge feature-branch',
      'git merge --no-ff feature-branch',
      'git merge --squash feature-branch',
      'git merge origin/main'
    ],
    relatedCommands: ['git branch', 'git checkout', 'git rebase', 'git pull']
  },

  'git push': {
    command: 'git push',
    description: 'Update remote refs along with associated objects',
    usage: 'git push [options] [<repository> [<refspec>...]]',
    examples: [
      'git push',
      'git push origin main',
      'git push -u origin feature-branch',
      'git push --force-with-lease',
      'git push --tags'
    ],
    relatedCommands: ['git pull', 'git fetch', 'git commit', 'git remote']
  },

  'git pull': {
    command: 'git pull',
    description: 'Fetch from and integrate with another repository or local branch',
    usage: 'git pull [options] [<repository> [<refspec>...]]',
    examples: [
      'git pull',
      'git pull origin main',
      'git pull --rebase',
      'git pull --no-commit'
    ],
    relatedCommands: ['git fetch', 'git merge', 'git push', 'git rebase']
  },

  'git fetch': {
    command: 'git fetch',
    description: 'Download objects and refs from another repository',
    usage: 'git fetch [options] [<repository> [<refspec>...]]',
    examples: [
      'git fetch',
      'git fetch origin',
      'git fetch --all',
      'git fetch --prune'
    ],
    relatedCommands: ['git pull', 'git merge', 'git remote', 'git branch']
  },

  'git reset': {
    command: 'git reset',
    description: 'Reset current HEAD to the specified state',
    usage: 'git reset [options] [<tree-ish>] [--] [<pathspec>...]',
    examples: [
      'git reset',
      'git reset --hard HEAD~1',
      'git reset --soft HEAD~1',
      'git reset HEAD file.txt'
    ],
    relatedCommands: ['git checkout', 'git revert', 'git add', 'git commit']
  },

  'git revert': {
    command: 'git revert',
    description: 'Revert some existing commits',
    usage: 'git revert [options] <commit-ish>...',
    examples: [
      'git revert HEAD',
      'git revert abc123',
      'git revert --no-commit HEAD~3..HEAD'
    ],
    relatedCommands: ['git reset', 'git checkout', 'git log', 'git show']
  },

  'git stash': {
    command: 'git stash',
    description: 'Stash the changes in a dirty working directory away',
    usage: 'git stash [push] [options] [--] [<pathspec>...]',
    examples: [
      'git stash',
      'git stash push -m "work in progress"',
      'git stash pop',
      'git stash list',
      'git stash drop'
    ],
    relatedCommands: ['git add', 'git commit', 'git reset', 'git checkout']
  },

  'git remote': {
    command: 'git remote',
    description: 'Manage set of tracked repositories',
    usage: 'git remote [options]',
    examples: [
      'git remote',
      'git remote -v',
      'git remote add origin https://github.com/user/repo.git',
      'git remote remove origin',
      'git remote set-url origin new-url'
    ],
    relatedCommands: ['git clone', 'git fetch', 'git push', 'git pull']
  },

  'git config': {
    command: 'git config',
    description: 'Get and set repository or global options',
    usage: 'git config [options] <name> [<value>]',
    examples: [
      'git config --global user.name "Your Name"',
      'git config --global user.email "your.email@example.com"',
      'git config --list',
      'git config core.editor vim'
    ],
    relatedCommands: ['git init', 'git commit', 'git log', 'git remote']
  },

  'git rebase': {
    command: 'git rebase',
    description: 'Reapply commits on top of another base tip',
    usage: 'git rebase [options] [<upstream> [<branch>]]',
    examples: [
      'git rebase main',
      'git rebase -i HEAD~3',
      'git rebase --continue',
      'git rebase --abort'
    ],
    relatedCommands: ['git merge', 'git cherry-pick', 'git reset', 'git log']
  },

  'git tag': {
    command: 'git tag',
    description: 'Create, list, delete or verify a tag object signed with GPG',
    usage: 'git tag [options] <tagname> [<commit>]',
    examples: [
      'git tag',
      'git tag v1.0.0',
      'git tag -a v1.0.0 -m "Release version 1.0.0"',
      'git tag -d v1.0.0'
    ],
    relatedCommands: ['git log', 'git show', 'git push', 'git checkout']
  }
};

export function parseGitCommand(input: string): string | null {
  const trimmed = input.trim().toLowerCase();
  
  // Direct match
  if (gitCommands[trimmed]) {
    return trimmed;
  }
  
  // Try to match command with additional arguments
  for (const command in gitCommands) {
    if (trimmed.startsWith(command.toLowerCase())) {
      return command;
    }
  }
  
  return null;
}

export function getCommandSuggestions(partial: string): string[] {
  const trimmed = partial.trim().toLowerCase();
  
  return Object.keys(gitCommands)
    .filter(command => command.toLowerCase().includes(trimmed))
    .slice(0, 5);
}