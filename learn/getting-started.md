# Inicio

El propósito de este tutorial es brindar una vista general de Avalanche y servir como punto de partida para los nuevos usuarios del ecosistema de Avalanche. Se asume que hay un conocimiento general acerca de las criptomonedas y una familiaridad particular con el ecosistema de Ethereum. Si no entiendes algo de inmediato, no te preocupes. Busca una respuesta en línea; si no la encuentras, pregunta en nuestro [Discord](https://chat.avax.network).

Te recomendamos leer todo este documento antes de usar Avalanche para evitar dificultades y problemas comunes que los nuevos usuarios enfrentan. Hay muchas facetas de Avalanche; lo mejor es darse una idea completa del panorama antes de entrar de lleno, a modo de evitar confusiones. Esta guía también contiene consejos y advertencias para evitar ser víctima de estafadores.

[Aquí](https://support.avax.network/en/articles/4135427-avalanche-platform-overview) puedes encontrar una vista general de Avalanche. Te servirá para entender las similitudes y las diferencias entre Avalanche y otras plataformas.

## Token y comisiones de AVAX

Todas las comisiones de Avalanche se pagan en el token nativo, AVAX, por lo que necesitarás tener algunos para interactuar con la red de Avalanche. Puedes obtenerlos mediante [intercambios](https://ecosystem.avax.network/marketplace?tag=exchange). Otra forma de adquirir AVAX es mediante una compra con tarjeta de crédito en [Pangolin](https://app.pangolin.exchange/#/buy). Abajo explicamos otras formas.

Si usas [Avalanche Bridge](https://bridge.avax.network) para transferir activos a esta plataforma, necesitarás algunos AVAX para mover o intercambiar tus activos. Avalanche Bridge, el puente de Avalanche, proporciona un [airdrop](https://support.avax.network/en/articles/5462264-is-there-an-airdrop) u obsequio de AVAX a los usuarios que transfieran más de cierto valor de activos a Avalanche. Usa estos AVAX para intercambiar algunos de tus activos de puente por AVAX para que puedas pagar futuras tasas de transacción.

## Billetera

Una _dirección _puede tener un saldo de criptomonedas. Una _billetera_ controla un conjunto de direcciones. Piensa en una dirección como una caja fuerte y en una billetera como una clave para muchas cajas fuertes. Puedes acceder a una billetera con una frase de contraseña secreta y única de 24 letras.** ¡Si pierdes esta frase de contraseña, no tendrás acceso a tu billetera ni ninguna manera de recuperar tus activos!** Por ende, es muy importante que almacenes la frase de contraseña secreta de tu billetera en un lugar seguro. Al mismo tiempo, **cualquiera que tenga tu frase puede acceder y tomar todos tus activos**, por lo que es vital asegurarte de que nadie más conozca tu frase de contraseña. Lo mejor sería que **no guardes tu frase de contraseña en ninguna computadora.**

Puedes acceder a tu billetera desde el sitio web [de Avalanche Wallet.](https://wallet.avax.network/) Puedes seguir [esta](https://support.avax.network/en/articles/5315160-creating-a-new-wallet-with-the-avalanche-wallet) guía para crear tu propia billetera nueva.

Puedes, y debes, usar un [hardware Ledger](https://docs.avax.network/build/tutorials/platform/setup-your-ledger-nano-s-with-avalanche) para iniciar sesión en tu billetera. **Usar una billetera de hardware es la manera más segura de acceder a tus tokens** porque tus claves privadas y frase de contraseña nunca salen del dispositivo.

Una vez que tengas tu billetera, puedes enviar tu AVAX desde un intercambio hacia tu billetera. [Aquí](https://support.avax.network/en/articles/5315157-how-to-send-avax-from-an-exchange-to-the-avalanche-wallet) puedes encontrar una guía acerca de cómo hacerlo.

La red primaria de Avalanche consta de tres cadenas diferentes, tal como se explica en el artículo de vista general enlazado arriba. Para mover tus fondos de una cadena a otra, necesitarás realizar [transferencias de cadena cruzada](https://support.avax.network/en/articles/4840306-how-do-i-transfer-my-avax-between-avalanche-x-p-and-c-chains).

## metamask

La mayor parte de la actividad de la red de Avalanche ocurre en varias DApps (aplicaciones descentralizadas). Puedes usar una extensión en tu navegador para interactuar con ellas; esta conectará tu billetera con la DApp. [MetaMask](http://metamask.io/) es una extensión de billetera conocida.

MetaMask conecta con Ethereum de manera predeterminada. Para conectarte a Avalanche, debes [agregar Avalanche como una red personalizada](https://support.avax.network/en/articles/4626956-how-do-i-set-up-metamask-on-avalanche).

También puedes crear una nueva cuenta en MetaMask y enviar fondos hacia ella desde tu billetera principal de Avalanche; también puedes importar una cuenta existente de billetera de Avalanche. Puedes importar la cuenta usando la frase de contraseña secreta o exportando la clave privada de la C-Chain desde la billetera. (Selecciona`Manage Keys` y luego `View C Chain Private Key`). Si usas la billetera de hardware Ledger, también la puedes usar en MetaMask. Se conectará a tu billetera y tendrá los mismos saldos y direcciones que si accederas a ella desde el sitio web de la billetera.

Para ver tus fondos en MetaMask (si importaste la wallet de Avalanche) o para enviar fondos de la cuenta de la wallet a la de MetaMask necesitarás tener tus fondos en la C-Chain. Si transferiste los fondos de un intercambio, generalmente estarán en la X-Chain, por lo que deberás transferirlos por cadena cruzada, como se explicó en la sección anterior.

## Transacciones

Puedes enviar tokens desde la billetera de Avalanche o MetaMask. Es importante que tengas presente que toda transacción es final e irreversible. Si por error envías fondos a una dirección incorrecta, no podrás revertir la transacción y recuperar los fondos, puesto que no existe un mecanismo para hacerlo. Por esta razón es fundamental que te asegures de enviar los tokens a la dirección correcta y a una dirección en Avalanche, y no a otra red (mira la siguiente sección).

### Envío a otras redes

Otras redes pueden tener formatos de dirección idénticos a los de Avalanche. Ahora bien, **eso no significa que puedas enviar fondos en Avalanche directamente a otras redes de blockchain**, entre ellos Ethereum o BSC (Cadena Inteligente de Binance), por ejemplo. Por ejemplo, si le indicas a Avalanche que envíe fondos a la dirección (`0x12345`), lo hará **en Avalanche**, no en la otra red, aunque esa dirección existe o es válida en otra red. Tus fondos no terminarán en la otra red. Una vez que los fondos se envíen, únicamente la persona que tiene las claves privadas que controlan la dirección de destino puede acceder a ellos. Si _tú_ controlas la dirección de destino, probablemente puedes recuperarlos al importar la clave privada que controla la dirección a MetaMask. Sin embargo, si los enviaste a la dirección de otra persona, necesitarás su cooperación, lo cual puede ser difícil.

Lo anterior también aplica en la dirección inversa. No puedes enviar fondos a una dirección de Avalanche directamente desde Ethereum, BSC, etc. Puede que las direcciones se vean iguales, pero eso no significa que los fondos llegarán a tu billetera. Si quieres enviar o recibir fondos de Ethereum, consulta la sección [Avalanche Bridge](getting-started.md#Avalanche%20Bridge) a continuación.

Si no estás seguro de lo que intentas hacer, o si lo estás haciendo por primera vez, lo mejor es enviar una cantidad pequeña ("polvo") primero para comprobar que llegará al destino previsto.

### Agregar tokens

Además del token nativo, AVAX, hay muchos otros tokens en la red. La billetera de Avalanche tiene soporte integrado para los tokens más populares, pero MetaMask no. Si adquieres otros tokens, puede que no sean inmediatamente visibles en tu billetera o MetaMask. Puede que necesites agregarlos manualmente, al seleccionar el botón de "Agregar token". Para agregar un token, necesitarás conocer su dirección de contrato. No uses la función de búsqueda en MetaMask, ya que esta solo funciona correctamente en Ethereum. [Aquí](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/ab.tokenlist.json) puedes encontrar las direcciones de los tokens más populares para activos de Ethereum, y [aquí](https://tokenlists.org/token-list?url=https://raw.githubusercontent.com/pangolindex/tokenlists/main/defi.tokenlist.json) para los de Avalanche.

Cuando agregues la dirección, el resto de los datos se rellenarán automáticamente y podrás ver tu saldo. [Aquí](https://bridge.avax.network/proof-of-assets) puedes agregar tokens automáticamente a MetaMask al presionar el ícono de MetaMask en el `Wrapped token` que deseas agregar.

## DApps

### Avalanche Bridge

Una vez que hayas instalado la extensión en tu navegador (la de MetaMask, por ejemplo), estarás listo para interactuar con DApps en Avalanche. La mayor parte de lo que querrás hacer, como _agricultura de rendimiento_, requiere que tengas otros tokens además de AVAX. Si tienes esos tokens en Ethereum (o en un intercambio que los pueda enviar a Ethereum), una de las maneras más baratas y rápidas para traerlos es mediante [Avalanche Bridge](https://bridge.avax.network/).

[Aquí](https://www.youtube.com/playlist?list=PLRHl-ulWK4-FPRA7SS1OrCOC8cOc2K8sP) puedes encontrar una colección de tutoriales de video sobre el uso básico de Avalanche Bridge. Consulta las [Preguntas frecuentes](https://docs.avax.network/learn/avalanche-bridge-faq) para obtener respuestas a las preguntas más comunes acerca del puente y particularidades a las que debes prestarle atención.

Cuando mueves activos de $ 75 o más por el puente, se te obsequiarán AVAX para ayudar con el pago de los intercambios iniciales. Usa esos fondos para adquirir más AVAX; ¡los necesitarás para pagar las comisiones en cada DApp que utilices! Si te quedas sin suficientes AVAX para las tasas, no podrás hacer nada más; por lo tanto, asegúrate de siempre tener algunos AVAX en tu billetera. Puedes hacer intercambios por AVAX en [Pangolin](https://app.pangolin.exchange).

### Ecosistema

Hay una colección cada vez mayor de DApps que se despliegan en Avalanche. Para encontrarlas, puedes visitar nuestro [sitio web del ecosistema](https://ecosystem.avax.network/marketplace) oficial. Puedes filtrar los proyectos al seleccionar las etiquetas correspondientes a tus áreas de interés. También hay una lista de proyectos [impulsados por la comunidad](https://www.avax-projects.com/). (No debes considerar la presencia de un proyecto en las listas anteriores como un respaldo del proyecto).

Prueba, navega y experimenta. Ahí encontrarás muchos tesoros.

## Seguridad

Al igual que en otros lugares del espacio de las criptomonedas, siempre debes estar al tanto de los riesgos. Todas las transacciones son definitivas e irreversibles; si eres víctima de una estafa, nadie podrá recuperar tus fondos.

### Frase de contraseña de la billetera

Es esencial que entiendas que **tu frase de contraseña secreta es tu billetera**. Quien tenga acceso a la frase de contraseña secreta de 24 palabras tiene acceso completo a la billetera y control sobre todo aspecto de ella. Si le das tu frase de contraseña a alguien, también le habrás dado todo lo que contiene. Por esta razón, **nunca le des tu frase de contraseña a nadie**. No la envíes a ningún lado. No la escribas en sitios web que encontraste en línea o cuyo enlace alguien te envió. Lo mejor es que no guardes tu frase de contraseña en ninguna computadora.

El único lugar donde puedes ingresar la frase de contraseña es en el sitio web [oficial de la billetera de Avalanche](https://wallet.avax.network). Aun en este, debes asegurarte de estar en una red segura y de que el sitio web sea el correcto; para esto, tu misma debes escribir la dirección `https://wallet.avax.network`. Revisa que el ícono del candado esté en tu navegador para asegurarte de que la conexión es segura. Si tienes dudas acerca de ingresar la frase o no, no lo hagas.

Si estás trabajando con cantidades no insignificantes de tokens (en otras palabras, dinero que no puedes darte el lujo de perder), te recomendamos que uses la [billetera física Ledger](https://www.ledger.com/) para acceder a tus fondos.

### DYOR

En inglés, esta sigla corresponde a "Haz tu propia investigación". En otras palabras, no confíes ciegamente en nada que leas en línea. Consulta otras fuentes, busca segundas opiniones. Ten cuidado y sé precavido a la hora de aceptar noticias de alguna fuente.

Sospecha de personas que te contacten por privado ofreciendo su ayuda para temas acerca de los que consultaste públicamente. Esos casos casi siempre corresponden a un estafador que quiere convencerte de exponer tu frase de contraseña o claves privadas, o que quiere poner tus tokens en riesgo.

No te unas rápidamente a proyectos desconocidos que prometen rendimientos mayores. Cualquier DApp en la que deposites tus fondos tendrá acceso a ellos. Busca el proyecto en línea y mira quién lo mantiene. Verifica que los contratos sean verificados y auditados. Busca si hay potenciales señales de alarma.

### Tokens falsos

Cualquiera puede crear un token nuevo; hacer eso en Avalanche es bastante barato. Además, la creación de grupos de liquidez en DEX no requiere permisos, de modo que cualquiera puede crear un par nuevo con un token falso con el mismo nombre e imagen del verdadero. Para evitar ese tipo de estafa, selecciona siempre los tokens de las listas de tokens oficiales en los DEX; no uses enlaces desde otros sitios.

## Exploradores

Los exploradores son sitios web que indexan y presentan la actividad de la red. En ellos puedes buscar transacciones individuales y obtener más información acerca de lo que acontece en la red.

### Explorador oficial

El explorador oficial que mantiene Ava Labs es [explorer.avax.network](https://explorer.avax.network/).

### Avascan

[Avascan](https://avascan.info/) es un sitio web de exploración independiente, conocido por su buena presentación y su vista general integral, especialmente interesante para ver [validadores y delegadores](https://avascan.info/staking/validators), ya que muestra mucha información interesante sobre validadores individuales de la red.

### vscout

[VScout](https://vscout.io/) es otro explorador alternativo a Avalanche. En este puedes ver la distribución de los validadores en todo el planeta, entre otras cosas.

## Soporte en línea

Ofrecemos varias maneras de obtener asistencia. Aquí hay algunas:

* [Sitio de soporte](https://support.avax.network/en/)
* [Soporte técnico en Twitter](https://twitter.com/avaxtechsupport).
* [Telegram](https://t.me/avalancheavax)
* [Soporte técnico de Twitter](http://chat.avax.network/).

Ampliación de la sección [DYOR](getting-started.md#dyor) de arriba: Cuando uses cualquier canal de soporte público, sospecha de quien te contacte por privado a través de mensajes directos, correos electrónicos o similares. Pueden ser personas que se hacen pasar por administradores, moderadores o miembros del equipo. **¡Las cuentas legítimas nunca te contactarán por mensaje directo como primera opción!** Los administradores reales y los miembros del equipo siempre interactuarán contigo públicamente al inicio y, de ser necesario, te pedirán que los _contactes a ellos_ por mensaje directo.

Los estafadores monitorean los canales públicos en busca de personas que necesiten ayuda y los contactarán por privado ofreciendo su asistencia. Un estafador te puede decir que necesitas "sincronizar tu billetera" o algo así, y te dará un enlace en el cual supuestamente debes ingresar la frase de contraseña de tu billetera para completar algún proceso. Puede que te ofrezca una aplicación para resolver algún problema. En ambos casos, solo es alguien que quiere robarse tus fondos.

Es necesario repetir esto: ¡Nunca le des tu frase de contraseña secreta de 24 palabras o tus claves privadas a nadie!

## Conclusión

Avalanche es una plataforma joven, pero ofrece muchas oportunidades interesantes y emocionantes para interactuar y participar en la nueva frontera de las cadenas de bloques. Al principio puede sentirse abrumante, pero esperamos que este documento facilite tu introducción e incorporación.

Si tienes alguna pregunta o duda, si requieres de alguna aclaración, o si simplemente deseas chatear, únete a nosotros en nuestro [servidor de Discord](http://chat.avax.network/). Nos encantaría saber de ti.

