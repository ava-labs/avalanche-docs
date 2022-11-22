# Deploy a Subnet on Mainnet with Multisig Authorization

## Rationale

Subnet operations can be done under a permissioned multisig scheme,
that is, a set of control addresses can be specified on subnet creation,
which will be the only ones that can sign a valid tx related to that
subnet (eg: create blockchain, add subnet validator).

Furthermore, multisig threshold specifies how many of those control addresses
are required to sign any such tx.

The simplest case without multisig, is having 1 control
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
the signature process can start, which needs to be fulfilled for those pre selected addresses.

## Contents

In this article, we show how to do the following on `Mainnet`:

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

1. All operations will use ledger, as is required for `Mainnet`. Locally stored keys can be used for multisig on `Fuji` 
(as ledger can also be used on `Fuji`), but this tutorial will not focus on that.
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
Remember that Ledger 0 should have at least 2 AVAX to pay for the tx fees.

When using CLI, it should recognize the ledger and use the associated address `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5`
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

Ledger is automatically recognized as the signature mechanism on `Mainnet`, and so the CLI
asks the user to authorize the ledger to provide extended public key information to it. This
info is used by the tool to get the ledger addresses.

On the ledger a `Provide Extended Public Key` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

After that, the first `Mainnet` ledger address is shown.

```
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
```

Next we are asked to specify the control keys.

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

Next is to specify the threshold. Select 2:

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

After indicating 2 control keys are needed to sign any subnet tx, CLI asks the user
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

Here, the user should select one by one the two ledger addresses: `P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5` and 
`P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`

Note: if the currently connected ledger address is not included here, the operation will next fail with:
 
```
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
Error: wallet does not contain subnet auth keys
exit status 1
```

This can happen either because the original specified control keys (previous step) do not contain the
ledger address, or because the ledger address control key was not selected in the current step. In the given
example, the ledger 0 address control key was not selected.

Note 2: if by mistake ledger 1, that has no funds, is connected, and selected for chain creation, the operation will fail
when trying to pay the fee for the subnet creation tx, with:

```
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Your subnet auth keys for chain creation: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
*** Please sign subnet creation hash on the ledger device *** 
Error: insufficient funds: provided UTXOs need 1000000000 more units of asset "rgNLkDPpANwqg3pHC4o9aGJmf2YU4GgTVUMRKAdnKodihkqgr"
exit status 1
```

A successful input/output for ledger 0 connected, and ledger addresses selected for chain creation, will be:

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

On the ledger a `Sign Hash` window will be active. Navigate to the ledger `Accept` window by using the ledger's
right button, and then authorize the request by pressing both left and right buttons.

```
Subnet has been created with ID: 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew. Now creating blockchain...
*** Please sign blockchain creation hash on the ledger device *** 
```

After successful subnet creation, the user will be asked to sign the blockchain creation tx.

On the ledger a `Sign Hash` window will be active. Navigate to the ledger `Accept` window by using the ledger's
right button, and then authorize the request by pressing both left and right buttons.

On success, subnet deploy details will be provided. As only 1 address signed the chain creation tx, a
file will be written to disk to save the tx so as to continue the signing process with another command.

```
+--------------------+----------------------------------------------------+
| DEPLOYMENT RESULTS |                                                    |
+--------------------+----------------------------------------------------+
| Chain Name         | testsubnet                                         |
+--------------------+----------------------------------------------------+
| Subnet ID          | 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew |
+--------------------+----------------------------------------------------+
| VM ID              | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii  |
+--------------------+----------------------------------------------------+

1 of 2 required Blockchain Creation signatures have been signed. Saving tx to disk to enable remaining signing.

Path to export partially signed tx to:
```

Enter name of file to write to disk, in this example, `partiallySigned.txt`. Should not exist on disk.
CLI will ask until this condition is met.

```
Path to export partially signed tx to: partiallySigned.txt

Addresses remaining to sign the tx
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Connect a ledger with one of the remaining addresses or choose a stored key and run the signing command, or send "partiallySigned.txt" to another user for signing.

Signing command:
  avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
```

CLI asks the user to use another ledger, ledger 1 in this case which contains the address `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af` to continue the signing process with `transaction sign` command.

## Sign and commit the chain creation tx with the transaction commands

### Ledger 1

Connect ledger 1 device, unblock it, and run the Avalanche Ledger Application, as described in [How to use Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche) (up to and including point 4).
Remember that Ledger 1 does not need to have funds, nd will be used to provide subnet auth only, not to pay fees.

When using CLI, it should recognize the ledger and use the associated address `P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af`
as the one to do the second signature of the tx.

### Issue the command to sign the tx

Transaction in partiallySigned.txt will be recognized as `Mainnet` one, and so ledger will be used automatically
for signing. In the `Fuji` case, the user will be prompted to choose the signing mechanism.

