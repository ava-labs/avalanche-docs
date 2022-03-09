[avalanche](../README.md) › [Utils-Constants](utils_constants.md)

# Module: Utils-Constants

## Index

### Classes

* [Defaults](../classes/utils_constants.defaults.md)

### Interfaces

* [C](../interfaces/utils_constants.c.md)
* [Network](../interfaces/utils_constants.network.md)
* [Networks](../interfaces/utils_constants.networks.md)
* [P](../interfaces/utils_constants.p.md)
* [X](../interfaces/utils_constants.x.md)

### Type aliases

* [MergeRule](utils_constants.md#mergerule)

### Variables

* [AVAXGWEI](utils_constants.md#const-avaxgwei)
* [AVAXSTAKECAP](utils_constants.md#const-avaxstakecap)
* [CChainAlias](utils_constants.md#const-cchainalias)
* [CChainVMName](utils_constants.md#const-cchainvmname)
* [CENTIAVAX](utils_constants.md#const-centiavax)
* [DECIAVAX](utils_constants.md#const-deciavax)
* [DefaultEVMLocalGenesisAddress](utils_constants.md#const-defaultevmlocalgenesisaddress)
* [DefaultEVMLocalGenesisPrivateKey](utils_constants.md#const-defaultevmlocalgenesisprivatekey)
* [DefaultLocalGenesisPrivateKey](utils_constants.md#const-defaultlocalgenesisprivatekey)
* [DefaultNetworkID](utils_constants.md#const-defaultnetworkid)
* [FallbackEVMChainID](utils_constants.md#const-fallbackevmchainid)
* [FallbackHRP](utils_constants.md#const-fallbackhrp)
* [FallbackNetworkName](utils_constants.md#const-fallbacknetworkname)
* [FujiAPI](utils_constants.md#const-fujiapi)
* [GWEI](utils_constants.md#const-gwei)
* [MICROAVAX](utils_constants.md#const-microavax)
* [MILLIAVAX](utils_constants.md#const-milliavax)
* [MainnetAPI](utils_constants.md#const-mainnetapi)
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
* [mnemonic](utils_constants.md#const-mnemonic)

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
* [n1337C](utils_constants.md#const-n1337c)
* [n1337P](utils_constants.md#const-n1337p)
* [n1337X](utils_constants.md#const-n1337x)
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

*Defined in [src/utils/constants.ts:520](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L520)*

Rules used when merging sets

## Variables

### `Const` AVAXGWEI

• **AVAXGWEI**: *BN* = NANOAVAX.clone()

*Defined in [src/utils/constants.ts:159](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L159)*

___

### `Const` AVAXSTAKECAP

• **AVAXSTAKECAP**: *BN* = ONEAVAX.mul(new BN(3000000))

*Defined in [src/utils/constants.ts:161](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L161)*

___

### `Const` CChainAlias

• **CChainAlias**: *string* = "C"

*Defined in [src/utils/constants.ts:126](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L126)*

___

### `Const` CChainVMName

• **CChainVMName**: *string* = "evm"

*Defined in [src/utils/constants.ts:129](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L129)*

___

### `Const` CENTIAVAX

• **CENTIAVAX**: *BN* = ONEAVAX.div(new BN(100))

*Defined in [src/utils/constants.ts:147](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L147)*

___

### `Const` DECIAVAX

• **DECIAVAX**: *BN* = ONEAVAX.div(new BN(10))

*Defined in [src/utils/constants.ts:145](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L145)*

___

### `Const` DefaultEVMLocalGenesisAddress

• **DefaultEVMLocalGenesisAddress**: *string* = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"

*Defined in [src/utils/constants.ts:138](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L138)*

___

### `Const` DefaultEVMLocalGenesisPrivateKey

• **DefaultEVMLocalGenesisPrivateKey**: *string* = "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"

*Defined in [src/utils/constants.ts:136](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L136)*

___

### `Const` DefaultLocalGenesisPrivateKey

• **DefaultLocalGenesisPrivateKey**: *string* = "ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

*Defined in [src/utils/constants.ts:134](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L134)*

___

### `Const` DefaultNetworkID

• **DefaultNetworkID**: *number* = 1

*Defined in [src/utils/constants.ts:121](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L121)*

___

### `Const` FallbackEVMChainID

• **FallbackEVMChainID**: *number* = 43112

*Defined in [src/utils/constants.ts:119](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L119)*

___

### `Const` FallbackHRP

• **FallbackHRP**: *string* = "custom"

*Defined in [src/utils/constants.ts:117](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L117)*

___

### `Const` FallbackNetworkName

• **FallbackNetworkName**: *string* = "Custom Network"

*Defined in [src/utils/constants.ts:118](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L118)*

___

### `Const` FujiAPI

• **FujiAPI**: *string* = "api.avax-test.network"

*Defined in [src/utils/constants.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L12)*

___

### `Const` GWEI

• **GWEI**: *BN* = WEI.mul(new BN(1000000000))

*Defined in [src/utils/constants.ts:157](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L157)*

___

### `Const` MICROAVAX

• **MICROAVAX**: *BN* = ONEAVAX.div(new BN(1000000))

*Defined in [src/utils/constants.ts:151](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L151)*

___

### `Const` MILLIAVAX

• **MILLIAVAX**: *BN* = ONEAVAX.div(new BN(1000))

*Defined in [src/utils/constants.ts:149](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L149)*

___

### `Const` MainnetAPI

• **MainnetAPI**: *string* = "api.avax.network"

*Defined in [src/utils/constants.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L11)*

___

### `Const` NANOAVAX

• **NANOAVAX**: *BN* = ONEAVAX.div(new BN(1000000000))

*Defined in [src/utils/constants.ts:153](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L153)*

___

### `Const` NodeIDPrefix

• **NodeIDPrefix**: *string* = "NodeID-"

*Defined in [src/utils/constants.ts:9](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L9)*

___

### `Const` ONEAVAX

• **ONEAVAX**: *BN* = new BN(1000000000)

*Defined in [src/utils/constants.ts:143](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L143)*

___

### `Const` PChainAlias

• **PChainAlias**: *string* = "P"

*Defined in [src/utils/constants.ts:127](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L127)*

___

### `Const` PChainVMName

• **PChainVMName**: *string* = "platformvm"

*Defined in [src/utils/constants.ts:130](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L130)*

___

### `Const` PlatformChainID

• **PlatformChainID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:123](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L123)*

___

### `Const` PrimaryAssetAlias

• **PrimaryAssetAlias**: *string* = "AVAX"

*Defined in [src/utils/constants.ts:10](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L10)*

___

### `Const` PrimaryNetworkID

• **PrimaryNetworkID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:124](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L124)*

___

### `Const` PrivateKeyPrefix

• **PrivateKeyPrefix**: *string* = "PrivateKey-"

*Defined in [src/utils/constants.ts:8](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L8)*

___

### `Const` WEI

• **WEI**: *BN* = new BN(1)

*Defined in [src/utils/constants.ts:155](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L155)*

___

### `Const` XChainAlias

• **XChainAlias**: *string* = "X"

*Defined in [src/utils/constants.ts:125](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L125)*

___

### `Const` XChainVMName

• **XChainVMName**: *string* = "avm"

*Defined in [src/utils/constants.ts:128](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L128)*

___

### `Let` avaxAssetID

• **avaxAssetID**: *string* = "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"

*Defined in [src/utils/constants.ts:203](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L203)*

___

### `Const` mnemonic

• **mnemonic**: *string* = "output tooth keep tooth bracket fox city sustain blood raise install pond stem reject long scene clap gloom purpose mean music piece unknown light"

*Defined in [src/utils/constants.ts:140](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L140)*

## Object literals

### `Const` HRPToNetworkID

### ▪ **HRPToNetworkID**: *object*

*Defined in [src/utils/constants.ts:80](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L80)*

###  avax

• **avax**: *number* = 1

*Defined in [src/utils/constants.ts:82](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L82)*

###  cascade

• **cascade**: *number* = 2

*Defined in [src/utils/constants.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L83)*

###  custom

• **custom**: *number* = 1337

*Defined in [src/utils/constants.ts:87](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L87)*

###  denali

• **denali**: *number* = 3

*Defined in [src/utils/constants.ts:84](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L84)*

###  everest

• **everest**: *number* = 4

*Defined in [src/utils/constants.ts:85](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L85)*

###  fuji

• **fuji**: *number* = 5

*Defined in [src/utils/constants.ts:86](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L86)*

###  local

• **local**: *number* = 12345

*Defined in [src/utils/constants.ts:88](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L88)*

###  manhattan

• **manhattan**: *number* = 0

*Defined in [src/utils/constants.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L81)*

___

### `Const` NetworkIDToHRP

### ▪ **NetworkIDToHRP**: *object*

*Defined in [src/utils/constants.ts:69](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L69)*

###  0

• **0**: *string* = "custom"

*Defined in [src/utils/constants.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L70)*

###  1

• **1**: *string* = "avax"

*Defined in [src/utils/constants.ts:71](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L71)*

###  12345

• **12345**: *string* = "local"

*Defined in [src/utils/constants.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L77)*

###  1337

• **1337**: *string* = "custom"

*Defined in [src/utils/constants.ts:76](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L76)*

###  2

• **2**: *string* = "cascade"

*Defined in [src/utils/constants.ts:72](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L72)*

###  3

• **3**: *string* = "denali"

*Defined in [src/utils/constants.ts:73](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L73)*

###  4

• **4**: *string* = "everest"

*Defined in [src/utils/constants.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L74)*

###  5

• **5**: *string* = "fuji"

*Defined in [src/utils/constants.ts:75](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L75)*

___

### `Const` NetworkIDToNetworkNames

### ▪ **NetworkIDToNetworkNames**: *object*

*Defined in [src/utils/constants.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L91)*

###  0

• **0**: *string[]* = ["Manhattan"]

*Defined in [src/utils/constants.ts:92](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L92)*

###  1

• **1**: *string[]* = ["Avalanche", "Mainnet"]

*Defined in [src/utils/constants.ts:93](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L93)*

###  12345

• **12345**: *string[]* = ["Local Network"]

*Defined in [src/utils/constants.ts:99](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L99)*

###  1337

• **1337**: *string[]* = ["Custom Network"]

*Defined in [src/utils/constants.ts:98](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L98)*

###  2

• **2**: *string[]* = ["Cascade"]

*Defined in [src/utils/constants.ts:94](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L94)*

###  3

• **3**: *string[]* = ["Denali"]

*Defined in [src/utils/constants.ts:95](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L95)*

###  4

• **4**: *string[]* = ["Everest"]

*Defined in [src/utils/constants.ts:96](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L96)*

###  5

• **5**: *string[]* = ["Fuji", "Testnet"]

*Defined in [src/utils/constants.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L97)*

___

### `Const` NetworkNameToNetworkID

### ▪ **NetworkNameToNetworkID**: *object*

*Defined in [src/utils/constants.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L102)*

###  Avalanche

• **Avalanche**: *number* = 1

*Defined in [src/utils/constants.ts:104](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L104)*

###  Cascade

• **Cascade**: *number* = 2

*Defined in [src/utils/constants.ts:106](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L106)*

###  Custom

• **Custom**: *number* = 1337

*Defined in [src/utils/constants.ts:111](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L111)*

###  Custom Network

• **Custom Network**: *number* = 1337

*Defined in [src/utils/constants.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L112)*

###  Denali

• **Denali**: *number* = 3

*Defined in [src/utils/constants.ts:107](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L107)*

###  Everest

• **Everest**: *number* = 4

*Defined in [src/utils/constants.ts:108](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L108)*

###  Fuji

• **Fuji**: *number* = 5

*Defined in [src/utils/constants.ts:109](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L109)*

###  Local

• **Local**: *number* = 12345

*Defined in [src/utils/constants.ts:113](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L113)*

###  Local Network

• **Local Network**: *number* = 12345

*Defined in [src/utils/constants.ts:114](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L114)*

###  Mainnet

• **Mainnet**: *number* = 1

*Defined in [src/utils/constants.ts:105](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L105)*

###  Manhattan

• **Manhattan**: *number* = 0

*Defined in [src/utils/constants.ts:103](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L103)*

###  Testnet

• **Testnet**: *number* = 5

*Defined in [src/utils/constants.ts:110](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L110)*

___

### `Const` n0C

### ▪ **n0C**: *object*

*Defined in [src/utils/constants.ts:192](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L192)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:194](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L194)*

###  blockchainID

• **blockchainID**: *string* = "2fFZQibQXcd6LTE4rpBPBAkLVXFE91Kit8pgxaBG1mRnh5xqbb"

*Defined in [src/utils/constants.ts:193](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L193)*

###  chainID

• **chainID**: *number* = 43111

*Defined in [src/utils/constants.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L198)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:196](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L196)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:197](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L197)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:195](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L195)*

___

### `Const` n0P

### ▪ **n0P**: *object*

*Defined in [src/utils/constants.ts:173](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L173)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:175](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L175)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:174](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L174)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:180](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L180)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:179](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L179)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:178](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L178)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:177](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L177)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:182](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L182)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:187](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L187)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:183](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L183)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:184](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L184)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:181](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L181)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:189](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L189)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:188](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L188)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:185](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L185)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:186](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L186)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L176)*

___

### `Const` n0X

### ▪ **n0X**: *object*

*Defined in [src/utils/constants.ts:164](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L164)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L166)*

