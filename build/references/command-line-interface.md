# Interface de ligne de commande

Vous pouvez spécifier la configuration d'un noeud avec les arguments ci-dessous.

## Arguments

### Fichier Config

`--config-file` \(string\):

Chemin vers un fichier JSON qui spécifie la configuration de ce nœud. Les arguments de la ligne de commande remplaceront les arguments définis dans le fichier de config.

Exemple fichier de configuration JSON:

```javascript
{
    "log-level": "debug"
}
```

### APIS

`--api-admin-enabled` \(boolean\):

Si configuré à `faux`, ce noeud n'exposera pas l'API d'administration. Défaut (en) à `faux`. Voir [ici](../avalanchego-apis/admin-api.md) pour plus d'informations.

`--api-auth-required` \(boolean\):

Si les appels API sont configurés à `true`, ils nécessitent un jeton d'autorisation. Défaut (en) à `faux`. Voir [ici](../avalanchego-apis/auth-api.md) pour plus d'informations.

`--api-auth-password` de passe \(string\):

Le mot de passe nécessaire pour créer/révoquer les jetons d'autorisation. Si `--api-auth-required=true`, =true, doit être spécifié; autrement ignoré. Voir [ici](../avalanchego-apis/auth-api.md) pour plus d'informations.

`--api-health-enabled` \(boolean\):

Si configuré à `vrai`, ce noeud exposera l'API santé. Par défaut à `true`. Voir [ici](../avalanchego-apis/health-api.md) pour plus d'informations.

`--index-enabled` \(boolean\):

Si `faux`, ce noeud ne permettra pas l'indexer et l'API d'index ne sera pas disponible. Défaut (en) à `faux`. Voir [ici](../avalanchego-apis/index-api.md) pour plus d'informations.

`--api-info-enabled` \(boolean\):

Si configuré à `true`, ce noeud exposera l'API Info . Par défaut à `true`. Voir [ici](../avalanchego-apis/info-api.md) pour plus d'informations.

`--api-ipcs-enabled` \(boolean\):

Si vous êtes configuré à `true`, ce noeud exposera l'API IPC. Défaut (en) à `faux`. Voir [ici](../avalanchego-apis/ipc-api.md) pour plus d'informations.

`--api-keystore-enabled` activé \(boolean\):

Si configuré à `faux`, ce noeud n'exposera pas l'API Keystore. Par défaut à `true`. Voir [ici](../avalanchego-apis/keystore-api.md) pour plus d'informations.

`--api-metrics-enabled` activé \(booléen\):

Si configuré à `faux`, ce noeud n'exposera pas l'API Metrics. Par défaut à `true`. Voir [ici](../avalanchego-apis/metrics-api.md) pour plus d'informations.

### Affirmations

`--assertions activées` \(boolean\):

Lorsque vous êtes configuré à `true`, les assertions s'exécuteront à l'exécution dans l'ensemble de la base de code. Ceci est destiné à être utilisé dans le débogage, car nous pouvons obtenir un message d'erreur plus spécifique. Par défaut à `true`.

### Démarrage

`--bootstrap-beacon-connection-timeout` \(durée\):

Timeout lorsque vous essayez de se connecter aux balises bootstraping. Par défaut à `1m`.

`--bootstrap-ids` \(string\):

Bootstrap ID est un tableau d'ID de validateur. Ces ID seront utilisés pour authentifier les pairs bootstraping. Un exemple de configuration de ce champ serait `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. La valeur par défaut dépend de l'ID réseau.

`--bootstrap-ips` \(string\):

