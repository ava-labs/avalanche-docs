---
description: >-
  このページでは、廃止推奨となり、将来のリリースで削除あるいは変更される、APIメソッド、引数、レスポンスをリストします。
---

# 廃止されたAPIコール

## P-Chain API

### `getCurrentValidators`

v1.0.0では、署名は次のようになっています。

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

後期バージョンでは、署名は以下のようになります。各バリデータには、そのデリゲーターのリストが含まれていますことに注意してください。現在の動作については、次のノートをご覧ください。

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

v1.0.6以降、`delegators`トップレベルフィールドは削除されます。署名は、現在次のようになります：

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

v1.0.4以前は、署名は以下のようでした。

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 引数を追加`includeReason`。提供されているか否か`false`が、このメソッドのレスポンスは以前と同じものでした。このメソッドのレスポンスがこの新しいフォーマットを持たせた場合`true`：

```cpp
{
  status: string,
  reason: string //optional
}
```

`reason``status`トランザクションが削除された理由`reason`です。`"Dropped"`

v1.0.6以降、`includeReason`引数は無視され、このメソッドのレスポンスは常に新しいフォーマットです。

