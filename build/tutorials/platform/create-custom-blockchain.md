# Créer une blockchain personnalisée

## Introduction

Avalanche prend en charge la création de blockchains avec des machines virtuelles dans des sous-réseaux. Dans ce tutoriel, nous créerons une blockchain personnalisée en utilisant une machine virtuelle personnalisée \(Timestamp VM\).

Si vous voulez une blockchain qui a des capacités de X-Chain \(AVM\), consultez [Créer](../nodes-and-staking/run-avalanche-node.md) un blockchain AVM.

### Préalables

Vous aurez besoin d'un nœud d'exécution, d'un utilisateur sur le nœud et d'un certain AVAX dans l'adresse contrôlée par l'utilisateur. Tout cela est couvert dans le tutoriel [Run an Avalanche](../nodes-and-staking/run-avalanche-node.md) Nœud.

Ensuite, vous devez avoir votre nœud être un validateur sur le [réseau principal](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network). Vous pouvez trouver comment faire cela dans le tutoriel [Ajouter un](../nodes-and-staking/add-a-validator.md) validateur. Il est recommandé que vous le fassez avec les [appels de](../nodes-and-staking/add-a-validator.md#add-a-validator-with-api-calls) l'API puisque c'est ainsi que vous interagissez avec votre nœud dans le reste de ce tutoriel.

## Créer la machine virtuelle

Chaque blockchain est une instance d'une machine virtuelle. Par exemple, X-Chain est une instance d'AVM et C-Chain est l'instance d'EVM. Avalanche prend en charge la création de nouvelles blockchains \(instances\) à partir de machines virtuelles. Dans ce cas, nous utiliserons [Timestamp VM](https://github.com/ava-labs/timestampvm), qui est un plugin VM externe. Timestamp VM communiquera avec notre nœud AvalancheGo via RPC.

{% page-ref page="create-a-virtual-machine-vm.md" %}

## Créer le sous-réseau

Chaque blockchain est validé par un [sous-réseau](../../../learn/platform-overview/#subnets). Avant de créer une blockchain, vous aurez besoin d'un sous-réseau pour la valider. Vous pouvez également utiliser un sous-réseau qui existe déjà si vous avez un nombre suffisant de ses clés de contrôle.

{% page-ref page="create-a-subnet.md" %}

### Ajouter des validateurs au sous-réseau

Le sous-réseau a besoin de validateurs pour valider les blockchains.

{% page-ref page="../nodes-and-staking/add-a-validator.md" %}

### Créer les données de Genèse<a id="create-the-genesis-data"></a>

Chaque blockchain a un certain état de genèse lorsqu'il est créé. Chaque VM définit le format et les sémantiques de ses données de genèse. [TimestampVM](create-a-virtual-machine-vm.md#api) utilise les données codées CB58 comme des données de genèse. Il existe et des méthodes d'API `decode`statiques qui peuvent être utilisées pour encoder et décoder `encode`les données de chaînes. Voir l'API TimestampVM.

Générons une simple donnée de genèse pour TimestampVM :

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

## Créer la blockchain

Maintenant, créons la nouvelle blockchain. Pour le faire, nous appelons [`platform.createBlockchain`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-createblockchain). Votre appel devrait ressembler à celui ci-dessous. Vous devez changer `subnetID`au sous-réseau qui validera votre blockchain, et fournir un `username`qui contrôle un nombre suffisant de clés de contrôle du sous-réseau. Pour rappel, vous pouvez découvrir ce que sont le seuil et les clés de contrôle d'un sous-réseau en appelant [`platform.getSubnets`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getsubnets).

Rappelez-vous que nous avons utilisé `tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH`comme notre ID VM dans [Créer une machine virtuelle \(VM\).](create-a-virtual-machine-vm.md#vm-aliases)

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

La réponse contient l'ID de la transaction :

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

Après quelques secondes, la transaction pour créer notre blockchain aurait dû être acceptée et la blockchain devrait exister \(en supposant que la demande ait été bien formée, etc.\)

Pour vérifier, appelez [`platform.getBlockchains`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchains). Cela renvoie une liste de toutes les blockchains qui existent.

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"platform.getBlockchains",
    "params" :{}
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/P
```

La réponse confirme que la blockchain a été créée :

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

### Validation de la blockchain<a id="validating-blockchain"></a>

Chaque blockchain a besoin d'un ensemble de validateurs pour valider et traiter les transactions sur elle. Vous pouvez vérifier si un nœud node une blockchain donnée en appelant [`platform.getBlockchainStatus`](../../avalanchego-apis/platform-chain-p-chain-api.md#platform-getblockchainstatus)à ce nœud, en particulier :

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

Si elle répond `"Validating"`, le nœud validera la chaîne donnée. Si elle répond , la chaîne suivie par ce `"Syncing"`nœud, mais elle ne s'est pas validante. Si elle répond `"Created"`alors la chaîne existe mais elle n'est pas en train de se synchroniser. `--whitelisted-subnets=KL1e8io1Zi2kr8cTXxvi321pAzfQuUa8tmBfadqpf9K2dc2TT`Notez que pour valider ou regarder un sous-réseau, vous devez démarrer votre nœud avec un argument \(par `--whitelisted-subnets=[subnet ID goes here]`exemple\) et ajouter le nœud au jeu de validateur du sous-réseau.

Plus d'informations peuvent être trouvées dans le tutoriel [de validateur de](../nodes-and-staking/add-a-validator.md#adding-a-subnet-validator) sous-réseau.

## Interagissant avec la nouvelle blockchain<a id="interact-with-the-new-blockchain"></a>

Vous pouvez interagir avec cette nouvelle instance de la VM. Le point de fin de l'API de votre blockchain est `127.0.0.1:9650/ext/bc/sw813hGSWH8pdU9uzaYy9fCtYFfY7AjDd2c9rm64SbApnvjmk`.

Vous pouvez également alias cette ID de la chaîne avec ou tout ce que vous `timestampbc`voulez, pour des URL d'API plus simples. Plus d'informations : [admin.aliasChain](https://docs.avax.network/build/avalanchego-apis/admin-api#admin-aliaschain)

### Vérifier le bloc de Genesis

Dans la genèse, nous avons spécifié `fP1vxkpyLWnH9dD6BQA`comme les données de la genèse.

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

Comme vous pouvez le voir que notre premier bloc a `timestamp: 0`. Également l'ID parent `11111111111111111111111111111111LpoYY`\(\) est l'ID de la P-chain. décodons les données de genèse avec la méthode d'API statique de VM. Rappelez-vous que notre identifiant TimestampVM est aliasé avec `timestampvm`:

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

Nous pouvons voir les données de genèse ont la `helloworld`chaîne.

### Proposer un nouveau bloc

Nous pouvons proposer de nouveaux blocs à notre blockchain avec certaines données en elle.

Prenons d'abord les données encodées. Les blocs s'attendent à avoir des octets-32 longs. Il y a un `length`argument dans la méthode des encodages :

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

Résultat

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

Maintenant nous pouvons proposer un nouveau bloc avec les données:

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

Résultat

```javascript
{
  "jsonrpc": "2.0",
  "result": {
    "Success": true
  },
  "id": 1
}
```

Vérifions l'existence de notre bloc proposé :

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

Résultat

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

Le résultat contient le `data`champ a .`qDNkrS9xuyGmaAgdHAjbmANSvCKnK5BHvyCybJaFCAqx46Z8y` Ce sont les mêmes données que nos données proposées dans l'étape précédente.

