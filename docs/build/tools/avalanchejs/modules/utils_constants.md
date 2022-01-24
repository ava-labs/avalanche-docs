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

*Defined in [src/utils/constants.ts:432](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L432)*

Rules used when merging sets

## Variables

### `Const` AVAXGWEI

• **AVAXGWEI**: *BN* = NANOAVAX.clone()

*Defined in [src/utils/constants.ts:99](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L99)*

___

### `Const` AVAXSTAKECAP

• **AVAXSTAKECAP**: *BN* = ONEAVAX.mul(new BN(3000000))

*Defined in [src/utils/constants.ts:101](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L101)*

___

### `Const` CChainAlias

• **CChainAlias**: *string* = "C"

*Defined in [src/utils/constants.ts:66](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L66)*

___

### `Const` CChainVMName

• **CChainVMName**: *string* = "evm"

*Defined in [src/utils/constants.ts:69](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L69)*

___

### `Const` CENTIAVAX

• **CENTIAVAX**: *BN* = ONEAVAX.div(new BN(100))

*Defined in [src/utils/constants.ts:87](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L87)*

___

### `Const` DECIAVAX

• **DECIAVAX**: *BN* = ONEAVAX.div(new BN(10))

*Defined in [src/utils/constants.ts:85](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L85)*

___

### `Const` DefaultEVMLocalGenesisAddress

• **DefaultEVMLocalGenesisAddress**: *string* = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"

*Defined in [src/utils/constants.ts:78](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L78)*

___

### `Const` DefaultEVMLocalGenesisPrivateKey

• **DefaultEVMLocalGenesisPrivateKey**: *string* = "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027"

*Defined in [src/utils/constants.ts:76](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L76)*

___

### `Const` DefaultLocalGenesisPrivateKey

• **DefaultLocalGenesisPrivateKey**: *string* = "ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

*Defined in [src/utils/constants.ts:74](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L74)*

___

### `Const` DefaultNetworkID

• **DefaultNetworkID**: *number* = 1

*Defined in [src/utils/constants.ts:61](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L61)*

___

### `Const` FallbackEVMChainID

• **FallbackEVMChainID**: *number* = 43112

*Defined in [src/utils/constants.ts:59](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L59)*

___

### `Const` FallbackHRP

• **FallbackHRP**: *string* = "custom"

*Defined in [src/utils/constants.ts:57](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L57)*

___

### `Const` FallbackNetworkName

• **FallbackNetworkName**: *string* = "Custom Network"

*Defined in [src/utils/constants.ts:58](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L58)*

___

### `Const` FujiAPI

• **FujiAPI**: *string* = "api.avax-test.network"

*Defined in [src/utils/constants.ts:13](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L13)*

___

### `Const` GWEI

• **GWEI**: *BN* = WEI.mul(new BN(1000000000))

*Defined in [src/utils/constants.ts:97](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L97)*

___

### `Const` MICROAVAX

• **MICROAVAX**: *BN* = ONEAVAX.div(new BN(1000000))

*Defined in [src/utils/constants.ts:91](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L91)*

___

### `Const` MILLIAVAX

• **MILLIAVAX**: *BN* = ONEAVAX.div(new BN(1000))

*Defined in [src/utils/constants.ts:89](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L89)*

___

### `Const` MainnetAPI

• **MainnetAPI**: *string* = "api.avax.network"

*Defined in [src/utils/constants.ts:12](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L12)*

___

### `Const` NANOAVAX

• **NANOAVAX**: *BN* = ONEAVAX.div(new BN(1000000000))

*Defined in [src/utils/constants.ts:93](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L93)*

___

### `Const` NodeIDPrefix

• **NodeIDPrefix**: *string* = "NodeID-"

*Defined in [src/utils/constants.ts:10](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L10)*

___

### `Const` ONEAVAX

• **ONEAVAX**: *BN* = new BN(1000000000)

*Defined in [src/utils/constants.ts:83](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L83)*

