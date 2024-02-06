---
tags: [Construir, Subnets]
description: Este tutorial demuestra el proceso de crear una Subnet con una máquina virtual personalizada y desplegarla localmente.
sidebar_label: Con una Máquina Virtual Personalizada
pagination_label: Desplegar una Subnet con Autorización Multifirma
sidebar_position: 5
---

# Crear una Subnet con una Máquina Virtual Personalizada

Este tutorial guía a través del proceso de crear una Subnet con una máquina virtual personalizada y
desplegarla localmente.
Aunque el tutorial utiliza un fork de Subnet-EVM como ejemplo, puedes extender sus lecciones para soportar
cualquier binario de VM personalizado.

## Hacer un Fork de Subnet-EVM

En lugar de construir una VM personalizada desde cero, este tutorial comienza haciendo un fork de Subnet-EVM.

### Clonar Subnet-EVM

En primer lugar, clona el repositorio de Subnet-EVM en un directorio de tu elección.

```shell
git clone https://github.com/ava-labs/subnet-evm.git
```

:::info
El método de clonación del repositorio utilizado es HTTPS, pero también se puede usar SSH:

`git clone git@github.com:ava-labs/subnet-evm.git`

Puedes encontrar más información sobre SSH y cómo usarlo
[aquí](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh).
:::

### Modificar y Construir Subnet-EVM

Para demostrar que estás ejecutando tu binario personalizado y no el Subnet-EVM de stock incluido con
Avalanche-CLI, necesitas modificar el binario de Subnet-EVM haciendo un cambio menor.

Navega al directorio en el que clonaste Subnet-EVM y genera un nuevo commit:

```shell
git commit -a --allow-empty -m "commit de vm personalizada"
```

Toma nota del nuevo hash de commit:

```shell
git rev-parse HEAD
c0fe6506a40da466285f37dd0d3c044f494cce32
```

En este caso, `c0fe6506a40da466285f37dd0d3c044f494cce32`.

Ahora construye tu binario personalizado ejecutando

```shell
./scripts/build.sh custom_vm.bin
```

Este comando construye el binario y lo guarda en `./custom_vm.bin`.

### Crear un Génesis Personalizado

Para iniciar una VM, necesitas proporcionar un archivo de génesis. Aquí tienes un génesis básico de Subnet-EVM que es
compatible con tu VM personalizada.

```json
{
  "config": {
    "byzantiumBlock": 0,
    "chainId": 12345,
    "constantinopleBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x2086799aeebeae135c246c65021c82b4e15a2c451340993aacfd2751886514f0",
    "eip155Block": 0,
    "eip158Block": 0,
    "feeConfig": {
      "gasLimit": 15000000,
      "targetBlockRate": 2,
      "minBaseFee": 25000000000,
      "targetGas": 15000000,
      "baseFeeChangeDenominator": 36,
      "minBlockGasCost": 0,
      "maxBlockGasCost": 1000000,
      "blockGasCostStep": 200000
    },
    "homesteadBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "petersburgBlock": 0,
    "subnetEVMTimestamp": 0
  },
  "nonce": "0x0",
  "timestamp": "0x0",
  "extraData": "0x",
  "gasLimit": "0xe4e1c0",
  "difficulty": "0x0",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {
    "8db97c7cece249c2b98bdc0226cc4c2a57bf52fc": {
      "balance": "0xd3c21bcecceda1000000"
    }
  },
  "airdropHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "airdropAmount": null,
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "baseFeePerGas": null
}
```

Abre un editor de texto y copia el texto anterior en un archivo llamado `custom_genesis.json`.

## Crear la Configuración de la Subnet

Ahora que tienes tu binario, es hora de crear la configuración de la Subnet. Este tutorial utiliza
`myCustomSubnet` como nombre de la Subnet. Invoca el Asistente de Creación de Subnet con este comando:

```shell
avalanche subnet create myCustomSubnet
```

### Elige tu VM

Selecciona `Personalizada` para tu VM.

```shell
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige tu VM:
    Subnet-EVM
  ▸ Personalizada
```

### Ingresa la Ruta a tu Génesis

