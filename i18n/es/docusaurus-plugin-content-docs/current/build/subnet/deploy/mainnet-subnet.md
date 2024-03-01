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
láser en seguridad. Este tutorial hace todo lo posible por señalar las trampas comunes, pero puede haber
otros riesgos no discutidos aquí.

Este tutorial es un recurso educativo y no ofrece garantías de que seguirlo resulte en una
implementación segura. Además, este tutorial toma algunos atajos que ayudan a comprender el proceso de
implementación a expensas de la seguridad. El texto resalta estos atajos y no deben usarse para una
implementación en producción.

:::

Después de gestionar con éxito una implementación de Subred en la `Fuji Testnet`, estás listo para implementar tu
Subred en Mainnet. Si no lo has hecho, primero
[Implementa una Subred en Testnet](/build/subnet/deploy/fuji-testnet-subnet.md).

Este tutorial muestra cómo hacer lo siguiente en `Mainnet`.

- Crear una Subred.
- Implementar una máquina virtual basada en Subnet-EVM.
- Unir un nodo a la Subred recién creada.
- Agregar un nodo como validador a la Subred.

:::note

Todos los ID en este artículo son solo con fines ilustrativos. Está garantizado que serán diferentes en
tu propia ejecución de este tutorial.

:::

## Prerrequisitos

