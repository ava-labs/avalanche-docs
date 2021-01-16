# Stakea AVAX, por Validar o Delegar, con la Wallet de Avalanche

## **Introducción** <a id="001f"></a>

La Wallet de Avalanche es una aplicación basada en la web sin middleware ni ningún tipo de comunicación con el servidor. La Wallet de Avalanche está escrita en Vue JS y puede ser accedida en línea o compilada y ejecutada localmente.

Se puede acceder a la Wallet de Avalanche [aquí](https://wallet.avax.network/).  
El código fuente de la Wallet de Avalanche se puede encontrar [aquí](https://github.com/ava-labs/avalanche-wallet).

**Comencemos con el staking!**

### **Paso 1 — Abre la Wallet de Avalanche** <a id="552d"></a>

![Image for post](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Puedes acceder a tu billetera usando tu key phrase, el archivo keystore, o tu Ledger Nano S \(¡Pronto!\)

### **Paso 2 — Navega hacia la sección “Earn”** <a id="dc5a"></a>

![Image for post](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Para hacer stake, necesitas tener tus fondos disponibles en la** [**Platform Chain \(P-Chain\)**](../../../learn/platform-overview/#platform-chain-p-chain)**! Si tus fondos están en el** [**Exchange Chain \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain)**, tendremos que transferirlos a la P-Chain iniciando una transferencia de cross-chain. Si tus fichas están bloqueadas ya están en la P-Chain, así que no necesitas realizar la transferencia de cross-chain de la X-Chain a la P-Chain.**

![Image for post](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Ingrese el monto que desea transferir a su P-Chain y complete la transferencia haciendo clic en el botón "Transfer" abajo.

![Image for post](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voilá!

![Image for post](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Ahora, tenemos nuestros fondos listos para staking en la P-Chain. A continuación, puede añadir un validador o un delegador a su wallet.

### **Paso 3A: Conviértete en un validador!** <a id="60f0"></a>

Para añadir un validador, necesitamos tener un nodo ejecutándose. Podemos configurar uno usando los [binarios](https://github.com/ava-labs/avalanchego/releases/) liberados o construirlos a partir del [Código Fuente de AvalancheGo ](https://github.com/ava-labs/avalanchego).

El uso de los binarios es fácil y conveniente y te prepara para ser un validador en 4 pasos:

* Descargue la última versión de tar.gz \(zip para el osx y Windows\) [aquí](https://github.com/ava-labs/avalanchego/releases)
* Descomprimelo en una de las siguentes carpetas: 

\* Linux: tar -xvf avalanchego-linux-&lt;VERSION&gt;.tar.gz

\* OSX: unzip avalanchego-macos-&lt;VERSION&gt;.zip

\* Windows: unzip avalanchego-win-&lt;VERSION&gt;.zip

* Navegue hasta el directorio de binarios cd avalanchego-&lt;VERSION&gt;
* Ejecute el binario con ./avalanchego en Linux y OSX and AvalancheGo on Windows

We will let our node bootstrap and sync with the rest with the network, and we are ready to roll.

We will need our Node ID. Let’s find that using the [info API](../../avalanchego-apis/info-api.md)!

If you need any help setting up your node, join us on [Discord](https://chat.avax.network/).

![Image for post](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Fill the fields and confirm!

![Image for post](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Carefully check the details, and click “Confirm” again!

![Image for post](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Congratulations. You are now validating the Avalanche Primary Network!

### **Step 3B: Add a Delegator!** <a id="59bd"></a>

![Image for post](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Select a validator you want to delegate your tokens with from the list of active network validators.

![Image for post](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Specify your staking period and stake amount. Pay attention to the end time of the selected validator. Your delegation period cannot be set to end past the end date that the validator has set.

![Image for post](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirm the details!

![Image for post](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Congratulations. You are now delegating the Avalanche Primary Network!

<!--stackedit_data:
eyJoaXN0b3J5IjpbNDQxMzE1ODEsLTY2Njk3MDU3MV19
-->