# Install Avalanche-CLI

## Compatibility

Avalanche-CLI runs on Linux and Mac. Windows is currently not supported.

## Prerequisites

On Mac, Brew is required. Installation instructions can be found [here](https://brew.sh/).

## Instructions

To download a binary for the latest release, run:

```
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

The script installs the binary inside the `~/bin` directory.

## Installing in a custom location

To download the binary into a specific directory, run:

```
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s -- -b <relative directory>
```

## Adding Avalanche-CLI to your PATH

To call the `avalanche` binary from anywhere, you'll need to add it to your system path. If you installed
the binary into the default location, you can run the following snippet to add it to your path.

```
export PATH=~/bin:$PATH
```

To add it to your path permanently, add an export command to your shell initialization script. If you run Ubuntu, use `.bashrc`. Mac uses `.zshrc`.

For example:

```
export PATH=~/bin:$PATH >> .bashrc
```

## Checking your installation

You can test your installation by running `avalanche --version`. The tool should print the running version.

## Updating

To update your installation, you need to delete your current binary and download the latest version using the preceding steps.

## Building from source

The source code is available in this [Github repo](https://github.com/ava-labs/avalanche-cli).

After you've cloned the repository, checkout the tag you'd like to run. You can compile the code by running `./scripts/build.sh` from the top level directory.

The build script names the binary `./bin/avalanche`.
