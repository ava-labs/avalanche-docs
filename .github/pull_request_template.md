
# Docs PR Template

## Why this should be merged

<please give a thorough description of why these changes are necessary>

## How this works

<please give a thorough description of what your changes are and how they work>

## How these changes were tested 

<please give a thorough description of how to view the changes and how they were tested>

## Workflow checks

- [] ran `vale /docs/file/path` on all changed `.md` files to ensure all grammar rules pass
- [] ran `markdownlint /docs/file/path` on all changed `.md` files to ensure all linting rules pass
- [] completed the above two checks and all additional rules outlined in `style-checker-notes.md` to
  ensure all checks pass
- [] if a doc was removed/deleted, the path to that doc must be redirected to a valid URL via the
  `_redirects` file
- [] all files that were moved from their current directory to a new path have had their paths
  redirected via the `_redirects` file
- [] `_redirects` were manually verified with the cloudflare preview link
- [] `sidebars.json` reflects all changes made to file path
