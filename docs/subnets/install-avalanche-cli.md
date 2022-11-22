# Avalanche-CLI Installation

## Compatibility

The tool has been tested on Linux and Mac. Windows is currently not supported.

## Prerequisites

On Mac, Brew is required. Installation instructions can be found [here](https://brew.sh/).

## Instructions

To download a binary for the latest release, run:

```
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
```

The binary will be installed inside the `./bin` directory (relative to where the install command was run).

_Downloading binaries from the Github UI will cause permission errors on Mac._

To add the binary to your path, run

```
cd bin
export PATH=$PWD:$PATH
```

To add it to your path permanently, add an export command to your shell initialization script (ex: .bashrc).

## Installing in Custom Location

To download the binary into a specific directory, run:

```
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s -- -b <relative directory>
```

## Adding Avalanche-CLI to your PATH

To call the `avalanche` binary from anywhere, you'll need to add it to your system path. If you installed
the binary into the default location, you can run the following snippet to add it to your path.

```
curl -sSfL https://raw.githubusercontent.com/ava-labs/avalanche-cli/main/scripts/install.sh | sh -s
cd bin
export PATH=$PWD:$PATH
```

To add it to your path permanently, add an export command to your shell initialization script (ex: (ex: .bashrc for
Ubuntu or .zshrc for Mac)).

## Checking Your Installation

You can test your installation by running `avalanche --version`. The tool should print the running version.

## Updating

To update your installation, you need to delete your current binary and download the latest version using the steps above.

## Building from Source

The source code is available in this [Github repo](https://github.com/ava-labs/avalanche-cli).

After you've cloned the repository, check out the tag you'd like to run. You can compile the code by running `./scripts/build.sh` from the top level directory.

The binary will be available as `/bin/avalanche`.
