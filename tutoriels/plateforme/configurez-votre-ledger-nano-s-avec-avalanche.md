# Configurez votre Ledger Nano S avec Avalanche

La norme de l'industrie pour sécuriser en toute sécurité les crypto-monnaies est les portefeuilles matériels, des appareils spécialisés qui offrent une isolation totale entre votre ordinateur et vos clés privées.

Si vous souhaitez utiliser l'adresse Avalanche que vous avez créée précédemment, vous devez utiliser la [procédure de restauration](https://support.ledger.com/hc/en-us/articles/360005434914) à partir de la phrase de récupération à l'aide de la phrase mnémonique que vous avez obtenue du portefeuille Avalanche. Si vous configurez une nouvelle adresse, suivez simplement la procédure de configuration régulière [en tant que nouvel appareil](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device).

L'application de portefeuille Avalanche Ledger est actuellement disponible via [Ledger Live](https://www.ledger.com/ledger-live) en mode expérimental.

## Comment configurer Avalanche sur Ledger Live <a id="1c80"></a>

Tout d'abord, vous devez installer[ Ledger Live](https://www.ledger.com/ledger-live). Il existe un téléchargement pour MacOS, Windows et Linux ainsi que iOS et Android.

Ensuite, lancez Ledger Live et cliquez sur le bouton “Settings”.

![Settings button on ledger live](https://miro.medium.com/max/3052/1*lMnVGJneUAqgRvZBIDv_rA.png)

Une fois dans les paramètres, allez dans l'onglet “Experimental features”.

![](https://miro.medium.com/max/4072/1*HrSweaL-kelTl47QRt38iA.png)

Faites défiler jusqu'à “Developer mode” et activez-le.

![Toggle on developer mode](https://miro.medium.com/max/2908/1*qdte7MSvSZdfqfCIUMNp2Q.png)

Maintenant, avec le “Developer mode” activé, vous pouvez aller dans l'onglet «Manager» et rechercher «Avalanche». Confirmez que l'application Avalanche est v0.2.1 et cliquez sur le bouton «Install».

![Avalanche Ledger app install button](https://miro.medium.com/max/4040/1*rGFrSBEfxRlIkc-k7hS2Vg.png)

Vous pouvez confirmer que l'installation a réussi en allant dans l'onglet «Apps installed» où vous devriez voir Avalanche v0.2.1.

![](https://miro.medium.com/max/3020/1*qBSuxqY52-wxWfM-w1YR_w.png)

## Utilisez le portefeuille Avalanche avec Ledger <a id="48a3"></a>

Une fois l'application Avalanche installée, vous pouvez interagir avec le [portefeuille Avalanche](https://wallet.avax.network/) via le Ledger. Cela inclut l'envoi d'AVAX, de jetons, de NFT, d'échanges croisés entre la X-Chain &lt;-&gt; P-Chain ainsi que la mise en jeu de jetons.

Tout d'abord, pour accéder au portefeuille, branchez le Ledger à votre ordinateur et si nécessaire, entrez votre code PIN.

![PIN code screen](https://miro.medium.com/max/1852/1*A_1VgMMLeJCYzNst6tdq9A.jpeg)

Ensuite, si vous voyez le texte “Pending Ledger review” cliquez sur les deux boutons en haut de l'appareil pour ignorer cet écran.

![](https://miro.medium.com/max/1820/1*OxLbAWq5hzjC6P1SmiCqmg.jpeg)

Enfin, vous devez atterrir sur l'écran de l'application “Avalanche” où vous pouvez confirmer que l'application est en version 0.2.1.

![](https://miro.medium.com/max/1802/1*Qevjy6nhw5UM0ufvxIL_qg.jpeg)

Après avoir confirmé que l'application Avalanche est en cours d'exécution, cliquez sur le bouton “Access Wallet” sur la page d'accueil du portefeuille.

![Access wallet button](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

Sur la page suivante “How do you want to access your wallet?”, cliquez sur le bouton “Ledger” .

![](../../.gitbook/assets/image%20%2843%29.png)

Vous serez maintenant invité à confirmer sur votre appareil Ledger. Cliquez sur le bouton droit à travers les invites sur l'appareil et sur le dernier écran, confirmez en appuyant sur les deux boutons.

![](https://miro.medium.com/max/3828/1*xpNt2ajcTdEivDr4xEedQQ.png)

En cas de succès, vous serez connecté au portefeuille et tous les soldes précédents seront affichés.

![](../../.gitbook/assets/image%20%2845%29.png)

Pour transférer des fonds, allez dans l'onglet “Send” et collez une adresse X dans le champ “To Address” . Définissez un montant et définissez éventuellement un mémo. Appuyez sur "Confirm" puis sur le bouton “Send Transaction”.

![](../../.gitbook/assets/image%20%2841%29.png)

Vous serez invité à confirmer l'action dans votre Ledger. Vérifiez que le hachage affiché dans le portefeuille Web correspond à ce qui est affiché dans votre Ledger. Si tout correspond, confirmez en appuyant sur les deux boutons du dernier écran pour envoyer la transaction.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Vous pouvez cliquer sur l'icône pour actualiser votre solde et vous devriez le voir diminuer en fonction du montant que vous venez d'envoyer et des frais de transaction.

![](../../.gitbook/assets/image%20%2844%29.png)

Dans la colonne de droite, vous verrez votre dernière transaction. Cliquez sur l'icône de la loupe pour ouvrir la transaction dans notre explorateur.

![](../../.gitbook/assets/image%20%2842%29.png)

Enfin, vous devriez pouvoir voir les détails de la transaction dans notre explorateur. Cela répertorie tout sur la transaction, y compris l'ID de transaction, le statut, le moment où la transaction a eu lieu et toutes les informations concernant les entrées et les sorties.

![](../../.gitbook/assets/image%20%2846%29.png)

## Plus d'outils à venir <a id="135b"></a>

Ava Labs construit l'Internet of Finance. Nous développons des solutions pour créer un monde sans friction en redéfinissant la façon dont les gens créent et utilisent les applications financières. Un élément essentiel de cette infrastructure est un portefeuille matériel afin que les utilisateurs puissent être totalement convaincus que leurs clés privées et leurs pièces sont complètement isolées de tout acteur potentiellement malveillant. C'est exactement ce que fait notre nouvelle application Ledger en suivant les meilleures pratiques de l'industrie pour assurer la sécurité des utilisateurs et des jetons.

