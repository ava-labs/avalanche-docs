---
tags: [Tooling, Avalanche-CLI]
description: This guide demonstrates how to install Avalanche-CLI. 
pagination_label: Install Avalanche-CLI
sidebar_label: Install Avalanche-CLI
sidebar_position: 0
---

# Install Avalanche-CLI

## Compatibility

Avalanche-CLI runs on Linux and Mac. Windows is currently not supported.

## Instructions

To download a binary for the latest release, run:

```shell
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

The script installs the binary inside the `~/bin` directory. If the directory doesn't exist,
it will be created.

## Adding Avalanche-CLI to Your PATH

To call the `avalanche` binary from anywhere, you'll need to add it to your system path. If you installed
the binary into the default location, you can run the following snippet to add it to your path.

```shell
export PATH=~/bin:$PATH
```

To add it to your path permanently, add an export command to your shell initialization script. If
you run `bash`, use `.bashrc`. If you run `zsh`, use `.zshrc`.

For example:

```shell
export PATH=~/bin:$PATH >> .bashrc
```

## Checking Your Installation

You can test your installation by running `avalanche --version`. The tool should print the running version.

## Updating

To update your installation, you need to delete your current binary and download the latest version
using the preceding steps.

## Building from Source

The source code is available in this [GitHub repository](https://github.com/ava-labs/avalanche-cli).

After you've cloned the repository, checkout the tag you'd like to run. You can compile the code by
running `./scripts/build.sh` from the top level directory.

The build script names the binary `./bin/avalanche`.
