---
description: >-
  Esta página enumera métodos, argumentos y respuestas de API que se han depreciado y se eliminarán o modificarán en una futura versión.

---

# Llamadas de API Deprecated

## API de cadena P-Chain

### `getCurrentValidators`

En v1.0.0, la firma fue:

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

En versiones posteriores, la firma fue la siguiente. Tenga en cuenta que cada validador contiene una lista de sus delegators. Por favor vea la siguiente nota para el comportamiento actual.

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

Desde v1.0.6, se elimina el campo `de delegados` de alto nivel. La firma es ahora:

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

v1.0.4 añadió un argumento `includeReason`. Si `se` proporcionaba o no falso, la respuesta de este método era la misma que antes. Si `es cierto`, la respuesta de este método tenía este nuevo formato:

```cpp
{
  status: string,
  reason: string //optional
}
```

Donde la `razón` es la razón por la que se ha abandonado la transacción. `La razón` solo está presente si el `estado` es `"abandonado"`.

Desde v1.0.6, el argumento de `includeReason` es ignorado, y la respuesta de este método siempre está en el nuevo formato.

