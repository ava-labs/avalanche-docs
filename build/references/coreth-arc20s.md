# Tokens autochtones d'Avalanche et ARC-20s

## Qu'est-ce qu'un jeton autochtone d'Avalanche ?

Un jeton natif d'Avalanche \(ANT\) est un jeton de capuche fixe ou de type variable, créé sur la X-Chain. Ces jetons peuvent être échangés à des vitesses rapides en foudre sur la X-Chain, qui profite de la performance supérieure d'un DAG sur une chaîne linéaire. Dans ce document, les jetons natifs d'Avalanche ne comprennent pas les jetons non fongibles \(NFT\) créés sur la X-Chain.

## Pourquoi déplacer un ANT de la X-Chain vers la C-Chain ?

La fonctionnalité du contrat intelligent nécessite une commande totale de transitions d'État \(transactions\). En conséquence, les ANTs doivent être déplacés vers la C-Chain si ils doivent être utilisés dans des contrats intelligents.

## Jetons sur la C-Chain

### AVAX

AVAX joue le même rôle sur la C-Chain que l'ETH fait sur le réseau Ethereum. Lorsque vous créez ou appelez un contrat intelligent, vous payez les frais de transaction \(coût du gaz\) avec AVAX. Vous pouvez transférer AVAX entre les comptes et envoyer AVAX à un contrat intelligent en utilisant les outils et les bibliothèques EVM natives.

### ANTS

Les ANT, cependant, n'ont pas de contrepartie au sein du MVE. Par conséquent, la C-Chain a quelques modifications pour soutenir la tenue de soldes ANT et le transfert d'ANT.

La C-Chain conserve un solde de mapping [assetID -> d'un compte] dans le stockage de chaque compte, pour prendre en charge les ANT. Ces jetons peuvent être exportés vers la X-Chain, ou ils peuvent être utilisés sur la C-Chain en utilisant `nativeAssetCall`et . `nativeAssetBalance``nativeAssetCall`et `nativeAssetBalance`sont des contrats précompilés publiés dans la phase 2 d'Apricot qui permettent une utilisation plus riche des ANTs sur la C-Chain.

#### nativeAssetCall

Une transaction EVM est composée des champs suivants :

* **`nonce`**La valeur scalar est égale au nombre de transactions envoyées par l'expéditeur.
* **`gasPrice`**La valeur scalar est égale au nombre de Wei \(1 Wei = 10^-18 AVAX\) payé par unité de gaz pour exécuter cette transaction.
* **`gasLimit`**La valeur scalar est égale à la quantité maximale de gaz qui devrait être utilisée pour exécuter cette transaction.
* **`to`**L'adresse de 20 octets du destinataire de l'appel de message. Si la transaction crée un contrat, `to`est laissé vide.
* **`value`**Valeur scalaire d'actif natif \(AVAX\), dans Wei \(1 Wei = 10^-18 AVAX\), à transférer au destinataire de l'appel au message ou dans le cas d'une création de contrat, en tant que dotation au contrat nouvellement créé.
* **`v, r, s`**Valeurs correspondant à la signature de la transaction.
* **`data`**Un tableau d'octets de taille illimitée spécifiant les données d'entrée dans un appel à contrat ou, si la création d'un contrat, le bytecode EVM pour le processus d'initialisation du compte.

`nativeAssetCall`est un contrat précompilé à l'adresse. `0x0100000000000000000000000000000000000002``nativeAssetCall`permet aux utilisateurs de transférer un actif natif sur une adresse donnée et de faire un appel à contrat à cette adresse. Ceci est parallèle à la façon dont une transaction normale peut envoyer une valeur à une adresse et appeler atomiquement cette adresse avec certains `data`.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

`abi.encodePacked(...)`Ces arguments peuvent être emballés dans Solidity car il n'y a qu'un seul argument avec la longueur variadique `callData`\(\). Les trois premiers arguments sont de longueur constante, de sorte que le contrat précompilé ne fait que parer les entrées d'appel en tant que :

```text
+-------------+---------------+--------------------------------+
| address     : address       |                       20 bytes |
+-------------+---------------+--------------------------------+
| assetID     : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| assetAmount : uint256       |                       32 bytes |
+-------------+---------------+--------------------------------+
| callData    : bytes memory  |            len(callData) bytes |
+-------------+---------------+--------------------------------+
                              |       84 + len(callData) bytes |
                              +--------------------------------+
```

**Exemple**

`2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`Par exemple, pour envoyer un ANT avec un identifiant d'adresse `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`à l'adresse , convertir `0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57`d'abord l'identifiant d'actif en hex, .`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` Suivant concaténer l'adresse qui reçoit l'ANT, l'actif et the et POST la valeur en tant que `data`param à `0x0100000000000000000000000000000000000002`l'adresse en utilisant le `eth_sendTransaction`RPC.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_sendTransaction",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000002",
            "from": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC",
            "value": "",
            "gas": "0x2DC6C0",
            "gasPrice": "0x34630B8A00",
            "data": "0xDd1749831fbF70d88AB7bB07ef7CD9c53D054a57ec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7000000000000000000000000000000000000000000000000000000000000012c"
        }
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x451ffb79936be1baba438b591781192cbc9659d1f3a693a7a434b4a93dda639f"
}
```

#### nativeAssetBalance

`nativeAssetBalance``0x0100000000000000000000000000000000000001``nativeAssetBalance`est un contrat précompilé à l'adresse. L'équivalent d'ANT d'utiliser pour `balance`obtenir le solde d'AVAX.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

`abi.encodePacked(...)`Ces arguments peuvent être emballés dans Solidity puisque tous les arguments ont une longueur constante.

```text
+-------------+---------------+-----------------+
| address     : address       |        20 bytes |
+-------------+---------------+-----------------+
| assetID     : uint256       |        32 bytes |
+-------------+---------------+-----------------+
                              |        52 bytes |
                              +-----------------+
