# Créez des NFT avec le portefeuille Avalanche

## Jetons non fongibles sur Avalanche

Outre le jeton AVAX natif, la [plateforme Avalanche](../plateforme/) prend en charge nativement la création d'autres types d'actifs numériques: actifs à capitalisation fixe, actifs à capitalisation variable et jetons non fongibles \(NFT\).

Contrairement aux jetons réguliers, qui sont interchangeables \(fongibles\), ce qui signifie que chacun est le même, chaque jeton non fongible est unique sur le réseau, avec un identifiant distinct le rendant différent de tout autre. Cela permet de nombreux cas d'utilisation qui seraient impossibles avec des jetons interchangeables, comme la preuve de propriété d'un actif unique.

## NFT Studio sur le portefeuille Avalanche

Pour faciliter l'expérimentation de la création et de l'échange de NFT, nous avons intégré **NFT Studio** au [Avalanche portefeuille](https://wallet.avax.network/), où vous pouvez l'utiliser pour créer des NFT en tant qu'actifs que nous appelons Collectibles. Les objets de collection peuvent être des NFT génériques avec une image et une description, ou des NFT personnalisés avec des charges utiles contenant des données JSON, URL personnalisées ou UTF-8. Vous pouvez les créer à l'aide d'une simple interface pointer-cliquer, vous permettant de passer d'une idée d'envoi de NFT à vos amis en quelques minutes. Aucune connaissance technique requise.

Pour accéder au **NFT Studio**, connectez-vous à votre portefeuille Avalanche, et sur le côté gauche, sélectionnez **Studio**:

![](../../.gitbook/assets/image%20%2867%29.png)

Cela ouvrira le NFT Studio. Là, vous avez deux options: **New Family**, pour la création d'une nouvelle famille de NFT, et **Mint Collectible** pour créer de nouveaux actifs dans les familles existantes. Nous devons créer notre première famille de NFT, alors cliquez sur **New Family**.

### Créer une famille NFT

Là, il vous sera demandé d'entrer le nom de votre famille \(Name\) à collectionner, ainsi qu'un symbole \(ticker\). Les noms ne doivent pas être uniques.

![](../../.gitbook/assets/image%20%2847%29.png)

Outre le nom et le symbole, vous devrez entrer le **nombre de groupes \(Number of Groups\)**, c'est-à-dire combien d'objets de collection distincts la famille nouvellement créée détiendra. Choisissez avec soin, car une fois créés, les paramètres de la famille à collectionner ne peuvent pas être modifiés.

Lorsque vous avez choisi le nom, le symbole et le nombre de groupes, appuyez sur **Create** pour créer réellement la famille à collectionner. Les frais de transaction seront déduits du solde de votre portefeuille. Lorsque la famille est créée, vous verrez l'ID de transaction \(TxID\), ainsi que les paramètres de la famille. Vous pouvez utiliser le TxID pour rechercher la transaction dans[ l'explorateur](https://explorer.avax.network/), mais il n'est pas nécessaire de l'écrire.

Appuyez sur **Back to Studio** pour revenir et nous sommes prêts à créer nos premiers objets de collection. Appuyez sur **Mint Collectible**.

### Mint les NFTs

Après avoir appuyer sur **Mint Collectible** on vous présentera une liste de toutes les familles à collectionner qui ont encore des groupes à collectionner qui n'ont pas encore été créés.

![](../../.gitbook/assets/image%20%2848%29.png)

Sélectionnez la famille que nous venons de créer. Il vous sera présenté un formulaire à remplir avec les paramètres du nouvel objet de collection:

![](../../.gitbook/assets/image%20%2861%29.png)

Par défaut, un type générique d'objet de collection sera sélectionné. C'est un NFT qui a un **titre \(Title\)**, une **URL** pour l'image et une **description**. Entrez les données requises, ainsi que la **quantité \(quantity\)**, qui déterminera le nombre d'exemplaires de l'objet de collection qui seront créés et, par conséquent, combien vous pourrez en envoyer. Comme auparavant, saisissez soigneusement les données, vous ne pourrez rien changer une fois que les objets de collection seront frappés. Vous verrez un aperçu des données où vous pourrez vérifier à quoi ressemblera votre objet de collection.

Si vous souhaitez avoir autre chose qu'une photo à collectionner, sélectionnez **Custom**.

![](../../.gitbook/assets/image%20%2868%29.png)

Un objet de collection custom peut contenir une chaîne encodée en **UTF-8** , une **URL**, ou un **JSON** payload. La taille des données ne peut pas dépasser 1 024 caractères.

Après avoir entré et vérifié les données, appuyez sur **Mint** pour créer l'objet de collection. Les frais de transaction seront déduits de votre portefeuille et un objet de collection nouvellement créé sera placé dans votre portefeuille.

### Voir vos collectibles

Un aperçu de vos objets de collection est toujours visible en haut de l'écran, avec vos soldes.

![](../../.gitbook/assets/image%20%2849%29.png)

Pour voir vos objets de collection plus en détail, sélectionnez **Portfolio** dans le menu de gauche. Vous serez présenté avec un écran montrant tous vos actifs, avec des jetons sélectionnés par défaut. Changez la sélection en **collectibles** en cliquant sur l'onglet correspondant.

![](../../.gitbook/assets/image%20%2865%29.png)

Pour chaque objet de collection générique, une image sera affichée, ainsi que le titre et le numéro indiquant le nombre d'exemplaires de l'objet de collection dans votre portefeuille. En survolant l'objet à collectionner avec votre pointeur, vous verrez la description détaillée:

![](../../.gitbook/assets/image%20%2866%29.png)

Si vous sélectionnez un objet de collection en cliquant dessus, vous verrez à quel groupe il appartient, sa quantité, ainsi que le bouton **Send.**

## Envoyer des NFTs

Pour envoyer votre objet de collection à quelqu'un, cliquez sur le bouton **Send** sur l'objet de collection sélectionné dans le portefeuille, ou accédez à l'onglet **Send** dans le menu de gauche, puis cliquez sur **Add Collectible**:

![](../../.gitbook/assets/image%20%2857%29.png)

Un menu vous sera présenté pour sélectionner un objet de collection que vous souhaitez envoyer.

![](../../.gitbook/assets/image%20%2864%29.png)

Vous pouvez envoyer plusieurs objets de collection en une seule transaction. En cliquant sur l'étiquette de l'objet de collection, vous pourrez modifier le nombre d'exemplaires que vous souhaitez envoyer. Vous pouvez envoyer plusieurs familles et types d'objets à collectionner en une seule transaction.

Lorsque vous avez entré l'adresse de destination et, le cas échéant, entré le texte du mémo, appuyez sur **Confirm** pour lancer la transaction.

![](../../.gitbook/assets/image%20%2853%29.png)

Après avoir appuyé sur **Send Transaction** , elle sera publiée sur le réseau et les frais de transaction seront déduits de votre solde. Les objets de collection seront déposés à l'adresse de destination peu de temps après.

## Résumé

Maintenant, vous devez savoir comment créer des familles NFT, créer des groupes NFT et les envoyer à d'autres adresses. Aie du plaisir avec ça! Assurez-vous de partager vos créations avec nous sur [nos réseaux sociaux](https://www.avalabs.org/social)!

Si vous souhaitez connaître le contexte technique du fonctionnement des NFT sur le réseau Avalanche ou si vous souhaitez créer des produits à l'aide de NFT, veuillez consulter le [didacticiel NFT](creation-dun-nft-partie-1.md). Si vous avez des questions techniques, contactez-nous sur notre [Telegram](https://t.co/gDb4teV2L6?amp=1).

