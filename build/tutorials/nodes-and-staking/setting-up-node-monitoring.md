# Surveiller le nœud d'Avalanche

_Merci à la membre de la communauté Jovica Popović, qui a écrit ce tutoriel. Vous pouvez le joindre sur notre _[_Discord_](https://chat.avax.network) _au besoin._

## Introduction

Ce tutoriel suppose que vous avez Ubuntu 18.04 ou 20.04 et que vous utilisez votre nœud \(une version Mac OS X de ce tutoriel viendra plus tard\).

Ce tutoriel montrera comment configurer une infrastructure pour surveiller une instance [of](https://github.com/ava-labs/avalanchego) Nous utilisons:

* [Prometheus](https://prometheus.io/) et stocker des données
* [node\_exporter](https://github.com/prometheus/node_exporter) pour obtenir des informations sur la machine,
* L'API de [métriques](https://docs.avax.network/build/avalanchego-apis/metrics-api) AvalancheGo’s pour obtenir des informations sur le nœud
* [Grafana](https://grafana.com/) pour visualiser les données sur un tableau de bord.

Préalables:

* Un nœud AvalancheGo en cours d'exécution.
* Shell l'accès à la machine qui exécute le nœud
* Privilèges d'administrateur sur la machine

### **Caveat : Sécurité**

{% hint style="danger" %}Le système tel que décrit ici ne **doit pas **être ouvert à l'Internet public. Ni Prometheus ni Grafana comme montré ici n'est durci contre l'accès non autorisé. Assurez-vous que les deux d'entre eux ne sont accessibles que sur un proxy sécurisé, un réseau local ou un VPN. La configuration de cette mise en place est au-delà de la portée de ce tutoriel, mais faites preuve de prudence. De mauvaises pratiques de sécurité pourraient conduire à l'obtention du contrôle des attaquants sur votre nœud ! Il est votre responsabilité de suivre les pratiques de sécurité appropriées.{% endhint %}

### Contributions

La base pour le tableau de bord de Grafana a été tirée des bons gars de [ColmenaLabs](https://blog.colmenalabs.org/index.html), qui n'est apparemment plus disponible. Si vous avez des idées et des suggestions sur la manière d'améliorer ce tutoriel, veuillez le dire, publiez un problème, ou faites une demande de pull sur [Github](https://github.com/ava-labs).

## Définir Prometeus

Premièrement, nous devons ajouter un compte d'utilisateur du système et créer des répertoires \(vous aurez besoin de pièces d'identité des superutilisateurs\) :

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Obtenez les utilitaires nécessaires, au cas où ils ne sont pas déjà installés :

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

Ensuite, obtenez le lien vers la dernière version de Prometheus de la [page](https://prometheus.io/download/) de téléchargement \(assurez-vous de sélectionner l'architecture de processeur appropriée\) et utilisez wget pour le télécharger et le goudron pour décharger les archives :

```cpp
mkdir -p /tmp/prometheus && cd /tmp/prometheus
```

```cpp
wget https://github.com/prometheus/prometheus/releases/download/v2.25.0/prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
tar xvf prometheus-2.25.0.linux-amd64.tar.gz
```

```cpp
cd prometheus-2.25.0.linux-amd64
```

Ensuite, nous devons déplacer les binaires, configurer la propriété et déplacer les fichiers de config vers les emplacements appropriés :

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

`/etc/prometheus`est utilisé pour la configuration et pour `/var/lib/prometheus`les données.

configurons Prometheus pour fonctionner comme un service de système. Do\*\*\*\*:\*\*

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\) et entrez la configuration suivante :

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
ExecStart=/usr/local/bin/prometheus   --config.file=/etc/prometheus/prometheus.yml   --storage.tsdb.path=/var/lib/prometheus   --web.console.templates=/etc/prometheus/consoles   --web.console.libraries=/etc/prometheus/console_libraries   --web.listen-address=0.0.0.0:9090   --web.external-url=

SyslogIdentifier=prometheus
Restart=always

[Install]
WantedBy=multi-user.target
```

Enregistrer le fichier. Maintenant, nous pouvons exécuter Prometeus comme un service de système :

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus devrait maintenant être en cours. Pour nous assurer que nous pouvons vérifier avec :

```cpp
sudo systemctl status prometheus
```

qui devrait produire quelque chose de genre :

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

Vous pouvez également vérifier l'interface web de Prometeus, disponible sur`http://your-node-host-ip:9090/`

{% hint style="warning" %}Vous pouvez être obligé de le faire `sudo ufw allow 9090/tcp`si le pare-feu est sur \*\*. \*\*{% endhint %}

## Installer Grafana

Pour configurer les dépôts de projets de Grafana avec Ubuntu :

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

pour installer Grafana, :

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

Pour le configurer comme un service :

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

Pour s'assurer qu'il fonctionne correctement :

```text
sudo systemctl status grafana-server
```

`active`qui devrait montrer le grafana comme . Grafana devrait maintenant être disponible à l'adresse`http://your-node-host-ip:3000/`

{% hint style="warning" %}Vous pouvez être obligé de le faire `sudo ufw allow 3000/tcp`si le pare-feu est sur \*\*. \*\*{% endhint %}

Connectez-vous avec le nom d'utilisateur/mot de passe admin/admin et configurez un nouveau mot de passe sécurisé. Maintenant nous devons connecter Grafana à notre source de données, Prometheus.

Sur l'interface web de Grafana :

* Accédez à la configuration sur le menu du côté gauche et sélectionnez les sources de données.
* Cliquez sur la source de données
* Sélectionnez Prometeus.
* Dans le formulaire, entrez le nom \(Prometheus va le faire\) et `http://localhost:9090`comme l'URL.
* Cliquez`Save & Test`
* Vérifiez pour "La source de données est de travail" un message vert

## Définir node\_exporter

En plus des métriques from configurons une surveillance de la machine elle-même, afin de vérifier l'utilisation de CPU, de la mémoire, du réseau et du disque et d'être conscient de toutes anomalies. Pour cela, nous utiliserons that, un plugin Prometheus.

Obtenez la dernière version avec :

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

`linux-arm64`changer `linux-amd64`si vous avez une architecture différente \(RaspberryPi est par exemple\). Untar et déplacer l'exécutable :

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

Vérifiez qu'il est installé correctement avec :

```cpp
node_exporter --version
```

Ensuite, nous ajoutons node\_exporter en tant que service. Do: :

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\) et le populer avec :

```cpp
[Unit]
Description=Prometheus Node Exporter
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

Ceci configure node\_exporter pour collecter diverses données que nous pourrions trouver intéressant. Démarrez le service et l'activer sur le démarrage :

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

Encore une fois, nous vérifions que le service fonctionne correctement :

```cpp
sudo systemctl status node_exporter
```

Si vous voyez des messages comme `Ignoring unknown escape sequences`, vérifiez doublement que le contenu du fichier de service est correctement copié et qu'il n'y a pas de backslashs supplémentaires ou de nouvelles lignes supplémentaires. Corriger le cas échéant et redémarrer le service par la suite.

Maintenant, nous sommes prêts à le lier tous ensemble.

## Configurer les emplois AvalancheGo et node\_exporter Prometeus

Assurez-vous que votre nœud AvalancheGo est en cours d'exécution avec les [arguments](../../references/command-line-interface.md) de ligne de commande appropriés. L'API de métriques doit être activée \(par défaut, elle l'est\). Si vous utilisez l'argument CLI `--http-host`pour faire des appels API de l'extérieur de la machine d'hôte, notez l'adresse à laquelle les API écoutent

Nous devons maintenant définir un emploi Prometheus approprié. modifions la configuration de Prometheus :

Faire :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\) et append à la fin :

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

**L'indentation est **importante. Assurez-vous que soit alignée sur `-job_name`l'entrée `-job_name`existante, et d'autres lignes sont également convenablement dentelées. `localhost`Assurez-vous d'utiliser la bonne IP d'hôte ou , en fonction de la configuration de votre nœud .

Enregistrer le fichier de config et redémarrez Prometeus:

```cpp
sudo systemctl restart prometheus
```

Vérifiez l'interface web de Prometeus `http://your-node-host-ip:9090/targets`. Vous devriez voir trois cibles activées :

* Prometheus
* avalanchego
* avalanchego-machine

Assurez-vous que tous d'eux ont la `State`même chose.`UP`

Open Grafana; vous pouvez maintenant créer un tableau de bord en utilisant l'une de ces sources. Vous pouvez également utiliser [les tableaux de bord préconfigurés](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards).

Pour importer le tableau de bord préconfiguré :

* Interface web d'Open Grafana
* Cliquez sur `+`la barre d'outils de gauche.
* Sélectionnez `Import JSON`et puis téléchargez le fichier JSON ou collez le contenu dans la `Import via panel json`zone
* Sélectionner `Prometheus`comme source de données

C'est tout ! Vous pouvez maintenant vous émerveiller auprès de toutes les choses que votre nœud fait. Woohoo! !

