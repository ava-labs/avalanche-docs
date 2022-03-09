[avalanche](../README.md) › [API-Admin](../modules/api_admin.md) › [AdminAPI](api_admin.adminapi.md)

# Class: AdminAPI

Class for interacting with a node's AdminAPI.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called.
Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **AdminAPI**

## Index

### Constructors

* [constructor](api_admin.adminapi.md#constructor)

### Properties

* [baseURL](api_admin.adminapi.md#protected-baseurl)
* [core](api_admin.adminapi.md#protected-core)
* [db](api_admin.adminapi.md#protected-db)
* [jrpcVersion](api_admin.adminapi.md#protected-jrpcversion)
* [rpcID](api_admin.adminapi.md#protected-rpcid)

### Methods

* [alias](api_admin.adminapi.md#alias)
* [aliasChain](api_admin.adminapi.md#aliaschain)
* [callMethod](api_admin.adminapi.md#callmethod)
* [getBaseURL](api_admin.adminapi.md#getbaseurl)
* [getChainAliases](api_admin.adminapi.md#getchainaliases)
* [getDB](api_admin.adminapi.md#getdb)
* [getLoggerLevel](api_admin.adminapi.md#getloggerlevel)
* [getRPCID](api_admin.adminapi.md#getrpcid)
* [loadVMs](api_admin.adminapi.md#loadvms)
* [lockProfile](api_admin.adminapi.md#lockprofile)
* [memoryProfile](api_admin.adminapi.md#memoryprofile)
* [setBaseURL](api_admin.adminapi.md#setbaseurl)
* [setLoggerLevel](api_admin.adminapi.md#setloggerlevel)
* [startCPUProfiler](api_admin.adminapi.md#startcpuprofiler)
* [stopCPUProfiler](api_admin.adminapi.md#stopcpuprofiler)

## Constructors

###  constructor

\+ **new AdminAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[AdminAPI](api_admin.adminapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/admin/api.ts:215](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L215)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi)
method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/admin" | Defaults to the string "/ext/admin" as the path to rpc's baseURL  |

**Returns:** *[AdminAPI](api_admin.adminapi.md)*

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

###  alias

▸ **alias**(`endpoint`: string, `alias`: string): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:39](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L39)*

Assign an API an alias, a different endpoint for the API. The original endpoint will still
work. This change only affects this node other nodes will not know about this alias.

The API being aliased can now be called at ext/alias

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`endpoint` | string | The original endpoint of the API. endpoint should only include the part of the endpoint after /ext/ |
`alias` | string | - |

**Returns:** *Promise‹boolean›*

Returns a Promise boolean containing success, true for success, false for failure.

___

###  aliasChain

▸ **aliasChain**(`chain`: string, `alias`: string): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:62](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L62)*

Give a blockchain an alias, a different name that can be used any place the blockchain’s
ID is used.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chain` | string | The blockchain’s ID |
`alias` | string | Can now be used in place of the blockchain’s ID (in API endpoints, for example)  |

**Returns:** *Promise‹boolean›*

Returns a Promise boolean containing success, true for success, false for failure.

___

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

###  getChainAliases

▸ **getChainAliases**(`chain`: string): *Promise‹string[]›*

*Defined in [src/apis/admin/api.ts:83](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L83)*

Get all aliases for given blockchain

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chain` | string | The blockchain’s ID  |

**Returns:** *Promise‹string[]›*

Returns a Promise string[] containing aliases of the blockchain.

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getLoggerLevel

▸ **getLoggerLevel**(`loggerName?`: string): *Promise‹[GetLoggerLevelResponse](../interfaces/admin_interfaces.getloggerlevelresponse.md)›*

*Defined in [src/apis/admin/api.ts:103](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L103)*

Returns log and display levels of loggers

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`loggerName?` | string | the name of the logger to be returned. This is an optional argument. If not specified, it returns all possible loggers.  |

**Returns:** *Promise‹[GetLoggerLevelResponse](../interfaces/admin_interfaces.getloggerlevelresponse.md)›*

Returns a Promise containing logger levels

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  loadVMs

▸ **loadVMs**(): *Promise‹[LoadVMsResponse](../interfaces/admin_interfaces.loadvmsresponse.md)›*

*Defined in [src/apis/admin/api.ts:122](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L122)*

Dynamically loads any virtual machines installed on the node as plugins

**Returns:** *Promise‹[LoadVMsResponse](../interfaces/admin_interfaces.loadvmsresponse.md)›*

Returns a Promise containing new VMs and failed VMs

___

###  lockProfile

▸ **lockProfile**(): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:134](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L134)*

Dump the mutex statistics of the node to the specified file.

**Returns:** *Promise‹boolean›*

Promise for a boolean that is true on success.

___

###  memoryProfile

▸ **memoryProfile**(): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:148](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L148)*

Dump the current memory footprint of the node to the specified file.

**Returns:** *Promise‹boolean›*

Promise for a boolean that is true on success.

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

___

###  setLoggerLevel

▸ **setLoggerLevel**(`loggerName?`: string, `logLevel?`: string, `displayLevel?`: string): *Promise‹[SetLoggerLevelResponse](../interfaces/admin_interfaces.setloggerlevelresponse.md)›*

*Defined in [src/apis/admin/api.ts:166](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L166)*

Sets log and display levels of loggers.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`loggerName?` | string | the name of the logger to be changed. This is an optional parameter. |
`logLevel?` | string | the log level of written logs, can be omitted. |
`displayLevel?` | string | the log level of displayed logs, can be omitted.  |

**Returns:** *Promise‹[SetLoggerLevelResponse](../interfaces/admin_interfaces.setloggerlevelresponse.md)›*

Returns a Promise containing logger levels

___

###  startCPUProfiler

▸ **startCPUProfiler**(): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:194](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L194)*

Start profiling the cpu utilization of the node. Will dump the profile information into
the specified file on stop.

**Returns:** *Promise‹boolean›*

Promise for a boolean that is true on success.

___

###  stopCPUProfiler

▸ **stopCPUProfiler**(): *Promise‹boolean›*

*Defined in [src/apis/admin/api.ts:208](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/admin/api.ts#L208)*

Stop the CPU profile that was previously started.

**Returns:** *Promise‹boolean›*

Promise for a boolean that is true on success.
