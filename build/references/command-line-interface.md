# Interface de ligne de commande

Vous pouvez spécifier la configuration d'un nœud avec les arguments ci-dessous.

## Arguments

### Fichier de Config

`--config-file`\(chaîne\) :

Chemin vers un fichier JSON qui spécifie la configuration de ce nœud. Les arguments de la ligne de commande remplaceront les arguments définis dans le fichier de config.

Exemple de fichier de config JSON :

```javascript
{
    "log-level": "debug"
}
```

### APIs

`--api-admin-enabled`\(booléen\) :

Si l'option `false`est , ce nœud ne sera pas exposé l'API d'administration. Par défaut à `false`. Voir [ici](../avalanchego-apis/admin-api.md) pour plus d'informations.

`--api-auth-required`\(booléen\) :

Si les appels API sont configurés , les appels d'API nécessitent un jeton `true`d'autorisation. Par défaut à `false`. Voir [ici](../avalanchego-apis/auth-api.md) pour plus d'informations.

`--api-auth-password`\(chaîne\) :

Le mot de passe nécessaire pour créer/révoquer les jetons d'autorisation. Si `--api-auth-required=true`, doit être spécifié, sinon ignoré. Voir [ici](../avalanchego-apis/auth-api.md) pour plus d'informations.

`--api-health-enabled`\(booléen\) :

Si vous l'avez configuré , ce nœud exposera `true`l'API en matière de santé. Par défaut à `true`. Voir [ici](../avalanchego-apis/health-api.md) pour plus d'informations.

`--index-enabled`\(booléen\) :

Si `false`, ce nœud ne permettra pas l'indexer et l'API d'Index ne sera pas disponible. Par défaut à `false`. Voir [ici](../avalanchego-apis/index-api.md) pour plus d'informations.

`--api-info-enabled`\(booléen\) :

Si vous l'avez configuré , ce nœud exposera l'API `true`d'Info. Par défaut à `true`. Voir [ici](../avalanchego-apis/info-api.md) pour plus d'informations.

`--api-ipcs-enabled`\(booléen\) :

Si vous l'avez configuré , ce nœud exposera `true`l'API des IPC. Par défaut à `false`. Voir [ici](../avalanchego-apis/ipc-api.md) pour plus d'informations.

`--api-keystore-enabled`\(booléen\) :

Si l'option est , ce nœud ne sera pas exposé à `false`l'API Keystore. Par défaut à `true`. Voir [ici](../avalanchego-apis/keystore-api.md) pour plus d'informations.

`--api-metrics-enabled`\(booléen\) :

Si l'option est , ce nœud ne sera pas exposé sur `false`l'API de Metrics. Par défaut à `true`. Voir [ici](../avalanchego-apis/metrics-api.md) pour plus d'informations.

### Assertions

`--assertions-enabled`\(booléen\) :

Lorsque l'option `true`est , les assertions s'exécuteront à l'exécution de la base de code. Ceci est destiné à être utilisé dans le débogage, car nous pouvons obtenir un message d'erreur plus spécifique. Par défaut à `true`.

### Démarrage de Bootstrapping

`--bootstrap-beacon-connection-timeout`\(durée\)

Timeout lors de la tentative de se connecter aux balises de bootstrapping. Par défaut à `1m`.

`--bootstrap-ids`\(chaîne\) :

Les ID Bootstrap est un tableau d'ID de validateurs. Ces ID seront utilisés pour authentifier les pairs de bootstrapping. Un exemple de paramètre de ce champ serait `--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. La valeur par défaut dépend de l'ID du réseau.

`--bootstrap-ips`\(chaîne\) :

