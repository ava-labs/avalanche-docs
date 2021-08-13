---
description: Aprenda a participar en Avalanche validando o delegando

---

# Toma

La toma es el proceso de bloqueo de fichas para apoyar una red mientras recibe una recompensa a cambio de \(las recompensas pueden ser una mayor utilidad de red, compensación monetaria, etc.). El concepto de grapado fue [introducido por primera vez formalmente](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) por Sunny King y Scott Nadal de Peercoin.

### ¿Cómo funciona la prueba de la estaca?

Para resistir [los ataques](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack) de sybil una red descentralizada debe exigir que la influencia de la red se pague con un recurso escaso. Esto hace que sea inviablemente caro para un atacante obtener suficiente influencia sobre la red para comprometer su seguridad. En los sistemas de prueba de trabajo, el escaso recurso es la potencia computacional. En Avalanche, el recurso escasas es el símbolo nativo, [AVAX](../../#avalanche-avax-token). Para que un nodo [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) una cadena de bloques en Avalanche, debe stake AVAX.

## Parámetros de toma en Avalanche

Cuando un validador se hace validar la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), recibe de vuelta las fichas AVAX que se ha estancado. Puede recibir una recompensa por ayudar a asegurar la red. Un validador solo recibe una [recompensa](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) de validación si es suficientemente sensible y correcto durante el tiempo que valide. Lea el [token de Avalanche whitepaper](https://files.avalabs.org/papers/token.pdf) para aprender más sobre AVAX y la mecánica de la apilación.

{% insinuar style="warning" %} Las recompensas de toma se envían a su dirección de cartera al final del término de **grapado, siempre y cuando se cumplan todos estos parámetros**. {% endhint %}

* El importe mínimo que debe estaca un validador es de 2.000 AVAX
* El importe mínimo que un delegado debe delegar es 25 AVAX
* El importe mínimo de tiempo que uno puede estaca fondos para la validación es de 2 semanas
* El importe máximo de tiempo que uno puede estaca fondos para la validación es de 1 año
* El importe mínimo de tiempo que uno puede hacer fondos para la delegación es de 2 semanas
* El importe máximo de tiempo que uno puede hacer participar fondos para la delegación es de 1 año
* El tipo mínimo de tasas de delegación es del 2%
* El peso máximo de un validador \(su propia estaca + estaca delegada en ellos\) es el mínimo de 3e6 AVAX y 5 veces la cantidad que el validador se ha estancado. Por ejemplo, si usted ha hundido 2.000 AVAX para convertirse en validador, solo 8000 AVAX puede ser delegado en su nodo total \(no por delegador).
* El porcentaje mínimo del tiempo que un validador debe ser correcto y en línea para recibir una recompensa es del 60%

## Validadores

**Los validadores** aseguran Avalanche, crean nuevos bloques/vértices, y transacciones de proceso. Para lograr el consenso, los validadores se muestran repetidamente entre sí. La probabilidad de que un validador dado se muestree es proporcional a su hoguera.

Cuando añada un nodo al conjunto de validadores, especifíquese:

* ID de su nodo
* Cuando quieras empezar y dejar de validar
* ¿Cuántos AVAX estás fijando
* La dirección para enviar cualquier recompensa a
* Tasa de cuota de su delegación \(véase abajo\)

{% insinuar style="info" %} La cantidad mínima que debe estaca un validador es de 2.000 AVAX. {% endhint %}

{% insinuar style="danger" %} Tenga en cuenta que una vez que emita la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros. **No puedes eliminar tu estaca temprano o cambiar la cantidad de la estaca, ID de nodo o dirección de recompensa.** Por favor, asegúrese de que está utilizando los valores correctos en las llamadas API a continuación. Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o busque nuestras [Preguntas frecuentes](http://support.avalabs.org/en/collections/2618154-developer-faq) para desarrolladores. {% endhint %}

### Ejecutando un Validador<a id="running-a-validator"></a>

Si estás ejecutando un validador, es importante que tu nodo esté bien conectado para asegurarse de que recibes una recompensa. Mira [aquí](http://support.avalabs.org/en/articles/4594192-networking-setup).

Cuando emita la transacción para agregar un validador, las fichas y la tarifa de transacción se deducirán de las direcciones que controla. Cuando termines de validar, los fondos almacenados se devuelven a las direcciones de las que venían. Si usted ganó una recompensa, se envía a la dirección que usted especificó cuando usted se añadió como validador.

#### Permitir llamadas API<a id="allow-api-calls"></a>

Para hacer llamadas API a su nodo desde máquinas remotas, permita el tráfico en el puerto API \(`9650` por defecto\), y ejecute su nodo con argumento `--http-host=`

Usted debe desactivar todas las API que no usará a través de argumentos de línea de comandos. Debe configurar su red para que solo permita el acceso al puerto API desde máquinas de confianza \(por ejemplo, su equipo personal. \)

#### ¿Por qué es mi tiempo de inactividad?<a id="why-is-my-uptime-low"></a>

Cada validador de Avalanche realiza un seguimiento del tiempo de actividad de otros validadores. Puede ver las conexiones que tiene un nodo llamando a `info.peers`, así como el tiempo de actividad de cada conexión. **Este es solo el punto de vista de un nodo**. Otros nodos pueden percibir el tiempo de actividad de su nodo de manera diferente. Solo porque un nodo percibe su tiempo de actividad como bajo no significa que no recibirás recompensas grapas.

La razón probable de que su nodo no esté conectado a otro nodo es que NAT travers fracasó, y no empezaste su nodo con `--public-ip=[NODE'S PUBLIC IP]`. En el futuro, añadiremos un mejor monitoreo para facilitar la verificación de que su nodo está bien conectado.

#### Gestión Secreta<a id="secret-management"></a>

El único secreto que necesitas en tu nodo de validación es su clave de toma de decisiones, la clave TLS que determina la identificación de tu nodo. La primera vez que inicias un nodo, la Clave de toma se crea y pone en `$HOME/.avalanchego/staking/staker.key`. Usted debe hacer copias de seguridad de este archivo \(y `staker.crt`\) en algún lugar seguro. Perder su Clave de toma podría poner en peligro su recompensa de validación, ya que su nodo tendrá una nueva identificación.

No es necesario tener fondos AVAX en su nodo de validación. De hecho, es mejor práctica **no** tener muchos fondos en tu nodo. Casi todos sus fondos deben estar en direcciones "frías" cuya clave privada no está en ninguna computadora.

#### Supervisión<a id="monitoring"></a>

Siga este tutorial para aprender a monitorear el tiempo de actividad de su nodo, la salud general, etc.

{% page-ref page=".. /../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegados

Un delegado es un titular de tok, que quiere participar en el staking, pero decide confiar en un nodo de validación existente a través de la delegación.

Cuando delegas la estaca en un validador, especifíquese:

* El ID del nodo al que estás delegando
* Cuando desea iniciar / dejar de delegar la estaca \(debe estar mientras el validador está validando\)
* ¿Cuántos AVAX estás fijando
* La dirección para enviar cualquier recompensa a

{% insinuar style="info" %} El importe mínimo que un delegado debe delegar es de 25 AVAX. {% endhint %}

{% insinuar style="danger" %} Tenga en cuenta que una vez que emita la transacción para agregar su juego a un delegador, no hay forma de cambiar los parámetros. **No puedes eliminar tu estaca temprano o cambiar la cantidad de la estaca, ID de nodo o dirección de recompensa.** Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o busque nuestras [Preguntas frecuentes](http://support.avalabs.org/en/collections/2618154-developer-faq) para desarrolladores. {% endhint %}

### recompensas de delegados<a id="delegator-rewards"></a>

Si el validador que delegas tokens es lo suficientemente correcto y responsivo, recibirá una recompensa cuando haya terminado de delegar. Los delegados son recompensados de acuerdo con la misma función que los validadores. Sin embargo, el validador que delega para mantener una porción de su recompensa, especificado por el precio de la delegación del validador.

Cuando emita la transacción para delegar tokens, las fichas y la tarifa de transacción se deducirán de las direcciones que controla. Cuando termines de delegar, las fichas prefabricadas se devuelven a su dirección. Si usted obtuvo una recompensa, se envía a la dirección que especificó cuando delegó tokens.

