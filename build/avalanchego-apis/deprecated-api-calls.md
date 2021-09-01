---
description: >-
  Esta página enumera los métodos, argumentos y respuestas de la API que están desviados y serán eliminados o modificados en una versión futura.
---

# API Calls Obsoletas

## API de P-Chain

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

En versiones posteriores, la firma fue. Notar que cada validador contiene una lista de sus delegadores. Por favor, mira la siguiente nota para el comportamiento vigente.

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

Desde v1.0.6 se elimina el `delegators`campo de alto nivel. La firma es ahora:

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

Antes de v1.0.4, la firma era:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

`includeReason`v1.0.4 añadió un argumento Si se proporciona, `false`o no, la respuesta de este método era la misma que antes. `true`Si la respuesta de este método tenía este nuevo formato:

```cpp
{
  status: string,
  reason: string //optional
}
```

Donde `reason`es la razón por la que se abandonó la transacción. Solo `reason`está presente si es `status`.`"Dropped"`

Desde v1.0.6 se ignora el `includeReason`argumento, y la respuesta de este método está siempre en el nuevo formato.

