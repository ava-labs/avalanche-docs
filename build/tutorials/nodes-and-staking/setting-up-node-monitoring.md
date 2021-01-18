# Ejecutar una Monitorización de Nodos de Avalanche

Gracias al miembro de la comunidad Jovica Popović, que escribió este tutorial. Puedes contactarlo en nuestro [_Discord_](https://chat.avax.network) _si lo necesitas._

## Introducción

Este tutorial asume que tienes Ubuntu 18.04 o 20.04 funcionando en tu nodo \(una version de este tutorial para Mac OS X vendrá pronto\).

Este tutorial mostrará cómo crear una infraestructura para supervisar una instancia de [AvalancheGo](https://github.com/ava-labs/avalanchego). Usaremos:

* [Prometheus](https://prometheus.io/) para reunir y almacenar datos
* [node\_exporter](https://github.com/prometheus/node_exporter) para obtener información sobre la máquina,
* AvalancheGo’s [metrics API](https://docs.avax.network/v1.0/en/api/metrics/) para obtener información sobre el nodo
* [Grafana](https://grafana.com/) para visualizar los datos en un tablero.

Prerequisitos:

* Un nodo activo de AvalancheGo
* Acceso a la máquina que ejecuta el nodo 
* Privilegios de administrador en la máquina

### **Seguridad**

{% hint style="danger" %}
El sistema descrito aquí **no debería** abrirse a la Internet pública. Ni Prometheus ni Grafana, como se muestra aquí, están protegidos contra el acceso no autorizado. Asegúrate de que ambos son accesibles sólo a través de un proxy seguro, red local o VPN. Configurar eso está fuera del alcance de este tutorial, pero tenga cuidado. ¡Las malas prácticas de seguridad podrían llevar a los atacantes a obtener el control de su nodo! Es su responsabilidad seguir las prácticas de seguridad adecuadas.
{% endhint %}

### Contribuciones

La base del tablero de Grafana fue tomada de los chicos de [ColmenaLabs](https://blog.colmenalabs.org/index.html), que aparentemente ya no está disponible. Si tienes ideas y sugerencias para mejorar este tutorial, por favor dilo, publica un issue, o haz una a pull request en [Github](https://github.com/ava-labs).

## Configurando Prometheus

Primero, tenemos que añadir una cuenta de usuario del sistema y crear directorios \(necesitaras acceso de superusuario \):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

A continuación, obtén el enlace a la última versión de Prometeo de la [página de descargas](https://prometheus.io/download/) \(asegúrese de seleccionar la arquitectura de procesador apropiada\), y usa wget para descargarlo y tar para desempaquetar el archivo:

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

A continuación, tenemos que mover los binarios, establecer la propiedad y mover los archivos de configuración a las ubicaciones apropiadas:

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

`/etc/prometheus` is used for configuration, and `/var/lib/prometheus` for data.

Preparemos Prometheus para que funcione como un servicio del sistema. Ejecuta **:**

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(o abre ese archivo en el editor de texto de tu elección\), e introduce la siguiente configuración:

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

Save the file. Now, we can run Prometheus as a system service:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus debería estar corriendo ahora. Para asegurarnos, podemos comprobarlo con:

```cpp
systemctl status prometheus
```

el cual debería producir algo como:

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

También puede consultar la interfaz web de Prometheus, disponible en `http://your-node-host-ip:9090/`

{% hint style="warning" %}
You may need to do `sudo ufw allow 9090/tcp` if the firewall is on **.**
{% endhint %}

## Instalando Grafana

Para establecer los repositorios del proyecto Grafana con Ubuntu:

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

Para instalar Grafana:

```cpp
sudo apt-get update
```

```cpp
sudo apt-get install grafana
```

Para configurarlo como un servicio:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start grafana-server
```

```cpp
sudo systemctl enable grafana-server.service
```

Para asegurarnos de que se esté ejecutando apropiadamente:

```text
sudo systemctl status grafana-server
```

el cual debería mostrar grafana como `active`. Grafana debería estar ahora disponible en `http://your-node-host-ip:3000/`

{% hint style="warning" %}
Quizas necesites ejecutar `sudo ufw allow 3000/tcp` si el firewall está encendido **.**
{% endhint %}

Inicia sesión con el nombre de usuario/contraseña admin/admin y establece una nueva contraseña segura. Ahora necesitamos conectar a Grafana con nuestra fuente de datos, Prometheus.

En la Interfaz web de Grafana:

* Ir a Configuración en el menú de la izquierda y seleccionar Data Sources.
* Haga clic en Add Data Source
* Selecciona Prometheus.
* En el formulario, introduzca el nombre \(Prometheus lo hará\), y`http://localhost:9090` como la URL.
* Haga clic en `Save & Test`
* Check for “Data source is working” green message.

## Set up node\_exporter

In addition to metrics from AvalancheGo, let’s set up up monitoring of the machine itself, so we can check CPU, memory, network and disk usage and be aware of any anomalies. For that, we will use node\_exporter, a Prometheus plugin.

Get the latest version with:

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

change `linux-amd64` if you have a different architecture \(RaspberryPi is `linux-arm64`, for example\). Untar and move the executable:

```cpp
tar xvf node_exporter-1.0.1.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.0.1.linux-amd64/node_exporter /usr/local/bin
```

```cpp
node_exporter --version
```

Then we add node\_exporter as a service. Do:

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(or open that file in the text editor of your choice\) and populate it with:

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

This configures node\_exporter to collect various data we might find interesting. Start the service, and enable it on boot:

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

```cpp
sudo systemctl status node_exporter
```

Now, we’re ready to tie it all together.

## Configure AvalancheGo and node\_exporter Prometheus jobs

Make sure that your AvalancheGo node is running with appropriate [command line arguments](../../references/command-line-interface.md). The metrics API must be enabled \(by default, it is\). If you use CLI argument `--http-host` to make API calls from outside of the host machine, make note of the address at which APIs listen.

We now need to define an appropriate Prometheus job. Let’s edit Prometheus configuration:

Do :

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(or open that file in the text editor of your choice\) and append to the end:

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

**Indentation is important**. Make sure `-job_name` is aligned with existing `-job_name entry`, and other lines are also indented properly. Make sure you use the correct host IP, or `localhost`, depending on how your node is configured.

Save the config file and restart Prometheus:

```cpp
sudo systemctl restart prometheus
```

Check Prometheus web interface on `http://your-node-host-ip:9090/targets`. You should see three targets enabled:

* Prometheus
* avalanchego
* avalanchego-machine

Open Grafana; you can now create a dashboard using any of those sources. You can also use [the preconfigured dashboards](https://github.com/ava-labs/node-monitoring/tree/master/dashboards).

To import the preconfigured dashboard:

* Open Grafana’s web interface
* Click `+` on the left toolbar
* Select `Import JSON` and then upload the JSON file

That’s it! You may now marvel at all the things your node does. Woohoo!

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTcyNjU0OTMyOSwtMTAyMzAwNDAzMCwtOT
A2NTI4OTEwLDQwOTI4MTU2M119
-->