___

### `Const` PChainAlias

• **PChainAlias**: *string* = "P"

*Defined in [src/utils/constants.ts:67](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L67)*

___

### `Const` PChainVMName

• **PChainVMName**: *string* = "platformvm"

*Defined in [src/utils/constants.ts:70](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L70)*

___

### `Const` PlatformChainID

• **PlatformChainID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:63](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L63)*

___

### `Const` PrimaryAssetAlias

• **PrimaryAssetAlias**: *string* = "AVAX"

*Defined in [src/utils/constants.ts:11](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L11)*

___

### `Const` PrimaryNetworkID

• **PrimaryNetworkID**: *string* = "11111111111111111111111111111111LpoYY"

*Defined in [src/utils/constants.ts:64](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L64)*

___

### `Const` PrivateKeyPrefix

• **PrivateKeyPrefix**: *string* = "PrivateKey-"

*Defined in [src/utils/constants.ts:9](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L9)*

___

### `Const` WEI

• **WEI**: *BN* = new BN(1)

*Defined in [src/utils/constants.ts:95](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L95)*

___

### `Const` XChainAlias

• **XChainAlias**: *string* = "X"

*Defined in [src/utils/constants.ts:65](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L65)*

___

### `Const` XChainVMName

• **XChainVMName**: *string* = "avm"

*Defined in [src/utils/constants.ts:68](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L68)*

___

### `Let` avaxAssetID

• **avaxAssetID**: *string* = "FvwEAhmxKfeiG8SnEvq42hc6whRyY3EFYAvebMqDNDGCgxN5Z"

*Defined in [src/utils/constants.ts:142](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L142)*

___

### `Const` mnemonic

• **mnemonic**: *string* = "output tooth keep tooth bracket fox city sustain blood raise install pond stem reject long scene clap gloom purpose mean music piece unknown light"

*Defined in [src/utils/constants.ts:80](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L80)*

## Object literals

### `Const` HRPToNetworkID

### ▪ **HRPToNetworkID**: *object*

*Defined in [src/utils/constants.ts:25](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L25)*

###  avax

• **avax**: *number* = 1

*Defined in [src/utils/constants.ts:27](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L27)*

###  cascade

• **cascade**: *number* = 2

*Defined in [src/utils/constants.ts:28](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L28)*

###  custom

• **custom**: *number* = 0

*Defined in [src/utils/constants.ts:26](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L26)*

###  denali

• **denali**: *number* = 3

*Defined in [src/utils/constants.ts:29](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L29)*

###  everest

• **everest**: *number* = 4

*Defined in [src/utils/constants.ts:30](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L30)*

###  fuji

• **fuji**: *number* = 5

*Defined in [src/utils/constants.ts:31](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L31)*

###  local

• **local**: *number* = 12345

*Defined in [src/utils/constants.ts:32](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L32)*

___

### `Const` NetworkIDToHRP

### ▪ **NetworkIDToHRP**: *object*

*Defined in [src/utils/constants.ts:15](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L15)*

###  0

• **0**: *string* = "custom"

*Defined in [src/utils/constants.ts:16](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L16)*

###  1

• **1**: *string* = "avax"

*Defined in [src/utils/constants.ts:17](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L17)*

###  12345

• **12345**: *string* = "local"

*Defined in [src/utils/constants.ts:22](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L22)*

###  2

• **2**: *string* = "cascade"

*Defined in [src/utils/constants.ts:18](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L18)*

###  3

• **3**: *string* = "denali"

*Defined in [src/utils/constants.ts:19](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L19)*

###  4

• **4**: *string* = "everest"

*Defined in [src/utils/constants.ts:20](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L20)*

###  5

• **5**: *string* = "fuji"

*Defined in [src/utils/constants.ts:21](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L21)*

___

### `Const` NetworkIDToNetworkNames

### ▪ **NetworkIDToNetworkNames**: *object*

*Defined in [src/utils/constants.ts:35](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L35)*

