# Pont Avalanche \(AB\)

## Pont Avalanche \(AB\)

Le pont Avalanche \(AB\) peut être utilisé pour transférer les jetons ERC20 de Ethereum à la C-Chain d'Avalanche et vice versa. Ce document répond aux questions communes sur le pont. Si ce document et d'autres documents ne répondent pas à votre question, vous pouvez nous contacter sur [le site Web de support d'Avalanche](https://support.avax.network), [Discord](https://chat.avalabs.org) ou [Telegram.](https://t.me/avalancheavax)

### Notes importantes

1. Il y a un bogue dans l'application Metamask Mobile qui affecte les transactions sur les ponts **\(uniquement sur **mobile\). Tant que cela ne sera pas résolu, n'utilisez pas l'application mobile Metamask pour les transferts de pont. Utilisez l'application de bureau, ou, si sur mobile, Coinbase Wallet.
2. Vous avez besoin d'AVAX pour payer les frais de transaction sur Avalanche.** Vous devez utiliser use que vous recevez dans le dop pour faire un échange pour plus d'AVAX sur un AMM, afin que vous puissiez payer les frais de transaction.** Si vous n'avez pas eu recours à AVAX, vous ne pourrez pas faire des transactions sur Avalanche.

### Transactions

#### Que puis-je faire si ma transaction semble bloquée ?

Si la transaction Ethereum transférant des fonds sur le pont vers Avalanche semble bloquée et ne dispose pas de confirmation, vous pouvez accélérer la transaction comme décrit [ici](avalanche-bridge-faq.md#speed-up-transaction). Si la transaction Ethereum a déjà reçu 35 confirmations mais que le minuteur de transaction Avalanche semble être bloqué, vérifiez votre solde de portefeuille Metamask sur le réseau Avalanche. Il peut être que la transaction a été déjà traitée mais ne s'affiche pas sur l'interface utilisateur. Notez que cela peut arriver si vous avez opté pour "accélérer votre transaction" .

Est possible, mais très peu probable, que la transaction Ethereum délivrée par le pont lors du transfert de fonds vers Ethereum prend beaucoup de temps pour recevoir 35 confirmations Cela peut survenir si les prix du gaz Ethereum sont soudainement significatifs. Si la transaction n'est pas incluse dans les 200 blocs de la date de sa publication sur Ethereum, une nouvelle transaction avec un prix du gaz plus élevé peut être délivrée pour « décoller » le transfert.

#### Combien de temps un transfert de pont prend-il ?

La transaction Ethereum devrait prendre 10 à 15 minutes. La transaction Avalance prend quelques secondes.

#### Pourquoi la transaction Avalanche est-elle une partie intégrante du pont qui prend si longtemps ?

Il ne prend que quelques secondes. Si l'interface du pont la montre prenant plus de temps, ce n'est qu'un problème avec l'interface. Vos actifs ont été transférés après quelques secondes. Vérifiez votre portefeuille et l'explorateur de C-Chain.

#### Et si le prix du gaz est plus que le montant que je transfère ?

Lors du déplacement des actifs ERC20 de Ethereum à Avalanche, vous êtes autorisé à transférer un certain nombre de jetons que vous souhaitez transférer. Le pont a été conçu de telle sorte que minimise les frais de transaction. Toutefois, si la taxe de transaction est supérieure à la valeur que vous cherchez à transférer, il peut être logique d'attendre que le prix du gaz Ethereum diminue.

Lors du déplacement d'Avalanche vers Ethereum, le pont facture un frais de transfert en nature, comme décrit [ici](avalanche-bridge-faq.md#fees). L'interface utilisateur permet maintenant des transferts inférieurs au montant des frais. Si un utilisateur génère et émet une telle transaction, le pont marquera le transfert comme étant invalide , et ne le traitera pas.

#### Puis-je envoyer des jetons créés sur Avalanche à Ethereum ?

Pas encore. L'AB ne prend actuellement en charge le transfert des jetons ERC20 créatifs sur Ethereum vers Avalanche et en arrière. Il est prévu de le permettre à l'avenir.

#### Puis-je envoyer ETH ou BTC sur le pont ?

L'AB ne prend pas en charge actuellement l'ETH et la BTC natives. Cependant, vous pouvez transférer la version enveloppé de ces actifs \(WETH et WBTC\) sur le pont.

#### Et si ma transaction n'est pas visible dans l'explorateur ?

Les transactions qui correspondent aux transferts de ponts apparaîtront sur les explorateurs des réseaux Avalanche et Ethereum. Il peut prendre quelques minutes pour que les transactions puissent apparaître. Pour rechercher votre transaction dans l'explorateur, copier et coller votre adresse dans l'Explorer de [C-Chain Explorer](https://cchain.explorer.avax.network/) ou [Etherscan](https://etherscan.io/) d'Avalanche. Pour visualiser les transactions envoyées par le pont lui-même, vous pouvez rechercher Avalanche [et](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) [ici](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) pour Ethereum. Si vous ne voyez pas encore votre transaction, contactez [Telegram](https://t.me/avalancheavax) ou [Discord](https://chat.avax.network/).

#### Y a-t-il des tutoriels sur la manière d'utiliser le pont ?

Oui, vous pouvez afficher des tutoriels vidéo pour la fonctionnalité du pont [ici](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### Comment puis-je payer pour les frais de transaction sur Avalanche ?

Sur Avalanche, les frais de transaction sont payés sur l'actif natif, AVAX. Afin d'envoyer des transactions sur l'Avalanche C-Chain, vous devez avoir suffisamment d'AVAX dans votre portefeuille pour couvrir le coût du gaz pour la transaction. Pour vous aider à commencer sur Avalanche, le pont vous will une petite quantité d'AVAX si vous déplacez plus de 75 $ \(sujet à changement\) de jetons d'Ethereum. Afin d'éviter de manquer d'AVAX pour couvrir vos frais de transaction, nous vous recommandons d'abord d'acheter une quantité suffisante d'AVAX. Vous pouvez le faire sur [Pangolin](https://app.pangolin.exchange/).

#### Puis-je envoyer à une adresse différente sur l'autre réseau ?

Le pont ne permet les transferts vers la même adresse que sur l'autre réseau. Une fois l'actif transféré sur l'autre réseau, il peut être envoyé à n'importe quelle adresse ou contrat.

#### Puis-je accélérer ma transaction ?<a id="speed-up-transaction"></a>

Oui, vous pouvez cliquer sur le bouton « Speed Up » sur Metamask. « Speeding » une transaction par Metamask émet une nouvelle transaction sur Ethereum qui a un prix du gaz plus élevé que la transaction qui a été envoyée à l'origine. Étant donné que la nouvelle transaction a un prix du gaz plus élevé, elle est plus susceptible d'être incluse dans un bloc. Seule une des transactions \(l'original et la « sped up »\) sera acceptée. L'accélération d'une transaction qui transfère des fonds sur le pont est sécuritaire. Cependant, l'interface utilisateur ne sera pas au courant de la nouvelle transaction, ce qui signifie que vous ne pouvez pas voir les confirmations dans l'interface utilisateur. Une fois la nouvelle transaction avec 35 confirmations sur Ethereum, vérifiez votre portefeuille Metamask sur Avalanche pour voir les fonds liquidés.

#### Pourquoi le nombre de jetons affiché sur Metamask ne correspond-il pas au nombre que j'ai spécifié ?

Lors du transfert de Avalanche à Ethereum, Metamask montre que 0 jetons doivent être transférés, et non le nombre réel de jetons. Ceci est un problème connu avec Metamask.

#### Quelle est l'adresse du pont sur Ethereum et Avalanche ?

Adresses de bridge:

* Ethereum :[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche :[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Notez que **vous ne devez pas transférer directement des jetons vers ces **adresses. Vous devez utiliser l'interface utilisateur du pont, qui vérifie les transactions malformées.

### Frais

#### Comment les frais fonctionnent-ils sur le pont d'Avalanche ?

Le pont facture des frais de transfert afin de couvrir le coût des frais de transaction sur les réseaux Avalanche et Ethereum, ainsi que les coûts opérationnels de l'infrastructure de pont. Ces frais sont facturés en nature avec l'actif ERC20 étant transféré. C'est-à-dire lorsque vous transférez un jeton, une partie du solde transféré est prise par l'AB en tant que frais.

Lors du déplacement d'actifs d'Ethereum à Avalanche, les frais représentent 3 $ de l'actif ERC20 étant transféré. Les transferts à Avalanche peuvent être admissibles à une chute d'air d'AVAX comme décrit [ici](avalanche-bridge-faq.md#airdrop).

Lors du déplacement d'Avalanche à Ethereum, le droit est la valeur de la redevance maximale de transaction Ethereum \(limite de gaz \* prix du gaz actuel\), plus un montant en dollar constant \(actuellement 5 $\) pour rendre compte de la volatilité des prix. Notez que la taxe de transaction maximale Ethereum est basée sur la limite de gaz et peut être supérieure aux frais de transaction réels, qui est basé sur la quantité de gaz utilisée par la transaction.

#### Pourquoi le montant d'actif que j'ai reçu sur un réseau ne correspond-il pas au montant que j'ai envoyé de l'autre ?

Le pont facture des frais. Voir ci-dessus

#### Comment le gaz est-il estimé ? Comment le pont obtient-il des prix de jetons ?

Le pont utilise des flux de prix Chainlink pour obtenir des informations sur les prix du gaz pour le réseau Ethereum. Le prix du gaz utilisé est le plus élevé de la valeur FASTGAS de Chainlink et de l'approximation de prix du gaz de Geth. Le prix du gaz est remboursé par quelques GWEI pour garantir que les transactions envoyées par le pont sont rapidement incluses dans un bloc Ethereum.

Le pont utilise également des flux de prix Chainlink pour déterminer les prix de jetons utilisés pour calculer la quantité d'un jeton qui est équivalent à la taxe sur le pont.

#### Y a-t-il un airdrop ?<a id="airdrop"></a>

Les utilisateurs seront largués par avion jusqu'à 0,1 AVAX lorsqu'ils transfèrent plus de 75 $ \(sujet à changement\) d'un jeton de Ethereum à Avalanche.

#### Et si je n'ai pas reçu mon airdrop ?

Si vous n'avez pas reçu votre airdrop, veuillez confirmer que le montant de transfert a satisfait au montant minimum requis.

### Sécurité

#### Le pont d'Avalanche est-il sans confiance ?

Le pont Avalanche est sans confiance en ce sens qu'aucune partie n'est en mesure d'accéder à l'un des fonds détenus comme actifs enroulés de sûreté ou de menton. Tous les transferts sur le pont doivent être approuvés par 3 des 4 parties indépendantes \(appelées wardens\). En ce sens, l'utilisation du pont ne nécessite pas la confiance dans une partie quelconque pour transférer vos fonds.

#### Quel est le rôle des gardiens ?

Le rôle des gardes est quatre fois :

1. Enregistrer des actions secrètes
2. L'indexation des blockchains pris en charge
3. Suivi des transactions traitées
4. Hébergement de l'information publique

Une ventilation complète du rôle et des responsabilités d'un directeur peut être trouvée [ici](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

#### Quelle est la relation entre Ava Labs et les gardes du parc ?

Les gardiens sont des partenaires de confiance de la Fondation Avalanche. Ils ont un record d'excellence technique et travaillent avec Avalanche.

#### Le code a-t-il été vérifié ? Où sont les rapports de vérification ?

Oui, le code pour les contrats de pont, de gardien et de contrats intelligents ont été audités par Halborn. Les rapports d'audit peuvent être trouvés [ici](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

### Tokens

#### Mon transfert à Avalanche est complet, mais je ne vois pas mes actifs sur Metamask Avalanche. Que s'est-il passé ?<a id="cant-see-funds"></a>

Vous devez dire à Metamask de chercher les jetons. Assurez-vous que vous avez ajouté les jetons de la [liste de jetons de la pont](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) d'Avalanche à Metamask.

#### Quel genre de jetons peuvent être transférés sur le pont ?

Seuls les jetons ERC20 pris en charge peuvent être transférés sur le pont. Sur Avalanche, ces jetons sont représentés par le symbole de jetons avec ".e" annexé. Par exemple, le jeton DAI ponté est DAI.e.

#### Comment puis-je débloquer WETH.e à ETH sur Avalanche ?

Vous ne le faites pas. Il n'y a pas de telle chose que ETH sur Avalanche. Vous pouvez utiliser WETH.e, une représentation enveloppé d'ETH dans les contrats intelligents et les dapps sur Avalanche.

#### Comment puis-je envelopper / débloquer ETH sur Ethereum ?

Vous pouvez utiliser la fonction SWAP de Metamask pour échanger de ETH vers WETH. Vous pouvez également utiliser un MAP tel que [Uniswap](https://app.uniswap.org/#/) sur Ethereum.

#### Comment puis-je ajouter un jeton au pont ?

Voir [ici](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### Comment puis-je ajouter un jeton utilisé dans le pont à Metamask ?

Voyez [ici](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) pour un tutoriel.

#### Pourquoi y a-t-il deux types de même jeton ? Comment puis-je dire à qui l'un est issu du pont d'Avalanche ?

En général, lorsque vous interagissez avec des contrats intelligents et des dapps comme Pangolin, **vous souhaitez utiliser le jeton avec .e à la **fin.

L'Avalanche Bridge \(AB\) de la génération actuelle auquel se réfère le présent document est prédaté par une mise en œuvre de pont précédente appelée l'AEB. Le pont AEB et le pont AB ont chacun leurs jeux de jetons uniques. Les jetons AEB ont été déprimés en faveur des jetons AB. Les jetons AB ont un `.e`suffix. Alors que le nom et le symbole d'un jeton sont de bonnes références pour différencier les deux, la seule manière de vérifier un jeton est l'adresse du contrat. Les adresses du contrat de jetons AB peuvent être trouvées [ici.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### Pourquoi le jeton nouvellement pongé ne se présente-t-il pas automatiquement dans mon portefeuille ?

Les jetons ne sont pas détenus par votre adresse C-chain, mais plutôt par le contrat intelligent du jeton. Vous devez informer votre portefeuille \(c'est-à-dire Metamask\) des contrats intelligents pour vérifier les soldes détenus par vos adresses.

#### Le pont d'Avalanche prend en charge le transfert de NFT ?

Le pont Avalanche ne prend pas en charge les transferts NFT.

### Chaînes prises en charge

#### Quelles sont les chaînes prises en charge par le pont d'Avalanche ?

Le pont Avalanche ne prend actuellement en charge le transfert des ERC20 d'Ethereum vers la C-Chain d'Avalanche et vice versa. Il y a des plans pour soutenir le transfert des ERC20 créé sur la C-Chain d'Avalanche. Il y a également des plans pour soutenir des réseaux autres que Avalanche et Ethereum.

#### Puis-je relier les actifs de \(réseau\) à Avalanche ?

Le pont Avalanche ne peut transférer d'actifs que entre Ethereum et Avalanche. Pour obtenir des actifs d'un autre réseau sur Avalanche, vous pouvez faire l'une des tâches suivantes :
* Transférer ces actifs à Ethereum et de Ethereum à Avalanche
* Utiliser un pont tiers non créé/entretenu/supporté par Ava Labs
* Achetez AVAX sur un échange centralisé et retirez AVAX auprès d'Avalanche, puis utilisez un AMM pour échanger des autres actifs.

### AEB \(pont \(Deprecated

L'Avalanche Bridge \(AB\) de la génération actuelle auquel se réfère le présent document est prédaté par une mise en œuvre de pont précédente appelée l'AEB. Cette section traite des questions concernant la mise en œuvre du pont précédente \(AEB\).

#### Quand l'AEB cesse-t-il de fonctionner ?

L'AEB est désactivé et les transferts sur elle ne sont plus possibles. Les fonds détenus sur le côté Ethereum de la CAE ont été transférés au nouveau pont Avalanche \(AB\). Les conversions de jetons ont été activées sur l'Avalanche C-Chain, permettant aux utilisateurs de convertir leurs jetons AEB sur une base de 1-1 pour leur équivalent sur le pont Avalanche. Cette conversion peut être effectuée sur [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Les calendriers de support de jetons AEB seront laissés à la hauteur des projets DApp

#### Puis-je transférer mes jetons AEB sur Ethereum ?

Afin de déplacer vos jetons AEB vers Ethereum, vous devez d'abord les convertir en jetons AB comme décrit dans la question ci-dessus. Une fois converti, vous pouvez utiliser le nouveau pont Avalanche pour déplacer les jetons AB vers Ethereum.

#### Comment convertir mes jetons AEB \(pont \(deprecated en jetons Avalanche Bridge \(AB\) ?

Vous pouvez convertir vos jetons AEB en jetons AB en utilisant [l'interface utilisateur de](http://bridge.avax.network/convert) l'AB. En outre, de nombreux projets d'écosystème comme Pangolin travaillent à rendre facile pour les utilisateurs de convertir leurs jetons et d'entrer dans de nouveaux pools de liquidités.

### Design/technique

#### Peut-on être un seul jeton de jetons de menthe à clé privée privé?

Aucune partie unique n'a accès à l'adresse d'enclave SGX. Seule l'enclave elle-même peut construire/signer une transaction en utilisant cette clé lorsqu'elle reçoit les approbations de 3 sur 4 gardens. En ce sens, l'enclave ici fonctionne comme un contrat intelligent inter-chaîne.

#### Pourquoi le pont ne tient-il pas de fonds dans un contrat intelligent ?

Ne pas utiliser un contrat intelligent simplifie les exigences de transfert de bout en bout, ce qui entraîne une baisse des frais de gaz et des transferts plus rapides.

#### Puis-je intégrer les transferts de ponts dans mes contrats intelligents ?

Actuellement, le pont ne prend en charge que les transferts interchaînes des comptes détenus par l'extérieur \(EO\). En effet, le pont utilise la même adresse sur les deux réseaux, en veillant à ce que les fonds déplacés sur le pont soient conservés dans le même portefeuille, et il n'y a pas un moyen de s'assurer qu'un contrat intelligent à une adresse donnée sur Ethereum existe également à la même adresse sur Avalanche. Les jetons ERC20 envoyés à l'adresse du pont depuis des contrats intelligents sur le réseau Ethereum ne seront pas frappés comme des jetons enveloppés sur Avalanche.

#### L'utilisation de tx.origin dans les contrats BridgeToken est-il sûr ?

Lors de l'utilisation de tx.origin pour vérifier l'autorisation dans les contrats intelligents pose des risques pour la sécurité, notre cas d'utilisation ne le fait pas. Dans les contrats de pont, tx.origine est uniquement utilisé pour désautoriser les contrats intelligents d'appeler directement la fonction de « unwrap », puisque le pont ne prend actuellement en charge le transfert que des comptes appartenant à l'extérieur. Il est sûr de le faire en comparant la valeur tx.origin à la valeur msg.sender.

#### Où puis-je trouver plus d'informations sur le design ?

Voir [le pont Avalanche : Transferts d'actifs interchaînes sécurisés en utilisant Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Divers

#### Je ne peux pas voir mes jetons dans mon portefeuille. Sont-ils perdus pour toujours ?

Non. C'est très probablement un problème d'interface utilisateur, et les jetons sont là, mais vous ne voyez pas les jetons. Voir [ici](avalanche-bridge-faq.md#cant-see-funds).

#### Sur la page de la preuve d'actifs, pourquoi ne le montant d'un actif sur Ethereum et le match d'Avalanche ?

Il est possible que le pont soit over-collateralized \(c'est-à-dire que détenir plus d'actifs ERC20 sur Ethereum que d'existence sur Avalanche\) pour trois raisons. Ceux-ci sont tous attendus.

1. Il y a de nouveaux transferts de Ethereum à Avalanche. Le pont ne traite les transferts que lorsque la transaction Ethereum reçoit 35 confirmations. Avant d'alors, le solde de la garantie sera plus que l'offre d'actifs enveloppée.
2. La collatéral AEB a été transférée au nouveau pont d'AB, mais tous les jetons AEB n'ont pas encore été convertis en jetons AB sur Avalanche.
3. Les frais de pont ont été accumulés sur le côté de have L'enclave ne perçoit pas immédiatement les frais générés par le pont. Au lieu de cela, il tient toutes les frais collectés de chaque actif dans le portefeuille de pont jusqu'à ce qu'un seuil configuré soit atteint. À quel point, les frais sont envoyés sur un portefeuille séparé.

#### Où puis-je acheter AVAX ?

En fonction de votre emplacement, vous pouvez être en mesure d'acheter AVAX sur un échange centralisé. Vous pouvez également acheter AVAX sur des bourses décentralisées telles que [Pangolin](https://app.pangolin.exchange/).

#### Comment puis-je contacter une personne pour obtenir un soutien ?

Le support est disponible en utilisant le chat sur [support.avax.network](https://support.avax.network), ou sur notre serveur [Discord](https://chat.avax.network/).** Veuillez faire un effort raisonnable pour rechercher la réponse à votre question avant de vous demander !** Quelqu'un d'autre l'a presque certainement demandé.

#### Qu'est ce que le suffixe .e dans le nom de jeton ?

Le `.e`suffixe indique que l'actif a traversé le pont de Ethereum.

#### Comment configurer Metamask sur Avalanche ?

Pour configurer votre portefeuille Metamask et le connecter au réseau Avalanche, voir [ici](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

#### J'ai transféré mon ERC20 sur le pont d'Avalanche. Où puis-je le trader maintenant ?

Vous pouvez trader des jetons de pont sur plusieurs MAMs différentes sur la C-Chain d'Avalanche, comme [Pangolin](https://app.pangolin.exchange/).

## Écosystème

### Comment ajouter mon projet au répertoire de l'écosystème ?

Pour que votre projet soit ajouté au répertoire de l'écosystème, veuillez envoyer un courriel à `ecosystem@avalabs.org`. Veuillez inclure :

* votre nom de projet
* une brève description de vos services
* une version 88h x 88w .svg du logo de votre projet

   Un membre de l'équipe d'Avalanche vous reviendra pour confirmer l'ajout de votre projet.

#### Comment puis-je obtenir une bannière promue sur la page de l'écosystème ?

Pour faire figurer votre projet dans la section carrousel promotionnel de la page Écosystème d'Avalanche, veuillez soumettre une demande à `ecosystem@avalabs.org`. Veuillez inclure une brève description de votre projet et les détails promotionnels. Un membre de l'équipe de soutien d'Ava Labs vous répondra dans les 2 jours ouvrables.

Les spécifications pour la bannière sont les suivantes :

* Bureau et paysage : 1155px \* 440px
* Portrait et mobile : 720px \* 337px
* Design des éléments en milieu de bannière ou ils seront coupés
* Utilisez la couleur solide en tant que BG ou ont un dégradent qui s'estompe sur #000 \(édité\)
