# Deploy a Subnet on Mainnet with multisig Authorization

## Rationale

For Subnet operations the user can specify a permissioned multisig scheme,
that's, the user specifies a set of control addresses on Subnet creation,
which are going to be the only ones that can sign a valid TX related to that
SUBNET (for example: create blockchain, add Subnet validator).

Furthermore, multisig threshold specifies how many of those control addresses
to require to sign any such TX.

The simplest case without multisig, is having 1 control
key and threshold of 1, as in [this tutorial](./create-a-mainnet-subnet). In this case
there is only one control address for the SUBNET operations, and it's going to always be the same.

A more complex example is to have 2 control keys and a threshold of 2, do that every
TX needs always the same control keys as signers (this also applies to the general
case of a threshold of N out of N control keys).

For a more complex multisig example, and the one that to use in this tutorial,
one can specify 5 specific control keys, and a threshold of 2,
and in this case, every TX signature process needs 2 out of the 5 control keys.

When creating a given TX, the user should select the specific control keys to use -of threshold length-.
Afterwards, each one of this preselected control keys should sign the TX.

For example, for the former case, 2 out of 5 control keys, in SUBNET creation the user defines the 5
control keys together with the enabling threshold. After that, create a SUBNET op such as adding a SUBNET
validator, by selecting which 2 of this 5 control addresses to use for signing,
and afterwards, the signature process can start, which those preselected addresses need to fulfill.

## Contents

This article documents the following `Mainnet` operations:

Deploy command related ones:

- Specify a multisig set of control keys -5- and threshold -2- for the SUBNET
- Sign and issue the Subnet creation TX using funded first ledger address for the fees
- Specify Subnet of 2 control keys to use for blockchain creation
- Sign the blockchain creation TX using funded first ledger address for the fees, also signing
  one of the two required Subnet authorization control keys

Sign command related ones:

- Sign the blockchain creation TX with other one of the two required SUBNET authorization control keys
- Issue the blockchain creation TX

### Notice

1. Due to `Mainnet` requirements at CLI, all operations are going to use ledger. The user can specify
   locally stored keys for multisig on `Fuji` (also the user can choose ledger on `Fuji`), but this
   tutorial is going to not focus on that.
2. The ledger connected when creating the TXs (when doing the `deploy` command), is going to
   to pay for the fees (2 AVAX), and as first control key of the 2 required.
3. The user needs a different ledger for the second signature, which is going to pay no fees.

## Prerequisites

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed
- 2 ledger devices, one funded

### Avalanche-CLI

