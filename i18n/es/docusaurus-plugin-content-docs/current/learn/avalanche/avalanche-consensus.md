---
etiquetas: [Consenso Avalanche, Protocolo Avalanche]
descripción: El Consenso Avalanche es un protocolo de consenso que es escalable, robusto y descentralizado.
palabras clave: [consenso avalanche, consenso snowman, escalando blockchains, consenso nakamoto]
sidebar_label: Consenso Avalanche
---

# Consenso Avalanche

El consenso es la tarea de lograr que un grupo de computadoras (también conocidas como nodos) lleguen a un acuerdo sobre una decisión.
En blockchain, esto significa que todos los participantes en una red tienen que estar de acuerdo en los cambios realizados en
el libro mayor compartido. Este acuerdo se alcanza a través de un proceso específico, un protocolo de consenso,
que asegura que todos vean la misma información y que la información sea precisa y confiable.

**El Consenso Avalanche** es un protocolo de consenso que es escalable, robusto y descentralizado. Combina características de mecanismos de consenso clásicos y Nakamoto para lograr alta capacidad de procesamiento,
finalidad rápida y
eficiencia energética. Para ver el whitepaper, vea [aquí](https://www.avalabs.org/whitepapers).

Las características clave incluyen:

- Velocidad: el consenso Avalanche proporciona finalidad inmutable en fracciones de segundo, asegurando que las transacciones sean
confirmadas rápidamente e irreversibles.
- Escalabilidad: el consenso Avalanche permite un alto rendimiento de la red al tiempo que garantiza baja latencia.
- Eficiencia energética: a diferencia de otros protocolos de consenso populares, la participación en el consenso Avalanche
no es intensiva en computación ni costosa.
- Seguridad adaptativa: el consenso Avalanche está diseñado para resistir varios ataques, incluidos ataques sybil,
ataques de denegación de servicio distribuido (DDoS) y ataques de colusión. Su naturaleza probabilística asegura que el resultado del consenso converja al estado deseado, incluso cuando la red
está bajo ataque.

![Comparación de Consensos](/img/Consensus-protocol-comparison.png)

## Resumen conceptual

Los protocolos de consenso en la familia Avalanche operan a través de votaciones submuestreadas repetidas. Cuando un
nodo está determinando si una
[transacción](http://support.avalabs.org/en/articles/4587384-what-is-a-transaction) debería ser
aceptada, le pregunta a un pequeño subconjunto aleatorio de
[nodos validadores](http://support.avalabs.org/en/articles/4064704-what-is-a-blockchain-validator)
por su preferencia. Cada validador consultado responde con la transacción que prefiere, o piensa
debería ser aceptada.

:::nota

El consenso nunca incluirá una transacción que se determine como **inválida**. Por ejemplo, si
enviaras una transacción para enviar 100 AVAX a un amigo, pero tu billetera solo tiene 2 AVAX, esta transacción
se considera **inválida** y no participará en el consenso.

:::

Si una mayoría suficiente de los validadores muestreados responde con la misma transacción preferida,
esta se convierte en la opción preferida del validador que preguntó.

En el futuro, este nodo responderá con la transacción preferida por la mayoría.

El nodo repite este proceso de muestreo hasta que los validadores
consultados respondan con la misma respuesta durante un número suficiente de rondas consecutivas.

- El número de validadores requeridos para ser considerados una "mayoría suficiente" se denomina "α" (_alfa_).
- El número de rondas consecutivas requeridas para alcanzar el consenso, también conocido como "Umbral de Confianza",
se denomina "β" (_beta_).
- Tanto α como β son configurables.

Cuando una transacción no tiene conflictos, la finalización ocurre muy rápidamente. Cuando
existen conflictos, los validadores honestos se agrupan rápidamente alrededor de transacciones en conflicto, entrando en un
bucle de retroalimentación positiva hasta que todos los validadores correctos prefieren esa transacción. Esto conduce a la
aceptación de transacciones no conflictivas y al rechazo de transacciones conflictivas.

![Cómo funciona el consenso Avalanche](/img/howavalancheconsensusworks.png)

El Consenso Avalanche garantiza que si algún validador honesto acepta una transacción,
todos los validadores honestos llegarán a la misma conclusión.

:::info

Para una gran visualización, echa un vistazo a [esta demostración](https://tedyin.com/archive/snow-bft-demo/#/snow).

:::

## Profundizando en el Consenso Avalanche

<iframe src="https://www.youtube.com/embed/ZUF9sIu-D_k"
        width="100%"
        height="480px"
        title="Profundización en el Protocolo Avalanche"
        className="video-container"
        display="initial"
        position="relative"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
</iframe>

### Intuición

Primero, desarrollemos algo de intuición sobre el protocolo. Imagina una habitación llena de personas tratando de
ponerse de acuerdo sobre qué comer para el almuerzo. Supongamos que es una elección binaria entre pizza y barbacoa. Algunas personas
podrían preferir inicialmente la pizza, mientras que otros prefieren inicialmente la barbacoa. En última instancia, sin embargo, el objetivo de todos es lograr **consenso**.

Todos le preguntan a un subconjunto aleatorio de personas en la habitación cuál es su preferencia de almuerzo. Si más de la mitad dice pizza, la persona piensa: "OK, parece que las cosas se inclinan hacia la pizza. Ahora prefiero la pizza". Es decir, adoptan la _preferencia_ de la mayoría. De manera similar, si la mayoría dice barbacoa, la persona adopta la barbacoa como su preferencia.

Todos repiten este proceso. En cada ronda, más y más personas tienen la misma preferencia. Esto se debe a que cuantas más personas prefieran una opción, más probable es que alguien reciba una respuesta mayoritaria y adopte esa opción como su preferencia. Después de suficientes rondas, alcanzan el consenso y deciden una opción, que todos prefieren.

### Bola de nieve

La intuición anterior describe el Algoritmo de Bola de Nieve, que es un bloque de construcción del consenso Avalanche. Veamos el algoritmo de Bola de Nieve.

#### Parámetros

- _n_: número de participantes
- _k_ (tamaño de la muestra): entre 1 y _n_
- α (tamaño del quórum): entre 1 y _k_
- β (umbral de decisión): &gt;= 1

#### Algoritmo

```text
preferencia := pizza
éxitosConsecutivos := 0
mientras no se haya decidido:
  preguntar a k personas aleatorias su preferencia
  si >= α dan la misma respuesta:
    preferencia := respuesta con >= α
    si preferencia == preferencia anterior:
      éxitosConsecutivos++
    sino:
      éxitosConsecutivos = 1
  sino:
    éxitosConsecutivos = 0
  si éxitosConsecutivos > β:
    decidir(preferencia)
```

#### Algoritmo explicado

Todos tienen una preferencia inicial por pizza o barbacoa. Hasta que alguien haya _decidido_, consultan
a _k_ personas (el tamaño de la muestra) y les preguntan qué prefieren. Si α o más personas dan la misma
respuesta, esa respuesta se adopta como la nueva preferencia. α se llama el _tamaño del quórum_. Si la nueva
preferencia es la misma que la preferencia anterior, el contador `éxitosConsecutivos` se incrementa. Si
la nueva preferencia es diferente a la preferencia anterior, el contador `éxitosConsecutivos` se establece en
`1`. Si ninguna respuesta obtiene un quórum (una mayoría α de la misma respuesta) entonces el
contador `éxitosConsecutivos` se establece en `0`.

Todos repiten esto hasta que obtienen un quórum para la misma respuesta β veces seguidas. Si una persona
decide pizza, entonces cada otra persona que siga el protocolo eventualmente también decidirá pizza.

Los cambios aleatorios en la preferencia, causados por el muestreo aleatorio, causan una preferencia de red por una opción,
lo que engendra más preferencia de red por esa opción hasta que se vuelve irreversible y luego los
nodos pueden decidir.

En nuestro ejemplo, hay una elección binaria entre pizza o barbacoa, pero la Bola de Nieve se puede adaptar para
lograr consenso sobre decisiones con muchas opciones posibles.

Los umbrales de liviandad y seguridad son parametrizables. A medida que el tamaño del quórum, α, aumenta, el umbral de seguridad aumenta y el umbral de liviandad disminuye. Esto significa que la red puede tolerar más nodos bizantinos (incorrectos deliberadamente, maliciosos) y seguir siendo segura, lo que significa que todos los nodos eventualmente estarán de acuerdo en si algo es aceptado o rechazado. El umbral de liviandad es el número de participantes maliciosos que se pueden tolerar antes de que el protocolo sea incapaz de progresar.

Estos valores, que son constantes, son bastante pequeños en la Red Avalanche. El tamaño de la muestra, _k_, es `20`. Entonces, cuando un nodo pregunta a un grupo de nodos su opinión, solo consulta a `20` nodos de toda la red. El tamaño del quórum, α, es `14`. Entonces, si `14` o más nodos dan la misma respuesta, esa respuesta se adopta como la preferencia del nodo que realiza la consulta. El umbral de decisión, β, es `20`. Un nodo decide su elección después de recibir `20` respuestas de quórum consecutivas (mayoría α).

Snowball es muy escalable a medida que aumenta el número de nodos en la red, _n_. Independientemente del número de participantes en la red, la cantidad de mensajes de consenso enviados sigue siendo la misma porque en una consulta dada, un nodo solo consulta a `20` nodos, incluso si hay miles de nodos en la red.

Todo lo discutido hasta este punto es cómo se describe Avalanche en el [libro blanco de Avalanche](https://assets-global.website-files.com/5d80307810123f5ffbb34d6e/6009805681b416f34dcae012_Avalanche%20Consensus%20Whitepaper.pdf). La implementación del protocolo de consenso Avalanche por parte de Ava Labs (específicamente en AvalancheGo) tiene algunas optimizaciones para latencia y rendimiento.

### Bloques

Un bloque es un componente fundamental que forma la estructura de una cadena de bloques. Sirve como un contenedor o estructura de datos que contiene una colección de transacciones u otra información relevante. Cada bloque está enlazado criptográficamente al bloque anterior, creando una cadena de bloques, de ahí el término "blockchain".

Además de almacenar una referencia de su bloque padre, un bloque contiene un conjunto de transacciones. Estas transacciones pueden representar varios tipos de información, como transacciones financieras, operaciones de contratos inteligentes o solicitudes de almacenamiento de datos.

Si un nodo recibe un voto por un bloque, también cuenta como un voto por todos los ancestros del bloque (su padre, el padre del padre, etc.).

### Finalidad

El consenso Avalanche es probabilísticamente seguro hasta un umbral de seguridad. Es decir, la probabilidad de que un nodo correcto acepte una transacción que otro nodo correcto rechaza puede hacerse arbitrariamente baja ajustando los parámetros del sistema. En el protocolo de consenso Nakamoto (como se usa en Bitcoin y Ethereum, por ejemplo), un bloque puede incluirse en la cadena pero luego ser eliminado y no terminar en la cadena canónica. Esto significa esperar una hora para la liquidación de transacciones. En Avalanche, la aceptación/rechazo es **final e irreversible** y solo lleva unos segundos.

### Optimizaciones

No es seguro que los nodos simplemente pregunten: "¿Prefieres este bloque?" cuando consultan a los validadores. En la implementación de Ava Labs, durante una consulta un nodo pregunta: "Dado que este bloque existe, ¿qué bloque prefieres?" En lugar de recibir un sí/no binario, el nodo recibe el bloque preferido del otro nodo.

Los nodos no solo consultan al enterarse de un nuevo bloque; consultan repetidamente a otros nodos hasta que no haya bloques en proceso.

Los nodos pueden no necesitar esperar hasta recibir todas las respuestas de consulta (_k_) antes de registrar el resultado de una votación. Si un bloque ya ha recibido votos _alpha_, entonces no es necesario esperar el resto de las respuestas.

### Validadores

Si fuera gratis convertirse en un validador en la red Avalanche, eso sería problemático porque un actor malicioso podría iniciar muchos, muchos nodos que serían consultados con mucha frecuencia. El actor malicioso podría hacer que el nodo actúe mal y cause una falla de seguridad o de vida. Los validadores, los nodos que se consultan como parte del consenso, tienen influencia sobre la red. Tienen que pagar por esa influencia con un valor del mundo real para evitar este tipo de manipulación de votos. Esta idea de usar un valor del mundo real para comprar influencia sobre la red se llama Prueba de Participación.

Para convertirse en un validador, un nodo debe **enlazar** (apostar) algo valioso (**AVAX**). Cuanto más AVAX enlace un nodo, más a menudo será consultado por otros nodos. Cuando un nodo muestrea la red, no es uniformemente aleatorio. Más bien, está ponderado por la cantidad de enlace. Los nodos tienen incentivos para ser validadores porque obtienen una recompensa si, mientras validan, son suficientemente correctos y receptivos.

Avalanche no tiene "slashing". Si un nodo no se comporta bien mientras valida, como dar respuestas incorrectas o tal vez no responder en absoluto, su enlace aún se devuelve en su totalidad, pero sin recompensa. Mientras una porción suficiente del AVAX enlazado sea sostenida por nodos correctos, entonces la red es segura y está viva para transacciones virtuosas.

### Ideas Principales

Dos ideas principales en Avalanche son el **submuestreo** y el **voto transitivo**.

El submuestreo tiene un bajo costo de mensajes. No importa si hay veinte validadores o dos mil validadores; la cantidad de mensajes de consenso que un nodo envía durante una consulta permanece constante.

El voto transitivo, donde un voto por un bloque es un voto por todos sus ancestros, ayuda con el rendimiento de las transacciones. Cada voto es en realidad muchos votos en uno.

### Cabos Suelto

Las transacciones son creadas por usuarios que llaman a una API en un nodo completo de AvalancheGo o las crean utilizando una biblioteca como AvalancheJS.

### Otras Observaciones

Las transacciones conflictivas no están garantizadas para estar vivas. Eso no es realmente un problema porque si quieres que tu transacción esté viva, entonces no deberías emitir una transacción conflictiva.

Snowman es el nombre de la implementación de Ava Labs del protocolo de consenso Avalanche para cadenas lineales.

Si no hay transacciones indecisas, el protocolo de consenso Avalanche se "aquiesce". Es decir, no hace nada si no hay trabajo por hacer. Esto hace que Avalanche sea más sostenible que la Prueba de Trabajo donde los nodos necesitan hacer constantemente trabajo.

Avalanche no tiene líder. Cualquier nodo puede proponer una transacción y cualquier nodo que tenga AVAX enlazado puede votar en cada transacción, lo que hace que la red sea más robusta y descentralizada.

## ¿Por qué nos importa?

Avalanche es un motor de consenso general. No importa qué tipo de aplicación se coloque encima de él. El protocolo permite el desacoplamiento de la capa de aplicación de la capa de consenso. Si estás construyendo una dapp en Avalanche, solo necesitas definir algunas cosas, como cómo se definen los conflictos y qué hay en una transacción. No necesitas preocuparte por cómo los nodos llegan a un acuerdo. El protocolo de consenso es una caja negra en la que pones algo y vuelve como aceptado o rechazado.

Avalanche se puede utilizar para todo tipo de aplicaciones, no solo redes de pago P2P. La Red Primaria de Avalanche tiene una instancia de la Máquina Virtual Ethereum, que es compatible con versiones anteriores de dapps y herramientas de desarrollo existentes de Ethereum. El protocolo de consenso de Ethereum ha sido reemplazado por el consenso Avalanche para permitir una latencia de bloque más baja y un mayor rendimiento.

Avalanche es muy eficiente. Puede procesar miles de transacciones por segundo con una latencia de aceptación de uno a dos segundos.

## Resumen

El consenso Avalanche es un avance radical en sistemas distribuidos. Representa un salto tan grande como los protocolos de consenso clásicos y Nakamoto que vinieron antes. Ahora que tienes una mejor comprensión de cómo funciona, echa un vistazo a otras documentaciones para construir dapps y instrumentos financieros revolucionarios en Avalanche.
