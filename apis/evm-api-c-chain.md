---
description: >-
  Ce document décrit l'API de la C-Chain, qui est une instance de la machine
  virtuelle Ethereum (EVM.)
---

# EVM API \(C-Chain\)

Remarque : Ethereum a sa propre notion de `networkID` et de `chainID`. Celles-ci n'ont aucun rapport avec la vue d'Avalanche sur le networkID et le chainID, et sont purement internes à la C-Chain. Sur Mainnet, la C-Chain utilise `1` et `43114` pour ces valeurs. Sur le Fuji Testnet, il utilise `1` et `43113` pour ces valeurs. `networkID` et `chainID` peuvent également être obtenus en utilisant les méthodes `net_version` et `eth_chainId` ci-dessous.

## Deploying a Smart Contract

For a tutorial on deploying a Solidity smart contract on the C-Chain, see [here.](https://docs.avax.network/v1.0/en/tutorials/deploy-a-smart-contract/)

## Méthodes

Cette API est identique à l'API de Geth, sauf qu'elle ne prend en charge que les services suivants:

* `web3_`
* `net_`
* `eth_`
* `personal_`
* `txpool_`

Vous pouvez interagir avec ces services de la même manière que vous interagissez avec Geth. Voir le [Ethereum Wiki’s JSON-RPC Documentation](https://eth.wiki/json-rpc/API) et [Geth’s JSON-RPC Documentation](https://geth.ethereum.org/docs/rpc/server) pour une description complète de cette API.

## JSON-RPC Endpoints

Pour interagir avec C-Chain \(l'instance EVM principale sur Avalanche\) :

```cpp
/ext/bc/C/rpc
```

Pour interagir avec d'autres instances de l'EVM :

```cpp
/ext/bc/blockchainID/rpc
```

où `blockchainID` est l'ID de la blockchain exécutant l'EVM.

Pour interagir avec `avax` appels RPC spécifiques

```cpp
/ext/bc/C/ava
```

## WebSocket-RPC Endpoints

Pour interagir avec C-Chain \(l'instance EVM principale sur Avalanche\) :

```cpp
/ext/bc/C/ws
```

Pour interagir avec d'autres instances de l'EVM :

```cpp
/ext/bc/blockchainID/ws
```

où `blockchainID` est l'ID de la blockchain exécutant l'EVM.

## Exemples

### Obtenir la version actuelle du client

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "web3_clientVersion",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "Athereum 1.0"
}
```

### Obtention de l'ID réseau

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "net_version",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "1"
}
```

### Obtenir l'ID de la chaîne

Pas bien documenté dans les références JSON-RPC. Voir à la place [EIP694](https://github.com/ethereum/EIPs/issues/694)

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_chainId",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xa866"
}
```

### Obtenir le numéro du bloc le plus récent

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x10f"
}
```

### Obtenir le solde d'un compte

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0x820891f8b95daf5ea7d7ce7667e6bba2dd5c5594",
        "latest"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```

### Obtenir le nonce d'un compte

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getTransactionCount",
    "params": [
        "0x820891f8b95daf5ea7d7ce7667e6bba2dd5c5594",
        "latest"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x0"
}
```

### Calculer un hachage cryptographique

Le paramètre d'entrée contient des octets hexadécimaux de longueur arbitraire. L'exemple ici utilise la chaîne de texte UTF-8 «snowstorm» convertie en octets hexadécimaux.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "web3_sha3",
    "params": [
        "0x736e6f7773746f726d"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{"jsonrpc":"2.0","id":1,}
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x627119bb8286874a15d562d32829613311a678da26ca7a6a785ec4ad85937d06"
}
```

### Création d'un nouveau compte \(clé privée générée automatiquement\)

L'EVM créera un nouveau compte en utilisant la phrase secrète `cheese` pour crypter et stocker les nouvelles informations d'identification du compte. `cheese` n'est pas la phrase de départ et ne peut pas être utilisé pour restaurer ce compte à partir de zéro. L'appel répété de cette fonction avec la même passphrase créera plusieurs comptes uniques. Gardez également à l'esprit qu'il n'y a pas d'options pour exporter les clés privées stockées dans la base de données EVM. Les utilisateurs sont encouragés à utiliser un logiciel de portefeuille à la place pour une création et une sauvegarde de compte plus sûres. Cette méthode est plus appropriée pour la création rapide de compte pour un testnet.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "personal_newAccount",
    "params": [
        "cheese"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xa64b27635c967dfe9674926bc004626163ddce97"
}
```

### Créer un nouveau compte \(en utilisant la clé privée en texte brut\)

Si la clé privée est connue à l'avance, elle peut être fournie sous forme de texte brut à charger dans la base de données du compte EVM. Pour une gestion de compte plus sécurisée, envisagez plutôt d'utiliser un logiciel d'un portefeuille. L'exemple ci-dessous charge la clé privée `0x627119bb8286874a15d562d32829613311a678da26ca7a6a785ec4ad85937d06` avec la passphrase`this is my passphrase`. Notez que le préfixe `0x` ne peut pas être inclus dans l'argument de clé privée, sinon l'EVM générera une erreur. L'exemple de réponse renvoie la clé publique associée.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "personal_importRawKey",
    "params": [
        "627119bb8286874a15d562d32829613311a678da26ca7a6a785ec4ad85937d06",
        "this is my passphrase"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x1c5b0e12e90e9c52235babad76cfccab2519bb95"
}
```

### Liste des comptes chargés dans le nœud EVM

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "personal_listAccounts",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": [
        "0xa64b27635c967dfe9674926bc004626163ddce97",
        "0x1c5b0e12e90e9c52235babad76cfccab2519bb95"
    ]
}
```

### Déverrouiller un compte

Les comptes personnels chargés directement dans l'EVM ne peuvent signer des transactions que lorsqu'ils sont dans un état déverrouillé. L'exemple ci-dessous déverrouille l'adresse de compte répertoriée pendant 60 secondes. Notez que la passphrase associée `cheese` doit être fournie pour l'autorisation.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "personal_unlockAccount",
    "params": [
        "0xa64b27635c967dfe9674926bc004626163ddce97",
        "cheese",
        60
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": true
}
```

### Signer une transaction

Cette méthode créera une transaction signée, mais ne la publiera pas automatiquement sur le réseau. Au lieu de cela, la sortie du résultat `raw` doit être utilisée avec `eth_sendRawTransaction` pour exécuter la transaction.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_signTransaction",
    "params": [{
        "from": "0xa64b27635c967dfe9674926bc004626163ddce97",
        "to": "0x1c5b0e12e90e9c52235babad76cfccab2519bb95",
        "gas": "0x5208",
        "gasPrice": "0x0",
        "nonce": "0x0",
        "value": "0x0"
    }],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "raw": "0xf8628080825208941c5b0e12e90e9c52235babad76cfccab2519bb958080830150efa0308ca8002f3df1a468eea9973d2d618eb866e2ef0a57cba4d34efb3025b70a0aa0592b7b0a803e7b70ec26dd74ab85aa71126198eff5552e5be638e6e26a455ee0",
        "tx": {
            "nonce": "0x0",
            "gasPrice": "0x0",
            "gas": "0x5208",
            "to": "0x1c5b0e12e90e9c52235babad76cfccab2519bb95",
            "value": "0x0",
            "input": "0x",
            "v": "0x150ef",
            "r": "0x308ca8002f3df1a468eea9973d2d618eb866e2ef0a57cba4d34efb3025b70a0a",
            "s": "0x592b7b0a803e7b70ec26dd74ab85aa71126198eff5552e5be638e6e26a455ee0",
            "hash": "0xda2fe3e76501e7201b1603a5d1b2e45c79240d623eeab0365aeba843a678f048"
        }
    }
}
```

### Envoyer une transaction raw

L'exemple ci-dessous montre une transaction raw publiée sur le réseau et son hachage de transaction associé.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_sendRawTransaction",
    "params": [
        "0xf8628080825208941c5b0e12e90e9c52235babad76cfccab2519bb958080830150efa0308ca8002f3df1a468eea9973d2d618eb866e2ef0a57cba4d34efb3025b70a0aa0592b7b0a803e7b70ec26dd74ab85aa71126198eff5552e5be638e6e26a455ee0"
    ]
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0xda2fe3e76501e7201b1603a5d1b2e45c79240d623eeab0365aeba843a678f048"
}
```

### Appel d'un contrat

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
        {
            "to": "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7",
            "data": "0xc92aecc4"
        },
        "latest"
    ]
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x"
}
```

### Obtenir un bloc par hachage

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByHash",
    "params": [
        "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        true
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "difficulty": "0x1",
        "extraData": "0x64616f2d686172642d666f726b47d8526faa68dca2174ea0a22994d5ca5c1f9ee77a6d6281ba81b0aaf3a972ae",
        "gasLimit": "0x5ee7167",
        "gasUsed": "0x5208",
        "hash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0100000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x5",
        "parentHash": "0xc4eb127333754eac38fbd0ef4d036fb6ba39cda0fd3600e2ff91447148f4ef07",
        "receiptsRoot": "0x056b23fbba480696b65fe5a59b8f2148a1299103c4f57df839233af2cf4ca2d2",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x29e",
        "stateRoot": "0xaf8c1c4dc0eaf6f95ff1a30d0353184e0aa415180bcc32abce9db919f7269961",
        "timestamp": "0x5ed4adf7",
        "totalDifficulty": "0x5",
        "transactions": [
            {
                "blockHash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
                "blockNumber": "0x5",
                "from": "0x572f4d80f10f663b5049f789546f25f70bb62a7f",
                "gas": "0x5208",
                "gasPrice": "0x4a817c800",
                "hash": "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7",
                "input": "0x",
                "nonce": "0x2",
                "to": "0xef820a678268b3b44f0237abb6739a6d9578b52f",
                "transactionIndex": "0x0",
                "value": "0x2c68af0bb140000",
                "v": "0x150f0",
                "r": "0x82b830674f78f2b518d82e4da67867841bbbeff1968fa07d190138da6a774681",
                "s": "0x1c50991daf54e9426b65a7f3dc958f607189dd07c8131cd9a30ed7c43e3c2df7"
            }
        ],
        "transactionsRoot": "0xac38a6987053157fea9134b9455163d4953d4902c059b8912efcb2733f0b827b",
        "uncles": []
    }
}
```

### Obtenir un bloc par numéro

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": [
        "0x5",
        true
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "difficulty": "0x1",
        "extraData": "0x64616f2d686172642d666f726b47d8526faa68dca2174ea0a22994d5ca5c1f9ee77a6d6281ba81b0aaf3a972ae",
        "gasLimit": "0x5ee7167",
        "gasUsed": "0x5208",
        "hash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "miner": "0x0100000000000000000000000000000000000000",
        "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "nonce": "0x0000000000000000",
        "number": "0x5",
        "parentHash": "0xc4eb127333754eac38fbd0ef4d036fb6ba39cda0fd3600e2ff91447148f4ef07",
        "receiptsRoot": "0x056b23fbba480696b65fe5a59b8f2148a1299103c4f57df839233af2cf4ca2d2",
        "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
        "size": "0x29e",
        "stateRoot": "0xaf8c1c4dc0eaf6f95ff1a30d0353184e0aa415180bcc32abce9db919f7269961",
        "timestamp": "0x5ed4adf7",
        "totalDifficulty": "0x5",
        "transactions": [
            {
                "blockHash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
                "blockNumber": "0x5",
                "from": "0x572f4d80f10f663b5049f789546f25f70bb62a7f",
                "gas": "0x5208",
                "gasPrice": "0x4a817c800",
                "hash": "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7",
                "input": "0x",
                "nonce": "0x2",
                "to": "0xef820a678268b3b44f0237abb6739a6d9578b52f",
                "transactionIndex": "0x0",
                "value": "0x2c68af0bb140000",
                "v": "0x150f0",
                "r": "0x82b830674f78f2b518d82e4da67867841bbbeff1968fa07d190138da6a774681",
                "s": "0x1c50991daf54e9426b65a7f3dc958f607189dd07c8131cd9a30ed7c43e3c2df7"
            }
        ],
        "transactionsRoot": "0xac38a6987053157fea9134b9455163d4953d4902c059b8912efcb2733f0b827b",
        "uncles": []
    }
}
```

#### Getting a transaction by hash <a id="getting-a-transaction-by-hash"></a>

**Exemple d'un Appel**

```text
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getTransactionByHash",
    "params": [
        "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc
```

**Exemple de Réponse**

```text
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "blockHash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        "blockNumber": "0x5",
        "from": "0x572f4d80f10f663b5049f789546f25f70bb62a7f",
        "gas": "0x5208",
        "gasPrice": "0x4a817c800",
        "hash": "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7",
        "input": "0x",
        "nonce": "0x2",
        "to": "0xef820a678268b3b44f0237abb6739a6d9578b52f",
        "transactionIndex": "0x0",
        "value": "0x2c68af0bb140000",
        "v": "0x150f0",
        "r": "0x82b830674f78f2b518d82e4da67867841bbbeff1968fa07d190138da6a774681",
        "s": "0x1c50991daf54e9426b65a7f3dc958f607189dd07c8131cd9a30ed7c43e3c2df7"
    }
}
```

### Obtenir un reçu de transaction

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "eth_getTransactionReceipt",
    "params": [
        "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7"
    ],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "blockHash": "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a",
        "blockNumber": "0x5",
        "contractAddress": null,
        "cumulativeGasUsed": "0x5208",
        "from": "0x572f4d80f10f663b5049f789546f25f70bb62a7f",
        "gasUsed": "0x5208",
        "logs": [],
        "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "status": "0x1",
        "to": "0xef820a678268b3b44f0237abb6739a6d9578b52f",
        "transactionHash": "0xd33150a3f3783f29084eee4e12098f3ef707557f8deb916677a9af68e05613b7",
        "transactionIndex": "0x0"}
}
```

### Obtenir le nombre de transactions en attente

Les transactions «Pending» seront non nulles pendant les périodes d'utilisation intensive du réseau. Les transactions «Queued» indiquent que les transactions ont été soumises avec des valeurs nonce avant la prochaine valeur attendue pour une adresse, ce qui les met en attente jusqu'à ce qu'une transaction avec la valeur nonce attendue suivante soit soumise.

**Exemple d'un Appel**

```cpp
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "txpool_status",
    "params": [],
    "id": 1
}' -H 'Content-Type: application/json' \
   -H 'cache-control: no-cache' \
   127.0.0.1:9650/ext/bc/C/rpc 
```

**Exemple de Réponse**

```cpp
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
        "pending": "0x2f",
        "queued": "0x0"
    }
}
```

