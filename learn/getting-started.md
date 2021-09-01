# Empezando

El propósito de este tutorial es dar una visión general de Avalanche y servir como un punto de partida para los nuevos usuarios al ecosistema de Avalanche. Se asume el conocimiento general de la criptomoneda y en particular la familiaridad con el ecosistema de Ethereum. Si no entiendes algo de inmediato, eso está bien. Busca una respuesta en línea, y si no la encuentras, pregunta en nuestra [Discord](https://chat.avax.network).

Recomendamos leer este documento enteramente antes de usar Avalanche de modo que puedas evitar problemas comunes y problemas con los que se enfrentan los nuevos usuarios. Hay muchas facetas de Avalanche, por lo que es mejor obtener una imagen completa de las cosas antes de entrar para salvarte la confusión. Además, esta guía contiene consejos y advertencias para ayudarte a evitar la víctima a los estafadores.

Puedes encontrar una [visión](https://support.avax.network/en/articles/4135427-avalanche-platform-overview) general de Avalanche Será útil para entender las similitudes y las diferencias entre Avalanche y otras plataformas.

## Tarifas

Todas las tarifas en Avalanche se pagan en el token nativo, AVAX, así que necesitarás algunos para interactuar con la red de Avalanche. Puedes conseguirlo a través de [exchanges](https://ecosystem.avax.network/marketplace?tag=exchange). Otra forma de adquirir AVAX es a través de la compra de tarjeta de crédito en [Pangolin](https://app.pangolin.exchange/#/buy). Otras maneras se explican a continuación.

Si usas el [puente](https://bridge.avax.network) de Avalanche para transferir activos a Avalanche, necesitarás algo de AVAX para mover/intercambiar tus activos. El puente de Avalanche proporciona una [caída](https://support.avax.network/en/articles/5462264-is-there-an-airdrop) de AVAX a los usuarios que transfieren más de un determinado valor de activos a Avalanche. Usa este AVAX para cambiar algunos de tus activos de puente para AVAX para que puedas pagar tarifas de transacciones futuras.

## Billetera

Una *dirección *puede mantener un equilibrio de criptomonedas. Una *billetera *controla un conjunto de direcciones. Piensa en una dirección como una caja de bloqueo, y una billetera como una clave para muchas cajas de bloqueos. Una billetera es accesible al proporcionar una frase de 24 palabras.** ¡Si pierdes esta frase, no tienes acceso a tu billetera, y no hay forma de recuperar tus activos!** Por lo tanto, es muy importante almacenar de forma segura la frase secreta de tu billetera de forma segura. Al mismo tiempo, **cualquiera con tu frase de contraseña puede acceder y tomar todos tus **activos, así que es vital asegurarse de que nadie más sepa tu contraseña. Es la mejor práctica de **no tener tu frase de contraseña guardada en cualquier computadora.**

Puedes acceder a tu billetera en el sitio web de [Avalanche](https://wallet.avax.network/) Puedes seguir [esta](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) guía para crear una nueva billetera propia.

Puedes y deberías usar un [Ledger](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) de hardware para iniciar sesión en tu billetera.** Usar una billetera de hardware es la forma más segura de acceder a tus tokens **porque tus claves privadas y la frase de contraseña nunca salen del dispositivo.

Una vez que tengas tu billetera, puedes querer enviar tu AVAX desde un exchange a tu billetera. Ver [aquí](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet) para una guía sobre hacerlo.

La red primaria de Avalanche consta de tres cadenas diferentes, como se explica en el artículo de visión enlazado arriba. Para mover tus fondos de una cadena a otra tendrás que hacer [transferencias de varias blockchains](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains).

## Metamask

La mayor parte de la actividad en la red de Avalanche sucede en varias dapps \(aplicaciones descentralizadas\). Para interactuar con ellos, puedes usar una extensión de navegador que conectará tu billetera con la dapp. [Metamask](http://metamask.io/) es una extensión de billetera tan popular.

De forma predeterminada, Metamask se conecta a Ethereum. Para conectarse a Avalanche, necesitas [agregar Avalanche como una red personalizada](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

En Metamask puedes crear una nueva cuenta y enviarle fondos desde tu billetera de Avalanche o importar la cuenta de billetera de Avalanche existente. Puedes importar la cuenta ya sea usando la frase de contraseña secreta o exportando la clave privada de C-Chain desde la billetera \(Seleccionar `Manage Keys`, entonces `View C Chain Private Key`\). Si usas la billetera de hardware de Ledger, puedes usla también en Metamask. Se conectará a tu billetera y tendrá los mismos balances/direcciones que si accedes a tu billetera en el sitio web de la billetera.

Para ver tus fondos en Metamask \(si importas Avalanche Wallet\), o para poder enviar fondos de la cuenta de billetera a la cuenta de Metamask, necesitarás tener tus fondos en la C-Chain. Si transferes los fondos de un exchange que normalmente estarán en la X-Chain, por lo que necesitarás una transferencia de varias blockchains, como se explica en la sección anterior.

## Transacciones

Puedes enviar tokens desde la billetera de Avalanche o Metamask. Es importante tener en mente que todas las transacciones son finales e irreversibles. Si comes un error y envías fondos a una dirección incorrecta, no hay mecanismo que pueda revertir la transacción y devolver los fondos. Es por eso que es críticamente importante asegurarse de que la dirección que estás enviando los tokens a la que es correcta y que quieres enviar a una dirección en Avalanche y no una red diferente \(ver la siguiente sección.\).

### Envío de otras redes

Otras redes pueden tener formatos de dirección idénticos a los de Avalanche. Pero **eso no significa que puedas enviar fondos en Avalanche directamente a otras redes de blockchain, incluyendo, por **ejemplo, Ethereum o BSC \(Binance Smart Chain\). Si dices a Avalanche que envíe fondos a la dirección \(\), por ejemplo, lo hará **en **Avalanche, no otra `0x12345`red, incluso si esa dirección existe o es válida en otra red. Tus fondos no terminarán en la otra red. Una vez se envían los fondos, solo la persona que tiene las claves privadas que controlan la dirección de destino puede acceder alguna vez a ellos. Si **controlas la dirección de destino, probablemente puedes ser capaz de recuperarlas importándolas la clave privada que controla la dirección a Metamask. Si las envias a la dirección de alguien más, sin embargo, necesitarás su cooperación, lo cual puede ser difícil.

Lo anterior se aplica en la dirección inversa No puedes enviar fondos a una dirección de Avalanche directamente desde Ethereum, BSC, etc. Las direcciones pueden parecer lo mismo y ser aceptadas, pero eso no significa que los fondos lleguen en tu billetera. Si quieres enviar o recibir fondos de Ethereum, mira la sección Avalanche \(#[Avalanche Bridge]\) a continuación.

Si no estás seguro de lo que estás intentando hacer, o haciendo algo por primera vez, es mejor enviar una pequeña cantidad \('polvo'\) primero, para comprobar que llega al destino previsto.

### Añadiendo Tokens

Además de la token nativa, AVAX, existen numerosos otros tokens en la red. Billetera de Avalanche ha creado en soporte para los tokens más populares, pero Metamask no Si adquires otros tokens, pueden no ser visibles en tu billetera o Metamask. Puede que necesite agregarlos manualmente, seleccionando el botón "Añadir token". Para agregar un token, tendrás que saber la dirección de contrato de token. No usas la función de búsqueda en Metamask, solo funciona correctamente en Ethereum. Puedes encontrar direcciones de los tokens más populares [aquí](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json) para activos de Ethereum, o [aquí](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) para activos de Avalanche.

Cuando agregas la dirección, el resto de los datos se autofill, y tu equilibrio debería ser visible. `Wrapped token`Puedes agregar automáticamente tokens a Metamask [aquí](https://bridge.avax.network/proof-of-assets) al presionar el icono de Metamask en el que quieres agregar.

## Dapps

### Puente de Avalanche

Una vez que tengas la extensión de tu navegador \(Metamask por ejemplo\), estás listo para interactuar con dapps en Avalanche. La mayor parte de lo que querrás hacer, como la agricultura de **rendimiento, requiere que tengas tokens distintos de AVAX. Si tienes esos tokens en Ethereum \(o un exchange que puede enviarlos a Ethereum\), una de las maneras más baratas y rápidas de traerlos es el [puente](https://bridge.avax.network/) de Avalanche.

Puedes encontrar una colección de tutoriales de vídeo sobre el uso básico del puente de Avalanche [aquí](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP). Además, asegúrate de que revises las [preguntas más](https://docs.avax.network/learn/avalanche-bridge-faq) frecuentes sobre el puente y destaca las cosas que debes cuidar.

Cuando se hace puente más de 75 USD o más de los activos, también te lanzarás algo de AVAX para ayudar a pagar por los intercambios iniciales. ¡Usa esos fondos solo para adquirir AVAX adicional! Si te quedas varado sin suficiente AVAX por tarifas serás incapaz de hacer cualquier otra cosa, así que asegúrate de tener siempre un AVAX en tu billetera. Puedes cambiar por AVAX en [Pangolin](https://app.pangolin.exchange).

### Ecosistema

Hay una colección cada vez mayor de dapps implementadas en Avalanche. Para encontrarlos, puedes ir a nuestro sitio web oficial [de ecosistema](https://ecosystem.avax.network/marketplace) Puedes filtrar los proyectos seleccionando las etiquetas para las áreas de tu interés. También hay una lista de proyectos [impulsada por](https://www.avax-projects.com/) la comunidad. \(No deberías considerar la presencia de un proyecto en las listas anteriores como un respaldo del proyecto.\)

Dip en, explora e intenta cosas. Hay muchas joyas ahí dentro.

## Seguridad

Como en otra parte en el espacio de criptomonedas, necesitas ser consciente de los peligros. Todas las transacciones son finales e irreversibles y si caes víctima de un estafador, nadie podrá recuperar tus fondos.

### Frases de billetera

Es crucial entender que **tu frase secreta es tu **billetera. Quien tenga acceso a la contraseña secreta de 24 palabras tiene acceso completo y completo y control sobre todo en la billetera. Si das a alguien tu passphrase, los has dado todo en ella. Por lo tanto, **nunca dale tu frase de contraseña a **nadie. No lo envíes a ninguna parte. No la escribas en sitios web a los que encontraste en línea o a que alguien te envió un enlace. La mejor práctica es no tener tu frase de contraseña guardada en cualquier computadora.

El único lugar en el que puedes introducir la frase de contraseña es el sitio [oficial](https://wallet.avax.network) de la billetera de Avalanche e incluso entonces, asegúrate de que estés en una red segura y que el sitio web es el correcto al escribir la `https://wallet.avax.network`dirección tú mismo. Consulta el icono de candado en tu navegador para asegurarse de que tu conexión sea segura. Si estás en duda de si quieres introducir tu passphrase, no.

Si estás trabajando con cantidades no triviales de tokens \(en otras palabras, el dinero no puedes perder cómodamente \), te aconsejamos firmemente que usas una billetera de [hardware de Ledger](https://www.ledger.com/) para acceder a tus fondos.

### DOR

Eso significa "Haz tu propia investigación". En otras palabras, no confías en nada que lees en línea. Consulta otras fuentes, pide segunda opinión. Sé muy cuidadoso y juicioso con aceptar noticias de una fuente.

Sé especialmente sospechosa de la gente que se contacta en privado, ofreciendo ayuda sobre temas que publicas públicamente. Prácticamente cada vez que sucede, es un estafador que intenta convencerte de exponer tu passphrase, las claves privadas o comprometer de otro modo tus tokens.

No te apresures a tener proyectos desconocidos que prometen devoluciones de tamaño retornos Cualquier dapp en la que depositas tus fondos tiene acceso a ellos. Busca el proyecto en línea y mira quién lo mantiene y comprueba que los contratos son verificados y auditados. Busca banderas rojas potenciales.

### tokens faltos

Cualquiera puede crear un token nuevo, y en Avalanche es bastante barato. Además, la creación de piscina de liquidez en DEXes no tiene permiso para que cualquiera pueda crear un nuevo par con un token falso que tiene el mismo nombre y la imagen token que lo real. Para evitar ese tipo de estafas, siempre selecciona tokens de las listas oficiales de tokens oficiales en los DEX, no usas enlaces de otros lugares.

## Exploradores

Los exploradores son sitios web que indexan y presentan la actividad de la red, donde puedes buscar transacciones individuales, y averiguar más sobre lo que fluye a través de la red.

### Explorador oficial

explorador [explorer.avax.network](https://explorer.avax.network/) es el explorador de red oficial mantenido por Ava Labs.

### AvaScan

[Avascan](https://avascan.info/) es un sitio web de explorador independiente, conocido por su presentación slick y una visión general integral, especialmente interesante para ver [validadores y](https://avascan.info/staking/validators) delegadores, ya que muestra una gran cantidad de información interesante sobre los validadores de red individuales.

### VScout

[VScout](https://vscout.io/) es otro explorador alternativo para Avalanche. Entre otras cosas allí puedes ver la distribución de validadores en todo el planeta.

## Soporte en línea

Ofrecemos varias maneras de obtener apoyo. Aquí están algunos:
* [Sitio de soporte](https://support.avax.network/en/)
* [Soporte de tecnología](https://twitter.com/avaxtechsupport)
* [Telegram](https://t.me/avalancheavax)
* [servidor de Discord](http://chat.avax.network/) \(más popular y más alto tráfico.\)

Expansión en la sección [DYOR](#dyor) arriba: Cuando usas cualquier canal de soporte público, sospechas de cualquier persona que contacta en privado a través de DM, correo electrónico o similar. Pueden ser administradores o moderadores o miembros de equipo.** ¡Cuentas legítimas nunca te contactarán en DM primero!** Administradores reales y miembros de equipo siempre se comprometerán públicamente primero, y si es necesario solicitar que se *contacta con ellos *en mensaje directo.

Los estafadores monitorizan los canales públicos para las personas que buscan ayuda y luego contacta con ellos en la oferta privada para ayudar. Un scammer podría decirte que necesitas "sincronizar tu billetera" o algo similar y darte un enlace donde se supone que debes introducir la frase de la billetera para completar el proceso. Pueden ofrecer una aplicación que resuelva el problema. En ambos casos, es solo alguien que busca robar tus fondos.

¡Es lo que repite: no le des a nadie tu frase de 24 palabras secreta o tus claves privadas!

## Conclusión

Avalanche es una plataforma joven, pero ofrece muchas oportunidades interesantes y emocionantes para comprometerse y participar en la nueva frontera de blockchains. Empezando puede sentirse desalentador, pero esperamos que este documento facilite tu introducción y tu incorporación.

Si tienes alguna pregunta, o dudas, necesitas algo para aclarar, o solo quieres charlar, por favor únete a nosotros en nuestro [servidor de Discord](http://chat.avax.network/) Nos encantaría saber de ti.