###  0

• **0**: *string[]* = ["Manhattan"]

*Defined in [src/utils/constants.ts:36](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L36)*

###  1

• **1**: *string[]* = ["Avalanche", "Mainnet"]

*Defined in [src/utils/constants.ts:37](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L37)*

###  12345

• **12345**: *string[]* = ["Local Network"]

*Defined in [src/utils/constants.ts:42](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L42)*

###  2

• **2**: *string[]* = ["Cascade"]

*Defined in [src/utils/constants.ts:38](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L38)*

###  3

• **3**: *string[]* = ["Denali"]

*Defined in [src/utils/constants.ts:39](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L39)*

###  4

• **4**: *string[]* = ["Everest"]

*Defined in [src/utils/constants.ts:40](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L40)*

###  5

• **5**: *string[]* = ["Fuji", "Testnet"]

*Defined in [src/utils/constants.ts:41](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L41)*

___

### `Const` NetworkNameToNetworkID

### ▪ **NetworkNameToNetworkID**: *object*

*Defined in [src/utils/constants.ts:45](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L45)*

###  Avalanche

• **Avalanche**: *number* = 1

*Defined in [src/utils/constants.ts:47](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L47)*

###  Cascade

• **Cascade**: *number* = 2

*Defined in [src/utils/constants.ts:49](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L49)*

###  Denali

• **Denali**: *number* = 3

*Defined in [src/utils/constants.ts:50](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L50)*

###  Everest

• **Everest**: *number* = 4

*Defined in [src/utils/constants.ts:51](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L51)*

###  Fuji

• **Fuji**: *number* = 5

*Defined in [src/utils/constants.ts:52](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L52)*

###  Local Network

• **Local Network**: *number* = 12345

*Defined in [src/utils/constants.ts:54](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L54)*

###  Mainnet

• **Mainnet**: *number* = 1

*Defined in [src/utils/constants.ts:48](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L48)*

###  Manhattan

• **Manhattan**: *number* = 0

*Defined in [src/utils/constants.ts:46](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L46)*

###  Testnet

• **Testnet**: *number* = 5

*Defined in [src/utils/constants.ts:53](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L53)*

___

### `Const` n0C

### ▪ **n0C**: *object*

*Defined in [src/utils/constants.ts:131](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L131)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:133](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L133)*

###  blockchainID

• **blockchainID**: *string* = "2fFZQibQXcd6LTE4rpBPBAkLVXFE91Kit8pgxaBG1mRnh5xqbb"

*Defined in [src/utils/constants.ts:132](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L132)*

###  chainID

• **chainID**: *number* = 43111

*Defined in [src/utils/constants.ts:137](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L137)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:135](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L135)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:136](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L136)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:134](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L134)*

___

### `Const` n0P

### ▪ **n0P**: *object*

*Defined in [src/utils/constants.ts:112](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L112)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:114](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L114)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:113](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L113)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:119](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L119)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:118](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L118)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:117](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L117)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:116](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L116)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:121](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L121)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:126](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L126)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:122](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L122)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:123](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L123)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:120](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L120)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:128](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L128)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:127](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L127)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:124](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L124)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:125](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L125)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:115](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L115)*

___

### `Const` n0X

### ▪ **n0X**: *object*

*Defined in [src/utils/constants.ts:104](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L104)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:106](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L106)*

###  blockchainID

• **blockchainID**: *string* = "2vrXWHgGxh5n3YsLHMV16YVVJTpT4z45Fmb4y3bL6si8kLCyg9"

*Defined in [src/utils/constants.ts:105](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L105)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:109](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L109)*

###  fee

• **fee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:108](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L108)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:107](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L107)*

___

### `Const` n12345C

### ▪ **n12345C**: *object*

*Defined in [src/utils/constants.ts:355](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L355)*

___

### `Const` n12345P

### ▪ **n12345P**: *object*

*Defined in [src/utils/constants.ts:353](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L353)*

___

