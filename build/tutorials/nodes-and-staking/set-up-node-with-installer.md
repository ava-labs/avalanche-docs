# Ejecuta un Nodo de Avalanche en Linux usando el Script de Instalación

Tenemos un script de shell que instala AvalancheGo en tu computadora. Este script establece un nodo de ejecución completo en cuestión de minutos con un mínimo de entradas del usuario.

## Antes de Comenzar

Este script de instalación asume que:

* OS: Ubuntu 18.04 o 20.04 \(lo siento, MacOS y Windows aún no compatibles\)
* AvalancheGo no está funcionando y no está instalado como un servicio
* El usuario que ejecuta el script tiene privilegios de superusuario \(se puede `sudo`ejecutar\)

### Consideraciones del Entorno

Si ejecutas una distribución diferente de Linux, el script podría no funcionar como debería. Se asume que `systemd`se utiliza para ejecutar servicios de sistema. Otras distribuciones de Linux podrían usar algo más, o podrían tener archivos en lugares diferentes a los que asume el script.

Si ya tienes un nodo ejecutándose en el ordenador, detenlo antes de ejecutar el script.

#### Nodo ejecutándose desde la terminal

`ctrl+C`Si tu nodo se está ejecutando en un terminal detenlo presionando

#### Nodo ejecutándose como un servicio

Si tu nodo ya está funcionando como un servicio, entonces probablemente no necesites este script. Estás listo.

#### Nodo ejecutándose en segundo plano

`ps aux | grep avalanche`Si tu nodo se está ejecutando en el fondo \(ejecutándose con `nohup`, por ejemplo\) entonces encuentra el proceso que ejecuta el nodo ejecutando Esto producirá una salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Busca la línea que no tiene `grep`en ella. En este ejemplo, esa es la segunda línea. Muestra información sobre tu nodo. `2630`Tenga en cuenta el proceso id, en este caso, . Detener el nodo al `kill -2 2630`ejecutar.

#### Archivos de Trabajo de Nodo

Si anteriormente ejecutas un nodo de AvalancheGo en este ordenador, tendrás archivos de nodo local almacenados en el `$HOME/.avalanchego`directorio. Esos archivos no serán alterados, y el nodo establecido por el script continuará operando con la misma identidad y estado que tenía antes. Dicho esto, para la seguridad, las copias de seguridad de tu nodo `staker.crt`y los `staker.key`archivos, encontrarlos en `$HOME/.avalanchego/staking`y almacenarlos en algún lugar seguro. Puedes usar esos archivos para recrear tu nodo en un ordenador diferente si alguna vez lo necesitas. Consulta este [tutorial](node-backup-and-restore.md) para obtener un procedimiento de copia de seguridad y restauración.

### Consideraciones de la Red

`9651`Para funcionar con éxito, AvalancheGo necesita aceptar conexiones desde Internet en el puerto de red Antes de proceder a la instalación, debes determinar el entorno de red en el que se ejecutará tu nodo.

#### Ejecutandose en un cloud provider

Si tu nodo se ejecuta en una instancia de ordenador de un cloud provider, tendrá una IP estática. Averigua cuál es esa IP estática, o configúrala si no lo has hecho ya. El script tratará de averiguar la IP por sí mismo, pero eso podría no funcionar en todos los entornos, por lo que tendrás que comprobar la IP o introducirla tú mismo.

#### Ejecutandose en una Conexión Doméstica

Si estás ejecutando un nodo en un ordenador que está en una conexión de Internet residencial, tienes una IP dinámica; es decir, tu IP cambiará periódicamente. El script de instalación configurará el nodo apropiadamente para esa situación. Pero, para una conexión de casa, tendrás que crear el reenvío de puerto de entrada del puerto `9651`desde Internet hasta el ordenador en el que se instale el nodo de entrada.

Como hay demasiados modelos y configuraciones de route, no podemos proporcionar instrucciones sobre qué exactamente hacer, pero hay guías en línea \(como [este](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), o [este\),](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) y tu soporte de proveedor de servicio puede ayudar también.

## Ejecutando el script

Así que, ahora que has preparado tu sistema y tienes la información lista, vamos a hacerlo.

Para descargar y ejecutar el script, introduce lo siguiente en la terminal:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

¡Y estamos apagados! La salida debería ser algo como esto:

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

entra `1`si tienes una IP dinámica, y `2`si tienes una IP estática. Si estás en una IP estática, intentará detectar automáticamente la IP y te pedirá confirmación.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

`y`Confirma con o `n`si la IP detectada está incorrecta \(o vacío\) y luego introduce la IP correcta en la siguiente pista.

El script continuará con la creación del servicio del sistema y terminará con el inicio del servicio.

```text
Installing service with public IP: 3.15.152.14
Created symlink /etc/systemd/system/multi-user.target.wants/avalanchego.service → /etc/systemd/system/avalanchego.service.

Done!

Your node should now be bootstrapping on the main net.
Node configuration file is /home/ubuntu/.avalanchego/configs/node.json
To check that the service is running use the following command (q to exit):
sudo systemctl status avalanchego
To follow the log use (ctrl+C to stop):
sudo journalctl -u avalanchego -f

Reach us over on https://chat.avax.network if you're having problems.
```

El script finalizó, y deberías ver un mensaje del sistema.

## Después de la instalación

