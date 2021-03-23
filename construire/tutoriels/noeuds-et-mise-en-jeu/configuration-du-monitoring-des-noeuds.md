---
description: >-
  Configuration d'une infrastructure pour surveiller les performances de votre
  nœud.
---

# Configuration du monitoring des nœuds

## Introduction

Ce tutoriel suppose que vous avez Ubuntu 18.04 ou 20.04 en cours d'exécution sur votre nœud. Une version Mac OS X de ce tutoriel viendra plus tard.

Ce tutoriel montrera comment configurer une infrastructure pour surveiller une instance d'[AvalancheGo](https://github.com/ava-labs/avalanchego). Nous utiliserons :

* [Prometheus](https://prometheus.io/) pour collecter et stocker des données.
* [Node\_exporter](https://github.com/prometheus/node_exporter) pour obtenir des informations sur la machine.
* AvalancheGo metrics API pour obtenir des informations sur le nœud.
* [Grafana](https://grafana.com/) pour visualiser les données sur un tableau de bord.

Conditions préalables :

* Un nœud AvalancheGo en cours d'exécution.
* Shell access à la mahcine exécutant le nœud.
* Privilèges d'administrateur sur la machine.

### **Mise en garde : Sécurité**

{% hint style="danger" %}
Le système décrit ici **ne doit pas être ouvert** à l'Internet public. Ni Prometheus ni Grafana, comme illustré ici, ne sont protégés contre les accès non autorisés. Assurez-vous que les deux ne sont accessibles que via un proxy sécurisé, un réseau local ou un VPN. Cette configuration dépasse le cadre de ce didacticiel, mais soyez prudent. De mauvaises pratiques de sécurité pourraient amener les attaquants à prendre le contrôle de votre nœud! Il est de votre responsabilité de suivre les bonnes pratiques de sécurité.
{% endhint %}

### Contributions

La base du tableau de bord Grafana a été tirée des gars de [ColmenaLabs](https://blog.colmenalabs.org/index.html), qui n'est apparemment plus disponible. Si vous avez des idées et des suggestions pour améliorer ce didacticiel, veuillez le dire, publier un problème ou faire une pull request sur [Github](https://github.com/ava-labs).

## Configurer Prometheus

Nous devons d'abord ajouter un compte d'utilisateur système et créer des répertoires \(vous aurez besoin des informations d'identification du superutilisateur\) :

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Ensuite, obtenez le lien vers la dernière version de Prometheus sur la [page de téléchargement](https://prometheus.io/download/) \(assurez-vous de sélectionner l'architecture de processeur appropriée\) et utilisez `wget` pour le télécharger, et `tar` pour décompresser l'archive :

```cpp
mkdir -p /tmp/prometheus && cd /tmp/prometheus
```

```cpp
wget https://github.com/prometheus/prometheus/releases/download/v2.21.0/prometheus-2.21.0.linux-amd64.tar.gz
```

```cpp
tar xvf prometheus-2.21.0.linux-amd64.tar.gz
```

```cpp
cd prometheus-2.21.0.linux-amd64
```

Ensuite, nous devons déplacer les binaires, définir la propriété et déplacer les fichiers de configuration vers les emplacements appropriés :

```cpp
sudo cp {prometheus,promtool} /usr/local/bin/
```

```cpp
sudo chown prometheus:prometheus /usr/local/bin/{prometheus,promtool}
```

```cpp
sudo chown -R prometheus:prometheus /etc/prometheus
```

```cpp
sudo chown prometheus:prometheus /var/lib/prometheus
```

```cpp
sudo cp -r {consoles,console_libraries} /etc/prometheus/
```

```cpp
sudo cp prometheus.yml /etc/prometheus/
```

`/etc/prometheus` est utilisé pour la configuration et `/var/lib/prometheus` pour les données.

Configurons Prometheus pour qu'il s'exécute en tant que service système. Faites :

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

Et entrez la configuration suivante :

```cpp
[Unit]
Description=Prometheus
Documentation=https://prometheus.io/docs/introduction/overview/
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus   --web.console.templates=/
etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries   --web.listen-address=0.0.0.0:9090   --web.external-url=

SyslogIdentifier=prometheus
Restart=always

[Install]
WantedBy=multi-user.target
```

Enregistrez le fichier. Nous pouvons maintenant exécuter Prometheus en tant que service système :

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus devrait maintenant fonctionner. Pour nous en assurer, nous pouvons vérifier avec :

```cpp
systemctl status prometheus
```

Ce qui devrait produire quelque chose comme :

```cpp
● prometheus.service - Prometheus
     Loaded: loaded (/etc/systemd/system/prometheus.service; enabled; vendor preset: enabled)
     Active: active (running) since Wed 2020-04-01 19:23:53 CEST; 5 months 12 days ago
       Docs: https://prometheus.io/docs/introduction/overview/
   Main PID: 1767 (prometheus)
      Tasks: 12 (limit: 9255)
     CGroup: /system.slice/prometheus.service
             └─1767 /usr/local/bin/prometheus --config.file=/etc/prometheus/prometheus.yml --storage.tsdb.path=/var/lib/prometheus --web.console.templa>

Sep 13 13:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:04.744Z caller=head.go:792 component=tsdb msg="Head GC completed" duration=13.6>
Sep 13 13:00:05 ubuntu prometheus[1767]: level=info ts=2020-09-13T11:00:05.263Z caller=head.go:869 component=tsdb msg="WAL checkpoint complete" first=9>
Sep 13 15:00:04 ubuntu prometheus[1767]: level=info ts=2020-09-13T13:00:04.776Z caller=compact.go:495 component=tsdb msg="write block" mint=15999912000>
...
```

Vous pouvez également vérifier l'interface Web de Prometheus, disponible sur `http://your-node-host-ip:9090/`

{% hint style="warning" %}
Vous devrez peut-être faire `sudo ufw allow 9090/tcp` si le pare-feu est activé\).
{% endhint %}

## Installez Grafana

Pour configurer les référentiels de Grafana avec Ubuntu :

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Pour installer Grafana :

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

Pour le configurer en tant que service :

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

Pour vous assurer qu'il fonctionne correctement :

```cpp
sudo systemctl status grafana-server
```

Cela devrait monter Grafan comme actif. Grafana devrait maintenant être disponible sur `http://your-node-host-ip:3000/`Connectez-vous avec le nom d'utilisateur / mot de passe admin / admin et configurez un nouveau mot de passe sécurisé. \*\* Nous devons maintenant connecter Grafana à notre source de données, Prometheus.

{% hint style="warning" %}
Vous devrez peut-être faire `sudo ufw allow 3000/tcp` si le pare-feu est activé.
{% endhint %}

Sur l'interface Web de Grafana :

* Accédez à Configuration dans le menu de gauche et sélectionnez "Data Sources".
* Cliquez sur "Add Data Source".
* Sélectionnez Prometheus.
* Dans le formulaire, entrez le nom \(Prometheus fera l'affaire\) et `http://localhost:9090` comme URL.
* Cliquez sur `Save & Test`
* Vérifiez que le message vert suivant apparait "Data source is working".

## Configurer node\_exporter

En plus des métriques d'AvalancheGo, mettons en place la surveillance de la machine elle-même, afin que nous puissions vérifier l'utilisation du processeur, de la mémoire, du réseau et du disque et être au courant de toute anomalie. Pour cela, nous utiliserons node\_exporter, un plugin Prometheus.

Obtenez la dernière version avec:

```cpp
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

{% hint style="info" %}
Changez linux-amd64 si vous avez une architecture différente \(RaspberryPi est linux-arm64, par exemple\).
{% endhint %}

Décompressez et déplacez l'exécutable :

```cpp
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
```

```cpp
node_exporter --version
```

Ensuite, nous ajoutons node\_exporter en tant que service. Faites :

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

Et remplissez le formulaire avec :

```cpp
[Unit]
Description=Prometheus
Documentation=https://github.com/prometheus/node_exporter
Wants=network-online.target
After=network-online.target

[Service]
Type=simple
User=prometheus
Group=prometheus
ExecReload=/bin/kill -HUP $MAINPID
ExecStart=/usr/local/bin/node_exporter \
    --collector.cpu \
    --collector.diskstats \
    --collector.filesystem \
    --collector.loadavg \
    --collector.meminfo \
    --collector.filefd \
    --collector.netdev \
    --collector.stat \
    --collector.netstat \
    --collector.systemd \
    --collector.uname \
    --collector.vmstat \
    --collector.time \
    --collector.mdadm \
    --collector.zfs \
    --collector.tcpstat \
    --collector.bonding \
    --collector.hwmon \
    --collector.arp \
    --web.listen-address=:9100 \
    --web.telemetry-path="/metrics"

[Install]
WantedBy=multi-user.target
```

Cela configure node\_exporter pour collecter diverses données que nous pourrions trouver intéressantes. Démarrez le service et activez-le au démarrage :

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

```cpp
sudo systemctl status node_exporter
```

Nous sommes maintenant prêts à tout lier ensemble.

## Configurer les tâches AvalancheGo et node\_exporter Prometheus

Assurez-vous que votre nœud AvalancheGo fonctionne avec les arguments de ligne de commande appropriés. L'API de métriques doit être activée \(par défaut, c'est le cas\). Si vous utilisez l'argument CLI `--http-host` pour effectuer des appels d'API depuis l'extérieur de la machine hôte, notez l'adresse à laquelle les API écoutent.

Nous devons maintenant définir un emploi Prometheus approprié. Modifions la configuration de Prometheus:

Faites :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

Et ajouter :

```cpp
  - job_name: 'avalanchego'
    metrics_path: '/ext/metrics'
    static_configs:
      - targets: ['<your-host-ip>:9650']

  - job_name: 'avalanchego-machine'
    static_configs:
      - targets: ['<your-host-ip>:9100']
        labels:
          alias: 'machine'
```

{% hint style="danger" %}
L'indentation est importante. Assurez-vous que -job\_name est aligné sur l'entrée existante -job\_name et que les autres lignes sont également correctement mises en retrait. Assurez-vous d'utiliser la bonne adresse IP d'hôte, ou localhost, en fonction de la configuration de votre nœud.
{% endhint %}

Enregistrez le fichier de configuration et redémarrez Prometheus :

```cpp
sudo systemctl restart prometheus
```

Vérifiez l'interface Web de Prometheus sur `http://your-node-host-ip:9090/targets`. Vous devriez voir trois cibles activées :

* Prometheus
* Avalanchego
* Avalanchego-machine

Ouvrez Grafana; vous pouvez maintenant créer un tableau de bord en utilisant l'une de ces sources. Vous pouvez également utiliser les tableaux de bord préconfigurés [\[ici\]](https://github.com/ava-labs/node-monitoring/tree/master/dashboards).

Pour importer le tableau de bord préconfiguré :

* Ouvrez l'interface Web de Grafana.
* Cliquez sur + dans la barre d'outils de gauche.
* Sélectionnez Import JSON, puis téléchargez le fichier JSON.

C'est tout ! Vous pouvez maintenant vous émerveiller de tout ce que fait votre nœud. Woohoo!

