# Mise en jeu d'AVAX, en validant ou délégant via le portefeuille Avalanche

## **Introduction** <a id="001f"></a>

Le portefeuille Avalanche est une application Web sans middleware ni aucun type de communication avec le serveur. Le portefeuille Avalanche est écrit en Vue JS et peut être consulté en ligne ou compilé et exécuté localement.

Le portefeuille Avalanche est accessible [ici.](https://wallet.avax.network/) Le code source du portefeuille Avalanche peut être trouvé [ici.](https://github.com/ava-labs/avalanche-wallet)

**Allons-y!**

### Étape 1 - Ouvrez le portefeuille Avalanch**e** <a id="552d"></a>

![](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Vous pouvez accéder à votre portefeuille en utilisant votre phrase clé, votre fichier de clés ou Ledger Nano S.

### Étape 2 **—** Accédez à la section "Earn" <a id="dc5a"></a>

![](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Pour miser, vous devez disposer de vos fonds sur la** [**Platform Chain \(P-Chain\)**](../../../apprendre/presentation-du-systeme/#chaine-de-plateforme-p-chain)**! Si vos fonds sont sur l'** [**Exchange Chain \(X-Chain\)**](../../../apprendre/presentation-du-systeme/#chaine-dechange-x-chain)**, nous devrons les transférer vers la P-Chain en lançant un transfert inter-chaîne. Si vos jetons sont verrouillés, ils sont déjà sur la P-Chain, vous n'avez donc pas besoin d'effectuer le transfert inter-chaine de X-Chain à P-Chain.**

![](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Entrez le montant que vous souhaitez transférer sur votre P-Chain et terminez le transfert en cliquant sur le bouton «Transfer» ci-dessous.

![](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voilà!

![](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Maintenant, nous avons nos fonds prêts pour la mise en jeu sur la P-Chain. Ensuite, vous pouvez ajouter un validateur ou en délégant via votre portefeuille

### Étape 3A: Devenez validateur**!** <a id="60f0"></a>

Pour ajouter un validateur, nous devons avoir un nœud en cours d'exécution. Nous pouvons en créer un en utilisant les binaires publiés ou les construire à partir du [AvalancheGo source code](https://github.com/ava-labs/avalanchego).

L'utilisation des binaires est simple et pratique et vous permet d'être un validateur en 4 étapes:

* Téléchargez la dernière version tar.gz \(zip pour osx et Windows\) disponible [ici](https://github.com/ava-labs/avalanchego/releases)​
* Décompressez dans un dossier de notre choix:
  * Linux: tar -xvf avalanchego-linux-&lt;VERSION&gt;.tar.gz
  * OSX: unzip avalanchego-macos-&lt;VERSION&gt;.zip
  * Windows: unzip avalanchego-win-&lt;VERSION&gt;.zip
* * Accédez au répertoire des binaires cd avalanchego-&lt;VERSION&gt;
* Exécutez le binaire avec ./avalanchego sous Linux et OSX et AvalancheGo sous Windows

Nous laisserons notre nœud s'amorcer et se synchroniser avec le reste avec le réseau, et nous sommes prêts à démarrer.

Nous aurons besoin de notre ID de nœud. Voyons cela en utilisant l'[API Info](../../apis/info-api.md)

Si vous avez besoin d'aide pour configurer votre nœud, rejoignez-nous sur [Telegram](https://t.co/gDb4teV2L6?amp=1).

![](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Remplissez les champs et confirmez!

![](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Vérifiez attentivement les détails et cliquez à nouveau sur “Confirm”

![](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Toutes nos félicitations. Vous validez maintenant le réseau principal d'avalanche!

### Étape 3B: ajoutez une déléguation

![](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Sélectionnez un validateur avec lequel vous souhaitez déléguer vos jetons dans la liste des validateurs de réseau actifs.

![](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Spécifiez votre période de mise et le montant de votre mise. Faites attention à l'heure de fin du validateur sélectionné. Votre période de délégation ne peut pas être définie pour se terminer après la date de fin définie par le validateur.

![](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirmez les détails

![](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Toutes nos félicitations. Vous déléguez maintenant le réseau principal Avalanche!

