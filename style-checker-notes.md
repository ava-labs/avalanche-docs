# How to Use the Style Checker

## Tools

Avalanche-Docs uses a variety of linting and style checking programs including

- [Vale](https://vale.sh/)
  - [GitHub Action](https://github.com/errata-ai/vale-action)
- [Markdownlint](https://github.com/DavidAnson/markdownlint)
  - Uses [Super-Linter](https://github.com/github/super-linter) as a GitHub Action. This pulls in a
    few other linting tools but they're all turned off.

## Config Files

### Vale Configs

The overall config is [`.vale.ini`](.vale.ini). You can find the individual style
in [`.github/styles`](.github/styles).

### Markdown Lint Configs

Look at [`.markdownlint.json`](.markdownlint.json).

## Adding a File to the CI for Style Checking

Edit [`.github/workflows/ci.yml`](.github/workflows/ci.yml). Add the file or folder to the `files`
tag in the `Vale` task.

## Run Checkers Locally

For readability, the CI only print errors. You absolutely should address warnings and suggestions in
your docs, so please run the tools locally before committing to the repository.

### Vale

Local install [instructions](https://vale.sh/docs/vale-cli/installation/)

Run the tool with `vale <filename>`. You can provide a file or a directory.

The [`Vale` VS Code Extension](https://marketplace.visualstudio.com/items?itemName=errata-ai.vale-server)
is quite useful for visualizing style errors in-line.

### Markdownlint

To run locally, install the [Markdownlint CLI](https://github.com/igorshubovych/markdownlint-cli)

Run with `markdownlint <filename>`. There is also an extension to add it to
[VS Code](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint).

## Resolving Flagged Issues

There are two paths to resolving issues, edit you doc or update the linting rules. For example:

```text
Did you really mean 'homescreen'?   Vale.Spelling
```

You can correct the spelling by splitting `homescreen` into `home screen` or add a new rule.
`Vale.Spelling` tells you that you would need to add a new approved spelling. You can find
instructions to do so below.

## Writing Custom Style Checking Rules

### Adding New Approved Words/Spellings

To add a new spelling rule, add the word to
[.github/styles/Vocab/Products/accept.txt](.github/styles/Vocab/Products/accept.txt). The file is
case-sensitive and plurals/other tenses count as separate words.

### Adding Rejected Words/Spellings

To block a specific word from appearing in the repository, add the word to
[.github/styles/Vocab/Products/reject.txt](.github/styles/Vocab/Products/reject.txt).

### Enforcing a Specific Spelling

If you would like to enforce a specific product name such as `Avalanche-CLI` as opposed to
`avalanche-cli` or `Avalanche-CLI`, you create a new regular expression substitution pattern in
either
[.github/styles/custom/ProductCapitalization.yml](.github/styles/custom/ProductCapitalization.yml)
or [.github/styles/custom/RejectForms.yml`](.github/styles/custom/RejectForms.yml).

### Adding an Exception to an Existing Rule

If you'd like to add an exception to a Vale rule, navigate to the rule in `.github/styles` and add an
entry under `exceptions`. See
[.github/styles/GoogleModified/Headings.yml](.github/styles/GoogleModified/Headings.yml) for an example.

### Ignoring Markdownlint Inline

If you would like to ignore a Markdownlint rule inline (such as for a line length violation within a
code block), you can add this style of comment:

```text
<!-- markdownlint-disable MD013 -->

<Rule violating code goes here>

<!-- markdownlint-enable MD013 -->
```

Make sure to replace `MD013` with the
[rule](https://github.com/DavidAnson/markdownlint#rules--aliases) you'd like to override.

### Ignoring Vale Inline

If you would like to turn off vale inline, you can add this style of comment:


```text
<!-- vale off -->

This is some text

more text here...

<!-- vale on -->
```

## Managing Line Length

Please don't ignore line length violations by ignoring Markdownlint rule MD013. The only place it
is generally acceptable to do so is in code blocks. Generally, markdown text isn't affected by
breaking text up with single newlines. To assist with managing line lengths, you may want to use
[Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap) or another similar
markdown line-wrapping tool.

To use Rewrap, highlight the section of code you want to wrap and press `⌘/alt + q` to smartly wrap
your lines. The one downside to Rewrap is that it doesn't properly break bold text. You need
to manually add `**` to both the end of your wrapped line and the start of the next line.
