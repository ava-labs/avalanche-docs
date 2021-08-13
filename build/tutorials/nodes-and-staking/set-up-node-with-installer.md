# Ejecute un Nodo Avalanche utilizando el Script Instalar

Tenemos un script shell \(bash\) que instala AvalancheGo en su computadora. Este script establece un nodo completo y en cuestión de minutos con una entrada mínima de usuario requerida.

## Antes de empezar

Este script de instalación supone:

* OS: Ubuntu 18.04 o 20.04 \(lo siento, MacOS y Windows aún no soportados\)
* AvalancheGo no está funcionando y no ya instalado como servicio
* El usuario que ejecuta el script tiene privilegios de superusuario \(puede ejecutar `sudo`\)

### Consideraciones ambientales

Si ejecuta un sabor diferente de Linux, el script podría no funcionar como se propone. Se asume que `systemd` se utiliza para ejecutar servicios de sistema. Otros sabores de Linux podrían usar otra cosa, o pueden tener archivos en diferentes lugares de lo que se asume por el script.

Si ya tienes un nodo que se ejecuta en el ordenador, detiene antes de ejecutar el script.

#### Nodo que se ejecuta desde el terminal

Si su nodo se está ejecutando en un terminal detiene presionando `ctrl+C`.

#### Nodo que se ejecuta como servicio

Si tu nodo ya se está ejecutando como servicio, entonces probablemente no necesites este guión. Eres bueno para irte.

#### Nodo que se ejecuta en el fondo

Si su nodo se está ejecutando en el fondo \(ejecutando con `nohup`, por ejemplo\) entonces encuentre el proceso ejecutando el nodo ejecutando `ps aux | grep avalanche`. Esto producirá salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

Busca una línea que no tenga `un` engreído, en este ejemplo, esa es la segunda línea. Muestra información sobre tu nodo. Tenga en cuenta el proceso id, en este caso, `2630`. Detenga el nodo corriendo `matando -2 2630`.

#### Archivos de trabajo de nodo

Si anteriormente ejecutaste un nodo AvalancheGo en este ordenador, tendrás archivos de nodo local almacenados en `$HOME/.avalanchego` Esos archivos no se alterarán, y el nodo establecido por el script continuará funcionando con la misma identidad y estado que había antes. Dicho esto, para la seguridad de su nodo, copia de seguridad `de staker.crt` y `staker.key`, encontrados en `staker.crt` y almacenarlos en algún lugar seguro. Puede utilizar esos archivos para recrear su nodo en un equipo diferente si alguna vez lo necesita. Echa un vistazo a este [tutorial](node-backup-and-restore.md) para obtener el procedimiento de copia de seguridad y restauración.

### Consideraciones de redes

Para funcionar con éxito, AvalancheGo necesita aceptar conexiones desde Internet en el puerto de red `9651`. Antes de proceder con la instalación, necesita determinar el entorno de red en el que se ejecutará el nodo.

#### Ejecutando en un proveedor de nube

Si su nodo se está ejecutando en una instancia de computadora del proveedor de la nube, tendrá una IP estática. Averigua qué es esa IP estática o configurarla si no lo hacía. El script intentará averiguar la IP por sí mismo, pero eso podría no funcionar en todos los entornos, por lo que tendrá que revisar la IP o introducirla usted mismo.

#### Corriendo en una conexión a domicilio

Si está ejecutando un nodo en un ordenador que está en una conexión a Internet residencial, tiene un IP dinámico; es decir, su IP cambiará periódicamente. El script de instalación configurará el nodo apropiadamente para esa situación. Pero, para una conexión a casa, tendrá que configurar el reenvío de puerto entrante del puerto `9651` desde el internet al ordenador en el que se instala el nodo.

Como hay demasiados modelos y configuraciones de router, no podemos proporcionar instrucciones sobre lo que exactamente hacer, pero hay guías en línea que se encuentran \(como [este](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), o [esto](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/) \), y el soporte de su proveedor de servicios también podría ayudar.

