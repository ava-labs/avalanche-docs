[avalanche](../README.md) › [API-Socket](../modules/api_socket.md) › [Socket](api_socket.socket.md)

# Class: Socket

## Hierarchy

* any

  ↳ **Socket**

## Index

### Constructors

* [constructor](api_socket.socket.md#constructor)

### Properties

* [onclose](api_socket.socket.md#onclose)
* [onerror](api_socket.socket.md#onerror)
* [onmessage](api_socket.socket.md#onmessage)
* [onopen](api_socket.socket.md#onopen)

### Methods

* [close](api_socket.socket.md#close)
* [send](api_socket.socket.md#send)

## Constructors

###  constructor

\+ **new Socket**(`url`: string | URL, `options?`: WebSocket.ClientOptions | ClientRequestArgs): *[Socket](api_socket.socket.md)*

*Defined in [src/apis/socket/socket.ts:36](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L36)*

Provides the API for creating and managing a WebSocket connection to a server, as well as for sending and receiving data on the connection.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`url` | string &#124; URL | `wss://${MainnetAPI}:443/ext/bc/X/events` | Defaults to [MainnetAPI](../modules/utils_constants.md#const-mainnetapi) |
`options?` | WebSocket.ClientOptions &#124; ClientRequestArgs | - | Optional  |

**Returns:** *[Socket](api_socket.socket.md)*

## Properties

###  onclose

• **onclose**: *any*

*Defined in [src/apis/socket/socket.ts:14](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L14)*

___

###  onerror

• **onerror**: *any*

*Defined in [src/apis/socket/socket.ts:16](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L16)*

___

###  onmessage

• **onmessage**: *any*

*Defined in [src/apis/socket/socket.ts:12](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L12)*

___

###  onopen

• **onopen**: *any*

*Defined in [src/apis/socket/socket.ts:10](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L10)*

## Methods

###  close

▸ **close**(`mcode?`: number, `data?`: string): *void*

*Defined in [src/apis/socket/socket.ts:34](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L34)*

Terminates the connection completely

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`mcode?` | number | Optional |
`data?` | string | Optional  |

**Returns:** *void*

___

###  send

▸ **send**(`data`: any, `cb?`: any): *void*

*Defined in [src/apis/socket/socket.ts:24](https://github.com/ava-labs/avalanchejs/blob/62a14d4/src/apis/socket/socket.ts#L24)*

Send a message to the server

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | any | - |
`cb?` | any | Optional  |

**Returns:** *void*
