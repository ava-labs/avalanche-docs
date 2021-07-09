[avalanche](../README.md) › [API-AVM-Outputs](../modules/api_avm_outputs.md) › [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)

# Class: NFTTransferOutput

An [Output](../modules/src_common.md#output) class which specifies an Output that carries an NFT and uses secp256k1 signature scheme.

## Hierarchy

  ↳ [NFTOutput](api_avm_outputs.nftoutput.md)

  ↳ **NFTTransferOutput**

## Index

### Constructors

* [constructor](api_avm_outputs.nfttransferoutput.md#constructor)

### Properties

* [_codecID](api_avm_outputs.nfttransferoutput.md#protected-_codecid)
* [_typeID](api_avm_outputs.nfttransferoutput.md#protected-_typeid)
* [_typeName](api_avm_outputs.nfttransferoutput.md#protected-_typename)
* [addresses](api_avm_outputs.nfttransferoutput.md#protected-addresses)
* [groupID](api_avm_outputs.nfttransferoutput.md#protected-groupid)
* [locktime](api_avm_outputs.nfttransferoutput.md#protected-locktime)
* [numaddrs](api_avm_outputs.nfttransferoutput.md#protected-numaddrs)
* [payload](api_avm_outputs.nfttransferoutput.md#protected-payload)
* [sizePayload](api_avm_outputs.nfttransferoutput.md#protected-sizepayload)
* [threshold](api_avm_outputs.nfttransferoutput.md#protected-threshold)

### Methods

* [clone](api_avm_outputs.nfttransferoutput.md#clone)
* [create](api_avm_outputs.nfttransferoutput.md#create)
* [deserialize](api_avm_outputs.nfttransferoutput.md#deserialize)
* [fromBuffer](api_avm_outputs.nfttransferoutput.md#frombuffer)
* [getAddress](api_avm_outputs.nfttransferoutput.md#getaddress)
* [getAddressIdx](api_avm_outputs.nfttransferoutput.md#getaddressidx)
* [getAddresses](api_avm_outputs.nfttransferoutput.md#getaddresses)
* [getCodecID](api_avm_outputs.nfttransferoutput.md#getcodecid)
* [getGroupID](api_avm_outputs.nfttransferoutput.md#getgroupid)
* [getLocktime](api_avm_outputs.nfttransferoutput.md#getlocktime)
* [getOutputID](api_avm_outputs.nfttransferoutput.md#getoutputid)
* [getPayload](api_avm_outputs.nfttransferoutput.md#getpayload)
* [getPayloadBuffer](api_avm_outputs.nfttransferoutput.md#getpayloadbuffer)
* [getSpenders](api_avm_outputs.nfttransferoutput.md#getspenders)
* [getThreshold](api_avm_outputs.nfttransferoutput.md#getthreshold)
* [getTypeID](api_avm_outputs.nfttransferoutput.md#gettypeid)
* [getTypeName](api_avm_outputs.nfttransferoutput.md#gettypename)
* [makeTransferable](api_avm_outputs.nfttransferoutput.md#maketransferable)
* [meetsThreshold](api_avm_outputs.nfttransferoutput.md#meetsthreshold)
* [select](api_avm_outputs.nfttransferoutput.md#select)
* [serialize](api_avm_outputs.nfttransferoutput.md#serialize)
* [setCodecID](api_avm_outputs.nfttransferoutput.md#setcodecid)
* [toBuffer](api_avm_outputs.nfttransferoutput.md#tobuffer)
* [toString](api_avm_outputs.nfttransferoutput.md#tostring)
* [comparator](api_avm_outputs.nfttransferoutput.md#static-comparator)

## Constructors

###  constructor

\+ **new NFTTransferOutput**(`groupID`: number, `payload`: Buffer, `addresses`: Buffer[], `locktime`: BN, `threshold`: number): *[NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)*

*Overrides [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[constructor](api_platformvm_outputs.secpowneroutput.md#constructor)*

*Defined in [src/apis/avm/outputs.ts:360](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L360)*

An [Output](../modules/src_common.md#output) class which contains an NFT on an assetID.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`groupID` | number | undefined | A number representing the amount in the output |
`payload` | Buffer | undefined | A [Buffer](https://github.com/feross/buffer) of max length 1024 |
`addresses` | Buffer[] | undefined | An array of [Buffer](https://github.com/feross/buffer)s representing addresses |
`locktime` | BN | undefined | A [BN](https://github.com/indutny/bn.js/) representing the locktime |
`threshold` | number | undefined | A number representing the the threshold number of signers required to sign the transaction   |

**Returns:** *[NFTTransferOutput](api_avm_outputs.nfttransferoutput.md)*

## Properties

### `Protected` _codecID

• **_codecID**: *number* = AVMConstants.LATESTCODEC

*Overrides [SigIdx](common_signature.sigidx.md).[_codecID](common_signature.sigidx.md#protected-_codecid)*

*Defined in [src/apis/avm/outputs.ts:274](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L274)*

___

### `Protected` _typeID

• **_typeID**: *number* = this._codecID === 0 ? AVMConstants.NFTXFEROUTPUTID : AVMConstants.NFTXFEROUTPUTID_CODECONE

*Overrides [NFTOutput](api_avm_outputs.nftoutput.md).[_typeID](api_avm_outputs.nftoutput.md#protected-_typeid)*

*Defined in [src/apis/avm/outputs.ts:275](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L275)*

___

### `Protected` _typeName

• **_typeName**: *string* = "NFTTransferOutput"

*Overrides [NFTOutput](api_avm_outputs.nftoutput.md).[_typeName](api_avm_outputs.nftoutput.md#protected-_typename)*

*Defined in [src/apis/avm/outputs.ts:273](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L273)*

___

### `Protected` addresses

• **addresses**: *[Address](common_output.address.md)[]* = []

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[addresses](api_platformvm_outputs.amountoutput.md#protected-addresses)*

*Defined in [src/common/output.ts:121](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L121)*

___

### `Protected` groupID

• **groupID**: *Buffer* = Buffer.alloc(4)

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[groupID](common_output.basenftoutput.md#protected-groupid)*

*Defined in [src/common/output.ts:511](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L511)*

___

### `Protected` locktime

• **locktime**: *Buffer* = Buffer.alloc(8)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[locktime](api_platformvm_outputs.amountoutput.md#protected-locktime)*

*Defined in [src/common/output.ts:118](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L118)*

___

### `Protected` numaddrs

• **numaddrs**: *Buffer* = Buffer.alloc(4)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[numaddrs](api_platformvm_outputs.amountoutput.md#protected-numaddrs)*

*Defined in [src/common/output.ts:120](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L120)*

___

### `Protected` payload

• **payload**: *Buffer*

*Defined in [src/apis/avm/outputs.ts:292](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L292)*

___

### `Protected` sizePayload

• **sizePayload**: *Buffer* = Buffer.alloc(4)

*Defined in [src/apis/avm/outputs.ts:291](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L291)*

___

### `Protected` threshold

• **threshold**: *Buffer* = Buffer.alloc(4)

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[threshold](api_platformvm_outputs.amountoutput.md#protected-threshold)*

*Defined in [src/common/output.ts:119](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L119)*

## Methods

###  clone

▸ **clone**(): *this*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[clone](api_platformvm_outputs.amountoutput.md#abstract-clone)*

*Defined in [src/apis/avm/outputs.ts:356](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L356)*

**Returns:** *this*

___

###  create

▸ **create**(...`args`: any[]): *this*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[create](api_platformvm_outputs.amountoutput.md#abstract-create)*

*Defined in [src/apis/avm/outputs.ts:352](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L352)*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  deserialize

▸ **deserialize**(`fields`: object, `encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *void*

*Overrides [BaseNFTOutput](common_output.basenftoutput.md).[deserialize](common_output.basenftoutput.md#deserialize)*

*Defined in [src/apis/avm/outputs.ts:284](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L284)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`fields` | object | - |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *void*

___

###  fromBuffer

▸ **fromBuffer**(`utxobuff`: Buffer, `offset`: number): *number*

*Overrides [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[fromBuffer](api_platformvm_outputs.secpowneroutput.md#frombuffer)*

*Defined in [src/apis/avm/outputs.ts:330](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L330)*

Popuates the instance from a [Buffer](https://github.com/feross/buffer) representing the [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md) and returns the size of the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`utxobuff` | Buffer | - |
`offset` | number | 0 |

**Returns:** *number*

___

###  getAddress

▸ **getAddress**(`idx`: number): *Buffer*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddress](api_platformvm_outputs.amountoutput.md#getaddress)*

*Defined in [src/common/output.ts:168](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L168)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddressIdx](api_platformvm_outputs.amountoutput.md#getaddressidx)*

*Defined in [src/common/output.ts:151](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L151)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getAddresses](api_platformvm_outputs.amountoutput.md#getaddresses)*

*Defined in [src/common/output.ts:136](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L136)*

Returns an array of [Buffer](https://github.com/feross/buffer)s for the addresses.

**Returns:** *Buffer[]*

___

###  getCodecID

▸ **getCodecID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getCodecID](common_signature.sigidx.md#getcodecid)*

*Defined in [src/utils/serialization.ts:59](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L59)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getGroupID

▸ **getGroupID**(): *number*

*Inherited from [BaseNFTOutput](common_output.basenftoutput.md).[getGroupID](common_output.basenftoutput.md#getgroupid)*

*Defined in [src/common/output.ts:516](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L516)*

Returns the groupID as a number.

**Returns:** *number*

___

###  getLocktime

▸ **getLocktime**(): *BN*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getLocktime](api_platformvm_outputs.amountoutput.md#getlocktime)*

*Defined in [src/common/output.ts:131](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L131)*

Returns the a [BN](https://github.com/indutny/bn.js/) repersenting the UNIX Timestamp when the lock is made available.

**Returns:** *BN*

___

###  getOutputID

▸ **getOutputID**(): *number*

*Overrides [AmountOutput](api_platformvm_outputs.amountoutput.md).[getOutputID](api_platformvm_outputs.amountoutput.md#abstract-getoutputid)*

*Defined in [src/apis/avm/outputs.ts:311](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L311)*

Returns the outputID for this output

**Returns:** *number*

___

###  getPayload

▸ **getPayload**(): *Buffer*

*Defined in [src/apis/avm/outputs.ts:318](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L318)*

Returns the payload as a [Buffer](https://github.com/feross/buffer) with content only.

**Returns:** *Buffer*

___

###  getPayloadBuffer

▸ **getPayloadBuffer**(): *Buffer*

*Defined in [src/apis/avm/outputs.ts:324](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L324)*

Returns the payload as a [Buffer](https://github.com/feross/buffer) with length of payload prepended.

**Returns:** *Buffer*

___

###  getSpenders

▸ **getSpenders**(`addresses`: Buffer[], `asOf`: BN): *Buffer[]*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getSpenders](api_platformvm_outputs.amountoutput.md#getspenders)*

*Defined in [src/common/output.ts:197](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L197)*

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

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[getThreshold](api_platformvm_outputs.amountoutput.md#getthreshold)*

*Defined in [src/common/output.ts:126](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L126)*

Returns the threshold of signers required to spend this output.

**Returns:** *number*

___

###  getTypeID

▸ **getTypeID**(): *number*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeID](common_signature.sigidx.md#gettypeid)*

*Defined in [src/utils/serialization.ts:52](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L52)*

Used in serialization. Optional. TypeID is a number for the typeID of object being output.

**Returns:** *number*

___

###  getTypeName

▸ **getTypeName**(): *string*

*Inherited from [SigIdx](common_signature.sigidx.md).[getTypeName](common_signature.sigidx.md#gettypename)*

*Defined in [src/utils/serialization.ts:45](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/utils/serialization.ts#L45)*

Used in serialization. TypeName is a string name for the type of object being output.

**Returns:** *string*

___

###  makeTransferable

▸ **makeTransferable**(`assetID`: Buffer): *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

*Inherited from [NFTOutput](api_avm_outputs.nftoutput.md).[makeTransferable](api_avm_outputs.nftoutput.md#maketransferable)*

*Overrides [Output](common_output.output.md).[makeTransferable](common_output.output.md#abstract-maketransferable)*

*Defined in [src/apis/avm/outputs.ts:87](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L87)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`assetID` | Buffer | An assetID which is wrapped around the Buffer of the Output  |

**Returns:** *[TransferableOutput](api_avm_outputs.transferableoutput.md)*

___

###  meetsThreshold

▸ **meetsThreshold**(`addresses`: Buffer[], `asOf`: BN): *boolean*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[meetsThreshold](api_platformvm_outputs.amountoutput.md#meetsthreshold)*

*Defined in [src/common/output.ts:178](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L178)*

Given an array of address [Buffer](https://github.com/feross/buffer)s and an optional timestamp, returns true if the addresses meet the threshold required to spend the output.

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`addresses` | Buffer[] | - |
`asOf` | BN | undefined |

**Returns:** *boolean*

___

###  select

▸ **select**(`id`: number, ...`args`: any[]): *[Output](common_output.output.md)*

*Inherited from [NFTOutput](api_avm_outputs.nftoutput.md).[select](api_avm_outputs.nftoutput.md#select)*

*Overrides [Output](common_output.output.md).[select](common_output.output.md#abstract-select)*

*Defined in [src/apis/avm/outputs.ts:91](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L91)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`...args` | any[] |

**Returns:** *[Output](common_output.output.md)*

___

###  serialize

▸ **serialize**(`encoding`: [SerializedEncoding](../modules/src_utils.md#serializedencoding)): *object*

*Overrides [BaseNFTOutput](common_output.basenftoutput.md).[serialize](common_output.basenftoutput.md#serialize)*

*Defined in [src/apis/avm/outputs.ts:277](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L277)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`encoding` | [SerializedEncoding](../modules/src_utils.md#serializedencoding) | "hex" |

**Returns:** *object*

___

###  setCodecID

▸ **setCodecID**(`codecID`: number): *void*

*Defined in [src/apis/avm/outputs.ts:299](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L299)*

Set the codecID

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`codecID` | number | The codecID to set  |

**Returns:** *void*

___

###  toBuffer

▸ **toBuffer**(): *Buffer*

*Overrides [SECPOwnerOutput](api_platformvm_outputs.secpowneroutput.md).[toBuffer](api_platformvm_outputs.secpowneroutput.md#tobuffer)*

*Defined in [src/apis/avm/outputs.ts:344](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/avm/outputs.ts#L344)*

Returns the buffer representing the [NFTTransferOutput](api_avm_outputs.nfttransferoutput.md) instance.

**Returns:** *Buffer*

___

###  toString

▸ **toString**(): *string*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[toString](api_platformvm_outputs.amountoutput.md#tostring)*

*Defined in [src/common/output.ts:262](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L262)*

Returns a base-58 string representing the [Output](../modules/src_common.md#output).

**Returns:** *string*

___

### `Static` comparator

▸ **comparator**(): *function*

*Inherited from [AmountOutput](api_platformvm_outputs.amountoutput.md).[comparator](api_platformvm_outputs.amountoutput.md#static-comparator)*

*Defined in [src/common/output.ts:266](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/output.ts#L266)*

**Returns:** *function*

▸ (`a`: [Output](common_output.output.md), `b`: [Output](common_output.output.md)): *1 | -1 | 0*

**Parameters:**

Name | Type |
------ | ------ |
`a` | [Output](common_output.output.md) |
`b` | [Output](common_output.output.md) |
