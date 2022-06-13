[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [NFTIDPayload](utils_payload.nftidpayload.md)

# Class: NFTIDPayload

Class for payloads representing NFTIDs (UTXOIDs in an NFT context).

## Hierarchy

  ↳ [UTXOIDPayload](utils_payload.utxoidpayload.md)

  ↳ **NFTIDPayload**

## Index

### Constructors

* [constructor](utils_payload.nftidpayload.md#constructor)

### Properties

* [payload](utils_payload.nftidpayload.md#protected-payload)
* [typeid](utils_payload.nftidpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.nftidpayload.md#frombuffer)
* [getContent](utils_payload.nftidpayload.md#getcontent)
* [getPayload](utils_payload.nftidpayload.md#getpayload)
* [returnType](utils_payload.nftidpayload.md#returntype)
* [toBuffer](utils_payload.nftidpayload.md#tobuffer)
* [typeID](utils_payload.nftidpayload.md#typeid)
* [typeName](utils_payload.nftidpayload.md#typename)

## Constructors

###  constructor

\+ **new NFTIDPayload**(`payload`: any): *[NFTIDPayload](utils_payload.nftidpayload.md)*

*Inherited from [cb58EncodedPayload](utils_payload.cb58encodedpayload.md).[constructor](utils_payload.cb58encodedpayload.md#constructor)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:499](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L499)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or cb58 encoded string  |

**Returns:** *[NFTIDPayload](utils_payload.nftidpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:198](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L198)*

___

### `Protected` typeid

• **typeid**: *number* = 12

*Overrides [UTXOIDPayload](utils_payload.utxoidpayload.md).[typeid](utils_payload.utxoidpayload.md#protected-typeid)*

*Defined in [src/utils/payload.ts:538](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L538)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:236](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L236)*

Decodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getContent

▸ **getContent**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getContent](utils_payload.payloadbase.md#getcontent)*

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L218)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:226](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L226)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnType

▸ **returnType**(): *string*

*Inherited from [cb58EncodedPayload](utils_payload.cb58encodedpayload.md).[returnType](utils_payload.cb58encodedpayload.md#returntype)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:497](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L497)*

Returns a bintools.cb58Encoded string for the payload.

**Returns:** *string*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:251](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L251)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:204](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L204)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:211](https://github.com/ava-labs/avalanchejs/blob/8033096/src/utils/payload.ts#L211)*

Returns the string name for the payload's type.

**Returns:** *string*
