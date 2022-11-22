# Deploy a Subnet on Mainnet with Multisig Authorization

## Rationale

Subnet operations can be done under a permissioned multisig scheme,
that is, a set of control addresses can be specified on subnet creation,
which will be the only ones that can sign a valid tx related to that
subnet (eg: create blockchain, add subnet validator).

Furthermore, multisig threshold specifies how many of those control addresses
are required to sign any such tx.

The simplest case of no multisig, is having 1 control
key and threshold of 1, as in [this tutorial](./create-a-mainnet-subnet). In this case
there is only one control address for the subnet operations, and it will always be the same.

A more complex example is to have 2 control keys and a threshold of 2, do that every
tx needs to always be signed by the same control keys (this also applies to the general
case of a threshold of N out of N control keys).

For a more complex multisig example, and the one that will be used in this tutorial,
one can specify 5 specific control keys, and a threshold of 2,
and in this case, for every tx, 2 out of the 5 control keys will be needed to sign the tx. 

When creating a given tx, a selection of the specific control keys to use (of threshold len) should be made.
Afterwards, the tx should be signed by each one of this pre selected control keys subset.

Eg, for the former case, 2 out of 5 control keys, the 5 control keys are defined in subnet creation,
together with the enabling threshold. After that, a subnet op such as adding a subnet validator, first
will be created by selecting which 2 of this 5 control addresses will be used for signing, and afterwards,
the signature process can start, which needs to be fullfilled for those pre selected addresses.

## Contents

In this article, we show how to do the following on Mainnet:

Deploy command related ones:

- Specify a multisig set of control keys (5) and threshold (2) for the subnet
- Sign and issue the subnet creation tx using funded first ledger address for the fees
- Specify subnet of 2 control keys to use for blockchain creation
- Sign the blockchain creation tx using funded first ledger address for the fees, also signing
  one of the two required subnet authorization control keys

Sign command related ones:

- Sign the blockchain creation tx with other one of the two required subnet authorization control keys
- Issue the blockchain creation tx

### Notice

1. All operations will use ledger, as is required for mainnet. Stored keys can be used for multisig on fuji 
(as ledger can also be used on fuji), but this tutorial will not focus on that.
2. The ledger that is connected when creating the txs (when doing the deploy command), will be used to pay
   for the fees (2 AVAX), and as first control key of the 2 required.
3. A different ledger will be needed for the second signature, which will pay no fees.

## Prerequisites

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed
- 2 ledger devices, one funded

### Avalanche-CLI

If not yet installed, install `Avalanche-CLI` following the tutorial at [Avalanche-CLI installation](create-a-local-subnet.md#installation)

### Ledger devices

Two supported devices are needed to do the 2 of 5 signatures. One of them needs to be funded in order
to pay for the tx fees.

See [ledger requirements](./create-a-mainnet-subnet#ledger) for details on which devices are
supported, how to get the devices addresses, how to fund a device.

## Addresses to be used on this tutorial

- Control key 0: `P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28`
- Control key 1: `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5` ledger 0 first address (funded)
- Control key 2: `P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8`
- Control key 3: `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af` ledger 1 first address
- Control key 4: `P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g`

## Create and sign txs with the deploy command

### Ledger 0

Connect ledger 0 device, unblock it, and run the Avalanche Ledger Application, as described in [How to use Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche) (up to and including point 4).
Remind that Ledger 0 should have at least 2 AVAX to pay for the tx fees.

When using CLI, it should recognice the ledger and use the associated address `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5`
as the one to pay for the tx fees and to do the first signature of the tx.

### Subnet to use

See [this section](./create-a-fuji-subnet#create-an-evm-subnet) to create an EVM based subnet, to be called
testsubnet from now on.

### Specify network, control keys and threshold

Execute:

```
avalanche subnet deploy testsubnet
```

First step is to specify `Mainnet` as the network:

```bash
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
  ▸ Local Network
    Fuji
    Mainnet
```

Select `Mainnet` and enter

```
Deploying [testsubnet] to Mainnet
*** Please provide extended public key on the ledger device ***
```

Ledger is automatically recognized as the signature mechanism on mainnet, and so the CLI
asks the user to authorize the ledger to provide extended public key information to it. This
info is used by the tool to get the ledger addresses.

On ledger a `Provide Extended Public Key` window will be active. Navigate to the ledger `Accept` window by using
ledger's right button, and then authorize the request by pressing both left and right buttons.

After that, the first mainnet ledger address is shown.

```
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
```

Next we are asked to specify control keys.

```
Configure which addresses may make changes to the subnet.
These addresses are known as your control keys. You will also
set how many control keys are required to make a subnet change (the threshold).
Use the arrow keys to navigate: ↓ ↑ → ← 
? How would you like to set your control keys?: 
  ▸ Use ledger address
    Custom list
```

Select `Custom list` to provide one by one the desired 5 control addresses.

```
✔ Custom list
? Enter control keys: 
  ▸ Add
    Delete
    Preview
    More Info
↓   Done
```

Use the given menu to add each key, and select `Done` when finished.

This output should be expected at this point:

```
✔ Custom list
✔ Add
Enter P-Chain address (Example: P-...): P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
✔ Add
Enter P-Chain address (Example: P-...): P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ Add
Enter P-Chain address (Example: P-...): P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
✔ Add
Enter P-Chain address (Example: P-...): P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ Add
Enter P-Chain address (Example: P-...): P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
✔ Done
Your Subnet's control keys: [P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28 P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
```

Next is to specify threshold. Select 2:

```
Use the arrow keys to navigate: ↓ ↑ → ← 
? Select required number of control key signatures to make a subnet change: 
  ▸ 1
    2
    3
    4
    5
```

Note: if the control keys do not include the ledger one, signature will fail for subnet authorization of
chain creation tx, and deploy will fail, with the expected message

```
Error: wallet does not contain subnet auth keys
exit status 1
```

### Specify specific control keys to be used to sign the chain creation tx

After indicating 2 control keys are needed to sign any subnet tx, CLI ask the user
to input the specific control keys to be used for the chain creation tx that will be
generated and signed for deploy.

```
? Choose a subnet auth key: 
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
```

Here, user should select one by one the two ledger addresses: `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5` and 
`P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`

Note: if the currently connected ledger address is not included here, operation will next fail with:
 
```
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
Error: wallet does not contain subnet auth keys
exit status 1
```

This can happend either because the original specified control keys (previous step) do not contain the
ledger address, or because the ledger address control key was not selected in the current step. In the given
example, the ledger 0 address control key was not selected.

Note 2: if by mistake ledger 1, that has no funds, is connected, and selected for chain creation, operation will fail
when trying to pay the fee for the subnet creation tx, with:

```
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
*** Please sign subnet creation hash on the ledger device *** 
Error: insufficient funds: provided UTXOs need 100000000 more units of asset "rgNLkDPpANwqg3pHC4o9aGJmf2YU4GgTVUMRKAdnKodihkqgr"
exit status 1
```

A sucessfull input/ouput for ledger 0 connected, and ledger addresses selected for chain creation, will be:

```
✔ 2
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Your subnet auth keys for chain creation: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af]
*** Please sign subnet creation hash on the ledger device *** 
```

### Sign subnet creation and chain creation txs using ledger 0

Last message requires the user to sign the subnet creation tx using connected ledger device:

```
*** Please sign subnet creation hash on the ledger device *** 
```

On ledger a `Sign Hash` window will be active. Navigate to the ledger `Accept` window by using ledger's
right button, and then authorize the request by pressing both left and right buttons.

