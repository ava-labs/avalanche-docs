[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [B64STRPayload](utils_payload.b64strpayload.md)

# Class: B64STRPayload

Class for payloads representing Base64 encoding.

## Hierarchy

* [PayloadBase](utils_payload.payloadbase.md)

  ↳ **B64STRPayload**

## Index

### Constructors

* [constructor](utils_payload.b64strpayload.md#constructor)

### Properties

* [payload](utils_payload.b64strpayload.md#protected-payload)
* [typeid](utils_payload.b64strpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.b64strpayload.md#frombuffer)
* [getContent](utils_payload.b64strpayload.md#getcontent)
* [getPayload](utils_payload.b64strpayload.md#getpayload)
* [returnType](utils_payload.b64strpayload.md#returntype)
* [toBuffer](utils_payload.b64strpayload.md#tobuffer)
* [typeID](utils_payload.b64strpayload.md#typeid)
* [typeName](utils_payload.b64strpayload.md#typename)

## Constructors

###  constructor

\+ **new B64STRPayload**(`payload`: any): *[B64STRPayload](utils_payload.b64strpayload.md)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:349](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L349)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer of base64 string  |

**Returns:** *[B64STRPayload](utils_payload.b64strpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:167](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L167)*

___

### `Protected` typeid

• **typeid**: *number* = 4

*Overrides [PayloadBase](utils_payload.payloadbase.md).[typeid](utils_payload.payloadbase.md#protected-typeid)*

*Defined in [src/utils/payload.ts:342](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L342)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:205](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L205)*

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

*Defined in [src/utils/payload.ts:187](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L187)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:195](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L195)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnType

▸ **returnType**(): *string*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:347](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L347)*

Returns a base64 string for the payload.

**Returns:** *string*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L218)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:173](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L173)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:180](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L180)*

Returns the string name for the payload's type.

**Returns:** *string*
