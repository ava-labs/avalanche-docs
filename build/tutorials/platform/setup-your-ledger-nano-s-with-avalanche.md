# Usa un Ledger Nano S o un Nano X con Avalanche

El estándar de la industria para asegurar con seguridad las criptodivisas son las hardware wallets, dispositivos especializados que proporcionan un aislamiento total entre su ordenador y sus private keys.

Si quieres usar la dirección de Avalanche que has creado antes, necesitas usar la restauración desde el procedimiento [de frase de recuperación](https://support.ledger.com/hc/en-us/articles/360005434914) usando la frase frase frase mnemonic que obtuviste de la billetera de Avalanche. Si estás configurando una dirección fresca, solo sigue la configuración regular [como procedimiento](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device) de dispositivo nuevo.

La aplicación de billetera de Avalanche Ledger está disponible a través de [Ledger Live](https://www.ledger.com/ledger-live).

## Cómo crear Avalanche en Ledger Live<a id="1c80"></a>

Primero, tendrás que instalar [Ledger Live](https://www.ledger.com/ledger-live). Hay opciones de descarga para MacOS, Windows y Linux, así como para iOS y Android.

{% hint style="danger" %}Asegúrate de tener la última versión de la aplicación de Ledger Live antes de proceder. Las versiones más antiguas pueden no mostrar la versión de firmware de dispositivo y Avalanche aplicación. La última versión de aplicación de Ledger Live en el momento de escribir es 2.26.1.{% endhint %}

Después de instalar con éxito la aplicación ejecutarla. Ve a la pestaña "Manager" y permite la gestión de dispositivos presionando ambos botones en el dispositivo. En el campo de búsqueda de App Catalog entra en "Avalanche". Confirma que la aplicación de Avalanche es v0.5.2 \(o mayor\), y haz clic en el botón "Instalar".

![Botón de instalación de la aplicación de Avalanche](../../../.gitbook/assets/ledger-06-live-install.png)

Puedes confirmar que la instalación fue exitosa al ir a la pestaña "Apps instaladas" donde deberías ver Avalanche v0.5.2.

![Botón de instalación de la aplicación de Avalanche](../../../.gitbook/assets/ledger-07-live-version.png)

## Usa la billetera de Avalanche con Ledger<a id="48a3"></a>

Una vez que tengas la aplicación de Avalanche instalada, entonces puedes interactuar con la [billetera](https://wallet.avax.network/) de Avalanche a través de la Ledger. Esto incluye el envío de AVAX, Tokens, NFTs, intercambios cross-chain entre la X-Chain<->P-Chain así como hacer stake de tokens.

Primero, para acceder a la Wallet, conecte el Ledger a su ordenador y, si es necesario, introduzca su pin.

![Pantalla de código PIN](../../../.gitbook/assets/ledger-03-pin.png)

Si tienes más de una aplicación instalada en el dispositivo, usa los botones de izquierda y derecha para seleccionar la aplicación de Avalanche:

![Aplicación de Avalanche](../../../.gitbook/assets/ledger-04-app-start.png)

Presiona ambos botones para iniciar la aplicación. Debes aterrizar en la pantalla de la aplicación "Avalanche" donde puedes confirmar que la aplicación es la versión 0.5.2 \(o mayor\).

![Versión de aplicación](../../../.gitbook/assets/ledger-05-app-version.png)

Después de confirmar que la aplicación de Avalanche se está ejecutando entonces en la página de inicio de la billetera haz clic en el botón "Access Billetera".

![Botón de acceso](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

En el siguiente "¿Cómo quieres acceder a tu billetera?", haz clic en el botón "Ledger".

![Ledger Acceso](../../../.gitbook/assets/ledger-01-wallet-access.png)

Ahora se te pedirá que confirmes en tu dispositivo Ledger. Haz clic con el botón derecho en las indicaciones del dispositivo y en la última pantalla confirma pulsando ambos botones.

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

Necesitarás hacerlo dos veces, porque las diferentes claves se usan para diferentes cadenas. Si tiene éxito, ingresará en la wallet y se mostrarán los saldos anteriores.

![Tab de cartera web](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

Para transferir fondos, ve a la pestaña "Enviar" y pega una X-Address en el campo "To Address". Establece una cantidad y opcionalmente establece una nota. Prensa "Confirm" y luego el botón "Enviar transacción".

![Enviar transacción](../../../.gitbook/assets/send-transaction.png)

Se te pedirá que confirmes la acción en tu Ledger. Comprueba que el hash que aparece en la cartera de la web coincide con el que aparece en tu Ledger. Si todo coincide, confirma pulsando los dos botones de la última pantalla para enviar la transacción.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Puedes hacer clic en el icono para actualizar tu saldo y deberías verlo disminuir por el importe que acabas de enviar y la comisión de la transacción.

![Balance de billetera de actualización](../../../.gitbook/assets/refresh-wallet-balance.png)

En la columna de la derecha, verás tu última transacción. Al hacer clic en el icono de la lupa se abrirá la transacción en nuestro explorador.

![Magnificación](../../../.gitbook/assets/magnifying-glass.png)

Finalmente, deberíamos poder ver los detalles de la transacción en nuestro explorador. Aquí se enumera todo lo relativo a la transacción, incluyendo el ID de la transacción, el estado, cuándo se produjo la transacción y toda la información relativa a las entradas y salidas.

![Detalles de transacciones](../../../.gitbook/assets/transaction-details.png)

## Más herramientas para venir<a id="135b"></a>

Ava Labs está construyendo el Internet de las finanzas. Estamos desarrollando soluciones para crear un mundo sin fricciones redefiniendo la forma en que la gente construye y utiliza las aplicaciones financieras. Una parte crítica de esta infraestructura es una Hardware Wallet para que los usuarios puedan estar totalmente seguros de que sus private keys y monedas están completamente aisladas de cualquier actor potencialmente malicioso. Nuestra recién lanzada aplicación de Ledger hace precisamente esto siguiendo las mejores prácticas de la industria para mantener a los usuarios y las monedas a salvo y seguras.

