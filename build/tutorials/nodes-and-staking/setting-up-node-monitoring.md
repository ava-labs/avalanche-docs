# Ejecuta una monitorización de nodos de Avalanche

_Gracias a la comunidad Jovica Popović, que escribió este tutorial. Puedes alcanzarlo en nuestro _[_Discord_](https://chat.avax.network) _si es necesario._

## Introducción

Este tutorial asume que tienes Ubuntu 18.04 o 20.04 funcionando en tu nodo \(una version de este tutorial para Mac OS X vendrá pronto\).

Este tutorial mostrará cómo crear infraestructura para monitorear una instancia de [AvalancheGo](https://github.com/ava-labs/avalanchego). Usaremos:

* [Prometheus](https://prometheus.io/) para recopilar y almacenar datos
* [node\_exporter](https://github.com/prometheus/node_exporter) para obtener información sobre la máquina,
* [API](https://docs.avax.network/build/avalanchego-apis/metrics-api) de métricas de AvalancheGO para obtener información sobre el nodo
* [Grafana](https://grafana.com/) para visualizar datos en un tablero de datos.

Requisitos Previos:

* Un nodo activo de AvalancheGo
* Acceso a la máquina que ejecuta el nodo
* Privilegios de administrador en la máquina

### **Caveat: Seguridad**

{% hint style="danger" %}El sistema descrito aquí no **debería **ser abierto al Internet público. Ni Prometheus ni Grafana, como se muestra aquí, están protegidos contra el acceso no autorizado. Asegúrate de que ambos son accesibles sólo a través de un proxy seguro, red local o VPN. Configurar eso está fuera del alcance de este tutorial, pero ten cuidado. ¡Las malas prácticas de seguridad podrían llevar a los atacantes a obtener el control de tu nodo! Es tu responsabilidad seguir las prácticas de seguridad adecuadas.{% endhint %}

### Contribuciones

La base para el tablero de Grafana fue tomada de los buenos chicos en [ColmenaLabs](https://blog.colmenalabs.org/index.html), que aparentemente no está disponible más. Si tienes ideas y sugerencias sobre cómo mejorar este tutorial, por favor dilo, publica un problema o haz una petición de tire en [Github](https://github.com/ava-labs).

## Configurando Prometheus

Primero, tenemos que añadir una cuenta de usuario del sistema y crear directorios \(necesitaras acceso de superusuario\):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Obtén las utilidades necesarias, en caso de que no estén ya instaladas:

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

Siguiente, consigue el enlace a la última versión de Prometheus desde la [página](https://prometheus.io/download/) de descargas \(asegurate de que selecciona la arquitectura de procesador apropiado\), y usa wget para descargarla y to para desempacar el archivo:

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

`/etc/prometheus`se utiliza para la configuración y `/var/lib/prometheus`para los datos.

Preparemos Prometheus para que funcione como un servicio del sistema. Do\*\*:\*\*

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(O abre ese archivo en el editor de texto de tu elección\), e introduce la siguiente configuración:

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

Guarde el archivo. Ahora, podemos ejecutar Prometheus como un servicio del sistema:

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
sudo systemctl status prometheus
```

El cual debería producir algo como:

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

También puedes comprobar la interfaz web de Prometheus, disponible en`http://your-node-host-ip:9090/`

{% hint style="warning" %}Puede que tengas que hacer `sudo ufw allow 9090/tcp`si el cortafuegos está en\*\*. \*\*{% endhint %}

## Instalando Grafana

Para establecer los repositorios del proyecto Grafana con Ubuntu:

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

`active`que debería mostrar grafana como Grafana debería ahora estar disponible en`http://your-node-host-ip:3000/`

{% hint style="warning" %}Puede que tengas que hacer `sudo ufw allow 3000/tcp`si el cortafuegos está en\*\*. \*\*{% endhint %}

Inicia sesión con el nombre de usuario/contraseña admin/admin y establece una nueva contraseña segura. Ahora necesitamos conectar a Grafana con nuestra fuente de datos, Prometheus.

En la Interfaz web de Grafana:

* Ve a la Configuración en el menú de la izquierda y seleccionar Data Sources.
* Haz clic en Add Data Source
* Selecciona Prometheus.
* En la forma, introduce el nombre \(Prometheus lo hará\) y `http://localhost:9090`como la URL.
* Haga`Save & Test`
* Consulta para el mensaje verde de "Data

## Configurando node\_exporter

Además de las métricas de AvalancheGo, establezcamos un monitoreo de la máquina misma, para poder comprobar el uso de la CPU, la memoria, la red y el disco y estar al tanto de cualquier anomalía. Para ello, usaremos node\_exporter, un plugin de Prometheus.

Consigue la última versión con:

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

cambio `linux-amd64`si tienes una arquitectura diferente \(RaspberryPi es , `linux-arm64`por ejemplo\). Untar y mover el ejecutable:

```cpp
tar xvf node_exporter-1.1.2.linux-amd64.tar.gz
```

```cpp
sudo mv node_exporter-1.1.2.linux-amd64/node_exporter /usr/local/bin
```

Compruebe que se instala correctamente con:

```cpp
node_exporter --version
```

Entonces añadimos node\_exporter como un servicio. Ejecuta :

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(O abre ese archivo en el editor de texto de su elección\) y rellénalo con:

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

Esto configura node\_exporter para recolectar varios datos que podríamos encontrar interesantes. Inicia el servicio, y habilítalo en el arranque:

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

Una vez más, comprobamos que el servicio se está ejecutando correctamente:

```cpp
sudo systemctl status node_exporter
```

Si ves mensajes como `Ignoring unknown escape sequences`, comprueba que el contenido del archivo de servicio se copia correctamente y no hay copias de seguridad adicionales o nuevas adicionales. Correcta si es necesario y reinicia el servicio después.

Ahora, estamos listos para unirlo todo.

## Configurando los Trabajos de AvalancheGo y Prometheus node\_exporter

Asegúrate de que tu nodo de AvalancheGo se esté ejecutando con [argumentos](../../references/command-line-interface.md) de línea de comandos apropiados. La métrica API debe estar habilitada \(la cual está habilitada por defecto\). Si usas el argumento CLI `--http-host`para hacer llamadas de API desde fuera de la máquina de host, toma nota de la dirección en la que escuchan las API.

Ahora tenemos que definir un trabajo apropiado para Prometheus. Editamos la configuración de Prometheus:

Ejecuta:

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(O abre ese archivo en el editor de texto de su elección\) y añádelo al final:

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

**La indentación es **importante. `-job_name`Asegúrate de estar alineado verticalmente con la entrada `-job_name`existente, y otras líneas también están cenadas correctamente. `localhost`Asegúrate de usar la IP de host correcta, o dependiendo de cómo se configure tu nodo.

Guarda el config file y reinicia Prometheus:

```cpp
sudo systemctl restart prometheus
```

`http://your-node-host-ip:9090/targets`Consulta la interfaz web de Prometheus Debería ver tres objetivos habilitados:

* Prometheus
* avalanchego
* avalanchego-machine

Asegúrate de que todas tengan `State`como .`UP`

Abre Grafana; ahora puedes crear un tableros usando cualquiera de esas fuentes. También puedes usar [los dashboards preconfigurados](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards)

Para importar el tablero pre-configurado:

* Abre la interfaz web de Grafana
* Haz clic en la barra `+`de herramientas izquierda
* Selecciona `Import JSON`y luego sube el archivo JSON o pega el contenido en la `Import via panel json`zona
* Selecciona como fuente `Prometheus`de datos

¡Eso es todo! Ahora puedes maravillarte de todas las cosas que hace tu nodo. ¡Woohoo!

