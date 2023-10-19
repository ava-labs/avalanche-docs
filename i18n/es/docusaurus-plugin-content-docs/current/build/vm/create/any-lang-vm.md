---
tags: [Build, Virtual Machines]
description: This is a language-agnostic high-level documentation explaining the basics of how to get started at implementing your own virtual machine from scratch.
sidebar_label: Simple VM in Any Language
pagination_label: Build a Simple VM From Scratch
sidebar_position: 0
---

# How to Build a Simple VM From Scratch

This is a language-agnostic high-level documentation explaining the basics of how to get started
at implementing your own virtual machine from scratch.

Avalanche virtual machines are grpc servers implementing Avalanche's 
[Proto interfaces](https://buf.build/ava-labs/avalanche). This means that it can be done in 
[any language that has a grpc implementation](https://grpc.io/docs/languages/).

## Minimal Implementation

To get the process started, at the minimum, you will to implement the following interfaces : 

- [`vm.Runtime`](https://buf.build/ava-labs/avalanche/docs/main:vm.runtime) (Client)
- [`vm.VM`](https://buf.build/ava-labs/avalanche/docs/main:vm) (Server)

To build a blockchain taking advantage of AvalancheGo's consensus to build blocks, you will need
to implement :

- [AppSender](https://buf.build/ava-labs/avalanche/docs/main:appsender) (Client)
- [Messenger](https://buf.build/ava-labs/avalanche/docs/main:messenger) (Client)

To have a json-RPC endpoint, `/ext/bc/subnetId/rpc` exposed by AvalancheGo, you will need 
to implement : 

- [`Http`](https://buf.build/ava-labs/avalanche/docs/main:http) (Server)

You can and should use a tool like `buf` to generate the (Client/Server) code from the interfaces
as stated in the [Avalanche module](https://buf.build/ava-labs/avalanche)'s page.


:::note
There are _server_ and _client_ interfaces to implement.
AvalancheGo calls the _server_ interfaces exposed by your VM and your VM calls 
the _client_ interfaces exposed by AvalancheGo.
:::

## Starting Process 

Your VM is started by AvalancheGo launching your binary. Your binary is started as a sub-process
of AvalancheGo. While launching your binary, AvalancheGo passes an environment variable
`AVALANCHE_VM_RUNTIME_ENGINE_ADDR` containing an url. We must use this url to initialize a
`vm.Runtime` client. 

Your VM, after having started a grpc server implementing the VM interface must call the 
[`vm.Runtime.InitializeRequest`](https://buf.build/ava-labs/avalanche/docs/main:vm.runtime#vm.runtime.InitializeRequest)
with the following parameters.

- `protocolVersion` : It must match the `supported plugin version` of the 
[AvalancheGo release](https://github.com/ava-labs/AvalancheGo/releases) you are using. 
It is always part of the release notes.

- `addr` : It is your grpc server's address. It must be in the following format
  `host:port` (example `localhost:12345`)

## VM Initialization

The service methods are described in the same order as they are called.
You will need to implement these methods in your server.

### Pre-Initialization Sequence

_AvalancheGo starts/stops your process multiple times before launching the real initialization_ 

- [VM.Version](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Version) 
  - Return : your VM's version.
- [VM.CreateStaticHandler](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateStaticHandlers) 
  - Return : an empty array - (Not absolutely required). 
- [VM.Shutdown](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Shutdown)
  - You should gracefully stop your process.
  - Return : Empty

### Initialization Sequence

- [VM.CreateStaticHandlers](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateStaticHandlers)
  - Return an empty array - (Not absolutely required). 
- [VM.Initialize](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Initialize)
  - Param : an 
  [InitializeRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.InitializeRequest).
  - You must use this data to initialize your VM.
  - You should add the genesis block to your blockchain and set it as the last accepted block.
  - Return : an 
  [InitializeResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.InitializeResponse) 
  containing data about the genesis extracted from the `genesis_bytes` that was sent in the 
  request.
- [VM.VerifyHeightIndex](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.VerifyHeightIndex)
  - Return : a 
[VerifyHeightIndexResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VerifyHeightIndexResponse)
  with the code `ERROR_UNSPECIFIED` to indicate that no error has occurred.
- [VM.CreateHandlers](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.CreateHandlers)
  - To serve json-RPC endpoint, `/ext/bc/subnetId/rpc` exposed by AvalancheGo 
  - See [json-RPC](#json-rpc) for more detail
  - Create a [`Http`](https://buf.build/ava-labs/avalanche/docs/main:http) server and get its url.
  - Return : a `CreateHandlersResponse` containing a single item with the server's url. (or an empty
  array if not implementing the json-RPC endpoint)
- [VM.StateSyncEnabled](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.StateSyncEnabled)
  - Return : `true` if you want to enable StateSync, `false` otherwise.
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
    _If you had specified `true` in the `StateSyncEnabled` result_ 
  - Param : a 
  [SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) 
  with the `StateSyncing` value
  - Set your blockchain's state to `StateSyncing`
  - Return : a 
  [SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) 
  built from the genesis block.
- [VM.GetOngoingSyncStateSummary](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.GetOngoingSyncStateSummary)
    _If you had specified `true` in the `StateSyncEnabled` result_ 
  - Return : a 
[GetOngoingSyncStateSummaryResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.GetOngoingSyncStateSummaryResponse)
  built from the genesis block.
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
  - Param : a 
[SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) 
  with the `Bootstrapping` value
  - Set your blockchain's state to `Bootstrapping`
  - Return : a 
[SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) 
  built from the genesis block.
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Param : `SetPreferenceRequest` containing the preferred block ID 
  - Return : Empty
- [VM.SetState](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetState)
  - Param : a 
[SetStateRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateRequest) 
  with the `NormalOp` value
  - Set your blockchain's state to `NormalOp`
  - Return : a 
[SetStateResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.SetStateResponse) 
  built from the genesis block.
- [VM.Connected](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Connected) 
(for every other node validating this Subnet in the network)
  - Param : a 
[ConnectedRequest](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ConnectedRequest) 
  with the NodeID and the version of AvalancheGo.
  - Return : Empty
- [VM.Health](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.Health) 
  - Param : Empty
  - Return : a
    [HealthResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.HealthResponse)
    with an empty `details` property.
- [VM.ParseBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.ParseBlock)
  - Param : A byte array containing a Block (the genesis block in this case)
  - Return : a 
[ParseBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ParseBlockResponse) 
  built from the last accepted block.

At this point, your VM is fully started and initialized.

### Building Blocks

#### Transaction Gossiping Sequence

When your VM receives transactions (for example using the [json-RPC](#json-rpc) endpoints), 
it can gossip them to the other nodes by using the 
[AppSender](https://buf.build/ava-labs/avalanche/docs/main:appsender) service.

Supposing we have a 3 nodes network with nodeX, nodeY, nodeZ

NodeX has received a new transaction on it's json-RPC endpoint : 
_on nodeX_

- [`AppSender.SendAppGossip`](https://buf.build/ava-labs/avalanche/docs/main:appsender#appsender.AppSender.SendAppGossip)
(_client_)
  - You must serialize your transaction data into a byte array and call the 
  `SendAppGossip` to propagate the transaction.


AvalancheGo then propagates this to the other nodes.

_on nodeY and nodeZ_

- [VM.AppGossip](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.AppGossip)
  - Param : A byte array containing your transaction data, and the NodeID of the node which sent
  the gossip message.
  - You must deserialize the transaction and store it for the next block.
  - Return : Empty

#### Block Building Sequence

Whenever your VM is ready to build a new block, it will initiate the block building process by 
using the [Messenger](https://buf.build/ava-labs/avalanche/docs/main:messenger) service.
Supposing that nodeY wants to build the block. _you probably will implement some kind of background
worker checking every second if there are any pending transactions_ :

_on nodeY_

- _client_ 
[`Messenger.Notify`](https://buf.build/ava-labs/avalanche/docs/main:messenger#messenger.Messenger.Notify)
  - You must issue a notify request to AvalancheGo by calling the method with the 
  `MESSAGE_BUILD_BLOCK` value.

_on nodeY_

- [VM.BuildBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BuildBlock)
  - Param : Empty
  - You must build a block with your pending transactions. Serialize it to a byte array.
  - Store this block in memory as a "pending blocks"
  - Return : a 
  [BuildBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.BuildBlockResponse) 
  from the newly built block and it's associated data (`id`, `parent_id`, `height`, `timestamp`).
- [VM.BlockVerify](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockVerify)
  - Param : The byte array containing the block data  
  - Return : the block's timestamp
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Param : The block's ID
  - You must mark this block as the next preferred block.
  - Return : Empty

_on nodeX and nodeZ_ 

- [VM.ParseBlock](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.ParseBlock)
  - Param : A byte array containing a the newly built block's data
  - Store this block in memory as a "pending blocks"
  - Return : a 
  [ParseBlockResponse](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.ParseBlockResponse) 
  built from the last accepted block.
- [VM.BlockVerify](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockVerify)
  - Param : The byte array containing the block data  
  - Return : the block's timestamp
- [VM.SetPreference](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.SetPreference)
  - Param : The block's ID
  - You must mark this block as the next preferred block.
  - Return : Empty

_on all nodes_

- [VM.BlockAccept](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockAccept)
  - Param : The block's ID
  - You must accept this block as your last final block.
  - Return : Empty

#### Managing Conflicts

Conflicts happen when two or more nodes propose the next block at the same time.
AvalancheGo takes care of this and decides which block should be considered
final, and which blocks should be rejected using Snowman consensus.
On the VM side, all there is to do is implement the `VM.BlockAccept` and
`VM.BlockReject` methods.

_nodeX proposes block `0x123...`, nodeY proposes block `0x321...` and nodeZ
proposes block `0x456`_

There are three conflicting blocks (different hashes), and if we look at our VM's
log files, we can see that AvalancheGo uses Snowman to decide which block must
be accepted. 

```log
...
... snowman/voter.go:58 filtering poll results ...
... snowman/voter.go:65 finishing poll ...
... snowman/voter.go:87 Snowman engine can't quiesce
... 
... snowman/voter.go:58 filtering poll results ...
... snowman/voter.go:65 finishing poll ...
... snowman/topological.go:600 accepting block
...
```

Supposing that AvalancheGo accepts block `0x123...`. The following RPC methods
are called on all nodes :

- [VM.BlockAccept](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockAccept)
  - Param : The block's ID (`0x123...`)
  - You must accept this block as your last final block.
  - Return : Empty
- [VM.BlockReject](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockReject)
  - Param : The block's ID (`0x321...`)
  - You must mark this block as rejected.
  - Return : Empty
- [VM.BlockReject](https://buf.build/ava-labs/avalanche/docs/main:vm#vm.VM.BlockReject)
  - Param : The block's ID (`0x456...`)
  - You must mark this block as rejected.
  - Return : Empty

### json-RPC

To enable your json-RPC endpoint, you must implement the HandleSimple method of the 
[`Http`](https://buf.build/ava-labs/avalanche/docs/main:http) interface. 

- [`Http.HandleSimple`](https://buf.build/ava-labs/avalanche/docs/main:http#http.HTTP.HandleSimple)
  - Param : a 
  [HandleSimpleHTTPRequest](https://buf.build/ava-labs/avalanche/docs/main:http#http.HandleSimpleHTTPRequest)
  containing the original request's method, url, headers, and body.
  - Analyze, deserialize and handle the request 
    
    _for example, if the request represents a transaction, we must deserialize it, check the 
    signature, store it and gossip it to the other nodes using the 
    [messenger client](#block-building-sequence))_
  - Return the 
  [HandleSimpleHTTPResponse](https://buf.build/ava-labs/avalanche/docs/main:http#http.HandleSimpleHTTPResponse)
  response that will be sent back to the original sender.

This server is registered with AvalancheGo during the 
[initialization process](#initialization-sequence) when the `VM.CreateHandlers` method is called.
You must simply respond with the server's url in the `CreateHandlersResponse`
result.
