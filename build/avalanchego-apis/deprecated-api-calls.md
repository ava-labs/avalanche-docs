---
description: >-
  Cette page répertorie les méthodes, les arguments et les réponses API qui sont dépréciées et seront supprimés ou modifiés dans une version ultérieure.

---

# Appels API Deprecated

## API de la chaîne P

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

Depuis v1.0.6, champ `délégué` de niveau supérieur est supprimé. La signature est maintenant :

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

Avant v1.0.4, la signature était:

```cpp
platform.getTxStatus({txID: string} -> status: string
```

v1.0.4 ajouté un argument `includeReason`. Si la réponse de cette méthode était `fausse` ou non fournie, la même que précédemment. Si `vrai`, la réponse de cette méthode avait ce nouveau format:

```cpp
{
  status: string,
  reason: string //optional
}
```

Où la `raison` est la raison pour laquelle la transaction a été abandonnée. `la raison` est uniquement présente si `le statut` est `"abandonné"`.

Depuis v1.0.6, l'argument `includeReason`, et la réponse de cette méthode est toujours dans le nouveau format.

