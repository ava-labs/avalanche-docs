# Actualiza tu Nodo AvalancheGo

## **Haz una copia de seguridad de tu Nodo**

Antes de actualizar su nodo, se recomienda hacer una copia de seguridad de los archivos de tu Staker que se utilizan para identificar tu nodo en la red. En la instalación predeterminada, puedes copiarlos ejecutando los siguientes comandos:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Ahora descarga los archivos`staker.crt` y`staker.key`y mantenlos en un lugar seguro y privado. Si algo le pasa a tu nodo o el nodo de la máquina funciona, estos archivos pueden ser usados para recrear completamente tu nodo.

Si utilizas tu nodo con fines de desarrollo y tienes usuarios de keystore en tu nodo, también deberías hacer una copia de seguridad de los mismos.

## Nodo Instalado Usando el Script de Instalación

Si instalaste tu nodo usando el [Script de Instalación](set-up-node-with-installer.md), para actualizar tu nodo, sólo tienes que ejecutar el script de instalación de nuevo.

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

## **Detener la Versión Antigua del Nodo**

Después de que la copia de seguridad esté asegurada, puedes empezar a actualizar tu nodo. Comienza por detener la versión que se está ejecutando actualmente.

### Nodo ejecutándose desde la terminal

Si tu nodo está funcionando en un terminal, deténgalo presionando `ctrl+c`.

### Nodo ejecutándose como un servicio

Si tu nodo se ejecuta como un servicio, deténgalo ingresando:

`sudo systemctl stop avalanchego.service`

\(Tu servicio puede llamarse de manera diferente, `avalanche.service`, o similar\)

### Nodo ejecutándose en segundo plano

Si tu nodo está funcionando en segundo plano \(ejecutandose con `nohup`, por ejemplo\) entonces encuentra el proceso que ejecuta el nodo ejecutando lo siguiente `ps aux | grep avalanche`. Esto producirá una salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

En este ejemplo, la segunda línea muestra información sobre su nodo. Fíjate en la ID del proceso, en este caso, `2630`. Detén el nodo ejecutando `kill -2 2630`.


Ahora estamos listos para descargar la nueva versión del nodo. Puedes descargar el código fuente y luego construir el programa binario, o puedes descargar el binario pre-construido. No necesitas hacer ambas cosas.

La descarga del binario preconstruido es más fácil y recomendable si sólo quieres ejecutar tu propio nodo y hacer stake en él.

Crear el Nodo [desde el código fuente](upgrade-your-avalanchego-node.md#build-from-source) es recomendado si eres un desarrollador que busca experimentar y construir en Avalanche.

## **Descargar Binario Preconstruido**

Si quieres descargar un binario preconstruido en lugar de construirlo tú mismo, ve a nuestra [página de lanzamientos](https://github.com/ava-labs/avalanchego/releases), y selecciona la versión que quieras \(probablemente la última.\)

Debajo de `Assets`, selecciona el archivo apropiado.

Para MacOS:  
Descarga: `avalanchego-macos-<VERSION>.zip`  
Descomprime: `unzip avalanchego-macos-<VERSION>.zip`  
La carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PCs o proveedores de nube:  
Descarga: `avalanchego-linux-amd64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en computadoras basadas en RaspberryPi4 o similares basadas en Arm64:   
Descarga: `avalanchego-linux-arm64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

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

Añade`nohup` al comienzo del comando si quieres ejecutar el nodo en segundo plano.

### Nodo ejecutándose como un servicio

Si estás ejecutando el nodo como un servicio, necesitas reemplazar los binarios viejos por los nuevos.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

y luego reiniciar el servicio con `sudo systemctl start avalanchego.service`.

## **Creando desde el Código Fuente**

Primero, clona nuestro repositorio de Github \(puedes saltarte este paso si ya lo has hecho antes\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Luego, mueva al directorio de avalanchego:

```text
cd avalanchego
```

Obtén el último código:

```text
git pull
```

Comprueba que tu código local está actualizado, ejecute:

```text
git rev-parse HEAD
```

y compruebe que los primeros 7 caracteres impresos coinciden con el último campo de`commit`en nuestro [Github.](https://github.com/ava-labs/avalanchego)

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

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA4NTc1NDY2NCw4NDY3NzQyMTQsLTExND
I2MjQzMjQsNDUwODAwOTc3XX0=
-->