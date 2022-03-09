[avalanche](../README.md) › [Utils-HDNode](../modules/utils_hdnode.md) › [HDNode](utils_hdnode.hdnode.md)

# Class: HDNode

BIP32 hierarchical deterministic keys.

## Hierarchy

* **HDNode**

## Index

### Constructors

* [constructor](utils_hdnode.hdnode.md#constructor)

### Properties

* [chainCode](utils_hdnode.hdnode.md#chaincode)
* [hdkey](utils_hdnode.hdnode.md#private-hdkey)
* [privateExtendedKey](utils_hdnode.hdnode.md#privateextendedkey)
* [privateKey](utils_hdnode.hdnode.md#privatekey)
* [privateKeyCB58](utils_hdnode.hdnode.md#privatekeycb58)
* [publicExtendedKey](utils_hdnode.hdnode.md#publicextendedkey)
* [publicKey](utils_hdnode.hdnode.md#publickey)

### Methods

* [derive](utils_hdnode.hdnode.md#derive)
* [sign](utils_hdnode.hdnode.md#sign)
* [verify](utils_hdnode.hdnode.md#verify)
* [wipePrivateData](utils_hdnode.hdnode.md#wipeprivatedata)

## Constructors

###  constructor

\+ **new HDNode**(`from`: string | Buffer): *[HDNode](utils_hdnode.hdnode.md)*

*Defined in [src/utils/hdnode.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L70)*

Creates an HDNode from a master seed or an extended public/private key

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`from` | string &#124; Buffer | seed or key to create HDNode from  |

**Returns:** *[HDNode](utils_hdnode.hdnode.md)*

## Properties

###  chainCode

• **chainCode**: *Buffer*

*Defined in [src/utils/hdnode.ts:20](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L20)*

___

### `Private` hdkey

• **hdkey**: *any*

*Defined in [src/utils/hdnode.ts:16](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L16)*

___

###  privateExtendedKey

• **privateExtendedKey**: *string*

*Defined in [src/utils/hdnode.ts:21](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L21)*

___

###  privateKey

• **privateKey**: *Buffer*

*Defined in [src/utils/hdnode.ts:18](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L18)*

___

###  privateKeyCB58

• **privateKeyCB58**: *string*

*Defined in [src/utils/hdnode.ts:19](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L19)*

___

###  publicExtendedKey

• **publicExtendedKey**: *string*

*Defined in [src/utils/hdnode.ts:22](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L22)*

___

###  publicKey

• **publicKey**: *Buffer*

*Defined in [src/utils/hdnode.ts:17](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L17)*

## Methods

###  derive

▸ **derive**(`path`: string): *[HDNode](utils_hdnode.hdnode.md)*

*Defined in [src/utils/hdnode.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L29)*

Derives the HDNode at path from the current HDNode.

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *[HDNode](utils_hdnode.hdnode.md)*

derived child HDNode

___

###  sign

▸ **sign**(`hash`: Buffer): *Buffer*

*Defined in [src/utils/hdnode.ts:45](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L45)*

Signs the buffer hash with the private key using secp256k1 and returns the signature as a buffer.

**Parameters:**

Name | Type |
------ | ------ |
`hash` | Buffer |

**Returns:** *Buffer*

signature as a Buffer

___

###  verify

▸ **verify**(`hash`: Buffer, `signature`: Buffer): *boolean*

*Defined in [src/utils/hdnode.ts:57](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L57)*

Verifies that the signature is valid for hash and the HDNode's public key using secp256k1.

**`throws`** if the hash or signature is the wrong length.

**Parameters:**

Name | Type |
------ | ------ |
`hash` | Buffer |
`signature` | Buffer |

**Returns:** *boolean*

true for valid, false for invalid.

___

###  wipePrivateData

▸ **wipePrivateData**(): *void*

*Defined in [src/utils/hdnode.ts:65](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/hdnode.ts#L65)*

Wipes all record of the private key from the HDNode instance.
After calling this method, the instance will behave as if it was created via an xpub.

**Returns:** *void*
