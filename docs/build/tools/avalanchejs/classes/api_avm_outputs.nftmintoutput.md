[avalanche](../README.md) › [API-AVM-Outputs](../modules/api_avm_outputs.md) › [NFTMintOutput](api_avm_outputs.nftmintoutput.md)

# Class: NFTMintOutput

An [Output](../modules/src_common.md#output) class which specifies an Output that carries an NFT Mint and uses secp256k1 signature scheme.

## Hierarchy

  ↳ [NFTOutput](api_avm_outputs.nftoutput.md)

  ↳ **NFTMintOutput**

## Index

### Constructors

* [constructor](api_avm_outputs.nftmintoutput.md#constructor)

### Properties

* [_codecID](api_avm_outputs.nftmintoutput.md#protected-_codecid)
* [_typeID](api_avm_outputs.nftmintoutput.md#protected-_typeid)
* [_typeName](api_avm_outputs.nftmintoutput.md#protected-_typename)
* [addresses](api_avm_outputs.nftmintoutput.md#protected-addresses)
* [groupID](api_avm_outputs.nftmintoutput.md#protected-groupid)
* [locktime](api_avm_outputs.nftmintoutput.md#protected-locktime)
* [numaddrs](api_avm_outputs.nftmintoutput.md#protected-numaddrs)
* [threshold](api_avm_outputs.nftmintoutput.md#protected-threshold)

### Methods

* [clone](api_avm_outputs.nftmintoutput.md#clone)
* [create](api_avm_outputs.nftmintoutput.md#create)
* [deserialize](api_avm_outputs.nftmintoutput.md#deserialize)
* [fromBuffer](api_avm_outputs.nftmintoutput.md#frombuffer)
* [getAddress](api_avm_outputs.nftmintoutput.md#getaddress)
* [getAddressIdx](api_avm_outputs.nftmintoutput.md#getaddressidx)
* [getAddresses](api_avm_outputs.nftmintoutput.md#getaddresses)
* [getCodecID](api_avm_outputs.nftmintoutput.md#getcodecid)
* [getGroupID](api_avm_outputs.nftmintoutput.md#getgroupid)
* [getLocktime](api_avm_outputs.nftmintoutput.md#getlocktime)
* [getOutputID](api_avm_outputs.nftmintoutput.md#getoutputid)
* [getSpenders](api_avm_outputs.nftmintoutput.md#getspenders)
* [getThreshold](api_avm_outputs.nftmintoutput.md#getthreshold)
* [getTypeID](api_avm_outputs.nftmintoutput.md#gettypeid)
* [getTypeName](api_avm_outputs.nftmintoutput.md#gettypename)
* [makeTransferable](api_avm_outputs.nftmintoutput.md#maketransferable)
* [meetsThreshold](api_avm_outputs.nftmintoutput.md#meetsthreshold)
* [sanitizeObject](api_avm_outputs.nftmintoutput.md#sanitizeobject)
* [select](api_avm_outputs.nftmintoutput.md#select)
* [serialize](api_avm_outputs.nftmintoutput.md#serialize)
* [setCodecID](api_avm_outputs.nftmintoutput.md#setcodecid)
* [toBuffer](api_avm_outputs.nftmintoutput.md#tobuffer)
* [toString](api_avm_outputs.nftmintoutput.md#tostring)
* [comparator](api_avm_outputs.nftmintoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new NFTMintOutput**(`groupID`: number, `addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[NFTMintOutput](api_avm_outputs.nftmintoutput.md)*

*Overrides [OutputOwners](common_output.outputowners.md).[constructor](common_output.outputowners.md#constructor)*

*Defined in [src/apis/avm/outputs.ts:299](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L299)*

An [Output](../modules/src_common.md#output) class which contains an NFT mint for an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`groupID` | number | undefined | A number specifies the group this NFT is issued to |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing  addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction   |

**Returns:** *[NFTMintOutput](api_avm_outputs.nftmintoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/outputs.ts:238](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L238)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0
      ? AVMConstants.NFTMINTOUTPUTID
      : AVMConstants.NFTMINTOUTPUTID_CODECONE

*Overrides [NFTOutput](api_avm_outputs.nftoutput.md).[_typeID](api_avm_outputs.nftoutput.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:239](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L239)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTMintOutput"

*Overrides [NFTOutput](api_avm_outputs.nftoutput.md).[_typeName](api_avm_outputs.nftoutput.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:237](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L237)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [OutputOwners](common_output.outputowners.md).[addresses](common_output.outputowners.md#protected-addresses)*

*Defined in [src/common/output.ts:158](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L158)*

___

### `Protected` groupID

• **groupID**: *Buffer* = Buffer.alloc(4)

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[groupID](common_output.basenftoutput.md#protected-groupid)*

*Defined in [src/common/output.ts:618](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L618)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [OutputOwners](common_output.outputowners.md).[locktime](common_output.outputowners.md#protected-locktime)*

*Defined in [src/common/output.ts:155](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L155)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[numaddrs](common_output.outputowners.md#protected-numaddrs)*

*Defined in [src/common/output.ts:157](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L157)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [OutputOwners](common_output.outputowners.md).[threshold](common_output.outputowners.md#protected-threshold)*

*Defined in [src/common/output.ts:156](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L156)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [Output](common_output.output.md).[clone](common_output.output.md#abstract-clone)*

*Defined in [src/apis/avm/outputs.ts:295](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L295)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [Output](common_output.output.md).[create](common_output.output.md#abstract-create)*

*Defined in [src/apis/avm/outputs.ts:291](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L291)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[deserialize](common_output.basenftoutput.md#deserialize)*

*Overrides [OutputOwners](common_output.outputowners.md).[deserialize](common_output.outputowners.md#deserialize)*

*Defined in [src/common/output.ts:607](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L607)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`utxobuff`: Buffer, `offset`: number): *number*

*Overrides [OutputOwners](common_output.outputowners.md).[fromBuffer](common_output.outputowners.md#frombuffer)*

*Defined in [src/apis/avm/outputs.ts:275](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L275)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [NFTMintOutput](api_avm_outputs.nftmintoutput.md) and returns the size of the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`utxobuff` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(`idx`: number): *Buffer*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddress](common_output.outputowners.md#getaddress)*

*Defined in [src/common/output.ts:208](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L208)*

Returns the address from the index provided.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`idx` | number | The index of the address.  |

**Returns:** *Buffer*

Returns the string representing the address.

___

###  getAddressIdx

▸ **getAddressIdx**(`address`: Buffer): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddressIdx](common_output.outputowners.md#getaddressidx)*

*Defined in [src/common/output.ts:188](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L188)*

Returns the index of the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`address` | Buffer | A [Buffer](https://github.com/feross/buffer) of the address to look up to return its index.  |

**Returns:** *number*

The index of the address.

___

###  getAddresses

▸ **getAddresses**(): *Buffer[]*

*Inherited from [OutputOwners](common_output.outputowners.md).[getAddresses](common_output.outputowners.md#getaddresses)*

*Defined in [src/common/output.ts:173](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L173)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:70](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/utils/serialization.ts#L70)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getGroupID

▸ **getGroupID**(): *number*

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[getGroupID](common_output.basenftoutput.md#getgroupid)*

*Defined in [src/common/output.ts:623](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L623)*

Returns the groupID as a number.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [OutputOwners](common_output.outputowners.md).[getLocktime](common_output.outputowners.md#getlocktime)*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L168)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getOutputID

▸ **getOutputID**(): *number*

*Overrides [Output](common_output.output.md).[getOutputID](common_output.output.md#abstract-getoutputid)*

*Defined in [src/apis/avm/outputs.ts:268](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L268)*

Returns the outputID for this output

**Returns:** *number*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Buffer[], `asOf`: BN): *Buffer[]*

*Inherited from [OutputOwners](common_output.outputowners.md).[getSpenders](common_output.outputowners.md#getspenders)*

*Defined in [src/common/output.ts:237](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L237)*

Given an array of addresses and an optional timestamp, select an array of address [Buffer](https://github.com/feross/buffer)s of qualified spenders for the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *Buffer[]*

___

###  getThreshold

▸ **getThreshold**(): *number*

*Inherited from [OutputOwners](common_output.outputowners.md).[getThreshold](common_output.outputowners.md#getthreshold)*

*Defined in [src/common/output.ts:163](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L163)*

Returns the threshold of signers required to spend this output.

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

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Inherited from [NFTOutput](api_avm_outputs.nftoutput.md).[makeTransferable](api_avm_outputs.nftoutput.md#maketransferable)*

*Overrides [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/apis/avm/outputs.ts:112](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L112)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Buffer[], `asOf`: BN): *boolean*

*Inherited from [OutputOwners](common_output.outputowners.md).[meetsThreshold](common_output.outputowners.md#meetsthreshold)*

*Defined in [src/common/output.ts:218](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L218)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

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

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Inherited from [NFTOutput](api_avm_outputs.nftoutput.md).[select](api_avm_outputs.nftoutput.md#select)*

*Overrides [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/apis/avm/outputs.ts:116](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L116)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[serialize](common_output.basenftoutput.md#serialize)*

*Overrides [OutputOwners](common_output.outputowners.md).[serialize](common_output.outputowners.md#serialize)*

*Defined in [src/common/output.ts:594](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L594)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/outputs.ts:251](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L251)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [OutputOwners](common_output.outputowners.md).[toBuffer](common_output.outputowners.md#tobuffer)*

*Defined in [src/apis/avm/outputs.ts:284](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/avm/outputs.ts#L284)*

Returns the buffer representing the [NFTMintOutput](api_avm_outputs.nftmintoutput.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [OutputOwners](common_output.outputowners.md).[toString](common_output.outputowners.md#tostring)*

*Defined in [src/common/output.ts:315](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L315)*

Returns a base-58 string representing the [Output](../modules/src_common.md#output).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [OutputOwners](common_output.outputowners.md).[comparator](common_output.outputowners.md#static-comparator)*

*Defined in [src/common/output.ts:319](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/output.ts#L319)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
