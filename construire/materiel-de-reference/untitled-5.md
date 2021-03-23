---
description: >-
  When running a node, there are a variety of possible configurations that are
  supported.
---

# Command Line Interface

## Arguments

### Fichier de configuration

`--config-file` \(string\):

Chemin vers un fichier JSON qui spécifie la configuration de ce nœud. Les arguments de ligne de commande remplaceront les arguments définis dans le fichier de configuration.

Exemple de fichier de configuration JSON:

```javascript
{
    "plugin-dir": "/home/ubuntu/avalanchego/plugins",
    "log-level": "debug"
}
```

### APIs

`--api-admin-enabled` \(boolean\):

S'il est défini sur `false`, e nœud n'exposera pas l'API Admin. La valeur par défaut est `false`. Voir [ici](../apis/admin-api.md) pour plus d'informations.

`--api-auth-required` \(boolean\):

S'il est défini sur `true`, les appels d'API nécessitent un jeton d'autorisation. La valeur par défaut est `false`. Voir [ici](../apis/auth-api.md) pour plus d'informations.

`--api-auth-password` \(string\):

Le mot de passe nécessaire pour créer / révoquer des jetons d'autorisation. Si `--api-auth-required=true`, doit être spécifié; sinon ignoré. Voir [ici](../apis/auth-api.md) pour plus d'informations.

`--api-health-enabled` \(boolean\):

S'il est défini sur`true`, ce nœud exposera l'API Health. La valeur par défaut est `true`. Voir [ici](../apis/health-api.md) pour plus d'informations.information.

`--api-info-enabled` \(boolean\):

S'il est défini sur `true`, ce nœud exposera l'API Info. La valeur par défaut est `true`. Voir [ici](../apis/info-api.md) pour plus d'informations.

`--api-ipcs-enabled` \(boolean\):

S'il est défini sur `true`, ce nœud exposera l'API IPCs. La valeur par défaut est `false`. Voir [ici](../apis/ipc-api.md) pour plus d'informations.

`--api-keystore-enabled` \(boolean\):

S'il est défini sur`false`, ce nœud n'exposera pas l'API Keystore. La valeur par défaut est `true`. Voir [ici](../apis/keystore-api.md) pour plus d'informations.

`--api-metrics-enabled` \(boolean\):

S'il est défini sur`false`, ce nœud n'exposera pas l'API Metrics. La valeur par défaut est `true`. Voir [ici](../apis/metrics-api.md) pour plus d'informations.

### Assertions

`--assertions-enabled` \(boolean\):

Lorsqu'il est réglé sur `true`, les assertions s'exécuteront au moment de l'exécution dans toute la base de code. Ceci est destiné à être utilisé dans le débogage, car nous pouvons obtenir un message d'erreur plus spécifique. La valeur par défaut est `true`.

### Bootstrapping

`--bootstrap-ids` \(string\):

Les IDs de Bootstrap sont un tableau d'IDs de validateur. Ces ID seront utilisés pour authentifier les homologues du bootstrapping. Cela ne doit être défini que lorsque `--p2p-tls-enabled=true`. Un exemple de paramètre de ce champ serait`--bootstrap-ids="NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg,NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ"`. La valeur par défaut est vide \(n'essaie pas de démarrer à partir d'autres nœuds.\)

`--bootstrap-ips` \(string\):

Bootstrap IPs est un tableau d'IPv4: paires de ports. Ces adresses IP seront utilisées pour bootstrap l'état actuel d'Avalanche. Un exemple de paramètre de ce champ serait`--bootstrap-ips="127.0.0.1:12345,1.2.3.4:5678"`. La valeur par défaut est vide \(n'essaie pas de démarrer à partir d'autres nœuds.\)

`--bootstrap-retry-enabled` \(boolean\):

Si la valeur est true, réessayera le bootstrap en cas d'échec.

`--bootstrap-retry-max-attempts` \(uint\):

Nombre maximal de tentatives de redémarrage après un échec.

### Mesure de la connexion