### `Const` n12345X

### ▪ **n12345X**: *object*

*Defined in [src/utils/constants.ts:350](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L350)*

___

### `Const` n1C

### ▪ **n1C**: *object*

*Defined in [src/utils/constants.ts:172](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L172)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:174](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L174)*

###  blockchainID

• **blockchainID**: *string* = "2q9e4r6Mu3U68nU1fYjgbR6JvwrRx36CohpAX5UQxse55x1Q5"

*Defined in [src/utils/constants.ts:173](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L173)*

###  chainID

• **chainID**: *number* = 43114

*Defined in [src/utils/constants.ts:186](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L186)*

###  costPerSignature

• **costPerSignature**: *number* = 1000

*Defined in [src/utils/constants.ts:177](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L177)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:183](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L183)*

###  maxGasPrice

• **maxGasPrice**: *BN‹›* = GWEI.mul(new BN(1000))

*Defined in [src/utils/constants.ts:185](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L185)*

###  minGasPrice

• **minGasPrice**: *BN‹›* = GWEI.mul(new BN(25))

*Defined in [src/utils/constants.ts:184](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L184)*

###  txBytesGas

• **txBytesGas**: *number* = 1

*Defined in [src/utils/constants.ts:176](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L176)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:180](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L180)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:175](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L175)*

___

### `Const` n1P

### ▪ **n1P**: *object*

*Defined in [src/utils/constants.ts:152](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L152)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:155](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L155)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:154](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L154)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:153](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L153)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:159](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L159)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:158](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L158)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:160](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L160)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:162](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L162)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:167](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L167)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:163](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L163)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:164](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L164)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:161](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L161)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:169](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L169)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:168](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L168)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:165](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L165)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:166](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L166)*

###  txFee

• **txFee**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:157](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L157)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:156](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L156)*

___

### `Const` n1X

### ▪ **n1X**: *object*

*Defined in [src/utils/constants.ts:143](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L143)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:146](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L146)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:145](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L145)*

###  blockchainID

• **blockchainID**: *string* = "2oYMBNV4eNHyqk2fjjV5nVQLDbtmNJzq5s3qs3Lo6ftnC6FByM"

*Defined in [src/utils/constants.ts:144](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L144)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:149](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L149)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:148](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L148)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:147](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L147)*

___

### `Const` n2C

### ▪ **n2C**: *object*

*Defined in [src/utils/constants.ts:218](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L218)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:220](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L220)*

###  blockchainID

• **blockchainID**: *string* = "2mUYSXfLrDtigwbzj1LxKVsHwELghc5sisoXrzJwLqAAQHF4i"

*Defined in [src/utils/constants.ts:219](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L219)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:222](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L222)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:221](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L221)*

___

### `Const` n2P

### ▪ **n2P**: *object*

*Defined in [src/utils/constants.ts:199](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L199)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:201](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L201)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:200](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L200)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:206](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L206)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:205](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L205)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:204](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L204)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:208](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L208)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:213](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L213)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:209](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L209)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:210](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L210)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:207](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L207)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:215](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L215)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:214](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L214)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:211](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L211)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:212](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L212)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:203](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L203)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:202](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L202)*

___

### `Const` n2X

### ▪ **n2X**: *object*

*Defined in [src/utils/constants.ts:191](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L191)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:193](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L193)*

###  blockchainID

• **blockchainID**: *string* = "4ktRjsAKxgMr2aEzv9SWmrU7Xk5FniHUrVCX4P1TZSfTLZWFM"

*Defined in [src/utils/constants.ts:192](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L192)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:196](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L196)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:195](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L195)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:194](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L194)*

___

### `Const` n3C

### ▪ **n3C**: *object*

*Defined in [src/utils/constants.ts:254](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L254)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:256](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L256)*

###  blockchainID

• **blockchainID**: *string* = "zJytnh96Pc8rM337bBrtMvJDbEdDNjcXG3WkTNCiLp18ergm9"

