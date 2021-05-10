[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [PayloadBase](utils_payload.payloadbase.md)

# Class: PayloadBase

Base class for payloads.

## Hierarchy

* **PayloadBase**

  ↳ [BINPayload](utils_payload.binpayload.md)

  ↳ [UTF8Payload](utils_payload.utf8payload.md)

  ↳ [HEXSTRPayload](utils_payload.hexstrpayload.md)

  ↳ [B58STRPayload](utils_payload.b58strpayload.md)

  ↳ [B64STRPayload](utils_payload.b64strpayload.md)

  ↳ [BIGNUMPayload](utils_payload.bignumpayload.md)

  ↳ [ChainAddressPayload](utils_payload.chainaddresspayload.md)

  ↳ [cb58EncodedPayload](utils_payload.cb58encodedpayload.md)

  ↳ [JSONPayload](utils_payload.jsonpayload.md)

## Index

### Constructors

* [constructor](utils_payload.payloadbase.md#constructor)

### Properties

* [payload](utils_payload.payloadbase.md#protected-payload)
* [typeid](utils_payload.payloadbase.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.payloadbase.md#frombuffer)
* [getContent](utils_payload.payloadbase.md#getcontent)
* [getPayload](utils_payload.payloadbase.md#getpayload)
* [returnType](utils_payload.payloadbase.md#abstract-returntype)
* [toBuffer](utils_payload.payloadbase.md#tobuffer)
* [typeID](utils_payload.payloadbase.md#typeid)
* [typeName](utils_payload.payloadbase.md#typename)

## Constructors

###  constructor

\+ **new PayloadBase**(): *[PayloadBase](utils_payload.payloadbase.md)*

*Defined in [src/utils/payload.ts:229](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L229)*

**Returns:** *[PayloadBase](utils_payload.payloadbase.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Defined in [src/utils/payload.ts:167](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L167)*

___

### `Protected` typeid

• **typeid**: *number* = undefined

*Defined in [src/utils/payload.ts:168](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L168)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

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

*Defined in [src/utils/payload.ts:187](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L187)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Defined in [src/utils/payload.ts:195](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L195)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

### `Abstract` returnType

▸ **returnType**(...`args`: any): *any*

*Defined in [src/utils/payload.ts:229](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L229)*

Returns the expected type for the payload.

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any |

**Returns:** *any*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L218)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Defined in [src/utils/payload.ts:173](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L173)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Defined in [src/utils/payload.ts:180](https://github.com/ava-labs/avalanchejs/blob/cfff19f/src/utils/payload.ts#L180)*

Returns the string name for the payload's type.

**Returns:** *string*