Bootstrap IP est un tableau de paires IPv4:port. Ces adresses IP seront utilisées pour bootstrap l'état actuel d'Avalanche. Un exemple de configuration de ce champ serait `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. La valeur par défaut dépend de l'ID réseau.

`--bootstrap-retry-enabled` \(boolean\):

Si vrai, réessayer le bootstrapping si il échoue.

`--bootstrap-retry-max-attempts` \(uint\):

Nombre maximum de fois pour réessayer bootstrapping après une défaillance.

### Base de données

`--db-dir` \(chaîne, chemin de fichier\):

Spécifie le répertoire auquel la base de données est persistante. Par défaut à `"$HOME/.avalanchego/db"`.

`--db-type` \(string\):

Spécifie le type de base de données à utiliser. Doit être une de `leveldb`, `leveldb`, `memdb``. memdb` est une base de données leveldb, non non-persisted

Notez que lors de l'exécution avec `leveldb`, le noeud ne peut pas lire les données qui ont été perdues lors de l'exécution avec `rocksdb` et vice-versa.

**Deux notes importantes sur RocksDB**: Premièrement, RocksDB ne fonctionne pas sur tous les ordinateurs. Deuxièmement, RocksDB n'est pas construit par défaut et n'est pas inclus dans les binaires publiés. Pour construire AvalancheGo avec RocksDB, lancez `export ROCKSDBALLOWED=1` dans votre terminal puis `scripts/build.sh`. Vous devez le faire avant d'utiliser `--db-type=rocksdb`.

### Genèse

`--genesis` \(string\):

Chemin vers un fichier JSON contenant les données de genèse à utiliser. Ignoré lors de l'exécution des réseaux standard \(Mainnet, Testnet. \) Si non donné, utilise les données de genèse par défaut. Pour un exemple de la représentation JSON des données de geneses, voir [ici](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

### Serveur HTTP

`--http-host` \(string\):

L'adresse que les API HTTP écoutent. Par défaut à `127.0.0.1`. Cela signifie que par défaut, votre noeud ne peut gérer que les appels API effectués depuis la même machine. Pour autoriser les appels API à partir d'autres machines, utilisez `--http-host=`.

`--http-port`

Chaque noeud exécute un serveur HTTP qui fournit les API pour interagir avec le noeud et le réseau Avalanche. Cet argument spécifie le port que le serveur HTTP écoutera. La valeur par défaut est `9650`.

`--http-tls-cert-file` \(string, chemin de fichier\):

Cet argument spécifie l'emplacement du certificat TLS utilisé par le noeud pour le serveur HTTPS. Cela doit être spécifié lorsque `--http-tls-enabled=true`. Il n'y a aucune valeur par défaut.

`--http-tls-enabled` \(boolean\):

Si vous êtes configuré à `true`, ce drapeau tentera de mettre à niveau le serveur pour utiliser HTTPS. Défaut (en) à `faux`.

`--http-tls-key-file` \(string, chemin de fichier\):

Cet argument spécifie l'emplacement de la clé privée TLS utilisée par le noeud pour le serveur HTTPS. Cela doit être spécifié lorsque `--http-tls-enabled=true`. Il n'y a aucune valeur par défaut.

### PISSC

`--ipcs-chain-ids` \(string\)

Liste séparée de la chaîne des commandes à connecter. Il n'y a aucune valeur par défaut.

`--ipcs-path` \(string\)

Le répertoire \(Unix\) ou préfixe nommé tuyau \(Windows\) pour les prises de l'IPC. Par défaut vers /tmp.

### Limite du Descripteur de fichier

`--fd-limit` \(int\)

Tentatives d'augmenter la limite du descripteur de fichier processus à au moins cette valeur. Par défaut à `32768`

### Logistique

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Le niveau du journal détermine quels événements log. Il y a 7 niveaux différents, afin de la plus haute priorité à la plus basse.

* `Off`: Aucun journal n'a ce niveau de logging.
* `Fatale `: erreurs mortelles qui ne sont pas récupérables.
* `Erreur`: Erreurs que le noeud rencontres, ces erreurs ont été récupérées.
* `Avertissement `: Un avertissement qui pourrait être indicatif d'un nœud byzantin faux, ou d'une erreur future potentielle.
* `Info` : Descriptions utiles des mises à jour de l'état du noeud.
* `Debug`: Debug logging est utile lorsqu'il tente de comprendre les bugs possibles dans le code. Plus d'informations qui seraient généralement désirées pour une utilisation normale sera affichée.
* `Verbe `: Suit des quantités importantes d'informations que le noeud est le traitement. Cela inclut le contenu du message et les décharges binaires des données pour l'analyse de protocole de niveau extrêmement faible.

Lorsque vous spécifiez une note de niveau de journal que tous les journaux avec la priorité spécifiée ou supérieure seront suivis. Par défaut à `Info`.

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Le niveau du journal détermine quels événements afficher à l'écran. Si la valeur fournie à `--log-level`.

`--log-display-highlight` `{auto, plain, couleurs}\):`

Qu'il s'agisse de colorer/mettre en valeur les journaux d'affichage. La sortie est un terminal. Autrement, devrait être l'un de `{auto, plain, coloris}`

`--log-dir` \(chaîne, chemin de fichier\):

Spécifie le répertoire dans lequel les journaux système sont conservés. Par défaut à `"$HOME/.avalanchego/logs"`.

### ID réseau

`--network-id` \(string\):

L'identité du réseau auquel le noeud doit se connecter. Peut être l'un des :

* `--network-id=mainnet` -> Connectez-vous au réseau principal \(default\).
* `--network-id=fuji` -> Connectez-vous au réseau de test Fuji.
* `--network-id=testnet` -> Connectez-vous au réseau de test courant. \(Maintenant, c'est Fuji. \)
* `--network-id=local` -> Connectez-vous à un réseau de test local.
* `--network-id=network-{id}` -> Connectez-vous au réseau avec l'ID donné. `id` doit être dans la plage `[0, 2^32)`.

### IP publique

`--public-ip` \(string\):

Les validateurs doivent connaître leurs adresses IP publiques orientées afin qu'ils puissent informer les autres nœuds comment les connecter. Si cet argument n'est pas fourni, le noeud tentera d'effectuer la traversée NAT pour obtenir l'IP publique du noeud. Devrait être configuré à `127.0.0.1` pour créer un réseau local. Si ce n'est pas défini, tente d'apprendre l'IP en utilisant la traversée NAT.

`--dynamic-public-ip` \(string\):

Valeurs valides si le param est présent : `opendns`, `ifconfigco` ou `ifconfigme`. Cette survol `--public-ip`. Si configuré, poll le service à distance chaque `--dynamic-update-duration` et mettre à jour l'adresse IP publique du noeude.

`--dynamic-update-duration` \(durée\):

Le temps entre les événements de sondage pour `--dynamic-public-ip` ou NAT traversal. Le minimum recommandé est 1 minute. Par défaut à `5m`.

### Vérification de la signature

`--signature-verification-enabled` activé \(boolean\):

Permet la vérification de la signature. Lorsqu'il est configuré à `faux`, les signatures ne seront pas vérifiées dans les MV qui permettent l'activation des signatures. Par défaut à `true`.

### Stagnation

`--staking-port` \(string\):

Le port par lequel le serveur de jalonnement se connectera au réseau Avalanche à l'extérieur. Par défaut à `9651`.

`--staking-enabled` activated \(boolean\):

Avalanche utilise la preuve de prise \(PoS\) comme la résistance Sybil pour le rendre prohibitif d'attaquer le réseau. Si la résistance au sybil est fausse, et tous les pairs seront échantillonnés lors du consensus. Par défaut à `true`.

`--staking-tls-cert-file` \(chaîne, chemin de fichier\):

Avalanche utilise des connexions TLS authentifiées à deux voies pour connecter les nœuds en toute sécurité. Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud. Par défaut, le noeud s'attend au certificat TLS à être `at`

`--staking-tls-key-file` \(chaîne, chemin de fichier\):

Avalanche utilise des connexions TLS authentifiées à deux voies pour connecter les nœuds en toute sécurité. Cet argument spécifie l'emplacement de la clé privée TLS utilisée par le nœud. Par défaut, le noeud s'attend à la clé privée TLS à être sur `$HOME/.avalanchego/staking/staker.key`.

`--staking-disabled-weight` \(int\):

Poids à fournir à chaque pair lorsque la fuite est désactivée. Par défaut `1`.

### Version anglaise

`--version` \(boolean\)

Si cela est `vrai`, imprimer la version et quitter. Défaut (en) à `faux`.

## Options avancées

Les options suivantes peuvent affecter l'exactitude d'un nœud. Seuls les utilisateurs de puissance devraient les modifier.

### Liste de référence

`--benchlist-duration` \(durée\):

Temps qu'un pair est comparé après le dépassement `--benchlist-fail-threshold`. Par défaut à `1h`.

`--benchlist-fail-threshold`

Nombre de requêtes consécutives échouées à un noeud avant de le banaliser \(en supposant que toutes les requêtes lui échouer\). Par défaut à `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Permet les paramètres de latence spécifiques de requêtes par les pairs. Défaut (en) à `faux`.

