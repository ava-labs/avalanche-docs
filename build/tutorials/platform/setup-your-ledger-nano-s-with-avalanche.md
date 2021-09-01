# Utilisez un ledger Nano S ou un Ledger Nano X avec Avalanche

La norme de l'industrie pour sécuriser en toute sécurité les crypto-monnaies est des portefeuilles de matériel, des appareils spécialisés qui fournissent une isolation complète entre votre ordinateur et vos clés privées.

Si vous souhaitez utiliser l'adresse Avalanche que vous avez créé plus tôt, vous devez utiliser la procédure [de requête de restauration de la phrase de récupération](https://support.ledger.com/hc/en-us/articles/360005434914) en utilisant la phrase mnemonic que vous avez obtenue auprès du portefeuille Avalanche. Si vous configurez une adresse fraîche, suivez simplement [la configuration régulière en tant que procédure de nouvel](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device) appareil.

L'application de portefeuille de Ledger Avalanche est disponible via [Ledger Live](https://www.ledger.com/ledger-live).

## Comment configurer Avalanche sur Ledger en direct<a id="1c80"></a>

Tout d'abord, vous aurez besoin d'installer [Ledger Live](https://www.ledger.com/ledger-live). Il y a un téléchargement pour MacOS, Windows et Linux ainsi que pour iOS et Android.

{% hint style="danger" %}Assurez-vous que vous avez la dernière version de la demande Ledger Live avant de procéder. Les versions plus anciennes peuvent ne pas afficher les dernières versions du firmware et de l'application Avalanche. La dernière version d'application Ledger Live au moment de la rédaction est 2.26.1.{% endhint %}

Après avoir installé avec succès l'application. Allez à l'onglet "Manager" et autorisez la gestion des appareils en appuyant sur les deux boutons sur l'appareil. Dans le champ de recherche de catalogue d'applications, entrez "Avalanche". Confirmez que l'application Avalanche est v0.5.2 \(ou plus\) et cliquez sur le bouton "Installer".

![Bouton d'installation d'application d'Avalanche Ledger](../../../.gitbook/assets/ledger-06-live-install.png)

Vous pouvez confirmer que l'installation a été réussie en allant à l'onglet "Applications installées" où vous devriez voir Avalanche v0.5.2.

![Bouton d'installation d'application d'Avalanche Ledger](../../../.gitbook/assets/ledger-07-live-version.png)

## Utiliser le portefeuille d'Avalanche avec Ledger<a id="48a3"></a>

Une fois que vous avez installé l'application Avalanche, vous pouvez interagir avec le [portefeuille Avalanche](https://wallet.avax.network/) via le Ledger. Cela inclut l'envoi d'AVAX, de jetons, de NFT, sending cross-chain ainsi que la jalonnement ou la déléguation.

Premièrement, pour accéder au portefeuille, branchez le ledger à votre ordinateur et entrez votre épingle.

![Écran de code PIN](../../../.gitbook/assets/ledger-03-pin.png)

Si vous avez plus d'une application installée sur l'appareil, utilisez des boutons gauche et droit pour sélectionner l'application Avalanche :

![Application Avalanche](../../../.gitbook/assets/ledger-04-app-start.png)

Appuyez sur les deux boutons pour démarrer l'application. Vous devez atterrir sur l'écran de l'application "Avalanche" où vous pouvez confirmer que l'application est la version 0.5.2 \(ou plus\).

![Version de l'application](../../../.gitbook/assets/ledger-05-app-version.png)

Après que vous ayez confirmé que l'application Avalanche s'exécute ensuite sur la page d'accueil du portefeuille cliquez sur le bouton "Access Wallet".

![Bouton de portefeuille d'accès](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

Sur la suite "Comment voulez-vous accéder à votre portefeuille ?", cliquez sur le bouton "Ledger".

![Accès au livre](../../../.gitbook/assets/ledger-01-wallet-access.png)

Vous serez maintenant invité à confirmer l'accès aux clés publiques sur votre appareil de Ledger. Cliquez sur le bouton droit par les invite sur l'appareil et sur le dernier écran en appuyant sur les deux boutons.

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

Vous devrez le faire deux fois, parce que différentes clés sont utilisées pour différentes chaînes. Si vous avez réussi, vous serez connecté au portefeuille et les soldes précédents seront affichés.

![Tab de portefeuille de portefeuille de portefeuille de Web](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

Pour transférer des fonds, accédez à l'onglet "Envoyer" et collez une adresse X dans le champ "To Address". Définissez un montant et définissez éventuellement un mémo. Appuyez sur la touche "Confirmer" et ensuite sur le bouton "Envoyer une transaction".

![Envoyer une transaction](../../../.gitbook/assets/send-transaction.png)

Vous serez invité à confirmer l'action sur votre Ledger. Vérifiez que le hash qui est affiché dans le portefeuille web correspond à ce qui est affiché sur votre Ledger. Si tout correspond à la confirmation, en appuyant sur les deux boutons sur le dernier écran pour envoyer la transaction.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Vous pouvez cliquer sur l'icône pour rafraîchir votre solde et vous devriez le voir diminuer par le montant que vous venez d'envoyer et les frais de transaction.

![Reher l'équilibre de portefeuille](../../../.gitbook/assets/refresh-wallet-balance.png)

Dans la colonne de droite, vous verrez votre dernière transaction. En cliquant sur l'icône de la loupe sera ouverte la transaction dans notre explorateur.

![Magnifying en verre](../../../.gitbook/assets/magnifying-glass.png)

Enfin, vous devriez être en mesure de voir les détails de la transaction dans notre explorateur. Cela énumère tout ce qui est sur la transaction, y compris l'identifiant de la transaction, le statut, lorsque la transaction a eu lieu, et toutes les informations concernant les entrées et les produits.

![Détails de la transaction](../../../.gitbook/assets/transaction-details.png)

## Plus d'outils à venir<a id="135b"></a>

Ava Labs est en train de construire l'Internet des finances. Nous développons des solutions pour créer un monde sans friction en redéfinissant la manière dont les gens construisent et utilisent des applications de financement. Une partie critique de cette infrastructure est un portefeuille matériel, afin que les utilisateurs puissent être totalement confiants que leurs clés et pièces privées sont complètement isolés de tous les acteurs potentiellement malveillants. Notre application Ledger récemment publiée en suivant les meilleures pratiques de l'industrie pour protéger les utilisateurs et les pièces en toute sécurité et en sécurité.

