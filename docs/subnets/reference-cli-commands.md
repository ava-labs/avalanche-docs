# Avalanche-CLI Commands

Avalanche-CLI is a command-line tool that gives developers access to
everything Avalanche. This release specializes in helping developers
build and test Subnets.

To get started, look at the documentation for the subcommands or jump right
in with `avalanche subnet create myNewSubnet`.

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
    --fuji fuji                  join on fuji (alias for `testnet`)
-h, --help                       help for addValidator
-k, --key string                 select the key to use [fuji deploy only]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs strings       use the given ledger addresses
    --mainnet mainnet            join on mainnet
    --nodeID string              set the NodeID of the validator to add
    --output-tx-path string      file path of the add validator tx
    --staking-period duration    how long this validator will be staking
    --start-time string          UTC start time when this validator starts validating, in 'YYYY-MM-DD HH:MM:SS' format
    --subnet-auth-keys strings   control keys that will be used to authenticate add validator tx
    --testnet testnet            join on testnet (alias for `fuji`)
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
    --custom              use a custom VM template
    --evm                 use the SubnetEVM as the base template
-f, --force               overwrite the existing configuration if one exists
    --genesis string      file path of genesis to use
-h, --help                help for create
    --latest              use latest VM version, takes precedence over --vm-version
    --vm string           file path of custom vm to use
    --vm-version string   version of vm template to use
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
    --avalanchego-version string   use this version of avalanchego (ex: v1.17.12) (default "latest")
    --control-keys strings         addresses that may make subnet changes
-f, --fuji testnet                 deploy to fuji (alias to testnet
-h, --help                         help for deploy
-k, --key string                   select the key to use [fuji deploy only]
-g, --ledger                       use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs strings         use the given ledger addresses
-l, --local                        deploy to a local network
-m, --mainnet                      deploy to mainnet
    --output-tx-path string        file path of the blockchain creation tx
-s, --same-control-key             use creation key as control key
    --subnet-auth-keys strings     control keys that will be used to authenticate chain creation
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
at that path. Refer to [this doc](../nodes/maintain/chain-config-flags.md#subnet-chain-configs) for
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
-a, --all-networks   list all network addresses
-c, --cchain         list C-Chain addresses (default true)
-f, --fuji           list testnet (fuji) network addresses
-h, --help           help for list
-g, --ledger uints   list ledger addresses for the given indices (default [])
-l, --local          list local network addresses
-m, --mainnet        list mainnet network addresses
-t, --testnet        list testnet (fuji) network addresses
```
