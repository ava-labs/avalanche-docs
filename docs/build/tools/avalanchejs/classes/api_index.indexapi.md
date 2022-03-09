[avalanche](../README.md) › [API-Index](../modules/api_index.md) › [IndexAPI](api_index.indexapi.md)

# Class: IndexAPI

Class for interacting with a node's IndexAPI.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **IndexAPI**

## Index

### Constructors

* [constructor](api_index.indexapi.md#constructor)

### Properties

* [baseURL](api_index.indexapi.md#protected-baseurl)
* [core](api_index.indexapi.md#protected-core)
* [db](api_index.indexapi.md#protected-db)
* [jrpcVersion](api_index.indexapi.md#protected-jrpcversion)
* [rpcID](api_index.indexapi.md#protected-rpcid)

### Methods

* [callMethod](api_index.indexapi.md#callmethod)
* [getBaseURL](api_index.indexapi.md#getbaseurl)
* [getContainerByID](api_index.indexapi.md#getcontainerbyid)
* [getContainerByIndex](api_index.indexapi.md#getcontainerbyindex)
* [getContainerRange](api_index.indexapi.md#getcontainerrange)
* [getDB](api_index.indexapi.md#getdb)
* [getIndex](api_index.indexapi.md#getindex)
* [getLastAccepted](api_index.indexapi.md#getlastaccepted)
* [getRPCID](api_index.indexapi.md#getrpcid)
* [isAccepted](api_index.indexapi.md#isaccepted)
* [setBaseURL](api_index.indexapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new IndexAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[IndexAPI](api_index.indexapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/index/api.ts:213](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L213)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/index/X/tx" | Defaults to the string "/ext/index/X/tx" as the path to rpc's baseURL  |

**Returns:** *[IndexAPI](api_index.indexapi.md)*

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

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L11)*

___

### `Protected` rpcID

• **rpcID**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcID](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L12)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseURL?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

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

###  getContainerByID

▸ **getContainerByID**(`containerID`: string, `encoding`: string, `baseURL`: string): *Promise‹[GetContainerByIDResponse](../interfaces/index_interfaces.getcontainerbyidresponse.md)›*

*Defined in [src/apis/index/api.ts:97](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L97)*

Get contrainer by ID

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "0" | - |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerByIDResponse](../interfaces/index_interfaces.getcontainerbyidresponse.md)›*

Returns a Promise GetContainerByIDResponse.

___

###  getContainerByIndex

▸ **getContainerByIndex**(`index`: string, `encoding`: string, `baseURL`: string): *Promise‹[GetContainerByIndexResponse](../interfaces/index_interfaces.getcontainerbyindexresponse.md)›*

*Defined in [src/apis/index/api.ts:66](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L66)*

Get container by index

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`index` | string | "0" | - |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerByIndexResponse](../interfaces/index_interfaces.getcontainerbyindexresponse.md)›*

Returns a Promise GetContainerByIndexResponse.

___

###  getContainerRange

▸ **getContainerRange**(`startIndex`: number, `numToFetch`: number, `encoding`: string, `baseURL`: string): *Promise‹[GetContainerRangeResponse](../interfaces/index_interfaces.getcontainerrangeresponse.md)[]›*

*Defined in [src/apis/index/api.ts:129](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L129)*

Get container range

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`startIndex` | number | 0 | - |
`numToFetch` | number | 100 | - |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerRangeResponse](../interfaces/index_interfaces.getcontainerrangeresponse.md)[]›*

Returns a Promise GetContainerRangeResponse.

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getIndex

▸ **getIndex**(`containerID`: string, `encoding`: string, `baseURL`: string): *Promise‹string›*

*Defined in [src/apis/index/api.ts:162](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L162)*

Get index by containerID

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "" | - |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹string›*

Returns a Promise GetIndexResponse.

___

###  getLastAccepted

▸ **getLastAccepted**(`encoding`: string, `baseURL`: string): *Promise‹[GetLastAcceptedResponse](../interfaces/index_interfaces.getlastacceptedresponse.md)›*

*Defined in [src/apis/index/api.ts:37](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L37)*

Get last accepted tx, vtx or block

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetLastAcceptedResponse](../interfaces/index_interfaces.getlastacceptedresponse.md)›*

Returns a Promise GetLastAcceptedResponse.

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  isAccepted

▸ **isAccepted**(`containerID`: string, `encoding`: string, `baseURL`: string): *Promise‹boolean›*

*Defined in [src/apis/index/api.ts:193](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/index/api.ts#L193)*

Check if container is accepted

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "" | - |
`encoding` | string | "hex" | - |
`baseURL` | string | this.getBaseURL() |   |

**Returns:** *Promise‹boolean›*

Returns a Promise GetIsAcceptedResponse.

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
