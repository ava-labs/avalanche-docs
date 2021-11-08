---
description: Información detallada sobre el protocolo de consenso de Avalanche
---

# Consenso de Avalanche

El consenso es la tarea de hacer que un grupo de computadoras llegue a un acuerdo sobre una decisión. Las computadoras pueden lograr un consenso al seguir una serie de pasos llamados "protocolo de consenso". Avalanche es un nuevo protocolo de consenso que se ajusta a escala, es sólido y descentralizado. Tiene una baja latencia y un alto rendimiento. Es eficiente en energía y no requiere que la computadora tenga un hardware especial. Se desempeña bien en condiciones adversas y es resistente a "ataques del 51 %". Este documento explica el protocolo de consenso de Avalanche. El documento técnico se encuentra [aquí.](https://www.avalabs.org/whitepapers)

## Video

{% embed url="https://www.youtube.com/watch?v=ZUF9sIu-D_k" caption="" %}

## Intuición

Primero, desarrollemos cierto grado de intuición acerca del protocolo. Imagina una habitación llena de gente que está tratando de llegar a un acuerdo sobre qué almorzar. Supongamos que hay una opción binaria entre pizza y barbacoa. Algunas personas inicialmente preferirán una pizza, mientras que otras optarán por hacer una barbacoa. El propósito de todos es lograr el **consenso**.

Todos le preguntan a un subconjunto aleatorio de la gente en la habitación qué prefiere almorzar. Si más de la mitad dicen "pizza", la persona piensa, "Ok, parece que las cosas se están inclinando hacia pizza. Ahora yo también prefiero comer pizza". Es decir, adoptan la _preferencia _de la mayoría. Del mismo modo, si una mayoría dice "barbacoa", la persona adoptará esa opción como su preferencia.

Todos repiten este proceso. En cada ronda, más y más personas tendrán la misma preferencia. Esto se debe a que, cuantas más personas prefieran una opción, más probable será que alguien reciba una respuesta mayoritaria y adopte esa opción como su preferencia. Tras suficientes rondas, llegarán a un consenso y decidirán cuál opción es la que todos prefieren.

## Snowball

La intuición anterior describe el algoritmo de Snowball, un pilar del consenso de Avalanche. Revisemos el algoritmo de Snowball.

### Parámetros

* _n_: número de participantes
* _k _\(tamaño de la muestra\): entre 1 y _n_
* α \(tamaño del quorum\): entre 1 y _k_
* β \(umbral de la decisión\): >= 1

### Algoritmo

```text
preference := pizza
consecutiveSuccesses := 0
while not decided:
  ask k random people their preference
  if >= α give the same response:
    preference := response with >= α
    if preference == old preference:
      consecutiveSuccesses++
    else:
      consecutiveSuccesses = 1
  else:
    consecutiveSuccesses = 0
  if consecutiveSuccesses > β:
    decide(preference)
```

### Algoritmo explicado

Todos tienen una preferencia inicial por pizza o barbacoa. Eso es, hasta que alguien haya _decidido_, le preguntarán a _k _personas \(el tamaño de la muestra\) cuál es su preferencia. Si α o más personas dan la misma respuesta, esa respuesta se adoptará como su nueva preferencia. α se refiere al _tamaño del quorum_. Si la nueva preferencia es igual a la anterior, el contador `consecutiveSuccesses` incrementa. Si la nueva preferencia es diferente a la preferencia anterior, el `consecutiveSucccesses` contador se establecerá en `1`. Si ninguna respuesta recibe un quorum \(una mayoría α de la misma respuesta\), el `consecutiveSuccesses` contador se establecerá en `0`.

Todos repiten esto hasta llegar a un quorum para la misma respuesta β veces consecutivas. Si una persona se decide por pizza, cualquier otra persona que siga el protocolo también optará por pizza.

Los cambios aleatorios en la preferencia, que resultan del muestreo aleatorio, causan una preferencia de red por una opción. Esto genera una preferencia de la red por esa opción hasta que se hace irreversible, momento en el cual los nodos pueden tomar una decisión.

{% hint style="info" %}Si deseas una gran visualización, mira [esta demostración](https://tedyin.com/archive/snow-bft-demo/#/snow) por parte del fundador de Ava Labs, Ted Yin.{% endhint %}

En nuestro ejemplo, hay una opción binaria entre pizza o barbacoa, pero Snowball puede adaptarse para lograr el consenso en procesos de decisión que contienen muchas opciones posibles.

Los umbrales de vivacidad y seguridad son parametrizables. Conforme el tamaño del quorum, α, aumenta, el umbral de seguridad aumenta y el de vivacidad disminuye. Esto significa que la red puede tolerar más nodos bizantinos \(deliberadamente incorrectos o maliciosos\) y permanecer segura, lo que significa que todos los nodos eventualmente estarán de acuerdo en si algo es aceptado o rechazado. La vivacidad del umbral es el número de participantes malintencionados que se pueden tolerar antes de que el protocolo sea incapaz de progresar.

Estos valores, que son constantes, son bastante pequeños en la red de Avalanche. El tamaño de la muestra, _k,_ es `20`. Así que cuando un nodo le pide la opinión a un grupo de nodos, solo se lo pregunta a `20`nodos de toda la red. El tamaño del quorum, α, es `14`. Así que, si `14`o más nodos dan la misma respuesta, esa se adoptará como la preferencia del nodo de consulta. El umbral de la decisión, β, es `20`. Un nodo opta por una opción tras obtener `20` respuestas de quorum consecutivas \(mayoría α\).

Snowball es bastante ajustable a escala conforme la cantidad de nodos en la red, _n_, aumenta. Independientemente del número de participantes en la red, el número de mensajes de consenso enviado sigue siendo el mismo, pues, para cada consulta, un nodo solo le pregunta a `20` nodos, aun si hay miles de nodos en la red.

## DAG \(**G**ráficos **A**cíclicos **D**irectos\)

Ahora veremos una estructura de datos llamada DAG o gráfico acíclico directo. Un DAG provee un **ordenamiento parcial** de las decisiones. Por ejemplo, observa el DAG de este diagrama:

![DAG básico](../../.gitbook/assets/cons-01-Frame16.png)

**a **va antes de **b**. **b **va antes de **d**. **c **va antes de **e**. Transitivamente, podemos decir que **a **va antes de **e**. Sin embargo, este es un ordenamiento parcial: para algunos elementos, el orden no está definido. Por ejemplo, tanto **b **como **c** van después de **a**, pero no hay noción de si **b** va antes o después de **c**.

Dos conceptos adicionales relacionados con DAG son los **ancestros **y los **descendientes**. Los ancestros son los nodos del DAG hacia los que se puede trazar una línea. Por ejemplo, los ancestros de **d** son **a**, **b** y **c**. Los ancestros de **e** son **a** y **c**. Los descendientes son lo contrario a los ancestros. Los descendientes de **a** son **b**, **c**, **d** y **e**. El descendiente de **b** es **d**.

Por ejemplo, tanto Bitcoin como Ethereum tienen una cadena lineal en la que cada bloque tiene un padre y un hijo. Avalanche utiliza un DAG para almacenar datos en vez de una cadena lineal. Cada elemento del DAG puede tener varios padres. La relación entre padres e hijos en el DAG no implica dependencias de las aplicaciones.

En un protocolo de consenso, el objetivo es evitar incluir **transacciones conflictivas** en el DAG. Los conflictos son definidos por las aplicaciones. Las distintas aplicaciones tienen diferentes nociones acerca de lo que significa un conflicto entre dos transacciones. Por ejemplo, en un sistema de pagos de P2P, las transacciones que consumen la misma UTXO \([transacciones de salida no gastadas](https://en.wikipedia.org/wiki/Unspent_transaction_output)\) están en conflicto. En Avalanche, toda transacción pertenece a un **conjunto de conflictos** compuesto de transacciones conflictivas. En el DAG, solo se puede incluir una transacción en un conjunto de conflictos. Cada nodo **prefiere** una transacción en un conjunto de conflictos.

## Ejemplo de trabajo

Supongamos que tenemos una red de Avalanche que está funcionando bajo los siguientes parámetros. El tamaño de la muestra, _k,_ es `4`. El tamaño del quorum, α, es `3`. El número de éxitos consecutivos, β, es `4`.

![Ejemplo práctico 1](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Un nodo descubre una nueva transacción **Y**. Este le pregunta a la red con base en los parámetros anteriores. Consulta a los validadores _k_ \(`4`\) y les pregunta, "¿prefieres esta transacción?" Obtiene varias respuestas, tres de las cuales dicen **sí** y una **no**. El tamaño del quorum, α, es `3`, de modo que hay una mayoría α \(quorum\) de respuestas afirmativas. Ahora el nodo actualiza su DAG.

![Ejemplo práctico 2](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

Si un nodo recibe una respuesta de la mayoría α para una transacción, le das un **chit** a esa transacción, que es un booleano que dice, "cuando le pregunté a la red acerca de esta transacción, una mayoría α dijo que la prefería". En nuestro ejemplo, la transacción **Y** obtiene un vale.

También existe una noción de **confianza**, que es la suma del chit de un vértice más la suma de los chits de sus descendientes. Por ejemplo, la transacción **V** tiene un chit. También tiene tres descendientes con un chit, de modo que su confianza aumenta de `3`a `4`. Del mismo modo, ambas transacciones **W** y **X** tienen un chit y ambas tienen un descendiente con un chit, de modo que cada una tiene confianza `2`. La transacción **Y** tiene un grado de confianza `1`.

**Los éxitos consecutivos** son los mismos que los de Snowball. Es la cantidad de veces que una transacción o un descendiente de la transacción recibe una respuesta de la mayoría α de manera exitosa. Anteriormente, la transacción **V** fue efectiva `3` veces consecutivas, ella y sus dos hijos y ahora ha sido efectiva `4` veces consecutivas con la transacción **Y**. De forma similar para las transacciones **W** y **X**.

![Ejemplo práctico 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

En este ejemplo, el umbral de la aceptación, β, es `4`. La transacción **V** fue efectiva `4` veces consecutivas, así que es **aceptada**. Este nodo está seguro de que cualquier otro nodo correcto aceptará esta transacción.

![Ejemplo práctico 4](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Ahora supongamos que el nodo se entera de la transacción **Y'** que está en conflicto con la transacción **Y**. Sigue los mismos pasos que antes y hace un submuestreo de un número _k_ \(`4`\) de validadores preguntando si estos prefieren la transacción **Y'**. En este caso, dos de ellos dicen que prefieren **Y'** y otros dos dicen que no prefieren **Y'**. En esta ocasión no hay una respuesta de la mayoría α y el DAG se actualiza de confirmidad con eso.

![Ejemplo práctico 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

Las transacciones **Y** y **Y'** están en un conjunto de conflictos; solo una de ellas puede ser aceptada finalmente. La transacción **Y'** no obtiene un vale porque no recibió una respuesta mayoritaria α. Tiene `0` confianza porque no tiene chit y no tiene descendientes con chit. Tiene `0` éxitos consecutivos porque la consulta previa no obtuvo una respuesta de la mayoría α. El contador de intentos consecutivos de **W** de transacciones va de `2` a `0`. Su confianza todavía es `2`.

Cuando se le pregunta a un nodo si prefiere una transacción dada, este responde que sí si esa transacción tiene la mayor seguridad de todas las transacciones del conjunto transacciones conflictivas. En este ejemplo, la transacción**Y** tiene seguridad `1` y la transacción **Y'** tiene seguridad, `0` así que el nodo prefiere la transacción **Y** a la transacción **Y'**.

![Ejemplo práctico 6](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Ahora, el nodo aprende sobre una nueva transacción, **Z**, y hace lo mismo que antes. Le pregunta a los nodos _k_, obtiene una respuesta de la mayoría α y actualiza el DAG.

![Ejemplo práctico 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

La transacción **Z** obtiene un vale. También tiene una confianza de `1` y éxito consecutivo de `1`. Los ancestros de procesamiento también se actualizan. Ninguna transacción tiene `4` éxitos consecutivos, de modo que no se acepta a ningún ancestro.

## Vértices

Todo lo discutido hasta este punto está relacionado con la descripción de Avalanche en [su documento técnico](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf). La implementación del protocolo de consenso de Avalanche por parte de Ava Labs \(específicamente en AvalancheGo\) tiene algunas optimizaciones para la latencia y el rendimiento. La optimización más importante es el uso de los **vértices**. Un vértice es algo así como un bloque en una cadena de bloques lineales. Contiene los hashes de sus padres y una lista de las transacciones. Los vértices permiten hacer lotes de transacciones y votar por estas en grupos, en vez de una a una. El DAG está compuesto de vértices, y el protocolo funciona de manera muy similar a la descrita arriba.

Si un nodo recibe un voto para un vértice, cuenta como un voto para todas las transacciones de un vértice, y los votos se aplican verticalmente de forma transitoria. Un vértice es aceptado cuando todas las transacciones que contiene son aceptadas. Si un vértice contiene una transacción rechazada, este y todos sus descendientes serán rechazados. Si un vértice es rechazado, cualquier transacción válida se vuelve a emitir a un vértice nuevo que no sea hijo de uno rechazado. Los vértices nuevos se adjuntan a los vértices preferidos.

## Finalidad

El consenso de Avalanche es seguro en términos de probabilidad hasta un umbral de seguridad. Es decir, la probabilidad de que un nodo correcto acepte una transacción que otro nodo correcto rechazó se puede hacer arbitrariamente baja mediante el ajuste de los parámetros del sistema. En el protocolo de consenso de Nakamoto \(como se usa en Bitcoin y Ethereum\), un bloque puede ser incluido en la cadena, pero luego puede ser eliminado y no quedar en la cadena canónica. Esto implica esperar una hora para la resolución de la transacción. En Avalanche, la aceptación y el rechazo son **finales e irreversibles**, y solo duran unos segundos.

## Optimizaciones

No es eficiente que los nodos pregunten, "¿prefieres este vértice?" cuando le preguntan a los validadores. En la implementación de Ava Labs, durante una consulta, un nodo pregunta, "Dado que este vértice existe, ¿cuáles vértices prefieres?". En lugar de devolver un sí o no binario, el nodo recibe el conjunto de vértices preferido del otro nodo.

Los nodos no solo consultan al percatarse de una nueva transacción. Ellos preguntan repetidamente hasta que ya no se esté procesando ningún vértice virtuoso. Un vértice virtuoso es uno que no tiene conflictos.

Los nodos no necesitan esperar hasta que reciban todas las respuestas _k_ antes de registrar el resultado de una votación. Si ninguna transacción puede obtener una mayoría α, entonces no es necesario esperar por las demás respuestas.

## Validadores

Si hacerse validador en la red de Avalanche fuera una proceso gratuito, se generarían problemas, ya que un actor malicioso podría iniciar muchísimos nodos que se consultarían con mucha frecuencia. El actor malicioso podría hacer que el nodo actúe mal y causar un fallo de seguridad o vivacidad. Los validadores, los nodos consultados como parte del consenso, tienen influencia en la red. Para evitar este tipo de manipulación, tienen que pagar por esa influencia con valor del mundo real. Esta idea de usar valor del mundo real para comprar influencia en la red se denomina prueba de participación.

Para convertirse en un validador, un nodo debe **vincular** \(poner en participación\) algo de valor \(**AVAX**\). Cuanta más AVAX vincule un nodo, más frecuencuentemente será consultado por otros nodos. Los nodos no toman muestras de la red de manera uniformemente aleatoria. Más bien, ponderan según la cantidad de participaciones. Los nodos se incentivan para convertirse en validadores porque obtienen una recompensa si son lo suficientemente correctos y receptivos en sus validaciones.

Avalanche no tiene caídas de bloques. Si un nodo no reacciona adecuadamente durante la validación, por ejemplo, si da respuestas incorrectas o si no responde del todo, su participación se devuelve completa, pero sin recompensa. Siempre y cuando los nodos correctos retengan una porción suficiente de los AVAX vinculados, la red estará segura y en vivo para transacciones virtuosas.

## Grandes ideas

Dos grandes ideas de Avalanche son el **submuestreo** y la **votación transitiva**. El submuestreo tiene una baja sobrecarga de mensajes. Ya sea que haya 20 o 2000 validadores, la cantidad de mensajes de consenso que un nodo envía durante una consulta permanece constante.

![Ejemplo práctico 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

La votación transitiva, donde un voto por un vértice es un voto por todos sus ancestros, ayuda al rendimiento de las transacciones. En realidad, cada voto es muchos votos en uno. Por ejemplo, en el diagrama anterior, si un nodo obtiene un voto por el vértice **D**, esto implica un voto por todos sus ancestros; un voto por **D** también cuenta como un voto por **A**, **B** y **C**.

## Cabos sueltos

Los usuarios crean las transacciones al llamar como nodo completo a una API en [AvalancheGo](https://github.com/ava-labs/avalanchego) al usarlas como bibliotecas, tal como [AvalancheJS](https://github.com/ava-labs/avalanchejs). Los vértices se crean cuando los nodos hacen lotes de transacciones entrantes o cuando transacciones aceptadas de un vértice rechazado se vuelven a emitir y se agregan al DAG. Los padres de un vértice se elegiden desde la frontera virtuosa, la cual consta de los nodos en la punta del DAG que no tienen conflictos. Es importante construir sobre vértices virtuosos porque, si construimos sobre vértices no virtuosos, habría una mayor probabilidad de que el nodo sea rechazado, lo que implicaría una mayor probabilidad de que sus ancestros sean rechazados y que progresemos menos.

## Otras observaciones

No se garantiza que las transacciones conflictivas estén en vivo. Eso realmente no es un problema porque, si quieres que tu transacción esté en vivo, no deberías emitir una transacción conflictiva.

Avalanche también funciona para cadenas lineales. El protocolo es en gran medida igual al anterior, pero cada vértice tiene solo un padre. Esto le da un ordenamiento total a los vértices. Esto es útil para ciertas aplicaciones donde se necesita saber si una transacción vino antes de otra, como en el caso de los contratos inteligentes. Snowman es el nombre de la implementación de Ava Labs del protocolo de consenso de Avalanche para las cadenas lineales.

Si no hay transacciones indecisas, el protocolo de consenso de Avalanche _se desactiva_. Es decir, si no hay trabajo que hacer, no hace nada. Avalanche es más sostenible que la prueba de trabajo, en la que los nodos necesitan hacer trabajo constantemente.

Avalanche no tiene líder. Cualquier nodo puede proponer una transacción y cualquier nodo que tenga participaciones de AVAX puede votar en cada transacción, lo que hace que la red sea más robusta y descentralizada.

## ¿Por qué nos importa?

Avalanche es un motor de consenso general. No importa qué tipo de aplicación se le ponga encima. El protocolo permite desvincular la capa de la aplicación de la capa de consenso. Si estás construyendo una DApp en Avalanche, solo debes definir algunas cosas, como la definición de los conflictos y el contenido de una transacción. No necesitas preocuparte por cómo los nodos llegan a un acuerdo. El protocolo de consenso es una caja negra a la cual se le pone algo que luego sale como aceptado o rechazado.

Avalanche se puede usar para todo tipo de aplicaciones, no solo para las redes de pago de P2P. La red primaria de Avalanche tiene una instancia de la máquina virtual de Ethereum, la cual es retroactivamente compatible con las DApps de Ethereum y las herramientas de desarrollo. El protocolo de consenso de Ethereum se ha reemplazado con el consenso de Avalanche para permitir una latencia de bloqueo más baja y un rendimiento superior.

Avalanche tiene un desempeño muy elevado. Puede procesar miles de transacciones por segundo con una latencia de aceptación de uno a dos segundos.

## Resumen

El consenso de Avalanche es una innovación radical en los sistemas distribuidos. Representa un gran salto hacia el futuro, al igual que los protocolos de consenso clásicos y de Nakamoto que lo precedieron. Ahora que comprendes mejor cómo funciona, revisa más [documentación](https://docs.avax.network) para crear DApps e instrumentos financieros revolucionarios en Avalanche.

