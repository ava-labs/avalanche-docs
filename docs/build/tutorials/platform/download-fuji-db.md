# Download the Fuji DB

## Introduction

Currently fully syncing the Fuji network takes multiple days. A common request from developers is a quicker path to having a fully synced Fuji node. With that in mind we have released a Fuji DB which can be downloaded to a fresh AvalancheGo instance.

## Download AvalancheGo

First, you need an instance of AvalancheGo. For that you have multiple options including cloning the repo and building it locally or just running from a pre-built binary.

### Build Locally

Check out the [AvalancheGo repo](https://github.com/ava-labs/avalanchego) and follow the build steps.

### Run From Binary

Alternatively you can use a [pre-build binary](https://github.com/ava-labs/avalanchego/releases).

## Install the Fuji DB

To make it easier to launch your own subnet on Fuji, we uploaded a DB to S3 that you can use to run your own validator.

### Download the DB from S3

First, download the DB:

```zsh
wget fuji-dbs.s3.amazonaws.com/03-25-2022-testnet-db.tar.gz 
```

Depending on your network speed this may take a while.

### Unzip the tar

Next, unzip the downloaded tarfile.

```zsh
tar -xf 03-25-2022-testnet-db.tar.gz
```

This will extract a `fuji/` directory.

### Move the DB

Lastly, move the `fuji/` directory to `~/.avalanchego/db/`

```zsh
mv fuji/ ~/.avalanchego/db
```