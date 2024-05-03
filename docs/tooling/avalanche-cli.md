---
tags: [Tooling, Avalanche-CLI]
description: Avalanche-CLI is a command-line tool that gives developers access to everything Avalanche. This release specializes in helping developers build and test Subnets.
pagination_label: Avalanche-CLI
sidebar_postion: 0
---

# Avalanche-CLI

Avalanche-CLI is a command-line tool that gives developers access to
everything Avalanche. This release specializes in helping developers
build and test Subnets.

To get started, look at the documentation for the subcommands or jump right
in with `avalanche subnet create myNewSubnet`.

[Install Avalanche CLI](/tooling/cli-guides/install-avalanche-cli.md)

## Primary

The `primary` command suite provides a collection of tools for interacting with the Avalanche
Primary Network.

### Primary AddValidator

The `primary addValidator` command adds an Avalanche node as a validator in the Avalanche Primary
Network with [AddPermissionlessValidatorTx](/reference/standards/guides/banff-changes.md#addpermissionlessvalidatortx).

This command requires the node's BLS key and proof of possession key, more information regarding BLS
can be found [here](/reference/avalanchego/p-chain/txn-format.md#proof-of-possession).

To get a node's BLS key and proof of possession key, call info.getNodeID API as shown [here](/reference/avalanchego/info-api.md#infogetnodeid)

**Usage:**

```shell
avalanche primary addValidator [flags]
```

**Flags:**

```shell
    --nodeID string                 the node ID of the validator
-k, --key string                    select the key to use [fuji deploy only]
    --weight uint                   set the staking weight of the validator
    --start-time string             UTC start time when this validator starts validating, in 'YYYY-MM-DD HH:MM:SS' format
    --staking-period duration       how long this validator will be staking
    --fuji fuji                     join on fuji (alias for `testnet`)
    --testnet testnet               join on testnet (alias for `fuji`)
    --mainnet mainnet               join on mainnet
-g, --ledger                        use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs strings          use the given ledger addresses
    --public-key string             set the BLS public key of the validator
    --proof-of-possession string    set the BLS proof of possession of the validator
    --delegation-fee uint           set the delegation fee (20 000 is equivalent to 2%)
```

## Subnet

The `subnet` command suite provides a collection of tools for developing
and deploying Subnets.

To get started, use the `subnet create` command wizard to walk through the
configuration of your very first Subnet. Then, go ahead and deploy it
with the `subnet deploy` command. You can use the rest of the commands to
manage your Subnet configurations and live deployments.

### Subnet AddValidator

The `subnet addValidator` command whitelists a primary network validator to
validate the provided deployed Subnet.

To add the validator to the Subnet's allow list, you first need to provide
the subnetName and the validator's unique NodeID. The command then prompts
for the validation start time, duration, and stake weight. You can bypass
these prompts by providing the values with flags.

This command currently only works on Subnets deployed to either the Fuji Testnet or Mainnet.

**Usage:**

```shell
avalanche subnet addValidator [subnetName] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --default-validator-params   use default weight/start/duration params for subnet validator
    --devnet devnet              add subnet validator on devnet
    --endpoint string            use the given endpoint for network operations
-e, --ewoq                       use ewoq key [fuji/devnet only]
    --fuji fuji                  add subnet validator on fuji (alias for `testnet`)
-h, --help                       help for addValidator
-k, --key string                 select the key to use [fuji/devnet only]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji/devnet)
    --ledger-addrs strings       use the given ledger addresses
    --local local                add subnet validator on local
    --mainnet mainnet            add subnet validator on mainnet
    --nodeID string              set the NodeID of the validator to add
    --output-tx-path string      file path of the add validator tx
    --staking-period duration    how long this validator will be staking
    --start-time string          UTC start time when this validator starts validating, in 'YYYY-MM-DD HH:MM:SS' format
    --subnet-auth-keys strings   control keys that will be used to authenticate add validator tx
    --testnet testnet            add subnet validator on testnet (alias for `fuji`)
    --weight uint                set the staking weight of the validator to add
```

<!-- markdownlint-enable MD013 -->

### Remove Validator in a Subnet

This command removes a node as a validator in a Subnet.

**Usage:**

```shell
avalanche subnet removeValidator [subnetName] [flags]
```

**Flags:**

```shell
    --fuji                                  remove validator in existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 remove validator in existing local deployment
    --mainnet                               remove validator in existing mainnet deployment
    --nodeID            string              node id of node to be added as validator in elastic subnet
    --output-tx-path    string              file path of the removeValidator tx
    --subnet-auth-keys  strings             control keys that will be used to authenticate removeValidator tx
    --testnet                               remove validator in existing testnet deployment (alias for `fuji`)
```

### Subnet Change Owner

The `subnet changeOwner` changes the owner of the deployed Subnet.

This command currently only works on Subnets deployed to Devnet, Fuji or Mainnet.

**Usage:**

```shell
  avalanche subnet changeOwner [subnetName] [flags]
```

**Flags:**

```shell
    --control-keys strings       addresses that may make subnet changes
    --devnet devnet              change subnet owner on devnet
    --endpoint string            use the given endpoint for network operations
-e, --ewoq                       use ewoq key [fuji/devnet]
    --fuji fuji                  change subnet owner on fuji (alias for `testnet`)
-h, --help                       help for changeOwner
-k, --key string                 select the key to use [fuji/devnet]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji/devnet)
    --ledger-addrs strings       use the given ledger addresses
    --local local                change subnet owner on local
    --mainnet mainnet            change subnet owner on mainnet
    --output-tx-path string      file path of the transfer subnet ownership tx
-s, --same-control-key           use the fee-paying key as control key
    --subnet-auth-keys strings   control keys that will be used to authenticate transfer subnet ownership tx
    --testnet testnet            change subnet owner on testnet (alias for `fuji`)
    --threshold uint32           required number of control key signatures to make subnet changes
```

### Subnet Configure

AvalancheGo nodes support several different configuration files. Subnets have their own
Subnet config which applies to all chains/VMs in the Subnet. Each chain within the Subnet
can have its own chain config. This command allows you to set both config files.

**Usage:**

```shell
avalanche subnet configure [subnetName] [flags]
```

**Flags:**

```shell
    --chain-config string            path to the chain configuration
-h, --help                           help for configure
    --per-node-chain-config string   path to per node chain configuration for local network
    --subnet-config string           path to the subnet configuration
```

### Subnet Create

The `subnet create` command builds a new genesis file to configure your Subnet.
By default, the command runs an interactive wizard. It walks you through
all the steps you need to create your first Subnet.

The tool supports deploying Subnet-EVM and custom VMs. You
can create a custom, user-generated genesis with a custom VM by providing
the path to your genesis and VM binaries with the `--genesis` and `--vm` flags.

By default, running the command with a `subnetName` that already exists
causes the command to fail. If you’d like to overwrite an existing
configuration, pass the `-f` flag.

**Usage:**

```shell
avalanche subnet create [subnetName] [flags]
```

**Flags:**

```shell
    --custom                          use a custom VM template
    --custom-vm-branch string         custom vm branch
    --custom-vm-build-script string   custom vm build-script
    --custom-vm-path string           file path of custom vm to use
    --custom-vm-repo-url string       custom vm repository url
    --evm                             use the Subnet-EVM as the base template
    --evm-chain-id uint               chain ID to use with Subnet-EVM
    --evm-defaults                    use default settings for fees/airdrop/precompiles with Subnet-EVM
    --evm-token string                token name to use with Subnet-EVM
-f, --force                           overwrite the existing configuration if one exists
    --from-github-repo                generate custom VM binary from github repository
    --genesis string                  file path of genesis to use
-h, --help                            help for create
    --latest                          use latest Subnet-EVM released version, takes precedence over --vm-version
    --pre-release                     use latest Subnet-EVM pre-released version, takes precedence over --vm-version
    --teleporter                      generate a teleporter-ready vm (default true)
    --vm string                       file path of custom vm to use. alias to custom-vm-path
    --vm-version string               version of Subnet-EVM template to use
```

### Subnet Delete

The `subnet delete` command deletes an existing Subnet configuration.

**Usage:**

```shell
avalanche subnet delete [flags]
```

**Flags:**

```shell
-h, --help help for delete
```

### Subnet Deploy

The `subnet deploy` command deploys your Subnet configuration locally, to Fuji Testnet, or to Mainnet.

At the end of the call, the command prints the RPC URL you can use to interact with the Subnet.

Avalanche-CLI only supports deploying an individual Subnet once per network. Subsequent
attempts to deploy the same Subnet to the same network (local, Fuji, Mainnet) aren't
allowed. If you'd like to redeploy a Subnet locally for testing, you must first call
[avalanche network clean](#network-clean) to reset all deployed chain state. Subsequent local
deploys redeploy the chain with fresh state. You can deploy the same Subnet to multiple
networks, so you can take your locally tested Subnet and deploy it on Fuji or Mainnet.

**Usage:**

```shell
avalanche subnet deploy [subnetName] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --avalanchego-path string      use this avalanchego binary path
    --avalanchego-version string   use this version of avalanchego (ex: v1.17.12) (default "latest")
    --control-keys strings         addresses that may make subnet changes
    --devnet                       deploy to a devnet network
    --endpoint string              use the given endpoint for network operations
-e, --ewoq                         use ewoq key [fuji/devnet deploy only]
-f, --fuji testnet                 deploy to fuji (alias to testnet
-h, --help                         help for deploy
-k, --key string                   select the key to use [fuji/devnet deploy only]
-g, --ledger                       use ledger instead of key (always true on mainnet, defaults to false on fuji/devnet)
    --ledger-addrs strings         use the given ledger addresses
-l, --local                        deploy to a local network
-m, --mainnet                      deploy to mainnet
    --mainnet-chain-id string      use different ChainID for mainnet deployment
    --output-tx-path string        file path of the blockchain creation tx
-s, --same-control-key             use creation key as control key
    --subnet-auth-keys strings     control keys that will be used to authenticate chain creation
-u, --subnet-id string             deploy into given subnet id
-t, --testnet fuji                 deploy to testnet (alias to fuji)
    --threshold uint32             required number of control key signatures to make subnet changes
```

<!-- markdownlint-enable MD013 -->

### Subnet Describe

The `subnet describe` command prints the details of a Subnet configuration to the console.
By default, the command prints a summary of the configuration. By providing the `--genesis`
flag, the command instead prints out the raw genesis file.

**Usage:**

```shell
avalanche subnet describe [subnetName] [flags]
```

**Flags:**

```shell
-g, --genesis   Print the genesis to the console directly instead of the summary
-h, --help      help for describe
```

### Subnet Export

The `subnet export` command write the details of an existing Subnet deploy to a file.

The command prompts for an output path. You can also provide one with
the `--output` flag.

**Usage:**

```shell
avalanche subnet export [subnetName] [flags]
```

**Flags:**

```shell
-h, --help            help for export
-o, --output string   write the export data to the provided file path
```

### Subnet Import

The `subnet import` command imports configurations into Avalanche-CLI.

This command supports importing from a file created on another computer,
or importing from Subnets running public networks
(for example, created manually or with the deprecated Subnet-CLI)

#### Import from a File

To import from a file, you can optionally provide the path as a command-line argument.
Alternatively, running the command without any arguments triggers an interactive wizard.
To import from a repository, go through the wizard. By default, an imported Subnet doesn't
overwrite an existing Subnet with the same name. To allow overwrites, provide the `--force`
flag.

**Usage:**

```shell
avalanche subnet import file [subnetPath] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --branch string   the repo branch to use if downloading a new repo
-f, --force           overwrite the existing configuration if one exists
-h, --help            help for import
    --repo string     the repo to import (ex: ava-labs/avalanche-plugins-core) or url to download the repo from
    --subnet string   the subnet configuration to import from the provided repo
```

<!-- markdownlint-enable MD013 -->

#### Import from a Public Network

The `subnet import public` command imports a Subnet configuration from a running network.

The genesis file should be available from the disk for this to work. By default, an imported Subnet
doesn't overwrite an existing Subnet with the same name. To allow overwrites, provide the `--force`
flag.

**Usage:**

```shell
avalanche subnet import public [subnetPath] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --custom                     use a custom VM template
    --evm                        import a subnet-evm
-f, --force                      overwrite the existing configuration if one exists
    --fuji fuji                  import from fuji (alias for `testnet`)
    --genesis-file-path string   path to the genesis file
-h, --help                       help for public
    --mainnet mainnet            import from mainnet
    --node-url string            [optional] URL of an already running subnet validator
    --subnet-id string           the subnet ID
    --testnet testnet            import from testnet (alias for `fuji`)

```

<!-- markdownlint-enable MD013 -->

### Subnet Join

The `subnet join` command configures your validator node to begin validating a new Subnet.

To complete this process, you must have access to the machine running your validator. If the
CLI is running on the same machine as your validator, it can generate or update your node's
config file automatically. Alternatively, the command can print the necessary instructions
to update your node manually. To complete the validation process, the Subnet's admins must add
the NodeID of your validator to the Subnet's allow list by calling `addValidator` with your
NodeID.

After you update your validator's config, you need to restart your validator manually. If
you provide the `--avalanchego-config` flag, this command attempts to edit the config file
at that path.

This command currently only supports Subnets deployed on the Fuji Testnet and Mainnet.

**Usage:**

```shell
avalanche subnet join [subnetName] [flags]
```

**Flags:**

```shell
    --avalanchego-config string   file path of the avalanchego config file
    --fail-if-not-validating      fail if whitelist check fails
    --force-whitelist-check       if true, force the whitelist check
    --force-write                 if true, skip to prompt to overwrite the config file
    --fuji fuji                   join on fuji (alias for `testnet`)
-h, --help                        help for join
    --mainnet mainnet             join on mainnet
    --nodeID string               set the NodeID of the validator to check
    --plugin-dir string           file path of avalanchego's plugin directory
    --print                       if true, print the manual config without prompting
    --skip-whitelist-check        if true, skip the whitelist check
    --testnet testnet             join on testnet (alias for `fuji`)
```

### Subnet List

The `subnet list` command prints the names of all created Subnet configurations. Without any flags,
it prints some general, static information about the Subnet. With the `--deployed` flag, the command
shows additional information including the VMID, BlockchainID and SubnetID.

**Usage:**

```shell
avalanche subnet list [flags]
```

**Flags:**

```shell
    --deployed   show additional deploy information
-h, --help       help for list
```

### Subnet Publish

The `subnet publish` command publishes the Subnet's VM to a repository.

**Usage:**

```shell
avalanche subnet publish [subnetName] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --alias string              We publish to a remote repo, but identify the repo locally under a user-provided alias (e.g. myrepo).
    --force                     If true, ignores if the subnet has been published in the past, and attempts a forced publish.
-h, --help                      help for publish
    --no-repo-path string       Do not let the tool manage file publishing, but have it only generate the files and put them in the location given by this flag.
    --repo-url string           The URL of the repo where we are publishing
    --subnet-file-path string   Path to the Subnet description file. If not given, a prompting sequence will be initiated.
    --vm-file-path string       Path to the VM description file. If not given, a prompting sequence will be initiated.
```

<!-- markdownlint-enable MD013 -->

### Subnet Stats

The `subnet stats` command prints validator statistics for the given Subnet.

**Usage:**

```shell
avalanche subnet stats [subnetName] [flags]
```

**Flags:**

```shell
    --fuji fuji         print stats on fuji (alias for `testnet`)
-h, --help              help for stats
    --mainnet mainnet   print stats on mainnet
    --testnet testnet   print stats on testnet (alias for `fuji`)
```

### Subnet VMID

The `subnet vmid` command prints the virtual machine ID (VMID) for the given Subnet.

**Usage:**

```shell
avalanche subnet vmid [subnetName]
```

## Elastic Subnet

### Transforms permissioned Subnet into Elastic Subnet

This command transforms your permissioned Subnet into an Elastic Subnet (NOTE: this action is irreversible).

**Usage:**

```shell
avalanche subnet elastic [subnetName] [flags]
```

**Flags:**

```shell
    --default                               If true, use default elastic subnet config values
    --denonimation      int                 specify the token denomination (for Fuji and Mainnet only)
    --force                                 If true, override transform into elastic subnet warning
    --fuji                                  elastic subnet transform existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 elastic subnet transform existing local deployment
    --mainnet                               elastic subnet transform existing mainnet deployment
    --output-tx-path    string              file path of the transformSubnet tx
    --stake-amount      int                 amount of tokens to stake on validator
    --staking-period    string              how long validator validates for after start time
    --start-time        string              when validator starts validating (format as "2006-01-02 15:00:00")
    --subnet-auth-keys  strings             control keys that will be used to authenticate transformSubnet tx
    --testnet                               elastic subnet transform existing testnet deployment (alias for `fuji`)
    --tokenName         string              specify the token name
    --tokenSymbol       string              specify the token symbol
    --transform-validators                  If true, transform validators to permissionless validators after elastic transform
```

### Add Permissionless Validator in an Elastic Subnet

This command adds a node as a permissionless validator in an Elastic Subnet.

**Usage:**

```shell
avalanche subnet join [subnetName] --elastic [flags]
```

**Flags:**

```shell
    --fuji                                  add permissionless validator in existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 add permissionless validator in existing local deployment
    --mainnet                               add permissionless validator in existing mainnet deployment
    --nodeID            string              node id of node to be added as validator in elastic subnet
    --stake-amount      int                 amount of tokens to stake on validator
    --staking-period    string              how long validator validates for after start time
    --start-time        string              when validator starts validating (format as "2006-01-02 15:00:00")
    --testnet                               add permissionless validator in existing testnet deployment (alias for `fuji`)
```

### Add Permissionless Delegator in an Elastic Subnet

This command delegates stake to a permissionless validator in an Elastic Subnet.

**Usage:**

```shell
avalanche subnet addPermissionlessDelegator [subnetName] [flags]
```

**Flags:**

```shell
    --fuji                                  add permissionless delegator in existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 add permissionless delegator in existing local deployment
    --mainnet                               add permissionless delegator in existing mainnet deployment
    --nodeID            string              node id of node to be added as validator in elastic subnet
    --stake-amount      int                 amount of tokens to delegate to validator
    --staking-period    string              how long to delegate for after start time
    --start-time        string              when to starts delegating (format as "2006-01-02 15:00:00")
    --testnet                               add permissionless delegator in existing testnet deployment (alias for `fuji`)
```

## Subnet Upgrade

The `subnet upgrade` command suite provides a collection of tools for
updating your developmental and deployed Subnets.

### Subnet Upgrade Apply

Apply generated upgrade bytes to running Subnet nodes to trigger a network upgrade.

For public networks (Fuji Testnet or Mainnet), to complete this process, you must have access to the
machine running your validator. If the CLI is running on the same machine as your validator, it can
manipulate your node's configuration automatically. Alternatively, the command can print the
necessary instructions to upgrade your node manually.

After you update your validator's configuration, you need to restart your validator manually. If you
provide the `--avalanchego-chain-config-dir` flag, this command attempts to write the upgrade file
at that path. Refer to [this doc](/nodes/configure/chain-configs/chain-config-flags.md#subnet-chain-configs) for
related documentation.

**Usage:**

```shell
avalanche subnet upgrade apply [subnetName] [flags]
```

**Flags:**

```shell
    --avalanchego-chain-config-dir string   avalanchego's chain config file directory (default "/Users/connor/.avalanchego/chains")
    --config                                create upgrade config for future subnet deployments (same as generate)
    --force                                 If true, don't prompt for confirmation of timestamps in the past
    --fuji fuji                             apply upgrade existing fuji deployment (alias for `testnet`)
-h, --help                                  help for apply
    --local local                           apply upgrade existing local deployment
    --mainnet mainnet                       apply upgrade existing mainnet deployment
    --print                                 if true, print the manual config without prompting (for public networks only)
    --testnet testnet                       apply upgrade existing testnet deployment (alias for `fuji`)
```

### Subnet Upgrade Export

Export the upgrade bytes file to a location of choice on disk.

**Usage:**

```shell
avalanche subnet upgrade export [subnetName] [flags]
```

**Flags:**

```shell
    --force                     If true, overwrite a possibly existing file without prompting
-h, --help                      help for export
    --upgrade-filepath string   Export upgrade bytes file to location of choice on disk
```

### Subnet Upgrade Generate

The `subnet upgrade generate` command builds a new upgrade.json file to customize your Subnet. It
guides the user through the process using an interactive wizard.

**Usage:**

```shell
avalanche subnet upgrade generate [subnetName] [flags]
```

**Flags:**

```shell
-h, --help   help for generate
```

### Subnet Upgrade Import

Import the upgrade bytes file into the local environment.

**Usage:**

```shell
avalanche subnet upgrade import [subnetName] [flags]
```

**Flags:**

```shell
-h, --help                      help for import
    --upgrade-filepath string   Import upgrade bytes file into local environment
```

### Subnet Upgrade Print

Print the upgrade.json file content.

**Usage:**

```shell
avalanche subnet upgrade print [subnetName] [flags]
```

**Flags:**

```shell
-h, --help       help for list
```

### Subnet Upgrade VM

The `subnet upgrade vm` command enables the user to upgrade their Subnet's VM binary. The command
can upgrade both local Subnets and publicly deployed Subnets on Fuji and Mainnet.

The command walks the user through an interactive wizard. The user can skip the wizard by providing
command line flags.

**Usage:**

```shell
avalanche subnet upgrade export [subnetName] [flags]
```

**Flags:**

```shell
    --deployed   show additional deploy information
-h, --help       help for list
```

## Node

The `node` command suite provides a collection of tools for creating and maintaining
validators on the Avalanche Network.

To get started, use the node create command wizard to walk through the
configuration to make your node a primary validator on Avalanche public network. You can use the
rest of the commands to maintain your node and make your node a Subnet Validator.

### Node Create

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node create` command sets up a validator on a cloud server of your choice.
The validator will be validating the Avalanche Primary Network and Subnet
of your choice. By default, the command runs an interactive wizard. It
walks you through all the steps you need to set up a validator.
Validators can be deployed in multiple regions/zones simultaneously.
Once this command is run, you will have to wait for the validator
to finish bootstrapping on the primary network before running further
commands on it, for example validating a Subnet. You can check the bootstrapping
status by running `avalanche node status`.

The created node will be part of group of validators called `<clusterName>`
and users can call node commands with `<clusterName>` so that the command
will apply to all nodes in the cluster.

**Usage:**

```shell
  avalanche node create [clusterName] [flags]
```

**Flags:**

```shell
    --alternative-key-pair-name string                key pair name to use if default one generates conflicts
    --authorize-access bool                           authorize CLI to create cloud resources
    --avalanchego-version-from-subnet string          install latest avalanchego version, that is compatible with the given subnet, on node/s
    --aws bool                                        create node/s in AWS cloud
    --aws-iops int                                    AWS iops (for gp3, io1, and io2 volume types only, defaults to respective default iops values for gp3, io1, and io2 volume types)
    --aws-profile string                              AWS profile to use (defaults to "default")
    --aws-throughput int                              AWS throughput in MiB/s (for gp3 volume type only, defaults to default throughput value for gp3 volume type)
    --aws-volume-type string                          AWS volume type (defaults to gp3)
    --aws-volume-size int                             AWS volume size in GB (defaults to 1000 GB)
    --custom-avalanchego-version string               install given avalanchego version on node/s
    --devnet bool                                     create node/s in Devnet
    --devnet-api-nodes int                            number of API nodes(nodes without stake) to create in the new Devnet
    --enable-monitoring bool                          set up Prometheus monitoring for created nodes (defaults to false). Please note that this option creates a separate monitoring instance and incurs additional cost
    --fuji bool                                       create node/s in Fuji Network
    --gcp bool                                        create node/s in GCP cloud
    --gcp-credentials string                          use given GCP credentials
    --gcp-project string                              use given GCP project
    --grafana-pkg string                              use provided grafana pkg instead of apt repo (default), for example https://dl.grafana.com/oss/release/grafana_10.4.1_amd64.deb
-h, --help                                            help for create
    --latest-avalanchego-pre-release-version bool     install latest avalanchego pre-release version on node/s
    --latest-avalanchego-version bool                 install latest avalanchego release version on node/s
    --node-type string                                cloud instance type. Use 'default' to use recommended default instance type
    --num-validators ints                             number of nodes to create per region(s). Use comma to separate multiple numbers for each region in the same order as --region flag
    --num-apis strings                                number of API nodes(nodes without stake) to create (for Devnet only)
    --relayer bool                                    run AWM relayer when deploying the vm
    --region strings                                  create node(s) in given region(s). Use comma to separate multiple regions
    --ssh-agent-identity string                       use given ssh identity(only for ssh agent). If not set, default will be used
    --teleporter bool                                 generate a teleporter-ready vm (defaults to false)
    --use-ssh-agent bool                              use ssh agent(ex: Yubikey) for ssh auth
    --use-static-ip bool                              attach static Public IP on cloud servers (default true)
```

### Node Destroy

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node destroy` command terminates all running nodes in a cluster

**Usage:**

```shell
  avalanche node destroy [clusterName] [flags]
```

**Flags:**

```shell
    --authorize-access        authorize CLI to release cloud resources
    --authorize-remove        authorize CLI to remove all local files related to cloud nodes
    --authorize-all           authorize all CLI requests
    --aws-profile string      aws profile to use
-h, --help   help for stop
```

### Node Devnet

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node devnet` command suite provides a collection of commands related to devnets.
You can check the updated status by calling avalanche node status `<clusterName>`

### Node Devnet Deploy

The `node devnet deploy` command deploys a Subnet into a devnet cluster, creating Subnet and blockchain TXs for it.
It saves the deploy info both locally and remotely.

**Usage:**

```shell
  avalanche node devnet deploy [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
-h, --help   help for list
```

### Node Devnet Wiz

The `node devnet wiz` command creates a devnet and deploys, sync and validate a Subnet into it. It creates the Subnet if so needed.

**Usage:**

```shell
  avalanche node devnet wiz [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
    --add-grafana-dashboard string                    path to additional grafana dashboard json file
    --alternative-key-pair-name string                key pair name to use if default one generates conflicts
    --authorize-access bool                           authorize CLI to create cloud resources
    --aws bool                                        create node/s in AWS cloud
    --aws-iops int                                    AWS iops (for gp3, io1, and io2 volume types only, defaults to respective default iops values for gp3, io1, and io2 volume types)
    --aws-profile string                              AWS profile to use (defaults to "default")
    --aws-throughput int                              AWS throughput in MiB/s (for gp3 volume type only, defaults to default throughput value for gp3 volume type)
    --aws-volume-type string                          AWS volume type (defaults to gp3)
    --aws-volume-size int                             AWS volume size in GB (defaults to 1000 GB)
    --chain-config string                             path to the chain configuration for subnet
    --custom-avalanchego-version string               install given avalanchego version on node/s
    --custom-subnet bool                              use a custom VM as the subnet virtual machine
    --custom-vm-branch string                         custom vm branch
    --custom-vm-build-script string                   custom vm build-script
    --custom-vm-repo-url string                       custom vm repository url
    --default-validator-params bool                   use default weight/start/duration params for subnet validator
    --devnet-api-nodes int                            number of API nodes (nodes without stake) to create in the new Devnet
    --enable-monitoring bool                          set up Prometheus monitoring for created nodes (defaults to false). Please note that this option creates a separate monitoring instance and incurs additional cost
    --evm-chain-id uint                               chain ID to use with Subnet-EVM
    --evm-defaults bool                               use default settings for fees/airdrop/precompiles with Subnet-EVM
    --evm-subnet bool                                 use Subnet-EVM as the subnet virtual machine
    --evm-token string                                token name to use with Subnet-EVM
    --evm-version string                              version of Subnet-EVM to use
    --force-subnet-create                             overwrite the existing subnet configuration if one exists
    --gcp bool                                        create node/s in GCP cloud
    --gcp-credentials string                          use given GCP credentials
    --gcp-project string                              use given GCP project
    --grafana-pkg string                              use provided grafana pkg instead of apt repo (default), for example https://dl.grafana.com/oss/release/grafana_10.4.1_amd64.deb
-h, --help                                            help for wiz
    --latest-avalanchego-pre-release-version bool     install latest avalanchego pre-release version on node/s
    --latest-avalanchego-version bool                 install latest avalanchego release version on node/s
    --latest-evm-version bool                         use latest Subnet-EVM released version
    --latest-pre-released-evm-version bool            use latest Subnet-EVM pre-released version
    --num-apis strings                                number of API nodes(nodes without stake) to create in the new Devnet
    --node-config string                              path to avalanchego node configuration for subnet
    --node-type string                                cloud instance type. Use 'default' to use recommended default instance type
    --num-validators ints                             number of nodes to create per region(s). Use comma to separate multiple numbers for each region in the same order as --region flag
    --relayer bool                                    run AWM relayer when deploying the vm (defaults to false)
    --region strings                                  create node/s in given region(s). Use comma to separate multiple regions
    --remote-cli-version string                       install given CLI version on remote nodes. defaults to latest CLI release
    --ssh-agent-identity string                       use given ssh identity(only for ssh agent). If not set, default will be used.
    --subnet-config string                            path to the subnet configuration for subnet
    --subnet-genesis string                           file path of the subnet genesis
    --teleporter bool                                 generate a teleporter-ready vm (defaults to false)
    --use-ssh-agent bool                              use ssh agent for ssh
    --use-static-ip bool                              attach static Public IP on cloud servers (defaults to true)
    --validators strings                              deploy subnet into given comma separated list of validators (defaults to all cluster nodes)
```

### Node Export

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node export` command exports cluster configuration and its nodes config to a text file.

If no file is specified, the configuration is printed to the stdout.

Use `--include-secrets` to include keys in the export. In this case this command can be used to backup your cluster
configuration. Please keep the file secure as it contains sensitive information.

Exported cluster configuration without secrets can be imported by another user using `node import` command.


**Usage:**

```shell
  avalanche node export [clusterName] [flags]

Flags:
      --file string       specify the file to export the cluster configuration to
      --force             overwrite the file if it exists
  -h, --help              help for export
      --include-secrets   include keys in the export
```

### Node Import

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node import` command imports cluster configuration and its nodes configuration from a text file
created from the `node export` command.

Prior to calling this command, call `node whitelist` command to have your SSH public key and IP whitelisted by
the cluster owner. This will enable you to use `avalanche-cli` commands to manage the imported cluster.

Please note, that this imported cluster will be considered as EXTERNAL by `avalanche-cli`, so some commands
affecting cloud nodes like `node create` or `node destroy` will be not applicable to it.


**Usage:**

```shell
  avalanche node import [clusterName] [flags]

Flags:
      --file string   specify the file to export the cluster configuration to
  -h, --help          help for import
```

### Node List

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node list` command lists all clusters together with their nodes.

**Usage:**

```shell
  avalanche node list [flags]
```

**Flags:**

```shell
-h, --help   help for list
```

### Node Load Test Start

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

For Devnet Only. 

The `node loadtest start` command starts load testing for an existing devnet cluster. If the cluster does
not have an existing load test host, the command creates a separate cloud server and builds the load
test binary based on the provided load test Git Repo URL and load test binary build command.

The command will then run the load test binary based on the provided load test run command.

**Usage:**

```shell
  avalanche node loadtest start [loadtestName] [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
      --authorize-access bool           authorize CLI to create cloud resources
      --aws bool                        create loadtest node in AWS cloud
      --aws-profile string              aws profile to use
      --gcp bool                        create loadtest node in GCP cloud
  -h, --help                            help for loadtest start
      --load-test-branch string         load test branch or commit
      --load-test-build-cmd string      command to build load test binary
      --load-test-cmd string            command to run load test
      --load-test-repo string           load test repo url to use
      --node-type string                cloud instance type for loadtest script
      --region string                   create load test node in a given region
      --ssh-agent-identity string       use given ssh identity(only for ssh agent). If not set, default will be used
      --use-ssh-agent bool              use ssh agent(ex: Yubikey) for ssh auth
```

### Node Load Test Stop

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

For Devnet Only. 

The `node loadtest stop` command stops load testing for an existing devnet cluster and terminates the
separate cloud server created to host the load test.

**Usage:**

```shell
  avalanche node loadtest stop [clusterName] [flags]
```

**Flags:**

```shell
  -h, --help                 help for loadtest stop
      --load-test string     stop specified load test node(s). Use comma to separate multiple load test instance names
```

### Node Resize

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node resize` command can be used to change amount of CPU, memory and disk space available for the cluster nodes.

Please note that while disk is being resized, disk performance might be affected.
In addition, instance resize operation will replace cluster instances sequentially, which might affect cluster stability.


**Usage:**

```shell
  avalanche node resize [clusterName] [flags]

Flags:
      --aws-profile string   aws profile to use (default "default")
      --disk-size string     Disk size to resize in Gb (e.g. 1000Gb)
  -h, --help                 help for resize
      --node-type string     Node type to resize (e.g. t3.2xlarge)
```

### Node Ssh

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node ssh` command execute a given command using ssh on all nodes in the cluster.
If no command is given, just prints the ssh command line to be used to connect to each node.

**Usage:**

```shell
  avalanche node ssh [clusterName] [flags]
```

**Flags:**

```shell
-h, --help            help for status
```

### Node Status

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node status` command gets the bootstrap status of all nodes in a cluster
with the Primary Network.
If no cluster is given, defaults to node list behaviour.

To get the bootstrap status of a node with a Subnet, use the `--subnet` flag.

**Usage:**

```shell
  avalanche node status [clusterName] [flags]
```

**Flags:**

```shell
-h, --help            help for status
      --subnet string   specify the subnet the node is syncing with
```

### Node Sync

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node sync` command enables all nodes in a cluster to be bootstrapped to a Subnet.
You can check the Subnet bootstrap status by calling avalanche `node status <clusterName> --subnet <subnetName>`

**Usage:**

```shell
  avalanche node sync [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
-h, --help   help for sync
```

### Node Update

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node update` command suite provides a collection of commands for nodes to update
their AvalancheGo version or VM version/config.
You can check the status after update by calling `avalanche node status`

### Node Update Subnet

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node update subnet` command updates all nodes in a cluster with latest Subnet configuration and
You can check the updated Subnet bootstrap status by calling avalanche
`node status <clusterName> --subnet <subnetName>`

**Usage:**

```shell
  avalanche node update subnet [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
-h, --help   help for subnet
```

### Node Validate

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node validate` command suite provides a collection of commands for nodes to join
the Primary Network and Subnets as validators.
If any of the commands is run before the nodes are bootstrapped on the Primary Network, the command
will fail. You can check the bootstrap status by calling `avalanche node status <clusterName>`.

### Node Validate Primary

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node validate primary` command enables all nodes in a cluster to be validators of Primary
Network.

**Usage:**

```shell
  avalanche node validate primary [clusterName] [flags]
```

**Flags:**

```shell
-f, --fuji testnet              set up validator in fuji (alias to testnet
-h, --help                      help for primary
-k, --key string                select the key to use [fuji only]
-g, --ledger                    use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs strings      use the given ledger addresses
-m, --mainnet                   set up validator in mainnet
    --stake-amount uint         how many AVAX to stake in the validator
    --staking-period duration   how long validator validates for after start time
-t, --testnet fuji              set up validator in testnet (alias to fuji)
```

### Node Validate Subnet

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node validate subnet` command enables all nodes in a cluster to be validators of a Subnet.
If the command is run before the nodes are Primary Network validators, the command will first
make the nodes Primary Network validators before making them Subnet validators.
If The command is run before the nodes are bootstrapped on the Primary Network, the command
will fail.
You can check the bootstrap status by calling `avalanche node status <clusterName>`.
If The command is run before the nodes are synced to the Subnet, the command will fail.
You can check the Subnet sync status by calling `avalanche node status <clusterName> --subnet <subnetName>`.

**Usage:**

```shell
  avalanche node validate subnet [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
    --default-validator-params   use default weight/start/duration params for subnet validator
-d, --devnet                     set up validator in devnet
    --endpoint string            use the given endpoint for network operations
-e, --ewoq                       use ewoq key [fuji/devnet only]
-f, --fuji testnet               set up validator in fuji (alias to testnet
-h, --help                       help for subnet
-k, --key string                 select the key to use [fuji/devnet only]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji/devnet)
    --ledger-addrs strings       use the given ledger addresses
-m, --mainnet                    set up validator in mainnet
    --stake-amount uint          how many AVAX to stake in the validator
    --staking-period duration    how long validator validates for after start time
    --start-time string          UTC start time when this validator starts validating, in 'YYYY-MM-DD HH:MM:SS' format
-t, --testnet fuji               set up validator in testnet (alias to fuji)
```

### Node Whitelist

:::warning

(ALPHA Warning) This command is currently in experimental mode.

:::

The `node whitelist` command suite provides a collection of tools for granting access to the cluster.

Nodes created by `Avalanche-CLI` are protected by Cloud Security Group and only defined IP addresses
are allowed to access. User IP is whitelisted automatically when cluster is created, but this command can be used in
case of IP address changes or granting access to additional IPs. This command detects user current IP address automatically
if no IP address is provided.

Secure SSH protocol is used to communicate with cloud instances. `node whitelist` command authorizes the provided SSH public key on all nodes in the cluster if --ssh params is specified.

**Usage:**

```shell
  avalanche node whitelist <clusterName> [--ip <IP>] [--ssh "<sshPubKey>"] [flags]
```

**Flags:**

```shell
  -h, --help         help for whitelist
      --ip string    ip address to whitelist
      --ssh string   ssh public key to whitelist
```

## Network

The `network` command suite provides a collection of tools for managing local Subnet
deployments.

When you deploy a Subnet locally, it runs on a local, multi-node Avalanche network. The
`subnet deploy` command starts this network in the background. This command suite allows you
to shutdown, restart, and clear that network.

This network currently supports multiple, concurrently deployed Subnets.

### Network Clean

The `network clean` command shuts down your local, multi-node network. All deployed Subnets
shutdown and delete their state. You can restart the network by deploying a new Subnet
configuration.

**Usage:**

```shell
avalanche network clean [flags]
```

**Flags:**

```shell
    --hard   Also clean downloaded avalanchego and plugin binaries
-h, --help   help for clean
```

### Network Start

The `network start` command starts a local, multi-node Avalanche network on your machine.

By default, the command loads the default snapshot. If you provide the `--snapshot-name`
flag, the network loads that snapshot instead. The command fails if the local network is
already running.

**Usage:**

```shell
avalanche network start [flags]
```

**Flags:**

```shell
    --avalanchego-path string      use this avalanchego binary path
    --avalanchego-version string   use this version of avalanchego (ex: v1.17.12) (default "latest")
-h, --help                         help for start
    --snapshot-name string         name of snapshot to use to start the network from (default "default-1654102509")
```

### Network Status

The `network status` command prints whether or not a local Avalanche network is running and
some basic stats about the network.

**Usage:**

```shell
avalanche network status [flags]
```

**Flags:**

```shell
-h, --help   help for status
```

### Network Stop

The `network stop` command shuts down your local, multi-node network.

All deployed Subnets shutdown gracefully and save their state. If you provide the
`--snapshot-name` flag, the network saves its state under this named snapshot. You can
reload this snapshot with `network start --snapshot-name <snapshotName>`. Otherwise, the
network saves to the default snapshot, overwriting any existing state. You can reload the
default snapshot with `network start`.

**Usage:**

```shell
avalanche network stop [flags]
```

**Flags:**

```shell
-h, --help                   help for stop
    --snapshot-name string   name of snapshot to use to save network state into (default "default-1654102509")
```

## Transaction

The `transaction` command suite provides all of the utilities required to sign multisig transactions.

### Transaction Commit

The `transaction commit` command commits a transaction by submitting it to the P-Chain.

**Usage:**

```shell
avalanche transaction commit [subnetName] [flags]
```

**Flags:**

```shell
-h, --help                       help for commit
    --input-tx-filepath string   Path to the transaction signed by all signatories
```

### Transaction Sign

The `transaction sign` command signs a multisig transaction.

**Usage:**

```shell
avalanche transaction sign [subnetName] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
-h, --help                       help for sign
    --input-tx-filepath string   Path to the transaction file for signing
-k, --key string                 select the key to use [fuji only]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs strings       use the given ledger addresses
```

<!-- markdownlint-enable MD013 -->

## Key

The `key` command suite provides a collection of tools for creating and managing
signing keys. You can use these keys to deploy Subnets to the Fuji Testnet,
but these keys are NOT suitable to use in production environments. DO NOT use
these keys on Mainnet.

To get started, use the `key create` command.

### Key Create

The `key create` command generates a new private key to use for creating and controlling
test Subnets. Keys generated by this command are NOT cryptographically secure enough to
use in production environments. DO NOT use these keys on Mainnet.

The command works by generating a secp256 key and storing it with the provided `keyName`. You
can use this key in other commands by providing this `keyName`.

If you'd like to import an existing key instead of generating one from scratch, provide the
`--file` flag.

**Usage:**

```shell
avalanche key create [keyName] [flags]
```

**Flags:**

```shell
    --file string   import the key from an existing key file
-f, --force         overwrite an existing key with the same name
-h, --help          help for create
```

### Key Delete

The `key delete` command deletes an existing signing key.

To delete a key, provide the `keyName`. The command prompts for confirmation
before deleting the key. To skip the confirmation, provide the `--force` flag.

**Usage:**

```shell
avalanche key delete [keyName] [flags]
```

**Flags:**

```shell
-f, --force   delete the key without confirmation
-h, --help    help for delete
```

### Key Export

The `key export` command exports a created signing key. You can use an exported key in other
applications or import it into another instance of Avalanche-CLI.

By default, the tool writes the hex encoded key to stdout. If you provide the `--output`
flag, the command writes the key to a file of your choosing.

**Usage:**

`avalanche key export [keyName] [flags]`

**Flags:**

```shell
-h, --help            help for export
-o, --output string   write the key to the provided file path
```

### Key List

The `key list` command prints information for all stored signing
keys or for the ledger addresses associated to certain indices.

**Usage:**

```shell
avalanche key list [flags]
```

**Flags:**

```shell
-a, --all-networks    list all network addresses
-c, --cchain          list C-Chain addresses (default true)
-f, --fuji            list testnet (fuji) network addresses
-h, --help            help for list
-g, --ledger uints    list ledger addresses for the given indices (default [])
-l, --local           list local network addresses
-m, --mainnet         list mainnet network addresses
    --pchain          list P-Chain addresses (default true)
    --subnet string   provide balance information for the given subnet (Subnet-Evm based only)
-t, --testnet         list testnet (fuji) network addresses
-n, --use-nano-avax   use nano Avax for balances
    --xchain          list X-Chain addresses (default true)
```

### Key Transfer

The `key transfer` command allows to transfer funds between stored keys or ledger addresses.

**Usage:**

```shell
avalanche key transfer [options] [flags]
```

**Flags:**

```shell
-o, --amount float                 amount to send or receive (AVAX units)
-f, --force                        avoid transfer confirmation
-u, --fuji                         transfer between testnet (fuji) addresses
    --fund-p-chain                 fund P-Chain account on target
    --fund-x-chain                 fund X-Chain account on target
-h, --help                         help for transfer
-k, --key string                   key associated to the sender or receiver address
-i, --ledger uint32                ledger index associated to the sender or receiver address (default 32768)
-l, --local                        transfer between local network addresses
-m, --mainnet                      transfer between mainnet addresses
-g, --receive                      receive the transfer
-r, --receive-recovery-step uint   receive step to use for multiple step transaction recovery
-s, --send                         send the transfer
-a, --target-addr string           receiver address
-t, --testnet                      transfer between testnet (fuji) addresses
```
