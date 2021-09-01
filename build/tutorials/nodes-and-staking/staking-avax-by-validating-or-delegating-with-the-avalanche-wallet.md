# Stake AVAX, en validant ou en déléguant avec le portefeuille d'Avalanche

## **Introduction**<a id="001f"></a>

L'Avalanche Wallet est une application Web sans intergiciel ni aucun type de communication sur le serveur. L'Avalanche Wallet est écrit en vue JS et peut être consulté en ligne, ou compilé et fonctionner localement.

Le portefeuille d'Avalanche est accessible [ici](https://wallet.avax.network/).   Le code source d'Avalanche Wallet se trouve [ici](https://github.com/ava-labs/avalanche-wallet).

**Prenons en état de jalonnement !**

### **Étape 1 — Ouvrir le portefeuille d'Avalanche**<a id="552d"></a>

![Image pour post](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Vous pouvez accéder à votre portefeuille en utilisant votre phrase clé, votre fichier Keystore ou votre livre Nano S \(qui vient bientôt !\)

### **Étape 2 — Naviguez à la section "Gagner"**<a id="dc5a"></a>

![Image pour post](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Pour en jouer, vous devez avoir vos fonds disponibles sur la **[**Plateforme Chain \(P-Chain\) **](../../../learn/platform-overview/#platform-chain-p-chain)**! Si vos fonds sont sur la [**chaîne d'échange \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain)**, nous devrons les transférer à la **P-Chain en lançant un transfert interchaîne. Si vos jetons sont verrouillés, ils sont déjà sur la P-Chain, vous n'avez donc pas besoin d'effectuer le transfert de la Cross Chain de X-Chain à P-Chain.**

![Image pour post](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Entrez le montant que vous souhaitez transférer sur votre P-Chain et remplissez le transfert en cliquant sur le bouton "Transfert" ci-dessous.

![Image pour post](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voila !

![Image pour post](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Maintenant, nous avons nos fonds prêts à staking sur la P-Chain. Ensuite, vous pouvez ajouter un validateur ou un délégué à votre portefeuille.

### **Étape 3A : Devenez un validateur !**<a id="60f0"></a>

Pour ajouter un validateur, nous devons avoir un nœud en cours d'exécution. Nous pouvons en configurer un en utilisant les [binaires](https://github.com/ava-labs/avalanchego/releases/) relâchés ou les construire à partir du [code source](https://github.com/ava-labs/avalanchego) one

L'utilisation des binaires est facile et pratique et vous met en place pour être un validateur en 4 étapes :

* Téléchargez la dernière version de tar.gz \(zip pour les osx et les fenêtres\) trouvé [ici](https://github.com/ava-labs/avalanchego/releases)
* Décompresser dans un dossier de notre choix :

\* Linux: tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX : unzip avalanchego-macos-<VERSION>.zip

\* Windows: unzip avalanchego-win-<VERSION>.zip

* Naviguez au répertoire des binaires cd avalanchego-<VERSION>
* Exécuter le binaire avec ./avalanche eon Linux et OSX et AvalancheGo sur Windows

Nous laisserons notre nœud bootstrap et nous serons en train de se synchroniser avec le reste avec le réseau, et nous sommes prêts à s'afficher.

Nous aurons besoin de notre identifiant de nœuds. Trouvons que [l'API d'info en](../../avalanchego-apis/info-api.md) utilisant !

Si vous avez besoin d'aide pour configurer votre nœud, joignez-nous sur [Discord](https://chat.avax.network/).

![Image pour post](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Remplissez les champs et confirmez !

![Image pour post](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Vérifiez soigneusement les détails, et cliquez de nouveau sur "Confirmer" !

![Image pour post](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Félicitations. Vous validez maintenant le réseau primaire d'Avalanche !

### **Étape 3B : Ajouter un délégué !**<a id="59bd"></a>

![Image pour post](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Sélectionnez un validateur que vous souhaitez déléguer vos jetons avec la liste des validateurs de réseau actifs.

![Image pour post](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Spécifiez votre période de jalonnement et le montant de la piqûre. Faites attention à la fin de la durée du validateur sélectionné. Votre période de délégation ne peut être définie comme étant la date de fin que le validateur a fixée.

![Image pour post](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirmez les détails !

![Image pour post](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Félicitations. Vous déléguez maintenant le réseau primaire d'Avalanche !

