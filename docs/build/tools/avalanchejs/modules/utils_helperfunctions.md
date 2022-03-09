[avalanche](../README.md) › [Utils-HelperFunctions](utils_helperfunctions.md)

# Module: Utils-HelperFunctions

## Index

### Functions

* [MaxWeightFormula](utils_helperfunctions.md#maxweightformula)
* [NodeIDStringToBuffer](utils_helperfunctions.md#nodeidstringtobuffer)
* [UnixNow](utils_helperfunctions.md#unixnow)
* [bufferToNodeIDString](utils_helperfunctions.md#buffertonodeidstring)
* [bufferToPrivateKeyString](utils_helperfunctions.md#buffertoprivatekeystring)
* [calcBytesCost](utils_helperfunctions.md#calcbytescost)
* [costExportTx](utils_helperfunctions.md#costexporttx)
* [costImportTx](utils_helperfunctions.md#costimporttx)
* [getPreferredHRP](utils_helperfunctions.md#getpreferredhrp)
* [privateKeyStringToBuffer](utils_helperfunctions.md#privatekeystringtobuffer)

## Functions

###  MaxWeightFormula

▸ **MaxWeightFormula**(`staked`: BN, `cap`: BN): *BN*

*Defined in [src/utils/helperfunctions.ts:32](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L32)*

**Parameters:**

Name | Type |
------ | ------ |
`staked` | BN |
`cap` | BN |

**Returns:** *BN*

___

###  NodeIDStringToBuffer

▸ **NodeIDStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:81](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L81)*

Takes a nodeID string and produces a nodeID [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the nodeID.  |

**Returns:** *Buffer*

___

###  UnixNow

▸ **UnixNow**(): *BN*

*Defined in [src/utils/helperfunctions.ts:39](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L39)*

Function providing the current UNIX time using a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  bufferToNodeIDString

▸ **bufferToNodeIDString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:72](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L72)*

Takes a nodeID buffer and produces a nodeID string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the nodeID.  |

**Returns:** *string*

___

###  bufferToPrivateKeyString

▸ **bufferToPrivateKeyString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L48)*

Takes a private key buffer and produces a private key string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the private key.  |

**Returns:** *string*

___

###  calcBytesCost

▸ **calcBytesCost**(`len`: number): *number*

*Defined in [src/utils/helperfunctions.ts:102](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`len` | number |

**Returns:** *number*

___

###  costExportTx

▸ **costExportTx**(`tx`: [UnsignedTx](../classes/api_evm_transactions.unsignedtx.md)): *number*

*Defined in [src/utils/helperfunctions.ts:106](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L106)*

**Parameters:**

Name | Type |
------ | ------ |
`tx` | [UnsignedTx](../classes/api_evm_transactions.unsignedtx.md) |

**Returns:** *number*

___

###  costImportTx

▸ **costImportTx**(`tx`: [UnsignedTx](../classes/api_evm_transactions.unsignedtx.md)): *number*

*Defined in [src/utils/helperfunctions.ts:91](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`tx` | [UnsignedTx](../classes/api_evm_transactions.unsignedtx.md) |

**Returns:** *number*

___

###  getPreferredHRP

▸ **getPreferredHRP**(`networkID`: number): *string*

*Defined in [src/utils/helperfunctions.ts:23](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L23)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`networkID` | number | undefined |

**Returns:** *string*

___

###  privateKeyStringToBuffer

▸ **privateKeyStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:57](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/helperfunctions.ts#L57)*

Takes a private key string and produces a private key [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the private key.  |

**Returns:** *Buffer*
