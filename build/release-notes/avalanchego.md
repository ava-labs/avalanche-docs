# AvalancheGo Notes de mise à jour

{% page-ref page-ref %}

## v1.4.12 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)

Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé.

**Chaîne X-X**

* Ajout de l'argument de formatage `"json"` à la méthode API `GetTx`, qui renvoie la représentation JSON de la transaction interrogée
* Ajoutée assertions du type d'interface

**API**

* Méthode ajoutée `GetNodeVersion` à Info client API

**Mesures Prometheus**

* Mesures fixes et renommées pour les octets non envoyés en raison de la compression
* Ajoutée des métriques pour octets non reçus en raison de la compression
* Ajoutée aide structurelle `noAverager` à `mesures` package

**Base de données**

* Points de référence actualisés/ajoutés

**Mémoire partagée**

* Remplacer `Mettre` et `supprimer` avec `Appliquer` pour permettre l'optimisation future des transactions atomiques

## v1.4.11 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)

**Chaîne C**

Cette version permet des instantanés par défaut.

**Config Drapeaux**

_Supprimé_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Ajout de données_

* `network-compression-enabled la compression`

**Mesures Prometheus**

Beaucoup de mesures Prométheus ont été renommées, et de nombreux histogrammes ont été remplacés par 2 jauges. Voir [ici](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) pour les tableaux de bord à jour Grafana.

Cette version ajoute également des méthodes d'aide au paquet `utils/métrique.`

**RocksDB**

RocksDB n'est plus construit par défaut lors de l'exécution du script de construction, et il n'est pas inclus dans les binaires publiés. Pour construire AvalancheGo avec RocksDB, lancez `export ROCKSDBALLOWED=1` dans votre terminal puis `scripts/build.sh`. Vous devez le faire avant d'utiliser `--db-type=rocksdb`.

La base de données RocksDB stocke désormais ses fichiers dans un sous-répertoire `rocksdb`. Notez que si vous avez précédemment lancé avec RocksDB, vous aurez besoin de déplacer les fichiers existants.

**Compression de message**

Les nœuds compressent maintenant certains messages P2P. Si une version peer est >= v1.4.11, Put, Push Query, Liste des pairs et les messages multiput envoyés au pair sont comprimés à l'aide de gzip avant d'être envoyé sur le réseau. Cela réduit l'utilisation de la bande passante AvalancheGo's

**Connexion entrante Throttling** Refactored la limitation de vitesse de connexion entrée et l'activer par défaut.

**Améliorations générales**

* Refactored et amélioration des performances de l'itération sur une base de données desservie par gRPC vers un plugin.
* Sur Linux, nettoyer la chaîne C si AvalancheGo meurt sans ungracefully
* Refactored les définitions de message P2P et les déplacer du paquet `réseau.`
* Ajout d'alias VM au serveur API HTTP
* Remplacé `1024` par `units.KiB`, etc.
* Amélioration de la tolérance de la partition par le traitement des chits dans l'ordre de la création des requêtes correspondantes.

**Fuji IP**

Mise à jour des IP bootstrap pour le Fuji Testnet.

## v1.4.10 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)

**Abricot Phase 2 - Patch 10**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. {% endhint %}

Le patch comprend les performances, la manœuvre et les améliorations VM:

* Ajout de support pour utiliser `RocksDB` plutôt que `LevelDB` sur les architectures supportées.
* Restructuré le réseau entrant pour être sur une base par nœud, afin de limiter l'utilisation de la bande passante des nœuds pairs.
* Restructuré réseau sortant de la réduction du poids alloué octets par jeu.
* Mise à jour la valeur par défaut du drapeau `activé à` of pour `la` chaîne C.
* Enabled des VM personnalisés sur RPC.
* Mise à jour de l'état blockchain pour signaler l'état de validation.
* Déplacé `TimestampVM` dans son propre dépôt pour correspondre au chemin de création VM attendu.
* Correction du script protobuf code-gen pour placer les fichiers `grpc` dans le bon emplacement.
* Passé les octets de bloc à travers le `rpcchainvm#Block.Verify` pour éviter les défaillances potentielles de vérification de la cache

## v1.4.9 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)

**Abricot Phase 2 - Patch 9**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. {% endhint %}

Le patch comprend des améliorations de performance et des améliorations de la surveillance:

* Ajout de support pour exécuter la chaîne C avec the activé. Pruning est actuellement désactivé par défaut.
* Intervalle de ping de la chaîne C réduit pour réduire les déconnexions lorsque derrière le balanceur de charge.
* Ajoutée de l'horodatage à l'interface snowman Block.
* Correction de bug dans l'API chaîne C durée max exécution pour les appels effectués via les chaussettes.
* Ajout du support d'en-tête gzip pour le point http .
* Ajout de descriptions de versions supplémentaires au point the `info.getNodeversion.`
* Connexion restreinte aux versions du noeud >= 1.4.5.
* Les journaux démon déplacés dans le dossier principal de log.
* Ajout de soutien pour l'échantillonnage déterministe.
* Ajout de l'action GitHub pour les nouvelles balises.
* Gestion de config Refactored pour mieux soutenir les noeuds de lancement programmatiquement.

