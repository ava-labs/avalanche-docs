---
descripción: >-
  Esta página lista los métodos, argumentos y respustas de la API que han sido
  descontinuadas y serán eliminadas o modificadas en versiones siguientes.
---

# API Calls Obsoletas

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

Desde v1.0.6, el campo de nivel superior `delegators` es removido. La firma es ahora:

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

La v1.0.4 agregó el argumento `includeReason`. Si era `false` o no se especificaba, la respuesta de este método era la misma que anteriormente. Si era `true`, este método responde con este nuevo formato:

```cpp
{
  status: string,
  reason: string //optional
}
```

Donde `reason` es el motivo por el cual la transacción fue desechada. `reason` está presente en la respuesta solamente si el `status` es `"Dropped"`.

Desde v1.0.6, el argumento `includeReason` es ignorado, y la respuesta de este método siempre es con el nuevo formato.

