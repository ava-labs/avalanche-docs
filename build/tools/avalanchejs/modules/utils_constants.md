[avalanche](../README.md) › [Utils-Constants](utils_constants.md)

# Module: Utils-Constants

## Index

### Classes

* [Defaults](../classes/utils_constants.defaults.md)

### Type aliases

* [MergeRule](utils_constants.md#mergerule)

### Variables

* [AVAXGWEI](utils_constants.md#const-avaxgwei)
* [AVAXSTAKECAP](utils_constants.md#const-avaxstakecap)
* [CChainAlias](utils_constants.md#const-cchainalias)
* [CChainVMName](utils_constants.md#const-cchainvmname)
* [CENTIAVAX](utils_constants.md#const-centiavax)
* [DECIAVAX](utils_constants.md#const-deciavax)
* [DefaultLocalGenesisPrivateKey](utils_constants.md#const-defaultlocalgenesisprivatekey)
* [DefaultNetworkID](utils_constants.md#const-defaultnetworkid)
* [FallbackEVMChainID](utils_constants.md#const-fallbackevmchainid)
* [FallbackHRP](utils_constants.md#const-fallbackhrp)
* [FallbackNetworkName](utils_constants.md#const-fallbacknetworkname)
* [GWEI](utils_constants.md#const-gwei)
* [MICROAVAX](utils_constants.md#const-microavax)
* [MILLIAVAX](utils_constants.md#const-milliavax)
* [NANOAVAX](utils_constants.md#const-nanoavax)
* [NodeIDPrefix](utils_constants.md#const-nodeidprefix)
* [ONEAVAX](utils_constants.md#const-oneavax)
* [PChainAlias](utils_constants.md#const-pchainalias)
* [PChainVMName](utils_constants.md#const-pchainvmname)
* [PlatformChainID](utils_constants.md#const-platformchainid)
* [PrimaryAssetAlias](utils_constants.md#const-primaryassetalias)
* [PrimaryNetworkID](utils_constants.md#const-primarynetworkid)
* [PrivateKeyPrefix](utils_constants.md#const-privatekeyprefix)
* [WEI](utils_constants.md#const-wei)
* [XChainAlias](utils_constants.md#const-xchainalias)
* [XChainVMName](utils_constants.md#const-xchainvmname)
* [avaxAssetID](utils_constants.md#let-avaxassetid)

### Object literals

* [HRPToNetworkID](utils_constants.md#const-hrptonetworkid)
* [NetworkIDToHRP](utils_constants.md#const-networkidtohrp)
* [NetworkIDToNetworkNames](utils_constants.md#const-networkidtonetworknames)
* [NetworkNameToNetworkID](utils_constants.md#const-networknametonetworkid)
* [n0C](utils_constants.md#const-n0c)
* [n0P](utils_constants.md#const-n0p)
* [n0X](utils_constants.md#const-n0x)
* [n12345C](utils_constants.md#const-n12345c)
* [n12345P](utils_constants.md#const-n12345p)
* [n12345X](utils_constants.md#const-n12345x)
* [n1C](utils_constants.md#const-n1c)
* [n1P](utils_constants.md#const-n1p)
* [n1X](utils_constants.md#const-n1x)
* [n2C](utils_constants.md#const-n2c)
* [n2P](utils_constants.md#const-n2p)
* [n2X](utils_constants.md#const-n2x)
* [n3C](utils_constants.md#const-n3c)
* [n3P](utils_constants.md#const-n3p)
* [n3X](utils_constants.md#const-n3x)
* [n4C](utils_constants.md#const-n4c)
* [n4P](utils_constants.md#const-n4p)
* [n4X](utils_constants.md#const-n4x)
* [n5C](utils_constants.md#const-n5c)
* [n5P](utils_constants.md#const-n5p)
* [n5X](utils_constants.md#const-n5x)

## Type aliases

###  MergeRule

Ƭ **MergeRule**: *"intersection" | "differenceSelf" | "differenceNew" | "symDifference" | "union" | "unionMinusNew" | "unionMinusSelf" | "ERROR"*

*Defined in [src/utils/constants.ts:394](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L394)*

Rules used when merging sets

## Variables

### `Const` AVAXGWEI

• **AVAXGWEI**: *BN* = NANOAVAX.clone()

*Defined in [src/utils/constants.ts:89](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L89)*

___

### `Const` AVAXSTAKECAP

• **AVAXSTAKECAP**: *BN* = ONEAVAX.mul(new BN(3000000))

*Defined in [src/utils/constants.ts:91](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L91)*

___

### `Const` CChainAlias

• **CChainAlias**: *string* = "C"

*Defined in [src/utils/constants.ts:65](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L65)*

___

### `Const` CChainVMName

• **CChainVMName**: *string* = "evm"

*Defined in [src/utils/constants.ts:68](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L68)*

___

### `Const` CENTIAVAX

• **CENTIAVAX**: *BN* = ONEAVAX.div(new BN(100))

*Defined in [src/utils/constants.ts:77](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L77)*

___

### `Const` DECIAVAX

• **DECIAVAX**: *BN* = ONEAVAX.div(new BN(10))

*Defined in [src/utils/constants.ts:75](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L75)*

___

### `Const` DefaultLocalGenesisPrivateKey

• **DefaultLocalGenesisPrivateKey**: *"ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"* = "ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

*Defined in [src/utils/constants.ts:71](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L71)*

___

### `Const` DefaultNetworkID

• **DefaultNetworkID**: *number* = 1

*Defined in [src/utils/constants.ts:60](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L60)*

___

### `Const` FallbackEVMChainID

• **FallbackEVMChainID**: *number* = 43112

*Defined in [src/utils/constants.ts:58](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L58)*

___

### `Const` FallbackHRP

• **FallbackHRP**: *string* = "custom"

*Defined in [src/utils/constants.ts:56](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L56)*

___

### `Const` FallbackNetworkName

• **FallbackNetworkName**: *string* = "Custom Network"

*Defined in [src/utils/constants.ts:57](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L57)*

___

### `Const` GWEI

• **GWEI**: *BN* = WEI.mul(new BN(1000000000))

*Defined in [src/utils/constants.ts:87](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L87)*

___

### `Const` MICROAVAX

• **MICROAVAX**: *BN* = ONEAVAX.div(new BN(1000000))

*Defined in [src/utils/constants.ts:81](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L81)*

___

### `Const` MILLIAVAX

• **MILLIAVAX**: *BN* = ONEAVAX.div(new BN(1000))

*Defined in [src/utils/constants.ts:79](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L79)*

___

### `Const` NANOAVAX

• **NANOAVAX**: *BN* = ONEAVAX.div(new BN(1000000000))

*Defined in [src/utils/constants.ts:83](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L83)*

___

### `Const` NodeIDPrefix

• **NodeIDPrefix**: *string* = "NodeID-"

*Defined in [src/utils/constants.ts:10](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L10)*

___

### `Const` ONEAVAX

• **ONEAVAX**: *BN* = new BN(1000000000)

*Defined in [src/utils/constants.ts:73](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L73)*

___

### `Const` PChainAlias

• **PChainAlias**: *string* = "P"

*Defined in [src/utils/constants.ts:66](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L66)*

___

### `Const` PChainVMName

• **PChainVMName**: *string* = "platformvm"

*Defined in [src/utils/constants.ts:69](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L69)*

___

### `Const` PlatformChainID

• **PlatformChainID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:62](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L62)*

___

### `Const` PrimaryAssetAlias

• **PrimaryAssetAlias**: *string* = "AVAX"

*Defined in [src/utils/constants.ts:12](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L12)*

___

### `Const` PrimaryNetworkID

• **PrimaryNetworkID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:63](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L63)*

___

### `Const` PrivateKeyPrefix

• **PrivateKeyPrefix**: *string* = "PrivateKey-"

*Defined in [src/utils/constants.ts:8](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L8)*

___

### `Const` WEI

• **WEI**: *BN* = new BN(1)

*Defined in [src/utils/constants.ts:85](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L85)*

___

### `Const` XChainAlias

• **XChainAlias**: *string* = "X"

*Defined in [src/utils/constants.ts:64](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L64)*

___

### `Const` XChainVMName

• **XChainVMName**: *string* = "avm"

*Defined in [src/utils/constants.ts:67](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L67)*

___

### `Let` avaxAssetID

• **avaxAssetID**: *string* = "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"

*Defined in [src/utils/constants.ts:130](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L130)*

## Object literals

### `Const` HRPToNetworkID

### ▪ **HRPToNetworkID**: *object*

*Defined in [src/utils/constants.ts:24](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L24)*

###  avax

• **avax**: *number* = 1

*Defined in [src/utils/constants.ts:26](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L26)*

###  cascade

• **cascade**: *number* = 2

*Defined in [src/utils/constants.ts:27](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L27)*

###  custom

• **custom**: *number* = 0

*Defined in [src/utils/constants.ts:25](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L25)*

###  denali

• **denali**: *number* = 3

*Defined in [src/utils/constants.ts:28](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L28)*

###  everest

• **everest**: *number* = 4

*Defined in [src/utils/constants.ts:29](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L29)*

###  fuji

• **fuji**: *number* = 5

*Defined in [src/utils/constants.ts:30](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L30)*

###  local

• **local**: *number* = 12345

*Defined in [src/utils/constants.ts:31](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L31)*

___

### `Const` NetworkIDToHRP

### ▪ **NetworkIDToHRP**: *object*

*Defined in [src/utils/constants.ts:14](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L14)*

###  0

• **0**: *string* = "custom"

*Defined in [src/utils/constants.ts:15](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L15)*

###  1

• **1**: *string* = "avax"

*Defined in [src/utils/constants.ts:16](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L16)*

###  12345

• **12345**: *string* = "local"

*Defined in [src/utils/constants.ts:21](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L21)*

###  2

• **2**: *string* = "cascade"

*Defined in [src/utils/constants.ts:17](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L17)*

###  3

• **3**: *string* = "denali"

*Defined in [src/utils/constants.ts:18](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L18)*

###  4

• **4**: *string* = "everest"

*Defined in [src/utils/constants.ts:19](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L19)*

###  5

• **5**: *string* = "fuji"

*Defined in [src/utils/constants.ts:20](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L20)*

___

### `Const` NetworkIDToNetworkNames

### ▪ **NetworkIDToNetworkNames**: *object*

*Defined in [src/utils/constants.ts:34](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L34)*

###  0

• **0**: *string[]* = ["Manhattan"]

*Defined in [src/utils/constants.ts:35](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L35)*

###  1

• **1**: *string[]* = ["Avalanche","Mainnet"]

*Defined in [src/utils/constants.ts:36](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L36)*

###  12345

• **12345**: *string[]* = ["Local Network"]

*Defined in [src/utils/constants.ts:41](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L41)*

###  2

• **2**: *string[]* = ["Cascade"]

*Defined in [src/utils/constants.ts:37](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L37)*

###  3

• **3**: *string[]* = ["Denali"]

*Defined in [src/utils/constants.ts:38](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L38)*

###  4

• **4**: *string[]* = ["Everest"]

*Defined in [src/utils/constants.ts:39](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L39)*

###  5

• **5**: *string[]* = ["Fuji", "Testnet"]

*Defined in [src/utils/constants.ts:40](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L40)*

___

### `Const` NetworkNameToNetworkID

### ▪ **NetworkNameToNetworkID**: *object*

*Defined in [src/utils/constants.ts:44](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L44)*

###  Avalanche

• **Avalanche**: *number* = 1

*Defined in [src/utils/constants.ts:46](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L46)*

###  Cascade

• **Cascade**: *number* = 2

*Defined in [src/utils/constants.ts:48](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L48)*

###  Denali

• **Denali**: *number* = 3

*Defined in [src/utils/constants.ts:49](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L49)*

###  Everest

• **Everest**: *number* = 4

*Defined in [src/utils/constants.ts:50](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L50)*

###  Fuji

• **Fuji**: *number* = 5

*Defined in [src/utils/constants.ts:51](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L51)*

###  Local Network

• **Local Network**: *number* = 12345

*Defined in [src/utils/constants.ts:53](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L53)*

###  Mainnet

• **Mainnet**: *number* = 1

*Defined in [src/utils/constants.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L47)*

###  Manhattan

• **Manhattan**: *number* = 0

*Defined in [src/utils/constants.ts:45](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L45)*

###  Testnet

• **Testnet**: *number* = 5

*Defined in [src/utils/constants.ts:52](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L52)*

___

### `Const` n0C

### ▪ **n0C**: *object*

*Defined in [src/utils/constants.ts:119](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L119)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:121](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L121)*

###  blockchainID

• **blockchainID**: *string* = "2fFZQibQXcd6LTE4rpBPBAkLVXFE91Kit8pgxaBG1mRnh5xqbb"

*Defined in [src/utils/constants.ts:120](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L120)*

###  chainID

• **chainID**: *number* = 43111

*Defined in [src/utils/constants.ts:125](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L125)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:123](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L123)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:124](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L124)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:122](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L122)*

___

### `Const` n0P

### ▪ **n0P**: *object*

*Defined in [src/utils/constants.ts:102](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L102)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:104](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L104)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:103](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L103)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:107](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L107)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:106](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L106)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:109](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L109)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:114](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L114)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:110](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L110)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:111](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L111)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:108](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L108)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:116](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L116)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:115](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L115)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:112](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L112)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:113](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L113)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:105](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L105)*

___

### `Const` n0X

### ▪ **n0X**: *object*

*Defined in [src/utils/constants.ts:94](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L94)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:96](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L96)*

###  blockchainID

• **blockchainID**: *string* = "2vrXWHgGxh5n3YsLHMV16YVVJTpT4z45Fmb4y3bL6si8kLCyg9"

*Defined in [src/utils/constants.ts:95](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L95)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:99](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L99)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:98](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L98)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:97](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L97)*

___

### `Const` n12345C

### ▪ **n12345C**: *object*

*Defined in [src/utils/constants.ts:317](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L317)*

___

### `Const` n12345P

### ▪ **n12345P**: *object*

*Defined in [src/utils/constants.ts:315](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L315)*

___

### `Const` n12345X

### ▪ **n12345X**: *object*

*Defined in [src/utils/constants.ts:312](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L312)*

___

### `Const` n1C

### ▪ **n1C**: *object*

*Defined in [src/utils/constants.ts:158](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L158)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:160](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L160)*

###  blockchainID

• **blockchainID**: *string* = "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5"

*Defined in [src/utils/constants.ts:159](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L159)*

###  chainID

• **chainID**: *number* = 43114

*Defined in [src/utils/constants.ts:164](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L164)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:163](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L163)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:162](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L162)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:161](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L161)*

___

### `Const` n1P

### ▪ **n1P**: *object*

*Defined in [src/utils/constants.ts:140](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L140)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:143](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L143)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:142](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L142)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:141](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L141)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:146](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L146)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:148](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L148)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:153](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L153)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:149](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L149)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:150](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L150)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:147](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L147)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:155](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L155)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:154](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L154)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:151](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L151)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:152](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L152)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:145](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L145)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:144](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L144)*

___

### `Const` n1X

### ▪ **n1X**: *object*

*Defined in [src/utils/constants.ts:131](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L131)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:134](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L134)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:133](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L133)*

###  blockchainID

• **blockchainID**: *string* = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"

*Defined in [src/utils/constants.ts:132](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L132)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:137](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L137)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:136](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L136)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:135](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L135)*

___

### `Const` n2C

### ▪ **n2C**: *object*

*Defined in [src/utils/constants.ts:194](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L194)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:196](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L196)*

###  blockchainID

• **blockchainID**: *string* = "2mUYSXfLrDtigwbzj1LxKVsHwELghc5sisoXrzJwLqAAQHF4i"

*Defined in [src/utils/constants.ts:195](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L195)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:198](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L198)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:197](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L197)*

___

### `Const` n2P

### ▪ **n2P**: *object*

*Defined in [src/utils/constants.ts:177](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L177)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:179](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L179)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:178](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L178)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:182](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L182)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:184](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L184)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:189](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L189)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:185](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L185)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:186](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L186)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:183](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L183)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:191](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L191)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:190](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L190)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:187](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L187)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:188](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L188)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:181](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L181)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:180](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L180)*

