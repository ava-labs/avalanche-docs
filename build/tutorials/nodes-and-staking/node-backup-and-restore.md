# Copia de seguridad y restauración

Una vez que tengas tu nodo en marcha y ejecutando, es hora de prepararse para la recuperación de desastres. Si tu máquina tiene alguna vez un fracaso catastrófico debido a problemas de hardware o software, o incluso un caso de desastre natural, es mejor estar preparado para tal situación al crear un respaldo.

Cuando se ejecuta, una instalación de nodo completa junto con la base de datos puede crecer para ser múltiples gigabytes de tamaño. Tener que respaldar y restaurar un volumen de datos tan grande puede ser caro, complicado y de largo tiempo. Afortunadamente, hay una mejor manera.

En vez de tener que respaldar y restaurar todo, necesitamos hacer copias de seguridad solo lo que es esencial, es decir, aquellos archivos que no pueden ser reconstruidos porque son únicos a tu nodo. Para el nodo de Avalanchego, los archivos únicos son los que identifican tu nodo en la red, en otras palabras, los archivos que definen tu NodeID. La instalación en sí misma puede ser fácilmente recreada instalando el nodo en una nueva máquina, y todos los gigabytes restantes de datos de blockchain pueden ser fácilmente recreados por el proceso de bootstrapping, que copia los datos de otros pares de la red.

Incluso si tu nodo es un validador en la red y tiene varias delegaciones en ella, no necesitas preocuparte por hacer copias de seguridad de cualquier otra cosa, porque las transacciones de validación y delegación también se almacenan en la blockchain y serán restauradas durante la toma de arranque, junto con el resto de los datos de blockchain.

## NodeID

