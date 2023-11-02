---
etiquetas: [Herramientas, Avalanche-CLI]
descripción: Avalanche-CLI es una herramienta de línea de comandos que brinda a los desarrolladores acceso a todo Avalanche. Esta versión se especializa en ayudar a los desarrolladores a construir y probar Subnets.
etiqueta_de_paginación: Avalanche-CLI
posición_de_la_barra_lateral: 0
---

# Avalanche-CLI

Avalanche-CLI es una herramienta de línea de comandos que brinda a los desarrolladores acceso a todo Avalanche. Esta versión se especializa en ayudar a los desarrolladores a construir y probar Subnets.

Para comenzar, consulta la documentación de los subcomandos o empieza directamente con `avalanche subnet create myNewSubnet`.

[Instalar Avalanche CLI](https://docs.avax.network/tooling/cli-guides/install-avalanche-cli)

## Primary

El conjunto de comandos `primary` proporciona una colección de herramientas para interactuar con la Red Primaria de Avalanche.


### Primary AddValidator

El comando `primary addValidator` agrega un nodo Avalanche como validador en la Red Primaria de Avalanche con [AddPermissionlessValidatorTx](/reference/standards/guides/banff-changes.md#addpermissionlessvalidatortx).

Este comando requiere la clave BLS del nodo y la clave de posesión de prueba, se puede encontrar más información sobre BLS [aquí](/reference/avalanchego/p-chain/txn-format.md#proof-of-possession).

Para obtener la clave BLS y la clave de posesión de prueba de un nodo, llama a la API info.getNodeID como se muestra [aquí](/reference/avalanchego/info-api.md#infogetnodeid).

**Uso:**

```shell
avalanche primary addValidator [banderas]
```

**Banderas:**

```shell
    --nodeID string                 el ID de nodo del validador
-k, --key string                    seleccionar la clave a usar [solo implementación en fuji]
    --weight uint                   establecer el peso de staking del validador
    --start-time string             hora de inicio UTC cuando este validador comienza a validar, en formato 'AAAA-MM-DD HH:MM:SS'
    --staking-period duration       cuánto tiempo estará staking este validador
    --fuji fuji                     unirse en fuji (alias para `testnet`)
    --testnet testnet               unirse en testnet (alias para `fuji`)
    --mainnet mainnet               unirse en mainnet
-g, --ledger                        usar ledger en lugar de clave (siempre verdadero en mainnet, predeterminado falso en fuji)
    --ledger-addrs strings          usar las direcciones de ledger dadas
    --public-key string             establecer la clave pública BLS del validador
    --proof-of-possession string    establecer la prueba de posesión BLS del validador
    --delegation-fee uint           establecer la tarifa de delegación (20 000 es equivalente al 2%)
```

## Subnet

El conjunto de comandos `subnet` proporciona una colección de herramientas para desarrollar e implementar Subnets.

Para comenzar, usa el asistente de comandos `subnet create` para recorrer la configuración de tu primera Subnet. Luego, adelante y despliégala con el comando `subnet deploy`. Puedes usar el resto de los comandos para gestionar tus configuraciones de Subnet e implementaciones en vivo.

### Subnet AddValidator

El comando `subnet addValidator` agrega a la lista blanca de la Subnet un validador de la red primaria para validar la Subnet implementada proporcionada.

Para agregar el validador a la lista de permitidos de la Subnet, primero debes proporcionar el subnetName y el NodeID único del validador. Luego, el comando solicita la hora de inicio de validación, la duración y el peso de staking. Puedes omitir estas solicitudes proporcionando los valores con banderas.

Este comando actualmente solo funciona en Subnets implementadas en la Fuji Testnet o Mainnet.

**Uso:**

```shell
avalanche subnet addValidator [subnetName] [banderas]
```

**Banderas:**

<!-- markdownlint-disable MD013 -->

```shell
    --fuji fuji                  unirse en fuji (alias para `testnet`)
-h, --help                       ayuda para addValidator
-k, --key string                 seleccionar la clave a usar [solo implementación en fuji]
-g, --ledger                     usar ledger en lugar de clave (siempre verdadero en mainnet, predeterminado falso en fuji)
    --ledger-addrs strings       usar las direcciones de ledger dadas
    --mainnet mainnet            unirse en mainnet
    --nodeID string              establecer el NodeID del validador a agregar
    --output-tx-path string      ruta de archivo de la tx de agregar validador
    --staking-period duration    cuánto tiempo estará staking este validador
    --start-time string          hora de inicio UTC cuando este validador comienza a validar, en formato 'AAAA-MM-DD HH:MM:SS'
    --subnet-auth-keys strings   claves de control que se utilizarán para autenticar la tx de agregar validador
    --testnet testnet            unirse en testnet (alias para `fuji`)
    --weight uint                establecer el peso de staking del validador a agregar
```

<!-- markdownlint-enable MD013 -->

### Eliminar Validador en una Subnet

Este comando elimina un nodo como validador en una Subnet.

**Uso:**

```shell
avalanche subnet removeValidator [subnetName] [banderas]
```

**Banderas:**

```shell
avalanche subnet export [subnetName] [flags]
```

**Flags:**

```shell
-h, --help        help for export
-o, --output      path to the output file
```

```shell
avalanche subnet exportar [nombreSubred] [flags]
```

**Flags:**

```shell
-h, --ayuda            ayuda para exportar
-o, --salida string    escribe los datos de exportación en la ruta de archivo proporcionada
```

### Importar Subred

El comando `subnet importar` importa configuraciones a Avalanche-CLI.

Este comando admite la importación desde un archivo creado en otra computadora,
o la importación desde Subredes que se ejecutan en redes públicas
(por ejemplo, creadas manualmente o con Subnet-CLI obsoleta)

#### Importar desde un Archivo

Para importar desde un archivo, opcionalmente puedes proporcionar la ruta como argumento de línea de comandos.
Alternativamente, ejecutar el comando sin ningún argumento desencadena un asistente interactivo.
Para importar desde un repositorio, sigue el asistente. De forma predeterminada, una Subred importada no
sobrescribe una Subred existente con el mismo nombre. Para permitir sobrescrituras, proporciona la bandera `--force`.

**Uso:**

```shell
avalanche subnet importar archivo [rutaSubred] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --rama string   la rama del repositorio a usar si se descarga un nuevo repositorio
-f, --force         sobrescribe la configuración existente si existe una
-h, --ayuda         ayuda para importar
    --repo string   el repositorio a importar (por ejemplo, ava-labs/avalanche-plugins-core) o la URL para descargar el repositorio desde
    --subnet string la configuración de la subred a importar desde el repositorio proporcionado
```

<!-- markdownlint-enable MD013 -->

#### Importar desde una Red Pública

El comando `subnet importar publica` importa una configuración de Subred desde una red en ejecución.

El archivo de génesis debe estar disponible en el disco para que esto funcione. De forma predeterminada, una Subred importada
no sobrescribe una Subred existente con el mismo nombre. Para permitir sobrescrituras, proporciona la bandera `--force`.

**Uso:**

```shell
avalanche subnet importar publica [rutaSubred] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --custom                     usa una plantilla de VM personalizada
    --evm                        importa una subnet-evm
-f, --force                      sobrescribe la configuración existente si existe una
    --fuji fuji                  importar desde fuji (alias para `testnet`)
    --ruta-archivo-genesis string   ruta al archivo de génesis
-h, --ayuda                       ayuda para publica
    --mainnet mainnet            importar desde mainnet
    --url-nodo string            [opcional] URL de un validador de subred en ejecución
    --id-subred string           el ID de la subred
    --testnet testnet            importar desde testnet (alias para `fuji`)

```

<!-- markdownlint-enable MD013 -->



### Unirse a una Subred

El comando `subnet unirse` configura tu nodo validador para comenzar a validar una nueva Subred.

Para completar este proceso, debes tener acceso a la máquina que ejecuta tu validador. Si la
CLI se está ejecutando en la misma máquina que tu validador, puede generar o actualizar automáticamente
el archivo de configuración de tu nodo. Alternativamente, el comando puede imprimir las instrucciones necesarias
para actualizar tu nodo manualmente. Para completar el proceso de validación, los administradores de la Subred deben agregar
el NodeID de tu validador a la lista de permitidos de la Subred llamando a `addValidator` con tu
NodeID.

Después de actualizar la configuración de tu validador, debes reiniciar tu validador manualmente. Si
proporcionas la bandera `--avalanchego-config`, este comando intenta editar el archivo de configuración
en esa ruta.

Este comando actualmente solo admite Subredes implementadas en la Testnet Fuji y Mainnet.

**Uso:**

```shell
avalanche subnet unirse [nombreSubred] [flags]
```

**Flags:**

```shell
    --avalanchego-config string   ruta de archivo del archivo de configuración de avalanchego
    --fallar-si-no-valida         fallar si falla la verificación de lista blanca
    --force-verificacion-lista-blanca       si es verdadero, forzar la verificación de lista blanca
    --force-escribir                 si es verdadero, omitir la solicitud para sobrescribir el archivo de configuración
    --fuji fuji                   unirse en fuji (alias para `testnet`)
-h, --ayuda                        ayuda para unirse
    --mainnet mainnet             unirse en mainnet
    --nodeID string               establecer el NodeID del validador a verificar
    --directorio-plugin string           ruta de archivo del directorio de complementos de avalanchego
    --imprimir                       si es verdadero, imprime la configuración manual sin solicitar
    --saltar-verificacion-lista-blanca        si es verdadero, salta la verificación de lista blanca
    --testnet testnet             unirse en testnet (alias para `fuji`)
```

### Listar Subredes

El comando `subnet listar` imprime los nombres de todas las configuraciones de Subred creadas. Sin ninguna bandera,
imprime información general y estática sobre la Subred. Con la bandera `--deployed`, el comando
muestra información adicional, incluyendo el VMID, BlockchainID y SubnetID.

**Uso:**

```shell
avalanche subnet listar [flags]
```

**Flags:**

```shell
    --deployed   mostrar información de implementación adicional
-h, --ayuda       ayuda para listar
```

### Publicar Subred

El comando `subnet publicar` publica la VM de la Subred en un repositorio.

**Uso:**

```shell
avalanche subnet publicar [nombreSubred] [flags]
```

**Flags:**

<!-- markdownlint-disable MD013 -->

```shell
    --alias string              Publicamos en un repositorio remoto, pero identificamos el repositorio localmente con un alias proporcionado por el usuario (por ejemplo, myrepo).
    --force                     Si es verdadero, ignora si la Subred ha sido publicada en el pasado e intenta una publicación forzada.
-h, --ayuda                      ayuda para publicar
    --no-repo-path string       No permitas que la herramienta administre la publicación de archivos, sino que solo genere los archivos y los coloque en la ubicación dada por esta bandera.
    --repo-url string           La URL del repositorio donde estamos publicando
    --ruta-archivo-subred string   Ruta al archivo de descripción de la Subred. Si no se proporciona, se iniciará una secuencia de solicitud.
    --ruta-archivo-vm string       Ruta al archivo de descripción de la VM. Si no se proporciona, se iniciará una secuencia de solicitud.
```

<!-- markdownlint-enable MD013 -->

### Estadísticas de Subred

El comando `subnet estadisticas` imprime estadísticas del validador para la Subred dada.

**Uso:**

```shell
avalanche subnet estadisticas [nombreSubred] [flags]
```

**Flags:**



```shell
    --fuji                                  add permissionless delegator in existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 add permissionless delegator in existing local deployment
    --mainnet                               add permissionless delegator in existing mainnet deployment
    --nodeID            string              node id of node to delegate stake to in elastic subnet
    --stake-amount      int                 amount of tokens to stake on delegator
    --staking-period    string              how long delegator delegates for after start time
    --start-time        string              when delegator starts delegating (format as "2006-01-02 15:00:00")
    --testnet                               add permissionless delegator in existing testnet deployment (alias for `fuji`)
```

### Remove Permissionless Validator from an Elastic Subnet

This command removes a permissionless validator from an Elastic Subnet.

**Usage:**

```shell
avalanche subnet leave [subnetName] --elastic [flags]
```

**Flags:**

```shell
    --fuji                                  remove permissionless validator from existing fuji deployment (alias for `testnet`)
-k, --key               string              select the key to use [fuji only]
-g, --ledger                                use ledger instead of key (always true on mainnet, defaults to false on fuji)
    --ledger-addrs      strings             use the given ledger addresses
    --local                                 remove permissionless validator from existing local deployment
    --mainnet                               remove permissionless validator from existing mainnet deployment
    --nodeID            string              node id of node to be removed as validator in elastic subnet
    --testnet                               remove permissionless validator from existing testnet deployment (alias for `fuji`)
```

```shell
    --fuji                                  agregar un delegador sin permisos en una implementación existente de fuji (alias para `testnet`)
-k, --key               string              seleccionar la clave a usar [solo fuji]
-g, --ledger                                usar ledger en lugar de clave (siempre verdadero en mainnet, predeterminado falso en fuji)
    --ledger-addrs      strings             usar las direcciones de ledger dadas
    --local                                 agregar un delegador sin permisos en una implementación local existente
    --mainnet                               agregar un delegador sin permisos en una implementación mainnet existente
    --nodeID            string              ID de nodo del nodo que se agregará como validador en la subred elástica
    --stake-amount      int                 cantidad de tokens para delegar al validador
    --staking-period    string              cuánto tiempo delegar después de la hora de inicio
    --start-time        string              cuándo comenzar a delegar (formato como "2006-01-02 15:00:00")
    --testnet                               agregar un delegador sin permisos en una implementación de testnet existente (alias para `fuji`)
```

## Actualización de Subred

El conjunto de comandos `subnet upgrade` proporciona una colección de herramientas para
actualizar tus Subredes en desarrollo y desplegadas.

### Subnet Upgrade Apply

Aplica los bytes de actualización generados a los nodos de la Subred en ejecución para desencadenar una actualización de red.

Para redes públicas (Fuji Testnet o Mainnet), para completar este proceso, debes tener acceso a la
máquina que ejecuta tu validador. Si la CLI se está ejecutando en la misma máquina que tu validador, puede
manipular la configuración de tu nodo automáticamente. Alternativamente, el comando puede imprimir las
instrucciones necesarias para actualizar tu nodo manualmente.

Después de actualizar la configuración de tu validador, debes reiniciar tu validador manualmente. Si
proporcionas la bandera `--avalanchego-chain-config-dir`, este comando intenta escribir el archivo de actualización
en esa ruta. Consulta [este documento](/nodes/configure/chain-config-flags.md#subnet-chain-configs) para
documentación relacionada.

**Uso:**

```shell
avalanche subnet upgrade apply [subnetName] [flags]
```

**Banderas:**

```shell
    --avalanchego-chain-config-dir string   directorio del archivo de configuración de cadena de avalanchego (predeterminado "/Users/connor/.avalanchego/chains")
    --config                                crear configuración de actualización para implementaciones futuras de Subred (igual que generar)
    --force                                 Si es verdadero, no solicitar confirmación de marcas de tiempo en el pasado
    --fuji fuji                             aplicar actualización en implementación fuji existente (alias para `testnet`)
-h, --help                                  ayuda para apply
    --local local                           aplicar actualización en implementación local existente
    --mainnet mainnet                       aplicar actualización en implementación mainnet existente
    --print                                 si es verdadero, imprimir la configuración manual sin solicitar (solo para redes públicas)
    --testnet testnet                       aplicar actualización en implementación de testnet existente (alias para `fuji`)
```

### Subnet Upgrade Export

Exporta el archivo de bytes de actualización a una ubicación de tu elección en el disco.

**Uso:**

```shell
avalanche subnet upgrade export [subnetName] [flags]
```

**Banderas:**

```shell
    --force                     Si es verdadero, sobrescribe un archivo posiblemente existente sin preguntar
-h, --help                      ayuda para export
    --upgrade-filepath string   Exportar archivo de bytes de actualización a ubicación de elección en el disco
```

### Subnet Upgrade Generate

El comando `subnet upgrade generate` construye un nuevo archivo upgrade.json para personalizar tu Subred. 
Guía al usuario a través del proceso utilizando un asistente interactivo.

**Uso:**

```shell
avalanche subnet upgrade generate [subnetName] [flags]
```

**Banderas:**

```shell
-h, --help   ayuda para generate
```

### Subnet Upgrade Import

Importa el archivo de bytes de actualización al entorno local.

**Uso:**

```shell
avalanche subnet upgrade import [subnetName] [flags]
```

**Banderas:**

```shell
-h, --help                      ayuda para import
    --upgrade-filepath string   Importar archivo de bytes de actualización al entorno local
```

### Subnet Upgrade Print

Imprime el contenido del archivo upgrade.json.

**Uso:**

```shell
avalanche subnet upgrade print [subnetName] [flags]
```

**Banderas:**

```shell
-h, --help       ayuda para list
```

### Subnet Upgrade VM

El comando `subnet upgrade vm` permite al usuario actualizar la binaria de la VM de su Subred. El comando
puede actualizar Subredes locales y Subredes desplegadas públicamente en Fuji y Mainnet.

El comando guía al usuario a través de un asistente interactivo. El usuario puede omitir el asistente proporcionando
banderas de línea de comandos.

**Uso:**

```shell
avalanche subnet upgrade export [subnetName] [flags]
```

**Banderas:**

```shell
    --deployed   mostrar información adicional de implementación
-h, --help       ayuda para list
```

## Nodo

El conjunto de comandos `nodo` proporciona una colección de herramientas para crear y mantener
validadores en la Red Avalanche.

Para comenzar, usa el comando `node create` para caminar a través de la
configuración y hacer que tu nodo sea un validador primario en la red pública Avalanche. Puedes usar los
demás comandos para mantener tu nodo y hacer que tu nodo sea un validador de Subred.

### Node Create

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node create` configura un validador en un servidor en la nube de tu elección.
El validador estará validando la Red Primaria Avalanche y la Subred
de tu elección. De forma predeterminada, el comando ejecuta un asistente interactivo.
Te guía a través de todos los pasos que necesitas para configurar un validador.
Una vez que se ejecuta este comando, debes esperar a que el validador
termine de arrancar en la red primaria antes de ejecutar más
comandos en él, por ejemplo, validar una Subred. Puedes verificar el estado de arranque
ejecutando `avalanche node status`.

El nodo creado formará parte de un grupo de validadores llamado `<clusterName>` y los usuarios pueden llamar a los comandos del nodo con `<clusterName>` para que el comando se aplique a todos los nodos en el clúster.

**Uso:**

```shell
  avalanche node create [clusterName] [flags]
```

**Flags:**

```shell
  -h, --help   ayuda para crear
```

### Lista de Nodos

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node list` lista todos los clústeres con sus nodos.

**Uso:**

```shell
  avalanche node list [flags]
```

**Flags:**

```shell
  -h, --help   ayuda para listar
```

### Estado del Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node status` obtiene el estado de arranque de todos los nodos en un clúster en la Red Primaria. 
Para obtener el estado de arranque de un nodo con una Subred, use la bandera `--subnet`.

**Uso:**

```shell
  avalanche node status [clusterName] [flags]
```

**Flags:**

```shell
  -h, --help            ayuda para estado
      --subnet string   especifica la subred con la que el nodo se está sincronizando
```

### Detener el Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node stop` detiene un nodo en ejecución en el servidor en la nube.

Tenga en cuenta que un nodo detenido aún puede incurrir en tarifas de almacenamiento del servidor en la nube.

**Uso:**

```shell
  avalanche node stop [clusterName] [flags]
```

**Flags:**

```shell
  -h, --help   ayuda para detener
```

### Sincronización del Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node sync` permite que todos los nodos en un clúster se inicien en una Subred. 
Puede verificar el estado de arranque de la Subred llamando a `avalanche node status <clusterName> --subnet <subnetName>`

**Uso:**

```shell
  avalanche node sync [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
  -h, --help   ayuda para sincronizar
```

### Actualización del Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El conjunto de comandos `node update` proporciona una colección de comandos para que los nodos actualicen su versión de AvalancheGo o la versión/configuración de la VM.
Puede verificar el estado después de la actualización llamando a `avalanche node status`

### Actualización de la Subred del Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node update subnet` actualiza todos los nodos en un clúster con la configuración más reciente de la Subred y
Puede verificar el estado de arranque de la Subred actualizada llamando a avalanche
`node status <clusterName> --subnet <subnetName>`

**Uso:**

```shell
  avalanche node update subnet [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
  -h, --help   ayuda para subnet
```

### Validación del Nodo

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El conjunto de comandos `node validate` proporciona una colección de comandos para que los nodos se unan
a la Red Primaria y a las Subredes como validadores.
Si alguno de los comandos se ejecuta antes de que los nodos se inicien en la Red Primaria, el comando
fallará. Puede verificar el estado de arranque llamando a `avalanche node status <clusterName>`.

### Validación del Nodo Primario

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node validate primary` permite que todos los nodos en un clúster sean validadores de la Red
Primaria.

**Uso:**

```shell
  avalanche node validate primary [clusterName] [flags]
```

**Flags:**

```shell
  -f, --fuji testnet              configurar validador en fuji (alias para testnet)
  -h, --help                      ayuda para primario
  -k, --key string                seleccionar la clave a usar [solo fuji]
  -g, --ledger                    usar ledger en lugar de clave (siempre verdadero en mainnet, predeterminado falso en fuji)
      --ledger-addrs strings      usar las direcciones de ledger dadas
  -m, --mainnet                   configurar validador en mainnet
      --stake-amount uint         cuántos AVAX apostar en el validador
      --staking-period duration   cuánto tiempo valida el validador después de la hora de inicio
  -t, --testnet fuji              configurar validador en testnet (alias para fuji)
```

### Validación del Nodo Subred

:::warning

(Advertencia ALPHA) Este comando está actualmente en modo experimental.

:::

El comando `node validate subnet` permite que todos los nodos en un clúster sean validadores de una Subred.
Si el comando se ejecuta antes de que los nodos sean validadores de la Red Primaria, el comando primero
hará que los nodos sean validadores de la Red Primaria antes de hacerlos validadores de la Subred. 
Si el comando se ejecuta antes de que los nodos se inicien en la Red Primaria, el comando
fallará. 
Puede verificar el estado de arranque llamando a `avalanche node status <clusterName>`.
Si el comando se ejecuta antes de que los nodos se sincronicen con la Subred, el comando fallará.
Puede verificar el estado de sincronización de la Subred llamando a `avalanche node status <clusterName> --subnet <subnetName>`.

**Uso:**

```shell
  avalanche node validate subnet [clusterName] [subnetName] [flags]
```

**Flags:**

```shell
  -f, --fuji testnet              configurar validador en fuji (alias para testnet)
  -h, --help                      ayuda para subnet
  -k, --key string                seleccionar la clave a usar [solo fuji]
  -g, --ledger                    usar ledger en lugar de clave (siempre verdadero en mainnet, predeterminado falso en fuji)
      --ledger-addrs strings      usar las direcciones de ledger dadas
  -m, --mainnet                   configurar validador en mainnet
      --stake-amount uint         cuántos AVAX apostar en el validador
      --staking-period duration   cuánto tiempo valida el validador después de la hora de inicio
  -t, --testnet fuji              configurar validador en testnet (alias para fuji)
```

## Red

El conjunto de comandos `network` proporciona una colección de herramientas para administrar despliegues de Subredes locales.

Cuando despliega una Subred localmente, se ejecuta en una red Avalanche local de múltiples nodos. El
comando `subnet deploy` inicia esta red en segundo plano. Este conjunto de comandos le permite
apagar, reiniciar y limpiar esa red.

Esta red admite actualmente múltiples Subredes desplegadas de manera concurrente.

### Limpieza de la Red

El comando `network clean` apaga su red local de múltiples nodos. Todas las Subredes desplegadas
se apagan y eliminan su estado. Puede reiniciar la red desplegando una nueva configuración de Subred.

**Uso:**

```shell
avalanche network clean [flags]
```

**Flags:**



```shell
-h, --help              help for transfer
-i, --input-key string  name of the input key or ledger address
-o, --output-key string name of the output key or ledger address
-a, --amount int        amount of funds to transfer (in smallest unit, e.g., nAVAX)
```

```shell
  -o, --amount float                 cantidad a enviar o recibir (unidades AVAX)
  -f, --force                        evitar confirmación de transferencia
  -u, --fuji                         transferencia entre direcciones de la red de pruebas (fuji)
  -h, --help                         ayuda para transferencia
  -k, --key string                   clave asociada a la dirección del remitente o receptor
  -i, --ledger uint32                índice del ledger asociado a la dirección del remitente o receptor (por defecto 32768)
  -l, --local                        transferencia entre direcciones de la red local
  -m, --mainnet                      transferencia entre direcciones de la red principal
  -g, --receive                      recibir la transferencia
  -r, --receive-recovery-step uint   paso de recepción a utilizar para la recuperación de transacciones de múltiples pasos
  -s, --send                         enviar la transferencia
  -a, --target-addr string           dirección del receptor
  -t, --testnet                      transferencia entre direcciones de la red de pruebas (fuji)
```