___

### `Const` n2X

### ▪ **n2X**: *object*

*Defined in [src/utils/constants.ts:169](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L169)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:171](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L171)*

###  blockchainID

• **blockchainID**: *string* = "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM"

*Defined in [src/utils/constants.ts:170](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L170)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:174](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L174)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:173](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L173)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:172](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L172)*

___

### `Const` n3C

### ▪ **n3C**: *object*

*Defined in [src/utils/constants.ts:228](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L228)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:230](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L230)*

###  blockchainID

• **blockchainID**: *string* = "zJytnh96Pc8rM337bBrtMvJDbEdDNjcXG3WkTNCiLp18ergm9"

*Defined in [src/utils/constants.ts:229](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L229)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:232](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L232)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:231](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L231)*

___

### `Const` n3P

### ▪ **n3P**: *object*

*Defined in [src/utils/constants.ts:211](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L211)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:213](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L213)*

###  blockchainID

• **blockchainID**: *string* = ""

*Defined in [src/utils/constants.ts:212](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L212)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:216](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L216)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:218](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L218)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:223](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L223)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:219](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L219)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:220](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L220)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:217](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L217)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:225](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L225)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:224](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L224)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:221](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L221)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:222](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L222)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:215](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L215)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:214](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L214)*

___

### `Const` n3X

