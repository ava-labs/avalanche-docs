# Avalanche-CLI Commands

## Subnet

The subnet command suite provides a collection of tools for developing
and deploying subnets.

To get started, use the subnet create command wizard to walk through the
configuration of your very first subnet. Then, go ahead and deploy it
with the subnet deploy command. You can use the rest of the commands to
manage your subnet configurations and live deployments.

### addValidator

The subnet addValidator command whitelists a primary network validator to
validate the provided deployed subnet.

To add the validator to the subnet's allow list, you first need to provide
the subnetName and the validator's unique NodeID. The command then prompts
for the validation start time, duration and stake weight. These values can
all be collected with flags instead of prompts.

This command currently only works on subnets deployed to either the Fuji testnet or Mainnet.

**Usage:**

`avalanche subnet addValidator [subnetName] [flags]`

**Flags:**

```
    --fuji fuji join on fuji (alias for `testnet`)
-h, --help help for addValidator
-k, --key string select the key to use [fuji deploy only]
-g, --ledger use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --mainnet mainnet join on mainnet
    --nodeID string set the NodeID of the validator to add
    --output-tx-path string file path of the add validator tx
    --staking-period duration how long this validator will be staking
    --start-time string UTC start time when this validator starts validating, in 'YYYY-MM-DD HH:MM:SS' format
    --subnet-auth-keys strings control keys that will be used to authenticate add validator tx
    --testnet testnet join on testnet (alias for `fuji`)
    --weight uint set the staking weight of the validator to add
```

### configure

Avalanchego nodes can be configured at different levels.
For example, subnets have their own subnet config (applies to all chains/VMs in the subnet).
And each chain or VM can have its own specific chain config file.
This command allows to set both config files.

**Usage:**

`avalanche subnet configure [subnetName] [flags]`

**Flags:**

```
    --chain-config string    path to the chain configuration
-h, --help                   help for configure
    --subnet-config string   path to the subnet configuration
```

### create

The subnet create command builds a new genesis file to configure your subnet.
The command is structured as an interactive wizard. It will walk you through
all the steps you need to create your first subnet.

The tool supports deploying Subnet-EVM, SpacesVM, and custom vms. You
can create a custom, user-generated genesis with a custom vm by providing
the path to your genesis and vm binarires with the --genesis and --vm flags.

By default, running the command with a subnetName that already exists will
cause the command to fail. If you’d like to overwrite an existing
configuration, pass the -f flag.

**Usage:**

`avalanche subnet create [subnetName] [flags]`

**Flags:**

```
    --custom              use a custom VM template
    --evm                 use the SubnetEVM as the base template
-f, --force               overwrite the existing configuration if one exists
    --genesis string      file path of genesis to use
-h, --help                help for create
    --latest              use latest VM version, takes precedence over --vm-version
    --spacesvm            use the SpacesVM as the base template
    --vm string           file path of custom vm to use
    --vm-version string   version of vm template to use
```

### delete

The subnet delete command deletes an existing Subnet configuration.

**Usage:**

`avalanche subnet delete [flags]`

**Flags:**

```
-h, --help help for delete
```

### deploy

The subnet deploy command deploys your subnet configuration locally, to
Fuji Testnet, or to Mainnet.

At the end of the call, the command will print the RPC URL you can use
to interact with the subnet.

