[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [IPFSPayload](utils_payload.ipfspayload.md)

# Class: IPFSPayload

Class for payloads representing IPFS addresses.

## Hierarchy

  ↳ [B58STRPayload](utils_payload.b58strpayload.md)

  ↳ **IPFSPayload**

## Index

### Constructors

* [constructor](utils_payload.ipfspayload.md#constructor)

### Properties

* [payload](utils_payload.ipfspayload.md#protected-payload)
* [typeid](utils_payload.ipfspayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.ipfspayload.md#frombuffer)
* [getContent](utils_payload.ipfspayload.md#getcontent)
* [getPayload](utils_payload.ipfspayload.md#getpayload)
* [returnType](utils_payload.ipfspayload.md#returntype)
* [toBuffer](utils_payload.ipfspayload.md#tobuffer)
* [typeID](utils_payload.ipfspayload.md#typeid)
* [typeName](utils_payload.ipfspayload.md#typename)

## Constructors

###  constructor

\+ **new IPFSPayload**(`payload`: any): *[IPFSPayload](utils_payload.ipfspayload.md)*

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[constructor](utils_payload.b58strpayload.md#constructor)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:324](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L324)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or cb58 encoded string  |

**Returns:** *[IPFSPayload](utils_payload.ipfspayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:167](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L167)*

___

### `Protected` typeid

• **typeid**: *number* = 28

*Overrides [B58STRPayload](utils_payload.b58strpayload.md).[typeid](utils_payload.b58strpayload.md#protected-typeid)*

*Defined in [src/utils/payload.ts:633](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L633)*

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

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[returnType](utils_payload.b58strpayload.md#returntype)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:322](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/utils/payload.ts#L322)*

Returns a base58 string for the payload.

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