`--benchlist-min-failing-duration` \(durée\):

La quantité minimale de messages temporels à un pair doit échouer avant que le pair soit bancé. Par défaut à `5m`.

### Construire un répertoire

`--build-dir` \(string\):

Spécifie où trouver les binaires sous-binaires et plugin AvalancheGo. Par défaut le chemin de l'exécution AvalancheGo binary. La structure de ce répertoire doit être la suivante:

```text
build-dir  
|_avalanchego-latest  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
|_avalanchego-preupgrade  
    |_avalanchego-process (the binary from compiling the app directory)  
    |_plugins  
      |_evm  
      |_other_plugin
```

### Configurations de chaîne

Certaines chaînes \(en ce moment, juste le C-Chain\) permettent à l'opérateur de noeud de fournir une configuration personnalisée. AvalancheGo peut lire les configurations de chaîne à partir des fichiers et les passer aux chaînes correspondantes lors de l'initialisation.

AvalancheGo recherche ces fichiers dans le répertoire spécifié par `--chain-config-dir`. Ce répertoire peut avoir des sous-répertoires dont les noms sont des ID de chaîne ou des alias de chaîne. Chaque sous-répertoire contient la configuration de la chaîne spécifiée dans le nom du répertoire. Chaque sous-répertoire devrait contenir un fichier nommé `config`, dont la valeur est passée lorsque la chaîne correspondante est initialisée. Par exemple, la configuration de la chaîne C devrait être à : `[chain-config-dir-goes-here]/C/config.json`.

