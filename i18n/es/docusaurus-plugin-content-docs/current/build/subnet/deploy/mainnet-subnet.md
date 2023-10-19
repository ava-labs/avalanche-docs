---
tags: [Construir, Subredes]
description: Este tutorial demuestra cómo implementar una Subred con permisos en la Mainnet de Avalanche.
sidebar_label: En la Mainnet de Avalanche
pagination_label: Implementar una Subred con permisos en Mainnet
sidebar_position: 2
---

# Implementar una Subred con permisos en Mainnet

:::warning

Implementar una Subred en Mainnet tiene muchos riesgos. Hacerlo de manera segura requiere un enfoque
láser en seguridad. Este tutorial hace todo lo posible por señalar peligros comunes, pero puede haber
otros riesgos no discutidos aquí.

Este tutorial es un recurso educativo y no ofrece garantías de que seguirlo resulte en una
implementación segura. Además, este tutorial toma algunos atajos que ayudan a comprender el proceso de
implementación a expensas de la seguridad. El texto resalta estos atajos y no deben usarse para una
implementación en producción.

:::

Después de gestionar con éxito una implementación de Subred en la `Fuji Testnet`, estás listo para
implementar tu Subred en Mainnet. Si no lo has hecho, primero [implementa una Subred en
Testnet](/build/subnet/deploy/fuji-testnet-subnet.md).

Este tutorial muestra cómo hacer lo siguiente en `Mainnet`.

- Crear una Subred.
- Implementar una máquina virtual basada en Subnet-EVM.
- Unir un nodo a la Subred recién creada.
- Agregar un nodo como validador a la Subred.

:::note

Todos los ID en este artículo son solo con fines ilustrativos. Se garantiza que serán diferentes en
tu propia ejecución de este tutorial.

:::

## Requisitos previos

