# Surveiller le nœud avalanche

_Merci à la membre de la communauté Jovica Popović, qui a écrit ce tutoriel. Vous pouvez le rejoindre sur notre_ [_Discorde_](https://chat.avax.network) _si nécessaire._

## Introduction

Ce tutoriel suppose que vous avez Ubuntu 18.04 ou 20.04 fonctionnant sur votre noeud \(une version Mac OS X de ce tutoriel viendra plus tard\).

Ce tutoriel montrera comment configurer l'infrastructure pour surveiller une instance [of](https://github.com/ava-labs/avalanchego) Nous utiliserons :

* [Prometheus](https://prometheus.io/) pour recueillir et stocker des données
* [node\_exporter](https://github.com/prometheus/node_exporter) pour obtenir des informations sur la machine,
* [API de paramètres](https://docs.avax.network/build/avalanchego-apis/metrics-api) AvalancheGo’s pour obtenir des informations sur le noeud
* [Grafana](https://grafana.com/) pour visualiser les données sur un tableau de bord.

Préalables :

* Un noeud AvalancheGo
* L'accès Shell à la machine exécutant le noeud
* Privilèges administrateur sur la machine

### **Caveat: Sécurité**

{% allusion style="danger,%} Le système tel que décrit ici **ne devrait pas** être ouvert à l'internet public. Ni Prometheus ni Grafana comme montré ici n'est durci contre l'accès non autorisé. Assurez-vous que les deux sont accessibles uniquement sur un proxy sécurisé, un réseau local ou un VPN. La configuration de cette mise en place est au-delà de la portée de ce tutoriel, mais faire preuve de prudence. Mauvaises pratiques de sécurité pourraient conduire à des assaillants à prendre le contrôle sur votre nœud ! Il est votre responsabilité de suivre les pratiques de sécurité appropriées. {% endhint %}

### Contributions

La base du tableau de bord Grafana a été tirée des bons gars de [ColmenaLabs](https://blog.colmenalabs.org/index.html), qui n'est apparemment plus disponible. Si vous avez des idées et des suggestions sur la façon d'améliorer ce tutoriel, veuillez le dire, poster un problème, ou faire une demande de traction sur [Github](https://github.com/ava-labs).

## Configuration Prometheus

Premièrement, nous devons ajouter un compte utilisateur du système et créer des répertoires \(vous aurez besoin de données d'identification des superutilisateurs\):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Obtenez les utilitaires nécessaires, au cas où ils ne sont pas déjà installés:

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

Ensuite, obtenez le lien vers la dernière version de Prometheus de la [page](https://prometheus.io/download/) de téléchargements \(assurez-vous que vous sélectionnez l'architecture du processeur appropriée\), et utilisez wget pour le télécharger et goudron pour décompresser l'archive :

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

Ensuite, nous devons déplacer les binaires, définir la propriété et déplacer les fichiers de configuration aux endroits appropriés:

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

`/etc/prometheus` est utilisé pour la configuration, et `/var/lib/prometheus` pour les données.

Mettons en place Prometheus pour fonctionner comme un service système. Do**:**

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\), et entrez la configuration suivante:

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

Sauvegardez le fichier. Maintenant, nous pouvons exécuter Prometheus comme un service système:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus devrait maintenant être en cours. Pour nous assurer, nous pouvons vérifier avec:

```cpp
sudo systemctl status prometheus
```

qui devrait produire quelque chose comme:

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

Vous pouvez également vérifier l'interface Prometheus, disponible sur `http://votre-node-host-ip:9090/`

{% allusion style="warning" %} Vous pourriez avoir besoin de faire `sudo ufw autoriser 9090/tcp` si le pare-feu est sur**. ** {% endhint %}

## Installer Grafana

Pour configurer les dépôts de projet Grafana avec Ubuntu:

```cpp
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
```

```cpp
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

Pour installer Grafana:

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

Pour le configurer comme un service:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

Pour s'assurer qu'il fonctionne correctement:

```text
sudo systemctl status grafana-server
```

qui devrait montrer la grafana comme `active`. Grafana devrait maintenant être disponible à l'adresse `http://your-node-host-ip:3000/`

{% allusion style="warning" %} Vous pourriez avoir besoin de faire `sudo ufw autoriser 3000/tcp` si le pare-feu est sur**. ** {% endhint %}

Connectez-vous avec nom d'utilisateur/mot de passe admin/admin et configurez un nouveau mot de passe sécurisé. Maintenant, nous devons connecter Grafana à notre source de données, Prometheus.

Sur l'interface web de Grafana:

* Allez à Configuration dans le menu gauche et sélectionnez Sources de données.
* Cliquez sur Ajouter la source de données
* Sélectionnez Prometheus.
* Dans la forme, entrez le nom \(Prometheus will do\), et `http://localhost:9090` comme l'URL.
* Cliquez `sur Enregistrer et tester`
* Vérifiez pour "La source de données fonctionne" message vert.

## Configuration node\_exporter

En plus des mesures from nous allons configurer la surveillance de la machine elle-même, afin que nous puissions vérifier l'utilisation du CPU, de la mémoire, du réseau et du disque et être conscient de toutes les anomalies. Pour cela, nous allons utiliser that, un plugin Prometheus.

Obtenez la dernière version avec:

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

changer `linux-amd64` si vous avez une architecture différente \(Raspberrypi est `linux-arm64`, par exemple\). Untar et déplacer l'exécutable:

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

Vérifiez qu'il est installé correctement avec:

```cpp
node_exporter --version
```

Ensuite, nous ajoutons node\_exporter comme un service. Do:

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\) et le remplir avec:

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

Cette configuration node\_exporter pour collecter diverses données que nous pourrions trouver intéressant. Démarrer le service et l'activer sur le démarrage:

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

Encore une fois, nous vérifions que le service fonctionne correctement:

```cpp
sudo systemctl status node_exporter
```

Si vous voyez des messages tels que `Ignorer les séquences d'échappement inconnues`, vérifiez deux fois que le contenu du fichier de service est correctement copié et qu'il n'y a pas de backslashes supplémentaires ou de nouvelles lignes. Corriger le cas échéant et redémarrer le service après-midi.

Maintenant, nous sommes prêts à tout lier ensemble.

## Configurer AvalancheGo et node\_exporter Prometheus emplois

Assurez-vous que votre noeud AvalancheGo fonctionne avec [les arguments appropriés de la ligne de commande](../../references/command-line-interface.md). L'API de paramètres doit être activée \(par défaut, elle est\). Si vous utilisez l'argument CLI `--http-host` pour faire des appels API depuis l'extérieur de la machine hôte, notez l'adresse à laquelle APIS écoutent.

Nous devons maintenant définir un travail approprié Prometheus. Éditions la configuration Prometheus :

Faites :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(ou ouvrez ce fichier dans l'éditeur de texte de votre choix\) et append the end :

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

**L'indentation est importante**. Assurez-vous que `-job_name` est aligné verticalement avec l'entrée existante `-job_name,` et d'autres lignes sont également indentées correctement. Assurez-vous d'utiliser l'IP hôte correcte, ou `localhost`, selon la configuration de votre nœud .

Enregistrer le fichier de configuration et redémarrer Prometheus:

```cpp
sudo systemctl restart prometheus
```

Vérifiez l'interface web Prometheus sur `http://your-node-host-ip:9090/cibles`. Vous devriez voir trois cibles activées :

* Prometheus
* avalanchego
* avalanchego-machine

Assurez-vous que tous ont `l'état` comme `UP`.

Open Grafana; vous pouvez maintenant créer un tableau de bord à l'aide de l'une de ces sources. Vous pouvez également utiliser [les tableaux de bord préconfigurés](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards).

Pour importer le tableau de bord préconfiguré:

* Ouvrir l'interface web de Grafana
* Cliquez `+` sur la barre d'outils de gauche
* Sélectionnez `Importer JSON` puis télécharger le fichier JSON ou coller le contenu dans `Importer via la zone json du panneau`
* Sélectionnez `Prometheus` comme source de données

C'est ça! Vous pouvez maintenant vous émerveiller de toutes les choses que votre noeud fait. Woohoo!

