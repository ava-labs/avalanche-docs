# Exécuter un nœud Avalanche

Le moyen le plus rapide d'apprendre à connaître Avalanche est d'exécuter un nœud et d'interagir avec le réseau.

Dans ce tutoriel, nous allons :

* Installer et exécuter un nœud Avalanche
* Nous connecter à Avalanche
* Envoyer AVAX
* Ajouter votre nœud à l'ensemble de validateurs

{% hint style="warning" %}
Si votre problème n'est pas abordé dans la FAQ, venez demander de l'aide dans [Avalanche Discord](https://chat.avax.network) ! Nous nous efforcerons de vous faire franchir tous les obstacles.
{% endhint %}

{% hint style="info" %}
Si vous souhaitez utiliser un service tiers pour héberger votre nœud ou exécuter un validateur, [consultez les options](https://docs.avax.network/learn/community#blockchain-infrastructure-and-node-services).
{% endhint %}

Ce tutoriel est principalement destiné aux développeurs et aux personnes intéressées par le fonctionnement de la plateforme Avalanche. Si vous êtes simplement intéressé par la configuration d'un nœud pour le staking, vous pouvez suivre le tutoriel [Configurer le nœud d'Avalanche avec l'installateur](set-up-node-with-installer.md) à la place. L'installateur automatise le processus d'installation et le configure comme un service système, ce qui est recommandé pour un fonctionnement sans surveillance. Vous pouvez également faire des essais en suivant d'abord ce tutoriel, et ensuite configurer le nœud en utilisant l'installateur comme solution permanente.

## Exigences

Avalanche est un protocole incroyablement léger, donc les nœuds peuvent fonctionner sur le matériel standard. Notez qu'à mesure que l'utilisation du réseau augmente, les exigences matérielles peuvent changer.

* UC : Équivalent de 8 AWS vCPU
* RAM : 16 Go
* Stockage : 200 Go
* SE : Ubuntu 18.04/20.04 ou MacOS >= Catalina

## Exécuter un nœud Avalanche et envoyer des fonds

Installons AvalancheGo, l'implémentation Go d'un nœud Avalanche, et connectons nous au Testnet public d'Avalanche.

### Télécharger AvalancheGo

Le nœud est un programme binaire. Vous pouvez télécharger le code source, puis construire le programme binaire, ou télécharger le binaire pré-construit. Vous n'avez pas besoin de faire les deux.

Le téléchargement du [binaire préconstruit](run-avalanche-node.md#binary) est plus facile et recommandé si vous cherchez à exécuter votre propre nœud et à staker sur celui-ci.

Construire le nœud de la source est recommandé si vous êtes un développeur qui cherche à expérimenter et à construire sur Avalanche.

#### **Code source**

Si vous souhaitez construire le nœud à partir de la source, vous devrez d'abord installer Go 1.16.8 ou version ultérieure. Suivez les instructions [ici](https://golang.org/doc/install).

Exécuter `go version`. **La version doit être 1.16.8 ou supérieure.** Exécuter `echo $GOPATH`. **Il ne doit pas être vide.**

Télécharger le référentiel AvalancheGo :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Notez aux utilisateurs avancés : AvalancheGo utilise les modules Go, pour que vous puissiez cloner le [référentiel AvalancheGo](https://github.com/ava-labs/avalanchego) vers d'autres endroits que votre GOPATH.

Modifier le répertoire`avalanchego`   :

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construire AvalancheGo :

```cpp
./scripts/build.sh
```

Le binaire, nommé `avalanchego`, est dans `avalanchego/build`.

#### **Binaire**

Si vous souhaitez télécharger un binaire préconstruit au lieu de le construire vous-même, rendez-vous sur notre [page des versions](https://github.com/ava-labs/avalanchego/releases), et sélectionnez la version que vous voulez (probablement la plus récente).)

Sous `Assets`, sélectionnez le fichier approprié.

Pour MacOS : Télécharger `avalanchego-macos-<VERSION>.zip`  : Décompresser :  `unzip avalanchego-macos-<VERSION>.zip`le dossier résultant,  `avalanchego-<VERSION>`, contient les binaires.

Pour Linux sur les PC ou les fournisseurs de nuages : Télécharger : `avalanchego-linux-amd64-<VERSION>.tar.gz`  
 Décompresser : `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

Pour Linux sur RaspberryPi4 ou des ordinateurs similaires basés sur Arm64 : Télécharger `avalanchego-linux-arm64-<VERSION>.tar.gz`  :
 Décompresser : `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  Le dossier résultant, `avalanchego-<VERSION>-linux`, contient les binaires.

### Démarrer un nœud et se connecter à Avalanche

Si vous avez construit à partir de la source :

```cpp
./build/avalanchego
```

Si vous utilisez les binaires préconstruits sur MacOS :

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si vous utilisez les binaires préconstruits sur Linux :

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Lorsque le nœud démarre, il doit s'amorcer (rattraper le reste du réseau). Vous verrez des journaux sur l'amorçage. Lorsqu'une chaîne donnée a terminé son amorçage, elle affiche un journal comme celui-ci :

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Pour vérifier si une chaîne donnée a fini de s'amorcer, dans une autre fenêtre de terminal, appelez [`info.isBootstrapped`](../../avalanchego-apis/info-api.md#info-isbootstrapped) en copiant et collant la commande suivante :

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

Si cela renvoie `true`, la chaîne est amorcée. Si vous faites un appel d'API à une chaîne qui n'a pas fini de s'amorcer, elle retournera `API call rejected because chain is not done bootstrapping`. Si votre nœud ne termine jamais l'amorçage, suivez [cette FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si vous rencontrez toujours des problèmes, veuillez nous contacter à sur [Discord.](https://chat.avalabs.org/)

Votre nœud fonctionne et est maintenant connecté. Si vous souhaitez utiliser votre nœud comme un validateur sur le réseau principal, consultez [ce tutoriel](add-a-validator.md#add-a-validator-with-avalanche-wallet) pour savoir comment ajouter votre nœud comme un validateur en utilisant le portefeuille Web.

Vous pouvez utiliser  `Ctrl + C`pour arrêter le nœud.

Si vous voulez expérimenter et jouer avec votre nœud, lisez la suite.

Pour être en mesure de faire des appels d'API à votre nœud à partir d'autres machines, lors du démarrage du nœud, incluez l'argument  `--http-host=`(p. ex. `./build/avalanchego --http-host=`)

Pour se connecter au Fuji Testnet au lieu du réseau principal, utilisez l'argument `--network-id=fuji`. Vous pouvez obtenir des fonds sur le Testnet du [robinet.](https://faucet.avax-test.network/)

### Créer un utilisateur Keystore

Les nœuds Avalanche fournissent un **Keystore** intégré. Le Keystore gère les utilisateurs et s'apparente beaucoup à un [portefeuille](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un utilisateur est une identité protégée par un mot de passe que le client peut utiliser lors de l'interaction avec les blockchains. **Vous ne devez créer un utilisateur de keystore que sur un nœud que vous gérez, car l'opérateur du nœud a accès à votre mot de passe en clair.** Pour créer un utilisateur, appelez [`keystore.createUser`](../../avalanchego-apis/keystore-api.md#keystore-createuser):

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

Maintenant, vous avez un utilisateur sur ce nœud. Les données Keystore existent au niveau du nœud. Les utilisateurs que vous créez sur le Keystore d'un nœud n'existent pas sur les autres nœuds, mais vous pouvez importer/exporter des utilisateurs vers/depuis le Keystore. Voir l'[API Keystore](../../avalanchego-apis/keystore-api.md) pour voir comment.

{% hint style="danger" %}
**Vous ne devez conserver qu'une petite partie de vos fonds sur votre nœud.** La plupart de vos fonds doivent être sécurisés par une mnémonique qui n'est pas enregistrée sur un ordinateur.{% endhint %}

### Créer une adresse

Avalanche est une plateforme de blockchains hétérogènes, dont l'une est la [X-Chain](../../../learn/platform-overview/#exchange-chain-x-chain), qui agit comme une plateforme décentralisée pour créer et échanger des actifs numériques. Nous allons maintenant créer une adresse pour tenir AVAX sur notre nœud.

Pour créer une nouvelle adresse sur la X-Chain, appelez [`avm.createAddress`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-createaddress), une méthode de [l'API de la X-Chain](../../avalanchego-apis/exchange-chain-x-chain-api.md) :

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

Si votre nœud n'a pas fini de s'amorcer, cet appel retournera l'état `503` avec le message `API call rejected because chain is not done bootstrapping`.

Notez que nous faisons cette demande à `127.0.0.1:9650/ext/bc/X`. La partie `bc/X` signifie que la demande est en cours d'envoi à la blockchain dont l'ID (ou l'alias) est  `X`(c'est-à-dire la X-Chain).

La réponse devrait ressembler à ça :

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Votre utilisateur contrôle maintenant l'adresse `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` sur la X-Chain. Pour distinguer les adresses de différentes chaînes, la convention d'Avalanche veut qu'une adresse inclue l'ID ou l'alias de la chaîne sur laquelle elle existe. Par conséquent, cette adresse commence `X-`, en indiquant qu'elle existe sur la X-Chain.

### Envoyer des fonds du portefeuille Avalanche à votre nœud

{% hint style="warning" %}
_**Remarque : les instructions ci-dessous déplacent des fonds réels.**_
{% endhint %}

Transférons des fonds du portefeuille Avalanche à votre nœud.

Allez au [portefeuille Avalanche](https://wallet.avax.network). `Access Wallet`Cliquez sur , puis `Mnemonic Key Phrase`. Entrez votre phrase mnémonique.

Cliquez sur l'onglet  `Send` sur la gauche. Pour le montant, sélectionnez,  `.002`AVAX. Entrez l'adresse de votre nœud, puis cliquez sur `Confirm`.

![onglet d'envoi du portefeuille web](../../../.gitbook/assets/web-wallet-send-tab%20%284%29%20%284%29%20%285%29%20%285%29%20%286%29%20%287%29%20%284%29%20%281%29%20%285%29.png)

Nous pouvons vérifier le solde d'une adresse d'un actif donné en appelant `avm.getBalance`, une autre méthode de l'API de la X-Chain. Vérifions que le transfert a été effectué :

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

Notez qu'AVAX a l'ID spécial `AVAX`. Habituellement, un ID d'actif est une chaîne alphanumérique.

La réponse doit indiquer que nous avons `2,000,000 nAVAX` ou `0.002 AVAX`.

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

Maintenant, envoyons un AVAX en faisant un appel d'API à notre nœud :

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

Si vous souhaitez spécifier une adresse particulière où le changement doit aller, vous pouvez la spécifier dans `changeAddr`. Vous pouvez laisser ce champ vide ; dans ce cas, les changements iront à l'une des adresses que votre utilisateur contrôle.

Afin d'éviter les spams, Avalanche requiert le paiement des frais de transaction. Les frais de transaction seront automatiquement déduits d'une adresse que votre utilisateur contrôle lorsque vous émettez une transaction. Gardez à l'esprit lorsque vous vérifiez les soldes ci-dessous.

{% page-ref page="../../../learn/platform-overview/transaction-fees.md" %}

Lorsque vous envoyez cette demande, le nœud vous authentifiera en utilisant votre nom d'utilisateur et votre mot de passe. Ensuite, il examinera toutes les [clés privées](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) que votre utilisateur contrôle jusqu'à ce qu'il trouve suffisamment d'AVAX pour satisfaire la demande.

La réponse contient l'ID de transaction. Il sera différent pour chaque invocation de `send`.

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

#### Vérifier l'état de la transaction

Il ne faudra qu'une seconde ou deux pour finaliser cette transaction. Nous pouvons vérifier son état avec  [`avm.getTxStatus`](../../avalanchego-apis/exchange-chain-x-chain-api.md#avm-gettxstatus) :

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

La réponse doit indiquer que la transaction a été acceptée :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

Vous pouvez également voir que `status` est `Processing` si le réseau n'a pas encore finalisé la transaction.

Une fois que vous voyez que la transaction est `Accepted`, vérifiez le solde de l'adresse `to` pour voir qu'il a l'AVAX que nous avons envoyé :

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

De la même manière, nous pourrions vérifier `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` pour voir que l'AVAX que nous avons envoyé a été déduit de son solde, ainsi que les frais de transaction.

{% page-ref page="add-a-validator.md" %}

{% page-ref page="../../tools/avalanchejs/create-an-asset-on-the-x-chain.md" %}

{% page-ref page="../platform/create-avm-blockchain.md" %}

{% page-ref page="../platform/create-custom-blockchain.md" %}

{% page-ref page="../platform/create-a-subnet.md" %}

{% page-ref page="../../avalanchego-apis/" %}

{% page-ref page="../../references/" %}

