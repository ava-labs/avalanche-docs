# How to Transfer funds between different ledgers, or addresses of the same ledger

Ocassionaly, there is a need to move funds between different ledgers, or different addresses owned
by the same ledger.

A case for the former is for a subnet control ledger to spend all funds in previous operations, and, 
as a subnet control ledger can not be changed, there is a need to transfer to it for another funded account.

A case for the later is related eg to ledger funding using web wallet tranfers, which sometimes fund a ledger
address associated to an index different from zero. As CLI by default uses ledger index 0, sometimes a
movement of the funds is prefered for the CLI to work with default settings.

As transfers between P-Chain addresses are not currently supported in wallets, CLI has added this
command to enable them.

Internally it consists on a series of import/export operations involving also the X-Chain, and so the 
fee for this operation is 4 times the fee for a typical import operations, that is, 0.004 AVAX. Check [this](https://docs.avax.network/quickstart/transaction-fees) for fees information.


:::note

The `key transfer` command also can be applied to stored keys managed by CLI. That is, it enables
moving funds from one stored key to another, and from ledger to a stoger key or the other way.

Anyway, this tutorial will focus on the most expected use case of ledger funding requirement.


## Prerequisites

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) installed
- Multiple Ledger devices [configured for Avalanche](./create-a-mainnet-subnet#setting-up-your-ledger)

## Send all funds from one ledger to another

Let's cover all cases with the following one:

- source address is ledger A, index 2 (say web wallet funds for that ledger appear at that index)
- target address is ledger B, index 0 (expected by CLI in standard ops)
- funds on ledger A index 2 are 4.5 AVAX

### Decide on which index of ledger A to use

A check may be needed to find out which index is being used by the web wallet. Say web wallet
shows 4.5 AVAX available on p-chain address P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0

With the ledger A connected and the avalache app running, execute:

```bash
avalanche key list --mainnet --ledger 0,1,2,3,4,5
```

To see p-chain addresses and balances for the first 6 indices in the ledger derivated owner addresses

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

Other indices can be explored by changing the `ledger` param value.

As can be noticed, the addresses `P-avax10an3cucdfqru984pnvv6y0rspvvclz63e523m0` indeed has 4.5 AVAX and is
associated to index 2 of the ledger A.

:::note

A ledger manages an infinite amount of addresses derivated from a main private key, that is way 
in certain ocasions there is a need to specify which address or which index of a ledger are we
operating with.

### Decide on which index of ledger B to use

In this case the user already decided that. He wants to use index 0 of ledger B, the one expected by
default by the CLI to contain funds. Let's say ledger B is a control ledger for the user subnet.

In this case the user can also connect ledger B and check the first addreses. Say:

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm |       0 | Mainnet |
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

So, target address of ledger B is `P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm`, and has no funds.

### Execute the sending part of the transfer operation

A P-Chain to P-chain transfer is a two-part operation. First part starts the process, move the money outs of the source account into a X-Chain account owner by the receptor. It needs to be signed by the sending ledger.

For this part on, the specific amount to send needs to be calculated in order to also contemplate for the fees.
The sending ledger is the one that pays all the fees in this transfer. As such, the amount to be received 
by ledger B is going to be 4.496, that is, the current 4.5 after paying fees.

That amount, 4.496, is the one that needs to be specified to the `key transfer` command.

Let's start it:

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

Next, the key source for the sender address. That is, the key that will sign the sending
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

Next, the amount to send is asked for. 4.496 as explained before:

```text
✗ Amount to send (AVAX units): 4.496
```

The, the receiver address is required. Fill in with `P-avax1r4aceznjkz8ch4pmpqrmkq4f3sl952mdrdt6xm`:

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

### Execute the receiving part of the transfer operation

This part of the operation, to be signed by ledger B, will take the funds from a X account owned by B,
and move them to the expected P-Chain address.

Connect ledger B and execute avalanche app.

Let's start it:

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

Then, select Ledger (B in this case) as the key source that will sign the receiver operations.

```text
? Which key source should be used to  for the receiver address?:
    Use stored key
  ▸ Use ledger
```

Next, the ledger index is asked for. Input `0`:

```text
✗ Ledger index to use: 0
```

Next, the amount to receive is asked for. 4.496 as explained before:

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

### Verifying results of the transfer operation using `key list`

First check on ledger A side. Put ledger A and open avalanche app:

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

Next, check on ledger B side. Connect ledger B and open avalanche app:

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

### Recovery steps

As a multi step operation, the receiving part of the transfer can have intermediate errors, due eg to
temporal network connections on the client side.

CLI will take the error an provide the user with a recovery message of the kind:

```
ERROR: restart from this step by using the same command with extra arguments: --receive-recovery-step 1
```

In this case, the receiving operation should be started the same way, but with the extra suggested param:

```bash
avalanche key transfer --receive-recovery-step 1
```

Then, the user should choose the same options, and CLI will resume where it left off.

