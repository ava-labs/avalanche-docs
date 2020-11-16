[avalanche](../README.md) › [API-EVM](../modules/api_evm.md) › [EVMAPI](api_evm.evmapi.md)

# Class: EVMAPI

Class for interacting with a node's EVMAPI

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **EVMAPI**

## Index

### Constructors

* [constructor](api_evm.evmapi.md#constructor)

### Properties

* [baseurl](api_evm.evmapi.md#protected-baseurl)
* [blockchainID](api_evm.evmapi.md#protected-blockchainid)
* [core](api_evm.evmapi.md#protected-core)
* [db](api_evm.evmapi.md#protected-db)
* [jrpcVersion](api_evm.evmapi.md#protected-jrpcversion)
* [rpcid](api_evm.evmapi.md#protected-rpcid)

### Methods

* [callMethod](api_evm.evmapi.md#callmethod)
* [export](api_evm.evmapi.md#export)
* [exportAVAX](api_evm.evmapi.md#exportavax)
* [exportKey](api_evm.evmapi.md#exportkey)
* [getBaseURL](api_evm.evmapi.md#getbaseurl)
* [getDB](api_evm.evmapi.md#getdb)
* [getRPCID](api_evm.evmapi.md#getrpcid)
* [import](api_evm.evmapi.md#import)
* [importAVAX](api_evm.evmapi.md#importavax)
* [importKey](api_evm.evmapi.md#importkey)
* [setBaseURL](api_evm.evmapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new EVMAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string, `blockchainID`: string): *[EVMAPI](api_evm.evmapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/evm/api.ts:160](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L160)*

This class should not be instantiated directly.
Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseurl` | string | "/ext/bc/C/avax" | Defaults to the string "/ext/bc/C/avax" as the path to blockchain's baseurl |
`blockchainID` | string | "" | The Blockchain's ID. Defaults to an empty string: ''  |

**Returns:** *[EVMAPI](api_evm.evmapi.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:38](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L38)*

___

### `Protected` blockchainID

• **blockchainID**: *string* = ""

*Defined in [src/apis/evm/api.ts:25](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L25)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:36](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L36)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:40](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L40)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:17](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/jrpcapi.ts#L17)*

___

### `Protected` rpcid

• **rpcid**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcid](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:19](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/jrpcapi.ts#L19)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: Array‹object› | object, `baseurl?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:21](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/jrpcapi.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | Array‹object› &#124; object |
`baseurl?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  export

▸ **export**(`username`: string, `password`: string, `to`: string, `amount`: BN, `assetID`: string): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:40](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L40)*

Send ANT (Avalanche Native Token) assets including AVAX from the C-Chain to an account on the X-Chain.

After calling this method, you must call the X-Chain’s import method to complete the transfer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the X-Chain account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The account on the X-Chain to send the AVAX to. |
`amount` | BN | Amount of asset to export as a [BN](https://github.com/indutny/bn.js/) |
`assetID` | string | The asset id which is being sent  |

**Returns:** *Promise‹string›*

String representing the transaction id

___

###  exportAVAX

▸ **exportAVAX**(`username`: string, `password`: string, `to`: string, `amount`: BN): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:63](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L63)*

Send AVAX from the C-Chain to an account on the X-Chain.

After calling this method, you must call the X-Chain’s importAVAX method to complete the transfer.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the X-Chain account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The account on the X-Chain to send the AVAX to. |
`amount` | BN | Amount of AVAX to export as a [BN](https://github.com/indutny/bn.js/)  |

**Returns:** *Promise‹string›*

String representing the transaction id

___

###  exportKey

▸ **exportKey**(`username`: string, `password`: string, `address`: string): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:152](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L152)*

Exports the private key for an address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user with the private key |
`password` | string | The password used to decrypt the private key |
`address` | string | The address whose private key should be exported  |

**Returns:** *Promise‹string›*

Promise with the decrypted private key as store in the database

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:63](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L63)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L68)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:66](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/jrpcapi.ts#L66)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  import

▸ **import**(`username`: string, `password`: string, `to`: string, `sourceChain`: string): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:86](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L86)*

Send ANT (Avalanche Native Token) assets including AVAX from an account on the X-Chain to an address on the C-Chain. This transaction
must be signed with the key of the account that the asset is sent from and which pays
the transaction fee.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The address of the account the asset is sent to. |
`sourceChain` | string | The chainID where the funds are coming from. Ex: "X"  |

**Returns:** *Promise‹string›*

Promise for a string for the transaction, which should be sent to the network
by calling issueTx.

___

###  importAVAX

▸ **importAVAX**(`username`: string, `password`: string, `to`: string, `sourceChain`: string): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:112](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L112)*

Send AVAX from an account on the X-Chain to an address on the C-Chain. This transaction
must be signed with the key of the account that the AVAX is sent from and which pays
the transaction fee.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The Keystore user that controls the account specified in `to` |
`password` | string | The password of the Keystore user |
`to` | string | The address of the account the AVAX is sent to. This must be the same as the to argument in the corresponding call to the X-Chain’s exportAVAX |
`sourceChain` | string | The chainID where the funds are coming from.  |

**Returns:** *Promise‹string›*

Promise for a string for the transaction, which should be sent to the network
by calling issueTx.

___

###  importKey

▸ **importKey**(`username`: string, `password`: string, `privateKey`: string): *Promise‹string›*

*Defined in [src/apis/evm/api.ts:133](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/apis/evm/api.ts#L133)*

Give a user control over an address by providing the private key that controls the address.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`username` | string | The name of the user to store the private key |
`password` | string | The password that unlocks the user |
`privateKey` | string | A string representing the private key in the vm's format  |

**Returns:** *Promise‹string›*

The address for the imported private key.

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:47](https://github.com/ava-labs/avalanchejs/blob/2850ce5/src/common/apibase.ts#L47)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/X"  |

**Returns:** *void*
