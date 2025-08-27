export interface GitCommand {
  command: string;
  description: string;
  usage: string;
  examples: string[];
  relatedCommands: string[];
  category: "main" | "ancillary" | "plumbing" | "interaction" | "guides";
}

export const gitCommands: Record<string, GitCommand> = {
  // Main porcelain commands
  "git add": {
    command: "git add",
    description: "Add file contents to the index",
    usage: "git add <pathspec>",
    examples: [
      "git add .",
      "git add file.txt",
      "git add src/",
      "git add -A",
      "git add -p",
    ],
    relatedCommands: ["git status", "git commit", "git reset", "git diff"],
    category: "main",
  },

  "git am": {
    command: "git am",
    description: "Apply a series of patches from a mailbox",
    usage: "git am [options] [<mbox>|<Maildir>...]",
    examples: [
      "git am patch.mbox",
      "git am --3way patches/*.patch",
      "git am --continue",
      "git am --abort",
    ],
    relatedCommands: ["git apply", "git format-patch", "git send-email"],
    category: "main",
  },

  "git archive": {
    command: "git archive",
    description: "Create an archive of files from a named tree",
    usage:
      "git archive [--format=<fmt>] [--list] [--prefix=<prefix>/] [<extra>] [-o <file> | --output=<file>] [--worktree-attributes] [--remote=<repo> [--exec=<git-upload-archive>]] <tree-ish> [<path>...]",
    examples: [
      "git archive --format=zip HEAD > archive.zip",
      "git archive --format=tar HEAD | gzip > archive.tar.gz",
      "git archive --prefix=project/ HEAD",
    ],
    relatedCommands: ["git bundle", "git log"],
    category: "main",
  },

  "git backfill": {
    command: "git backfill",
    description: "Download missing objects in a partial clone",
    usage: "git backfill [--batch-size=<n>] [<tree-ish>...]",
    examples: [
      "git backfill",
      "git backfill HEAD~10..HEAD",
      "git backfill --batch-size=100",
    ],
    relatedCommands: ["git clone", "git fetch"],
    category: "main",
  },

  "git bisect": {
    command: "git bisect",
    description: "Use binary search to find the commit that introduced a bug",
    usage: "git bisect <subcommand> <options>",
    examples: [
      "git bisect start",
      "git bisect bad",
      "git bisect good v1.2.6",
      "git bisect reset",
    ],
    relatedCommands: ["git log", "git blame", "git grep"],
    category: "main",
  },

  "git branch": {
    command: "git branch",
    description: "List, create, or delete branches",
    usage: "git branch [options] [<pattern>]",
    examples: [
      "git branch",
      "git branch feature-login",
      "git branch -d old-feature",
      "git branch -a",
      "git branch -r",
    ],
    relatedCommands: ["git checkout", "git switch", "git merge", "git push"],
    category: "main",
  },

  "git bundle": {
    command: "git bundle",
    description: "Move objects and refs by archive",
    usage:
      "git bundle create [-q | --quiet | --progress | --all-progress] [--all-progress-implied] [--version=<version>] <file> <git-rev-list-args>",
    examples: [
      "git bundle create repo.bundle HEAD master",
      "git bundle create repo.bundle --all",
      "git bundle verify repo.bundle",
    ],
    relatedCommands: ["git archive", "git clone", "git fetch"],
    category: "main",
  },

  "git checkout": {
    command: "git checkout",
    description: "Switch branches or restore working tree files",
    usage: "git checkout [options] <branch>",
    examples: [
      "git checkout main",
      "git checkout -b new-feature",
      "git checkout -- file.txt",
      "git checkout HEAD~1",
    ],
    relatedCommands: ["git switch", "git branch", "git merge", "git restore"],
    category: "main",
  },

  "git cherry-pick": {
    command: "git cherry-pick",
    description: "Apply the changes introduced by some existing commits",
    usage:
      "git cherry-pick [--edit] [-n] [-m parent-number] [-s] [-x] [--ff] [-S[<keyid>]] <commit>...",
    examples: [
      "git cherry-pick abc123",
      "git cherry-pick --no-commit abc123",
      "git cherry-pick -x abc123..def456",
    ],
    relatedCommands: ["git revert", "git rebase", "git merge"],
    category: "main",
  },

  "git citool": {
    command: "git citool",
    description: "Graphical alternative to git-commit",
    usage: "git citool",
    examples: ["git citool"],
    relatedCommands: ["git commit", "git gui", "git add"],
    category: "main",
  },

  "git clean": {
    command: "git clean",
    description: "Remove untracked files from the working tree",
    usage:
      "git clean [-d] [-f] [-i] [-n] [-q] [-e <pattern>] [-x | -X] [--] <path>...",
    examples: ["git clean -f", "git clean -fd", "git clean -n", "git clean -i"],
    relatedCommands: ["git status", "git reset", "git rm"],
    category: "main",
  },

  "git clone": {
    command: "git clone",
    description: "Clone a repository into a new directory",
    usage: "git clone <repository> [directory]",
    examples: [
      "git clone https://github.com/user/repo.git",
      "git clone git@github.com:user/repo.git my-folder",
      "git clone --depth 1 https://github.com/user/repo.git",
    ],
    relatedCommands: ["git init", "git remote", "git fetch", "git pull"],
    category: "main",
  },

  "git commit": {
    command: "git commit",
    description: "Record changes to the repository",
    usage: "git commit [options]",
    examples: [
      'git commit -m "Add new feature"',
      'git commit -am "Fix bug and update docs"',
      "git commit --amend",
      "git commit --no-verify",
    ],
    relatedCommands: ["git add", "git status", "git log", "git push"],
    category: "main",
  },

  "git describe": {
    command: "git describe",
    description:
      "Give an object a human readable name based on an available ref",
    usage:
      "git describe [--all] [--tags] [--contains] [--abbrev=<n>] [<commit-ish>...]",
    examples: [
      "git describe",
      "git describe --tags",
      "git describe --all",
      "git describe HEAD~4",
    ],
    relatedCommands: ["git tag", "git log", "git name-rev"],
    category: "main",
  },

  "git diff": {
    command: "git diff",
    description: "Show changes between commits, commit and working tree, etc",
    usage: "git diff [options] [<commit>] [--] [<path>...]",
    examples: [
      "git diff",
      "git diff --staged",
      "git diff HEAD~1",
      "git diff main..feature-branch",
      "git diff --name-only",
    ],
    relatedCommands: ["git status", "git add", "git log", "git show"],
    category: "main",
  },

  "git fetch": {
    command: "git fetch",
    description: "Download objects and refs from another repository",
    usage: "git fetch [options] [<repository> [<refspec>...]]",
    examples: [
      "git fetch",
      "git fetch origin",
      "git fetch --all",
      "git fetch --prune",
    ],
    relatedCommands: ["git pull", "git merge", "git remote", "git branch"],
    category: "main",
  },

  "git format-patch": {
    command: "git format-patch",
    description: "Prepare patches for e-mail submission",
    usage: "git format-patch [options] [<since> | <revision range>]",
    examples: [
      "git format-patch -1",
      "git format-patch HEAD~3",
      "git format-patch --cover-letter HEAD~3",
      "git format-patch origin/master",
    ],
    relatedCommands: ["git am", "git send-email", "git apply"],
    category: "main",
  },

  "git gc": {
    command: "git gc",
    description: "Cleanup unnecessary files and optimize the local repository",
    usage:
      "git gc [--aggressive] [--auto] [--quiet] [--prune=<date>] [--no-prune] [--force] [--keep-largest-pack]",
    examples: ["git gc", "git gc --aggressive", "git gc --prune=now"],
    relatedCommands: ["git repack", "git prune", "git reflog"],
    category: "main",
  },

  "git grep": {
    command: "git grep",
    description: "Print lines matching a pattern",
    usage:
      "git grep [--cached] [--no-index] [--untracked] [-a | --text] [-i | --ignore-case] [--recurse-submodules] [--textconv] [-w | --word-regexp] [-v | --invert-match] [-h|-H] [--full-name] [-E | --extended-regexp] [-G | --basic-regexp] [-P | --perl-regexp] [-F | --fixed-strings] [-n | --line-number] [--column] [-l | --files-with-matches] [-L | --files-without-match] [(-O | --open-files-in-pager) [<pager>]] [-z | --null] [ -o | --only-matching] [-c | --count] [--all-match] [-q | --quiet] [--max-depth <depth>] [--[no-]recursive] [--color[=<when>] | --no-color] [--break] [--heading] [-p | --show-function] [-A <post-context>] [-B <pre-context>] [-C <context>] [-W | --function-context] [--threads <num>] [-f <file>] [-e] <pattern> [--and|--or|--not|(|)|-e <pattern>...] [--recurse-submodules] [--parent-basename <basename>] [ [--[no-]exclude-standard] [--cached | --no-index | --untracked] | <tree>...] [--] [<pathspec>...]",
    examples: [
      'git grep "TODO"',
      'git grep -n "function"',
      'git grep --cached "import"',
    ],
    relatedCommands: ["git log", "git blame", "git show"],
    category: "main",
  },

  "git gui": {
    command: "git gui",
    description: "A portable graphical interface to Git",
    usage: "git gui [<command>] [arguments]",
    examples: ["git gui", "git gui blame filename"],
    relatedCommands: ["git citool", "gitk", "git add"],
    category: "main",
  },

  "git init": {
    command: "git init",
    description:
      "Create an empty Git repository or reinitialize an existing one",
    usage: "git init [directory]",
    examples: [
      "git init",
      "git init my-project",
      "git init --bare shared-repo.git",
    ],
    relatedCommands: ["git clone", "git config", "git status", "git add"],
    category: "main",
  },

  "git log": {
    command: "git log",
    description: "Show commit logs",
    usage: "git log [options] [revision range] [[--] path...]",
    examples: [
      "git log",
      "git log --oneline",
      "git log --graph --all",
      "git log -p",
      'git log --since="2 weeks ago"',
    ],
    relatedCommands: ["git show", "git diff", "git blame", "git reflog"],
    category: "main",
  },

  "git maintenance": {
    command: "git maintenance",
    description: "Run tasks to optimize Git repository data",
    usage: "git maintenance <subcommand> [options]",
    examples: [
      "git maintenance run",
      "git maintenance start",
      "git maintenance stop",
    ],
    relatedCommands: ["git gc", "git repack", "git commit-graph"],
    category: "main",
  },

  "git merge": {
    command: "git merge",
    description: "Join two or more development histories together",
    usage: "git merge [options] <commit>...",
    examples: [
      "git merge feature-branch",
      "git merge --no-ff feature-branch",
      "git merge --squash feature-branch",
      "git merge origin/main",
    ],
    relatedCommands: ["git branch", "git checkout", "git rebase", "git pull"],
    category: "main",
  },

  "git mv": {
    command: "git mv",
    description: "Move or rename a file, a directory, or a symlink",
    usage: "git mv <source> <destination>",
    examples: [
      "git mv old-name.txt new-name.txt",
      "git mv src/ source/",
      "git mv file.txt subdir/",
    ],
    relatedCommands: ["git rm", "git add", "git status"],
    category: "main",
  },

  "git notes": {
    command: "git notes",
    description: "Add or inspect object notes",
    usage: "git notes [list [<object>]]",
    examples: [
      'git notes add -m "Note content" HEAD',
      "git notes list",
      "git notes show HEAD",
    ],
    relatedCommands: ["git log", "git show", "git commit"],
    category: "main",
  },

  "git pull": {
    command: "git pull",
    description:
      "Fetch from and integrate with another repository or a local branch",
    usage: "git pull [options] [<repository> [<refspec>...]]",
    examples: [
      "git pull",
      "git pull origin main",
      "git pull --rebase",
      "git pull --no-commit",
    ],
    relatedCommands: ["git fetch", "git merge", "git push", "git rebase"],
    category: "main",
  },

  "git push": {
    command: "git push",
    description: "Update remote refs along with associated objects",
    usage: "git push [options] [<repository> [<refspec>...]]",
    examples: [
      "git push",
      "git push origin main",
      "git push -u origin feature-branch",
      "git push --force-with-lease",
      "git push --tags",
    ],
    relatedCommands: ["git pull", "git fetch", "git commit", "git remote"],
    category: "main",
  },

  "git range-diff": {
    command: "git range-diff",
    description: "Compare two commit ranges (e.g. two versions of a branch)",
    usage:
      "git range-diff [--color=[<when>]] [--no-color] [<diff-options>] [--no-dual-color] [--creation-factor=<factor>] [--left-only | --right-only] ( <range1> <range2> | <rev1>...<rev2> | <base> <rev1> <rev2> )",
    examples: [
      "git range-diff origin/master..master origin/master..feature",
      "git range-diff HEAD~3 HEAD~1 HEAD",
    ],
    relatedCommands: ["git diff", "git log", "git rebase"],
    category: "main",
  },

  "git rebase": {
    command: "git rebase",
    description: "Reapply commits on top of another base tip",
    usage: "git rebase [options] [<upstream> [<branch>]]",
    examples: [
      "git rebase main",
      "git rebase -i HEAD~3",
      "git rebase --continue",
      "git rebase --abort",
    ],
    relatedCommands: ["git merge", "git cherry-pick", "git reset", "git log"],
    category: "main",
  },

  "git reset": {
    command: "git reset",
    description: "Reset current HEAD to the specified state",
    usage: "git reset [options] [<tree-ish>] [--] [<pathspec>...]",
    examples: [
      "git reset",
      "git reset --hard HEAD~1",
      "git reset --soft HEAD~1",
      "git reset HEAD file.txt",
    ],
    relatedCommands: ["git checkout", "git revert", "git add", "git commit"],
    category: "main",
  },

  "git restore": {
    command: "git restore",
    description: "Restore working tree files",
    usage:
      "git restore [<options>] [--source=<tree>] [--staged] [--worktree] [--] <pathspec>...",
    examples: [
      "git restore file.txt",
      "git restore --staged file.txt",
      "git restore --source=HEAD~1 file.txt",
    ],
    relatedCommands: ["git checkout", "git reset", "git revert"],
    category: "main",
  },

  "git revert": {
    command: "git revert",
    description: "Revert some existing commits",
    usage: "git revert [options] <commit-ish>...",
    examples: [
      "git revert HEAD",
      "git revert abc123",
      "git revert --no-commit HEAD~3..HEAD",
    ],
    relatedCommands: ["git reset", "git checkout", "git log", "git show"],
    category: "main",
  },

  "git rm": {
    command: "git rm",
    description: "Remove files from the working tree and from the index",
    usage: "git rm [options] [--] <file>...",
    examples: [
      "git rm file.txt",
      "git rm --cached file.txt",
      "git rm -r directory/",
      "git rm *.log",
    ],
    relatedCommands: ["git mv", "git add", "git status", "git clean"],
    category: "main",
  },

  "git shortlog": {
    command: "git shortlog",
    description: "Summarize git log output",
    usage: "git shortlog [<options>] [<revision range>] [[--] <path>...]",
    examples: [
      "git shortlog",
      "git shortlog -s -n",
      'git shortlog --since="1 month ago"',
    ],
    relatedCommands: ["git log", "git blame", "git show"],
    category: "main",
  },

  "git show": {
    command: "git show",
    description: "Show various types of objects",
    usage: "git show [options] <object>...",
    examples: [
      "git show",
      "git show HEAD",
      "git show v1.0",
      "git show --stat HEAD",
    ],
    relatedCommands: ["git log", "git diff", "git cat-file"],
    category: "main",
  },

  "git sparse-checkout": {
    command: "git sparse-checkout",
    description: "Reduce your working tree to a subset of tracked files",
    usage: "git sparse-checkout <subcommand> [options]",
    examples: [
      "git sparse-checkout init",
      "git sparse-checkout set docs src",
      "git sparse-checkout disable",
    ],
    relatedCommands: ["git checkout", "git clone", "git config"],
    category: "main",
  },

  "git stash": {
    command: "git stash",
    description: "Stash the changes in a dirty working directory away",
    usage: "git stash [push] [options] [--] [<pathspec>...]",
    examples: [
      "git stash",
      'git stash push -m "work in progress"',
      "git stash pop",
      "git stash list",
      "git stash drop",
    ],
    relatedCommands: ["git add", "git commit", "git reset", "git checkout"],
    category: "main",
  },

  "git status": {
    command: "git status",
    description: "Show the working tree status",
    usage: "git status [options]",
    examples: [
      "git status",
      "git status -s",
      "git status --porcelain",
      "git status --ignored",
    ],
    relatedCommands: ["git add", "git diff", "git commit", "git reset"],
    category: "main",
  },

  "git submodule": {
    command: "git submodule",
    description: "Initialize, update or inspect submodules",
    usage: "git submodule [--quiet] [--cached] [<command>] [<options>]",
    examples: [
      "git submodule add https://github.com/user/repo.git path",
      "git submodule init",
      "git submodule update",
      "git submodule status",
    ],
    relatedCommands: ["git clone", "git pull", "git fetch"],
    category: "main",
  },

  "git switch": {
    command: "git switch",
    description: "Switch branches",
    usage: "git switch [options] <branch>",
    examples: ["git switch main", "git switch -c new-feature", "git switch -"],
    relatedCommands: ["git checkout", "git branch", "git merge", "git restore"],
    category: "main",
  },

  "git tag": {
    command: "git tag",
    description: "Create, list, delete or verify a tag object signed with GPG",
    usage: "git tag [options] <tagname> [<commit>]",
    examples: [
      "git tag",
      "git tag v1.0.0",
      'git tag -a v1.0.0 -m "Release version 1.0.0"',
      "git tag -d v1.0.0",
    ],
    relatedCommands: ["git log", "git show", "git push", "git checkout"],
    category: "main",
  },

  "git worktree": {
    command: "git worktree",
    description: "Manage multiple working trees",
    usage: "git worktree <command> [<options>]",
    examples: [
      "git worktree add ../feature-branch",
      "git worktree list",
      "git worktree remove ../feature-branch",
    ],
    relatedCommands: ["git branch", "git checkout", "git clone"],
    category: "main",
  },

  gitk: {
    command: "gitk",
    description: "The Git repository browser",
    usage: "gitk [<options>] [<revision range>] [--] [<path>...]",
    examples: ["gitk", "gitk --all", "gitk HEAD~10..HEAD"],
    relatedCommands: ["git gui", "git log", "git show"],
    category: "main",
  },

  scalar: {
    command: "scalar",
    description: "A tool for managing large Git repositories",
    usage: "scalar <command> [<options>]",
    examples: ["scalar clone <url>", "scalar register", "scalar unregister"],
    relatedCommands: ["git clone", "git config", "git maintenance"],
    category: "main",
  },

  // Ancillary Commands - Manipulators
  "git config": {
    command: "git config",
    description: "Get and set repository or global options",
    usage: "git config [options] <name> [<value>]",
    examples: [
      'git config --global user.name "Your Name"',
      'git config --global user.email "your.email@example.com"',
      "git config --list",
      "git config core.editor vim",
    ],
    relatedCommands: ["git init", "git commit", "git log", "git remote"],
    category: "ancillary",
  },

  "git fast-export": {
    command: "git fast-export",
    description: "Git data exporter",
    usage: "git fast-export [options] <rev-list-args>",
    examples: [
      "git fast-export --all",
      "git fast-export HEAD~10..HEAD",
      "git fast-export --signed-tags=verbatim --all",
    ],
    relatedCommands: ["git fast-import", "git bundle", "git archive"],
    category: "ancillary",
  },

  "git fast-import": {
    command: "git fast-import",
    description: "Backend for fast Git data importers",
    usage: "git fast-import [options]",
    examples: [
      "git fast-import < data.txt",
      "git fast-import --import-marks=marks.txt",
    ],
    relatedCommands: ["git fast-export", "git bundle"],
    category: "ancillary",
  },

  "git filter-branch": {
    command: "git filter-branch",
    description: "Rewrite branches",
    usage:
      "git filter-branch [--setup <command>] [--subdirectory-filter <directory>] [--env-filter <command>] [--tree-filter <command>] [--index-filter <command>] [--parent-filter <command>] [--msg-filter <command>] [--commit-filter <command>] [--tag-name-filter <command>] [--prune-empty] [--original <namespace>] [-d <directory>] [-f | --force] [--state-branch <branch>] [--] [<rev-list options>...]",
    examples: [
      'git filter-branch --tree-filter "rm -f passwords.txt" HEAD',
      "git filter-branch --subdirectory-filter trunk HEAD",
    ],
    relatedCommands: ["git rebase", "git reset", "git rm"],
    category: "ancillary",
  },

  "git mergetool": {
    command: "git mergetool",
    description:
      "Run merge conflict resolution tools to resolve merge conflicts",
    usage: "git mergetool [--tool=<tool>] [-y | --[no-]prompt] [<file>...]",
    examples: [
      "git mergetool",
      "git mergetool --tool=vimdiff",
      "git mergetool file.txt",
    ],
    relatedCommands: ["git merge", "git diff", "git status"],
    category: "ancillary",
  },

  "git pack-refs": {
    command: "git pack-refs",
    description: "Pack heads and tags for efficient repository access",
    usage: "git pack-refs [--all] [--no-prune]",
    examples: ["git pack-refs --all", "git pack-refs --all --prune"],
    relatedCommands: ["git gc", "git repack", "git reflog"],
    category: "ancillary",
  },

  "git prune": {
    command: "git prune",
    description: "Prune all unreachable objects from the object database",
    usage:
      "git prune [-n] [-v] [--progress] [--expire <time>] [--] [<head>...]",
    examples: [
      "git prune",
      "git prune --dry-run",
      "git prune --expire=2.weeks.ago",
    ],
    relatedCommands: ["git gc", "git fsck", "git reflog"],
    category: "ancillary",
  },

  "git reflog": {
    command: "git reflog",
    description: "Manage reflog information",
    usage: "git reflog <subcommand> <options>",
    examples: [
      "git reflog",
      "git reflog show HEAD",
      "git reflog expire --expire=90.days.ago --all",
    ],
    relatedCommands: ["git log", "git reset", "git checkout"],
    category: "ancillary",
  },

  "git refs": {
    command: "git refs",
    description: "Low-level access to refs",
    usage: "git refs <subcommand> <options>",
    examples: ["git refs", "git refs verify"],
    relatedCommands: ["git branch", "git tag", "git show-ref"],
    category: "ancillary",
  },

  "git remote": {
    command: "git remote",
    description: "Manage set of tracked repositories",
    usage: "git remote [options]",
    examples: [
      "git remote",
      "git remote -v",
      "git remote add origin https://github.com/user/repo.git",
      "git remote remove origin",
      "git remote set-url origin new-url",
    ],
    relatedCommands: ["git clone", "git fetch", "git push", "git pull"],
    category: "ancillary",
  },

  "git repack": {
    command: "git repack",
    description: "Pack unpacked objects in a repository",
    usage: "git repack [options]",
    examples: ["git repack", "git repack -a -d", "git repack --window=250"],
    relatedCommands: ["git gc", "git pack-objects", "git prune-packed"],
    category: "ancillary",
  },

  "git replace": {
    command: "git replace",
    description: "Create, list, delete refs to replace objects",
    usage: "git replace [-f] <object> <replacement>",
    examples: [
      "git replace abc123 def456",
      "git replace -l",
      "git replace -d abc123",
    ],
    relatedCommands: ["git log", "git show", "git cat-file"],
    category: "ancillary",
  },

  // Ancillary Commands - Interrogators
  "git annotate": {
    command: "git annotate",
    description: "Annotate file lines with commit information",
    usage: "git annotate [options] [<rev-opts>] [<rev>] [--] <file>",
    examples: ["git annotate file.txt", "git annotate -l file.txt"],
    relatedCommands: ["git blame", "git log", "git show"],
    category: "ancillary",
  },

  "git blame": {
    command: "git blame",
    description:
      "Show what revision and author last modified each line of a file",
    usage: "git blame [<options>] [<rev-opts>] [<rev>] [--] <file>",
    examples: [
      "git blame file.txt",
      "git blame -L 10,20 file.txt",
      "git blame --since=3.weeks file.txt",
    ],
    relatedCommands: ["git annotate", "git log", "git show", "git diff"],
    category: "ancillary",
  },

  "git bugreport": {
    command: "git bugreport",
    description: "Collect information for user to file a bug report",
    usage:
      "git bugreport [(-o | --output-directory) <path>] [(-s | --suffix) <format>]",
    examples: ["git bugreport", "git bugreport -o ~/Desktop"],
    relatedCommands: ["git version", "git config"],
    category: "ancillary",
  },

  "git count-objects": {
    command: "git count-objects",
    description: "Count unpacked number of objects and their disk consumption",
    usage: "git count-objects [-v] [-H | --human-readable]",
    examples: ["git count-objects", "git count-objects -v"],
    relatedCommands: ["git gc", "git prune", "git fsck"],
    category: "ancillary",
  },

  "git diagnose": {
    command: "git diagnose",
    description: "Generate a zip archive of diagnostic information",
    usage:
      "git diagnose [(-o | --output-directory) <path>] [(-s | --suffix) <format>] [--mode=<mode>]",
    examples: ["git diagnose", "git diagnose -o ~/Desktop"],
    relatedCommands: ["git bugreport", "git fsck"],
    category: "ancillary",
  },

  "git difftool": {
    command: "git difftool",
    description: "Show changes using common diff tools",
    usage: "git difftool [<options>] [<commit> [<commit>]] [--] [<path>...]",
    examples: [
      "git difftool",
      "git difftool --tool=vimdiff",
      "git difftool HEAD~1",
    ],
    relatedCommands: ["git diff", "git mergetool", "git config"],
    category: "ancillary",
  },

  "git fsck": {
    command: "git fsck",
    description:
      "Verifies the connectivity and validity of the objects in the database",
    usage:
      "git fsck [--tags] [--root] [--unreachable] [--cache] [--no-reflogs] [--[no-]full] [--strict] [--verbose] [--lost-found] [--[no-]dangling] [--[no-]progress] [--connectivity-only] [--[no-]name-objects] [<object>...]",
    examples: ["git fsck", "git fsck --unreachable", "git fsck --lost-found"],
    relatedCommands: ["git gc", "git prune", "git count-objects"],
    category: "ancillary",
  },

  "git help": {
    command: "git help",
    description: "Display help information about Git",
    usage:
      "git help [-a|--all [--[no-]verbose]] [[-i|--info] [-m|--man] [-w|--web]] [<command>|<guide>]",
    examples: ["git help", "git help commit", "git help -a"],
    relatedCommands: ["git version", "git config"],
    category: "ancillary",
  },

  "git instaweb": {
    command: "git instaweb",
    description: "Instantly browse your working repository in gitweb",
    usage:
      "git instaweb [--local] [--httpd=<httpd>] [--port=<port>] [--browser=<browser>]",
    examples: [
      "git instaweb",
      "git instaweb --httpd=apache2",
      "git instaweb --stop",
    ],
    relatedCommands: ["git gui", "gitk", "gitweb"],
    category: "ancillary",
  },

  "git merge-tree": {
    command: "git merge-tree",
    description: "Perform merge without touching index or working tree",
    usage:
      "git merge-tree [--write-tree] [--trivial-merge] [--aggressive] [--messages] [<merge-options>] <branch1> <branch2>",
    examples: [
      "git merge-tree main feature",
      "git merge-tree --write-tree main feature",
    ],
    relatedCommands: ["git merge", "git diff", "git show"],
    category: "ancillary",
  },

  "git rerere": {
    command: "git rerere",
    description: "Reuse recorded resolution of conflicted merges",
    usage:
      "git rerere [clear | forget <pathspec> | diff | remaining | status | gc]",
    examples: ["git rerere", "git rerere status", "git rerere clear"],
    relatedCommands: ["git merge", "git rebase", "git config"],
    category: "ancillary",
  },

  "git show-branch": {
    command: "git show-branch",
    description: "Show branches and their commits",
    usage:
      "git show-branch [-a | --all] [-r | --remotes] [--topo-order | --date-order] [--current] [--color[=<when>] | --no-color] [--sparse] [--more=<n> | --list | --independent | --merge-base] [--no-name | --sha1-name] [--topics] [(<rev> | <glob>)...]",
    examples: [
      "git show-branch",
      "git show-branch --all",
      "git show-branch master feature",
    ],
    relatedCommands: ["git branch", "git log", "git merge-base"],
    category: "ancillary",
  },

  "git verify-commit": {
    command: "git verify-commit",
    description: "Check the GPG signature of commits",
    usage: "git verify-commit [-v | --verbose] [--raw] <commit>...",
    examples: ["git verify-commit HEAD", "git verify-commit -v abc123"],
    relatedCommands: ["git verify-tag", "git log", "git show"],
    category: "ancillary",
  },

  "git verify-tag": {
    command: "git verify-tag",
    description: "Check the GPG signature of tags",
    usage: "git verify-tag [-v | --verbose] [--raw] <tag>...",
    examples: ["git verify-tag v1.0", "git verify-tag -v v1.0"],
    relatedCommands: ["git verify-commit", "git tag", "git show"],
    category: "ancillary",
  },

  "git version": {
    command: "git version",
    description: "Display version information about Git",
    usage: "git version [--build-options]",
    examples: ["git version", "git version --build-options"],
    relatedCommands: ["git help", "git config"],
    category: "ancillary",
  },

  "git whatchanged": {
    command: "git whatchanged",
    description: "Show logs with differences each commit introduces",
    usage: "git whatchanged [<options>] [<revision range>] [[--] <path>...]",
    examples: [
      "git whatchanged",
      "git whatchanged -p",
      'git whatchanged --since="1 week ago"',
    ],
    relatedCommands: ["git log", "git diff", "git show"],
    category: "ancillary",
  },

  gitweb: {
    command: "gitweb",
    description: "Git web interface (web frontend to Git repositories)",
    usage: "gitweb [options]",
    examples: ["gitweb"],
    relatedCommands: ["git instaweb", "git gui"],
    category: "ancillary",
  },

  // Low-level commands (plumbing) - Manipulation
  "git apply": {
    command: "git apply",
    description: "Apply a patch to files and/or to the index",
    usage:
      "git apply [--stat] [--numstat] [--summary] [--check] [--index | --intent-to-add] [--3way] [--apply] [--no-add] [--build-fake-ancestor=<file>] [-R | --reverse] [--allow-binary-replacement | --binary] [--reject] [-z] [-p<n>] [-C<n>] [--inaccurate-eof] [--recount] [--cached] [--ignore-space-change | --ignore-whitespace] [--whitespace=<option>] [--exclude=<path>] [--include=<path>] [--directory=<root>] [--verbose] [--unsafe-paths] [<patch>...]",
    examples: [
      "git apply patch.diff",
      "git apply --check patch.diff",
      "git apply --stat patch.diff",
    ],
    relatedCommands: ["git am", "git format-patch", "git diff"],
    category: "plumbing",
  },

  "git checkout-index": {
    command: "git checkout-index",
    description: "Copy files from the index to the working tree",
    usage:
      "git checkout-index [-u] [-q] [-a] [-f] [-n] [--prefix=<string>] [--stage=<number>|all] [--temp] [-z] [--stdin] [--] [<file>...]",
    examples: ["git checkout-index -a", "git checkout-index file.txt"],
    relatedCommands: ["git checkout", "git read-tree", "git update-index"],
    category: "plumbing",
  },

  "git commit-graph": {
    command: "git commit-graph",
    description: "Write and verify Git commit-graph files",
    usage:
      "git commit-graph verify [--object-dir <dir>] [--shallow] [--[no-]progress]",
    examples: ["git commit-graph write", "git commit-graph verify"],
    relatedCommands: ["git gc", "git repack", "git log"],
    category: "plumbing",
  },

  "git commit-tree": {
    command: "git commit-tree",
    description: "Create a new commit object",
    usage:
      "git commit-tree <tree> [(-p <parent>)...] [(-m <message>)...] [(-F <file>)...] [-S[<keyid>]] [--[no-]gpg-sign]",
    examples: [
      'git commit-tree abc123 -m "Initial commit"',
      'git commit-tree abc123 -p def456 -m "Merge commit"',
    ],
    relatedCommands: ["git write-tree", "git commit", "git mktree"],
    category: "plumbing",
  },

  "git hash-object": {
    command: "git hash-object",
    description:
      "Compute object ID and optionally create an object from a file",
    usage:
      "git hash-object [-t <type>] [-w] [--path=<file> | --no-filters] [--stdin [--literally]] [--] <file>...",
    examples: [
      "git hash-object file.txt",
      "git hash-object -w file.txt",
      'echo "content" | git hash-object --stdin',
    ],
    relatedCommands: ["git cat-file", "git update-index", "git write-tree"],
    category: "plumbing",
  },
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
    .filter((command) => command.toLowerCase().includes(trimmed))
    .slice(0, 8); // Increased from 5 to 8 due to more commands
}

export function getCommandsByCategory(
  category?: "main" | "ancillary" | "plumbing" | "interaction" | "guides"
): GitCommand[] {
  if (!category) {
    return Object.values(gitCommands);
  }

  return Object.values(gitCommands).filter((cmd) => cmd.category === category);
}

export function getMainCommands(): GitCommand[] {
  return getCommandsByCategory("main");
}

export function searchCommands(query: string): GitCommand[] {
  const lowerQuery = query.toLowerCase();

  return Object.values(gitCommands).filter(
    (cmd) =>
      cmd.command.toLowerCase().includes(lowerQuery) ||
      cmd.description.toLowerCase().includes(lowerQuery) ||
      cmd.examples.some((example) => example.toLowerCase().includes(lowerQuery))
  );
}

// Get total count of commands
export function getCommandCount(): number {
  return Object.keys(gitCommands).length;
}

// Get random command for learning
export function getRandomCommand(): GitCommand {
  const commands = Object.values(gitCommands);
  const randomIndex = Math.floor(Math.random() * commands.length);
  return commands[randomIndex];
}
