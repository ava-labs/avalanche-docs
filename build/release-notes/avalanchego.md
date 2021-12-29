# Notes de publication AvalancheGo

{% page-ref page="../tutorials/nodes-and-staking/upgrade-your-avalanchego-node.md" %}

## v1.6.5 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.5))

Cette version est rétrocompatible avec la version [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Elle est facultative, mais encouragée.

**Amorçage**

- Déposez les messages d'entrée dans une chaîne si cette chaîne est dans la phase d'exécution de l'amorçage.
- Imprimer les ID des nœuds de balises en cas d'échec de la connexion à ceux-ci.

**Mesures**

- Ajout de `avalanche_{ChainID}_bootstrap_finished`, qui est 1 si la chaîne a fini de s'amorcer, 0 sinon.

**API**

- Ajout d'un appel d'`info.uptime`API qui tente de signaler la vue du réseau du nœud local.
- Ajout de  `observedUptime`au résultat de chaque pair dans `info.peers`.

**Réseau**

- Ajout du temps d'activités rapporté aux messages pong pour pouvoir mieux suivre le temps d'activités d'un nœud local vu par le réseau.
- Refactorisation du registre du délai d'attente de la demande pour éviter une condition de concurrence potentielle.


## V1.6.4 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.4))

Cette version est rétrocompatible avec la version [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Elle est facultative, mais encouragée.

**Configuration**

- Ajout d'un indicateur `throttler-inbound-bandwidth-refill-rate`, qui spécifie l'utilisation de la moyenne maximale de la bande entrante d'un pair.
- Ajout d'un indicateur `throttler-inbound-bandwidth-max-burst-size`, qui spécifie l'utilisation de la bande entrante maximale d'un pair.

**Mise en réseau**

- Mise à jour des messages de pair pour utiliser le même mécanisme que les autres messages.
- Ajout de la limitation des messages entrants en fonction de l'utilisation de la bande passante récente.

**Mesures**

- Mise à jour de  `avalanche_{ChainID}_handler_gossip_{count,sum}`à .`avalanche_{ChainID}_handler_gossip_request_{count,sum}`
- Mise à jour de  `avalanche_{ChainID}_lat_get_accepted_{count,sum}`à .`avalanche_{ChainID}_lat_accepted_{count,sum}`
- Mise à jour de  `avalanche_{ChainID}_lat_get_accepted_frontier_{count,sum}`à .`avalanche_{ChainID}_lat_accepted_frontier_{count,sum}`
- Mise à jour de  `avalanche_{ChainID}_lat_get_ancestors_{count,sum}`à .`avalanche_{ChainID}_lat_multi_put_{count,sum}`
- Combiné `avalanche_{ChainID}_lat_pull_query_{count,sum}` et `avalanche_{ChainID}_lat_push_query_{count,sum}` à `avalanche_{ChainID}_lat_chits_{count,sum}`.
- Ajout de `avalanche_{ChainID}_app_response_{count,sum}`.
- Ajout de `avalanche_network_bandwidth_throttler_inbound_acquire_latency_{count,sum}`
- Ajout de `avalanche_network_bandwidth_throttler_inbound_awaiting_acquire`
- Ajout de `avalanche_P_vm_votes_won`
- Ajout de `avalanche_P_vm_votes_lost`

**Indexer**

- Ajout de la méthode  `GetContainerByID`à la mise en œuvre du client.
- Les méthodes du client retournent maintenant  `[]byte`plutôt que les `string`représentations d'un conteneur.

**C-Chain**

- Mise à jour de la dépendance Geth à 1.10.11.
- Ajout d'une nouvelle API d'admin pour mettre à jour le niveau du journal et mesurer les performances.
- Ajout d'un nouvel `--allow-unprotected-txs`indicateur  pour permettre l'émission des transactions sans protection de réexécution EIP-155.

**Sous-réseau et VM personnalisés**

- Veille à que toutes les chaînes possibles sont exécutées dans les réseaux `--staking-enabled=false`.


## v1.6.3 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.3))

Cette version est rétrocompatible avec la version [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Elle est facultative, mais encouragée.

**Options de configuration**

- Mise à jour de la valeur par défaut de  `--inbound-connection-throttling-max-conns-per-sec`à `256`.
- Mise à jour de la valeur par défaut de  `--meter-vms-enabled`à `true`.
- Mise à jour de la valeur par défaut de  `--staking-disabled-weight`à `100`.

**Mesures**

- Modification du comportement de `avalanche_network_buffer_throttler_inbound_awaiting_acquire` pour qu'il ne s'incrémente que si le message bloque vraiment.
- Modification du comportement de `avalanche_network_byte_throttler_inbound_awaiting_acquire` pour qu'il ne s'incrémente que si le message bloque vraiment.
- Ajout des mesures `Block/Tx` sur `meterVM`s.
   - Ajout de `avalanche_{ChainID}_vm_metervm_build_block_err_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_parse_block_err_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_get_block_err_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_verify_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_verify_err_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_accept_{count,sum}`.
   - Ajout de `avalanche_{ChainID}_vm_metervm_reject_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_parse_tx_err_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_get_tx_err_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_verify_tx_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_verify_tx_err_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_accept_{count,sum}`.
   - Ajout de `avalanche_{DAGID}_vm_metervm_reject_{count,sum}`.

**Coreth**

- Application de la correction de la gestion des erreurs de callTracer.
- Initialisation des fonctions multicoin dans l'environnement d'exécution.

**ProposerVM**

- Mise à jour du bloc `Delay` dans les réseaux `--staking-enabled=false` pour qu'il soit `0`.


## v1.6.2 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.2))

Cette version est rétrocompatible avec la version [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Elle est facultative, mais encouragée.

**Options de configuration**
* Suppression de `--coreth-config`. Voir [ici.](../references/command-line-interface.md#c-chain-config)
* Ajout de `--throttler-inbound-node-max-processing-msgs`. Voir [ici.](../references/command-line-interface.md#message-rate-limiting-throttling)
* Ajout de `--db-config-file`. Voir [ici.](../references/command-line-interface.md#database-config)

**API**
* La méthode API  `avm.exportAVAX`a été supprimée. Utilisez `avm.export` à la place.
* La méthode API  `avm.importAVAX`a été supprimée. Utilisez `avm.import` à la place.
* La méthode API `info.peers` traite maintenant le champ `PublicIP` comme option et ne le remplit que lorsqu'un IP valide est fourni.
* Le client API `platform.getValidatorsAt` a été ajouté.
* Le client API  `admin.lockProfile`a été réparé pour appeler correctement `lockProfile`.
* Le client API  `health.health`a été réparé pour gérer correctement les réponses d'un serveur malsain.
* Amélioration des réponses de l'API Health Check pour qu'elles soient plus descriptives.

**Liste d'exclusion**
* Modification de la durée minimale pendant laquelle un validateur ne doit pas répondre et de la durée maximale pendant laquelle un validateur sera mis sur la touche. Ces durées étaient auparavant de 5 minutes et de 30 minutes, respectivement, et sont maintenant de 2,5 minutes et de 15 minutes.

**Base de données**
* Permet aux utilisateurs de spécifier la configuration de la base de données avec l'indicateur `--db-config-file`.

**Sous-réseaux**
* Nous avons ajouté la possibilité pour un client de configurer un sous-réseau comme étant privé afin de restreindre l'adhésion aux seuls validateurs approuvés.

**Mise en réseau**
* Modification de la taille par défaut de l'allocation des messages entrants en général de 32 MiB à 6 MiB.
* Modification de la taille par défaut de l'allocation des messages sortants en général de 32 MiB à 6 MiB.
* Modification du nombre maximum d'octets par défaut qu'un nœud peut prendre de l'allocation des messages entrants en général de 4 MiB à 2 MiB.
* Modification du nombre maximum d'octets par défaut qu'un nœud peut prendre de l'allocation des messages sortants en général de 4 MiB à 2 MiB.
* Ajout de la limitation du débit des messages entrants. Un nœud ne lira pas plus de messages d'un pair jusqu'à ce qu'il traite moins de `--throttler-inbound-node-max-processing-msgs` de ce pair.
* Modification du nombre par défaut de non-validateurs vers lesquels un message AppGossip est envoyé, de 2 à 0.
* Modification du nombre par défaut de validateurs vers lesquels un message AppGossip est envoyé, de 4 à 6.
* Introduction de la possibilité pour une VM de bavarder avec des validateurs spécifiques plutôt que de façon uniforme et aléatoire.
* Correction d'un problème qui faisait que certains nœuds ne tentaient jamais de se reconnecter à un nœud précédemment déconnecté.

**ProposerVM**
* Introduction d'un décalage pessimiste de la hauteur de la P-Chain pour améliorer la stabilité lors de l'émission de blocs de P-Chain élevés.
* Application correcte du retard de bloc demandé.

**Mesures**
* Suppression des mesures d'histogramme de la X-Chain et de la P-Chain.
* Ajout des mesures de mempool de la P-Chain.
* Ajout des mesures `validator_sets` à la platformvm.

**Autre**
* Refactorisation du démarrage et de l'arrêt des nœuds pour éviter les arrêts maladroits dans le cas où le nœud est démarré puis immédiatement arrêté.
* Correction de la mempool de la P-Chain pour suivre correctement le nombre d'octets alloués.
* Mise à niveau de la C-Chain pour exécuter geth 1.10.9.
* Prise en charge d'abigen pour la C-Chain.
* Ajout d'un support de pré-image sur la C-Chain.
* Ajout du point de terminaison de l'historique des frais sur la C-Chain.
* Refactorisation du crénelage d'ID pour mieux prendre en charge les tests GRPC.
* Suppression de la logique de correspondance des branches de test de bout en bout.
* Suppression du point d'entrée principal déprécié pour le gestionnaire de processus de la migration de la base de données.

## v1.6.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.1))

Cette version est rétrocompatible avec la version [v1.6.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0). Elle est facultative, mais encouragée.

**Mises à niveau**

* Ajout de la possibilité de spécifier les configurations de sous-réseau
* Ajout de diverses nouvelles valeurs de configuration de réseau
* Suppression des anciens messages de la bibliothèque de réseau
* Correction d'un bogue de mempool de la P-Chain qui a eu un impact sur les transactions AddValidator sur les réseaux locaux
* Modification des règles de communication des transactions afin d'envoyer avec un nombre fixe de validateurs ainsi qu'avec tous les pairs.
* Suppression de la méthode `getLiveness`dépréciée de l'API Health
* Ajout d'une option de configuration pour désactiver les connexions entre les non-validateurs

**Remarque**

Les éléments suivants sont dépréciés et ne doivent plus être utilisés. Ils peuvent être supprimés dans toute version future :

* La méthode API `avm.exportAVAX` doit être supprimée en faveur de `avm.export`
* La méthode API `avm.importAVAX` doit être supprimée en faveur de `avm.import`
* L'option de configuration `coreth-config` doit être supprimée en faveur d'un [fichier de configuration de la chaîne](../references/command-line-interface.md#c-chain-config).

## v1.6.0 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0))

**Ce changement n'est pas rétrocompatible avec les versions précédentes.**

Cette mise à niveau ajoute un limiteur de contention à la C-Chain et à la P-Chain, introduit une redevance par bloc sur la C-Chin et ajuste certains paramètres de frais dynamiques sur la C-Chain.

Les changements dans la mise à niveau sont en vigueur à **17 h HAE, le 22 septembre 2021 sur Mainnet**. Vous devez mettre à jour votre nœud avant que les changements ne prennent effet, sinon vous risquez de subir une perte de temps de fonctionnement sur votre nœud.

Plus d'informations peuvent être trouvés [ici](https://medium.com/avalancheavax/apricot-phase-four-snowman-and-reduced-c-chain-transaction-fees-1e1f67b42ecf).

**Go**

La version minimale Go requise pour construire AvalancheGo est maintenant Go 1.16.8

**Correction de bogues**

Correction d'une condition de course pendant le démarrage du gestionnaire de délai d'attente.

**Mises à niveau**

* Introduction de [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) sur la P-Chain et la C-Chain.
* Introduction de la [communication mempool à la P-Chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) et à la C-Chain en utilisant la couche de communication VM<->VM.
* Ajout de frais basés sur les blocs pour les blocs de la C-Chain.
* Définissez le prix minimum du carburant à 25 nAVAX et le prix maximum du carburant à 1000 nAVAX dans le mécanisme de frais dynamiques de la C-Chain.
* Limite des connexions entrantes

**Nouvelles mesures**

* `avalanche_C_blks_built`/ `avalanche_P_blks_built`: nombre de blocs qui ont été construits localement sur la C-Chain et la P-Chain, respectivement.
* `avalanche_C_blks_builds_failed`/ `avalanche_P_blks_builds_failed`: nombre d'appels à BuildBlock qui ont échoué sur la C-Chain et la P-Chain, respectivement.

**Options de configuration**

* Ajout d'un indicateur `inbound-connection-throttling-max-conns-per-sec`.( Voir [la documentation de configuration.](../references/command-line-interface.md))
* Indicateur déprécié `inbound-connection-throttling-max-recent`. Cet indicateur est maintenant ignoré.

## PRE_RELEASE v1.6.0-fuji ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.6.0-fuji))

**Veuillez noter que cette version est incapable d'exécuter mainnet - et affichera « mainnet n'est pas pris en charge » si elle a tenté d'exécuter avec une configuration mainnet.**

Cette mise à niveau ajoute un limiteur de contention à la C-Chain et à la P-Chain, introduit une redevance par bloc sur la C-Chin et ajuste certains paramètres de frais dynamiques sur la C-Chain.

Les changements dans la mise à niveau sont en vigueur à 17 h HAE, le 16 septembre 2021 sur le testnet Fuji. Après avoir été mise à jour et vérifiée, une version compatible avec le réseau mainnet sera publiée.

**Tous les nœuds Fuji doivent se mettre à niveau avant 17 h HAE, le 16 septembre 2021.**

**Mises à niveau**

* Introduction de [Snowman++](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/proposervm/README.md) sur la P-Chain et la C-Chain.
* Introduction de la [communication mempool à la P-Chain](https://github.com/ava-labs/avalanchego/blob/v1.6.0-fuji/vms/platformvm/README.md) et à la C-Chain en utilisant la couche de communication VM<->VM.
* Ajout de frais basés sur les blocs pour les blocs de la C-Chain.
* Définissez le prix minimum du carburant à 25 nAVAX et le prix maximum du carburant à 1000 nAVAX dans le mécanisme de frais dynamiques de la C-Chain.
* Ajout de mesures pour le nombre de blocs construits et le nombre de tentatives de blocs de construction qui ont échoués.

## v1.5.3 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.3))

Cette version est rétrocompatible avec la version [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0).

**Temps de fonctionnement**

* Modification de l'exigence de temps de fonctionnement minimum pour recevoir une récompense de staking, de 60 % à 80 %.

**Mise en réseau**

* Ajout de 3 nouveaux messages de réseau : `AppRequest`, `AppResponse` et `AppGossip`. Ces messages permettent aux instances d'une blockchain d'envoyer des données arbitraires, comme défini par leur VM. Auparavant, les instances d'une blockchain ne pouvaient communiquer que les unes avec les autres en envoyant des messages de consensus (`Put`, `PushQuery`, etc. Voir `snow/engine/common/engine.go`.
* Lors de la réception d'un `Pong`message , déconnectez-vous de l'expéditeur si sa version est incompatible.
* Méthode prédéfinie dans  `common.Sender`avec  `Send`pour la clarté (par ex.  `Put`--> `SendPut`).

**P-Chain**

* Ajout de la fonctionnalité pour suivre les changements dans le poids du validateur par bloc.
* Ajout de la méthode API `GetValidatorsAt`qui permet de récupérer le validateur d'un sous-réseau (ou le réseau principal) défini à une hauteur de P-Chain donnée.

**C-Chain**

* Incorporation des changements de Geth v1.10.8
* Suppression des références à Anciens

**Consensus**

* Ajout de la méthode  `Timestamp()`à l'`snowman.Block`interface .

**Réseaux locaux**

* Mise à jour de l'heure de début des validateurs dans le Genesis local. L'heure de fin pour les validateurs spécifiés dans la configuration locale dans les versions avant la v1.5.3 est le 10 septembre 2021 00:00:00 UTC. **Pour cette raison, vous devez effectuer une mise à jour vers AvalancheGo v1.5.3 afin de faire fonctionner un réseau local après cette période.**

**Options de configuration**

* Ajout de l'option de configuration d'AvalancheGo `consensus-app-gossip-size`, qui définit le nombre de pairs à laquelle un `AppGossip`message  est envoyé.
* Ajout de l'option de configuration de la C-Chain `log-level`. Les options sont : `"trace"`, `"debug"`, `"info"`, `"warn"`, `"error"`, `"crit"`. Par défaut à  `"debug"`(comme précédemment.)

## v1.5.2 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.2))

Cette mise à jour est rétrocompatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez voir les heures de mise à jour prévues dans la version v1.5.0.

**Coreth**

* Correctif d'une [vulnérabilité de sécurité Geth](https://twitter.com/go_ethereum/status/1430067637996990464)
* Correctif d'une alerte dans le backend de l'api.

**AVM**

* Introduction de la génération de codecs sans état pour améliorer les outils.

**Consensus**

* Ajout d'une journalisation supplémentaire autour des votes par bulles.

## v1.5.1-eth_call ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1-eth_call))

Cette mise à jour est rétrocompatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez voir les heures de mise à niveau du réseau prévues dans la version v1.5.0.

Cette mise à jour est un correctif pour la v1.5.1 qui permet d'utiliser eth_call sans la vérification du compte appartenant à l'extérieur.

## v1.5.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.1))

Cette mise à jour est rétrocompatible avec [v1.5.0](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0). Veuillez voir les heures de mise à niveau du réseau prévues dans la version v1.5.0.

**Configuration**

* Option  supprimée `bootstrap-retry-max-attempts` et option ajoutée `bootstrap-retry-warn-frequency`

**Sous-réseaux**

* Ajout de `subnetID`au message d'établissement de connexion. Cela permet de notifier aux pairs les sous-réseaux qu'un nœud souhaite synchroniser.
* Optimisation des communications de conteneur de sous-réseau.

**AVM**

* Correction du point de terminais JSON de  `avm.GetTx`pour signaler correctement les `amount` sur les UTXO.

**Amorçage**

* Correction d'une boucle occupée qui pouvait se produire si l'internet d'un nœud tombait pendant l'amorçage, provoquant le signalement d'une erreur fatale par le nœud.

**RPCChainVM**

* Amélioration de la mise en cache des blocs non vérifiés.

**Coreth**

* Mise à jour vers Geth v1.10.7.

## v1.5.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0))

**Ce changement n'est pas rétrocompatible avec les versions précédentes.**

Cette mise à niveau ajoute des frais dynamiques à la C-chain, ainsi que diverses autres améliorations.

Les changements dans la mise à niveau sont en vigueur à 10 h EDT, le 24 août 2021 sur Mainnet. Vous devez mettre à jour votre nœud avant que les changements ne prennent effet, sinon vous risquez de subir une perte de temps de fonctionnement sur votre nœud.

Plus d'informations peuvent être trouvés [ici](https://medium.com/avalancheavax/apricot-phase-three-c-chain-dynamic-fees-432d32d67b60).

**Mises à niveau du réseau**

* Ajout de calculs des frais dynamiques à la C-chain.
* Augmentation des frais `CreateChainTx` et  `CreateSubnetTx`.
* Correction d'un bug de corruption de tas dans la validation des délégants.
* Renforcement de `MaxStakeWeight` pour les transactions de délégation.

**Mises à niveau du client**

* Ajout de capacités d'indexation des transactions à la X-chain pour permettre des recherches historiques des transactions par adresse et par actif.
* Ajout de  `./avalanchego`comme commande par défaut dans l'image docker.
* Utilisation des versions de dépendance statique dans l'image docker.
* Suppression de la prise en charge de la migration de la base de données et de l'exécution deamon.
* Remaniement de l'analyse de la configuration des nœuds.
* Optimisation de l'échantillonnage de la communication de conteneur.
* Ajout de la possibilité de construire statiquement les binaires AvalancheGo et EVM.
* Simplification de l'interface `Block`pour n'exposer que l'ID du bloc parent au lieu de récupérer le bloc parent complet.
* Ajout de métriques supplémentaires pour les emplois en attente dans les moteurs de consensus.
* Refactorisation des statuts de la P-chain pour gérer les statuts de validation de la blockchain séparément des statuts de confirmation des transactions.

**API mises à jour**

* Ajout de `GetAddressTxs` à l'API `avm`.
* Ajout de `SetLoggerLevel` et `GetLoggerLevel` à l'API `Admin` pour permettre un réglage fin des niveaux de journalisation alors que le nœud est toujours en cours d'exécution.
* Ajout de `GetConfig` à l'API `Admin` pour permettre de récupérer la configuration du nœud que le nœud utilise actuellement.
* Mise à jour de `platformvm.Client` pour permettre de spécifier des `nodeID` dans `GetCurrentValidators` et `GetPendingValidators` et généralisation de la réponse à `GetStake`.

**Arguments CLI mis à jour**

* Suppression de `fetch-only`.
* Ajout de l'analyse de la configuration JSON à la VM `avm`.
   * Ajout de `indexTransactions`
   * Ajout de `indexAllowIncomplete`

## PRÉ_VERSION v1.5.0-fuji ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.5.0-fuji))

**Veuillez noter que cette version est incapable d'exécuter mainnet - et affichera « cette version de nœud ne prend pas en charge mainnet » si on tente de l'exécuter avec une configuration mainnet. Si vous gérez un nœud du réseau principal, aucune action n'est requise jusqu'à ce que la version officielle soit publiée la semaine prochaine.**

**Ce changement n'est pas rétrocompatible avec les versions précédentes.**

Cette mise à niveau ajoute des frais dynamiques à la C-chain, ainsi que diverses autres améliorations.

Les changements dans la mise à niveau sont en vigueur à 15 h HAE, le 16 août 2021 sur le testnet Fuji. Après avoir été mise à jour et vérifiée, une version compatible avec le réseau mainnet sera publiée.

**Mises à niveau du réseau**

* Ajout de calculs des frais dynamiques à la C-chain.
* Augmentation des frais `CreateChainTx` et  `CreateSubnetTx`.
* Correction d'un bug de corruption de tas dans la validation des délégants.
* Renforcement de `MaxStakeWeight` pour les transactions de délégation.

**Mises à niveau du client**

* Ajout de capacités d'indexation des transactions à la X-chain pour permettre des recherches historiques des transactions par adresse et par actif.
* Ajout de  `./avalanchego`comme commande par défaut dans l'image docker.
* Utilisation des versions de dépendance statique dans l'image docker.
* Suppression de la prise en charge de la migration de la base de données et de l'exécution deamon.
* Remaniement de l'analyse de la configuration des nœuds.
* Optimisation de l'échantillonnage de la communication de conteneur.
* Ajout de la possibilité de construire statiquement les binaires AvalancheGo et EVM.
* Simplification de l'interface `Block`pour n'exposer que l'ID du bloc parent au lieu de récupérer le bloc parent complet.
* Ajout de métriques supplémentaires pour les emplois en attente dans les moteurs de consensus.
* Refactorisation des statuts de la P-chain pour gérer les statuts de validation de la blockchain séparément des statuts de confirmation des transactions.

**API mises à jour**

* Ajout de `GetAddressTxs` à l'API `avm`.
* Ajout de `SetLoggerLevel` et `GetLoggerLevel` à l'API `Admin` pour permettre un réglage fin des niveaux de journalisation alors que le nœud est toujours en cours d'exécution.
* Ajout de `GetConfig` à l'API `Admin` pour permettre de récupérer la configuration du nœud que le nœud utilise actuellement.
* Mise à jour de `platformvm.Client` pour permettre de spécifier des `nodeID` dans `GetCurrentValidators` et `GetPendingValidators` et généralisation de la réponse à `GetStake`.

**Arguments CLI mis à jour**

* Suppression de `fetch-only`.
* Ajout de l'analyse de la configuration JSON à la VM `avm`.
   * Ajout de `indexTransactions`
   * Ajout de `indexAllowIncomplete`

## v1.5.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.12))

Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.

**X-Chain**

* Ajout de l'argument de formatage `"json"` à la méthode API `GetTx`, qui renvoie la représentation JSON de la transaction interrogée
* Ajout d'assertions de type d'interface

**Info API**

* Ajout de la méthode `GetNodeVersion` au client Info API

**Métriques Prometheus**

* Correction et renommage des métriques pour les octets non envoyés en raison de la compression
* Ajout de métriques pour les octets non reçus en raison de la compression
* Ajout de la structure d'assistance `noAverager` au paquet `metrics`

**Base de données**

* Mise à jour / ajout des benchmarks

**Mémoire partagée**

* Replacement de `Put` et `Remove` par `Apply` pour permettre l'optimisation future des transactions atomiques

## v1.4.11 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.11))

**C-Chain**

Cette version active les instantanés par défaut.

**Indicateurs de configuration**

_Suppression_

* `conn-meter-reset-duration`
* `conn-meter-max-conns`

_Ajout_

* `network-compression-enabled`

**Métriques Prometheus**

Beaucoup de métriques Prometheus ont été renommées et de nombreux histogrammes ont été remplacés par 2 jauges. [](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)Voir ici pour la mise à jour des tableaux debord Grafana.

Cette version ajoute également des méthodes d'aide au paquet  `utils/metric`.

**RocksDB**

RocksDB n'est plus construit par défaut lors de l'exécution du script build, et il n'est pas inclus dans les binaires publiquement publiés. Pour construire AvalancheGo avec RocksDB, exécutez `export ROCKSDBALLOWED=1` dans votre terminal, puis `scripts/build.sh`. Vous devez le faire avant de pouvoir utiliser `--db-type=rocksdb`.

La base de données RocksDB place/cherche maintenant ses fichiers dans un sous-répertoire `rocksdb`. Notez que si vous avez précédemment exécuté avec RocksDB, vous devrez déplacer les fichiers existants.

**Compression de messages**

Les nœuds compressent maintenant certains messages P2P. Si un pair est une version >= v1.4.11, les messages Put, Push Query, Peer List et Multiput envoyés au pair sont compressés à l'aide de gzip avant d'être envoyés sur le réseau. Cela réduit l'utilisation de la bande passante d'AvalancheGo.

**Limitation** de la connexion entrante Refactorisation de la limitation du débit des connexions entrantes et l'activer par défaut.

**Améliorations générales**

* Refactorisation et amélioration des performances de l'itération sur une base de données desservie par gRPC à un plugin.
* Sur Linux, nettoyer la C-Chain si AvalancheGo s'arrête inopportunément
* Refactorisation des définitions des messages P2P et les déplacer du paquet  `network`.
* Ajout d'alias VM au serveur HTTP API
* Remplacement de `1024` par `units.KiB`, etc.
* Amélioration de la tolérance des partitions en traitant les chits dans l'ordre de la création des requêtes correspondantes.

**IP Fuji**

Mise à jour des IP d'amorçage pour le Fuji Testnet.

## v1.4.10 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.10))

**Apricot Phase 2 - Correctif 10**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.{% endhint %}

Le correctif inclut les performances, les limitations et les améliorations de la VM :

* Ajout de la prise en charge pour utiliser `RocksDB` plutôt que `LevelDB` sur les architectures prises en charge.
* Restructuration de la limitation du réseau entrant sur une base par nœud, afin de limiter l'utilisation de la bande passante des nœuds pairs.
* Restructuration de la limitation des réseaux sortants au poids attribué par une mise.
* Mise à jour de la valeur par défaut de l'indicateur  `pruning-enabled` à `true` pour la C-chain.
* Activation de l'enregistrement des VM personnalisées sur RPC.
* Mise à jour de l'état de la blockchain pour signaler l'état de la validation.
* Déplacement de `TimestampVM` dans son propre répertoire pour correspondre au chemin de création de VM attendu.
* Correction du script de génération de code protobuf pour placer les fichiers `grpc` dans le bon emplacement..
* Passage des octets du bloc par le `rpcchainvm#Block.Verify` pour éviter tout échec potentiel de la vérification de l'éviction du cache.

## v1.4.11 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.9))

**Apricot Phase 2 - Correctif 9**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.{% endhint %}

Le correctif inclut des améliorations de performance et des améliorations de suivi :

* Ajout de la prise en charge pour exécuter la C-chain avec le nettoyage activé. Le nettoyage est actuellement désactivé par défaut.
* Réduction de l'intervalle de ping de la Websocket de la C-Chain pour réduire les déconnexions lorsque derrière un équilibreur de charge.
* Ajout de l'horodatage à l'interface du bloc snowman.
* Correction d'un bogue dans l'application de la durée maximale de l'API C-chain pour les appels effectués via des websockets.
* Ajout de la prise en charge de l'en-tête gzip pour le point de terminaison http.
* Ajout d'autres descriptions de version au point de terminaison `info.getNodeVersion`.
* Restriction de la connexion aux versions des nœuds >= 1.4.5.
* Déplacement des journaux daemon dans le répertoire principal.
* Ajout de la prise en charge pour l'échantillonnage déterministe.
* Ajout d'une action GitHub de déploiement automatique pour les nouvelles balises.
* Refactorisation de la gestion de la configuration pour mieux prendre en charge le lancement des nœuds programmatiquement.

## v1.4.8 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.8))

**Apricot Phase 2 - Correctif 8**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.{% endhint %}

Le correctif inclut des améliorations de performance, des améliorations de suivi et des corrections de sous-réseau :

* Modification de la définition des frais de l'AVM pour appliquer les frais à payer dans l'actif natif de la chaîne. Cela ne change pas le comportement de la X-Chain, mais rend les autres instances AVM utilisables.
* Ajout de la possibilité d'indiquer des configurations à des chaînes spécifiques. Cela déprécie le paramètre CLI  `coreth-config`.
* Ajout d'une limitation du nombre de nouvelles connexions sortantes.
* Introduction d'un wrapper VM qui ajoute des métriques transparentes à une chaîne.
* Ajout de la possibilité d'activer le profilage continu des nœuds.
* Réduction des allocations d'octets dans la couche de réseau.
* Ajout de divers paramètres CLI pour le réglage des paramètres de communication.
* Permet aux nœuds de fonctionner en utilisant une paire de clés éphémères, plutôt qu'une paire lue sur le disque.
* Suppression d'un avertissement parasite incorrect.
* Déplacement des tests CI pour les exécuter dans les actions Github plutôt que dans Travis.
* Suppression de cas spéciaux de l'interface VM.

**Ajout des arguments de ligne de commande :**

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

## v1.4.7 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.7))

**Apricot Phase 2 - Correctif 7**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut des améliorations de performance et des corrections de bogues.{% endhint %}

Si la version de nœud précédemment installée est <= v1.4.4, ce nœud peut avoir cessé de traiter les blocs. Cette mise à jour réparera le nœud et effectuera une migration de la base de données. Pour plus de détails sur la migration de la base de données, veuillez voir les [notes de migration de la base de données v1.4.5](avalanchego-v1.4.5-database-migration.md). Si la version du nœud précédemment installé est >=v1.4.5, ce nœud utilisera la base de données existante et n'aura pas besoin d'effectuer une migration de la base de données.

* Correction du nœud de pré-migration pour vérifier correctement le bloc de la P-chain `SHraz7TtMfTQ5DX1rREhNZW1bi7PpPzAq7xoJAwrWNQrLhQcD`.
* Correction de la régression dans `platformvm.GetBlockchains` pour renvoyer correctement les blockchains du sous-réseau principal.
* Mise à jour de la version de grpc à v1.37.
* Échantillonnage optimisé des listes de pairs.
* Ajout de benchmarks de la base de données.
* Réduction de diverses allocations de mémoire répétées.

## v1.4.6 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.6))

**Apricot Phase 2 - Correctif 6**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut des améliorations de performance et des corrections de bogues.{% endhint %}

**Si la version de nœud précédemment installée est &lt= v1.4.4, ce nœud effectuera une migration de la base de données. Pour plus de détails sur la migration de la base de données, voir les notes de version v1.4.5.** Si la version de nœud précédemment installée est v1.4.5, ce nœud utilise la base de données existante et n'a pas besoin d'effectuer une migration de la base de données.

Ce correctif :

* Supprime l'émission de transactions invalides dans le pool de mémoire de la P-chain qui causait des écritures prolongées dans la base de données.
* Fichiers et dossiers non liés à la base de données ignorés dans le répertoire de la base de données. Cela devrait spécifiquement réparer les erreurs signalées sur macOS avec . Fichiers DS_Store.
* Correction de l'indicateur build-dir pour pouvoir être spécifié via CLI sans provoquer l'erreur du nœud de pré-mise à niveau.
* Suppression de l'indicateur plugin-dir qui n'est plus pris en charge par le daemon du gestionnaire de nœud. Typiquement ne pas spécifier l'indicateur mène au bon comportement. Cependant, pour les installations complexes, l'indicateur build-dir peut être nécessaire.
* Renforcement des messages de communication uniquement aux connexions qui ont fini le handshake par les pairs.
* Réduction des allocations de mémoire pendant les parcours de consensus et l'amorçage.

## v1.4.5 ([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5))

**Apricot Phase 2 - Correctif 5 - Mise à niveau de la base de données**

**Cette mise à niveau est plus impliquée que la mise à jour de la version typique. Des instructions plus détaillées et une FAQ peuvent être trouvés** [**ici**](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration)**.**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut d'importantes améliorations de performance et de nombreuses autres mises à jour.{% endhint %}

**Amélioration de la VM :**

* Remaniement total de la `platformvm`gestion d'état.
   * Suppression de l'utilisation de `versiondb`passant par des blocs pour transmettre des références d'état qui peuvent être modifiées et lues sans avoir à ré-analyser les objets.
   * Mise en œuvre d'un gestionnaire d'état de base pour mettre en cache et écrire correctement dans la base de données sous-jacente.
   * Mise en œuvre d'ensembles de validateurs CoW pour permettre la mise en cache de multiples ensembles de validateurs dans la mémoire.
   * Indexation des chaînes par sous-réseau pour éviter de toucher aux objets d'état non utilisés.
   * Indexations des validateurs par `nodeID` pour éviter des itérations inutiles tout en acceptant les transactions `addDelegator` et `addSubnetValidator`.
   * Réduction du nombre de paires de valeur clé dédiées à la gestion d'ensembles de validateurs sur les mises à jour du disque et du validateur.
* Ajout de guichets de récompense de staking à l'API de `platformvm`pour prendre en charge l'indexation des récompenses.
* Remaniement des compteurs de disponibilité du validateur pour simplifier les tests.
* Ajout de métriques sur le type de bloc et de transaction à la `platformvm`.
* Ajout de métriques d'appels d'API à la `avm` et à la `platformvm`.
* Mise à jour de la gestion d'état de la `avm`pour utiliser les `prefixdb`, enregistrer les métriques de mise en cache et partager le code supplémentaire avec l'application `platformvm`.
* Simplification de la gestion et de l'indexation de `UTXO` dans les `avm` et `platformvm`.
* Restructuration de l'analyse et de la gestion des adresses pour qu'elles soient entièrement partagées entre des instances VM compatibles.
* Restructuration de la mémoire partagée du sous-réseau principal à partager entièrement sur les instances de la VM.
* Ajout d'une implémentation d'état de chaîne pour prendre en charge la mise en cache transparente sur les implémentations de VM existantes et pour simplifier l'implémentation de nouvelles VM.
* Intégration du nouveau gestionnaire d'état de la chaîne dans la `rpcchainvm`, qui ajoute également diverses métriques.
* Ajout de `upgradeBytes` et `configBytes` à l'interface standard VM pour mieux prendre en charge les futures mises à jour du réseau.
* Ajout des points de terminaison `getAtomicTx` et `getAtomicTxStatus` à l'API `evm`.
* Simplification de la production du bloc `evm` à effectuer de manière synchrone avec le moteur de consensus.
* Ajout d'un pool de mémoire de transaction atomique pour réintroduire les transactions atomiques orphelines.
* Correction de bogue dans le client `evm` pour définir correctement la `sourceChain` dans `getAtomicUTXOs`.
* Intégration du nouveau gestionnaire d'état de la chaîne dans la `evm` pour mieux optimiser la gestion des blocs.

**Amélioration de l'amorçage :**

* Suppression des re-parcours pendant l'amorçage. Cela améliore considérablement les performances du nœud lors des redémarrages du processus d'amorçage.
* Correction d'un arrêt incorrect du nœud lors de la tentative de quitter le nœud pendant l'exécution de conteneurs amorcés.
* Correction des diffusions de conteneur IPC dupliqué pendant l'amorçage.
* Normalisation de la file d'attente des emplois d'amorçage à écrire à l'état en utilisant des`prefixdb` plutôt que de mettre en œuvre un préfixe personnalisé.
* Ajout d'autres métriques d'amorçage et de cache.

**Ajouts de la migration de la base de données :**

* Ajout d'un gestionnaire de processus daemon pour migrer de manière fluide au format de la base de données mis à jour.
* Remaniement de la gestion des versions pour suivre les versions sémantiques de la base de données.
* Mise en œuvre d'un gestionnaire de base de données pour suivre et fonctionner sur différentes versions de la base de données.
* Mise en œuvre d'une migration `keystore` qui copie automatiquement les utilisateurs de la base de données `v1.0.0` à la base de données `v1.4.5`.
* Mise en œuvre d'une migration du temps de fonctionnement du validateur de la base de données `v1.0.0` vers la base de données `v1.4.5`.

**Amélioration des nœuds :**

* Mise à jour de l'analyse de configuration pour toujours développer les variables d'environnement.
* Remaniement de la configuration du nœud pour permettre de spécifier les certificats TLS dans la mémoire sans toucher au disque.
* Ajout d'une meilleure prise en charge pour les codes de sortie significatifs.
* Affichage des adresses d'écoute des serveurs `http` et `staking` pour faciliter la prise en charge des mappages de ports non spécifiques.
* Mise en œuvre d'une base de données `versionable` pour pouvoir basculer entre une base de données de passage et une base de données `versioned`.
* Optimisation des pré-allocations d'ID `Set` et réduction de l'utilisation de la mémoire des `struct`.
* Application des règles de mise en valeur plus strictes.

**Modification des arguments de ligne de commande :**

Pour les arguments suivants `"default"` a précédemment été traité comme un mot-clé. Maintenant, `"default"` essaiera d'être traité comme la valeur prévue de l'indicateur . Pour conserver le comportement par défaut, l'indicateur ne doit pas être spécifié.

* `config-file`
* `coreth-config`
* `plugin-dir`
* `staking-tls-key-file`
* `staking-tls-cert-file`
* `bootstrap-ips`
* `bootstrap-ids`
* `ipcs-path`
* `db-dir`

Pour les arguments suivants `""` a précédemment été traité comme un mot-clé. Maintenant, `""` essaiera d'être traité comme la valeur prévue de l'indicateur . Pour conserver le comportement par défaut, l'indicateur ne doit pas être spécifié.

* `ipcs-chain-ids`
* `log-dir`
* `log-display-level`

Il n'est plus nécessaire que les `bootstrap-ips` et `bootstrap-ids` soient appariés. Cela signifie qu'il est maintenant valide de spécifier un nombre différent de `bootstrap-ips` que `bootstrap-ids`. Les `bootstrap-ips` sont utilisés pour se connecter initialement au réseau et les `bootstrap-ids` sont utilisés comme balises dans l'amorçage.

**Ajout des arguments de ligne de commande :**

* `fetch-only`
* `build-dir`

**Suppression des arguments de ligne de commande**

* `xput-server-port`
* `xput-server-enabled`

## v1.4.4 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.4))

**Apricot Phase 2 - Correctif 4**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.{% endhint %}

Le correctif inclut des corrections de bogues et des améliorations de performance qui visent à optimiser la prochaine version `db-upgrade`.

* Délai de queue dans l'amorçage ignoré afin que toutes les chaînes se terminent dès que la dernière chaîne est marquée comme amorcée dans un sous-réseau.
* Amélioration de la gestion des messages pendant l'amorçage pour gérer les messages tout en attendant que les autres chaînes puissent synchroniser.
* Réduction des allocations des échantillonneurs en réutilisant les échantillonneurs existants.
* Mise à jour des scripts docker pour ne pousser que les images provenant de la section `master`.
* Correction du formatage des journaux.
* Amélioration des messages d'erreur.

## v1.4.3 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.3))

**Apricot Phase 2 - Correctif 3**

{% hint style="warning" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée.{% endhint %}

Le correctif comprend des corrections de bogues, une mise à jour de la surveillance de la disponibilité et des améliorations des performances.

* Correction de la gestion des messages ignorés qui pouvaient empêcher un nœud de progresser pendant l'amorçage. Cette situation se produisait généralement lorsque le nœud ne parvenait pas à passer à l'exécution normale alors qu'il terminait l'amorçage.
* Correction d'un bogue non déterministe dans la base de code de C-Chain qui pouvait amener les nœuds recevant beaucoup de demandes de diffusion de transactions à arrêter temporairement de produire des blocs jusqu'à ce qu'ils traitent un bloc produit par un autre nœud.
* Limite à un seul le nombre de messages de version à envoyer à un pair.
* Suppression des messages de gestion des anciens qui ont été dépréciés dans Apricot Phase 2.
* Marquage des nœuds qui ont été mis en veille comme étant hors ligne pour les calculs de temps de fonctionnement.
* Mise à jour de l'ensemble de validateurs pour être plus performant lors des changements d'ensemble de validateurs.
* Mise à jour de la mise en réseau pour ne tenter de se reconnecter à un pair lors d'une déconnexion que s'il est actuellement un validateur.

## v1.4.2 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.2))

**Apricot Phase 2 - Correctif 2**

{% hint style="warning" %}Cette mise à jour est rétrocompatible avecv1.4.0 et v1.4.1. Les changements de mise à niveau sont en vigueur à 10 h HNE, le 5 mai 2021 sur le testnet Fuji et 7 h HNE, le 10 mai 2021 sur mainnet.{% endhint %}

Le correctif réduit également la taille des messages de liste de pairs et introduit plusieurs nouveaux indicateurs :

* `network-peer-list-size` permet de régler le nombre de pairs faisant l'objet de partage dans chaque message `peerlist`.
* `network-peer-list-gossip-size` permet d'ajuster le nombre de pairs vers lesquels les messages `peerlist` seront transmis.
* `network-peer-list-gossip-frequency` permet de régler la fréquence à laquelle les `peerlist` sont transmises.

## v1.4.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.1))

**Apricot Phase 2 - Correctif 1**

{% hint style="warning" %}Cette mise à jour est rétrocompatible avec v1.4.0. Veuillez voir les heures de mise à jour prévues dans la version v1.4.0.{% endhint %}

Le correctif réduit la taille des messages des listes de pairs faisant l'objet de communication et introduit un nouvel indicateur `--bootstrap-beacon-connection-timeout` qui permet de configurer le délai de connexion des balises au démarrage.

## v1.4.0 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.0))

**Apricot Phase 2**

{% hint style="danger" %}**
Veuillez noter que ce changement n'est pas rétrocompatible avec les versions précédentes.**

**L'article de blog correspondant peut être trouvé** [**ici**](https://medium.com/avalancheavax/apricot-phase-two-berlin-eips-enhanced-avalanche-native-token-ant-support-c2ae0febe5bf)**.**
{% endhint %}

{% hint style="warning" %}
Cette mise à jour applique la mise à niveau d'Ethereum Berlin à la C-chain, ajoute un nouveau point de terminaison AVM et inclut diverses améliorations de la stabilité. Nous demandons instamment à tous les membres de la communauté d'effectuer une mise à jour dès que possible afin de s'assurer que leurs nœuds restent sains.

Les changements de mise à niveau sont en vigueur à 10 h HNE, le 5 mai 2021 sur le testnet Fuji et 7 h HNE, le 10 mai 2021 sur mainnet.{% endhint %}

**Les composants principaux de cette mise à jour incluent :**

* Mise à jour de Coreth pour dépendre de v1.10.2 de go-ethereum.
* Application de la mise à jour d'Ethereum Berlin. Plus précisément [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565), [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718), [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) et [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930).
* Ajout de nouveaux contrats intelligents pré-compilés à la C-chain pour prendre en charge les transferts ANT et les wrappers ARC-20 autour des ANT.
* Ajout d'un point de terminaison `/events` AVM qui prend en charge la notification par websocket des transactions acceptées correspondant à un filtre d'adresses.
* Ajout de deux nouveaux types de messages `SignedVersion` et `SignedPeerlist` pour améliorer les mappages de validateur -> IP.
* Correction d'un bogue de longue date pour lequel l'arrêt du nœud pendant l'amorçage d'une chaîne pouvait entraîner l'arrêt incorrect de la chaîne.
* Mise à jour des paquets gRPC de plugin pour paginer les grandes demandes afin d'améliorer la stabilité.
* Ajout de la possibilité d'exécuter le binaire principal d'avalanchego comme un plugin.
* Correction d'une condition de course potentielle dans la protection contre la corruption de leveldb.
* Mise à jour des scripts build automatisés pour mieux prendre en charge plusieurs architectures.

**Ajout des arguments de ligne de commande :**

* `plugin-mode-enabled` spécifie le binaire à exécuter en mode plugin.

**Suppression des arguments de ligne de commande**

* `p2p-tls-enabled`
* `disconnected-check-frequency`
* `disconnected-restart-timeout`
* `restart-on-disconnected`

## v1.3.2 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.2))

**Apricot Phase 1 - Correctif 2**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif comprend des améliorations de la sécurité, des corrections de bogues et des améliorations de la surveillance.
{% endhint %}

**Amélioration de la sécurité**

* Application d'un format canonical strict pour les blocs de C-chain fabriqués avant `Apricot Phase 1`. Cela garantit que les modifications apportées au champ de bloc `extra-data` ne peuvent pas entraîner de modifications de l'état de la chaîne pendant l'amorçage.
* Modification de `Keystore` pour s'assurer que seules les valeurs chiffrées sont envoyées sur l'IPC entre les processus avalanchego et le plugin.

**Corrections de bogues :**

* Correction des calculs de plafonnement de délégation pour inclure la mise à jour du maximum de délégation actuel avant de supprimer un délégant. Cela garantit que le plafond de délégation est toujours appliqué.
* Correction de l'API statique de `AVM` pour être enregistré correctement au démarrage.
* Mise à jour des `uptime`calculs de nœud  pour prendre en compte les mises à niveau du réseau.

**Améliorations de la surveillance**

* Ajout d'un indexeur de nœuds facultatif qui peut fournir une commande locale uniforme des opérations acceptées sur une chaîne.
* Mise à jour de l'inventaire ansible pour inclure de nombreuses améliorations (un grand merci à @moreati).

## v1.3.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.1))

**Apricot Phase 1 - Correctif 1**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut la stabilité, les améliorations de suivi et les corrections de bogues mineurs.{% endhint %}

**Les composants principaux de cette mise à jour incluent :**

* Correction de segfault de la C-chain lors de l'exécution de la compression sur les UC arm64.
* Ajout des autorisations de groupe aux fichiers locaux pour permettre la surveillance complexe des nœuds.
* Extraction de l'espace blanc des mots de passe Auth passés par l'indicateur api-auth-password-file
* Suppression de timeSinceNoOutstandingRequests, car il a été remplacé par longestRunningRequest.
* Ajout de métriques supplémentaires dans la limitation de réseau.
* Divers nettoyage de code.

**Ajout des arguments de ligne de commande :**

* `network-health-max-outstanding-request-duration`

**Suppression des arguments de ligne de commande**

* `network-health-max-time-since-no-requests`

## v1.3.0 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.3.0))

**Apricot Phase 1**

{% hint style="danger" %}
Veuillez noter que ce changement n'est pas rétrocompatible avec les versions précédentes.

Cette mise à jour réduit les frais de carburant de la C-chain, supprime les remboursements de carburant de la C-chain et inclut diverses améliorations de sécurité. Nous demandons instamment à tous les membres de la communauté d'effectuer une mise à jour dès que possible afin de s'assurer que leurs nœuds restent sains.
{% endhint %}

Les changements de mise à jour sont en vigueur à 10 h HNE, le 25 mars 2021 sur le testnet Fuji et à 10 h HNE, le 31 mars 2021 sur mainnet.

**Les composants principaux de cette mise à jour incluent :**

* Réduction du coût du carburant de la C-chain de 470 nAVAX à 225 nAVAX.
* Suppression des remboursements de carburant de la C-chain. Ce changement adopte [EIP-3298](https://eips.ethereum.org/EIPS/eip-3298).
* Remaniement de la vérification de la C-chain pour être plus propre lors de l'exécution des mises à jour du réseau.
* Correction de l'API Auth pour appliquer correctement les jetons révoqués.
* Renforcement de l'API Auth pour s'assurer que le format de signature attendu est utilisé.
* Suppression du mot de passe de l'API Auth des arguments CLI.
* Ajout de contrôles des autorisations de fichier.
* Ajout de quelques petits traitement d'erreur supplémentaires.
* Nettoyage des écritures du journal avant d'être écrites sur le disque.
* Ajout des origines configurables au point de terminaison HTTP.
* Suppression des tentatives de HTTP pour le basculement HTTP au démarrage. Maintenant, le nœud se fermera au démarrage si la mise à niveau du point de terminaison HTTP vers HTTPs échoue.

**Ajout des arguments de ligne de commande :**

* `api-auth-password-file`Spécifie le fichier pour lire le mot de passe de l'API Auth à partir de.

**Suppression des arguments de ligne de commande**

* `api-auth-password`

## **v1.2.4 (**[**Voir sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.4)**)**

**Apricot Phase 0 - Mise à niveau 1 - Correctif 4**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif comprend des améliorations de la stabilité et de la surveillance.
{% endhint %}

* Mise à jour de readme pour corriger les exigences de stockage.
* Ajout d'un traitement supplémentaire des erreurs lors de la vérification des Avalanche Tx pendant l'amorçage.
* Mise à jour de nombreuses métriques, y compris l'ajout de nombreuses nouvelles métriques relatives à la santé des nœuds et à l'utilisation de la base de données, la suppression des métriques inutilisées et invalides, et la correction de certains noms de métriques.
* Ajout d'une journalisation supplémentaire à CI.
* Ajout de la C-chain à la liste des chaînes critiques.

## **v1.2.3 (**[**Voir sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**)**

**Apricot Phase 0 - Mise à jour 1 - Correctif 3**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif comprend des améliorations de la stabilité et de la surveillance.
{% endhint %}

* Ajustement paramètres du contrôle de santé `[network, router, consensus]`pour supprimer les contrôles de santé défaillants.
* Simplification du traitement des blocs de la C-chain.

## **v1.2.2 (**[**Voir sur GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**)**

**Apricot Phase 0 - Mise à jour 1 - Correctif 2**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif comprend des améliorations de la stabilité, des performances et de la surveillance.
{% endhint %}

* Ajout des alias IP dans la bibliothèque du réseau pour éviter les appels `SYN` répétés.
* Correction du traitement des messages d'amorçage lors de l'amorçage de vous-même.
* Simplification de l'émission  `AdvanceTimeTx`.
* Ajout de nouveaux contrôles de santé par consensus.
* Ajout de la journalisation de la santé des nœuds.
* Ajout de réponses de santé aux demandes de santé `GET`.
* Consolidation des journaux de messages entrants.
* Ajout de la journalisation d'erreur au wrapper  `LevelDB`.
* Ajout de codes d'erreur à `rpcdb` pour éviter l'analyse des chaînes de caractères.
* Amélioration du traitement de la C-chain de la chaîne canonique pour réduire le nombre de reorgs.
* Amélioration du traitement de la C-chain des appels de simulation effectués sur le bloc  `pending`.

## **v1.2.1 (**[**Voir sur GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**)**

**Apricot Phase 0 - Mise à niveau 1 - Correctif 1**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut des améliorations de la stabilité, des performances et de la surveillance.

Veuillez noter que cette mise à jour supprime `network-timeout-increase ` et `network-timeout-reduction` comme arguments de la ligne de commande.
{% endhint %}

Résumé des changements :

* Ajout de `UTXO à la réponse `platformvm.getStake` .
* Ajout des rapports de benchlist à la réponse `info.peers.
* Ajout d'autres contrôles de santé dans la couche de réseau.
* Ajout de `pourcentage de la mise connectée` comme une métrique signalée.
* Ajout de la logique de redémarrage de l'amorçage pour s'assurer que le nœud a pris la pointe actuelle, même pendant les périodes de haut débit.
* Ajout de l'amorçage à l'échelle du sous-réseau pour s'assurer qu'une chaîne ne prendra pas de retard à cause de l'amorçage d'une autre chaîne.
* Vérification évitée des blocs rejetés pour éviter tout calcul inutile.
* Suppression de la diffusion de blocs non préférés sur le réseau.
* Le calculateur de délai d'attente du réseau a été modifié pour utiliser une EWMA de la latence observée du réseau.
* Suppression des requêtes `Get` des calculs de latence du réseau.
* Nettoyage de l'algorithme de benchlist.
* Nettoyage de la gestion des messages supprimés sur l'envoi.
* Nettoyage de la logique de demande et de délai de sortie.
* Généralisation du suivi des performances pour permettre le préfixe des noms de profil.
* Ajout d'une mise en cache supplémentaire au parcours d'amorçage Avalanche.
* Correction de linting ansible.
* Les arguments de ligne de commande ajoutés sont principalement constitués de configurations des contrôles de santé. En outre, les calculs de latence du réseau modifiés ont changé le nom de certains arguments de ligne de commande.

Ajout des arguments de ligne de commande :

* `network-timeout-halflife`
* `network-timeout-coefficient`
* `network-health-min-conn-peers`
* `network-health-max-time-since-msg-received`
* `network-health-max-time-since-msg-sent`
* `network-health-max-portion-send-queue-full`
* `network-health-max-send-fail-rate`
* `network-health-max-time-since-no-requests`
* `router-health-max-drop-rate`
* `router-health-max-outstanding-requests`
* `health-check-frequency`
* `health-check-averager-halflife`
* `bootstrap-retry-enabled`
* `bootstrap-retry-max-attempts`

Suppression des arguments de ligne de commande

* `network-timeout-increase`
* `network-timeout-reduction`

## v1.2.0 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0))

**Apricot Phase 0 - Mise à niveau 1**

{% hint style="danger" %}**
Veuillez noter que ce changement n'est pas rétrocompatible avec les versions précédentes. Cette mise à niveau corrige les problèmes de performance liés aux transferts d'échange entre les chaînes X, C et P. Nous demandons instamment à tous les membres de la communauté de mettre à niveau le plus tôt possible afin de s'assurer que leurs nœuds ne sont pas affectés. Notez également que les nœuds peuvent prendre plusieurs minutes supplémentaires pour se connecter après la mise à niveau et que le processus doit pouvoir se terminer sans interruption.**
{% endhint %}

Les composants principaux de cette mise à jour incluent :

* Correction de la validation de l'importation atomique sur C-Chain
* Ajout de la logique d'exception de la règle pour permettre les blocs de bonus atomiques
* Ajout d'une logique fail-fast dans la mémoire partagée si des suppressions en double sont effectuées
* Correction du problème où les sondages pouvaient s'arrêter dans le snowman parce qu'il n'a pas réussi à effacer les requêtes
* Correction du problème BAD BLOCK dans coreth en raison d'ancêtres inconnus
* Correction d'une condition de course dans le script de réparation de la chaîne canonique dans coreth
* Nombre limité de blocs de traitement dans Snowman et de tx de traitement dans Avalanche
* Mise à jour des valeurs par défaut et des paramètres de benchlist
* Vérification de non-violation de la sécurité après l'instabilité initiale du réseau

## v1.1.5 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5))

**Apricot Phase 0 - Correctif 5**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut des améliorations de la stabilité.
{% endhint %}

* Correction d'un blocage potentiel lors de l'enregistrement de nouvelles chaînes qui pouvait entraîner le blocage de la P-chain et du point de terminaison http(s).
* Réparation de TxID -> Indication de la hauteur de bloc dans la C-chain.
* Ajout de la gestion fluide des déploiements de contrat vide dans l'API debug_traceTransaction dans la C-chain.
* Amélioration du traitement des erreurs dans la C-chain.

## v1.1.4 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4))

**Apricot Phase 0 - Correctif 4**

{% hint style="danger" %}Cette mise à jour est rétrocompatible. Elle est facultative, mais encouragée. Le correctif inclut des mises à jour de CLI, des corrections de bogue de l'API , des améliorations de la stabilité et des performances.
{% endhint %}

* Correction d'un problème où les index de blocs de la chaîne C pouvaient correspondre à des blocs non acceptés à une hauteur donnée.
* Correction du crash de la VM lorsque la RPCChainVM subissait des charges API élevées.
* Correction des bulles de vote optimistes dans le moteur Avalanche pour que les votes passent correctement par les sommets de traitement.
* Ajout du champ IncludePartial aux méthodes API GetBalance et GetAllBalances de l'AVM. Ceci modifie le comportement par défaut afin de retourner uniquement les soldes des actifs dépensables et des actifs à propriété unique.
* Ajout de la possibilité de spécifier les configurations de genèse personnalisées pour les ID du réseau personnalisé.
* Ajout d'une fonctionnalité API IPC .
* Ajout d'une mise en cache supplémentaire à la RPCChainVM.
* Amélioration de la recherche du répertoire des plugins pour qu'il fonctionne toujours avec les versions binaires.

## v1.1.3 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3))

**Apricot Phase 0 - Correctif 3**

{% hint style="danger" %}
Cette mise à jour est facultative, mais encouragée. Le correctif inclut des corrections de bogues mineurs concernant les API.
{% endhint %}

* Correction d'un appel suspendu lors de la tentative de filtrer les journaux de la C-chain.
* Correction du client de la C-chain pour qu'il appelle l'API multi-pièce.
* Ajout de `getAtomicUTXOs` aux clients API `avm` et `platformvm`.

## v1.1.2 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2))

**Apricot Phase 0 - Correctif 2**

{% hint style="danger" %}
Cette mise à jour est facultative, mais encouragée. Le correctif inclut des corrections de bogues et des améliorations de performance.
{% endhint %}

* Correction du cache du traitement de l'amorçage pour réduire les parcours dupliqués lors de l'amorçage Avalanche.
* Optimisation de la vérification de la P-chain pendant l'amorçage.
* Correction du calcul de la bench list maximum pour utiliser les valeurs d'entrée appropriées.
* Suppression des exécutions supplémentaires de linter de CI.
* Ajout de `Height` à l'interface `snowman.Block`.

## v1.1.1 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1))

**Apricot Phase 0 - Correctif 1**

{% hint style="danger" %}
Cette mise à jour est facultative, mais encouragée. Le correctif inclut des corrections de bogues et des améliorations de performance.
{% endhint %}

* Correction d'un bogue du crash du nœud lorsque les utilisateurs désactivent l'API `Health`.
* Correction d'un bogue dans le suivi du temps de fonctionnement qui pouvait surestimer le temps de fonctionnement d'un nœud.
* Remaniement de l'analyse des sommets pour utiliser un `Codec`.
* Gestion séparée des sommets avec et sans état.
* Ajout de la vérification de la longueur de la tranche par champ au Codec.
* Introduction d'un nouveau type de codec qui regroupe les  `TypeID`.
* Introduction des indicateurs de limite des messages au CLI.
* Introduction d'un paquet semanticdb à utiliser pendant une future migration de la base de données.
* Ajout du suivi Epoch au contexte de la chaîne.
* Amélioration de certains des messages d'erreur retournés pendant la validation de la transaction.
* Réduction de la pression GC dans la version DB.

## v1.1.0 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0))

**Apricot Phase 0**

{% hint style="danger" %}**
Veuillez noter que cette mise à niveau n'est pas rétrocompatible avec les versions précédentes. Les mises à jour doivent être effectuées au plus tard le lundi 7 décembre à 23 h UTC (18 h HNE). La mise à jour, qui était initialement prévue vers la mi-décembre, est maintenant accélérée pour réparer un bogue de déblocage des jetons important. Nous demandons instamment à tous les membres de la communauté de mettre à niveau le plus tôt possible afin de s'assurer que leurs nœuds ne sont pas affectés.**
{% endhint %}

Il y a deux composants principaux de cette mise à jour :

* Préparations générales pour notre prochaine mise à jour du réseau Apricot appelé la mise à jour de Apricot Phase Zero
* Correction d'un problème qui empêchait le déverrouillage des sorties verrouillées par piquet après que leur _**_time de verrouillage se soit écoulé.

## v1.0.6 ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6))

{% hint style="danger" %}
Veuillez noter que cette version contient des changements de rupture décrits [ici](https://docs.avax.network/build/apis/deprecated-api-calls). Elle change le format de réponse par défaut de platform.getTxStatus et platform.getCurrentValidators.
La mise à jour est facultative, mais encouragée. Le correctif comprend des améliorations des performances et de la qualité de vie.
{% endhint %}

* Suppression des formats dépréciés de  platform.getTxStatus et platform.getCurrentValidators.
* Ajout de la prise en charge des codages hexagonaux des utilisateurs importés et exportés à partir de l'API keystore.
* Définition de l'exigence golang à v1.15.5 pour éviter une vulnérabilité DoS trouvée dans la librairie standard golang.
* Ajout de clients API pour agir comme des assistants interagissant avec le logiciel du nœud.
* Activation du retour à l'amorçage si un nœud se déconnecte du reste du réseau.
* Correction des API GetUTXOs lorsque les UTXO référencent plusieurs adresses.
* Remaniement du codage binaire pour mieux généraliser les options RPC.
* Correction du filtrage des blocs IP pour définir correctement la longueur de la fenêtre.
* Généralisation du paquet codec pour pouvoir gérer plusieurs codecs avec différentes versions.
* Ajout d'Epoch à l'interface Vertex pour la préparation d'une future version.
* Hachage différé des transactions pour réduire l'utilisation de l'UC/la mémoire après les vérifications rapides.
* Pour ceux qui utilisent [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), l'URL sera arrêtée dans une future version. Veuillez basculer vers [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

Pour obtenir de l'aide concernant cette mise à jour, suivez notre [FAQ développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous rencontrez toujours des problèmes, vous pouvez rejoindre notre  [Discord](https://chat.avax.network/) pour obtenir de l'aide.

## v1.0.5  ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5))

{% hint style="danger" %}
Veuillez noter que la version suivante, v1.0.6, contiendra les modifications de rupture décrites [ici](https://docs.avax.network/build/apis/deprecated-api-calls). À savoir, le format de réponse de `platform.getTxStatus` et `platform.getCurrentValidators` changera.
{% endhint %}

Les changements dans cette version, v1.0.5, sont rétrocompatibles avec les versions précédentes.
La mise à jour est facultative, mais encouragée. Le correctif comprend des améliorations des performances et de la qualité de vie.

* Ajout de `IssueTx` et  `GetUTXOs` à l'API C-chain pour permettre l'émission des swaps atomiques sans révéler les clés privées à un nœud.
* Correction de la fuite de mémoire dans le gestionnaire de requête snowman avec le traitement des blocs oracle.
* Correction d'un bogue de la pagination des UTXO qui sous-évaluait les fonds disponibles.
* Déplacement des journaux http de la chaîne pour les placer dans le dossier des journaux de la chaîne lisible par l'homme.
* Restructuration de la façon dont les identifiants sont gérés pour éviter les allocations au segment de mémoire.
* Optimisation des  `UniformSampler` pour éviter de créer plusieurs cartes.
* Réduction de l'utilisation de  `ids.Set` au profit de  `[]ids.ID` pour mieux utiliser la mémoire continue.
* Introduction de la réutilisation de `[]byte` dans `PrefixDB`.
* Mise en œuvre des fonctions de tri spécifique au type pour éviter les allocations de conversion d'interface fréquentes.
* Optimisation de l'utilisateur de la charge AVM pour éviter de lire les informations inutiles du disque.
* Suppression d'une allocation mémoire + copie dans l'envoi de socket pour la longueur complète du message.

Pour obtenir de l'aide concernant cette mise à jour, suivez notre [FAQ développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous rencontrez toujours des problèmes, vous pouvez rejoindre notre  [Discord](https://chat.avax.network) pour obtenir de l'aide.

## v1.0.4  ([Voir sur GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4))

![Notes de version AvalancheGov1.0.4.png](../../.gitbook/assets/image%20%2817%29.png)

{% hint style="danger" %}
Cette mise à jour est facultative, mais encouragée. Le correctif inclut des améliorations de qualité de vie et diverses améliorations de performance. Notez que cette mise à jour exige que les paramètres CLI soient spécifiés avec -- plutôt que de permettre soit - soit --. Par exemple, `-public-ip=127.0.0.1` n'est plus autorisé et doit être spécifié comme `--public-ip=127.0.0.1`. Sinon, cette mise à jour est rétrocompatible.
{% endhint %}

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

Pour obtenir de l'aide concernant cette mise à jour, suivez notre [FAQ développeur](https://support.avalabs.org/en/collections/2618154-developer-faq), si vous rencontrez toujours des problèmes, vous pouvez rejoindre notre  [Discord](https://chat.avax.network) pour obtenir de l'aide.

