# Pour commencer

L'objectif de ce tutoriel est de donner une vue d'ensemble générale d'Avalanche et de servir de point de départ pour les nouveaux utilisateurs de l'écosystème d'Avalanche. Une connaissance générale de la crypto-monnaie est assurée, et en particulier une connaissance de l'écosystème Ethereum. Si vous ne comprenez pas quelque chose tout de suite, c'est OK. Rechercher une réponse en ligne, et si vous ne la trouvez pas, demandez sur notre [discorde](https://chat.avax.network).

Nous recommandons de lire ce document entièrement avant d'utiliser Avalanche afin que vous puissiez éviter les pièges et les problèmes communs que les nouveaux utilisateurs rencontrent. Il y a de nombreuses facettes d'Avalanche, donc il est préférable d'obtenir une image complète des choses avant de plonger pour vous sauver la confusion. De plus, ce guide contient des conseils et des avertissements pour vous aider à éviter de tomber victime des scammers.

Vous pouvez trouver un aperçu général d'Avalanche [ici](https://support.avax.network/en/articles/4135427-avalanche-platform-overview). Il sera utile pour comprendre les similitudes et les différences entre Avalanche et d'autres plateformes.

## Frais

Tous les frais sur Avalanche sont payés dans le jeton natif, AVAX, vous en aurez besoin pour interagir avec le réseau Avalanche. Vous pouvez l'obtenir par le biais [d'échanges](https://ecosystem.avax.network/marketplace?tag=exchange). Une autre façon d'acquérir AVAX est l'achat de cartes de crédit sur [Pangolin](https://app.pangolin.exchange/#/buy). D'autres façons sont expliquées ci-dessous.

Si vous utilisez le [pont](https://bridge.avax.network) Avalanche pour transférer des actifs vers Avalanche, vous aurez besoin de certains AVAX pour déplacer/échanger vos actifs. Le pont Avalanche fournit une [chute](https://support.avax.network/en/articles/5462264-is-there-an-airdrop) d'air d'AVAX aux utilisateurs qui transfèrent plus d'une certaine valeur d'actifs à Avalanche. Utilisez cette AVAX pour échanger certains de vos actifs bridged pour AVAX afin que vous puissiez payer les frais de transaction futurs.

## Portefeuille

Une *adresse *peut contenir un solde de crypto-monnaies. Un *portefeuille *contrôle un ensemble d'adresses. Pensez à une adresse comme une blouse et un portefeuille comme une clé pour de nombreuses lockboxes. Un portefeuille est accessible en fournissant une phrase de mot unique et secret de 24 mots.** Si vous perdez cette phrase, vous n'avez pas accès à votre portefeuille et il n'y a pas moyen de récupérer vos actifs !** Par conséquent, il est très important de stocker en toute sécurité la phrase de passe secrète de votre portefeuille . En même temps, **quiconque avec votre phrase de passe peut accéder à et prendre tous vos **actifs, de sorte qu'il est vital de s'assurer que personne d'autre ne connaît votre mot de passe. Il est la meilleure pratique de ne **pas enregistrer votre phrase de passe sur un ordinateur**

Vous pouvez accéder à votre portefeuille sur le site Web d'[Avalanche Wallet](https://wallet.avax.network/). Vous pouvez suivre [ce](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) guide pour configurer un nouveau portefeuille.

Vous pouvez et devez utiliser un [livre matériel](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) pour vous connecter à votre portefeuille.** L'utilisation d'un portefeuille matériel est le moyen le plus sûr d'accéder à vos jetons parce **que vos clés privées et la phrase de passe ne quittent jamais l'appareil.

Une fois que vous avez votre portefeuille, vous pouvez envoyer votre AVAX d'un échange à votre portefeuille. Voyez [ici](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet) pour un guide sur ce point.

Le réseau primaire d'Avalanche se compose de trois chaînes différentes, comme expliqué dans l'article d'aperçu lié ci-dessus. Pour déplacer vos fonds d'une chaîne à l'autre, vous devrez effectuer [des transferts interchaînes](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains).

## Metamask

La plupart de l'activité sur le réseau Avalanche se produit sur diverses dapps \(applications décentralisées\). Pour interagir avec eux, vous pouvez utiliser une extension de navigateur qui connectera votre portefeuille avec les dapp. [Metamask](http://metamask.io/) est une extension de portefeuille populaire.

Par défaut, Metamask se connecte à Ethereum. Pour se connecter à Avalanche, vous devez [ajouter Avalanche en tant que réseau personnalisé](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

En Metamask, vous pouvez créer un nouveau compte et lui envoyer des fonds à partir de votre principal portefeuille d'Avalanche, ou importer le compte d'Avalanche Wallet. Vous pouvez importer le compte soit en utilisant la phrase de passe secrète soit en exportant la clé privée C-Chain du portefeuille \(Sélectionnez `Manage Keys`, puis `View C Chain Private Key`\). Si vous utilisez le portefeuille matériel de Ledger, vous pouvez également l'utiliser en Metamask. Il se connectera à votre portefeuille et a les mêmes soldes et adresses que si vous accédez à votre portefeuille sur le site Web.

Pour voir vos fonds en Metamask \(si vous avez importé Avalanche Wallet\) ou pour pouvoir envoyer des fonds du compte Wallet au compte Metamask, vous devrez avoir vos fonds sur la C-Chain. Si vous avez transféré les fonds d'un échange, ils seront généralement sur la X-Chain, vous devrez donc effectuer un transfert inter-chaîne, comme expliqué dans la section précédente.

## Transactions

Vous pouvez envoyer des jetons depuis le portefeuille d'Avalanche ou Metamask. Il est important de garder à l'esprit que toutes les transactions sont finales et irréversibles. Si vous faites une erreur et que vous envoyez des fonds à une adresse erronée, il n'y a pas de mécanisme qui peut revenir à la transaction et vous renvoyer les fonds. C'est pourquoi il est d'une importance critique d'être sûr que l'adresse que vous envoyez les jetons est correcte et que vous voulez envoyer une adresse sur Avalanche et non un réseau différent \(voir la section suivante.\)

### Envoyer à d'autres réseaux

D'autres réseaux peuvent avoir des formats d'adresse identiques à ceux d'Avalanche. Mais **cela ne signifie pas que vous pouvez envoyer des fonds sur Avalanche directement à d'autres réseaux blockchain, y compris, par **exemple, Ethereum ou BSC \(Binance Smart Chain\). **Si vous dites à Avalanche d'envoyer des fonds à l'adresse \(\), par exemple, elle le fera sur **Avalanche, et non pas sur un autre `0x12345`réseau, même si cette adresse existe ou est valide sur un autre réseau. Vos fonds ne se termineront pas sur l'autre réseau. Une fois les fonds envoyés, seule la personne qui a les clés privées qui contrôlent l'adresse de destination peut jamais y accéder. Si vous **contrôlez l'adresse de destination, vous pouvez probablement être en mesure de les récupérer en importer la clé privée qui contrôle l'adresse sur Metamask. Si vous les avez envoyés à l'adresse de quelqu'un d'autre, cependant, vous aurez besoin de leur coopération, ce qui peut être difficile.

Les ci-dessus s'appliquent également dans la direction inverse. Vous ne pouvez pas envoyer de fonds à une adresse Avalanche directement depuis Ethereum, BSC, etc. Les adresses peuvent paraître identiques et être acceptées, mais cela ne signifie pas que les fonds arriveront dans votre portefeuille. Si vous souhaitez envoyer ou recevoir des fonds d'Ethereum, consultez la section du pont Avalanche \(#[Avalanche Bridge]\) ci-dessous.

Si vous n'êtes pas sûr de ce que vous essayez de faire, ou de faire quelque chose pour la première fois, il est préférable d'envoyer d'abord une petite quantité \('poussière'\) pour vérifier qu'elle arrive à la destination prévue.

### Ajouter des jetons

En plus du jeton natif, AVAX, de nombreux autres jetons existent sur le réseau. Avalanche Wallet a construit en soutien aux jetons les plus populaires, mais Metamask ne le fait pas. Si vous achetez d'autres jetons, ils peuvent ne pas être immédiatement visibles sur votre portefeuille ou de la Metamask. Vous pouvez avoir besoin de les ajouter manuellement, en sélectionnant le bouton 'Ajouter un jeton'. Pour ajouter un jeton, vous devrez connaître l'adresse du contrat de jeton. N'utilisez pas la fonction de recherche dans Metamask, elle ne fonctionne correctement que sur Ethereum. Vous pouvez trouver les adresses des jetons les plus populaires [ici](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json) pour les actifs d'Ethereum, ou [ici](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) pour les actifs d'Avalanche.

Lorsque vous ajoutez l'adresse, le reste des données sera address, et votre solde devrait être visible. Vous pouvez automatiquement ajouter des jetons à Metamask ici en appuyant sur l'icône [Metamask](https://bridge.avax.network/proof-of-assets) dans la que `Wrapped token`vous souhaitez ajouter.

## Dapps

### Pont Avalanche

Une fois que vous avez configuré votre extension de navigateur \(Metamask par exemple\), vous êtes prêt à interagir avec des dapps sur Avalanche. La plupart de ce que vous voulez faire, comme *l'agriculture de *rendement, exige que vous ayez des jetons autres que AVAX. Si vous avez ces jetons sur Ethereum \(ou un échange qui peut les envoyer à Ethereum\), l'un des moyens les moins chers et les plus rapides de les amener est le [pont](https://bridge.avax.network/) d'Avalanche.

Vous pouvez trouver une collection de tutoriels vidéo sur l'utilisation de base du pont d'Avalanche [ici](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP). En outre, assurez-vous que vous passez par la [FAQ](https://docs.avax.network/learn/avalanche-bridge-faq) qui répond aux questions les plus courantes sur le pont et met en lumière les choses à surveiller.

Lorsque vous briguez plus de 75 $ d'actifs ou plus, vous serez également soumis à des vols aériens de certains AVAX pour aider à payer les swaps initiaux. Utilisez ces fonds uniquement pour acquérir d'autres AVAX car vous aurez besoin d'AVAX pour payer des frais sur toutes les autres dapp que vous utilisez ! Si vous êtes bloqué sans assez d'AVAX pour les frais, vous serez incapable de faire autre chose, alors assurez-vous que vous avez toujours un certain AVAX dans votre portefeuille. Vous pouvez échanger sur AVAX sur [Pangolin](https://app.pangolin.exchange).

### Écosystème

Il existe une collection de dapps déployée sur Avalanche. Pour les trouver, vous pouvez aller sur notre [site](https://ecosystem.avax.network/marketplace) officiel de l'écosystème. Vous pouvez filtrer les projets en sélectionnant les balises pour les zones de votre intérêt. Il existe également une liste de projets [menée par](https://www.avax-projects.com/) la communauté. \(Vous ne devez pas considérer la présence d'un projet sur les listes ci-dessus comme une approbation du projet.\)

Plongez-vous, naviguez et essayez des trucs. Il y a beaucoup de pierres précieuses dans là-bas.

## Sécurité

Comme ailleurs dans l'espace de crypto-monnaie, vous devez être au courant des dangers. Toutes les transactions sont finales et irréversibles, et si vous êtes victime d'un scamm, personne ne pourra récupérer vos fonds.

### Passphrase portefeuille

Il est crucial de comprendre que **votre phrase de passe secrète est votre **portefeuille. Celui qui a accès à la phrase de passe secrète 24 mots a un accès complet et complet et un contrôle sur tout ce qui se trouve dans le portefeuille. Si vous donnez à quelqu'un votre mot de passe, vous leur avez donné tout ce qui est dedans. Par conséquent, ne donnez **jamais votre mot de passe à qui que ce **soit. Ne l'envoyez nulle part. Ne le tapissez pas dans les sites Web que vous avez trouvés en ligne ou que quelqu'un vous a envoyé un lien vers La meilleure pratique est de ne pas faire enregistrer votre phrase de passe sur un ordinateur

Le seul endroit où vous pouvez entrer la phrase de passe est dans le site [officiel](https://wallet.avax.network) d'Avalanche Wallet, et même alors, assurez-vous que vous êtes sur un réseau sécurisé et que le site Web est le bon en tapant vous-même `https://wallet.avax.network`l'adresse de l'adresse. Vérifiez l'icône du cadenas dans votre navigateur pour vous assurer que votre connexion est sécurisée. Si vous avez le doute quant à savoir si vous devez entrer votre mot de passe, ne ne le faites pas.

Si vous travaillez avec des quantités de jetons non triviales \(en d'autres termes, l'argent que vous ne pouvez pas perdre confortablement\), nous vous conseillons fortement d'utiliser un [portefeuille matériel de Ledger](https://www.ledger.com/) pour accéder aux fonds de vos f.

### DYOR

Cela signifie « Faites vos propres recherches  ». En d'autres termes, ne faites pas seulement confiance aveugle à tout ce que vous lisez en ligne. Vérifiez d'autres sources, demandez une deuxième opinion. Soyez très prudent et judicieux avec l'acceptation des nouvelles d'une seule source.

Soyez particulièrement méfiants envers les personnes qui vous ont contacté en privé, en offrant une aide sur les questions que vous avez publiées sur des sites publics. Pratiquement chaque fois qu'il arrive, c'est un sammer qui essaie de vous convaincre de présenter votre mot de passe, vos clés privées ou de compromettre d'une autre manière vos jetons.

Ne vous précipitez pas sur des projets inconnus qui promettent des retours hors de portée. Toute dapp que vous déposez vos fonds a accès à celles-ci. Rechercher le projet en ligne et voir qui le maintenait. Vérifiez que les contrats sont vérifiés et vérifiés. Veillez à ce que les drapeaux rouges soient potentiels.

### Fake jetons

N'importe qui peut créer un nouveau jeton, et sur Avalanche il est assez bon marché. En outre, la création de pools de liquidités sur DEXes est sans autorisation, de sorte que n'importe qui peut créer une nouvelle paire avec un faux jeton qui a le même nom et l'image de jeton que la vraie chose. Pour éviter ce genre d'escroqueries, sélectionnez toujours les jetons des listes de jetons officielles sur les DEXes, n'utilisez pas de liens depuis d'autres endroits.

## Explorer

Les explorateurs sont des sites Web qui indexent et présentent une activité du réseau, où vous pouvez rechercher des transactions individuelles, et en savoir plus sur ce qui se passe dans le réseau.

### Explorer officiel

Explorer [explorer.avax.network](https://explorer.avax.network/) est l'explorateur de réseau officiel tenu par Ava Labs.

### AvaScan

[Avascan](https://avascan.info/) est un site Web d'explorateur indépendant, connu pour sa présentation en laque et un aperçu complet, particulièrement intéressant pour la visualisation [des validateurs et des](https://avascan.info/staking/validators) délégués, car il montre de nombreuses informations intéressantes sur les validateurs de réseau individuel.

### VScout

[Vscout](https://vscout.io/) est un autre explorateur alternatif pour Avalanche. Entre autres choses, vous pouvez voir la distribution des validateurs sur la planète.

## Support en ligne

Nous offrons plusieurs façons d'obtenir le soutien. Voici quelques-uns :
* [Site de support](https://support.avax.network/en/)
* [Support technique Twitter](https://twitter.com/avaxtechsupport).
* [Telegram](https://t.me/avalancheavax)
* [Serveur Discord](http://chat.avax.network/) \(le trafic le plus populaire et le plus élevé.\)

Élargissement sur la section [DYOR](#dyor) ci-dessus : lors de l'utilisation de tout canal de support public, soyez méfiants de quiconque vous contacte en privé par l'intermédiaire de DM, d'un courriel ou d'un autre. Ils peuvent poser en tant qu'administrateurs, modérateurs ou membres d'équipe.** Les comptes légitimes ne vous contacteront jamais en premier lieu dans les MM !** Les administrateurs et les membres d'équipe se engageront toujours en premier public et si nécessaire, et vous demanderez que vous les *contactez *en message direct.

Les scammers surveillent les canaux publics pour les personnes qui cherchent de l'aide, puis les contactent en offre privée pour aider. Un scammer peut vous dire que vous devez 'synchroniser votre portefeuille ' ou quelque chose de similaire et vous donner un lien où vous êtes censé entrer la phrase de passe du portefeuille pour compléter le processus. Ils peuvent offrir une application qui résoudra le problème. Dans les deux cas, ce n'est que quelqu'un qui cherche à voler vos fonds.

Il faut le répéter : ne donnez à personne votre mot de passe secret de 24 mots ou vos clés privées !

## Conclusion

Avalanche est une plateforme jeune, mais elle offre de nombreuses opportunités intéressantes et passionnantes pour s'engager et participer à la nouvelle frontière des blockchains. Commencer à se sentir difficile, mais nous espérons que ce document facilitera votre introduction et votre embarquement.

Si vous avez des questions ou des doutes , avez besoin de quelque chose à effacer, ou que vous voulez simplement bavarder, s'il vous plaît rejoindre nous sur notre [serveur](http://chat.avax.network/) Discord. Nous aimerions entendre vos nouvelles.
