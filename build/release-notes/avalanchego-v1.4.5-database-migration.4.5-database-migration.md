# AvalancheGo v1.4.5: Migración de la base de datos

Este artículo es aplicable cuando estás actualizando tu nodo de AvalancheGo < v1.4.5 a AvalancheGo >= v1.4.5. Aunque este artículo está escrito para v1.4.5 y referencias a esa versión, por ejemplo, sigue siendo aplicable si estás actualizando de AvalancheGo v1.4.4 a AvalancheGo v1.4.6, v1.4.7, etc.. Al leer este documento, reemplaza v1.4.5 con la versión a la que actualizas \(excepto en referencia al subdirectorio de la base de datos v1.4.5, que no cambiará.\)

## Resumen

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) trae optimizaciones de base significativas.
* Se duplicará temporalmente la cantidad de espacio de disco utilizado por AvalancheGo, y aumentará temporalmente el uso de la memoria y de la CPU.
* Por favor, lee este documento entero para asegurarse de que tu nodo migra con éxito y permanece sano durante la migración. Si no responde tu pregunta, ve a nuestro servicio de [Discord](https://chat.avalabs.org/) y lee los mensajes de acuñados y busca tu pregunta. Si todavía necesitas ayuda, por favor publicas en el canal #solución de problemas.

## Fondo

Estamos emocionados de anunciar el lanzamiento [de v1.4.5 de AvalancheGo](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5), que trae importantes optimizar la base de datos y mejoras de estabilidad a AvalancheGo.

En pruebas, observamos una reducción de ~90 % en la lectura de E/S en un validador de Mainnet, como se muestra en el gráfico de abajo:

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

Las mejoras se deben a la refactorización extensa de la gestión de estado en la P-Chain, así como otras optimizaciones de la base de datos.

Anticipamos que los nodos actualizados a >= v1.4.5 consumirán menos CPU y realizarán muchos menos discos lee una vez que la migración haya sido completada. Estos cambios mejorarán significativamente la latencia de decisión de la P-Chain

Esta actualización también acorta significativamente la cantidad de tiempo que toma para iniciar strap.

## El proceso de actualización

Si tienes una base de datos existente en tu computadora, entonces cuando ejecutes AvalancheGo v1.4.5, en realidad iniciará 2 nodos. Uno se ejecutará v1.4.4, que utiliza la versión de base de datos "vieja" \(v1.0.0\). El otro se ejecutará v1.4.5, que utiliza el formato de base de datos "nuevo" \(v1.4.5 que permanecerá lo mismo para cualquier AvalancheGo <=1.4.5\).

El nodo v1.4.4 se ejecutará como normal, y verás sus registros como antes. El nodo se conectará a la red usando el mismo ID de nodo que antes y, si es un validador, participa en consenso como antes. En resumen, las cosas deberían parecer lo mismo que al ejecutar v1.4.4.

El nodo v1.4.5 se ejecutará en el fondo, y iniciará correa desde el nodo v1.4.4 que se ejecuta en el mismo computadora. Esto es más rápido y utiliza menos ancho de banda que el procedimiento de arranque normal, que requiere que los datos sean enviados a través de Internet. Durante el proceso de toma de arranque, el nodo v1.4.5 se poblará la base de datos "nueva".

Cuando el nodo v1.4.5 se hace la toma de arranque, el nodo v1.4.4 se detendrá y el nodo v1.4.5 reiniciará el nodo. Cuando el nodo v1.4.5 reinicie, se ejecutará normalmente, usando la base de datos "nueva" y completará la migración. Tu nodo tendrá el mismo ID de nodo que antes.

No deberías proporcionar la `--plugin-dir`bandera. Si usas el script de instaladores para instalar AvalancheGo, necesitas eliminar esta bandera de tu archivo de servicio de AvalancheGo. Ver esta [nota](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script).

## Uso de recursos

Durante la migración, cuando ambos nodos se están ejecutando, AvalancheGo consumirá más recursos del sistema que de lo habitual.

Cuando la migración se completa, habrá 2 bases de datos de arranque en tu computadora. Asegúrate de que la cantidad de espacio de disco libre en tu computadora supere el tamaño de una base de datos totalmente arrancada \(~38 GB\). Recomendamos que dedices al menos 200 GB de espacio de disco en tu computadora a AvalancheGo. Aunque AvalancheGo usa solo una fracción de esa cantidad, anticipamos que el uso de disco aumentará antes de implementar una solución de poda.

El uso de la memoria y de la CPU también será elevado mientras ambos nodos se están ejecutando. Anticipamos que cualquier ordenador con CPU >= 2GHz y >= 6 GB de RAM disponible para AvalancheGo no tendrá ningún problema. Dicho esto, deberías monitorear tu nodo especialmente estrechamente durante los primeros días para asegurar que sea saludable.

Ver [preguntas frecuentes](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) para comprobar que tu computadora tiene espacio de disco adecuado, y qué hacer si tu computadora tiene especificaciones menores que las recomendadas.

## Instrucciones de actualización paso a paso

* **Tu nodo no tendrá tiempo de inactividad al seguir estas instrucciones.**
* **La base de datos, más los datos de keystore y los tiempos de recuperación de validador, se migra automáticamente.**

### Verifica los requisitos

Verifica que tu computadora cumpla con los siguientes requisitos:

* CPU >= 2GHz
* RAM
* Disco duro: deberías tener al menos 1,3 veces del espacio de disco ocupado por _`$HOME/.avalanchego/db/mainnet/v1.0.0`_, que es de alrededor de 38 GB. Esto significa que deberías tener aproximadamente 50 GB de espacio libre. De lo contrario, el programa no podrá proceder a actualizar la base de datos. Recomendamos que dedices al menos 200 GB de espacio de disco en tu computadora a AvalancheGo. Para comprobar cuánto espacio tienes, mira [cuánto espacio de disco está disponible en este](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now) momento.
* Para remediar, mira lo siguiente
   * [¿Qué debo hacer si mi computadora no tiene suficiente espacio de disco?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [¿Qué pasa si mi computadora no puede ejecutar 2 nodos a la vez?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Datos de copia de seguridad

Copia de seguridad de los datos de tu nodo al seguir [esto](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore).

Tu clave de staking / certificado no están en la base de datos, y no **deberían ser afectados en absoluto **por la migración de la base. Aun así, es buena práctica [tener una copia](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de seguridad de tu clave de participación/certificado.

### Descargar la nueva versión

Se puede descargar una nueva versión con **uno de los siguientes enfoques dependiendo **de tus prácticas:

* Con [scripts de Instalador](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade), ejecuta._`./avalanchego-installer.sh`_
* Con la descarga binaria, mira [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)
* Con la creación de código fuente, mira [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)

### Ejecuta la nueva versión

Para iniciar la nueva versión

* Si ejecutas AvalancheGo como un servicio que te recomendamos encarecidamente, verifica que la _`--plugin-dir`_bandera no esté presente en el _`avalanchego.service`_archivo. Si no está presente, puedes saltar el siguiente párrafo. Si está presente, sigue las instrucciones de abajo para eliminarlo.

   En la consola, entra en el comando:_`sudo nano /etc/systemd/system/avalanchego.service`_   En el editor, localiza la línea que comienza con _`ExecStart=`_y en ella borra la siguiente parte: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_entonces guarda los cambios presionando ctrl-x y y.

   Para aplicar los cambios, ejecuta el comando:  _`sudo systemctl daemon-reload`_   Finalmente, reinicia el nodo con:  _`sudo systemctl restart avalanchego`_

* Con la descarga binaria o la creación de código fuente, mira [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche).

### Monitorear el progreso

Monitorea y asegúrate de que la migración se completa con éxito:

Puedes comprobar el progreso al hacer lo siguiente:

* Consulta el uso de espacio de disco usando comando

   _`du -h $HOME/.avalanchego/db/mainnet`_

   que debería producir resultados que mostraran el tamaño de ambas bases de datos bajo v1.0.0 y v1.4.5, respectivamente.

* Los registros para el nodo de poblar la nueva base de datos se pueden encontrar en_`$HOME/.avalanchego/logs/fetch-only`_
* Estos mensajes indican la finalización de la migración de la base de datos:
   * Cuando _`"starting latest node version in normal execution mode"`_se imprime, la nueva base de **datos **ha sido iniciada y el nodo ha reiniciado.
   * Cuando _`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_se imprime, los **datos de **keystore se terminarán de migrar.
   * Cuando _`"finished migrating platform vm from database version v1.0.0 to v1.4.5"`_se imprime, los tiempos de **recuperación se **encuentran terminados de migrar.

Dependiendo de tu computadora, el proceso de actualización podría tomar una cantidad significativa de tiempo. Algunos validadores han reportado 30 horas más con computadoras menos poderosas. Depende principalmente del tipo de almacenamiento en el ordenador. Si el almacenamiento está basado en SSD, debería completar en 12 horas o menos. En los sistemas basados en HDD puede tomar un par de días \(la migración es casi exclusivamente aleatoria de lectura/escrituras y los HDD son bastante lentos en esos tipos de cargas de trabajo\). Sin embargo, tu nodo seguirá trabajando durante la migración sin tiempo de inactividad.

Puedes verificar la versión de tu nodo al emitir la `info.getNodeVersion`API \(ver tutorial en P[ostman\)](https://docs.avax.network/build/tools/postman-avalanche-collection) y debes obtener la respuesta de la siguiente manera, donde el número de versión debería ser >=1,4,7 dependiendo de la versión que actualizas después de la finalización de la migración.

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

Aquí se puede encontrar más información sobre la actualización de un [nodo](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

## Preguntas frecuentes

### ¿Por qué [explorador] dice que mi nodo sigue en v1.4.4?

Durante la migración, un nodo v1.4.4 se ejecutará en tu computadora, como se explica arriba. Otros nodos en la red verán el tuyo como ejecutando v1.4.4 hasta que la migración sea completa.

### ¿Es obligatorio la migración de la base?

Sí. Nodos que ejecutan AvalancheGo < v1.4.5 ya no funciona.

### ¿Puedo actualizar a AvalancheGo 1.4.5 desde una versión diferente a la v1.4.4.4?

Sí, debería trabajar desde cualquier versión < 1.4.5.

### ¿Qué pasa si mi computadora no puede ejecutar 2 nodos a la vez?

Si tu computadora \(computadora 1\) tiene menos de 6 GB de RAM, puede que no sea capaz de ejecutar la migración porque no tiene suficiente memoria para ejecutar 2 nodos a la vez. Como recordatorio, aconsejamos que tu nodo tiene al menos 6 GB de RAM.

Si no puedes ejecutar la migración y quieres minimizar la cantidad de tiempo que tu nodo está fuera de línea, puedes hacer lo siguiente:

* En otro ordenador \(computadora 2\), ejecuta AvalancheGo v1.4.5, espera hasta que inicie straps, luego deja de AvalancheGo .
* En el ordenador 1, deja de AvalancheGo. Mueve el directorio de base de datos desde el ordenador 2 \(que acaba _`$HOME/.avalanchego/db/`_de iniciar la versión de base de datos v1.4.5\) a la misma ubicación en el ordenador 1. Luego actualiza a AvalancheGo v1.4.5 y ejecutarla.

Tenga en cuenta que **este no es el enfoque aconsejado, **y solo deberías hacerlo si tu nodo tiene menos de 6 GB de RAM o espacio de disco insuficientes. Una vez más, aconsejamos que tu nodo tiene al menos 6 GB de RAM y al menos 200 GB de espacio de disco. Tenga en cuenta que este enfoque no migra datos de almacén de claves o validador

### ¿Cuánto espacio de disco necesito?

Recomendamos que dedices al menos 200 GB de espacio de disco en tu computadora a AvalancheGo. Aunque AvalancheGo usa solo una fracción de esa cantidad \(~38 GB\), anticipamos que el uso de disco se elevará antes de implementar una solución de poda.

### ¿Cuánto espacio de disco está disponible en este momento?

Para ver la cantidad de espacio de disco disponible en tu directorio de base de datos en Mac OS o Linux, hace:

_`df -h $HOME/.avalanchego/db`_

Esta salida, por ejemplo, dice que 609 GB de espacio de disco está disponible:

_`Filesystem Size Used Avail Use% Mounted on`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### ¿Cuánto tiempo tardará en iniciar la nueva base de datos en arrancar?

Puede tardar alrededor de 30 horas. Sin embargo, puede tomar más o menos tiempo dependiendo de tu computadora.

### ¿Cómo sé que la migración de la base de datos ha completado?

Cuando _`"starting to run node in normal execution mode"`_se imprime, la nueva base de datos ha sido iniciada y el nodo ha reiniciado.

Cuando _`"finished migrating keystore from database version v1.0.0 to v1.4.5"`_se imprime, los datos de keystore se terminarán de migrar.

Cuando _`"finished migrating platformvm from database version v1.0.0 to v1.4.5"`_se imprime, los tiempos de recuperación se encuentran terminados de migrar.

### ¿Puedo eliminar la vieja base de datos?

Una vez que la nueva versión de base de datos está iniciada en marcha, el nodo v1.4.5 reinicia y completa la migración de la base. Después de que esto haya ocurrido, puedes eliminar el directorio de la base de datos, que de forma predeterminada es:

_`$HOME/.avalanchego/db/mainnet/v1.0.0`_

No es necesario que eliminas la base de datos vieja \(v1.0.0\).

### ¿Cambiará algo en la vieja base de datos?

No\*\*. \*\* La base de datos \(v1.0.0\)

**Sin embargo, nunca deberías modificar la base de datos mientras el nodo se está ejecutando.**

Para ser claro, si quieres eliminar la base de datos vieja después de las nuevas correas de arranque de la base:

* Ejecuta v1.4.5 hasta que las nuevas correas de base de datos y el nodo reinicia
* Detener el nodo
* Elimina el subdirectorio de v1.0.0 de la base de datos \(¡y solo ese subdirectorio!
* Empieza el nodo

**También deberías verificar que los datos de tu tienda de claves han sido migrados con éxito antes de eliminar la vieja base de datos.**

### ¿Se migrarán tiempos de validación y datos de keystore

Sí, pero como precaución, deberías [hacer copias](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de seguridad de tu clave de participación/certificado y tus datos de keystore antes de ejecutar AvalancheGo v1.4.5.

### ¿Cómo puedo ver los registros para el nodo v1.4.5 en el fondo?

De forma predeterminada, estos registros están en _`$HOME/.avalanchego/logs/fetch-only`_.

### ¿Qué debo hacer si mi computadora no tiene suficiente espacio de disco?

Si tu nodo no se ejecuta en la nube, deberías [hacer copias de seguridad de los datos de tu](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) nodo, moverlo a una máquina con más espacio de disco y ejecutar AvalancheGo en esa máquina.

Si tu nodo se ejecuta en la nube, obtén instrucciones para aumentar la cantidad de espacio de disco disponible desde tu proveedor de la nube. Ver su documentación.

### Si algo sale mal, ¿cómo puedo volver a la versión anterior?

Ver [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version). Esta migración no modifica ningún dato en la base de datos existente. La nueva base de datos se crea junto con ella. Si encuentras un problema y se reduce desde AvalancheGo v1.4.5 a v1.4.4.4, no deberías tener problemas de reclasificación ya que la base de datos existente no está cambiada. \(Esto asume que no has borrado la base de datos existente\).

### ¿Actualizará disminuirá el tiempo de actividad de mi validador ?

Si sigues las instrucciones en este documento, no. Tu nodo seguirá participando en consenso mientras que las nuevas correas de base de datos en el fondo. Si reinicias tu validador de una base de datos vacía, estará marcado como fuera de línea mientras inicias straps porque no responderá a las preguntas. Por lo tanto, no deberías reiniciar la correa desde una base de datos vacía si puedes evitarlo.

### ¿Debería reiniciar la correa desde cero?

Probablemente no. Si tu nodo es un validador, esto hará que su tiempo de actividad disminuya. \(Ver la respuesta anterior\). Si tu nodo no es un validador, pero ya ha iniciado validator, será más rápido migrar tu base de datos que reiniciar la correa de una base de datos vacía. En cualquier caso, estás mejor fuera de ejecutar la migración como se explica anteriormente en lugar de borrar tu base de datos v1.0.0 existente.

### **Mi nodo se apagó durante la migración / el arranque ¿Qué hago?**

Solo reinicia tu nodo. La migración recogerá dónde dejó. Recomendamos altamente que configures AvalancheGo para ejecutarse como un servicio para que reinicie automáticamente al apagado.

### Creo que algo está mal. ¿Qué hago?

**Primero, **asegúrate de que hayas leído este documento Puede responder a tu pregunta en algún lugar. Si no ves la respuesta, ve a nuestro servidor de [Discord](https://chat.avalabs.org/) y busca tu pregunta. Si no se ha preguntado ya, posta en el canal de resolución #.

### Uso Ortelius, ¿cómo lo actualizo?

Si estás usando Ortelius, sigue estos pasos para actualizarlo:

* Mantén tu vieja instancia de Ortelius en marcha.
* Instalar una nueva instancia de Ortelius que ejecuta la última versión en un ordenador diferente.
* Después de que la nueva instancia de Ortelius haya terminado de iniciar sesión de arranque, cambia a la nueva instancia.
* Apaga la vieja instancia de Ortelius.

Las instrucciones de implementación de Ortelio se pueden encontrar en [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

Un cambio en esta versión de Ortelio es que Ortelius usará ahora el indexador integrado del nodo. Esto mejora la estabilidad y garantiza que Ortelius no tenga transacciones falsas, incluso si se reinicia.

### Nota para los nodos instalados con script de instaladores

Si tu nodo fue instalado con el [script](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer) de instalar, necesitas arreglar el archivo de definición de servicio después de actualizar a 1.4.5. En la consola, entra en el comando:_`sudo nano /etc/systemd/system/avalanchego.service`_   En el editor, localiza la línea que comienza con _`ExecStart=`_y en ella borra la siguiente parte: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_entonces guarda los cambios presionando ctrl-x y y.

Para aplicar los cambios ejecuten el comando:  _`sudo systemctl daemon-reload`_   Finalmente, reinicia el nodo con:  _`sudo systemctl restart avalanchego`_

