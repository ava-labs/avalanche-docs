[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [JSONPayload](utils_payload.jsonpayload.md)

# Class: JSONPayload

Class for payloads representing JSON strings.

## Hierarchy

* [PayloadBase](utils_payload.payloadbase.md)

  ↳ **JSONPayload**

## Index

### Constructors

* [constructor](utils_payload.jsonpayload.md#constructor)

### Properties

* [payload](utils_payload.jsonpayload.md#protected-payload)
* [typeid](utils_payload.jsonpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.jsonpayload.md#frombuffer)
* [getContent](utils_payload.jsonpayload.md#getcontent)
* [getPayload](utils_payload.jsonpayload.md#getpayload)
* [returnType](utils_payload.jsonpayload.md#returntype)
* [toBuffer](utils_payload.jsonpayload.md#tobuffer)
* [typeID](utils_payload.jsonpayload.md#typeid)
* [typeName](utils_payload.jsonpayload.md#typename)

## Constructors

###  constructor

\+ **new JSONPayload**(`payload`: any): *[JSONPayload](utils_payload.jsonpayload.md)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:628](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L628)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`payload` | any | undefined |

**Returns:** *[JSONPayload](utils_payload.jsonpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L198)*

___

### `Protected` typeid

• **typeid**: *number* = 24

*Overrides [PayloadBase](utils_payload.payloadbase.md).[typeid](utils_payload.payloadbase.md#protected-typeid)*

*Defined in [src/utils/payload.ts:621](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L621)*

## Methods

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[fromBuffer](utils_payload.payloadbase.md#frombuffer)*

*Defined in [src/utils/payload.ts:236](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L236)*

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

*Defined in [src/utils/payload.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L218)*

Returns the payload content (minus typeID).

**Returns:** *Buffer*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[getPayload](utils_payload.payloadbase.md#getpayload)*

*Defined in [src/utils/payload.ts:226](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L226)*

Returns the payload (with typeID).

**Returns:** *Buffer*

___

###  returnType

▸ **returnType**(): *any*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:626](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L626)*

Returns a JSON-decoded object for the payload.

**Returns:** *any*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[toBuffer](utils_payload.payloadbase.md#tobuffer)*

*Defined in [src/utils/payload.ts:251](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L251)*

Encodes the payload as a [Buffer](https://github.com/feross/buffer) including 4 bytes for the length and TypeID.

**Returns:** *Buffer*

___

###  typeID

▸ **typeID**(): *number*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeID](utils_payload.payloadbase.md#typeid)*

*Defined in [src/utils/payload.ts:204](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L204)*

Returns the TypeID for the payload.

**Returns:** *number*

___

###  typeName

▸ **typeName**(): *string*

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[typeName](utils_payload.payloadbase.md#typename)*

*Defined in [src/utils/payload.ts:211](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L211)*

Returns the string name for the payload's type.

**Returns:** *string*