###  blockchainID

• **blockchainID**: *string* = "2vrXWHgGxh5n3YsLHMV16YVVJTpT4z45Fmb4y3bL6si8kLCyg9"

*Defined in [src/utils/constants.ts:165](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L165)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:169](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L169)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:168](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L168)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:170](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L170)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:167](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L167)*

___

### `Const` n12345C

### ▪ **n12345C**: *object*

*Defined in [src/utils/constants.ts:434](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L434)*

___

### `Const` n12345P

### ▪ **n12345P**: *object*

*Defined in [src/utils/constants.ts:432](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L432)*

___

### `Const` n12345X

### ▪ **n12345X**: *object*

*Defined in [src/utils/constants.ts:429](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L429)*

___

### `Const` n1337C

### ▪ **n1337C**: *object*

*Defined in [src/utils/constants.ts:421](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L421)*

___

### `Const` n1337P

### ▪ **n1337P**: *object*

*Defined in [src/utils/constants.ts:419](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L419)*

___

### `Const` n1337X

### ▪ **n1337X**: *object*

*Defined in [src/utils/constants.ts:416](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L416)*

___

### `Const` n1C

### ▪ **n1C**: *object*

*Defined in [src/utils/constants.ts:234](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L234)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:236](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L236)*

###  blockchainID

