---
description: >-
  Bu sayfa API yöntemleri, argümanlar ve yanıtları listeliyor ve gelecekteki bir sürümde kaldırılabilir veya değiştirilecek.
---

# Alçak API Çağrıları

## P- Chain API

### `getCurrentValidators`

V1.0.0 yılında imza:

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

Daha sonraki sürümlerde imza aşağıdaki gibiydi. Her validator delegelerinin bir listesini içerdiğini unutmayın. Lütfen şimdiki davranışların bir sonraki notunu görün.

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

V1.0.6 yılından bu yana üst seviye `delegators`alan kaldırılır. İmza şu anda:

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

V1.0.4 öncesinde imza:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

V1.0.4 bir argüman `includeReason`ekledi. Bu yöntemin öncekiyle aynı şekilde olması `false`gerektiği gibi gerçekleşmiştir. `true`Eğer bu yöntemin cevabı yeni bir biçime sahipse:

```cpp
{
  status: string,
  reason: string //optional
}
```

`reason``reason`Bu işlemlerin yapılmasının nedeni ise sadece varsa `status`mevcuttur.`"Dropped"`

V1.0.6'dan bu yana `includeReason`argüman görmezden gelinir ve bu yöntemin cevabı her zaman yeni biçimdedir.

