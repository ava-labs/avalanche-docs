---
description: Una inmersión profunda en el protocolo de consenso de Avalanche
---

# Consenso de Avalanche

El consenso es la tarea de conseguir que un grupo de computadoras llegue a un acuerdo sobre una decisión. Las computadoras pueden alcanzar un consenso al seguir un conjunto de pasos llamados un protocolo de consenso. Avalanche es un nuevo protocolo de consenso que es escalable, robusto y descentralizado. Tiene baja latencia y alto rendimiento. Es energía eficiente y no requiere hardware de computadora especial. Funciona bien en condiciones de adversarios y es resiliente a los "ataques del 51 % de interés". Este documento explica el protocolo de consenso de Avalanche. El libro blanco está [aquí.](https://www.avalabs.org/whitepapers)

## Vídeo

{% embed url="https://www.youtube.com/watch?v=ZUF9sIu-D_k" caption="" %}

## Intuición

Primero, desarrollemos alguna intuición sobre el protocolo. Imagina una habitación llena de gente que intenta acordar en qué conseguir para el almuerzo. Supongamos que es una opción binaria entre pizza y barbacoa. Algunas personas pueden inicialmente preferir pizza, mientras que otros inicialmente prefieren la barbacoa. En última instancia, sin embargo, el objetivo de todo el mundo es lograr el ****consenso.

Todos preguntan un subconjunto aleatorio de la gente en la habitación cuál es su preferencia de almuerzo. Si más de la mitad de decir pizza, la persona piensa: "Ok, parece que las cosas se inclinan hacia la pizza. Preferiría la pizza ahora." Es decir, adoptan la _preferencia _de la mayoría. Del mismo modo, si una mayoría dice que la barbacoa, la persona adopta la barbacoa como su preferencia.

Todos repiten este proceso. Cada redondo, más y más personas tienen la misma preferencia. Esto se debe a que cuanto más personas que prefieren una opción, más probable es que alguien reciba una respuesta de mayoría y adopte esa opción como su preferencia. Después de suficientes rondas, llegan a consenso y deciden en una opción, que todos prefieren.

## Snowball

La intuición anterior describe el algoritmo de Snowball, que es un bloque de construcción del consenso de Avalanche. Revisemos el algoritmo de Snowball.

### Parametros

* __n: número de participantes
* _k \(tamaño de _muestra\): entre 1 y _n_
* α \(quorum tamaño\): entre 1 y _k_
* β \(umbral de decisión\): >= 1

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

### Algoritmo Explica

Todos los países tienen una preferencia inicial por la pizza o la barbacoa. Hasta que alguien haya __decidido, preguntan a las _personas _k \(el tamaño de la muestra\) y preguntan qué prefieren . Si α o más personas dan la misma respuesta, esa respuesta se adopta como la nueva preferencia. α se llama el tamaño __quorum. Si la nueva preferencia es la misma que la vieja preferencia, el `consecutiveSuccesses`contador se incrementa. Si la nueva preferencia es diferente entonces la vieja preferencia, el `consecutiveSucccesses`contador a .`1` Si ninguna respuesta recibe un quorum \(una mayoría de α de la misma respuesta\), entonces el `consecutiveSuccesses`mostrador está configurado en .`0`

Todos los casos lo repiten hasta que reciban un quorum para la misma respuesta β veces en una fila. Si una persona decide pizza, entonces cada otra persona que siga el protocolo eventualmente también decidirá sobre pizza.

Los cambios aleatorios en las preferencias, causados por el muestreo aleatorio, causan una preferencia de red por una elección, que inicia más preferencia de la red por esa elección hasta que se vuelve irreversible y entonces los nodos pueden decidir.

{% hint style="info" %}Para una gran visualización, mira [esta demo](https://tedyin.com/archive/snow-bft-demo/#/snow) del Cofundador de Ava Labs Ted Yin{% endhint %}

En nuestro ejemplo, hay una opción binaria entre pizza o barbacoa, pero Snowball puede ser adaptado para lograr el consenso en decisiones con muchas opciones posibles.

Los umbrales de vida y seguridad son parametrizables. A medida que el tamaño de quorum, α, aumenta, el umbral de seguridad aumenta, y el umbral de vida disminuye. Esto significa que la red puede tolerar más nodos byzantine \(deliberadamente incorrectos y maliciosos\) y mantenerse seguros, lo que significa que todos los nodos eventualmente estarán de acuerdo en si algo es aceptado o rechazado. El umbral de vida es el número de participantes maliciosos que pueden ser tolerados antes de que el protocolo no pueda hacer progreso.

Estos valores, que son constantes, son bastante pequeños en la red de Avalanche. El tamaño de muestra, __k, es `20`. Así que cuando un nodo pregunta a un grupo de nodos su opinión, solo pregunta `20`nodos fuera de la red. El tamaño de quorum, α, es `14`. Así que si `14`o más nodos dan la misma respuesta, esa respuesta se adopta como la preferencia del nodo de consulta. El umbral de decisión, β, es `20`. Un nodo decide elegir después de recibir respuestas `20`consecutivas de quorum \(α mayoría\).

Snowball es muy escalable ya que el número de nodos en la red, __n, aumenta. Independientemente del número de participantes en la red, el número de mensajes de consenso enviados sigue siendo el mismo porque en una consulta determinada, un nodo solo pregunta `20`nodos, incluso si hay miles de nodos en la red.

## DAGs \(gráficos ****acíclicos ********dirigidos\)

Ahora vamos a introducir una estructura de datos llamada un DAG o un gráfico acíclico dirigido. Un DAG da un pedido **parcial **de decisiones. Por ejemplo, mira la DAG en este diagrama:

![DAAG básico](../../.gitbook/assets/cons-01-Frame16.png)

****a **es antes de que la ****b. **b sea antes de que la ******c. **sea antes de e. Transitivamente, podemos decir que la **fecha de **entrada en ********e. Sin embargo, ya que este es un pedido parcial: para algunos elementos, el pedido no está definido. Por ejemplo, tanto b **como **c **están después de **una **pero no hay noción de si **b **es **antes o después de ****c.

Dos conceptos adicionales relacionados con DAG son **ancestros **y ****descendientes. Antepasados son cualquier nodo en el DAG que puedes crear una línea hacia arriba. ****Por ejemplo, los ancestros de **d son ****a, ****b, y c. Los ancestros de **e son **un **y ********c. Los Descendants son lo opuesto a los ancestros. Los descendientes de **a **son b, ****c, ********d, y ****e. El descendiente de **b **es ****d.

Tanto Bitcoin como Ethereum, tienen una cadena lineal donde cada bloque tiene un padre y un niño. Avalanche utiliza un DAG para almacenar datos en lugar de una cadena lineal. Cada elemento de la DAG puede tener varios padres. La relación parent-child en el DAG no implica una dependencia de nivel de aplicación.

En un protocolo de consenso, el nombre del juego es prevenir la inclusión de transacciones **conflictivas **en el DAG. Los conflictos están definidos en la aplicación. Diferentes aplicaciones tendrán diferentes nociones sobre lo que significa para dos transacciones al conflicto. Por ejemplo, en un sistema de pago P2P, las transacciones que consumen la misma UTXO \([salida de transacciones no gastado ](https://en.wikipedia.org/wiki/Unspent_transaction_output)\) se would En Avalanche todas las transacciones pertenecen a un conjunto de **conflicto **que consiste en transacciones conflictivas. Solo una transacción en un conjunto de conflicto puede ser incluida en el DAG. Cada nodo **prefiere **una transacción en un conjunto de conflictos.

## Ejemplo de trabajo

Supongamos que tenemos una red de Avalanche que se ejecuta con los siguientes parámetros. El tamaño de muestra, __k, es `4`. El tamaño de quorum, α, es `3`. El número de éxito consecutivo, β, es `4`.

![Ejemplo de trabajo 1](../../.gitbook/assets/cons-02-Consensus_Doc_txY.png)

Un nodo se entera de una nueva transacción ****Y. Preguntas sobre la red basada en los parámetros anteriores. Preguntas y preguntas de los validadores _k _`4`\(\) y preguntas, "¿Preferes esta transacción?" Se recuperan respuestas: tres de ellas dicen que **sí **y uno de ellos dice ****no. El tamaño de quorum, α, es `3`así que hay una mayoría de α \(quorum\) de respuestas sí. Ahora nosotros el nodo actualiza su DAG.

![Ejemplo de trabajo 2](../../.gitbook/assets/cons-03-Consensus_Doc_txY-6.png)

Si un nodo recibe una respuesta de la mayoría de α para una transacción, entonces le das a esa transacción un chit, que es un booleano que dice: "Cuando he preguntado la red sobre esta ****transacción, una mayoría de α dijo que la preferían". En nuestro ejemplo, la transacción Y recibe un chit.

También hay una noción de ****confianza, que es la suma de un coraje de un vértice más la suma de los chits de sus descendientes. Por ejemplo, la transacción **V **tiene un chit. También tiene tres descendientes que tienen un chit de modo que su confianza se aumenta de a `3`la .`4` **Del mismo modo, las transacciones **W **y **X tienen un chit y ambos tienen un descendiente con un chit, por lo que cada una tiene confianza `2`. `1`Transaction Y tiene confianza

**Los éxitos secutivos **son los mismos que en Snowball. Es el número de veces que una transacción o un descendiente de la transacción, recibió una respuesta de consulta de la mayoría de α exitosa. `4`Anteriormente, la transacción V tuvo éxitos consecutivos, en sí misma y sus dos niños, y ahora tiene éxitos `3`consecutivos con la transacción Y. Del mismo modo para las transacciones W y X.

![Ejemplo de trabajo 3](../../.gitbook/assets/cons-04-Consensus_Doc_txY-2.png)

En este ejemplo nosotros, el umbral de aceptación, β, es `4`. Transaction V tiene éxito `4`consecutivo así que es **aceptado.** Este nodo está seguro de que cada otro nodo correcto

![Ejemplo de trabajo 4](../../.gitbook/assets/cons-05-Consensus_Doc_txY-3.png)

Ahora supongamos que el nodo se aprende sobre la transacción Y' **que entra en conflicto con la transacción **Y. Sigue los mismos pasos que antes y las submuestras de validadores _k _`4`\(\) y pregunta si prefieren la transacción Y'. En este caso, dos de ellos dicen que prefieren Y' y dos de ellos dicen que no prefieren Y'. Esta vez no hay respuesta de la mayoría de α y el DAG se actualiza en consecuencia.

![Ejemplo de trabajo 5](../../.gitbook/assets/cons-06-Consensus_Doc_txY-4.png)

Las transacciones Y y y ' están en un conjunto de conflictos; solo una de ellas puede finalmente ser aceptada. Transaction Y' no recibe un chit porque no recibió una respuesta de la mayoría de α Tiene confianza `0`porque no tiene un chit y no tiene ningún descendientes con un chit de corte. Tiene éxitos `0`consecutivos porque la consulta anterior no recibió una respuesta de la mayoría de α El contador de éxito consecutivo va de a ser a `2`la .`0` `2`Su confianza sigue siendo

Cuando se pregunta si prefiere una transacción determinada, responde sí si esa transacción tiene la mayor confianza de cualquier transacción en el conjunto de conflicto de la transacción. En este ejemplo, la transacción Y tiene confianza `1`y la transacción Y' tiene confianza y la confianza Y' tiene confianza `0`para que el nodo prefiere la transacción Y a la transacción Y'.

![Ejemplo de trabajo 6](../../.gitbook/assets/cons-07-Consensus_Doc_txY-1.png)

Ahora el nodo se aprende sobre una nueva transacción, ****Z y hace lo mismo que antes. Preguntas que nodos __k, recibe una respuesta de la mayoría de α y actualiza el DAG.

![Ejemplo de trabajo 7](../../.gitbook/assets/cons-08-Consensus_Doc_txY-5.png)

Transaction Z recibe un chit. También tiene una confianza `1`y un éxito `1`consecutivo. Los ancestros de procesamiento Ninguna transacción tiene éxitos `4`consecutivos así que no se aceptan ancestros.

## Vértices

Todo lo discutido hasta este punto es cómo Avalanche es descrito en [el libro blanco](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf) de Avalanche. La implementación del protocolo de consenso de Avalanche por Ava Labs \(concretamente en AvalancheGo\) tiene algunas optimizaciones para la latencia y el rendimiento. La optimización más importante es el uso de ****vértices. Un vértice es como un bloque en una blockchain lineal. Contiene los hash de sus padres y contiene una lista de transacciones. Los vértices permiten que las transacciones sean batched y votadas en grupos en lugar de uno por uno. La DAG está compuesta de vértices y el protocolo funciona muy similar a la forma en que se describe arriba.

Si un nodo recibe un voto por un vértice, cuenta como un voto para todas las transacciones en un vértice, y los votos se aplican transitivamente al alza de la voz. Se acepta cuando todas las transacciones que están en ella sean aceptadas. Si un vértice contiene una transacción rechazada, entonces se rechaza y todos sus descendientes son rechazados. Si un vértice es rechazado, cualquier transacción válida se vuelve a emitir en un nuevo vértice que no es el niño de un vértice rechazado. Se añaden a los vértices preferentes.

## Finalidad

El consenso de Avalanche es probabilísticamente seguro hasta un umbral de seguridad. Es decir, la probabilidad de que un nodo correcto acepte una transacción de que otro nodo correcto se pueda hacer arbitrariamente bajo al ajustar los parámetros del sistema. En el protocolo de consenso de Nakamoto \(como se usa en Bitcoin y Ethereum\), un bloque puede ser incluido en la cadena, pero luego ser eliminado y no termina en la cadena canónica. Esto significa esperar una hora para el arreglo de transacciones. En Avalanche, la aceptación/rechazo son **definitivas e irreversibles **y toman unos segundos.

## Optimizaciones

No es eficiente para los nodos preguntar: "¿Preferes este vértice?" cuando preguntan validadores. En la implementación de Ava Labs, durante una consulta un nodo pregunta, "Dado que este vértice existe, ¿qué vértices prefieres? En vez de regresar un sí/no binario el nodo recibe el conjunto de vértex preferido del otro nodo.

Nodos no solo consulta al escuchar una nueva transacción. Preguntas repetidas hasta que no haya vértices virtuosos Un vértice virtuoso es uno que no tiene conflictos.

Nodos no necesitan esperar hasta que reciban todas las respuestas de _k _consulta antes de registrar el resultado de una votación. Si ninguna transacción puede obtener una mayoría de α entonces no hay necesidad de esperar el resto de las respuestas.

## Validadores

Si fuera libre de convertirse en un validador en la red de Avalanche, eso sería problemático porque un actor malicioso podría iniciar muchos, muchos nodos que se preguntarían muy frecuentemente. El actor malicioso podría hacer que el nodo actúe mal y causar un fracaso de seguridad o de libélula. Los validadores los nodos que se cuestionan como parte de un consenso, tienen influencia en la red. Tienen que pagar por esa influencia con el valor del mundo real para evitar este tipo de relleno de urnas. Esta idea de usar el valor del mundo real para comprar influencia en la red se denomina Prueba de partes interesadas.

Para convertirse en un validador, un nodo debe **enlazar **\(hoguera\) algo valioso ****\(AVAX\). Cuanto más AVAX sea un nodo bonos, más a menudo que el nodo es preguntado por otros nodos. Cuando un nodo muestra la red, no es de forma uniforme al azar. Más bien, se pondera por importe de acción. Los nodos están incentivados a ser validadores porque reciben una recompensa si, al tiempo que if, son lo suficientemente correctos y responsivos.

Avalanche no tiene slashing. Si un nodo no se comporta bien al validar como dar respuestas incorrectas o quizás no respondiendo, su participación sigue siendo devuelta en total, pero sin recompensa. Mientras una porción suficiente de la AVAX de enlace sea mantenida por nodos correctos, entonces la red es segura y está en vivo para transacciones virtuosas.

## Grandes

Dos grandes ideas en Avalanche son la subsampling de **muestras **y la votación ****transitiva. Subsampling tiene un mensaje bajo en general. No importa si hay veinte validadores o dos mil validadores y el número de mensajes de consenso que un nodo envía durante una consulta sigue siendo constante.

![Ejemplo de trabajo 8](../../.gitbook/assets/cons-09-Consensus_Doc_txY-7.png)

Votación transitiva, donde un voto por un vértice es un voto para todos sus ancestros, ayuda con el rendimiento de las transacciones. Cada voto es en realidad muchos votos en uno. Por ejemplo, en el diagrama anterior, si un nodo recibe un voto por el vértex ****D, que implica un voto para todos sus ancestros; un voto por **D **es también un voto para ****A, ****B y ****C.

## Terminales sueltos

Las transacciones son creadas por usuarios que llaman una API en el nodo completo de [AvalancheGo](https://github.com/ava-labs/avalanchego) que las crean usando una biblioteca como [AvalancheJS](https://github.com/ava-labs/avalanchejs). Los vértices se crean cuando los nodos de lote entrantes transacciones juntas o cuando las transacciones aceptadas de un vértice rechazado se reissued y se añaden al DAG. Los padres de un vértice son elegidos desde la frontera virtuosa, que son los nodos en la punta de la DAG sin conflictos. Es importante crear en vértices virtuosos porque si construimos en vértices no virtuosos habría una mayor posibilidad de que el nodo sea rechazado lo que significa que hay una mayor posibilidad de que sus ancestros sean rechazados y haríamos menos progreso.

## Otras observaciones

No se garantiza que las transacciones conflictivas sean vivas. Eso no es un problema porque si quieres que tu transacción sea en vivo entonces no deberías emitir una transacción conflictiva.

Avalanche funciona para las blockchains lineales El protocolo es en gran medida el mismo que arriba, pero cada vértice tiene solo un padre. Esto da un pedido total de vértices. Esto es útil para ciertas aplicaciones donde uno necesita saber si una transacción vino antes de otra transacción, como con contratos inteligentes. Snowman es el nombre de la implementación de Ava Labs del protocolo de consenso de Avalanche para las blockchains lineales.

__Si no hay transacciones undecided el protocolo de consenso de Avalanche Es decir, no hace nada si no hay trabajo que hacer. Avalanche es más sostenible que el trabajo de prueba donde los nodos necesitan hacer constantemente trabajo.

Avalanche no tiene líder. Cualquier nodo puede proponer una transacción y cualquier nodo que haya staked puede votar en todas las transacciones, lo que hace que la red sea más robusta y descentralizada.

## ¿Por qué nos importa?

Avalanche es un motor de consenso general. No importa qué tipo de aplicación se ponga en la parte superior de ella. El protocolo permite el desacoplamiento de la capa de aplicación desde la capa de consenso. Si estás construyendo una Dapp en Avalanche, entonces solo necesitas definir unas cuantas cosas, como cómo se definen los conflictos y qué está en una transacción. No necesitas preocuparte de cómo nodos llegan a un acuerdo. El protocolo de consenso es una caja negra que pone algo en ella y vuelve como sea aceptado o rechazado.

Avalanche puede ser utilizado para todo tipo de aplicaciones, no solo redes de pago P2P. La red primaria de Avalanche tiene una instancia de la máquina virtual de Ethereum, que es compatible con las Dapps de Ethereum y las herramientas de dev. El protocolo de consenso de Ethereum ha sido reemplazado con consenso de Avalanche para permitir la latencia de bloque más bajo y el rendimiento más alto.

Avalanche es muy performance. Puede procesar miles de transacciones por segundo con una latencia de aceptación dos segundos.

## Resumen

El consenso de Avalanche es un avance radical en los sistemas distribuidos. Representa un salto adelante como los protocolos de consenso clásico y Nakamoto que vinieron antes de él. Ahora que tienes una mejor comprensión de cómo funciona, mira otra [documentación](https://docs.avax.network) para crear Dapps cambiantes de juego e instrumentos financieros en Avalanche.

