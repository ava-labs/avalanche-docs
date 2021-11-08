# Preguntas frecuentes del puente de Avalanche (AB)

## Preguntas frecuentes del puente de Avalanche (AB)

Con el puente de Avalanche (AB) se pueden transferir tokens de ERC20 desde Ethereum hacia la C-Chain de Avalanche y viceversa. Este documento contiene respuestas a preguntas comunes acerca del puente. Si no encuentras la respuesta a tu pregunta en esta u otra documentación, puedes contactarnos por [el sitio web de soporte de Avalanche](https://support.avax.network), [Discord](https://chat.avalabs.org) o [Telegram.](https://t.me/avalancheavax)

### Notas importantes

1. Hay un error en la aplicación móvil de MetaMask que afecta las transacciones de puente (**solo en móviles**). No uses la aplicación móvil de MetaMask para las transferencias de puente hasta que este error se haya resuelto. Usa la aplicación de escritorio o, si estás usando un móvil, Coinbase Wallet.
2. Necesitas tener AVAX para pagar las comisiones de transacción en Avalanche.** Debes usar el AVAX que recibes en tu airdrop para hacer un intercambio de más AVAX en un AMM para poder pagar las comisiones de transacción.** Si se te acaban los AVAX, no podrás hacer transacciones en Avalanche.

### Transacciones

#### ¿Qué puedo hacer si mi transacción se atasca?

Si la transacción de transferencia de fondos de Ethereum a Avalanche por el puente se atasca y no da confirmaciones, puedes acelerar la transacción según se describe [aquí](avalanche-bridge-faq.md#speed-up-transaction). Si la transacción de Ethereum ya ha recibido 35 confirmaciones pero el temporizador de transacciones de Avalanche parece haberse atascado, revisa el saldo de tu billetera de MetaMask en la red de Avalanche. Puede ser que la transacción ya se procesó y simplemente no ha aparecido en la interfaz de usuario. Esto puede suceder si optaste por "acelerar" tu transacción.

Es posible, pero muy poco probable, que la transacción de Ethereum emitida por el puente durante la transferencia de fondos a Ethereum dure mucho para recibir 35 confirmaciones. Esto puede ocurrir si hay un aumento repentino significativo en los precios de gas de Ethereum. Si la transacción no está incluida dentro de 200 blocks a partir de su emisión en Ethereum, se puede emitir una nueva transacción con un precio de gas más alto para "desatascar" la transferencia.

#### ¿Cuánto se dura en hacer una transferencia de puente?

La transacción de Ethereum debería tomar de 10 a 15 minutos. Las transacciones de Avalanche duran unos segundos.

#### ¿Por qué la parte del puente de la transacción de Avalanche está durando tanto tiempo?

Solo debería durar unos segundos. Si la interfaz del puente muestra que se está demorando más, simplemente se debe a un problema con la interfaz. Tus activos se transfirieron en segundos. Revisa tu billetera y el explorador de la C-Chain.

#### ¿Qué pasa si el precio del gas es mayor que la cantidad que estoy transfiriendo?

Cuando se mueven activos ERC20 de Ethereum a Avalanche, se utiliza MetaMask para enviar una transacción de Ethereum que transfiera los fondos. La comisión de esa transacción depende del precio actual de gas de la red de Ethereum, que es muy variable. Si el precio de gas es tan alto que la comisión de la transacción es mayor que el valor que se está transfiriendo, quizá quieras esperar hasta que el precio de gas disminuya.

Al volver a mover activos desde Avalanche a Ethereum, el puente carga una comisión de transferencia que se describe [aquí](avalanche-bridge-faq.md#fees). La interfaz de usuario no permite transferencias menores a la cantidad de la comisión. Si un usuario genera y emite una transacción de este tipo manualmente, el puente la marcará como inválida y no la procesará.

#### ¿Puedo enviar tokens creados en Avalanche a Ethereum?

Todavía no. Actualmente, el puente de Avalanche solo admite la transferencia de tokens de ERC20 creados en Ethereum hacia Avalanche y de vuelta. Hay planes para habilitar esto en el futuro.

#### ¿Puedo enviar ETH o BTC a través del puente?

El puente de Avalanche todavía no es compatible con ETH o BTC nativos. Sin embargo, puedes transferir la versión envuelta de estos tokens (WETH y WBTC) a través del puente.

#### ¿Qué pasa si no veo mi transacción en el explorador?

En el caso de las redes de Avalanche y Ethereum, las transacciones que corresponden a las transferencias de puente aparecerán en los exploradores. Puede que las transacciones duren unos minutos para aparecer. Para buscar tu transacción en el explorador, copia y pega tu dirección en el [explorador de la C-Chain de Avalanche](https://cchain.explorer.avax.network/) o en el [Etherscan](https://etherscan.io/). Para ver las transacciones enviadas por el puente, para Avalanche puedes buscar [aquí](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04/transactions) y para Ethereum, [aquí](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0). Si todavía no ves tu transacción, ponte en contacto mediante [Telegram](https://t.me/avalancheavax) o [Discord](https://chat.avax.network/).

#### ¿Hay tutoriales acerca de cómo usar el puente?

Sí, puedes ver videotutoriales sobre la funcionalidad del puente [aquí](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP).

#### ¿Cómo pago por las comisiones de transacción en Avalanche?

Las comisiones de transacción en Avalanche se pagan con el activo nativo, AVAX. Para enviar transacciones en la C-Chain de Avalanche debes tener suficientes AVAX en tu billetera para cubrir el costo del gas para la transacción. A modo de ayudarte a iniciar en Avalanche, el puente te enviará una pequeña cantidad de AVAX si pasas más del equivalente a $ 75 (sujeto a cambios) desde Ethereum. Recomendamos primero comprar una cantidad adecuada de AVAX para que no te quedes sin AVAX para cubrir las comisiones de transacción. Puedes hacerlo en [Pangolin](https://app.pangolin.exchange/).

#### ¿Puedo hacer envíos a una dirección diferente en la otra red?

El puente solo permite hacer transferencias a la misma dirección en la otra red. Después de transferir el activo a la otra red, se puede enviar a cualquier dirección o contrato.

#### ¿Puedo acelerar mi transacción?<a id="speed-up-transaction"></a>

Sí, puedes hacer clic en el botón "Acelerar" de MetaMask. "Acelerar" una transacción a través de MetaMask implica la emisión de una nueva transacción en Ethereum con un precio de gas más alto que el de la transacción original Como la nueva transacción tiene un precio de gas mayor, es más probable que se incluya en un bloque. Solo se aceptará una de las transacciones \(la original y la "acelerada"\). Es seguro acelerar una transacción que está transfiriendo fondos al puente. Sin embargo, la interfaz de usuario no estará al tanto de la nueva transacción, lo que significa que puede que no veas las confirmaciones en la interfaz de usuario. Una vez que la nueva transacción tenga 35 confirmaciones en Ethereum, revisa tu billetera de MetaMask en Avalanche para ver los fondos envueltos.

#### ¿Por qué el número de tokens mostrados en MetaMask no coincide con el que yo especifiqué?

Cuando se hace una transferencia de Avalanche a Ethereum, MetaMask muestra que se deben transferir cero tokens en vez de la cantidad real de tokens. Este es un problema conocido de MetaMask.

#### ¿Cuál es la dirección del puente en Ethereum y Avalanche?

Direcciones del puente:

* Ethereum: [`0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0`](https://etherscan.io/address/0xe78388b4ce79068e89bf8aa7f218ef6b9ab0e9d0)
* Avalanche: [`0x50Ff3B278fCC70ec7A9465063d68029AB460eA04`](https://cchain.explorer.avax.network/address/0x50Ff3B278fCC70ec7A9465063d68029AB460eA04)

Ten en cuenta que **no deberías transferir tokens directamente a estas direcciones**. Debes usar la interfaz de usuario del puente, la cual revisa si hay transacciones malformadas.

### Comisiones

#### ¿Cómo funcionan las comisiones en el puente de Avalanche?

El puente carga las comisiones de transferencia para cubrir el costo de las comisiones de transacción en las redes de Avalanche y Ethereum, aunado a los costos operacionales de la infraestructura del puente. Estas comisiones se cobran con el activo de ERC20 que está siendo transferido. Es decir, cuando se transfiere un token, una parte del saldo transferido se usa para cubrir la comisión.

Cuando se mueven activos de Ethereum a Avalanche, la comisión del puente es de $3 del activo ERC20 que se está transfiriendo. Las transferencias a Avalanche pueden calificar para un airdrop de AVAX, según se describe [aquí](avalanche-bridge-faq.md#airdrop).

Cuando se mueven activos de Avalanche a Ethereum, la comisión del puente se basa en gran medida en la comisión de la transacción de Ethereum **esperada**, que se calcula con los precios actuales de los activos, el actual precio de gas de Ethereum y la cantidad aproximada de gas que será utilizado por la transacción de Ethereum. Como tal, la comisión de transacciones de Ethereum y, por lo, tanto también la comisión del puente, puede ser muy variable. Para dar cuenta de la volatilidad de los precios, se añade una cantidad constante en dólares \(actualmente $15\) a la comisión del puente. Se debe tener en cuenta que la comisión del puente será diferente que la comisión de transacciones de Ethereum que se muestra en exploradores como Etherscan porque los precios de los activos, el precio de gas de Ethereum y la cantidad de gas utilizada por las transacciones de Ethererum fluctúan. La comisión del puente esperada se muestra en la interfaz UI del puente cuando se hace una transferencia.

#### ¿Por qué la cantidad de activos que recibí en una red no coincide con la que envié desde la otra?

El puente cobra una comisión. Consulta arriba.

#### ¿Cómo se estima el gas? ¿Cómo recibe el puente los precios del token?

El puente utiliza las fuentes de precios de Chainlink para obtener información del precio del gas para la red Ethereum. El precio del gas que se usa es el más alto del valor del Chainlink FASTGAS y la aproximación al precio de gas Geth. El precio del gas es soportado por algunos GWEI para asegurar que las transacciones enviadas por el puente se incluyan rápidamente en un bloque de Ethereum.

El puente también utiliza las fuentes de precios de Chainlink para determinar los precios del token que se usan para calcular la cantidad de un token que es equivalente a la tasa del puente.

#### ¿Hay algún airdrop?<a id="airdrop"></a>

A los usuarios se les dará hasta 0,1 AVAX cuando transfieran más de $75 \(sujeto a cambios\) de un token desde Ethereum hacia Avalanche.

#### ¿Qué pasa si no recibí mi airdrop?

Si no has recibido tu airdrop, revisa si la cantidad de la transferencia cumplió con la mínima requerida.

### Seguridad

#### ¿Es el puente de Avalanche "sin confianza"?

El puente de Avalanche es sin confianza en el sentido de que nadie puede acceder a ninguno de los fondos que se mantienen como activos colaterales o envueltos por acuñación. Todas las transferencias que atraviesan el puente deben ser aprobadas por tres de cuatro partes independientes, llamadas "wardens" o guardianes. En este sentido, el uso del puente no requiere confiar en ninguna parte única para transferir tus fondos.

#### ¿Cuál es el rol de los wardens?

Los wardens cumplen cuatro funciones:

1. Almacenamiento de acciones secretas
2. Indexación de blockchains respaldadas
3. Seguimiento de transacciones procesadas
4. Alojamiento de información pública

[Aquí](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1) puedes encontrar un desglose completo del rol y de las responsabilidades de un warden.

#### ¿Cuál es la relación entre Ava Labs y los wardens?

Los wardens son socios de confianza de la Fundación Avalanche. Tienen un registro de excelencia técnica y se reconocen por su trabajo con Avalanche.

#### ¿El código ha sido auditado? ¿Dónde se encuentran los informes de las auditorías?

Sí, el código del puente, de los wardens y de los contratos inteligentes han sido auditados por Halborn. [Aquí](https://github.com/ava-labs/avalanche-bridge-resources/tree/main/SecurityAudits/v1_1) puedes encontrar los informes de las auditorías.

### Tokens

#### Ya se completó mi transferencia a Avalanche, pero no veo mis activos en MetaMask Avalanche. ¿Qué pasó?<a id="cant-see-funds"></a>

Debes decirle a MetaMask que busque los tokens. Asegúrate de que has agregado los tokens de la [lista de tokens del puente Avalanche](https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json) a MetaMask.

#### ¿Qué tipo de tokens se pueden transferir por el puente?

Solo los tokens de ERC20 compatibles pueden ser transferidos a través del puente. En Avalanche, estos tokens se representan con el símbolo del token con ".e" adjunto. Por ejemplo, el token de DAI con puente es DAI.e.

#### ¿Cómo desenvuelvo WETH.e a ETH en Avalanche?

No lo haces. En Avalanche no hay ETH. En Avalanche puedes usar WETH.e, una representación envuelta de ETH, en contratos inteligentes y DApps.

#### ¿Cómo envuelvo y desenvuelvo ETH en Ethereum?

Puedes usar la función SWAP de MetaMask para intercambiar de ETH a WETH. Alternativamente, en Ethereum también puedes usar un AMM, tal como [Uniswap](https://app.uniswap.org/#/).

#### ¿Cómo puedo agregar un token al puente?

Consulta [aquí](https://github.com/ava-labs/avalanche-bridge-resources#readme).

#### ¿Cómo puedo agregar un token usado en el puente a MetaMask?

Consulta un tutorial [aquí.](https://www.youtube.com/watch?v=vZqclPuPjMw&list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP&index=3)

#### ¿Por qué hay dos tipos del mismo token? ¿Cómo puedo saber cuál se deriva del puente de Avalanche?

En general, cuando interactúas con contratos inteligentes y DApps, como Pangolin, **querrás usar el token con ".e" al final**.

El predecesor del puente de Avalanche \(AB\) de la generación actual al que se refiere este documento se llama AEB. Los puentes AEB y AB tienen sus propios conjuntos únicos de tokens. Los tokens de AEB se ha vuelto obsoleta y ha cedido terreno a los tokens de AB. Los tokens de AB tienen un sufijo `.e`. Aunque el nombre y el símbolo de un token son buenas referencias para diferenciarlos, la única manera segura de verificar un token es la dirección del contrato. Puedes encontrar las direcciones de los contratos de los tokens de AB [aquí.](https://github.com/ava-labs/avalanche-bridge-resources/blob/main/avalanche_contract_address.json)

#### ¿Por qué el token recién puesto en el puente no aparece en mi billetera automáticamente?

Los tokens no están en el poder de nuestra dirección de C-chain; estos se mantienen en el contrato inteligente. Debes decirle a tu billetera \(i.e. MetaMask\) cuáles contratos inteligentes revisar para obtener los saldos relacionados con tus direcciones.

#### ¿Con el puente de Avalanche se pueden hacer transferencias de NFT?

Actualmente, el puente de Avalanche no es compatible con transferencias de NFT.

### Cadenas compatibles

#### ¿Cuáles cadenas son compatibles con el puente de Avalanche?

Actualmente, el puente de Avalanche solo admite la transferencia de ERC20 de Ethereum a la C-Chain de Avalanche y viceversa. Hay planes para admitir la transferencia de ERC20 creados en la C-Chain de Avalanche. También hay planes de compatibilidad con otras redes aparte de Avalanche y Ethereum.

#### ¿Puedo enviar activos por puente de \(red\) a Avalanche?

El puente de Avalanche solo puede transferir activos entre Ethereum y Avalanche. Para mover activos de otra red a Avalanche, puedes hacer uno de los siguientes pasos:

* Transfiere esos activos a Ethereum, y de Ethereum a Avalanche.
* Usa un puente tercero no creado, mantenido o soportado por Ava Labs.
* Compra AVAX en un exchange centralizado y retira AVAX en Avalanche, luego usa un AMM para intercambiarlo por otros activos.

### AEB \(puente obsoleto\)

El predecesor del puente de Avalanche \(AB\) de la generación actual al que se refiere este documento se llama AEB. Esta sección aborda preguntas acerca de la implementación del puente anterior \(AEB\).

#### ¿Cuándo dejó de operar el AEB?

El AEB se desactivó y ya no es posible utilizarlo para hacer transferencias. Los fondos que estaban retenidos en el lado de Ethereum del AEB se movieron al nuevo puente de Avalanche \(AB\). Se ha habilitado la conversión de tokens en la C-Chain de Avalanche, lo que le permite a los usuarios convertir sus tokens de AEB, uno por uno, a sus equivalentes en el puente de Avalanche. Esta conversión se puede hacer en [https://bridge.avax.network/convert](https://bridge.avax.network/convert). Los programas de soporte de los tokens de AEB dependen de cada proyecto individual de DApp.

#### ¿Puedo transferir mis tokens de AEB a Ethereum?

Para trasladar tus tokens de AEB a Ethereum, primero debes convertirlos en tokens de AB, tal como se describe en la pregunta anterior. Una vez que los hayas convertido, puedes usar el nuevo puente de Avalanche para volver a trasladar los tokens de AB a Ethereum.

#### ¿Cómo puedo convertir mis tokens de AEB \(puente obsoleto\) a tokens del puente de Avalanche \(AB\)?

Puedes convertir tus tokens de AEB a tokens de AB usando la [interfaz de usuario de AB](http://bridge.avax.network/convert). Además, muchos proyectos de ecosistemas como Pangolin están trabajando para que los usuarios puedan convertir sus tokens e ingresar a nuevos grupos de liquidez con facilidad.

### Diseño/técnico

#### ¿Una clave privada única puede acuñar tokens?

Ninguna parte tiene acceso a la dirección de enclave de SGX. Solo el enclave en sí puede construir o firmar una transacción con esa clave, una vez que recibe la aprobación de tres de los cuatro wardens. En este sentido, aquí el enclave funciona como un contrato inteligente entre cadenas cruzadas.

#### ¿Por qué el puente retiene fondos en un contrato inteligente?

No usar un contrato inteligente simplifica los requisitos de transferencia de extremo a extremo, lo que resulta en comisiones de gas más bajas y transferencias más rápidas.

#### ¿Puedo integrar transferencias de puente a mis propios contratos inteligentes?

Actualmente, el puente solo admite transferencias de cadenas cruzadas de cuentas de propiedad externa \(EOA\). Esto se debe a que el puente usa la misma dirección en ambas redes, lo que garantiza que los fondos que se mueven a través del puente se mantengan dentro de la misma billetera. Adicionalmente, no hay manera de asegurar que un contrato inteligente en una dirección determinada en Ethereum también existe en la misma dirección en Avalanche. Los tokens de ERC20 enviados a la dirección de puente de contratos inteligentes en la red de Ethereum no se acuñarán como tokens envueltos en Avalanche.

#### ¿Es seguro usar tx.origin en los contratos de BridgeToken?

Aunque usar tx.origin para revisar la autorización dentro de contratos inteligentes plantea potenciales riesgos de seguridad, en nuestro caso no es así. En los contratos de puente, solo se usa el tx.origin para impedir que los contratos inteligentes utilicen la función de desenvolver, ya que el puente actualmente admite únicamente transferencias desde cuentas externas. Esto se puede hacer de forma segura al comparar el valor del tx.origin con el del msg.sender.

#### ¿Dónde puedo encontrar más información sobre el diseño?

Lee [Puente de Avalanche: Transferencias seguras de activos de cadenas cruzadas usando Intel SGX](https://medium.com/avalancheavax/avalanche-bridge-secure-cross-chain-asset-transfers-using-intel-sgx-b04f5a4c7ad1).

### Misceláneos

#### No puedo ver mis tokens en mi billetera. ¿Se perdieron para siempre?

No. Es muy probable que haya un problema en la interfaz de usuario y que los tokens estén ahí, solo que no puedes verlos. Consulta [aquí](avalanche-bridge-faq.md#cant-see-funds).

#### ¿Por qué la cantidad de activos en Ethereum y Avalanche que se encuentran en la página de Prueba de activo no coinciden?

Es posible que el puente se sobrecolateralice \(es decir, que mantenga más de un activo de ERC20 en Ethereum que existe en Avalanche\) por tres razones. Se prevé que todas estas se den.

1. Hay nuevas transferencias de Ethereum a Avalanche. El puente solo procesa transferencias una vez que la transacción de Ethereum reciba 35 confirmaciones. Antes de eso, el saldo colateral será mayor al suministro de activos envueltos.
2. El colateral de AEB se ha transferido al nuevo puente de AB, pero no todos los tokens de AEB se han convertido a tokens de AB en Avalanche.
3. Las comisiones de puente se han acumulado en el lado de Ethereum. El enclave no recopila inmediatamente las comisiones generadas desde el puente. En su lugar, mantiene todas las comisiones recolectadas de cada activo en la billetera de puente hasta cumplir con un umbral establecido. Una vez que eso sucede, las comisiones se envían a una billetera separada.

#### ¿Dónde puedo comprar AVAX?

Dependiendo de tu ubicación, puedes comprar AVAX en un intercambio centralizado. También puedes comprar AVAX en intercambios descentralizados como [Pangolin](https://app.pangolin.exchange/).

#### ¿Cómo puedo contactar a alguien para obtener asistencia?

Puedes obtener soporte usando el chat en [support.avax.network](https://support.avax.network) o en nuestro servidor [Discord](https://chat.avax.network/). **¡Por favor, haz un esfuerzo razonable para buscar la respuesta a tu pregunta antes de consultar!** Lo más seguro es que alguien ya haya preguntado lo mismo.

#### ¿Qué significa el sufijo ".e" en el nombre del token?

El `.e`sufijo denota que el activo se movió de Ethereum a través del puente.

#### ¿Cómo configuro MetaMask en Avalanche?

Consulta [aquí](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche) para aprender a configurar tu billetera de MetaMask y conectarla a la red de Avalanche.

#### Transferí mi ERC20 por medio del puente de Avalanche. ¿Dónde puedo invertirlo ahora?

Puedes invertir tokens de puente en varios AMM distintos en la C-Chain de Avalanche, como [Pangolin](https://app.pangolin.exchange/), por ejemplo.

## Ecosistema

### ¿Cómo agrego mi proyecto al directorio del ecosistema?

Si deseas agregar tu proyecto al directorio del ecosistema, envía un correo electrónico a `ecosystem@avalabs.org`. Por favor, incluye lo siguiente:

* el nombre de tu proyecto
* una breve descripción de tus servicios
* una versión .svg de 88 de alto x 88 de ancho del logo de tu proyecto

   Un miembro del equipo de Avalanche te contestará para confirmar que se ha agregado tu proyecto.

#### ¿Cómo puedo promover un banner en la página del Ecosistema?

Para incluir tu proyecto en la sección del carrusel promocional de la página del Ecosistema de Avalanche, por favor envía una solicitud a `ecosystem@avalabs.org`. Incluye una breve descripción de tu proyecto y los detalles promocionales. Un miembro del equipo de soporte de Ava Labs te responderá dentro de dos días hábiles.

Estas son las especificaciones para el banner:

* Desktop y Landscape:  1155px \* 440px
* Retrato y móvil: 720px \* 337px
* Diseña los elementos en el medio del banner; de otro modo, pueden quedar recortados.
* Usa un color sólido como BG o una gradiente que se desvanece a #000000 \(editado\)