L'extension que ces fichiers devraient avoir, et le contenu de ces fichiers, est VM-dependent. Par exemple, certaines chaînes peuvent s'attendre à `config.txt` tandis que d'autres s'attendent à `config.json`. Si plusieurs fichiers sont fournis avec le même nom mais des extensions différentes \(par exemple `config.json` et `config.txt`\) dans le même sous-répertoire, AvalancheGo sortira avec une erreur.

Pour une chaîne donnée, AvalancheGo va chercher d'abord un sous-répertoire de configuration dont le nom est l'ID de chaîne. S'il n'est pas trouvé, il cherche un sous-répertoire de configuration dont le nom est l'alias primaire de la chaîne. Si elle n'est pas trouvée, elle cherche un sous-répertoire de configuration dont le nom est un autre alias pour la chaîne. Tous les noms de dossiers et de fichiers sont sensibles à la casse.

Il n'est pas nécessaire de fournir ces configurations personnalisées. S'ils ne sont pas fournis, une configuration par défaut spécifique à VM sera utilisée.

`--chain-config-dir` \(string\):

Spécifie le répertoire qui contient des configurations de chaîne, comme décrit ci-dessus. Par défaut à `$HOME/.avalanchego/configs/chains`. Si ce drapeau n'est pas fourni et que le répertoire par défaut n'existe pas, AvalancheGo ne sortira pas puisque les configurations personnalisées sont facultatives. Cependant, si le drapeau est défini, le dossier spécifié doit exister, ou AvalancheGo sortira avec une erreur.

#### Configurations de chaîne C

Actuellement, la chaîne C est la seule chaîne qui supporte les configurations personnalisées. Afin de spécifier une `configuration` pour la chaîne C, un fichier de configuration JSON doit être placé à C-Chain, \(ou un autre emplacement valide, tel que spécifié ci-dessus. \)

Par exemple si `chain-config-dir` a la valeur par défaut, alors `config.json``` peut être placé à chain-config-dir avec ces contenus:

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

