---
tags: [Nodos]
description: Si tu máquina alguna vez tiene una falla debido a problemas de hardware o software, es mejor estar preparado para tal situación haciendo una copia de seguridad.
sidebar_label: Copia de seguridad y restauración
pagination_label: Copia de seguridad y restauración de nodos
sidebar_position: 1
---

# Copia de seguridad y restauración de nodos

Una vez que tienes tu nodo funcionando, es hora de prepararse para la recuperación de desastres. Si tu máquina alguna vez tiene una falla catastrófica debido a problemas de hardware o software, o incluso un caso de desastre natural, es mejor estar preparado para tal situación haciendo una copia de seguridad.

Cuando se ejecuta, una instalación completa del nodo junto con la base de datos puede llegar a tener varios gigabytes de tamaño. Tener que hacer una copia de seguridad y restaurar un volumen tan grande de datos puede ser costoso, complicado y llevar mucho tiempo. Afortunadamente, hay una mejor manera.

En lugar de tener que hacer una copia de seguridad y restaurar todo, necesitamos hacer una copia de seguridad sólo de lo que es esencial, es decir, aquellos archivos que no se pueden reconstruir porque son únicos de tu nodo. Para el nodo AvalancheGo, los archivos únicos son aquellos que identifican tu nodo en la red, en otras palabras, los archivos que definen tu NodeID.

Incluso si tu nodo es un validador en la red y tiene múltiples delegaciones en él, no necesitas preocuparte por hacer una copia de seguridad de nada más, porque las transacciones de validación y delegación también se almacenan en la cadena de bloques y se restaurarán durante el arranque, junto con el resto de los datos de la cadena de bloques.

