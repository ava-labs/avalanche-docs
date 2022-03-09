[avalanche](../README.md) › [API-Info](../modules/api_info.md) › [InfoAPI](api_info.infoapi.md)

# Class: InfoAPI

Class for interacting with a node's InfoAPI.

**`remarks`** This extends the [JRPCAPI](common_jrpcapi.jrpcapi.md) class. This class should not be directly called. Instead, use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) function to register this interface with Avalanche.

## Hierarchy

  ↳ [JRPCAPI](common_jrpcapi.jrpcapi.md)

  ↳ **InfoAPI**

## Index

### Constructors

* [constructor](api_info.infoapi.md#constructor)

### Properties

* [baseURL](api_info.infoapi.md#protected-baseurl)
* [core](api_info.infoapi.md#protected-core)
* [db](api_info.infoapi.md#protected-db)
* [jrpcVersion](api_info.infoapi.md#protected-jrpcversion)
* [rpcID](api_info.infoapi.md#protected-rpcid)

### Methods

* [callMethod](api_info.infoapi.md#callmethod)
* [getBaseURL](api_info.infoapi.md#getbaseurl)
* [getBlockchainID](api_info.infoapi.md#getblockchainid)
* [getDB](api_info.infoapi.md#getdb)
* [getNetworkID](api_info.infoapi.md#getnetworkid)
* [getNetworkName](api_info.infoapi.md#getnetworkname)
* [getNodeID](api_info.infoapi.md#getnodeid)
* [getNodeIP](api_info.infoapi.md#getnodeip)
* [getNodeVersion](api_info.infoapi.md#getnodeversion)
* [getRPCID](api_info.infoapi.md#getrpcid)
* [getTxFee](api_info.infoapi.md#gettxfee)
* [isBootstrapped](api_info.infoapi.md#isbootstrapped)
* [peers](api_info.infoapi.md#peers)
* [setBaseURL](api_info.infoapi.md#setbaseurl)
* [uptime](api_info.infoapi.md#uptime)

## Constructors

###  constructor

\+ **new InfoAPI**(`core`: [AvalancheCore](avalanchecore.avalanchecore-1.md), `baseURL`: string): *[InfoAPI](api_info.infoapi.md)*

*Overrides [JRPCAPI](common_jrpcapi.jrpcapi.md).[constructor](common_jrpcapi.jrpcapi.md#constructor)*

*Defined in [src/apis/info/api.ts:162](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L162)*

This class should not be instantiated directly. Instead use the [Avalanche.addAPI](avalanche.avalanche-1.md#addapi) method.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`core` | [AvalancheCore](avalanchecore.avalanchecore-1.md) | - | A reference to the Avalanche class |
`baseURL` | string | "/ext/info" | Defaults to the string "/ext/info" as the path to rpc's baseURL  |

**Returns:** *[InfoAPI](api_info.infoapi.md)*

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

###  getBlockchainID

▸ **getBlockchainID**(`alias`: string): *Promise‹string›*

*Defined in [src/apis/info/api.ts:33](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L33)*

Fetches the blockchainID from the node for a given alias.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`alias` | string | The blockchain alias to get the blockchainID  |

**Returns:** *Promise‹string›*

Returns a Promise string containing the base 58 string representation of the blockchainID.

___

###  getDB

▸ **getDB**(): *StoreAPI*

*Inherited from [APIBase](common_apibase.apibase.md).[getDB](common_apibase.apibase.md#getdb)*

*Defined in [src/common/apibase.ts:58](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/apibase.ts#L58)*

Returns the baseURL's database.

**Returns:** *StoreAPI*

___

###  getNetworkID

▸ **getNetworkID**(): *Promise‹number›*

*Defined in [src/apis/info/api.ts:62](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L62)*

Fetches the networkID from the node.

**Returns:** *Promise‹number›*

Returns a Promise number of the networkID.

___

###  getNetworkName

▸ **getNetworkName**(): *Promise‹string›*

*Defined in [src/apis/info/api.ts:74](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L74)*

Fetches the network name this node is running on

**Returns:** *Promise‹string›*

Returns a Promise string containing the network name.

___

###  getNodeID

▸ **getNodeID**(): *Promise‹string›*

*Defined in [src/apis/info/api.ts:86](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L86)*

Fetches the nodeID from the node.

**Returns:** *Promise‹string›*

Returns a Promise string of the nodeID.

___

###  getNodeIP

▸ **getNodeIP**(): *Promise‹string›*

*Defined in [src/apis/info/api.ts:50](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L50)*

Fetches the IP address from the node.

**Returns:** *Promise‹string›*

Returns a Promise string of the node IP address.

___

###  getNodeVersion

▸ **getNodeVersion**(): *Promise‹string›*

*Defined in [src/apis/info/api.ts:98](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L98)*

Fetches the version of Gecko this node is running

**Returns:** *Promise‹string›*

Returns a Promise string containing the version of Gecko.

___

###  getRPCID

▸ **getRPCID**(): *number*

*Inherited from [JRPCAPI](common_jrpcapi.jrpcapi.md).[getRPCID](common_jrpcapi.jrpcapi.md#getrpcid)*

*Defined in [src/common/jrpcapi.ts:78](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/common/jrpcapi.ts#L78)*

Returns the rpcid, a strictly-increasing number, starting from 1, indicating the next
request ID that will be sent.

**Returns:** *number*

___

###  getTxFee

▸ **getTxFee**(): *Promise‹[GetTxFeeResponse](../interfaces/info_interfaces.gettxfeeresponse.md)›*

*Defined in [src/apis/info/api.ts:110](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L110)*

Fetches the transaction fee from the node.

**Returns:** *Promise‹[GetTxFeeResponse](../interfaces/info_interfaces.gettxfeeresponse.md)›*

Returns a Promise object of the transaction fee in nAVAX.

___

###  isBootstrapped

▸ **isBootstrapped**(`chain`: string): *Promise‹boolean›*

*Defined in [src/apis/info/api.ts:124](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L124)*

Check whether a given chain is done bootstrapping

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`chain` | string | The ID or alias of a chain.  |

**Returns:** *Promise‹boolean›*

Returns a Promise boolean of whether the chain has completed bootstrapping.

___

###  peers

▸ **peers**(`nodeIDs`: string[]): *Promise‹[PeersResponse](../interfaces/info_interfaces.peersresponse.md)[]›*

*Defined in [src/apis/info/api.ts:143](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L143)*

Returns the peers connected to the node.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`nodeIDs` | string[] | [] | an optional parameter to specify what nodeID's descriptions should be returned. If this parameter is left empty, descriptions for all active connections will be returned. If the node is not connected to a specified nodeID, it will be omitted from the response.  |

**Returns:** *Promise‹[PeersResponse](../interfaces/info_interfaces.peersresponse.md)[]›*

Promise for the list of connected peers in PeersResponse format.

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

###  uptime

▸ **uptime**(): *Promise‹[UptimeResponse](../interfaces/info_interfaces.uptimeresponse.md)›*

*Defined in [src/apis/info/api.ts:159](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/info/api.ts#L159)*

Returns the network's observed uptime of this node.

**Returns:** *Promise‹[UptimeResponse](../interfaces/info_interfaces.uptimeresponse.md)›*

Returns a Promise UptimeResponse which contains rewardingStakePercentage and weightedAveragePercentage.
