[avalanche](../README.md) › [Utils-HelperFunctions](utils_helperfunctions.md)

# Module: Utils-HelperFunctions

## Index

### Functions

* [MaxWeightFormula](utils_helperfunctions.md#maxweightformula)
* [NodeIDStringToBuffer](utils_helperfunctions.md#nodeidstringtobuffer)
* [UnixNow](utils_helperfunctions.md#unixnow)
* [bufferToNodeIDString](utils_helperfunctions.md#buffertonodeidstring)
* [bufferToPrivateKeyString](utils_helperfunctions.md#buffertoprivatekeystring)
* [getPreferredHRP](utils_helperfunctions.md#getpreferredhrp)
* [privateKeyStringToBuffer](utils_helperfunctions.md#privatekeystringtobuffer)

## Functions

###  MaxWeightFormula

▸ **MaxWeightFormula**(`staked`: BN, `cap`: BN): *BN*

*Defined in [src/utils/helperfunctions.ts:25](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`staked` | BN |
`cap` | BN |

**Returns:** *BN*

___

###  NodeIDStringToBuffer

▸ **NodeIDStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:72](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L72)*

Takes a nodeID string and produces a nodeID [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the nodeID.  |

**Returns:** *Buffer*

___

###  UnixNow

▸ **UnixNow**(): *BN*

*Defined in [src/utils/helperfunctions.ts:32](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L32)*

Function providing the current UNIX time using a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  bufferToNodeIDString

▸ **bufferToNodeIDString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L63)*

Takes a nodeID buffer and produces a nodeID string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the nodeID.  |

**Returns:** *string*

___

###  bufferToPrivateKeyString

▸ **bufferToPrivateKeyString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:41](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L41)*

Takes a private key buffer and produces a private key string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the private key.  |

**Returns:** *string*

___

###  getPreferredHRP

▸ **getPreferredHRP**(`networkID`: number): *any*

*Defined in [src/utils/helperfunctions.ts:16](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L16)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`networkID` | number | undefined |

**Returns:** *any*

___

###  privateKeyStringToBuffer

▸ **privateKeyStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:50](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/utils/helperfunctions.ts#L50)*

Takes a private key string and produces a private key [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the private key.  |

**Returns:** *Buffer*
