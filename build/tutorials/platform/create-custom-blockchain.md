# Créer une chaîne de blocage personnalisée

## Introduction

Avalanche supporte la création de blockchains avec des machines virtuelles dans les sous-réseaux. Dans ce tutoriel, nous allons créer une chaîne de blocs personnalisée à l'aide d'une machine virtuelle personnalisée \(Timestamp VM\).

Si vous voulez une chaîne de blocs qui a des capacités de X-Chain \(AVM\), voir [Créer AVM Blockchain](../nodes-and-staking/run-avalanche-node.md).

### Préalables

Vous aurez besoin d'un nœud d'exécution, d'un utilisateur sur le nœud et d'un certain AVAX dans l'adresse contrôlée par l'utilisateur. Tout cela est couvert dans le Tutoriel [Run un](../nodes-and-staking/run-avalanche-node.md) nœud avalanche.

Ensuite, vous devez avoir votre noeud être un validateur sur le [réseau primaire](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Vous pouvez trouver comment faire cela dans le tutoriel [Ajouter un](../nodes-and-staking/add-a-validator.md) Validator Il est recommandé que vous le faites [avec les appels API](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) puisque c'est ainsi que vous serez interagir avec votre noeud dans le reste de ce tutoriel.

## Créer la machine virtuelle

Chaque blockchain est une instance d'une machine virtuelle. Par exemple, X-Chain est une instance d'AVM et C-Chain est l'instance d'EVM. Avalanche supporte la création de nouvelles chaînes de blocs \(instances\) à partir de Machines virtuelles. Dans ce cas, nous allons utiliser Timestamp VM, qui est un plugin VM externe. Timestamp VM communiquera avec notre noeud AvalancheGo via RPC.

{% page-ref page="create-a-virtual-machine-vm.md" %}

## Créer le sous-réseau

Chaque blockchain est validé par un [sous-réseau](../../../learn/platform-overview/#subnets). Avant de pouvoir créer une chaîne de blocage, vous aurez besoin d'un sous-réseau pour la valider. Vous pouvez également utiliser un sous-réseau qui existe déjà si vous avez un nombre suffisant de ses clés de contrôle.

{% page-ref page="create-a-subnet.md" %}

### Ajouter les validateurs au Sous-réseau

Le sous-réseau a besoin de validateurs dans it bien, valider les chaînes de blocage.

{% page-ref page-ref %}

### Créer les données de Genèse<a id="create-the-genesis-data"></a>

Chaque blockchain a un état de genèse lorsqu'il est créé. Chaque VM définit le format et la sémantique de ses données de geneses. `TimestampVM` utilise les données codées CB58 comme données de genesis Il y a des méthodes d'API statiques qui peuvent être utilisées pour `encode`/décoder les données de chaînes. Voir [TimestampVM API](create-a-virtual-machine-vm.md#api).

Générons une simple données de genèse pour TimestampVM :

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.encode",
    "params":{
        "data":"helloworld"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "fP1vxkpyLWnH9dD6BQA",
    "encoding": "cb58"
  },
  "id": 1
}
```

Nos données de genèse seront `fP1vxkpyLWnH9dD6BQA`.

## Créer la chaîne de verrouillage

Maintenant, créons la nouvelle blockchain. Pour ce faire, nous appelons [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain). Votre appel devrait ressembler à celui ci-dessous. Vous devez changer `le` sous-réseau qui validera votre blockchain et fournir un `nom` d'utilisateur qui contrôle un nombre suffisant de clés de contrôle du sous-réseau. Comme rappel, vous pouvez trouver ce qu'un sous-réseau seuil et les clés de contrôle sont en appelant [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

Rappelons que nous avons utilisé `tGas3T58KzdjLHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH` comme notre ID VM dans [Créer une machine Virtual](create-a-virtual-machine-vm.md#vm-aliases)

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "platform.createBlockchain",
    "params" : {
        "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
        "vmID":"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH",
        "name":"My new TSVM",
        "genesisData": "fP1vxkpyLWnH9dD6BQA",
        "username":"USERNAME GOES HERE",
        "password":"PASSWORD GOES HERE"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse contient l'ID de la transaction:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "txID": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
        "changeAddr": "P-avax103y30cxeulkjfe3kwfnpt432ylmnxux8r73r8u"
    },
    "id": 1
}
```

### Vérifier le succès<a id="verify-success"></a>

Après quelques secondes, la transaction pour créer notre blockchain aurait dû être acceptée et la blockchain devrait exister \(en supposant que la demande était bien formée, etc.\)

Pour vérifier, appelez [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). Cela renvoie une liste de toutes les chaînes de blocs qui existent.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que la blockchain a été créé:

```cpp
{
    "jsonrpc": "2.0",
    "result": {
        "blockchains": [
            {
                "id": "AXerNQX7voY2AABaRdTAyXcawBURBR6thPRJp43LtPpZZi6Qz",
                "name": "X-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            },
            {
                "id": "tZGm6RCkeGpVETUTp11DW3UYFZmm69zfqxchpHrSF7wgy8rmw",
                "name": "C-Chain",
                "subnetID": "11111111111111111111111111111111LpoYY",
                "vmID": "mgj786NP7uDwBCcq6YwThhaN8FLyybkCa4zBWTQbNgmK6k9A6"
            },
            {
                "id": "sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk",
                "name": "My new TSVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"
            },
            {
                "id": "xAd5n5PQFV6RRo8UgH54Gf5tJs8oQdctQS2ygp5F2dKZDckYH",
                "name": "My new AVM",
                "subnetID": "KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT",
                "vmID": "jvYyfQTxGMJLuGWa55kdP2p2zSUYsQ5Raupu4TW34ZAUBAbtq"
            }
        ]
    },
    "id": 1
}
```

### Validation de la chaîne de verrouillage<a id="validating-blockchain"></a>

Chaque blockchain a besoin d'un ensemble de validateurs pour valider et traiter les transactions dessus. Vous pouvez vérifier si un noeud valide une chaîne de blocs donnée en appelant [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus) sur ce noeud :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchainStatus",
    "params" :{
        "blockchainID":"sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "status": "Validating"
  },
  "id": 1
}
```

S'il répond `"Validation"`, le noeud valide la chaîne donnée. Si elle répond `"Syncing"`, alors la chaîne tracée par ce nœud mais il n'est pas validant. Si elle répond `"Créé"` alors la chaîne existe mais elle n'est pas synchronisée. Notez que pour valider ou regarder un sous-réseau, vous devez démarrer votre noeud avec l'argument `--whitelisted-subnets=[subnet subnet va ici]``` \(par exemple --whitelistted-subnets=KL1e8io1Zi2kr8cXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT\) ainsi que d'ajouter le noeud à l'ensemble de validation du sous-réseau.

Plus d'informations peuvent être trouvées dans le tutoriel [Ajout d'un sous-réseau](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) Validator

## Interagissant avec la nouvelle chaîne de blocs<a id="interact-with-the-new-blockchain"></a>

Vous pouvez interagir avec cette nouvelle instance de la VM. Le paramètre API de votre blockchain est `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaY9fCtYFfY7AjD2c9rm64SbApnvjmk`.

Vous pouvez également alias cette ID chaîne avec `timestampbc`, ou tout ce que vous voulez, pour des URL plus simples d'API. Plus d'informations: [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Vérifier la genèse bloc

Dans la genèse, nous avons spécifié `fP1vxkpyLWnH9dD6BQA` comme les données de genèse.

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "timestamp": "0",
        "data": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp",
        "id": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn",
        "parentID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
}
```

Comme vous pouvez le voir notre premier bloc a `timestamp: 0`. Aussi l'ID parent `\(11LpoY\)` est l'ID de la chaîne P. Décoder les données de genèse avec la méthode API statique de VM. Rappelons que notre ID TimestampVM est aliasé avec `timestampvm`:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "id"     : 1,
    "method" : "timestampvm.decode",
    "params" : {
        "bytes": "nyfJkNxEwKeQ9KpPducrm3jRaDzpPNJXUdZtgCWeMZTUxPqGp"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "data":"helloworld",
        "encoding": "cb58"
    },
    "id": 1
}
```

Nous pouvons voir les données de genèse a la chaîne `helloworld`

### Proposer un nouveau bloc

Nous pouvons proposer de nouveaux blocs à notre blockchain avec certaines données dedans.

Allons d'abord les données encodées. Les blocs prévoient avoir 32 octets. Il y a un argument `de longueur` dans la méthode d'encode:

```cpp
curl -X POST --data '{
   "jsonrpc": "2.0",
    "method" : "timestampvm.encode",
    "params" : {
        "data": "mynewblock",
        "length": 32
    }
    "id"     : 1,
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/vm/tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH
```

Résultat:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "bytes": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "encoding": "cb58"
  },
  "id": 1
}
```

Maintenant, nous pouvons proposer un nouveau bloc avec les données:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.proposeBlock",
    "params":{
        "data":"qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Résultat:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

Vérifions l'existence de notre bloc proposé:

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "timestampvm.getBlock",
    "params":{
        "id":""
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk
```

Résultat:

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "timestamp": "1625674027",
    "data": "qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y",
    "id": "Br36bggr9vEEoNTNVPsSCD7QHHoCqE31Coui6uh1rA71EGPve",
    "parentID": "24kWScv7DMA4LwdoFwmN1iRU3idyHRrrA2UxN9k6AuXihoK3mn"
  },
  "id": 1
}
```

Résultat contient le champ `de données` a `qDNkrS9xuyGmaAgdHAjbMANSSvCKnK5BHvyCybJaFCAqx46Z8y`. Il s'agit des mêmes données que nos données proposées dans l'étape précédente.

