[avalanche](../README.md) › [API-PlatformVM-Credentials](../modules/api_platformvm_credentials.md) › [SECPCredential](api_platformvm_credentials.secpcredential.md)

# Class: SECPCredential

## Hierarchy

  ↳ [Credential](common_signature.credential.md)

  ↳ **SECPCredential**

## Index

### Constructors

* [constructor](api_platformvm_credentials.secpcredential.md#constructor)

### Properties

* [_codecID](api_platformvm_credentials.secpcredential.md#protected-_codecid)
* [_typeID](api_platformvm_credentials.secpcredential.md#protected-_typeid)
* [_typeName](api_platformvm_credentials.secpcredential.md#protected-_typename)
* [sigArray](api_platformvm_credentials.secpcredential.md#protected-sigarray)

### Methods

* [addSignature](api_platformvm_credentials.secpcredential.md#addsignature)
* [clone](api_platformvm_credentials.secpcredential.md#clone)
* [create](api_platformvm_credentials.secpcredential.md#create)
* [deserialize](api_platformvm_credentials.secpcredential.md#deserialize)
* [fromBuffer](api_platformvm_credentials.secpcredential.md#frombuffer)
* [getCodecID](api_platformvm_credentials.secpcredential.md#getcodecid)
* [getCredentialID](api_platformvm_credentials.secpcredential.md#getcredentialid)
* [getTypeID](api_platformvm_credentials.secpcredential.md#gettypeid)
* [getTypeName](api_platformvm_credentials.secpcredential.md#gettypename)
* [sanitizeObject](api_platformvm_credentials.secpcredential.md#sanitizeobject)
* [select](api_platformvm_credentials.secpcredential.md#select)
* [serialize](api_platformvm_credentials.secpcredential.md#serialize)
* [setCodecID](api_platformvm_credentials.secpcredential.md#setcodecid)
* [toBuffer](api_platformvm_credentials.secpcredential.md#tobuffer)

## Constructors

###  constructor

\+ **new SECPCredential**(`sigarray`: [Signature](common_signature.signature.md)[]): *[SECPCredential](api_platformvm_credentials.secpcredential.md)*

*Inherited from [Credential](common_signature.credential.md).[constructor](common_signature.credential.md#constructor)*

*Defined in [src/common/credentials.ts:176](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L176)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`sigarray` | [Signature](common_signature.signature.md)[] | undefined |

**Returns:** *[SECPCredential](api_platformvm_credentials.secpcredential.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = undefined

*Inherited from [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/utils/serialization.ts:51](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L51)*

___

### `Protected` _typeID

• **_typeID**: *number* = PlatformVMConstants.SECPCREDENTIAL

*Overrides [Credential](common_signature.credential.md).[_typeID](common_signature.credential.md#protected-_typeid)*

*Defined in [src/apis/platformvm/credentials.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L30)*

___

### `Protected` _typeName

• **_typeName**: *string* = "SECPCredential"

*Overrides [Credential](common_signature.credential.md).[_typeName](common_signature.credential.md#protected-_typename)*

*Defined in [src/apis/platformvm/credentials.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L29)*

___

### `Protected` sigArray

• **sigArray**: *[Signature](common_signature.signature.md)[]* = []

*Inherited from [Credential](common_signature.credential.md).[sigArray](common_signature.credential.md#protected-sigarray)*

*Defined in [src/common/credentials.ts:128](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L128)*

## Methods

###  addSignature

▸ **addSignature**(`sig`: [Signature](common_signature.signature.md)): *number*

*Inherited from [Credential](common_signature.credential.md).[addSignature](common_signature.credential.md#addsignature)*

*Defined in [src/common/credentials.ts:142](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L142)*

Adds a signature to the credentials and returns the index off the added signature.

**Parameters:**

Name | Type |
------ | ------ |
`sig` | [Signature](common_signature.signature.md) |

**Returns:** *number*

___

###  clone

▸ **clone**(): *this*

*Overrides [Credential](common_signature.credential.md).[clone](common_signature.credential.md#abstract-clone)*

*Defined in [src/apis/platformvm/credentials.ts:38](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L38)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Credential](common_signature.credential.md).[create](common_signature.credential.md#abstract-create)*

*Defined in [src/apis/platformvm/credentials.ts:44](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [Credential](common_signature.credential.md).[deserialize](common_signature.credential.md#deserialize)*

*Overrides [StandardParseableInput](common_inputs.standardparseableinput.md).[deserialize](common_inputs.standardparseableinput.md#deserialize)*

*Defined in [src/common/credentials.ts:119](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L119)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`bytes`: Buffer, `offset`: number): *number*

*Inherited from [Credential](common_signature.credential.md).[fromBuffer](common_signature.credential.md#frombuffer)*

*Defined in [src/common/credentials.ts:147](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L147)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`bytes` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getCredentialID

▸ **getCredentialID**(): *number*

*Overrides [Credential](common_signature.credential.md).[getCredentialID](common_signature.credential.md#abstract-getcredentialid)*

*Defined in [src/apis/platformvm/credentials.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L34)*

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:63](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L63)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:56](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L56)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  sanitizeObject

▸ **sanitizeObject**(`obj`: object): *object*

*Inherited from [SigIdx](common_signature.sigidx.md).[sanitizeObject](common_signature.sigidx.md#sanitizeobject)*

*Defined in [src/utils/serialization.ts:77](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L77)*

Sanitize to prevent cross scripting attacks.

**Parameters:**

Name | Type |
------ | ------ |
`obj` | object |

**Returns:** *object*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Credential](common_signature.credential.md)*

*Overrides [Credential](common_signature.credential.md).[select](common_signature.credential.md#abstract-select)*

*Defined in [src/apis/platformvm/credentials.ts:48](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/platformvm/credentials.ts#L48)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Credential](common_signature.credential.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [Credential](common_signature.credential.md).[serialize](common_signature.credential.md#serialize)*

*Overrides [Serializable](utils_serialization.serializable.md).[serialize](utils_serialization.serializable.md#serialize)*

*Defined in [src/common/credentials.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L112)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Inherited from [Credential](common_signature.credential.md).[setCodecID](common_signature.credential.md#setcodecid)*

*Defined in [src/common/credentials.ts:137](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L137)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Inherited from [Credential](common_signature.credential.md).[toBuffer](common_signature.credential.md#tobuffer)*

*Defined in [src/common/credentials.ts:161](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/credentials.ts#L161)*

**Returns:** *Buffer*
