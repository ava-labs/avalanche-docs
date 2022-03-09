[avalanche](../README.md) › [Utils-Payload](../modules/utils_payload.md) › [PCHAINADDRPayload](utils_payload.pchainaddrpayload.md)

# Class: PCHAINADDRPayload

Class for payloads representing P-Chain addresses.

## Hierarchy

  ↳ [ChainAddressPayload](utils_payload.chainaddresspayload.md)

  ↳ **PCHAINADDRPayload**

## Index

### Constructors

* [constructor](utils_payload.pchainaddrpayload.md#constructor)

### Properties

* [chainid](utils_payload.pchainaddrpayload.md#protected-chainid)
* [payload](utils_payload.pchainaddrpayload.md#protected-payload)
* [typeid](utils_payload.pchainaddrpayload.md#protected-typeid)

### Methods

* [fromBuffer](utils_payload.pchainaddrpayload.md#frombuffer)
* [getContent](utils_payload.pchainaddrpayload.md#getcontent)
* [getPayload](utils_payload.pchainaddrpayload.md#getpayload)
* [returnChainID](utils_payload.pchainaddrpayload.md#returnchainid)
* [returnType](utils_payload.pchainaddrpayload.md#returntype)
* [toBuffer](utils_payload.pchainaddrpayload.md#tobuffer)
* [typeID](utils_payload.pchainaddrpayload.md#typeid)
* [typeName](utils_payload.pchainaddrpayload.md#typename)

## Constructors

###  constructor

\+ **new PCHAINADDRPayload**(`payload`: any, `hrp?`: string): *[PCHAINADDRPayload](utils_payload.pchainaddrpayload.md)*

*Inherited from [ChainAddressPayload](utils_payload.chainaddresspayload.md).[constructor](utils_payload.chainaddresspayload.md#constructor)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[constructor](utils_payload.payloadbase.md#constructor)*

*Defined in [src/utils/payload.ts:448](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L448)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`payload` | any | undefined | Buffer or address string  |
`hrp?` | string | - | - |

**Returns:** *[PCHAINADDRPayload](utils_payload.pchainaddrpayload.md)*

## Properties

### `Protected` chainid

• **chainid**: *string* = "P"

*Overrides [ChainAddressPayload](utils_payload.chainaddresspayload.md).[chainid](utils_payload.chainaddresspayload.md#protected-chainid)*

*Defined in [src/utils/payload.ts:479](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L479)*

___

### `Protected` payload

• **payload**: *Buffer* = Buffer.alloc(0)

*Inherited from [PayloadBase](utils_payload.payloadbase.md).[payload](utils_payload.payloadbase.md#protected-payload)*

*Defined in [src/utils/payload.ts:198](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L198)*

___

### `Protected` typeid

• **typeid**: *number* = 7

*Overrides [ChainAddressPayload](utils_payload.chainaddresspayload.md).[typeid](utils_payload.chainaddresspayload.md#protected-typeid)*

*Defined in [src/utils/payload.ts:478](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L478)*

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

###  returnChainID

▸ **returnChainID**(): *string*

*Inherited from [ChainAddressPayload](utils_payload.chainaddresspayload.md).[returnChainID](utils_payload.chainaddresspayload.md#returnchainid)*

*Defined in [src/utils/payload.ts:438](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L438)*

Returns the chainid.

**Returns:** *string*

___

###  returnType

▸ **returnType**(`hrp`: string): *string*

*Inherited from [ChainAddressPayload](utils_payload.chainaddresspayload.md).[returnType](utils_payload.chainaddresspayload.md#returntype)*

*Overrides [PayloadBase](utils_payload.payloadbase.md).[returnType](utils_payload.payloadbase.md#abstract-returntype)*

*Defined in [src/utils/payload.ts:445](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/payload.ts#L445)*

Returns an address string for the payload.

**Parameters:**

Name | Type |
------ | ------ |
`hrp` | string |

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
