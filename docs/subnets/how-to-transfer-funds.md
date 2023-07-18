---
description: To enable direct transfers between ledger P-Chain addresses,
use the Avalanche-CLI command `avalanche key transfer`.
sidebar_label: Directly Transfer Funds
---
# How to Use Avalanche-CLI to Transfer P-Chain Funds
It is sometimes necessary to transfer funds between different ledgers, or between
different accounts or addresses in our ledger. This could be due to various reasons:
1. Moving funds to a Subnet control ledger from another funded account
because the Subnet control ledger cannot be changed.
2. Transferring funds to a ledger address with a different index, which is
sometimes required for the command-line tool (CLI) to work with default
settings.
To enable direct transfers between P-Chain addresses, use the command
`avalanche key transfer`. This operation involves a series of import/export
actions with the P-Chain and X-Chain. The fee for this operation is four times the typical
import operation fee, which comes out to 0.004 AVAX. You can find more
information about fees [here](https://docs.avax.network/quickstart/transaction-fees).

:::note

The `key transfer` command can also be applied to the stored keys managed by the CLI. It enables
moving funds from one stored key to another, and from a ledger to a stored key or the other way.

Anyway, this tutorial focus on the most expected user case of transferring between ledger accounts.

## Prerequisites

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed
- Multiple Ledger devices [configured for Avalanche](./create-a-mainnet-subnet#setting-up-your-ledger)

## Example: Sending All Funds From One Ledger to Another

- Source address: ledger A, index 2 (the web wallet shows 4.5 AVAX for this ledger)
- Target address: ledger B, index 0 (the web wallet shows 0 AVAX for this ledger)

### Decide on Which Index of Ledger A to Use

It is needed to find out which index is being used by the web wallet. Say that the web wallet
shows 4.5 AVAX available on p-chain address P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0

With the ledger A connected and the avalache app running, execute:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

To see p-chain addresses and balances for the first 6 indices in the ledger derived owner addresses.

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1g8yucm7j0cnwwru4rp5lkzw6dpdxjmc2rfkqs9 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 1 |                         | P-avax1drppshkst2ccygyq37m2z9e3ex2jhkd2txcm5r |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 2 |                         | P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 |     4.5 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 3 |                         | P-avax1yfpm7v5y5rej2nu7t2r0ffgrlpfq36je0rc5k6 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 4 |                         | P-avax17nqvwcqsa8ddgeww8gzmfe932pz2syaj2vyd89 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 5 |                         | P-avax1jzvnd05vsfksrtatm2e3rzu6eux9a287493yf8 |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

As can be noticed, the address `P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0` indeed has 4.5 AVAX and
is associated to index 2 of the ledger A.

:::note

A ledger manages an infinite amount of addresses derived from a main private key, and due to this,
in certain operations there is a need to specify which address or which index of the ledger is the user
operating against.

### Decide which Index of Ledger B to Use and Find Out the Associated Address

In this case the user wants to use index 0, the one CLI by default expects to contain funds.

For the transfer command, it is also needed to know the target p-chain address. Do the following to
obtain it:

With the ledger B connected and the avalache app running, execute:

```bash
avalanche key list --mainnet --ledger 0
```

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

Target address to be used is `P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm`, containing 0 funds.

### Execute the Sending Part of the Transfer Operation

A P-Chain to P-chain transfer is a two-part operation. There is no need for the two parts to be executed
on the same machine, only for them to have some common params. For each part, the appropriate ledger
(either source or target) must be connected to the machine executing it.

First part starts the process, and moves the money out of the
source account into a X-Chain account owner by the receptor. It needs to be signed by the sending ledger.

The amount to be specified as input to the command is the amount to be received on the target address.

As in this example the users wants to send all the balance of 4.5, so he needs to consider a fee payment
of 0.004, and tell the command to transfer 4.496.

Take into account that the sending ledger is the one that is going to pay all the fees.

Then start the command:

```bash
avalanche key transfer
```

First step is to specify the network. `Mainnet` in this case:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Network to use:
  ▸ Mainnet
    Fuji
    Local Network
```

Next, the step of the transfer must be specified. Send in this case:

```text
? Step of the transfer:
  ▸ Send
    Receive
```

Next, the key source for the sender address. That is, the key that is going to sign the sending
transactions. Select `Use ledger`:

```text
? Which key source should be used to  for the sender address?:
    Use stored key
  ▸ Use ledger
```

Next, the ledger index is asked for. Input `2`:

```text
✗ Ledger index to use: 2
```

Next, the amount to be sent is asked for:

```text
✗ Amount to send (AVAX units): 4.496
```

The, the target address is required:

```text
✗ Receiver address: P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm
```

After that, a confirmation message is printed. Read carefully and choose `Yes`:

```text
this operation is going to:
- send 4.496000000 AVAX from P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 to target address P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm
- take a fee of 0.004000000 AVAX from source address P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0

Use the arrow keys to navigate: ↓ ↑ → ←
? Confirm transfer:
    No
  ▸ Yes
```

After this, the first part is completed:

```text
Issuing ExportTx P -> X
```

### Execute the Receiving Part of the Transfer Operation

This part of the operation, to be signed by ledger B, is going to take the funds from a X account owned
by B, and move them to the expected P-Chain address.

Connect ledger B and execute avalanche app.

Then start the command:

```bash
avalanche key transfer
```

Specify the `Mainnet` network:

```text
Use the arrow keys to navigate: ↓ ↑ → ←
? Network to use:
  ▸ Mainnet
    Fuji
    Local Network
```

Next, the step of the transfer must be specified. Receive in this case:

```text
? Step of the transfer:
    Send
  ▸ Receive
```

Then, select Ledger as the key source that is going to sign the receiver operations.

```text
? Which key source should be used to  for the receiver address?:
    Use stored key
  ▸ Use ledger
```

Next, the ledger index is asked for. Input `0`:

```text
✗ Ledger index to use: 0
```

Next, the amount to receive is asked for:

```text
✗ Amount to send (AVAX units): 4.496
```

After that, a confirmation message is printed. Select `Yes`:

```text
this operation is going to:
- receive 4.496000000 AVAX at target address P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm:

Use the arrow keys to navigate: ↓ ↑ → ←
? Confirm transfer:
    No
  ▸ Yes
```

Finally, the second part of the operation is executed and the transfer is completed.

```text
Issuing ImportTx P -> X
Issuing ExportTx X -> P
Issuing ImportTx X -> P
```

### Verifying Results of the Transfer Operation using `key list`

First verify ledger A accounts. Connect ledger A and open the avalanche app:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

With result:

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1g8yucm7j0cnwwru4rp5lkzw6dpdxjmc2rfkqs9 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 1 |                         | P-avax1drppshkst2ccygyq37m2z9e3ex2jhkd2txcm5r |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 2 |                         | P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 3 |                         | P-avax1yfpm7v5y5rej2nu7t2r0ffgrlpfq36je0rc5k6 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 4 |                         | P-avax17nqvwcqsa8ddgeww8gzmfe932pz2syaj2vyd89 |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 5 |                         | P-avax1jzvnd05vsfksrtatm2e3rzu6eux9a287493yf8 |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

Next, verify ledger B accounts. Connect ledger B and open the avalanche app:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

With result:

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm |   4.496 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 1 |                         | P-avax18e9qsm30du590lhkwydhmkfwhcc9999gvxcaez |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 2 |                         | P-avax1unkkjstggvdty5gtnfhc0mgnl7qxa52z2d4c9y |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 3 |                         | P-avax1ek7n0zky3py7prxcrgnmh44y3wm6lc7r7x5r8e |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 4 |                         | P-avax1rsz6nt6qht5ep37qjk7ht0u9h30mgfhehsmqea |       0 | Mainnet |
+        +---------+                         +-----------------------------------------------+---------+---------+
|        | index 5 |                         | P-avax17u5wm4tfex7xr27xlwejm28pyk84tj0jzp42zz |       0 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

### Recovery Steps

As a multi step operation, the receiving part of the transfer can have intermediate errors, due for example
to temporal network connections on the client side.

The CLI is going to capture errors and provide the user with a recovery message of the kind:

```text
ERROR: restart from this step by using the same command with extra arguments: --receive-recovery-step 1
```

If this happen, the receiving operation should be started the same way, choosing the same options, but
adding the extra suggested parameter:

```bash
avalanche key transfer --receive-recovery-step 1
```

Then, the CLI is going to resume where it left off.