`--conn-meter-max-conns` \(int\):

Mettez à niveau la plupart des connexion `conn-meter-max-conns` à partir d'une adresse IP donnée par `conn-meter-reset-duration`. Si `conn-meter-reset-duration` est égal à 0, les connexions entrantes ne sont pas limitées en débit.

`--conn-meter-reset-duration` \(duration\):

Mettez à niveau la plupart des connexion `conn-meter-max-conns` à partir d'une adresse IP donnée par `conn-meter-reset-duration`. Si `conn-meter-reset-duration` est égal à 0, les connexions entrantes ne sont pas limitées en temps.

### Base de données

`--db-dir` \(string, file path\):

Spécifie le répertoire dans lequel la base de données est conservée. La valeur par défaut est `"$HOME/.avalanchego/db"`.

`--db-enabled` \(boolean\):

Si défini sur `false`, les mises à jour d'état sont effectuées uniquement sur une base de données en mémoire, sans apporter de modifications sur le stockage permanent. Lorsqu'il est réglé sur `true`, les mises à jour d'état sont écrites dans une base de données persistante locale. La valeur par défaut est `true`.

### Genèse

`--genesis` \(string\):

Chemin vers un fichier JSON contenant les données de genèse à utiliser. Ignoré lors de l'exécution de réseaux standard \(Mainnet, Testnet.\) Sinon, utilise les données de genèse par défaut. Pour un exemple de représentation JSON des données de genèse, voir [ici](https://github.com/ava-labs/avalanchego/blob/master/genesis/genesis_local.go#L16).

### HTTP Serveur

`--http-host` \(string\):

L'adresse sur laquelle les API HTTP écoutent. La valeur par défaut est`127.0.0.1`. Cela signifie que par défaut, votre nœud ne peut gérer que les appels d'API effectués à partir de la même machine. Pour autoriser les appels d'API depuis d'autres machines, utilisez `--http-host=`. Par exemple, si votre adresse IP publique est `1.2.3.4` et que vous souhaitez accéder au RPC d'AvalancheGo via cette adresse IP, vous devez transmettre `--http-host=1.2.3.4`. Pour autoriser les appels d'API depuis toutes les adresses IP, utilisez`http-host=`.

`--http-port` \(int\):

Chaque nœud exécute un serveur HTTP qui fournit les API pour interagir avec le nœud et le réseau Avalanche. Cet argument spécifie le port sur lequel le serveur HTTP écoutera. La valeur par défaut est `9650`.

`--http-tls-cert-file` \(string, file path\):

Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud pour le serveur HTTPS. Cela doit être spécifié lorsque `--http-tls-enabled=true`. Il n'y a aucune valeur par défaut.

`--http-tls-enabled` \(boolean\):

S'il est défini sur `true`, cet indicateur tentera de mettre à niveau le serveur pour utiliser HTTPS. La valeur par défaut est `false`.

`--http-tls-key-file` \(string, file path\):

Cet argument spécifie l'emplacement de la clé privée TLS utilisée par le nœud pour le serveur HTTPS. Cela doit être spécifié lorsque `--http-tls-enabled=true`. Il n'y a aucune valeur par défaut.

### IPCS

`--ipcs-chain-ids` \(string\)

Liste séparée par des virgules des identifiants de chaîne auxquels se connecter. Il n'y a aucune valeur par défaut.

`--ipcs-path` \(string\)

Le répertoire \(Unix\) ou le préfixe de canal nommé \(Windows\) pour les sockets IPC. La valeur par défaut est /tmp.

### Limite du descripteur de fichier

`--fd-limit` \(int\)

Tente d'augmenter la limite du descripteur de fichier de processus à au moins cette valeur. La valeur par défaut est `32768`

### Enregistrement

