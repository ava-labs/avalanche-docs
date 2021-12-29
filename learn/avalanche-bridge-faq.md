# FAQ sur l'Avalanche Bridge (AB)

## FAQ sur l'Avalanche Bridge (AB)

L'[Avalanche Bridge (AB)](https://bridge.avax.network/) peut être utilisé pour transférer des jetons ERC20 d'Ethereum vers la C-Chain d'Avalanche et vice versa. Ce document répond aux questions courantes sur le bridge. Si ce document et d'autres documents ne répondent pas à votre question, vous pouvez nous contacter sur [le site d'assistance d'Avalanche](https://support.avax.network), [Discord](https://chat.avalabs.org) ou [Telegram.](https://t.me/avalancheavax)

### Notes importantes

1. Il existe un bogue dans l'application Metamask Mobile qui affecte les transactions de bridge (**uniquement sur mobile**). Jusqu'à ce que cela soit résolu, n'utilisez pas l'application mobile Metamask pour les transferts de bridge. Utilisez l'application de bureau, ou, si sur mobile, le portefeuille Coinbase.
2. Vous avez besoin d'AVAX pour payer les frais de transaction sur Avalanche. **Vous devez utiliser l'AVAX que vous recevez lors du largage pour effectuer un échange contre plus d'AVAX sur un AMM afin de pouvoir payer les frais de transaction.** Si vous manquez d'AVAX, vous ne pourrez pas effectuer de transactions sur Avalanche.

### Transactions

#### Que puis-je faire si ma transaction semble bloquée ?

Si la transaction Ethereum transférant des fonds sur le bridge vers Avalanche semble bloquée et ne reçoit aucune confirmation, vous pouvez accélérer la transaction comme décrit [ici](avalanche-bridge-faq.md#speed-up-transaction). Si la transaction Ethereum a déjà reçu des confirmations, mais que le minuteur de transaction Avalanche semble être bloqué, vérifiez le solde de votre portefeuille Metamask sur le réseau Avalanche. Il se peut que la transaction ait déjà été traitée mais qu'elle n'apparaisse tout simplement pas sur l'interface utilisateur. Notez que cela peut arriver si vous avez choisi d'« accélérer » votre transaction.

Il est possible, mais très peu probable, que la transaction Ethereum émise par le bridge lors du transfert de fonds vers Ethereum prenne beaucoup de temps pour recevoir 35 confirmations. Cela peut se produire s'il y a une augmentation soudaine et significative des prix du gaz Ethereum. Si la transaction n'est pas incluse dans les 200 blocs de son émission sur Ethereum, une nouvelle transaction avec un prix du gaz plus élevé peut être émise pour "décoller" le transfert.

#### Combien de temps un transfert de bridge prend-t-il ?

La transaction Ethereum devrait prendre 10 à 15 minutes. La transaction Avalance prend quelques secondes.

#### Pourquoi la transaction Avalanche faisant partie du bridge prend beaucoup de temps ?

Cela ne prend que quelques secondes. Si l'interface du bridge montre que cela prend plus de temps, c'est juste un problème avec l'interface. Vos actifs ont été transférés après quelques secondes. Vérifiez votre portefeuille et l'explorateur C-Chain.

#### Que faire si le prix du gaz est supérieur au montant que je transfère ?

Lorsque vous transférez des actifs ERC20 d'Ethereum vers Avalanche, vous utilisez Metamask pour envoyer une transaction Ethereum transférant les fonds. Les frais de transaction dépendent du prix du carburant actuel sur le réseau Ethereum, qui est très variable. Si le prix du carburant est si élevé que les frais de transaction sont supérieurs au montant de la valeur transférée, il est préférable d'attendre que le prix du carburant diminue.

Lors du transfert d'actifs d'Avalanche vers Ethereum, le bridge impose des frais de transfert en nature, comme décrit [ici](avalanche-bridge-faq.md#fees). L'interface utilisateur autorise désormais les transferts inférieurs au montant des frais. Si un utilisateur génère et émet manuellement une telle transaction, le bridge marquera le transfert comme non valide et ne le traitera pas.

#### Puis-je envoyer des jetons créés sur Avalanche vers Ethereum ?

Pas encore. L'AB ne prend actuellement en charge que le transfert de jetons ERC20 créés sur Ethereum vers Avalanche et inversement. Il est prévu de permettre cela à l'avenir.

#### Puis-je envoyer l'ETH ou le BTC sur le bridge ?

L'AB ne prend pas en charge actuellement l'ETH ou le BTC natif. Cependant, vous pouvez transférer la version emballée de ces actifs (WETH et WBTC) à travers le bridge.

#### Que faire si ma transaction n'est pas visible dans l'explorateur ?

Les transactions qui correspondent aux transferts de bridge apparaîtront sur les explorateurs des réseaux Avalanche et Ethereum. L'affichage des transactions peut prendre quelques minutes. Pour rechercher votre transaction dans l'explorateur, copiez et collez votre adresse dans [la C-Chain Explorer](https://snowtrace.io/) ou [Etherscan d'Avalanche](https://etherscan.io/). Pour voir les transactions envoyées par le bridge lui-même, vous pouvez chercher [ici](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) pour Avalanche et [ici](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) pour Ethereum. Si vous ne voyez pas encore votre transaction, consultez [Telegram](https://t.me/avalancheavax) ou [Discord](https://chat.avax.network/).

#### Existe-t-il des tutoriels sur la façon d'utiliser le bridge ?

Oui, vous pouvez afficher les tutoriels vidéo pour la fonctionnalité de bridge [ici](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### Comment payer les frais de transaction sur Avalanche ?

Sur Avalanche, les frais de transaction sont payés en AVAX, l'actif natif. Afin d'envoyer des transactions sur la C-Chain d'Avalanche, vous devez avoir suffisamment d'AVAX dans votre portefeuille pour couvrir le coût du gaz pour la transaction. Pour vous aider à démarrer sur Avalanche, le bridge vous déposera une petite quantité d'AVAX si vous déplacez plus de 75 $ (sous réserve de modification) de jetons depuis Ethereum. Afin d'éviter de manquer d'AVAX pour couvrir vos frais de transaction, nous vous recommandons d'acheter d'abord une quantité adéquate d'AVAX. Vous pouvez le faire sur [Pangolin](https://app.pangolin.exchange/).          

#### Puis-je envoyer à une adresse différente sur l'autre réseau ?

Le bridge permet uniquement les transferts vers la même adresse sur l'autre réseau. Une fois l'actif transféré vers l'autre réseau, il peut être envoyé à n'importe quelle adresse ou contrat.

#### Puis-je accélérer ma transaction ? <a id="speed-up-transaction"></a>

Oui, vous pouvez cliquer sur le bouton « Speed Up » sur Metamask. « L'accélération » d'une transaction via Metamask émet une nouvelle transaction sur Ethereum dont le prix du gaz est plus élevé que la transaction initialement envoyée. Étant donné que la nouvelle transaction a un prix du gaz plus élevé, il est plus probable qu'elle soit incluse dans un bloc. Uniquement une seule des transactions \(l'originale et « l'accélérée »\) sera acceptée. L'accélération d'une transaction qui transfère des fonds vers le bridge est sûre. Cependant, l'interface utilisateur ne sera pas au courant de la nouvelle transaction, ce qui signifie que vous ne verrez peut-être pas les confirmations dans l'interface utilisateur. Une fois que la nouvelle transaction a 35 confirmations sur Ethereum, vérifiez votre portefeuille Metamask sur Avalanche pour voir les fonds emballés.

#### Pourquoi le nombre de jetons affiché sur Metamask ne correspond-il pas au nombre que j'ai spécifié ?

Lors du transfert d'Avalanche vers Ethereum, Metamask indique que X jetons doivent être transférés, et non le nombre réel de jetons. C'est un problème connu avec Metamask.

#### Quelle est l'adresse de Bridge sur Ethereum et Avalanche ?

Adresses de bridge :

* Ethereum :[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche :[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://snowtrace.io/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Notez que **vous ne devez pas transférer directement des jetons vers ces adresses**. Vous devez utiliser l'interface utilisateur du Bridge, qui vérifie les transactions mal formées.

### Frais

#### Comment fonctionnent les frais sur l'Avalanche Bridge ?

Le bridge facture des frais de transfert afin de couvrir le coût des frais de transaction sur les réseaux Avalanche et Ethereum, ainsi que les coûts d'exploitation de l'infrastructure du bridge. Ces frais sont facturés en nature avec l'actif ERC20 transféré. En d'autres termes, une partie du solde transféré est destinée à couvrir les frais.

Lors du transfert d'actifs d'Ethereum vers Avalanche, les frais de passage s'élèvent à 3 $ de l'actif ERC20 transféré. Les transferts vers Avalanche peuvent être admissibles à un airdrop \(Largage\) AVAX comme décrit [ici](avalanche-bridge-faq.md#airdrop).

Lors du transfert des actifs d'Avalanche vers Ethereum, les frais de passage sont en grande partie basés sur les frais de transaction Ethereum **attendus**, qui sont calculés à l'aide des prix des actifs actuels, le prix du carburant actuel et le montant approximatif de carburant qui seront utilisés par la transaction Ethereum. En tant que tel, les frais de transaction Ethereum, et donc les frais de passage, peuvent être très variables. Pour tenir compte de la volatilité des prix, un montant constant en dollars \(actuellement 15 $\) est ajouté aux frais de passage. Notez que les frais de passage seront différents des frais de transaction Ethereum affichés dans les explorateurs tels qu'Etherscan, car les prix des actifs, le prix du carburant Ethereum et la quantité de carburant utilisée par les transactions Ethererum fluctuent. Les frais de passage attendus sont affichés dans l'interface utilisateur de passage lors de l'exécution d'un transfert.

#### Pourquoi le montant de l'actif que j'ai reçu sur un réseau ne correspond-il pas au montant que j'ai envoyé à partir d'un autre réseau ?

Le bridge impose des frais. Voir ci-dessus.

#### Comment est estimé le gaz ? Comment le bridge obtient-il des prix de jeton ?

Le bridge utilise des flux de données sur les prix Chainlink pour obtenir des informations sur le prix du gaz pour le réseau Ethereum. Le prix du gaz utilisé est le plus élevé entre la valeur Chainlink FASTGAS et l'approximation du prix du gaz de Geth. Le prix du gaz est complété par quelques GWEI pour garantir que les transactions envoyées par le bridge soient rapidement incluses dans un bloc Ethereum.

Le bridge utilise également des flux de données sur les prix Chainlink pour déterminer les prix des jetons utilisés pour calculer le montant d'un jeton équivalent aux frais du bridge.

#### Y a-t-il un airdrop \(largage\) ? <a id="airdrop"></a>

Les utilisateurs obtiendront leur airdrop d'au moins 0,1 AVAX lorsqu'ils transfèrent plus de 75 $ \(sous réserve de modification\) d'un jeton d'Ethereum à Avalanche.

#### Que faire si je n'ai pas reçu mon airdrop ?

Si vous n'avez pas reçu votre airdrop, veuillez confirmer que le montant du transfert correspond au montant minimum requis.

### Sécurité

#### L'Avalanche Bridge est-il fiable ?

L'Avalanche Bridge est fiable dans le sens où aucune partie n'est en mesure d'accéder à l'un des fonds détenus en garantie ou à des actifs emballés et frappés. Tous les transferts à travers le pont doivent être approuvés par 3 des 4 parties indépendantes \(appelées gardiens\). En ce sens, l'utilisation du bridge ne nécessite aucune confiance en une partie pour transférer vos fonds.

#### Quel est le rôle des gardiens ?

Le rôle des gardiens est quadruple :

1. Stocker des actions secrètes
2. Indexer des blockchains prises en charge
3. Suivre les transactions traitées
4. Héberger des informations publiques

Une résumé complet du rôle et des responsabilités d'un gardien peut être trouvé [ici](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

#### Quelle est la relation entre Ava Labs et les gardiens ?

Les gardiens sont des partenaires de confiance de la Fondation Avalanche. Ils ont un passif d'excellence technique et ont travaillé avec Avalanche.

#### Le code a-t-il été vérifié ? Où sont les rapports de vérification ?

Oui, le code pour le bridge, le gardien et les contrats intelligents a été vérifié par Halborn. Les rapports de vérification peuvent être trouvés [ici.](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1)

### Jetons

#### Mon transfert vers Avalanche est terminé mais je ne vois pas mes actifs sur Metamask Avalanche. Que s'est-il passé ? <a id="cant-see-funds"></a>

Vous devez dire à Metamask de rechercher les jetons. Assurez-vous d'ajouter les jetons de la liste de [jetons du Avalanche Bridge](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) à Metamask. La façon la plus facile de le faire est d'aller à la page Web [Preuve d](https://bridge.avax.network/proof-of-assets)'actifs et de cliquer sur l'icône Metamask à côté du jeton dont vous avez besoin \(pour WETH ce serait WETH.e, pour USDT recherchez USDT, par exemple\).

#### Quel type de jetons peut être transféré à travers le bridge ?

Seuls les jetons ERC20 pris en charge peuvent être transférés à travers le bridge. Sur Avalanche, ces jetons sont représentés par le symbole du jeton avec ".e" ajouté. Par exemple, le jeton DAI transféré par le bridge est DAI.e.

#### J'ai envoyé ETH sur le bridge, mais je ne le vois sur Avalanche !

Vous ne l'avez probablement pas fait. L'envoi d'ETH à Avalanche sur Avalanche Bridge se fait par deux transactions. La première transaction, effectuée entièrement sur Ethereum, emballe ETH en WETH, qui est ensuite déposé dans votre portefeuille Ethereum. Après cela, vous devez lancer une deuxième transaction pour envoyer WETH à Avalanche, où WETH.e sera déposé dans votre portefeuille, après 35 confirmations de la deuxième transaction sur Ethereum. Vous devrez ajouter WETH.e à Metamask pour les voir dans votre portefeuille.

#### Comment déballer WETH.e en ETH sur Avalanche ?

Ce n'est pas possible. L'ETH sur Avalanche n'existe pas. Vous pouvez utiliser WETH.e, une représentation emballée d'ETH, dans des contrats intelligents et des dapps sur Avalanche.

#### Comment emballer / déballer l'ETH sur Ethereum ?

Vous pouvez utiliser la fonction SWAP de Metamask pour échanger de l'ETH vers WETH. Par ailleurs, vous pouvez également utiliser un AMM comme [Uniswap](https://app.uniswap.org/#/) sur Ethereum.

#### Comment puis-je ajouter un jeton au bridge ?

Voir [ici](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### Comment puis-je ajouter un jeton utilisé dans le bridge vers Metamask ?

Voir [ici](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) pour un tutoriel.

#### Pourquoi y a-t-il deux types du même jeton ? Comment puis-je savoir lequel provient de l'Avalanche Bridge ?

En général, lorsque vous interagissez avec des contrats intelligents et des dapps tels que Pangolin, **vous souhaitez utiliser le jeton avec .e à la fin**.

L'Avalanche Bridge \(AB\) de la génération actuelle auquel ce document fait référence est antérieur à la mise en œuvre précédente du bridge appelé AEB. Le bridge AEB et le bridge AB ont chacun leurs ensembles de jetons uniques. Les jetons AEB ont été dépréciés au profit des jetons AB. Les jetons AB ont un suffixe `.e`. Bien que le nom et le symbole d'un jeton soient de bonnes références pour différencier les deux, le seul moyen infaillible de vérifier un jeton est l'adresse de contrat. Les adresses de contrat du jeton AB peuvent être trouvées [ici.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### Pourquoi le jeton nouvellement verrouillé par le bridge n'apparait-il pas automatiquement dans mon portefeuille ?

Les jetons ne sont pas détenus par votre adresse de chaîne C, mais plutôt dans le contrat intelligent du jeton. Vous devez indiquer à votre portefeuille \(c'est-à-dire Metamask\) quels contrats intelligents vérifier pour voir les soldes détenus par vos adresses.

#### L'Avalanche Bridge prend-il en charge le transfert de NFT ?

Actuellement, l'Avalanche Bridge ne prend pas en charge les transferts de NFT.

### Chaines prises en charge

#### Quelles chaînes sont prises en charge par l'Avalanche Bridge ?

L'Avalanche Bridge ne prend actuellement en charge que le transfert des Ethereum ERC20 vers la C-Chain d'Avalanche et vice versa. La prise en charge du transfert des ERC20 créés sur la C-Chain d'Avalanche est prévue. La prise en charge des réseaux autres qu'Avalanche et Ethereum est également prévue.

#### Puis-je relier les actifs de \(réseau\) à Avalanche ?

L'Avalanche Bridge peut uniquement transférer des actifs entre Ethereum et Avalanche. Pour transférer des actifs d'un autre réseau sur Avalanche, vous pouvez effectuer l'une des opérations suivantes :

* Transférer ces actifs vers Ethereum et de Ethereum vers Avalanche
* Utilisez un bridge tiers non créé/maintenu/supporté par Ava Labs
* Achetez AVAX sur un échange centralisé et retirez AVAX vers Avalanche, puis utilisez un AMM pour échanger d'autres actifs.

### AEB \(Bridge déprécié\)

L'Avalanche Bridge \(AB\) de la génération actuelle auquel ce document fait référence est antérieur à la mise en œuvre précédente du bridge appelé AEB. Cette section traite des questions sur la mise en œuvre précédente du bridge \(AEB\).

#### Quand l'AEB cesse-t-il de fonctionner ?

L'AEB est désactivé et les transferts à travers celui-ci ne sont plus possibles. Les fonds détenus du côté Ethereum de l'AEB ont été transférés vers le nouveau Avalanche Bridge \(AB\). Les conversions de jetons ont été activées sur la C-Chain d'Avalanche, permettant aux utilisateurs de convertir leurs jetons AEB sur une base 1-1 pour leur équivalent sur l'Avalanche Bridge. Cette conversion peut être effectuée sur [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Les délais de prise en charge des jetons AEB seront laissés aux projets DApp individuels.

#### Puis-je transférer mes jetons AEB vers Ethereum ?

Afin de déplacer vos jetons AEB vers Ethereum, vous devez d'abord les convertir en jetons AB comme décrit dans la question ci-dessus. Une fois converti, vous pouvez utiliser le nouveau Avalanche Bridge pour déplacer les jetons AB vers Ethereum.

#### Comment convertir mes jetons AEB \(Bridge déprécié\) en jetons Avalanche Bridge \(AB\) ?

Vous pouvez convertir vos jetons AEB en jetons AB à l'aide de [l'interface utilisateur AB](http://bridge.avax.network/convert). En outre, de nombreux projets de l'écosystème comme Pangolin s'efforcent de permettre aux utilisateurs de convertir facilement leurs jetons et d'entrer dans de nouveaux pools de liquidités.

### Conception/technique

#### Une seule clé privée peut-elle frapper des jetons ?

Aucune partie n'a accès à l'adresse de l'enclave SGX. Seule l'enclave elle-même peut construire/signer une transaction en utilisant cette clé lorsqu'elle reçoit les approbations de 3 des 4 gardiens. En ce sens, l'enclave fonctionne ici comme un contrat intelligent inter-chaînes.

#### Pourquoi le bridge ne détient-il pas de fonds dans un contrat intelligent ?

Ne pas utiliser de contrat intelligent simplifie les exigences de transfert de bout en bout, ce qui se traduit par des frais de gas inférieurs et des transferts plus rapides.

#### Puis-je intégrer les transferts de bridge dans mes propres contrats intelligents ?

Actuellement, le bridge ne prend en charge que les transferts inter-chaînes à partir de comptes externes \(EOA\). En effet, le bridge utilise la même adresse sur les deux réseaux, garantissant que les fonds transférés vers le bridge sont conservés dans le même portefeuille, et il n'y a aucun moyen de garantir qu'un contrat intelligent à une adresse donnée sur Ethereum existe également à la même adresse sur Avalanche. Les jetons ERC20 envoyés à l'adresse du bridge à partir de contrats intelligents sur le réseau Ethereum ne seront pas émis en tant que jetons emballés sur Avalanche.

#### L'utilisation de tx.origin dans les contrats BridgeToken est-elle sûre ?

Bien que l'utilisation de tx.origin pour vérifier l'autorisation dans les contrats intelligents pose des risques de sécurité potentiels, notre cas d'utilisation est sûr. Dans les contrats de bridge, tx.origin n'est utilisé que pour interdire aux contrats intelligents d'appeler directement la fonction « Déballer », car le bridge ne prend actuellement en charge que les transferts à partir de comptes externes. Vous pouvez le faire en toute sécurité en comparant la valeur tx.origin à la valeur msg.sender.

#### Où puis-je trouver plus d'informations sur la conception ?

Voir [Avalanche Bridge : Sécuriser les transferts d'actifs inter-chaînes à l'aide d'Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Divers

#### Je n'arrive pas à voir mes jetons dans mon portefeuille. Sont-ils perdus pour toujours ?

Non. Il s'agit très probablement d'un problème d'interface utilisateur, et les jetons sont là, mais vous ne les voyez tout simplement pas. Voir [ici](avalanche-bridge-faq.md#cant-see-funds).

#### Sur la page Preuve d'actifs, pourquoi le montant d'un actif sur Ethereum et Avalanche ne correspond-il pas ?

Il est possible que le bridge soit surdimensionné \(c'est-à-dire qu'il détienne plus d'un actif ERC20 sur Ethereum qu'il n'en existe sur Avalanche\) pour trois raisons. Ceux-ci sont tous attendus.

1. Il y a de nouveaux transferts d'Ethereum vers Avalanche. Le bridge ne traite les transferts que lorsque la transaction Ethereum reçoit 35 confirmations. Avant cela, le solde de la garantie sera supérieur à l'offre d'actifs emballés.
2. La garantie AEB a été transférée vers le nouveau bridge AB, mais tous les jetons AEB n'ont pas encore été convertis en jetons AB sur Avalanche.
3. Les frais de bridge se sont accumulés du côté d'Ethereum. L'enclave ne recueille pas immédiatement les frais générés à partir du bridge. Au lieu de cela, elle détient tous les frais collectés de chaque actif dans le portefeuille de bridge jusqu'à ce qu'un seuil configuré soit atteint. À ce stade, les frais sont envoyés dans un portefeuille séparé.

#### Où puis-je acheter de l'AVAX ?

Selon votre emplacement, vous pourrez peut-être acheter AVAX sur un échange centralisé. Vous pouvez également acheter AVAX sur des échanges décentralisés comme [Pangolin.](https://app.pangolin.exchange/)

#### Comment puis-je contacter quelqu'un pour obtenir de l'aide ?

De l'aide est disponible via le chat sur [support.avax.network](https://support.avax.network) ou sur notre serveur [Discord](https://chat.avax.network/). **Veuillez faire un effort raisonnable pour rechercher la réponse à votre question avant de demander !** Quelqu'un d'autre a sûrement déjà posé la question.

#### Que signifie le suffixe .e dans le nom du jeton ?

Le suffixe `.e` indique que l'actif a traversé le bridge depuis Ethereum.

#### Comment puis-je configurer Metamask sur Avalanche ?

Pour configurer votre portefeuille Metamask et le connecter au réseau Avalanche, cliquez [ici](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

#### J'ai transféré mon ERC20 sur l'Avalanche Bridge. Où puis-je l'échanger à présent ?

Vous pouvez échanger des jetons de bridge sur plusieurs AMM différents sur la C-Chain d'Avalanche, tels que [Pangolin](https://app.pangolin.exchange/).

## Écosystème

### Comment puis-je ajouter mon projet au répertoire de l'écosystème ?

Pour ajouter votre projet au répertoire de l'écosystème, veuillez envoyer un e-mail à `ecosystem@avalabs.org`. Veuillez inclure :

* le nom de votre projet
* une brève description de vos services
* une version 88h x 88w .svg du logo de votre projet

   Un membre de l'équipe Avalanche reviendra vers vous pour confirmer l'ajout de votre projet.

#### Comment puis-je obtenir une bannière promue sur la page de l'écosystème ?

Pour que votre projet soit répertorié dans la section Promotions de la page Écosystème Avalanche, veuillez soumettre une demande à `ecosystem@avalabs.org`. Veuillez inclure une brève description de votre projet et les détails de la promotion. Un membre de l'équipe d'assistance Ava Labs vous répondra dans les 2 jours ouvrables.

Les spécifications de la bannière sont les suivantes :

* Bureau et paysage : 1155px \* 440px
* Portrait et Mobile :  720px \* 337px
* Éléments de conception au milieu de la bannière ou ils seront coupés
* Utilisez une couleur unie comme BG ou un dégradé qui s'estompe jusqu'à # 000000 \(édité\)