If not yet installed, install `Avalanche-CLI` following the tutorial at [Avalanche-CLI installation](create-a-local-subnet.md#installation)

### Ledger Devices

The user needs two supported devices to do the 2 of 5 signatures. Verify one of them has funds in order
to pay for the TX fees.

See [ledger requirements](./create-a-mainnet-subnet#ledger) for details on supported devices,
how to get the devices addresses, how to fund a device.

## Addresses Used on This Tutorial

- Control key 0: `P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28`
- Control key 1: `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5` ledger 0 first address -funded-
- Control key 2: `P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8`
- Control key 3: `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af` ledger 1 first address
- Control key 4: `P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g`

## Create and Sign TXs with the Deploy Command

### Ledger 0

Connect ledger 0 device, unblock it, and run the Avalanche Ledger Application, as described in
[How to use Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche)
-up to and including point 4-.
Remember that Ledger 0 should have at least 2 AVAX to pay for the TX fees.

When using CLI, it should recognize the ledger and use the associated address `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5`
as the one to pay for the TX fees and to do the first signature of the TX.

### Subnet to Use

See [this section](./create-a-fuji-subnet#create-an-evm-subnet) to create an EVM based SUBNET, 
called testsubnet from now on.

### Specify Network, Control Keys and Threshold

Execute:

```bash
avalanche subnet deploy testsubnet
```

First step is to specify `Mainnet` as the network:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Choose a network to deploy on:
  ▸ Local Network
    Fuji
    Mainnet
```

Select `Mainnet` and enter

```text
Deploying [testsubnet] to Mainnet
*** Please provide extended public key on the ledger device ***
```

Ledger is automatically recognized as the signature mechanism on `Mainnet`, and so the CLI
asks the user to authorize the ledger to provide extended public key information to it. The tool
uses this info to get the ledger addresses.

On the ledger a `Provide Extended Public Key` window is going to be active. Navigate to the ledger `Accept`
window by using the ledger's right button, and then authorize the request by pressing both left and
right buttons.

After that, CLI shows the first `Mainnet` ledger address.

```text
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
```

Next CLI asks the user to specify the control keys.

```text
Configure which addresses may make changes to the subnet.
These addresses are known as your control keys. You are going to also
set how many control keys are required to make a subnet change (the threshold).
Use the arrow keys to navigate: ↓ ↑ → ← 
? How would you like to set your control keys?: 
  ▸ Use ledger address
    Custom list
```

Select `Custom list` to provide one by one the desired 5 control addresses.

```text
✔ Custom list
? Enter control keys: 
  ▸ Add
    Delete
    Preview
    More Info
↓   Done
```

Use the given menu to add each key, and select `Done` when finished.

The output at this point:

<!-- markdownlint-disable MD013 -->

```text
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

<!-- markdownlint-enable MD013 -->

Next is to specify the threshold. Select 2:

```text
Use the arrow keys to navigate: ↓ ↑ → ← 
? Select required number of control key signatures to make a subnet change: 
  ▸ 1
    2
    3
    4
    5
```

Note: if the control keys don't include the ledger one, signature is going to fail for SUBNET authorization
of chain creation TX, and deploy is going to fail, with the expected message

```text
Error: wallet does not contain subnet auth keys
exit status 1
```

### Specify Control Keys to Sign the Chain Creation TX

After indicating to use 2 control keys to sign any SUBNET TX, CLI asks the user
to input the specific control keys for the chain creation TX.

```text
? Choose a subnet auth key: 
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
```

Here, the user should select one by one the two ledger addresses: `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5`
and `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`

Note: if the currently connected ledger address isn't included here, the operation is going to next
fail with:
 
```text
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
Error: wallet does not contain subnet auth keys
exit status 1
```

This can happen either because the original specified control keys -previous step- don't contain the
ledger address, or because the ledger address control key wasn't selected in the current step. In the
given example, the ledger 0 address control key wasn't selected.

Note 2: if by mistake the user connects the ledger 1, that has no funds, and selects it for chain creation,
the operation is going to fail when trying to pay the fee for the SUBNET creation TX, with:

```text
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
*** Please sign subnet creation hash on the ledger device *** 
Error: insufficient funds: provided UTXOs need 1000000000 more units of asset "rgNLkDPpANwqg3pHC4o9aGJmf2YU4GgTVUMRKAdnKodihkqgr"
exit status 1
```

A successful input/output for ledger 0 connected, and ledger addresses selected for chain creation,
is going to be:

```text
✔ 2
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Your subnet auth keys for chain creation: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af]
*** Please sign subnet creation hash on the ledger device *** 
```

### Sign SUBNET Creation and Chain Creation TXs using Ledger 0

Last message requires the user to sign the SUBNET creation TX using connected ledger device:

```text
*** Please sign subnet creation hash on the ledger device *** 
```

On the ledger a `Sign Hash` window is going to be active. Navigate to the ledger `Accept` window by
using the ledger's right button, and then authorize the request by pressing both left and right buttons.

```text
Subnet has been created with ID: 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew. Now creating blockchain...
*** Please sign blockchain creation hash on the ledger device *** 
```

After successful Subnet creation, CLI is going to ask the user to sign the blockchain creation  TX.

On the ledger a `Sign Hash` window is going to be active. Navigate to the ledger `Accept` window by
using the ledger's right button, and then authorize the request by pressing both left and right buttons.

On success, CLI is going to provide Subnet deploy details. As only 1 address signed the chain creation
TX, CLI is going to write a file to disk to save the TX so as to continue the signing process with
another command.

<!-- markdownlint-disable MD013 -->

```text
+--------------------+----------------------------------------------------+
| DEPLOYMENT RESULTS |                                                    |
+--------------------+----------------------------------------------------+
| Chain Name         | testsubnet                                         |
+--------------------+----------------------------------------------------+
| Subnet ID          | 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew |
+--------------------+----------------------------------------------------+
| VM ID              | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii  |
+--------------------+----------------------------------------------------+

1 of 2 required Blockchain Creation signatures have been signed. Saving TX to disk to enable remaining signing.

Path to export partially signed TX to:
```

<!-- markdownlint-enable MD013 -->

Enter name of file to write to disk, in this example, `partiallySigned.txt`. Shouldn't exist on disk.
CLI is going to ask until meting this condition.

<!-- markdownlint-disable MD013 -->

```text
Path to export partially signed TX to: partiallySigned.txt

Addresses remaining to sign the tx
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Connect a ledger with one of the remaining addresses or choose a stored key and run the signing command, or send "partiallySigned.txt" to another user for signing.

Signing command:
  avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
```

<!-- markdownlint-enable MD013 -->

CLI asks the user to use another ledger, ledger 1 in this case which contains the address `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`
to continue the signing process with `transaction sign` command.

## Sign and Commit the Chain Creation TX with the Transaction Commands

### Ledger 1

Connect ledger 1 device, unblock it, and run the Avalanche Ledger Application, as described in
[How to use Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche)
-up to and including point 4-. Remember that Ledger 1 doesn't need to have funds, and CLI is going to
use it to provide Subnet auth only, not to pay fees.

When using CLI, it should recognize the ledger and use the associated address `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`
as the one to do the second signature of the TX.

### Issue the Command to Sign the Chain Creation TX

CLI is going to recognize the transaction in `partiallySigned.txt` as `Mainnet` one, and is going to
use the ledger automatically for signing. In the `Fuji` case, CLI is going to prompt the user to choose
the signing mechanism.

```bash
avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
*** Please provide extended public key on the ledger device ***
```

On the ledger a `Provide Extended Public Key` window is going to be active. Navigate to the ledger `Accept`
window by using the ledger's right button, and then authorize the request by pressing both left and
right buttons.

```text
Ledger address: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Please sign TX hash on the ledger device *** 
```

Next, CLI is going to start a new signing process for the create chain TX. If the ledger isn't the correct
one, the following error should appear instead:

```text
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
Error: wallet does not contain subnet auth keys
exit status 1
```

On the ledger a `Sign Hash` window is going to be active. Navigate to the ledger `Accept` window by
using the ledger's right button, and then authorize the request by pressing both left and right buttons.

After that CLI is going to recognize the TX as having all required signatures. If the threshold were
larger, the user should execute the `transaction sign` command should as many times as needed with the
different ledgers.

```text

All 2 required Tx signatures have been signed. Saving TX to disk to enable commit.

Overwritting partiallySigned.txt

Tx is fully signed, and ready to be committed

Commit command:
  avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

Now, `partiallySigned.txt` contains a fully signed TX.

### Issue the Command to Commit the Chain Creation TX

```bash
avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

CLI is going to recognize the TX as `Mainnet` one, and is going to automatically deploy it.

<!-- markdownlint-disable MD013 -->

```text
+--------------------+-------------------------------------------------------------------------------------+
| DEPLOYMENT RESULTS |                                                                                     |
+--------------------+-------------------------------------------------------------------------------------+
| Chain Name         | testsubnet                                                                          |
+--------------------+-------------------------------------------------------------------------------------+
| Subnet ID          | 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew                                  |
+--------------------+-------------------------------------------------------------------------------------+
| VM ID              | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii                                   |
+--------------------+-------------------------------------------------------------------------------------+
| Blockchain ID      | 2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj                                  |
+--------------------+-------------------------------------------------------------------------------------+
| RPC URL            | http://127.0.0.1:9650/ext/bc/2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj/rpc |
+--------------------+-------------------------------------------------------------------------------------+
| P-Chain TXID       | 2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj                                  |
+--------------------+-------------------------------------------------------------------------------------+
```

<!-- markdownlint-enable MD013 -->

Now you have deployed a SUBNET to `Mainnet` by using 2 ledgers to accomplish a multisig process.

## Create and Sign multisig TXs with the AddValidator Command

`addValidator` command is going to also behave multisig, if the SUBNET was previously deployed with
appropriate multisig parameters in control keys and threshold.

This example is going to use 5 control keys and threshold of two.

Before starting, be sure to connect, unblock, and run Avalanche Ledger App on ledger 0.

```bash
avalanche subnet addValidator testsubnet
```

First specify the network. Select `Mainnet`

```text
Use the arrow keys to navigate: ↓ ↑ → ← 
? Choose a network to add validator to.: 
  ▸ Fuji
    Mainnet
```

Then, similar to deploy, the command asks the user to select the 2 control keys needed to sign the TX.
Note there is no need to ask for the main set of control keys, or the threshold.
That's already saved on chain for testsubnet.

```text
✔ Mainnet
Use the arrow keys to navigate: ↓ ↑ → ← 
? Choose a subnet auth key: 
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
````

As before, the user is going to need to indicate to use both ledger addresses for auth, and is going
to need to have ledger 0 connected to pay for the fee (0.001 AVAX) and be the first Subnet auth signer.

```text
✔ Mainnet
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Your subnet auth keys for add validator TX creation: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af].
```

Lets skip the validation node/period prompt description, as it's already described
[here](./create-a-mainnet-subnet#add-a-avalidator). 

Only note that start time for validator isn't selected to be in one minute, to give more time to finish
all the signing process.

<!-- markdownlint-disable MD013 -->

```text
Next, we need the NodeID of the validator you want to whitelist.

Check https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeid for instructions about how to query the NodeID from your node
(Edit host IP address and port to match your deployment, if needed).
What is the NodeID of the validator you'd like to whitelist?: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
✔ Default (20)
When should your validator start validating?
If you validator is not ready by this time, subnet downtime can occur.
✔ Custom
When should the validator start validating? Enter a UTC datetime in 'YYYY-MM-DD HH:MM:SS' format: 2022-11-22 23:00:00
✔ Until primary network validator expires
NodeID: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
Network: Local Network
Start time: 2022-11-22 23:00:00
End time: 2023-11-22 15:57:27
Weight: 20
Inputs complete, issuing transaction to add the provided validator information...
*** Please provide extended public key on the ledger device ***
```

<!-- markdownlint-enable MD013 -->

Now the command ask the user to authorize the ledger to provide public key.

On the ledger a `Provide Extended Public Key` window is going to be active. Navigate to the ledger `Accept`
window by using the ledger's right button, and then authorize the request by pressing both left and
right buttons.

```text
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
*** Please sign add validator hash on the ledger device *** 
```

After that, the command shows ledger 0 address, and asks the user to sign add validator TX on ledger.

```text
Partial TX created

1 of 2 required Add Validator signatures have been signed. Saving TX to disk to enable remaining signing.

Path to export partially signed TX to:
```

As the case is multisig, TX isn't fully signed, and the commands asks a file to write into, lets use
partialAddValidatorTx.txt

<!-- markdownlint-disable MD013 -->

```text
Path to export partially signed TX to: partialAddValidatorTx.txt

Addresses remaining to sign the tx
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Connect a ledger with one of the remaining addresses or choose a stored key and run the signing command, or send "partialAddValidatorTx.txt" to another user for signing.

Signing command:
  avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

<!-- markdownlint-enable MD013 -->

## Sign and Commit the Add Validator TX with the Transaction Commands

Process is pretty similar to signing of chain creation TX. Going to omit some details now.

First, be sure to connect, unblock, and run Avalanche Ledger App on ledger 1.

### Issue the Command to Sign the add validator TX

The command is going to recognize the transaction in `partialAddValidatorTx.txt` as `Mainnet` one, and
is going to use the ledger automatically for signing.

```bash
avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
*** Please provide extended public key on the ledger device ***
```

On the ledger a `Provide Extended Public Key` window is going to be active. Navigate to the ledger `Accept`
window by using the ledger's right button, and then authorize the request by pressing both left and
right buttons.

```text
Ledger address: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Please sign TX hash on the ledger device *** 
```

Next, the command is going to start a new signing process for the create chain TX.

On the ledger a `Sign Hash` window is going to be active. Navigate to the ledger `Accept` window by
using the ledger's right button, and then authorize the request by pressing both left and right buttons.

After that the command is going to recognize the TX as having all required signatures.

```text

All 2 required Tx signatures have been signed. Saving TX to disk to enable commit.

Overwritting partialAddValidatorTx.txt

Tx is fully signed, and ready to be committed

Commit command:
  avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

Now, `partialAddValidatorTx.txt` contains a fully signed TX.

### Issue the Command to Commit the add validator TX

```bash
avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

The command is going to recognize TX as `Mainnet` one, and is going to automatically deploy it.

```text
Transaction successful, transaction ID: K7XNSwcmgjYX7BEdtFB3hEwQc6YFKRq9g7hAUPhW4J5bjhEJG
```

Now you have added a validator to the a Subnet on `Mainnet` by using 2 ledgers to accomplish a multisig
process.

