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

*Defined in [src/utils/helperfunctions.ts:26](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`staked` | BN |
`cap` | BN |

**Returns:** *BN*

___

###  NodeIDStringToBuffer

▸ **NodeIDStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:73](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L73)*

Takes a nodeID string and produces a nodeID [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the nodeID.  |

**Returns:** *Buffer*

___

###  UnixNow

▸ **UnixNow**(): *BN*

*Defined in [src/utils/helperfunctions.ts:33](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L33)*

Function providing the current UNIX time using a [BN](https://github.com/indutny/bn.js/).

**Returns:** *BN*

___

###  bufferToNodeIDString

▸ **bufferToNodeIDString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:64](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L64)*

Takes a nodeID buffer and produces a nodeID string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the nodeID.  |

**Returns:** *string*

___

###  bufferToPrivateKeyString

▸ **bufferToPrivateKeyString**(`pk`: Buffer): *string*

*Defined in [src/utils/helperfunctions.ts:42](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L42)*

Takes a private key buffer and produces a private key string with prefix.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | Buffer | A [Buffer](https://github.com/feross/buffer) for the private key.  |

**Returns:** *string*

___

###  getPreferredHRP

▸ **getPreferredHRP**(`networkID`: number): *any*

*Defined in [src/utils/helperfunctions.ts:17](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L17)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`networkID` | number | undefined |

**Returns:** *any*

___

###  privateKeyStringToBuffer

▸ **privateKeyStringToBuffer**(`pk`: string): *Buffer*

*Defined in [src/utils/helperfunctions.ts:51](https://github.com/ava-labs/avalanchejs/blob/9282770/src/utils/helperfunctions.ts#L51)*

Takes a private key string and produces a private key [Buffer](https://github.com/feross/buffer).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`pk` | string | A string for the private key.  |

**Returns:** *Buffer*
