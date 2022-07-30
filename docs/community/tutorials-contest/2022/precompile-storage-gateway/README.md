# Precompile Storage Gateway

## Introduction

This precompiled contract aims to provide on-chain Solidity contracts with the ability to save & retrieve large data objects to & from external storage networks. Developers also have an option to parse standardized data objects _(e.g. JSON and XML)_ to retrieve specific data elements, similar to a Graph API.

#### The `StorageGateway` contract exists at the following Leet Suite address:

`0x0539000000000000000000000000000000000001`

:::danger

__You need to know! —__ When using `StorageGateway`, it it critical that __ALL data sources be VERIFIABLY IMMUTABLE.__ This means that each unique data path leads to a unique data object that __CANNOT__ be changed. __EVERY__ node in the network __MUST__ be able to retrieve and cryptographically verify the same identical data object. Use of "mutable" data sources would eventually lead to a break in consensus, and a possible crash of the entire blockchain.
:::

### Prerequisites

#### To get the most out of this tutorial, its recommended to have:

- a general understanding of the [__Remix IDE__](http://remix.ethereum.org/)  
_eg. how to write and deploy a Solidity smart contract_

- a general understanding of the [__Solidity language__](https://docs.soliditylang.org/)  
_eg. how to implement an Interface and use `staticcall` to execute a method_

- a general understanding of [__Precompiles__](https://docs.avax.network/subnets/customize-a-subnet#precompiles)  
_eg. how a Precompile is used to extend the utility of Subnets_

To get started with these topics or for a comprehensive review, see the [__Recommended Resources__](#recommended-resources) to learn more.

### Requirements

- [__Ubuntu__](https://ubuntu.com/download/desktop) &gt;= 20.04
- [__Metamask__](https://metamask.io/download/) wallet _(or any compatible Web3 browser extension)_

👇 __Watch a short walk-through of what we'll cover in this tutorial__ 👇

[![Sample](assets/intro.gif)](assets/intro.webm)

__↳__ [___click here to watch the full-screen Introduction video___](assets/intro.webm) &nbsp; 👀 🍿

## Getting Started

#### This precompiled contract offers the following new EVM features & benefits for your Subnet smart contracts:

1. Direct access _(both read & write)_ to external data storage systems, most notably:
    - IPFS
    - AWS
    - Dropbox
2. Direct use of ANY immutable web-based data source.
3. Publish data to immutable _(optionally public)_ data sources.

:::info

__Did you know? —__ You can easily customize user permissions, gas usage and precompiled contracts for your Subnet using the Avalanche CLI.

Visit __https://github.com/ava-labs/avalanche-cli__ for more info.

:::

### Supported Networks

All of the major cloud networks are planned to be supported. The aim is to provide Avalanche smart contracts with direct access to &gt 95% of all public & private digital assets.

##### Initially, the following networks are planned to be fully supported:

- [x] __IPFS__ — [https://ipfs.io](https://ipfs.io)
- [ ] __Storj__ — [https://www.storj.io](https://www.storj.io)
- [ ] __Sia__ — [https://sia.tech](https://sia.tech)
- [ ] __AWS__ — [https://aws.amazon.com](https://aws.amazon.com)
- [ ] __Azure__ — [https://azure.microsoft.com/en-us/services/storage/files](https://azure.microsoft.com/en-us/services/storage/files)
- [ ] __Google Cloud__ — [https://cloud.google.com/](https://cloud.google.com/)
- [ ] __iCloud__ — [https://developer.apple.com/icloud](https://developer.apple.com/icloud)
- [ ] __Dropbox__ — [https://www.dropbox.com](https://www.dropbox.com)

:::danger

__You need to know! —__ ALL data stored on blockchain networks _(e.g. IPFS and Storj)_ are 100% public and shared amongst its nodes. If you need to protect this data, you __MUST__ encrypt it before storing it on __ANY__ public system.
:::

## Installation

__Steps to install:__

1. Clone the [__Subnet EVM__](https://github.com/ava-labs/subnet-evm.git) repo

```bash
git clone https://github.com/ava-labs/subnet-evm.git
```

2. Modify `params/config.go`

```bash
vim params/config.go
```

- @ approx line `87` and `88` update these objects ↴

```json
TestChainConfig        = &ChainConfig{big.NewInt(1), big.NewInt(0), big.NewInt(0), common.Hash{}, big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), DefaultFeeConfig, false, precompile.ContractDeployerAllowListConfig{}, precompile.ContractNativeMinterConfig{}, precompile.TxAllowListConfig{}, precompile.FeeConfigManagerConfig{}, precompile.StorageGatewayConfig{}}
TestPreSubnetEVMConfig = &ChainConfig{big.NewInt(1), big.NewInt(0), big.NewInt(0), common.Hash{}, big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), big.NewInt(0), nil, DefaultFeeConfig, false, precompile.ContractDeployerAllowListConfig{}, precompile.ContractNativeMinterConfig{}, precompile.TxAllowListConfig{}, precompile.FeeConfigManagerConfig{}, precompile.StorageGatewayConfig{}}
```

```diff
87: TestChainConfig        = &ChainConfig{
      ...
      precompile.ContractNativeMinterConfig{},
      precompile.TxAllowListConfig{},
      precompile.FeeConfigManagerConfig{},
+     precompile.StorageGatewayConfig{}
    }

88: TestPreSubnetEVMConfig = &ChainConfig{
      ...
      precompile.ContractNativeMinterConfig{},
      precompile.TxAllowListConfig{},
      precompile.FeeConfigManagerConfig{},
+     precompile.StorageGatewayConfig{}
    }
```

- @ approx line `123` add this line ↴

```json
StorageGatewayConfig            precompile.StorageGatewayConfig            `json:"storageGateway,omitempty"`                  // Config for the storage gateway precompile
```

```diff
  119: ContractDeployerAllowListConfig precompile.ContractDeployerAllowListConfig `json:"contractDeployerAllowListConfig,omitempty"` // Config for the contract deployer allow list precompile
  120: ContractNativeMinterConfig      precompile.ContractNativeMinterConfig      `json:"contractNativeMinterConfig,omitempty"`      // Config for the native minter precompile
  121: TxAllowListConfig               precompile.TxAllowListConfig               `json:"txAllowListConfig,omitempty"`               // Config for the tx allow list precompile
  122: FeeManagerConfig                precompile.FeeConfigManagerConfig          `json:"feeManagerConfig,omitempty"`                // Config for the fee manager precompile
+ 123: StorageGatewayConfig            precompile.StorageGatewayConfig            `json:"storageGateway,omitempty"`                  // Config for the storage gateway precompile
}
```

- @ approx line `131` and `149` add these lines ↴

```json
StorageGatewayConfig: %v,
...
c.StorageGatewayConfig,
```

```diff
  131: return fmt.Sprintf("{
         ChainID: %v
         Homestead: %v
         ...
         TxAllowListConfig: %v,
         FeeManagerConfig: %v,
+        StorageGatewayConfig: %v,
         Engine: Dummy Consensus Engine
       }",
  132: c.ChainID,
  133: c.HomesteadBlock,
  ...
  147: c.TxAllowListConfig,
  148: c.FeeManagerConfig,
+ 149: c.StorageGatewayConfig,
```

- @ approx line `224` add this function ↴

```js
func (c *ChainConfig) IsStorageGateway(blockTimestamp *big.Int) bool {
  return utils.IsForked(c.StorageGatewayConfig.Timestamp(), blockTimestamp)
}
```

```diff
  220: func (c *ChainConfig) IsFeeConfigManager(blockTimestamp *big.Int) bool {
  221:   return utils.IsForked(c.FeeManagerConfig.Timestamp(), blockTimestamp)
  222: }

+ 224: func (c *ChainConfig) IsStorageGateway(blockTimestamp *big.Int) bool {
+ 225: 	 return utils.IsForked(c.StorageGatewayConfig.Timestamp(), blockTimestamp)
+ 226: }
```

- @ approx line `388` add this function ↴

```js
if isForkIncompatible(c.StorageGatewayConfig.Timestamp(), newcfg.StorageGatewayConfig.Timestamp(), headTimestamp) {
  return newCompatError("StorageGateway fork block timestamp", c.StorageGatewayConfig.Timestamp(), newcfg.StorageGatewayConfig.Timestamp())
}
```

```diff
  384: if isForkIncompatible(c.FeeManagerConfig.Timestamp(), newcfg.FeeManagerConfig.Timestamp(), headTimestamp) {
  385:   return newCompatError("FeeManagerConfig fork block timestamp", c.FeeManagerConfig.Timestamp(), newcfg.FeeManagerConfig.Timestamp())
  386: }

+ 388: if isForkIncompatible(c.StorageGatewayConfig.Timestamp(), newcfg.StorageGatewayConfig.Timestamp(), headTimestamp) {
+ 389:   return newCompatError("StorageGateway fork block timestamp", c.StorageGatewayConfig.Timestamp(), newcfg.StorageGatewayConfig.Timestamp())
+ 390: }
```

- @ approx line `458` add this line ↴

```json
IsStorageGatewayEnabled            bool
```

```diff
  ...
  456: IsTxAllowListEnabled               bool
  457: IsFeeConfigManagerEnabled          bool
+ 458: IsStorageGatewayEnabled            bool
```

- @ approx line `495` add this line ↴

```json
rules.IsStorageGatewayEnabled = c.IsStorageGateway(blockTimestamp)
```

```diff
  493: rules.IsTxAllowListEnabled = c.IsTxAllowList(blockTimestamp)
  494: rules.IsFeeConfigManagerEnabled = c.IsFeeConfigManager(blockTimestamp)
+ 495: rules.IsStorageGatewayEnabled = c.IsStorageGateway(blockTimestamp)
```

- @ approx line `528` add this function ↴

```js
if c.StorageGatewayConfig.Timestamp() != nil {
    statefulPrecompileConfigs = append(statefulPrecompileConfigs, &c.StorageGatewayConfig)
}
```

```diff
  524: if c.FeeManagerConfig.Timestamp() != nil {
  525:   statefulPrecompileConfigs = append(statefulPrecompileConfigs, &c.FeeManagerConfig)
  526: }

+ 528: if c.StorageGatewayConfig.Timestamp() != nil {
+ 529:   statefulPrecompileConfigs = append(statefulPrecompileConfigs, &c.StorageGatewayConfig)
+ 530: }
```

3. Modify `precompile/params.go`

```bash
vim precompile/params.go
```

- @ approx line `17` add these lines ↴

```js
    ReadStorageGatewayCost  = 5_000
    WriteStorageGatewayCost = 25_000
```

```diff
   8: // Gas costs for stateful precompiles
   9: const (
  10:	writeGasCostPerSlot = 20_000
  11:	readGasCostPerSlot  = 5_000

  13:	ModifyAllowListGasCost = writeGasCostPerSlot
  14:	ReadAllowListGasCost   = readGasCostPerSlot

  16:   MintGasCost             = 30_000
+ 17:   ReadStorageGatewayCost  = 5_000
+ 18:   WriteStorageGatewayCost = 25_000
```

- @ approx line `36` and `43` add these lines ↴

```js
StorageGatewayAddress            = common.HexToAddress("0x0539000000000000000000000000000000000001")
...
StorageGatewayAddress,
```

```diff
  31: var (
  32: 	ContractDeployerAllowListAddress = common.HexToAddress("0x0200000000000000000000000000000000000000")
  33: 	ContractNativeMinterAddress      = common.HexToAddress("0x0200000000000000000000000000000000000001")
  34: 	TxAllowListAddress               = common.HexToAddress("0x0200000000000000000000000000000000000002")
  35: 	FeeConfigManagerAddress          = common.HexToAddress("0x0200000000000000000000000000000000000003")
+ 36:	StorageGatewayAddress            = common.HexToAddress("0x0539000000000000000000000000000000000001")

  38:	UsedAddresses = []common.Address{
  39:	  ContractDeployerAllowListAddress,
  40:	  ContractNativeMinterAddress,
  41:	  TxAllowListAddress,
  42:	  FeeConfigManagerAddress,
+ 43:	  StorageGatewayAddress,
```

4. Modify `scripts/run.sh`

```bash
vim scripts/run.sh
```

```diff
{
  "config": {
    "chainId": $CHAIN_ID,
    ...
    "subnetEVMTimestamp": 0,
    "feeConfig": {
      "gasLimit": 20000000,
      ...
      "blockGasCostStep": 500000
    },
+   "StorageGateway": {
+     "blockTimestamp": 0
+   }
  },
  "alloc": {
    "${GENESIS_ADDRESS:2}": {
      "balance": "0x52B7D2DCC80CD2E4000000"
    }
  },
  "nonce": "0x0",
  ...
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

5. Finally we add our Precompile `precompile/storage_gateway.go`

- _( visit the [__Ava's DAO fork of Subnet EVM__](https://github.com/avasdao/subnet-evm) for the latest updates )_

```js
/*******************************************************************************
 * Copyright (c) 2022 Ava's DAO
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 * https://avasdao.org
 * support@avasdao.org
 */

package precompile

import (
	"encoding/hex"
	"fmt"
	"io/ioutil"
	"math/big"
	"net/http"
	"regexp"
	"strconv"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/log"
)

var (
	_                           StatefulPrecompileConfig = &StorageGatewayConfig{}
	StorageGatewayPrecompile StatefulPrecompiledContract = createStorageGatewayPrecompile()

	getDataSignature         = CalculateFunctionSelector("getData(string)")
	getDataWithPathSignature = CalculateFunctionSelector("getData(string,string)")
	getDataByKeySignature    = CalculateFunctionSelector("getDataByKey(string,string)")
	saveDataSignature        = CalculateFunctionSelector("setData(string,string)")

	nameKey      = common.BytesToHash([]byte("recipient"))
	initialValue = common.BytesToHash([]byte("Satoshi"))

	/* Set web gateway. */
	WebGateway = ".ipfs.dweb.link"
)

type StorageGatewayConfig struct {
	BlockTimestamp *big.Int `json:"blockTimestamp"`
}

/* Address returns the address of the precompile. */
func (h *StorageGatewayConfig) Address() common.Address {
	return StorageGatewayAddress
}

/* Return the timestamp at which the precompile is enabled or nil, if it is never enabled. */
func (h *StorageGatewayConfig) Timestamp() *big.Int {
	return h.BlockTimestamp
}

func (h *StorageGatewayConfig) Configure(_ ChainConfig, stateDB StateDB, _ BlockContext) {
	stateDB.SetState(StorageGatewayAddress, nameKey, initialValue)
}

/* Return the precompile contract. */
func (h *StorageGatewayConfig) Contract() StatefulPrecompiledContract {
	return StorageGatewayPrecompile
}

/**
 * Pack Input
 *
 * Arguments are passed in to functions according to the ABI specification: https://docs.soliditylang.org/en/latest/abi-spec.html.
 * Therefore, we maintain compatibility with Solidity by following the same specification while encoding/decoding arguments.
 */
func PackInput(name string) ([]byte, error) {
	byteStr := []byte(name)

	if len(byteStr) > common.HashLength {
		return nil, fmt.Errorf("cannot pack Storage Gateway input with string: %s", name)
	}

	input := make([]byte, common.HashLength+len(byteStr))

	strLength := new(big.Int).SetUint64(uint64(len(byteStr)))

	strLengthBytes := strLength.Bytes()

	copy(input[:common.HashLength], strLengthBytes)

	copy(input[common.HashLength:], byteStr)

	return input, nil
}

/**
 * Unpack Input
 *
 * Unpacks the received input from the contract's parameters.
 */
func UnpackInput(input []byte) (string, error) {
	log.Info("Entering UnpackInput ->", string(input), nil)

	if len(input) < common.HashLength {
		return "", fmt.Errorf("cannot unpack Storage Gateway input with length: %d", len(input))
	}

	strLengthBig := new(big.Int).SetBytes(input[:common.HashLength])

	if !strLengthBig.IsUint64() {
		return "", fmt.Errorf("cannot unpack Storage Gateway input with stated length that is non-uint64")
	}

	strLength := strLengthBig.Uint64()

	if strLength > common.HashLength {
		return "", fmt.Errorf("cannot unpack Storage Gateway string with length: %d", strLength)
	}

	if len(input) != common.HashLength+int(strLength) {
		return "", fmt.Errorf("input had unexpected length %d with string length defined as %d", len(input), strLength)
	}

	str := string(input[common.HashLength:])

	return str, nil
}

func GetRecipient(state StateDB) string {
	value := state.GetState(StorageGatewayAddress, nameKey)

	b := value.Bytes()

	trimmedbytes := common.TrimLeftZeroes(b)

	return string(trimmedbytes)
}

/* SetRecipient sets the recipient for the Storage Gateway precompile. */
func SetRecipient(state StateDB, recipient string) {
	state.SetState(StorageGatewayAddress, nameKey, common.BytesToHash([]byte(recipient)))
}

func getUrl(url string) (string, error) {
    resp, err := http.Get(url)
    if err != nil {
        return "", fmt.Errorf("GET error: %v", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        return "", fmt.Errorf("Status error: %v", resp.StatusCode)
    }

    data, err := ioutil.ReadAll(resp.Body)
    if err != nil {
        return "", fmt.Errorf("Read body: %v", err)
    }

    return string(data), nil
}

/**
 * Get Data
 */
func getData(
	evm PrecompileAccessibleState,
	callerAddr common.Address,
	addr common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool,
) (
	ret []byte,
	remainingGas uint64,
	err error,
) {
	log.Info("\n[getData] input->", string(input), nil)

	encodedString := hex.EncodeToString(input)
	log.Info("\n[getData] encodedString->\n", string(encodedString), nil)

	/* Calculate remaining gas. */
	if remainingGas, err = deductGas(suppliedGas, ReadStorageCost); err != nil {
		return nil, 0, err
	}

	/* Create a regex to filter only want letters and numbers. */
    reg, err := regexp.Compile("[^a-zA-Z0-9]+")

	/* Handle errors. */
    if err != nil {
		return nil, remainingGas, err
    }

    cid := reg.ReplaceAllString(string(input), "")
	log.Info("\n[getData] cid->", cid, nil)

	/* Set (data) path. */
	path := "/readme"

	/* Set data target. */
	target := "https://" + cid + WebGateway + path
	log.Info("\n[getData] target->", string(target), nil)

	/* Request URL data. */
	data, err := getUrl(target)

	/* Handle error. */
    if err != nil {
		return nil, remainingGas, err
    }

	/* Handle response. */
	response := []byte(string(data))

	/* Return response. */
	return response, remainingGas, nil
}

/**
 * Get Data With Path
 */
func getDataWithPath(
	evm PrecompileAccessibleState,
	callerAddr common.Address,
	addr common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool,
) (
	ret []byte,
	remainingGas uint64,
	err error,
) {
	log.Info("\n[getDataWithPath] input->", string(input), nil)

	/* Calculate remaining gas. */
	if remainingGas, err = deductGas(suppliedGas, ReadStorageCost); err != nil {
		return nil, 0, err
	}

	/* Handle error. */
    if err != nil {
		return nil, remainingGas, err
    }

	encodedString := hex.EncodeToString(input)
	log.Info("\n[getDataWithPath] encodedString->\n", string(encodedString), nil)

	param1Pos := common.TrimLeftZeroes(input[:32])
	param1PosHex := hex.EncodeToString(param1Pos)
	param1PosDec, _ := strconv.ParseInt(param1PosHex, 16, 64)
	log.Info("\n[getDataWithPath] param1PosHex->", string(param1PosHex), nil)

	param2Pos := common.TrimLeftZeroes(input[32:64])
	param2PosHex := hex.EncodeToString(param2Pos)
	param2PosDec, _ := strconv.ParseInt(param2PosHex, 16, 64)
	log.Info("\n[getDataWithPath] param2PosHex->", string(param2PosHex), nil)

	param1Len := common.TrimLeftZeroes(input[param1PosDec:(param1PosDec + 32)])
	param1LenHex := hex.EncodeToString(param1Len)
	param1LenDec, _ := strconv.ParseInt(param1LenHex, 16, 64)
	log.Info("\n[getDataWithPath] param1LenHex->", string(param1LenHex), nil)

	param2Len := common.TrimLeftZeroes(input[param2PosDec:(param2PosDec + 32)])
	param2LenHex := hex.EncodeToString(param2Len)
	param2LenDec, _ := strconv.ParseInt(param2LenHex, 26, 64)
	log.Info("\n[getDataWithPath] param2LenHex->", string(param2LenHex), nil)

	param1 := common.TrimRightZeroes(input[(param1PosDec + 32):(param1PosDec + 32 + param1LenDec)])
	log.Info("\n[getDataWithPath] param1->", string(param1), nil)

	param2 := common.TrimRightZeroes(input[(param2PosDec + 32):(param2PosDec + 32 + param2LenDec)])
	log.Info("\n[getDataWithPath] param2->", string(param2), nil)

	cid := string(param1)
	log.Info("\n[getDataWithPath] cid->", cid, nil)

	/* Set (data) path. */
	// NOTE: Add forward slash prefix.
	path := "/" + string(param2)
	log.Info("\n[getDataWithPath] path->", path, nil)

	/* Set data target. */
	target := "https://" + cid + WebGateway + path
	log.Info("\n[getDataWithPath] target->", string(target), nil)

	/* Request URL data. */
	data, err := getUrl(target)

	/* Handle error. */
    if err != nil {
		return nil, remainingGas, err
    }

	/* Handle response. */
	response := []byte(string(data))

	/* Return response. */
	return response, remainingGas, nil
}

/**
 * Get Data By Key
 */
func getDataByKey(
	evm PrecompileAccessibleState,
	callerAddr common.Address,
	addr common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool,
) (
	ret []byte,
	remainingGas uint64,
	err error,
) {
	log.Info("\n[getDataByKey] input->", string(input), nil)

	/* Calculate remaining gas. */
	if remainingGas, err = deductGas(suppliedGas, ReadStorageCost); err != nil {
		return nil, 0, err
	}

	/* Set CID. */
	cid := "bafybeie5nqv6kd3qnfjupgvz34woh3oksc3iau6abmyajn7qvtf6d2ho34"

	/* Set (data) path. */
	path := "/readme"

	/* Set data target. */
	target := "https://" + cid + WebGateway + path

	/* Request URL data. */
	data, err := getUrl(target)

	/* Handle response. */
	response := []byte(string(data))

	/* Return response. */
	return response, remainingGas, err
}

/**
 * Save Data
 *
 * This method will request a Node/Validator to pin the supplied
 * data to the immutable storage device.
*/
func saveData(
	accessibleState PrecompileAccessibleState,
	caller common.Address,
	addr common.Address,
	input []byte,
	suppliedGas uint64,
	readOnly bool,
) (
	ret []byte,
	remainingGas uint64,
	err error,
) {
	log.Info("\n[saveData] input->", input, nil)

	// THIS METHOD IS UNIMPLEMENTED

	remainingGas, err = deductGas(suppliedGas, WriteStorageCost)

	if err != nil {
		return nil, 0, err
	}

	return []byte{}, remainingGas, nil
}

/**
 * Create Storage Gateway Precompile
 *
 * Returns the StatefulPrecompile contract that implements
 * the StorageGateway interface from solidity.
 */
func createStorageGatewayPrecompile() StatefulPrecompiledContract {
	/* Construct the contract without a fallback function. */
	storageGatewayFuncs := []*statefulPrecompileFunction {
		/* Get data. */
		newStatefulPrecompileFunction(
			getDataSignature,
			getData,
		),

		/* Get data w/ path. */
		newStatefulPrecompileFunction(
			getDataWithPathSignature,
			getDataWithPath,
		),

		/* Get data by key. */
		newStatefulPrecompileFunction(
			getDataByKeySignature,
			getDataByKey,
		),

		// TODO
		newStatefulPrecompileFunction(
			saveDataSignature,
			saveData,
		),
	}

	/* Construct the contract without a fallback function. */
	contract := newStatefulPrecompileWithFunctionSelectors(
		nil,
		storageGatewayFuncs,
	)

	/* Return contract. */
	return contract
}
```

:::tip

__Did you know? —__ On a Linux machine, you can run this command to find your Subnet's process id.

```
ps aux | grep [a]valanche-network-runner
```
:::

## Smart Contracts

Solidity smart contracts are used to interface with the precompile contracts.

### IStorageGateway.sol

`Type: Interface`

```js
/*******************************************************************************
 * Copyright (c) 2022 Ava's DAO
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 * https://avasdao.org
 * support@avasdao.org
 */

pragma solidity >=0.8.0;

interface IStorageGateway {
    /* Get Data */
    function getData(string calldata) external view returns (string memory);

    /* Get Data With Path */
    function getData(string calldata, string calldata) external view returns (string memory);

    /* Get Data By Key */
    function getDataByKey(string calldata, string calldata) external view returns (string memory);

    /* Save Data */
    function saveData(string calldata) external returns (bool, string memory);
}
```

:::caution

__You need to know! —__ It's important to grant your precompile contracts as `setEnabled` so that `isEnabled` is `true`. Otherwise, you contract will revert when you attempt to execute a "state-mutating" method.
:::

### StorageGateway.sol

`Type: Contract`

```js
/*******************************************************************************
 * Copyright (c) 2022 Ava's DAO
 * All rights reserved.
 *
 * SPDX-License-Identifier: MIT
 *
 * https://avasdao.org
 * support@avasdao.org
 */

pragma solidity >=0.8.0;

import "./IStorageGateway.sol";

// *****************************************************************************
// Storage Gateway Address
//
// This is a unique, precompiled contract address stored on each node
// of any Validator supporting this service.
//
// This precompile is a part of the Leet Suite of Subnet contracts.
// Registered address is:
//   - 0x0539000000000000000000000000000000000001
//   - 0x01 (1)
//
address constant STORAGE_GATEWAY_ADDRESS
    = 0x0539000000000000000000000000000000000001;

contract StorageGateway {
    // FOR DEBUGGING PURPOSES ONLY
    event LogBool(bool myBool);
    event LogBytes(bytes myBytes);
    event LogString(string myString);
    event LogUint(uint256 myUint);

    /* Initialize the Storage Gateway handler. */
    IStorageGateway storageGateway = IStorageGateway(
        address(STORAGE_GATEWAY_ADDRESS));

    /**
     * Get Data
     */
    function getData(
        string calldata _cid
    ) external view returns (
        bool success,
        string memory response
    ) {
        (bool _success, bytes memory data) = address(storageGateway)
            .staticcall(
                abi.encodeWithSignature(
                    "getData(string)",
                    _cid
                )
            );

        /* Convert response data to string. */
        string memory _response = string(data);

        /* Return. */
        return (_success, _response);
    }

    /**
     * Get Data (With Path)
     */
    function getData(
        string calldata _cid,
        string calldata _path
    ) external view returns (
        bool success,
        string memory response
    ) {
        (bool _success, bytes memory data) = address(storageGateway)
            .staticcall(
                abi.encodeWithSignature(
                    "getData(string,string)",
                    _cid,
                    _path
                )
            );

        /* Convert response data to string. */
        string memory _response = string(data);

        /* Return. */
        return (_success, _response);
    }

    /**
     * Get Data By Key
     */
    function getDataByKey(
        string calldata _cid,
        string calldata _key
    ) external view returns (
        bool success,
        string memory response
    ) {
        (bool _success, bytes memory data) = address(storageGateway)
            .staticcall(
                abi.encodeWithSignature(
                    "getDataByKey(string,string)",
                    _cid,
                    _key
                )
            );

        /* Convert response data to string. */
        string memory _response = string(data);

        /* Return. */
        return (_success, _response);
    }

    /**
     * Save Data
     *
     * Provide data to be saved to immutable storage.
     *
     * Recieve back a Content Identifier (CID) for the data.
     */
    function saveData(
        string calldata _data
    ) external returns (
        bool success,
        string memory cid
    ) {
        (bool _success, bytes memory data) = address(storageGateway)
            .call(
                abi.encodeWithSignature(
                    "saveData(string)",
                    _data
                )
            );

        /* Convert response data to string. */
        string memory _cid = string(data);

        /* Emit (save) log entry. */
        emit LogString(_cid);

        /* Return. */
        return (_success, _cid);
    }
}
```

### `getData` Function

`Type: Function`

#### Parameters

- __CID__ [`string`]

#### Return Values

- __Success__ [`bool`]
- __Response__ [`string`]

```js
/**
 * Get Data
 */
function getData(
    string calldata _cid
) external view returns (
    bool success,
    string memory response
) {
    (bool _success, bytes memory data) = address(storageGateway)
        .staticcall(
            abi.encodeWithSignature(
                "getData(string)",
                _cid
            )
        );

    /* Convert response data to string. */
    string memory _response = string(data);

    /* Return. */
    return (_success, _response);
}
```

#### CID

__Content Identifier__

Type: `string`

This value is required to determine where the information stored.

#### Success

Type: `bool`

Indicates the success of the data request.

#### Response

Type: `string`

This is the data that is returned from the contract request.

### `saveData` Function

`Type: Function`

_not yet implemented_

---

## Cautions

It's important to be patient when you first start implementing precompile contracts. This is especially true if you're a first-time Golang user and may not be familiar with the language syntax.

The following are a few of the most common issues faced by the Subnet developer community.

### Troubleshooting

There are still issues that need to be solved, related to:

1. Contract permissions
2. Request timeout

#### Contract Permissions

It's important that your requester (could be a contract) is on the list of authorized addresses. You can do so by either setting:

- `setAdmin`
- `setEnabled`

Set your contract address, otherwise, your `setStorage` transaction will get rejected.

#### Request Timeout

Some external networks have a high latency. This will occasionally result in a timeout for a data request. It's important to handle these errors in your contract code.

:::danger

__You need to know! —__ It's important to grant your precompile contracts as `setEnabled` so that `isEnabled` is `true`. Otherwise, your contract will revert when you attempt to execute a "state-mutating" method.
:::

## Conclusion

Well done, you made it!  
💯 🔥 👏 🎊

There are countless decentralized applications that can utilize the convenience of external storage providers directly accessible to their smart contracts.

### Recap Of What We Learned

- How to build `subnet-evm` from [source](https://github.com/ava-labs/subnet-evm) with a custom [precompile](/subnets/customize-a-subnet#precompiles) contract
- How to deploy a [Solidity](https://docs.soliditylang.org/) contract using the [Remix IDE](http://remix.ethereum.org/)
- How to interact with a [precompile](/subnets/customize-a-subnet#precompiles) contract using the [Ethers.js](https://docs.ethers.io/v5/) library
- How to retrieve metadata from IPFS and use it in a [Solidity](https://docs.soliditylang.org/) contract

### Possible Use-cases

Don't stop here! Let's move on to bigger and better things.

1. NFT artwork storage
2. Music storage
3. Video storage
4. Data archives
5. Rich-media _(ie. photos & videos)_
6. Oracle information

### Recommended Resources

- [__Developer Documents__](http://docs.avax.network/)  
  _Tap into the official Avalanche documentation_
- [__Discord__](http://chat.avax.network/)  
  _Join the official Avalanche Discord_
- [__Support__](http://support.avax.network/)  
  _Request support directly from the team_
- [__Github__](https://github.com/ava-labs/subnet-evm)  
  _Fork & explorer the source code behind Subnets_
- [__Getting started with Golang__](https://go.dev/learn/)  
  _A great place to start your journey with this language_
- [__DFK Subnet__](https://twitter.com/_patrickogrady/status/1509683314017275919)  
  _This was the first commercial Subnet deployed on Avalanche_

#### 👇 If you want to know more about Avalanche, here's a bunch of links for you 👇

[Website](https://avax.network/) | [Whitepapers](https://avalabs.org/whitepapers)
| [Twitter](https://twitter.com/avalancheavax) | [Discord](https://chat.avalabs.org/)
| [GitHub](https://github.com/ava-labs) | [Documentation](https://docs.avax.network/)
| [Forum](https://forum.avax.network/) | [Telegram](https://t.me/avalancheavax) | [Facebook](https://facebook.com/avalancheavax)
| [LinkedIn](https://linkedin.com/company/avalancheavax) | [Reddit](https://reddit.com/r/avax)
| [YouTube](http://www.youtube.com/c/AVALabsOfficial)
