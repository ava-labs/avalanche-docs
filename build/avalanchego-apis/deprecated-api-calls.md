---
description: >-
  Bu sayfa API yöntemleri, argümanlar ve yanıtları listeliyor ve gelecekteki bir sürümde kaldırılabilir veya değiştirilecek.

---

# Alçak API Çağrıları

## P- Chain API

### `Geçerli Geçerliler`

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

V1.0.6'dan bu yana üst düzey `delegators` alanı kaldırıldı. İmza şu anda:

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

### `getTxStatus al`

V1.0.4 öncesinde imza:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

V1.0.4 bir argüman ekledi `buna sebep dahil`. `Bu` yöntemin yanlış veya sağlanması yoksa bu yöntemin tepkisi eskisi gibi oldu. `Eğer` doğruysa, bu yöntemin cevabı yeni bir biçime sahipti:

```cpp
{
  status: string,
  reason: string //optional
}
```

Bu nedenle bu işlem `düşüşünün` nedeni `nedendir.` `Sebep` sadece `durum` düşürülürse mevcut olur.

V1.0.6'dan beri, `içerik` argümanı görmezden gelinir ve bu yöntemin cevabı her zaman yeni formatta geçer.

