# Pont avalanche \(AB\) FAQ

## Pont avalanche \(AB\) FAQ

Le pont avalanche \(AB\) peut être utilisé pour transférer les jetons ERC20 d'Ethereum à la chaîne C d'Avalanche et vice versa. Ce document répond aux questions communes sur le pont. Si ce document et d'autres documents ne répondent pas à votre question, vous pouvez nous contacter sur [le site de support d'Avalanche](https://support.avax.network), [Discord](https://chat.avalabs.org) ou [Telegram.](https://t.me/avalancheavax)

### Transactions

#### Que puis-je faire si ma transaction semble bloquée?

Si la transaction Ethereum transférer des fonds sur le pont vers Avalanche semble bloquée et n'a aucune confirmation, vous pouvez accélérer la transaction comme décrit [ici](avalanche-bridge-faq.md#speed-up-transaction). Si la transaction Ethereum a déjà reçu 35 confirmations, mais le minuteur de transaction Avalanche semble être bloqué, vérifiez votre solde de portefeuille Metamask sur le réseau Avalanche. Il pourrait être que la transaction a déjà été traitée mais ne se présente pas sur l'interface utilisateur. Notez que cela peut se produire si vous avez choisi "accélérer" votre transaction.

Est possible, mais très peu probable que la transaction Ethereum délivrée par le pont lors du transfert de fonds vers Ethereum prend beaucoup de temps pour recevoir 35 confirmations Cela peut survenir s'il y a une brusque spike significative dans les prix du gaz Ethereum . Si la transaction n'est pas incluse dans les 200 blocs de la date de sa délivrance sur Ethereum, une nouvelle transaction avec un prix plus élevé de gaz peut être délivrée pour «décoller» le transfert.

#### Et si le prix du gaz est plus que le montant que je transfère ?

Lors du déplacement des actifs ERC20 d'Ethereum à Avalanche, vous êtes autorisé à transférer un certain nombre de jetons que vous souhaitez faire. Le pont a été conçu de manière à minimiser les frais de transaction. Cependant, si les frais de transaction sont supérieurs à la valeur que vous cherchez à transfert, il peut être logique d'attendre que le prix du gaz Ethereum diminue.

Lors du transfert des actifs d'Avalanche vers Ethereum, le pont facture des frais de transfert en nature, comme décrit [ici](avalanche-bridge-faq.md#fees). L'interface utilisateur permet désormais les transferts moins que le montant des frais. Si un utilisateur génère et émet une telle transaction, le pont marquera le transfert comme invalide et ne le traitera pas.

#### Puis-je envoyer des jetons créés sur Avalanche à Ethereum ?

Pas encore. L'AB ne supporte actuellement que le transfert des jetons ERC20 create sur Ethereum vers Avalanche et arrière. Il y a des plans pour l'activer dans l'avenir.

#### Puis-je envoyer ETH ou BTC à travers le pont?

L'AB ne supporte pas actuellement les ETH ou BTC indigènes. Cependant, vous pouvez transférer la version enveloppé de ces actifs \(WETH et WBTC\) sur le pont.

#### Et si ma transaction n'est pas visible dans l'explorateur?

Les transactions qui correspondent aux transferts de passerelles apparaîtront sur les explorateurs des réseaux Avalanche et Ethereum Il peut prendre quelques minutes pour que les transactions apparaissent. Pour rechercher votre transaction dans l'explorateur, copiez et collez votre adresse dans [l'Explorateur C-Chain](https://cchain.explorer.avax.network/) ou [Etherscan](https://etherscan.io/) d'Avalanche. Pour visualiser les transactions envoyées par le pont lui-même, vous pouvez rechercher Avalanche [et](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) [ici](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) pour Ethereum. Si vous ne voyez toujours pas votre transaction, contactez [Telegram](https://t.me/avalancheavax) ou [Discord](https://chat.avax.network/).

#### Y a-t-il des tutoriels sur la façon d'utiliser le pont?

Oui, vous pouvez visualiser les tutoriels vidéo pour la fonctionnalité de pont [ici](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### Puis-je envoyer à une adresse différente sur l'autre réseau?

Le pont permet uniquement les transferts vers la même adresse sur l'autre réseau. Après que l'actif est transféré sur l'autre réseau, il peut être envoyé à n'importe quelle adresse ou contrat.

#### Puis-je accélérer ma transaction ?<a id="speed-up-transaction"></a>

Oui, vous pouvez cliquer sur le bouton “Speed Up” sur Metamask. “Accélérer une opération” via Metamask émet une nouvelle transaction sur Ethereum qui a un prix de gaz plus élevé que la transaction qui avait été envoyée à l'origine. Étant donné que la nouvelle transaction a un prix plus élevé, il est plus probable qu'elle soit incluse dans un bloc. Seule une des transactions \(l'original et le "sped up"\) sera acceptée. Accélérer une transaction qui transfère des fonds sur le pont est sécuritaire. Cependant, l'interface utilisateur ne sera pas consciente de la nouvelle transaction, ce qui signifie que vous ne verrez peut-être pas les confirmations dans l'interface utilisateur. Une fois la nouvelle transaction avec 35 confirmations sur Ethereum, vérifiez votre portefeuille Metamask sur Avalanche pour voir les fonds liquidés.

#### Pourquoi le nombre de jetons affichés sur Metamask ne correspond pas au nombre que j'ai spécifié?

Lors du transfert d'Avalanche à Ethereum, Metamask montre que 0 jetons doivent être transférés, pas le nombre réel de jetons. Ceci est un problème connu avec Metamask.

#### Quelles sont les adresses du contrat de pont?

Adresses de pont:
* Ethereum : [`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche: [`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Notez que **vous ne devriez pas transférer directement les jetons à ces adresses**. Vous devez utiliser l'interface utilisateur du pont, qui vérifie les transactions malformées.

### Frais de fonctionnement

#### Comment les frais fonctionnent-ils sur le pont Avalanche?

Le pont facture les frais de transfert afin de couvrir le coût des frais de transaction sur les réseaux Avalanche et Ethereum Ces frais sont facturés en nature avec l'actif ERC20 transféré. Autrement dit, lorsque vous transférez un jeton, une partie du solde transféré est prise par l'AB comme frais.

Le montant des frais de transaction Ethereum est un pourcentage estimatif plus un montant constant \(actuellement $5\) pour tenir compte de la volatilité des prix.

Pendant un temps limité, ce pourcentage est zéro pour encourager les utilisateurs à transférer des actifs. De plus, les transferts vers Avalanche peuvent être admissibles à une chute d'air AVAX, comme décrit [ici](avalanche-bridge-faq.md#airdrop).

#### Comment le gaz est-il estimé? Comment le pont obtient les prix jetons?

Le pont utilise les flux de prix Chainlink pour obtenir des informations sur le prix du gaz pour le réseau Ethereum Le prix du gaz utilisé est la plus élevée de la valeur de la chaîne FASTGAS et de l'approximation de prix du gaz Geth. Le prix du gaz est remboursé par quelques GWEI pour s'assurer que les transactions envoyées par le pont sont rapidement incluses dans un bloc Ethereum .

Le pont utilise également les flux de prix de Chainlink pour déterminer les prix jetons utilisés pour calculer la quantité d'un jeton équivalent à la taxe de pont.

#### Y a-t-il une piste ?<a id="airdrop"></a>

Les utilisateurs seront largués 0.1 AVAX lorsqu'ils transféreront plus de 75 $ \(sujet à changement\) d'un jeton d'Ethereum à Avalanche.

#### Et si je n'ai pas reçu mon airdrop ?

Si vous n'avez pas reçu votre airdrop, veuillez confirmer que le montant de transfert satisfait au montant minimum requis.

### Sécurité

#### Le pont Avalanche est-il incertain ?

Le pont Avalanche est sans confiance, en ce sens qu'aucune partie n'est en mesure d'accéder à l'un des fonds détenus comme actifs enrobés de sûreté ou de menthe. Tous les transferts à travers le pont doivent être approuvés par 3 des 4 parties indépendantes \(appelées gardes\). En ce sens, l'utilisation du pont n'exige pas la confiance dans une partie quelconque pour transférer vos fonds.

#### Quel est le rôle des gardiens?

Le rôle des gardiens est quadruplé :

1. Stocker des actions secrètes
2. Indexation des chaînes de blocs supportées
3. Suivi des transactions traitées
4. Hébergement de l'information publique

Une ventilation complète du rôle et des responsabilités d’un directeur sera fournie dans un article de conception de la technologie du pont Avalanche.

#### Quelle est la relation entre Ava Labs et les gardes ?

Les gardes sont des partenaires de confiance de la Fondation Avalanche. Ils ont un record d'excellence technique et travaillent avec Avalanche.

#### Le code a-t-il été vérifié? Où sont les rapports de vérification?

Oui, le code pour les contrats de pont, de gardien et intelligents ont été vérifiés par Halborn. Les rapports d'audit sont disponibles [ici](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

### Tokens

#### Quel genre de jetons peut être transféré sur le pont ?

Seuls les jetons ERC20 peuvent être transférés sur le pont.

#### Comment puis-je ajouter un jeton au pont ?

Voir [ici](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### Comment puis-je ajouter un jeton utilisé dans le pont à Metamask?

Voir [ici](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) pour un tutoriel.

#### Comment puis-je obtenir WETH de ETH?

Vous pouvez utiliser la fonction SWAP de Metamask’s échanger de l'ETH vers WETH. Alternativement, vous pouvez également utiliser un AMM tel [use](https://app.uniswap.org/#/) sur Ethereum.

#### Pourquoi y a-t-il deux types de même jetons? Comment puis-je dire lequel provient du pont Avalanche?

La génération actuelle du pont avalanche \(AB\) auquel le présent document se réfère est antérieure par une mise en œuvre du pont appelée AEB. Le pont AEB et le pont AB ont chacun leurs propres ensembles de jetons uniques. Les jetons AEB ont été deprecated en faveur des jetons AB. Les jetons AB ont un suffixe `.e`. Alors que le nom et le symbole d'un jeton sont de bonnes références pour différencier les deux, la seule façon de vérifier un jeton est l'adresse du contrat. Les adresses du contrat de jetons AB peuvent être trouvées [ici.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### Pourquoi le jeton nouvellement bridé n'apparaît-il pas dans mon portefeuille automatiquement?

Les jetons ne sont pas tenus par votre adresse C-chain mais plutôt dans le contrat intelligent du jeton. Vous devez indiquer à votre portefeuille (c'est-à-dire Metamask) quels contrats intelligents pour vérifier les soldes détenus par vos adresses.

### Chaînes supportées

#### Quelles chaînes sont supportées par le pont Avalanche?

Le pont Avalanche supporte actuellement uniquement le transfert des ERC20 Ethereum vers la chaîne C Avalanche et vice versa. Il y a des plans pour soutenir le transfert des ERC20 créés sur la chaîne C avalanche. Il existe également des plans pour soutenir les réseaux autres que Avalanche et Ethereum.

### AEB \(Pont \(Deprecated

La génération actuelle du pont avalanche \(AB\) auquel le présent document se réfère est antérieure par une mise en œuvre du pont appelée AEB. Cette section traite des questions concernant la mise en œuvre précédente du pont \(AEB\).

#### Quand l'AEB cesse-t-elle de fonctionner?

L'AEB est désactivé et les transferts à travers elle ne sont plus possibles. Les fonds détenus sur le côté Ethereum de l'AEB ont été transférés au nouveau pont avalanche \(AB\). Les conversions de jetons ont été activées sur la chaîne C avalanche, permettant aux utilisateurs de convertir leurs jetons AEB sur une base 1-1 pour leur équivalent sur le pont Avalanche. Cette conversion peut être effectuée à [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Les délais de support de jetons AEB seront laissés à la hauteur des différents projets DApp.

#### Puis-je transférer mes jetons AEB à Ethereum ?

Afin de déplacer vos jetons AEB vers Ethereum, vous devez d'abord les convertir en jetons AB comme décrit dans la question ci-dessus. Une fois converti, vous pouvez utiliser le nouveau pont Avalanche pour déplacer les jetons AB vers Ethereum.

#### Comment convertir mes jetons AEB \(pont \(deprecated en jetons Avalanche Bridge \(AB\)

Vous pouvez convertir vos jetons AEB en jetons AB en utilisant [l'interface utilisateur AB](http://bridge.avax.network/convert). De plus, de nombreux projets écosystémiques tels que Pangolin travaillent à faciliter la conversion de leurs jetons et à entrer de nouvelles piscines.

### Conception/technique

#### L'utilisation de tx.origin dans les contrats BridgeToken est-il sûr?

Tout en utilisant tx.origin pour vérifier l'autorisation dans les contrats intelligents pose des risques potentiels pour la sécurité, notre cas d'utilisation ne l'est pas. Dans les contrats de pont, tx.origin est uniquement utilisé pour exclure les contrats intelligents d'appeler directement la fonction "unwrap", puisque le pont ne supporte actuellement que le transfert de comptes appartenant à l'extérieur. Il est sûr de le faire en comparant la valeur tx.origin à la valeur msg.sender.

#### Peut-on un jetons de menthe privé privé ?

Aucune partie unique n'a accès à l'adresse SGX enclave. Seule l'enclave elle-même peut construire/signer une transaction en utilisant cette clé lorsqu'elle reçoit les approbations de 3 des 4 gardiens. Dans ce sens, l'enclave fonctionne ici comme un contrat intelligent interchaîne.

#### Pourquoi le pont ne détient pas de fonds dans un contrat intelligent ?

Ne pas utiliser un contrat intelligent simplifie les exigences de transfert de bout en bout, ce qui entraîne des frais de gaz plus faibles et des transferts plus rapides.

#### Où puis-je trouver plus d'informations sur le design?

Voir [Pont Avalanche: Transferts d'actifs interchaînes sécurisés utilisant Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Divers

#### Sur la page Preuve des actifs, pourquoi ne pas le montant d'un actif sur Ethereum et le match Avalanche?

Il est possible que le pont soit over-collateralized \(c.-à-d. détenir plus d'un actif ERC20 sur Ethereum qu'il existe sur Avalanche\) pour trois raisons. Ceux-ci sont tous attendus.

1. Il y a de nouveaux transferts de Ethereum à Avalanche. Le pont ne traite les transferts que lorsque la transaction Ethereum reçoit 35 confirmations. Avant cela, le solde de la garantie sera plus que l'offre d'actifs enveloppés.
2. La garantie de l'AEB a été transférée au nouveau pont AB mais tous les jetons de l'AEB n'ont pas encore été convertis en jetons AB sur Avalanche.
3. Les frais de pont ont été accumulés sur le côté Ethereum L'enclave ne perçoit pas immédiatement les frais générés à partir du pont. Au lieu de cela, il détient tous les frais perçus de chaque actif dans le portefeuille de pont jusqu'à ce qu'un seuil configuré soit atteint. À ce moment, les frais sont envoyés à un portefeuille séparé.

#### Où puis-je acheter AVAX?

Selon votre emplacement, vous pouvez peut-être acheter AVAX sur un échange centralisé. Vous pouvez également acheter AVAX sur les échanges décentralisés tels que [Pangolin](https://app.pangolin.exchange/).

#### Comment puis-je contacter quelqu'un pour obtenir un soutien?

Le support est disponible en utilisant le chat sur [support.avax.network](https://support.avax.network), ou sur notre serveur [Discord](https://chat.avax.network/).

#### Qu'est-ce que le suffixe .e dans le nom de jeton signifie?

Le suffixe `.e` indique que l'actif a traversé le pont depuis Ethereum.

#### Comment puis-je configurer Metamask sur Avalanche?

Pour configurer votre portefeuille Metamask et le connecter au réseau Avalanche, voir [ici](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

## Écosystème

### Comment ajouter mon projet au répertoire écosystémique?

Pour que votre projet soit ajouté au répertoire écosystémique, veuillez envoyer un courriel à `ecosystem@avalabs.org`. Veuillez inclure:

* votre nom de projet
* une brève description de vos services
* une version 88h x 88w .svg du logo de votre projet

   Un membre de l'équipe Avalanche vous sera de retour pour confirmer l'ajout de votre projet.

#### Comment puis-je obtenir une bannière promue sur la page Écosystème?

Pour que votre projet soit inscrit dans la section carrousel promotionnel de la page Écosystème avalanche, veuillez soumettre une demande à `ecosystem@avalabs.org`. Veuillez inclure une brève description de votre projet et les détails promotionnels. Un membre de l'équipe de soutien Ava Labs vous répondra dans les 2 jours ouvrables.

Les spécifications de la bannière sont les suivantes:

* Bureau et paysage: 1155px \* 440px
* Portrait et mobile : 720px \* 337px
* Éléments de conception au milieu de la bannière ou ils seront coupés
* Utilisez la couleur unie comme BG ou avoir dégradé qui se dégrade dans \#000 \(édité\)
