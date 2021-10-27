---
description: >-
  このページでは、非推奨であり、将来のリリースで削除または変更される予定のAPIメソッド、引数、レスポンスをリストアップしています。
---

# 非推奨のAPI呼び出し

## P-Chain API

### `getCurrentValidators`

v1.0.0では、署名は次のようになっていました。

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

それ以降のバージョンでは、署名は次のようになっていました。各バリデーターには、そのデリゲーターのリストが含まれていることに注意してください。現在の動作については、次のノートを参照してください。

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

v1.0.6以降、トップレベルの`delegators`フィールドがなくなりました。署名は現在次の通りです。

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

v1.0.4以前は、署名は以下のようになっていました。

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4では、引数`includeReason`が追加されました。`false`または指定されていない場合、このメソッドのレスポンスは以前と同じでした。`true`を指定すると、このメソッドのレスポンスは、次に示す新しいフォーマットになります。

```cpp
{
  status: string,
  reason: string //optional
}
```

ここで、`reason`は、トランザクションがドロップされた理由です。`reason`は`status`が`"Dropped"`の場合のみ存在します。

v1.0.6 以降、`includeReason`引数は無視され、このメソッドのレスポンスは常に新しいフォーマットになります。