Pour plus d'informations sur les configurations C-Chain voir [ici](command-line-interface.md#coreth-config).

### Chaîne C-Chain<a id="coreth-config"></a>

`--coreth-config` \(json\):

\(Cet argument est deprecated en faveur d'utiliser [les configurations de chaîne](command-line-interface.md#chain-configs). \)

Cela vous permet de spécifier une configuration à passer dans la chaîne C. Les valeurs par défaut de cette configuration sont:

```javascript
{
  "snowman-api-enabled": false,
  "coreth-admin-api-enabled": false,
  "net-api-enabled": true,
  "rpc-gas-cap": 2500000000,
  "rpc-tx-fee-cap": 100,
  "eth-api-enabled": true,
  "personal-api-enabled": false,
  "tx-pool-api-enabled": false,
  "debug-api-enabled": false,
  "web3-api-enabled": true,
  "local-txs-enabled": false,
  "pruning-enabled": false,
  "api-max-duration": 0, // Default to no maximum
  "api-max-blocks-per-request": 0, // Default to no maximum
  "allow-unfinalized-queries": false
}
```

Les valeurs par défaut sont surpassées uniquement si explicitement spécifié dans la configuration.

Les paramètres sont les suivants:


#### API de Coreth

`snowman-api-enabled` \(boolean\):

Permet l'API Snowman. Défaut (en) à faux.

`coreth-admin-api-enabled` \(boolean\):

Permet l'API administrateur. Défaut (en) à faux.

`net-api-enabled` \(boolean\):

Permet l'API `net_*`. Par défaut à true.

#### API Coreth Caps gaz/prix

`rpc-gas-cap` \(int\):

Le gaz maximal à consommer par un appel RPC \(utilisé dans `eth_estimateGas`\), mesuré dans nAVAX \(GWei\). Par défaut à 2,500,000,000.

`rpc-tx-fee-cap` \(int\):

Frais de transaction globaux \(prix \* gaslimit\) cap \(mesuré dans AVAX\) pour les variantes de send-transction de l'envoi. Par défaut à 100.

#### Base de données Pruning

`pruning-enabled`\(bool\):

Si vrai, la taille de la base de données des données historiques obsolètes sera activée. Devrait être désactivé pour les nœuds qui ont besoin d'accès à toutes les données aux racines historiques. La taille se fera uniquement pour les nouvelles données. Les défauts à `false` dans v1.4.9, et `true` dans les versions ultérieures.

#### APIS Eth

`eth-api-enabled` \(boolean\):

Permet l'API `eth_*`. Par défaut à true.

`personal-api-enabled` \(boolean\):

Permet l'API `personal_*` Défaut (en) à faux.

`tx-pool-api-enabled` \(boolean\):

Permet l'API `txpool_*`. Défaut (en) à faux.

`debug-api-enabled` \(boolean\):

Permet l'API `debug_*`. Défaut (en) à faux.

`web3-apienable\(boolean\):`

Permet l'API `web3_*`. Par défaut à true.

#### Paramètres Ethique

`local-txs-enabled` \(boolean\):

Permet la gestion des transactions locales. Défaut (en) à faux.

`api-max-duration` \(durée\):

Durée maximale de l'appel API Si les appels API dépassent cette durée, ils seront éteints. Par défaut à 0 \(pas de maximum\).

`api-max-blocks-per-request` \(int\):

Nombre maximum de blocs à servir par `getLogs`. Par défaut à 0 \(pas de maximum\).

`allow-unfinalized-queries` queries \(boolean\):

Permet les requêtes pour les blocs / transactions non finalisés \(pas encore acceptés\) Défaut (en) à faux.

#### Profilation continue

Vous pouvez configurer votre noeud pour exécuter continuellement les profils mémoire/CPU et enregistrer les plus récents. Le profilage continu de la mémoire/CPU est activé si le `continuous-profiler-dir` continu est activé.

`continuous-profiler-dir` \(string\):

Si non-vide, noeud exécute continuellement les profils mémoire/CPU et les met dans ce répertoire. Par défaut dans la chaîne vide \(non activée\).

`continuous-profiler-frequency` \(durée\):

Combien de fois un nouveau profil CPU/mémoire est créé. Par défaut à `15m`.

`continuous-profiler-max-files` \(int\):

Nombre maximum de fichiers profils/CPU à garder. Par défaut à 5.

#### Paramètres de Keystore

`keystore-directory` \(string\):

Le répertoire qui contient les clés privées. Peut être donné comme un chemin relatif. Si vide, utilise un répertoire temporaire à `coreth-keystore`. Par défaut à la chaîne vide.

`keystore-external-signer` \(string\):

Spécifie une URI externe pour un signateur de type clef. Par défaut dans la chaîne vide \(non activée\).

`keystore-insecure-unlock-allowed` autorisé \(bool\):

Si vrai, permettre aux utilisateurs de débloquer des comptes dans l'environnement HTTP dangereux. Défaut (en) à faux.

### Paramètres de consensus

`--consensus-gossip-frequency` \(durée\):

Temps entre les frontières acceptées Par défaut à `10s`.

`--consensus-shutdown-timeout` \(durée\):

Timeout avant de tuer une chaîne non réactive. Par défaut à `5s`.

`--creation-tx-fee` \(int\):

Frais de transaction, dans nAVAX, pour les transactions qui créent un nouvel état. Par défaut à `1000` nAVAX \(.001 AVAX\) par transaction.

`--min-delegator-stake` \(int\):

Le jeu minimum, dans nAVAX, qui peut être délégué à un validateur du réseau primaire.

Défaillances à `25000` \(25 AVAX\) sur le réseau principal. Défaillances à `5000` \(.005 AVAX\) sur le réseau de test.

`--min-delegation-fee` \(int\):

Les frais de délégation minimums pouvant être facturés pour la délégation sur le réseau primaire, multiplié par `1000.` Doit être dans la plage `[0, 100]`. Defaults à `20000` \(2%\) sur le réseau principal.

`--min-stake-duration` \(durée\):

Durée minimale de la fuite. La valeur par défaut sur le principal Net est `336h` \(deux semaines. \)

`--min-validator-stake` \(int\):

Le jeu minimum, dans nAVAX, nécessaire pour valider le réseau primaire.

Defaults à `2000` \(2,000 AVAX\) sur le réseau principal. Défaillances à `5000` \(.005 AVAX\) sur le réseau de test.

`--max-stake-duration` \(durée\):

La durée maximale de la fuite, en heures. Défaillances à `8760h` \(365 jours\) sur le réseau principal.

`--max-validator-stake` \(int\):s

Le jeu maximal, dans nAVAX, qui peut être placé sur un validateur sur le réseau primaire. Par défaut à `3000` \(3,000,000 AVAX\) sur le réseau principal. Cela inclut la mise fournie par le validant et par les délégués au validant.

`--snow-avalanche-batch-size` \(int\):

Les implémentations du DAG de consensus sur la neige définissent `b` comme le nombre de transactions qu'un vertex devrait inclure. L'augmentation `b` augmentera, théoriquement, le débit tout en augmentant la latence. Le noeud attendra au plus 1 seconde pour collecter un lot, et délivrera ensuite l'ensemble du lot à la fois. La valeur doit être au moins `1`. par défaut à `30`.

`--snow-avalanche-num-parents` \(int\):

Les implémentations du DAG de consensus sur la neige définissent `p` comme le nombre de parents qu'un vertex devrait inclure. L'augmentation `p` améliorera l'amortissement des requêtes réseau. Cependant, en augmentant la connectivité du graphe, la complexité des traverses du graphique est accrue. La valeur doit être au moins `2`. par défaut à `5`.

`--snow-concurrent-repolls` \(int\):

Le consensus sur la neige nécessite les transactions de revote qui sont émises pendant les périodes faibles d'utilisation du réseau. Ce paramètre permet de définir la manière dont le client sera agressif dans la finalisation de ces transactions en instance. Cela ne devrait être modifié qu'après examen minutieux des compromis du consensus sur la neige. La valeur doit être au moins `1` et au maximum `--snow-rogue-commit-threshold`. Par défaut à `4`.

`--snow-sample-size` \(int\):

Le consensus sur la neige définit `k` comme le nombre de validateurs qui sont échantillonnés lors de chaque sondage réseau. Ce paramètre permet de définir la valeur `k` utilisée pour le consensus. Cela ne devrait être modifié qu'après examen minutieux des compromis du consensus sur la neige. La valeur doit être au moins `1`. par défaut à `20`.

`--snow-quorum-size` \(int\):

Le consensus sur la neige définit l'`alpha` comme le nombre de validateurs qui doivent préférer une transaction lors de chaque sondage réseau afin d'accroître la confiance dans la transaction. Ce paramètre nous permet de définir la valeur `alpha` utilisée pour le consensus. Cela ne devrait être modifié qu'après examen minutieux des compromis du consensus sur la neige. La valeur doit être supérieure à `k/2`. Par défaut `14`.

`--snow-virtuous-commit-threshold` \(int\):

Le consensus sur la neige définit le `beta1` comme le nombre de sondages consécutifs qu'une transaction vertueux doit accroître sa confiance pour qu'elle soit acceptée. Ce paramètre nous permet de définir la valeur `beta1` utilisée pour le consensus. Cela ne devrait être modifié qu'après examen minutieux des compromis du consensus sur la neige. La valeur doit être au moins `1`. par défaut à `15`.

`--snow-rogue-commit-threshold` \(int\):

Le consensus sur la neige définit le `beta2` comme le nombre de sondages consécutifs qu'une transaction rogue doit accroître sa confiance pour qu'elle soit acceptée. Ce paramètre nous permet de définir la valeur `beta2` utilisée pour le consensus. Cela ne devrait être modifié qu'après examen minutieux des compromis du consensus sur la neige. La valeur doit être au moins `beta1`. Par défaut à `30`.

`--stake-minting-period` \(durée\):

Période de consommation de la fonction de picking, en heures. La valeur par défaut sur le réseau principal est `8760h` \(365 jours\).

`--tx-fee` \(int\):

La quantité requise de nAVAX à brûler pour qu'une transaction soit valide. Ce paramètre nécessite une entente réseau dans sa forme actuelle. Changer cette valeur de la valeur par défaut ne devrait être faite que sur les réseaux privés. Par défaut à `1000` nAVAX par opération.

`--uptime-requirement` \(float\):

Fraction du temps qu'un validateur doit être en ligne pour recevoir des récompenses. Par défaut à `0,6`.

### Santé Canada

`--health-check-frequency` \(durée\):

Vérification de la santé fonctionne avec cette freqency. Par défaut à `30s`.

`--health-check-averager-halflife` \(durée\):

Demi-vie des moyennes utilisées dans les contrôles de santé \(pour mesurer le taux des défaillances du message, par exemple. \) Valeur plus grande --> calcul moins volatile des moyennes. Par défaut à `10s`.

### Vitesse de message - Limitation \(Throttling\)

Ces drapeaux régissent la limitation de vitesse des messages entrants et sortants. Pour plus d'informations sur la limitation de la vitesse et les drapeaux ci-dessous, voir le paquet `accélérateur` dans AvalancheGo.

`--throttler-inbound-at-large-alloc-size` \(uint\):

Taille, en octets, d'une allocation en grande partie dans l'accélérateur de message entrant. Par défaut à `33554432` \(32 mebibytes\).

`--throttler-inbound-validator-alloc-size` \(uint\):

Taille, en octets, de l'allocation de validation dans le message entrant. Par défaut à `33554432` \(32 mebibytes\).

`--throttler-inbound-node-max-at-large-bytes` \(uint\):

Nombre maximal d'octets qu'un noeud peut prendre de l'allocation en grande partie de l'accélérateur de message entrant. Par défaut à `2048` \(2 mebibytes\).

`--throttler-outbound-at-large-alloc-size` \(uint\):

Taille, en octets, d'une allocation en grande partie dans le message sortant. Par défaut à `33554432` \(32 mebibytes\).

`--throttler-outbound-validator-alloc-size` \(uint\):

Taille, en octets, de l'allocation de validation dans le message sortant. Par défaut à `33554432` \(32 mebibytes\).

`--throttler-outbound-node-max-at-large-bytes` \(uint\):

Nombre maximal d'octets qu'un noeud peut prendre de l'allocation en grande partie de l'accélérateur de message sortant. Par défaut à `2048` \(2 mebibytes\).

### Réseau

`--network-compression-enabled` activé \(bool\) \(v1.4.11\):

Si vrai, compresser certains messages envoyés aux pairs sur la version >= v1.4.11 afin de réduire l'utilisation de la bande passante.

`--network-initial-timeout` \(durée\):

Valeur initiale du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `5s`.

`--network-minimum-timeout` \(durée\):

Valeur de sortie minimale du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `2s`.

`--network-maximum-timeout` \(durée\):

Valeur maximale du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `10s`.

`--network-timeout-halflife` \(durée\):

Demi-vie utilisée lors du calcul de la latence moyenne du réseau. Valeur plus grande --> calcul moins volatile de latence du réseau. Par défaut à `5m`.

`--network-timeout-coefficient` \(durée\):

Les demandes aux pairs seront mises en service après `\[network-timeout-coefficient\]` \* \[network-timeout-coefficient\] moyenne de la demande\]. Par défaut à `2`.

