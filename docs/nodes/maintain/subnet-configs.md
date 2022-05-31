---
sidebar_position: 7
decription: In this doc, learn how to run offline pruning on your node to reduce its disk usage.
---

# Subnet Configs


It is possible to provide parameters for a subnet. Parameters here apply to all chains in the specified subnet. 

AvalancheGo looks for files specified with `{subnetID}.json` under `--subnet-config-dir` as documented [here](./avalanchego-config-flags.md#subnet-configs). 


Here is an example of subnet config file:

```json
{
  "validatorOnly": false,
  "consensusParameters": {
    "k": 25,
    "alpha": 18
  },
  "appGossipNonValidatorSize": 10
}
```

## Parameters

### Private Subnet

#### `validatorOnly` (bool):

If `true` this node does not expose subnet blockchain contents to non-validators via P2P messages. Defaults to `false`. 

Avalanche subnets are public by default. It means that every node can sync and listen ongoing transactions/blocks in subnets, even they're not validating the listened subnet.

Subnet validators can choose not to publish contents of blockchains via this configuration. If a node sets `validatorOnly` to true, the node exchanges messages only with this subnet's validators. Other peers will not be able to learn contents of this subnet from this node.



:::tip
This is a node-specific configuration. Every validator of this subnet has to use this configuration in order to create a full private subnet.
:::



### Consensus Parameters

Subnet configs supports loading new consensus parameters. JSON keys are different from their matching `CLI` keys. These parameters must be grouped under `consensusParameters` key. The consensus parameters of a subnet default to the same values used for the Primary Network, which are given [CLI Snow Parameters](./avalanchego-config-flags.md#snow-parameters).

| CLI Key                             | JSON Key                  |
| :---------------------------------  | :-----------------------  |
| --snow-sample-size                  | k                         |
| --snow-quorum-size                  | alpha                     |
| --snow-virtuous-commit-threshold    | betaVirtuous              |
| --snow-rogue-commit-threshold       | betaRogue                 |
| --snow-concurrent-repolls           | concurrentRepolls         |
| --snow-optimal-processing           | optimalProcessing         |
| --snow-max-processing               | maxOutstandingItems       |
| --snow-max-time-processing          | maxItemProcessingTime     |
| --snow-mixed-query-num-push-vdr     | mixedQueryNumPushVdr      |
| --snow-mixed-query-num-push-non-vdr | mixedQueryNumPushNondVdr  |
| --snow-avalanche-batch-size         | batchSize                 |
| --snow-avalanche-num-parents        | parentSize                |

### Gossip Configs

It's possible to define different Gossip configurations for each subnet without changing values for Primary Network. For example in Primary Network transaction mempools are not gossipped to non-validators (`--consensus-app-gossip-non-validator-size` is `0`). You can change this for your subnet and share mempool with non-validators as well. JSON keys of these parameters are different from their matching `CLI` keys. These parameters default to the same values used for the Primary Network. For more information see [CLI Gossip Configs](./avalanchego-config-flags.md#gossiping).

| CLI Key                                                 | JSON Key                               |
| :------------------------------------------------------ | :------------------------------------- |
| --consensus-accepted-frontier-gossip-validator-size     | gossipAcceptedFrontierValidatorSize    |
| --consensus-accepted-frontier-gossip-non-validator-size | gossipAcceptedFrontierNonValidatorSize |
| --consensus-accepted-frontier-gossip-peer-size          | gossipAcceptedFrontierPeerSize         |
| --consensus-on-accept-gossip-validator-size             | gossipOnAcceptValidatorSize            |
| --consensus-on-accept-gossip-non-validator-size         | gossipOnAcceptNonValidatorSize         |
| --consensus-on-accept-gossip-peer-size                  | gossipOnAcceptPeerSize                 |
| --consensus-app-gossip-validator-size                   | appGossipValidatorSize                 |
| --consensus-app-gossip-non-validator-size               | appGossipNonValidatorSize              |
| --consensus-app-gossip-peer-size                        | appGossipPeerSize                      |


