# Avalanche Docs

<div align="center">
  <img src="static/AvalancheLogoRed.png?raw=true">
</div>

---

[Español](README-es.md)

## Overview

This repository contains the contents for the Avalanche Developer Documentations
deployed at [https://docs.avax.network](https://docs.avax.network).

The site is built using [Docusaurus 2](https://docusaurus.io/).

## Contributing

Contributing to the docs site is a great way to get involved with the Avalanche dev community!
Here's how to get started:

### Quick Fixes

For small typos or corrections, it is easy to contribute without the need to clone/fork the
repository. Simply:

- Scroll to the bottom of the page and hit "Edit this page"
- Make changes to the page directly in Github's GUI
- Hit "Commit changes ..."
- Edit the `commit message` to describe the change in 4 or less words,
  and include any extra details in the description
- Hit "Sign off and commit changes" to raise a PR with your proposed changes

![](https://github.com/ava-labs/avalanche-docs/blob/master/static/img/quick-edit-readme.gif)

### New Content or Extensive Changes

To propose new docs or large edits to our existing pages, follow the steps accordingly:

- **Ava Labs Github Organization Members:** Clone the repo
  `git clone https://github.com/ava-labs/avalanche-docs.git`
- **External Contributors:** Fork the repo via GitHub's GUI
- Checkout to a new branch `git checkout -b <your-name/branch-name>`
- Make changes on your branch
- `git add .`
- **`yarn build` to ensure the build passes**
- `git commit -m "some commit message"`
- `git push`
- Head to [GitHub](https://github.com/ava-labs/avalanche-docs)
  and open a new pull request

### Structure and Syntax

- Docs are located in the [docs](docs) directory. A document's path corresponds
  with it's domain extension. For example: the guide showing how to
  [Run an Avalanche Node Manually](https://docs.avax.network/nodes/run/node-manually)
  is located in this repository at `docs/nodes/run/node-manually`, and is hosted at
  [https://docs.avax.network/nodes/run/node-manually](https://docs.avax.network/nodes/run/node-manually).
- The left sidebar of the page is controlled primarily by
  [sidebars.json](sidebars.json), where sub-sections are sometimes ordered by their
  [`sidebar_position` metadata field](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#sidebar_position).
- Our style guide can be found [here](style-guide.md).
- This repository uses a series of style checking, linting, and formatting tools. See
  [style-checker-notes.md](style-checker-notes.md) for more details and how to fix errors.
- All image files should be included under
  [static/img/<corresponding-sub-drectory>](static/img).
- Extensive docs for Docusaurus can be found [here](https://docusaurus.io/docs).

### Pull Request (PR)

- All PRs should be made against the `master` branch.
- Following a successful build, Cloudflare Pages will comment on the PR with a link to
  \*.avalanche-docs.pages.dev where you can verify your changes.
- Once your PR is merged into `master`, [https://docs.avax.network/](https://docs.avax.network/)
  will be updated with your changes.

### Installation

```zsh
yarn
```

### Local Development

```zsh
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are
reflected live without having to restart the server.

### Build

```zsh
yarn build
```

This command generates static content into the `build` directory and can be served using any static
contents hosting service.

**Please make sure that you run this command to see if there is any error in building the package,**
**and fix them before pushing your changes.**

## Search

Search is powered by Algolia and the config file is located
[here](https://github.com/algolia/docsearch-configs/blob/master/configs/avax.json).

## New or Missing Content Requests

_The information I am requesting is related to a specific project, i.e. AvalancheGo, AvalancheNetworkRunner, etc.:_

- Please raise a **Missing Docs Issue** in the GitHub repository of that project and
  thoroughly detail your request. Include references to any existing pages relevant to your
  request.

_The information I am requesting is explanatory in nature and does not currently exist:_

- Please open a new [Issue](https://github.com/ava-labs/avalanche-docs/issues/new/choose)
  in this repository and thoroughly detail your request according to the issue template.
  If urgent, please create a new ticket in the
  [Dev Docs Improvement Proposals](https://github.com/orgs/ava-labs/projects/15/views/1)
  dashboard.

_Erroneous or missing information on documentation unrelated to a specific project needs
editing:_

- If you understand the issue enough to provide a correction, follow the steps
  [here](https://github.com/ava-labs/avalanche-docs#quick-fixes).
- If not, raise an [Issue](https://github.com/ava-labs/avalanche-docs/issues/new/choose).
