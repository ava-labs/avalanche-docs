# Notes de publication AvalancheGo

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.5.2 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2)\)


Cette mise à jour est en retour compatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez consulter les temps de mise à jour prévus dans la publication v1.5.0.

**Coreth**

* Paqué une [vulnérabilité de sécurité de Geth](https://twitter.com/go_ethereum/status/1430067637996990464)
* Il a frappé une panique dans le dossier d'api.

**AVM**

* Introduit une génération de codec apatride pour une meilleure outillage.

**Consensus**

* Ajouté une session supplémentaire autour des votes de bubbling


## v1.5.1-eth\_call \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call)\)

Cette mise à jour est en retour compatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez consulter les temps de mise à jour du réseau prévu dans la publication v1.5.0.

Cette mise à jour est un hotfix pour v1.5.1 qui permet d'utiliser eth\_call sans la vérification du compte en propriété externe.


## v1.5.1 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1)\)

Cette mise à jour est en retour compatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez consulter les temps de mise à jour du réseau prévu dans la publication v1.5.0.

**Configuration**

* Option supprimée `bootstrap-retry-max-attempts`et option ajoutée`bootstrap-retry-warn-frequency`

**Sous-marins**

* Ajouté `subnetID`s au message de la poignée de main. Cela informe les pairs sur les sous-réseaux d'un nœud est intéressant pour la syncing.
* Le gossiping. de conteneurs sous réseau optimisé .

**AVM**

* Le paramètre JSON de `avm.GetTx`l'utilisateur fixe pour déclarer correctement `amount`s sur UTX.

**Démarrage de Bootstrapping**

* Une boucle occupée fixe qui pourrait survenir si l'internet d'un nœud chutait pendant le bootstrapping, ce qui provoque le nœud de déclarer une erreur fatale.

**RPCChainVM**

* Amélioration du cache des blocks non vérifiés.

**Coreth**

* Mis à jour sur Geth v1.10.7.

## v1.5.0 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0)\)

**Ce changement n'est pas en retour compatible avec les versions précédentes.**

Cette mise à jour ajoute des frais dynamiques à la C-chain, ainsi que diverses autres améliorations.

Les modifications de la mise à jour sont en vigueur à 10 heures du matin \(HAE\), le 24 août 2021 sur Mainnet. Vous devez mettre à jour votre nœud avant que les modifications ne soient en vigueur, sinon vous pouvez subir une perte de temps utile sur votre nœud.

Plus d'informations peuvent être trouvées [ici](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Mises à jour de réseau de**

* Ajouté des calculs de frais dynamiques à la C-chain.
* Augmentation `CreateSubnetTx`et `CreateChainTx`frais
* Le bogue de corruption de pack et de pack de la validation des délégués.
* Fait l'objet de transactions `MaxStakeWeight`de délégation.

**Mises à jour des clients**

* Ajout de capacités d'indexation des transactions à la chaîne X pour permettre les sauvegardes historiques des transactions par adresse et par actifs.
* Ajouté `./avalanchego`comme la commande par défaut dans l'image in
* Les versions de dépendance statique ont été utilisées dans l'image in
* Support de migration de la base de données et d'un coureur de deamon.
* Le nœud Refactored de config de parsing.
* Échantillonnage optimisé de gossiping des conteneurs.
* Ajouté la possibilité de construire statiquement les binaires to et d'EVM.
* Simplifié `Block`l'interface pour ne exposer que l'ID du bloc parent plutôt que de récupérer le bloc parent complet.
* Ajout de métriques supplémentaires pour les emplois en attente dans les moteurs de consensus.
* Les statures P-chain Refactored pour gérer les statures de validation blockchain séparément des statuts de confirmation de transaction.

**API mises à jour**

* Ajouté `GetAddressTxs`à `avm`l'API.
* Ajouté `SetLoggerLevel`et `GetLoggerLevel`à `Admin`l'API pour permettre un réglage fin des niveaux de journal en grain pendant que le nœud est encore en cours d'exécution.
* Ajouté `GetConfig`à `Admin`l'API pour permettre de récupérer le nœud de config que le nœud utilise actuellement.
* Mis à jour `platformvm.Client`pour permettre de spécifier s `nodeID`dans `GetCurrentValidators`et et `GetPendingValidators`de généraliser la réponse à .`GetStake`

**Arguments CLI mis à jour**

* Supprimé `fetch-only`.
* Ajouté la config de JSON parsing à `avm`VM.
   * Ajouté`indexTransactions`
   * Ajouté`indexAllowIncomplete`

## PRE\_RELEASE v1.5.0-fuji \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji)\)

**Veuillez noter que cette version ne peut pas exécuter le réseau principal - et qu'elle affichera "cette version du nœud ne prend pas en charge le réseau principal" si elle est tentée de fonctionner avec une configuration du réseau principal. Si vous exécutez un nœud de réseau, aucune action n'est nécessaire tant que la publication officielle ne sera publiée la semaine prochaine.**

**Ce changement n'est pas en retour compatible avec les versions précédentes.**

Cette mise à jour ajoute des frais dynamiques à la C-chain, ainsi que diverses autres améliorations.

Les modifications de la mise à jour sont en vigueur à 15 h HAE, le 16 août 2021 sur le test Fuji. Une fois que Fuji est mis à jour et vérifié, une version compatible avec le réseau sera publiée.

**Mises à jour de réseau de**

* Ajouté des calculs de frais dynamiques à la C-chain.
* Augmentation `CreateSubnetTx`et `CreateChainTx`frais
* Le bogue de corruption de pack et de pack de la validation des délégués.
* Fait l'objet de transactions `MaxStakeWeight`de délégation.

**Mises à jour des clients**

* Ajout de capacités d'indexation des transactions à la chaîne X pour permettre les sauvegardes historiques des transactions par adresse et par actifs.
* Ajouté `./avalanchego`comme la commande par défaut dans l'image in
* Les versions de dépendance statique ont été utilisées dans l'image in
* Support de migration de la base de données et d'un coureur de deamon.
* Le nœud Refactored de config de parsing.
* Échantillonnage optimisé de gossiping des conteneurs.
* Ajouté la possibilité de construire statiquement les binaires to et d'EVM.
* Simplifié `Block`l'interface pour ne exposer que l'ID du bloc parent plutôt que de récupérer le bloc parent complet.
* Ajout de métriques supplémentaires pour les emplois en attente dans les moteurs de consensus.
* Les statures P-chain Refactored pour gérer les statures de validation blockchain séparément des statuts de confirmation de transaction.

**API mises à jour**

* Ajouté `GetAddressTxs`à `avm`l'API.
* Ajouté `SetLoggerLevel`et `GetLoggerLevel`à `Admin`l'API pour permettre un réglage fin des niveaux de journal en grain pendant que le nœud est encore en cours d'exécution.
* Ajouté `GetConfig`à `Admin`l'API pour permettre de récupérer le nœud de config que le nœud utilise actuellement.
* Mis à jour `platformvm.Client`pour permettre de spécifier s `nodeID`dans `GetCurrentValidators`et et `GetPendingValidators`de généraliser la réponse à .`GetStake`

**Arguments CLI mis à jour**

* Supprimé `fetch-only`.
* Ajouté la config de JSON parsing à `avm`VM.
   * Ajouté`indexTransactions`
   * Ajouté`indexAllowIncomplete`

## v1.4.12 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12)\)

Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.

**X-Chain**

* Ajouté un argument de formatage `"json"`à la méthode API , `GetTx`qui renvoie la représentation JSON de la transaction interrogée
* Ajout d'assertions de type d'interface

**API d'info**

* Ajouté la méthode `GetNodeVersion`au client d'Info API

**Mesures de Prometheus**

* métriques fixes et renommées pour les octes non envoyés en raison de la compression
* Ajout de métriques pour les octes non reçus en raison de la compression
* Ajouté l'aide structuré `noAverager`à `metrics`l'emballage

**Base**

* Critères actualisés/ajoutés

**Mémoire partagé**

* Remplacer `Put`et `Remove`avec pour `Apply`permettre une optimisation des transactions atomique

## v1.4.11 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11)\)

**C-Chain**

Cette publication permet des snapshots par défaut.

**Config les drapeaux**

_Suppression_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Ajouté_

* `network-compression-enabled`

**Mesures de Prometheus**

Beaucoup de métriques Prometeus ont été renommés et de nombreux histogrammes ont été remplacés par 2 gauges. Voir [ici](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards) pour les tableaux de bord de Grafana mis à jour.

Cette publication ajoute également des méthodes d'aide au `utils/metric`paquet.

**RocksDB**

RocksDB n'est plus construit par défaut lors de l'exécution du script de construction, et il n'est pas inclus dans les binaires publiés. Pour construire AvalancheGo avec RocksDB, exécutez `export ROCKSDBALLOWED=1`dans votre terminal et puis .`scripts/build.sh` Vous devez le faire avant de pouvoir utiliser `--db-type=rocksdb`.

La base de données RocksDB stocke ou cherche maintenant ses fichiers dans un sous-répertoire `rocksdb`. Notez que si vous avez précédemment couru avec RocksDB, vous devrez déplacer les fichiers existants.

**Compression de message**

Les nœuds compressent maintenant certains messages P2P. Si un pair est une version >= v1.4.11, Put, Push Query, Liste de pairs et les messages multiput envoyés au pair sont compressés par gzip avant d'être envoyé sur le réseau. Cela réduit l'utilisation de la bande passante AvalancheGo's

****Connexion entrante

**Améliorations générales**

* La performance d'itération Refactored et améliorée sur une base de données servie par gRPC sur un plugin.
* Sur Linux, nettoyez la C-Chain si AvalancheGo meurt sans gracier
* Les définitions de message P2P et les déplacent du `network`paquet.
* Ajouté les alias VM au serveur d'API HTTP
* Remplacé `1024`par , `units.KiB`etc.
* Amélioration de la tolérance à la partition par le traitement des chics en vue de la création des requêtes correspondantes.

**IPs Fuji**

Mise à jour des IP de bootstrap pour le Testnet Fuji.

## v1.4.10 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10)\)

**Apricot Phase 2 - Patch 20**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.{% endhint %}

Le patch comprend des améliorations en matière de performance, de gaz et de VM :

* Ajout de la prise en charge à utiliser `RocksDB`plutôt que sur `LevelDB`les architectures supportées.
* Le réseau entrant a été restructuré pour être sur une base par nœud, pour restreindre l'utilisation de la bande passante des nœuds de paier.
* Le réseau sortant a été restructuré pour pondérer les octets alloués par jeu.
* `true`Mis à jour la valeur par défaut du `pruning-enabled`drapeau pour la C-chain.
* Activé l'enregistrement des VM personnalisées sur RPC.
* État blockchain pour signaler l'état de validation.
* Il a été transféré `TimestampVM`dans son propre dépôt pour correspondre au chemin de création VM attendu.
* Le script de code de protobuf pour placer des `grpc`fichiers dans le bon emplacement.
* Il a passé les octets de bloc par le pour éviter toute défaillance potentielle `rpcchainvm#Block.Verify`de la vérification d'expulsion des caches.

## v1.4.9 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9)\)

**Apricot Phase 2 - Patch 9**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.{% endhint %}

Le patch comprend des améliorations de performance et des améliorations de suivi :

* Ajout de la prise en charge pour exécuter la C-chain avec l'enrouement activé. Pruning est actuellement désactivé par défaut.
* L'intervalle de ping de Websocket C réduit pour réduire les déconnexions lorsque le balanceur de charge
* Ajouté le timestamp à l'interface de snowman block.
* Bug fixe dans l'application de durée max de l'API de C-chain pour les appels effectués via les websockets.
* Ajouté une prise en charge des en-têtes de gzip pour le point de référence de http.
* Ajouté des descriptions de versions supplémentaires au `info.getNodeVersion`point.
* Connexion restreinte aux versions de nœuds >= 1.4.5.
* Les journaux de daemon déplacés sous le dossier de journal principal.
* Ajout de la prise en charge pour l'échantillonnage déterministe.
* Ajouté l'action GitHub pour les nouvelles tags.
* La gestion de config Refactored pour mieux prendre en charge les nœuds de lancement programmatiquement.

## v1.4.8 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8)\)

**Apricot Phase 2 - Patch 8**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.{% endhint %}

Le patch comprend des améliorations de performance, des améliorations de surveillance et des corrections de sous-réseau :

* Modifié la définition des frais de l'AVM pour faire respecter les frais à payer sur l'actif autochtone de la chaîne. Cela ne change pas le comportement de la X-Chain, mais il rend d'autres instances AVM utilisables.
* Ajouté la possibilité de spécifier des configurations sur des chaînes spécifiques. Cela déprime le paramètre `coreth-config`CLI.
* Ajouté le taux limitant au nombre de nouvelles connexions sortantes.
* Introduit un enveloppement VM qui ajoute des métriques transparentes à une chaîne.
* Ajouté la capacité d'activer le profilage de nœuds continu.
* Réduction des allocations byte dans la couche de réseau.
* Ajouté divers paramètres CLI pour le réglage des paramètres de gossip.
* Les nœuds ont été autorisés à fonctionner en utilisant une paire de clés éphémères, plutôt que d'un nœud qui est lu depuis le disque.
* L'avertissement faux faux et faux de l'enlèvement.
* Les tests de CI ont été déplacés pour fonctionner dans les actions Github plutôt que de fonctionner dans Travis.
* Suppression des cas spéciaux de l'interface VM.

**Ajout d'arguments en ligne de commande :**

* `profile-dir`
* `profile-continuous-enabled`
* `profile-continuous-freq`
* `profile-continuous-max-files`
* `chain-config-dir`
* `bootstrap-multiput-max-containers-received`
* `bootstrap-multiput-max-containers-sent`
* `boostrap-max-time-get-ancestors`
* `consensus-on-accept-gossip-size`
* `consensus-accepted-frontier-gossip-size`
* `meter-vms-enabled`
* `staking-ephemeral-cert-enabled`
* `outbound-connection-timeout`
* `outbound-connection-throttling-rps`

## v1.4.7 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7)\)

**Apricot Phase 2 - Patch 7**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de performance et des corrections de bogues.{% endhint %}

Si la version du nœud précédemment installée est <= v1.4.4, ce nœud peut avoir arrêté le traitement des blocks. Cette mise à jour réparera le nœud et effectuera une migration de la base de données. Pour plus de détails sur la migration de la base de données, veuillez consulter les notes de [migration de la base de données v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la version du nœud précédemment installée est >=v1.4.5, ce nœud utilisera la base de données existante et n'a pas besoin d'effectuer une migration de la base de données.

* Fixer le nœud de pré-migration pour vérifier correctement le bloc de la chaîne `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`P.
* `platformvm.GetBlockchains`Régression fixe pour retourner correctement les blockchains primaires des sous-réseaux.
* Mis à jour la version grpc vers v1.37.
* Échantillonnage optimisé des listes de pairs.
* Ajout de repères de la base de données.
* Réduit diverses affectations de mémoire répétées.

## v1.4.6 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6)\)

**Apricot Phase 2 - Patch 6**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Ce patch comprend des améliorations de performance et des corrections de bogues.{% endhint %}

**Si la version du nœud précédemment installée est <= v1.4.4, ce nœud effectuera une migration de la base de données. Pour plus de détails sur la migration de la base de données, veuillez consulter les notes de publication de v1.4.5.** Si la version du nœud précédemment installé est v1.4.5, ce nœud utilise la base de données existante et n'a pas besoin d'effectuer une migration de la base de données.

Ce patch, ce patch, :

* Supprime l'émission de transactions invalide dans la mempool P-chain qui a causé des écrits de DB élevés et durables.
* Ignoré les fichiers et les dossiers non liés à la base de données dans le répertoire de la base. Cela devrait spécifiquement corriger les erreurs signalées sur macOS avec . Fichiers DS\_Store.
* Fixer le drapeau de build-dir pour être spécifié via CLI sans causer l'erreur du nœud de preupgrade
* Enlevé le drapeau plugin-dir qui n'est plus pris en charge par le daemon de plugin-dir En règle générale, ne pas spécifier le drapeau conduit au bon comportement. Toutefois, pour les installations complexes, le drapeau build-dir peut être requis.
* Enforcé des messages de saisie uniquement sur les connexions qui ont fini le jeu de main par les pairs.
* Réduction des allocations de mémoire lors des traverses de consensus et des bootstrapping.

## v1.4.5 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5)\)

**Apricot Phase 2 - Patch 5 - Mise à jour de DB**

**Cette mise à jour est plus impliquée que la mise à jour de version typique. Des instructions plus détaillées et une FAQ peuvent être trouvées **[**ici**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**.**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend d'importantes améliorations de performance et de nombreuses autres mises à jour.{% endhint %}

**Améliorations VM :**

* Entièrement redessiné la gestion de l'État `platformvm`.
   * Suppression de l'utilisation de `versiondb`s étant passée par des blocs pour passer des références d'État qui peuvent être modifiées et lus sans re-parsing d'objets.
   * Il a mis en place un gestionnaire d'État de base pour mettre correctement en cache et mouler écrit à la base de données sous-jacente.
   * Les sets de validateurs CoW mis en œuvre pour activer le cache de multiples validateurs en mémoire.
   * Chaînes indexées par sous-réseau pour éviter de toucher des objets d'État non utilisés.
   * Les validateurs indexés par `nodeID`pour éviter les itérations inutiles tout en acceptant et `addDelegator``addSubnetValidator`transactions.
   * Réduit le nombre de paires de key-value dédiées à la gestion des jeux de validateurs sur les temps de disque et de validateur.
* Ajout des sauvegardes de récompense en jalonnement à l'API de l'utilisateur pour prendre en charge `platformvm`l'indexation des récompenses.
* Le comptage d'heure de validateur Refactored pour simplifier les tests.
* Ajout de mesures de type block et de transaction à la `platformvm`.
* Ajout des métriques d'appel API à la `avm`et le .`platformvm`
* Mis à jour la gestion de `avm`l'État pour utiliser des s, enregistrer des métriques de `prefixdb`cachage, et partager du code supplémentaire avec le `platformvm`.
* `UTXO`Gestion et indexation simplifiées dans `avm`et .`platformvm`
* L'analyse d'adresses et la gestion doivent être entièrement partagés sur les instances VM compatibles.
* La mémoire partagée du sous-réseau principal doit être entièrement partagée dans les instances de VM.
* Ajouté une implémentation d'État de la chaîne pour soutenir une mise en cache transparente sur les implémentations VM existantes et pour simplifier la mise en œuvre de nouvelles VM.
* Intégrée le nouveau gestionnaire d'État de la chaîne dans le `rpcchainvm`, qui ajoute également diverses métriques.
* Ajouté `upgradeBytes`et à l'interface VM standard pour mieux prendre en charge les futures mises `configBytes`à jour du réseau.
* Ajouté `getAtomicTx`et des `getAtomicTxStatus`critères à `evm`l'API
* La production de `evm`blocs simplifiée à effectuer de manière synchronisée avec le moteur de consensus.
* Ajouté une mempool de transaction atomique pour réintroduire des transactions nucléaires orphelines.
* Correction du bogue dans le `evm`client pour configurer correctement le `sourceChain`dans .`getAtomicUTXOs`
* Intégrée le nouveau gestionnaire d'État de la chaîne dans le `evm`pour mieux optimiser la gestion des blocks.

**Améliorations en bootstrapping :**

* Les re-traversals supprimées pendant le bootstrapping. Cela améliore de manière significative la performance du nœud lors des redémarrages du processus de bootstrapping.
* Fixé un nœud non gracieux lorsqu'on essaie de sortir du nœud tout en exécutant des conteneurs bootstrapés.
* Les émissions de conteneurs de CIB en double fixe pendant le bootstrapping.
* Normaliser la file d'attente pour les emplois de bootstrapping pour écrire pour l'état en utilisant `prefixdb`s plutôt que de mettre en œuvre un préfixe personnalisé.
* Ajouté des métriques de cache et de cache supplémentaires de bootstrapping.

**Ajouts de bases de données :**

* Ajouté un gestionnaire de processus de daemon pour migrer sans problème vers le format de base de données mis à jour.
* La manipulation de versions Refactored pour suivre les versions sémantiques de la base de données.
* Il a mis en place un gestionnaire de base de données pour suivre et fonctionner sur différentes versions de base de données.
* Il a mis en place une `keystore`migration qui copie automatiquement les utilisateurs de la base de `v1.0.0`données vers la base de `v1.4.5`données.
* Il a mis en place une migration de validateur vers la base de `v1.0.0`données pour les `v1.4.5`validateurs.

**Améliorations les nœuds:**

* Mise à jour des fichiers de lecture de config pour toujours étendre les variables d'environnement.
* Refactorisé la config de nœud pour permettre de spécifier les certificats TLS en mémoire sans toucher le disque.
* Ajout un meilleur support pour les codes de sortie significatifs.
* Adresse d'écoute affichée des et `http`des `staking`serveurs pour aider à prendre en charge les mappings. de port non spécifiques.
* Il a mis en place une base de données pour pouvoir basculer entre un passe par une base de `versionable`données et une base de `versioned`données.
* `Set`Pré-allocations d'ID optimisées et réduit l'utilisation de la mémoire des `struct`s.
* Règles de lin plus strictes appliquées.

**Les arguments de ligne de commande modifiée :**

En effet, les arguments suivants `"default"`ont été précédemment traités comme un mot-clé. Maintenant, `"default"`va essayer de être traité comme la valeur prévue du drapeau. Pour conserver le comportement par défaut, le drapeau ne doit pas être spécifié.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

En effet, les arguments suivants `""`ont été précédemment traités comme un mot-clé. Maintenant, `""`va essayer de être traité comme la valeur prévue du drapeau. Pour conserver le comportement par défaut, le drapeau ne doit pas être spécifié.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

Il n'est plus nécessaire que les `bootstrap-ips`et `bootstrap-ids`soient jumelés. Cela signifie qu'il est maintenant valide pour spécifier un nombre différent de `bootstrap-ips`.`bootstrap-ids` Les deux `bootstrap-ips`sont utilisés pour se connecter initialement au réseau et les balises sont utilisées comme les `bootstrap-ids`balises en bootstrapping.

**Ajout d'arguments de ligne de commande :**

* `fetch-only`
* `build-dir`

**Les arguments de ligne de commande supprimés :**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4)\)

**Apricot Phase 2 - Patch 4**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.{% endhint %}

Le patch comprend des corrections de bogues et des améliorations de performance qui visent à optimiser la sortie à `db-upgrade`venir.

* Retard de queue rapide dans le bootstrapping de sorte que toutes les chaînes se terminent dès que la dernière chaîne est marquée comme bootstrapping sur un sous-réseau.
* Meilleure manipulation des messages pendant le bootstrapping pour gérer les messages en attendant que d'autres chaînes se synchronise.
* Réduction des allocations d'échantillonneurs en réutilisant les échantillonneurs existants.
* Les scripts docker mis à jour pour ne pousser que les images de la `master`branche.
* formatting. de journal fixe.
* Messages d'erreur améliorés.

## v1.4.3 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3)\)

**Apricot Phase 2 - Patch 3**

{% hint style="warning" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé.{% endhint %}

Le patch comprend des corrections de bogues, une surveillance mise à jour et des améliorations de performance.

* La manipulation de messages bancs fixes qui pourrait causer un nœud à un nœud ne peut progresser pendant le bootstrapping. Cela a été généralement connu lorsque le nœud ne passe pas à une exécution normale car il finissait le bootstrapping.
* Correction d'un bogue non déterministe dans la base de code C-Chain qui pourrait causer des nœuds qui reçoivent beaucoup de demandes de diffusion de transactions pour arrêter temporairement la production de blocs jusqu'à ce qu'ils traitent un bloc produit par un autre nœud.
* Limité le nombre de messages de version à envoyer à un paier.
* Les messages de poignée de main traditionnels qui ont été détruits dans la phase 2 d'Apricot.
* Les nœuds marqués qui ont été banalisés comme étant hors ligne pour les calculs de l'horaire.
* Mis à jour le validateur s'est fixé pour être plus performant lors des modifications des ensembles de validateurs.
* Mis à jour le réseau pour ne tenter de se connecter à un pair sur la déconnexion s'il est actuellement validateur.

## v1.4.2 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2)\)

**Apricot Phase 2 - Patch 2**

{% hint style="warning" %}Cette mise à jour est en retour compatible avec v1.4.0 et v1.4.1. Les modifications de la mise à jour sont en vigueur à 10 heures du matin \(HAE\), le 5 mai 2021 sur le testnet de Fuji et 7 heures du soir et sur le site principal.{% endhint %}

Le patch réduit en outre la taille des messages de peerlist et introduit plusieurs nouveaux drapeaux :

* `network-peer-list-size`permet de tuner le nombre de pairs giflés dans chaque `peerlist`message.
* `network-peer-list-gossip-size`permet de tuner le nombre de pairs pour gossip les `peerlist`messages à.
* `network-peer-list-gossip-frequency``peerlist`permet de régler la fréquence des s de s.

## v1.4.1 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1)\)

**Apricot Phase 2 - Patch 1**

{% hint style="warning" %}Cette mise à jour est en retour compatible avec v1.4.0. Veuillez consulter les temps de mise à jour prévus dans la publication v1.4.0.{% endhint %}

Le patch réduit la taille des messages de peerlist et introduit un nouveau drapeau `--bootstrap-beacon-connection-timeout`qui permet de configurer le timeout de connexion des balises pour être configuré sur le start-up.

## v1.4.0 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0)\)

**Apricot**

{% hint style="danger" %}**Veuillez noter que ce changement n'est pas en arrière compatible avec les versions précédentes.**

**Le billet de blog connexe peut être trouvé **[**ici**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**{% endhint %}

{% hint style="warning" %}Cette mise à jour applique la mise à jour Ethereum Berlin sur la C-chain, ajoute un nouveau paramètre AVM, et comprend diverses améliorations de la stabilité. Nous exhortons tous les membres de la communauté à mettre à jour le plus rapidement possible afin de garantir que leurs nœuds restent en bonne santé.

Les modifications de la mise à jour sont en vigueur à 10 heures du matin \(HAE\), le 5 mai 2021 sur le testnet de Fuji et 7 heures du soir et sur le site principal.{% endhint %}

**Les principaux composants de cette mise à jour comprennent :**

* Mis à jour pour dépendre de v1.10.2 de go-ethereum.
* Appliqué la mise à jour de Berlin. Plus spécifiquement, [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) et [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Ajout de nouveaux contrats intelligents pré-compilés stateful à la C-chain pour prendre en charge les transferts d'ANT et les enveloppes ARC-20 autour des ANT.
* Ajouté un `/events`paramètre AVM qui prend en charge la notification en ligne des transactions sur les transactions acceptées en fonction d'un filtre d'adresses.
* Ajouté deux nouveaux types de messages de réseautage et `SignedPeerlist`pour améliorer `SignedVersion`les mappings de validateur -> IP.
* Correction d'un bogue de longue date où l'arrêt du nœud pendant qu'une chaîne était en bootstrapping pourrait causer la fermeture de la chaîne sans souci
* Mis à jour les paquets gRPC du plugin pour paginer les grandes demandes pour améliorer la stabilité.
* Ajouté la possibilité de faire fonctionner le binaire principal avalanchego's en tant que plugin.
* Correction d'une condition raciale potentielle dans la protection de la corruption de leveldb
* Mis à jour les scripts de construction automatisés pour mieux prendre en charge plusieurs architectures.

**Ajout d'arguments de ligne de commande :**

* `plugin-mode-enabled`spécifie le binaire à exécuter en mode plugin.

**Les arguments de ligne de commande supprimés :**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2)\)

**Apricot Phase 1 - Patch 2**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de sécurité, des corrections de bogues et des améliorations de surveillance.{% endhint %}

**Améliorations de sécurité**

* Fait suite à un format canonique strict pour les blocs de C-chain faits avant `Apricot Phase 1`. Cela garantit que les modifications au champ de `extra-data`bloc ne peuvent pas entraîner de modifications à l'état de la chaîne pendant le bootstrapping.
* Modifié la `Keystore`pour garantir que seules les valeurs cryptées sont envoyées sur la CIB entre les processus d'avalanche et de plugins.

**Correction des bogues :**

* Les calculs de plafonds de délégation fixes pour inclure la mise à jour du maximum de délégation actuelle avant de retirer un délégué. Cela garantit que le plafond de délégation est toujours appliqué.
* L'API statique de `AVM`la fixation est pour être enregistrée correctement sur le start-up.
* Des `uptime`calculs de nœuds mis à jour pour tenir compte des mises à niveau du réseau.

**Améliorations pour la surveillance**

* Ajouté un indexeur de nœuds en option qui peut fournir une commande d'opérations de manière cohérente localement sur une chaîne.
* Inventaire ansible mis à jour pour inclure de nombreuses améliorations \(énorme grâce à @moreati\).

## v1.3.1 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1)\)

**Apricot Phase 1 - Patch**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend la stabilité, des améliorations de surveillance et des corrections de bogues mineurs.{% endhint %}

**Les principaux composants de cette mise à jour comprennent :**

* segfault en C-chain lors de la compression sur les CPU de arm64.
* Ajout des autorisations de groupe aux fichiers locaux pour permettre une surveillance complexe des nœuds.
* L'espace blanc rayé des mots de passe d'Auth a traversé le drapeau de fichier de mot de passe api-auth-password-file
* Délai Removed car il a été remplacé par le plus long longestRunningRequest.
* Ajout de mesures supplémentaires dans la mise en service des réseaux
* Divers nettoyage de code.

**Ajout d'arguments de ligne de commande :**

* `network-health-max-outstanding-request-duration`

**Les arguments de ligne de commande supprimés :**

* `network-health-max-time-since-no-requests`

## v1.3.0 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0)\)

**Apricot**

{% hint style="danger" %}Veuillez noter que ce changement n'est pas en arrière compatible avec les versions précédentes.

Cette mise à jour réduit les frais de gaz C-chain, supprime les remboursements de gaz C-chain et inclut diverses améliorations de sécurité. Nous exhortons tous les membres de la communauté à mettre à jour le plus rapidement possible afin de garantir que leurs nœuds restent en bonne santé.{% endhint %}

Les modifications de la mise à jour sont en vigueur à 10 heures \(HNE\), le 25 mars 2021 sur le testnet de Fuji et 10 heures \(HNE\), le 31 mars 2021 sur le continent.

**Les principaux composants de cette mise à jour comprennent :**

* Le coût réduit du gaz C-chain de 470 nAVAX à 225 nAVAX.
* Rejets de gaz en C. Ce changement adopte [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* La vérification C-chain a été Refactored pour être plus propre lors de la mise à niveau du réseau.
* Fixé l'API Auth pour faire exécuter correctement les jetons révoqués.
* Renforcé l'API Auth, pour s'assurer que le format de signature attendu est utilisé.
* Suppression du mot de passe de l'API d'Auth des arguments CLI.
* Ajouté des contrôles plus stricts pour les autorisations de fichier.
* Ajouté une poignée d'erreurs supplémentaires mineures.
* Le journal hygiénique écrit avant d'être écrit sur le disque.
* Ajout d'origines configurables au point de référence HTTP.
* Les tentatives de téléchargement faites sur HTTP sont supprimées lors de la démarrage. Maintenant le nœud se ferme sur le start-up si la mise à jour du paramètre HTTP vers les HTTP échoue.

**Ajout d'arguments de ligne de commande :**

* `api-auth-password-file`spécifie le fichier pour lire le mot de passe de l'API d'Auth.

**Les arguments de ligne de commande supprimés :**

* `api-auth-password`

## **v1.2.4 **\([**Affichage sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**\)**

**Apricot Phase 0 - Update 1 - Patch 4**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité et de surveillance.{% endhint %}

* Ladme mis à jour pour corriger les exigences de stockage.
* Ajout d'une manipulation d'erreurs supplémentaires à la vérification Tx Avalanche lors du bootstrapping.
* Mis à jour de nombreuses mesures, y compris l'ajout de nombreuses nouvelles mesures relatives à la santé des nœuds et à l'utilisation de la base de données, la suppression des métriques non utilisées et invalides, et la fixation de certains noms métriques.
* Ajouté une session supplémentaire à CI.
* Ajouté la C-chain à la liste des chaînes critiques.

## **v1.2.3 **\([**Vue sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**\)**

**Apricot Phase 0 - Update 1 - Patch 3**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité et de surveillance.{% endhint %}

* Paramètres de contrôle de `[network, router, consensus]`santé ajustés pour supprimer les contrôles de santé flaky.
* Gestion simplifiée des blocks en C.

## **v1.2.2 **\([**Vue sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**\)**

**Apricot Phase 0 - Update 1 - Patch 2**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité, de performance et de surveillance.{% endhint %}

* Ajouté des alias IP dans la bibliothèque de réseau pour éviter les appels `SYN`répétés.
* La manipulation des messages de bootstrap fixe lors du bootstrapping de vous-même.
* La publication `AdvanceTimeTx`simplifiée.
* Ajouté de nouveaux contrôles de santé par consensus.
* Ajout de l'enregistrement de la santé des nœuds.
* Ajout de réponses sanitaires aux demandes de `GET`santé.
* Les journaux de message entrants consolidés.
* Ajouté une connexion d'erreur au `LevelDB`wrapper.
* Ajouté des codes d'erreur à la chaîne `rpcdb`pour éviter le parsage de chaînes.
* Amélioration de la manipulation de la chaîne canonique en C-chain pour réduire le nombre de reorgs.
* Une meilleure manipulation en C-chain des appels de moques effectués sur le `pending`block.

## **v1.2.1 **\([**Vue sur GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**\)**

**Apricot Phase 0 - Update 1 - Patch**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif, mais encouragé. Le patch comprend des améliorations de stabilité, de performance et de surveillance.

Veuillez noter que cette mise à jour supprime les arguments de la ligne de commande « network-timeout-augmentation » et « network-timeout-reduction » et « network-timeout-reduction » en tant qu'arguments de ligne de commande.{% endhint %}

Changement de résumé :

* Ajouté \`UTXO\`s \`s à la réponse \`platformvm.getStake\`.
* Ajout de la liste de référence à la réponse de \`info.peers\`.
* Ajouté des contrôles de santé supplémentaires dans la couche de réseau.
* Ajouté \`pourcent de la part de la part de la
* Ajouté une logique de redémarrage de bootstrapping pour garantir que le nœud a pris la tête de la pointe actuelle, même en temps de débit élevé.
* Ajouté des bootstrapping à l'échelle de sous-réseau pour garantir qu'une chaîne ne se replie pas en raison d'un autre bootstrapping sur la chaîne.
* Vérification préventive des blocs rejetés pour éviter un calcul inutile.
* Suppression des blocages non préférés sur le réseau.
* Il a commuté le calculateur de temps out du réseau pour utiliser une EWMA de la latence du réseau observée.
* Enlevé les demandes de \`Get\` des calculs de latence du réseau.
* Nettoyé l'algorithme de la liste de référence.
* Traitement nettoyé des messages largués sur l'envoi.
* Nettoyé la logique de demande et de timeout.
* Suivi de performance généralisé pour permettre la préfixation des noms de profil.
* Ajouté un cache supplémentaire au cours de la course de bootstrapping d'Avalanche.
* linting. fixe ansible.
* Les arguments de la ligne de commande ajoutés consistent principalement en des configurations de contrôles de santé. En outre, les calculs de latence du réseau modifiés ont changé le nom de certaines args de la ligne de commande.

Ajout d'arguments de ligne de commande :

* \`network-timeout-halflife\`
* \`network-timeout-coefficient\`
* \`network-health-min-conn-peers\`
* \`network-health-max-time-since-msg-received\`
* \`network-health-max-time-since-msg-sent\`
* \`network-health-max-portion-send-queue-full\`'
* \`network-health-max-send-fail-rate\`
* \`network-health-max-time-since-no-requests\`
* \`router-health-max-drop-rate\`
* \`router-health-max-outstanding-requests\`
* \`health-check-frequency\`
* \`health-check-averager-halflife\`
* \`bootstrap-retry-enabled\`
* \`bootstrap-retry-max-attempts\`

Les arguments de ligne de commande supprimés :

* \`network-timeout-increase\`
* \`network-timeout-reduction\`'

## v1.2.0 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0)\)

**Apricot Phase 0 - Update 1**

{% hint style="danger" %}**Veuillez noter que ce patch n'est pas compatible avec les versions précédentes. Cette mise à jour corrige les problèmes de performance liés aux transferts d'échange entre les chaînes X, C et P. Nous exhortons tous les membres de la communauté à mettre à niveau le plus rapidement possible afin de garantir que leurs nœuds ne soient pas affectés. De plus, Also, que les nœuds peuvent prendre plusieurs minutes supplémentaires pour se connecter après la mise à jour et que le processus doit être autorisé à compléter sans interruption.**{% endhint %}

Les principaux composants de cette mise à jour comprennent :

* Validation atomique fixe sur C-Chain
* Ajout d'une logique d'exception pour permettre les blocs de bonus atomique
* Ajouté une logique fail-fast dans la mémoire partagée si les deletes dupliquées sont émises
* Problème fixe où les sondages peuvent s'avérer difficiles à bloquer en snowman en raison d'un défaut de clarté des demandes
* Problème de BLOCK BAD fixe en coreth en raison d'ancêtres inconnus
* Fixé une condition de race dans le script de chaîne canonique de réparation en coreth
* Nombre limité de blocs de traitement en Snowman et de tx de traitement en Avalanche
* Les valeurs par défaut de mise en réseau et les paramètres de liste de référence
* Vérifié qu'il n'y a eu aucune violation de la sécurité après l'instabilité du réseau initial

## v1.1.5 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5)\)

**Apricot Phase 0 - Patch 5**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif mais encouragé. Le patch comprend des améliorations de stabilité.{% endhint %}

* Fixer une bloque potentielle lors de l'enregistrement de nouvelles chaînes qui pourraient causer le blockage de la chaîne P et du point de référence http\(s\) http..
* Réparations TxID -> L'indexation de la hauteur de bloc dans la chaîne C.
* Ajout d'une manipulation gracieuse des déploiements de contrats vides dans l'API debug\_traceTransaction dans la chaîne C.
* Meilleure manipulation des erreurs dans la C-chain.

## v1.1.4 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4)\)

**Apricot Phase 0 - Patch 4**

{% hint style="danger" %}Cette mise à jour est compatible en arrière. Il est facultatif mais encouragé. Le patch comprend des mises à jour CLI, des corrections de bogues d'API et des améliorations de la stabilité.{% endhint %}

* Fixé un problème où les index de blocs C-chain peuvent an sur des blocs non acceptés à une hauteur donnée.
* Le VM est fixé pour s'effondrer lorsque la RPCChainVM a subi des charges d'API élevées.
* Le vote optimiste fixe bubbling dans le moteur d'Avalanche pour passer correctement les votes par le biais des sommets de traitement.
* Champ ajouté IncludePartial aux méthodes d'API GetBalance et GetAllBalances de l'AVM. Cela modifie le comportement par défaut pour ne retourner que les soldes des actifs dépensés et appartenant à des catégories uniques.
* Ajouté la possibilité de spécifier des configurations de genesis personnalisées pour les ID de réseau personnalisés.
* Ajout d'autres fonctionnalités d'API IPC.
* Ajouté un cache supplémentaire à la RPCChainVM.
* Une recherche de répertoire de plugins améliorée pour toujours travailler avec les versions binaires.

## v1.1.3 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3)\)

**Apricot Phase 0 - Patch 3**

{% hint style="danger" %}Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bogues mineures relatives aux API{% endhint %}

* Appel à suspension fixe lors de la tentative de filtrer les journaux C-chain
* Le client de C-chain pour appeler l'API multi-pièces.
* Ajouté aux clients `avm`et `getAtomicUTXOs`à leurs `platformvm`API

## v1.1.2 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)\)

**Apricot Phase 0 - Patch 2**

{% hint style="danger" %}Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bogues et des améliorations de performance.{% endhint %}

* Le cache de traitement de bootstrapping fixe pour réduire les traverses dupliquées lors du bootstrapping Avalanche.
* Vérification de la P-chain optimisée pendant le bootstrapping.
* Calcul de la liste de banc maximum pour utiliser les valeurs d'entrée appropriées.
* Le linter supplémentaire retiré est sorti de CI.
* Ajouté `Height`à `snowman.Block`l'interface.

## v1.1.1 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)\)

**Apricot Phase 0 - Patch 1**

{% hint style="danger" %}Cette mise à jour est facultative mais encouragée. Le patch comprend des corrections de bogues et des améliorations de performance.{% endhint %}

* Fixé un bogue de nœud de crash lorsque les utilisateurs ont désactivé `Health`l'API.
* Fixé un bogue dans le suivi des mises à jour qui pourrait plus que le rapport d'un nœud d'application.
* L'analyse de vertex refactored pour utiliser un `Codec`.
* Gestion de vertex stateful et apatride séparés.
* Ajouté la vérification de la longueur de tranche par champ au Codec.
* `TypeID`Introduit un nouveau type de codec qui regroupe les deux.
* L'introduction de drapeaux de limite de message pour le CLI.
* Il a introduit un paquet de semanticdb pour être utilisé lors d'une future migration de la base de données.
* Ajouté le suivi d'Epoch au contexte de la chaîne.
* Amélioration de certains des messages d'erreur retournés lors de la validation des transactions.
* Réduction de la pression GC dans la version DB.

## v1.1.0 \([Affichage sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)\)

**Apricot**

{% hint style="danger" %}**Veuillez noter que cette mise à jour n'est pas en arrière compatible avec les versions précédentes. Les mises à jour doivent être effectuées au plus tard le lundi 7 décembre à 23 h UTC \(18 h HNE\). La mise à jour, qui était initialement prévue vers la mi-décembre, est maintenant accélérée pour fixer un bogue de déverrouillage de jetons important. Nous exhortons tous les membres de la communauté à mettre à niveau le plus rapidement possible afin de garantir que leurs nœuds ne soient pas affectés.**{% endhint %}

Il y a deux composantes principales de cette mise à jour :

* Préparations générales de notre prochaine mise à niveau du réseau Apricot appelé la mise à niveau zéro de la phase Apricot
* Fixer une question qui a empêché les sorties verrouillées en jeu de ne pas être bloquées après leur verrouillage \_\*\*\_time avait passé

## v1.0.6 \([Vue sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)\)

{% hint style="danger" %}Veuillez noter que cette publication contient des changements de rupture décrits [ici.](https://docs.avax.network/build/apis/deprecated-api-calls) Il modifie le format de réponse par défaut de platform.getTxStatus et de platform.getTxStatus La mise à jour est facultative mais encouragée. Le patch comprend des améliorations de performance et certaines améliorations de la qualité de vie.{% endhint %}

* Les formats de platform.getTxStatus et de platform.getTxStatus et de platform.getTxStatus
* Ajout de la prise en charge des encodages hex d'utilisateurs importés et exportés de l'API de Keystore.
* Définissez l'exigence de golang sur v1.15.5 pour éviter une vulnérabilité de DoS trouvée dans la norme de golang lib.
* Ajouté les clients de l'API pour agir en tant qu'aides en interaction avec le logiciel de nœud.
* Activé pour revenir à la bootstrapping si un nœud devient déconnecté du reste du réseau.
* Fixer les API GetUTXOS lorsque les GetUTXOs ont référencé plusieurs adresses.
* Encodage binaire refactorisé pour mieux généraliser les options RPC.
* Filtrage de block IP fixe pour définir correctement la longueur de la fenêtre.
* Généralisé le paquet de codec pour pouvoir gérer plusieurs codec avec différentes versions.
* Ajouté Epoch à l'interface Vertex en préparation d'une future version.
* Le hashing de transaction différé pour réduire l'utilisation de CPU/Memory après les vérifications rapides.
* Pour les utilisateurs de [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), l'URL va être fermée dans une future version. Veuillez passer à [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

Pour obtenir une assistance avec cette mise à jour, suivez notre [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) sur les développeurs, si vous êtes toujours en train de traiter des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network/) pour obtenir de l'aide.

## v1.0.5 [\(Affichage sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)

{% hint style="danger" %}Veuillez noter que la publication après celle-ci, v1.0.6, contiendra les modifications de rupture décrites [ici.](https://docs.avax.network/build/apis/deprecated-api-calls) À savoir le format de réponse `platform.getTxStatus`et `platform.getCurrentValidators`le changeront.{% endhint %}

Les modifications de cette version, v1.0.5, sont en retour compatibles avec les versions précédentes. La mise à jour est facultative mais encouragée. Le patch comprend des améliorations de performance et certaines améliorations de la qualité de vie.

* Ajouté et `GetUTXOs`à l'API C-chain pour permettre l'émission the atomiques sans révéler `IssueTx`les clés privées sur un nœud.
* Une fuite de mémoire fixe dans le gestionnaire de requête du snowman avec le traitement des blocks oracle.
* Réparez le bogue de pagination UTXO qui sous-déclaré les fonds disponibles.
* La chaîne transformée en http se connecte à vivre dans le dossier de journaux de chaîne lisible par l'homme.
* Restructurer la manière dont les IDs sont gérés pour éviter les allocations de cap.
* Optimisé les `UniformSampler`s pour éviter de créer de multiples cartes.
* Utilisation réduite `ids.Set`en faveur de `[]ids.ID`mieux utiliser la mémoire continue.
* `[]byte`Réutilisation introduite en .`PrefixDB`
* Les fonctions de tri spécifiques à type pour éviter les affectations de conversion d'interface fréquentes.
* L'utilisateur de chargement AVM optimisé pour éviter de lire des informations inutiles sur le disque.
* Suppression d'une allocation de mémoire \+ copie dans l'envoi de socket pour toute la longueur du message.

Pour obtenir une assistance avec cette mise à jour, suivez notre [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) sur les développeurs, si vous êtes toujours en train de traiter des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network) pour obtenir de l'aide.

## v1.0.4 [\(Affichage sur GitHub\)](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)

![Notes de publication AvalancheGo v1.0.4png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}Cette mise à jour est facultative mais encouragée. Le patch comprend des améliorations de la qualité de vie et diverses améliorations de performance. Notez que cette mise à jour exige que les paramètres CLI soient spécifiés avec -- plutôt que de permettre soit - ou --. Par exemple, `-public-ip=127.0.0.1`n'est plus autorisé et doit être spécifié comme .`--public-ip=127.0.0.1` Sinon, cette mise à jour est compatible en arrière.{% endhint %}

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

Pour obtenir une assistance avec cette mise à jour, suivez notre [FAQ](https://support.avalabs.org/en/collections/2618154-developer-faq) sur les développeurs, si vous êtes toujours en train de traiter des problèmes, vous pouvez rejoindre notre [Discord](https://chat.avax.network) pour obtenir de l'aide.

