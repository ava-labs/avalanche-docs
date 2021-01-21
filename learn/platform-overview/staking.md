---
descripción: Aprende como hacer stake en Avalanche validando o delegando
---

# Staking

El Staking es el proceso de bloquear tokens para apoyar una red mientras se recibe una recompensa a cambio \(Las recompensas pueden ser el aumento de la utilidad de la red, la compensación monetaria, etc.\). El concepto de staking fue [introducido formalmente por primera vez](https://web.archive.org/web/20160306084128/https://peercoin.net/assets/paper/peercoin-paper.pdf) Por Sunny King y Scott Nadal de Peercoin.

### ¿Cómo funciona el proof-of-stake?

Para resistir [ataques sybil](https://support.avalabs.org/en/articles/4064853-what-is-a-sybil-attack), una red descentralizada debe exigir que la influencia de la red se pague con un recurso escaso. Esto hace que sea inviable que un atacante obtenga suficiente influencia en la red para comprometer su seguridad. En los sistemas proof-of-work, el recurso escaso es la potencia de computación. En Avalanche, el recurso escaso es el token nativo, [AVAX](../../#avalanche-avax-token). Para que un nodo [valide](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator) una blockchain en Avalanche, este debe hacer stake de AVAX.

## Parámetros de Staking en Avalanche

Cuando un validador termina de validar la [Red Primaria](http://support.avalabs.org/en/articles/4135650-what-is-the-primary-network), recibe de vuelta los tokens de AVAX que ha puesto en stake. Puede recibir una recompensa por ayudar a asegurar la red. Un validador sólo recibe una [recompensa de validación](http://support.avalabs.org/en/articles/4587396-what-are-validator-staking-rewards) si es suficientemente receptivo y correcto durante el tiempo que valida. Lea el [Whitepaper del Token de Avalanche](https://files.avalabs.org/papers/token.pdf) para aprender más sobre AVAX y las mecánicas del staking.

{% hint style="warning" %}
Las recompensas del staking se envían a la dirección de tu wallet al final del plazo de staking **siempre y cuando se cumplan todos estos parámetros**.
{% endhint %}

* La cantidad mínima que un validador debe poner en stake es de 2 000 AVAX
* La cantidad mínima que un delegado debe delegar es de 25 AVAX
* El mínimo tiempo que se puede hacer staking para la validación es de 2 semanas.
* La cantidad máxima de tiempo que uno puede hacer staking para la validación es de 1 año
* El mínimo tiempo que uno puede hacer staking para la delegación es de 2 semanas
* La cantidad máxima de tiempo que uno puede hacer staking para la delegación es de 1 año
* La tasa mínima de derechos de delegación es del 2%
* El peso máximo de un validador \(su propio stake + el stake delegado en ellos\) es el mínimo de 3e6 AVAX y 5 veces la cantidad que el validador puso en stake. Por ejemplo, si pusiste en stake 2 000 AVAX para ser un validador, sólo 8 000 AVAX pueden ser delegados al total de tu nodo \(no por delegador\).
* El porcentaje mínimo de tiempo que un validador debe estar correcto y en línea para recibir una recompensa es del 60%

## Validadores

**Los validadores** protegen Avalanche, 
crean nuevos bloques/vértices y procesan las transacciones. Para lograr el consenso, los validadores se muestrean repetidamente unos a otros. La probabilidad de que un validador dado sea muestreado es proporcional a su stake.

Cuando se añade un nodo al conjunto de validadores, se especifica:

* El ID de tu nodo
* Cuando quieres empezar y dejar de validar
* Cuántos AVAX pones en stake
* La dirección para enviar las recompensas
* Su tasa de comisión de delegación \(ver abajo\)

{% hint style="info" %}
La cantidad mínima que un validador debe poner en stake es de 2 000 AVAX
{% endhint %}

{% hint style="danger" %}
Tenga en cuenta que una vez que se emite la transacción para añadir un nodo como validador, no hay forma de cambiar los parámetros. **No puede eliminar su stake anticipadamente o cambiar el importe de el mismo, el ID del nodo o la dirección de la recompensa.** Asegúrate de utilizar los valores correctos en los llamados API que se indican a continuación. Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o navega por nuestras [Preguntas más Frecuentes de los Desarrolladores](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Ejecutando un Validador <a id="running-a-validator"></a>

Si estás ejecutando un validador, es importante que tu nodo esté bien conectado para asegurarte de recibirás tu recompensa. Ver [aquí](http://support.avalabs.org/en/articles/4594192-networking-setup).

Al emitir la transacción para añadir un validador, los tokens del stake y la comisión de la transacción se deducen de las direcciones que controlas. Cuando terminas de validar, los fondos del stake se devuelven a las direcciones de donde vinieron. Si has ganado una recompensa, se envía a la dirección que especificaste cuando te agregaste como validador.

#### Permitir Llamados API <a id="allow-api-calls"></a>

Para hacer llamados a la API a tu nodo desde máquinas remotas, permite el tráfico en el puerto de la API \(`9650` por defecto\), y ejecuta tu nodo con el argumento `--http-host=`

Deberías desactivar todas las API que no usarás mediante argumentos de la línea de comandos. Deberías configurar tu red para que sólo permita el acceso al puerto de la API desde máquinas de confianza  \(por ejemplo tu computador personal\)

#### ¿Por qué mi tiempo de actividad es bajo? <a id="why-is-my-uptime-low"></a>

Cada validador de Avalanche lleva un registro del tiempo de funcionamiento de los otros validadores. Puedes ver las conexiones que tiene un nodo llamando a `info.peers`, así como el tiempo de actividad de cada conexión. **Este es sólo el punto de vista de un nodo**. Otros nodos pueden percibir el tiempo de actividad de tu nodo de manera diferente. Sólo porque un nodo perciba que tu tiempo de actividad es bajo no significa que no recibirás recompensas de staking.

La razón más probable de que su nodo no esté conectado a otro nodo es que el traversal NAT falló, y no comenzó su nodo con `--public-ip=[NODE'S PUBLIC IP]`. En el futuro, añadiremos una mejor monitorización para facilitar la verificación de que su nodo está bien conectado.

#### Gestión Secreta <a id="secret-management"></a>

Lo único que necesitas mantener secreto en tu nodo validador es su Staking Key, la clave TLS que determina el ID de tu nodo. La primera vez que inicias un nodo, la Staking Key se crea y se pone en `$HOME/.avalanchego/staking/staker.key`. Deberías hacer una copia de seguridad de este archivo \(y `staker.crt`\) en un lugar seguro. Perder tu Staking Key podría poner en peligro tu recompensa de validación, ya que tu nodo tendrá un nuevo ID.

No necesitas tener fondos de AVAX en tu nodo de validación. De hecho, es mejor práctica **no** tener muchos fondos en tu nodo. Casi todos tus fondos deberían estar en direcciones "cold" cuya private key no esté en ningún ordenador.

#### Monitoreo<a id="monitoring"></a>

Sigue este tutorial para aprender a controlar el tiempo de actividad de tu nodo, su salud general, etc.

{% page-ref page="../../build/tutorials/nodes-and-staking/setting-up-node-monitoring.md" %}

## Delegadores

Un delegador es un poseedor de token, que quiere participar en el stake, pero elige confiar en un nodo de validación existente a través de la delegación.

Cuando delegas el stake a un validador, especificas:

* El ID del nodo en el que estás delegando
* Cuando quieres empezar/dejar de delegar el stake \(debe ser mientras el validador está validando\)
* Cuántos AVAX estás poniendo en stake
* La dirección para enviar las recompensas

{% hint style="info" %}
La cantidad mínima que un delegado debe delegar es de 25 AVAX
{% endhint %}

{% hint style="danger" %}
Ten en cuenta que una vez emites la transacción tpara añadir tu stake a un delegador, no hay forma de cambiar los parámetros. **No puede eliminar su stake anticipadamente o cambiar el importe de el mismo, el ID del nodo o la dirección de la recompensa.**  Si no estás seguro, pide ayuda en [Discord](https://chat.avax.network) o navega por nuestras [Preguntas más Frecuentes de los Desarrolladores](http://support.avalabs.org/en/collections/2618154-developer-faq).
{% endhint %}

### Recompensas para Delegadores <a id="delegator-rewards"></a>


Si el validador en el que delega los tokens es lo suficientemente correcto y receptivo, recibirás una recompensa cuando termines de delegar. Los delegados son recompensados de acuerdo a la misma función que los validadores. Sin embargo, el validador en el que usted delega se queda con una parte de tu recompensa, especificada por la comisión de delegación del validador.

Al emitir la transacción para delegar tokens, las fichas del stake y la comisión de la transacción se deducen de las direcciones que controlas. Cuando termines de delegar, los tokens del stake se devuelven a su dirección. Si has ganado una recompensa, ésta se envía a la dirección que especificaste al delegar los tokens.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzc4NjE5NzIxLC0zNTM3MDE1MTMsMTQyNj
M3Mzc0NiwxNTcyNzM0MzYsLTE1MzM4NDA5OTIsLTkwNTMxNzMw
MCw5OTU1NTQ4OCw1NDI1Njc2NDgsLTM2Mjc5OTM4MSw1NzY4MD
U5OTEsLTcxNzcxOTgxMV19
-->