Bootstrap IP est un tableau de paires de paires IPv4:port. Ces adresses IP seront utilisées pour bootstrap l'état d'Avalanche actuel. Un exemple de paramètre de ce champ serait `--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. La valeur par défaut dépend de l'ID du réseau.

`--bootstrap-retry-enabled`\(booléen\) :

Si vrai, réessayez le bootstrapping si il échoue.

`--bootstrap-retry-max-attempts`\(uint\) :

Nombre maximal de fois pour réessayer les bootstrapping après une défaillance.

### Base

`--db-dir`\(fiche, chemin de fichier\):

Spécifie le répertoire auquel la base de données est persistante. Par défaut à `"$HOME/.avalanchego/db"`.

`--db-type`\(chaîne\) :

Spécifie le type de base de données à utiliser. Doit être l'une des `leveldb`, `rocksdb`, `memdb`. `memdb`est une base de données en mémoire, non persistée.

Notez que lors de l'exécution avec `leveldb`, le nœud ne peut pas lire les données qui ont persisté lors de `rocksdb`l'exécution avec , et vice-versa.

****Deux notes importantes sur les RocksDB : Premièrement, les RocksDB ne fonctionnent pas sur tous les ordinateurs. Deuxièmement, RocksDB n'est pas construit par défaut et n'est pas inclus dans les binaires publiés. Pour construire AvalancheGo avec RocksDB, exécutez `export ROCKSDBALLOWED=1`dans votre terminal et puis .`scripts/build.sh` Vous devez le faire avant de pouvoir utiliser `--db-type=rocksdb`.

### Genesis

`--genesis`\(chaîne\) :

Trajet vers un fichier JSON contenant les données de genèse à utiliser. Ignoré lors de l'exécution de réseaux standard \(Mainnet, Testnet.\) Si vous n'avez [pas](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16) été donné, utilise des données de genèse par défaut.

### Serveur HTTP

`--http-host`\(chaîne\) :

L'adresse que les API HTTP écoutent. Par défaut à `127.0.0.1`. Cela signifie que par défaut, votre nœud ne peut gérer que les appels API effectués sur la même machine. Pour autoriser les appels API d'autres machines, utilisez `--http-host=`.

`--http-port`\(int\) :

Chaque nœud exécute un serveur HTTP qui fournit les API pour interagir avec le nœud et le réseau d'Avalanche. Cet argument spécifie le port sur lequel le serveur HTTP écoutera. La valeur par défaut est `9650`.

`--http-tls-cert-file`\(fiche, chemin de fichier\):

Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud pour le serveur HTTP. Ceci doit être spécifié quand `--http-tls-enabled=true`. Il n'y a pas de valeur par défaut.

`--http-tls-enabled`\(booléen\) :

Si l'option est `true`, ce drapeau tentera de mettre à jour le serveur pour utiliser HTTPS. Par défaut à `false`.

`--http-tls-key-file`\(fiche, chemin de fichier\):

Cet argument spécifie l'emplacement de la clé privée TLS utilisée par le nœud pour le serveur HTTPS. Ceci doit être spécifié quand `--http-tls-enabled=true`. Il n'y a pas de valeur par défaut.

### IPCS

`--ipcs-chain-ids`\(chaîne\)

La liste des ID de la chaîne séparée de la Comma pour se connecter. Il n'y a pas de valeur par défaut.

`--ipcs-path`\(chaîne\)

Le répertoire \(Unix\) ou le préfixe de tuyau nommé \(Windows\) pour les sockets IPC. Par défaut sur /tmp.

### Limite du descriptif de fichier

`--fd-limit`\(int\)

Tenter de relever le descripteur de fichier de processus de manière à limiter au moins cette valeur. Par défaut de`32768`

### Loging

`--log-level``{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\(chaîne\):

Le niveau de journal détermine les événements à log. Il y a 7 niveaux différents, pour être de la plus haute priorité au plus bas.

* `Off`: Aucun journal n'a ce niveau de journalisation.
* `Fatal`: erreurs mortelles qui ne sont pas récupérables.
* `Error`: Les erreurs que le nœud rencontre, ces erreurs ont été récupérées.
* `Warn`: Un avertissement qui peut être indicatif d'un nœud byzantin fallacieux, ou d'une erreur future potentielle.
* `Info`: Descriptions utiles des mises à jour sur le statut des nœuds.
* `Debug`: La journalisation des bogues est utile lorsqu'on tente de comprendre les bogues possibles dans le code. Plus d'informations qui seraient généralement souhaitées pour une utilisation normale seront affichées.
* `Verbo`: Suit de nombreuses quantités d'informations que le nœud est en train de traiter. Cela inclut le contenu des messages et les décharges binaires de données pour une analyse de protocole de niveau extrêmement bas.

Lors de la spécification d'un niveau de journal notez que tous les logs avec la priorité spécifiée ou plus seront suivis. Par défaut à `Info`.

`--log-display-level``{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\(chaîne\):

Le niveau de journal détermine les événements à afficher sur l'écran. `--log-level`Si la valeur est fournie en blanc, sera par défaut .

`--log-display-highlight``{auto, plain, colors}`\(chaîne\):

Qu'il soit de colorer/mettre en surbrillance les journaux d'affichage. Par défaut s'est avéré lorsque la sortie est un terminal. Sinon, devrait être l'un des`{auto, plain, colors}`

`--log-dir`\(fiche, chemin de fichier\):

Spécifie le répertoire dans lequel les journaux du système sont conservés. Par défaut à `"$HOME/.avalanchego/logs"`.

### ID

`--network-id`\(chaîne\) :

L'identité du réseau au nom du nœud doit se connecter. Peut être l'un des :

* `--network-id=mainnet`-> Se connecter au réseau principal \(par défaut\).
* `--network-id=fuji`-> Connectez-vous au réseau de test de Fuji.
* `--network-id=testnet`-> Se connecter au réseau de test actuel. \(Pour l'instant, voici Fuji.\)
* `--network-id=local`-> Se connecter à un réseau de test local.
* `--network-id=network-{id}`-> Connectez-vous au réseau avec l'ID donné. `id`doit être dans la gamme .`[0, 2^32)`

### IP

`--public-ip`\(chaîne\) :

Les validateurs doivent connaître leurs adresses IP publiques pour qu'ils puissent informer les autres nœuds de savoir comment se connecter. Si cet argument n'est pas fourni, le nœud tentera d'effectuer une traversée NAT pour obtenir la IP publique du nœud. Devrait être configuré `127.0.0.1`pour créer un réseau local. Si vous ne l'avez pas défini, vous essayez d'apprendre la propriété intellectuelle en utilisant la ligne de navigation NAT.

`--dynamic-public-ip`\(chaîne\) :

`opendns`Valeurs valides si param est présent, `ifconfigco`ou .`ifconfigme` `--public-ip`Cette surpasse . Si configuré, poll le service à distance `--dynamic-update-duration`et met à jour l'adresse IP publique du nœud.

`--dynamic-update-duration`\(durée\)

L'heure entre les événements de poll pour ou `--dynamic-public-ip`la traversée de NAT. Le minimum recommandé est de 1 minute. Par défaut à `5m`.

### Vérification de la signature

`--signature-verification-enabled`\(booléen\) :

Permet la vérification des signations. Lorsque l'option est , `false`les signatures ne seront pas cochées sur les VM qui permettent won’t les signatures. Par défaut à `true`.

### staking

`--staking-port`\(chaîne\) :

Le port par lequel le serveur de jalonnement se connectera au réseau Avalanche de l'extérieur. Par défaut à `9651`.

`--staking-enabled`\(booléen\) :

Avalanche utilise la preuve d'adhésion \(PoS\) comme résistance Sybil pour le rendre prohibitif d'attaquer le réseau. Si une résistance au sybil est invalide et tous les pairs seront échantillonnés lors du consensus. Par défaut à `true`.

`--staking-tls-cert-file`\(fiche, chemin de fichier\):

Avalanche utilise des connexions TLS authentifiées bidirectionnelles pour connecter des nœuds en toute sécurité. Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud. Par défaut, le nœud s'attend à ce que le certificat TLS soit à `$HOME/.avalanchego/staking/staker.crt`.

`--staking-tls-key-file`\(fiche, chemin de fichier\):

Avalanche utilise des connexions TLS authentifiées bidirectionnelles pour connecter des nœuds en toute sécurité. Cet argument spécifie l'emplacement de la clé privée TLS utilisée par le nœud. Par défaut, le nœud s'attend à ce que la clé privée TLS soit à `$HOME/.avalanchego/staking/staker.key`.

`--staking-disabled-weight`\(int\) :

Poids à fournir à chaque pair lorsque la staking est désactivé. Par défaut à `1`.

### Version

`--version`\(booléen\)

Si c'est , `true`imprimez la version et quittez. Par défaut à `false`.

## Options avancées

Les options suivantes peuvent affecter l'exactitude d'un nœud. Seuls les utilisateurs de puissance doivent les changer.

### Benchlist

`--benchlist-duration`\(durée\)

Quantité de temps qu'un pair est coté en comparaison après le surplus `--benchlist-fail-threshold`. Par défaut à `1h`.

`--benchlist-fail-threshold`\(int\) :

Nombre de requêtes échouées consécutives à un nœud avant de la bancher \(en supposant que toutes les requêtes lui soient échouées\). Par défaut à `10`.

`--benchlist-peer-summary-enabled`\(booléen\) :

Permet les métriques de latence spécifiques aux requêtes par les pairs. Par défaut à `false`.

`--benchlist-min-failing-duration`\(durée\)

La quantité minimale de messages de temps à un pair doit être en train de manquer avant que le pair ne soit bancé. Par défaut à `5m`.

### Construire un répertoire

`--build-dir`\(chaîne\) :

Spécifie où trouver les sous-binaires et les binaires AvalancheGo Par défaut sur le chemin du binary of La structure de ce répertoire doit être la suivante :

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

### Chaîne Configurations

Certaines chaînes \(en ce moment, juste le C-Chain\) permettent à l'opérateur de nœuds de fournir une configuration personnalisée. AvalancheGo peut lire les configurations de chaînes à partir des fichiers et les transmettre aux chaînes correspondantes sur l'initialisation.

AvalancheGo recherche ces fichiers dans le répertoire spécifié par `--chain-config-dir`. Ce répertoire peut avoir des sous-répertoires dont les noms sont des ID de chaîne ou des alias de chaîne. Chaque sous-répertoire contient la configuration de la chaîne spécifiée dans le nom du répertoire. Chaque sous-répertoire devrait contenir un fichier nommé `config`, dont la valeur est passée lorsque la chaîne correspondante est initialisée. Par exemple, la config pour la C-Chain devrait être à : `[chain-config-dir-goes-here]/C/config.json`.

L'extension que ces fichiers doivent avoir, et le contenu de ces fichiers, est VM-dependent. Par exemple, certaines chaînes peuvent s'attendre à ce que d'autres s'attendent à ce `config.txt`que .`config.json` Si plusieurs fichiers sont fournis avec le même nom mais des extensions différentes \(par exemple `config.json`et \) `config.txt`dans le même sous-répertoire, AvalancheGo sortira avec une erreur.

Pour une chaîne donnée, AvalancheGo cherchera d'abord un sous-répertoire de configs dont le nom est l'ID de la chaîne. Si elle n'est pas trouvée, elle cherche un sous-répertoire de config dont le nom est les alias primaires de la chaîne. Si elle n'est pas trouvée, elle cherche un sous-répertoire de config dont le nom est un autre alias pour la chaîne. Tous les noms de dossiers et de fichiers sont sensibles à la casse.

Il n'est pas nécessaire de fournir ces configurations personnalisées. Si elles ne sont pas fournies, une config par défaut spécifique à VM sera utilisée.

`--chain-config-dir`\(chaîne\) :

Spécifie le répertoire qui contient des configurations de chaîne, comme décrit ci-dessus. Par défaut à `$HOME/.avalanchego/configs/chains`. Si ce drapeau n'est pas fourni et que le répertoire par défaut n'existe pas, AvalancheGo ne sortira pas car les configurations personnalisées sont facultatives. Cependant, si le drapeau est défini, le dossier spécifié doit exister, ou AvalancheGo sortira avec une erreur.

#### C-Chain

Afin de spécifier une config pour le C-Chain, un fichier de config JSON doit être placé sur `{chain-config-dir}/C/config.json`\(ou un autre emplacement valide, tel que spécifié ci-dessus.\)

`chain-config-dir`Par exemple, si la valeur par défaut `config.json`peut être placée à , `$HOME/.avalanchego/configs/chains/C/config.json`avec ces contenus :

```javascript
{
  "rpc-tx-fee-cap": 90,
  "eth-api-enabled": true,
  "tx-pool-api-enabled": true,
  "debug-api-enabled": true,
  "web3-api-enabled": true
}
```

Pour plus d'informations sur les configurations de C-Chain, voir [ici](command-line-interface.md#coreth-config).

#### X-Chain

Afin de spécifier une config pour la X-Chain, un fichier de config JSON doit être placé sur `{chain-config-dir}/X/config.json`\(ou un autre emplacement valide, tel que spécifié ci-dessus.\)

`chain-config-dir`Par exemple, si la valeur par défaut `config.json`peut être placée à , `$HOME/.avalanchego/configs/chains/X/config.json`avec ces contenus :

```javascript
{
  "index-transactions": true,
  "index-allow-incomplete": false
}
```

Pour plus d'informations sur les configurations de X-Chain, voir [ici](command-line-interface.md#avm-config).

### C-Chain / Coreth<a id="coreth-config"></a>

`--coreth-config`\(json\) :

\(Cet argument est dépressif en faveur de l'utilisation des [configurations de chaîne.\)](command-line-interface.md#chain-configs)

Cela vous permet de spécifier une config à passer dans la C-Chain. Les valeurs par défaut pour cette config sont :

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

Les valeurs par défaut sont surchargées seulement si elles sont explicitement spécifiées dans la config.

Les paramètres sont les suivants :

#### API Coreth

`snowman-api-enabled`\(booléen\) :

Permet l'API Snowman. Il ne faut pas false.

`coreth-admin-api-enabled`\(booléen\) :

Permet l'API d'administration. Il ne faut pas false.

`net-api-enabled`\(booléen\) :

Permet `net_*`l'API Il est en défaut de vrai.

#### Coreth API

`rpc-gas-cap`\(int\) :

Le gaz maximal à consommer par un appel RPC \(utilisé en `eth_estimateGas`\), mesuré en nAVAX \(GWei\). Il est atteint 2 500 000 000 000.

`rpc-tx-fee-cap`\(int\) :

Frais de transaction mondiaux \(prix \* gaslimit\) cap \(mesuré en AVAX\) pour les variantes de send-transction de send. Défaut 100.

#### Pruner la base de données

`pruning-enabled`\(bool\) :

Si vrai, la saisie de données historiques obsolètes sera activée par la base de données. Devrait être désactivé sur les nœuds qui ont besoin d'accéder à toutes les données sur les racines historiques. `false``true`La taille ne sera faite que pour les nouvelles données.

#### API Eth

`eth-api-enabled`\(booléen\) :

Permet `eth_*`l'API Il est en défaut de vrai.

`personal-api-enabled`\(booléen\) :

Permet `personal_*`l'API Il ne faut pas false.

`tx-pool-api-enabled`\(booléen\) :

Permet `txpool_*`l'API Il ne faut pas false.

`debug-api-enabled`\(booléen\) :

Permet `debug_*`l'API Il ne faut pas false.

`web3-api-enabled`\(booléen\) :

Permet `web3_*`l'API Il est en défaut de vrai.

#### Paramètres Eth

`local-txs-enabled`\(booléen\) :

Permet la gestion des transactions locales. Il ne faut pas false.

`api-max-duration`\(durée\)

Durée maximale d'appel d'API Si les appels API dépassent cette durée, ils s'éteindront .

`api-max-blocks-per-request`\(int\) :

Nombre maximum de blocs à servir par `getLogs`demande. Défaut 0 \(pas de maximum\).

`allow-unfinalized-queries`\(booléen\) :

Permet les requêtes pour les blocs/transactions non finalisées \(non encore acceptées\). Il ne faut pas false.

#### Profiler continu

Vous pouvez configurer votre nœud pour exécuter continuellement des profils de mémoire/CPU et enregistrer les plus récents. Le profilage de la mémoire et du CPU est activé si l'on `continuous-profiler-dir`est configuré.

`continuous-profiler-dir`\(chaîne\) :

Si le n'est pas vide, le nœud exécute continuellement des profils de mémoire/CPU et les met à ce dossier. Par défaut sur la chaîne vide \(non activée\).

`continuous-profiler-frequency`\(durée\)

Combien de fois un nouveau profil CPU/mémoire est créé. Par défaut à `15m`.

`continuous-profiler-max-files`\(int\) :

Nombre maximum de fichiers de profils CPU/mémoire à garder. Défaut 5.

#### Paramètres de Keystore

`keystore-directory`\(chaîne\) :

Le répertoire qui contient les clés privées. Peut être donné comme un chemin relatif. Si vide, utilise un répertoire temporaire à `coreth-keystore`. Par défaut sur la chaîne de caractères.

`keystore-external-signer`\(chaîne\) :

Spécifie un URI externe pour un signataire de type de caillon. Par défaut sur la chaîne vide \(non activée\).

`keystore-insecure-unlock-allowed`\(bool\) :

Si vrai, permettre aux utilisateurs de débloquer des comptes dans un environnement HTTP dangereux. Il ne faut pas false.

### Paramètres de consensus

`--consensus-gossip-frequency`\(durée\)

Temps entre les glissements de frontières acceptées. Par défaut à `10s`.

`--consensus-shutdown-timeout`\(durée\)

Timeout avant de tuer une chaîne non réactive. Par défaut à `5s`.

`--creation-tx-fee`\(int\) :

Frais de transaction, dans nAVAX, pour les transactions qui créent un nouvel État. Par transaction, il est en défaut pour nAVAX \(.001 `1000000`AVAX\) par

`--min-delegator-stake`\(int\) :

Le jeu minimum, dans nAVAX, qui peut être délégué à un validateur du réseau primaire.

Par défaut sur `25000000000`\(25 AVAX\) sur Main Net. Par défaut sur `5000000`\(.005 AVAX\) sur le réseau de test.

`--min-delegation-fee`\(int\) :

La redevance minimale de délégation qui peut être facturée pour délégation sur le réseau primaire, multipliée par `10,000`. Doit être dans la gamme `[0, 1000000]`. Par défaut à `20000`\(2%\) sur Main Net.

`--min-stake-duration`\(durée\)

Durée minimale de jalonnement. La défaut sur le principal Net est `336h`\(deux semaines.\)

`--min-validator-stake`\(int\) :

Le jeu minimum, dans nAVAX, est nécessaire pour valider le réseau principal.

Par défaut \(2 `2000000000000`000 AVAX\) sur le principal Net. Par défaut sur `5000000`\(.005 AVAX\) sur le réseau de test.

`--max-stake-duration`\(durée\)

La durée maximale de jalonnement, en heures. `8760h`Défaut, sur Main Net.

`--max-validator-stake`\(int\):s

Le jeu maximal, dans nAVAX, qui peut être placé sur un validateur sur le réseau principal. Par défaut \(3 000 `3000000000000000`000 AVAX\) sur le principal Net. Cela comprend les enjeux fournis par le validateur et par les délégués au validateur.

`--snow-avalanche-batch-size`\(int\) :

Les implémentations de DAG de consensus sur la neige définissent `b`comme le nombre de transactions qu'un vertex devrait inclure. L'augmentation `b`va en principe augmenter le débit tout en augmentant la latence. Le nœud attendra au plus 1 seconde pour collecter un lot, et délivrera ensuite tout le lot à la fois. La valeur doit être au moins `1`. Par défaut à `30`.

`--snow-avalanche-num-parents`\(int\) :

Les implémentations de DAG de consensus sur la neige définissent `p`comme le nombre de parents que doit inclure un vertex L'augmentation `p`permettra d'améliorer l'amortissement des requêtes en réseau. Cependant, en augmentant la connectivité du graphique, la complexité des parcours du graphique est augmentée. La valeur doit être au moins `2`. Par défaut à `5`.

`--snow-concurrent-repolls`\(int\) :

Le consensus sur la neige exige des transactions de re-vote qui sont émises en faible temps d'utilisation du réseau. Ce paramètre permet de définir la manière dont le client sera agressif pour finaliser ces transactions en attente. Cela ne doit être modifié qu'après une étude attentive des compromis du consensus sur la neige. La valeur doit être au moins `1`et au plus .`--snow-rogue-commit-threshold` Par défaut à `4`.

`--snow-sample-size`\(int\) :

Le consensus sur la neige définit `k`comme le nombre de validateurs qui sont échantillonnés lors de chaque sondage du réseau. Ce paramètre permet de définir la `k`valeur utilisée pour le consensus. Cela ne doit être modifié qu'après une étude attentive des compromis du consensus sur la neige. La valeur doit être au moins `1`. Par défaut à `20`.

`--snow-quorum-size`\(int\) :

Le consensus sur la neige définit `alpha`comme le nombre de validateurs qui doivent préférer une transaction lors de chaque sondage sur le réseau pour augmenter la confiance dans la transaction. Ce paramètre nous permet de définir la `alpha`valeur utilisée pour le consensus. Cela ne doit être modifié qu'après une étude attentive des compromis du consensus sur la neige. La valeur doit être supérieure à `k/2`. Par défaut à `14`.

`--snow-virtuous-commit-threshold`\(int\) :

Le consensus sur la neige définit `beta1`comme le nombre de sondages consécutifs qu'une transaction vertueux doit augmenter sa confiance pour qu'elle soit acceptée. Ce paramètre nous permet de définir la `beta1`valeur utilisée pour le consensus. Cela ne doit être modifié qu'après une étude attentive des compromis du consensus sur la neige. La valeur doit être au moins `1`. Par défaut à `15`.

`--snow-rogue-commit-threshold`\(int\) :

Le consensus sur la neige définit `beta2`comme le nombre de sondages consécutifs qu'une transaction voyous doit augmenter sa confiance pour qu'elle soit acceptée. Ce paramètre nous permet de définir la `beta2`valeur utilisée pour le consensus. Cela ne doit être modifié qu'après une étude attentive des compromis du consensus sur la neige. La valeur doit être au moins `beta1`. Par défaut à `30`.

`--stake-minting-period`\(durée\)

Période de consommation de la fonction de jalonnement, en heures. Le défaut sur le principal Net est `8760h`\(365 jours\).

`--tx-fee`\(int\) :

La quantité requise de nAVAX à brûler pour qu'une transaction soit valide. Ce paramètre nécessite un accord de réseau dans sa forme actuelle. La modification de cette valeur par défaut ne doit être faite que sur les réseaux privés. `1000000`Par transaction.

`--uptime-requirement`\(flott\) :

Faction du temps qu'un validateur doit être en ligne pour recevoir des récompenses. Par défaut à `0.6`.

### Santé

`--health-check-frequency`\(durée\)

Le contrôle de santé est effectué avec cette freqency. Par défaut à `30s`.

`--health-check-averager-halflife`\(durée\)

La demi-vie des moyennes utilisées dans les contrôles de santé \(pour mesurer le taux des défaillances des messages, par exemple.\) Une plus grande valeur --> calcul des moyennes volatiles. Par défaut à `10s`.

### Taux de messages -Limitation \(Throttling\)

Ces drapeaux régissent la limitation de taux des messages entrants et sortants. Pour plus d'informations sur la limitation des taux et les drapeaux ci-dessous, consultez le paquet `throttling`dans AvalancheGo.

`--throttler-inbound-at-large-alloc-size`\(uint\) :

Taille, en octets, d'une allocation en grande partie dans le message d'entrée Par défaut `33554432`\(32 mebibytes\).

`--throttler-inbound-validator-alloc-size`\(uint\) :

Taille, en octets, de la répartition des validateurs dans le message d'entrée Par défaut `33554432`\(32 mebibytes\).

`--throttler-inbound-node-max-at-large-bytes`\(uint\) :

Nombre maximal of un nœud peut prendre de l'allocation en grande partie de l'accélérateur de message entrant. Par défaut `2048`\(2 mebibytes\).

`--throttler-outbound-at-large-alloc-size`\(uint\) :

Taille, en octets, d'une allocation en grande partie dans le message sortant. Par défaut `33554432`\(32 mebibytes\).

`--throttler-outbound-validator-alloc-size`\(uint\) :

Taille, en octets, de la répartition des validateurs dans le message sortant. Par défaut `33554432`\(32 mebibytes\).

`--throttler-outbound-node-max-at-large-bytes`\(uint\) :

Nombre maximal of un nœud peut prendre de l'allocation en grande partie de l'accélérateur de message sortant. Par défaut `2048`\(2 mebibytes\).

### Réseau

`--network-compression-enabled`\(bool\) \(v1.4.11\):

Si vrai, compressez certains messages envoyés à des pairs sur la version >= v1.4.11 pour réduire l'utilisation de la bande passante.

`--network-initial-timeout`\(durée\)

Valeur de départ initiale du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `5s`.

`--network-minimum-timeout`\(durée\)

Valeur de retrait minimum du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `2s`.

`--network-maximum-timeout`\(durée\)

Valeur de sortie maximale du gestionnaire de timeout adaptatif, en nanosecondes. Par défaut à `10s`.

`--network-timeout-halflife`\(durée\)

Halflife utilisé lors du calcul de la latence moyenne du réseau. Une plus grande valeur --> calcul de latence du réseau moins volatile . Par défaut à `5m`.

`--network-timeout-coefficient`\(durée\)

Les demandes aux pairs seront mises en attente après `network-timeout-coefficient`[] \* [latence moyenne des demandes]. Par défaut à `2`.

`--network-health-min-conn-peers`\(uint\) :

Nœud se déclarera malsain si vous êtes connecté à moins que ces nombreux pairs. Par défaut à `1`.

`--network-health-max-time-since-msg-received`\(durée\)

Nœud déclarera malsain si il n'a pas reçu de message pour ce temps de fois. Par défaut à `1m`.

`--network-health-max-time-since-no-requests`\(durée\)

Nœud déclarera malsain si il n'a pas reçu de message pour ce temps de fois. Par défaut à `1m`.

`--network-health-max-portion-send-queue-full`\(flott\) :

Nœud déclarera malsain si sa file d'attente d'envoi est plus que cette partie complète. Doit être en [0,1]. Par défaut à `0.9`.

`--network-health-max-send-fail-rate`\(flott\) :

Le nœud déclarera malsain si plus que cette partie du message n'envoie pas de problème. Doit être en [0,1]. Par défaut à `0.25`.

`--inbound-connection-throtting-cooldown`\(durée\)

`--inbound-connection-throttling-max-recent`\(uint\)

Node n'acceptera \(tentative de mettre à jour\) une connexion en ligne depuis une IP si elle ne l'a pas fait dans le dernier `inbound-connection-throtting-cooldown`. Nœud ne permet que `inbound-connection-throttling-max-recent`de tous les IPS par .`inbound-connection-throttling-max-recent`

### Liste des pairs Gossiping

Les nœuds se réunissent les uns par les autres pour que chaque nœud puisse avoir une liste de pairs à jour. `--network-peer-list-gossip-size`Un nœud gossip les `--network-peer-list-size`pair avec ses pairs tous les .`--network-peer-list-gossip-frequency`

`--network-peer-list-gossip-frequency`\(durée\)

Par défaut à `1m`.

`--network-peer-list-gossip-size`\(int\) :

Par défaut à `50`.

`--network-peer-list-size`\(int\) :

Par défaut à `20`.

### Mode Plugin

`--plugin-mode-enabled`\(bool\) :

Si vrai, exécute le nœud en tant que [plugin.](https://github.com/hashicorp/go-plugin) Par défaut à `false`.

### Whitelist

`--whitelisted-subnets`\(chaîne\) :

La commission a séparé la liste de sous-réseaux que ce nœud validera si elle est ajoutée. Les défauts de vider \(ne validera le réseau principal\).

### Machine virtuelle \(VM\) Configurez<a id="vm-configs"></a>

`--vm-aliases-file`\(chaîne\) :

Chemin vers le fichier JSON qui définit les alias pour les ID de machine virtuelle. Par défaut à `~/.avalanchego/configs/vms/aliases.json`. Exemple de contenu :

```javascript
{
  "tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH": [
    "timestampvm",
    "timerpc"
  ]
}
```

`"timestampvm"`L'exemple ci-dessus alias la VM dont l'ID est `"tGas3T58KzdjLHhBDMnH2TvrddhqTji5iZAMZ3RXs2NLpSnhH"`et .`"timerpc"`

### X-Chain / AVM<a id="avm-config"></a>

Cela vous permet de spécifier une config à passer dans la X-Chain. Les valeurs par défaut pour cette config sont :

```javascript
{
  "index-transactions": false,
  "index-allow-incomplete": false
}
```

Les valeurs par défaut sont surchargées seulement si elles sont explicitement spécifiées dans la config.

Les paramètres sont les suivants :

#### Indexation de transactions

`index-transactions`\(booléen\) :

Permet l'indexation des transactions AVM si elle est configurée `true`. La valeur par défaut est `false`. Lorsque les transactions AVM sont configurées `true`, les transactions AVM sont indexées par rapport aux transactions `address`et `assetID`impliquées. Ces données sont disponibles via `avm.getAddressTxs`[l'API](https://github.com/ava-labs/avalanche-docs/tree/c747464781639d100a0a1183c037a972262fc893/build/references/exchange-chain-x-chain-api.md#avm-get-address-txs-api)

Veuillez noter que si elle `index-transactions`est définie à la vérité, elle doit toujours être définie à la vraie valeur pour la vie du nœud. Si configuré `false`après avoir été configuré , `true`le nœud refuse de démarrer sauf si le nœud `index-allow-incomplete`est configuré `true`\(voir ci-dessous\).

`index-allow-incomplete`\(booléen\) :

Permet des indices incomplètes. La valeur par défaut est `false`.

Cette valeur de config est ignorée si aucune donnée indexée sur X-Chain dans la DB et `index-transactions`est configurée sur .`false`