Ingresa la ruta al archivo de génesis que creaste en este [paso](#crear-un-génesis-personalizado).

```shell
✔ Ingresa la ruta al génesis personalizado: ./custom_genesis.json
```

### Ingresa la Ruta a tu Binario de VM

A continuación, ingresa la ruta a tu binario de VM. Esta debería ser la ruta al `custom_evm.bin` que
creaste [anteriormente](#modificar-y-construir-subnet-evm).

```shell
✔ Ingresa la ruta al binario de vm: ./custom_vm.bin
```

### Finalizando

Si todo funcionó correctamente, el comando imprime `Configuración de Subnet creada exitosamente`.

Ahora es hora de desplegarla.

## Desplegar la Subnet Localmente

Para desplegar tu Subnet, ejecuta

`avalanche subnet deploy myCustomSubnet`

Asegúrate de sustituir el nombre de tu Subnet si usaste uno diferente a `myCustomSubnet`.

A continuación, selecciona `Red Local`.

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red para desplegar en:
  ▸ Red Local
    Fuji
    Mainnet
```

Este comando inicia una red Avalanche de cinco nodos en tu máquina. Necesita descargar las últimas
versiones de AvalancheGo y Subnet-EVM. El comando puede tardar unos minutos en ejecutarse.

Si todo funciona como se espera, la salida del comando debería verse algo así:

<!-- markdownlint-disable MD013 -->

```text
> avalanche subnet deploy myCustomSubnet
✔ Red Local
Desplegando [myCustomSubnet] en Red Local
Controlador de backend iniciado, pid: 26110, salida en: /home/fm/.avalanche-cli/runs/server_20230816_131014/avalanche-cli-backend.log
Instalando avalanchego-v1.10.8...
Instalación exitosa de avalanchego-v1.10.8
Ruta de registro del nodo: /home/fm/.avalanche-cli/runs/network_20230816_131608/node<i>/logs
Iniciando red...
VMs listas.

La blockchain ha sido desplegada. Espera hasta que la red lo reconozca...



Red de lista para usar. Puntos finales de los nodos de la red local:
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| NODO  |       VM       |                                        URL                                         |                    ALIAS URL                    |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node1 | myCustomSubnet | http://127.0.0.1:9650/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9650/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node2 | myCustomSubnet | http://127.0.0.1:9652/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9652/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node3 | myCustomSubnet | http://127.0.0.1:9654/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9654/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node4 | myCustomSubnet | http://127.0.0.1:9656/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9656/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+
| node5 | myCustomSubnet | http://127.0.0.1:9658/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc | http://127.0.0.1:9658/ext/bc/myCustomSubnet/rpc |
+-------+----------------+------------------------------------------------------------------------------------+-------------------------------------------------+

Detalles de conexión de la extensión del navegador (cualquier URL de nodo de arriba funciona):
URL RPC:          http://127.0.0.1:9650/ext/bc/z9a7L6XmFYskbaHuuLFCxThByKg4xqsYYbaqT5ke6xVutDQTp/rpc
```

Puedes usar la `URL RPC` para conectarte e interactuar con tu Subnet.

## Interactúa con tu Subnet

### Verifica la Versión

Puedes verificar que tu Subnet se haya desplegado correctamente consultando al nodo local para ver qué
Subnets está ejecutando. Necesitas usar el endpoint
[`getNodeVersion`](/reference/avalanchego/info-api.md#infogetnodeversion). Intenta ejecutar este
comando curl:

```shell
curl --location --request POST 'http://127.0.0.1:9650/ext/info' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeVersion",
    "params" :{
    }
}'
```

El comando devuelve una lista de todas las VM que tu nodo local está ejecutando junto con sus versiones.

```json
{
  "jsonrpc": "2.0",
  "result": {
    "version": "avalanche/1.10.8",
    "databaseVersion": "v1.4.5",
    "rpcProtocolVersion": "27",
    "gitCommit": "e70a17d9d988b5067f3ef5c4a057f15ae1271ac4",
    "vmVersions": {
      "avm": "v1.10.8",
      "evm": "v0.12.5",
      "platform": "v1.10.8",
      "qDMnZ895HKpRXA2wEvujJew8nNFEkvcrH5frCR9T1Suk1sREe": "v0.5.4@c0fe6506a40da466285f37dd0d3c044f494cce32"
    }
  },
  "id": 1
}
```

Tus resultados pueden ser ligeramente diferentes, pero puedes ver que además de la VM de la Cadena-X
`avm`, la VM de la Cadena-C `evm` y la VM de la Cadena-P `platform`, el nodo está ejecutando la VM
personalizada con el commit `c0fe6506a40da466285f37dd0d3c044f494cce32`.

### Verifica un Saldo

Si usaste el génesis predeterminado, tu VM personalizada tiene una dirección prefinanciada. Puedes verificar su saldo
con un comando curl. Asegúrate de sustituir la URL del comando con la `URL RPC` de tu
salida de despliegue.

<!-- markdownlint-disable MD013 -->

```shell
curl --location --request POST 'http://127.0.0.1:9650/ext/bc/myCustomSubnet/rpc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc",
        "latest"
    ],
    "id": 1
}'
```

<!-- markdownlint-enable MD013 -->

El comando debería devolver

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": "0xd3c21bcecceda1000000"
}
```

El saldo está codificado en hexadecimal, así que esto significa que la dirección tiene un saldo de 1 millón de tokens.

Ten en cuenta que este comando no funciona en todas las VM personalizadas, solo en las VM que implementan la
interfaz `eth_getBalance` de la EVM.

## Siguientes Pasos

Ahora has desbloqueado la capacidad de desplegar VMs personalizadas. ¡Ve y construye algo genial!
