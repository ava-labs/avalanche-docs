# Créer des NFT avec le portefeuille d'Avalanche

## Jetons non fongibles sur Avalanche

[Avalanche](../platform/) prend en charge nativement la création d'actifs numériques, y compris les actifs à capuche fixe, les actifs à capuchon variable et les jetons non fongibles \(NFT\).

Certains actifs sont fungibles, ce qui signifie que toutes les unités de cet actif sont parfaitement interchangeables. Les notes d'une monnaie sont fungibles, par exemple : une note de 5 $ est la même traitée que toute autre note de 5 $. Certains actifs, en revanche, sont non fungibles. Autrement dit, les éléments ne sont pas uniques et parfaitement interchangeables. L'immobilier est non fongible parce que chaque morceau de terre est distinct.

Les jetons non fongibles sont un moyen utile de représenter la preuve de la propriété d'un actif unique.

## NFT Studio sur Avalanche

Le Studio **NFT **dans le [portefeuille](https://wallet.avax.network/) d'Avalanche peut être utilisé pour créer des NFT. Dans ce tutoriel, nous créerons un actif **collectif **: un NFT générique avec une image et une description, ou avec une charge utile personnalisée. Vous pouvez les créer en utilisant une interface simple de point et de clique, et aucune connaissance technique requise.

Pour accéder au studio ****NFT, connectez-vous au portefeuille d'Avalanche. Sur le côté gauche, sélectionnez ****Studio:

![NFT](../../../.gitbook/assets/nft-studio-01-select.png)

Cela ouvre NFT Studio. Vous avez deux options : **New Family, pour la création d'une nouvelle famille de **NFT, et **Mint Collectable **pour la création de nouveaux actifs dans les familles existantes. Nous devons créer notre première famille de NFT, donc cliquez sur **Nouvelle **famille.

### Créer une famille NFT

Là, vous serez invité à entrer le nom de votre famille à collectionner, ainsi qu'un symbole \(billet\). Les noms n'ont pas à être uniques.

![Créer une nouvelle famille](../../../.gitbook/assets/nft-studio-02-family.png)

Vous devrez également saisir une valeur pour le **nombre de groupes, qui **spécifie combien de biens de collection distincts les plus récents de la famille. Choisissez soigneusement car une fois créé, les paramètres de la famille à collectionneurs ne peuvent pas être changés.

Lorsque vous avez terminé, appuyez sur **Créer **la famille à collectionner. Les frais de transaction seront déduits du solde de votre portefeuille. Lorsque la famille est créée, vous verrez l'ID de transaction \(TxID\), ainsi que les paramètres pour la famille. Vous pouvez utiliser le TxID pour rechercher la transaction dans [l'explorateur](https://explorer.avax.network/), mais il n'est pas nécessaire de l'écrire.

**Appuyez sur le **retour sur Studio pour y retourner, et nous sommes prêts à créer nos premiers objets de collection. Presse à la **menthe **Collectionnable.

### NFT Mint

Après avoir pressé **Mint Collectible **vous serez présenté avec une liste de toutes les familles de Collectionnables qui ont encore des groupes de Collectionneurs qui n'ont pas encore été créés.

![Sélectionner une famille](../../../.gitbook/assets/nft-studio-03-select-family.png)

Sélectionnez la famille que vous avez créée plus tôt. Vous serez invité à remplir un formulaire avec les paramètres du nouveau collectible.

![Mint une collection](../../../.gitbook/assets/nft-studio-04-mint.png)

Par défaut, un **type **générique de collection sera sélectionné. C'est un NFT qui a un ****titre, une **URL **pour l'image et une ****description. Saisissez les données requises, ainsi que la ****quantité, qui déterminera le nombre de copies de la collection créées. Comme auparavant, entrez les données avec soin : vous ne pourrez rien changer une fois que les jetons seront frappés. Vous verrez une prévisualisation des données où vous pouvez vérifier à quoi ressemblera votre collectionnable.

Si vous souhaitez avoir autre chose en plus d'une image collectable, sélectionnez ****Personnaliser.

![Collectionnant personnalisé](../../../.gitbook/assets/nft-studio-05-custom.png)

Une collectionnable personnalisée peut contenir une chaîne **encodée **UTF-8, une ****URL ou une charge utile ****JSON. La taille des données ne peut pas dépasser 1024 octets.

Lorsque vous avez terminé, appuyez sur **Mint **pour créer le collectionnable. Les frais de transaction seront déduits de votre portefeuille et une collection nouvellement créée sera placée sur votre portefeuille.

### Voyez vos collections

Un aperçu de vos objets de collection est toujours visible dans le haut de l'écran, ainsi que vos soldes.

![Aperçu](../../../.gitbook/assets/nft-studio-06-overview.png)

Pour voir vos objets de collection en détail, sélectionnez **Portfolio **dans le menu de gauche. Vous serez présenté avec un écran qui affiche tous vos actifs, avec des jetons sélectionnés par défaut. Modifiez la sélection en objets de **collection **en cliquant sur l'onglet correspondant.

![Liste de collections](../../../.gitbook/assets/nft-studio-07-collectibles.png)

Pour chaque collection générique, une image sera affichée, avec le titre, et le numéro indiquant le nombre d'exemplaires de la collection sont dans votre portefeuille. En s'appuyant sur la collection avec votre pointeur, vous montrerez la description détaillée :

![Détails collectionnables](../../../.gitbook/assets/nft-studio-08-detail.png)

Si vous sélectionnez une collection en cliquant dessus, vous verrez à quel groupe il appartient, sa quantité, avec le bouton ****d'envoyer.

## Envoyer des NFT

Pour envoyer votre collection à quelqu'un, soit cliquez sur le bouton **Envoyer sur la collection sélectionnée dans le portefeuille, ou naviguez pour **Envoyer **l'onglet sur le **menu de gauche, et cliquez sur **Ajouter le fichier **collectionneur:

![Choisir les objets de collection](../../../.gitbook/assets/nft-studio-09-send.png)

Vous serez présenté avec un menu pour sélectionner une collection que vous souhaitez envoyer.

![Plusieurs collectionneurs](../../../.gitbook/assets/nft-studio-10-multiple.png)

Vous pouvez envoyer plusieurs objets de collection en une seule transaction. En cliquant sur l'étiquette de la collection, vous pourrez modifier le nombre d'exemplaires que vous souhaitez envoyer. Vous pouvez envoyer plusieurs familles et types de collection en une seule transaction.

Lorsque vous avez entré l'adresse de destination, appuyez sur **Confirmer **pour lancer la transaction.

![Transaction](../../../.gitbook/assets/nft-studio-11-send-transaction.png)

Après avoir pressé **Envoyer une transaction, **il sera publié sur le réseau, et les frais de transaction seront déduits de votre solde. Les objets de collection seront déposés dans l'adresse de destination peu de temps après.

## Résumé

Maintenant, vous pouvez créer des familles NFT, des groupes NFT mint et envoyer des NFT. Amuse-toi ! Assurez-vous de partager vos créations avec nous sur nos [réseaux sociaux ](https://www.avalabs.org/social)!

Si vous souhaitez connaître l'arrière-plan technique du fonctionnement des NFT sur le réseau d'Avalanche ou si vous souhaitez construire des produits en utilisant des NFT, veuillez consulter ce [tutoriel](creating-a-nft-part-1.md) NFT. Si vous avez des questions techniques, contactez-nous sur notre serveur [Discord](https://chat.avalabs.org/).

