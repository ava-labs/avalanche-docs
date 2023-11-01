---
tags: [Nodos]
description: Instrucciones detalladas para ejecutar un nodo Avalanche utilizando el script de instalación.
sidebar_label: Usando el Script de Instalación
pagination_label: Ejecutar un Nodo Avalanche Utilizando el Script de Instalación
sidebar_position: 1
---

# Ejecutar un Nodo Avalanche Utilizando el Script de Instalación

Tenemos un script de shell (bash) que instala AvalancheGo en tu computadora. Este
script configura un nodo completo y en funcionamiento en cuestión de minutos con una entrada de usuario mínima
requerida. El script también se puede utilizar para instalaciones no atendidas, [automatizadas](#instalación-automática).

## Antes de Empezar

Avalanche es un protocolo increíblemente liviano, por lo que los nodos pueden funcionar en hardware de
comodidad con las siguientes especificaciones mínimas.

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB
- SO: Ubuntu 20.04 o MacOS >= 12
- Red: ancho de banda sostenido de 5Mbps de subida/bajada

:::caution

El uso de un HDD puede resultar en latencias de lectura/escritura pobres y aleatorias,
lo que reduce el rendimiento y la confiabilidad.

:::

:::note

Los requisitos de hardware se escalarán con la cantidad de AVAX en stake en
el nodo y/o la actividad de la red. Los nodos con grandes apuestas (100k+ AVAX) necesitarán máquinas más potentes
que las enumeradas, y también utilizarán más ancho de banda.

:::

Este script de instalación asume:

- AvalancheGo no está en funcionamiento y no está instalado como un servicio
- El usuario que ejecuta el script tiene privilegios de superusuario (puede ejecutar `sudo`)

### Consideraciones del Entorno

Si ejecutas una versión diferente de Linux, es posible que el script no funcione como se espera.
Supone que se utiliza `systemd` para ejecutar servicios del sistema. Otras versiones de Linux podrían
usar algo diferente, o podrían tener archivos en lugares diferentes a los asumidos por
el script. Probablemente funcionará en cualquier distribución que use `systemd` pero se
ha desarrollado y probado en Ubuntu.

Si ya tienes un nodo en funcionamiento en la computadora, detenlo antes de ejecutar el
script. El script no tocará el directorio de trabajo del nodo, por lo que no necesitarás
iniciar el nodo desde cero.

#### Nodo en Ejecución desde la Terminal

Si tu nodo está en ejecución en una terminal, detenlo presionando `ctrl+C`.

#### Nodo en Ejecución como un Servicio

Si tu nodo ya está en ejecución como un servicio, entonces probablemente no necesites este
script. Estás listo para continuar.

#### Nodo en Ejecución en Segundo Plano

Si tu nodo está en ejecución en segundo plano (por ejemplo, ejecutándose con `nohup`)
entonces encuentra el proceso que ejecuta el nodo ejecutando `ps aux | grep avalanche`.
Esto producirá una salida como esta:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Busca la línea que no tenga `grep`. En este ejemplo, esa es la
segunda línea. Muestra información sobre tu nodo. Toma nota del ID de proceso, en este
caso, `2630`. Detén el nodo ejecutando `kill -2 2630`.

#### Archivos de Trabajo del Nodo

Si anteriormente ejecutaste un nodo AvalancheGo en esta computadora, tendrás archivos de nodo locales
almacenados en el directorio `$HOME/.avalanchego`. Esos archivos no se verán afectados, y el nodo configurado por el script continuará su operación con la misma identidad y estado que tenía antes. Dicho esto, para la seguridad de tu nodo, haz una copia de seguridad de los archivos `staker.crt` y `staker.key`, que se encuentran en
`$HOME/.avalanchego/staking` y guárdalos en un lugar seguro. Puedes usar esos
archivos para recrear tu nodo en una computadora diferente si alguna vez es necesario. Consulta este [tutorial](/nodes/maintain/node-backup-and-restore.md) para obtener el procedimiento de copia de seguridad y restauración.

### Consideraciones de Red

Para funcionar correctamente, AvalancheGo necesita aceptar conexiones desde Internet
en el puerto de red `9651`. Antes de continuar con la instalación, debes
determinar el entorno de red en el que se ejecutará tu nodo.

#### Ejecutándose en un Proveedor de Nube

Si tu nodo se está ejecutando en una instancia de computadora de un proveedor de nube, tendrá una
IP estática. Descubre cuál es esa IP estática, o configúrala si aún no lo has hecho.
El script intentará averiguar la IP por sí mismo, pero eso puede no funcionar en todos
los entornos, por lo que deberás verificar la IP o ingresarla tú mismo.

#### Ejecutándose en una Conexión Doméstica

Si estás ejecutando un nodo en una computadora que está en una conexión de internet
residencial, tienes una IP dinámica; es decir, tu IP cambiará periódicamente.
El script de instalación configurará el nodo adecuadamente para esa situación.
Pero, para una conexión doméstica, deberás configurar el reenvío de puertos de entrada del
puerto `9651` desde Internet hacia la computadora en la que se instala el nodo.

Dado que hay demasiados modelos y configuraciones de enrutadores, no podemos proporcionar
instrucciones sobre qué hacer exactamente, pero hay guías en línea que se pueden encontrar
(como
[esta](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/),
o [esta](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)
), y el soporte de tu proveedor de servicios también podría ayudar.

:::warning

Ten en cuenta que un nodo Avalanche completamente conectado mantiene y comunica
más de un par de miles de conexiones TCP en vivo. Para algunos enrutadores domésticos de baja potencia y
antiguos, eso podría ser demasiado para manejar. Si ese es el caso, es posible que
experimentes retrasos en otras computadoras conectadas al mismo enrutador, el nodo se
quede en reposo, falle al sincronizar y problemas similares.

:::

## Ejecutando el Script

Entonces, ahora que has preparado tu sistema y tienes la información lista, vamos a hacerlo.

Para descargar y ejecutar el script, ingresa lo siguiente en la terminal:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

¡Y estamos en marcha! La salida debería verse algo como esto:

```text
Instalador de AvalancheGo
---------------------
Preparando el entorno...
Encontrada arquitectura arm64...
Buscando la última versión arm64...
Intentará descargar:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Desempaquetando archivos del nodo...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Archivos del nodo desempaquetados en /home/ubuntu/avalanche-node
```

Y luego el script te pedirá información sobre el entorno de red:

Para completar la configuración, se necesita información de red.
¿Dónde está instalado el nodo?:

1. Red residencial (IP dinámica)
2. Proveedor de nube (IP estática)
   Ingrese su tipo de conexión [1,2]:

Ingrese `1` si tiene una IP dinámica y `2` si tiene una IP estática. Si está en una IP estática, intentará detectar automáticamente la IP y pedirá confirmación.

A continuación, debe configurar el acceso al puerto RPC para su nodo. Estos se utilizan para consultar el estado interno del nodo, enviar comandos al nodo o interactuar con la plataforma y sus cadenas (enviar transacciones, por ejemplo). Se le pedirá:

El puerto RPC debe ser público (este es un nodo de API pública) o privado (este es un validador)? [público, privado]:

- `privado`: esta configuración solo permite solicitudes RPC desde la máquina del nodo.
- `público`: esta configuración expone el puerto RPC a todas las interfaces de red.

Como esta es una configuración sensible, se le pedirá que confirme si elige `público`. Por favor, lea atentamente la siguiente nota:

:::note

Si elige permitir solicitudes RPC en cualquier interfaz de red, deberá configurar un firewall para permitir solo las solicitudes RPC de direcciones IP conocidas, ¡de lo contrario, su nodo será accesible para cualquiera y podría ser abrumado por llamadas RPC de actores malintencionados! Si no planea usar su nodo para enviar llamadas RPC de forma remota, ingrese `privado`.

:::

Luego, el script le pedirá que elija si desea habilitar o no la configuración de sincronización de estado:

¿Desea que la sincronización de estado esté activada o desactivada? [activada, desactivada]:

Activar la sincronización de estado aumentará en gran medida la velocidad de arranque, pero sincronizará solo el estado de red actual. Si planea usar su nodo para acceder a datos históricos (nodo de archivo), debe seleccionar `desactivada`. De lo contrario, seleccione `activada`. Los validadores pueden arrancar con la sincronización de estado activada.

Luego, el script continuará con la creación del servicio del sistema y finalizará con el inicio del servicio:

Se creó el enlace simbólico /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

¡Hecho!

Su nodo ahora debería estar arrancando.
El archivo de configuración del nodo es /home/ubuntu/.avalanchego/configs/node.json
El archivo de configuración de la cadena C es /home/ubuntu/.avalanchego/configs/chains/C/config.json
El directorio de complementos, para almacenar binarios de VM de Subnet , es /home/ubuntu/.avalanchego/plugins
Para verificar que el servicio esté en funcionamiento, use el siguiente comando (q para salir):
sudo systemctl status avalanchego
Para seguir el registro, use (ctrl-c para detener):
sudo journalctl -u avalanchego -f

El script ha terminado y debería ver el indicador del sistema nuevamente.

## Post Instalación

AvalancheGo debería estar funcionando en segundo plano como un servicio. Puede verificar que esté en funcionamiento con:

```bash
sudo systemctl status avalanchego
```

Esto imprimirá los últimos registros del nodo, que deberían verse así:

```text
● avalanchego.service - Servicio de sistema AvalancheGo
Cargado: cargado (/etc/systemd/system/avalanchego.service; habilitado; preset: habilitado)
Activo: activo (en ejecución) desde el mar 2021-01-05 10:38:21 UTC; hace 51s
PID principal: 2142 (avalanchego)
Tareas: 8 (límite: 4495)
Memoria: 223.0M
Grupo: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --public-ip-resolution-service=opendns --http-host=

05 de ene 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: inicializando el último bloque aceptado como 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
05 de ene 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: inicializando el motor de consenso
05 de ene 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: agregando ruta /ext/bc/11111111111111111111111111111111LpoYY
05 de ene 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: servidor de API HTTP escuchando en ":9650"
05 de ene 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: el arranque de la sincronización comenzó a sincronizar con 1 vértices en la frontera aceptada
05 de ene 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 2500 bloques
05 de ene 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 5000 bloques
05 de ene 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 7500 bloques
05 de ene 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 10000 bloques
05 de ene 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: se recuperaron 12500 bloques
```

Observe el `activo (en ejecución)`, que indica que el servicio está funcionando correctamente. Es posible que deba presionar `q` para volver al indicador de comando.

Para averiguar su NodeID, que se utiliza para identificar su nodo en la red, ejecute el siguiente comando:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Producirá una salida como esta:

```text
05 de ene 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Se estableció el ID del nodo en 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Agregue `NodeID-` al valor para obtener, por ejemplo, `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Guárdelo; se necesitará para el staking o para buscar su nodo.

Su nodo debería estar en proceso de arranque ahora. Puede monitorear el progreso emitiendo el siguiente comando:

```bash
sudo journalctl -u avalanchego -f
```

Presione `ctrl+C` cuando desee dejar de leer la salida del nodo.

## Detener el Nodo

Para detener AvalancheGo, ejecute:

```bash
sudo systemctl stop avalanchego
```

Para iniciarlo nuevamente, ejecute:

```bash
sudo systemctl start avalanchego
```

## Actualización del Nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de versión. La mayoría de las actualizaciones son recomendadas pero no requeridas. Se dará aviso previo para las actualizaciones que no sean compatibles con versiones anteriores. Cuando se lanza una nueva versión del nodo, notarás líneas de registro como estas:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 intentando conectarse con una versión más nueva avalanche/1.1.1. Es posible que desees actualizar tu cliente
```

Se recomienda siempre actualizar a la última versión, porque las nuevas versiones traen correcciones de errores, nuevas características y mejoras.

Para actualizar tu nodo, simplemente ejecuta el script de instalación nuevamente:

```bash
./avalanchego-installer.sh
```

Detectará que ya tienes AvalancheGo instalado:

```text
Instalador de AvalancheGo
---------------------
Preparando el entorno...
Se encontró una arquitectura Intel/AMD de 64 bits...
Se encontró el servicio systemd de AvalancheGo ya instalado, cambiando a modo de actualización.
Deteniendo el servicio...
```

Luego actualizará tu nodo a la última versión, y una vez que haya terminado, iniciará el nodo nuevamente e imprimirá la información sobre la última versión:

```text
Nodo actualizado, iniciando el servicio...
Nueva versión del nodo:
avalanche/1.1.1 [red=mainnet, base de datos=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
¡Hecho!
```

## Configuración avanzada del nodo

Sin argumentos adicionales, el script instala el nodo en una configuración más común. Pero el script también habilita varias opciones avanzadas que se pueden configurar a través de los mensajes de la línea de comandos. A continuación se muestra una lista de opciones avanzadas y su uso:

- `admin` - se habilitará la API de administración
- `archival` - desactiva la poda de la base de datos y preserva el historial completo de transacciones
- `state-sync` - si se utiliza `on`, se utiliza el estado de sincronización para la C-Chain, si se utiliza `off`, se utilizará la reproducción regular de transacciones para el arranque; el estado de sincronización es mucho más rápido, pero no tiene datos históricos
- `db-dir` - úsalo para proporcionar la ruta completa a la ubicación donde se almacenará la base de datos
- `fuji` - el nodo se conectará a la testnet Fuji en lugar de a la Mainnet
- `index` - se habilitará la API de índice
- `ip` - usa los argumentos `dynamic`, `static`, o ingresa una IP deseada directamente para ser utilizada como la IP pública que el nodo anunciará a la red
- `rpc` - usa los argumentos `any` o `local` para seleccionar cualquier interfaz de red o la interfaz de red local que se utilizará para escuchar llamadas RPC
- `version` - instala una versión específica del nodo, en lugar de la última. Consulta [aquí](/nodes/run/with-installer.md#using-a-previous-version) para ver cómo se utiliza.

Ten en cuenta que configurar las opciones `index` y `archival` en un nodo existente requerirá un arranque nuevo para recrear la base de datos.

Puedes ver el uso completo del script ingresando:

```bash
./avalanchego-installer.sh --help
```

### Instalación automática

Si deseas utilizar el script en un entorno automatizado donde no puedes ingresar los datos en los mensajes, debes proporcionar al menos las opciones `rpc` e `ip`. Por ejemplo:

```bash
./avalanchego-installer.sh --ip 1.2.3.4 --rpc local
```

### Ejemplos de uso

Para ejecutar un nodo Fuji con indexación habilitada e IP estática autodetectada:

```bash
./avalanchego-installer.sh --fuji --ip static --index
```

Para ejecutar un nodo Mainnet de archivo con IP dinámica y base de datos ubicada en `/home/node/db`:

```bash
./avalanchego-installer.sh --archival --ip dynamic --db-dir /home/node/db
```

Para usar el estado de sincronización de C-Chain para arrancar rápidamente un nodo Mainnet, con IP dinámica y solo RPC local:

```bash
./avalanchego-installer.sh --state-sync on --ip dynamic --rpc local
```

Para reinstalar el nodo usando la versión 1.7.10 del nodo y usar una IP específica y solo RPC local:

```bash
./avalanchego-installer.sh --reinstall --ip 1.2.3.4 --version v1.7.10 --rpc local
```

## Configuración del nodo

El archivo que configura la operación del nodo es `~/.avalanchego/configs/node.json`. Puedes editarlo para agregar o cambiar opciones de configuración. La documentación de las opciones de configuración se puede encontrar [aquí](/nodes/configure/avalanchego-config-flags.md). La configuración puede verse así:

```json
{
  "public-ip-resolution-service": "opendns",
  "http-host": ""
}
```

Ten en cuenta que el archivo de configuración debe ser un archivo `JSON` formateado correctamente, por lo que los interruptores se formatean de manera diferente que en la línea de comandos, así que no ingreses opciones como `--public-ip-resolution-service=opendns` sino como en el ejemplo anterior.

El script también crea un archivo de configuración vacío de C-Chain, ubicado en `~/.avalanchego/configs/chains/C/config.json`. Al editar ese archivo, puedes configurar la C-Chain, como se describe en detalle [aquí](/nodes/configure/chain-config-flags.md).

## Uso de una versión anterior

El script de instalación también se puede utilizar para instalar una versión de AvalancheGo que no sea la última versión.

Para ver una lista de las versiones disponibles para la instalación, ejecuta:

```bash
./avalanchego-installer.sh --list
```

Imprimirá una lista, algo como esto:

```text
Instalador de AvalancheGo
---------------------
Versiones disponibles:
v1.3.2
v1.3.1
v1.3.0
v1.2.4-arm-fix
v1.2.4
v1.2.3-signed
v1.2.3
v1.2.2
v1.2.1
v1.2.0
```

Para instalar una versión específica, ejecuta el script con `--version` seguido de la etiqueta de la versión. Por ejemplo:

```bash
./avalanchego-installer.sh --version v1.3.1
```

:::danger

Ten en cuenta que no todas las versiones de AvalancheGo son compatibles. Generalmente, debes ejecutar la última versión. Ejecutar una versión que no sea la última puede hacer que tu nodo no funcione correctamente y, para los validadores, no recibir una recompensa de staking.

:::

Gracias al miembro de la comunidad [Jean Zundel](https://github.com/jzu) por la inspiración y la ayuda para implementar el soporte para instalar versiones de nodo que no sean las últimas.

## Reinstalación y actualización del script

El script de instalación se actualiza de vez en cuando, con nuevas características y capacidades agregadas. Para aprovechar las nuevas características o para recuperarse de modificaciones que hicieron que el nodo fallara, es posible que desees reinstalar el nodo. Para hacer eso, obtén la última versión del script de la web con:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Después de que el script se haya actualizado, ejecútalo nuevamente con la bandera de configuración `--reinstall`:

```bash
./avalanchego-installer.sh --reinstall
```

Esto eliminará el archivo de servicio existente y ejecutará el instalador desde cero, como si se hubiera iniciado por primera vez. Ten en cuenta que la base de datos y el NodeID se dejarán intactos.

## Eliminación de la instalación del nodo

Si deseas eliminar la instalación del nodo de la máquina, puedes ejecutar el script con la opción `--remove`, así:

```bash
./avalanchego-installer.sh --remove
```

Esto eliminará el servicio, el archivo de definición del servicio y los binarios del nodo. No eliminará el directorio de trabajo, la definición del NodeID ni la base de datos del nodo. Para eliminar también esos, puedes escribir:

```bash
rm -rf ~/.avalanchego/
```

¡Ten en cuenta que esto es irreversible y la base de datos y el NodeID se eliminarán!

## ¿Qué sigue?

¡Eso es todo, estás ejecutando un nodo AvalancheGo! ¡Felicidades! Avísanos que lo hiciste en nuestro [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) o [Reddit](https://t.me/avalancheavax)!

Si estás en una red residencial (IP dinámica), no olvides configurar el reenvío de puertos. Si estás en un proveedor de servicios en la nube, estás listo para empezar.

Ahora puedes [interactuar con tu nodo](/reference/standards/guides/issuing-api-calls.md), hacer [staking de tus tokens](/nodes/validate/what-is-staking.md), o mejorar tu instalación configurando [monitoreo de nodo](/nodes/maintain/setting-up-node-monitoring.md) para obtener una mejor visión de lo que hace tu nodo. Además, es posible que quieras usar nuestra [Colección de Postman](/tooling/avalanchego-postman-collection/setup.md) para emitir comandos más fácilmente a tu nodo.

Finalmente, si aún no lo has hecho, es una buena idea [hacer una copia de seguridad](/nodes/maintain/node-backup-and-restore.md) de archivos importantes en caso de que necesites restaurar tu nodo en una máquina diferente.

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/).
