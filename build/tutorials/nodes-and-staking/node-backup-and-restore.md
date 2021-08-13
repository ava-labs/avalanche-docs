# Copia de seguridad y restauración de nódulos

Una vez que tengas tu nodo en marcha y en marcha, es hora de prepararse para la recuperación de desastres. Si su máquina alguna vez tiene un fallo catastrófico debido a problemas de hardware o software, o incluso a un caso de desastre natural, es mejor estar preparado para tal situación haciendo una copia de seguridad.

Al ejecutarse, una instalación completa de nodos junto con la base de datos puede crecer para ser de múltiples gigabytes de tamaño. Tener que respaldar y restaurar un volumen tan grande de datos puede ser caro, complicado y largo. Por suerte, hay una manera mejor.

En lugar de tener que respaldar y restaurar todo, necesitamos respaldar solo lo que es esencial, es decir, aquellos archivos que no pueden ser reconstruidos porque son únicos a su nodo. Para el nodo Avalanchego, los archivos únicos son aquellos que identifican su nodo en la red, en otras palabras, los archivos que definen su NodeID. La instalación en sí misma puede recrearse fácilmente instalando el nodo en una nueva máquina, y todos los gigabytes restantes de los datos de blockchain se pueden recrear fácilmente mediante el proceso de arranque de secuestro, que copia los datos de otros pares de red.

Incluso si su nodo es un validador en la red y tiene varias delegaciones en ella, no es necesario preocuparse por hacer copias de seguridad de cualquier otra cosa, porque las transacciones de validación y delegación también se almacenan en el blockchain y se restaurarán durante el arranque de secuestro, junto con el resto de los datos de blockchain.

## NodeID

