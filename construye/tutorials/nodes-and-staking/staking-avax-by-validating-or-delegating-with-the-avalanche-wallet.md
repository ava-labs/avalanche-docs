# Stake de AVAX , por Validar o Delegar, con la Wallet de AVAX

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

**Para hacer stake, necesitas tener tus fondos disponibles en la** [**Platform Chain \(P-Chain\)**](../../../aprende/platform-overview/#platform-chain-p-chain)**! Si tus fondos están en el** [**Exchange Chain \(X-Chain\)**](../../../aprende/platform-overview/#exchange-chain-x-chain)**, tendremos que transferirlos a la P-Chain iniciando una transferencia de cross-chain. Si tus fichas están bloqueadas ya están en la P-Chain, así que no necesitas realizar la transferencia de cross-chain de la X-Chain a la P-Chain.**

![Image for post](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Ingresa el monto que deseas transferir a tu P-Chain y completa la transferencia haciendo clic en el botón "Transfer" abajo.

![Image for post](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voilá!

![Image for post](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Ahora, tenemos nuestros fondos listos para staking en la P-Chain. A continuación, puedes añadir un validador o un delegador a tu wallet.

### **Paso 3A: Conviértete en un validador!** <a id="60f0"></a>

Para añadir un validador, necesitamos tener un nodo ejecutándose. Podemos configurar uno usando los [binarios](https://github.com/ava-labs/avalanchego/releases/) liberados o construirlos a partir del [Código Fuente de AvalancheGo ](https://github.com/ava-labs/avalanchego).

El uso de los binarios es fácil y conveniente y te prepara para ser un validador en 4 pasos:

* Descarga la última versión de tar.gz \(zip para el osx y Windows\) [aquí](https://github.com/ava-labs/avalanchego/releases)
* Descomprimelo en una de las siguentes carpetas: 

\* Linux: tar -xvf avalanchego-linux-&lt;VERSION&gt;.tar.gz

\* OSX: unzip avalanchego-macos-&lt;VERSION&gt;.zip

\* Windows: unzip avalanchego-win-&lt;VERSION&gt;.zip

* Navega hasta el directorio de binarios cd avalanchego-&lt;VERSION&gt;
* Ejecuta el binario con ./avalanchego en Linux y OSX y AvalancheGo en Windows

Dejaremos que nuestro nodo arranque y se sincronice con el resto de la red, y estamos listos para seguir.

Necesitaremos la ID de nuestro Nodo. Encontraremos eso usando el [API de Información](../../avalanchego-apis/info-api.md)!

Si necesitas ayuda para configurar tu nodo, únete a nosotros en Discord\]\([https://chat.avax.network/](https://chat.avax.network/)\).

![Image for post](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Rellena los campos y confirma!

![Image for post](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Revisa cuidadosamente los detalles, y haz clic en "Confirmar" de nuevo!

![Image for post](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Felicitaciones. ¡Ahora estás validando en la Red Primaria de Avalanche!

### **Paso 3B: ¡Añade un delegador!** <a id="59bd"></a>

![Image for post](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Selecciona un validador con el que quieras delegar tus tokens de la lista de validadores de red activos.

![Image for post](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Especifica el período de stake y la cantidad. Presta atención a la hora de finalización del validador seleccionado. Su período de delegación no puede ser configurado para que termine después de la fecha de finalización que el validador ha establecido.

![Image for post](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirma los detalles!

![Image for post](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Felicitaciones. ¡Ahora estás delegando en la Red Primaria de Avalanche!

