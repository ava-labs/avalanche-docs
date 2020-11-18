# Admin API

This API can be used for measuring node health and debugging. Note that the Admin API is disabled by default for security reasons. To run a node with the Admin API enabled, use [command line argument](../references/command-line-interface.md) `--api-admin-enabled=true`.

## Format

This API uses the `json 2.0` RPC format.

{% page-ref page="issuing-api-calls.md" %}

## Endpoint

```text
/ext/admin
```

## API Methods

### admin.alias

Assign an API endpoint an alias, a different endpoint for the API. The original endpoint will still work. This change only affects this node; other nodes will not know about this alias.

#### **Signature**

```text
admin.alias({endpoint:string, alias:string}) -> {success:bool}
```

* `endpoint` is the original endpoint of the API. `endpoint` should only include the part of the endpoint after `/ext/`.
* The API being aliased can now be called at `ext/alias`.
* `alias` can be at most 512 characters.

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.alias",
    "params": {
        "alias":"myAlias",
        "endpoint":"bc/X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Now, calls to the X-Chain can be made to either `/ext/bc/X` or, equivalently, to `/ext/myAlias`.

### admin.aliasChain

Give a blockchain an alias, a different name that can be used any place the blockchain’s ID is used.

#### **Signature**

```text
admin.aliasChain(
    {
        chain:string,
        alias:string
    }
) -> {success:bool}
```

* `chain` is the blockchain’s ID.
* `alias` can now be used in place of the blockchain’s ID \(in API endpoints, for example.\)

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.aliasChain",
    "params": {
        "chain":"sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM",
        "alias":"myBlockchainAlias"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

Now, instead of interacting with the blockchain whose ID is `sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM` by making API calls to `/ext/bc/sV6o671RtkGBcno1FiaDbVcFv2sG5aVXMZYzKdP4VQAWmJQnM`, one can also make calls to `ext/bc/myBlockchainAlias`.

### admin.lockProfile

Writes a profile of mutex statistics to `lock.profile`.

#### **Signature**

```text
admin.lockProfile() -> {success:bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.lockProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.memoryProfile

Writes a memory profile of the to `mem.profile`.

#### **Signature**

```text
admin.memoryProfile() -> {success:bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.memoryProfile",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.startCPUProfiler

Start profiling the CPU utilization of the node. To stop, call `stopCPUProfiler`. On stop, writes the profile to `cpu.profile`.

#### **Signature**

```text
admin.startCPUProfiler() -> {success:bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.startCPUProfiler",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

### admin.stopCPUProfiler

Stop the CPU profile that was previously started.

#### **Signature**

```text
admin.stopCPUProfiler() -> {success:bool}
```

#### **Example Call**

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"admin.stopCPUProfiler"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/admin
```

#### **Example Response**

```text
{
    "jsonrpc":"2.0",
    "id"     :1,
    "result" :{
        "success":true
    }
}
```

