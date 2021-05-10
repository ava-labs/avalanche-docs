[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [SECPENCPayload](utils_payload.secpencpayload.md)

# Class: SECPENCPayload

Class for payloads representing secp256k1 encrypted messages.
convention: public key (65 bytes) + secp256k1 encrypted message for that public key

## Hierarchy

  ↳ [B58STRPayload](utils_payload.b58strpayload.md)

  ↳ **SECPENCPayload**

## Index

### Constructors

* [constructor](utils_payload.secpencpayload.md#constructor)

### Properties

* [payload](utils_payload.secpencpayload.md#protected-payload)
* [typeid](utils_payload.secpencpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.secpencpayload.md#frombuffer)
* [getContent](utils_payload.secpencpayload.md#getcontent)
* [getPayload](utils_payload.secpencpayload.md#getpayload)
* [returnType](utils_payload.secpencpayload.md#returntype)
* [toBuffer](utils_payload.secpencpayload.md#tobuffer)
* [typeID](utils_payload.secpencpayload.md#typeid)
* [typeName](utils_payload.secpencpayload.md#typename)

## Constructors

###  constructor

\+ **new SECPENCPayload**(`payload`: any): *[SECPENCPayload](utils_payload.secpencpayload.md)*

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[constructor](utils_payload.b58strpayload.md#constructor)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:324](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L324)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or cb58 encoded string  |

**Returns:** *[SECPENCPayload](utils_payload.secpencpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:167](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L167)*

___

### `Protected` typeid

• **typeid**: *number* = 17

*Overrides [B58STRPayload](utils_payload.b58strpayload.md).[typeid](utils_payload.b58strpayload.md#protected-typeid)*

*Defined in [src/utils/payload.ts:540](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L540)*

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

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[returnType](utils_payload.b58strpayload.md#returntype)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:322](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L322)*

Returns a base58 string for the payload.

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