### ▪ **n3X**: *object*

*Defined in [src/utils/constants.ts:203](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L203)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:205](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L205)*

###  blockchainID

• **blockchainID**: *string* = "rrEWX7gc7D9mwcdrdBxBTdqh1a7WDVsMuadhTZgyXfFcRz45L"

*Defined in [src/utils/constants.ts:204](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L204)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:208](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L208)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:207](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L207)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:206](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L206)*

___

### `Const` n4C

### ▪ **n4C**: *object*

*Defined in [src/utils/constants.ts:262](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L262)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:264](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L264)*

###  blockchainID

• **blockchainID**: *string* = "saMG5YgNsFxzjz4NMkEkt3bAH6hVxWdZkWcEnGB3Z15pcAmsK"

*Defined in [src/utils/constants.ts:263](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L263)*

###  chainID

• **chainID**: *number* = 43110

*Defined in [src/utils/constants.ts:267](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L267)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:266](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L266)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:265](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L265)*

___

### `Const` n4P

### ▪ **n4P**: *object*

*Defined in [src/utils/constants.ts:245](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L245)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:247](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L247)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:246](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L246)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:250](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L250)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:252](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L252)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:257](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L257)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:253](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L253)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:254](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L254)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:251](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L251)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:259](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L259)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:258](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L258)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:255](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L255)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:256](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L256)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:249](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L249)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:248](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L248)*

