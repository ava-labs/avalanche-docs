---
tags: [Nodos, AvalancheGo]
description: La forma más rápida de aprender sobre Avalanche es ejecutar un nodo e interactuar con la red. Este tutorial demuestra cómo instalar y ejecutar un nodo Avalanche, y conectarse a la Red Avalanche compilando un nodo desde el origen y ejecutándolo manualmente.
sidebar_label: Manualmente
pagination_label: Ejecutar un Nodo Avalanche Manualmente
sidebar_position: 0
keywords:
  [
    nodo avalanche,
    ejecutar un nodo,
    rpc,
    nodo rpc,
    rastrear mainnet,
    avalanche mainnet,
    construir desde el origen,
    binario,
    avalanchego,
    nodo blockchain,
  ]
---

# Ejecutar un Nodo Avalanche Manualmente

La forma más rápida de aprender sobre Avalanche es ejecutar un nodo e interactuar con la red.

En este tutorial, haremos lo siguiente:

- Instalar AvalancheGo y ejecutar un nodo Avalanche
- Conectarse a Avalanche

<details>

<summary>Otras Opciones</summary>
<p>

- Para usar un servicio de terceros para alojar su nodo o ejecutar un validador, [vea aquí](/nodes/run/third-party/aws-node.md) tutoriales dedicados.

- Si solo está interesado en configurar un nodo para hacer staking, se recomienda seguir el tutorial [AvalancheGo Install Script](/nodes/run/with-installer/installing-avalanchego.md).

</p>
</details>

## Requisitos de Hardware y Sistema Operativo

Avalanche es un protocolo increíblemente liviano, por lo que los nodos pueden ejecutarse en hardware de consumo. Tenga en cuenta que a medida que aumenta el uso de la red, los requisitos de hardware pueden cambiar.

- CPU: Equivalente a 8 vCPU de AWS
- RAM: 16 GiB
- Almacenamiento: 1 TiB SSD
- SO: Ubuntu 20.04 o MacOS >= 12

:::caution

Por favor, no intente ejecutar un nodo en un HDD, ya que puede obtener latencias de lectura/escritura pobres y aleatorias, lo que reduce el rendimiento y la confiabilidad.

:::

## Ejecutar un Nodo Avalanche desde el Código Fuente

Los siguientes pasos explican cómo descargar el código fuente de AvalancheGo y construir localmente el programa binario.

### Instalar Dependencias

