---
tags: [Construir, Subnets]
description: Este tutorial demuestra cómo implementar una Subnet con permisos en la Mainnet de Avalanche.
sidebar_label: Con autorización multisig
pagination_label: Implementar una Subnet con autorización multisig
sidebar_position: 4
---

# Implementar una Subnet con autorización multisig

Los creadores de Subnets pueden controlar operaciones críticas de la Subnet con una multisig de N de M. Esta multisig debe configurarse en el momento de la implementación y no se puede editar posteriormente. Las multisigs están disponibles tanto en la Testnet Fuji como en la Mainnet.

Para configurar tu multisig, necesitas conocer la dirección de la cadena P de cada titular de clave y cuál es tu umbral de firma.

:::note

Avalanche-CLI requiere Ledgers para implementaciones en Mainnet. Esta guía asume el uso de Ledgers para configurar tu multisig.

:::

## Requisitos previos

- [`Avalanche-CLI`](https://github.com/ava-labs/avalanche-cli) instalado
- Familiaridad con el proceso de [Implementar una Subnet en Testnet](/build/subnet/deploy/fuji-testnet-subnet.md)
  y [Implementar una Subnet con permisos en Mainnet](/build/subnet/deploy/mainnet-subnet.md)
- Múltiples dispositivos Ledger [configurados para Avalanche](/build/subnet/deploy/mainnet-subnet.md#setting-up-your-ledger)
- Una configuración de Subnet lista para implementar en la Testnet Fuji o en la Mainnet

## Empezando

Cuando emites las transacciones para crear la Subnet, necesitas firmar las TXs con múltiples claves de la multisig.

### Especificar la red

Inicia la implementación de la Subnet con

```bash
avalanche subnet deploy testsubnet
```

El primer paso es especificar `Fuji` o `Mainnet` como la red:

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red en la que implementar:
    Red Local
    Fuji
  ▸ Mainnet
```

```text
Implementando [testsubnet] en Mainnet
```

Ledger se reconoce automáticamente como el mecanismo de firma en `Mainnet`.

Después de eso, la CLI muestra la primera dirección de Ledger `Mainnet`.

```text
Dirección de Ledger: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
```

### Establecer claves de control

A continuación, la CLI le pide al usuario que especifique las claves de control. Aquí es donde configuras tu multisig.

```text
Configura qué direcciones pueden realizar cambios en la Subnet.
Estas direcciones se conocen como tus claves de control. También vas a
establecer cuántas claves de control se requieren para hacer un cambio en la Subnet (el umbral).
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? ¿Cómo te gustaría establecer tus claves de control?:
  ▸ Usar dirección de Ledger
    Lista personalizada
```

Selecciona `Lista personalizada` y agrega cada dirección que desees que sea un titular de clave en la multisig.

```text
✔ Lista personalizada
? Ingresa las claves de control:
  ▸ Agregar
    Eliminar
    Vista previa
    Más información
↓   Hecho
```

Usa el menú dado para agregar cada clave y selecciona `Hecho` cuando hayas terminado.

La salida en este punto debería verse algo como esto:

```text
✔ Lista personalizada
✔ Agregar
Ingresa la dirección de la cadena P (Ejemplo: P-...): P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
✔ Agregar
Ingresa la dirección de la cadena P (Ejemplo: P-...): P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ Agregar
Ingresa la dirección de la cadena P (Ejemplo: P-...): P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
✔ Agregar
Ingresa la dirección de la cadena P (Ejemplo: P-...): P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ Agregar
Ingresa la dirección de la cadena P (Ejemplo: P-...): P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
✔ Hecho
Tus claves de control de la Subnet: [P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28 P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
```

:::note

Cuando implementas una Subnet con Ledgers, debes incluir la dirección predeterminada del Ledger determinada en
[Especificar la red](#especificar-la-red) para que la implementación tenga éxito. Puedes ver un error como

```text
Error: la billetera no contiene claves de autorización de la Subnet
estado de salida 1
```

:::

### Establecer umbral

A continuación, especifica el umbral. En tu multisig de N de M, tu umbral es N, y M es el número
de claves de control que agregaste en el paso anterior.

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Selecciona el número requerido de firmas de clave de control para hacer un cambio en la Subnet:
  ▸ 1
    2
    3
    4
    5
```

### Especificar las claves de control para firmar la TX de creación de la cadena

Ahora necesitas que N de tus titulares de clave firmen la transacción de implementación de la Subnet. Debes seleccionar qué
direcciones quieres que firmen la TX.

```text
? Elige una clave de autorización de la Subnet:
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
```

Una selección exitosa de la clave de control se ve así:

```text
✔ 2
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Tus claves de autorización de la Subnet para la creación de la cadena: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af]
*** Por favor, firma el hash de creación de la Subnet en el dispositivo Ledger ***
```

#### Errores potenciales

Si la dirección de Ledger conectada actualmente no está incluida en tu grupo de firmantes de TX, la operación
falla con:

```text
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Tus claves de autorización de subred para la creación de la cadena: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
Error: la billetera no contiene claves de autorización de subred
estado de salida 1
```

Esto puede suceder porque las claves de control especificadas originalmente -paso anterior- no contienen la dirección de Ledger, o porque la clave de control de la dirección de Ledger no fue seleccionada en el paso actual.

Si el usuario tiene la dirección correcta pero no tiene suficiente saldo para pagar la TX, la operación falla con:

```text
✔ 2
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
✔ P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
Tus claves de autorización de subred para la creación de la cadena: [P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g]
*** Por favor firma el hash de creación de subred en el dispositivo Ledger ***
Error: fondos insuficientes: los UTXO proporcionados necesitan 1000000000 unidades más del activo "rgNLkDPpANwqg3pHC4o9aGJmf2YU4GgTVUMRKAdnKodihkqgr"
estado de salida 1
```

### Firma de la TX de despliegue de subred con la primera dirección

La TX de despliegue de subred está lista para ser firmada.

```text
*** Por favor firma el hash de creación de subred en el dispositivo Ledger ***
```

Esto activa una ventana de "Por favor revisa" en el Ledger. Navega a la ventana de "APROBAR" del Ledger
usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

```text
La subred ha sido creada con ID: 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew. Ahora creando la cadena de bloques...
*** Por favor firma el hash de creación de blockchain en el dispositivo Ledger ***
```

Después de crear exitosamente la subred, la CLI le pide al usuario que firme la TX de creación de la cadena de bloques.

Esto activa una ventana de "Por favor revisa" en el Ledger. Navega a la ventana de "APROBAR" del Ledger
usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

En caso de éxito, la CLI proporciona los detalles del despliegue de la subred. Como solo una dirección firmó la creación de la cadena,
la CLI escribe un archivo en disco para guardar la TX y continuar el proceso de firma con otro comando.

```text
+--------------------+----------------------------------------------------+
| RESULTADOS DEPLOYMENT |                                                    |
+--------------------+----------------------------------------------------+
| Nombre de la cadena | testsubnet                                         |
+--------------------+----------------------------------------------------+
| ID de la subred    | 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew |
+--------------------+----------------------------------------------------+
| ID de la VM        | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii  |
+--------------------+----------------------------------------------------+

Se han firmado 1 de las 2 firmas de creación de la cadena requeridas. Guardando la TX en disco para habilitar la firma restante.

Ruta para exportar la TX parcialmente firmada:
```

Ingresa el nombre del archivo para escribir en disco, como `partiallySigned.txt`. Este archivo no debe existir previamente.

```text
Ruta para exportar la TX parcialmente firmada: partiallySigned.txt

Direcciones restantes para firmar la TX
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Conecta un Ledger con una de las direcciones restantes o elige una clave almacenada y ejecuta el comando de firma, o envía "partiallySigned.txt" a otro usuario para que lo firme.

Comando de firma:
  avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
```

## Reunir las firmas restantes y emitir la TX de despliegue de subred

Hasta ahora, una dirección ha firmado la TX de despliegue de subred, pero necesitas N firmas. Tu subred no ha sido
desplegada completamente aún. Para obtener las firmas restantes, puedes conectar un Ledger diferente al mismo
ordenador en el que has estado trabajando. Alternativamente, puedes enviar el archivo `partiallySigned.txt`
a otros usuarios para que lo firmen ellos mismos.

El resto de esta sección asume que estás trabajando en una máquina con acceso tanto a las claves restantes como al
archivo `partiallySigned.txt`.

### Emitir el comando para firmar la TX de creación de cadena

Avalanche-CLI puede detectar automáticamente la red de despliegue. Para TXs de `Mainnet`, utiliza tu
Ledger automáticamente. Para `Fuji Testnet`, la CLI solicita al usuario que elija el mecanismo de firma.

Puedes iniciar el proceso de firma con el comando `transaction sign`:

```bash
avalanche transaction sign testsubnet --input-tx-filepath partiallySigned.txt
```

```text
Dirección del Ledger: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Por favor firma el hash de la TX en el dispositivo Ledger ***
```

A continuación, la CLI inicia un nuevo proceso de firma para la TX de despliegue de subred. Si el Ledger no es el correcto,
debería aparecer el siguiente error en su lugar:

```text
Dirección del Ledger: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
Error: la billetera no contiene claves de autorización de subred
estado de salida 1
```

Esto activa una ventana de "Por favor revisa" en el Ledger. Navega a la ventana de "APROBAR" del Ledger
usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Repite este proceso hasta que todas las partes requeridas hayan firmado la TX. Deberías ver un mensaje
como este:

```text
Se han firmado todas las 2 firmas de TX requeridas. Guardando la TX en disco para habilitar el commit.

Sobrescribiendo partiallySigned.txt

La TX está completamente firmada y lista para ser commitida.

Comando de commit:
  avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

Ahora, `partiallySigned.txt` contiene una TX completamente firmada.

### Commitir la TX de despliegue de subred

Para enviar la TX completamente firmada, ejecuta

```bash
avalanche transaction commit testsubnet --input-tx-filepath partiallySigned.txt
```

La CLI reconoce automáticamente la red de despliegue y envía la TX apropiadamente.

```text
+--------------------+-------------------------------------------------------------------------------------+
| RESULTADOS DEPLOYMENT |                                                                                     |
+--------------------+-------------------------------------------------------------------------------------+
| Nombre de la Cadena | testsubnet                                                                          |
+--------------------+-------------------------------------------------------------------------------------+
| ID de la Subnet     | 2qUKjvPx68Fgc1NMi8w4mtaBt5hStgBzPhsQrS1m7vSub2q9ew                                  |
+--------------------+-------------------------------------------------------------------------------------+
| ID de la VM         | rW1esjm6gy4BtGvxKMpHB2M28MJGFNsqHRY9AmnchdcgeB3ii                                   |
+--------------------+-------------------------------------------------------------------------------------+
| ID de la Blockchain | 2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj                                  |
+--------------------+-------------------------------------------------------------------------------------+
| URL RPC             | http://127.0.0.1:9650/ext/bc/2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj/rpc |
+--------------------+-------------------------------------------------------------------------------------+
| TXID de la P-Chain  | 2fx9EF61C964cWBu55vcz9b7gH9LFBkPwoj49JTSHA6Soqqzoj                                  |
+--------------------+-------------------------------------------------------------------------------------+
```

Tu Subnet se desplegó exitosamente con una multisig.

## Agregar Validadores Usando la Multisig

El comando `addValidator` también requiere el uso de la multisig. Antes de comenzar, asegúrate de conectar,
desbloquear y ejecutar la aplicación Avalanche Ledger.

```bash
avalanche subnet addValidator testsubnet
```

### Seleccionar Red

Primero especifica la red. Selecciona ya sea `Fuji` o `Mainnet`

```text
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una red para agregar el validador a.:
  ▸ Fuji
    Mainnet
```

### Elegir Claves de Firma

Luego, similar al comando `deploy`, el comando le pide al usuario que seleccione las N claves de control necesarias
para firmar la TX.

```text
✔ Mainnet
Usa las teclas de flecha para navegar: ↓ ↑ → ←
? Elige una clave de autenticación de subred:
  ▸ P-avax1wryu62weky9qjlp40cpmnqf6ml2hytnagj5q28
    P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
    P-avax12gcy0xl0al6gcjrt0395xqlcuq078ml93wl5h8
    P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
    P-avax1g4eryh40dtcsltmxn9zk925ny07gdq2xyjtf4g
```

```text
✔ Mainnet
✔ P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
✔ P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
Tus claves de autenticación de subred para la creación de la TX de agregar validador: [P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5 P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af].
```

### Terminar de Ensamblar la TX

Echa un vistazo a [Agregar un Validador](/build/subnet/deploy/mainnet-subnet.md#add-a-validator) para
ayuda adicional para emitir esta transacción.

:::note

Si estás configurando una multisig, no selecciones que el tiempo de inicio de tu validador sea en un minuto. Terminar el
proceso de firma lleva significativamente más tiempo cuando se usa una multisig.

:::

```text
A continuación, necesitamos el NodeID del validador que quieres agregar a la lista blanca.

Consulta https://docs.avax.network/apis/avalanchego/apis/info#infogetnodeid para obtener instrucciones sobre cómo consultar el NodeID desde tu nodo
(Edita la dirección IP del host y el puerto para que coincida con tu despliegue, si es necesario).
¿Cuál es el NodeID del validador que te gustaría agregar a la lista blanca?: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
✔ Predeterminado (20)
¿Cuándo debería comenzar tu validador a validar?
Si tu validador no está listo en este momento, puede haber tiempo de inactividad de la subred.
✔ Personalizado
¿Cuándo debería comenzar el validador a validar? Ingresa una fecha y hora UTC en formato 'AAAA-MM-DD HH:MM:SS': 2022-11-22 23:00:00
✔ Hasta que expire el validador de la red primaria
NodeID: NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg
Red: Red Local
Hora de inicio: 2022-11-22 23:00:00
Hora de finalización: 2023-11-22 15:57:27
Peso: 20
Entradas completas, emitiendo transacción para agregar la información del validador proporcionado...
```

```text
Dirección del Ledger: P-avax1kdzq569g2c9urm9887cmldlsa3w3jhxe0knfy5
*** Por favor firma el hash de agregar validador en el dispositivo Ledger ***
```

Después de eso, el comando muestra la dirección del Ledger conectado y le pide al usuario que firme la TX con
el Ledger.

```text
TX parcial creada

Se ha firmado 1 de las 2 firmas de Agregar Validador requeridas. Guardando la TX en disco para habilitar la firma restante.

Ruta para exportar la TX parcialmente firmada:
```

Debido a que has configurado una multisig, la TX no está completamente firmada, y el comando pregunta por un archivo en el que escribir. Usa
algo como `partialAddValidatorTx.txt`.

```text
Ruta para exportar la TX parcialmente firmada: partialAddValidatorTx.txt

Direcciones restantes para firmar la tx
  P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af

Conecta un Ledger con una de las direcciones restantes o elige una clave almacenada y ejecuta el comando de firma, o envía "partialAddValidatorTx.txt" a otro usuario para que lo firme.

Comando de firma:
  avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

## Firmar y Confirmar la TX de Agregar Validador

El proceso es muy similar a la firma de la TX de Despliegue de Subnet. Hasta ahora, una dirección ha firmado la
TX, pero necesitas N firmas. Para obtener las firmas restantes, puedes conectar un Ledger diferente
a la misma computadora en la que has estado trabajando. Alternativamente, puedes enviar el archivo
`partialAddValidatorTx.txt` a otros usuarios para que lo firmen ellos mismos.

El resto de esta sección asume que estás trabajando en una máquina con acceso tanto a las teclas restantes como al archivo `partialAddValidatorTx.txt`.

### Emitir el comando para firmar la TX de agregar validador

Avalanche-CLI puede detectar automáticamente la red de implementación. Para TX de `Mainnet`, utiliza tu Ledger automáticamente. Para `Fuji Testnet`, la CLI solicita al usuario que elija el mecanismo de firma.

```bash
avalanche transaction sign testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

```text
Dirección del Ledger: P-avax1g7nkguzg8yju8cq3ndzc9lql2yg69s9ejqa2af
*** Por favor, firma el hash de la TX en el dispositivo Ledger ***
```

A continuación, el comando va a iniciar un nuevo proceso de firma para la TX de agregar validador.

Esto activa una ventana de `Por favor, revisa` en el Ledger. Navega a la ventana `APROBAR` del Ledger usando el botón derecho del Ledger, y luego autoriza la solicitud presionando ambos botones izquierdo y derecho.

Repite este proceso hasta que todas las partes requeridas hayan firmado la TX. Deberías ver un mensaje como este:

```text

Se han firmado todas las 2 firmas de TX requeridas. Guardando la TX en disco para habilitar la confirmación.

Sobrescribiendo partialAddValidatorTx.txt

La TX está completamente firmada y lista para ser confirmada.

Comando de confirmación:
  avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

Ahora, `partialAddValidatorTx.txt` contiene una TX completamente firmada.

### Emitir el comando para confirmar la TX de agregar validador

Para ejecutar la TX completamente firmada, ejecuta

```bash
avalanche transaction commit testsubnet --input-tx-filepath partialAddValidatorTx.txt
```

La CLI reconoce automáticamente la red de implementación y envía la TX adecuadamente.

```text
Transacción exitosa, ID de transacción: K7XNSwcmgjYX7BEdtFB3hEwQc6YFKRq9g7hAUPhW4J5bjhEJG
```

Has agregado exitosamente el validador a la Subnet.
