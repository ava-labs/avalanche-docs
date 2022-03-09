[avalanche](../README.md) › [Common-JRPCAPI](../modules/common_jrpcapi.md) › [JRPCAPI](common_jrpcapi.jrpcapi.md)

# Class: JRPCAPI

## Hierarchy

* [APIBase](common_apibase.apibase.md)

  ↳ **JRPCAPI**

  ↳ [EVMAPI](api_evm.evmapi.md)

  ↳ [AdminAPI](api_admin.adminapi.md)

  ↳ [AuthAPI](api_auth.authapi.md)

  ↳ [AVMAPI](api_avm.avmapi.md)

  ↳ [HealthAPI](api_health.healthapi.md)

  ↳ [IndexAPI](api_index.indexapi.md)

  ↳ [InfoAPI](api_info.infoapi.md)

  ↳ [KeystoreAPI](api_keystore.keystoreapi.md)

  ↳ [PlatformVMAPI](api_platformvm.platformvmapi.md)

## Index

### Constructors

* [constructor](common_jrpcapi.jrpcapi.md#constructor)

### Properties

* [baseURL](common_jrpcapi.jrpcapi.md#protected-baseurl)
* [core](common_jrpcapi.jrpcapi.md#protected-core)
* [db](common_jrpcapi.jrpcapi.md#protected-db)
* [jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)
* [rpcID](common_jrpcapi.jrpcapi.md#protected-rpcid)

### Methods

* [callMethod](common_jrpcapi.jrpcapi.md#callmethod)
* [getBaseURL](common_jrpcapi.jrpcapi.md#getbaseurl)
* [getDB](common_jrpcapi.jrpcapi.md#getdb)
* [getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)
* [setBaseURL](common_jrpcapi.jrpcapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new JRPCAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string, `jrpcVersion`: string): *[JRPCAPI](common_jrpcapi.jrpcapi.md)*

*Overrides [APIBase](common_apibase.apibase.md).[constructor](common_apibase.apibase.md#constructor)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | Reference to the Avalanche instance using this endpoint |
`baseURL` | string | - | Path of the APIs baseURL - ex: "/ext/bc/avm" |
`jrpcVersion` | string | "2.0" | The jrpc version to use, default "2.0".  |

**Returns:** *[JRPCAPI](common_jrpcapi.jrpcapi.md)*

## Properties

### `Protected` baseURL

• **baseURL**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseURL](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:29](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L29)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L28)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L30)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L11)*

___

### `Protected` rpcID

• **rpcID**: *number* = 1

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L12)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/jrpcapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseURL?` | string |
`headers?` | object |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L53)*

Returns the baseURL's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getRPCID

▸ **getRPCID**(): *number*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  setBaseURL

▸ **setBaseURL**(`baseURL`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L37)*

Sets the path of the APIs baseURL.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseURL` | string | Path of the APIs baseURL - ex: "/ext/bc/X"  |

**Returns:** *void*
