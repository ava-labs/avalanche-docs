---
tags: [Nodos]
description: Este tutorial demuestra cómo configurar la infraestructura para monitorear una instancia de AvalancheGo.
sidebar_label: Actualización
pagination_label: Actualiza tu nodo AvalancheGo
sidebar_position: 3
---

# Actualiza tu nodo AvalancheGo

## Haz una copia de seguridad de tu nodo

Antes de actualizar tu nodo, se recomienda hacer una copia de seguridad de tus archivos de staker que se utilizan para identificar tu nodo en la red. En la instalación predeterminada, puedes copiarlos ejecutando los siguientes comandos:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Luego, descarga los archivos `staker.crt` y `staker.key` y guárdalos en un lugar seguro y privado. Si algo le sucede a tu nodo o a la máquina en la que se ejecuta el nodo, estos archivos se pueden utilizar para recrear completamente tu nodo.

Si usas tu nodo con fines de desarrollo y tienes usuarios de keystore en tu nodo, también debes hacer una copia de seguridad de esos usuarios.

## Nodo instalado usando el script de instalación

Si instalaste tu nodo usando el [script de instalación](/nodes/run/with-installer.md), para actualizar tu nodo, simplemente ejecuta el script de instalación nuevamente.

```text
./avalanchego-installer.sh
```

Detectará que ya tienes AvalancheGo instalado:

```text
Instalador AvalancheGo
---------------------
Preparando el entorno...
Se encontró una arquitectura Intel/AMD de 64 bits...
Se encontró el servicio systemd AvalancheGo ya instalado, cambiando a modo de actualización.
Deteniendo el servicio...
```

Luego actualizará tu nodo a la última versión, y una vez que haya terminado, volverá a iniciar el nodo e imprimirá la información sobre la última versión:

```text
Nodo actualizado, iniciando el servicio...
Nueva versión del nodo:
avalanche/1.1.1 [red=mainnet, base de datos=v1.0.0, commit=f76f1fd5f99736cf468413bbac158d6626f712d2]
¡Hecho!
```

Y eso es todo, tu nodo se ha actualizado a la última versión.

Si instalaste tu nodo manualmente, continúa con el resto del tutorial.

## Detén la versión antigua del nodo

Después de asegurar la copia de seguridad, puedes comenzar a actualizar tu nodo. Empieza por detener la versión que se está ejecutando actualmente.

### Nodo en ejecución desde la terminal

Si tu nodo se está ejecutando en una terminal, detenlo presionando `ctrl+c`.

### Nodo en ejecución como un servicio

Si tu nodo se está ejecutando como un servicio, detenlo ingresando:

`sudo systemctl stop avalanchego.service`

(tu servicio puede tener un nombre diferente, `avalanche.service`, o similar)

### Nodo en ejecución en segundo plano

Si tu nodo se está ejecutando en segundo plano (por ejemplo, ejecutándose con `nohup`), encuentra el proceso que ejecuta el nodo ejecutando `ps aux | grep avalanche`. Esto producirá una salida como esta:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

En este ejemplo, la segunda línea muestra información sobre tu nodo. Toma nota del ID del proceso, en este caso, `2630`. Detén el nodo ejecutando `kill -2 2630`.

Ahora estamos listos para descargar la nueva versión del nodo. Puedes descargar el código fuente y luego compilar el programa binario, o puedes descargar el binario precompilado. No es necesario hacer ambas cosas.

Descargar el binario precompilado es más fácil y se recomienda si solo quieres ejecutar tu propio nodo y hacer stake en él.

