# Preguntas más frecuentes

## Preguntas más frecuentes

El puente de Avalanche \(AB\) puede ser utilizado para transferir tokens de ERC20 desde Ethereum a la C-Chain de Avalanche y viceversa. Este documento responde a preguntas comunes sobre el puente. Si este documento y otra documentación no respondan a tu pregunta, puedes contactarnos en [el sitio web de soporte de](https://support.avax.network) Avalanche, [Discord](https://chat.avalabs.org) o [Telegram.](https://t.me/avalancheavax)

### Notas importantes

1. Hay un error en la aplicación móvil de Metamask que afecta las transacciones de puente **\(solo en **móviles\). Hasta que esto se resuelva, no usas la aplicación móvil de Metamask para las transferencias de puente. Usa la aplicación de escritorio o, si en la billetera de Coinbase.
2. Necesitas AVAX para pagar por las tarifas de transacción en Avalanche.** Deberías usar la AVAX que recibes en el airdop para hacer un intercambio por más AVAX en un AMM para que puedas pagar por las tarifas de transacción.** Si se te queda sin AVAX, no podrás hacer transacciones en Avalanche.

### Transacciones

#### ¿Qué puedo hacer si mi transacción parece atascado?

Si la transacción Ethereum que transfiere fondos sobre el puente a Avalanche parece atascada y no tiene confirmaciones, puedes acelerar la transacción como se describe [aquí](avalanche-bridge-faq.md#speed-up-transaction). Si la transacción Ethereum ya ha recibido 35 confirmaciones, pero el temporizador de transacciones de Avalanche parece estar atascado, comprueba tu saldo de billetera de Metamask en la red de Avalanche. Podría ser que la transacción ya fue procesada pero simplemente no aparece en la interfaz de usuario. Tenga en cuenta que esto puede ocurrir si optas por "acelerar" tu transacción.

Es posible, pero muy poco probable, que la transacción de Ethereum emitida por el puente al transferir fondos a Ethereum tarda un largo tiempo para recibir 35 confirmaciones. Esto puede ocurrir si hay un aumento repentino significativo en los precios de gas de Ethereum. Si la transacción no está incluida dentro de 200 bloques de cuando se emitió en Ethereum, se puede emitir una nueva transacción con un precio de gas más alto para "no pegar" la transferencia.

#### ¿Cuánto tiempo toma una transferencia de puente?

La transacción de Ethereum debería tomar 10 - 15 minutos. La transacción de Avalance toma unos segundos.

#### ¿Por qué la transacción de Avalanche parte del puente toma tanto tiempo?

Solo toma unos segundos. Si la interfaz de puente lo muestra tomara más tiempo, es solo un problema con la interfaz. Tus activos han sido transferidos después de unos segundos. Consulta tu billetera y el explorador de C-Chain

#### ¿Qué pasa si el precio de gas es más que la cantidad que estoy transferiendo?

Al mover activos de ERC20 de Ethereum a Avalanche, te permite transferir cualquier número de tokens que te guste. El puente fue diseñado de tal manera que minimiza las tarifas de transacción. Sin embargo, si la tarifa de transacción es mayor que el valor que estás buscando transferir, puede tener sentido esperar hasta que el precio de gas Ethereum disminuya.

Cuando mueve activos de Avalanche de vuelta a Ethereum, el puente carga una tasa de transferencia en especie, como se describe [aquí](avalanche-bridge-faq.md#fees). La interfaz de usuario permite transferencias menos que la cantidad de honorarios. Si un usuario genera manualmente y emite una transacción de esa índole, el puente marcará la transferencia como inválida y no la procesa.

#### ¿Puedo enviar tokens creados en Avalanche a Ethereum?

Aún Actualmente la AB solo admite la transferencia de tokens de ERC20 crear en Ethereum a Avalanche y de espalda. Hay planes para permitir esto en el futuro.

#### ¿Puedo enviar ETH o BTC a través del puente?

La AB no admite actualmente ETH nativo o BTC. Sin embargo, puedes transferir la versión envuelta de estos activos \(WETH y WBTC\) a través del puente.

#### ¿Qué pasa si mi transacción no es visible en el explorador?

Las transacciones que corresponden a las transferencias de puente aparecerán en exploradores para las redes de Avalanche y Ethereum. Puede tomar unos minutos para que aparezcan las transacciones. Para buscar tu transacción en el explorador, copie y pega tu dirección en el [Explorador de C-Chain de](https://cchain.explorer.avax.network/) Avalanche o [Etherscan](https://etherscan.io/). Para ver las transacciones enviadas por el propio puente, puedes buscar [aquí](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) Avalanche y [aquí](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0) para Ethereum. Si todavía no ves tu transacción, contacta con [Telegram](https://t.me/avalancheavax) o [Discord](https://chat.avax.network/).

#### ¿Hay tutoriales sobre cómo usar el puente?

Sí, puedes ver tutoriales de vídeo para la funcionalidad de puente [aquí](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### ¿Cómo pago por las tarifas de transacción en Avalanche?

En Avalanche, las tarifas de transacción se pagan en el activo nativo, AVAX. Para enviar transacciones en la C-Chain, debes tener suficiente AVAX en tu billetera para cubrir el costo del gas para la transacción. Para ayudarte a empezar en Avalanche, el puente te transmitirá una pequeña cantidad de AVAX si mueves más de 75 $ \(sujeto a cambios\) valen de tokens de Ethereum. Para evitar que se quede sin AVAX para cubrir tus tasas de transacción, recomendamos primero comprar una cantidad adecuada de AVAX. Puedes hacerlo en [Pangolin](https://app.pangolin.exchange/).

#### ¿Puedo enviar a una dirección diferente en la otra red?

El puente solo permite transferencias a la misma dirección en la otra red. Después de que el activo sea transferido a la otra red, puede ser enviado a cualquier dirección o contrato.

#### ¿Puedo acelerar mi transacción?<a id="speed-up-transaction"></a>

Sí, puedes hacer clic en el botón “Acelerar Up” de Metamask. “Acelerar” una transacción a través de Metamask emite una nueva transacción en Ethereum que tiene un precio de gas más alto que la transacción que originalmente fue enviada. Dado que la nueva transacción tiene un precio de gas más alto, es más probable que se incluya en un bloque. Solo una de las transacciones \(el original y la "sped up"\) será aceptada. Acelerar una transacción que está transfiriendo fondos al puente es seguro. Sin embargo, la interfaz de usuario no estará al tanto de la nueva transacción, lo que significa que puede no ver las confirmaciones en la interfaz de usuario. Una vez que la nueva transacción tenga 35 confirmaciones en Ethereum, comprueba tu billetera de Metamask en Avalanche para ver los fondos envueltos.

#### ¿Por qué el número de tokens mostrados en Metamask no coincide con el número que specified?

Cuando se transfiere de Avalanche a Ethereum, Metamask muestra que 0 tokens se transferirán no el número real de tokens. Este es un problema conocido con Metamask.

#### ¿Cuál es la dirección del puente en Ethereum y Avalanche?

direcciones de puente:

* Ethereum:[`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche:[`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

**Tenga en cuenta que no deberías transferir directamente tokens a estas **direcciones. Deberías usar la interfaz de usuario del puente, que comprueba las transacciones malformadas.

### Tarifas

#### ¿Cómo funcionan las tarifas en el puente de Avalanche?

El puente carga las tasas de transferencia para cubrir el costo de las tarifas de transacción en las redes de Avalanche y Ethereum, así como los costos operacionales de la infraestructura puente. Estas tarifas se cobran en especie con el activo ERC20 que se transfiere Es decir, cuando transfiere un token, una parte del saldo transferido es tomada por el AB como una tarifa.

Cuando mueve activos de Ethereum a Avalanche, la tarifa es de 3 dólares de valor del activo ERC20 que se transfiere Las transferencias a Avalanche pueden calificar para una gota de aire de AVAX como se describe [aquí](avalanche-bridge-faq.md#airdrop).

Cuando mueve activos de Avalanche a Ethereum, la tarifa es el valor de la tarifa máxima de transacción Ethereum \(límite de gas \* precio de gas \* \), además una cantidad constante en dólar \(actualmente 5 dólares\) para dar cuenta de la volatilidad de precios. Tenga en cuenta que la tarifa máxima de transacción de Ethereum se basa en el límite de gas y puede ser mayor que la tasa de transacción real, que se basa en la cantidad de gas utilizado por la transacción.

#### ¿Por qué la cantidad de activo que recibí en una red coincide con la cantidad que envié desde la otra?

El puente carga una tarifa. Ver arriba.

#### ¿Cómo se estima el gas? ¿Cómo recibe el puente los precios de token?

El puente utiliza las fuentes de precio de Chainlink para obtener información de precio de gas para la red Ethereum. El precio de gas utilizado es el mayor del valor de Chainlink FASTGAS y la aproximación de precios de gas Geth. El precio de gas es acolchado por unos GWEI para asegurar que las transacciones enviadas por el puente se incluyan rápidamente en un bloque de Ethereum.

El puente también utiliza alimentaciones de precio de Chainlink para determinar los precios de token utilizados para calcular la cantidad de un token que es equivalente a la tarifa de puente.

#### ¿Hay una fuga de aire?<a id="airdrop"></a>

Los usuarios serán enviados de aire acondicionado hasta 0,1 AVAX cuando transfieren más de 75 USD \(sujeto a cambios\) de un token de Ethereum a Avalanche.

#### ¿Qué pasa si no recibí mi lanzamiento de aire?

Si no has recibido tu lanzamiento de aire, por favor confirme que la cantidad de transferencia cumplía la cantidad mínima requerida.

### Seguridad

#### ¿El puente de Avalanche es confiado

El puente de Avalanche es sin confianza en el sentido de que nadie puede acceder a ninguno de los fondos mantenidos como activos de garantía o envueltos a la acuñación. Todas las transferencias a través del puente deben ser aprobadas por 3 de 4 partes independientes \(llamadas guardianes\). En este sentido, el uso de este puente no requiere confianza en ninguna parte para transferir tus fondos.

#### ¿Cuál es el papel de los guardianes?

El papel de los guardias es cuatro veces:

1. Almacenar acciones secretas
2. Blockchains de Indización compatibles
3. Rastreo Transacciones procesadas
4. Hosting de información pública

Aquí se puede encontrar un desglose completo del papel y las responsabilidades de un [director](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

#### ¿Cuál es la relación entre Ava Labs y los Armarios?

Los guardias son socios de confianza de la Fundación de Avalanche. Tienen un registro de excelencia técnica y trabajan con Avalanche.

#### ¿El código ha sido auditado? ¿Dónde están los informes de auditoría?

Sí, el código para el puente, de guarda y de los contratos inteligentes han sido auditados por Halborn. Los informes de auditoría se pueden encontrar [aquí](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1).

### Tokens

#### Mi transferencia a Avalanche es completa, pero no veo mis activos en Metamask Avalanche. ¿Qué pasó?<a id="cant-see-funds"></a>

Necesitas decirle a Metamask que busque los tokens. Asegúrate de agregar los tokens de la lista de [token de Avalanche Bridge](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) a Metamask.

#### ¿Qué tipo de tokens se puede transferir a través del puente?

Solo los tokens de ERC20 compatibles pueden ser transferidos a través del puente. En Avalanche, estos tokens están representados por el símbolo de token con ".e" adjunto. Por ejemplo, el token de DAI de puente es DAI.e.

#### ¿Cómo desenvolvemos WETH.e a ETH en Avalanche?

No No hay tal cosa como ETH en Avalanche. Puedes usar WETH.e, una representación envuelta de ETH, en contratos inteligentes y dapps en Avalanche.

#### ¿Cómo wrap/unwrap ETH en Ethereum?

Puedes usar la función SWAP de Metamask para cambiar de ETH a WETH. Alternativamente, también puedes usar un AMM como [Uniswap](https://app.uniswap.org/#/) en Ethereum.

#### ¿Cómo puedo agregar un token al puente?

Ver [aquí](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### ¿Cómo puedo agregar un token usado en el puente a Metamask?

Ver [aquí](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3) para un tutorial.

#### ¿Por qué hay dos tipos de la misma token? ¿Cómo puedo saber cuál deriva del puente de Avalanche?

En general, cuando estás interactuando con contratos inteligentes y dapps como Pangolin, **quieres usar el token con .e al **final.

El puente de Avalanche \(AB\) de la generación actual al que se refiere este documento es anterior con una implementación de puente anterior llamada AEB. El puente de AEB y AB tienen cada uno sus propios conjuntos de token únicos. Los tokens de AEB han sido abandonados a favor de los tokens de AB. Los tokens de AB tienen un `.e`sufix. Aunque el nombre y el símbolo de un token son buenas referencias para diferenciar los dos, la única forma de seguridad de verificar un token es la dirección de contrato. Las direcciones de contrato de AB se pueden encontrar [aquí.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### ¿Por qué no aparece el token de reciente puente en mi billetera automáticamente?

Las tokens no son mantenidas por tu dirección de C-chain sino en el contrato inteligente de la token. Tienes que decirle tu billetera \(es decir, Metamask\) qué contratos inteligentes para comprobar los saldos mantenidos por tus direcciones.

#### ¿Soporte de puente de Avalanche

El puente de Avalanche no admite transferencias NFT.

### Chapas compatibles

#### ¿Qué cadenas son compatibles con el puente de Avalanche?

El puente de Avalanche solo admite la transferencia de ERC20 de Ethereum a la C-Chain de Avalanche y viceversa. Hay planes de apoyar la transferencia de ERC20 creada en la C-Chain. Avalanche También hay planes de apoyar redes distintas de Avalanche y Ethereum.

#### ¿Puedo salvar los activos de \(red\) a Avalanche?

El puente de Avalanche solo puede transferir activos entre Ethereum y Avalanche. Para obtener activos de otra red en Avalanche, puedes hacer una de las siguientes:
* Transfiere esos activos a Ethereum y de Ethereum a Avalanche
* Usa un puente de terceros no creado/mantenido/apoyado por Ava Labs
* Comprar AVAX en un exchange centralizado y retirar AVAX a Avalanche, luego usa un AMM para intercambiar por otros activos.

### AEB \(Puente Depreso\)

El puente de Avalanche \(AB\) de la generación actual al que se refiere este documento es anterior con una implementación de puente anterior llamada AEB. Esta sección trata de preguntas sobre la implementación de puente anterior \(AEB\).

#### ¿Cuándo deja de operar?

La AEB está desactivada y las transferencias a través de ella no son posibles. Los fondos mantenidos en el lado de Ethereum de la AEB han sido trasladados al nuevo puente de Avalanche \(AB\). Las conversiones de Token se han habilitado en la C-Chain, permitiendo a los usuarios convertir sus tokens de AEB en una base 1-1 por su equivalente en el puente de Avalanche. Esta conversión puede hacerse en [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Las fechas de soporte de tokens de AEB se dejarán a la vista de los proyectos DApp individuales.

#### ¿Puedo transferir mis tokens de AEB a Ethereum?

Para mover tus tokens de AEB a Ethereum, primero debes convertirlos en tokens de AB como se describe en la pregunta anterior. Una vez convertido, puedes usar el nuevo puente de Avalanche para mover los tokens de AB de vuelta a Ethereum.

#### ¿Cómo convertir mis tokens de AEB \(puente \(deprecated a los tokens de Avalanche Bridge \(AB\)?

Puedes convertir tus tokens de AEB a los tokens de AB AB usando la [interfaz de usuario de AB](http://bridge.avax.network/convert). Además, muchos proyectos de ecosistema como Pangolin están trabajando en hacer que sea fácil para los usuarios convertir sus tokens e introducir nuevos grupos de liquidez.

### Diseñador/técnico

#### ¿Puede una sola clave privada tokens de acuñación de acuñación privada?

Ninguna parte tiene acceso a la dirección de enclave SGX. Solo el enclave puede crear /firmar una transacción usando esa clave cuando recibe aprobaciones de 3 de 4 guardianes. En este sentido, el enclave aquí está funcionando como un contrato inteligente de varias blockchains.

#### ¿Por qué el puente no mantiene fondos en un contrato inteligente?

No usar un contrato inteligente simplifica los requisitos de transferencia de extremo a extremo, lo que resulta en tasas de gas más bajas y transferencias más rápidas.

#### ¿Puedo integrar las transferencias de puente en mis propios contratos inteligentes?

Actualmente, el puente solo admite transferencias de varias blockchains desde cuentas de propiedad externa \(EOA\). Esto se debe a que el puente utiliza la misma dirección en ambas redes, asegurando que los fondos movidos a través del puente se mantengan dentro de la misma billetera y no hay una forma de asegurar que un contrato inteligente en una dirección determinada en Ethereum también exista en la misma dirección en Avalanche. Los tokens de ERC20 enviados a la dirección de puente de los contratos inteligentes en la red Ethereum no serán acuñados como tokens envueltas en Avalanche.

#### ¿Es seguro el uso de tx.origin en los contratos de BridgeToken?

Aunque el uso de tx.origin para comprobar la autorización dentro de los contratos inteligentes plantea riesgos de seguridad potenciales. En los contratos de puente, tx.origin solo se utiliza para evitar los contratos inteligentes de llamar directamente a la función "unwrap", ya que el puente actualmente solo admite la transferencia de cuentas de propiedad externa. Es seguro hacerlo comparando el valor tx.origin con el valor tx.origin

#### ¿Dónde puedo encontrar más información sobre el diseño?

Ver [Puente de Avalanche: Transferencias de activos de varias blockchains seguras usando Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Misceláneos

#### No puedo ver mis tokens en mi billetera. ¿Están perdidos para siempre?

No. Es muy probable que se produzca un problema de interfaz de usuario, y los tokens están allí, pero simplemente no se ven los tokens. Ver [aquí](avalanche-bridge-faq.md#cant-see-funds).

#### En la página de prueba de activos, ¿por qué no la cantidad de un activo en Ethereum y Avalanche partido?

Es posible que el puente sea over-collateralized \(es decir, mantenga más de un activo de ERC20 en Ethereum que existe en Avalanche\) por tres razones. Todos estos son esperados.

1. Hay nuevas transferencias de Ethereum a Avalanche. El puente solo procesa transferencias una vez que la transacción de Ethereum recibe 35 confirmaciones. Antes de entonces, el saldo de garantía será más que el suministro de activos envueltos.
2. Las garantías de AEB han sido transferidas al nuevo puente de AB, pero no todos los tokens de AEB se han convertido a los tokens de AB en Avalanche todavía.
3. Las tarifas de puente se han acumulado en el lado de Ethereum. El enclave no recoge inmediatamente las tarifas generadas desde el puente. En lugar de ello, mantiene todas las tarifas recopiladas de cada activo en la billetera de puente hasta que se cumpla un umbral configurado. En cuyo momento las tarifas se envían a una billetera separada.

#### ¿Dónde puedo comprar AVAX?

Dependiendo de tu ubicación, puedes comprar AVAX en un exchange centralizado. También puedes comprar AVAX en intercambios descentralizados como [Pangolin](https://app.pangolin.exchange/).

#### ¿Cómo puedo contactar con alguien para ayuda?

El soporte está disponible usando el chat en [support.avax.network](https://support.avax.network), o en nuestro servidor de [Discord](https://chat.avax.network/)** ¡Por favor haz un esfuerzo razonable para buscar la respuesta a tu pregunta antes de preguntar!** Alguien más lo ha preguntado

#### ¿Qué significa el sufijo .e en el nombre de token?

El `.e`sufijo denota que el activo se mueve a través del puente desde Ethereum.

#### ¿Cómo configuro Metamask en Avalanche?

Para configurar tu billetera de Metamask y conectarla a la red de Avalanche, mira [aquí](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

#### Transferí mi ERC20 sobre el puente de Avalanche. ¿Dónde puedo comerciarlo ahora?

Puedes comerciar tokens de puente en varias AMM diferentes en la C-Chain, como [Pangolin](https://app.pangolin.exchange/).

## Ecosistema

### ¿Cómo añado mi proyecto al directorio de ecosistemas?

Para que tu proyecto sea agregado al directorio de ecosistemas, por favor envía un correo electrónico a `ecosystem@avalabs.org`. Por favor incluyen:

* tu nombre de proyecto
* una breve descripción de tus servicios
* una versión de 88h x 88w .svg del logotipo de tu proyecto

   Un miembro del equipo de Avalanche te volverá para confirmar la adición de tu proyecto.

#### ¿Cómo puedo conseguir una banner promovida en la página de Ecosistema?

`ecosystem@avalabs.org`Para tener tu proyecto enumerado en la sección de carrusel promocional de la página de Avalanche Ecosistema por favor envía una solicitud . Por favor, incluye una descripción corta de tu proyecto y los detalles promocionales. Un miembro del equipo de soporte de Ava Labs te responderá dentro de 2 días hábiles.

Las especificaciones para el banner son las siguientes:

* Escritorio y Paisaje: 1155px \* 440px
* Retrato y móvil: 720px \* 337px
* Elementos de diseño en medio de la banner o serán cortados
* Usa el color sólido como BG o tiene gradiente que se desvanece en #00 \(edited\)
