# Stake de AVAX , por Validar o Delegar, con la Wallet de AVAX

## **Introducción**<a id="001f"></a>

La Wallet de Avalanche es una aplicación basada en la web sin middleware ni ningún tipo de comunicación con el servidor. La Wallet de Avalanche está escrita en Vue JS y puede ser accedida en línea o compilada y ejecutada localmente.

Se puede acceder [a](https://wallet.avax.network/) la billetera de Avalanche aquí.   El código de [fuente](https://github.com/ava-labs/avalanche-wallet) de Avalanche

**¡Vamos a conseguir el stak!**

### **Paso 1 — Abre la billetera de Avalanche**<a id="552d"></a>

![Imagen para correo](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Puedes acceder a tu billetera usando tu key phrase, el archivo keystore, o tu Ledger Nano S \(¡Pronto!\)

### **Paso 2 — Navegar a la sección "Earn"**<a id="dc5a"></a>

![Imagen para correo](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Para jugar, necesitas tener tus fondos disponibles en la [**cadena de plataforma \(P-Chain\).**](../../../learn/platform-overview/#platform-chain-p-chain)**** Si tus fondos están en la blockchain de **[**exchange \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain), necesitaremos transferirlos a la **P-Chain iniciando una transferencia de varias cadenas. Si tus tokens están bloqueados ya están en la P-Chain, por lo que no necesitas realizar la transferencia de la blockchain cruzada de la X-Chain a la P-Chain.**

![Imagen para correo](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Ingresa la cantidad que deseas transferir a tu P-Chain y completa la transferencia haciendo clic en el botón "Transfer" de abajo.

![Imagen para correo](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

Voilá!

![Imagen para correo](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Ahora, tenemos nuestros fondos listos para staking en la P-Chain. A continuación, puedes añadir un validador o un delegador a tu wallet.

### **Paso 3A: Conviértete en un validador!**<a id="60f0"></a>

Para añadir un validador, necesitamos tener un nodo ejecutándose. Podemos configurar una que usa los [binarios](https://github.com/ava-labs/avalanchego/releases/) liberados o crearlos desde el [código de fuente de AvalancheGo](https://github.com/ava-labs/avalanchego).

El uso de los binarios es fácil y conveniente y te prepara para ser un validador en 4 pasos:

* Descargar la última versión tar.gz \(zip para los osx y las ventanas\) encontrada [aquí](https://github.com/ava-labs/avalanchego/releases)
* Descomprimelo en una de las siguentes carpetas:

\* Linux: tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX: unzip avalanchego-macos-<VERSION>.zip

\* Windows: avalanchego-win-<VERSION>.zip

* Navega hasta el directorio de binarios cd avalanchego-<VERSION>
* Ejecuta el binario con ./avalanchego en Linux y OSX y AvalancheGo en Windows

Dejaremos que nuestro nodo arranque y se sincronice con el resto de la red, y estamos listos para seguir.

Necesitaremos la ID de nuestro Nodo. Encontremos que usando la [información API](../../avalanchego-apis/info-api.md)!

Si necesitas alguna ayuda para crear tu nodo, únete a nosotros en [Discord](https://chat.avax.network/).

![Imagen para correo](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

Rellena los campos y confirma!

![Imagen para correo](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Consulta cuidadosamente los detalles, y haz clic en "Confirmar" de nuevo!

![Imagen para correo](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Felicitaciones. ¡Ahora estás validando en la Red Primaria de Avalanche!

### **Paso 3B: ¡Añada un Delegador!**<a id="59bd"></a>

![Imagen para correo](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Selecciona un validador con el que quieras delegar tus tokens de la lista de validadores de red activos.

![Imagen para correo](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Especifica el período de stake y la cantidad. Presta atención a la hora de finalización del validador seleccionado. Su período de delegación no puede ser configurado para que termine después de la fecha de finalización que el validador ha establecido.

![Imagen para correo](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirma los detalles!

![Imagen para correo](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Felicitaciones. ¡Ahora estás delegando en la Red Primaria de Avalanche!