```
avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
*** Please provide extended public key on the ledger device ***
```

On the ledger a `Provide Extended Public Key` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

```
Ledger address: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Please sign tx hash on the ledger device *** 
```

Next, a new signing will be started for the create chain tx. If the ledger is not the correct one, the following
error should appear instead:

```
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
Error: wallet does not contain subnet auth keys
exit status 1
```

On the ledger a `Sign Hash` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

After that the tx will be recognized as having all required signatures. If the threshold were larger,
the `transaction sign` command should be used as many times as needed with the different ledgers.

```

All 2 required Tx signatures have been signed. Saving tx to disk to enable commit.

Overwritting partiallySigned.txt

Tx is fully signed, and ready to be committed

Commit command:
  avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

Now, partiallySigned.txt constains a fully signed tx, ready to be deployed.

### Issue the command to commit the tx

```
avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

tx will be recognized as `Mainnet` one, and automatically deployed.

```
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

Now you have deployed a subnet to `Mainnet` by using 2 ledgers to accomplish a multisig process!

## Create and sign multisig txs with the addValidator command

addValidator command will also behave multisig, if the subnet was previously deployed with
appropiate multisig params in control keys and threshold.

Let's continue with the example of 5 control keys and threshold of two.

```
avalanche subnet addValidator testsubnet
```

First will need to specify the network. Select `Mainnet`

```
Use the arrow keys to navigate: ↓ ↑ → ← 
? Choose a network to add validator to.: 
  ▸ Fuji
    Mainnet
```

Then, similar to deploy, user is asked to select the 2 control keys to be used to sign the tx. Note
there is no need to ask for the main set of control keys (the 5 given on deploy), or the threshold. That is
already saved on chain for testsubnet.

```
✔ Mainnet
Use the arrow keys to navigate: ↓ ↑ → ← 
? Choose a subnet auth key: 
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
````

As before, the user will need to indicate to use both ledger addresses for auth, and will need to have ledger 0
connected in order to pay for the fee (0.001 AVAX) and be the first subnet auth signer.

```
✔ Mainnet
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Your subnet auth keys for add validator tx creation: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af].
```

Lets skip the validation node/period prompt description, as it is already described [here](./create-a-mainnet-subnet#add-a-avalidator). 

Only note that start time for validator is not selected to be in one minute, to give more time to all the signing process
to be finished.

```
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

Now the command ask the user to authorize the ledger to provide public key.

On the ledger a `Provide Extended Public Key` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

```
Ledger address: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
*** Please sign add validator hash on the ledger device *** 
```

After that, ledger 0 address is shown, and the user is asked to sign add validator tx on ledger.

```
Partial tx created

1 of 2 required Add Validator signatures have been signed. Saving tx to disk to enable remaining signing.

Path to export partially signed tx to:
```

As the case is multisig, tx is not fully signed, and a file is asked to write into, lets use partialAddValidatorTx.txt

```
Path to export partially signed tx to: partialAddValidatorTx.txt

Addresses remaining to sign the tx
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Connect a ledger with one of the remaining addresses or choose a stored key and run the signing command, or send "partialAddValidatorTx.txt" to another user for signing.

Signing command:
  avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

## Sign and commit the add validator tx with the transaction commands

Process is pretty similar to signing of chain creation tx. So some details will be omitted now.

First, be sure that ledger 1 is connected, unblocked, and with Avalanche Ledger App running.

### Issue the command to sign the tx

Transaction in partialAddValidatorTx.txt will be recognized as `Mainnet` one, and so ledger will be used automatically
for signing.

```
avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
*** Please provide extended public key on the ledger device ***
```

On the ledger a `Provide Extended Public Key` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

```
Ledger address: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Please sign tx hash on the ledger device *** 
```

Next, a new signing will be started for the create chain tx.

On the ledger a `Sign Hash` window will be active. Navigate to the ledger `Accept` window by using
the ledger's right button, and then authorize the request by pressing both left and right buttons.

After that the tx will be recognized as having all required signatures.

```

All 2 required Tx signatures have been signed. Saving tx to disk to enable commit.

Overwritting partialAddValidatorTx.txt

Tx is fully signed, and ready to be committed

Commit command:
  avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

Now, partialAddValidatorTx.txt constains a fully signed tx, ready to be deployed.

### Issue the command to commit the tx

```
avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

tx will be recognized as `Mainnet` one, and automatically deployed.

```
Transaction successful, transaction ID: K7XNSwcmgjYX7BEdtFB3hEwQc6YFKRq9g7hAUPhW4J5bjhEJG
```

Now you have added a validator to the a subnet on `Mainnet` by using 2 ledgers to accomplish a multisig process!

