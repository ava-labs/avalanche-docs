---
etiquetas: [Nodos]
descripción: El inicio de un nodo es el proceso en el que un nodo *seguramente* descarga bloques de la cadena lineal para recrear el estado más reciente de la cadena localmente. El inicio de un nodo es un proceso de varios pasos que requiere descargar las cadenas requeridas por la Red Primaria (es decir, la C-Chain, P-Chain y X-Chain), así como las cadenas requeridas por cualquier Subred adicional que el nodo rastree explícitamente.
sidebar_label: "Inicio de un Nodo: Qué esperar"
pagination_label: Qué esperar durante el inicio de un nodo
sidebar_position: 0
---

# Inicio de un Nodo

El inicio de un nodo es el proceso en el que un nodo *seguramente* descarga bloques de la cadena lineal para recrear el estado más reciente de la cadena localmente.

El inicio debe garantizar que el estado local de un nodo esté sincronizado con el estado de otros nodos válidos. Una vez que se completa el inicio, un nodo tiene el estado más reciente de la cadena y puede verificar nuevas transacciones entrantes y alcanzar consenso con otros nodos, moviendo colectivamente hacia adelante las cadenas.

El inicio de un nodo es un proceso de varios pasos que requiere descargar las cadenas requeridas por la Red Primaria (es decir, la C-Chain, P-Chain y X-Chain), así como las cadenas requeridas por cualquier Subred adicional que el nodo rastree explícitamente.

