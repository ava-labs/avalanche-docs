# Ejecuta un Nodo de Avalanche en Linux Usando el Script de Instalación

Tenemos un script de shell que instala AvalancheGo en tu computadora. Este script establece un nodo de ejecución completo en cuestión de minutos con un mínimo de entradas del usuario.

## Antes de Comenzar

Este script de instalación asume que:

* OS: Ubuntu 18.04 o 20.04 \(MacOS y Windows aún no soportado\)
* AvalancheGo no está funcionando y no está instalado como un servicio
* El usuario que ejecuta el script tiene privilegios de superusuario \(puede ejecutar `sudo`\)

### Consideraciones del Entorno


Si ejecutas una distribución diferente de Linux, el script podría no funcionar como debería. Asume que `systemd` se usa para ejecutar servicios del sistema. Otras distribuciones de Linux podrían usar algo más, o podrían tener archivos en lugares diferentes a los que asume el script.

Si ya tienes un nodo ejecutándose en el ordenador, detenlo antes de ejecutar el script.

#### Nodo ejecutándose desde la terminal

Si tu nodo está funcionando en un terminal, deténgalo presionando `ctrl+c`.

#### Nodo ejecutándose como un servicio

Si tu nodo ya está funcionando como un servicio, entonces probablemente no necesites este script. Estás listo.

#### Nodo ejecutándose en segundo plano

Si tu nodo se está ejecutándo en segundo plano
 \(ejecutandose `nohup`, por ejemplo\)  encuentra el proceso que ejecuta el nodo ejecutando `ps aux | grep avalanche`. Esto producirá una salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Busca una línea que no tenga `grep`. En este ejemplo, esa es la segunda línea. Muestra información sobre tu nodo. Fíjate en el id de proceso, en este caso, "2630". Detén el nodo ejecutando `kill -2 2630`.

#### Archivos de Trabajo de Nodo

Si anteriormente ejecutó un nodo de AvalancheGo en esta computadora, tendrá archivos de nodos locales almacenados en `$HOME/.avalanchego` directory. Esos archivos no serán alterados, y el nodo establecido por el script continuará operando con la misma identidad y estado que tenía antes. Dicho esto, para la seguridad de tu nodo, haz una copia de seguridad de los archivos `staker.crt` y `staker.key`, encontrados en `$HOME/.avalanchego/staking` y los guardamos en un lugar seguro. Puedes usar esos archivos para recrear tu nodo en un ordenador diferente si alguna vez lo necesitas.

### Consideraciones de la Red

Para funcionar con éxito, AvalancheGo necesita aceptar conexiones de Internet en el puerto de red `9651`. Antes de proceder a la instalación, debes determinar el entorno de red en el que se ejecutará tu nodo.

#### Ejecutandose en un cloud provider

Si tu nodo se ejecuta en una instancia de ordenador de un cloud provider, tendrá una IP estática. Averigua cuál es esa IP estática, o configúrala si no lo has hecho ya. El script tratará de averiguar la IP por sí mismo, pero eso podría no funcionar en todos los entornos, por lo que tendrás que comprobar la IP o introducirla tú mismo.

#### Ejecutandose en una Conexión Doméstica


Si estás ejecutando un nodo en un ordenador que está en una conexión de Internet residencial, tienes una IP dinámica; es decir, tu IP cambiará periódicamente. El script de instalación configurará el nodo apropiadamente para esa situación. Pero, para una conexión doméstica, necesitará configurar el reenvío del puerto `9651` de Internet a la computadora en la que está instalado el nodo.

Como hay demasiados modelos y configuraciones de routers, no podemos dar instrucciones sobre qué hacer exactamente, pero hay guías en línea que se pueden encontrar \(como [esta](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), o [esta](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) \), y el soporte de su proveedor de servicios también podría ayudar.

## Ejecutando el script

Así que, ahora que has preparado tu sistema y tienes la información lista, vamos a hacerlo.

Para descargar y ejecutar el script, introduce lo siguiente en la terminal:

```text
wget https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

La salida debería ser algo como esto:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found arm64 architecture...
Looking for the latest arm64 build...
Will attempt to download:
 https://github.com/ava-labs/avalanchego/releases/download/v1.1.1/avalanchego-linux-arm64-v1.1.1.tar.gz
avalanchego-linux-arm64-v1.1.1.tar.gz 100%[=========================================================================>]  29.83M  75.8MB/s    in 0.4s
2020-12-28 14:57:47 URL:https://github-production-release-asset-2e65be.s3.amazonaws.com/246387644/f4d27b00-4161-11eb-8fb2-156a992fd2c8?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20201228%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20201228T145747Z&X-Amz-Expires=300&X-Amz-Signature=ea838877f39ae940a37a076137c4c2689494c7e683cb95a5a4714c062e6ba018&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=246387644&response-content-disposition=attachment%3B%20filename%3Davalanchego-linux-arm64-v1.1.1.tar.gz&response-content-type=application%2Foctet-stream [31283052/31283052] -> "avalanchego-linux-arm64-v1.1.1.tar.gz" [1]
Unpacking node files...
avalanchego-v1.1.1/plugins/
avalanchego-v1.1.1/plugins/evm
avalanchego-v1.1.1/avalanchego
Node files unpacked into /home/ubuntu/avalanche-node
```

Y luego el script te pedirá información sobre el entorno de la red:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

