# Usa un Ledger Nano S o Nano X con Avalanche

El estándar de la industria para asegurar con seguridad las criptodivisas son las hardware wallets, dispositivos especializados que proporcionan un aislamiento total entre su ordenador y sus private keys.

Si quieres usar la dirección de Avalanche que creaste antes, necesitas usar el procedimiento [restaurar desde la frase de recuperación](https://support.ledger.com/hc/en-us/articles/4404382560913-Restore-from-recovery-phrase) usando la frase mnemónica que obtuviste de la billetera de Avalanche. Si deseas crear una nueva dirección, solo sigue las instrucciones normales del procedimiento para [establecer como nuevo dispositivo](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device).

La aplicación de billetera Ledger de Avalanche está disponible actualmente a través de [Ledger Live](https://www.ledger.com/ledger-live).

## Cómo Configurar Avalanche en Ledger Live<a id="1c80"></a>

Primero, necesitarás instalar [Ledger Live](https://www.ledger.com/ledger-live). Hay opciones de descarga para MacOS, Windows y Linux, así como para iOS y Android.

{% hint style="danger" %}Asegúrate de tener la última versión de la aplicación Ledger Live antes de proceder. Es posible que las versiones antiguas no muestren el firmware del dispositivo ni la versión de la aplicación de Avalanche más recientes. La última versión de aplicación Ledger Live a la fecha de esta redacción es la 2.26.1.{% endhint %}

Ejecuta la aplicación después de instalarla con éxito. Ve a la pestaña "Manager" y permite la gestión de dispositivos al pulsar ambos botones en el dispositivo. En el campo de búsqueda del "App Catalog" digita "Avalanche". Confirma que la aplicación de Avalanche es la v0.5.2 \(o posterior\) y haz clic en el botón "Install".

![Botón de instalación de la aplicación Ledger de Avalanche](../../../.gitbook/assets/ledger-06-live-install.png)

Puedes confirmar que la instalación fue exitosa en la pestaña "Apps installed"; Avalanche v0.5.2 debería estar ahí.

![Botón de instalación de la aplicación Ledger de Avalanche](../../../.gitbook/assets/ledger-07-live-version.png)

## Usa la billetera de Avalanche con Ledger<a id="48a3"></a>

Una vez que tengas la aplicación de Avalanche instalada, podrás interactuar con la [billetera de Avalanche](https://wallet.avax.network/) a través del Ledger. Esto incluye el envío de AVAX, Tokens, NFT, intercambios cross-chain entre la X-Chain<->P-Chain así como hacer stake de tokens.

Primero, para acceder a la Wallet, conecte el Ledger a su ordenador y, si es necesario, introduzca su pin.

![Pantalla con el código PIN](../../../.gitbook/assets/ledger-03-pin.png)

Si tienes más de una aplicación instalada en el dispositivo, utiliza los botones de izquierda y derecha para seleccionar la aplicación de Avalanche:

![Aplicación de Avalanche](../../../.gitbook/assets/ledger-04-app-start.png)

Presiona ambos botones para iniciar la aplicación. Deberías llegar a la pantalla de la aplicación "Avalanche", donde podrás confirmar que la versión de la aplicación es la 0.5.2 \(o posterior\).

![Versión de la aplicación](../../../.gitbook/assets/ledger-05-app-version.png)

Después de confirmar que la aplicación Avalanche está funcionando, en la página de inicio de la billetera haz clic en el botón "Access Wallet".

![Botón de acceso a la billetera](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

En el mensaje posterior, "How do you want to access your wallet?", haz clic en el botón "Ledger".

![Acceso con Ledger](../../../.gitbook/assets/ledger-01-wallet-access.png)

Ahora se te pedirá que confirmes en tu dispositivo Ledger. Haz clic con el botón derecho en las indicaciones del dispositivo y en la última pantalla confirma pulsando ambos botones.

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

Necesitarás hacer esto dos veces, ya que se usan diferentes claves para diferentes cadenas. Si tiene éxito, ingresará en la billetera y se mostrarán los saldos anteriores.

![Pestaña "Web Wallet Portfolio"](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

Para transferir fondos, ve a la pestaña "Send" y pega una dirección X en el campo "To Address". Establece una cantidad y opcionalmente establece una nota. Presiona "Confirm" y luego el botón "Send Transaction".

![Envía la transacción](../../../.gitbook/assets/send-transaction.png)

Se te pedirá que confirmes la acción en tu Ledger. Comprueba que el hash que aparece en la cartera de la web coincide con el que aparece en tu Ledger. Si todo coincide, confirma pulsando los dos botones de la última pantalla para enviar la transacción.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Puedes hacer clic en el icono para actualizar tu saldo y deberías verlo disminuir por el importe que acabas de enviar y la comisión de la transacción.

![Actualiza el saldo de la billetera](../../../.gitbook/assets/refresh-wallet-balance.png)

En la columna de la derecha, verás tu última transacción. Al hacer clic en el icono de la lupa se abrirá la transacción en nuestro explorador.

![Lupa](../../../.gitbook/assets/magnifying-glass.png)

Finalmente, deberíamos poder ver los detalles de la transacción en nuestro explorador. Aquí se enumera todo lo relativo a la transacción, incluyendo el ID de la transacción, el estado, cuándo se produjo la transacción y toda la información relativa a las entradas y salidas.

![Detalles de la transacción](../../../.gitbook/assets/transaction-details.png)

## Más herramientas en camino<a id="135b"></a>

Ava Labs está construyendo el Internet de las finanzas. Estamos desarrollando soluciones para crear un mundo sin fricciones redefiniendo la forma en que la gente construye y utiliza las aplicaciones financieras. Una parte crítica de esta infraestructura es una Hardware Wallet para que los usuarios puedan estar totalmente seguros de que sus private keys y monedas están completamente aisladas de cualquier actor potencialmente malicioso. Nuestra recién lanzada aplicación de Ledger hace precisamente esto siguiendo las mejores prácticas de la industria para mantener a los usuarios y las monedas a salvo y seguras.