## Ejecutando el script

Así que, ahora que preparaste tu sistema y tienes la información preparada, vamos a hacerlo.

Para descargar y ejecutar el script, introduzca lo siguiente en la terminal:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh;\
chmod 755 avalanchego-installer.sh;\
./avalanchego-installer.sh
```

¡Y nos vamos! La salida debe parecer algo así:

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

Y luego el script le pedirá información sobre el entorno de la red:

```text
To complete the setup some networking information is needed.
Where is the node installed:
1) residential network (dynamic IP)
2) cloud provider (static IP)
Enter your connection type [1,2]:
```

Ingrese `1` si tiene IP dinámica, y `2` si tiene una IP estática. Si usted está en una IP estática, intentará detectar automáticamente la IP y pedir confirmación.

```text
Detected '3.15.152.14' as your public IP. Is this correct? [y,n]:
```

Confirme con `y`, o `n` si la IP detectada está incorrecta \(o vacío\), y luego ingrese la IP correcta en el siguiente pronto.

El script continuará con la creación de servicio del sistema y terminará con iniciar el servicio.

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

El script está terminado, y debe ver el símbolo del sistema de nuevo.

## Instalación posterior

AvalancheGo debería estar funcionando en el fondo como servicio. Puedes comprobar que está funcionando con:

```bash
sudo systemctl status avalanchego
```

Esto imprimirá los últimos registros del nodo, que deberían parecer así:

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

Tenga en cuenta el `activo (ejecutar)` que indica que el servicio se está ejecutando ok. Puede que necesite presionar `q` para regresar al símbolo del sistema.

Para averiguar su NodeID, que se utiliza para identificar su nodo a la red, ejecute el siguiente comando:

```bash
sudo journalctl -u avalanchego | grep "NodeID"
```

Producirá la salida como:

```text
Jan 05 10:38:38 ip-172-31-30-64 avalanchego[2142]: INFO [01-05|10:38:38] avalanchego/node/node.go#428: Set node's ID to 6seStrauyCnVV7NEVwRbfaT9B6EnXEzfY
```

Prepara `NodeID-` al valor para conseguir, por ejemplo, `NodeID-6seStrauyCnV7NEVWRbfET9B6EnXEzfY`. Guarde eso; será necesario para sujetar o buscar su nodo.

Tu nodo debería estar en proceso de estrofas ahora. Puede monitorear el progreso mediante la emisión del siguiente comando:

```bash
sudo journalctl -u avalanchego -f
```

Pulse `ctrl+C` cuando desee dejar de leer la salida de nodo.

## Parar el nodo

Para detener a AvalancheGo, corra:

```bash
sudo systemctl stop avalanchego
```

Para empezar de nuevo, corra:

```bash
sudo systemctl start avalanchego
```

## Actualización del nido

AvalancheGo es un proyecto en curso y hay actualizaciones de versiones regulares. La mayoría de las actualizaciones se recomiendan pero no se requieren. Se dará aviso previo para las mejoras que no sean compatibles hacia atrás. Cuando se suelta una nueva versión del nodo, notará líneas de registro como:

```text
Jan 08 10:26:45 ip-172-31-16-229 avalanchego[6335]: INFO [01-08|10:26:45] avalanchego/network/peer.go#526: beacon 9CkG9MBNavnw7EVSRsuFr7ws9gascDQy3 attempting to connect with newer version avalanche/1.1.1. You may want to update your client
```

Se recomienda actualizar siempre a la última versión, porque nuevas versiones traen correcciones de errores, nuevas características y actualizaciones.

Para actualizar su nodo, simplemente ejecute el script de instalador de nuevo:

```bash
./avalanchego-installer.sh
```

Detectará que ya tienes AvalancheGo instalado:

```text
AvalancheGo installer
---------------------
Preparing environment...
Found 64bit Intel/AMD architecture...
Found AvalancheGo systemd service already installed, switching to upgrade mode.
Stopping service...
```

Luego actualizará su nodo a la última versión, y después de que se haya hecho, iniciará el nodo de vuelta hacia arriba, e imprimirá la información sobre la última versión:

```text
Node upgraded, starting service...
New node version:
avalanche/1.1.1 [network=mainnet, database=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
Done!
```

## Configuración del nido

El archivo que configura la operación de nodo es `~/.avalanchego/configs/node.json`. Puede editarlo para agregar o cambiar opciones de configuración. La documentación de las opciones de configuración se puede encontrar [aquí](../../references/command-line-interface.md). La configuración predeterminada puede parecer así:

```javascript
{
  "dynamic-public-ip": "opendns",
  "http-host": ""
}
```

Tenga en cuenta que el archivo de configuración debe ser un archivo `JSON` debidamente formateado, por lo que los interruptores se formatean de manera diferente que para la línea de comandos, así que no introduzcan opciones como -`--dynamic-public-ip=opendns`, pero como en el ejemplo anterior.

## Usando una versión anterior

El script para instalador también se puede utilizar para instalar una versión de AvalancheGo distinta de la última versión.

Para ver una lista de versiones disponibles para la instalación, ejecute:

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

Para instalar una versión específica, ejecute el script con `--version` seguido de la etiqueta de la versión. Por ejemplo:

```bash
./avalanchego-installer.sh --version v1.3.1
```

{% insinuar style="danger" %} Tenga en cuenta que no todas las versiones de AvalancheGo son compatibles. Usted debe ejecutar generalmente la última versión. La ejecución de una versión distinta de la última puede conducir a que su nodo no funcione correctamente y, para los validadores, no reciba una recompensa gratificante. {% endhint %}

Gracias al miembro de la comunidad [Jean Zundel](https://github.com/jzu) por la inspiración y ayudar a implementar soporte para instalar versiones non-latest del nodo.

## Reinstalar y actualizar script

El script del instalador se actualiza de vez en cuando, con nuevas características y capacidades añadidas. Para aprovechar las nuevas características o recuperarse de las modificaciones que hicieron que el nodo fracasara, es posible que desee reinstalar el nodo. Para ello, busque la última versión del script desde la web con:

```bash
wget -nd -m https://raw.githubusercontent.com/ava-labs/avalanche-docs/master/scripts/avalanchego-installer.sh
```

Después de que el script se haya actualizado, run de nuevo con el argumento `de` línea de comandos --reinstale:

```bash
./avalanchego-installer.sh --reinstall
```

Esto eliminará el archivo de servicio existente, y ejecutará el instalador desde cero, como se inició por primera vez. Tenga en cuenta que la base de datos y NodeID se dejarán intactos.

## ¿Qué sigue?

¡Eso es, estás llevando un nodo AvalancheGo! ¡Enhorabuena! ¡Háganos saber que lo hiciste en nuestro [Twitter](https://twitter.com/avalancheavax), [Telegram](https://t.me/avalancheavax) o [Reddit](https://t.me/avalancheavax)!

Si usted está en una red residencial \(IP dinámica), no olvide configurar el reenvío de puertos. Si estás en un proveedor de servicios en la nube, estás bien para ir.

Ahora puede [interactuar con su nodo](../../avalanchego-apis/issuing-api-calls.md), [apagar sus tokens](staking-avax-by-validating-or-delegating-with-the-avalanche-wallet.md), o nivelar su instalación mediante la configuración [de monitoreo de nodo](setting-up-node-monitoring.md) para obtener una mejor comprensión de lo que su nodo está haciendo. Además, es posible que desee utilizar nuestra [colección de Postman](../../tools/postman-avalanche-collection.md) para emitir comandos más fácilmente a su nodo.

Finalmente, si no lo has hecho, es una buena idea [hacer copias](node-backup-and-restore.md) de seguridad de archivos importantes en caso de que alguna vez necesite restaurar su nodo a una máquina diferente.

Si tiene alguna pregunta, o necesita ayuda, no dude en ponerse en contacto con nosotros en nuestro servidor [de](https://chat.avalabs.org/) Discordia.

