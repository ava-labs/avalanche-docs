# Exécuter un nœud avalanche

La façon la plus rapide d'apprendre sur Avalanche est d'exécuter un noeud et d'interagir avec le réseau.

{% embêtent url="https://youtu.be/c\_SjtCiOFdg" caption="" %}

Dans ce tutoriel \(heure est: 10 minutes\), nous allons :

* Installer et exécuter un noeud Avalanche
* Connectez-vous à Avalanche
* Envoyer AVAX
* Ajoutez votre noeud à l'ensemble de validation

{% allusion style="warning" %} Si votre problème n'est pas abordé dans la FAQ, venez demander de l'aide dans la [Discorde](https://chat.avax.network) d'avalanche! Nous allons travailler à vous faire traverser tous les obstacles. {% endhint %}

{% allusion style="info" %} Si vous êtes intéressé à utiliser un service tiers pour héberger votre noeud ou exécuter un validant, [vérifiez les options](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services). {% endhint %}

Ce tutoriel est principalement destiné aux développeurs et aux personnes intéressées par le fonctionnement de la Plateforme Avalanche. Si vous êtes juste intéressé à configurer un nœud pour la mise en œuvre, vous pouvez vouloir suivre le [nœud Configuration Avalanche avec](set-up-node-with-installer.md) tutoriel installateur à la place. L'installateur automatise le processus d'installation et le configure comme un service système, qui est recommandé pour l'opération sans surveillance. Vous pouvez également essayer les choses en suivant ce tutoriel d'abord, puis configurer le noeud en utilisant l'installateur comme solution permanente.

## Exigences minimales

Avalanche est un protocole incroyablement léger, de sorte que les exigences minimales de l'ordinateur sont assez modestes. Notez que lorsque l'utilisation du réseau augmente, les exigences matérielles peuvent changer.

* Matériel: CPU > 2 GHz, RAM > 4 GB, Stockage > 200 GB espace libre
* OS: Ubuntu 18.04/20.04 ou MacOS >= Catalina

## Exécuter un nœud d'avalanche et envoyer des fonds

Installons, la mise en œuvre Go d'un nœud Avalanche, et connectez-vous au test public Avalanche.

### Télécharger AvalancheGo

Le noeud est un programme binaire. Vous pouvez soit télécharger le code source puis construire le programme binaire, ou vous pouvez télécharger le binaire pré-construit. Vous n'avez pas besoin de faire les deux.

Téléchargement [de la binaire pré-construit](run-avalanche-node.md#binary) est plus facile et recommandé si vous cherchez juste à exécuter votre propre noeud et piquer dessus.

Construire le noeud à partir de la source est recommandé si vous êtes un développeur qui cherche à expérimenter et à construire sur Avalanche.

#### **Code source**

Si vous voulez construire le noeud à partir de la source, vous allez d'abord avoir besoin d'installer Go 1.15.5 ou ultérieurement. Suivez les instructions [ici](https://golang.org/doc/install).

`Exécuter la version`. **Il devrait être 1.15.5 ou plus.** `Exécuter l'écho $GOPATH`. **Il ne devrait pas être vide.**

Téléchargez le dépôt AvalancheGo :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Note aux utilisateurs avancés: AvalancheGo utilise les modules Go afin que vous puissiez cloner le [dépôt](https://github.com/ava-labs/avalanchego) AvalancheGo vers des emplacements autres que votre GOPATH.

Changement au répertoire `avalanchego`:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construire AvalancheGo:

```cpp
./scripts/build.sh
```

Le binaire, nommé `avalanchego`, est dans `avalanchego/build`.

#### **Binaire**

Si vous voulez télécharger un binaire préconstruit au lieu de la construire vous-même, allez à notre [page de](https://github.com/ava-labs/avalanchego/releases) libérations, et sélectionnez la version que vous voulez \(probablement la dernière fois. \)

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS: Téléchargement: `avalanchego-macos-<VERSION>.zip`   Unzip : `unzip avalanchego-macos-<VERSION>.zip` Le dossier résultant, `avalanchego-<VERSION>`, contient les binaires.

Pour Linux sur les PC ou les fournisseurs de cloud: Téléchargement: `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

Pour Linux sur RaspberryPi4 ou ordinateurs compatibles 84: Téléchargement: `avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `goudron -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

### Démarrer un nœud et se connecter à Avalanche

Si vous avez construit à partir de la source:

```cpp
./build/avalanchego
```

Si vous utilisez les binaires préconstruits sur MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires préconstruits sur Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Lorsque le noeud démarre, il doit bootstrap \(rattraper le reste du réseau\). Vous verrez des journaux sur le bootstraping. Lorsqu'une chaîne donnée est faite bootstrapping, il imprimera un journal comme ceci:

`INFO [06-07|19:54:06] <X Chaîne> /snow/engine/avalanche/transitive.go#80: bootstrapping terminé avec 1 sommets à la frontière acceptée`

Pour vérifier si une chaîne donnée est effectuée bootstrapping, dans une autre fenêtre de terminal appel [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped) en copiant et en collant la commande suivante:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si cela retourne `vrai`, la chaîne est bootstrapped. Si vous faites un appel API à une chaîne qui n'est pas fait bootstrapping, il retournera `appel API rejeté parce que la chaîne` n'est pas fait bootstrapping. Si votre noeud ne termine jamais le bootstrapping, suivez [cette FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si vous rencontrez toujours des problèmes, veuillez nous contacter sur [Discord.](https://chat.avalabs.org/)

Votre noeud est en cours de fonctionnement et connecté maintenant. Si vous souhaitez utiliser votre noeud comme un validateur sur le réseau principal, consultez [ce tutoriel](add-a-validator.md#add-a-validator-with-avalanche-wallet) pour découvrir comment ajouter votre noeud comme un validateur à l'aide du portefeuille web.

Vous pouvez utiliser `Ctrl + C` pour tuer le nœud.

Si vous voulez expérimenter et jouer avec votre nœud, lisez-le.

Pour pouvoir effectuer des appels API vers votre noeud depuis d'autres machines, lors du démarrage du noeud inclure l'argument `--http-host=``` \(e.g. --http-host=\)

Pour se connecter au Fuji Testnet au lieu du réseau principal, utilisez l'argument `--network-id=fuji`. Vous pouvez obtenir des fonds sur le Testnet depuis le [robinet.](https://faucet.avax-test.network/)

### Créer un utilisateur Keystore

Les nœuds avalanches fournissent une **Keystore** intégrée. Le Keystore gère les utilisateurs et est beaucoup comme un [portefeuille](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un utilisateur est une identité protégée par mot de passe qu'un client peut utiliser lors d'interaction avec les chaînes de blocage. **Vous devez uniquement créer un utilisateur de frappe sur un noeud que vous exploitez, puisque l'opérateur de noeud a accès à votre mot de passe plaintext** Pour créer un utilisateur, appelez [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

```cpp
curl -X POST --data '{
     "jsonrpc": "2.0",
     "id": 1,
     "method": "keystore.createUser",
     "params": {
         "username": "YOUR USERNAME HERE",
         "password": "YOUR PASSWORD HERE"
     }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

La réponse devrait être:

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Maintenant, vous avez un utilisateur sur ce nœud. Les données Keystore existent au niveau du nœud. Les utilisateurs que vous créez sur un nœud Keystore n'existent pas sur d'autres nœuds, mais vous pouvez import/exporter les utilisateurs à/depuis la Keystore. Consultez [l'API Keystore](../../avalanchego-apis/keystore-api.md) pour voir comment.

{% allusion style="danger,%} **Vous devez seulement conserver une petite quantité de vos fonds sur votre nœud.** La plupart de vos fonds devraient être garantis par un mnémonique qui n'est pas enregistré sur aucun ordinateur. {% endhint %}

### Créer une adresse

Avalanche est une plate-forme de blocs hétérogènes, dont l'une est la [chaîne](../../../learn/platform-overview/#exchange-chain-x-chain) blockchains, qui agit comme une plate-forme décentralisée pour la création et le trading d'actifs numériques. Nous allons maintenant créer une adresse pour tenir AVAX notre nœud.

Pour créer une nouvelle adresse sur la chaîne X, appelez [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), une méthode de [l'API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de la chaîne X:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :2,
    "method" :"avm.createAddress",
    "params" :{
        "username":"YOUR USERNAME HERE",
        "password":"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Si votre noeud n'est pas terminé bootstrapping, cet appel retournera l'état `503` avec l'appel de l'API message `rejeté parce que la chaîne n'est pas fait` bootstrapping.

Notez que nous faisons cette demande à `127.0.0.1:9650/ext/bc/X`. La portion `bc/X` signifie que la demande est envoyée à la blockchain dont l'ID \(ou alias\) est `X` \(c'est-à-dire la chaîne X-Chain\).

La réponse devrait ressembler à ceci:

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Votre utilisateur contrôle maintenant l'adresse `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` sur la chaîne X-Chain. Pour distinguer les adresses sur différentes chaînes, la convention Avalanche est pour une adresse d'inclure l'ID ou les alias de la chaîne qu'il existe sur. Par conséquent, cette adresse commence `X-`, indiquant qu'elle existe sur la chaîne X.

### Envoyer des fonds de Portefeuille Avalanche à votre Node

{% allusion style="warning" %} _**Note: les instructions ci-dessous déplacent les fonds réels.**_ {% endhint %}

Déménagement des fonds du portefeuille Avalanche à votre nœud.

Aller à [Avalanche Wallet](https://wallet.avax.network). Cliquez `sur Portefeuille d'accès`, puis `Phrase clé Mnémonique`. Entrez votre phrase mnémonique.

Cliquez sur l'onglet `Envoyer` à gauche. Pour la quantité, sélectionner, `.002` AVAX. Entrez l'adresse de votre nœud, puis cliquez `sur Confirmer`.

![web portefeuille envoyer onglet](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

Nous pouvons vérifier le solde d'une adresse d'un actif donné en appelant `avm.getBalance`, une autre méthode de l'API de la chaîne X. Vérifions que le transfert a été effectué:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :3,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

Notez que AVAX a l'ID spécial `AVAX`. Habituellement, un identifiant d'actif est une chaîne alphanumérique.

La réponse devrait indiquer que nous avons `200nAVAX` ou `0.002AVAX`.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :3,
    "result" :{
        "balance":2000000,
        "utxoIDs": [
            {
                "txID": "x6vR85YPNRf5phpLAEC7Sd6Tq2PXWRt3AAHAK4BpjxyjRyhtu",
                "outputIndex": 0
            }
        ]
    }
}
```

### Envoyer AVAX

Maintenant, envoyons un certain AVAX en faisant un appel API à notre nœud :

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :5,
    "method" :"avm.send",
    "params" :{
        "assetID"    :"AVAX",
        "amount"     :1000,
        "to"         :"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8",
        "username"   :"YOUR USERNAME HERE",
        "password"   :"YOUR PASSWORD HERE"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

`amount` spécifie le nombre de nAVAX à envoyer.

Si vous voulez spécifier une adresse particulière où le changement devrait aller, vous pouvez la spécifier dans le `changeAddr`. Vous pouvez quitter ce champ vide; si vous le faites, tout changement ira à l'une des adresses de vos commandes utilisateur.

Afin d'éviter les spams, Avalanche nécessite le paiement d'une taxe de transaction. Les frais de transaction seront automatiquement déduits d'une adresse contrôlée par votre utilisateur lors de la délivrance d'une transaction. Gardez cela à l'esprit lorsque vous vérifiez les soldes ci-dessous.

{% page-ref page=".. /.. /../learn/platform-overview/transaction-fees.md" %}

Lorsque vous envoyez cette demande, le noeud vous authentifiera à l'aide de votre nom d'utilisateur et mot de passe. Puis, il va regarder à travers toutes les [clés privées](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) contrôlées par votre utilisateur jusqu'à ce qu'il trouve suffisamment Then, satisfaire la demande.

La réponse contient l'ID de la transaction. Il sera différent pour chaque invocation de `l'envoi`.

```cpp
{
    "jsonrpc":"2.0",
    "id"     :5,
    "result" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD",
        "changeAddr" :"X-avax1turszjwn05lflpewurw96rfrd3h6x8flgs5uf8"
    }
}
```

#### Vérification du statut de la transaction

Cette transaction ne prendra qu'une seconde ou deux pour finaliser. Nous pouvons vérifier son statut avec [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :6,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"2QouvFWUbjuySRxeX5xMbNCuAaKWfbk5FeEa2JmoF85RKLk2dD"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse devrait indiquer que la transaction a été acceptée:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pourriez également voir que `le statut` est `Traitement` si le réseau n'a pas encore finalisé la transaction.

Une fois que vous voyez que la transaction est acceptée, vérifiez le solde `de` l'adresse pour voir qu'elle a `Accepted`, nous avons envoyé:

```cpp
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :7,
    "method" :"avm.getBalance",
    "params" :{
        "address":"X-avax1w4nt49gyv4e99ldqevy50l2kz55y9efghep0cs",
        "assetID"  :"AVAX"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

La réponse devrait être:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

De la même façon, nous pourrions vérifier `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` pour voir que we avons envoyé a été déduit de son solde, ainsi que des frais de transaction.

{% page-ref page="add-a-validator.md" %}

{% page-ref page=".. /../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page-ref %}

{% page-ref page-ref %}

{% page-ref page-ref %}

{% page-ref page=".. /./avalanchego-apis/" %}

{% page-ref page=".. /../references/" %}

