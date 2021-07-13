---
description: >-
  Le moyen le plus rapide d'en savoir plus sur Avalanche est d'exécuter un nœud
  et d'interagir avec le réseau.
---

# Pour commencer: exécuter un nœud Avalanche

Dans ce tutoriel \(durée estimée: 10 minutes\), nous allons:

* Installer et lancer un nœud Avalanche
* Se connecter à Avalanche
* Envoyer des AVAX
* Ajoutez votre nœud à l'ensemble de validateurs

Si votre problème n'est pas abordé dans la FAQ, venez demander de l'aide dans le [Telegram Avalanche francophone !](https://t.me/Avalanche_fr) Nous travaillerons pour vous aider à surmonter tous les obstacles.

Si vous souhaitez lancer votre nœud sur un VPS et avoir un tutoriel pas-à-pas merci de regarder ce tutoriel:

## Exigences <a id="requirements"></a>

Avalanche est un protocole incroyablement léger, donc les exigences informatiques minimales requises sont assez modestes.

* Matériel: CPU&gt; 2 GHz, RAM&gt; 4 Go, stockage&gt; 100 Go d'espace libre
* OS: Ubuntu 18.04/20.04 ou Mac OS X &gt;= Catalina
* Software: [Go](https://golang.org/doc/install) &gt;= 1.13

Exécutez `go version`. **Il doit être en version 1,13 ou plus**. Exécutez `echo $GOPATH`. I**l ne doit pas être vide.**

{% hint style="warning" %}
Ce tutoriel suppose que vous avez suffisamment d'AVAX pour ajouter un validateur sous une phrase clé mnémonique. \(2,000 AVAX + frais pour [les transactions nécessaires](../apprendre/presentation-du-systeme/frais-de-transaction.md)\)
{% endhint %}

## Exécutez un nœud Avalanche et envoyez des fonds <a id="run-an-avalanche-node-and-send-funds"></a>

Installons AvalancheGo, l'implémentation Go d'un nœud Avalanche, et connectons-nous au Public Testnet d'Avalanche.

### Télécharger AvalancheGo <a id="download-avalanchego"></a>

Le nœud est un programme binaire. Vous pouvez soit télécharger le code source puis créer le programme binaire, soit télécharger le binaire pré-construit.

{% hint style="info" %}
Vous pouvez effectuer l'une des opérations ci-dessous. Vous n’avez pas besoin de faire les deux. **Code source** ou **Binaire.**
{% endhint %}

#### Code source <a id="source-code"></a>

Téléchargez le repository AvalancheGo :

```cpp
go get -v -d github.com/ava-labs/avalanchego/...
```

Remarque aux utilisateurs avancés: AvalancheGo utilise des modules Go, vous pouvez donc cloner le le [repository AvalancheGo](https://github.com/ava-labs/avalanchego) vers des emplacements autres que votre GOPATH

Changer le répertoire `avalanchego` :

```cpp
cd $GOPATH/src/github.com/ava-labs/avalanchego
```

Construisez AvalancheGo:

```cpp
./scripts/build.sh
```

Le binaire, nommé `avalanchego`, est en `avalanchego/build`.

**Binaire**

Accédez à notre [page de versions](https://github.com/ava-labs/avalanchego/releases) et sélectionnez la version de votre choix \(probablement la dernière\).

Sous`Assets`, sélectionnez le fichier approprié.

Pour MacOS : Télécharger : `avalanche-osx-<VERSION>.zip` `unzip avalanche-osx-<VERSION>.zip` Le dossier résultant`avalanche-<VERSION>`, contient les binaires. Vous pouvez exécuter le nœud avec `./avalanche-<VERSION>/avalanchego`

Pour Linux : Téléchargez : `avalanche-linux-<VERSION>.tar.gz` Décompressez : `tar -xvf avalanche-linux-<VERSION>.tar.gz` Le dossier résultant, `avalanche-<VERSION>` contient les binaires. Vous pouvez exécuter le nœud avec `./avalanche-<VERSION>/avalanchego`

### Démarrez un nœud et connectez-vous à Avalanche <a id="start-a-node-and-connect-to-avalanche"></a>

Si vous avez construit à partir de la source :

```cpp
./build/avalanchego
```

Si vous utilisez les binaires publiés :

```cpp
./avalanche-<VERSION>/avalanchego
```

Si vous voulez pouvoir effectuer des appels API vers votre nœud à partir d'autres machines, incluez l'argument `--http-host=` \(par exemple `./build/avalanchego --http-host=`\)

Vous pouvez utiliser `Ctrl + C` pour tuer le nœud.

Pour vous connecter à Fuji Testnet à la place, utilisez l'argument `--network-id=fuji`. Vous pouvez obtenir des fonds sur le Testnet à partir du [faucet](https://faucet.avax-test.network/).

Lorsque le nœud démarre, il doit démarrer \(bootstrap - rattraper le reste du réseau\). Vous verrez des journaux sur l'amorçage. Lorsqu'une chaîne donnée a terminé le bootstrap, elle imprimera un journal comme celui-ci :

`INFO [06-07|19:54:06] <X Chain> /snow/engine/avalanche/transitive.go#80: bootstrapping finished with 1 vertices in the accepted frontier`

Pour vérifier si une chaîne donnée est terminée, appelez [`info.isBootstrapped`](apis/info-api.md#info-isbootstrapped) comme ceci :

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

Si cela renvoie`true`, la chaîne est amorcée \(boostrapped\). Si vous effectuez un appel d'API à une chaîne dont le bootstrap n'est pas terminé, il renverra le message suivant :`API call rejected because chain is not done bootstrapping`. Si votre nœud ne termine jamais le démarrage/boostrap, suivez cette [FAQ](http://support.avalabs.org/en/articles/4593908-is-my-node-done-bootstrapping), si vous rencontrez toujours des problèmes, veuillez nous contacter sur [Telegram](https://t.me/Avalanche_fr).

### Créer un utilisateur Keystore <a id="create-a-keystore-user"></a>

Les nœuds d'avalanche fournissent un **keystore** intégré. Le Keystore gère les utilisateurs et ressemble beaucoup à un [portefeuille](http://support.avalabs.org/en/articles/4587108-what-is-a-blockchain-wallet). Un utilisateur est une identité protégée par mot de passe qu'un client peut utiliser lorsqu'il interagit avec des blockchains. **Vous ne devez créer un utilisateur de keystore que sur un nœud que vous exploitez, car l'opérateur de nœud a accès à votre mot de passe en texte brut**. Pour créer un utilisateur, faites un call [`keystore.createUser`](apis/keystore-api.md#keystore-createuser):

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

La réponse devrait être :

```cpp
{
     "jsonrpc":"2.0",
     "result":{"success":true},
     "id":1
}
```

Maintenant, vous avez un utilisateur sur ce nœud. Les données de Keystore existent au niveau du nœud. Les utilisateurs que vous créez sur le Keystore d’un nœud n’existent pas sur les autres nœuds, mais vous pouvez importer / exporter des utilisateurs vers / depuis le Keystore. Voir l'[API Keystore](apis/keystore-api.md) pour voir comment.

{% hint style="danger" %}
**Vous ne devez conserver qu'une petite quantité de vos fonds sur votre nœud**. La plupart de vos fonds doivent être sécurisés par un mnémonique qui n'est enregistré sur aucun ordinateur.
{% endhint %}

### Créer une adresse <a id="create-an-address"></a>

Avalanche est une plateforme de blockchains hétérogènes, dont la X-Chain, qui agit comme une plate-forme décentralisée pour créer et échanger des actifs numériques. Nous allons maintenant créer une adresse pour contenir AVAX sur notre nœud.

Pour créer une nouvelle adresse sur la X-Chain, faites un call [`avm.createAddress`](apis/avm-api-x-chain.md#avm-createaddress) une méthode de l'[API de la X-Chain](apis/avm-api-x-chain.md) :

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

Si votre nœud n’a pas fini de démarrer, cet appel renverra l’état `503` avec le message suivant : `API call rejected because chain is not done bootstrapping`

Notez que nous faisons cette demande à `127.0.0.1:9650/ext/bc/X`. La partie `bc/X` signifie que la demande est envoyée à la blockchain dont l'ID \(ou l'alias\) est `X` \(c'est-à-dire la X-Chain\).

La réponse devrait ressembler à ceci :

```cpp
{
    "jsonrpc":"2.0",
    "id":2,
    "result" :{
        "address":"X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75"
    }
}
```

Votre utilisateur contrôle maintenant l'adresse `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` sur la X-Chain. Pour distinguer les adresses sur différentes chaînes, la convention Avalanche veut qu'une adresse inclue l'ID ou l'alias de la chaîne sur laquelle elle existe. Par conséquent, cette adresse commence `X-`, indiquant qu'elle existe sur la X-Chain.

### Envoyez des fonds du portefeuille Avalanche à votre nœud <a id="send-funds-from-avalanche-wallet-to-your-node"></a>

{% hint style="danger" %}
Remarque: les instructions ci-dessous déplacent des fonds réels.
{% endhint %}

Transférons les fonds du portefeuille Avalanche vers votre nœud.

Accédez au [portefeuille Avalanche](https://wallet.avax.network/). Cliquez sur `ACCESS WALLET,` puis sur `MNEMONIC KEY PRHASE`. Entrez votre phrase mnémotechnique.

Click the `Send` tab on the left. For amount, select, `.002` AVAX. Enter the address of your node, then click `Confirm`.

Cliquez sur l'onglet `Send` sur la gauche. Pour le montant, sélectionnez `.002` AVAX. Saisissez l'adresse de votre nœud, puis cliquez sur `Confirm`.

![](https://gblobscdn.gitbook.com/assets%2F-MKmFQYgp3Usx3i-VLJU%2F-MLOr__X1c52dUUHZYYL%2F-MLOrlciMzgF384ngg2e%2F1.png?alt=media&token=b47c557d-efec-413e-9362-fe3013e6653a)

Nous pouvons vérifier le solde d'une adresse pour un élément donné en appelant `avm.getBalance`, une autre méthode de l'API de X-Chain. Vérifions que le transfert a bien été effectué:

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

Notez qu'AVAX a l'ID spécial `AVAX`. Un ID d'élément est généralement une chaîne alphanumérique.

La réponse doit indiquer que nous avons `2 000 000 nAVAX` ou `0,002 AVAX`.

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

### Envoyer des AVAX <a id="send-avax"></a>

Maintenant, envoyons des AVAX en effectuant un appel API à notre nœud:

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

Si vous souhaitez spécifier une adresse particulière où le changement doit aller, vous pouvez la spécifier dans `changeAddr`. Vous pouvez laisser ce champ vide; si vous le faites, toute modification ira à l'une des adresses contrôlées par votre utilisateur.

Afin d'éviter le spam, Avalanche exige le paiement de frais de transaction. Les frais de transaction seront automatiquement déduits d'une adresse contrôlée par votre utilisateur lorsque vous émettez une transaction. Gardez cela à l'esprit lorsque vous vérifiez les soldes ci-dessous.

{% page-ref page="../apprendre/presentation-du-systeme/frais-de-transaction.md" %}

Lorsque vous envoyez cette demande, le nœud vous authentifiera à l'aide de votre nom d'utilisateur et de votre mot de passe. Ensuite, il examinera toutes les [clés privées](http://support.avalabs.org/en/articles/4587058-what-are-public-and-private-keys) contrôlées par votre utilisateur jusqu'à ce qu'il trouve suffisamment d'AVAX pour satisfaire la demande.

La réponse contient l'ID de la transaction. Ce sera différent pour chaque invocation `send`.

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

#### Vérification du statut de la transaction <a id="checking-the-transaction-status"></a>

Cette transaction ne prendra qu'une seconde ou deux pour finaliser. Nous pouvons vérifier son statut avec [`avm.getTxStatus`](apis/avm-api-x-chain.md#avm-gettxstatus):

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

La réponse doit indiquer que la transaction a été `Accepted`:

```cpp
{
    "jsonrpc":"2.0",
    "id"     :6,
    "result" :{
        "status":"Accepted"
    }
}
```

You might also see that `status` is `Processing` if the network has not yet finalized the transaction.

Vous pouvez également voir que le`status` est en cours de traitement `Processing`si le réseau n'a pas encore finalisé la transaction.

Once you see that the transaction is `Accepted`, check the balance of the `to` address to see that it has the AVAX we sent:

Une fois que vous voyez que la transaction est acceptée`Accepted`, vérifiez le solde de l'adresse `to` pour voir qu'elle contient l'AVAX que nous avons envoyé:

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

La réponse devrait être :

```cpp
{
    "jsonrpc":"2.0",
    "id"     :7,
    "result" :{
        "balance":1000
    }
}
```

IDe la même manière, nous avons pu vérifier `X-avax1xeaj0h9uy7c5jn6fxjp0rg4g39jeh0hl27vf75` pour voir que les AVAX que nous avons envoyé a été déduit de son solde, ainsi que les frais de transaction.

{% page-ref page="tutoriels/noeuds-et-mise-en-jeu/ajouter-un-validateur.md" %}

{% page-ref page="tutoriels/actifs-numeriques-intelligents/creer-un-actif-a-capitalisation-fixe.md" %}

{% page-ref page="tutoriels/plateforme/creer-une-nouvelle-blockchain.md" %}

{% page-ref page="tutoriels/plateforme/creer-un-sous-reseau-subnet.md" %}

{% page-ref page="apis/" %}

{% page-ref page="materiel-de-reference/" %}