___

### `Const` n4X

### ▪ **n4X**: *object*

*Defined in [src/utils/constants.ts:237](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L237)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:239](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L239)*

###  blockchainID

• **blockchainID**: *string* = "jnUjZSRt16TcRnZzmh5aMhavwVHz3zBrSN8GfFMTQkzUnoBxC"

*Defined in [src/utils/constants.ts:238](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L238)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:242](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L242)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:241](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L241)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:240](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L240)*

___

### `Const` n5C

### ▪ **n5C**: *object*

*Defined in [src/utils/constants.ts:300](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L300)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:302](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L302)*

###  blockchainID

• **blockchainID**: *string* = "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp"

*Defined in [src/utils/constants.ts:301](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L301)*

###  chainID

• **chainID**: *number* = 43113

*Defined in [src/utils/constants.ts:306](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L306)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:305](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L305)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:304](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L304)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:303](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L303)*

___

### `Const` n5P

### ▪ **n5P**: *object*

*Defined in [src/utils/constants.ts:282](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L282)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:285](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L285)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:284](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L284)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:283](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L283)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:288](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L288)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:290](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L290)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:295](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L295)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:291](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L291)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:292](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L292)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:289](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L289)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:297](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L297)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:296](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L296)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:293](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L293)*

###  minStakeDuration

• **minStakeDuration**: *number* = 24 * 60 * 60

*Defined in [src/utils/constants.ts:294](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L294)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:287](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L287)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:286](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L286)*

___

### `Const` n5X

### ▪ **n5X**: *object*

*Defined in [src/utils/constants.ts:273](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L273)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:276](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L276)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:275](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L275)*

###  blockchainID

• **blockchainID**: *string* = "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"

*Defined in [src/utils/constants.ts:274](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L274)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:279](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L279)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:278](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L278)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:277](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/constants.ts#L277)*
