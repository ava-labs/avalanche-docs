
# Genesis

## Description
 
Each blockchain has some genesis state when it’s created. Each Virtual Machine defines the format and
semantics of its genesis data.

The default genesis Subnet-EVM provided below has some well defined parameters:

```json
{
  "config": {
    "chainId": 43214,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "subnetEVMTimestamp": 0,
    "feeConfig": {
      "gasLimit": 15000000,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "targetBlockRate": 2,
      "blockGasCostStep": 200000
    },
    "allowFeeRecipients": false
  },
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x00",
  "gasLimit": "0x7A1200",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

### Chain Config

`chainID`: Denotes the ChainID of to be created chain. Must be picked carefully since a conflict with
other chains can cause issues. One suggestion is to check with [chainlist.org](https://chainlist.org/)
to avoid ID collision, reserve and publish your ChainID properly.

You can use `eth_getChainConfig` RPC call to get the current chain config. See
[here](../apis/avalanchego/apis/subnet-evm.md#ethgetchainconfig) for more info.

#### Hard Forks

`homesteadBlock`, `eip150Block`, `eip150Hash`, `eip155Block`, `byzantiumBlock`, `constantinopleBlock`,
`petersburgBlock`, `istanbulBlock`, `muirGlacierBlock`, `subnetEVMTimestamp` are hard fork activation
times. Changing these may cause issues, so treat them carefully.

#### Fee Config

`gasLimit`: Sets the max amount of gas consumed per block.

`targetBlockRate`: Sets the target rate of block production in seconds. A target of 2 will target
producing a block every 2 seconds. If the network starts producing faster than this, base fees are
increased accordingly.

`minBaseFee`: Sets a lower bound on the EIP-1559 base fee of a block. Since the block's base fee sets
the minimum gas price for any transaction included in that block, this effectively sets a minimum gas
price for any transaction.

`targetGas`: Specifies the targeted amount of gas (including block gas cost) to consume within a
rolling 10-seconds window. When the dynamic fee algorithm observes that network activity is
above/below the `targetGas`, it increases/decreases the base fee proportionally to how far above/below
the target actual network activity is. If the network starts producing blocks with gas cost higher than
this, base fees are increased accordingly.

`baseFeeChangeDenominator`: Divides the difference between actual and target utilization to determine
how much to increase/decrease the base fee. A larger denominator indicates a slower changing, stickier
base fee, while a lower denominator allows the base fee to adjust more quickly.

`minBlockGasCost`: Sets the minimum amount of gas to charge for the production of a block.

`maxBlockGasCost`: Sets the maximum amount of gas to charge for the production of a block.

`blockGasCostStep`: Determines how much to increase/decrease the block gas cost depending on the
amount of time elapsed since the previous block.

If the block is produced at the target rate, the block gas cost will stay the same as the block gas
cost for the parent block.

If it is produced faster,/slower, meaning there are many/few blocks being issued to the blockchain 
the block gas cost will be increased/decreased by the step value for
each second faster/slower than the target block rate accordingly.

:::note
If the `blockGasCostStep` is set to a very large number, it effectively requires block production to
go no faster than the `targetBlockRate`. For example, if a block is produced two seconds faster than
the target block rate, the block gas cost will increase by `2 * blockGasCostStep`.

:::

#### Custom Fee Recipients

See section [Setting a Custom Fee Recipient](#setting-a-custom-fee-recipient)

### Alloc

`alloc` defines addresses and their initial balances. This should be changed accordingly for each chain.
If you don't provide any genesis allocation, you won't be able to interact with your new chain (all
transactions require a fee to be paid from the sender's balance).

See a detailed guide on how to customize this allocation [here](#setting-the-genesis-allocation).

### Header

The fields `nonce`, `timestamp`, `extraData`, `gasLimit`, `difficulty`, `mixHash`, `coinbase`,
`number`, `gasUsed`, `parentHash` defines the genesis block header. The field `gasLimit` should be
set to match the `gasLimit` set in the `feeConfig`. You do not need to change any of the other genesis
header fields.

#### `nonce`

Nonce is a number added to a hashed block in a blockchain that, when rehashed, 
meets the difficulty level restrictions. It is commonly set to `0x0`.

#### `timestamp`

The timestamp of the creation of the genesis block. It is commonly set to `0x0`.

#### `extraData`

Optional extra data that can be included in the genesis block. This is commonly set to `0x`.

#### `gasLimit`

Sets the max amount of gas consumed per block. should be set to match the `gasLimit` set in the `feeConfig`

#### `difficulty`

The difficulty level applied during the nonce discovering of this block. 
It is usually set to `0x0` for the genesis block.

#### `mixHash`

This is used together with `nonce`to determine if the block is valid. 
Commonly set to `0x0000000000000000000000000000000000000000000000000000000000000000` for genesis block.

#### `coinbase`

This special transaction is the first transaction in a block and specifies the address to be 
rewarded due to the generation of a new block. In the context of Avalanche, this coinbase address will
receive all the transaction fees if a Reward Manager precompile mechanism is set.
It is usually set to `0x0000000000000000000000000000000000000000` for the genesis block.

#### `number`

This is the number of the genesis block. It is usually set to `0x0`.

#### `gasUsed`

This is the amount of gas used by the genesis block. It is usually set to `0x0`.

#### `parentHash`

This is the Keccak 256-bit hash of the entire parent block’s header. 
It is usually set to `0x0000000000000000000000000000000000000000000000000000000000000000` 
for the genesis block.

## Subnet-EVM Precompiles 

Precompiles can be used to add specific functionality to Subnet-EVM. This precompiled
contracts can activated directly in the genesis file or as an Upgrade. 
See [Precompiles](../subnets/subnet-evm-precompiles) for a detailed explanation on how to
integrate them in the genesis file.


## Setting a Custom Fee Recipient

By default, all fees are burned (sent to the black hole address with `"allowFeeRecipients": false`).
However, it is possible to enable block producers to set a fee recipient (who will get compensated
for blocks they produce).

There are 2 ways to enable this feature: 

- [Precompile](../subnets/subnet-evm-precompiles#changing-fee-reward-mechanisms) 
- Genesis

To enable this in the genesis, you'll need to add the following to your
genesis file (under the `"config"` key):

```json
{
  "config": {
    "allowFeeRecipients": true
  }
}
```

### Fee Recipient Address

With `allowFeeRecipients` enabled, your validators can specify their addresses to collect fees. 
They need to update their 
[EVM chain config](../subnets/subnet-evm-network-upgrades.md#avalanchego-chain-configs) 
with the following to specify where the fee should be sent to.

```json
{
  "feeRecipient": "<YOUR 0x-ADDRESS>"
}
```

:::warning

If `allowFeeRecipients` feature is enabled on the Subnet, but a validator doesn't specify a
"feeRecipient", the fees will be burned in blocks it produces.

:::


## Setting the Genesis Allocation

The `alloc` field expects key-value pairs. Keys of each entry must be a valid `address`. The `balance`
field in the value can be either a `hexadecimal` or `number` to indicate initial balance of the address.
The default value contains `8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` with `50000000000000000000000000`
balance in it. Default:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x295BE96E64066972000000"
    }
  }
```

