# Contributing

Thanks for wanting to contribute to Chatson! Please read over our contributing guidelines below before submitting any pull requests. Please submit one PR per issue or feature!

## General Workflow

1. Fork the repo
1. Cut a branch from master
1. Make commits to your branch. Please capitalize commit messages and start with a present tense action verb.
1. When you've finished with your fix or feature, Rebase upstream changes into your branch. submit a [pull request](https://help.github.com/articles/using-pull-requests/) directly to master. Include a description of your changes.
1. Your pull request will be reviewed by a repo maintainer for consistency, clarity, quality, and utility.
1. Should there be any issues raised in the code review process, address these issues and push your fixes as a single
   new commit.

## Detailed Workflow

### Fork the repo

Use github’s interface to make a fork of the Chatson repo. After cloning the fork to your local workspace, add Chatson's master as an upstream remote:

```
git remote add upstream https://github.com/badT/Chatson.git
```

### Cut a branch from master

In your local copy of the repo, create a branch in which to do work. E.g.:

```
git checkout -b <your-branch-name>
```

### Make commits to your branch.

Make changes and commits on your branch, and make sure that you
only make changes that are relevant to the feature you are wanting to add 
or bug you are trying to fix. If you find yourself making unrelated changes, make a new branch for those
changes. All commit messages should be capitalized and start with a present tense action verb.

### Rebase upstream changes into your branch

Rebase upstream changes to the master branch into yours by running this command
from your branch:

```bash
git pull --rebase upstream master
```

This will start the rebase process. You must commit all of your changes
before doing this. If there are no conflicts, this should just roll all
of your changes back on top of the changes from upstream, leading to a
nice, clean, linear commit history.

If there are conflicting changes, git will start yelling at you part way
through the rebasing process. Git will pause rebasing to allow you to sort
out the conflicts. You do this the same way you solve merge conflicts,
by checking all of the files git says have been changed in both histories
and picking the versions you want. Be aware that these changes will show
up in your pull request, so try and incorporate upstream changes as much
as possible.

You pick a file by `git add`ing it - you do not make commits during a
rebase.

Once you are done fixing conflicts for a specific commit, run:

```bash
git rebase --continue
```

This will continue the rebasing process. Once you are done fixing all
conflicts you should run the existing tests to make sure you didn’t break
anything, then run your new tests (there are new tests, right?) and
make sure they work also.

If rebasing broke anything, fix it, then repeat the above process until
you get here again and nothing is broken and all the tests pass.

### Make a pull request

Make a clear pull request from your fork and branch to the upstream master
branch, detailing exactly what changes you made and what feature this
should add or bugs this should fix.

Thanks for contributing!