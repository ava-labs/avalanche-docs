# Avalanche Summit: Fuji Quickstart 

## Introduction

Interest in Avalanche Subnets has been exploding. With the recent announcement of [Multiverse](https://medium.com/avalancheavax/avalanche-foundation-launches-multiverse-an-up-to-290m-incentive-program-to-accelerate-growth-of-c815ac5692c7), an up to $290M incentive program to accelerate growth of Subnets, we expect that interest to accelerate.

A requirement of running a custom subnet is to first have a validator on the primary subnet.  Currently fully syncing the Fuji network takes multiple days. A common request from developers is a quicker path to having a fully synced Fuji node. With that in mind, and in time for the [Avalanche Summit Hackthon](https://www.avalanchesummit.com), we've uploaded a DB to S3 that you can use to start your own Fuji validator.

## Download AvalancheGo

First, you need an instance of AvalancheGo. For that you have multiple options including cloning the repo and building it locally or just running from a pre-built binary.

### Build Locally

Check out the [AvalancheGo repo](https://github.com/ava-labs/avalanchego) and follow [the build steps](https://github.com/ava-labs/avalanchego#native-install).

### Run From Binary

Alternatively you can use a [pre-built binary](https://github.com/ava-labs/avalanchego/releases).

## Install the Fuji DB

Now that you have an instance of AvalancheGo you can download the Fuji DB from S3.

### Download the DB from S3

First, download the DB. Depending on your network speed this may take a while.

```zsh
wget fuji-dbs.s3.amazonaws.com/03-25-2022-testnet-db.tar.gz 
```

### Unzip the tar

Next, unzip the downloaded tarfile. This will extract a `fuji/` directory.

```zsh
tar -xf 03-25-2022-testnet-db.tar.gz
```

### Move the DB

Lastly, move the `fuji/` directory to `~/.avalanchego/db/`

```zsh
mv fuji/ ~/.avalanchego/db
```

## Summary

We want to make it as quick and seamless as possible for developers to go from idea to amazing subnet and application with as few steps as possible. Providing a DB for developers to quickly sync the Fuji network is just one more step to ensure a best-in-class UX for developers on the Avalanche network.