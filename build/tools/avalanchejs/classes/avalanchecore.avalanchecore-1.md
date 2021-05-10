[avalanche](../README.md) › [AvalancheCore](../modules/avalanchecore.md) › [AvalancheCore](avalanchecore.avalanchecore-1.md)

# Class: AvalancheCore

AvalancheCore is middleware for interacting with Avalanche node RPC APIs.

Example usage:
```js
let avalanche = new AvalancheCore("127.0.0.1", 9650, "https");
```

## Hierarchy

* **AvalancheCore**

  ↳ [Avalanche](avalanche.avalanche-1.md)

## Index

### Constructors

* [constructor](avalanchecore.avalanchecore-1.md#constructor)

### Properties

* [apis](avalanchecore.avalanchecore-1.md#protected-apis)
* [auth](avalanchecore.avalanchecore-1.md#protected-auth)
* [headers](avalanchecore.avalanchecore-1.md#protected-headers)
* [hrp](avalanchecore.avalanchecore-1.md#protected-hrp)
* [ip](avalanchecore.avalanchecore-1.md#protected-ip)
* [networkID](avalanchecore.avalanchecore-1.md#protected-networkid)
* [port](avalanchecore.avalanchecore-1.md#protected-port)
* [protocol](avalanchecore.avalanchecore-1.md#protected-protocol)
* [requestConfig](avalanchecore.avalanchecore-1.md#protected-requestconfig)
* [url](avalanchecore.avalanchecore-1.md#protected-url)

### Methods

* [_setHeaders](avalanchecore.avalanchecore-1.md#protected-_setheaders)
* [addAPI](avalanchecore.avalanchecore-1.md#addapi)
* [api](avalanchecore.avalanchecore-1.md#api)
* [delete](avalanchecore.avalanchecore-1.md#delete)
* [get](avalanchecore.avalanchecore-1.md#get)
* [getHRP](avalanchecore.avalanchecore-1.md#gethrp)
* [getHeaders](avalanchecore.avalanchecore-1.md#getheaders)
* [getIP](avalanchecore.avalanchecore-1.md#getip)
* [getNetworkID](avalanchecore.avalanchecore-1.md#getnetworkid)
* [getPort](avalanchecore.avalanchecore-1.md#getport)
* [getProtocol](avalanchecore.avalanchecore-1.md#getprotocol)
* [getRequestConfig](avalanchecore.avalanchecore-1.md#getrequestconfig)
* [getURL](avalanchecore.avalanchecore-1.md#geturl)
* [patch](avalanchecore.avalanchecore-1.md#patch)
* [post](avalanchecore.avalanchecore-1.md#post)
* [put](avalanchecore.avalanchecore-1.md#put)
* [removeAllHeaders](avalanchecore.avalanchecore-1.md#removeallheaders)
* [removeAllRequestConfigs](avalanchecore.avalanchecore-1.md#removeallrequestconfigs)
* [removeHeader](avalanchecore.avalanchecore-1.md#removeheader)
* [removeRequestConfig](avalanchecore.avalanchecore-1.md#removerequestconfig)
* [setAddress](avalanchecore.avalanchecore-1.md#setaddress)
* [setAuthToken](avalanchecore.avalanchecore-1.md#setauthtoken)
* [setHRP](avalanchecore.avalanchecore-1.md#sethrp)
* [setHeader](avalanchecore.avalanchecore-1.md#setheader)
* [setNetworkID](avalanchecore.avalanchecore-1.md#setnetworkid)
* [setRequestConfig](avalanchecore.avalanchecore-1.md#setrequestconfig)

## Constructors

###  constructor

\+ **new AvalancheCore**(`ip`: string, `port`: number, `protocol`: string): *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

*Defined in [src/avalanche.ts:394](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L394)*

Creates a new Avalanche instance. Sets the address and port of the main Avalanche Client.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ip` | string | - | The hostname to resolve to reach the Avalanche Client APIs |
`port` | number | - | The port to resolve to reach the Avalanche Client APIs |
`protocol` | string | "http" | The protocol string to use before a "://" in a request, ex: "http", "https", "git", "ws", etc ...  |

**Returns:** *[AvalancheCore](avalanchecore.avalanchecore-1.md)*

## Properties

### `Protected` apis

• **apis**: *object*

*Defined in [src/avalanche.ts:37](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L37)*

#### Type declaration:

* \[ **k**: *string*\]: [APIBase](common_apibase.apibase.md)

___

### `Protected` auth

• **auth**: *string* = undefined

*Defined in [src/avalanche.ts:31](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L31)*

___

### `Protected` headers

• **headers**: *object*

*Defined in [src/avalanche.ts:33](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L33)*

#### Type declaration:

* \[ **k**: *string*\]: string

___

### `Protected` hrp

• **hrp**: *string* = ""

*Defined in [src/avalanche.ts:21](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L21)*

___

### `Protected` ip

• **ip**: *string*

*Defined in [src/avalanche.ts:25](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L25)*

___

### `Protected` networkID

• **networkID**: *number* = 0

*Defined in [src/avalanche.ts:19](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L19)*

___

### `Protected` port

• **port**: *number*

*Defined in [src/avalanche.ts:27](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L27)*

___

### `Protected` protocol

• **protocol**: *string*

*Defined in [src/avalanche.ts:23](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L23)*

___

### `Protected` requestConfig

• **requestConfig**: *AxiosRequestConfig*

*Defined in [src/avalanche.ts:35](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L35)*

___

### `Protected` url

• **url**: *string*

*Defined in [src/avalanche.ts:29](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L29)*

## Methods

### `Protected` _setHeaders

▸ **_setHeaders**(`headers`: object): *object*

*Defined in [src/avalanche.ts:186](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L186)*

**Parameters:**

Name | Type |
------ | ------ |
`headers` | object |

**Returns:** *object*

___

###  addAPI

▸ **addAPI**‹**GA**›(`apiName`: string, `ConstructorFN`: object, `baseurl`: string, ...`args`: Array‹any›): *void*

*Defined in [src/avalanche.ts:218](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L218)*

Adds an API to the middleware. The API resolves to a registered blockchain's RPC.

In TypeScript:
```js
avalanche.addAPI<MyVMClass>("mychain", MyVMClass, "/ext/bc/mychain");
```

In Javascript:
```js
avalanche.addAPI("mychain", MyVMClass, "/ext/bc/mychain");
```

**Type parameters:**

▪ **GA**: *[APIBase](common_apibase.apibase.md)*

Class of the API being added

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`apiName` | string | - | A label for referencing the API in the future |
`ConstructorFN` | object | - | A reference to the class which instantiates the API |
`baseurl` | string | undefined | Path to resolve to reach the API   |
`...args` | Array‹any› | - | - |

**Returns:** *void*

___

###  api

▸ **api**‹**GA**›(`apiName`: string): *GA*

*Defined in [src/avalanche.ts:234](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L234)*

Retrieves a reference to an API by its apiName label.

**Type parameters:**

▪ **GA**: *[APIBase](common_apibase.apibase.md)*

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`apiName` | string | Name of the API to return  |

**Returns:** *GA*

___

###  delete

▸ **delete**(`baseurl`: string, `getdata`: object, `headers`: object, `axiosConfig`: AxiosRequestConfig): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/avalanche.ts:310](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L310)*

Makes a DELETE call to an API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`baseurl` | string | - | Path to the API |
`getdata` | object | - | Object containing the key value pairs sent in DELETE |
`headers` | object | {} | An array HTTP Request Headers |
`axiosConfig` | AxiosRequestConfig | undefined | Configuration for the axios javascript library that will be the foundation for the rest of the parameters  |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

A promise for [RequestResponseData](common_apibase.requestresponsedata.md)

___

###  get

▸ **get**(`baseurl`: string, `getdata`: object, `headers`: object, `axiosConfig`: AxiosRequestConfig): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/avalanche.ts:287](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L287)*

Makes a GET call to an API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`baseurl` | string | - | Path to the api |
`getdata` | object | - | Object containing the key value pairs sent in GET |
`headers` | object | {} | An array HTTP Request Headers |
`axiosConfig` | AxiosRequestConfig | undefined | Configuration for the axios javascript library that will be the foundation for the rest of the parameters  |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

A promise for [RequestResponseData](common_apibase.requestresponsedata.md)

___

###  getHRP

▸ **getHRP**(): *string*

*Defined in [src/avalanche.ts:106](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L106)*

Returns the Human-Readable-Part of the network associated with this key.

**Returns:** *string*

The [KeyPair](api_avm_keychain.keypair.md)'s Human-Readable-Part of the network's Bech32 addressing scheme

___

###  getHeaders

▸ **getHeaders**(): *object*

*Defined in [src/avalanche.ts:81](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L81)*

Returns the custom headers

**Returns:** *object*

___

###  getIP

▸ **getIP**(): *string*

*Defined in [src/avalanche.ts:66](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L66)*

Returns the IP for the Avalanche node.

**Returns:** *string*

___

###  getNetworkID

▸ **getNetworkID**(): *number*

*Defined in [src/avalanche.ts:91](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L91)*

Returns the networkID;

**Returns:** *number*

___

###  getPort

▸ **getPort**(): *number*

*Defined in [src/avalanche.ts:71](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L71)*

Returns the port for the Avalanche node.

**Returns:** *number*

___

###  getProtocol

▸ **getProtocol**(): *string*

*Defined in [src/avalanche.ts:61](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L61)*

Returns the protocol such as "http", "https", "git", "ws", etc.

**Returns:** *string*

___

###  getRequestConfig

▸ **getRequestConfig**(): *AxiosRequestConfig*

*Defined in [src/avalanche.ts:86](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L86)*

Returns the custom request config

**Returns:** *AxiosRequestConfig*

___

###  getURL

▸ **getURL**(): *string*

*Defined in [src/avalanche.ts:76](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L76)*

Returns the URL of the Avalanche node (ip + port);

**Returns:** *string*

___

###  patch

▸ **patch**(`baseurl`: string, `getdata`: object, `postdata`: string | object | ArrayBuffer | ArrayBufferView, `headers`: object, `axiosConfig`: AxiosRequestConfig): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/avalanche.ts:384](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L384)*

Makes a PATCH call to an API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`baseurl` | string | - | Path to the baseurl |
`getdata` | object | - | Object containing the key value pairs sent in PATCH |
`postdata` | string &#124; object &#124; ArrayBuffer &#124; ArrayBufferView | - | Object containing the key value pairs sent in PATCH |
`headers` | object | {} | An array HTTP Request Headers |
`axiosConfig` | AxiosRequestConfig | undefined | Configuration for the axios javascript library that will be the foundation for the rest of the parameters  |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

A promise for [RequestResponseData](common_apibase.requestresponsedata.md)

___

###  post

▸ **post**(`baseurl`: string, `getdata`: object, `postdata`: string | object | ArrayBuffer | ArrayBufferView, `headers`: object, `axiosConfig`: AxiosRequestConfig): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/avalanche.ts:334](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L334)*

Makes a POST call to an API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`baseurl` | string | - | Path to the API |
`getdata` | object | - | Object containing the key value pairs sent in POST |
`postdata` | string &#124; object &#124; ArrayBuffer &#124; ArrayBufferView | - | Object containing the key value pairs sent in POST |
`headers` | object | {} | An array HTTP Request Headers |
`axiosConfig` | AxiosRequestConfig | undefined | Configuration for the axios javascript library that will be the foundation for the rest of the parameters  |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

A promise for [RequestResponseData](common_apibase.requestresponsedata.md)

___

###  put

▸ **put**(`baseurl`: string, `getdata`: object, `postdata`: string | object | ArrayBuffer | ArrayBufferView, `headers`: object, `axiosConfig`: AxiosRequestConfig): *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

*Defined in [src/avalanche.ts:359](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L359)*

Makes a PUT call to an API.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`baseurl` | string | - | Path to the baseurl |
`getdata` | object | - | Object containing the key value pairs sent in PUT |
`postdata` | string &#124; object &#124; ArrayBuffer &#124; ArrayBufferView | - | Object containing the key value pairs sent in PUT |
`headers` | object | {} | An array HTTP Request Headers |
`axiosConfig` | AxiosRequestConfig | undefined | Configuration for the axios javascript library that will be the foundation for the rest of the parameters  |

**Returns:** *Promise‹[RequestResponseData](common_apibase.requestresponsedata.md)›*

A promise for [RequestResponseData](common_apibase.requestresponsedata.md)

___

###  removeAllHeaders

▸ **removeAllHeaders**(): *void*

*Defined in [src/avalanche.ts:139](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L139)*

Removes all headers.

**Returns:** *void*

___

###  removeAllRequestConfigs

▸ **removeAllRequestConfigs**(): *void*

*Defined in [src/avalanche.ts:169](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L169)*

Removes all request configs.

**Returns:** *void*

___

###  removeHeader

▸ **removeHeader**(`key`: string): *void*

*Defined in [src/avalanche.ts:132](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L132)*

Removes a previously added custom header.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Header name  |

**Returns:** *void*

___

###  removeRequestConfig

▸ **removeRequestConfig**(`key`: string): *void*

*Defined in [src/avalanche.ts:162](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L162)*

Removes a previously added request config.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Header name  |

**Returns:** *void*

___

###  setAddress

▸ **setAddress**(`ip`: string, `port`: number, `protocol`: string): *void*

*Defined in [src/avalanche.ts:47](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L47)*

Sets the address and port of the main Avalanche Client.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`ip` | string | - | The hostname to resolve to reach the Avalanche Client RPC APIs |
`port` | number | - | The port to resolve to reach the Avalanche Client RPC APIs |
`protocol` | string | "http" | The protocol string to use before a "://" in a request, ex: "http", "https", "git", "ws", etc ...  |

**Returns:** *void*

___

###  setAuthToken

▸ **setAuthToken**(`auth`: string): *void*

*Defined in [src/avalanche.ts:182](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L182)*

Sets the temporary auth token used for communicating with the node.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`auth` | string | A temporary token provided by the node enabling access to the endpoints on the node.  |

**Returns:** *void*

___

###  setHRP

▸ **setHRP**(`hrp`: string): *void*

*Defined in [src/avalanche.ts:113](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L113)*

Sets the the Human-Readable-Part of the network associated with this key.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`hrp` | string | String for the Human-Readable-Part of Bech32 addresses  |

**Returns:** *void*

___

###  setHeader

▸ **setHeader**(`key`: string, `value`: string): *void*

*Defined in [src/avalanche.ts:123](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L123)*

Adds a new custom header to be included with all requests.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Header name |
`value` | string | Header value  |

**Returns:** *void*

___

###  setNetworkID

▸ **setNetworkID**(`netid`: number): *void*

*Defined in [src/avalanche.ts:96](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L96)*

Sets the networkID

**Parameters:**

Name | Type |
------ | ------ |
`netid` | number |

**Returns:** *void*

___

###  setRequestConfig

▸ **setRequestConfig**(`key`: string, `value`: string | boolean): *void*

*Defined in [src/avalanche.ts:153](https://github.com/ava-labs/avalanchejs/blob/40de7e6/src/avalanche.ts#L153)*

Adds a new custom config value to be included with all requests.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`key` | string | Config name |
`value` | string &#124; boolean | Config value  |

**Returns:** *void*
