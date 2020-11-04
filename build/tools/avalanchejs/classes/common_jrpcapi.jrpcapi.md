[avalanche](../README.md) › [Common-JRPCAPI](../modules/common_jrpcapi.md) › [JRPCAPI](common_jrpcapi.jrpcapi.md)

# Class: JRPCAPI

## Hierarchy

* [APIBase](common_apibase.apibase.md)

  ↳ **JRPCAPI**

  ↳ [AdminAPI](api_admin.adminapi.md)

  ↳ [AuthAPI](api_auth.authapi.md)

  ↳ [AVMAPI](api_avm.avmapi.md)

  ↳ [HealthAPI](api_health.healthapi.md)

  ↳ [InfoAPI](api_info.infoapi.md)

  ↳ [KeystoreAPI](api_keystore.keystoreapi.md)

  ↳ [PlatformVMAPI](api_platformvm.platformvmapi.md)

## Index

### Constructors

* [constructor](common_jrpcapi.jrpcapi.md#constructor)

### Properties

* [baseurl](common_jrpcapi.jrpcapi.md#protected-baseurl)
* [core](common_jrpcapi.jrpcapi.md#protected-core)
* [db](common_jrpcapi.jrpcapi.md#protected-db)
* [jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)
* [rpcid](common_jrpcapi.jrpcapi.md#protected-rpcid)

### Methods

* [callMethod](common_jrpcapi.jrpcapi.md#callmethod)
* [getBaseURL](common_jrpcapi.jrpcapi.md#getbaseurl)
* [getDB](common_jrpcapi.jrpcapi.md#getdb)
* [getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)
* [setBaseURL](common_jrpcapi.jrpcapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new JRPCAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string, `jrpcVersion`: string): *[JRPCAPI](common_jrpcapi.jrpcapi.md)*

*Overrides [APIBase](common_apibase.apibase.md).[constructor](common_apibase.apibase.md#constructor)*

*Defined in [src/common/jrpcapi.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L66)*

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | Reference to the Avalanche instance using this endpoint |
`baseurl` | string | - | Path of the APIs baseurl - ex: "/ext/bc/avm" |
`jrpcVersion` | string | "2.0" | The jrpc version to use, default "2.0".  |

**Returns:** *[JRPCAPI](common_jrpcapi.jrpcapi.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:38](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L38)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:36](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L36)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:40](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L40)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Defined in [src/common/jrpcapi.ts:17](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L17)*

___

### `Protected` rpcid

• **rpcid**: *number* = 1

*Defined in [src/common/jrpcapi.ts:19](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L19)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: Array‹object› | object, `baseurl?`: string): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/common/jrpcapi.ts:21](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | Array‹object› &#124; object |
`baseurl?` | string |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:63](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L63)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:68](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L68)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  getRPCID

▸ **getRPCID**(): *number*

*Defined in [src/common/jrpcapi.ts:66](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/jrpcapi.ts#L66)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:47](https://github.com/ava-labs/avalanchejs/blob/87820e3/src/common/apibase.ts#L47)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/avm"  |

**Returns:** *void*
