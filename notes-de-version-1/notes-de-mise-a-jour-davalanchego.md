# Notes de mise à jour d'AvalancheGo

## Notes de mise à jour AvalancheGo v1**.2.3 \(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.3-signed)**\)**

{% hint style="danger" %}
Cette mise à jour est rétrocompatible. C'est facultatif, mais encouragé. Le correctif inclut des améliorations de stabilité, de performances et de surveillance
{% endhint %}

* Ajustement des paramètres de vérification de l'état \[réseau, routeur, consensus\] pour supprimer les vérifications d'état irrégulières.
* Manipulation simplifiée des blocs de la C-Chain.

## Notes de mise à jour AvalancheGo v1.2.2 **\(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/releases/tag/v1.2.2)**\)**

{% hint style="danger" %}
Cette mise à jour est rétrocompatible. C'est facultatif, mais encouragé. Le correctif inclut des améliorations de stabilité, de performances et de surveillance.
{% endhint %}

* Ajout d'alias IP dans la bibliothèque réseau pour éviter les appels SYN répétés.
* Correction de la gestion des messages d'amorçage lors du démarrage de vous-même. 
* Émission AdvanceTimeTx simplifiée. 
* Ajout de nouvelles vérifications de l'état du consensus. 
* Ajout de la journalisation de la santé des nœuds. 
* Ajout de réponses d'intégrité aux demandes GET d'intégrité. 
* Journaux des messages entrants consolidés. 
* Ajout de la journalisation des erreurs au wrapper LevelDB. 
* Ajout de codes d'erreur au rpcdb pour éviter l'analyse des chaînes. 
* Amélioration de la gestion de la C-Chainde la chaîne canonique pour réduire le nombre de réorganisations. 
* Amélioration de la gestion de la C-Chain des appels simulés effectués sur le bloc en attente.

## Notes de mise à jour AvalancheGo v1.2.1 **\(**[**View on GitHub**](https://github.com/ava-labs/avalanchego/tree/v1.2.1)**\)**

{% hint style="danger" %}
Cette mise à jour est rétrocompatible. C'est facultatif, mais encouragé. Le correctif inclut des améliorations de stabilité, de performances et de surveillance.   
****Veuillez noter que cette mise à jour supprime «network-timeout-augmente» et «network-timeout-reduction» comme arguments de ligne de commande.
{% endhint %}

Résumé des modifications:

* Ajout de `UTXO` à la réponse`platformvm.getStake`. 
* Ajout de rapports de benchlist à la réponse `info.peers`. 
* Ajout de vérifications de l'état supplémentaires dans la couche réseau. 
* Ajout du «pourcentage de mise connecté» comme métrique rapportée. 
* Ajout d'une logique de redémarrage par bootstrap pour garantir que le nœud a rattrapé la pointe actuelle, même pendant les périodes de débit élevé. 
* Ajout de l'amorçage à l'échelle du sous-réseau pour s'assurer qu'une chaîne ne prendra pas de retard en raison d'un autre amorçage de chaîne. 
* Vérification empêchée des blocs rejetés pour éviter des calculs inutiles. Suppression des commérages des blocs non préférés sur le réseau. 
* Commutation du calculateur de délai d'expiration du réseau pour utiliser un EWMA de la latence du réseau observée. 
* Suppression des requêtes `Get` des calculs de latence du réseau. 
* Nettoyé l'algorithme de benchlisting. 
* Traitement nettoyé des messages perdus lors de l'envoi. 
* Nettoyé la logique de demande et de délai d'expiration en suspens. 
* Suivi des performances généralisé pour permettre le préfixe des noms de profil. 
* Ajout de la mise en cache supplémentaire à la traversée d'amorçage Avalanche. 
* Peluche fixe ansible. 
* Les arguments de ligne de commande ajoutés consistent principalement en des configurations de vérifications de l'état. En outre, les calculs de latence du réseau modifiés ont changé le nom de certains arguments de ligne de commande.

Ajout d'arguments de ligne de commande:

* \```network-timeout-halflife```
* ```network-timeout-coefficient```
* ```network-health-min-conn-peers```
* ```network-health-max-time-since-msg-received```
* ```network-health-max-time-since-msg-sent```
* ```network-health-max-portion-send-queue-full```
* ```network-health-max-send-fail-rate```
* ```network-health-max-time-since-no-requests```
* ```router-health-max-drop-rate```
* ```router-health-max-outstanding-requests```
* ```health-check-frequency```
* ```health-check-averager-halflife```
* ```bootstrap-retry-enabled```
* ```bootstrap-retry-max-attempts```