To specify a different genesis allocation, populate the `alloc` field in the genesis JSON as follows:

```json
  "alloc": {
    "8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    },
    "Ab5801a7D398351b8bE11C439e05C5B3259aeC9B": {
      "balance": "0xa796504b1cb5a7c0000"
    }
  },
```

The keys in the allocation are [hex](https://en.wikipedia.org/wiki/Hexadecimal) addresses
**without the canonical `0x` prefix**. The balances are denominated in Wei
([10^18 Wei = 1 Whole Unit of Native Token](https://eth-converter.com/)) and expressed as hex strings
**with the canonical `0x` prefix**. You can use [this converter](https://www.rapidtables.com/convert/number/hex-to-decimal.html)
to translate between decimal and hex numbers.

The above example yields the following genesis allocations (denominated in whole units of the native
token, that is 1 AVAX/1 WAGMI):

<!-- markdownlint-disable MD013 -->

```text
0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC: 100000000 (0x52B7D2DCC80CD2E4000000=100000000000000000000000000 Wei)
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B: 49463 (0xa796504b1cb5a7c0000=49463000000000000000000 Wei)
```

<!-- markdownlint-enable MD013 -->

## Genesis Examples

Some examples of a genesis file can be found in the
[networks folder](https://github.com/ava-labs/subnet-evm/blob/master/networks/testnet/11111/genesis.json).
Note: please remove `airdropHash` and `airdropAmount` fields if you want to start with it.

Here are a few examples on how a genesis file is used:

- [scripts/run.sh](https://github.com/ava-labs/subnet-evm/blob/master/scripts/run.sh#L99)