NodeID es un identificador único que diferencia tu nodo de todos los demás pares de la red. Es una cadena formateada como `NodeID-5mb46qkSBj81k9g9e4VFjGGSbaaSLFRzD`. Puede buscar el fondo técnico de cómo se construye el NodeID [aquí](../../references/cryptographic-primitives.md#tls-addresses). En esencia, NodeID se define por dos archivos:

* `staker.crt`
* `staker.key`

En la instalación predeterminada, se pueden encontrar en el directorio de trabajo, específicamente en `~/.avalanchego/staking/`. Todo lo que necesitamos hacer para recrear el nodo en otra máquina es ejecutar una nueva instalación con esos dos mismos archivos.

{% insinuar style="warning" %} Si tiene usuarios definidos en el keystore de su nodo, entonces debe hacer copias de seguridad y restaurar los también. [Keystore API](../../avalanchego-apis/keystore-api.md) tiene métodos que se pueden utilizar para exportar e importar teclas de usuario. Tenga en cuenta que Keystore API es utilizado por los desarrolladores solo y no está destinado a su uso en nodos de producción. Si no sabes lo que es una API de keystore y no la has usado, no tienes que preocuparte por ello.

## Copia de seguridad

Para respaldar su nodo, necesitamos almacenar archivos `staker.crt` y `staker.key` en algún lugar seguro y privado, preferiblemente a un equipo diferente, a su almacenamiento privado en la nube, un dispositivo USB o similar. Almacenarlos a un par de ubicaciones diferentes y seguras aumenta la seguridad.

{% insinuar style="warning" %} Si alguien obtiene un control de sus archivos de almacenamiento, todavía no pueden llegar a sus fondos, ya que están controlados por las teclas privadas de la billetera, no por el nodo. Pero, podrían recrear su nodo en otro lugar, y dependiendo de las circunstancias te hacen perder las recompensas de grabar. Así que asegúrese de que sus archivos de staker estén seguros. {% endhint %}

Vamos a sacar los archivos de la máquina que ejecuta el nodo.

### Desde el nodo local

Si está ejecutando el nodo localmente, en su computadora de escritorio, simplemente vaya a donde están los archivos y copiarlos en algún lugar seguro.

En una instalación de Linux predeterminada, la ruta a ellos será `installation`, donde `USERNAME` necesita ser reemplazada por el nombre de usuario real que ejecuta el nodo. Seleccione y copie los archivos de allí a una ubicación de copia de seguridad. No necesitas parar al nodo para hacer eso.

### Desde el nodo remoto utilizando `scp`

`scp` es un programa de línea de comandos 'copy segura', disponible en computadoras Linux y MacOS. También hay una versión de Windows, `pscp`, como parte del paquete [PuTTY](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html). Si utiliza `pscp`, en los siguientes comandos reemplace cada uso de `scp` con `pscp -scp`.

Para copiar los archivos del nodo, tendrá que ser capaz de iniciar sesión remotamente en la máquina. Puede utilizar la contraseña de la cuenta, pero la forma segura y recomendada es usar las teclas SSH. El procedimiento para adquirir y configurar las teclas SSH depende muy de su proveedor de nube y de la configuración de la máquina. Puede consultar nuestras guías de configuración de [Amazon Web Services](setting-up-an-avalanche-node-with-amazon-web-services-aws.md) y [Microsoft Azure](set-up-an-avalanche-node-with-microsoft-azure.md) para esos proveedores. Otros proveedores tendrán procedimientos similares.

Cuando tiene medios de inicio de sesión remota en la máquina, puede copiar los archivos con el siguiente comando:

```text
scp -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Esto asume que el nombre de usuario en la máquina es `ubuntu`, reemplace por el nombre de usuario correcto en ambos lugares si es diferente. Además, reemplace `PUBLICIP` por la IP pública real de la máquina. Si `scp` no utiliza automáticamente la tecla SSH descargada, puede señalarla manualmente:

```text
scp -i /path/to/the/key.pem -r ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking ~/avalanche_backup
```

Una vez ejecutado, este comando creará el directorio de `avalanche_backup` en el directorio de su hogar y colocará archivos de staker en él.

## Restaurar

Para restaurar su nodo desde una copia de seguridad, necesitamos hacer el reverso: restaurar `staker.key` y `staker.crt` desde la copia de seguridad al directorio de trabajo del nodo.

Primero, necesitamos hacer la [instalación](set-up-node-with-installer.md) habitual del nodo. Esto creará un nuevo NodeID, que necesitamos reemplazar. Cuando el nodo se instala correctamente, inicie sesión en la máquina donde el nodo se está ejecutando y detenga el nudo:

```text
sudo systemctl stop avalanchego
```

Estamos listos para restaurar el nodo.

### Al nodo local

Si está ejecutando el nodo localmente, solo tiene que copiar los archivos `staker.key` y `staker.crt` desde la ubicación de copia de seguridad en el directorio de trabajo, que en la instalación predeterminada de Linux será `staker.key` Reemplazar el `NOMBRE DE USUARIO` por el nombre de usuario real utilizado para ejecutar el nodo.

### A un nodo remoto usando `scp`

De nuevo, el proceso es solo la operación inversa. Usando `scp` necesitamos copiar los archivos `staker.key` y `staker.crt` desde la ubicación de copia de seguridad en el directorio de trabajo remoto. Suponiendo que los archivos respaldados se encuentren en el directorio donde el procedimiento de copia de seguridad anterior los colocó:

```text
scp ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

O si necesita especificar la ruta a la tecla SSH:

```text
scp -i /path/to/the/key.pem ~/avalanche_backup/staker.* ubuntu@PUBLICIP:/home/ubuntu/.avalanchego/staking
```

Y otra vez, reemplace `ubuntu` por el nombre de usuario correcto si es diferente, y `PUBLICIP` por la IP pública real de la máquina que ejecuta el nodo, así como la ruta hacia la tecla SSH si se utiliza.

### Reiniciar el nodo y verificar

Una vez que los archivos hayan sido sustituidos, inicie sesión en la máquina y comience el nodo utilizando:

```text
sudo systemctl start avalanchego
```

Ahora puede comprobar que el nodo se restaura con el NodeID correcto mediante la emisión de la llamada de API de [getNodeID](https://docs.avax.network/build/avalanchego-apis/info-api#info-getnodeid) en la misma consola que ejecutó el comando anterior:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Deberías ver tu NodeID original. Se ha hecho el proceso de restauración.

## Resumen

Parte esencial de asegurar su nodo es la copia de seguridad que permite la restauración completa e painless de su nodo. Siguiendo este tutorial puede descansar fácil sabiendo que si alguna vez se encuentra en una situación en la que necesita restaurar su nodo desde cero, usted puede hacerlo fácilmente y rápidamente.

Si tiene algún problema siguiendo este tutorial, comentarios que desea compartir con nosotros o simplemente quiere charlar, puede llegar a nosotros en nuestro servidor [de](https://chat.avalabs.org/) Discordia.