• **blockchainID**: *string* = "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5"

*Defined in [src/utils/constants.ts:235](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L235)*

###  chainID

• **chainID**: *number* = 43114

*Defined in [src/utils/constants.ts:248](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L248)*

###  costPerSignature

• **costPerSignature**: *number* = 1000

*Defined in [src/utils/constants.ts:239](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L239)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:245](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L245)*

###  maxGasPrice

• **maxGasPrice**: *BN‹›* = GWEI.mul(new BN(1000))

*Defined in [src/utils/constants.ts:247](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L247)*

###  minGasPrice

• **minGasPrice**: *BN‹›* = GWEI.mul(new BN(25))

*Defined in [src/utils/constants.ts:246](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L246)*

###  txBytesGas

• **txBytesGas**: *number* = 1

*Defined in [src/utils/constants.ts:238](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L238)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:242](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L242)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:237](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L237)*

___

### `Const` n1P

### ▪ **n1P**: *object*

*Defined in [src/utils/constants.ts:214](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L214)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:217](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L217)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:216](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L216)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:215](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L215)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:221](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L221)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:220](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L220)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:222](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L222)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:224](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L224)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:229](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L229)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:225](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L225)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:226](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L226)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:223](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L223)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:231](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L231)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:230](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L230)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:227](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L227)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:228](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L228)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:219](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L219)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L218)*

