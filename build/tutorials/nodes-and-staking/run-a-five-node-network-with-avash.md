# Ejecución de una red de cinco nodos con Avash

[Avash](https://github.com/ava-labs/avalanche-docs/tree/5d8eee7598db8da63038af14437e5ed6dac39af7/build/tools/avash/README.md) es una red de desarrollo para ejecutar una red de pruebas o privada de Avalanche en tu máquina local. Puedes configurar y automatizar la red local para que esté en cualquier estado que quieras. Esto acelera en gran medida el trabajo local de desarrollo y las pruebas.

## Dependencias

Para empezar asegúrate de tener las versiones más recientes y mejores de cada dependencia.

### Golang

Primero, confirma que tienes la [versión más reciente de Golang](https://golang.org/dl) instalada y si no, instálala. Este tutorial usa `go1.17.1`.

```text
go version
go version go1.17.1 darwin/amd64
```

### avalanchego

A continuación, confirma que tienes la [versión más reciente de AvalancheGo](https://github.com/ava-labs/avalanchego/releases) instalada e incorporada. Este tutorial usa `avalanche/1.6.0`.

```text
cd /path/to/avalanchego
git fetch -p
git checkout v1.6.0
./scripts/build.sh
...building
...building
Build Successful

./build/avalanchego --version
avalanche/1.6.0 [database=v1.4.5, commit=43ab26923909bf5750c1edeb8477a3b912e40eaa]
```

### Avash

Luego, confirma que tienes la [versión más reciente de Avash](https://github.com/ava-labs/avalanchego/releases) instalada e incorporada. Este tutorial usa `v1.2.0`. Llama el comando `help` para confirmar que Avash está funcionando correctamente.

```text
cd /path/to/avash
git fetch -p
git checkout v1.2.0
go build

./avash help
A shell environment for launching and interacting with multiple Avalanche nodes.
```

## Pon en marcha una red local

Una vez que tienes todas las dependencias creadas correctamente, estás listo para poner en marcha una red local de Avalanche. En este ejemplo, ejecutaremos un script `five_node_staking.lua` que viene incluido con Avash.

### Script de participación de cinco nodos

Avash te permite automatizar tu entorno de desarrollo para que sea un número arbitrario de instancias locales de AvalancheGo con una configuración única para cada instancia. El script `five_node_staking.lua`, por ejemplo, pone en marcha una red local de Avalanche con cinco nodos AvalancheGo completos. Puedes interactuar con cada nodo individual por RPC.

En el siguiente aviso de script `five_node_staking.lua` puedes ejecutar y configurar un número arbitrario de nodos completos. Estás limitado por el número de claves de participante en el [directorio de Avash certs/](https://github.com/ava-labs/avash/tree/master/certs). AvalancheGo se envía con siete claves de participante.

Configura cada nodo por separado pasando [argumentos de la línea de comandos de AvalancheGo](https://docs.avax.network/build/references/command-line-interface) válidos.

```lua
cmds = {
    "startnode node1 --db-type=memdb --staking-enabled=true --http-port=9650 --staking-port=9651 --log-level=debug --bootstrap-ips= --staking-tls-cert-file=certs/keys1/staker.crt --staking-tls-key-file=certs/keys1/staker.key",
    "startnode node2 --db-type=memdb --staking-enabled=true --http-port=9652 --staking-port=9653 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys2/staker.crt --staking-tls-key-file=certs/keys2/staker.key",
    "startnode node3 --db-type=memdb --staking-enabled=true --http-port=9654 --staking-port=9655 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys3/staker.crt --staking-tls-key-file=certs/keys3/staker.key",
    "startnode node4 --db-type=memdb --staking-enabled=true --http-port=9656 --staking-port=9657 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys4/staker.crt --staking-tls-key-file=certs/keys4/staker.key",
    "startnode node5 --db-type=memdb --staking-enabled=true --http-port=9658 --staking-port=9659 --log-level=debug --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=certs/keys5/staker.crt --staking-tls-key-file=certs/keys5/staker.key",
}

for key, cmd in ipairs(cmds) do
    avash_call(cmd)
end
```

Inicia avash y ejecuta el script `five_node_staking.lua` mediante el intérprete de órdenes (shell) de Avash.

```text
cd /path/to/avash
./avash
avash> runscript scripts/five_node_staking.lua
```

Ahora abre una nueva pestaña y ejecuta este `curl`

```text
curl --location --request POST 'http://localhost:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNetworkName",
    "params" :{
    }
}'

{
    "jsonrpc": "2.0",
    "result": {
        "networkName": "local"
    },
    "id": 1
}
```

Si culminaste efectivamente cada uno de los pasos anteriores, tu red de avash local está lista.

## Inspecciona la red

El intérprete de órdenes (shell) de Avash proporciona el comando `procmanager` que te permite listar, detener e iniciar los procesos registrados en el administrador de procesos.

Comandos disponibles:

```text
kill        Kills the process named if currently running.
killall     Kills all processes if currently running.
list        Lists the processes currently running.
metadata    Prints the metadata associated with the node name.
remove      Removes the process named.
removeall   Removes all processes.
start       Starts the process named if not currently running.
startall    Starts all processes if currently stopped.
stop        Stops the process named if currently running.
stopall     Stops all processes if currently running.
```

Cuando `list` todos los procesos, puedes ver los valores de todas las etiquetas que se usaron para activar esa instancia de AvalancheGo.

![Lista de procesos](../../../.gitbook/assets/procmanager-list.png)

## Resumen

Avash sirve para la función crítica de permitir que los desarrolladores pongan a prueba su trabajo rápidamente en un entorno configurable con activos sin valor. Cada instancia de AvalancheGo es un nodo completo y Avash es una red de AvalancheGo real que está creando consenso real y produciendo bloques reales.

Si estás escribiendo sofware para la red de Avalanche, Avash es un bloque de construcción fundamental en tu flujo de trabajo. Debes comenzar cada nuevo proyecto en una red de Avash local y solo después de amplias pruebas y control de calidad puedes desplegar tu trabajo a la red de pruebas de Fuji y, finalmente, a la red principal.

