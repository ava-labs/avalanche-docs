# Coreth ANTs and ARC-20s

## ANTs on the C-Chain

### Why move an ANT from the X-Chain to the C-Chain?

An Avalanche Native Token (ANT) is any token created on the X-Chain. These tokens can be exchanged on the X-Chain at lightning fast speeds taking advantage of the superior performance offered by using a DAG instead of a strictly linear chain.

When we want to use smart contract functionality, we need a total ordering of state transitions (transactions), in order to give smart contract calls the freedom to modify state. As a result, when we want to use smart contract functionality, we'll move ANT's to the C-Chain to run contracts on the EVM.

### ANTs on the C-Chain

#### Native Coin - AVAX

ANTs on the C-Chain are either AVAX&mdash;the Avalanche native coin&mdash;or another asset that was created on the X-Chain.

The C-Chain is a modified instance of the Ethereum Virtual Machine (EVM), so AVAX on the C-Chain is equivalent to ETH on the Ethereum Network. When you create or call a smart contract, you pay for gas costs with AVAX. You can natively transfer AVAX between accounts, send it to a smart contract, all using native EVM tools and libraries.

An EVM Transaction is composed of the following fields:

* **`nonce`** Scalar value equal to the number of transactions sent by the sender
* **`gasPrice`** Scalar value equal to the number of Wei (1 Wei = 10^-18 AVAX) paid per unit of gas to execute this transaction
* **`gasLimit`** Scalar value equal to the maximum amount of gas that should be used in executing this transaction
* **`to`** The 20 byte address of the message call's recipient. If the transaction is creating a contract, `to` is left empty
* **`value`** Scalar value of native asset (AVAX) measured in Wei (1 Wei = 10^-18 AVAX) to be transferred to the message call's recipient or in the case of a contract creation, as an endowment to the newly created contract.
* **`v, r, s`** Values corresponding to the signature of the transaction.
* **`data`** Unlimited size byte array specifying the input data to a contract call or (if creating a contract) the EVM bytecode for the account initialization process

#### Native Assets - Tokens

Non-AVAX Assets, however, have no counterpart within the EVM. Therefore, Coreth makes minor modifications to the EVM and state management in order to support asset balances and the ability to transfer these assets on the C-Chain.

Non-AVAX Assets (ANTs) are supported on the C-Chain by keeping a mapping [assetID -> balance] in each account's storage. These assets can be exported back to the X-Chain or manipulated on the C-Chain using `nativeAssetCall` and `nativeAssetBalance`. `nativeAssetCall` and `nativeAssetBalance` are precompiled contracts released in Apricot Phase 2 to improve the UX of interacting with ANTs on the C-Chain.

##### nativeAssetCall

`nativeAssetCall` is a precompiled contract at address `0x0100000000000000000000000000000000000002`. `nativeAssetCall` allows users to atomically transfer a native asset to a given address and (optionally) also make a contract call to that same address. This is parallel to how a normal transaction can send value to some address, and atomically call that address with some `data`.

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

##### nativeAssetBalance

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

## ARC-20s on the C-Chain

An ARC-20 is the Avalanche equivalent of an ERC-20.

### What is an ERC-20

An ERC-20 is a standardized token on Ethereum. It presents a standard set of functions and events that allow a smart contract to serve as a token on Ethereum. For the complete explanation, read the original proposal here: https://eips.ethereum.org/EIPS/eip-20.

ERC-20s expose the following interface:

```boo
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

As a smart contract, ERC-20s maintain their own state. This means that if your account owns 5 DogeCoin (a popular ERC-20), then this is stored as an account balance in the DogeCoin contract, whereas an ETH balance is kept in your own account's storage.

### From ANT to ARC-20

Avalanche Native Tokens (ANTs) are stored directly on the account that owns them. In order to make ANTs easier to use in smart contracts on the C-Chain, we would like to wrap them in the ERC-20 interface. We'll call this wrapped asset an ARC-20. To do this, we'll add an `assetID` field to a regular ERC-20 contract to represent the underlying asset that the ARC-20 will wrap.

Additionally, the ARC-20 contract will support two additional functions: `withdraw` and `deposit`. To implement this, ARC-20s will need to use the precompiled contracts: `nativeAssetCall` and `nativeAssetBalance`.

#### Contract Balance / Total Supply

ERC-20s typically have a total supply field, but this can mean different things in the context of a wrapped asset. The total supply could indicate the total supply of the non-wrapped asset on the entire platform or the amount of the asset in the wrapper contract.

For simplicity, we will use total supply to indicate the total supply of the wrapped asset in the ARC-20 contract.

#### ARC-20 Deposits

Similar to WETH, in order to deposit some funds into an ARC-20, we need to send the ARC-20 contract the deposit amount and then invoke the contract's deposit function, so that the contract can acknowledge the deposit and update the caller's balance. With WETH, this can be accomplished with a simple `call` because it allows the caller to both send the native coin and invoke a smart contract. With non-AVAX ARC-20s, `nativeAssetCall` allows the same functionality for all ANTs on the C-Chain.

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 3000000
* **`to`**: `0x0100000000000000000000000000000000000002`
* **`value`**: 0
* **`v, r, s`**: Transaction Signature
* **`data`**: abi.encodePacked(arc20Address, assetID, assetAmount, abi.encodeWithSignature("deposit()"))

This transfers `assetAmount` of `assetID` to the addresss of the ARC-20 and then calls `deposit()` on the ARC-20.

The deposit function will use the previous value of the total supply to calculate how much of `assetID` it has received in the deposit.

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

A withdrawal is much simpler. When an ARC-20 receives a withdraw request, it simply needs to verify there's a sufficient account balance, update the balance and total supply, and then send the funds to the withdrawer with `nativeAssetCall`. The ARC-20s withdraw function will look like this:

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");
        
        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```
