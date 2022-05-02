---
sidebar_position: 1
---
# Avalanche Native Tokens and ARC-20s

## What is an Avalanche Native Token?

An Avalanche Native Token (ANT) is a fixed-cap or variable-cap token created on the X-Chain. These tokens can be exchanged at lightning fast speeds on the X-Chain, which takes advantage of the superior performance of a DAG over a linear chain. In this document, Avalanche Native Tokens do not include non-fungible tokens (NFTs) created on the X-Chain.

## Why move an ANT from the X-Chain to the C-Chain?

Smart contract functionality requires a total ordering of state transitions (transactions). As a result, ANTs must be moved to the C-Chain if they are to be used in smart contracts.

## Tokens on the C-Chain

### AVAX

AVAX plays the same role on the C-Chain that ETH does on the Ethereum Network. When you create or call a smart contract, you pay the transaction fee (gas cost) with AVAX. You can transfer AVAX between accounts and send AVAX to a smart contract using native EVM tools and libraries.

### ANTs

ANTs, however, have no counterpart within the EVM. Therefore, the C-Chain has some modifications to support holding ANT balances and transferring ANTs on the C-Chain.

The C-Chain keeps a mapping \[assetID -&gt; balance\] in each account's storage to support ANTs. These tokens can be exported back to the X-Chain, or they can be used on the C-Chain using `nativeAssetCall` and `nativeAssetBalance`. `nativeAssetCall` and `nativeAssetBalance` are precompiled contracts released in Apricot Phase 2 that allow richer use of ANTs on the C-Chain.

#### nativeAssetCall

An EVM Transaction is composed of the following fields:

* **`nonce`** Scalar value equal to the number of transactions sent by the sender.
* **`gasPrice`** Scalar value equal to the number of Wei (1 Wei = 10^-18 AVAX) paid per unit of gas to execute this transaction.
* **`gasLimit`** Scalar value equal to the maximum amount of gas that should be used in executing this transaction.
* **`to`** The 20 byte address of the message call's recipient. If the transaction is creating a contract, `to` is left empty.
* **`value`** Scalar value of native asset (AVAX), in Wei (1 Wei = 10^-18 AVAX), to be transferred to the message call's recipient or in the case of a contract creation, as an endowment to the newly created contract.
* **`v, r, s`** Values corresponding to the signature of the transaction.
* **`data`** Unlimited size byte array specifying the input data to a contract call or, if creating a contract, the EVM bytecode for the account initialization process.

`nativeAssetCall` is a precompiled contract at address `0x0100000000000000000000000000000000000002`. `nativeAssetCall` allows users to atomically transfer a native asset to a given address and, optionally, make a contract call to that address. This is parallel to how a normal transaction can send value to an address and atomically call that address with some `data`.

Note: the caller of `nativeAssetCall` is forwarded to the `address` defined in the call. This means that when `Address A` invokes a contract through `nativeAssetCall`, the contract will pereceive the caller (or `msg.sender`) as `Address A`. This enables the deposit logic that we use to create ARC-20 contracts.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

These arguments can be packed by `abi.encodePacked(...)` in Solidity since there is only one argument with variadic length (`callData`). The first three arguments are constant length, so the precompiled contract simply parses the call input as:

```text
+-------------+---------------+--------------------------------+
| address     : address       |                       20 bytes |
+-------------+---------------+--------------------------------+
| assetID     : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| assetAmount : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| callData    : bytes memory  |            len(callData) bytes |
+-------------+---------------+--------------------------------+
                              |       84 + len(callData) bytes |
                              +--------------------------------+
```

**Example**

For example, to send an ANT with an assetID of `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK` from address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` to address `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`, first convert the assetID to hex, `0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`. Next concatenate the address which is receiving the ANT, assetID and assetAmount and POST the value as the `data` param to the `0x0100000000000000000000000000000000000002` address using the `eth_sendTransaction` RPC.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_sendTransaction",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000002",
            "from": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
            "value": "",
            "gas": "0x2DC6C0",
            "gasPrice": "0x34630B8A00",
            "data": "0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57ec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7000000000000000000000000000000000000000000000000000000000000012c"
        }
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x451ffb79936be1baba438b591781192cbc9659d1f3a693a7a434b4a93dda639f"
}
```

#### nativeAssetBalance