___

### `Const` n1X

### ▪ **n1X**: *object*

*Defined in [src/utils/constants.ts:204](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L204)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:207](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L207)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:206](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L206)*

###  blockchainID

• **blockchainID**: *string* = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"

*Defined in [src/utils/constants.ts:205](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L205)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:210](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L210)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L211)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:209](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L209)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:208](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L208)*

___

### `Const` n2C

### ▪ **n2C**: *object*

*Defined in [src/utils/constants.ts:281](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L281)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:283](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L283)*

###  blockchainID

• **blockchainID**: *string* = "2mUYSXfLrDtigwbzj1LxKVsHwELghc5sisoXrzJwLqAAQHF4i"

*Defined in [src/utils/constants.ts:282](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L282)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:285](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L285)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:284](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L284)*

___

### `Const` n2P

### ▪ **n2P**: *object*

*Defined in [src/utils/constants.ts:262](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L262)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:264](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L264)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:263](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L263)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:269](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L269)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:268](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L268)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:267](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L267)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:271](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L271)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:276](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L276)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:272](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L272)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:273](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L273)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:270](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L270)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:278](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L278)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:277](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L277)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:274](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L274)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:275](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L275)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:266](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L266)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:265](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L265)*

___

### `Const` n2X

### ▪ **n2X**: *object*

*Defined in [src/utils/constants.ts:253](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L253)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:255](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L255)*

###  blockchainID

• **blockchainID**: *string* = "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM"

*Defined in [src/utils/constants.ts:254](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L254)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:258](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L258)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = new BN(0)

*Defined in [src/utils/constants.ts:259](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L259)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:257](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L257)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:256](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L256)*

___

### `Const` n3C

### ▪ **n3C**: *object*

*Defined in [src/utils/constants.ts:318](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L318)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:320](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L320)*

###  blockchainID

• **blockchainID**: *string* = "zJytnh96Pc8rM337bBrtMvJDbEdDNjcXG3WkTNCiLp18ergm9"

*Defined in [src/utils/constants.ts:319](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L319)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:322](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L322)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:321](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L321)*

___

### `Const` n3P

