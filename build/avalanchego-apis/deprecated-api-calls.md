---
description: >-
  このページでは、API メソッド、引数、およびレスポンスを一覧表示し、将来のリリースで削除または変更します。

---

# 非推奨APIコール

## P-Chain API

### `getCurrentValidators`

v1.0.0では、署名は次の通りです。

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

後述のバージョンでは、署名は次のように述べた。各バリデータにはデリゲーターのリストが含まれています。現在の動作については、次の注意点をご覧ください。

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

v1.0.6 以降、トップレベルの `delegators` フィールドは削除されました。署名は今です:

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

### `getTxStatus-JP`

v1.0.4以前は、次のようなシグネチャーでした。

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 引数 `includeReason` を追加しました。`false` が指定されたか否かは、このメソッドのレスポンスは以前と同じでした。`true`ならば、このメソッドのレスポンスはこの新しいフォーマットを持っていました。

```cpp
{
  status: string,
  reason: string //optional
}
```

`JavaScript````-JP-JP-```

v1.0.6 以降、`includeReason` 引数は無視され、このメソッドのレスポンスは常に新しいフォーマットです。

