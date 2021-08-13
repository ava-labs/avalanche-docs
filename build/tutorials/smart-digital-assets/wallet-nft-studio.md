# Créer des NFT avec le portefeuille Avalanche

## Tokens non fongibles sur l'avalanche

[Avalanche](../platform/) soutient la création d'actifs numériques, y compris les actifs à plaquette fixe, les actifs à plaquette variable et les jetons non fongibles \(NFTs\).

Certains actifs sont fungibles, ce qui signifie que toutes les unités de cet actif sont parfaitement interchangeables. Les notes d'une monnaie sont fungibles, par exemple : une note de 5 $ est la même traitée que n'importe quelle autre note de 5 $. Certains actifs, en revanche, sont non fongibles. Autrement dit, les éléments ne sont pas uniques et parfaitement interchangeables. L'immobilier est non fongible parce que chaque terrain est distinct.

Les jetons non fongibles sont une façon utile de représenter la preuve de la propriété d'un bien unique.

## Studio NFT sur Avalanche Wallet

Le **Studio NFT** dans le [portefeuille Avalanche](https://wallet.avax.network/) peut être utilisé pour créer des NFT. Dans ce tutoriel, nous allons créer un actif **Collectible** : un NFT générique avec une image et une description, ou avec une charge utile personnalisée. Vous pouvez les créer en utilisant un simple point et l'interface clique, et aucune connaissance technique requise.

Pour accéder au **studio NFT**, connectez-vous au portefeuille Avalanche. Sur le côté gauche, sélectionnez **Studio**:

![Studio NFT](../../../.gitbook/assets/nft-studio-01-select.png)

Cela ouvre NFT Studio. Vous y avez deux options : **Nouvelle famille**, pour la création d'une nouvelle famille de FT, et **Monnaie Collectable** pour la création de nouveaux actifs dans les familles existantes. Nous devons créer notre première famille de NFT, alors cliquez sur **Nouvelle famille**.

### Créer une famille NFT

Là, vous serez invité à entrer le nom de votre famille collectionnable, ainsi qu'un symbole \(ticker\). Les noms n'ont pas à être uniques.

![Créer une nouvelle famille](../../../.gitbook/assets/nft-studio-02-family.png)

Vous aurez également besoin d'entrer une valeur pour **le Nombre de groupes**, qui spécifie combien de biens distincts les propriétaires de la famille nouvellement créée. Choisissez soigneusement, car une fois créé, les paramètres de la famille collectionnable ne peuvent pas être changés.

Lorsque vous avez terminé, appuyez sur **Créer** pour créer la famille collectionnable. Les frais de transaction seront déduits du solde de votre portefeuille. Lorsque la famille est créée, vous verrez l'ID de transaction \(TxID\), ainsi que les paramètres de la famille. Vous pouvez utiliser le TxID pour rechercher la transaction dans [l'explorateur](https://explorer.avax.network/), mais il n'est pas nécessaire de l'écrire.

Appuyez **sur le retour au Studio** pour revenir, et nous sommes prêts à créer nos premiers objets de collection. Appuyez **sur la Monnaie collective**.

### Mint Mint

Après avoir appuyé **la Monnaie** Collectible, vous serez présenté avec une liste de toutes les familles Collectibles qui ont toujours des groupes Collectibles qui n'ont pas encore été créés.

![Sélectionner une famille](../../../.gitbook/assets/nft-studio-03-select-family.png)

Sélectionnez la famille que vous avez créée plus tôt. Vous serez invité à remplir un formulaire avec les paramètres du nouveau collectable.

![Mint a Collectible](../../../.gitbook/assets/nft-studio-04-mint.png)

Par défaut, un type **générique** de collection sera sélectionné. C'est une NFT qui a un **titre**, une **URL** pour l'image, et une **description**. Entrez les données requises, ainsi que la **Quantité**, qui déterminera combien de copies de la collection sont créées. Comme auparavant, entrez les données avec précaution: vous ne serez pas en mesure de changer quoi que ce soit une fois que les jetons seront pensés. Vous verrez une vue d'aperçu des données où vous pouvez vérifier à quoi votre collectionnable ressemblera.

Si vous souhaitez avoir autre chose en plus d'une image collectable, sélectionnez **Personnalisé**.

![Collectivité personnalisée](../../../.gitbook/assets/nft-studio-05-custom.png)

Une custom peut contenir une chaîne encodée **UTF-8**, une **URL** ou une charge utile **JSON**. La taille des données ne peut pas dépasser 1024 octets.

Lorsque vous avez terminé, appuyez **sur la Menthe** pour créer le collectible. Les frais de transaction seront déduits de votre portefeuille et une nouvelle collection sera placée dans votre portefeuille.

### Voir vos collections

Une vue d'ensemble de vos objets de collection est toujours visible en haut de l'écran, ainsi que vos soldes

![Aperçu général](../../../.gitbook/assets/nft-studio-06-overview.png)

Pour voir vos objets de collection plus en détail, sélectionnez **Portfolio** dans le menu latéral gauche. Vous serez présenté avec un écran montrant tous vos actifs, avec les jetons sélectionnés par défaut. Modifiez la sélection en **Collectibles** en cliquant sur l'onglet correspondant.

![Liste des collectivités](../../../.gitbook/assets/nft-studio-07-collectibles.png)

Pour chaque collection Générique, une image sera affichée, avec le titre, et le numéro indiquant combien d'exemplaires de la collection sont dans votre portefeuille. Le vol au-dessus de la collection avec votre pointeur montrera la description détaillée:

![Détails collectifs](../../../.gitbook/assets/nft-studio-08-detail.png)

Si vous sélectionnez une collectionnable en cliquant dessus, vous verrez à quel groupe il appartient à sa quantité, avec le bouton **Envoyer.**

## Envoyer les FTN

Pour envoyer votre collection à quelqu'un, soit cliquez sur le bouton **Envoyer** sur la collection sélectionnée dans le Portefeuille, soit naviguez pour **Envoyer** l'onglet sur le menu côté gauche, puis cliquez sur **Ajouter Collectible**:

![Choisir les meubles](../../../.gitbook/assets/nft-studio-09-send.png)

Vous serez présenté avec un menu pour sélectionner une collection que vous souhaitez envoyer.

![Multiples collectionnables](../../../.gitbook/assets/nft-studio-10-multiple.png)

Vous pouvez envoyer plusieurs objets de collection en une seule opération. En cliquant sur l'étiquette de la collection, vous pourrez modifier le nombre de copies que vous souhaitez envoyer. Vous pouvez envoyer plusieurs familles et types collectionnables en une seule opération.

Lorsque vous avez entré l'adresse de destination, appuyez sur **Confirmer** pour lancer la transaction.

![Transaction](../../../.gitbook/assets/nft-studio-11-send-transaction.png)

Après avoir appuyé **Envoyer la transaction** il sera publié sur le réseau, et les frais de transaction seront déduits de votre solde. Les meubles collectifs seront déposés dans l'adresse de destination peu après.

## Résumé

Maintenant, vous pouvez créer des familles NFT, des groupes NFT mint et envoyer des NFT. Amusez-vous ! Assurez-vous de partager vos créations avec nous sur nos [réseaux sociaux ](https://www.avalabs.org/social)!

Si vous souhaitez connaître le contexte technique de la façon dont les NFT fonctionnent sur le réseau Avalanche ou souhaitez construire des produits à l'aide de NFT, veuillez consulter ce [tutoriel](creating-a-nft-part-1.md) NFT. Si vous avez des questions techniques, contactez-nous sur notre serveur [Discord](https://chat.avalabs.org/).

