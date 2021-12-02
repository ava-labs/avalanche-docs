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
* All the docs are located in the [docs](docs) directory.
* The left side-bar of the page is controlled by [sidebars.js](sidebars.js).
* Extensive docs for Docusaurus can be found [here](https://docusaurus.io/docs).

### Pull Request (PR)
* `dev` branch is for development. Please create a PR from this branch.
* After the PR being merged to `dev` branch, the content will be deployed on [https://docs-beta.avax.network/](https://docs-beta.avax.network/).
* Admin of this project will merge `dev` branch to `master` branch, whose contents are deployed on [https://docs.avax.network/](https://docs.avax.network/) 

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Search
Search is powered by Algolia and the config file is located [here](https://github.com/algolia/docsearch-configs/blob/master/configs/avax.json). 