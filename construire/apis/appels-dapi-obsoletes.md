---
description: >-
  Cette page répertorie les méthodes, arguments et réponses d'API qui sont
  obsolètes et qui seront supprimés ou modifiés dans une version ultérieure.
---

# Appels d'API obsolètes

## P-Chain API

### `getCurrentValidators`

Dans la version v1.0.0, la signature était:

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

Dans les versions ultérieures, la signature était la suivante. Notez que chaque validateur contient une liste de ses délégués. Veuillez consulter la note suivante pour le comportement actuel.

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

Depuis la v1.0.6, le champ des `delegators` de niveau supérieur est supprimé. La signature est maintenant:

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

Avant la v1.0.4, la signature était:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 a ajouté un argument `includeReason`. Si la réponse est `false` ou non fournie, la réponse de cette méthode était la même qu'avant. Si la réponse est`true`, la réponse de cette méthode avait ce nouveau format:

```cpp
{
  status: string,
  reason: string //optional
}
```

Où la`reason`est la raison pour laquelle la transaction a été abandonnée `reason`n'est présente que si le `status` est `"Dropped"`.

Depuis la v1.0.6, l'argument`includeReason` est ignoré et la réponse de cette méthode est toujours dans le nouveau format.