- Instalar [gcc](https://gcc.gnu.org/)
- Instalar [go](https://go.dev/)

### Construir y Comenzar

#### 1. Configurar el [$GOPATH](https://github.com/golang/go/wiki/SettingGOPATH)

#### 2. Crear un directorio en su `$GOPATH`

```bash
mkdir -p $GOPATH/src/github.com/ava-labs
```

#### 3. Clonar AvalancheGo

En el `$GOPATH`, clone [AvalancheGo](https://github.com/ava-labs/avalanchego), el motor de consenso e implementación de nodo que es el núcleo de la Red Avalanche.

```bash
cd $GOPATH/src/github.com/ava-labs
git clone https://github.com/ava-labs/avalanchego.git
```

#### 4. Ejecutar el Script de Construcción

Desde el directorio `avalanchego`, ejecute el script de construcción

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./scripts/build.sh
```

#### 5. Iniciar el Nodo

En Avalanche Mainnet:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego
```

En Fuji Testnet:

```bash
cd $GOPATH/src/github.com/ava-labs/avalanchego
./build/avalanchego --network-id=fuji
```

:::info
Para detener el nodo, presione `Ctrl + C`.
:::

## Ejecutar con un Binario Pre-Construido

Para descargar un binario pre-construido en lugar de construir desde el origen, vaya a la página de versiones de [AvalancheGo releases](https://github.com/ava-labs/avalanchego/releases), y seleccione la versión deseada.

### Descargar

Bajo `Assets`, seleccione el archivo apropiado.

#### MacOS

Descargar: `avalanchego-macos-<VERSION>.zip`

Descomprimir:

```zsh
unzip avalanchego-macos-<VERSION>.zip
```

la carpeta resultante, `avalanchego-<VERSION>`, contiene los binarios.

#### Linux(PCs o Proveedores de Nube)

Descargar: `avalanchego-linux-amd64-<VERSION>.tar.gz`

Descomprimir:

```bash
tar -xvf avalanchego-linux-amd64-<VERSION>.tar.gz
```

La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

#### Linux(Arm64)

Descargar: `avalanchego-linux-arm64-<VERSION>.tar.gz`

Descomprimir:

```bash
tar -xvf avalanchego-linux-arm64-<VERSION>.tar.gz
```

La carpeta resultante, `avalanchego-<VERSION>-linux`, contiene los binarios.

### Iniciar el Nodo

#### MacOS

Avalanche Mainnet:

```sh
./avalanchego-<VERSION>/build/avalanchego
```

Fuji Testnet:

```sh
./avalanchego-<VERSION>/build/avalanchego --network-id=fuji
```

#### Linux

Avalanche Mainnet:

```sh
./avalanchego-<VERSION>-linux/avalanchego
```

Fuji Testnet:

```sh
./avalanchego-<VERSION>-linux/avalanchego --network-id=fuji
```

## Ejecutar con Docker

Consulte el repositorio [AvalancheGo GitHub](https://github.com/ava-labs/avalanchego#docker-install) para obtener más información.

## Networking

Para ejecutarse correctamente, AvalancheGo necesita aceptar conexiones desde Internet en el puerto de red `9651`. Antes de continuar con la instalación, debe determinar el entorno de red en el que se ejecutará su nodo.

<details>

<summary>Ejecutando en un Proveedor de Nube</summary>
<p>
Si su nodo se está ejecutando en una instancia de computadora de un proveedor de nube, tendrá una IP estática. Descubra cuál es esa IP estática, o configúrela si aún no lo ha hecho.
</p>
</details>

<details>

<summary>Ejecutando en una Conexión Doméstica</summary>
<p>

Si está ejecutando un nodo en una computadora que está en una conexión de internet residencial, tiene una IP dinámica; es decir, su IP cambiará periódicamente. **Para efectos de demostración, puede ignorar la siguiente información.** De lo contrario, deberá configurar el reenvío de puertos de entrada del puerto `9651` desde Internet hacia la computadora en la que se instala el nodo.

Como hay demasiados modelos y configuraciones de enrutadores, no podemos proporcionar instrucciones sobre qué hacer exactamente, pero hay guías en línea que se pueden encontrar (como [esta](https://www.noip.com/support/knowledgebase/general-port-forwarding-guide/), o [esta](https://www.howtogeek.com/66214/how-to-forward-ports-on-your-router/)), y el soporte de su proveedor de servicios también podría ayudar.

:::warning

Tenga en cuenta que un nodo Avalanche completamente conectado mantiene y se comunica a través de un par de miles de conexiones TCP en vivo. Para algunos enrutadores domésticos de baja potencia y más antiguos, eso podría ser demasiado para manejar. Si ese es el caso, es posible que experimente retrasos en otras computadoras conectadas al mismo enrutador, el nodo se queda en modo de espera, falla al sincronizar y problemas similares.

:::

</p>
</details>

:::info
Para poder realizar llamadas de API a su nodo desde otras máquinas, incluya el argumento `--http-host=` al iniciar el nodo.
:::

## Bootstrapping

Un nuevo nodo necesita ponerse al día con el último estado de la red antes de poder participar en el consenso y servir llamadas de API. Este proceso (llamado bootstrapping) actualmente lleva varios días para un nuevo nodo conectado a Mainnet, y un día aproximadamente para un nuevo nodo conectado a Fuji Testnet. Cuando una cadena dada ha terminado de arrancar, imprimirá registros como estos:

```text
[09-09|17:01:45.295] INFO <C Chain> snowman/transitive.go:392 consensus starting {"lastAcceptedBlock": "2qaFwDJtmCCbMKP4jRpJwH8EFws82Q2yC1HhWgAiy3tGrpGFeb"}
[09-09|17:01:46.199] INFO <P Chain> snowman/transitive.go:392 consensus starting {"lastAcceptedBlock": "2ofmPJuWZbdroCPEMv6aHGvZ45oa8SBp2reEm9gNxvFjnfSGFP"}
[09-09|17:01:51.628] INFO <X Chain> snowman/transitive.go:334 consensus starting {"lenFrontier": 1}
```

### Verificar el Progreso de Inicio Rápido

Para verificar si una cadena dada ha terminado de iniciar rápidamente, en otra ventana de terminal llama a
[`info.isBootstrapped`](/reference/avalanchego/info-api.md#infoisbootstrapped)
copiando y pegando el siguiente comando:

```sh
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si esto devuelve `true`, la cadena ha terminado de iniciar rápidamente; de lo contrario, devuelve
`false`. Si haces otras llamadas de API a una cadena que no ha terminado de iniciar rápidamente,
devolverá `Llamada de API rechazada porque la cadena no ha terminado de iniciar rápidamente`. Si
sigues teniendo problemas, contáctanos en
[Discord.](https://chat.avalabs.org/)

Aprende más sobre el inicio rápido [aquí](/nodes/maintain/node-bootstrap).

## RPC

Cuando haya terminado de iniciar rápidamente, los puntos finales RPC de las cadenas X, P y C serán:

```bash
localhost:9650/ext/bc/P
localhost:9650/ext/bc/X
localhost:9650/ext/bc/C/rpc
```

si se ejecuta localmente, o

```bash
XXX.XX.XX.XXX:9650/ext/bc/P
XXX.XX.XX.XXX:9650/ext/bc/X
XXX.XX.XX.XXX:9650/ext/bc/C/rpc
```

si se ejecuta en un proveedor de nube. El "XXX.XX.XX.XXX" debe ser reemplazado por la IP pública
de tu instancia EC2.

:::note
Las 3 cadenas arrancarán en el siguiente orden: cadena P, cadena X, cadena C.
:::

Para obtener más información sobre las solicitudes disponibles en estos puntos finales, consulta la
documentación de referencia de la API de AvalancheGo.

## Ir más allá

Tu nodo Avalanche realizará consenso por sí solo, pero aún no es un validador en la red. Esto significa
que el resto de la red no consultará tu nodo al muestrear la red durante el consenso. Si quieres agregar tu
nodo como validador, consulta [Agregar un Validador](/nodes/validate/add-a-validator.md)
para llevarlo un paso más allá.

También echa un vistazo a la sección de [Mantenimiento](/nodes/maintain/node-bootstrap.md) para aprender cómo
mantener y personalizar tu nodo para que se ajuste a tus necesidades.

Para rastrear una Subnet con tu nodo, dirígete al tutorial de [Nodo de Subnet](/nodes/run/subnet-node.md).