Arguments de ligne de commande supprimés:

* `network-timeout-increase`
* `network-timeout-reduction`

## Notes de mise à jour AvalancheGo v1.2.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.2.0)\)

{% hint style="danger" %}
**Veuillez noter que ce patch n'est pas rétrocompatible avec les versions précédentes. Cette mise à niveau résout les problèmes de performances liés aux transferts d'échange entre les chaînes X, C et P. Nous exhortons tous les membres de la communauté à effectuer la mise à niveau dès que possible afin de garantir que leurs nœuds ne sont pas affectés. Notez également que les nœuds peuvent prendre plusieurs minutes supplémentaires pour se connecter après la mise à niveau et que le processus doit être autorisé à se terminer sans interruption.**
{% endhint %}

Les principaux composants de cette mise à niveau comprennent:

* Correction de la validation de l'importation atomique sur C-Chain**.**
* Ajout d'une logique d'exception de règle pour autoriser les blocs bonus atomiques.
* Ajout d'une logique de défaillance rapide dans la mémoire partagée si des suppressions dupliquées sont émises 
* Correction d'un problème où les sondages pouvaient bloquer dans le bonhomme de neige en raison d'un échec de suppression des demandes 
* Correction d'un problème de BAD BLOCK dans coreth en raison d'ancêtres inconnus 
* Correction d'une condition de concurrence dans le script de réparation de la chaîne canonique dans coreth 
* Nombre limité de blocs de traitement dans Snowman et de traitement de tx dans Avalanche 
* Mise à jour des valeurs par défaut du délai d'expiration du réseau et des paramètres de la liste de tests 
* Vérifié qu'il n'y avait pas de violation de sécurité après l'instabilité initiale du réseau

## Notes de mise à jour AvalancheGo v1.1.5 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.5)\)

{% hint style="danger" %}
Cette mise à jour est rétrocompatible. C'est facultatif mais encouragé. Le correctif comprend des améliorations de stabilité.
{% endhint %}

* Correction d'un blocage potentiel lors de l'enregistrement de nouvelles chaînes pouvant entraîner le blocage de la chaîne P et du point de terminaison http \(s\).
* Repairs TxID -&gt; Indexation de hauteur de bloc dans la C-Chain.
* Ajout de la gestion gracieuse des déploiements de contrats vides dans l'API debug\_traceTransaction dans la C-Chain.
* Amélioration de la gestion des erreurs dans la C-Chain.

## Notes de mise à jour AvalancheGo v1.1.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.4)\)

{% hint style="danger" %}
Cette mise à jour est rétrocompatible. C'est facultatif mais encouragé. Le correctif comprend des mises à niveau de la CLI, des corrections de bogues d'API, des améliorations de stabilité et des améliorations de performances.
{% endhint %}

* Correction d'un problème où les index de blocs de la C-Chain pouvaient être mappés à des blocs non acceptés à une hauteur donnée.
* Correction d'un crash de VM lorsque le RPCChainVM subissait des charges d'API élevées.
* Correction du vote optimiste bouillonnant dans le moteur d'avalanche pour passer correctement les votes à travers les sommets de traitement.
* Ajout du champ IncludePartial aux méthodes d'API GetBalance et GetAllBalances d'AVM. Cela modifie le comportement par défaut pour ne renvoyer que les soldes des actifs dépensables et détenus de manière unique.
* Ajout de la possibilité de spécifier des configurations de genèse personnalisées pour les ID de réseau personnalisés.
* Ajout d'une fonctionnalité API IPC supplémentaire.
* Ajout de la mise en cache supplémentaire à RPCChainVM.
* Recherche améliorée du répertoire des plugins pour toujours fonctionner avec les versions binaires.

## Notes de mise à jour AvalancheGo v1.1.3 \([View on GitHub](https://github.com/ava-labs/avalanchego/tree/v1.1.3)\)

{% hint style="danger" %}
Cette mise à jour est facultative mais encouragée. Le correctif comprend des corrections de bugs mineurs concernant les API.
{% endhint %}