```

**Exemple**

Par exemple, pour obtenir le solde d'adresse `0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC`et of , convertir `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`d'abord of en hex, , .`0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7` Suivant concaténer l'adresse et l'identifiant et POSTEZ la valeur en tant que `data`param à `0x0100000000000000000000000000000000000001`l'adresse en utilisant le `eth_call`RPC.

```text
curl --location --request POST 'https://api.avax.network:443/ext/bc/C/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "jsonrpc": "2.0",
    "method": "eth_call",
    "params": [
        {
            "to": "0x0100000000000000000000000000000000000001",
            "data": "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FCec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7"
        },
        "latest"
    ]
}'
{
    "jsonrpc": "2.0",
    "id": 1,
    "result": "0x000000000000000000000000000000000000000000000000000000000000012c"
}
```

## ARC-20s

Un ARC-20 est un jeton ERC-20 qui enveloppe un jeton autochtone Avalanche sous-jacent, similaire à la façon dont WAVAX enroule AVAX.

### Qu'est-ce que l'ERC-20

Un ERC-20 est un type de jeton normalisé sur Ethereum. Il présente un ensemble de fonctions et d'événements standard qui permettent à un contrat intelligent de servir de jeton sur Ethereum. Pour une explication complète, lisez la proposition originale [ici](https://eips.ethereum.org/EIPS/eip-20).

ERC-20 exposent l'interface suivante:

```text
// Functions
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transferFrom(address _from, address _to, uint256 _value) public returns (bool success)
function approve(address _spender, uint256 _value) public returns (bool success)
function allowance(address _owner, address _spender) public view returns (uint256 remaining)

