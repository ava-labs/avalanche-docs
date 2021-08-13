# Prise AVAX, en Validation ou en délégation, avec le Portefeuille Avalanche

## **Introduction**<a id="001f"></a>

Le portefeuille Avalanche est une application web sans aucun moyen de communication ou aucun type de serveur. Le portefeuille Avalanche est écrit dans Vue JS et peut être consulté en ligne ou compilé et exécuté localement.

Le portefeuille Avalanche est accessible [ici](https://wallet.avax.network/).   Le code source du portefeuille Avalanche peut être trouvé [ici](https://github.com/ava-labs/avalanche-wallet).

**Prenons la jalon!**

### **Étape 1 — Ouvrir le portefeuille d'avalanche**<a id="552d"></a>

![Image pour post](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Vous pouvez accéder à votre portefeuille en utilisant votre phrase clé, fichier keystore, ou Ledger Nano S \(à venir bientôt! \)

### **Étape 2 — Naviguer à la section "Gagner"**<a id="dc5a"></a>

![Image pour post](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Pour jouer, vous devez avoir vos fonds disponibles sur la** [**chaîne de la Plateforme \(P-Chain\)**](../../../learn/platform-overview/#platform-chain-p-chain)**! Si vos fonds sont sur la** [**chaîne de change \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain)**, nous aurons besoin de les transférer à la chaîne P en lançant un transfert interchaîne. Si vos jetons sont verrouillés, ils sont déjà sur la P-Chain, vous n'avez donc pas besoin d'effectuer le transfert de la chaîne croisée de la chaîne X-Chain la chaîne P-Chain.**

![Image pour post](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Entrez le montant que vous souhaitez transférer dans votre chaîne P et compléter le transfert en cliquant sur le bouton "Transfert" ci-dessous.

![Image pour post](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voila !

![Image pour post](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Maintenant, nous avons nos fonds prêts pour la mise en marche sur la chaîne P. Ensuite, vous pouvez ajouter un validant ou un délégué à votre portefeuille.

### **Étape 3A: Devenez validateur !**<a id="60f0"></a>

Pour ajouter un validateur, nous devons avoir un noeud en cours d'exécution. Nous pouvons configurer un en utilisant les [binaires](https://github.com/ava-labs/avalanchego/releases/) libérés ou les construire à partir du [code source AvalancheGo](https://github.com/ava-labs/avalanchego).

L'utilisation des binaires est facile et pratique et vous établit pour être un validator en 4 étapes :

* Téléchargez la dernière version tar.gz \(zip pour osx et windows\) trouvée [ici](https://github.com/ava-labs/avalanchego/releases)
* Unpack dans un dossier de notre choix:

\* Linux: tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX : unzip avalanchego-macos-<VERSION>.zip

\* Windows: unzip avalanchego-win-<VERSION>.zip

* Naviguez dans le répertoire binaires cd avalanchego-<VERSION>
* Exécuter le binaire avec ./avalanchego sur Linux et OSX et AvalancheGo sur Windows

Nous allons laisser notre noeud bootstrap et synchroniser avec le reste avec le réseau, et nous sommes prêts à roller.

Nous aurons besoin de notre ID Node. Trouvons que l'utilisation [de](../../avalanchego-apis/info-api.md) l'API d'information!

Si vous avez besoin d'aide pour configurer votre nœud, joignez-nous sur [Discord](https://chat.avax.network/).

![Image pour post](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Remplissez les champs et confirmer!

![Image pour post](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Vérifiez soigneusement les détails, et cliquez sur "Confirmer" de nouveau!

![Image pour post](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Félicitations. Vous validez maintenant le réseau primaire Avalanche!

### **Étape 3B : Ajouter un délégué !**<a id="59bd"></a>

![Image pour post](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Sélectionnez un validator que vous souhaitez déléguer vos jetons à partir de la liste des validateurs réseau actifs.

![Image pour post](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Spécifiez votre période de jalonnement et le montant de la jeu. Faites attention à la durée de la validation sélectionnée. Votre période de délégation ne peut pas être définie pour prendre fin après la date de fin que le validateur a défini.

![Image pour post](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirmez les détails!

![Image pour post](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Félicitations. Vous déléguez maintenant le réseau primaire Avalanche!