## v1.4.8 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)

**Abricot Phase 2 - Patch 8**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. {% endhint %}

Le patch comprend des améliorations de performance, des améliorations de surveillance et des corrections de sous-réseau:

* Modification de la définition des frais de l'AVM afin de faire respecter les frais à payer dans l'actif autochtone de la chaîne. Cela ne change pas le comportement de la chaîne X, mais il rend d'autres instances AVM utilisables.
* Ajout de la capacité de spécifier des configurations dans des chaînes spécifiques. Cela déprécie le paramètre CLI `coreth-config`.
* Ajout de taux limitant au nombre de nouvelles connexions sortant.
* Introduit un emballage VM qui ajoute des métriques transparentes à une chaîne.
* Ajout de la capacité pour activer le profilage continu des noeuds.
* Réduction des allocations d'octets dans la couche réseau.
* Ajout de divers paramètres CLI pour le réglage des paramètres gossip.
* Les noeuds ont permis de fonctionner à l'aide d'une paire de clés éphémère, plutôt qu'un qui est lu à partir du disque.
* Prélèvement faux avertissement faux.
* Les tests CI déplacés pour fonctionner dans Github Actions plutôt que de fonctionner dans Travis.
* Suppression des cas spéciaux de l'interface VM.

**Ajoutée des arguments de ligne de commande:**

