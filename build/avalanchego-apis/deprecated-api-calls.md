---
descripción: >-
  Esta página lista los métodos, argumentos y respustas de la API que han sido descontinuadas y
  serán eliminadas o modificadas en versiones siguientes.
---

# LLamadas de API DESCONTINUADAS

## P-Chain API

### `getCurrentValidators`

En v1.0.0, la firma era:

```cpp
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: boolean
    },
    delegators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
    }
}
```

In later versions, the signature was as follows. Note that each validator contains a list of its delegators. Please see the next note for current behavior.

```cpp
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: boolean,
        delegators: []{
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    },
    delegators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
    }
}
```

Since v1.0.6, top level `delegators` field is removed. The signature is now:

```cpp
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, //optional
        nodeID: string,
        weight: string, //optional
        rewardOwner: {
            locktime: string,
            threshold: string,
            addresses: string[]
        },
        potentialReward: string,
        delegationFee: string,
        uptime: string,
        connected: boolean,
        delegators: []{
            startTime: string,
            endTime: string,
            stakeAmount: string, //optional
            nodeID: string,
            rewardOwner: {
                locktime: string,
                threshold: string,
                addresses: string[]
            },
            potentialReward: string,
        }
    }
}
```

### `getTxStatus`

Before v1.0.4, the signature was:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 added an argument `includeReason`. If `false` or not provided, this method's response was the same as before. If `true`, this method's response had this new format:

```cpp
{
  status: string,
  reason: string //optional
}
```

Where `reason` is the reason the transaction was dropped. `reason` is only present if `status` is `"Dropped"`.

Since v1.0.6, the `includeReason` argument is ignored, and this method's response is always in the new format.

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTczMTM4MDAsMTAwMzk3MzU1OF19
-->