Compilar el nodo [desde
fuente](upgrade-your-avalanchego-node.md#build-from-source) se recomienda si
eres un desarrollador que busca experimentar y construir en Avalanche.

## Descarga el binario precompilado

Si quieres descargar un binario precompilado en lugar de compilarlo tú mismo, ve a nuestra [página de versiones](https://github.com/ava-labs/avalanchego/releases) y selecciona la versión que deseas (probablemente la más reciente).

:::info

Si tienes un nodo, puedes suscribirte al
[servicio de notificación de avalanche](./avalanche-notify.md) con tu ID de nodo
para recibir notificaciones sobre nuevas versiones.

Además, o si no tienes un ID de nodo, puedes recibir notificaciones de lanzamiento desde github.
Para hacerlo, puedes ir a nuestro
[repositorio](https://github.com/ava-labs/avalanchego) y buscar en la esquina superior derecha
la opción **Watch**. Después de hacer clic en ella, selecciona **Custom**,
y luego **Releases**. Presiona **Apply** y listo.

:::

Bajo `Assets`, selecciona el archivo apropiado.

Para MacOS:  
Descarga: `avalanchego-macos-<VERSION>.zip`  
Descomprime: `unzip avalanchego-macos-<VERSION>.zip`  
La carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

Para Linux en PC o proveedores de nube:  
Descarga: `avalanchego-linux-amd64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Para Linux en computadoras basadas en Arm64:  
Descarga: `avalanchego-linux-arm64-<VERSION>.tar.gz`  
Descomprime: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  
La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

Ahora estás listo para ejecutar la nueva versión del nodo.

### Ejecutando el nodo desde la terminal

Si estás usando los binarios precompilados en MacOS:

```zsh
./avalanchego-<VERSION>/build/avalanchego
```

Si estás usando los binarios precompilados en Linux:

```zsh
./avalanchego-<VERSION>-linux/avalanchego
```

Agrega `nohup` al inicio del comando si quieres ejecutar el nodo en segundo plano.

### Ejecutando el nodo como un servicio

Si estás ejecutando el nodo como un servicio, necesitas reemplazar los binarios antiguos con los nuevos.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORIO_CON_BINARIOS_ANTIGUOS>`

y luego reinicia el servicio con `sudo systemctl start avalanchego.service`.

## Compila desde fuente

Primero clona nuestro repositorio de GitHub (puedes omitir este paso si ya lo has hecho antes):

```zsh
git clone https://github.com/ava-labs/avalanchego.git
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/avalanchego.git`

Puedes encontrar más información sobre SSH y cómo usarlo
[aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

Luego muévete al directorio de AvalancheGo:

```zsh
cd avalanchego
```

Obtén el último código:

```zsh
git pull
```

NOTA: si la rama principal no se ha actualizado con la última etiqueta de lanzamiento, puedes acceder directamente a ella ejecutando primero `git fetch --all --tags` y luego `git checkout --force tags/<etiqueta>` (donde `<etiqueta>` es la última etiqueta de lanzamiento; por ejemplo, `v1.3.2`) en lugar de `git pull`. Ten en cuenta que tu copia local estará en un estado de 'cabeza desprendida' (detached HEAD), lo cual no es un problema si no haces cambios en el código fuente que quieras enviar de vuelta al repositorio (en cuyo caso deberías hacer checkout a una rama y hacer fusiones ordinarias). Ten en cuenta también que la bandera `--force` ignorará cualquier cambio local que puedas tener.

Verifica que tu código local esté actualizado. Haz:

```text
git rev-parse HEAD
```

y verifica que los primeros 7 caracteres impresos coincidan con el campo Latest commit en nuestro [GitHub](https://github.com/ava-labs/avalanchego).

NOTA: si usaste `git checkout tags/<etiqueta>` entonces estos primeros 7 caracteres
deberían coincidir con el hash de confirmación de esa etiqueta.

Ahora compila el binario:

```zsh
./scripts/build.sh
```

Esto debería imprimir:

```zsh
Construcción exitosa
```

Puedes verificar qué versión estás ejecutando haciendo:

```zsh
./build/avalanchego --version
```

Puedes ejecutar tu nodo con:

```zsh
./build/avalanchego
```