`--network-health-min-conn-peers` \(uint\):

Node se rapportera malsain si connecté à moins que ce nombre de pairs. Par défaut `1`.

`--network-health-max-time-since-msg-received` \(durée\)

Node se rapportera malsain s'il n'a pas reçu un message pour ce laps de temps. Par défaut à `1m`.

`--network-health-max-time-since-no-requests` \(durée\):

Node se rapportera malsain s'il n'a pas reçu un message pour ce laps de temps. Par défaut à `1m`.

`--network-health-max-portion-send-queue-full` --network-health-max-portion-send-queue-full

Node se rapportera malsain si sa file d'attente d'envoi est plus que cette portion complète. Doit être dans \[0,1\]. Par défaut à `0,9`.

`--network-health-max-send-fail-rate` \(float\):

Node se rapportera malsain si plus que cette portion du message envoie échouer. Doit être dans \[0,1\]. Par défaut à `0,25`.

`--inbound-connection-throtting-cooldown` \(durée\)

`--inbound-connection-throttling-max-recent` \(uint\)

Node n'accepte \(tentative de mise à niveau\) une connexion entrante depuis une IP que s'il ne l'a pas fait dans la dernière connexion `inbound-connection-throtting-cooldown`. Le nœud ne permettra `only` inbound-connection-throttling-max-recent depuis tous les SIP par `inbound-connection-throttling-max-recent`. inbound-connection-throttling-max-recent

