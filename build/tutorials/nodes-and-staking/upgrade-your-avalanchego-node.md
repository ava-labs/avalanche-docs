# Actualizar Su Nodo AvalancheGo

{% incrustado url="https://youtu.be/o4Fww-sHoaQ" subtítulo ="" %}

## **Copia de seguridad de su nodo**

Antes de actualizar su nodo, se recomienda que copia de seguridad de sus archivos de staker que se utilizan para identificar su nodo en la red. En la instalación predeterminada, puede copiarlos ejecutando los siguientes comandos:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Luego descargue `staker.crt` y `staker.key` archivos y manténgalos en algún lugar seguro y privado. Si algo le sucede a su nodo o al nodo de la máquina se ejecuta, estos archivos pueden utilizarse para recrear completamente su nodo.

Si utiliza su nodo para fines de desarrollo y tiene usuarios de keystore en su nodo, también debe respaldarlos.

## Nodo instalado utilizando el script de instalación

Si instaló su nodo utilizando el script [de instalación](set-up-node-with-installer.md), para actualizar su nodo, simplemente ejecute el script de instalador de nuevo.

```text
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

Y eso es todo, tu nodo se actualiza a la última versión.

Si instaló su nodo manualmente, proceda con el resto del tutorial.

## **Pare la versión del nodo antiguo**

Después de que la copia de seguridad esté asegurada, puede comenzar a actualizar su nodo. Comience parando la versión actualmente en ejecución.

### Nodo que se ejecuta desde el terminal

Si su nodo se está ejecutando en un terminal detiene presionando `ctrl+c`.

### Nodo que se ejecuta como servicio

Si su nodo se está ejecutando como servicio, detenga introduciendo lo siguiente:

`sudo systemctl stop avalanchego.service`

\(su servicio puede ser llamado de manera diferente, `avalanche.service`, o similar\)

### Nodo que se ejecuta en fondo

Si su nodo se está ejecutando en el fondo \(ejecutando con `nohup`, por ejemplo\) entonces encuentre el proceso ejecutando el nodo ejecutando `ps aux | grep avalanche`. Esto producirá salida como:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

En este ejemplo, la segunda línea muestra información sobre su nodo. Tenga en cuenta el proceso id, en este caso, `2630`. Detenga el nodo corriendo `matando -2 2630`.

Ahora estamos listos para descargar la nueva versión del nodo. Puede descargar el código fuente y luego construir el programa binario, o puede descargar el binario preconstruido. No necesitas hacer ambas cosas.

Descargar binario pre-construido es más fácil y recomendable si solo estás buscando ejecutar tu propio nodo y estaca en él.

Se recomienda construir el nodo [de fuente](upgrade-your-avalanchego-node.md#build-from-source) si eres un desarrollador que busca experimentar y construir en Avalanche.

## **Descargar Binary Pre-built**

Si desea descargar un binario pre-construido en lugar de construirlo usted mismo, vaya a nuestra [página](https://github.com/ava-labs/avalanchego/releases) de lanzamientos, y seleccione el lanzamiento que desea \(probablemente el más reciente. \)

En `Activos`, seleccione el archivo apropiado.

Para MacOS:   Descargar: `avalanchego-macos-<VERSION>.zip`   `Unzip: Unzip: avalanchego-macos-<VERSION>.zip`   La carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PC o proveedores de nube:   Descargar: `avalanchego-linux-amd64-<VERSION>.tar.gz`   Unzip: `alquitrán -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`   La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en los ordenadores basados en RaspberryPi4 o similares Arm64:   Descargar: `avalanchego-linux-arm64-<VERSION>.tar.gz`   Unzip: `alquitrán -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`   La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Ahora estás listo para ejecutar la nueva versión del nodo.

### Corriendo el nodo desde el terminal

Si está utilizando los binarios pre-construidos en MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

Si está utilizando los binarios pre-construidos en Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Agregue `nohup` al inicio del comando si desea ejecutar el nodo en el fondo.

### Ejecutar el nodo como servicio

Si estás dirigiendo el nodo como servicio, necesitas reemplazar los viejos binarios por los nuevos.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

y luego reiniciar el servicio con `sudo systemctl iniciar avalanchego.service`.

## **Construir desde la fuente**

Primer clon nuestro repo de Github \(puede saltar este paso si usted ha hecho esto antes de \):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Luego muévete al directorio avalanchego:

```text
cd avalanchego
```

Tire el último código:

```text
git pull
```

NOTA: si la rama maestra no se ha actualizado con la última etiqueta de lanzamiento, puede llegar directamente a ella a través de primer `git fetch --todos -tags` y luego `git checkout -force tags/<tag>` \(donde `<tag>` es la última etiqueta de liberación; por ejemplo `v1.3.2`\) en lugar de `git pull`. Tenga en cuenta que su copia local estará en un estado 'CABEZA separada', que no es un problema si no hace cambios en la fuente que desea reenviar al repositorio \(en cuyo caso debe consultar a una rama y a las fusiones ordinarias\). Tenga en cuenta también que la bandera `--force` descuidará cualquier cambio local que usted pueda tener.

Compruebe que su código local está actualizado. Há:

```text
git rev-parse HEAD
```

y compruebe que los primeros 7 caracteres impresos coinciden con el campo de la última comisión en nuestro [Github.](https://github.com/ava-labs/avalanchego)

NOTA: si usaste las `etiquetas de checkout git / <tag>` entonces estos primeros 7 caracteres deben coincidir con el hash de la etiqueta de la etiqueta.

Ahora construye el binario:

```text
./scripts/build.sh
```

Esto debería imprimir:

```text
Build Successful
```

Puedes comprobar qué versión estás ejecutando haciendo:

```text
./build/avalanchego --version
```

Puedes ejecutar tu nodo con:

```text
./build/avalanchego
```

