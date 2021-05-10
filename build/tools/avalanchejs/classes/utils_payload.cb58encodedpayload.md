[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [cb58EncodedPayload](utils_payload.cb58encodedpayload.md)

# Class: cb58EncodedPayload

Class for payloads representing data serialized by bintools.cb58Encode().

## Hierarchy

* [PayloadBase](utils_payload.payloadbase.md)

  ↳ **cb58EncodedPayload**

  ↳ [TXIDPayload](utils_payload.txidpayload.md)

  ↳ [ASSETIDPayload](utils_payload.assetidpayload.md)

  ↳ [UTXOIDPayload](utils_payload.utxoidpayload.md)

  ↳ [SUBNETIDPayload](utils_payload.subnetidpayload.md)

  ↳ [CHAINIDPayload](utils_payload.chainidpayload.md)

  ↳ [NODEIDPayload](utils_payload.nodeidpayload.md)

## Index

### Constructors

* [constructor](utils_payload.cb58encodedpayload.md#constructor)

### Properties

* [payload](utils_payload.cb58encodedpayload.md#protected-payload)
* [typeid](utils_payload.cb58encodedpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.cb58encodedpayload.md#frombuffer)
* [getContent](utils_payload.cb58encodedpayload.md#getcontent)
* [getPayload](utils_payload.cb58encodedpayload.md#getpayload)
* [returnType](utils_payload.cb58encodedpayload.md#returntype)
* [toBuffer](utils_payload.cb58encodedpayload.md#tobuffer)
* [typeID](utils_payload.cb58encodedpayload.md#typeid)
* [typeName](utils_payload.cb58encodedpayload.md#typename)

## Constructors

###  constructor

\+ **new cb58EncodedPayload**(`payload`: any): *[cb58EncodedPayload](utils_payload.cb58encodedpayload.md)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:464](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L464)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or cb58 encoded string  |

**Returns:** *[cb58EncodedPayload](utils_payload.cb58encodedpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:167](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L167)*

___

### `Protected` typeid

• **typeid**: *number* = undefined

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeid](utils_payload.payloadbase.md#protected-typeid)*

*Defined in [src/utils/payload.ts:168](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L168)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:205](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L205)*

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

*Defined in [src/utils/payload.ts:187](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L187)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:195](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L195)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnType

▸ **returnType**(): *string*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:462](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L462)*

Returns a bintools.cb58Encoded string for the payload.

**Returns:** *string*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L218)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:173](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L173)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:180](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L180)*

Returns the string name for the payload's type.

**Returns:** *string*