Ingresa`1` si tienes una IP dinámica y `2` si tienes una IP estática. Si estás en una IP estática, intentará detectar automáticamente la IP y te pedirá confirmación.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirma con `y`, o `n` si la IP detectada no es correcta \(o vacía\), y luego introduce la IP correcta en el siguiente paso.

El script continuará con la creación del servicio del sistema y terminará con el inicio del servicio.

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

El script finalizó, y deberías ver un mensaje del sistema.

## Después de la instalación

AvalancheGo debería funcionar en segundo plano como un servicio. Puedes comprobar que se está ejecutando con:

```text
sudo systemctl status avalanchego
```

Esto imprimirá los últimos registros del nodo, que deberían verse así:

```text
● avalanchego.service - AvalancheGo systemd service
Loaded: loaded (/etc/systemd/system/avalanchego.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2021-01-05 10:38:21 UTC; 51s ago
Main PID: 2142 (avalanchego)
Tasks: 8 (limit: 4495)
Memory: 223.0M
CGroup: /system.slice/avalanchego.service
└─2142 /home/ubuntu/avalanche-node/avalanchego --plugin-dir=/home/ubuntu/avalanche-node/plugins --dynamic-public-ip=opendns --http-host=

Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/vms/platformvm/vm.go#322: initializing last accepted block as 2FUFPVPxbTpKNn39moGSzsmGroYES4NZRdw3mJgNvMkMiMHJ9e
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] <P Chain> avalanchego/snow/engine/snowman/transitive.go#58: initializing consensus engine
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#143: adding route /ext/bc/11111111111111111111111111111111LpoYY
Jan 05 10:38:45 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:45] avalanchego/api/server.go#88: HTTP API server listening on ":9650"
Jan 05 10:38:58 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:58] <P Chain> avalanchego/snow/engine/common/bootstrapper.go#185: Bootstrapping started syncing with 1 vertices in the accepted frontier
Jan 05 10:39:02 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:02] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 2500 blocks
Jan 05 10:39:04 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:04] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 5000 blocks
Jan 05 10:39:06 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:06] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 7500 blocks
Jan 05 10:39:09 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:09] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 10000 blocks
Jan 05 10:39:11 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:39:11] <P Chain> avalanchego/snow/engine/snowman/bootstrap/bootstrapper.go#210: fetched 12500 blocks
```

Fíjese en el `active` (en marcha)" que indica que el servicio está funcionando bien. Es posible que tengas que pulsar `q` para volver a la línea de comandos.

Para encontrar el ID de tu nodo, el cual se usa para identificar tu nodo a la red, ejecute el siguiente comando:

```text
sudo journalctl -u avalanchego | grep "node's ID"
```

Si todo va bien, la respuesta debería ser algo como esto: 

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```


Pon `NodeID-` al valor para obtener, por ejemplo, `NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY`. Guarda eso; será necesario para staking o buscar tu nodo.

Tu nodo debería estar en el proceso de arranque ahora. Puedes monitorear el progreso emitiendo el siguiente comando:

```text
sudo journalctl -u avalanchego -f
```

Presiona `ctrl+C` cuando desees dejar de leer la salida del nodo.

## Deteniendo el Nodo

Para detener AvalancheGo, ejecuta:

```text
sudo systemctl stop avalanchego
```

Para comenzarlo de nuevo, ejecuta:

```text
sudo systemctl start avalanchego
```

## Actualización del Nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de la versión. La mayoría de las actualizaciones se recomiendan pero no se requieren. Se avisará con antelación para las actualizaciones que no sean compatibles con las versiones anteriores. Cuando se libere una nueva versión del nodo, notarás líneas de registro como:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Se recomienda siempre actualizar a la última versión, porque las nuevas versiones traen correcciones de errores, nuevas características y actualizaciones.

Para actualizar tu nodo, sólo tienes que ejecutar el script de instalación de nuevo:

```text
./avalanchego-installer.sh
```

Detectará que ya tiene instalado AvalancheGo:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Luego actualizará su nodo a la última versión, y después de hacerlo, iniciará el nodo de nuevo, y mostrará la información sobre la última versión:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## ¿Qué sigue?

¡Eso es, estás dirigiendo un nodo de AvalancheGo! ¡Felicidades! Haznos saber que lo hiciste en nuestro [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) o [Reddit](https://t.me/avalancheavax)!

Si estás en una red residencial \(IP dinámica\), Si estás en una red residencial (IP dinámica), no te olvides de configurar el reenvío de puertos. Si estás en un proveedor de cloud service, estás listo.

Ahora puedes [interactuar con tu nodo](../../avalanchego-apis/issuing-api-calls.md), [hacer stake con tus tokens](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md), o subir el nivel de su instalación configurando la [monitorización de nodos](setting-up-node-monitoring.md) para tener una mejor visión de lo que su nodo está haciendo.

Si tienes alguna pregunta, o necesitas ayuda, no dudes en contactarnos en nuestro canal de [Discord](https://chat.avalabs.org/)
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTk0MDcxODcxLDk4ODU4MjY3NiwxNTkxND
I4Mzk0LC0xMDQ5NjczMzA2LDEyMTQwNjIyMzgsLTQzNDg3MzA0
NCwtODU3NDM1MTUwLC0yMDg1OTAzODEzLC0xNzczNTc2ODU2LC
0xNTY2MzAxNTg4LC0zNTY4ODUzMjRdfQ==
-->