Este documento cubre los detalles técnicos de alto nivel de cómo funciona el inicio de un nodo. Este documento pasa por alto algunos detalles específicos, pero el código base de
[AvalancheGo](https://github.com/ava-labs/avalanchego) es de código abierto
y está disponible para lectores curiosos que deseen aprender más.

## Validadores y dónde encontrarlos

El inicio de un nodo se trata de descargar todos los contenedores aceptados previamente
*seguramente* para que un nodo pueda tener el estado correcto más reciente de la cadena. Un nodo
no puede confiar arbitrariamente en cualquier fuente, ya que un actor malintencionado podría proporcionar bloques maliciosos, corrompiendo el estado local del nodo de inicio y haciéndolo
imposible para el nodo validar correctamente la red y alcanzar consenso
con otros nodos correctos.

¿Cuál es la fuente de información más confiable en el ecosistema Avalanche? Es
una mayoría *suficientemente grande* de validadores. Por lo tanto, el primer paso de
inicio es encontrar una cantidad suficiente de validadores para descargar
contenedores de ellos.

La P-Chain es responsable de todas las operaciones a nivel de plataforma, incluidos los eventos de participación
que modifican el conjunto de validadores de una Subred. Cada vez que cualquier cadena (excepto la
P-Chain en sí misma) se inicia, solicita un conjunto de validadores actualizado para esa
Subred (la Red Primaria es una Subred también). Una vez que se conoce el conjunto de validadores
actual de la Subred, el nodo puede descargar contenedores de estos validadores de manera segura para
iniciar la cadena.

Aquí hay un detalle importante: el conjunto de validadores debe estar *actualizado*. Si un
el conjunto de validadores de un nodo de inicio está desactualizado, el nodo puede creer incorrectamente
que algunos nodos todavía son validadores cuando su período de validación ya ha
expirado. Un nodo podría terminar sin saberlo solicitando bloques de no validadores
que responden con bloques maliciosos que no son seguros para descargar.

**Por esta razón, cada nodo Avalanche debe iniciar completamente la P-chain primero
antes de pasar a las otras cadenas de la Red Primaria y otras Subredes para
garantizar que sus conjuntos de validadores estén actualizados**.

¿Y qué pasa con la P-chain? La P-chain no puede tener nunca un conjunto de validadores actualizado
antes de completar su inicio. Para resolver esta situación de huevo y gallina, la
Fundación Avalanche mantiene un conjunto predeterminado de validadores confiables llamados
beacons (pero los usuarios son libres de configurar los suyos propios). Los ID de nodo y las direcciones IP de los Beacons se enumeran en el [código base de AvalancheGo](https://github.com/ava-labs/avalanchego/blob/master/genesis/bootstrappers.json).
Cada nodo tiene la lista de beacons disponible desde el principio y puede comunicarse con ellos
tan pronto como se inicia.

Los validadores son las únicas fuentes de verdad para una blockchain. La disponibilidad de validadores es tan clave para el proceso de inicio que **el inicio está bloqueado hasta que el nodo establece una cantidad suficiente de conexiones seguras a validadores**. Si el nodo no logra alcanzar una cantidad suficiente dentro de un
período de tiempo dado, se apaga ya que no se puede llevar a cabo ninguna operación de manera segura.

## Iniciando la Blockchain

Una vez que un nodo es capaz de descubrir y conectarse a nodos validadores y beacons, está
capaz de comenzar a iniciar la blockchain descargando los contenedores individuales.

Un error común es que las blockchains Avalanche se inician recuperando contenedores a partir de génesis y trabajando hasta la
frontera aceptada actualmente.

En cambio, los contenedores se descargan desde la frontera aceptada hacia abajo hasta
génesis, y luego sus transiciones de estado correspondientes se ejecutan hacia arriba
desde génesis hasta la frontera aceptada. La frontera aceptada es el último
bloque aceptado para cadenas lineales.

¿Por qué los nodos no pueden simplemente descargar bloques en orden cronológico, comenzando desde
génesis hacia arriba? La razón es la eficiencia: si los nodos descargaran contenedores
hacia arriba, solo obtendrían una garantía de seguridad al consultar a una mayoría de
validadores para cada contenedor individual. Eso es mucho tráfico de red para un
solo contenedor, y un nodo aún tendría que hacer eso por cada contenedor en
la cadena.

En cambio, si un nodo comienza recuperando de manera segura la frontera aceptada de un
mayoría de nodos honestos y luego recupera de manera recursiva los contenedores padres desde
la frontera aceptada hasta génesis, puede verificar de manera económica que los contenedores sean
correctos simplemente verificando sus ID. Cada contenedor Avalanche tiene los ID de sus
padres (un padre de bloque para cadenas lineales)
y la integridad de un ID se puede garantizar criptográficamente.

Profundicemos en las dos fases de inicio: recuperación de la frontera y
ejecución de contenedores.

### Recuperación de la Frontera

La frontera actual se recupera solicitándola a nodos validadores o beacons. El inicio de Avalanche está diseñado para ser robusto, debe ser capaz de progresar incluso en presencia de validadores lentos o fallas de red. Este
proceso debe ser tolerante a fallas de este tipo, ya que
el inicio puede llevar bastante tiempo en completarse y las conexiones de red pueden
ser poco confiables.

El inicio comienza cuando un nodo se ha conectado a una mayoría suficiente de participación de validadores. Un nodo es capaz de comenzar el inicio cuando se ha conectado al menos al
$75\%$ de la participación total de validadores.

Los seeders son el primer conjunto de pares a los que un nodo se acerca cuando intenta
descubrir la frontera actual. Un subconjunto de seeders se muestrea al azar desde
el conjunto de validadores. Los seeders pueden ser lentos y proporcionar una frontera obsoleta, ser
maliciosos y devolver ID de contenedores maliciosos, pero siempre proporcionan un conjunto inicial
de fronteras candidatas con las que trabajar.

Una vez que un nodo ha recibido las fronteras candidatas de sus seeders, consulta a
**cada validador de la red** para evaluar las fronteras candidatas. Envía la lista
de fronteras candidatas que recibió de los seeders a cada validador, preguntando
si conocen o no estas fronteras. Cada validador responde
devolviendo el subconjunto de candidatos conocidos, independientemente de lo actualizados o obsoletos que sean los contenedores. Cada validador devuelve contenedores independientemente de su edad
para que el inicio funcione incluso en presencia de una frontera obsoleta.

La recuperación de la frontera se completa cuando al menos una de las fronteras candidatas es
soportada por al menos $50\%$ de la participación total de validadores. Pueden ser soportadas múltiples fronteras candidatas por una mayoría de participación, después de lo cual comienza la siguiente
fase, la obtención de contenedores.

En cualquier momento de estos pasos puede ocurrir un problema de red, impidiendo que un nodo
recupere o valide las fronteras. Si esto ocurre, el inicio se reinicia
muestreando un nuevo conjunto de seeders y repitiendo el proceso de inicio,
asumiendo optimistamente que el problema de red desaparecerá.

### Ejecución de Contenedores

Una vez que un nodo tiene al menos una frontera válida, comienza a descargar contenedores padres para cada frontera. Si es la primera vez que se ejecuta el nodo, no sabrá nada sobre ningún contenedor y tratará de obtener todos los contenedores padres de manera recursiva desde la frontera aceptada hasta génesis (a menos que [sincron

La cadena P siempre es la primera en arrancar antes que cualquier otra cadena. Una vez que la cadena P ha terminado, todas las demás cadenas comienzan a arrancar en paralelo, conectándose a sus propios validadores de manera independiente.

Un nodo completa el arranque de una Subred una vez que todas sus cadenas correspondientes han completado el arranque. Debido a que la Red Primaria es un caso especial de Subred que incluye toda la red, esto también se aplica a ella, así como a cualquier otra Subred rastreada manualmente.

Tenga en cuenta que el arranque de las Subredes es independiente entre sí, por lo que incluso si una Subred ha arrancado y está validando nuevas transacciones y agregando nuevos contenedores, otras Subredes aún pueden estar arrancando en paralelo.

Sin embargo, dentro de una sola Subred, una Subred no ha terminado de arrancar hasta que la última cadena completa el arranque. Es posible que una sola cadena bloquee efectivamente a un nodo para que termine el arranque de una sola Subred, si tiene un historial lo suficientemente largo o cada operación es compleja y lleva tiempo. Peor aún, los validadores de otras Subredes están aceptando continuamente nuevas transacciones y agregando nuevos contenedores sobre la frontera previamente conocida, por lo que un nodo que se arranca lentamente puede quedarse continuamente atrás del resto de la red.

Los nodos mitigan esto reiniciando el arranque para cualquier cadena que esté bloqueada esperando a que las cadenas restantes de la Subred terminen de arrancar. Estas cadenas repiten las fases de recuperación de frontera y descarga de contenedores para mantenerse actualizadas con la frontera actual en constante movimiento de la Subred hasta que la cadena más lenta haya completado el arranque.

Una vez que esto está completo, un nodo finalmente está listo para validar la red.

## Sincronización de Estado

El proceso de arranque de un nodo completo es largo y se vuelve cada vez más largo con el tiempo a medida que se aceptan más y más contenedores. Los nodos necesitan arrancar una cadena reconstruyendo el estado completo de la cadena localmente, pero descargar y ejecutar cada contenedor no es la única forma de hacerlo.

A partir de la versión [AvalancheGo 1.7.11](https://github.com/ava-labs/avalanchego/releases/tag/v1.7.11), los nodos pueden usar la sincronización de estado para reducir drásticamente el tiempo de arranque en la C-Chain. En lugar de ejecutar cada bloque, la sincronización de estado utiliza técnicas criptográficas para descargar y verificar solo el estado asociado con la frontera actual. Los nodos sincronizados con el estado no pueden servir cada bloque de la C-chain aceptado históricamente, pero pueden recuperar de manera segura el estado completo de la C-chain necesario para validar en un tiempo mucho más corto. La sincronización de estado buscará los 256 bloques anteriores para admitir el código de operación de hash del bloque anterior.

Actualmente, la sincronización de estado solo está disponible para la C-chain. La P-chain y la X-chain actualmente se arrancan descargando todos los bloques. Tenga en cuenta que, independientemente del método de arranque utilizado (incluida la sincronización de estado), cada cadena aún está bloqueada en todas las demás cadenas de su Subred que completan su arranque antes de continuar con la operación normal.

:::nota

No hay configuraciones para sincronizar el estado de un nodo de archivo. Si necesita todo el estado histórico, no debe usar la sincronización de estado y configurar la configuración del nodo para un nodo de archivo.

:::

## Conclusiones y Preguntas Frecuentes

Si has llegado hasta aquí, espero que hayas tenido una mejor idea de lo que está sucediendo cuando tu nodo se arranca. Aquí tienes algunas preguntas frecuentes sobre el arranque.

### ¿Cómo puedo obtener la ETA para el arranque del nodo?

Los registros proporcionan información sobre la descarga de contenedores y su ejecución para cada cadena. Aquí tienes un ejemplo:

```text
[02-16|17:31:42.950] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 5000, "numTotalBlocks": 101357, "eta": "2m52s"}
[02-16|17:31:58.110] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 10000, "numTotalBlocks": 101357, "eta": "3m40s"}
[02-16|17:32:04.554] INFO <P Chain> bootstrap/bootstrapper.go:494 fetching blocks {"numFetchedBlocks": 15000, "numTotalBlocks": 101357, "eta": "2m56s"}
...
[02-16|17:36:52.404] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 17881, "numToExecute": 101357, "eta": "2m20s"}
[02-16|17:37:22.467] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 35009, "numToExecute": 101357, "eta": "1m54s"}
[02-16|17:37:52.468] INFO <P Chain> queue/jobs.go:203 executing operations {"numExecuted": 52713, "numToExecute": 101357, "eta": "1m23s"}
```

Registros similares se emiten para las cadenas X y C y cualquier cadena en Subredes explícitamente rastreadas.

### ¿Por qué la ETA de arranque de la cadena sigue cambiando?

Como viste en la sección de [finalización del arranque](#cuando-termina-el-arranque), una Subred como la Red Primaria completa una vez que todas sus cadenas terminan de arrancar. Algunas cadenas de la Subred pueden tener que esperar a que termine la más lenta. Reiniciarán el arranque mientras tanto, para asegurarse de no quedarse demasiado atrás con respecto a la frontera aceptada por la red.

### ¿Por qué se desactivan las API de AvalancheGo durante el arranque?

Las API de AvalancheGo se desactivan [explícitamente](https://github.com/ava-labs/avalanchego/blob/master/api/server/server.go#L367:L379) durante el arranque. La razón es que si el nodo no ha reconstruido completamente el estado de sus Subredes, no puede proporcionar información precisa. Las API de AvalancheGo se activan una vez que el arranque se completa y el nodo pasa a su modo de operación normal, aceptando y validando transacciones.