*Defined in [src/utils/constants.ts:255](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L255)*

###  gasPrice

• **gasPrice**: *number* = 0

*Defined in [src/utils/constants.ts:258](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L258)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:257](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L257)*

___

### `Const` n3P

### ▪ **n3P**: *object*

*Defined in [src/utils/constants.ts:235](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L235)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:237](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L237)*

###  blockchainID

• **blockchainID**: *string* = ""

*Defined in [src/utils/constants.ts:236](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L236)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:242](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L242)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:241](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L241)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:240](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L240)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:244](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L244)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:249](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L249)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:245](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L245)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:246](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L246)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:243](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L243)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:251](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L251)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:250](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L250)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:247](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L247)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:248](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L248)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:239](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L239)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:238](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L238)*

___

### `Const` n3X

### ▪ **n3X**: *object*

*Defined in [src/utils/constants.ts:227](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L227)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:229](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L229)*

###  blockchainID

• **blockchainID**: *string* = "rrEWX7gc7D9mwcdrdBxBTdqh1a7WDVsMuadhTZgyXfFcRz45L"

*Defined in [src/utils/constants.ts:228](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L228)*

###  creationTxFee

• **creationTxFee**: *number* = 0

*Defined in [src/utils/constants.ts:232](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L232)*

###  txFee

• **txFee**: *number* = 0

*Defined in [src/utils/constants.ts:231](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L231)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:230](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L230)*

___

### `Const` n4C

### ▪ **n4C**: *object*

*Defined in [src/utils/constants.ts:290](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L290)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:292](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L292)*

###  blockchainID

• **blockchainID**: *string* = "saMG5YgNsFxzjz4NMkEkt3bAH6hVxWdZkWcEnGB3Z15pcAmsK"

*Defined in [src/utils/constants.ts:291](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L291)*

###  chainID

• **chainID**: *number* = 43110

*Defined in [src/utils/constants.ts:295](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L295)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(470))

*Defined in [src/utils/constants.ts:294](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L294)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:293](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L293)*

___

### `Const` n4P

### ▪ **n4P**: *object*

*Defined in [src/utils/constants.ts:271](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L271)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:273](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L273)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:272](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L272)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:278](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L278)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:277](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L277)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:276](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L276)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:280](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L280)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:285](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L285)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:281](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L281)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:282](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L282)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:279](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L279)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:287](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L287)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX.mul(new BN(25))

*Defined in [src/utils/constants.ts:286](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L286)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX.mul(new BN(2000))

*Defined in [src/utils/constants.ts:283](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L283)*

###  minStakeDuration

• **minStakeDuration**: *number* = 2 * 7 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:284](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L284)*

###  txFee

• **txFee**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:275](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L275)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:274](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L274)*

___

### `Const` n4X

### ▪ **n4X**: *object*

*Defined in [src/utils/constants.ts:263](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L263)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:265](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L265)*

###  blockchainID

• **blockchainID**: *string* = "jnUjZSRt16TcRnZzmh5aMhavwVHz3zBrSN8GfFMTQkzUnoBxC"

*Defined in [src/utils/constants.ts:264](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L264)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:268](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L268)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:267](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L267)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:266](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L266)*

___

### `Const` n5C

### ▪ **n5C**: *object*

*Defined in [src/utils/constants.ts:330](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L330)*

###  alias

• **alias**: *string* = CChainAlias

*Defined in [src/utils/constants.ts:332](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L332)*

###  blockchainID

• **blockchainID**: *string* = "yH8D7ThNJkxmtkuv2jgBa4P1Rn3Qpr4pPr7QYNfcdoS6k6HWp"

*Defined in [src/utils/constants.ts:331](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L331)*

###  chainID

• **chainID**: *number* = 43113

*Defined in [src/utils/constants.ts:344](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L344)*

###  costPerSignature

• **costPerSignature**: *number* = 1000

*Defined in [src/utils/constants.ts:335](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L335)*