* `profile-dir`
* `profile-continuous-enabled activated`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled activé`
* `staking-ephemeral-cert-enabled activé`
* `timeout de connexion externe`
* `outbound-connection-throttling-rps`

## v1.4.7 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)

**Abricot Phase 2 - Patch 7**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de performance et des corrections de bugs. {% endhint %}

Si la version du noeud précédemment installée est <= v1.4.4, ce noeud peut avoir cessé le traitement des blocs. Cette mise à jour réparera le noeud et effectuera une migration de la base de données. Pour plus de détails sur la migration de la base de données, veuillez consulter les [notes de migration de la base de données v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la version du noeud précédemment installée est >=v1.4.5, ce noeud utilisera la base de données existante et n'a pas besoin d'effectuer une migration de la base de données.

* Correction du noeud de pré-migration pour vérifier correctement le bloc P-chain `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`.
* Régression fixe dans `platformvm.GetBlockchains` pour retourner correctement les blocs sous-réseau primaires.
* Mise à jour de la version grpc vers v1.37.
* Échantillonnage optimisé de la liste des pairs.
* Ajoutée des repères de la base de données.
* Réduction des diverses affectations de mémoire répétées.

## v1.4.6 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)

**Abricot Phase 2 - Patch 6**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Ce patch comprend des améliorations de performance et des corrections de bugs. {% endhint %}

**Si la version du noeud précédemment installée est &lt;= v1.4.4, ce noeud effectuera une migration de la base de données. Pour les détails de la migration de la base de données, veuillez consulter les notes de sortie v1.4.5.** Si la version du noeud précédemment installée est v1.4.5, ce noeud utilise la base de données existante et n'a pas besoin d'effectuer une migration de la base de données.

Cette correction:

* Supprime la délivrance de transactions invalide dans la mempool P-chain qui a causé des écrits DB élevés soutenus.
* Ignoré les fichiers et les dossiers non de base de données dans le répertoire de la base de données. Ceci devrait spécifiquement corriger les erreurs signalées avec macOS . Fichiers DS\_Store.
* Correction du drapeau build-dir pour être spécifié via CLI sans causer l'erreur du noeud de preupgrade
* Supprimé le drapeau plugin-dir qui n'est plus pris en charge avec le démon node-manager. Généralement, ne pas spécifier le drapeau conduit au bon comportement. Cependant, pour les installations complexes, le drapeau build-dir peut être nécessaire.
* Les messages forcés de gossiping uniquement aux connexions qui ont terminé la poignée de main par les pairs.
* Réduction des allocations de mémoire pendant les traversées de consensus et le bootstraping.

## v1.4.5 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)

**Abricot Phase 2 - Patch 5 - Mise à niveau de la DB.**

**Cette mise à jour est plus impliquée que la mise à jour de la version type. Des instructions plus détaillées et une FAQ peuvent être trouvées** [**ici**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**.**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations significatives des performances et de nombreuses autres mises à jour. {% endhint %}

**Améliorations VM:**

* Entièrement repensé la gestion de l'état de la `platformvm`'s
   * Supprimé l'utilisation de `versiondb`s étant passé par des blocs pour passer les références d'état qui peuvent être modifiées et lues sans re-parsing des objets.
   * Mis en place un gestionnaire d'état de base pour la cache et la brige écrit à la base de données sous-jacente.
   * Les ensembles de validateur CoW mis en œuvre pour activer la cache plusieurs ensembles de validateur dans la mémoire.
   * Chaînes indexées par sous-réseau pour éviter de toucher des objets d'état inutilisés.
   * Validateurs indexés par `nodeID` pour éviter les itérations inutiles tout en acceptant les transactions `addDelegator` et `addSubnetValidator`
   * Réduction du nombre de paires de valeur clé dédiées à la gestion des ensembles de validateur sur les temps de disque et de validation.
* Ajout des sauvegardes de récompense à l'API de la `platformvm`'s pour soutenir l'indexation des récompenses.
* Mesure de l'heure de validation Refactored pour simplifier les tests.
* Ajout de paramètres de type bloc et transaction à la `platformvm`.
* Ajoutée des paramètres d'appel API à l'`avm` et à la `platformvm`.
* Mis à jour la gestion de l'état de l'`avm` pour utiliser `prefixdb`s, enregistrer les métriques de cache, et partager le code supplémentaire avec la `platformvm`.
* Gestion et indexation `UTXO` simplifiées dans l'`avm` et la `platformvm`.
* Restructuré l'analyse et la gestion des adresses à partager pleinement entre les instances VM compatibles.
* La mémoire partagée restructurée du sous-réseau primaire à être pleinement partagée entre les instances de MV.
* Ajout d'une mise en œuvre d'état de chaîne pour soutenir la mise en cache transparente sur les implémentations existantes de MV et simplifier la mise en œuvre de nouvelles MV.
* Intégrée le nouveau gestionnaire d'état de chaîne dans la `rpcchainvm`, qui ajoute également diverses métriques.
* Ajout des `upgradeBytes` et `configBytes` à l'interface VM standard afin de mieux supporter les futures mises à niveau réseau.
* Ajoutée `getAtomicTx` et `getAtomicTxStatus` endpoints à l'API `evm`.
* La production de blocs `evm` simplifiés à être effectuée de manière synchrone avec le moteur de consensus.
* Ajout d'une transaction atomique mempool pour réintroduire des transactions nucléaires orphelines.
* Correction du bug dans le client `evm` pour correctement définir la `chaîne` sourcedans `getAtomiCUTXOs`.
* Intégrée le nouveau gestionnaire d'état de chaîne dans l'`evm` afin d'optimiser la gestion de bloc.

**Améliorations de démarrage:**

* Removed enlevées pendant le bootstraping. Cela améliore significativement la performance du noeud pendant les redémarrages du processus de démarrage.
* Correction d'un noeud ungraceful lorsqu'il tente de sortir du noeud tout en exécutant des conteneurs bootstrapés.
* Correction des émissions de conteneurs dupliquées de la CIB pendant le bootstraping.
* Normalisé la file d'attente des emplois bootstrapping à écrire à l'état en utilisant `prefixdb`s plutôt que de mettre en œuvre la préfixation personnalisée.
* Ajout de mesures supplémentaires de cache et de cache.

**Ajouts de la base de données :**

* Ajout d'un gestionnaire de processus de démon pour migrer sans interruption vers le format de la base de données mise à jour.
* Manipulation de version Refactored pour suivre les versions sémantiques de base de données.
* Mise en œuvre d'un gestionnaire de base de données pour suivre et exploiter différentes versions de base de données.
* La migration `de frappe` qui copie automatiquement les utilisateurs de la base de données `v1.0.0` à la base de données `v1.4.5`.
* La migration de l'heure de validateur depuis la base de données `v1.0.0` vers la base de données `v1.4.5`.

**Améliorations des nœuds:**

* Mise à jour l'analyse de configuration pour toujours étendre les variables environnementales.
* Refactored la configuration du noeud pour permettre la specifying certificats TLS en mémoire sans toucher le disque.
* Ajout de meilleur soutien pour les codes de sortie significatifs.
* Adresse d'écoute affichée des serveurs `http` et `de mise` en ligne pour aider à soutenir les mappings portuaires non spécifiques.
* Mise en œuvre d'une base de données `versionable` pour pouvoir basculer entre un passe par la base de données et une base de données `versionnée.`
* ID optimisé `Pré-allocations` et réduit l'utilisation de la mémoire des `struct`ures.
* Règles de mise en ligne plus strictes.

**Les arguments de ligne de commande modifiée:**

Pour les arguments suivants `"default"` a été précédemment traité comme un mot-clé. Maintenant, `"par défaut"` va tenter d'être traité comme la valeur prévue du drapeau. Pour conserver le comportement par défaut, le drapeau ne doit pas être spécifié.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

Pour les arguments suivants, `""` était auparavant traité comme un mot-clé. Maintenant, `""` va tenter d'être traité comme la valeur prévue du drapeau. Pour conserver le comportement par défaut, le drapeau ne doit pas être spécifié.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

Il n'est plus nécessaire que les `bootstrap-ips` et `bootstrap-ids` soient jumelés. Cela signifie qu'il est maintenant valide pour spécifier un nombre différent de `bootstrap-ips` que les `bootstrap-ids`. Les `bootstrap-ips` sont utilisés pour se connecter au réseau et les `bootstrap-ids` sont utilisés comme balises dans le bootstraping.

**Ajoutée des arguments de ligne de commande:**

* `fetch-only`
* `build-dir`

**Les arguments de ligne de commande supprimés:**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)

**Abricot Phase 2 - Patch 4**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. {% endhint %}

Le patch comprend des corrections de bugs et des améliorations de performance qui visent à optimiser la prochaine version `de mise` à niveau db.

* Retard de la queue sauter dans le bootstrapping de sorte que toutes les chaînes finissent dès que la dernière chaîne est marquée comme bootstrapé dans un sous-réseau.
* Amélioration de la gestion des messages pendant le bootstrapping pour gérer les messages en attendant que d'autres chaînes se synchronise.
* Réduction des allocations des échantillonneurs en réutilisant les échantillonneurs existants.
* Mises à jour des scripts d'appoint pour seulement pousser les images de la branche `maître.`
* Formalisation de logs fixe.
* Messages d'erreur améliorés.

## v1.4.3 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)

**Abricot Phase 2 - Patch 3**

{% allusion style="warning" %} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. {% endhint %}

Le patch comprend des corrections de bugs, la surveillance uptime mise à jour, et des améliorations de performance.

* La manipulation de messages banalisés fixe qui pourrait causer un noeud à être incapable de progresser pendant le bootstraping. Cela était généralement expérimenté lorsque le noeud échouerait à la transition vers l'exécution normale puisqu'il terminait le bootstrapping.
* Correction d'un bug non déterministe dans la base de code C-Chain qui pourrait causer des nœuds qui reçoivent beaucoup de demandes de radiodiffusion de transaction pour arrêter temporairement la production de blocs jusqu'à ce qu'ils traitent un bloc produit par un autre nœud.
* Restreint le nombre de messages de version à envoyer à un paier.
* Les messages de poignée de main supprimés qui ont été détruits dans la phase 2.
* Les nœuds marqués qui ont été banalisés comme étant hors ligne pour les calculs de l'heure.
* Mis à jour le jeu de validation pour être plus performant pendant les modifications de l'ensemble de validation.
* Mise à jour du réseautage pour tenter de se connecter à un pair sur déconnexion s'ils sont actuellement validateur.

## v1.4.2 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)

**Abricot Phase 2 - Patch 2**

{% allusion style="warning" %} Cette mise à jour est compatible avec v1.4.0 et v1.4.1. Les modifications de la mise à niveau entrent en vigueur à 10AM HAE, le 5 mai 2021 sur le réseau Fuji testnet et 7 AM HAE, le 10 mai 2021 sur le réseau principal. {% endhint %}

Le patch réduit la taille des messages de la liste de lecture gossiped et introduit plusieurs nouveaux drapeaux:

* `network-peer-list-size` permet de tuner le nombre de pairs gossiped dans chaque message `peerlist`
* `network-peer-list-gossip-size` permet de tuner le nombre de pairs vers les messages de la `liste` de pairs.
* `network-peer-list-gossip-frequency` permet de régler la fréquence des `listes de pairs` gosses.

## v1.4.1 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)

**Abricot Phase 2 - Patch 1**

{% allusion style="warning" %} Cette mise à jour est compatible avec v1.4.0. Veuillez voir les temps de mise à jour prévus dans la version v1.4.0. {% endhint %}

Le patch réduit la taille des messages de la liste de lecture gossiped et introduit un nouveau drapeau `--bootstrap-beacon-connection-timeout` qui permet la configuration du timeout de connexion balistique au démarrage.

## v1.4.0 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)

**Abricot Phase 2**

{% allusion style="danger,%} **Veuillez noter que ce changement n'est pas compatible avec les versions précédentes.**

**Le billet lié peut être trouvé** [**ici**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.** {% endhint %}

{% allusion style="warning" %} Cette mise à niveau applique la mise à niveau Ethereum Berlin vers la chaîne C, ajoute un nouveau paramètre AVM, et comprend diverses améliorations de stabilité. Nous exhortons tous les membres de la communauté à mettre à jour le plus tôt possible afin de garantir que leurs nœuds demeurent en bonne santé.

Les modifications de la mise à niveau entrent en vigueur à 10AM HAE, le 5 mai 2021 sur le réseau Fuji testnet et 7 AM HAE, le 10 mai 2021 sur le réseau principal. {% endhint %}

**Les principaux composants de cette mise à niveau comprennent:**

* Mis à jour Coreth pour dépendre de v1.10.2 de go-ethereum.
* Appliqué la mise à niveau de the Berlin. Spécifiquement [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) et [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Ajout de nouveaux contrats intelligents précompilés stateful à la chaîne C pour soutenir les transferts ANT, et les enveloppeurs ARC-20 autour des ANT.
* Ajout d'un paramètre AVM `/events` qui prend en charge la notification websocket des transactions étant acceptées assortir un filtre d'adresses.
* Ajouté deux nouveaux types de messages réseautage `SignedVersion` et `SignedPeerlist` pour améliorer les mappings -> IP.
* Correction d'un bug de longue durée où la fermeture du noeud pendant qu'une chaîne était amorçage pourrait causer la fermeture ungracefully. de la chaîne.
* Mise à jour des paquets plugin gRPC pour paginate les grandes demandes pour améliorer la stabilité.
* Ajout de la capacité à exécuter le binaire principal avalanchego's comme un plugin.
* Correction d'une condition raciale potentielle dans la protection de la corruption leveldb.
* Mise à jour des scripts de construction automatisés pour mieux prendre en charge plusieurs architectures.

**Ajoutée des arguments de ligne de commande:**

* `plugin activé` spécifie le binaire à exécuter en mode plugin.

**Les arguments de ligne de commande supprimés:**

* `p2p-tls activé`
* `la fréquence de contrôle déconnectée.`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)

**Abricot Phase 1 - Patch 2**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de sécurité, des corrections de bugs et des améliorations de surveillance. {% endhint %}

**Améliorations de sécurité**

* Forcé un format canonique strict pour les blocs de chaîne C effectués avant la `phase Apricot 1`. Cela garantit que les modifications du champ de blocs `extra-data` ne peuvent pas entraîner de modifications à l'état de la chaîne pendant le démarrage.
* Changed the `Keystore` afin que seules les valeurs cryptées soient envoyées sur l'IPC entre les processus avalanchego et plugin.

**Corrections de bugs:**

* Calculs de plafonnement de la délégation fixe pour inclure la mise à jour du maximum de la délégation actuelle avant de retirer un délégué. Cela garantit que le plafond de la délégation est toujours appliqué.
* Correction de l'API statique d'`AVM` à être enregistrée correctement au démarrage.
* Mises à jour des calculs `de` l'heure de noeud pour tenir compte des mises à niveau réseau.

**Améliorations de la surveillance**

* Ajout d'un indexeur de noeuds optionnel qui peut fournir une commande locale cohérente des opérations acceptées sur une chaîne.
* Inventaire ansible mis à jour pour inclure de nombreuses améliorations \(Énorme merci à @moreati\).

## v1.3.1 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)

**Abricot Phase 1 - Patch 1**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend la stabilité, les améliorations de la surveillance et les corrections de bugs mineurs. {% endhint %}

**Les principaux composants de cette mise à niveau comprennent:**

* segfault de la chaîne C lors de la compression sur les processeurs arm64.
* Ajout des autorisations de groupe aux fichiers locaux pour permettre la surveillance complexe des noeuds.
* L'espace blanc rayé des mots de passe Auth passé par le drapeau api-auth-password-file
* Temps Removed telles qu'il a été remplacé par plus longestRunningRequest.
* Ajout de mesures supplémentaires dans la phase d'accélération du réseau.
* Divers nettoyage de code.

**Ajoutée des arguments de ligne de commande:**

* `network-health-max-outstanding-request-duration`

**Les arguments de ligne de commande supprimés:**

* `network-health-max-time-since-no-requests`

## v1.3.0 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)

**Abricot Phase 1**

{% allusion style="danger,%} Veuillez noter que ce changement n'est pas compatible avec les versions précédentes.

Cette mise à niveau réduit les frais de gaz de la chaîne C, élimine les remboursements de gaz de la chaîne C et comprend diverses améliorations de la sécurité. Nous exhortons tous les membres de la communauté à mettre à jour le plus tôt possible afin de garantir que leurs nœuds demeurent en bonne santé. {% endhint %}

Les modifications de la mise à niveau entrent en vigueur à 10AM HNE, 25 mars 2021 sur le réseau Fuji testnet et 10AM HNE, 31 mars 2021 sur le réseau principal.

**Les principaux composants de cette mise à niveau comprennent:**

* Réduction du coût du gaz de la chaîne C de 470 nAVAX à 225 nAVAX.
* Rejets de gaz de la chaîne C Ce changement adopte [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* La vérification de la chaîne C Refactored pour être plus propre lors de l'exécution des mises à niveau réseau.
* Correction de l'API Auth, afin de faire appliquer correctement les jetons révoqués.
* Renforcé l'API Auth d'assurer l'utilisation du format de signature attendu.
* Supprimé le mot de passe de l'API Auth des arguments CLI.
* Ajout de contrôles plus stricts des autorisations de fichier.
* Ajout d'une manipulation d'erreur supplémentaire mineure.
* Le journal désinfecté écrit avant d'être écrit sur le disque.
* Ajout d'origines configurables au point the HTTP.
* Les tentatives de tentative HTTP vers HTTP échouent au démarrage. Maintenant, le noeud se ferme sur la démarrage si la mise à niveau du paramètre HTTP vers HTTP échoue.

**Ajoutée des arguments de ligne de commande:**

* `api-auth-password-file` spécifie le fichier pour lire le mot de passe de l'API Auth.

**Les arguments de ligne de commande supprimés:**

* `api-auth-password de passe`

## **v1.2.4 \(**[**Vue sur GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)****

**Abricot Phase 0 - Upgrade 1 - Patch 4**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de la stabilité et de la surveillance. {% endhint %}

* Readme mis à jour pour corriger les exigences de stockage.
* Ajout de la manipulation d'erreurs supplémentaires à la vérification Avalanche Tx pendant le bootstraping.
* Mise à jour de nombreuses mesures, y compris l'ajout de nombreuses nouvelles mesures relatives à la santé des noeuds et à l'utilisation de la base de données, la suppression de mesures inutilisées et invalides, et la fixation de certains noms métriques.
* Ajout d'une connexion supplémentaire à CI.
* Ajout de la chaîne C à la liste des chaînes critiques.

## **v1.2.3 \(**[**Vue sur GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)****

**Abricot Phase 0 - Upgrade 1 - Patch 3**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de la stabilité et de la surveillance. {% endhint %}

* Paramètres de vérification de santé `[réseau, routeur, consensus]` ajustés pour supprimer les vérifications de santé lacunaires.
* Manipulation simplifiée de bloc de chaîne C.

## **v1.2.2 \(**[**Vue sur GitHub\)**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)****

**Abricot Phase 0 - Upgrade 1 - Patch 2**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité, de performance et de surveillance. {% endhint %}

* Ajoutée des alias IP dans la bibliothèque réseau pour éviter les appels `SYN` répétés.
* Correction de la manipulation de message bootstrap lorsque le bootstrapping de vous-même.
* `Avancement` Simplified issuance.
* Ajout de nouveaux contrôles de santé consensuels.
* Ajout de l'enregistrement de la santé des noeuds.
* Ajout de réponses sanitaires aux demandes `de` l'EEG.
* Logs de message entrants consolidés.
* Ajout d'erreurs de connexion au `wrapper.`
* Ajout de codes d'erreur à la `rpcdb` pour éviter la séparation de chaînes.
* Amélioration de la gestion de la chaîne C pour réduire le nombre de reorgs.
* Amélioration de la gestion de la chaîne C des appels de moquerie effectués sur le bloc `en` attente.

## **v1.2.1 \(**[**Vue sur GitHub\)**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)****

**Abricot Phase 0 - Upgrade 1 - Patch 1**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité, de performance et de surveillance.

Veuillez noter que cette mise à jour supprime \`network-timeout-increase\` \`network-timeout-increase\` arguments de ligne de commande. {% endhint %}

Résumé de changement:

* Ajoutée \`UTXO\`s à la réponse \`platformvm.getStake\`.
* Ajout de la liste de référence à la réponse \`info.peers\`.
* Ajout de contrôles de santé supplémentaires dans la couche réseau.
* Ajoutée \`pourcent de la mise connectée\` comme une métrique rapportée.
* Ajoutée de la logique de redémarrage bootstrapping pour assurer que le noeud a pris jusqu'à la pointe actuelle, même pendant les périodes de haute débit.
* Ajout de bootstrapping à l'échelle du sous-réseau pour assurer qu'une chaîne ne tombera pas derrière en raison d'un autre bootstrapping de chaîne.
* Vérification préventive des blocs rejetés pour éviter un calcul inutile.
* Enlevé les blocs non préférés au réseau.
* Commutation de la calculatrice de l'interruption du réseau pour utiliser une EWMA de la latence du réseau observée.
* Supprimé les demandes \`Get\` des calculs de latence du réseau.
* Nettoyer l'algorithme de la benchlisting.
* Manipulation nettoyée des messages largués sur l'envoi.
* Nettoyé la logique de la demande et de timeout
* Suivi de performance généralisé pour permettre la préfixation des noms de profil.
* Ajout d'une cache supplémentaire à la traversée de bootstrapping Avalanche.
* Fixation ansible.
* Les arguments ajoutés en ligne de commande consistent principalement en configurations de contrôles de santé. En outre, les calculs de latence du réseau modifiés ont changé le nom de certaines args de ligne de commande.

Ajoutée des arguments de ligne de commande:

* \`network-timeout-halflife\`
* \`network-timeout-coefficient\`
* \`network-health-min-conn-peers\`
* \`network-health-max-time-since-msg-received\`
* \`network-health-max-time-since-msg-sent\`
* \`network-health-max-portion-send-queue-full\` plein\`
* \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\`
* \`router-health-max-drop-rate\`
* \`router-health-max-outstanding-requests\`
* \`health-check-frequency\`
* \`health-check-averager-halflife\`
* \`bootstrap-retry-enabled\`
* \`bootstrap-retry-max-attempts\`

Les arguments de ligne de commande supprimés:

* \`network-timeout-increase\`
* \`network-timeout-reduction\`

## v1.2.0 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.2.0)

**Abricot Phase 0 - Upgrade 1**

{% allusion style="danger,%} **Veuillez noter que ce patch n'est pas compatible avec les versions précédentes. Cette mise à niveau corrige les problèmes de performance liés aux transferts d'échange entre les chaînes X, C et P. Nous exhortons tous les membres de la communauté à mettre à niveau le plus rapidement possible afin de garantir que leurs nœuds ne soient pas affectés. Aussi, noter que les nœuds peuvent prendre plusieurs minutes supplémentaires pour se connecter après la mise à niveau et le processus devrait être autorisé à compléter sans interruption.** {% endhint %}

Les principaux composants de cette mise à niveau comprennent:

* Validation atomique fixe d'importation sur la chaîne C
* Ajoutée la logique d'exception pour permettre les blocs de bonus atomique
* Ajoutée de la logique fail-fast dans la mémoire partagée si les delettes dupliquées sont émises
* Problème fixe où les sondages pourraient décrocher dans l'homme de neige en raison d'un défaut de clarté des demandes
* Correction BAD BLOC problème en coreth en raison des ancêtres inconnus
* Correction d'une condition de la course dans le script chaîne canonique de réparation en coreth
* Nombre limité de blocs de traitement dans Snowman et txs de traitement dans Avalanche
* Mises à jour des valeurs par défaut de mise en réseau de paramètres de la liste de référence
* Vérifié qu'il n'y avait aucune violation de la sécurité après l'instabilité initiale du réseau

## v1.1.5 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.5)

**Abricot Phase 0 - Patch 5**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif mais encouragé. Le patch comprend des améliorations de la stabilité. {% endhint %}

* Correction d'une impasse potentielle lors de l'enregistrement de nouvelles chaînes qui pourraient causer la blocage de la chaîne P et du point de fin http\(s\).
* Réparations TxID -> Block Height indexation dans la chaîne C.
* Ajout de la manipulation gracieuse des déploiements de contrats vides dans l'API debug\_traceTransaction dans la chaîne C.
* Amélioration de la gestion des erreurs dans la chaîne C.

## v1.1.4 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.4)

**Abricot Phase 0 - Patch 4**

{% allusion style="danger,%} Cette mise à jour est compatible vers l'arrière. Il est facultatif mais encouragé. Le patch comprend des mises à niveau CLI, des corrections de bugs API, des améliorations de stabilité et des améliorations de performance. {% endhint %}

* Correction d'un problème où les index de blocs de chaîne C pourraient cartographier des blocs non acceptés à une hauteur donnée.
* Fixation du crash VM lorsque le RPCChainVM a connu des charges API élevées.
* Correction optimiste bubbling de vote dans le moteur Avalanche pour passer correctement les votes par le biais des sommets de traitement.
* Champ ajouté IncludePartial aux méthodes API GetBalance et GetAllBalances de l'AVM. Cela change le comportement par défaut pour ne retourner que les soldes des actifs dépensés et appartenant à une propriété unique.
* Ajout de la capacité de spécifier des configurations de genèse personnalisées pour les ID réseau personnalisés.
* Ajout de fonctionnalités supplémentaires API IPC.
* Ajout d'une cache supplémentaire au RPCChainVM.
* La recherche de répertoire plugin améliorée pour toujours travailler avec les versions binaires.

## v1.1.3 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/tree/v1.1.3)

**Abricot Phase 0 - Patch 3**

{% allusion style="danger,%} Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bugs mineures relatives aux API. {% endhint %}

* Appel suspendu fixe lors de la tentative de filtrer les journaux de chaîne C.
* Correction client de la chaîne C pour appeler l'API appropriée multi-pièces.
* Ajoutée `getAtomiCUTXOS` aux clients `avm` et `platformvm` API clients.

## v1.1.2 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)

**Abricot Phase 0 - Patch 2**

{% allusion style="danger,%} Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bugs et des améliorations de performance. {% endhint %}

* Correction du cache de traitement de bootstrapping pour réduire les traverses dupliquées lors du bootstrapping Avalanche.
* Vérification de la chaîne P optimisée pendant le bootstraping.
* Calcul de la liste de banc maximum fixe pour utiliser les valeurs d'entrée appropriées.
* Les lignes de linter supplémentaires supprimées de l'IC.
* Ajoutée `de` la hauteur à l'interface `snowman.Block`.

## v1.1.1 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)

**Abricot Phase 0 - Patch 1**

{% allusion style="danger,%} Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bugs et des améliorations de performance. {% endhint %}

* Correction d'un bogue de crashing de noeud lorsque les utilisateurs ont désactivé l'API `santé.`
* Correction d'un bug dans le suivi de l'heure qui pourrait plus signaler l'heure d'un noeud.
* Refactored vertex parsing pour utiliser un `Codec`.
* Gestion séparée de vertex stateful et apatrides.
* Ajout de la vérification de la longueur des tranches par champ au Codec.
* Introduit un nouveau type de codec qui regroupe les `TypeID`s.
* Introduit des drapeaux de limite de message au CLI.
* Introduit un paquet semanticdb à utiliser lors d'une future migration de la base de données.
* Ajout du suivi Epoch au contexte de la chaîne.
* Amélioré certains des messages d'erreur retournés pendant la validation de transaction.
* Pression de GC réduite dans la version DB.

## v1.1.0 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)

**Abricot Phase 0**

{% allusion style="danger,%} **Veuillez noter que cette mise à niveau n'est pas compatible avec les versions précédentes. Les mises à niveau doivent être effectuées au plus tard le lundi 7 décembre à 22h UTC \(18 h HNE). La mise à niveau, qui était initialement prévue vers la mi-décembre, est maintenant accélérée pour réparer un signe important de déverrouillage. Nous exhortons tous les membres de la communauté à mettre à niveau le plus rapidement possible afin de garantir que leurs nœuds ne soient pas affectés.** {% endhint %}

Il y a deux composantes principales de cette mise à niveau:

* Préparatifs généraux de notre prochaine mise à niveau du réseau Abricot appelé la mise à niveau de phase Abricot Zero
* Correction d'un problème qui empêchait les sorties verrouillées en partie après leur verrouillage \_\*\*\_time avait passé

## v1.0.6 [\(Vue sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)

{% allusion style="danger,%} Veuillez noter que cette version contient les changements de rupture décrits [ici](https://docs.avax.network/build/apis/deprecated-api-calls). Il modifie le format de réponse par défaut de platform.getTxStatus et platform.getCurrentValidators. La mise à jour est facultative mais encouragée. Le patch comprend des améliorations de performance et certaines améliorations de la qualité de vie. {% endhint %}

* Les formats supprimés de platform.getTxStatus et platform.getTxStatus
* Ajout de support pour les encodages hex des utilisateurs importés et exportés de l'API Keystore.
* Définir l'exigence de golang v1.15.5 pour éviter une vulnérabilité DoS trouvée dans la lib standard golang.
* Ajoutée des clients de l'API pour agir comme aides agissant avec le logiciel noeud.
* Activé la chute de démarrage si un noeud devient déconnecté du reste du réseau.
* Correction des API GetUTXOs lorsque UTXOS référencé plusieurs adresses.
* Encodage binaire Refactored pour mieux généraliser les options RPC.
* Filtrage de bloc IP fixe pour définir correctement la longueur de la fenêtre.
* Généralisé le paquet codec pour pouvoir gérer plusieurs codec avec différentes versions.
* Ajoutée d'Epoch à l'interface Vertex en préparation d'une future version.
* Hashing de transaction différée pour réduire l'utilisation de CPU/mémoire après vérifications rapides.
* Pour ceux qui utilisent [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), l'URL sera fermée dans une future version. Veuillez passer à [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

Pour l'aide à cette mise à jour, suivez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous êtes toujours en cours d'exécution dans des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network/) pour obtenir de l'aide.

## v1.0.5 [\(Vue sur GitHub\](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% allusion style="danger,%} Veuillez noter que la version après celle-ci, v1.0.6, contiendra les changements de rupture décrits [ici](https://docs.avax.network/build/apis/deprecated-api-calls). À savoir, le format de réponse de `platform.getTxStatus` et `platform.getTxStatus` vont changer. {% endhint %}

Les modifications de cette version, v1.0.5, sont compatibles avec les versions précédentes. La mise à jour est facultative mais encouragée. Le patch comprend des améliorations de performance et certaines améliorations de la qualité de vie.

* Ajoutée de `IssueTx` et `GetUTXOs` à l'API chaîne C afin de permettre la délivrance de swaps atomiques sans révéler les clés privées d'un nœud.
* fuite de mémoire fixe dans le gestionnaire de demande de l'homme de neige avec le traitement de bloc oracle.
* Réparer UTXO bug de pagination qui sous-rapporté les fonds disponibles.
* Les journaux http de chaîne mobile à vivre dans le dossier journaux de chaîne lisible par l'homme.
* Restructurer la façon dont les ID sont gérés pour éviter les allocations de sauvegarde.
* Optimisé les échantillonneurs `UniformSampler`s d'éviter de créer plusieurs cartes.
* Utilisation réduite des `ids.Set` en faveur de `[]ids.ID` pour mieux utiliser la mémoire continue.
* Introduit `[]byte` réutilisation dans `PrefixDB`.
* Les fonctions de tri spécifiques à type mises en œuvre pour éviter les affectations fréquentes de conversion d'interface.
* L'utilisateur de charge AVM optimisé pour éviter la lecture d'informations inutiles depuis le disque.
* Supprimé une allocation de mémoire + copie dans l'envoi de prise pour la totalité du message.

Pour l'aide à cette mise à jour, suivez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous êtes toujours en cours d'exécution dans des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network) pour obtenir de l'aide.

## v1.0.4 [\(Vue sur GitHub\](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![AvalancheGo notes de sortie v1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% allusion style="danger,%} Cette mise à jour est facultative mais encouragée. Le patch comprend des améliorations de la qualité de vie et diverses améliorations de performance. Notez que cette mise à jour nécessite que les paramètres CLI soient spécifiés avec -- plutôt que de permettre soit - ou --. Par exemple, `-public-ip=127.0.0.1` n'est plus autorisé et doit être spécifié comme `--public-ip=127.0.0.1`. Sinon, cette mise à jour est compatible vers l'arrière. {% endhint %}

```text
• Added subnet whitelisting to allow a node owner to choose which subnets to validate.
```

```text
• Added config file parsing for node settings.
• Added more options for specifying a node's IP address and added getNodeIP to the info *endpoint.
• Added a TxID to the result of get.Validators in the platformvm.
• Updated Coreth version.
• Cleaned up the snowball trie implementation and added additional tests to align with mutation tests.
• Implemented and optimized continuous time averages for tracking CPU and network latency.
• Significantly optimized memory allocations in various locations.
• Increased the signature verification cache size.
• Reduced DB reads during vertex management.
```

```text
• Added an optional argument includeReason to platform.getTxStatus.
If not provided, or if false, the output from getTxStatus is the same as before.

For example:
{
    "jsonrpc": "2.0",
    "result": "Dropped",
    "id": 1
}

If includeReason is true, the output from getTxStatus has a new format. It's an object that looks like this:

{
    "jsonrpc": "2.0",
    "result": {
        "status":"[Status]",
        "reason":"[Reason tx was dropped, if applicable]"
    },
    "id": 1
}

In this new format, reason will not be present unless the status is Dropped.
Anything that depends on platform.getTxStatus should switch to using the includeReason argument and use the new response format. After a few releases, we'll only support the new response format.
```

Pour l'aide à cette mise à jour, suivez notre [FAQ du développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous êtes toujours en cours d'exécution dans des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network) pour obtenir de l'aide.

