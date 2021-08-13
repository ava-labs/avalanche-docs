# Tokens autochtones d'avalanche et ARC-20s

## Qu'est-ce qu'un Token autochtone avalanche?

Un Token autochtone avalanche \(ANT\) est un jeton de cap fixe ou de cap variable créé sur la chaîne X. Ces jetons peuvent être échangés à des vitesses rapides de la foudre sur la chaîne X, ce qui profite de la performance supérieure d'un DAG sur une chaîne linéaire. Dans ce document, les Tokens autochtones avalanche n'incluent pas les jetons non fongibles \(NFTs\) créés sur la chaîne X.

## Pourquoi déplacer un ANT de la chaîne X-Chain la chaîne C?

La fonctionnalité du contrat intelligent nécessite une commande totale des transitions d'état \(transactions\). Par conséquent, les ANTs doivent être déplacés dans la chaîne C si ils doivent être utilisés dans les contrats intelligents.

## Tokens sur la chaîne C

### AVAX

AVAX joue le même rôle sur la chaîne C que l'ETH sur le réseau Ethereum . Lorsque vous créez ou appelez un contrat intelligent, vous payez les frais de transaction \(coût gaz\) avec AVAX. Vous pouvez transférer AVAX entre les comptes et envoyer AVAX à un contrat intelligent à l'aide d'outils et de bibliothèques EVM natifs.

### ANTs

Les ANT, cependant, n'ont pas de contrepartie au sein du MVE. Par conséquent, la chaîne C a certaines modifications pour soutenir la tenue des soldes ANT et le transfert des ANTs sur la chaîne C.

La chaîne C maintient un mapping \[assetID -> balance\] dans le stockage de chaque compte pour soutenir les ANTS. Ces jetons peuvent être exportés vers la chaîne X, ou ils peuvent être `utilisés` sur la chaîne C en utilisant `nativeAssetCall` et `nativeAssetBalance`. nativeAssetCall et `nativeAssetBalance` sont des contrats précompilés publiés dans la phase 2 d'Apricot qui permettent l'utilisation plus rationnelle des ANTS sur la chaîne C.

#### nativeAssetCall

Une transaction EVM est composée des champs suivants:

* **`nonce`** valeur Scalar égale au nombre de transactions envoyées par l'expéditeur.
* **`gasPrice`** Valeur Scalar égale au nombre de Wei \(1 Wei = 10^-18 AVAX\) payé par unité de gaz pour exécuter cette transaction.
* **`gasLimit`** Valeur Scalar égale à la quantité maximale de gaz qui devrait être utilisée dans l'exécution de cette transaction.
* **`à`** l'adresse 20 octets du destinataire de l'appel de message. Si la transaction crée un contrat, `à` est laissé vide.
* **`valeur`** valeur valeur Scalar de l'actif natif \(AVAX\), dans Wei \(1 Wei = 10^-18 AVAX\), à transférer au destinataire de l'appel de message ou dans le cas d'une création de contrat, en tant que dotation au contrat nouvellement créé.
* **`v, r, s`** Valeurs correspondant à la signature de la transaction.
* **`données`** Tableau octet de taille illimitée spécifiant les données d'entrée à un appel contractuel ou, si la création d'un contrat, le bytecode EVM pour le processus d'initialisation du compte.

`nativeAssetCall` est un contrat précompilé à l'adresse `0x0100`. `nativeAssetCall` permet aux utilisateurs de transférer atomiquement un actif natif à une adresse donnée et, éventuellement, de faire un appel contractuel à cette adresse. Ceci est parallèle à la façon dont une transaction normale peut envoyer la valeur à une adresse et l'appeler atomiquement cette adresse avec certaines `données`.

```text
nativeAssetCall(address addr, uint256 assetID, uint256 assetAmount, bytes memory callData) -> {ret: bytes memory}
```

Ces arguments peuvent être emballés par `abi.encodePacked(...)` dans Solidité puisqu'il n'y a qu'un argument avec la longueur variadique \(`callData`\). Les trois premiers arguments sont constants, de sorte que le contrat précompilé laisse simplement l'entrée de l'appel comme :

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

Par exemple, envoyer un ANT avec un identifiant de `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK` depuis l'adresse `0x8db97C7cecE249c2b98bDC0226Cc4C2A57BF52FC` à l'adresse `0xD1749831fbF70d88AB7b7b7ef7CD9c53D054a57`, la première convertir l'identifiant en hex, `0xec21e629d1252b3540e9d2fc174a63af081417ea6826612e96815463b8a41d7`. Suivant concaténer l'adresse qui reçoit l'ANT, l'identifiant et the et POSTER la valeur comme le param `de données` à l'adresse `0x01002` à l'aide du `eth_sendTransaction`

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

`nativeAssetBalance` est un contrat précompilé à l'adresse `0x01001`. `nativeAssetBalance` est l'équivalent ANT d'utiliser le `solde` pour obtenir le solde AVAX.

```text
nativeAssetBalance(address addr, uint256 assetID) -> {balance: uint256}
```

Ces arguments peuvent être emballés par `abi.encodePacked(...)` dans Solidité puisque tous les arguments ont une longueur constante.

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