`--log-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Le niveau de journalisation détermine les événements à consigner. Il existe 7 niveaux différents, de la plus haute priorité au plus bas.

* `Off`: aucun journal n'a ce niveau de journalisation.
* `Fatal`: erreurs fatales non récupérables.
* `Error`: erreurs rencontrées par le nœud, ces erreurs ont pu être récupérées.
* `Warn`: un avertissement qui pourrait indiquer un nœud byzantin faux ou une erreur future potentielle.
* `Info`: Useful descriptions of node status updates.
* `Debug`: descriptions utiles des mises à jour de l'état des nœuds. Débogage: la journalisation du débogage est utile lorsque vous essayez de comprendre les bogues possibles dans le code. Plus d'informations qui seraient généralement souhaitées pour une utilisation normale seront affichées.
* `Verbo`: suit une grande quantité d'informations que le nœud traite. Cela inclut le contenu des messages et les vidages binaires des données pour une analyse de protocole de très bas niveau.

Lorsque vous spécifiez un niveau de journal, notez que tous les journaux avec la priorité spécifiée ou supérieure seront suivis. La valeur par défaut est `Info`.

`--log-display-level` \(string, `{Off, Fatal, Error, Warn, Info, Debug, Verbo}`\):

Le niveau de journalisation détermine les événements à afficher à l'écran. Si ce champ est laissé vide, sera par défaut la valeur fournie à `--log-level`.

`--log-display-highlight` \(string, `{auto, plain, colors}`\):

S'il faut colorer / mettre en évidence les journaux d'affichage. La valeur par défaut est mise en surbrillance lorsque la sortie est un terminal. Sinon, devrait être l'une des`{auto, plain, colors}`

`--log-dir` \(string, file path\):

Spécifie le répertoire dans lequel les journaux système sont conservés. La valeur par défaut est `"$HOME/.avalanchego/logs"`.

### ID de réseau

`--network-id` \(string\):

L'identité du réseau auquel le nœud doit se connecter. Peut être l'un des:

* `--network-id=mainnet` -&gt; Se connecter au réseau principal \(par défaut\).
* `--network-id=fuji` -&gt; Se connecter au réseau Fuji de test.
* `--network-id=testnet` -&gt; Se connecter au au réseau de test actuel. \(En ce moment, c'est Fuji.\)
* `--network-id=local` -&gt; Se connecter au réseau local de test.
* `--network-id=network-{id}` -&gt; Se connecter au réseau avec l'ID donné. `id` doit être compris entre `[0, 2^32)`.

### IP publique

`--public-ip` \(string\):

Les validateurs doivent connaître leurs adresses IP publiques afin de pouvoir indiquer aux autres nœuds comment s'y connecter. Si cet argument n'est pas fourni, le nœud tentera d'effectuer une traversée NAT pour obtenir l'adresse IP publique du nœud. Doit être défini sur `127.0.0.1` pour créer un réseau local. S'il n'est pas défini, tente d'apprendre l'IP à l'aide de la traversée NAT.

`--dynamic-public-ip` \(string\):

Valeurs valides si param est présent: `opendns`, `ifconfigco` ou `ifconfigme`. Cela remplace`--public-ip`.S'il est défini, interrogera le service distant toutes les`--dynamic-update-duration` et mettra à jour l'adresse IP publique du nœud.

`--dynamic-update-duration` \(duration\):

Le temps entre les événements d'interrogation pour `--dynamic-public-ip` ip ou NAT traversal. Le minimum recommandé est de 1 minute. La valeur par défaut est `5m`.

### Signature Vérification

`--signature-verification-enabled` \(boolean\):

Active la vérification de la signature. Lorsqu'elle est définie sur `false`, les signatures ne seront pas vérifiées dans les VM qui autorisent la désactivation des signatures. La valeur par défaut est`true`.

### Staking

`--staking-port` \(string\):

Le port par lequel le serveur de mise en jeu se connectera au réseau Avalanche en externe. La valeur par défaut est `9651`.

`--p2p-tls-enabled` \(boolean\):

Avalanche utilise des connexions TLS authentifiées bidirectionnelles pour identifier en toute sécurité le`stakingID` of connected peers. des pairs connectés. Cependant, cela peut être désactivé pour les tests. Lorsque TLS est désactivé, le `stakingID` sera dérivé de l'adresse IP que le nœud prétend posséder. Cela désactivera également le cryptage de la communication inter-nœuds. Cela ne doit être spécifié que pour les tests. La valeur par défaut est `true`. Cela doit être vrai lorsque `--staking-enabled=true`.

`--staking-enabled` \(boolean\):

Avalanche utilise la preuve d'enjeu \(PoS\) comme résistance Sybil pour rendre l'attaque du réseau d'un coût prohibitif. Lorsque cela est `true`, `--p2p-tls-enabled` oit être défini sur `true` afin de sécuriser les communications P2P.

`--staking-tls-cert-file` \(string, file path\):

Avalanche utilise des connexions TLS authentifiées bidirectionnelles pour identifier en toute sécurité le `stakingID` des pairs connectés lorsque `--p2p-tls-enabled=true`. Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud. Cela doit être spécifié lorsque `--p2p-tls-enabled=true`. La valeur par défaut est `""`.

`--staking-tls-key-file` \(string, file path\):

Avalanche utilise des connexions TLS authentifiées bidirectionnelles pour identifier en toute sécurité le `stakingID` des pairs connectés lorsque `--p2p-tls-enabled=true`. Cet argument spécifie l'emplacement du certificat TLS utilisé par le nœud. Cela doit être spécifié lorsque `--p2p-tls-enabled=true`. La valeur par défaut est `""`.

`--staking-disabled-weight` \(int\):

Poids à fournir à chaque pair lorsque la mise en jeu est désactivé. La valeur par défaut est `1`.

### Version

`--version` \(boolean\)

Si la valeur est `true`, imprimez la version et quittez. La valeur par défaut est `false`.

## Options avancées

Les options suivantes affectent l'exactitude de la plate-forme. Ils peuvent devoir être modifiés à l'échelle du réseau et, par conséquent, un utilisateur ordinaire ne devrait pas changer les valeurs par défaut.

### Benchlist

`--benchlist-duration` \(duration\):

Durée pendant laquelle un pair est référencé après avoir dépassé `--benchlist-fail-threshold`. La valeur par défaut est `1h`.

`--benchlist-fail-threshold` \(int\):

Nombre de requêtes consécutives ayant échoué sur un nœud avant de le comparer \(en supposant que toutes les requêtes échouent\). La valeur par défaut est `10`.

`--benchlist-peer-summary-enabled` \(boolean\):

Active les métriques de latence des requêtes spécifiques aux pairs. La valeur par défaut est `false`.

`--benchlist-min-failing-duration` \(duration\):

Durée minimale de l'échec des messages à un homologue avant que l'homologue ne soit mis en attente. La valeur par défaut est `5m`.

### Consensus Parameters

`--consensus-gossip-frequency` \(duration\):

Temps entre les commérages des frontières acceptées. La valeur par défaut est `10s`.

`--consensus-shutdown-timeout` \(duration\):

Délai d'attente avant de tuer une chaîne qui ne répond pas. La valeur par défaut est `5s`.

`--creation-tx-fee` \(int\):

Frais de transaction, dans nAVAX, pour les transactions qui créent un nouvel état. La valeur par défaut est `1000000` nAVAX \(.001 AVAX\) par transaction.

`--min-delegator-stake` \(int\):

La participation minimale, dans nAVAX, qui peut être déléguée à un validateur du réseau primaire.

La valeur par défaut est `25000000000` \(25 AVAX\) sur le réseau principal. La valeur par défaut est `5000000` \(.005 AVAX\) sur le réseau de test.

`--min-delegation-fee` \(int\):

Frais de délégation minimum pouvant être facturés pour la délégation sur le réseau principal, multiplié par `10,000` . Doit être compris entre `[0, 1000000]`.La valeur par défaut est 20000 `20000` \(2%\) sur le réseau principal.

`--min-stake-duration` \(duration\):

Durée minimale de mise en jeu. La valeur par défaut sur le réseau principal est `336h` \(deux semaines\)

`--min-validator-stake` \(int\):

La mise minimale, dans nAVAX, requise pour valider le réseau primaire.

La valeur par défaut est `2000000000000` \(2,000 AVAX\) sur le réseau principal. La valeur par défaut est `5000000` \(.005 AVAX\) sur le réseau de test.

`--max-stake-duration` \(duration\):

La durée maximale de la mise en jeu en heures. La valeur par défaut est `8760h` \(365 jours\) sur le réseau principal.

`--max-validator-stake` \(int\):

La mise maximale, dans nAVAX, qui peut être placée sur un validateur sur le réseau principal. La valeur par défaut est `3000000000000000` \(3,000,000 AVAX\) sur le réseau principal. Cela comprend la mise fournie à la fois par le validateur et par les délégués au validateur.

`--snow-avalanche-batch-size` \(int\):

Les implémentations DAG du consensus Snow définissent `b` aomme le nombre de transactions qu'un sommet doit inclure. L'augmentation de `b` augmentera théoriquement le débit tout en augmentant la latence. Le nœud attendra au plus 1 seconde pour collecter un lot, puis émettra le lot entier en une seule fois. La valeur doit être au moins égale à `1`. La valeur par défaut est `30`.

`--snow-avalanche-num-parents` \(int\):

Les implémentations DAG du consensus Snow définissent `p` comme le nombre de parents qu'un sommet doit inclure. L'augmentation de `p` améliorera l'amortissement des requêtes réseau. Cependant, en augmentant la connectivité du graphe, la complexité des parcours de graphe est augmentée. La valeur doit être au moins égale à `2`. La valeur par défaut est `5`.

`--snow-concurrent-repolls` \(int\):

Le consensus Snow nécessite le repolling des transactions émises pendant les périodes de faible utilisation du réseau. Ce paramètre permet de définir le degré d'agressivité du client dans la finalisation de ces transactions en attente. Cela ne devrait être changé qu'après un examen attentif des compromis du consensus Snow. La valeur doit être au moins `1` et au plus `--snow-rogue-commit-threshold`. La valeur par défaut est `4`.

`--snow-sample-size` \(int\):

Le consensus Snow définit `k` omme le nombre de validateurs échantillonnés lors de chaque interrogation du réseau. Ce paramètre permet de définir la valeur `k` utilisée pour le consensus. Cela ne devrait être changé qu'après un examen attentif des compromis du consensus Snow. La valeur doit être au moins égale à `1`. La valeur par défaut est`20`.

`--snow-quorum-size` \(int\):

Le consensus Snow définit`alpha` comme le nombre de validateurs qui doivent préférer une transaction lors de chaque sondage du réseau pour augmenter la confiance dans la transaction. Ce paramètre nous permet de définir la valeur `alpha` value used for consensus. utilisée pour le consensus. Cela ne devrait être changé qu'après un examen attentif des compromis du consensus Snow. La valeur doit être supérieure à `k/2`. La valeur par défaut est `14`.

`--snow-virtuous-commit-threshold` \(int\):

Snow consensus définit `beta1` comme le nombre de sondages consécutifs qu'une transaction vertueuse doit augmenter sa confiance pour être acceptée. Ce paramètre nous permet de définir la valeur `beta1` utilisée pour le consensus. Cela ne devrait être changé qu'après un examen attentif des compromis du consensus Snow. La valeur par défaut est `1`. Defaults to `15`.

`--snow-rogue-commit-threshold` \(int\):

Snow consensus définit `beta2` comme le nombre de sondages consécutifs qu'une transaction non autorisée doit augmenter sa confiance pour être acceptée. Ce paramètre nous permet de définir la valeur `beta2` utilisée pour le consensus. Cela ne devrait être changé qu'après un examen attentif des compromis du consensus Snow. La valeur doit être au moins `beta1`. La valeur par défaut est `30`.

`--stake-minting-period` \(duration\):

Période de consommation de la fonction de staking, en heures The Default on Main Net is `8760h` \(365 days\).

`--tx-fee` \(int\):

La quantité requise de nAVAX à burn pour qu'une transaction soit valide. Ce paramètre nécessite un accord de réseau dans sa forme actuelle. La modification de cette valeur par rapport à la valeur par défaut ne doit être effectuée que sur les réseaux privés. La valeur par défaut est `1000000` nAVAX par transaction.

`--uptime-requirement` \(float\):

Fraction de temps, un validateur doit être en ligne pour recevoir des récompenses. La valeur par défaut est`0.6`.

### Traitement des messages

`--max-non-staker-pending-msgs` \(int\):

Nombre maximum de messages qu'un non-staker est autorisé à avoir en attente. La valeur par défaut est `20`.

`--staker-msg-reserved` \(float\):

Portion de la mémoire tampon des messages en attente réservée aux messages des validateurs. La valeur par défaut est `0.375`.

`--staker-cpu-reserved` \(float\):

Partie du temps pour le CPU de la chaîne réservée aux messages des validateurs. La valeur par défaut est `0.375`.

### Réseau

`--network-initial-timeout` \(duration\):

Valeur de temporisation initiale du gestionnaire de temporisation adaptative, en nanosecondes. La valeur par défaut est `5s`.

`--network-minimum-timeout` \(duration\):

Valeur minimale du délai d'expiration du gestionnaire de délai d'attente adaptatif, en nanosecondes. La valeur par défaut est `2s`.

`--network-maximum-timeout` \(duration\):

Valeur maximale du délai d'expiration du gestionnaire de délai d'attente adaptatif, en nanosecondes. La valeur par défaut est`10s`.

`--network-timeout-halflife` \(duration\):

Demi-vie utilisé lors du calcul de la latence moyenne du réseau. Plus grande valeur -&gt; calcul de latence réseau moins volatile. La valeur par défaut est `5m`.

`--network-timeout-coefficient` \(duration\):

Les demandes adressées aux pairs expireront après le \[`network-timeout-coefficient`\] \* \[average request latency\].La valeur par défaut est `2`.

`--network-health-min-conn-peers` \(uint\):

Le nœud signalera un état défectueux s'il est connecté à moins de ce nombre de pairs. La valeur par défaut est `1`.

`--network-health-max-time-since-msg-received` \(duration\):

Le nœud signalera un problème de santé s'il n'a pas reçu de message pendant ce laps de temps. La valeur par défaut est `1m`.

`--network-health-max-time-since-no-requests` \(duration\):

Le nœud signalera un problème de santé s'il n'a pas reçu de message pendant ce laps de temps. La valeur par défaut est `1m`.

`--network-health-max-portion-send-queue-full` \(float\):

Le nœud signalera un état défectueux si sa file d'attente d'envoi est plus que cette partie pleine. Doit être entre \[0,1\]. La valeur par défaut est `0.9`.

`--network-health-max-send-fail-rate` \(float\):

Le nœud signalera un état défectueux si plus de cette partie du message échoue. Doit être entre \[0,1\]. La valeur par défaut est `0.25`.

### Santé

`--health-check-frequency` \(duration\):

La vérification de l'état s'exécute avec cette fréquence. La valeur par défaut est `30s`.

`--health-check-averager-halflife` \(duration\):

Demi-vie des moyennes utilisées dans les contrôles de santé \(pour mesurer le taux d'échecs de message, par exemple\). Valeur plus grande -&gt; calcul moins volatile des moyennes. La valeur par défaut est`10s`.

### Throughput Server

`--xput-server-enabled` \[Deprecated\] \(boolean\):

Un serveur facultatif permet d'exécuter des tests de débit en injectant une charge dans le réseau sur commande. S'il est activé, ce serveur est démarré et écoute les commandes d'un coordinateur de test. La valeur par défaut est `false`.

`--xput-server-port` \[Deprecated\] \(string\):

Cette option permet de spécifier sur quel port le serveur de débit, s'il est activé, écoutera. La valeur par défaut est`9652`.

### Liste blanche de sous-réseau

`--whitelisted-subnets` \(string\):

Liste de sous-réseaux séparés par des virgules que ce nœud validerait s'il était ajouté. Par défaut, vide \(validera uniquement le réseau principal\).

### Redémarrer lors de la déconnexion

Certains utilisateurs ont eu un problème où leur nœud AvalancheGo entre dans un état malsain lorsque leur nœud perd la connectivité Internet ou lorsque leur adresse IP change. Pour résoudre ce problème, il existe des indicateurs de ligne de commande qui provoquent le redémarrage du nœud s'il est déconnecté de tous ses homologues. Elles sont:

`--restart-on-disconnected` \(boolean, par défaut `false`\)

`--disconnected-check-frequency` \(duration, par défaut `10s`\)

`--disconnected-restart-timeout` \(duration, par défaut `1m`\)

Si `restart-on-disconnected` est `true`, le nœud vérifiera chaquey `disconnected-check-frequency` pour voir s'il a perdu la connexion avec tous ses homologues. Si le nœud a perdu la connexion à tous ses homologues pour `disconnected-restart-timeout`, il redémarrera.

Si `restart-on-disconnected` est `false` ou soit`disconnected-check-frequency` ou`disconnected-restart-timeout` est 0, le nœud ne redémarrera pas.

### Plugins

`--plugin-dir` \(string, file path\):

Spécifie le répertoire dans lequel le plugin `evm` est conservé. La valeur par défaut est`"$HOME/.avalanchego/build/plugins"`.

`--coreth-config` \(json\):

Cela vous permet de spécifier une configuration à transmettre à Coreth, la machine virtuelle exécutant la C-Chain. Les valeurs par défaut pour cette configuration sont:

```cpp
{
    "snowman-api-enabled": false,
    "coreth-admin-api-enabled": false,
    "net-api-enabled": true,
    "rpc-gas-cap": 2500000000,
    "rpc-tx-fee-cap": 100,
    "eth-api-enabled": true,
    "personal-api-enabled": true,
    "tx-pool-api-enabled": true,
    "debug-api-enabled": false,
    "web3-api-enabled": true
}
```

Remarque: si une configuration est spécifiée, toutes les options par défaut sont remplacées. Par exemple:

```text
./build/avalanchego --config-file=config.json
```

config.json:

```cpp
{
    "coreth-config": {
        "snowman-api-enabled": false,
        "coreth-admin-api-enabled": false,
        "net-api-enabled": true,
        "rpc-gas-cap": 2500000000,
        "rpc-tx-fee-cap": 100,
        "eth-api-enabled": true,
        "tx-pool-api-enabled": true,
        "debug-api-enabled": true,
        "web3-api-enabled": true
    }
}
```

Puisque l'option`personal-api-enabled`elle sera définie sur `false` et désactivera l'espace de noms`personal_*`.

Les options spécifient les paramètres de Coreth \(la C-Chain\)comme suit:

* `snowman-api-enabled` -&gt; Active l'API Snowman.
* `coreth-admin-apienabled` -&gt; Active l'API d'administration sur le plugin Coreth.
* `net-api-enabled` -&gt;Active l'API `net_*` .
* `rpc-gas-cap` -&gt; Définit le gaz maximum à consommer par un appel RPC \(utilisé dans `eth_estimateGas`\)
* `rpc-tx-fee-cap` -&gt; Définit le plafond global des frais de transaction \(price \* gaslimit\) pour les variantes d'envoi-transction. L'unité est AVAX.
* `eth-api-enabled` -&gt; Active l'API`eth_*`.
* `personal-api-enabled` -&gt; Active l'API`personal_*`.
* `tx-pool-api-enabled` -&gt;Active l'API`txpool_*`.
* `debug-api-enabled` -&gt;Active l'API`debug_*`.
* `web3-api-enabled` -&gt; Active l'API`web3_*` .