### ▪ **n3P**: *object*

*Defined in [src/utils/constants.ts:299](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L299)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:301](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L301)*

###  blockchainID

• **blockchainID**: *string* = ""

*Defined in [src/utils/constants.ts:300](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L300)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:306](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L306)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:305](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L305)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:304](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L304)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:308](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L308)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:313](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L313)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:309](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L309)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:310](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L310)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:307](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L307)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:315](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L315)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:314](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L314)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:311](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L311)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:312](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L312)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:303](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L303)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:302](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L302)*

___

### `Const` n3X

### ▪ **n3X**: *object*

*Defined in [src/utils/constants.ts:290](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L290)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:292](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L292)*

###  blockchainID

• **blockchainID**: *string* = "rrEWX7gc7D9mwcdrdBxBTdqh1a7WDVsMuadhTZgyXfFcRz45L"

*Defined in [src/utils/constants.ts:291](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L291)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:295](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L295)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = new BN(0)

*Defined in [src/utils/constants.ts:296](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L296)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:294](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L294)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:293](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L293)*

___

### `Const` n4C

### ▪ **n4C**: *object*

*Defined in [src/utils/constants.ts:355](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L355)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:357](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L357)*

###  blockchainID

• **blockchainID**: *string* = "saMG5YgNsFxzjz4NMkEkt3bAH6hVxWdZkWcEnGB3Z15pcAmsK"

*Defined in [src/utils/constants.ts:356](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L356)*

###  chainID

• **chainID**: *number* = 43110

*Defined in [src/utils/constants.ts:360](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L360)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:359](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L359)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:358](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L358)*

___

### `Const` n4P

### ▪ **n4P**: *object*

*Defined in [src/utils/constants.ts:336](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L336)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:338](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L338)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:337](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L337)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:343](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L343)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:342](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L342)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:341](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L341)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:345](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L345)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:350](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L350)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:346](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L346)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:347](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L347)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:344](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L344)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:352](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L352)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:351](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L351)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:348](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L348)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:349](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L349)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:340](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L340)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:339](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L339)*

___

### `Const` n4X

### ▪ **n4X**: *object*

*Defined in [src/utils/constants.ts:327](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L327)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:329](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L329)*

###  blockchainID

• **blockchainID**: *string* = "jnUjZSRt16TcRnZzmh5aMhavwVHz3zBrSN8GfFMTQkzUnoBxC"

*Defined in [src/utils/constants.ts:328](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L328)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:332](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L332)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:333](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L333)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:331](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L331)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:330](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L330)*

___

### `Const` n5C

### ▪ **n5C**: *object*

*Defined in [src/utils/constants.ts:396](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L396)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:398](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L398)*

###  blockchainID

• **blockchainID**: *string* = "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp"

*Defined in [src/utils/constants.ts:397](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L397)*

###  chainID

• **chainID**: *number* = 43113

*Defined in [src/utils/constants.ts:410](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L410)*

###  costPerSignature

• **costPerSignature**: *number* = 1000

*Defined in [src/utils/constants.ts:401](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L401)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:407](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L407)*

###  maxGasPrice

• **maxGasPrice**: *BN‹›* = GWEI.mul(new BN(1000))

*Defined in [src/utils/constants.ts:409](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L409)*

###  minGasPrice

• **minGasPrice**: *BN‹›* = GWEI.mul(new BN(25))

*Defined in [src/utils/constants.ts:408](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L408)*

###  txBytesGas

• **txBytesGas**: *number* = 1

*Defined in [src/utils/constants.ts:400](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L400)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:404](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L404)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:399](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L399)*

___

### `Const` n5P

### ▪ **n5P**: *object*

*Defined in [src/utils/constants.ts:376](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L376)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:379](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L379)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:378](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L378)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:377](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L377)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:384](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L384)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:383](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L383)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:382](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L382)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:386](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L386)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:391](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L391)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:387](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L387)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:388](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L388)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:385](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L385)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:393](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L393)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:392](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L392)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:389](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L389)*

###  minStakeDuration

• **minStakeDuration**: *number* = 24 * 60 * 60

*Defined in [src/utils/constants.ts:390](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L390)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:381](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L381)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:380](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L380)*

___

### `Const` n5X

### ▪ **n5X**: *object*

*Defined in [src/utils/constants.ts:366](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L366)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:369](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L369)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:368](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L368)*

###  blockchainID

• **blockchainID**: *string* = "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"

*Defined in [src/utils/constants.ts:367](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L367)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:372](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L372)*

###  mintTxFee

• **mintTxFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:373](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L373)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:371](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L371)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:370](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/constants.ts#L370)*
