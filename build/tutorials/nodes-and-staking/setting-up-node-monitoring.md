# Suivre un nœud Avalanche

## Introduction

Ce tutoriel montrera comment configurer l'infrastructure pour surveiller une instance d'[AvalancheGo](https://github.com/ava-labs/avalanchego). Nous utiliserons :

* [Prometheus](https://prometheus.io/) pour recueillir et stocker des données
* [node_exporter](https://github.com/prometheus/node_exporter) pour obtenir des informations sur la machine,
* l'[API de métrique](https://docs.avax.network/build/avalanchego-apis/metrics-api) d'AvalancheGo pour obtenir des informations sur le nœud
* [Grafana](https://grafana.com/) pour visualiser les données sur un tableau de bord.
* Un ensemble de [tableaux de bord Avalanche](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)  pré-fabriqués

Préalables :

* Un nœud d'AvalancheGo en cours d'exécution
* Accès shell à la machine qui exécute le nœud
* Privilèges d'administrateur sur la machine

Ce tutoriel suppose que vous avez Ubuntu 18.04 ou 20.04 sur votre nœud. Les autres versions de Linux qui utilisent  pour exécuter `systemd`les services et  `apt-get`pour la gestion de paquets peuvent fonctionner, mais n'ont pas été testées. Un membre de la communauté a signalé que cela fonctionne sur Debian 10, peut fonctionner sur d'autres versions Debian.

### Caveat : sécurité

{% hint style="danger" %}
Le système décrit **ici ne doit pas** être ouvert à l'internet public. Ni Prometheus ni Grafana, tels que présentés ici, ne sont protégés contre les accès non autorisés. Assurez-vous que les deux sont accessibles uniquement sur un proxy sécurisé, un réseau local ou un VPN. La configuration de ce système dépasse le cadre de ce tutoriel, mais soyez prudent. De mauvaises pratiques de sécurité pourraient permettre à des attaquants de prendre le contrôle de votre nœud ! Il est de votre responsabilité de suivre les pratiques de sécurité appropriées.
{% endhint %}

## Surveillance du script d'installation

Afin de faciliter la surveillance des nœuds à installer, nous avons fait un script qui effectue la plupart des travaux pour vous. Pour télécharger et exécuter le script, connectez-vous à la machine sur laquelle le nœud fonctionne avec un utilisateur disposant de privilèges d'administrateur et entrez la commande suivante :

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/monitoring-installer.sh;\
chmod 755 monitoring-installer.sh;
```
Cette action téléchargera le script et le rendra exécutable.

Le script lui-même est exécuté plusieurs fois avec différents arguments, chacun installant un outil différent ou une partie de l'environnement. Pour vous assurer qu'il a été téléchargé et configuré correctement, commencez par exécuter :

```bash
./monitoring-installer.sh --help
```
Il doit afficher :

```text
Usage: ./monitoring-installer.sh [--1|--2|--3|--4|--help]

Options:
--help   Shows this message
--1      Step 1: Installs Prometheus
--2      Step 2: Installs Grafana
--3      Step 3: Installs node_exporter
--4      Step 4: Installs AvalancheGo Grafana dashboards

Run without any options, script will download and install latest version of AvalancheGo dashboards.
```

Allons-y.

## Étape 1 : Configurer Prometheus <a id="prometheus"></a>

Exécutez le script pour exécuter la première étape :

```bash
./monitoring-installer.sh --1
```

Il devrait produire un résultat comme celui-ci :

```text
AvalancheGo monitoring installer
--------------------------------
STEP 1: Installing Prometheus

Checking environment...
Found arm64 architecture...
Prometheus install archive found:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
Attempting to download:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
prometheus.tar.gz                           100%[=========================================================================================>]  65.11M   123MB/s    in 0.5s
2021-11-05 14:16:11 URL:https://github-releases.githubusercontent.com/6838921/a215b0e7-df1f-402b-9541-a3ec9d431f76?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T141610Z&X-Amz-Expires=300&X-Amz-Signature=72a8ae4c6b5cea962bb9cad242cb4478082594b484d6a519de58b8241b319d94&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=6838921&response-content-disposition=attachment%3B%20filename%3Dprometheus-2.31.0.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [68274531/68274531] -> "prometheus.tar.gz" [1]
...
```
Vous pouvez être invité à confirmer l'installation de paquets supplémentaires, faites-le si on vous le demande. L'exécution du script devrait se terminer par des instructions sur la façon de vérifier que Prometheus s'est installé correctement. Faisons cela, exécutons :
```bash
sudo systemctl status prometheus
```

Cela devrait donner quelque chose comme :

```text
● prometheus.service - Prometheus
Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
Active: active (running) since Fri 2021-11-12 11:38:32 UTC; 17min ago
Docs: https://prometheus.io/docs/introduction/overview/
Main PID: 548 (prometheus)
Tasks: 10 (limit: 9300)
Memory: 95.6M
CGroup: /system.slice/prometheus.service
└─548 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templates=/etc/prometheus/con>

Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.644Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=81 maxSegment=84
Nov 12 11:38:33 ip-172-31-36-200 prometheus[548]: ts=2021-11-12T11:38:33.773Z caller=head.go:590 level=info component=tsdb msg="WAL segment loaded" segment=82 maxSegment=84
```

Notez l'`active (running)`état  \(appuyez sur  pour `q`quitter\). Vous pouvez également vérifier l'interface Web Prometheus, disponible sur`http://your-node-host-ip:9090/`

{% hint style="warning" %}
Vous devrez peut-être faire  `sudo ufw allow 9090/tcp`si le pare-feu est activé, et/ou ajustez les paramètres de sécurité pour autoriser les connexions au port 9090 si le nœud fonctionne sur une instance cloud. Pour AWS, vous pouvez le consulter [ici](setting-up-an-avalanche-node-with-amazon-web-services-aws.md#f8df). Si sur l'internet public, assurez-vous de permettre uniquement votre IP de se connecter !
{% endhint %}

Si tout est correct, allons de l'avant.

## Étape 2 : Installer Grafana <a id="grafana"></a>

Exécutez le script pour exécuter la deuxième étape :

```bash
./monitoring-installer.sh --2
```

Il devrait produire un résultat comme celui-ci :

```text
AvalancheGo monitoring installer
--------------------------------
STEP 2: Installing Grafana

OK
deb https://packages.grafana.com/oss/deb stable main
Hit:1 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal InRelease
Get:2 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-updates InRelease [114 kB]
Get:3 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-backports InRelease [101 kB]
Hit:4 http://ppa.launchpad.net/longsleep/golang-backports/ubuntu focal InRelease
Get:5 http://ports.ubuntu.com/ubuntu-ports focal-security InRelease [114 kB]
Get:6 https://packages.grafana.com/oss/deb stable InRelease [12.1 kB]
...
```
Pour s'assurer qu'il fonctionne correctement :

```text
sudo systemctl status grafana-server
```

ce qui devrait à nouveau montrer grafana comme `active`. Grafana devrait maintenant être disponible à  `http://your-node-host-ip:3000/`de votre navigateur. Connectez-vous avec le nom d'utilisateur : admin, le mot de passe : admin, et vous serez invité à définir un nouveau mot de passe sécurisé. Faites-le.

{% hint style="warning" %}
Vous devrez peut-être faire  `sudo ufw allow 3000/tcp`si le pare-feu est activé, et/ou ajustez les paramètres d'instance du cloud pour permettre les connexions au port 3000. Si sur l'internet public, assurez-vous de permettre uniquement votre IP de se connecter !
{% endhint %}

Prometheus et Grafana sont maintenant installés, nous sommes prêts pour l'étape suivante.

## Étape 3 : Configurer node\_exporter <a id="exporter"></a>

En plus des métriques d'AvalancheGo, nous allons mettre en place une surveillance de la machine elle-même, afin de vérifier l'utilisation du processeur, de la mémoire, du réseau et du disque et d'être au courant de toute anomalie. Pour cela, nous utiliseronsnode\_exporter, un plugin Prometheus.

Exécutez le script pour exécuter la troisième étape :

```bash
./monitoring-installer.sh --3
```
Le résultat devrait ressembler à ceci :
```text
AvalancheGo monitoring installer
--------------------------------
STEP 3: Installing node_exporter

Checking environment...
Found arm64 architecture...
Dowloading archive...
https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-arm64.tar.gz
node_exporter.tar.gz                        100%[=========================================================================================>]   7.91M  --.-KB/s    in 0.1s
2021-11-05 14:57:25 URL:https://github-releases.githubusercontent.com/9524057/6dc22304-a1f5-419b-b296-906f6dd168dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T145725Z&X-Amz-Expires=300&X-Amz-Signature=3890e09e58ea9d4180684d9286c9e791b96b0c411d8f8a494f77e99f260bdcbb&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=9524057&response-content-disposition=attachment%3B%20filename%3Dnode_exporter-1.2.2.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [8296266/8296266] -> "node_exporter.tar.gz" [1]
node_exporter-1.2.2.linux-arm64/LICENSE
```
Encore une fois, nous vérifions que le service fonctionne correctement :
```cpp
sudo systemctl status node_exporter
```
Si le service est en cours d'exécution, Prometheus, Grafana et node\_exporter devraient tous fonctionner ensemble maintenant. Pour vérifier, dans votre navigateur, visitez l'interface web de Prometheus sur `http://your-node-host-ip:9090/targets`. Vous devez voir trois cibles activées :

* Prometheus
* AvalancheGo
* avalanchego-machine

Assurez-vous qu'elles ont toutes `State` comme `UP`.

{% hint style="info" %}
Si vous exécutez votre nœud AvalancheGo avec TLS activé sur votre port API, vous devrez modifier manuellement le  `/etc/prometheus/prometheus.yml`fichier et modifier la `avalanchego`tâche  pour ressembler à ceci :
```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    scheme: 'https'
    tls_config:
    insecure_skip_verify: true
    static_configs:
      - targets: ['localhost:9650']
```
Attention à l'espacement \(y compris les espaces de tête\) ! Vous aurez besoin de privilèges d'administrateur pour le faire \(utilisez `sudo`\). Redémarrez le service prometheus par la suite avec `sudo systemctl restart prometheus`.
{% endhint %}

Il ne reste plus qu'à approvisionner la source de données et à installer les tableaux de bord qui nous montreront les données.

## Étape 4 : tableaux de bord <a id="dashboards"></a>

Exécutez le script pour installer les tableaux de bord :

```bash
./monitoring-installer.sh --4
```
Il produira un résultat comme celui-ci :
```text
AvalancheGo monitoring installer
--------------------------------

Downloading...
Last-modified header missing -- time-stamps turned off.
2021-11-05 14:57:47 URL:https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/dashboards/c_chain.json [50282/50282] -> "c_chain.json" [1]
FINISHED --2021-11-05 14:57:47--
Total wall clock time: 0.2s
Downloaded: 1 files, 49K in 0s (132 MB/s)
Last-modified header missing -- time-stamps turned off.
...
```
Cela permettra de télécharger les dernières versions des tableaux de bord depuis GitHub et de provisionner Grafana pour les charger, ainsi que de définir Prometheus comme source de données. L'affichage des tableaux de bord peut prendre jusqu'à 30 secondes. Dans votre navigateur, allez à : `http://your-node-host-ip:3000/dashboards`. Vous devriez voir 7 tableaux de bord Avalanche :

![Tableaux de bord importés](monitoring-01-dashboards.png)

Sélectionnez « Tableau de bord principal Avalanche » en cliquant sur son titre. Il devrait charger, et ressembler à cela :

![Tableau de bord principal](monitoring-02-main-dashboard.png)

Certains graphiques peuvent mettre un certain temps à se remplir complètement, car ils ont besoin d'une série de points de données pour s'afficher correctement.

Vous pouvez marquer le tableau de bord principal, car il montre les informations les plus importantes sur le nœud d'un simple coup d'œil. Chaque tableau de bord comporte un lien vers tous les autres en première ligne, ce qui vous permet de vous déplacer facilement entre eux.

## Mise à jour

Les indicateurs de nœuds disponibles sont mis à jour en permanence, de nouveaux indicateurs sont ajoutés et les indicateurs obsolètes sont supprimés. Il est donc recommandé de mettre à jour les tableaux de bord de temps en temps, en particulier si vous remarquez des données manquantes dans les panneaux. La mise à jour des tableaux de bord est facile, il suffit d'exécuter le script sans arguments, et il actualisera les tableaux de bord avec les dernières versions disponibles. Attendez jusqu'à 30 secondes pour la mise à jour des tableaux de bord dans Grafana.

## Résumé

L'utilisation du script pour installer la surveillance des nœuds est facile, et il vous donne un aperçu de la façon dont votre nœud se comporte et ce qui se passe sous le capot. Aussi, de jolis graphiques !

Si vous avez des commentaires sur ce tutoriel, des problèmes avec le script ou pour suivre les étapes, envoyez-nous un message sur [Discord](https://chat.avalabs.org).
