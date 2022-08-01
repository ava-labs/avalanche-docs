<div align="center">
  <img src="static/AvalancheLogoRed.png?raw=true">
</div>

---

# Avalanche Docs

## Overview

This repo contains the contents for our docs deployed [here](https://docs.avax.network).

The website is built using [Docusaurus 2](https://docusaurus.io/).

## Contributing

Contributing to the docs site is a great way to get involved with the Avalanche dev community! Here's some things you need to know to get started.

### Contents

- All the docs are located in the [docs](docs) directory.
- The left side-bar of the page is controlled by [sidebars.js](sidebars.js).
- Extensive docs for Docusaurus can be found [here](https://docusaurus.io/docs).

### Pull Request (PR)

- All PRs should be made against the `master` branch.
- Following a successful build, Cloudflare Pages will comment on the PR with a link to \*.avalanche-docs.pages.dev where you can verify your changes.
- Once your PR is merged into `master`, [https://docs.avax.network/](https://docs.avax.network/) will be updated with your changes.

### Installation

```zsh
yarn
```

### Local Development

```zsh
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```zsh
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

**Please make sure that you run this command to see if there is any error in building the package, and fix them before pushing your changes.**

### Format

We strongly recommend [Visual Studio Code](https://visualstudio.microsoft.com/) with [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) whose configuration file can be found [here](./.prettierrc).

Conventions:

- Title case is used in all section headers.
- All words `Subnet` should have first letter upper cased, except in the context of a command, path or logs.

## Search

Search is powered by Algolia and the config file is located [here](https://github.com/algolia/docsearch-configs/blob/master/configs/avax.json).
