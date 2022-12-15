# How to Import a Subnet from a Public Network to `Avalanche-CLI`

## What is the Context of this How-To?

The most probable reason why someone would want to do this, 
is if they already deployed a Subnet with `subnet-cli` either to `Fuji` or `Mainnet`, 
and now would like to use `Avalanche-CLI` to manage the Subnet.  

`subnet-cli` is deprecated.

Similarly, a Subnet might have been created "manually" by issuing transactions 
to node APIs (either a local node or public API nodes) with no help of any tool so far,
but would now require `Avalanche-CLI` integration.

For this How-To, we will import the `wagmi` subnet from `Fuji`.


## Requirements:

For the import to work properly: 

 * the *genesis* for the Subnet in question should be known and accessible as a file on disk.

 * the Subnet's *ID* should be known, and needs to be supplied to the wizard when prompted


## Import the Subnet

For these use cases, `Avalanche-CLI` now supports the `import public` command.

Start the import by issuing

```shell
avalanche subnet import public 
```

The tool will prompt for the network from which to import. 
The invariant assumption here is that the network is a public network 
(in other words, importing from a local network is not supported).

```shell
Use the arrow keys to navigate: ↓ ↑ → ← 
? Choose a network to import from: 
  ▸ Fuji
    Mainnet
```

As stated earlier, we will import from `Fuji`, so select it. 
As a next step, `Avalanche-CLI` asks for the path of the genesis file on disk:

```shell
✗ Provide the path to the genesis file: /tmp/subnet_evm.genesis.json
```

It will be checked if the file at the provided path exists 
(refer to check mark at the beginning of the line):

```shell
✔ Provide the path to the genesis file: /tmp/subnetevm_█enesis.json
```

Subsequently, the wizard asks if nodes have already been deployed for this Subnet. 

```shell
Use the arrow keys to navigate: ↓ ↑ → ← 
? Have nodes already been deployed to this subnet?: 
    Yes
  ▸ No
```

### Nodes are Already Validating this Subnet

If they have been, it will attempt to query such a node for detailed data like the VM version. 
This will allow to skip having to query github (or wherever the VM's repository is hosted) 
for the VM's version, but rather we'll get the exact version which is actually running on the node.

For this to work, an node API URL is requested from the user, which will be used for the query.
This will require that the node's API IP and port are accessible from the machine running 
`Avalanche-CLI`, or the node will obviously not be reachable, 
and thus the query will timeout and fail, and the tool exit. 
The node should also be validating the given Subnet for the import to be meaningful, 
otherwise, the import will fail with missing information.

If the query succeeded, the wizard jumps to prompt for the Subnet ID.

```shell
Please provide an API URL of such a node so we can query its VM version (e.g. http://111.22.33.44:5555): http://154.42.240.119:9650
What is the ID of the subnet?: 28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY
```

The rest of the wizard is identical to the next section, except that there is no prompt for the VM version anymore.

### Nodes are Not Yet Validating this Subnet, the Nodes API URL are Unknown, or Inaccessible (Firewalls):

If we don't have a node's API URL at hand, or it is not reachable 
from the machine running `Avalanche-CLI`, or maybe no nodes have even been deployed yet 
(only the `CreateSubnet` transaction has been issued, for example), we can query the public APIs. 

We can't know for sure what Subnet VM versions are the validators running though, 
so we need to prompt later.
So, we select `No` when the tool asks for deployed nodes:

Thus, at this point the wizard requests the Subnet's ID. Without it it can not know 
what to import (remember the ID is different on different networks).

From the [Testnet Subnet Explorer | https://subnets-test.avax.network/wagmi] 
we gather that `wagmi`'s Subnet ID is `28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY`:

```shell
✔ What is the ID of the subnet?: 28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY
```

(notice the checkmark at line start, it signals that the ID is validated in its formar).

If we hit `enter` now, the public APIs for the given network will be queried, and if successful, 
the tool prints some information about the Subnet, and proceeds to ask about the Subnet's type:

```shell
Getting information from the Fuji network...
Retrieved information. BlockchainID: 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt, Name: wagmi, VMID: srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
Use the arrow keys to navigate: ↓ ↑ → ← 
? What's this VM's type?: 
  ▸ Subnet-EVM
    SpacesVM
    Custom
```

`Avalanche-CLI` needs to know the VM type, in order to hit its repository and check 
what VM versions are available. 
This works automatically for Ava Labs VMs (like `Subnet-EVM` and `SpacesVM`). 

`Custom` VMs are not supported yet at this point, but are next on the agenda.

As we want to import `wagmi`, and we know that is a `Subnet-EVM` type, we select that.

The tool then queries the (github) repository for available releases, 
and prompts the user to pick the version she wants to use:

```shell
✔ Subnet-EVM
Use the arrow keys to navigate: ↓ ↑ → ← 
? Pick the version for this VM: 
  ▸ v0.4.5
    v0.4.5-rc.1
    v0.4.4
    v0.4.4-rc.0
↓   v0.4.3
```

There is only so much the tool can help here, the Subnet manager/administrator 
should know what they want to use `Avalanche-CLI` for, how, 
and why they are importing the Subnet. 

It is crucial to understand that the correct versions are only known to the user. 
The latest might be usually fine, but it can not just be assumed by the tool. 
This is why it is indispensable that the user is prompted, and she is required to choose
(unless above we selected to query an actual Subnet validator, not the public APIs.
In such a scenario, this picking is skipped).

```shell
✔ v0.4.5
Subnet wagmi imported successfully
```

The choice finalizes the wizard, which signals (hopefully) that the import succeeded. 
If something went wrong, the error messages provide cause information.
This means you can now use `Avalanche-CLI` to handle the imported Subnet in the accustomed way. 
For example, the `wagmi` Subnet could be deployed locally.


### Flags

Prompting steps can be skipped by providing flags to the command. 
The `--help` option lists how to use them:

```shell
avalanche subnet import public --help
The subnet import public command will import a subnet configuration from a running network.

The genesis file should be available from the disk for this to work. 
By default, an imported subnet will not overwrite an existing subnet with the same name. 
To allow overwrites, provide the --force flag.

Usage:
  avalanche subnet import public [subnetPath] [flags]

Flags:
      --custom                     use a custom VM template
      --evm                        import a subnet-evm
  -f, --force                      overwrite the existing configuration if one exists
      --fuji fuji                  import from fuji (alias for `testnet`)
      --genesis-file-path string   path to the genesis file
  -h, --help                       help for public
      --mainnet mainnet            import from mainnet
      --node-url string            [optional] URL of an already running subnet validator
      --spacesvm                   use the SpacesVM as the base template
      --subnet-id string           the subnet ID
      --testnet testnet            import from testnet (alias for `fuji`)

Global Flags:
      --config string      config file (default is $HOME/.avalanche-cli.json)
      --log-level string   log level for the application (default "ERROR")
```

For example, we can provide `--testnet` to skip the network prompt, 
`--evm` to signal that the VM is of `Subnet-EVM` type, 
or `--node-url` to directly provide a node's API endpoint.
