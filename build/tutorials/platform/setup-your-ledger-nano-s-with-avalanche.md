# Configura tu Ledger Nano S con Avalanche

El estándar de la industria para asegurar con seguridad las criptodivisas son las carteras de hardware, dispositivos especializados que proporcionan un aislamiento total entre su ordenador y sus claves privadas.

Si quieres usar la dirección de Avalanche que creaste antes, necesitas usar el procedimiento [restaurar desde la frase de recuperación](https://support.ledger.com/hc/en-us/articles/360005434914)  usando la frase mnemónica que obtuviste de la cartera de Avalanche. Si estás creando una nueva dirección, sólo sigue las instrucciones normales [establecer como nuevo dispositivo](https://support.ledger.com/hc/en-us/articles/360000613793-Set-up-as-new-device).

La aplicación de Ledger Wallet de Avalanche está disponible actualmente a través de [Ledger Live](https://www.ledger.com/ledger-live) en Modo Experimental.

## Cómo Configurar Avalanche en Ledger Live <a id="1c80"></a>

Primero necesitarás instalar [Ledger Live](https://www.ledger.com/ledger-live). 
Hay opciones de descarga para MacOS, Windows y Linux, así como para iOS y Android.

A continuación, enciende Ledger Live y haz clic en el botón **Settings**

![Settings button on ledger live](https://miro.medium.com/max/3052/1*lMnVGJneUAqgRvZBIDv_rA.png)

Una vez en la configuración, vaya a la pestaña **Experimental features**.

![](https://miro.medium.com/max/4072/1*HrSweaL-kelTl47QRt38iA.png)

Desplácese hacia abajo hasta el interruptor  del **Developer mode** y actívelo.

![Toggle on developer mode](https://miro.medium.com/max/2908/1*qdte7MSvSZdfqfCIUMNp2Q.png)

Ahora con el **Developer Mode** activado, puedes ir a la pestaña "Gerente" y buscar **Avalanche**. Confirma que la aplicación Avalanche es la v0.2.1, y haz clic en el botón **Install**.

![Avalanche Ledger app install button](https://miro.medium.com/max/4040/1*rGFrSBEfxRlIkc-k7hS2Vg.png)

Puedes confirmar que la instalación fue exitosa yendo a la pestaña **Apps installed** donde deberías ver Avalanche v0.2.1.

![](https://miro.medium.com/max/3020/1*qBSuxqY52-wxWfM-w1YR_w.png)

## Usar la Wallet de Avalanche con Ledger <a id="48a3"></a>

Una vez que tengas la aplicación de Avalanche instalada, podrás interactuar con la [Wallet de Avalanche](https://wallet.avax.network/) via the Ledger. This includes sending AVAX, tokens, NFTs, cross-chain swaps between the X-Chain&lt;-&gt;P-Chain as well as staking tokens.

First, to access the wallet, plug in the Ledger to your computer and if needed, enter your pin.

![PIN code screen](https://miro.medium.com/max/1852/1*A_1VgMMLeJCYzNst6tdq9A.jpeg)

Next, if you see the text “Pending Ledger review” then click both buttons on the top of the device to skip that screen.

![](https://miro.medium.com/max/1820/1*OxLbAWq5hzjC6P1SmiCqmg.jpeg)

Lastly, you should land on the “Avalanche” app screen where you can confirm that the app is version 0.2.1.

![](https://miro.medium.com/max/1802/1*Qevjy6nhw5UM0ufvxIL_qg.jpeg)

After you confirm that the Avalanche app is running then on the wallet homepage click the “Access Wallet” button.

![Access wallet button](https://miro.medium.com/max/2364/1*SC1uM5xFybz3lfPiKwOHUw.png)

On the subsequent “How do you want to access your wallet?”, click the “Ledger” button.

![Ledger Access](../../../.gitbook/assets/ledger-access.png)

You’ll now be prompted to confirm on your Ledger device. Click right button through the prompts on the device and on the last screen confirm by pressing both buttons.

![](https://miro.medium.com/max/3828/1*xpNt2ajcTdEivDr4xEedQQ.png)

If successful you will be signed into the wallet and any previous balances will be displayed.

![Web Wallet Portfolio Tab](../../../.gitbook/assets/web-wallet-portfolio-tab.png)

To transfer funds, go to the “Send” tab and paste an X-Address into the “To Address” field. Set an amount and optionally set a memo. Press "Confirm" and then the “Send Transaction” button.

![Send Transaction](../../../.gitbook/assets/send-transaction.png)

You’ll be prompted to confirm the action on your Ledger. Check that the hash which is displayed in the web wallet matches what is displayed on your Ledger. If everything matches then confirm by pressing both buttons on the last screen to send the transaction.

![](https://miro.medium.com/max/2932/1*XI8fzBRpDr0PXcuVQPHLvQ.png)

You can click the icon to refresh your balance and you should see it decrease per the amount which you just sent and the transaction fee.

![Refresh wallet balance](../../../.gitbook/assets/refresh-wallet-balance.png)

In the right-hand column, you will see your latest transaction. Clicking the magnifying glass icon will open the transaction in our explorer.

![Magnifying Glass](../../../.gitbook/assets/magnifying-glass.png)

Finally, you should be able to see the transaction details in our explorer. This lists everything about the transaction, including transaction ID, status, when the transaction occurred, and all of the information regarding inputs and outputs.

![Transaction details](../../../.gitbook/assets/transaction-details.png)

## More Tools to Come <a id="135b"></a>

Ava Labs is building the Internet of Finance. We’re developing solutions to create a frictionless world by redefining the way people build and use finance applications. A critical part of this infrastructure is a hardware wallet so users can be totally confident that their private keys and coins are completely isolated from any potentially malicious actors. Our newly released Ledger app does just this by following industry best practices to keep users and coins safe and secure.

<!--stackedit_data:
eyJoaXN0b3J5IjpbMTA0NDYyMjU1OF19
-->