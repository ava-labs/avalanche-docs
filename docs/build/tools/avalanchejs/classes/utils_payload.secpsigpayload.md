[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [SECPSIGPayload](utils_payload.secpsigpayload.md)

# Class: SECPSIGPayload

Class for payloads representing secp256k1 signatures.
convention: secp256k1 signature (130 bytes)

## Hierarchy

  ↳ [B58STRPayload](utils_payload.b58strpayload.md)

  ↳ **SECPSIGPayload**

## Index

### Constructors

* [constructor](utils_payload.secpsigpayload.md#constructor)

### Properties

* [payload](utils_payload.secpsigpayload.md#protected-payload)
* [typeid](utils_payload.secpsigpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.secpsigpayload.md#frombuffer)
* [getContent](utils_payload.secpsigpayload.md#getcontent)
* [getPayload](utils_payload.secpsigpayload.md#getpayload)
* [returnType](utils_payload.secpsigpayload.md#returntype)
* [toBuffer](utils_payload.secpsigpayload.md#tobuffer)
* [typeID](utils_payload.secpsigpayload.md#typeid)
* [typeName](utils_payload.secpsigpayload.md#typename)

## Constructors

###  constructor

\+ **new SECPSIGPayload**(`payload`: any): *[SECPSIGPayload](utils_payload.secpsigpayload.md)*

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[constructor](utils_payload.b58strpayload.md#constructor)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:359](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L359)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or cb58 encoded string  |

**Returns:** *[SECPSIGPayload](utils_payload.secpsigpayload.md)*

## Properties

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L198)*

___

### `Protected` typeid

• **typeid**: *number* = 16

*Overrides [B58STRPayload](utils_payload.b58strpayload.md).[typeid](utils_payload.b58strpayload.md#protected-typeid)*

*Defined in [src/utils/payload.ts:567](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L567)*

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

▸ **returnType**(): *string*

*Inherited from [B58STRPayload](utils_payload.b58strpayload.md).[returnType](utils_payload.b58strpayload.md#returntype)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:357](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L357)*

Returns a base58 string for the payload.

**Returns:** *string*

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
