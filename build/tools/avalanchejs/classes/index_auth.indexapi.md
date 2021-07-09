[avalanche](../README.md) › [Index-Auth](../modules/index_auth.md) › [IndexAPI](index_auth.indexapi.md)

# Class: IndexAPI

Class for interacting with a node's IndexAPI.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **IndexAPI**

## Index

### Constructors

* [constructor](index_auth.indexapi.md#constructor)

### Properties

* [baseurl](index_auth.indexapi.md#protected-baseurl)
* [core](index_auth.indexapi.md#protected-core)
* [db](index_auth.indexapi.md#protected-db)
* [jrpcVersion](index_auth.indexapi.md#protected-jrpcversion)
* [rpcid](index_auth.indexapi.md#protected-rpcid)

### Methods

* [callMethod](index_auth.indexapi.md#callmethod)
* [getBaseURL](index_auth.indexapi.md#getbaseurl)
* [getContainerByID](index_auth.indexapi.md#getcontainerbyid)
* [getContainerByIndex](index_auth.indexapi.md#getcontainerbyindex)
* [getContainerRange](index_auth.indexapi.md#getcontainerrange)
* [getDB](index_auth.indexapi.md#getdb)
* [getIndex](index_auth.indexapi.md#getindex)
* [getLastAccepted](index_auth.indexapi.md#getlastaccepted)
* [getRPCID](index_auth.indexapi.md#getrpcid)
* [isAccepted](index_auth.indexapi.md#isaccepted)
* [setBaseURL](index_auth.indexapi.md#setbaseurl)

## Constructors

###  constructor

\+ **new IndexAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseurl`: string): *[IndexAPI](index_auth.indexapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/index/api.ts:171](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L171)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - |
`baseurl` | string | "/ext/index/X/tx" |

**Returns:** *[IndexAPI](index_auth.indexapi.md)*

## Properties

### `Protected` baseurl

• **baseurl**: *string*

*Inherited from [APIBase](common_apibase.apibase.md).[baseurl](common_apibase.apibase.md#protected-baseurl)*

*Defined in [src/common/apibase.ts:28](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L28)*

___

### `Protected` core

• **core**: *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Inherited from [APIBase](common_apibase.apibase.md).[core](common_apibase.apibase.md#protected-core)*

*Defined in [src/common/apibase.ts:26](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L26)*

___

### `Protected` db

• **db**: *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[db](common_apibase.apibase.md#protected-db)*

*Defined in [src/common/apibase.ts:30](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L30)*

___

### `Protected` jrpcVersion

• **jrpcVersion**: *string* = "2.0"

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[jrpcVersion](common_jrpcapi.jrpcapi.md#protected-jrpcversion)*

*Defined in [src/common/jrpcapi.ts:11](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/jrpcapi.ts#L11)*

___

### `Protected` rpcid

• **rpcid**: *number* = 1

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[rpcid](common_jrpcapi.jrpcapi.md#protected-rpcid)*

*Defined in [src/common/jrpcapi.ts:12](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/jrpcapi.ts#L12)*

## Methods

###  callMethod

▸ **callMethod**(`method`: string, `params?`: object[] | object, `baseurl?`: string, `headers?`: object): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[callMethod](common_jrpcapi.jrpcapi.md#callmethod)*

*Defined in [src/common/jrpcapi.ts:14](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/jrpcapi.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`method` | string |
`params?` | object[] &#124; object |
`baseurl?` | string |
`headers?` | object |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

___

###  getBaseURL

▸ **getBaseURL**(): *string*

*Inherited from [APIBase](common_apibase.apibase.md).[getBaseURL](common_apibase.apibase.md#getbaseurl)*

*Defined in [src/common/apibase.ts:53](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L53)*

Returns the baseurl's path.

**Returns:** *string*

___

###  getContainerByID

▸ **getContainerByID**(`containerID`: string, `encoding`: string, `baseurl`: string): *Promise‹[GetContainerByIDResponse](../interfaces/common_interfaces.getcontainerbyidresponse.md)›*

*Defined in [src/apis/index/api.ts:84](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L84)*

Get contrainer by ID

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "0" | - |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerByIDResponse](../interfaces/common_interfaces.getcontainerbyidresponse.md)›*

Returns a Promise<GetContainerByIDResponse>.

___

###  getContainerByIndex

▸ **getContainerByIndex**(`index`: string, `encoding`: string, `baseurl`: string): *Promise‹[GetContainerByIndexResponse](../interfaces/common_interfaces.getcontainerbyindexresponse.md)›*

*Defined in [src/apis/index/api.ts:60](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L60)*

Get container by index

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`index` | string | "0" | - |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerByIndexResponse](../interfaces/common_interfaces.getcontainerbyindexresponse.md)›*

Returns a Promise<GetContainerByIndexResponse>.

___

###  getContainerRange

▸ **getContainerRange**(`startIndex`: number, `numToFetch`: number, `encoding`: string, `baseurl`: string): *Promise‹[GetContainerRangeResponse](../interfaces/common_interfaces.getcontainerrangeresponse.md)[]›*

*Defined in [src/apis/index/api.ts:109](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L109)*

Get container range

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`startIndex` | number | 0 | - |
`numToFetch` | number | 100 | - |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetContainerRangeResponse](../interfaces/common_interfaces.getcontainerrangeresponse.md)[]›*

Returns a Promise<GetContainerRangeResponse>.

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L58)*

Returns the baseurl's database.

**Returns:** *StoreAPI*

___

###  getIndex

▸ **getIndex**(`containerID`: string, `encoding`: string, `baseurl`: string): *Promise‹string›*

*Defined in [src/apis/index/api.ts:134](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L134)*

Get index by containerID

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "" | - |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹string›*

Returns a Promise<GetIndexResponse>.

___

###  getLastAccepted

▸ **getLastAccepted**(`encoding`: string, `baseurl`: string): *Promise‹[GetLastAcceptedResponse](../interfaces/common_interfaces.getlastacceptedresponse.md)›*

*Defined in [src/apis/index/api.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L37)*

Get last accepted tx, vtx or block

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹[GetLastAcceptedResponse](../interfaces/common_interfaces.getlastacceptedresponse.md)›*

Returns a Promise<GetLastAcceptedResponse>.

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:69](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/jrpcapi.ts#L69)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  isAccepted

▸ **isAccepted**(`containerID`: string, `encoding`: string, `baseurl`: string): *Promise‹boolean›*

*Defined in [src/apis/index/api.ts:158](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/apis/index/api.ts#L158)*

Check if container is accepted

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`containerID` | string | "" | - |
`encoding` | string | "cb58" | - |
`baseurl` | string | this.getBaseURL() |   |

**Returns:** *Promise‹boolean›*

Returns a Promise<GetIsAcceptedResponse>.

___

###  setBaseURL

▸ **setBaseURL**(`baseurl`: string): *void*

*Inherited from [APIBase](common_apibase.apibase.md).[setBaseURL](common_apibase.apibase.md#setbaseurl)*

*Defined in [src/common/apibase.ts:37](https://github.com/ava-labs/avalanchejs/blob/ae78dee/src/common/apibase.ts#L37)*

Sets the path of the APIs baseurl.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`baseurl` | string | Path of the APIs baseurl - ex: "/ext/bc/X"  |

**Returns:** *void*