AvalancheGo debería funcionar en segundo plano como un servicio. Puedes comprobar que se está ejecutando con:

```bash
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
└─2142 /home/ubuntu/avalanche-node/avalanchego --dynamic-public-ip=opendns --http-host=

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

Tenga en cuenta el que indica `active (running)`que el servicio se está ejecutando bien. Puede que necesite presionar `q`para regresar al símbolo de comandos.

Para encontrar el ID de tu nodo, el cual se usa para identificar tu nodo a la red, ejecute el siguiente comando:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Si todo va bien, la respuesta debería ser algo como esto:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

`NodeID-`Prepara el valor de conseguir, por ejemplo, .`NodeID-6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY` Guarda eso; será necesario para staking o buscar tu nodo.

Tu nodo debería estar en el proceso de arranque ahora. Puedes monitorear el progreso emitiendo el siguiente comando:

```bash
sudo journalctl -u avalanchego -f
```

Prensa `ctrl+C`cuando quieras dejar de leer la salida de nodo.

## Deteniendo el Nodo

Para detener AvalancheGo, ejecuta:

```bash
sudo systemctl stop avalanchego
```

Para comenzarlo de nuevo, ejecuta:

```bash
sudo systemctl start avalanchego
```

## Actualización del Nodo

AvalancheGo es un proyecto en curso y hay actualizaciones regulares de la versión. La mayoría de las actualizaciones se recomiendan pero no se requieren. Se avisará con antelación para las actualizaciones que no sean compatibles con las versiones anteriores. Cuando se libere una nueva versión del nodo, notarás líneas de registro como:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Se recomienda siempre actualizar a la última versión, porque las nuevas versiones traen correcciones de errores, nuevas características y actualizaciones.

Para actualizar tu nodo, sólo tienes que ejecutar el script de instalación de nuevo:

```bash
./avalanchego-installer.sh
```

Este detectará que ya tiene instalado AvalancheGo:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Luego actualizará tu nodo a la última versión, y después de terminar, iniciará el nodo de nuevo, e imprimirá la información sobre la última versión:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Configuración de nodo

Archivo que configura la operación de nodo es `~/.avalanchego/configs/node.json`. Puedes editarla para agregar o cambiar opciones de configuración. La documentación de las opciones de configuración se puede encontrar [aquí](../../references/command-line-interface.md). La configuración por defecto puede parecer así:

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

`--dynamic-public-ip=opendns`Tenga en cuenta que el archivo de configuración necesita ser un archivo de formato adecuado, de modo que los interruptores se formatean de forma diferente que para la línea de comandos, así que no ingresen opciones `JSON`como, como en el ejemplo anterior.

## Usar una versión anterior

El script de instaladores también puede ser utilizado para instalar una versión de AvalancheGo diferente a la última versión.

Para ver una lista de versiones disponibles para la instalación, ejecuta:

```bash
./avalanchego-installer.sh --list
```

Imprimirá una lista, algo como:

```text
AvalancheGo installer
---------------------
Available versions:
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

Para instalar una versión específica, ejecuta el script con `--version`seguido por la etiqueta de la versión. Por ejemplo:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% hint style="danger" %}Tenga en cuenta que no todas las versiones de AvalancheGo son compatibles. Generalmente deberías ejecutar la última versión. Ejecutar una versión diferente a la última puede llevar a que tu nodo no funcione correctamente y, para validadores no recibes una recompensa de pago.{% endhint %}

Gracias al miembro de la comunidad [Jean Zundel](https://github.com/jzu) para la inspiración y ayudar a implementar soporte para instalar versiones de nodo no recientes.

## Reinstalar y actualizar script

El script de instalador se actualiza de vez en cuando, con nuevas características y capacidades añadidas. Para aprovechar las nuevas características o recuperarte de las modificaciones que hicieron que el nodo fallar, puedes querer reinstalar el nodo. Para ello, busca la última versión del script desde la web con:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Después de que el script se haya actualizado, ejecutarlo de nuevo con el argumento de la línea de `--reinstall`comandos:

```bash
./avalanchego-installer.sh --reinstall
```

Esto eliminará el archivo de servicio existente y ejecutará el instalador desde cero, como si fuera iniciado por primera vez. Tenga en cuenta que la base de datos y NodeID se quedarán intactos.

## ¿Qué siguiente?

¡Eso es, estás dirigiendo un nodo de AvalancheGo! ¡Felicidades! ¡Díganos que lo hiciste en nuestro [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) o [Reddit](https://t.me/avalancheavax)!

Si estás en una red residencial \(IP dinámica\), no te olvides de configurar el reenvío de puertos. Si estás en un proveedor de cloud service, estás listo.

Ahora puedes [interactuar con tu nodo](../../avalanchego-apis/issuing-api-calls.md), [apostar tus tokens](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md) o nivelar tu instalación configurando la [monitorización de nodo](setting-up-node-monitoring.md) para obtener una mejor comprensión de lo que tu nodo está haciendo. Además, puedes usar nuestra [colección](../../tools/postman-avalanche-collection.md) de Postman para emitir comandos más fácilmente a tu nodo.

Finalmente, si no has hecho, es una buena idea hacer [copias](node-backup-and-restore.md) de seguridad de archivos importantes en caso de que alguna vez tengas que restaurar tu nodo a una máquina diferente.

Si tienes alguna pregunta, o necesitas ayuda, no te sientes libre de contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/)