La instalación en sí misma se puede recrear fácilmente instalando el nodo en una nueva máquina, y todos los gigabytes restantes de datos de la cadena de bloques se pueden recrear fácilmente mediante el proceso de arranque, que copia los datos de otros pares de la red. Sin embargo, si quieres acelerar el proceso, consulta la sección de [Copia de seguridad y restauración de la base de datos](#database).

## NodeID

:::warning

Si más de un nodo en ejecución comparte el mismo NodeID, las comunicaciones desde otros nodos en la red Avalanche a este NodeID serán aleatorias para uno de estos nodos. Si este NodeID es de un validador, impactará drásticamente el cálculo de tiempo de actividad del validador, lo que muy probablemente descalificará al validador de recibir las recompensas de staking. Asegúrate de que sólo se ejecute un nodo con el mismo NodeID a la vez.

:::

NodeID es un identificador único que diferencia tu nodo de todos los demás pares en la red. Es una cadena formateada como `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. Puedes buscar el trasfondo técnico de cómo se construye el NodeID [aquí](/reference/standards/cryptographic-primitives.md#tls-addresses). En esencia, el NodeID está definido por dos archivos:

- `staker.crt`
- `staker.key`

NodePOP es la clave BLS de este nodo y la prueba de posesión. Los nodos deben registrar una clave BLS para actuar como un validador en la Red Primaria. El POP de tu nodo se registra al inicio y es accesible a través de este punto final.

- `publicKey` es la representación hexadecimal de 48 bytes de la clave BLS.
- `proofOfPossession` es la representación hexadecimal de 96 bytes de la firma BLS.

NodePOP está definido por el archivo `signer.key`.

En la instalación por defecto, se pueden encontrar en el directorio de trabajo, específicamente en `~/.avalanchego/staking/`. Todo lo que necesitamos hacer para recrear el nodo en otra máquina es ejecutar una nueva instalación con esos mismos tres archivos.

Si se eliminan `staker.key` y `staker.crt` de un nodo, que se reinicia después, se recrearán y se asignará un nuevo ID de nodo.

Si el `signer.key` se regenera, el nodo perderá su identidad BLS anterior, que incluye su clave pública y su prueba de posesión. Este cambio significa que la identidad anterior del nodo en la red ya no será reconocida, afectando su capacidad para participar en el mecanismo de consenso como antes. En consecuencia, el nodo puede perder su reputación establecida y cualquier recompensa de staking asociada.

:::caution

Si tienes usuarios definidos en el keystore de tu nodo, entonces también necesitas hacer una copia de seguridad y restaurar esos usuarios. La API del Keystore tiene métodos que se pueden utilizar para exportar e importar claves de usuario. Ten en cuenta que la API del Keystore se utiliza sólo para desarrolladores y no está destinada a ser utilizada en nodos de producción. Si no sabes qué es una API de keystore y no la has utilizado, no necesitas preocuparte por ello.

:::

### Copia de seguridad

Para hacer una copia de seguridad de tu nodo, necesitamos almacenar los archivos `staker.crt`, `staker.key` y `signer.key` en algún lugar seguro y privado, preferiblemente en una computadora diferente, en tu almacenamiento privado en la nube, en una memoria USB u otro lugar similar. Almacenarlos en un par de ubicaciones seguras y diferentes aumenta la seguridad.

:::caution

Si alguien obtiene tus archivos staker, aún no pueden acceder a tus fondos, ya que están controlados por las claves privadas de la billetera, no por el nodo. Pero podrían recrear tu nodo en otro lugar y, dependiendo de las circunstancias, hacerte perder las recompensas de staking. Así que asegúrate de que tus archivos staker estén seguros.

Si alguien obtiene acceso a tu `signer.key`, potencialmente podrían firmar transacciones en nombre de tu nodo, lo que podría interrumpir las operaciones e integridad de tu nodo en la red.

:::

Saquemos los archivos de la máquina que ejecuta el nodo.

#### Desde un Nodo Local

Si estás ejecutando el nodo localmente, en tu computadora de escritorio, simplemente navega hasta donde están los archivos y cópialos a algún lugar seguro.

En una instalación de Linux por defecto, la ruta a ellos será `/home/USUARIO/.avalanchego/staking/`, donde `USUARIO` debe ser reemplazado por el nombre de usuario real que ejecuta el nodo. Selecciona y copia los archivos desde allí a una ubicación de respaldo. No necesitas detener el nodo para hacer eso.

#### Desde un Nodo Remoto Usando `scp`

`scp` es un programa de línea de comandos de 'copia segura', disponible de forma integrada en computadoras Linux y MacOS. También hay una versión para Windows, `pscp`, como parte del paquete [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Si usas `pscp`, en los siguientes comandos reemplaza cada uso de `scp` con `pscp -scp`.

Para copiar los archivos desde el nodo, necesitarás poder iniciar sesión en la máquina de forma remota. Puedes usar la contraseña de la cuenta, pero la forma segura y recomendada es usar las claves SSH. El procedimiento para adquirir y configurar claves SSH depende en gran medida de tu proveedor de nube y de la configuración de la máquina. Puedes consultar nuestras guías de configuración de [Amazon Web Services](/nodes/run/third-party/aws-node.md) y [Microsoft Azure](/nodes/run/third-party/microsoft-azure-node.md) para esos proveedores. Otros proveedores tendrán procedimientos similares.

Cuando tengas los medios para iniciar sesión de forma remota en la máquina, puedes copiar los archivos con el siguiente comando:

```text
scp -r ubuntu@IPPUBLICA:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Esto asume que el nombre de usuario en la máquina es `ubuntu`, reemplázalo con el nombre de usuario correcto en ambos lugares si es diferente. Además, reemplaza `IPPUBLICA` con la IP pública real de la máquina. Si `scp` no utiliza automáticamente tu clave SSH descargada, puedes apuntar a ella manualmente:

```text
scp -i /ruta/a/la/clave.pem -r ubuntu@IPPUBLICA:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Una vez ejecutado, este comando creará un directorio `avalanche_backup` en tu directorio de inicio y colocará esos tres archivos en él. Debes almacenarlos en algún lugar seguro.

### Restauración

Para restaurar tu nodo desde una copia de seguridad, necesitamos hacer lo contrario: restaurar `staker.key`, `staker.crt` y `signer.key` desde la copia de seguridad al directorio de trabajo del nodo.

Primero, necesitamos hacer la instalación habitual del nodo según las [instrucciones](/nodes/run/with-installer/installing-avalanchego.md). Esto creará un nuevo NodeID, una nueva clave BLS y una nueva firma BLS, que necesitamos reemplazar. Cuando el nodo esté instalado correctamente, inicia sesión en la máquina donde se está ejecutando el nodo y detenlo:

```text
sudo systemctl stop avalanchego
```

Estamos listos para restaurar el nodo.

#### A un Nodo Local

Si estás ejecutando el nodo localmente, simplemente copia los archivos `staker.key`, `staker.crt` y `signer.key` desde la ubicación de la copia de seguridad al directorio de trabajo, que en una instalación de Linux por defecto será `/home/USUARIO/.avalanchego/staking/`. Reemplaza `USUARIO` con el nombre de usuario real utilizado para ejecutar el nodo.

#### Para un Nodo Remoto Usando `scp`

Nuevamente, el proceso es simplemente la operación inversa. Usando `scp`, necesitamos copiar los archivos `staker.key`, `staker.crt` y `signer.key` desde la ubicación de la copia de seguridad al directorio de trabajo remoto. Suponiendo que los archivos de copia de seguridad se encuentren en el directorio donde el procedimiento de copia de seguridad anterior los colocó:

```text
scp ~/avalanche_backup/{staker.*,signer.key} ubuntu@DIRECCIONIPUBLICA:/home/ubuntu/.avalanchego/staking
```

O si necesitas especificar la ruta de la clave SSH:

```text
scp -i /ruta/hacia/la/clave.pem ~/avalanche_backup/{staker.*,signer.key} ubuntu@DIRECCIONIPUBLICA:/home/ubuntu/.avalanchego/staking
```

Nuevamente, reemplaza `ubuntu` con el nombre de usuario correcto si es diferente, y `DIRECCIONIPUBLICA` con la IP pública real de la máquina que ejecuta el nodo, así como la ruta hacia la clave SSH si se utiliza.

#### Reinicia el Nodo y Verifica

Una vez que los archivos hayan sido reemplazados, inicia sesión en la máquina y comienza el nodo usando:

```text
sudo systemctl start avalanchego
```

Ahora puedes verificar que el nodo se haya restaurado con el NodeID y NodePOP correctos emitiendo la llamada de API [getNodeID](/reference/avalanchego/info-api.md#infogetnodeid) en la misma consola en la que ejecutaste el comando anterior:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Deberías ver tu NodeID y NodePOP originales (clave BLS y firma BLS). El proceso de restauración está completo.

## Base de Datos

Normalmente, al iniciar un nuevo nodo, puedes simplemente arrancar desde cero. Sin embargo, hay situaciones en las que puede ser preferible reutilizar una base de datos existente (por ejemplo, preservar registros de keystore, reducir el tiempo de sincronización).

Este tutorial te guiará a través de la compresión de la base de datos de tu nodo y su traslado a otra computadora utilizando `zip` y `scp`.

### Copia de Seguridad de la Base de Datos

Primero, asegúrate de detener AvalancheGo, ejecuta:

```bash
sudo systemctl stop avalanchego
```

:::warning
Debes detener el nodo Avalanche antes de hacer una copia de seguridad de la base de datos, de lo contrario, los datos podrían corromperse.
:::

Una vez que el nodo esté detenido, puedes comprimir el directorio de la base de datos para reducir el tamaño de la copia de seguridad y acelerar la transferencia usando `scp`:

```bash
zip -r avalanche_db_backup.zip .avalanchego/db
```

_Nota: Puede llevar más de 30 minutos comprimir la base de datos del nodo._

A continuación, puedes transferir la copia de seguridad a otra máquina:

```bash
scp -r ubuntu@DIRECCIONIPUBLICA:/home/ubuntu/avalanche_db_backup.zip ~/avalanche_db_backup.zip
```

Esto asume que el nombre de usuario en la máquina es `ubuntu`, reemplázalo con el nombre de usuario correcto en ambos lugares si es diferente. Además, reemplaza `DIRECCIONIPUBLICA` con la IP pública real de la máquina. Si `scp` no utiliza automáticamente tu clave SSH descargada, puedes especificarla manualmente:

```bash
scp -i /ruta/hacia/la/clave.pem -r ubuntu@DIRECCIONIPUBLICA:/home/ubuntu/avalanche_db_backup.zip ~/avalanche_db_backup.zip
```

Una vez ejecutado, este comando creará el directorio `avalanche_db_backup.zip` en tu directorio de inicio.

### Restauración de la Base de Datos

_Este tutorial asume que ya has completado "Copia de Seguridad de la Base de Datos" y tienes una copia de seguridad en `~/avalanche_db_backup.zip`._

Primero, necesitamos hacer la instalación habitual del nodo de [instalación](/nodes/run/with-installer/installing-avalanchego.md). Cuando el nodo esté instalado correctamente, inicia sesión en la máquina donde se está ejecutando el nodo y detenlo:

```bash
sudo systemctl stop avalanchego
```

:::warning
Debes detener el nodo Avalanche antes de restaurar la base de datos, de lo contrario, los datos podrían corromperse.
:::

Estamos listos para restaurar la base de datos. Primero, movamos la base de datos en el nodo existente (puedes eliminar esta antigua base de datos más tarde si la restauración fue exitosa):

```bash
mv .avalanchego/db .avalanchego/db-old
```

A continuación, descomprimiremos la copia de seguridad que movimos desde otro nodo (esto colocará los archivos descomprimidos en `~/.avalanchego/db` cuando se ejecute el comando en el directorio de inicio):

```bash
unzip avalanche_db_backup.zip
```

Después de que la base de datos haya sido restaurada en un nuevo nodo, usa este comando para iniciar el nodo:

```bash
sudo systemctl start avalanchego
```

El nodo ahora debería estar funcionando desde la base de datos en la nueva instancia. Para verificar que todo esté en orden y que el nodo no esté arrancando desde cero (lo cual indicaría un problema), usa:

```bash
sudo journalctl -u avalanchego -f
```

El nodo debería estar poniéndose al día con la red y recuperando un pequeño número de bloques antes de reanudar su funcionamiento normal (todos los producidos desde el momento en que se detuvo el nodo antes de la copia de seguridad).

Una vez que la copia de seguridad se haya restaurado y esté funcionando como se esperaba, puedes eliminar el archivo zip:

```bash
rm avalanche_db_backup.zip
```

### Copia Directa de la Base de Datos

Puede que te encuentres en una situación en la que no tienes suficiente espacio en disco para crear el archivo que contiene toda la base de datos, por lo que no puedes completar el proceso de copia de seguridad como se describe anteriormente.

En ese caso, aún puedes migrar tu base de datos a una nueva computadora utilizando un enfoque diferente: `copia directa`. En lugar de crear el archivo de copia de seguridad, mover el archivo de copia de seguridad y descomprimirlo, podemos hacer todo eso sobre la marcha.

Para hacerlo, necesitarás acceso `ssh` desde la máquina de destino (donde quieres que termine la base de datos) a la máquina de origen (donde se encuentra actualmente la base de datos). Configurar `ssh` es igual que se explica para `scp` anteriormente en el documento.

Igual que se mostró anteriormente, necesitas detener el nodo (en ambas máquinas):

```bash
sudo systemctl stop avalanchego
```

:::warning
Debes detener el nodo Avalanche antes de hacer una copia de seguridad de la base de datos, de lo contrario, los datos podrían corromperse.
:::

Luego, en la máquina de destino, cambia a un directorio donde te gustaría poner los archivos de la base de datos, ingresa el siguiente comando:

```bash
ssh -i /ruta/hacia/la/clave.pem ubuntu@DIRECCIONIPUBLICA 'tar czf - .avalanchego/db' | tar xvzf - -C .
```

Asegúrate de reemplazar la ruta correcta de la clave y la IP correcta de la máquina de origen. Esto comprimirá la base de datos, pero en lugar de escribirla en un archivo, la enviará a través de `ssh` directamente a la máquina de destino, donde se descomprimirá y se escribirá en el disco. El proceso puede llevar mucho tiempo, asegúrate de que se complete antes de continuar.

Después de que se haya completado la copia, todo lo que necesitas hacer ahora es mover la base de datos a la ubicación correcta en la máquina de destino. Suponiendo que haya una instalación predeterminada de AvalancheGo, eliminamos la base de datos antigua y la reemplazamos con la nueva:

```bash
rm -rf ~/.avalanchego/db
mv db ~/.avalanchego/db
```

Ahora puedes iniciar el nodo en la máquina de destino:

```bash
sudo systemctl start avalanchego
```

El nodo ahora debería estar funcionando desde la base de datos copiada. Para verificar que todo esté en orden y que el nodo no esté arrancando desde cero (lo cual indicaría un problema), usa:

```bash
sudo journalctl -u avalanchego -f
```

El nodo debería estar poniéndose al día con la red y recuperando un pequeño número de bloques antes de reanudar su funcionamiento normal (todos los producidos desde el momento en que se detuvo el nodo antes de la copia de seguridad).

## Resumen

Una parte esencial para asegurar tu nodo es la copia de seguridad que permite la restauración completa y sin dolor de tu nodo. Siguiendo este tutorial, puedes estar tranquilo sabiendo que, en caso de que te encuentres en una situación en la que necesites restaurar tu nodo desde cero, puedes hacerlo fácil y rápidamente.

Si tienes algún problema siguiendo este tutorial, comentarios que quieras compartir con nosotros o simplemente quieres charlar, puedes encontrarnos en nuestro servidor de [Discord](https://chat.avalabs.org/).