NodeID es un identificador único que diferencia tu nodo de todos los demás pares de la red. Es una cadena formateada como `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. Puedes buscar el fondo técnico de cómo se construye el NodeID [aquí](../../references/cryptographic-primitives.md#tls-addresses). En esencia, NodeID se define por dos archivos:

* `staker.crt`
* `staker.key`

En la instalación por defecto, se pueden encontrar en el directorio de trabajo, específicamente en `~/.avalanchego/staking/`. Todo lo que necesitamos hacer para recrear el nodo en otra máquina es ejecutar una nueva instalación con esos dos archivos.

{% hint style="warning" %}Si tienes usuarios definidos en el almacén de claves de tu nodo, entonces necesitas hacer copias de seguridad y restaurar esos también. [API](../../avalanchego-apis/keystore-api.md) de Keystore tiene métodos que pueden ser utilizados para exportar e importar claves de usuario. Tenga en cuenta que la API de Keystore es utilizada por los desarrolladores solo y no está destinada para ser utilizado en nodos de producción. Si no sabes qué es una API de keystore y no la has usado, no necesitas preocuparte por ello.{% endhint %}

## Copia de seguridad

Para respaldar tu nodo, necesitamos almacenar `staker.crt`y `staker.key`archivos en algún lugar seguro y privado, preferentemente a un ordenador diferente, a tu almacenamiento privado en la nube, un dispositivo USB o similares. Conservarlos a un par de ubicaciones diferentes y seguras aumenta la seguridad.

{% hint style="warning" %}Si alguien recibe un control de tus archivos de staker, todavía no pueden llegar a tus fondos, ya que están controlados por la billetera private de las claves no por el nodo. Pero, podrían recrear tu nodo en otro lugar, y dependiendo de las circunstancias te hacen perder las recompensas de base. Así que asegúrate de que tus archivos de staker sean seguros.{% endhint %}

Vamos a obtener los archivos de staker de la máquina que ejecuta el nodo.

### Desde el nodo local

Si estás ejecutando el nodo localmente, en tu computadora de escritorio, solo navegas hacia dónde están los archivos y copiarlos en algún lugar seguro.

En una instalación de Linux por defecto, la ruta hacia ellos será `/home/USERNAME/.avalanchego/staking/`, donde `USERNAME`necesita ser reemplazada con el nombre de usuario real que ejecuta el nodo. Selecciona y copia de los archivos de ahí a una ubicación de copia de seguridad. No necesitas parar el nodo para hacer eso.

### Desde el nodo remoto`scp`

`scp`es un programa de línea de comandos "copy seguro", disponible en computadoras Linux y MacOS. `pscp`También hay una versión de Windows, como parte del paquete [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Si usa `pscp`, en los siguientes comandos reemplaza cada uso de `scp`con .`pscp -scp`

Para copiar los archivos del nodo, tendrás que poder iniciar sesión de forma remota en la máquina. Puedes usar la contraseña de la cuenta, pero la forma segura y recomendada es usar las claves SSH. El procedimiento para adquirir y crear claves SSH es altamente dependiente de tu proveedor de nube y la configuración de máquina. Puedes referirte a nuestras guías de configuración de [Amazon Web](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) y de [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) para esos proveedores. Otros proveedores tendrán procedimientos similares.

Cuando tienes medios de sesión remota en la máquina, puedes copiar los archivos con el siguiente comando:

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Esto asume que el nombre de usuario en la máquina es `ubuntu`, reemplaza con el nombre de usuario correcto en ambos lugares si es diferente. Además, reemplaza `PUBLICIP`con la IP pública real de la máquina. Si `scp`no utiliza automáticamente tu llave SSH descargada, puedes apuntarla manualmente:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Una vez ejecutado, este comando creará `avalanche_backup`el directorio en tu directorio de origen y colocará archivos de staker en él. Necesitas guardarlos en algún lugar seguro.

## Restaurar

Para restaurar tu nodo desde una copia de seguridad, necesitamos hacer el reverso: restaure `staker.key`y `staker.crt`desde la copia de seguridad al directorio de trabajo del nodo.

Primero, necesitamos hacer la [instalación](set-up-node-with-installer.md) habitual del nodo. Esto creará un nuevo nodeID, que necesitamos reemplazar. Cuando el nodo está instalado correctamente, entra en la máquina donde el nodo se está ejecutando y pare:

```text
sudo systemctl stop avalanchego
```

Estamos listos para restaurar el nodo.

### Al nodo local

Si estás ejecutando el nodo localmente, solo copiando los `staker.key`y los `staker.crt`archivos de la ubicación de copia de seguridad en el directorio de trabajo, que en la instalación de Linux por defecto`/home/USERNAME/.avalanchego/staking/` Reemplaza `USERNAME`con el nombre de usuario real utilizado para ejecutar el nodo.

### Al nodo remoto`scp`

Una vez más, el proceso es solo la operación inversa. Usando `scp`necesitamos copiar los `staker.key`y `staker.crt`archivos de la ubicación de copia de seguridad en el directorio de trabajo remoto. Asumiendo que los archivos de respaldo se encuentran en el directorio donde el procedimiento de copia de seguridad anterior los colocó:

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

O si necesitas especificar la ruta a la tecla SSH:

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Y de nuevo, reemplaza `ubuntu`con el nombre de usuario correcto si es diferente, y `PUBLICIP`con la IP pública real de la máquina que ejecuta el nodo, así como la ruta a la clave SSH si se usa.

### Reiniciar el nodo y verificar

Una vez que los archivos han sido reemplazados, inicias la máquina y inicias el nodo usando:

```text
sudo systemctl start avalanchego
```

Puedes ahora comprobar que el nodo se restaura con el NodeID correcto al emitir la llamada de API de [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) en la misma consola que ejecutaste el comando anterior:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Deberías ver tu NodeID original. Restaurar el proceso está hecho.

## Resumen

Parte esencial de asegurar tu nodo es la copia de seguridad que permite la restauración completa e full de tu nodo. Siguiendo este tutorial puedes descansar fácil sabiendo que si alguna vez te encuentras en una situación donde necesitas restaurar tu nodo desde cero, puedes hacerlo fácilmente y rápidamente.

Si tienes algún problema siguiendo este tutorial, comentarios que quieres compartir con nosotros o simplemente quieres chat, puedes contactarnos en nuestro servidor de [Discord](https://chat.avalabs.org/)

