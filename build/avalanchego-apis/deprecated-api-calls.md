---
description: >-
  Cette page répertorie les méthodes, les arguments et les réponses d'API qui sont deprecated et seront supprimés ou modifiés dans une version future.
---

# Appels d'API découpés

## API P-Chain

### `getCurrentValidators`

Dans v1.0.0, la signature était :

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

Dans les versions ultérieures, la signature était la suivante. Notez que chaque validateur contient une liste de ses délégués. Veuillez consulter la prochaine note pour le comportement actuel.

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

Depuis v1.0.6, le `delegators`champ de haut niveau est supprimé. La signature est maintenant :

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

Avant v1.0.4, la signature était :

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 a ajouté un argument `includeReason`. `false`Si elle est fourni, la réponse de cette méthode était la même que précédemment. Si `true`, la réponse de cette méthode avait ce nouveau format :

```cpp
{
  status: string,
  reason: string //optional
}
```

`reason``status`Où `reason`est la raison pour laquelle la transaction a été abandonnée.`"Dropped"`

Depuis v1.0.6, `includeReason`l'argument est ignoré, et la réponse de cette méthode est toujours dans le nouveau format.