* Correction d'un appel suspendu lors de la tentative de filtrage des journaux de la C-Chain.
* Correction du client de la C-Chain pour appeler l'API multi-pièces appropriée.
* Ajout de getAtomicUTXOs aux clients API avm et platformvm.

## Notes de mise à jour AvalancheGo v1.1.2 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.2)\)

{% hint style="danger" %}
Cette mise à jour est facultative mais encouragée. Le correctif inclut des corrections de bugs et des améliorations de performances.
{% endhint %}

* Correction du cache de traitement d'amorçage pour réduire les traversées dupliquées lors du démarrage d'Avalanche.
* Vérification optimisée de la P-Chain lors du bootstrap.
* Correction du calcul de la liste de bancs maximum pour utiliser les valeurs d'entrée appropriées.
* Suppression des exécutions supplémentaires de linter de CI.
* Hauteur ajoutée à l'interface snowman.Block.

## Notes de mise à jour AvalancheGo v1.1.1 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.1)\)

{% hint style="danger" %}
Cette mise à jour est facultative mais encouragée. Le correctif inclut des corrections de bugs et des améliorations de performances.
{% endhint %}

* Correction d'un bug de crash de nœud lorsque les utilisateurs désactivaient l'API Health.
* Correction d'un bug dans le suivi de la disponibilité qui pouvait dépasser le temps de disponibilité d'un nœud.
* Analyse des sommets refactorisée pour utiliser un codec.
* Gestion séparée des vertex avec état et sans état.
* Ajout de la vérification de la longueur de tranche par champ au codec.
* Introduction d'un nouveau type de codec qui regroupe les TypeID.
* Introduction d'indicateurs de limite de message dans l'interface de ligne de commande.
* Introduction d'un package semanticdb à utiliser lors d'une future migration de base de données.
* Ajout du suivi d'époque au contexte de la chaîne.
* Amélioration de certains des messages d'erreur renvoyés lors de la validation de la transaction.
* Réduction de la pression du GC dans la version DB.

## Notes de mise à jour AvalancheGo v1.1.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.1.0)\)

{% hint style="danger" %}
**Veuillez noter que cette mise à jour n'est pas rétrocompatible avec les versions précédentes. Les mises à niveau doivent être effectuées au plus tard le lundi 7 décembre à 23 h. UTC \(18 h HNE\). La mise à niveau, qui était initialement prévue vers la mi-décembre, est maintenant accélérée pour corriger un bogue important de déverrouillage des jetons. Nous exhortons tous les membres de la communauté à effectuer la mise à niveau dès que possible afin de garantir que leurs nœuds ne sont pas affectés.**
{% endhint %}

Cette mise à niveau comprend deux composants principaux:

* Préparatifs généraux pour notre prochaine mise à niveau du réseau Apricot appelée mise à niveau Apricot Phase Zero
* Correction d'un problème qui empêchait les sorties verrouillées de mise en jeu d'être déverrouillées une fois leur temps de verrouillage écoulé

## Notes de mise à jour AvalancheGo v1.0.6  \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.6)\)