`nativeAssetBalance` is a precompiled contract at address `0x0100000000000000000000000000000000000001`. `nativeAssetBalance` is the ANT equivalent of using `balance` to get the AVAX balance.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

These arguments can be packed by `abi.encodePacked(...)` in Solidity since all of the arguments have constant length.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Example**

For example, to get the balance of address `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC` and assetID `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`, first convert the assetID to hex, `0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`. Next concatenate the address and assetID and POST the value as the `data` param to the `0x0100000000000000000000000000000000000001` address using the `eth_call` RPC.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000001",
            "data": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FCec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7"
        },
        "latest"
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x000000000000000000000000000000000000000000000000000000000000012c"
}
```

## ARC-20s

An ARC-20 is an ERC-20 token that wraps an underlying Avalanche Native Token, similar to how WAVAX wraps AVAX.

### What is an ERC-20

An ERC-20 is a standardized token type on Ethereum. It presents a standard set of functions and events that allow a smart contract to serve as a token on Ethereum. For a complete explanation, read the original proposal [here](https://eips.ethereum.org/EIPS/eip-20).

ERC-20s expose the following interface:

```text
// Functions
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

// Events
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

An ERC-20 is implemented by a smart contract, meaning they maintain their own state. That is, if your account owns 5 of a given ERC-20, then the data that gives your account ownership is actually stored in that ERC-20's contract. By contrast, an ETH balance is kept in your own account's storage.

### From ANT to ARC-20

Unlike ERC-20s, Avalanche Native Tokens (ANTs) are stored directly on the account that owns them. ANTs can be "wrapped" in order to make them usable in smart contracts on the C-Chain. We call this wrapped asset an ARC-20. To do this, we add an `assetID` field to a regular ERC-20 contract to represent the underlying asset that the ARC-20 wraps.

Additionally, the ARC-20 contract supports two additional functions: `withdraw` and `deposit`. To implement this, ARC-20s need to use the precompiled contracts: `nativeAssetCall` and `nativeAssetBalance`.

#### Contract Balance / Total Supply

ERC-20s typically have a total supply field, but this can mean different things in the context of a wrapped asset. The total supply could indicate the total supply of the non-wrapped asset on the entire platform or the amount of the asset in the wrapper contract.

For simplicity, we use total supply to indicate the total supply of the wrapped asset in the ARC-20 contract.

#### ARC-20 Deposits

In order to deposit funds into an ARC-20, we need to send the ARC-20 contract the deposit amount and then invoke the contract's deposit function so that the contract can acknowledge the deposit and update the caller's balance. This is similar to WETH (Wrapped ETH) on Ethereum. With WETH, this can be accomplished with a simple `call` because that method allows the caller to both send ETH and invoke a smart contract atomically. With non-AVAX ARC-20s, `nativeAssetCall` allows the same functionality for ANTs on the C-Chain.

For example:

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 3000000
* **`to`**: `0x0100000000000000000000000000000000000002`
* **`value`**: 0
* **`v, r, s`**: \[Transaction Signature\]
* **`data`**: abi.encodePacked(arc20Address, assetID, assetAmount, abi.encodeWithSignature("deposit()"))

This transfers `assetAmount` of `assetID` to the address of the ARC-20 contract and then calls `deposit()` on the contract.

The deposit function uses the previous value of the total supply to calculate how much of `assetID` it has received in the deposit. Because `nativeAssetCall` propagates its caller to the contract being invoked, when deposit is called, the ARC-20 contract sees `msg.sender` as the original caller of `nativeAssetCall` and can increment the balance on behalf of the correct address accordingly.

Note: the contract's balance of `assetID` may become out of sync with the total supply if someone sends funds to the contract without calling `deposit()`. In this case, the next account that calls `deposit()` would receive credit for the previously sent funds.

```go
    function deposit() public {
        uint256 updatedBalance = NativeAssets.assetBalance(address(this), _assetID);
        uint256 depositAmount = updatedBalance - _totalSupply;
        assert(depositAmount >= 0);

        _balances[msg.sender] += depositAmount;
        _totalSupply = updatedBalance;
        emit Deposit(msg.sender, depositAmount);
    }
```

#### ARC-20 Withdrawals

When an ARC-20 contract receives a withdrawal request, it simply verifies that there's a sufficient account balance, updates the balance and total supply, and sends the funds to the withdrawer with `nativeAssetCall`. The ARC-20s withdraw function looks like this:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

