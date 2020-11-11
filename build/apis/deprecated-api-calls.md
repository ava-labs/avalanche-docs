---
description: >-
  This page lists API methods, arguments and responses that are deprecated and
  will be removed or modified in a future release.
---

# Deprecated API Calls



### X-Chain API

### P-Chain API

#### `getCurrentValidators`

In v1.0.0, the signature is:

```text
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, (optional)
        nodeID: string,
        weight: string, (optional)
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
        stakeAmount: string, (optional)
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

In later versions, the signature is as follows. Note that each validator contains a list of its delegators. You should get information about delegators this way going forward. The top level `delegators` field will be removed in a future release.

```text
platform.getCurrentValidators({subnetID: string}) ->
{
    validators: []{
        startTime: string,
        endTime: string,
        stakeAmount: string, (optional)
        nodeID: string,
        weight: string, (optional)
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
            stakeAmount: string, (optional)
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
        stakeAmount: string, (optional)
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

`getTxStatus`

Before v1.0.4, the signature is:

```text
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 adds an additional argument, `includeReason`. If `false` or not provided, this method's response is the same as before. If `true`, this method's response has this new format:

```text
{
  status: string,
  reason: string (optional)
}
```

Where `reason` is the reason the transaction was dropped. `reason` is only present if `status` is `"Dropped"`.

In a future release, the `includeReason` argument will be ignored, and this method's response will always be the new format.