###  gasPrice

• **gasPrice**: *BN‹›* = GWEI.mul(new BN(225))

*Defined in [src/utils/constants.ts:341](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L341)*

###  maxGasPrice

• **maxGasPrice**: *BN‹›* = GWEI.mul(new BN(1000))

*Defined in [src/utils/constants.ts:343](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L343)*

###  minGasPrice

• **minGasPrice**: *BN‹›* = GWEI.mul(new BN(25))

*Defined in [src/utils/constants.ts:342](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L342)*

###  txBytesGas

• **txBytesGas**: *number* = 1

*Defined in [src/utils/constants.ts:334](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L334)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:338](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L338)*

###  vm

• **vm**: *string* = CChainVMName

*Defined in [src/utils/constants.ts:333](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L333)*

___

### `Const` n5P

### ▪ **n5P**: *object*

*Defined in [src/utils/constants.ts:310](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L310)*

###  alias

• **alias**: *string* = PChainAlias

*Defined in [src/utils/constants.ts:313](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L313)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:312](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L312)*

###  blockchainID

• **blockchainID**: *string* = PlatformChainID

*Defined in [src/utils/constants.ts:311](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L311)*

###  createChainTx

• **createChainTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:318](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L318)*

###  createSubnetTx

• **createSubnetTx**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:317](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L317)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:316](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L316)*

###  maxConsumption

• **maxConsumption**: *number* = 0.12

*Defined in [src/utils/constants.ts:320](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L320)*

###  maxStakeDuration

• **maxStakeDuration**: *number* = 365 * 24 * 60 * 60

*Defined in [src/utils/constants.ts:325](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L325)*

###  maxStakingDuration

• **maxStakingDuration**: *BN‹›* = new BN(31536000)

*Defined in [src/utils/constants.ts:321](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L321)*

###  maxSupply

• **maxSupply**: *BN‹›* = new BN(720000000).mul(ONEAVAX)

*Defined in [src/utils/constants.ts:322](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L322)*

###  minConsumption

• **minConsumption**: *number* = 0.1

*Defined in [src/utils/constants.ts:319](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L319)*

###  minDelegationFee

• **minDelegationFee**: *BN‹›* = new BN(2)

*Defined in [src/utils/constants.ts:327](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L327)*

###  minDelegationStake

• **minDelegationStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:326](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L326)*

###  minStake

• **minStake**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:323](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L323)*

###  minStakeDuration

• **minStakeDuration**: *number* = 24 * 60 * 60

*Defined in [src/utils/constants.ts:324](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L324)*

###  txFee

• **txFee**: *BN‹›* = ONEAVAX

*Defined in [src/utils/constants.ts:315](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L315)*

###  vm

• **vm**: *string* = PChainVMName

*Defined in [src/utils/constants.ts:314](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L314)*

___

### `Const` n5X

### ▪ **n5X**: *object*

*Defined in [src/utils/constants.ts:301](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L301)*

###  alias

• **alias**: *string* = XChainAlias

*Defined in [src/utils/constants.ts:304](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L304)*

###  avaxAssetID

• **avaxAssetID**: *string* = avaxAssetID

*Defined in [src/utils/constants.ts:303](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L303)*

###  blockchainID

• **blockchainID**: *string* = "2JVSBoinj9C2J33VntvzYtVJNZdN2NKiwwKjcumHUWEb5DbBrm"

*Defined in [src/utils/constants.ts:302](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L302)*

###  creationTxFee

• **creationTxFee**: *BN‹›* = CENTIAVAX

*Defined in [src/utils/constants.ts:307](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L307)*

###  txFee

• **txFee**: *BN‹›* = MILLIAVAX

*Defined in [src/utils/constants.ts:306](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L306)*

###  vm

• **vm**: *string* = XChainVMName

*Defined in [src/utils/constants.ts:305](https://github.com/ava-labs/avalanchejs/blob/598fbcc/src/utils/constants.ts#L305)*
