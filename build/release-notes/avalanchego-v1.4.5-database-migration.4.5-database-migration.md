# AvalancheGo v1.4.5: Migración de la base de datos

Este artículo es aplicable cuando está actualizando su nodo de AvalancheGo < v1.4.5 a AvalancheGo >= v1.4.5. Aunque este artículo está escrito para v1.4.5 y referencias a esa versión abajo, por ejemplo, todavía se aplica si se está actualizando de AvalancheGo v1.4.4 a AvalancheGo v1.4.6, v1.4.7, etc.. Al leer este documento, reemplace v1.4.5 por la versión que está actualizando a \(excepto en referencia al subdirectorio de bases de datos v1.4.5, que no cambiará. \)

## Resumen

* [AvalancheGo v1.4.5](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) aporta importantes optimizaciones de bases de datos.
* Se duplicará temporalmente la cantidad de espacio de disco utilizado por AvalancheGo, y aumentará temporalmente el uso de la memoria y la CPU.
* Por favor, lea todo este documento para asegurarse de que su nodo migre con éxito y siga siendo saludable durante la migración. Si no responde a su pregunta, ve a nuestro servicio [de](https://chat.avalabs.org/) Discordia, lee los mensajes enredados y busca tu pregunta. Si todavía necesita ayuda, por favor ingrese en el canal \#solución de problemas.

## Antecedentes

Estamos emocionados de anunciar el lanzamiento de [v1.4.5 de](https://github.com/ava-labs/avalanchego/releases/tag/v1.4.5) AvalancheGo, que aporta importantes optimizaciones de bases de datos y mejoras de estabilidad a AvalancheGo.

En las pruebas, observamos una reducción de ~90% en E/S leída en un validador Mainnet, como se muestra en el gráfico siguiente:

![](../../.gitbook/assets/0%20%281%29%20%282%29%20%283%29.png)

Las mejoras se deben a una amplia refactorización de la gestión estatal en la cadena P-Chain, así como a otras optimizaciones de bases de datos.

Prevemos que los nodos actualizados a >= v1.4.5 consumirán menos CPU y realizarán muchos menos lectura de disco una vez que la migración haya sido completada. Estos cambios también mejorarán significativamente la latencia de decisión de la cadena P.

Esta actualización también acorta significativamente la cantidad de tiempo que se necesita para arrancar.

## El proceso de actualización

Si tiene una base de datos existente en su computadora, entonces cuando ejecuta AvalancheGo v1.4.5, en realidad comenzará 2 nodos. Uno se ejecutará v1.4.4, que utiliza la versión de base de datos "antigua" \(v1.0.0\). El otro se ejecutará v1.4.5, que utiliza el formato de base de datos "nuevo" \(v1.4.5 que se mantendrá el mismo para cualquier AvalancheGo <=1.4.5\).

El nodo v1.4.4 se ejecutará como normal, y verá sus registros como antes. El nodo se conectará a la red utilizando el mismo ID de nodo que antes y, si es un validador, participará en consenso como antes. En resumen, las cosas deben parecer iguales a cuando se ejecuta v1.4.4.

El nodo v1.4.5 se ejecutará en el fondo, y arrancará desde el nodo v1.4.4 que se ejecuta en el mismo ordenador. Esto es más rápido y utiliza menos ancho de banda que el procedimiento normal de arranque, lo que requiere que los datos se envíen a través de Internet. Durante el proceso de bootstrapping el nodo v1.4.5 se poblará la base de datos "nueva".

Cuando el nodo v1.4.5 se haga la bootstrapping, el nodo v1.4.4 se detendrá y el nodo v1.4.5 reiniciará. Cuando el nodo v1.4.5 reinicie, se ejecutará normalmente, utilizando la base de datos "nueva" y completará la migración. Tu nodo tendrá el mismo ID de nodo que antes.

No debe proporcionar la flag`--plugin-dir`. Si utilizó el script para instalar AvalancheGo, necesita eliminar esta bandera de su archivo de servicio AvalancheGo. Ver esta [nota](avalanchego-v1.4.5-database-migration.md#note-for-the-nodes-installed-with-installer-script).

## Uso de recursos

Durante la migración, cuando ambos nodos están funcionando, AvalancheGo consumirá más recursos del sistema de lo habitual.

Cuando la migración termine, habrá 2 bases de datos de arranque en su computadora. Asegúrese de que la cantidad de espacio libre en disco en su computadora excede el tamaño de una base de datos totalmente arrancada \(~38 GB\). Le recomendamos que dedice al menos 200 GB de espacio en disco en su computadora a AvalancheGo. Mientras AvalancheGo actualmente utiliza solo una fracción de esa cantidad, anticipamos que el uso del disco se elevará antes de implementar una solución de poda.

El uso de memoria y CPU también se elevará mientras ambos nodos están funcionando. Prevemos que cualquier ordenador con CPU >= 2GHz y >= 6 GB de RAM disponible para AvalancheGo no tendrá ningún problema. Dicho esto, debe monitorear su nodo especialmente de cerca durante los primeros días para asegurarse de que es saludable.

Vea [FAQ](https://app.gitbook.com/@avalanche/s/avalanche/build/release-notes/avalanchego-v1.4.5-database-migration#faq) para ver cómo verificar que su computadora tiene espacio adecuado en disco, y qué hacer si su computadora tiene especificaciones inferiores a las recomendadas.

## Instrucciones de actualización paso a paso

* **Su nodo no tendrá tiempo de inactividad siguiendo estas instrucciones.**
* **La base de datos, además de los datos de los almacenes de teclas y los tiempos de actualización del validador, se migran automáticamente.**

### Verificar los requisitos

Verificar que su ordenador cumpla los siguientes requisitos:

* CPU >= 2GHz
* RAM >= 6 GB
* Disco duro: debe tener al menos 1.3 veces del espacio en disco ocupado actualmente por _`$HOME/.avalanchego/db/mainnet/v1.0.0`_, que es de alrededor de 38 GB. Esto significa que debe tener aproximadamente 50 GB de espacio libre. De lo contrario, el programa no podrá proceder a actualizar la base de datos. Le recomendamos que dedice al menos 200 GB de espacio en disco en su computadora a AvalancheGo. Para comprobar cuánto espacio tiene, vea [cuánto espacio de disco está disponible ahora](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#how-much-disk-space-is-available-right-now) mismo.
* Para remediar, ver lo siguiente:
   * [¿Qué debo hacer si mi computadora no tiene suficiente espacio en disco?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-should-i-do-if-my-computer-doesnt-have-enough-disk-space)
   * [¿Y si mi computadora no puede ejecutar 2 nodos a la vez?](https://docs.avax.network/build/release-notes/avalanchego-v1.4.5-database-migration#what-if-my-computer-cant-run-2-nodes-at-once)

### Datos de respaldo

Copia de seguridad de los datos de su nodo siguiendo [esto](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore).

Su clave o certificado de registro no está en la base de datos, y **no debe verse afectada en absoluto** por la migración de la base de datos. Aun así, es buena práctica [tener una copia](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) de seguridad de su llave/certificado de grapado.

### Descargar la nueva versión

La nueva versión se puede descargar con **uno** de los siguientes enfoques dependiendo de sus prácticas:

* Con [Scripts de](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#node-upgrade) Instalador, ejecute _`./avalanchego-installer.sh`_
* Con la descarga binaria, vea [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#binary)
* Con la construcción de código fuente, vea [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#source-code)

### Ejecute la nueva versión

Para comenzar la nueva versión

* Si ejecuta AvalancheGo como un servicio, que le recomendamos encarecidamente, verifique que la bandera _`--plugin-dir`_ no está presente en el archivo _`avalanchego.service`_. Si no está presente, puede omitir el siguiente párrafo. Si está presente, siga las instrucciones que se indican a continuación para eliminarlo.

   En la consola, ingrese el comando: _`sudo nano /etc/systemd/system/avalanchego.service`_   En el editor, localizar la línea que comienza con _`ExecStart=`_ y en ella eliminar la siguiente parte: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Luego guardar los cambios presionando ctrl-x y y.

   Para aplicar los cambios, ejecute el comando:   _`sudo systemctl daemon-reload`_   Finalmente, reiniciar el nodo con:   _`sudo systemctl reiniciar avalanchego`_

* Con la descarga binaria o la construcción de código fuente, consulte [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/run-avalanche-node#start-a-node-and-connect-to-avalanche).

### Supervisar el progreso

Supervisar y asegurarse de que la migración completa con éxito:

Puede comprobar el progreso haciendo lo siguiente:

* Compruebe el uso del espacio en disco utilizando comando

   _`du -h $HOME/.avalanchego/db/mainnet`_

   que debe producir resultados que muestren el tamaño de ambas bases de datos en v1.0.0 y v1.4.5, respectivamente.

* Los registros para el nodo que poblan la nueva base de datos se pueden encontrar bajo _`$HOME/.avalanchego/logs/fetch-only`_
* Estos mensajes indican que se ha completado la migración de la base de datos:
   * Cuando se imprime _`la última versión de nodo en modo de ejecución`_ normal, entonces la nueva **base** de datos se ha arrancado y el nodo ha reiniciado.
   * Cuando se imprime _`"terminada de migrar keystore de la versión de base de datos v1.0.0 a`_ v1.4.5", entonces los datos del **keystore** se terminarán de migrar.
   * Cuando se imprime _`"plataforma de migración terminada vm de la versión de base de datos v1.0.0 a`_ v1.4.5", entonces el validador **de tiempos de actualización** se terminó de migrar.

Dependiendo de su computadora, el proceso de actualización podría tomar una cantidad significativa de tiempo. Algunos validadores han reportado más de 30 horas con ordenadores menos poderosos. Depende principalmente del tipo de almacenamiento en el ordenador. Si el almacenamiento se basa en SSD, debe completarse en 12 horas o menos. En los sistemas basados en HDD puede tardar un par de días \(la migración es casi exclusivamente aleatoria lectura/escritura, y los HDD son bastante lentos en esos tipos de cargas de trabajo). Sin embargo, su nodo seguirá trabajando durante la migración sin tiempo de inactividad.

Puede verificar la versión de su nodo mediante la emisión de `info.getNodeVersion` API \(ver tutorial en [Postman](https://docs.avax.network/build/tools/postman-avalanche-collection)\) y debe obtener la respuesta de la siguiente manera, donde el número de versión debe ser >=1.4.7 dependiendo de la versión que está actualizando, después de la finalización de la migración.

```javascript
{
    "jsonrpc": "2.0",
    "result": {
        "version": "avalanche/1.4.7"
    },
    "id": 1
}
```

Puede encontrar más información sobre la actualización de un [nodo](https://docs.avax.network/build/tutorials/nodes-and-staking/upgrade-your-avalanchego-node).

## FAQ

### ¿Por qué \[explorador\] dice que mi nodo sigue en v1.4.4?

Durante la migración, un nodo v1.4.4 se ejecutará en su computadora, como se explica anteriormente. Otros nodos en la red verán el tuyo como el v1.4.4 hasta que la migración se completa.

### ¿Es obligatorio la migración de la base de datos?

Sí, ¿no? Los nodos que ejecutan AvalancheGo < v1.4.5 ya no funcionan.

### ¿Puedo actualizar a AvalancheGo 1.4.5 de una versión distinta de v1.4.4?

Sí, debería funcionar desde cualquier versión < 1.4.5.

### ¿Y si mi computadora no puede ejecutar 2 nodos a la vez?

Si su ordenador \(ordenador 1\) tiene menos de 6 GB de RAM, puede que no sea capaz de ejecutar la migración porque no tiene suficiente memoria para ejecutar 2 nodos a la vez. Como recordatorio, le aconsejamos que su nodo tenga al menos 6 GB de RAM.

Si no puede ejecutar la migración y desea minimizar la cantidad de tiempo que su nodo está sin conexión, puede hacer lo siguiente:

* En otro ordenador \(ordenador 2\), ejecute AvalancheGo v1.4.5, espere hasta que se inicie, luego pare AvalancheGo .
* En el ordenador 1, detente AvalancheGo. Mueva el directorio de bases de datos _`$HOME/.avalanchego/db/`_ desde el ordenador 2 \(que acaba de iniciar la versión de base de datos v1.4.5\) a la misma ubicación en el ordenador 1. Luego actualice a AvalancheGo v1.4.5 y ejecutarlo.

Tenga en cuenta que **este no es el enfoque aconsejado,** y solo debe hacerlo si su nodo tiene menos de 6 GB de RAM o espacio en disco insuficiente. De nuevo, aconsejamos que su nodo tenga al menos 6 GB de RAM y al menos 200 GB de espacio en disco. Tenga en cuenta que este enfoque no migra los datos de tiempo de trabajo o de keystore o validador.

### ¿Cuánto espacio en disco necesito?

Le recomendamos que dedice al menos 200 GB de espacio en disco en su computadora a AvalancheGo. Mientras que AvalancheGo actualmente utiliza solo una fracción de esa cantidad \(~38 GB\), anticipamos que el uso del disco se elevará antes de implementar una solución de poda.

### ¿Cuánto espacio en disco está disponible ahora mismo?

Para ver la cantidad de espacio disponible en el directorio de su base de datos en Mac OS o Linux, haga lo siguiente:

_`df -h $HOME/.avalanchego/db`_

Esta salida, por ejemplo, dice que 609 GB de espacio de disco está disponible:

_`Tamaño del sistema de archivos usado Uso% montado en`_

_`/dev/nvme0n1p2 916G 261G 609G 30% /`_

### ¿Cuánto tiempo tardará en iniciar la nueva base de datos?

Puede tardar alrededor de 30 horas. Sin embargo, puede tomar más o menos tiempo dependiendo de su computadora.

### ¿Cómo sé que la migración de la base de datos ha terminado?

Cuando se imprime _`el "principio de ejecutar el nodo en modo de ejecución`_ normal", entonces la nueva base de datos se ha arrancado y el nodo ha reiniciado.

Cuando se imprime _`"terminada de migrar keystore de la versión de base de datos v1.0.0 a`_ v1.4.5", entonces los datos del keystore se terminarán de migrar.

Cuando se imprime _`"terminada de migrar platformvm de la versión de base de datos v1.0.0 a`_ v1.4.5", entonces el validador de tiempos de actualización se terminó de migrar.

### ¿Puedo eliminar la vieja base de datos?

Una vez que la nueva versión de base de datos se ha iniciado, el nodo v1.4.5 reinicia y completa la migración de la base de datos. Después de que esto haya sucedido, puede eliminar el antiguo directorio de bases de datos, que por defecto está en:

_`HOME/.avalanchego/db/mainnet/v1.0.0`_

No es necesario que usted elimine la antigua base de datos \(v1.0.0\).

### ¿Cambiará esta migración algo en la antigua base de datos?

No. ** La antigua base de datos \(v1.0.0\) no cambiará.

**Sin embargo, nunca debe modificar la base de datos mientras el nodo se está ejecutando .**

Para ser claro, si desea eliminar la antigua base de datos después de las nuevas trampas de arranque de la base de datos:

* Ejecute v1.4.5 hasta que las nuevas tiras de arranque de base de datos y el nodo reinicie
* Parar el nodo
* Suprímase el subdirectorio v1.0.0 de la base de datos \(y solo ese subdirectorio! \)
* Empieza el nodo

**También debe verificar que los datos del almacén de teclas han sido migrados con éxito antes de eliminar la antigua base de datos.**

### ¿Se migrarán los tiempos de actualización y los datos de keystore?

Sí, pero como precaución, debe [respaldar](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) su llave/certificado de grapado y sus datos de keystore antes de ejecutar AvalancheGo v1.4.5.

### ¿Cómo puedo ver los registros para el nodo v1.4.5 en el fondo?

De forma predeterminada, estos registros están en _`$HOME/.avalanchego/logs/fetch-only`_.

### ¿Qué debo hacer si mi computadora no tiene suficiente espacio en disco?

Si su nodo no se ejecuta en la nube, debe [respaldar los datos de su](https://docs.avax.network/build/tutorials/nodes-and-staking/node-backup-and-restore) nodo, muévelo a una máquina con más espacio en disco y ejecutar AvalancheGo en esa máquina.

Si su nodo se ejecuta en la nube, obtenga instrucciones para aumentar la cantidad de espacio disponible en disco de su proveedor de la nube. Vea su documentación.

### Si algo sale mal, ¿cómo puedo volver a la versión anterior?

Mira [aquí](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer#using-a-previous-version). Esta migración no modifica ningún dato en la base de datos existente. Si se encuentra con un problema y desgrado de AvalancheGo v1.4.5 a v1.4.4, no debe tener problemas para la reclasificación ya que la base de datos existente no está cambiada. \(Esto supone que no ha eliminado la base de datos existente\).

### ¿La actualización disminuirá el tiempo de trabajo de mi validador?

Si sigue las instrucciones en este documento, no. Su nodo seguirá participando en el consenso mientras se encuentran las nuevas herramientas de arranque de base de datos en el fondo. Si reinicia el arranque de su validador desde una base de datos vacía, se marcará como fuera de línea mientras arranca las correas porque no responderá a las preguntas. Por lo tanto, no debe reiniciar el arranque de una base de datos vacía si puede evitarlo.

### ¿Debería reiniciar el arranque desde cero?

Probablemente no. Si su nodo es un validador, esto hará que su tiempo de trabajo disminuya. \(Vea la respuesta anterior\). Si su nodo no es un validador, pero ya ha arrancado, será más rápido migrar su base de datos que reiniciar el arranque de una base de datos vacía. En cualquier caso, usted está mejor desconectar la migración como se explica anteriormente en lugar de simplemente borrar su base de datos v1.0.0 existente.

### **Mi nodo se apagó durante la migración / arranque de marcha. ¿Qué hago?**

Solo reinicia tu nodo. La migración recogerá donde se fue. Recomendamos altamente que configure AvalancheGo para funcionar como un servicio para que reinicie automáticamente al apagar.

### Creo que algo está mal. ¿Qué hago?

Primero, **asegúrese de que ha leído este documento a fondo**. Podría responder a su pregunta en algún lugar. Si no ve la respuesta, ve a nuestro servidor de [Discord](https://chat.avalabs.org/) y busca tu pregunta. Si no se ha preguntado ya, poste en el canal \#solución de problemas.

### Yo uso Ortelius, ¿cómo lo actualizo?

Si está utilizando Ortelius, siga estos pasos para actualizarlo:

* Mantenga su vieja instancia Ortelius corriendo.
* Instalar una nueva instancia Ortelius que ejecuta la última versión en un equipo diferente.
* Después de que la nueva instancia Ortelius haya terminado de iniciar el arranque, cambie a la nueva instancia.
* Apaga la antigua instancia Ortelius.

Las instrucciones para el despliegue de Ortelius se pueden encontrar en [https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md](https://github.com/ava-labs/ortelius/blob/master/docs/deployment.md)

Un cambio en esta versión de Ortelius es que Ortelius usará ahora el indexador incorporado del nodo. Esto mejora la estabilidad y garantiza que Ortelius no tenga transacciones faltadas, incluso si se reinicia.

### Nota para los nodos instalados con script para instalador

Si su nodo se instaló con el [script de instalación](https://docs.avax.network/build/tutorials/nodes-and-staking/set-up-node-with-installer), debe fijar el archivo de definición de servicio después de actualizar a 1.4.5. En la consola, ingrese el comando:_`sudo nano /etc/systemd/system/avalanchego.service`_   En el editor, localizar la línea que comienza con _`ExecStart=`_ y en ella eliminar la siguiente parte: _`--plugin-dir=/home/ubuntu/avalanche-node/plugins`_ Luego guardar los cambios presionando ctrl-x y y.

Para aplicar los cambios ejecute el comando:   _`sudo systemctl daemon-reload`_   Finalmente, reiniciar el nodo con:   _`sudo systemctl reiniciar avalanchego`_