### Liste des pairs Gossiping

Noeuds gossip les pairs afin que chaque noeud puisse avoir une liste de pairs à jour. Un noeud `gossips` `--network-peer-list-size gossips taille``` de ses pairs --network-peer-list-size

`--network-peer-list-gossip-frequency`

Par défaut à `1m`.

`--network-peer-list-gossip-size` \(int\):

Par défaut à `50`.

`--network-peer-list-size` \(int\):

Par défaut à `20`.

### Mode Plugin

`--plugin activable` \(bool\):

Si vrai, exécute le noeud comme un [plugin.](https://github.com/hashicorp/go-plugin) Défaut (en) à `faux`.

### Subnet Whitelist

`--whitelisted-subnets` \(string\):

Liste séparée de subnets que ce noeud validerait, s'il était ajouté. Par défaut dans le vide \(validera uniquement le réseau primaire\).

### Configuration de la machine virtuelle \(VM\)<a id="vm-configs"></a>

`--vm-aliases-file` \(string\):

Chemin vers le fichier JSON qui définit les alias pour les ID de la machine virtuelle. Par défaut à `~/.avalanchego/configs/vms/aliases.json`. Exemple de contenu :

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

L'exemple ci-dessus alias la VM dont l'ID est "tGas3T58KzdjLHBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH" à `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"``` et `"timerpc"`.