{% hint style="danger" %}
Veuillez noter que cette version contient des changements de rupture décrits [ici](https://docs.avax.network/build/apis/deprecated-api-calls). Il modifie le format de réponse par défaut de platform.getTxStatus et platform.getCurrentValidators. La mise à jour est facultative mais encouragée. Le correctif comprend des améliorations des performances et des améliorations de la qualité de vie.
{% endhint %}

* Suppression des formats obsolètes de platform.getTxStatus et platform.getCurrentValidators.
* Ajout de la prise en charge des encodages hexadécimaux des utilisateurs importés et exportés à partir de l'API keystore.
* Définissez l'exigence golang sur v1.15.5 pour éviter une vulnérabilité DoS trouvée dans la lib standard golang.
* Ajout de clients API pour agir en tant qu'assistants interagissant avec le logiciel du nœud.
* Activé pour revenir au bootstrap si un nœud est déconnecté du reste du réseau.
* Correction des API GetUTXOs lorsque les UTXO référençaient plusieurs adresses.
* Codage binaire remanié pour mieux généraliser les options RPC.
* Correction du filtrage de bloc IP pour définir correctement la longueur de la fenêtre.
* Généralisation du package de codecs pour pouvoir gérer plusieurs codecs avec différentes versions.
* Epoch a été ajouté à l'interface Vertex en préparation d'une future version.
* Hachage de transaction différé pour réduire l'utilisation du processeur / de la mémoire après les vérifications rapides.
* Pour ceux qui utilisent [https://explorerapi.avax-dev.network/](https://explorerapi.avax-dev.network/), l'URL va être fermée dans une prochaine version. Veuillez basculer vers [https://explorerapi.avax.network/](https://explorerapi.avax.network/).

## Notes de mise à jour AvalancheGo v1.5.0 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.5)\)

{% hint style="danger" %}
Veuillez noter que la version postérieure à celle-ci, v1.0.6, contiendra les changements de rupture décrits [ici](https://docs.avax.network/build/apis/deprecated-api-calls). À savoir, le format de réponse de `platform.getTxStatus` et `platform.getCurrentValidators` changera.
{% endhint %}

Les modifications de cette version, v1.0.5, sont rétrocompatibles avec les versions précédentes. La mise à jour est facultative mais encouragée. Le correctif comprend des améliorations des performances et des améliorations de la qualité de vie.

* Ajout de IssueTx et de GetUTXO à l'API C-chain pour permettre l'émission de swaps atomiques sans révéler les clés privées à un nœud.
* Correction d'une fuite de mémoire dans le gestionnaire de requêtes de bonhomme de neige avec le traitement des blocs oracle.
* Correction d'un bug de pagination UTXO qui sous-déclarait les fonds disponibles.
* Déplacement des journaux de chaîne http pour qu'ils vivent dans le dossier des journaux de chaîne lisibles par l'homme.
* Restructurez la façon dont les ID sont gérés pour éviter les allocations de tas.
* Optimisation des UniformSamplers pour éviter de créer plusieurs cartes.
* Utilisation réduite des ids.Set en faveur de \[\] ids.ID pour mieux utiliser la mémoire continue.
* Introduction de la réutilisation de \[\] octets dans PrefixDB.
* Implémentation de fonctions de tri spécifiques au type pour éviter les allocations de conversion d'interface fréquentes.
* Utilisateur de chargement AVM optimisé pour éviter de lire des informations inutiles sur le disque.
* Suppression d'une allocation de mémoire + copie dans l'envoi de socket pour toute la longueur du message.

## Notes de mise à jour AvalancheGo v1.0.4 \([View on GitHub](https://github.com/ava-labs/avalanchego/releases/tag/v1.0.4)\)

![](../.gitbook/assets/image%20%2817%29.png)

Cette mise à jour est facultative mais encouragée. Le correctif comprend des améliorations de la qualité de vie et diverses améliorations des performances. Notez que cette mise à jour nécessite que les paramètres CLI soient spécifiés avec - plutôt que d'autoriser soit `-` soit `--`. Par exemple, `-public-ip=127.0.0.1` n'est plus autorisé et doit être spécifié comme `--public-ip=127.0.0.1`. Sinon, cette mise à jour est rétrocompatible.

```aspnet
• Ajout de la liste blanche de sous-réseau pour permettre au propriétaire d'un nœud de choisir les sous-réseaux à valider.
• Ajout de l'analyse du fichier de configuration pour les paramètres de nœud.
• Ajout de plus d'options pour spécifier l'adresse IP d'un nœud et ajout de getNodeIP à l'info *endpoint.
• Ajout d'un TxID au résultat de get.Validators dans platformvm.
• Version Coreth mise à jour.
• Nettoyage de l'implémentation du test snowball et ajout de tests supplémentaires pour s'aligner sur les tests de mutation.
• Implémentation et optimisation des moyennes de temps en continu pour le suivi de la latence du processeur et du réseau.
• Allocations de mémoire considérablement optimisées à divers endroits.
• Augmentation de la taille du cache de vérification de signature.
• Lectures de base de données réduites lors de la gestion des sommets.
```

```cpp
• Ajout d'un argument facultatif includeReason à platform.getTxStatus.
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

Pour obtenir de l'aide avec cette mise à jour, suivez notre [FAQ pour les développeurs](https://support.avalabs.org/en/collections/2618154-developer-faq). Si vous rencontrez toujours des problèmes, vous pouvez rejoindre notre [Telegram](https://t.me/Avalanche_fr) pour obtenir de l'aide.

