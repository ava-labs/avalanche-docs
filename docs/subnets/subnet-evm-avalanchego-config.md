# AvalancheGo Chain Configs

As described in [this doc](../nodes/maintain/chain-config-flags.md#subnet-chain-configs), each blockchain
of Subnets can have its own custom configuration. If a Subnet's ChainID is
`2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt`, the config file for this chain is located at
`{chain-config-dir}/2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt/config.json`.

For blockchains created by or forked from Subnet-EVM, most
[C-Chain configs](../nodes/maintain/chain-config-flags.md#c-chain-configs) are applicable except
[Avalanche Specific APIs](../nodes/maintain/chain-config-flags.md#enabling-avalanche-specific-apis).

## Priority Regossip

A transaction is "regossiped" when the node does not find the transaction in
a block after `priority-regossip-frequency` (defaults to `1m`). By default, up to 16 transactions
(max 1 per address) are regossiped to validators per minute.

Operators can use "priority regossip" to more aggressively "regossip" transactions for a set of
important addresses (like bridge relayers). To do so, you'll need to update your
[chain config](../nodes/maintain/chain-config-flags.md#subnet-chain-configs) with the following:

```json
{
  "priority-regossip-addresses": ["<YOUR 0x-ADDRESS>"]
}
```

By default, up to 32 transactions from priority addresses (max 16 per address) are regossipped to
validators per second. You can override these defaults with the following config:

```json
{
  "priority-regossip-frequency": "1s",
  "priority-regossip-max-txs": 32,
  "priority-regossip-addresses": ["<YOUR 0x-ADDRESS>"],
  "priority-regossip-txs-per-address": 16
}
```

## Fee Recipient

This works together with 
[`allowFeeRecipients`](subnet-evm-genesis.md#setting-a-custom-fee-recipient) and
[RewardManager precompile](subnet-evm-precompiles.md#changing-fee-reward-mechanisms) 
to specify where the fees should be sent to.

With `allowFeeRecipients` enabled, validators can specify their addresses to collect fees.

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```

:::warning

If `allowFeeRecipients` or `RewardManager` precompile is enabled on the Subnet, but a validator
doesn't specify a "feeRecipient", the fees will be burned in blocks it produces.

:::
