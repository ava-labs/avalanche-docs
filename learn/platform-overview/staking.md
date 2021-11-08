---
description: Aprende a hacer participaciones en Avalanche al validar o delegar
---

# Participación

El Staking es el proceso de bloquear tokens para apoyar una red a cambio de una recompensa \(las recompensas pueden ser el aumento de la utilidad de la red, la compensación monetaria, etc.\). El concepto de "staking" \(participación\) fue [introducido formalmente por primera vez](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) por Sunny King y Scott Nadal de Peercoin.

## ¿Cómo funciona el proof-of-stake?

Para resistir [ataques Sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), una red descentralizada debe exigir que la influencia de la red se pague con un recurso escaso. Esto hace que sea inviable que un atacante obtenga suficiente influencia en la red para comprometer su seguridad. En los sistemas proof-of-work, el recurso escaso es la potencia de computación. En Avalanche, el recurso escaso es el token nativo, [AVAX](../../#avalanche-avax-token). Para que un nodo [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) una blockchain en Avalanche, este debe hacer participaciones de AVAX.

## Parámetros de Staking en Avalanche

Cuando un validador termina de validar la [red primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), recibe de vuelta los tokens de AVAX de participación. Puede recibir una recompensa por ayudar a asegurar la red. Un validador solo recibe una [recompensa de validación](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) si es suficientemente receptivo y correcto durante el tiempo que valida. Lea el [documento oficial del token de Avalanche](https://files.avalabs.org/papers/token.pdf) para aprender más sobre AVAX y las mecánicas de hacer una participación.

{% hint style="warning" %}Las recompensas de una participación se envían a la dirección de tu billetera al final del plazo de estas**, siempre y cuando se cumplan todos estos parámetros**{% endhint %}.

* La cantidad mínima que un validador debe poner en stake es de 2 000 AVAX
* La cantidad mínima que un delegado debe delegar es de 25 AVAX
* El mínimo tiempo que se puede hacer staking para la validación es de 2 semanas.
* La cantidad máxima de tiempo que uno puede hacer staking para la validación es de 1 año
* El mínimo tiempo que uno puede hacer staking para la delegación es de 2 semanas
* La cantidad máxima de tiempo que uno puede hacer staking para la delegación es de 1 año
* La tasa mínima de derechos de delegación es del 2%
* El peso máximo de un validador \(su propio stake \+ el stake delegado en ellos\) es el mínimo de 3e6 AVAX y 5 veces la cantidad que el validador puso en stake. Por ejemplo, si pusiste en stake 2 000 AVAX para ser un validador, solo 8 000 AVAX pueden ser delegados al total de tu nodo \(no por delegador\).
* El porcentaje mínimo de tiempo que un validador debe ser correcto y estar en línea para recibir recompensas es el 80%

## Validadores

**Los validadores **protegen a Avalanche, crean nuevos bloques o vértices, y procesan las transacciones. Para lograr el consenso, los validadores se muestrean repetidamente unos a otros. La probabilidad de que un validador dado sea muestreado es proporcional a su stake.

Cuando se añade un nodo al conjunto de validadores, se especifica:

* El ID de tu nodo
* Cuando quieres empezar y dejar de validar
* ¿Con cuántos AVAX estás haciendo la participación?
* La dirección para enviar las recompensas
* Su tasa de comisión de delegación \(ver abajo\)

{% hint style="info" %}La cantidad mínima que un validador debe poner en la prueba de participación es 2000 AVAX.{% endhint %}

{% hint style="danger" %}Ten en cuenta que una vez que se emite la transacción para agregar un nodo como validador, no hay forma de cambiar los parámetros.** No puedes quitar tu prueba de participación antes de tiempo ni cambiar la cantidad, la identificación del nodo o la dirección de la recompensa.** Por favor, asegúrate de utilizar los valores correctos en los llamados de la API a continuación. Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o explora nuestras [Preguntas frecuentes de los desarrolladores](http://support.avalabs.org/en/collections/2618154-developer-faq). Si quieres agregar más tokens a tu propio validador, puedes delegarle los tokens a este nodo, pero no puedes aumentar la cantidad base de validación \(por lo que delegarte a ti mismo va contra tu límite de delegación\).
{% endhint %}

### Ejecución de un validador<a id="running-a-validator"></a>

Si estás ejecutando un validador, es importante que tu nodo esté bien conectado para asegurarte de recibirás tu recompensa. Ve [aquí](http://support.avalabs.org/en/articles/4594192-networking-setup).

Al emitir la transacción para añadir un validador, los tokens del stake y la comisión de la transacción se deducen de las direcciones que controlas. Cuando terminas de validar, los fondos del stake se devuelven a las direcciones de donde vinieron. Si has ganado una recompensa, se envía a la dirección que especificaste cuando te agregaste como validador.

#### Permitir API calls<a id="allow-api-calls"></a>

Para hacer API calls a tu nodo desde máquinas remotas, permite el tráfico en el puerto de la API \(`9650`por defecto\), y ejecuta tu nodo con el argumento.`--http-host=`

Deberías desactivar todas las API que no usarás mediante argumentos de la línea de comandos. Deberías configurar tu red para que solo permita el acceso al puerto de la API desde máquinas de confianza \(por ejemplo tu computador personal\)

#### ¿Por qué mi tiempo de actividad es bajo?<a id="why-is-my-uptime-low"></a>

Cada validador de Avalanche lleva un registro del tiempo de funcionamiento de los otros validadores. Si llamas a `info.peers`, podrás ver las conexiones que tiene un nodo y el tiempo de actividad de cada conexión.** Este es solamente el punto de vista de un nodo**. Otros nodos pueden percibir el tiempo de actividad de tu nodo de manera diferente. Solo porque un nodo perciba que tu tiempo de actividad es bajo no significa que no recibirás recompensas de staking.

La razón más probable de que tu nodo no esté conectado a otro es que el traversal NAT falló y que no comenzaste tu nodo con `--public-ip=[NODE'S PUBLIC IP]`. En el futuro, añadiremos una mejor monitorización para facilitar la verificación de que su nodo está bien conectado.

#### Gestión secreta<a id="secret-management"></a>

Lo único que necesitas mantener secreto en tu nodo validador es su Staking Key, la clave TLS que determina el ID de tu nodo. La primera vez que inicias un nodo, se crea la clave de participación, la cual estará en `$HOME/.avalanchego/staking/staker.key`. Debes hacer una copia de seguridad de este archivo \(y `staker.crt`\) en un lugar seguro. Perder tu Staking Key podría poner en peligro tu recompensa de validación, ya que tu nodo tendrá un nuevo ID.

No necesitas tener fondos de AVAX en tu nodo de validación. De hecho, la mejor práctica es **no **tener muchos fondos en tu nodo. Casi todos tus fondos deben estar en direcciones "frías", cuya clave privada no se encuentre en ninguna computadora.

#### Monitoreo<a id="monitoring"></a>

Sigue este tutorial para aprender a controlar el tiempo de actividad de tu nodo, su estado general, etc.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

#### Validación en Fuji

La validación en Fuji requiere solo `1 AVAX`. Así que puedes configurar fácilmente tu nodo de validador y aprender más sobre la validación.

## Delegadores

Un delegador es un poseedor de token, que quiere participar en el stake, pero elige confiar en un nodo de validación existente a través de la delegación.

Cuando delegas el stake a un validador, especificas:

* El ID del nodo en el que estás delegando
* Cuando quieres empezar/dejar de delegar el stake \(debe ser mientras el validador está validando\)
* ¿Con cuántos AVAX estás haciendo la participación?
* La dirección para enviar las recompensas

{% hint style="info" %}La cantidad mínima que un delegado debe delegar es 25 AVAX.{% endhint %}

{% hint style="danger" %}Ten en cuenta que, una vez que emitas la transacción para agregar una participación como delegadora, no habrá manera de cambiar los parámetros.** No puedes quitar tu prueba de participación antes de tiempo ni cambiar la cantidad, la identificación del nodo o la dirección de la recompensa.** Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o explora las [Preguntas frecuentes de los desarrolladores](http://support.avalabs.org/en/collections/2618154-developer-faq).{% endhint %}

### Recompensas para delegadores<a id="delegator-rewards"></a>

Si el validador en el que delega los tokens es lo suficientemente correcto y receptivo, recibirás una recompensa cuando termines de delegar. Los delegados son recompensados de acuerdo a la misma función que los validadores. Sin embargo, el validador en el que usted delega se queda con una parte de tu recompensa, especificada por la comisión de delegación del validador.

Al emitir la transacción para delegar tokens, las fichas del stake y la comisión de la transacción se deducen de las direcciones que controlas. Cuando termines de delegar, los tokens del stake se devuelven a tu dirección. Si has ganado una recompensa, esta se envía a la dirección que especificaste al delegar los tokens.

## Preguntas frecuentes

### ¿Hay una herramienta para comprobar el estado de salud de un validador?

Sí, introduce el ID de tu nodo [aquí](https://stats.avax.network/dashboard/validator-health-check). Puedes encontrar más información sobre esta herramienta [aquí](https://github.com/ava-labs/avalanche-docs/tree/5522f4864aab0089e456bfa3876f2dc4a4c01fe9/build/tools/avalanche-stats/README.md#validator-health-check).

### ¿Cómo se define si un validador recibe una recompensa de participación?

Cuando un nodo sale del conjunto de validadores, los validadores votan sobre si el nodo saliente debe recibir una recompensa de participación o no. Si un validador piensa que el nodo estaba en línea y receptivo durante más del tiempo requerido \(actualmente el 80%\), el validador votará para que el nodo reciba una recompensa de participación. De lo contrario, el validador votará para que el nodo no reciba una recompensa de participación. El resultado de este voto, que es ponderado por participación, define si el nodo recibe una recompensa o no.

Cada validador solo vota "sí" o "no". No comparten su opinión sobre el tiempo de actividad del nodo y luego promedian las respuestas, por ejemplo.

Cada período de validación se considera por separado. Es decir, supongamos que un nodo se une al conjunto de validadores y luego sale. Luego se une y sale de nuevo. El tiempo de actividad del nodo durante su primer período en el conjunto de validadores no afecta si recibe una recompensa de participación para su segundo período en el conjunto de validadores.

