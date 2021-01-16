# Actualiza tu Nodo AvalancheGo

## **Haz una copia de seguridad de tu Nodo**

Antes de actualizar su nodo, se recomienda hacer una copia de seguridad de los archivos de su staker que se utilizan para identificar su nodo en la red. En la instalación predeterminada, puede copiarlos ejecutando los siguientes comandos:

```text
cd
cp ~/.avalanchego/staking/staker.crt .
cp ~/.avalanchego/staking/staker.key .
```

Ahora descarga los archivos`staker.crt` y`staker.key`y mantenlos en un lugar seguro y privado. Si algo le pasa a tu nodo o el nodo de la máquina funciona, estos archivos pueden ser usados para recrear completamente tu nodo.

Si utiliza su nodo con fines de desarrollo y tiene usuarios de keystore en su nodo, también debería hacer una copia de seguridad de los mismos.

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

If your node is running in a terminal stop it by pressing `ctrl+c`.

### Nodo ejecutándose como un servicio

If your node is running as a service, stop it by entering:

`sudo systemctl stop avalanchego.service`

\(your service may be named differently, `avalanche.service`, or similar\)

### Node running in background

If your node is running in the background \(by running with `nohup`, for example\) then find the process running the node by running `ps aux | grep avalanche`. This will produce output like:

```text
ubuntu  6834  0.0  0.0   2828   676 pts/1    S+   19:54   0:00 grep avalanche
ubuntu  2630 26.1  9.4 2459236 753316 ?      Sl   Dec02 1220:52 /home/ubuntu/build/avalanchego
```

In this example, second line shows information about your node. Note the process id, in this case, `2630`. Stop the node by running `kill -2 2630`.

Now we are ready to download the new version of the node. You can either download the source code and then build the binary program, or you can download the pre-built binary. You don’t need to do both.

Downloading pre-built binary is easier and recommended if you're just looking to run your own node and stake on it.

Building the node [from source](upgrade-your-avalanchego-node.md#build-from-source) is recommended if you're a developer looking to experiment and build on Avalanche.

## **Download Pre-built Binary**

If you want to download a pre-built binary instead of building it yourself, go to our [releases page](https://github.com/ava-labs/avalanchego/releases), and select the release you want \(probably the latest one.\)

Under `Assets`, select the appropriate file.

For MacOS:  
Download: `avalanchego-macos-<VERSION>.zip`  
Unzip: `unzip avalanchego-macos-<VERSION>.zip`  
The resulting folder, `avalanchego-<VERSION>`, contains the binaries.

For Linux on PCs or cloud providers:  
Download: `avalanchego-linux-amd64-<VERSION>.tar.gz`  
Unzip: `tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz`  
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

For Linux on RaspberryPi4 or similar Arm64-based computers:  
Download: `avalanchego-linux-arm64-<VERSION>.tar.gz`  
Unzip: `tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz`  
The resulting folder, `avalanchego-<VERSION>-linux`, contains the binaries.

You are now ready to run the new version of the node.

### Running the node from terminal

If you are using the pre-built binaries on MacOS:

```cpp
./avalanchego-<VERSION>/build/avalanchego
```

If you are using the pre-built binaries on Linux:

```cpp
./avalanchego-<VERSION>-linux/avalanchego
```

Add `nohup` at the start of the command if you want to run the node in the background.

### Running the node as a service

If you're running the node as a service, you need to replace the old binaries with the new ones.

`cp -r avalanchego-<VERSION>-linux/* <DIRECTORY_WITH_OLD_BINARIES>`

and then restart the service with `sudo systemctl start avalanchego.service`.

## **Build from source**

First clone our Github repo \(you can skip this step if you’ve done this before\):

```text
git clone https://github.com/ava-labs/avalanchego.git
```

Then move to the avalanchego directory:

```text
cd avalanchego
```

Pull the latest code:

```text
git pull
```

Check that your local code is up to date. Do:

```text
git rev-parse HEAD
```

and check that the first 7 characters printed match the Latest commit field on our [Github.](https://github.com/ava-labs/avalanchego)

Now build the binary:

```text
./scripts/build.sh
```

This should print:

```text
Build Successful
```

You can check what version you’re running by doing:

```text
./build/avalanchego --version
```

You can run your node with:

```text
./build/avalanchego
```

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg3OTE0OTY1Ml19
-->