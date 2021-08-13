# Utilice Ledger Nano S o Nano X con Avalanche

El estándar de la industria para asegurar de forma segura las criptomonedas es billeteras de hardware, dispositivos especializados que proporcionan aislamiento completo entre su computadora y sus teclas privadas.

Si desea utilizar la dirección Avalanche que creó antes, necesita utilizar el procedimiento [de restauración de frases](https://support.ledger.com/hc/en-us/articles/360005434914) usando la frase mnemonic que obtuvo de la cartera Avalanche. Si está configurando una dirección nueva, simplemente siga la configuración regular [como nuevo](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device) procedimiento de dispositivo.

La aplicación de la cartera de Avalanche Ledger está disponible a través de [Ledger Live](https://www.ledger.com/ledger-live).

## Cómo configurar Avalanche en Ledger Live<a id="1c80"></a>

Primero, tendrá que instalar [Ledger Live](https://www.ledger.com/ledger-live). Hay una descarga para MacOS, Windows y Linux, así como para iOS y Android.

{% insinuar style="danger" %} Asegúrese de tener la última versión de la aplicación Ledger Live antes de proceder. Las versiones más antiguas pueden no mostrar el firmware de dispositivo más reciente y la versión de aplicación Avalanche. La última versión de aplicación Ledger Live en el momento de escribir es 2.26.1. {% endhint %}

Después de instalar con éxito la aplicación ejecutarla. Vaya a la pestaña "Manager" y permita la gestión de dispositivos presionando ambos botones en el dispositivo. En el campo de búsqueda de App Catalog ingrese "Avalanche". Confirme que la aplicación Avalanche es v0.5.2 \(o superior\), y haga clic en el botón "Instalar".

![Botón de instalación de aplicación Avalanche Ledger](../../../.gitbook/assets/ledger-06-live-install.png)

Puede confirmar que la instalación tuvo éxito yendo a la pestaña "Apps instaladas" donde debe ver Avalanche v0.5.2.

![Botón de instalación de aplicación Avalanche Ledger](../../../.gitbook/assets/ledger-07-live-version.png)

## Utilice la cartera Avalanche con Ledger<a id="48a3"></a>

Una vez que tengas instalado la aplicación Avalanche, entonces podrás interactuar con la [cartera Avalanche](https://wallet.avax.network/) a través del Ledger. Esto incluye el envío de AVAX, tokens, NFTs, swaps de cadena cruzada, así como el grapado o delegado.

Primero, para acceder a la billetera, enchufe el Ledger a su ordenador e introduzca su alfiler.

![Pantalla de código PIN](../../../.gitbook/assets/ledger-03-pin.png)

Si tiene más de una aplicación instalada en el dispositivo, utilice botones izquierdo y derecho para seleccionar la aplicación Avalanche:

![Aplicación de Avalanche](../../../.gitbook/assets/ledger-04-app-start.png)

Presione ambos botones para iniciar la aplicación. Debe aterrizar en la pantalla de aplicación "Avalanche" donde puede confirmar que la aplicación es la versión 0.5.2 \(o superior\).

![Versión de aplicación](../../../.gitbook/assets/ledger-05-app-version.png)

Después de confirmar que la aplicación Avalanche se está ejecutando luego en la página principal de la billetera haga clic en el botón "Access Wallet".

![Botón de acceso](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

En el siguiente "¿Cómo quieres acceder a tu billetera?", haga clic en el botón "Ledger".

![Acceso de Ledger](../../../.gitbook/assets/ledger-01-wallet-access.png)

Ahora se le pedirá que confirme el acceso a las teclas públicas en su dispositivo Ledger. Haga clic derecho a través de las indicaciones del dispositivo y en la última pantalla confirme presionando ambos botones.

![](../../../.gitbook/assets/ledger-02-confirm-access.png)

Usted tendrá que hacer esto dos veces, porque las diferentes teclas se utilizan para diferentes cadenas. Si se inicia con éxito en la cartera y se mostrará cualquier saldo anterior.

![Cartera Web Cartera Cartera Tab](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

Para transferir fondos, vaya a la pestaña "Enviar" y pegue una dirección X en el campo "To Address". Establece una cantidad y opcionalmente establece un memo. Pulse "Confirmar" y luego el botón "Enviar transacción".

![Enviar Transacción](../../../.gitbook/assets/send-transaction.png)

Se le pedirá que confirme la acción en su Ledger. Compruebe que el hash que se muestra en la cartera web coincide con lo que se muestra en su Ledger. Si todo coincide entonces confirme presionando ambos botones en la última pantalla para enviar la transacción.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Puede hacer clic en el icono para actualizar su saldo y debe ver que disminuya por la cantidad que acaba de enviar y la cuota de transacción.

![Refresh billetera equilibrio](../../../.gitbook/assets/refresh-wallet-balance.png)

En la columna de la derecha, verá su última transacción. Al hacer clic en el icono de lupa abrirá la transacción en nuestro explorador.

![Vidrio de aumento](../../../.gitbook/assets/magnifying-glass.png)

Finalmente, usted debe ser capaz de ver los detalles de la transacción en nuestro explorador. Esto enumera todo sobre la transacción, incluyendo el ID de transacción, el estado, cuando ocurrió la transacción, y toda la información sobre entradas y productos.

![Detalles de la transacción](../../../.gitbook/assets/transaction-details.png)

## Más herramientas para venir<a id="135b"></a>

Ava Labs está construyendo el Internet de Finanzas. Estamos desarrollando soluciones para crear un mundo sin fricción redefiniendo la forma en que las personas construyen y utilizan aplicaciones de financiación. Una parte crítica de esta infraestructura es una cartera de hardware para que los usuarios puedan estar totalmente seguros de que sus teclas y monedas privadas están completamente aisladas de cualquier actor potencialmente malicioso. Nuestra aplicación Ledger recientemente lanzada hace esto siguiendo las mejores prácticas de la industria para mantener a los usuarios y monedas seguras y seguras.

