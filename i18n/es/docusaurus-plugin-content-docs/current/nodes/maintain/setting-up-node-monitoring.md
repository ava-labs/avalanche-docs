---
tags: [Nodos]
description: Este tutorial demuestra cómo configurar la infraestructura para monitorear una instancia de AvalancheGo.
sidebar_label: Monitoreo
pagination_label: Monitorear un Nodo Avalanche
sidebar_position: 2
---

# Monitorear un Nodo Avalanche

## Introducción

Este tutorial demuestra cómo configurar la infraestructura para monitorear una instancia de
[AvalancheGo](https://github.com/ava-labs/avalanchego). Utilizaremos:

- [Prometheus](https://prometheus.io/) para recopilar y almacenar datos
- [`node_exporter`](https://github.com/prometheus/node_exporter) para obtener información sobre la máquina,
- La API de métricas de AvalancheGo (/reference/avalanchego/metrics-api.md) para obtener información sobre el nodo
- [Grafana](https://grafana.com/) para visualizar los datos en un panel de control.
- Un conjunto de paneles de control predefinidos de Avalanche [Avalanche dashboards](https://github.com/ava-labs/avalanche-monitoring/tree/main/grafana/dashboards)

Requisitos previos:

- Un nodo AvalancheGo en funcionamiento
- Acceso a la shell de la máquina que ejecuta el nodo
- Privilegios de administrador en la máquina

Este tutorial asume que tienes Ubuntu 20.04 ejecutándose en tu nodo. Otras distribuciones de Linux que utilizan `systemd` para ejecutar servicios y `apt-get` para la gestión de paquetes podrían funcionar, pero no se han probado. Un miembro de la comunidad ha informado que funciona en Debian 10, y podría funcionar en otras versiones de Debian también.

### Advertencia: Seguridad

:::danger

El sistema descrito aquí **no debe** abrirse a Internet público. Ni Prometheus ni Grafana, tal como se muestran aquí, están protegidos contra el acceso no autorizado. Asegúrate de que ambos sean accesibles solo a través de un proxy seguro, una red local o una VPN. Configurar eso está fuera del alcance de este tutorial, pero ten cuidado. ¡Prácticas de seguridad deficientes podrían permitir que los atacantes tomen el control de tu nodo! Es tu responsabilidad seguir las prácticas de seguridad adecuadas.

:::

## Script de instalación del monitor

Para facilitar la instalación del monitoreo del nodo, hemos creado un script que hace la mayor parte del trabajo por ti. Para descargar y ejecutar el script, inicia sesión en la máquina en la que se ejecuta el nodo con un usuario que tenga privilegios de administrador e ingresa el siguiente comando:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-monitoring/main/grafana/monitoring-installer.sh ;\
chmod 755 monitoring-installer.sh;
```

Esto descargará el script y lo hará ejecutable.

El propio script se ejecuta varias veces con diferentes argumentos, cada uno instalando una herramienta diferente o parte del entorno. Para asegurarte de que se descargó y configuró correctamente, comienza ejecutando:

```bash
./monitoring-installer.sh --help
```

Debería mostrar:

```text
Uso: ./monitoring-installer.sh [--1|--2|--3|--4|--5|--help]

Opciones:
--help   Muestra este mensaje
--1      Paso 1: Instala Prometheus
--2      Paso 2: Instala Grafana
--3      Paso 3: Instala node_exporter
--4      Paso 4: Instala paneles de control de Grafana para AvalancheGo
--5      Paso 5: (Opcional) Instala paneles de control adicionales

Si se ejecuta sin ninguna opción, el script descargará e instalará la última versión de los paneles de control de AvalancheGo.
```

¡Empecemos!

## Paso 1: Configurar Prometheus <a id="prometheus"></a>

Ejecuta el script para ejecutar el primer paso:

```bash
./monitoring-installer.sh --1
```

Debería producir una salida similar a esta:

```text
Instalador de monitoreo de AvalancheGo
--------------------------------
PASO 1: Instalando Prometheus

Comprobando el entorno...
Se encontró la arquitectura arm64...
Se encontró el archivo de instalación de Prometheus:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
Intentando descargar:
https://github.com/prometheus/prometheus/releases/download/v2.31.0/prometheus-2.31.0.linux-arm64.tar.gz
prometheus.tar.gz                           100%[=========================================================================================>]  65.11M   123MB/s    in 0.5s
2021-11-05 14:16:11 URL:https://github-releases.githubusercontent.com/6838921/a215b0e7-df1f-402b-9541-a3ec9d431f76?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T141610Z&X-Amz-Expires=300&X-Amz-Signature=72a8ae4c6b5cea962bb9cad242cb4478082594b484d6a519de58b8241b319d94&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=6838921&response-content-disposition=attachment%3B%20filename%3Dprometheus-2.31.0.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [68274531/68274531] -> "prometheus.tar.gz" [1]
...
```

Es posible que se te solicite confirmar la instalación de paquetes adicionales, hazlo si se te pide. La ejecución del script debería terminar con instrucciones sobre cómo verificar que Prometheus se instaló correctamente. Hagamos eso, ejecuta:

```bash
sudo systemctl status prometheus
```

Debería mostrar algo como:

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

Observa el estado `active (running)` (presiona `q` para salir). También puedes verificar la interfaz web de Prometheus, disponible en `http://la-ip-de-tu-nodo:9090/`

:::warning

Es posible que necesites hacer `sudo ufw allow 9090/tcp` si el firewall está activado y/o ajustar la configuración de seguridad para permitir conexiones al puerto 9090 si el nodo se está ejecutando en una instancia en la nube. Para AWS, puedes consultarlo
[aquí](/nodes/run/third-party/aws-node.md#f8df).
Si está en Internet público, ¡asegúrate de permitir solo que tu IP se conecte!

:::

Si todo está bien, pasemos al siguiente paso.

## Paso 2: Instalar Grafana <a id="grafana"></a>

Ejecuta el script para ejecutar el segundo paso:

```bash
./monitoring-installer.sh --2
```

Debería producir una salida similar a esta:

```text
Instalador de monitoreo de AvalancheGo
--------------------------------
PASO 2: Instalando Grafana



OK
deb https://packages.grafana.com/oss/deb stable main
Hit:1 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal InRelease
Get:2 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-updates InRelease [114 kB]
Get:3 http://us-east-2.ec2.ports.ubuntu.com/ubuntu-ports focal-backports InRelease [101 kB]
Hit:4 http://ppa.launchpad.net/longsleep/golang-backports/ubuntu focal InRelease
Get:5 http://ports.ubuntu.com/ubuntu-ports focal-security InRelease [114 kB]
Get:6 https://packages.grafana.com/oss/deb stable InRelease [12.1 kB]
...

Para asegurarte de que está funcionando correctamente:

```text
sudo systemctl status grafana-server
```

lo cual debería mostrar nuevamente a Grafana como `activo`. Grafana ahora debería estar disponible en
`http://tu-dirección-ip-del-nodo:3000/` desde tu navegador. Inicia sesión con nombre de usuario: admin,
contraseña: admin, y se te pedirá que configures una nueva contraseña segura. Haz
eso.

:::warning

Es posible que necesites hacer `sudo ufw allow 3000/tcp` si el firewall está activado y/o
ajustar la configuración de la instancia en la nube para permitir conexiones al puerto 3000. Si estás en
internet público, ¡asegúrate de permitir solo que tu IP se conecte!

:::

Prometheus y Grafana ahora están instalados, estamos listos para el siguiente paso.

## Paso 3: Configurar `node_exporter` <a id="exporter"></a>

Además de las métricas de AvalancheGo, configuremos el monitoreo de la máquina
en sí, para que podamos verificar el uso de CPU, memoria, red y disco y estar al tanto de cualquier
anomalía. Para eso, usaremos `node_exporter`, un complemento de Prometheus.

Ejecuta el script para ejecutar el tercer paso:

```bash
./monitoring-installer.sh --3
```

La salida debería verse algo así:

```bash
Instalador de monitoreo de AvalancheGo
--------------------------------
PASO 3: Instalando node_exporter

Verificando el entorno...
Se encontró una arquitectura arm64...
Descargando archivo...
https://github.com/prometheus/node_exporter/releases/download/v1.2.2/node_exporter-1.2.2.linux-arm64.tar.gz
node_exporter.tar.gz                        100%[=========================================================================================>]   7.91M  --.-KB/s    en 0.1s
2021-11-05 14:57:25 URL:https://github-releases.githubusercontent.com/9524057/6dc22304-a1f5-419b-b296-906f6dd168dc?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20211105%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20211105T145725Z&X-Amz-Expires=300&X-Amz-Signature=3890e09e58ea9d4180684d9286c9e791b96b0c411d8f8a494f77e99f260bdcbb&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=9524057&response-content-disposition=attachment%3B%20filename%3Dnode_exporter-1.2.2.linux-arm64.tar.gz&response-content-type=application%2Foctet-stream [8296266/8296266] -> "node_exporter.tar.gz" [1]
node_exporter-1.2.2.linux-arm64/LICENSE
```

Nuevamente, verificamos que el servicio se esté ejecutando correctamente:

```bash
sudo systemctl status node_exporter
```

Si el servicio está en ejecución, Prometheus, Grafana y `node_exporter` deberían funcionar todos
juntos ahora. Para verificarlo, en tu navegador visita la interfaz web de Prometheus en
`http://tu-dirección-ip-del-nodo:9090/targets`. Deberías ver tres objetivos habilitados:

- Prometheus
- AvalancheGo
- `avalanchego-machine`

Asegúrate de que todos ellos tengan el estado `UP` en la columna `State`.

:::info

Si ejecutas tu nodo AvalancheGo con TLS habilitado en tu puerto de API, deberás editar manualmente el archivo `/etc/prometheus/prometheus.yml` y cambiar el
trabajo `avalanchego` para que se vea así:

```yaml
- job_name: "avalanchego"
  metrics_path: "/ext/metrics"
  scheme: "https"
  tls_config:
    insecure_skip_verify: true
  static_configs:
    - targets: ["localhost:9650"]
```

¡Ten en cuenta los espacios (espacios iniciales también)! Necesitarás privilegios de administrador para hacer eso
(usar `sudo`). Reinicia el servicio de Prometheus después con `sudo systemctl restart
prometheus`.

:::

Ahora solo queda aprovisionar la fuente de datos e instalar los paneles de control reales
que nos mostrarán los datos.

## Paso 4: Paneles de control <a id="dashboards"></a>

Ejecuta el script para instalar los paneles de control:

```bash
./monitoring-installer.sh --4
```

Producirá una salida algo así:

```text
Instalador de monitoreo de AvalancheGo
--------------------------------

Descargando...
Last-modified header missing -- time-stamps turned off.
2021-11-05 14:57:47 URL:https://raw.githubusercontent.com/ava-labs/avalanche-monitoring/master/grafana/dashboards/c_chain.json [50282/50282] -> "c_chain.json" [1]
FINISHED --2021-11-05 14:57:47--
Total wall clock time: 0.2s
Downloaded: 1 files, 49K in 0s (132 MB/s)
Last-modified header missing -- time-stamps turned off.
...
```

Esto descargará las últimas versiones de los paneles de control desde GitHub y
aprovisionará Grafana para cargarlos, así como definir Prometheus como fuente de datos.
Puede tomar hasta 30 segundos para que los paneles de control aparezcan. En tu navegador, ve
a: `http://tu-dirección-ip-del-nodo:3000/dashboards`. Deberías ver 7 paneles de control de Avalanche:

![Paneles de control importados](/img/monitoring-01-dashboards.png)

Selecciona 'Avalanche Main Dashboard' haciendo clic en su título. Debería cargarse y verse similar a esto:

![Panel de control principal](/img/monitoring-02-main-dashboard.png)

Algunas gráficas pueden tardar un poco en llenarse por completo, ya que necesitan una serie de
puntos de datos para renderizarse correctamente.

Puedes marcar el panel de control principal como favorito, ya que muestra la información más importante
sobre el nodo de un vistazo. Cada panel de control tiene un enlace a todos los demás como la
primera fila, por lo que puedes moverte entre ellos fácilmente.

## Paso 5: Paneles de control adicionales (opcional)

El Paso 4 instala el conjunto básico de paneles de control que tienen sentido tener en cualquier nodo.
El Paso 5 es para instalar paneles de control adicionales que pueden no ser útiles para cada
instalación.

Actualmente, solo hay un panel de control adicional: Subnets. Si tu nodo está
ejecutando alguna Subnet, es posible que desees agregar esto también. Haz:

```bash
./monitoring-installer.sh --5
```

Esto agregará el panel de control de Subnets. Te permite monitorear datos operativos
para cualquier Subnet que esté sincronizada en el nodo. Hay un interruptor de Subnet que
te permite cambiar entre diferentes Subnets. Como hay muchas Subnets y
no todos los nodos tendrán todas ellas, por defecto, viene poblado solo con
las Subnets de Spaces y WAGMI que existen en la testnet Fuji:

![Interruptor de Subnets](/img/monitoring-03-subnets.png)

Para configurar el panel de control y agregar cualquier Subnet que tu nodo esté sincronizando, necesitarás editar el panel de control. Selecciona el ícono de "configuración del panel de control" (imagen de una rueda dentada) en la esquina superior derecha de la pantalla del panel de control y cambia a la sección de "Variables" y selecciona la variable de "subnet". Debería verse algo así:

![Pantalla de variables](/img/monitoring-04-variables.png)

El formato de la variable es:

```text
Nombre de la Subnet:<BlockchainID>
```

y el separador entre las entradas es una coma. Las entradas para Spaces y WAGMI se ven así:

```text
Spaces (Fuji) : 2ebCneCbwthjQ1rYT41nhd7M76Hc6YmosMAQrTFhBq8qeqh6tt, WAGMI (Fuji) : 2AM3vsuLoJdGBGqX2ibE8RGEq4Lg7g4bot6BT1Z7B9dH5corUD
```

Después de editar los valores, presiona "Actualizar" y luego haz clic en el botón "Guardar panel de control" y confirma. Presiona la flecha hacia atrás en la esquina superior izquierda para volver al panel de control. Ahora deberías poder seleccionar los nuevos valores del menú desplegable y se mostrarán los datos de la Subnet seleccionada en los paneles.

## Actualización

Las métricas disponibles del nodo se actualizan constantemente, se agregan nuevas y se eliminan las obsoletas, por lo que es buena práctica actualizar los paneles de control de vez en cuando, especialmente si notas datos faltantes en los paneles. Actualizar los paneles de control es fácil, simplemente ejecuta el script sin argumentos y actualizará los paneles de control con las versiones más recientes disponibles. Permítele hasta 30 segundos para que los paneles de control se actualicen en Grafana.

Si agregaste los paneles de control opcionales adicionales (paso 5), también se actualizarán.

## Resumen

Usar el script para instalar el monitoreo del nodo es fácil y te brinda información sobre cómo se comporta tu nodo y qué está sucediendo bajo el capó. ¡Además, gráficos bonitos!

Si tienes comentarios sobre este tutorial, problemas con el script o siguiendo los pasos, envíanos un mensaje en [Discord](https://chat.avalabs.org).