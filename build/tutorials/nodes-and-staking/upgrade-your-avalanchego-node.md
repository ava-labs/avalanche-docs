# Actualiza su nodo AvalancheGo

{% embed url="https://youtu.be/o4Fww-sHoaQ" caption="" %}

## **Copia de seguridad de su nodo se hace un respaldo con un respaldo de su nodo de la Unión.**

Antes de actualizar su nodo, se recomienda hacer una copia de seguridad de los archivos de tu Staker que se utilizan para identificar tu nodo en la red. En la instalación predeterminada, puedes copiarlos ejecutando los siguientes comandos:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Luego descargue `staker.crt`y `staker.key`archivos, mantenlos en algún lugar seguro y privado. Si algo le pasa a tu nodo o el nodo de la máquina funciona, estos archivos pueden ser usados para recrear completamente tu nodo.

Si utilizas tu nodo con fines de desarrollo y tienes usuarios de keystore en tu nodo, también deberías hacer una copia de seguridad de los mismos.

## Nodo Instalado Usando el Script de Instalación

Si instaló tu nodo usando el [script instalador](set-up-node-with-installer.md), para actualizar tu nodo, solo ejecutará el script instalador otra vez.

```text
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

Y eso es todo, tu nodo se ha actualizado a la última versión.

Si instaló su nodo manualmente, proceda con el resto del tutorial.

## **Detenga la vieja versión de nodo**

Después de que la copia de seguridad esté asegurada, puedes empezar a actualizar tu nodo. Comienza por detener la versión que se está ejecutando actualmente.

### Nodo ejecutándose desde la terminal

`ctrl+c`Si tu nodo se ejecuta en un terminal se detiene presionando .

### Nodo ejecutándose como un servicio

Si tu nodo se ejecuta como un servicio, deténgalo ingresando:

`sudo systemctl stop avalanchego.service`

`avalanche.service`\(tu servicio puede ser llamado de forma diferente, o similar\)

### Nodo ejecutándose en segundo plano

Si tu nodo se ejecuta en segundo plano \(ejecutándose con `nohup`, por ejemplo\) entonces encuentra el proceso ejecutándose el nodo ejecutándose el nodo `ps aux | grep avalanche`. Esto producirá una salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

En este ejemplo, la segunda línea muestra información sobre su nodo. `2630`Tenga en cuenta el proceso id, en este caso, en este caso, . Detenga el nodo ejecutándose `kill -2 2630`ejecutando.

Ahora estamos listos para descargar la nueva versión del nodo. Puedes descargar el código fuente y luego construir el programa binario, o puedes descargar el binario pre-construido. No necesitas hacer ambas cosas.

Descargando el binario pre-construido es más fácil y recomendable si sólo buscas dirigir tu propio nodo y hacer staking en él.

Se recomienda crear el nodo [desde la fuente](upgrade-your-avalanchego-node.md#build-from-source) si eres un desarrollador que busca experimentar y crear en Avalanche.

## **Descargar Descargar Pre-built Binary**

Si quieres descargar un binario pre-construido en lugar de construirlo solo, ve a nuestra [página de](https://github.com/ava-labs/avalanchego/releases) lanzamientos, y selecciona el lanzamiento que quieres \(probablemente la última.\)

Bajo `Assets`, selecciona el archivo apropiado.

Para MacOS:   Descargar:`avalanchego-macos-<VERSION>.zip`   Unzip: `unzip avalanchego-macos-<VERSION>.zip`  `avalanchego-<VERSION>`La carpeta resultante, contiene los binarios.

Para Linux en PC o proveedores de la nube:   Descargar:`avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  `avalanchego-<VERSION>-linux`La carpeta resultante, contiene los binarios.

Para Linux en RaspberryPi4 o computadoras similares basadas en Arm64:   Descargar:`avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  `avalanchego-<VERSION>-linux`La carpeta resultante, contiene los binarios.

Ya estás listo para ejecutar la nueva versión del nodo.

### Nodo ejecutándose desde la terminal

Si estás usando los binarios pre-construidos en MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si estás usando los binarios pre-construidos en Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Añade `nohup`al inicio del comando si quieres ejecutar el nodo en el fondo.

### Nodo ejecutándose como un servicio

Si estás ejecutando el nodo como un servicio, necesitas reemplazar los binarios viejos por los nuevos.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

y luego reinicia el servicio con `sudo systemctl start avalanchego.service`.

## **Crea una fuente**

Primero, clona nuestro repositorio de Github \(puedes saltarte este paso si ya lo has hecho antes\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Luego, mueve al directorio de avalanchego:

```text
cd avalanchego
```

Obtén el último código:

```text
git pull
```

NOTA: si la rama maestra no ha sido actualizada con la última etiqueta de lanzamiento, puedes llegar directamente a ella directamente a través del primer momento ejecutándose `git fetch --all --tags`y luego `git checkout --force tags/<tag>`\(donde está `<tag>`la última etiqueta de lanzamiento; por ejemplo\) en `v1.3.2`lugar de .`git pull` Tenga en cuenta que su copia local estará en un estado 'CABEZA separada', que no es un problema si no hace cambios a la fuente que desea reenviar al repositorio \(en cuyo caso deberías consultar hacia una rama y a las fusiones ordinarias\). Tenga en cuenta también que la `--force`bandera ignorará cualquier cambio local que pueda tener.

Comprueba que tu código local está actualizado, ejecute: Ejecuta :

```text
git rev-parse HEAD
```

y comprueba que los primeros 7 primeros caracteres imprimidos coinciden con el campo de última entrega en nuestro [Github.](https://github.com/ava-labs/avalanchego)

`git checkout tags/<tag>`NOTA: si has usado los primeros 7 caracteres entonces estos primeros deben coincidir con el commit hash de esa etiqueta.

Ahora construye el binario:

```text
./scripts/build.sh
```

Esto debería aparecer:

```text
Build Successful
```

Puedes comprobar qué versión estás ejecutando con:

```text
./build/avalanchego --version
```

Puedes ejecutar tu nodo con:

```text
./build/avalanchego
```