Par exemple, pour obtenir le solde de l'adresse `0x8db97C7cecE249c2b98bDC0226Cc4C2A57BF52FC` et assetID `2nzgmhZLuVq8jc7NNu2eahkKwoJcbFWXWJCxHBVWAJEZkhquoK`, convertir d'abord of en hex, `0xec21e629d1252b3540e9d2fcd174a63af081417ea6826612e96815463b8a41d7`. Suivant concaténer l'adresse et l'identifiant et POSTER la valeur comme le param `des données` à l'adresse `0x01001` à l'aide du `eth_call`

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

Un ARC-20 est un jeton ERC-20 qui enveloppe un Token autochtone avalanche sous-jacent, similaire à la façon dont WAVAX enveloppe AVAX.

### Qu'est-ce qu'un ERC-20

Un ERC-20 est un type de jeton normalisé sur Ethereum. Il présente un ensemble standard de fonctions et d'événements qui permettent un contrat intelligent de servir de jeton sur Ethereum. Pour une explication complète, lisez la proposition originale [ici](https://eips.ethereum.org/EIPS/eip-20).

ERC-20s exposent l'interface suivante:

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

Un ERC-20 est implémenté par un contrat intelligent, ce qui signifie qu'ils maintiennent leur propre état. Autrement dit, si votre compte possède 5 d'un ERC-20 donné, les données qui donnent la propriété de votre compte sont effectivement stockées dans le contrat de ce ERC-20. Par contre, un solde ETH est conservé dans le stockage de votre propre compte.

### De ANT à ARC-20

Contrairement aux ERC-20, les Tokens autochtones avalanche \(ANTS\) sont stockés directement sur le compte qui les possède. Les ANTs peuvent être "emballés dans les contrats intelligents sur la chaîne C. Nous appelons cet actif enveloppé un ARC-20. Pour ce faire, nous ajoutons un champ `d'actif` à un contrat ERC-20 régulier afin de représenter l'actif sous-jacent que l'ARC-20 s'envoie.

En outre, le contrat ARC-20 supporte deux fonctions supplémentaires: `le retrait` et le `dépôt`. Pour mettre en œuvre cela, ARC-20 doivent utiliser les contrats précompilés : `nativeAssetCall` et `nativeAssetBalance`.

#### Équilibre du contrat / Total de l'approvisionnement

ERC-20 ont généralement un champ d'approvisionnement, mais cela peut signifier différentes choses dans le contexte d'un actif enveloppé. L'offre totale pourrait indiquer la fourniture totale de l'actif non enveloppé sur l'ensemble de la plate-forme ou le montant de l'actif dans le contrat de l'emballage.

Pour simplicité, nous utilisons l'offre totale pour indiquer l'offre totale de l'actif enveloppé dans le contrat ARC-20.

#### ARC-20 Dépôts

Afin de déposer des fonds dans un ARC-20, nous devons envoyer le contrat ARC-20 le montant du dépôt et ensuite invoquer la fonction de dépôt du contrat afin que le contrat puisse reconnaître le dépôt et mettre à jour le solde de l'appelant. Ceci est similaire à WETH \(Wrapped sur Ethereum. Avec WETH, cela peut être accompli avec un `appel` simple parce que cette méthode permet à l'appelant d'envoyer à la fois ETH et d'invoquer un contrat intelligent de façon atomique. Avec les autres ARC-20s, `nativeAssetCall` permet la même fonctionnalité pour les ANTs sur la chaîne C.

Par exemple:

* **`nonce`**: 2
* **`gasPrice`**: 225 gwei
* **`gasLimit`**: 3000
* **`à`**: `0x01002`
* **`valeur`**: 0
* **`v, r, s`**: \[Signature de la transaction\]
* **`données`**: abi.encodePacked\(arc20Adresse, assetID, abi.encodePacked\(arc20Address, abi.encodeWithSignature\("deposit\(\)"\)\)

Ce transfert `assetAmount` de `l'actif ID` à l'adresse du contrat ARC-20, puis appelle `deposit()` sur le contrat.

La fonction de dépôt utilise la valeur précédente de l'offre totale pour calculer la quantité `of` qu'il a reçue dans le dépôt.

Note: le solde du contrat `contract's` peut devenir hors synchronisé avec la fourniture totale si quelqu'un envoie des fonds au contrat sans appeler `deposit()`. Dans ce cas, le prochain compte qui appelle `deposit()` recevrait le crédit pour les fonds précédemment envoyés.

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

#### ARC-20 Retraits

Lorsqu'un contrat ARC-20 reçoit une demande de retrait, il vérifie simplement qu'il y a un solde de compte suffisant, actualise le solde et l'offre totale, et envoie les fonds au request, avec `nativeAssetCall`. La fonction de retrait ARC-20 ressemble à ceci :

```go
    function withdraw(uint256 value) public {
        require(_balances[msg.sender] >= value, "Insufficient funds for withdrawal");

        _balances[msg.sender] -= value;
        _totalSupply -= value;

        NativeAssets.assetCall(msg.sender, _assetID, value, "");
        emit Withdrawal(msg.sender, value);
    }
```

