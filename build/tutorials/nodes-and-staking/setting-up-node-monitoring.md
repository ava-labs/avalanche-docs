# Monitor un nodo de Avalanche

_Gracias a la comunidad Jovica Popović, quien escribió este tutorial. Puedes llegar a él en nuestra_ [_Discordia_](https://chat.avax.network) _si es necesario._

## Introducción

Este tutorial asume que tiene Ubuntu 18.04 o 20.04 corriendo en su nodo \(una versión Mac OS X de este tutorial vendrá más tarde).

Este tutorial mostrará cómo configurar la infraestructura para monitorear una instancia de [AvalancheGo](https://github.com/ava-labs/avalanchego). Usaremos el tema:

* [Prometheus](https://prometheus.io/) para recopilar y almacenar datos
* [node\_exporter](https://github.com/prometheus/node_exporter) para obtener información sobre la máquina,
* [API](https://docs.avax.network/build/avalanchego-apis/metrics-api) de métricas de AvalancheGo’s para obtener información sobre el nodo
* [Grafana](https://grafana.com/) para visualizar datos en un tablero de control.

Requisitos previos:

* Un nodo de AvalancheGo
* Acceso a la máquina que ejecuta el nodo
* privilegios de administrador en la máquina

### **Cueva: Seguridad**

{% insinuar style="danger" %} El sistema tal como se describe aquí **no debe** abrirse a la Internet pública. Ni Prometheus ni Grafana, como se muestra aquí se endurece contra el acceso no autorizado. Asegúrese de que ambos sean accesibles solo a través de un proxy, una red local o una VPN. La configuración de esto está más allá del alcance de este tutorial, pero ejercitar precaución. Las malas prácticas de seguridad podrían llevar a los atacantes a obtener el control sobre su nodo! Es su responsabilidad seguir las prácticas de seguridad adecuadas. {% endhint %}

### Contribuciones

La base del tablero de Grafana fue tomada de los buenos chicos de [ColmenaLabs](https://blog.colmenalabs.org/index.html), que aparentemente ya no está disponible. Si tiene ideas y sugerencias sobre cómo mejorar este tutorial, por favor dilo, publique un problema, o haga una solicitud de tirón en [Github](https://github.com/ava-labs).

## Configure Prometheus

Primero, necesitamos agregar una cuenta de usuario del sistema y crear directorios \(necesitará credenciales de superusuario\):

```cpp
sudo useradd -M -r -s /bin/false prometheus
```

```cpp
sudo mkdir /etc/prometheus /var/lib/prometheus
```

Obtenga las utilidades necesarias, en caso de que no estén instaladas:

```cpp
sudo apt-get install -y apt-transport-https
```

```cpp
sudo apt-get install -y software-properties-common wget
```

A continuación, obtenga el enlace a la última versión de Prometheus de la [página](https://prometheus.io/download/) de descargas \(asegúrese de seleccionar la arquitectura de procesador apropiada\), y utilice wget para descargarlo y tar para desempacar el archivo:

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

A continuación, necesitamos mover los binarios, establecer la propiedad y mover archivos de config a las ubicaciones apropiadas:

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

`/etc/Prometheus` se utiliza para la configuración, y `/var/lib/Prometheus` para los datos.

Vamos a configurar Prometheus para funcionar como un servicio de sistema. Do****:**

```cpp
sudo nano /etc/systemd/system/prometheus.service
```

\(o abra ese archivo en el editor de texto de su elección\), e ingrese la siguiente configuración:

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

Guarda el archivo. Ahora, podemos ejecutar Prometheus como un servicio de sistema:

```cpp
sudo systemctl daemon-reload
```

```cpp
sudo systemctl start prometheus
```

```cpp
sudo systemctl enable prometheus
```

Prometheus debería estar corriendo. Para asegurarnos de que podemos comprobar con:

```cpp
sudo systemctl status prometheus
```

que debería producir algo como:

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

{% insinuar style="warning" %} Puede que necesite hacer `sudo ufw permita 9090/tcp` si el firewall está en**. ** {% endhint %}

## Instalar Grafana

Para configurar repositorios de proyectos Grafana con Ubuntu:

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

Para asegurarse de que se está ejecutando correctamente:

```text
sudo systemctl status grafana-server
```

que debe mostrar el grafana como `activa`. Grafana debería estar ahora disponible en `http://your-node-host-ip:3000/`

{% insinuar style="warning" %} Es posible que necesite hacer `sudo ufw permita 3000/tcp` si el firewall está en**. ** {% endhint %}

Inicia sesión con el nombre de usuario/contraseña admin/admin y establece una contraseña nueva y segura. Ahora necesitamos conectar Grafana a nuestra fuente de datos, Prometheus.

En la interfaz web de Grafana’s

* Vaya a Configuración en el menú de la izquierda y seleccione Fuentes de Datos.
* Haga clic en Agregar fuente de datos
* Seleccione Prometheus.
* En el formulario, ingrese el nombre \(Prometheus do\), y `http://localhost:9090` como URL.
* Haga clic `en Guardar y probar`
* Comprueba el mensaje verde "fuente de datos está funcionando".

## Configurar node\_exporter

Además de las métricas de AvalancheGo, configuremos el monitoreo de la máquina misma, para que podamos comprobar el uso de CPU, memoria, red y disco y ser conscientes de cualquier anomalía. Para eso, usaremos node\_exporter, un plugin Prometheus.

Obtenga la última versión con:

```text
curl -s https://api.github.com/repos/prometheus/node_exporter/releases/latest | grep browser_download_url | grep linux-amd64 |  cut -d '"' -f 4 | wget -qi -
```

cambiar `linux-amd64` si tienes una arquitectura diferente \(RaspberryPi es `linux-arm64`, por ejemplo\). Untar y mover el ejecutable:

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

Luego añadimos node\_exporter como servicio. Há:

```cpp
sudo nano /etc/systemd/system/node_exporter.service
```

\(o abra ese archivo en el editor de texto de su elección\) y poblarlo con:

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

Esto configura node\_exporter para recopilar varios datos que podríamos encontrar interesantes. Inicie el servicio y active el arranque:

```cpp
sudo systemctl start node_exporter
```

```cpp
sudo systemctl enable node_exporter
```

De nuevo, comprobamos que el servicio se está ejecutando correctamente:

```cpp
sudo systemctl status node_exporter
```

Si ves mensajes como `Ignorar secuencias de escape` desconocidas, doble verificación de que el contenido del archivo de servicio se copie correctamente y no hay backslashes adicionales o nuevas líneas. Corregir si es necesario y reiniciar el servicio después.

Ahora, estamos listos para atarlo todo juntos.

## Configurar los trabajos de AvalancheGo y node\_exporter Prometheus

Asegúrese de que su nodo AvalancheGo se está ejecutando con argumentos apropiados [de línea](../../references/command-line-interface.md) de comandos. La API de métricas debe estar activada \(por defecto, es \). Si utiliza el argumento CLI `--http-host` para hacer llamadas de API desde fuera de la máquina host, tome nota de la dirección en la que escuchan las API.

Ahora necesitamos definir un trabajo apropiado de Prometheus. Editemos la configuración de Prometheus:

Há:

```cpp
sudo nano /etc/prometheus/prometheus.yml
```

\(o abra ese archivo en el editor de texto de su elección\) y adjunte al final:

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

**La indentación es importante**. Asegúrese `de que` -job_name se alinee verticalmente con la entrada `-job_name` existente, y otras líneas también están indented correctamente. Asegúrate de usar el IP de host correcto o `localhost`, dependiendo de cómo se configure tu nodo.

Guarda el archivo de configuración y reinicie Prometheus:

```cpp
sudo systemctl restart prometheus
```

Compruebe la interfaz web de Prometheus en `http://your-node-host-ip:9090/mets`. Usted debe ver tres objetivos habilitados:

* Prometeo
* avalanchego
* máquinas de avalanchego-machine

Asegúrate de que todos ellos tengan `Estado` como `UP`.

Abra Grafana; ahora puede crear un tablero de mando utilizando cualquiera de esas fuentes. También puede utilizar [los tableros preconfigurados](https://github.com/ava-labs/avalanche-docs/tree/master/dashboards).

Para importar el tablero preconfigurado:

* Abra la interfaz web de Grafana’s
* Haga clic en `+` en la barra de herramientas izquierda
* Seleccione `Importar JSON` y luego suba el archivo JSON o pegue el contenido en `Importar a través del área json del panel`
* Seleccione `Prometheus` como fuente de datos

¡Eso es todo! Ahora puedes maravillarte con todas las cosas que tu nodo hace. ¡Woohoo!