// Events
event Transfer(address indexed _from, address indexed _to, uint256 _value)
event Approval(address indexed _owner, address indexed _spender, uint256 _value)
```

Un ERC-20 est mis en œuvre par un contrat intelligent, ce qui signifie qu'ils maintiennent leur propre état. Autrement dit, si votre compte possède 5 d'un ERC-20 donné, les données qui donne la propriété de votre compte sont en fait stockées dans le contrat de ce dernier. En revanche, un solde ETH est conservé dans le stockage de votre propre compte.

### De ANT à ARC-20

Contrairement aux ERC-20, les jetons indigènes d'Avalanche \(ANT\) sont stockés directement sur le compte qui les possède. Les ANTs peuvent être "enroulés" afin de les rendre utilisables dans des contrats intelligents sur la C-Chain. Nous appelons cet actif enveloppé un ARC-20. Pour ce faire, nous ajoutons un `assetID`champ à un contrat ERC-20 régulier pour représenter l'actif sous-jacent que l'ARC-20 s'enroule.

En outre, le contrat ARC-20 prend en charge deux fonctions supplémentaires : `withdraw`et .`deposit` Pour mettre en œuvre cela, les CD-20 doivent utiliser les contrats précompilés : `nativeAssetCall`et .`nativeAssetBalance`

#### Balance des contrats / Total des approvisionnements

Les ERC-20 ont généralement un champ d'approvisionnement total, mais cela peut signifier différentes choses dans le contexte d'un actif enveloppé. L'offre totale pourrait indiquer l'offre totale de l'actif non enveloppé sur l'ensemble de la plateforme ou le montant de l'actif dans le contrat de l'emballage.

Pour simplicité, nous utilisons l'offre totale pour indiquer l'offre totale de l'actif enveloppé dans le contrat ARC-20.

#### ARC-20

Afin de déposer des fonds dans un ARC-20, nous devons envoyer le contrat ARC-20 le montant du dépôt, puis invoquer la fonction de dépôt du contrat afin que le contrat puisse reconnaître le dépôt et mettre à jour le solde de l'appelant. Ceci est similaire à WETH \(Wrappé ETH\) sur Ethereum. Avec WETH, cela peut être accompli avec une simple `call`parce que cette méthode permet à l'appelant d'envoyer à la fois ETH et d'invoquer un contrat intelligent de manière atomique. Avec les ARC-20s non AVAX, `nativeAssetCall`permet la même fonctionnalité pour les ANTs sur la C-Chain.

Par exemple:

* **`nonce`**:
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 3000
* **`to`**:`0x0100000000000000000000000000000000000002`
* **`value`**:
* **`v, r, s`**: [Signature de la transaction]
* **`data`**: abi.encodePacked\(arc20Address, assetID, abi.encodePacked\(arc20Address, abi.encodeWithSignature\("deposit\(\)"\)\)

`deposit()`Cette cession de `assetID`à l'adresse du contrat ARC-20 et puis `assetAmount`l'appel au contrat.

La fonction de dépôt utilise la valeur précédente de l'offre totale pour calculer la quantité de `assetID`celle-ci a reçu dans le dépôt.

Remarque : le solde du contrat `assetID`peut devenir hors de synchronisation avec l'offre totale si quelqu'un envoie des fonds au contrat sans appel .`deposit()` Dans ce cas, le prochain compte qui les appels `deposit()`recevrait un crédit pour les fonds envoyés précédemment.

```go
    function deposit() public {
        uint256 updatedBalance = NativeAssets.assetBalance(address(this), _assetID);
        uint256 depositAmount = updatedBalance - _totalSupply;
        assert(depositAmount >= 0);

        _balances[msg.sender] += depositAmount;
        _totalSupply = updatedBalance;
        emit Deposit(msg.sender, depositAmount);
    }
```

#### ARC-20

Lorsqu'un contrat ARC-20 reçoit une demande de retrait, il vérifie simplement qu'il y a un solde de compte suffisant, met à jour le solde et l'offre totale, et envoie les fonds au retrait, avec `nativeAssetCall`. La fonction de retrait des ARC-20 ressemble à ceci :

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