- 5+ nodos en ejecución y [totalmente arrancados](/nodes/README.md) en `Mainnet`
- [Avalanche-CLI está instalado](/tooling/cli-guides/install-avalanche-cli.md) en la caja de cada nodo validador
- Un dispositivo [Ledger](https://www.ledger.com/)
- Has [creado una configuración de Subred](/build/subnet/hello-subnet.md#create-your-subnet-configuration)
  y probado completamente una implementación de Subred en [Fuji Testnet](/build/subnet/deploy/fuji-testnet-subnet.md)

:::warning

Aunque solo se requiere estrictamente un validador para ejecutar una Subred, ejecutarla con menos de cinco
validadores es extremadamente peligroso y garantiza un tiempo de inactividad de la red. Planea soportar al menos cinco
validadores en tu red de producción.

:::

### Obtener tus NodeIDs de Mainnet

Necesitas recopilar los NodeIDs de cada uno de tus validadores. Este tutorial utiliza estos NodeIDs en
varios comandos.

Para obtener el NodeID de un nodo `Mainnet`, llama al punto final
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

En la respuesta de muestra, `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD` es el NodeID. Ten en cuenta que el
prefijo `NodeID-` es parte del NodeID.

### Configurar tu Ledger

En interés de la seguridad, todas las operaciones Avalanche-CLI en `Mainnet` requieren el uso de un
dispositivo Ledger conectado. Debes desbloquear tu Ledger y ejecutar la aplicación Avalanche. Consulta [Cómo usar
Ledger](https://support.avax.network/en/articles/6150237-how-to-use-a-ledger-nano-s-or-nano-x-with-avalanche)
para obtener ayuda para configurarlo.

Avalanche-CLI es compatible con los dispositivos Ledger `Nano X`, `Nano S` y `Nano S Plus`.

Los dispositivos Ledger admiten la firma de TX para cualquier dirección dentro de una secuencia generada automáticamente por el dispositivo.

De forma predeterminada, Avalanche-CLI utiliza la primera dirección de la derivación, y esa dirección necesita fondos para
emitir las TX para crear la Subred y agregar validadores.

Para obtener la primera dirección `Mainnet` de tu dispositivo Ledger, primero asegúrate de que esté conectado,
desbloqueado y ejecutando la aplicación Avalanche. Luego ejecuta el comando `key list`:

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
`P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j`, y su saldo. Debes financiar esta dirección con
al menos 2.5 AVAX para cubrir las tarifas de TX. La tarifa de TX para crear tu Subred cuesta 2 AVAX. Agregar
validadores cuesta 0.001 AVAX cada uno. Para más detalles, consulta [Tarifas](/reference/standards/guides/txn-fees)

:::note

Puedes usar el comando `key list` para obtener cualquier dirección de Ledger en la secuencia de derivación al
cambiar el parámetro de índice de `0` al deseado, o a una lista de ellos (por ejemplo: `2`, o
`0,4,7`). Además, puedes solicitar direcciones en `Fuji` con el parámetro `--fuji`, y redes locales
con el parámetro `--local`.

:::

#### Financiar el Ledger

Un nuevo dispositivo Ledger no tiene fondos en las direcciones que controla. Deberás enviar fondos a través de él al
exportarlos de C-Chain a P-Chain usando [Core web](https://core.app)
conectado a [Core extension](https://join.core.app/extension).

Puedes cargar la dirección de C-Chain del Ledger en la extensión Core, o cargar una clave privada diferente en
[Core extension](https://join.core.app/extension), y luego conectarte a Core web .

Puedes mover fondos de prueba de la C-Chain a la P-Chain haciendo clic en Stake en Core web , luego Transferencia entre Cadenas (encuentra más detalles en
[este tutorial](https://support.avax.network/en/articles/8133713-core-web-how-do-i-make-cross-chain-transfers-in-core-stake)).

## Implementar la Subred

Con tu Ledger desbloqueado y ejecutando la aplicación Avalanche, ejecuta

```bash
avalanche subnet deploy testsubnet
```

Esto va a iniciar una nueva serie de comandos en el prompt.

```text
Use las teclas de flecha para navegar: ↓ ↑ → ←
? Elije una red para implementar en:
    Red Local
    Fuji
  ▸ Mainnet
```

Este tutorial trata sobre la implementación en `Mainnet`, así que navega con las teclas de flecha hasta `Mainnet` y presiona enter.

```text
✔ Mainnet
Implementando [testsubnet] en Mainnet
```

Después de eso, la CLI muestra la dirección del Ledger `Mainnet` utilizada para financiar la implementación:

```text
Dirección del Ledger: P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j
```

La implementación requiere ejecutar una transacción `createSubnet`
y una transacción `createBlockchain`,
por lo que esta primera dirección del Ledger debe tener los fondos para emitir ambas operaciones.

Este tutorial crea una Subred con permisos. Como tal, debes especificar qué direcciones de la Cadena-P pueden controlar la Subred. Estas direcciones se conocen como `Claves de Control`. La CLI puede configurar automáticamente la dirección de tu Ledger como la única clave de control, o el usuario puede especificar una lista personalizada.

:::warning

En Subredes de producción, siempre debes usar múltiples claves de control que se ejecuten en una configuración de multisig. Este tutorial utiliza una sola clave de control únicamente con fines ilustrativos.

Para obtener instrucciones sobre cómo controlar tu Subred con un multisig, consulta el [Tutorial de Implementación de Multisig](/build/subnet/deploy/multisig-auth.md).

:::

```text
Configura qué direcciones pueden realizar cambios en la Subred.
Estas direcciones se conocen como tus claves de control. También vas a
establecer cuántas claves de control se requieren para hacer un cambio en la Subred (el umbral).
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cómo te gustaría configurar tus claves de control?:
  ▸ Usar dirección del ledger
    Lista personalizada
```

Para este tutorial, opta por usar la primera dirección del Ledger, así que ingresa en `Usar dirección del ledger`. Solo esta dirección podrá agregar o eliminar validadores, o crear blockchains en la Subred.

```text
Claves de control de tu Subred: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
Tus claves de autenticación de la Subred para la creación de cadenas: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
```

A continuación, la CLI genera una TX para crear la SubredID y le pide al usuario que la firme usando el Ledger.

```text
*** Por favor, firma el hash de creación de la Subred en el dispositivo Ledger ***
```

Esto activa una ventana `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Si el Ledger no tiene suficientes fondos, es posible que el usuario vea un mensaje de error:

```text
*** Por favor, firma el hash de creación de la Subred en el dispositivo Ledger ***
Error: fondos insuficientes: los UTXO proporcionados necesitan 1000000000 unidades más del activo "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

Si tiene éxito, la CLI te pide que firmes una TX de creación de cadena.

```text
La Subred ha sido creada con ID: 2UUCLbdGqawRDND7kHjwq3zXXMPdiycG2bkyuRzYMnuTSDr6db. Ahora creando la blockchain...
*** Por favor, firma el hash de creación de la blockchain en el dispositivo Ledger ***
```

Esto activa una ventana `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Después de eso, la CLI crea la blockchain dentro de la Subred, y aparece una ventana de resumen para el despliegue.

```text
+--------------------+------------------------------------------------------------------------------------+
| RESULTADOS DEPLOYMENT |                                                                                    |
+--------------------+------------------------------------------------------------------------------------+
| Nombre de la Cadena | testsubnet                                                                         |
+--------------------+------------------------------------------------------------------------------------+
| ID de la Subred     | 2UUCLbdGqawRDND7kHjwq3zXXMPdiycG2bkyuRzYMnuTSDr6db                                 |
+--------------------+------------------------------------------------------------------------------------+
| ID de la VM         | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii                                  |
+--------------------+------------------------------------------------------------------------------------+
| ID de la Blockchain | wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG                                  |
+--------------------+------------------------------------------------------------------------------------+
| URL RPC             | http://127.0.0.1:9650/ext/bc/wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG/rpc |
+--------------------+------------------------------------------------------------------------------------+
| TXID de la Cadena-P | wNoEemzDEr54Zy3iNn66yjUxXmZS9LKsZYSUciL89274mHsjG                                  |
+--------------------+------------------------------------------------------------------------------------+
```

Bien hecho. Acabas de crear tu propia Subred en ejecución en `Mainnet`. Ahora es hora de agregar tus validadores.

## Solicitud para unirse a una Subred como validador

La nueva Subred creada en los pasos anteriores aún no tiene ningún validador dedicado. Para solicitar permiso para validar una Subred, se requieren los siguientes pasos:

:::info

Agregar un validador en una Subred requiere que el nodo ya sea un validador en la red primaria, lo que significa que tu nodo se ha **bootstrapado completamente**.

Consulta [aquí](/nodes/validate/add-a-validator.md#add-a-validator-with-core-extension) cómo convertirte en un validador.

:::

Primero, solicita permiso para validar ejecutando el comando `join` junto con el nombre de la Subred:

```bash
avalanche subnet join testsubnet
```

Nota: ¡Ejecutar el comando `join` no garantiza que tu nodo sea un validador de la Subred! El propietario de la Subred debe aprobar que tu nodo sea un validador posteriormente llamando a `addValidator` como se describe en la siguiente sección.

### Seleccionar Mainnet

Cuando ejecutas el comando `join`, primero se te solicita la selección de la red. Elige `Mainnet`:

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red en la que validar (este comando solo admite redes públicas):
    Fuji
  ▸ Mainnet
```

### Configurar el Nodo Automáticamente

Ahora hay dos opciones posibles: configuración automática y manual. Como se mencionó anteriormente, "Automático" intenta editar tu archivo de configuración y configura tu directorio de plugins, mientras que "Manual" simplemente imprime la configuración requerida en la pantalla. Si estás ejecutando la CLI en la misma máquina que tu validador, deberías ejecutar los comandos en modo automatizado. Si no quieres ejecutar Avalanche-CLI en la misma máquina que tu validador, usa los comandos manuales.

Selecciona automático.

#### Configurar Archivo de Configuración

```text
✔ Automático
✔ Ruta a tu archivo de configuración existente (o donde se va a generar): config.json
```

Proporciona una ruta a un archivo de configuración. Si este comando se ejecuta en la máquina donde se está ejecutando tu validador, entonces podrías apuntar esto al archivo de configuración utilizado realmente, por ejemplo `/etc/avalanchego/config.json` - solo asegúrate de que la herramienta tenga acceso de **escritura** al archivo. O podrías copiar el archivo más tarde. En cualquier caso, la herramienta va a intentar editar el archivo existente especificado por la ruta dada, o crear un nuevo archivo. Nuevamente, establece permisos de escritura.

#### Configurar Directorio de Plugins

A continuación, proporciona el directorio de plugins. Cada VM ejecuta su propio binario, llamado plugin. Por lo tanto, necesitas copiar el binario del plugin de tu VM en el directorio de plugins de AvalancheGo. Este directorio depende de la ubicación de instalación de AvalancheGo.

```text
✔ Ruta de tu directorio de plugins de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins
```

La herramienta no sabe exactamente dónde se encuentra, por lo que requiere la ruta completa. Con la ruta dada, va a copiar el binario de la VM a la ubicación proporcionada:

```text
✔ Ruta de tu directorio de plugins de avalanchego (probablemente avalanchego/build/plugins): /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins█
Binario de la VM escrito en /home/user/go/src/github.com/ava-labs/avalanchego/build/plugins/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw
Esto va a editar tu archivo de configuración existente. Esta edición no es destructiva, pero siempre es bueno tener una copia de seguridad.
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Continuar?:
  ▸ Sí
    No
```

Al presionar `Sí`, se escribe el archivo necesario:

```text
✔ Sí
El archivo de configuración ha sido editado. Para usarlo, asegúrate de iniciar el nodo con la opción '--config-file', por ejemplo:

./build/avalanchego --config-file config.json

(usando la ubicación de tu binario). El nodo debe reiniciarse para que los cambios surtan efecto.
```

#### Reinicia el Nodo

Es **necesario reiniciar el nodo**.

### Configura el Nodo Manualmente

Al elegir "Manual" en su lugar, la herramienta imprime _instrucciones_. El usuario tendrá que seguir estas instrucciones y aplicarlas al nodo. Ten en cuenta que las ID de la VM y la Subnet son diferentes para cada implementación de Subnet y no debes copiarlas de este tutorial.

```text
✔ Manual

Para configurar tu nodo, debes hacer dos cosas:

1. Agregar el binario de tu VM al directorio de plugins de tu nodo
2. Actualizar la configuración de tu nodo para comenzar a validar la Subnet

Para agregar la VM a tu directorio de plugins, copia o scp desde /tmp/tGBrMADESojmu5Et9CpbGCrmVf9fiAJtZM5ZJ3YVDj5JTu2qw

Si instalaste avalanchego manualmente, es probable que tu directorio de plugins sea
avalanchego/build/plugins.

Si inicias tu nodo desde la línea de comandos SIN un archivo de configuración (por ejemplo, a través de un script de línea de comandos o systemd), agrega la siguiente bandera al comando de inicio de tu nodo:

--track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H
(si el nodo ya tiene una configuración de track-subnets, agrega el nuevo valor separado por comas).

Por ejemplo:
./build/avalanchego --network-id=Mainnet --track-subnets=2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

Si inicias el nodo a través de un archivo de configuración JSON, agrega esto a tu archivo de configuración:
track-subnets: 2b175hLJhGdj3CzgXENso9CmwMgejaCQXhMFzBsm8hXbH2MF7H

CONSEJO: Prueba este comando con la bandera --avalanchego-config apuntando a tu archivo de configuración, esta herramienta va a intentar actualizar el archivo automáticamente (asegúrate de que pueda escribir en él).

Después de actualizar tu configuración, vas a necesitar reiniciar tu nodo para que los cambios surtan efecto.
```

## Agrega un Validador

:::warning

Si el comando `join` no se completa con éxito antes de que se complete `addValidator`, la Subnet podría experimentar un rendimiento degradado o incluso detenerse.

:::

Ahora que el nodo se ha unido a la Subnet, un titular de la clave de control de la Subnet debe llamar a `addValidator` para otorgarle al nodo permiso para ser un validador en tu Subnet.

Para agregar a un nodo a la lista blanca como un validador reconocido en la Subnet, ejecuta:

```bash
avalanche subnet addValidator testsubnet
```

Debes repetir este proceso para cada validador que agregues a la red.

Puedes ejecutar las transacciones `addValidator` desde la misma máquina que desplegó la Subnet.

### Envía la TX para agregar un validador a Mainnet

Primero elige `Mainnet` como la red para agregar el validador de la Subnet.

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red para agregar el validador.:
    Fuji
  ▸ Mainnet
```

Debido a que esta operación emite una nueva transacción, la CLI necesita las claves de control para firmar la operación. Debido a que este tutorial solo usa una clave de control en la Subnet, el proceso se ve ligeramente diferente si usas múltiples claves de control. La dirección necesita pagar una tarifa de TX de 0.001 AVAX.

```text
Tus claves de autenticación de la Subnet para la creación de la transacción de agregar validador: [P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j]
```

### Establece el NodeID

Ahora ingresa el [**NodeID**](#obteniendo-tus-nodeids-de-mainnet) del validador.

```text
A continuación, necesitamos el NodeID del validador que deseas agregar a la lista blanca.

Consulta https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeid para obtener instrucciones sobre cómo consultar el NodeID desde tu nodo
(Edita la dirección IP del host y el puerto para que coincidan con tu implementación, si es necesario).
✔ ¿Cuál es el NodeID del validador que deseas agregar a la lista blanca?: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg█
```

Ten en cuenta que esta ID está modificada intencionalmente para evitar la replicación.

### Establece el Peso de Stake

Selecciona 30 como peso de stake.

:::warning

El peso de stake de todos tus validadores debe sumar al menos 100.

:::

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Qué peso de stake te gustaría asignar al validador?:
    Predeterminado (20)
  ▸ Personalizado
```

```text
✔ ¿Qué peso de stake te gustaría asignar al validador?: 30
```

### Establece la Hora de Inicio de Validación

A continuación, especifica cuándo el validador va a comenzar a validar. La hora debe estar en el futuro. Puedes usar la opción personalizada para ingresar una fecha específica en formato `AAAA-MM-DD HH:MM:SS`. Sigue la opción predeterminada esta vez:

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Hora de inicio:
  ▸ Comenzar en un minuto
    Personalizado
```

### Establece la Duración de Validación

Finalmente, especifica cuánto tiempo va a estar validando:

```text
✔ Comenzar en un minuto
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cuánto tiempo debe validar tu validador?:
  ▸ Hasta que expire el validador de la red primaria
    Personalizado
```

Si eliges `Personalizado` aquí, debes ingresar una **duración**, que es un período de tiempo expresado en horas. Por ejemplo, digamos `200 días = 24 * 200 = 4800h`

```text
✔ ¿Cuánto tiempo debe estar validando este validador? Ingresa una duración, por ejemplo, 8760h: 4800h
```

La CLI muestra al usuario una fecha real:

```text
? Tu validador va a terminar de hacer stake para el 2023-06-10 13:07:58:
  ▸ Sí
    No
```

Confirma si es correcto.

### Emite la TX

En este punto, la serie de indicaciones está completa y la CLI intenta la transacción:

```text
NodeID: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
Red de: Mainnet
Hora de inicio: 2022-11-22 13:07:58
Hora de finalización: 2023-06-10 13:07:58
Peso: 30
Entradas completas, emitiendo transacción para agregar la información del validador proporcionada...
```

La CLI muestra la dirección del Ledger:

```text
Dirección del Ledger: P-avax1ucykh6ls8thqpuwhg3vp8vvu6spg5e8tp8a25j
```

En este punto, si la dirección del Ledger no es la clave de control para la Subred, el usuario recibe un error:

```text
Error: la billetera no contiene claves de autenticación de la subred
Estado de salida 1
```

Si el Ledger no tiene suficientes fondos, aparece el siguiente mensaje de error:

```text
*** Por favor, firme el hash de creación de la subred en el dispositivo Ledger ***
Error: fondos insuficientes: los UTXO proporcionados necesitan 1000000 unidades más del activo "U8iRqJoiJm8xZHAacmvYyZVwqQx6uDNtQeP3CQ6fcgQk3JqnK"
```

De lo contrario, tanto la CLI como el Ledger solicitan firmar la TX:

```text
*** Por favor, firme el hash de adición de validador en el dispositivo Ledger ***
```

Esto activa una ventana de "Por favor, revise" en el Ledger. Navegue a la ventana de "APROBAR" del Ledger
usando el botón derecho del Ledger, y luego autorice la solicitud presionando ambos botones izquierdo y
derecho.

Esto puede tomar unos segundos. Después, imprime:

```text
Transacción exitosa, ID de transacción: r3tJ4Wr2CWA8AaticmFrKdKgAs5AhW2wwWTaQHRBZKwJhsXzb
```

¡Esto significa que el nodo es ahora un validador en la Subred dada en `Mainnet`! Sin embargo, tu trabajo no está
completo. **Debes** completar la sección [Solicitud para unirse a una Subred como validador](#request-to-join-a-subnet-as-a-validator)
de lo contrario, tu Subred corre el riesgo de tiempo de inactividad.

Puedes obtener información de identificación de la transacción de la P-Chain en [Avalanche Explorer](https://subnets.avax.network/)

## Exportación de Subred

Debido a que necesitas configurar múltiples validadores en múltiples máquinas diferentes, necesitas exportar
la configuración de tu Subred e importarla en cada validador.

```bash
avalanche subnet export testsubnet
✔ Ingresa la ruta del archivo para escribir los datos de exportación: /tmp/testsubnet-export.dat
```

El archivo está en formato de texto y no debes cambiarlo. Puedes usarlo para importar la configuración
en una máquina diferente.

## Importación de Subred

Para importar una configuración de VM, mueve el archivo que exportaste en la sección anterior a tu máquina deseada
y emite el comando `import` con la ruta del archivo.

```bash
avalanche subnet import /tmp/testsubnet-export.dat
Subred importada exitosamente
```

Después de esto, toda la configuración de la Subred debería estar disponible en la máquina de destino:

```text
avalanche subnet list
+---------------+---------------+----------+-----------+----------+
|    SUBRED     |     CADENA    | ID DE CADENA |   TIPO    | DEPLOYED |
+---------------+---------------+----------+-----------+----------+
| testsubnet    | testsubnet    |     3333 | SubnetEVM | No       |
+---------------+---------------+----------+-----------+----------+
```

## Ponerse en marcha

Una vez que todos tus validadores se hayan unido a la red, estás listo para emitir transacciones a tu Subred.

Para la seguridad de tus validadores, deberías configurar nodos API dedicados para procesar transacciones, pero
para fines de prueba, puedes emitir transacciones directamente a la interfaz RPC de uno de tus validadores.