Subnets may only be deployed once. Subsequent calls of deploy to the
same network (local, Fuji, Mainnet) are not allowed. If you'd like to
redeploy a subnet locally for testing, you must first call [avalanche
network clean](#clean) to reset all deployed chain state. Subsequent local
deploys will redeploy the chain with fresh state. The same subnet can
be deployed to multiple networks, so you can take your locally tested
subnet and deploy it on Fuji or Mainnet.

**Usage:**

`avalanche subnet deploy [subnetName] [flags]`

**Flags:**

```
    --avalanchego-version string   use this version of avalanchego (ex: v1.17.12) (default "latest")
    --control-keys strings         addresses that may make subnet changes
-f, --fuji testnet                 deploy to fuji (alias to testnet
-h, --help                         help for deploy
-k, --key string                   select the key to use [fuji deploy only]
-g, --ledger                       use ledger instead of key (always true on mainnet, defaults to false on fuji)
-l, --local                        deploy to a local network
-m, --mainnet                      deploy to mainnet
    --output-tx-path string        file path of the blockchain creation tx
-s, --same-control-key             use creation key as control key
    --subnet-auth-keys strings     control keys that will be used to authenticate chain creation
-t, --testnet fuji                 deploy to testnet (alias to fuji)
    --threshold uint32             required number of control key signatures to make subnet changes
```

### describe

The subnet describe command prints the details of a subnet configuration
to the console. By default, the command will print a summary of the
configuration. By providing the --genesis flag, the command will instead
print out the raw genesis file.

**Usage:**

`avalanche subnet describe [subnetName] [flags]`

**Flags:**

```
-g, --genesis   Print the genesis to the console directly instead of the summary
-h, --help      help for describe
```

### export

The subnet export command prints the details of an existing subnet deploy.

The command prompts for an output filename. You can also provide one with
the --output flag.

**Usage:**

`avalanche subnet export [subnetName] [flags]`

**Flags:**

```
-h, --help            help for export
-o, --output string   write the export data to the provided file path
```

### import

The subnet import command will import a subnet configuration from a file or a git repository.

To import from a file, you can optionally provide the filepath as a command line argument.
Alternatively, running the command without any arguments will trigger an interactive wizard.
To import from a repo, go through the wizard. By default, an imported subnet will not
overwrite an existing subnet with the same name. To allow overwrites, provide the --force
flag.

**Usage:**

`avalanche subnet import [subnetPath] [flags]`

**Flags:**

```
    --branch string   the repo branch to use if downloading a new repo
-f, --force           overwrite the existing configuration if one exists
-h, --help            help for import
    --repo string     the repo to import (ex: ava-labs/avalanche-plugins-core) or url to download the repo from
    --subnet string   the subnet configuration to import from the provided repo
```

### join

The subnet join command configures your validator node to begin validating
a new subnet.

To complete this process, you must have access to the machine running your
validator. If the CLI is running on the same machine as your validator,
it can generate or update your node's config file automatically.
Alternatively, the command can print the necessary instructions to
update your node manually. To complete the validation process, the
NodeID of your validator node must have been whitelisted by one of the
subnet's control keys.

After you update your validator's config, you will need to restart your
validator manually. If the --avalanchego-config flag is provided, this
command attempts to edit the config file at that path (requires the file
to be readable and writable).

This command currently only supports subnets deployed on the Fuji testnet
and Mainnet.

**Usage:**

`avalanche subnet join [subnetName] [flags]`

**Flags:**

```
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

### list

The subnet list command prints the names of all created subnet
configurations.

**Usage:**

`avalanche subnet list [flags]`

**Flags:**

```
-h, --help   help for list
```

### publish

Publish the subnet's VM to a repository

**Usage:**

`avalanche subnet publish [subnetName] [flags]`

**Flags:**

```
    --alias string              We publish to a remote repo, but identify the repo locally under a user-provided alias (e.g. myrepo).
    --force                     If true, ignores if the subnet has been published in the past, and attempts a forced publish.
-h, --help                      help for publish
    --no-repo-path string       Do not let the tool manage file publishing, but have it only generate the files and put them in the location given by this flag.
    --repo-url string           The URL of the repo where we are publishing
    --subnet-file-path string   Path to the Subnet description file. If not given, a prompting sequence will be initiated.
    --vm-file-path string       Path to the VM description file. If not given, a prompting sequence will be initiated.
```

### stats

Show validator statistics for the given subnet

**Usage:**

`avalanche subnet stats [subnetName] [flags]`

**Flags:**

```
    --fuji fuji         print stats on fuji (alias for `testnet`)
-h, --help              help for stats
    --mainnet mainnet   print stats on mainnet
    --testnet testnet   print stats on testnet (alias for `fuji`)
```

## Network

The network command suite provides a collection of tools for managing
local subnet deployments.

When a subnet is deployed locally, it runs on a local, multi-node
Avalanche network. Deploying a subnet locally will start this network
in the background. This command suite allows you to shutdown,
restart, and clear that network.

This network currently supports multiple, concurrently deployed
subnets.

### clean

The network clean command shuts down your local, multi-node network. All
the deployed subnets will shutdown and delete their state. The network
may be started again by deploying a new subnet configuration.

**Usage:**

`avalanche network clean [flags]`

**Flags:**

```
    --hard   Also clean downloaded avalanchego and plugin binaries
-h, --help   help for clean
```

### start

The network start command starts a local, multi-node Avalanche network
on your machine.

By default, the command loads the default snapshot. If --snapshot-name flag
is provided, that snapshot will be used for starting the network if
it can be found. The command may fail if the local network is already
running.

**Usage:**

`avalanche network start [flags]`

**Flags:**

```
    --avalanchego-version string   use this version of avalanchego (ex: v1.17.12) (default "latest")
-h, --help                         help for start
    --snapshot-name string         name of snapshot to use to start the network from (default "default-1654102509")
```

### status

The network status command prints whether or not a local Avalanche
network is running and some basic stats about the network.

**Usage:**

`avalanche network status [flags]`

**Flags:**

```
-h, --help   help for status
```

### stop

The network stop command shuts down your local, multi-node network.

All deployed subnets will shutdown gracefully and save their
state. If snapshot-name flag is provided, the state will be saved
under this named snapshot, which then can be restarted with
"network start --snapshot-name snapshotName". Otherwise, the default snapshot
will be created, or overwritten if it exists. The default
snapshot can then be restarted without parameter
("network start").

**Usage:**

`avalanche network stop [flags]`

**Flags:**

```
-h, --help                   help for stop
    --snapshot-name string   name of snapshot to use to save network state into (default "default-1654102509")
```

## Transaction

The transaction command suite provides all of the utilities required to sign multisig transactions.

### commit

Commit a transaction by submitting it to the p-chain.

**Usage:**

`avalanche transaction commit [subnetName] [flags]`

**Flags:**

```
-h, --help                       help for commit
    --input-tx-filepath string   Path to the transaction signed by all signatories
```

### sign

Sign a multisig transaction.

**Usage:**

`avalanche transaction sign [subnetName] [flags]`

**Flags:**

```
-h, --help                       help for sign
    --input-tx-filepath string   Path to the transaction file for signing
-k, --key string                 select the key to use [fuji only]
-g, --ledger                     use ledger instead of key (always true on mainnet, defaults to false on fuji)
```

## Key

The key command suite provides a collection of tools for creating and managing
signing keys. You can use these keys to deploy subnets to the Fuji testnet,
but these keys are NOT suitable to use in production environments. DO NOT use
these keys on mainnet.

To get started, use the key create command.

### create

The key create command generates a new private key to use for creating and controlling
test subnets. Keys generated by this command are NOT cryptographically secure enough to
use in production environments. DO NOT use these keys on mainnet.

The command works by generating a secp256 key and storing it with the provided keyName. You can use this key
in other commands by providing this keyName.

If you'd like to import and existing key instead of generating one from scatch, provide the --file flag.

**Usage:**

`avalanche key create [keyName] [flags]`

**Flags:**

```
    --file string   import the key from an existing key file
-f, --force         overwrite an existing key with the same name
-h, --help          help for create
```

### delete

The key delete command deletes an existing signing key.

To delete a key, provide the keyName. The command will prompt for confirmation
before deleting the key. To skip the confirmation, provide the --force flag.

**Usage:**
`avalanche key delete [keyName] [flags]`

**Flags:**

```
-f, --force   delete the key without confirmation
-h, --help    help for delete
```

### export

The key export command exports a created signing key. An exported key can
be used externally or imported into another instance of the CLI.

By default, the tool writes the hex encoded key to stdout. If the --output
flag is provided, the key will be written to a file of your choosing.

**Usage:**

`avalanche key export [keyName] [flags]`

**Flags:**

```
-h, --help            help for export
-o, --output string   write the key to the provided file path
```

### list

The key list command prints information for all stored signing
keys or for the ledger addresses associated to certain indices.

**Usage:**

`avalanche key list [flags]`

**Flags:**

```
-a, --all-networks   list all network addresses
-c, --cchain         list C-Chain addresses (default true)
-f, --fuji           list testnet (fuji) network addresses
-h, --help           help for list
-g, --ledger uints   list ledger addresses for the given indices (default [])
-l, --local          list local network addresses
-m, --mainnet        list mainnet network addresses
-t, --testnet        list testnet (fuji) network addresses
```
