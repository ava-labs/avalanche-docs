# Configura tu Ledger Nano S con Avalanche

El estándar de la industria para asegurar con seguridad las criptodivisas son las hardware wallets, dispositivos especializados que proporcionan un aislamiento total entre su ordenador y sus private keys.

Si quieres usar la dirección de Avalanche que creaste antes, necesitas usar el procedimiento [restaurar desde la frase de recuperación](https://support.ledger.com/hc/en-us/articles/360005434914)  usando la frase mnemónica que obtuviste de la Wallet de Avalanche. Si estás creando una nueva dirección, sólo sigue las instrucciones normales [establecer como nuevo dispositivo](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device).

La aplicación de Ledger Wallet de Avalanche está disponible actualmente a través de [Ledger Live](https://www.ledger.com/ledger-live) en Modo Experimental.

## Cómo Configurar Avalanche en Ledger Live <a id="1c80"></a>

Primero necesitarás instalar [Ledger Live](https://www.ledger.com/ledger-live). 
Hay opciones de descarga para MacOS, Windows y Linux, así como para iOS y Android.

A continuación, enciende Ledger Live y haz clic en el botón **Settings**

![Settings button on ledger live](https://miro.medium.com/max/3052/1*lMnVGJneUAqgRvZBIDv_rA.png)

Una vez en la configuración, ve a la pestaña **Experimental features**.

![](https://miro.medium.com/max/4072/1*HrSweaL-kelTl47QRt38iA.png)

Desplázate hacia abajo hasta el interruptor  del **Developer mode** y actívalo.

![Toggle on developer mode](https://miro.medium.com/max/2908/1*qdte7MSvSZdfqfCIUMNp2Q.png)

Ahora con el **Developer Mode** activado, puedes ir a la pestaña "Gerente" y buscar **Avalanche**. Confirma que la aplicación Avalanche es la v0.2.1, y haz clic en el botón **Install**.

![Avalanche Ledger app install button](https://miro.medium.com/max/4040/1*rGFrSBEfxRlIkc-k7hS2Vg.png)

Puedes confirmar que la instalación fue exitosa yendo a la pestaña **Apps installed** donde deberías ver Avalanche v0.2.1.

![](https://miro.medium.com/max/3020/1*qBSuxqY52-wxWfM-w1YR_w.png)

## Usar la Wallet de Avalanche con Ledger <a id="48a3"></a>

Una vez que tengas la aplicación de Avalanche instalada, podrás interactuar con la [Wallet de Avalanche](https://wallet.avax.network/) a través del Ledger. Esto incluye el envío de AVAX, Tokens, NFTs, intercambios cross-chain entre la X-Chain&lt;-&gt;P-Chain así como hacer stake de tokens.

Primero, para acceder a la Wallet, conecte el Ledger a su ordenador y, si es necesario, introduzca su pin.

![PIN code screen](https://miro.medium.com/max/1852/1*A_1VgMMLeJCYzNst6tdq9A.jpeg)

A continuación, si ves el texto **Pending Ledger review**, haz clic en los dos botones de la parte superior del dispositivo para saltar esa pantalla.

![](https://miro.medium.com/max/1820/1*OxLbAWq5hzjC6P1SmiCqmg.jpeg)

Por último, deberías aterrizar en la pantalla de la aplicación **Avalanche** donde puedes confirmar que la aplicación es la versión 0.2.1.

![](https://miro.medium.com/max/1802/1*Qevjy6nhw5UM0ufvxIL_qg.jpeg)

Después de confirmar que la aplicación Avalanche está funcionando, entonces en la página de inicio de la Wallet haga clic en el botón **Access Wallet**.

![Access wallet button](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

En el siguiente mensaje **How do you want to access your wallet?**, haga clic en el botón **Ledger**.

![Ledger Access](../../../.gitbook/assets/ledger-access.png)

Ahora se le pedirá que confirme en su dispositivo Ledger. Haz clic con el botón derecho en las indicaciones del dispositivo y en la última pantalla confirma pulsando ambos botones.

![](https://miro.medium.com/max/3828/1*xpNt2ajcTdEivDr4xEedQQ.png)

Si tiene éxito, se ingresará en la wallet y se mostrarán los saldos anteriores.

![Web Wallet Portfolio Tab](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

Para transferir fondos, vaya a la pestaña **Send** y pegue una dirección de la X-Chain en el campo **To Address**. Establezca una cantidad y opcionalmente establezca una nota. Presione **Confirm** y luego el botón **Send Transaction**.

![Send Transaction](../../../.gitbook/assets/send-transaction.png)

Se le pedirá que confirme la acción en su Ledger. Comprueba que el hash que aparece en la cartera de la web coincide con el que aparece en tu Ledger. Si todo coincide, confirma pulsando los dos botones de la última pantalla para enviar la transacción.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

Puede hacer clic en el icono para actualizar su saldo y debería verlo disminuir por el importe que acaba de enviar y la tarifa de la transacción.

![Refresh wallet balance](../../../.gitbook/assets/refresh-wallet-balance.png)

En la columna de la derecha, verá su última transacción. Al hacer clic en el icono de la lupa se abrirá la transacción en nuestro explorador.

![Magnifying Glass](../../../.gitbook/assets/magnifying-glass.png)

Finalmente, debería poder ver los detalles de la transacción en nuestro explorador. Aquí se enumera todo lo relativo a la transacción, incluyendo el ID de la transacción, el estado, cuándo se produjo la transacción y toda la información relativa a las entradas y salidas.

![Transaction details](../../../.gitbook/assets/transaction-details.png)

## Más Herramientas Por Venir <a id="135b"></a>

Ava Labs está construyendo la Internet de las finanzas. Estamos desarrollando soluciones para crear un mundo sin fricciones redefiniendo la forma en que la gente construye y utiliza las aplicaciones financieras. Una parte crítica de esta infraestructura es una Wallet de hardware para que los usuarios puedan estar totalmente seguros de que sus claves privadas y monedas están completamente aisladas de cualquier actor potencialmente malicioso. Nuestra recién lanzada aplicación de Ledger hace precisamente esto siguiendo las mejores prácticas de la industria para mantener a los usuarios y las monedas a salvo y seguras.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMjMzNDUyMzQ4LDE2OTQxODIyOTYsLTY1MT
gzNjMxMl19
-->