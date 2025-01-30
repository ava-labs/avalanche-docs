#!/bin/bash
set -eu -o pipefail

rm -rf /compiled/*


cp -r /openzeppelin-contracts/out/ProxyAdmin.sol /compiled/
cp -r /openzeppelin-contracts/out/TransparentUpgradeableProxy.sol /compiled

chown -R $HOST_UID:$HOST_GID /compiled
