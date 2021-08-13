# Toma AVAX, mediante la validación o delegación, con la Cartera Avalanche

## **Introducción**<a id="001f"></a>

La cartera de Avalanche es una aplicación basada en web sin middleware o cualquier tipo de comunicación de servidor. La cartera de Avalanche está escrita en Vue JS y puede ser accedida en línea o compilada y ejecutada localmente.

Se puede acceder [a](https://wallet.avax.network/) la cartera de Avalanche aquí.   El código fuente de la cartera de Avalanche se puede encontrar [aquí](https://github.com/ava-labs/avalanche-wallet).

**¡Vamos a conseguir el staking!**

### **Paso 1 — Abra la Cartera Avalanche**<a id="552d"></a>

![Imagen para post](https://miro.medium.com/max/1552/0*tpBIOjLdppuNKMjA)

Puede acceder a su cartera utilizando su frase clave, archivo de keystore o Ledger Nano S \(próximamente) \)

### **Paso 2 — Navegar a la sección "Ganar"**<a id="dc5a"></a>

![Imagen para post](https://miro.medium.com/max/1504/0*XTh3nZzBI1bkLbwO)

**Para jugar, necesita tener sus fondos disponibles en la** [**cadena de plataforma \(P-Chain\)**](../../../learn/platform-overview/#platform-chain-p-chain)**! Si sus fondos están en la** cadena [**de intercambio \(X-Chain\)**](../../../learn/platform-overview/#exchange-chain-x-chain)**, necesitaremos transferirlos a la cadena P iniciando una transferencia de cadena cruzada. Si tus fichas están bloqueadas, ya están en la cadena P, por lo que no necesitas realizar la transferencia de cadena cruzada de cadena X a cadena P-Chain.**

![Imagen para post](https://miro.medium.com/max/1522/0*xKAf0nXSzqIdmBDg)

Introduzca el importe que desea transferir a su cadena P y complete la transferencia haciendo clic en el botón "Transfer".

![Imagen para post](https://miro.medium.com/max/1488/0*aremeYNYtKP5nGPx)

¡Voila!

![Imagen para post](https://miro.medium.com/max/1512/0*XP8f8CISy-LJ_Lc3)

Tenemos nuestros fondos listos para la cadena P. A continuación, puede agregar un validador o un delegado a su cartera.

### **Paso 3A: Conviértete en validador!**<a id="60f0"></a>

Para añadir un validador, necesitamos tener un nodo en marcha. Podemos configurar uno utilizando los [binarios](https://github.com/ava-labs/avalanchego/releases/) liberados o construirlos desde el [código fuente](https://github.com/ava-labs/avalanchego) AvalancheGo.

Usar los binarios es fácil y conveniente y te establece para ser un validador en 4 pasos:

* Descargar el último lanzamiento tar.gz \(cremallera para los osx y ventanas\) que se encuentra [aquí](https://github.com/ava-labs/avalanchego/releases)
* Desempaquetar en una carpeta de nuestra elección:

\* Linux: tar -xvf avalanchego-linux-<VERSION>.tar.gz

\* OSX: OSX: avalanchego-macos-<VERSION>.zip

\* Windows: Windows: avalanchego-win-<VERSION>.zip

* Navegar al directorio binarios cd avalanchego-<VERSION>
* Ejecute el binario con ./avalanchego en Linux y OSX y AvalancheGo en Windows

Dejaremos que nuestro bootstrap de nodo y sync con el resto con la red, y estamos listos para rodar.

Necesitaremos nuestra identificación de Node. ¡Encontremos que usando la [API de información](../../avalanchego-apis/info-api.md)!

Si necesita ayuda para configurar su nodo, únete a nosotros en [Discord](https://chat.avax.network/).

![Imagen para post](https://miro.medium.com/max/1600/0*6hZSaT651Dd7R4bL)

¡Llene los campos y confirma!

![Imagen para post](https://miro.medium.com/max/1600/0*cy61ZMDY5veMvCZj)

Compruebe cuidadosamente los detalles, y haga clic en "Confirmar" de nuevo!

![Imagen para post](https://miro.medium.com/max/1600/0*f3GlN03He6TFkOV7)

Enhorabuena. ¡Ahora está validando la Red Primaria Avalanche!

### **Paso 3B: ¡Añade un Delegador!**<a id="59bd"></a>

![Imagen para post](https://miro.medium.com/max/1600/0*f-wXi2SiSm4eBmHt)

Seleccione un validador con el que desea delegar sus fichas en la lista de validadores de red activos.

![Imagen para post](https://miro.medium.com/max/1600/0*uNnT2PtjCslRKFbF)

Especifique su período de fijación y cantidad de estaca. Preste atención al final del tiempo del validador seleccionado. No se puede establecer que el período de delegación termine la fecha final que el validador haya establecido.

![Imagen para post](https://miro.medium.com/max/1600/0*M_6_7L9jtYuPTp-A)

Confirme los detalles!

![Imagen para post](https://miro.medium.com/max/1600/0*Silj8-uZTm5g9xSi)

Enhorabuena. ¡Ahora estás delegando la Red Primaria Avalanche!