- 5+ nodos en ejecución y [totalmente arrancados](/nodes/README.md) en `Mainnet`
- [Avalanche-CLI está instalado](/tooling/cli-guides/install-avalanche-cli.md) en cada nodo validador
- Un dispositivo [Ledger](https://www.ledger.com/)
- Has [creado una configuración de Subred](/build/subnet/hello-subnet.md#create-your-subnet-configuration)
  y probado completamente una implementación de Subred en [Fuji Testnet
  ](/build/subnet/deploy/fuji-testnet-subnet.md)

:::warning

Aunque solo se requiere estrictamente un validador para ejecutar una Subred, ejecutarla con menos de
cinco validadores es extremadamente peligroso y garantiza un tiempo de inactividad de la red. Planea
soportar al menos cinco validadores en tu red de producción.

:::

### Obtener tus NodeIDs de Mainnet

Necesitas recopilar los NodeIDs de cada uno de tus validadores. Este tutorial utiliza estos NodeIDs en
varios comandos.

Para obtener el NodeID de un nodo `Mainnet`, llama al endpoint
[info.getNodeID](/reference/avalanchego/info-api.md#infogetnodeid). Por ejemplo:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La respuesta debería verse algo así:

```json
{
  "jsonrpc": "2.0",
  "result": {
    "nodeID": "NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD"
  },
  "id": 1
}
```

En la respuesta de ejemplo, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` es el NodeID. Ten en cuenta que el
prefijo `NodeID-` es parte del NodeID.

### Configurar tu Ledger

En interés de la seguridad, todas las operaciones Avalanche-CLI en `Mainnet` requieren el uso de un
dispositivo Ledger conectado. Debes desbloquear tu Ledger y ejecutar la aplicación Avalanche. Consulta
[Cómo usar Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche)
para obtener ayuda para configurarlo.

Avalanche-CLI admite los dispositivos Ledger `Nano X`, `Nano S` y `Nano S Plus`.

Los dispositivos Ledger admiten la firma de TX para cualquier dirección dentro de una secuencia
generada automáticamente por el dispositivo.

De forma predeterminada, Avalanche-CLI utiliza la primera dirección de la derivación, y esa dirección
necesita fondos para emitir las TX para crear la Subred y agregar validadores.

Para obtener la primera dirección `Mainnet` de tu dispositivo Ledger, primero asegúrate de que esté
conectado, desbloqueado y ejecutando la aplicación Avalanche. Luego ejecuta el comando `key list`:

```bash
avalanche key list --ledger 0 --mainnet
```

```text
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
|  KIND  |  NAME   |          CHAIN          |                    ADDRESS                    | BALANCE | NETWORK |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
| ledger | index 0 | P-Chain (Bech32 format) | P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j |      11 | Mainnet |
+--------+---------+-------------------------+-----------------------------------------------+---------+---------+
```

El comando imprime la dirección de la P-Chain para `Mainnet`,
`P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j`, y su saldo. Debes financiar esta dirección con al
menos 2.5 AVAX para cubrir las tarifas de TX. La tarifa de TX para crear tu Subred cuesta 2 AVAX. Agregar
validadores cuesta 0.001 AVAX cada uno. Para más detalles, consulta [Tarifas](/reference/standards/guides/txn-fees)

:::note

Puedes usar el comando `key list` para obtener cualquier dirección de Ledger en la secuencia de
derivación cambiando el parámetro de índice de `0` al deseado, o a una lista de ellos (por ejemplo: `2`,
o `0,4,7`). Además, puedes solicitar direcciones en `Fuji` con el parámetro `--fuji`, y redes locales
con el parámetro `--local`.

:::

#### Financiar el Ledger

Un nuevo dispositivo Ledger no tiene fondos en las direcciones que controla. Debes enviar fondos a él
exportándolos de la C-Chain a la P-Chain usando la [Billetera Web de
Avalanche](https://wallet.avax.network).

Puedes cargar la dirección de la C-Chain del Ledger en la billetera web o cargar una clave privada
diferente. Puedes transferir fondos de la C-Chain a la P-Chain haciendo clic en Cross Chain en el lado
izquierdo de la billetera web. Consulta este
[tutorial](https://support.avax.network/en/articles/6169872-how-to-make-a-cross-chain-transfer-in-the-avalanche-wallet-between-x-and-c-chain)
para obtener más instrucciones.

## Implementar la Subred

Con tu Ledger desbloqueado y ejecutando la aplicación Avalanche, ejecuta

```bash
avalanche subnet deploy testsubnet
```

Esto va a iniciar una nueva serie de comandos.

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Elije una red para implementar en:
    Red Local
    Fuji
  ▸ Mainnet
```

Este tutorial trata sobre la implementación en `Mainnet`, así que navega con las teclas de flecha hasta
`Mainnet` y presiona enter.

```text
✔ Mainnet
Implementando [testsubnet] en Mainnet
```

Después de eso, la CLI muestra la dirección del Ledger `Mainnet` utilizada para financiar la implementación:

```text
Dirección del Ledger: P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j
```

La implementación requiere ejecutar una transacción [createSubnet](/reference/avalanchego/p-chain/api.md#platformcreatesubnet)
y una transacción [createBlockchain](/reference/avalanchego/p-chain/api.md#platformcreateblockchain),
por lo que esta primera dirección del libro mayor debe tener los fondos para emitir ambas operaciones.

Este tutorial crea una Subnet con permisos. Como tal, debes especificar qué direcciones de la P-Chain pueden
controlar la Subnet. Estas direcciones se conocen como `Control Keys`. La CLI puede configurar automáticamente
la dirección de tu Ledger como la única clave de control o el usuario puede especificar una lista personalizada.

:::warning

En Subnets de producción, siempre debes usar múltiples claves de control que se ejecuten en una configuración de multisig.
Este tutorial utiliza una sola clave de control únicamente con fines ilustrativos.

Para obtener instrucciones sobre cómo controlar tu Subnet con un multisig, consulta el [Tutorial de Implementación de Multisig](/build/subnet/deploy/multisig-auth.md).

:::

```text
Configura qué direcciones pueden realizar cambios en la subnet.
Estas direcciones se conocen como tus claves de control. También vas a
establecer cuántas claves de control se requieren para hacer un cambio en la subnet (el umbral).
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cómo te gustaría configurar tus claves de control?:
  ▸ Usar dirección del ledger
    Lista personalizada
```

Para este tutorial, opta por usar la primera dirección del Ledger, así que ingresa en `Usar dirección del ledger`. Solo
esta dirección podrá agregar o eliminar validadores, o crear blockchains en la Subnet.

```text
Tus claves de control de la Subnet: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
Tus claves de autenticación de la subnet para la creación de la cadena: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
```

A continuación, la CLI genera una TX para crear la SubnetID y le pide al usuario que la firme usando el Ledger.

```text
*** Por favor, firma el hash de creación de la subnet en el dispositivo Ledger ***
```

Esto activa una ventana `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger usando el botón derecho del Ledger,
y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Si el Ledger no tiene suficientes fondos, es posible que el usuario vea un mensaje de error:

```text
*** Por favor, firma el hash de creación de la subnet en el dispositivo Ledger ***
Error: fondos insuficientes: los UTXO proporcionados necesitan 1000000000 unidades más del activo "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

Si tiene éxito, la CLI te pide que firmes una TX de creación de cadena.

```text
La Subnet ha sido creada con ID: 2UUCLbdGqawRDND7kHjwq3zXXMPdiycG2bkyuRzYMnuTSDr6db. Ahora creando la blockchain...
*** Por favor, firma el hash de creación de la blockchain en el dispositivo Ledger ***
```

Esto activa una ventana `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger usando el botón derecho del Ledger,
y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Después de eso, la CLI crea la blockchain dentro de la Subnet, y aparece una ventana de resumen para la implementación.

```text
+--------------------+------------------------------------------------------------------------------------+
| RESULTADOS DEPLOYMENT |                                                                                    |
+--------------------+------------------------------------------------------------------------------------+
| Nombre de la Cadena | testsubnet                                                                         |
+--------------------+------------------------------------------------------------------------------------+
| ID de la Subnet     | 2UUCLbdGqawRDND7kHjwq3zXXMPdiycG2bkyuRzYMnuTSDr6db                                 |
+--------------------+------------------------------------------------------------------------------------+
| ID de la VM         | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii                                  |
+--------------------+------------------------------------------------------------------------------------+
| ID de la Blockchain | wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG                                  |
+--------------------+------------------------------------------------------------------------------------+
| URL RPC             | http://127.0.0.1:9650/ext/bc/wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG/rpc |
+--------------------+------------------------------------------------------------------------------------+
| TXID de la P-Chain  | wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG                                  |
+--------------------+------------------------------------------------------------------------------------+
```

Bien hecho. Acabas de crear tu propia Subnet ejecutándose en `Mainnet`. Ahora es hora de agregar tus validadores.

## Solicitud para unirse a una Subnet como validador

La nueva Subnet creada en los pasos anteriores aún no tiene ningún validador dedicado.
Para solicitar permiso para validar una Subnet, se requieren los siguientes pasos:

:::info

Agregar un validador en una Subnet requiere que el nodo ya sea un validador en la red primaria,
lo que significa que tu nodo se ha **iniciado completamente**.

Consulta [aquí](/nodes/validate/add-a-validator.md#add-a-validator-with-avalanche-wallet) cómo convertirte
en un validador.

:::

Primero, solicita permiso para validar ejecutando el comando `join` junto con el nombre de la Subnet:

```bash
avalanche subnet join testsubnet
```

Nota: ¡Ejecutar el comando `join` no garantiza que tu nodo sea un validador de la Subnet! El propietario de
la Subnet debe aprobar que tu nodo sea un validador llamando a `addValidator` como se describe en la siguiente sección.

### Seleccionar Mainnet

Cuando ejecutas el comando `join`, primero se te solicita la selección de la red. Elige `Mainnet`:

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red en la que validar (este comando solo admite redes públicas):
    Fuji
  ▸ Mainnet
```

### Configurar el Nodo Automáticamente

Ahora hay dos opciones posibles: configuración automática y manual. Como se mencionó anteriormente,
"Automático" intenta editar tu archivo de configuración y configura tu directorio de complementos, mientras que "Manual" solo
imprime la configuración requerida en la pantalla. Si estás ejecutando la CLI en la misma máquina que tu
validador, debes ejecutar los comandos en modo automatizado. Si no quieres ejecutar Avalanche-CLI
en la misma máquina que tu validador, usa los comandos manuales.

Selecciona automático.

#### Configurar Archivo de Configuración

```text
✔ Automático
✔ Ruta a tu archivo de configuración existente (o donde se va a generar): config.json
```

Proporcione la ruta a un archivo de configuración. Si este comando se ejecuta en la máquina donde se está ejecutando su validador, podría apuntar esto al archivo de configuración realmente utilizado, por ejemplo, `/etc/avalanchego/config.json` - solo asegúrese de que la herramienta tenga acceso de **escritura** al archivo. O podría simplemente copiar el archivo más tarde. En cualquier caso, la herramienta va a intentar editar el archivo existente especificado por la ruta dada, o crear un nuevo archivo. Nuevamente, establezca permisos de escritura.

#### Establecer Directorio de Plugins

A continuación, proporcione el directorio de plugins. Cada VM ejecuta su propio binario, llamado plugin. Por lo tanto, necesita copiar el binario de plugin de su VM en el directorio de plugins de AvalancheGo. Este directorio depende de la ubicación de instalación de AvalancheGo.

```text
✔ Ruta a su directorio de plugins de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins
```

La herramienta no sabe exactamente dónde se encuentra, por lo que requiere la ruta completa. Con la ruta dada, va a copiar el binario de la VM a la ubicación proporcionada:

```text
✔ Ruta a su directorio de plugins de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins█
Binario de VM escrito en /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw
Esto va a editar su archivo de configuración existente. Esta edición no es destructiva, pero siempre es bueno tener una copia de seguridad.
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Continuar?:
  ▸ Sí
    No
```

Al presionar `Sí`, se escribe el archivo necesario:

```text
✔ Sí
El archivo de configuración ha sido editado. Para usarlo, asegúrese de iniciar el nodo con la opción '--config-file', por ejemplo.

./build/avalanchego --config-file config.json

(usando su ubicación binaria). El nodo debe reiniciarse para que los cambios surtan efecto.
```

#### Reiniciar el Nodo

Es **necesario reiniciar el nodo**.

### Configurar el Nodo Manualmente

Al elegir "Manual" en su lugar, la herramienta imprime _instrucciones_. El usuario va a tener que seguir estas instrucciones y aplicarlas al nodo. Tenga en cuenta que las ID de la VM y la Subnet son diferentes para cada implementación de Subnet y no debe copiarlas de este tutorial.

```text
✔ Manual

Para configurar su nodo, debe hacer dos cosas:

1. Agregar su binario de VM al directorio de plugins de su nodo
2. Actualizar la configuración de su nodo para comenzar a validar la Subnet

Para agregar la VM a su directorio de plugins, copie o scp desde /tmp/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw

Si instaló avalanchego manualmente, su directorio de plugins es probablemente
avalanchego/build/plugins.

Si inicia su nodo desde la línea de comandos SIN un archivo de configuración (por ejemplo, a través de un script de línea de comandos o systemd), agregue la siguiente bandera al comando de inicio de su nodo:

--track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H
(si el nodo ya tiene una configuración de track-subnets, agregue el nuevo valor separado por comas).

Por ejemplo:
./build/avalanchego --network-id=Mainnet --track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

Si inicia el nodo a través de un archivo de configuración JSON, agregue esto a su archivo de configuración:
track-subnets: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

CONSEJO: Pruebe este comando con la bandera --avalanchego-config apuntando a su archivo de configuración, esta herramienta va a intentar actualizar el archivo automáticamente (asegúrese de que pueda escribir en él).

Después de actualizar su configuración, va a necesitar reiniciar su nodo para que los cambios surtan efecto.
```

## Agregar un Validador

:::warning

Si el comando `join` no se completa con éxito antes de que se complete `addValidator`, la Subnet podría experimentar un rendimiento degradado o incluso detenerse.

:::

Ahora que el nodo se ha unido a la Subnet, un titular de la clave de control de la Subnet debe llamar a `addValidator` para otorgar al nodo permiso para ser un validador en su Subnet.

Para incluir en la lista blanca a un nodo como un validador reconocido en la Subnet, ejecute:

```bash
avalanche subnet addValidator testsubnet
```

Debe repetir este proceso para cada validador que agregue a la red.

Puede ejecutar las transacciones `addValidator` desde la misma máquina que implementó la Subnet.

### Enviar TX de addValidator a Mainnet

Primero elija `Mainnet` como la red a la que agregar el validador de la Subnet.

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Elija una red a la que agregar el validador.:
    Fuji
  ▸ Mainnet
```

Debido a que esta operación emite una nueva
[transacción](/reference/avalanchego/p-chain/api.md#platformaddsubnetvalidator), la CLI necesita las
claves de control para firmar la operación. Debido a que este tutorial solo usa una clave de control en la Subnet, el proceso se ve ligeramente diferente si se usan múltiples claves de control. La dirección necesita pagar una tarifa de TX de 0.001 AVAX.

```text
Sus claves de autenticación de la Subnet para la creación de la TX de addValidator: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
```

### Establecer NodeID

Ahora ingrese el [**NodeID**](#obtener-tus-nodeids-de-mainnet) del validador.

```text
A continuación, necesitamos el NodeID del validador que desea incluir en la lista blanca.

Consulte https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeid para obtener instrucciones sobre cómo consultar el NodeID desde su nodo
(Edite la dirección IP del host y el puerto para que coincidan con su implementación, si es necesario).
✔ ¿Cuál es el NodeID del validador que desea incluir en la lista blanca?: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg█
```

Tenga en cuenta que esta ID está modificada intencionalmente para evitar la replicación.

### Establecer Peso de Stake

Seleccione 30 como peso de stake. Puede obtener más información sobre el parámetro de peso de stake en
[addSubnetValidator](/reference/avalanchego/p-chain/api.md#platformaddsubnetvalidator) en la sección
`weight`.

:::warning

El peso de stake de todos sus validadores debe sumar al menos 100.

:::

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué peso de stake le gustaría asignar al validador?:
    Predeterminado (20)
  ▸ Personalizado
```

```text
✔ ¿Qué peso de stake le gustaría asignar al validador?: 30
```

### Establecer Hora de Inicio de Validación

A continuación, especifique cuándo va a comenzar la validación del validador. El tiempo debe estar en el futuro. Puede usar la opción personalizada para ingresar una fecha específica en formato `AAAA-MM-DD HH:MM:SS`. Siga el valor predeterminado esta vez:

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Hora de inicio:
  ▸ Comenzar en un minuto
    Personalizado
```

### Establecer Duración de Validación

Finalmente, especifique cuánto tiempo va a estar validando:

```text
✔ Comenzar en un minuto
Use las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cuánto tiempo debe validar su validador?:
  ▸ Hasta que expire el validador de la red primaria
    Personalizado
```

Si elige `Personalizado` aquí, debe ingresar una **duración**, que es un período de tiempo expresado en horas. Por ejemplo, digamos `200 días = 24 * 200 = 4800h`.

```text
✔ ¿Cuánto tiempo debe estar validando este validador? Ingresa una duración, por ejemplo, 8760h: 4800h
```

La CLI muestra al usuario una fecha actual:

```text
? Tu validador terminará de hacer stake para el 2023-06-10 13:07:58:
  ▸ Sí
    No
```

Confirma si es correcto.

### Emitir la TX

En este punto, la serie de preguntas está completa y la CLI intenta la transacción:

```text
NodeID: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
Red: Mainnet
Hora de inicio: 2022-11-22 13:07:58
Hora de finalización: 2023-06-10 13:07:58
Peso: 30
Entradas completas, emitiendo transacción para agregar la información del validador proporcionada...
```

La CLI muestra la dirección del Ledger:

```text
Dirección del Ledger: P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j
```

En este punto, si la dirección del Ledger no es la clave de control para la Subnet, el usuario recibe
un error:

```text
Error: la billetera no contiene claves de autenticación de la Subnet
estado de salida 1
```

Si el Ledger no tiene suficientes fondos, aparece el siguiente mensaje de error:

```text
*** Por favor, firma el hash de creación de la Subnet en el dispositivo Ledger ***
Error: fondos insuficientes: los UTXO proporcionados necesitan 1000000 unidades más del activo "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

De lo contrario, tanto la CLI como el Ledger solicitan firmar la TX:

```text
*** Por favor, firma el hash de añadir validador en el dispositivo Ledger ***
```

Esto activa una ventana de `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger
usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y
derecho.

Esto puede tomar unos segundos. Después, imprime:

```text
Transacción exitosa, ID de transacción: r3tJ4Wr2CWA8AaticmFrKdKgAs5AhW2wwWTaQHRBZKwJhsXzb
```

¡Esto significa que el nodo ahora es un validador en la Subnet dada en `Mainnet`! Sin embargo, tu trabajo no está
completo. **Debes** terminar la sección [Solicitud para unirse a una Subnet como validador](#solicitud-para-unirse-a-una-subnet-como-validador)
de lo contrario, tu Subnet corre el riesgo de tiempo de inactividad.

Puedes obtener información de la identificación de la TX en la P-Chain en [Avalanche Explorer](https://subnets.avax.network/)

## Exportar Subnet

Debido a que necesitas configurar múltiples validadores en múltiples máquinas diferentes, necesitas exportar
la configuración de tu Subnet e importarla en cada validador.

```bash
avalanche subnet export testsubnet
✔ Ingresa la ruta del archivo para escribir los datos de exportación: /tmp/testsubnet-export.dat
```

El archivo está en formato de texto y no debes cambiarlo. Puedes usarlo para importar la configuración
en una máquina diferente.

## Importar Subnet

Para importar una configuración de VM, mueve el archivo que exportaste en la sección anterior a tu máquina
deseada y emite el comando `import` con la ruta al archivo.

```bash
avalanche subnet import /tmp/testsubnet-export.dat
Subnet importada exitosamente
```

Después de esto, toda la configuración de la Subnet debería estar disponible en la máquina de destino:

```text
avalanche subnet list
+---------------+---------------+----------+-----------+----------+
|    SUBNET     |     CHAIN     | CHAIN ID |   TYPE    | DEPLOYED |
+---------------+---------------+----------+-----------+----------+
| testsubnet    | testsubnet    |     3333 | SubnetEVM | No       |
+---------------+---------------+----------+-----------+----------+
```

## Ponerse en marcha

Una vez que todos tus validadores se hayan unido a la red, estás listo para emitir transacciones a tu Subnet.

Para la seguridad de tus validadores, deberías configurar nodos API dedicados para procesar transacciones, pero
para fines de prueba, puedes emitir transacciones directamente a la interfaz RPC de uno de tus validadores.
