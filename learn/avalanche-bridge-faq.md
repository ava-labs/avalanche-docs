# Avalanche Puente \(AB\) FAQ

## Avalanche Puente \(AB\) FAQ

El puente de Avalanche \(AB\) se puede utilizar para transferir tokens ERC20 de Ethereum a la cadena C de Avalanche y viceversa. Este documento responde a preguntas comunes sobre el puente. Si este documento y otra documentación no responden a su pregunta, puede ponerse en contacto con nosotros en [el sitio web de soporte de](https://support.avax.network) Avalanche, [Discord](https://chat.avalabs.org) o [Telegram.](https://t.me/avalancheavax)

### Transacciones

#### ¿Qué puedo hacer si mi transacción parece atascada?

Si la transacción Ethereum transfiriendo fondos sobre el puente a Avalanche parece atascada y no tiene ninguna confirmación, puede acelerar la transacción como se describe [aquí](avalanche-bridge-faq.md#speed-up-transaction). Si la transacción Ethereum ya ha recibido 35 confirmaciones, pero el temporizador de transacción Avalanche parece estar atascado, compruebe su saldo de cartera Metamask en la red Avalanche. Podría ser que la transacción ya se procesó pero simplemente no aparece en la interfaz de usuario. Tenga en cuenta que esto puede ocurrir si optó por "acelerar" su transacción.

Es posible, pero muy poco probable, que la transacción Ethereum emitida por el puente al transferir fondos a Ethereum tarda mucho tiempo en recibir 35 confirmaciones. Esto puede ocurrir si hay una súbita subida significativa en los precios del gas Ethereum. Si la transacción no se incluye dentro de 200 bloques de fecha en que se emitió en Ethereum, podrá expedirse una nueva transacción con un precio más alto de gas para "despegar" la transferencia.

#### ¿Y si el precio del gas es más que la cantidad que estoy transferiendo?

Al mover activos ERC20 de Ethereum a Avalanche, se le permite transferir cualquier número de fichas que usted desee. El puente fue diseñado de tal manera que minimizara los honorarios de transacción. Sin embargo, si la tarifa de transacción es mayor que el valor que está buscando transferir, puede tener sentido esperar hasta que el precio del gas Ethereum disminuya.

Al mover activos de Avalanche de vuelta a Ethereum, el puente cobra una tasa de transferencia en especie, como se describe [aquí](avalanche-bridge-faq.md#fees). La interfaz de usuario permite ahora transferencias menos de la cantidad de honorarios. Si un usuario genera manualmente y emite tal transacción, el puente marcará la transferencia como inválida y no la procesará.

#### ¿Puedo enviar fichas creadas en Avalanche a Ethereum?

No todavía. Actualmente el AB solo admite la transferencia de tokens ERC20 crear en Ethereum a Avalanche y espalda. Hay planes para permitir esto en el futuro.

#### ¿Puedo enviar ETH o BTC a través del puente?

El AB no admite actualmente ETH nativo o BTC. Sin embargo, puede transferir la versión envuelta de estos activos \(WETH y WBTC\) a través del puente.

#### ¿Y si mi transacción no es visible en el explorador?

Las transacciones que corresponden a transferencias de puente aparecen en exploradores para las redes de Avalanche y Ethereum. Puede tomar unos minutos para que aparezcan las transacciones. Para buscar su transacción en el explorador, copie y pegue su dirección en el [Explorador de Cadena](https://cchain.explorer.avax.network/) C-o [Etherscan](https://etherscan.io/). Para ver las transacciones enviadas por el puente mismo, puedes buscar [aquí](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) a Avalanche y [aquí](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) a Ethereum. Si todavía no ve su transacción, contacta con [Telegram](https://t.me/avalancheavax) o [Discord](https://chat.avax.network/).

#### ¿Hay tutoriales sobre cómo usar el puente?

Sí, puede ver tutoriales de vídeo para la funcionalidad de puente [aquí](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### ¿Puedo enviar a una dirección diferente en la otra red?

El puente solo permite transferencias a la misma dirección en la otra red. Después de que el activo se transfiera a la otra red, se puede enviar a cualquier dirección o contrato.

#### ¿Puedo acelerar mi transacción?<a id="speed-up-transaction"></a>

Sí, puede hacer clic en el botón “Acelerar el aceleramiento” en Metamask. “Acelerar” una transacción a través de Metamask emite una nueva transacción en Ethereum que tiene un precio de gas más alto que la transacción que fue enviada inicialmente. Dado que la nueva transacción tiene un precio más alto, es más probable que se incluya en un bloque. Solo una de las transacciones \(el original y el "sped up"\) será aceptada. Acelerar una transacción que transfiere fondos al puente es seguro. Sin embargo, la interfaz de usuario no estará al tanto de la nueva transacción, lo que significa que puede no ver las confirmaciones en la interfaz de usuario. Una vez que la nueva transacción tenga 35 confirmaciones en Ethereum, revise su cartera de Metamask en Avalanche para ver los fondos envueltos.

#### ¿Por qué el número de fichas mostradas en Metamask no coincide con el número que specified?

Al transferir de Avalanche a Ethereum, Metamask muestra que 0 fichas deben ser transferidas, no el número real de tokens. Este es un problema conocido con Metamask.

#### ¿Cuáles son los vestidos del contrato del puente?

Direcciones del puente:
* Ethereum: [`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche: [`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Tenga en cuenta que **no debe transferir directamente tokens a estas direcciones**. Debe utilizar la interfaz de usuario del puente, que comprueba las transacciones malformadas.

### Honorarios

#### ¿Cómo funcionan las tarifas en el puente Avalanche?

El puente cobra tasas de transferencia para cubrir el costo de las tasas de transacción en las redes de Avalanche y Ethereum. Estas tasas se cobran en especie con el activo ERC20 que se transfiere. Es decir, cuando transfiere una token, una parte del saldo transferido es tomada por el AB como una tarifa.

La tarifa es un porcentaje de la cuota estimada de transacción de Ethereum, más una cantidad constante \(actualmente $5\) para tener en cuenta la volatilidad de los precios.

Por un tiempo limitado, este porcentaje es cero para alentar a los usuarios a transferir activos. Además, las transferencias a Avalanche pueden calificar para una gota de aire AVAX como se describe [aquí](avalanche-bridge-faq.md#airdrop).

#### ¿Cómo se estima el gas? ¿Cómo obtiene el puente los precios de token?

El puente utiliza los canales de precio de Chainlink para obtener información sobre el precio del gas para la red Ethereum. El precio del gas utilizado es el más alto del valor de Chainlink FASTGAS y la aproximación del precio del gas Geth. El precio del gas es acolchado por unos pocos GWEI para asegurar que las transacciones enviadas por el puente se incluyan rápidamente en un bloque Ethereum.

El puente también utiliza los alimentos de precio de Chainlink para determinar los precios de token utilizados para calcular la cantidad de una muestra equivalente a la cuota del puente.

#### ¿Hay una gota de aire?<a id="airdrop"></a>

Los usuarios serán lanzados 0.1 AVAX cuando transfieran más de $75 \(sujeto a cambios\) de una muestra de Ethereum a Avalanche.

#### ¿Y si no recibí mi disipación?

Si no ha recibido su disipación, por favor confirme que el importe de transferencia cumplía el importe mínimo requerido.

### Seguridad

#### ¿No tiene confianza el puente Avalanche?

El puente de Avalanche es inconfiable en el sentido de que ninguna parte puede acceder a ninguno de los fondos mantenidos como activos de garantía o envueltos a la menta. Todas las transferencias a través del puente deben ser aprobadas por 3 de 4 partes independientes \(llamadas wardens\). En este sentido, el uso del puente no requiere confianza en ninguna parte para transferir sus fondos.

#### ¿Cuál es el papel de los guardianes?

El papel de los guardias es cuatro veces:

1. Almacenar Acciones Secretas
2. Bloqueadores compatibles de Indización
3. Transacciones Procesadas De Seguimiento
4. Hosting de información pública

En un próximo artículo de diseño técnico de Avalanche Bridge Tech Design se proporcionará una completa distribución del papel y las responsabilidades de un alcaide.

#### ¿Cuál es la relación entre Ava Labs y los Armarios?

Los guardias son socios de confianza de la Fundación Avalanche. Tienen un registro de excelencia técnica y trabajan con Avalanche.

#### ¿Ha sido auditado el código? ¿Dónde están los informes de auditoría?

Sí, el código del puente, el director y los contratos inteligentes han sido auditados por Halborn. Los informes de auditoría se encuentran [aquí](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

### Tokens

#### ¿Qué tipo de fichas se pueden transferir a través del puente?

Solo las fichas ERC20 pueden ser transferidas a través del puente.

#### ¿Cómo puedo añadir una muestra al puente?

Mira [aquí](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### ¿Cómo puedo añadir una muestra utilizada en el puente a Metamask?

Ve [aquí](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) para un tutorial.

#### ¿Cómo puedo conseguir WETH de ETH?

Puede utilizar la función SWAP de Metamask’s para intercambiar de ETH a WETH. Alternativamente, también puede utilizar un AMM como [Uniswap](https://app.uniswap.org/#/) en Ethereum.

#### ¿Por qué hay dos tipos de la misma señal? ¿Cómo puedo decir cuál deriva del puente Avalanche?

El puente Avalanche de generación actual \(AB\) al que se refiere este documento está predated por una implementación anterior del puente llamada AEB. El puente AEB y el puente AB tienen cada uno sus propios conjuntos de token únicos. Las fichas de AEB han sido desmentidas a favor de las fichas AB. Los tokens AB tienen un sufijo `.e`. Mientras que el nombre y símbolo de una token son buenas referencias para diferenciar los dos, la única forma de verificar una muestra es la dirección del contrato. Las direcciones de contrato de AB token se encuentran [aquí.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### ¿Por qué no aparece automáticamente el token recién bridged en mi billetera?

Las fichas no están sostenidas por su dirección de cadena C, sino más bien en el contrato inteligente del token. Tienes que decirle a tu cartera (es decir, Metamask) qué contratos inteligentes para comprobar si hay saldos mantenidos por tus direcciones.

### Cadenas apoyadas

#### ¿Qué cadenas son apoyadas por el puente Avalanche?

El puente de Avalanche actualmente solo admite la transferencia de Ethereum ERC20 a la cadena C de Avalanche y viceversa. Hay planes para apoyar la transferencia de ERC20 creada en la cadena Avalanche También hay planes de apoyar redes distintas de Avalanche y Ethereum.

### AEB \(puente depreciado\)

El puente Avalanche de generación actual \(AB\) al que se refiere este documento está predated por una implementación anterior del puente llamada AEB. Esta sección trata de preguntas sobre la implementación anterior del puente \(AEB\).

#### ¿Cuándo deja de funcionar el AEB?

El AEB se desactivó y las transferencias a través de él ya no son posibles. Los fondos mantenidos en el lado Ethereum del AEB se han trasladado al nuevo puente Avalanche \(AB\). Las conversiones de Token se han activado en la cadena Avalanche permitiendo a los usuarios convertir sus fichas AEB en una base 1-1 para su equivalente en el puente Avalanche. Esta conversión puede realizarse en [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Las líneas de tiempo de soporte de token AEB se dejarán hasta los proyectos DApp individuales.

#### ¿Puedo transferir mis fichas AEB a Ethereum?

Para mover sus fichas AEB a Ethereum, primero debe convertirlas en fichas AB como se describe en la pregunta anterior. Una vez convertido, puedes usar el nuevo puente Avalanche para mover las fichas AB de vuelta a Ethereum.

#### ¿Cómo convertir mis tokens AEB \(puente depreciado\) a Avalanche Bridge \(AB\) tokens?

Puede convertir sus fichas AEB a fichas AB utilizando la [interfaz de usuario AB](http://bridge.avax.network/convert). Además, muchos proyectos de ecosistemas como Pangolin están trabajando para facilitar a los usuarios convertir sus fichas e introducir nuevos conjuntos de liquidez.

### Diseño/Técnico

#### ¿Es seguro el uso de tx.origin en los contratos BridgeToken?

Mientras que el uso de tx.origin para verificar la autorización dentro de contratos inteligentes plantea riesgos potenciales de seguridad, nuestro caso de uso no lo hace. En los contratos de puente, tx.origin solo se utiliza para disallow que los contratos inteligentes llamen directamente a la función contracts, ya que el puente actualmente solo admite la transferencia de cuentas de propiedad externa. Es seguro hacer esto comparando el valor tx.origin con el valor tx.origin

#### ¿Puede una sola tecla privada de tinta?

Ninguna de las partes tiene acceso a la dirección del enclave SGX. Solo el enclave puede construir/firmar una transacción utilizando esa clave cuando recibe aprobaciones de 3 de 4 guardias. En este sentido, el enclave aquí está funcionando como un contrato inteligente de cadena cruzada.

#### ¿Por qué el puente no tiene fondos en un contrato inteligente?

No utilizar un contrato inteligente simplifica los requisitos de transferencia de extremo a extremo, lo que resulta en tasas de gas más bajas y transferencias más rápidas.

#### ¿Dónde puedo encontrar más información sobre el diseño?

Ver [Puente Avalanche: Traslados De Activos De Cadena Transversal Seguro Utilizando Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Varios

#### En la página de Prueba de Activos, ¿por qué no la cantidad de un activo en Ethereum y Avalanche?

Es posible que el puente sea over-collateralized \(es decir, tener más de un activo ERC20 en Ethereum de lo que existe en Avalanche\) por tres razones. Todos estos son esperados.

1. Hay nuevas transferencias de Ethereum a Avalanche. El puente solo procesa transferencias una vez que la transacción Ethereum reciba 35 confirmaciones. Antes de entonces, el saldo de garantía será más que el suministro de activos envueltos.
2. Las garantías reales AEB se han transferido al nuevo puente AB, pero no todas las fichas AEB se han convertido a fichas AB en Avalanche todavía.
3. Las tarifas de puente se han acumulado en el lado Ethereum. El enclave no recoge inmediatamente las tarifas generadas por el puente. En cambio, mantiene todas las tarifas recogidas de cada activo en la cartera de puente hasta que se cumpla un umbral configurado. En ese punto, las tarifas se envían a una cartera separada.

#### ¿Dónde puedo comprar AVAX?

Dependiendo de su ubicación, puede ser capaz de comprar AVAX en un intercambio centralizado. También puede comprar AVAX en intercambios descentralizados como [Pangolin](https://app.pangolin.exchange/).

#### ¿Cómo puedo contactar a alguien para recibir apoyo?

El soporte está disponible utilizando el chat en [support.avax.network](https://support.avax.network), o en nuestro servidor [de](https://chat.avax.network/) Discordia.

#### ¿Qué significa el sufijo .e en el nombre de la muestra?

El sufijo `.e` denota que el activo se desplazó a través del puente desde Ethereum.

#### ¿Cómo configuro Metamask en Avalanche?

Para configurar su cartera de Metamask y conectarlo a la red de Avalanche, vea [aquí](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

## Ecosistema

### ¿Cómo agrego mi proyecto al directorio de ecosistemas?

Para que su proyecto se añada al directorio de ecosistemas, por favor envíe un correo electrónico a `ecosystem@avalabs.org`. Por favor, incluyen:

* su nombre de proyecto
* una breve descripción de sus servicios
* una versión 88h x 88w .svg del logotipo de su proyecto

   Un miembro del equipo de Avalanche se pondrá en contacto con usted para confirmar la adición de su proyecto.

#### ¿Cómo puedo conseguir una pancarta promovida en la página Ecosistema?

Para que su proyecto se incluya en la sección promocional del carrusel de la página Ecosistema de Avalanche, por favor envíe una solicitud a `ecosystem@avalabs.org`. Por favor incluya una breve descripción de su proyecto y los detalles promocionales. Un miembro del equipo de apoyo de Ava Labs responderá a usted dentro de 2 días hábiles.

Las especificaciones para el banner son las siguientes:

* Desktop and Landscape: 1155px \* 440px
* Retrato y móvil: 720px \* 337px
* Elementos de diseño en medio de la bandera o se cortarán
* Utilice el color sólido como BG o tiene gradiente que se desvanece en \#000 \(edited\)
