---
etiquetas: [Nodos, Subredes]
descripción: Instrucciones detalladas para ejecutar un nodo Avalanche que rastrea una Subred.
sidebar_label: Nodos de Subred
pagination_label: Ejecutar un Nodo de Subred
sidebar_position: 2
palabras clave: [subred, avalanche, subred avalanche, ejecutar un nodo de subred, nodo de subred, rastrear subred, máquina virtual, binario]
---

# Ejecutar un Nodo de Subred

## Introducción

Este artículo describe cómo ejecutar un nodo que rastrea una Subred. Requiere construir AvalancheGo, agregar
los binarios de la Máquina Virtual como complementos a su directorio de datos local y ejecutar AvalancheGo para rastrear estos
binarios.

Este tutorial cubre específicamente el rastreo de una Subred construida con la
[Subnet-EVM](https://github.com/ava-labs/subnet-evm) de Avalanche, la Máquina Virtual
por defecto [Virtual Machine](/learn/avalanche/virtual-machines.md)
ejecutada por las Subredes en Avalanche.

## Construir AvalancheGo

Se recomienda que primero completes [esta guía completa](/nodes/run/node-manually.md)
que muestra cómo construir y ejecutar un nodo Avalanche básico. A continuación se presentan los detalles generales.

<details><summary>Requisitos del sistema</summary>
<p>

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB SSD
- SO: Ubuntu 20.04 o MacOS >= 12

Tenga en cuenta que a medida que aumenta el uso de la red, los requisitos de hardware pueden
cambiar.
</p></details>

<details><summary>Para construir desde el código fuente:</summary>
<p>

1. Instalar [gcc](https://gcc.gnu.org/)
2. Instalar [go](https://go.dev/)

3. Configurar la variable [$GOPATH](https://github.com/golang/go/wiki/SettingGOPATH)

4. Crear un directorio en su `$GOPATH`

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
``` 
<!-- markdownlint-disable MD029 -->

5. Clonar AvalancheGo

En el `$GOPATH`, clonar [AvalancheGo](https://github.com/ava-labs/avalanchego),
el motor de consenso e implementación de nodo que es el núcleo de la
Red Avalanche.

```bash
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/avalanchego.git
``` 

6. Ejecutar el script de construcción

Desde el directorio `avalanchego`, ejecutar el script de construcción

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./scripts/build.sh
``` 

</p></details>

## Gestionar los Binarios de la Subred

_Despues de construir AvalancheGo exitosamente,_

### 1. Clonar [Subnet-EVM](https://github.com/ava-labs/subnet-evm)

```bash
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/subnet-evm.git
```

### 2. Construir el Binario y Guardarlo como un Complemento

En el directorio de Subnet-EVM, ejecutar el script de construcción y guardarlo en la carpeta "plugins" de su
directorio de datos `.avalanchego`. Nombre el complemento con el `VMID` de la Subred que desea rastrear.
El `VMID` de la Subred WAGMI es el valor que comienza con "srEX...".

```bash
cd $GOPATH/src/github.com/ava-labs/subnet-evm
./scripts/build.sh ~/.avalanchego/plugins/srEXiWaHuhNyGwPUi444Tu47ZEDwxTWrbQiuD7FmgSAQ6X7Dy
```

<details><summary>¿Dónde puedo encontrar parámetros de la Subred como VMID?</summary>
<p>
El VMID, ID de Subred, ChainID y todos los demás parámetros se pueden encontrar en la sección "Chain Info"
del Subnet Explorer.

- [Mainnet Avalanche](https://subnets.avax.network/c-chain)
- [Testnet Fuji](https://subnets-test.avax.network/wagmi)

</p></details>

### 3. Especificar el Complemento con un Config.json

Cree un archivo llamado `config.json` y agregue un campo `track-subnets` que esté poblado con el
`SubnetID` que desea rastrear. El `SubnetID` de la Subred WAGMI es el valor que comienza con
"28nr...".

```bash
cd ~/.avalanchego
echo '{"track-subnets": "28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY"}' > config.json
```

<!-- markdownlint-enable MD029 -->

## Ejecutar el Nodo

Ejecute AvalancheGo con la bandera `--config-file` para iniciar su nodo y asegurarse de que rastree las Subredes
incluidas en el archivo de configuración.

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego --config-file ~/.avalanchego/config.json --network-id=fuji
```

Nota: El comando anterior incluye el comando `--network-id=fuji` porque la Subred WAGMI está desplegada
en la Testnet Fuji.

<details><summary>Ejecutar a través de la línea de comandos en su lugar</summary>
<p>

Si prefiere rastrear Subredes usando una bandera de línea de comandos, en su lugar puede usar la bandera `--track-subnets`.

Por ejemplo:

```bash
./build/avalanchego --track-subnets 28nrH5T2BMvNrWecFcV3mfccjs6axM1TVyqe79MCv2Mhs8kxiY --network-id=fuji
```

</p></details>

Ahora debería ver la terminal llena de registros e información que sugiere que el nodo se está ejecutando correctamente
y ha comenzado a arrancar en la red.

## Detalles de Arranque y RPC

Puede tomar algunas horas para que el nodo se [arranque](/nodes/run/node-manually.md#bootstrapping)
completamente a la Red Primaria Avalanche y las Subredes rastreadas.

Cuando termine de arrancar, el punto final será:

```bash
localhost:9650/ext/bc/<BlockchainID>/rpc
```

si se ejecuta localmente, o

```bash
XXX.XX.XX.XXX:9650/ext/bc/<BlockchainID>/rpc
```

si se ejecuta en un proveedor de nube. Las "X" deben ser reemplazadas por la
IP pública de su instancia EC2.

Para obtener más información sobre las solicitudes disponibles en estos puntos finales, consulte la
documentación de [Referencia de API de Subnet-EVM](/reference/subnet-evm/api.md).

Debido a que cada nodo también está rastreando la Red Primaria, esos
puntos finales [RPC](nodes/run/node-manually.md#rpc) también están disponibles.