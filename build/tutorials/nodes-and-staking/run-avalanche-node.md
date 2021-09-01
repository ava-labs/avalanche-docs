# Exécuter un nœud d'Avalanche

La manière la plus rapide d'en apprendre davantage sur Avalanche est de faire fonctionner un nœud et d'interagir avec le réseau.

{% embed url="https://youtu.be/c_SjtCiOFdg" caption="" %}

Dans ce tutoriel \(heure est : 10 minutes\), nous allons :

* Installer et exécuter un nœud Avalanche
* Connecter à Avalanche
* Envoyer AVAX
* Ajouter votre nœud à l'ensemble de validateur

{% hint style="warning" %}Si votre problème n'est pas abordé dans la FAQ, demandez de l'aide dans la [discorde d'Avalanche !](https://chat.avax.network) Nous travaillerons à vous faire traverser tous les obstacles.{% endhint %}

{% hint style="info" %}Si vous souhaitez utiliser un service tiers pour héberger votre nœud ou exécuter un validateur, [vérifiez les options](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services){% endhint %}

Ce tutoriel est principalement destiné aux développeurs et aux personnes intéressées par le fonctionnement de la plateforme Avalanche. Si vous êtes simplement intéressé par la création d'un nœud pour le staking, vous pouvez suivre le [nœud d'Avalanche de you're avec](set-up-node-with-installer.md) le tutoriel d'installateur. L'installateur automatise le processus d'installation et le met en place comme un service de système, qui est recommandé pour une exploitation sans surveillance. Vous pouvez également essayer les choses en suivant ce tutoriel d'abord, puis configurer le nœud en utilisant l'installateur comme une solution permanente.

## Exigences

Avalanche est un protocole incroyablement léger, de sorte que les nœuds peuvent fonctionner sur le matériel de marchandise. Notez que lorsque l'utilisation du réseau augmente, les exigences matérielles peuvent changer.

* CPU: Équivalent de 8 AWS vCPU
* RAM : 16 GB
* Stockage: 200 GB
* OS : Ubuntu 18.04/20.04 ou MacOS >= Catalina

## Exécuter un nœud d'Avalanche et envoyer des fonds

Installons AvalancheGo, la mise en œuvre d'un nœud Avalanche et connectons à l'Avalanche Public Testnet.

### Télécharger AvalancheGo

Le nœud est un programme binaire. Vous pouvez soit télécharger le code source et puis construire le programme binaire, soit vous pouvez télécharger le binaire, avant qu'il ne soit construit. Vous n'avez pas besoin de faire les deux.

Le téléchargement du [binaire pré-construit](run-avalanche-node.md#binary) est plus facile et recommandé si vous cherchez à exécuter votre propre nœud et à le piquer.

Construire le nœud de la source est recommandé si vous êtes un développeur qui cherche à expérimenter et à construire sur Avalanche.

#### **Code source**

Si vous souhaitez construire le nœud de la source, vous devrez d'abord installer Go 1.15.5 ou plus tard. Suivez les instructions [ici](https://golang.org/doc/install).

Exécuter `go version`.** Il devrait être 1.15.5 ou plus.** Exécuter `echo $GOPATH`.** Elle ne devrait pas être vide.**

Téléchargez le référentiel the :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Note aux utilisateurs avancés : AvalancheGo utilise des modules Go pour cloner le [dépôt](https://github.com/ava-labs/avalanchego) AvalancheGo sur des emplacements autres que votre GOPATH.

Changer le répertoire `avalanchego`:

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construire AvalancheGo:

```cpp
./scripts/build.sh
```

Le binaire, nommé `avalanchego`, est en `avalanchego/build`.

#### **Binaire**

Si vous souhaitez télécharger un binaire pré-construit au lieu de la construire vous-même, accédez à notre [page](https://github.com/ava-labs/avalanchego/releases) de libérations, et sélectionnez la version que vous voulez \(probablement la dernière fois\).

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS: Télécharger:`avalanchego-macos-<VERSION>.zip`   Unzip : `unzip avalanchego-macos-<VERSION>.zip`Le dossier résultant, `avalanchego-<VERSION>`contient les binaires.

Pour Linux sur les PC ou les fournisseurs de cloud : Télécharger:`avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip :`tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`contient les binaires.

Pour Linux sur les ordinateurs RaspberryPi4 ou sur des ordinateurs basés sur Arm64 similaires : Télécharger:`avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip :`tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   Le dossier résultant, `avalanchego-<VERSION>-linux`contient les binaires.

### Démarrez un nœud, et se connecter à Avalanche

Si vous avez construit à partir de la source:

```cpp
./build/avalanchego
```

Si vous utilisez les binaires pré-construits sur MacOS, si vous utilisez les binaires suivants :

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires pré-construits sur Linux :

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Lorsque le nœud démarre, il doit bootstrap \(rattraper le reste du réseau\). Vous verrez des journaux sur le bootstrapping. Lorsqu'une chaîne donnée est terminée, il imprimera un journal comme ceci :

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Pour vérifier si une chaîne donnée est fait le bootstrapping, dans une autre appel de fenêtre de terminal en copiant et [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped)en collant la commande suivante :

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

Si cela revient `true`, la chaîne est bootstrapped. Si vous faites un appel API sur une chaîne qui n'est pas fait le bootstrapping, il reviendra `API call rejected because chain is not done bootstrapping`. Si votre nœud ne termine jamais le bootstrapping, suivez [cette FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si vous rencontrez des problèmes, veuillez nous contacter sur [Discord.](https://chat.avalabs.org/)

Votre nœud est en cours de fonctionnement et est connecté maintenant. Si vous souhaitez utiliser votre nœud comme validateur sur le réseau principal, consultez [ce tutoriel](add-a-validator.md#add-a-validator-with-avalanche-wallet) pour savoir comment ajouter votre nœud en tant que validateur en utilisant le portefeuille web.

Vous pouvez utiliser pour tuer le `Ctrl + C`nœud.

Si vous voulez expérimenter et jouer avec votre nœud, lisez sur.

Pour pouvoir faire des appels API sur votre nœud d'autres machines, lors du démarrage du nœud inclure un argument \(par `--http-host=`ex.\)`./build/avalanchego --http-host=`

Pour se connecter au Fuji Testnet au lieu du réseau principal, utilisez l'argument `--network-id=fuji`. Vous pouvez obtenir des fonds sur le Testnet depuis le [robinet.](https://faucet.avax-test.network/)

### Créer un utilisateur de Keystore

Les nœuds Avalanche fournissent un Keystore **intégré.** The Keystore gère les utilisateurs et est beaucoup comme un [portefeuille](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un utilisateur est une identité protégée par un mot de passe que un client peut utiliser lors de l'interaction avec les blockchains.** Vous ne devez créer qu'un utilisateur de frappes sur un nœud que vous exploitez, car l'opérateur de nœuds a accès à votre mot de passe en texte.** Pour créer un utilisateur, appelez [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

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

La réponse devrait être :

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Maintenant, vous avez un utilisateur sur ce nœud. Les données de Keystore existent au niveau des nœuds. Les utilisateurs que vous créez sur un nœud de Keystore n'existent pas sur d'autres nœuds, mais vous pouvez importer/exporter les utilisateurs vers ou depuis la Keystore. Consultez [l'API Keystore](../../avalanchego-apis/keystore-api.md) pour voir comment.

{% hint style="danger" %}**Vous ne devez conserver qu'une petite quantité de vos fonds sur votre nœud.** La plupart de vos fonds doivent être sécurisés par un mnemonic qui n'est pas enregistré sur un ordinateur.{% endhint %}

### Créer une adresse

Avalanche est une plateforme de blockchains hétérogènes, dont l'une est la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), qui agit comme une plateforme décentralisée pour créer et trader des actifs numériques. Nous allons maintenant créer une adresse pour tenir AVAX sur notre nœud.

Pour créer une nouvelle adresse sur la X-Chain, appelez [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), une méthode de [l'API](../../avalanchego-apis/exchange-chain-x-chain-api.md) de X-Chain:

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

Si votre nœud n'est pas terminé le bootstrapping, cet appel retournera l'état `503`avec le message .`API call rejected because chain is not done bootstrapping`

Notez que nous faisons cette demande à `127.0.0.1:9650/ext/bc/X`. La `bc/X`partie signifie que la demande est envoyée à la blockchain dont l'ID \(ou alias\) est `X`\(c'est-à-dire la X-Chain\).

La réponse devrait ressembler à ce qui suit :

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Votre utilisateur contrôle maintenant l'adresse `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`sur la X-Chain. Pour dire séparément les adresses sur différentes chaînes, la convention d'Avalanche est pour une adresse d'inclure l'ID ou les alias de la chaîne sur laquelle il existe Par conséquent, cette adresse commence `X-`, en indiquant qu'elle existe sur la X-Chain.

### Envoyer des fonds de Avalanche Wallet à votre nœud

{% hint style="warning" %}Remarque _**: les instructions ci-dessous déplacent des fonds réels.**_{% endhint %}

Déplacons des fonds de l'Avalanche Wallet vers votre nœud.

Aller à [Avalanche Wallet](https://wallet.avax.network). Cliquez sur `Access Wallet`, puis `Mnemonic Key Phrase`. Entrez votre phrase mnemonique.

Cliquez sur `Send`l'onglet sur la gauche. Pour le montant, sélectionner, `.002`AVAX. Entrez l'adresse de votre nœud, puis cliquez sur `Confirm`.

![web wallet envoyer l'onglet](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%2819%29.png)

Nous pouvons vérifier le solde d'une adresse d'un actif donné en appelant `avm.getBalance`, une autre méthode de l'API de X-Chain. Vérifiez que le transfert a été traversé:

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

Notez que AVAX a l'ID spécial `AVAX`. Habituellement, un ID d'actif est une chaîne alphanumérique.

La réponse devrait indiquer que nous avons `2,000,000 nAVAX`ou .`0.002 AVAX`

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

Maintenant, envoyons un certain AVAX en faisant un appel d'API à notre nœud :

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

`amount`spécifie le nombre de nAVAX à envoyer.

Si vous voulez spécifier une adresse particulière où le changement doit aller, vous pouvez la spécifier dans `changeAddr`. Vous pouvez laisser ce champ vide ; si vous le faites, tout changement ira à l'une des adresses de vos commandes d'utilisateurs.

Afin d'empêcher les spams, Avalanche exige le paiement d'une redevance de transaction. Les frais de transaction seront automatiquement déduits d'une adresse contrôlée par votre utilisateur lorsque vous délivrez une transaction. Gardez cela à l'esprit lorsque vous vérifiez les soldes ci-dessous.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Lorsque vous envoyez cette demande, le nœud vous authentifiera en utilisant votre nom d'utilisateur et votre mot de passe. Puis, il regardera par toutes les [clés privées](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) contrôlées par votre utilisateur jusqu'à ce qu'il trouve suffisamment d'AVAX pour satisfaire la demande.

La réponse contient l'ID de la transaction. Il sera différent pour toutes les invocations de `send`.

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

Cette transaction ne prendra qu'une deuxième ou deux pour finaliser. Nous pouvons vérifier son statut avec [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus):

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

La réponse devrait indiquer que la transaction a été acceptée :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pouvez également voir que `status`c'est `Processing`si le réseau n'a pas encore finalisé la transaction.

Une fois que vous avez constaté que la transaction est , vérifiez le solde de `to`l'adresse pour voir qu'elle a of que nous avons `Accepted`envoyé :

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

La réponse devrait être :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

De la même façon, nous pourrions vérifier si AVAX que nous avons envoyé a été déduit de son solde, ainsi que des frais `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75`de transaction.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

