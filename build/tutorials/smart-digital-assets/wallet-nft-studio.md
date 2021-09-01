# Acuña NFTs con la Wallet de Avalanche

## Tokens No Fungibles en Avalanche

[Avalanche](../platform/) nativamente admite la creación de activos digitales, incluyendo activos de capitalización fija, activos de límite variable y tokens no fungibles \(NFT\).

Algunos activos son fungibles, lo que significa que todas las unidades de ese activo son perfectamente intercambiables. Las notas de una moneda son fungibles, por ejemplo: una nota de 5 dólares es el tratado igual que cualquier otra nota de 5 dólares. Algunos activos, por el contrario, no son fungibles. Es decir, los elementos no son únicos e perfectamente intercambiables. Real estatura es no fungible porque cada pedazo de tierra es distinto.

Los tokens no fungibles son una forma útil de representar una prueba de propiedad de un activo único.

## NFT Studio en la Wallet de Avalanche

El estudio **NFT en la [billetera](https://wallet.avax.network/) **de Avalanche puede ser usado para crear NFT. En este tutorial crearemos un activo ****coleccionable: un NFT genérico con una imagen y una descripción, o con una carga útil personalizada. Puedes crearlos usando un punto simple y haz clic en la interfaz y no se requiere conocimiento técnico.

Para acceder al **estudio de NFT y iniciar sesión en la billetera **de Avalanche. En el lado izquierdo, selecciona ****Studio:

![NFT Studio](../../../.gitbook/assets/nft-studio-01-select.png)

Esto abre el estudio NFT Hay dos opciones: **Nueva **familia, para la creación de una nueva familia de NFT, y **Mint Collectible **para crear nuevos activos en las familias existentes. Necesitamos crear nuestra primera familia de NFT, así que haz clic en **Nueva **Familia.

### Crear la Familia NFT

Allí se te pedirá que introduzcas el nombre, así como un símbolo \(ticker\). Los nombres no tienen que ser únicos.

![Crea nueva familia](../../../.gitbook/assets/nft-studio-02-family.png)

También tendrás que introducir un valor para el **número de **grupos, que especifica cuántos coleccionables diferentes que mantiene la familia recién creada. Elige con cuidado, porque una vez creada, los parámetros no pueden ser cambiados.

Cuando hayas terminado, **presiona Crear **crear la familia coleccionable. La comisión por la transacción se deducirá del saldo de su wallet. Cuando se cree la familia, verás el ID de la transacción \(TxID\), así como los parámetros de la familia. Puedes usar el TxID para buscar la transacción en [el explorador](https://explorer.avax.network/), pero no es necesario escribirlo hacia la redacción.

Prensa de **regreso al estudio para regresar y estamos listos **para crear nuestros primeros coleccionables. ****Prensa

### Acuñar NFTs

**Después de presionar **Mint Coleccionable te presentarán una lista de todas las familias coleccionables que todavía tienen grupos coleccionables que no han sido creados todavía.

![Selecciona una familia](../../../.gitbook/assets/nft-studio-03-select-family.png)

Selecciona la familia que creaste antes. Te pedirán que llene un formulario con los parámetros de la nueva coleccionable.

![Acuña un coleccionable](../../../.gitbook/assets/nft-studio-04-mint.png)

De forma predeterminada, se seleccionará un **tipo **genérico de coleccionable Esa es una NFT que tiene un ****título, una **URL **para la imagen y una ****Descripción. Introduce los datos requeridos, así como la ****Cantidad, que determinará cuántas copias del coleccionable se crean. Como antes, introduce los datos cuidadosamente: no podrás cambiar nada una vez que los tokens sean acuñados. Verás una vista previa de los datos donde puedes comprobar cómo te mostrarás tu coleccionable.

Si quieres tener algo más además de una imagen coleccionable, selecciona la ****personalizada.

![Coleccionable personalizado](../../../.gitbook/assets/nft-studio-05-custom.png)

Un coleccionable personalizado puede contener una cadena de **codificación **UTF-8, una ****URL o una carga útil ****JSON. El tamaño de los datos no puede superar los 1024 bytes.

Cuando hayas terminado, presiona Acuñar **acuñar **para crear lo coleccionable. La tarifa de transacción se deducirá de tu billetera, y un coleccionable recién creado se colocará en tu billetera.

### Mira Tus Coleccionables

En la parte superior de la pantalla siempre se puede ver un resumen de tus coleccionables, junto con tus saldos.

![Descripción](../../../.gitbook/assets/nft-studio-06-overview.png)

Para ver tus coleccionables en más detalles, selecciona **Portfolio **desde el menú de lado izquierdo. Te aparecerá una pantalla que muestra todos tus bienes, con tokens seleccionados por defecto. Cambia la selección a los **coleccionables **haciendo clic en la pestaña correspondiente.

![Lista de coleccionables](../../../.gitbook/assets/nft-studio-07-collectibles.png)

Para cada coleccionable genérico, se mostrará una imagen, junto con el título, y el número que indica cuántas copias del coleccionable hay en tu wallet. Colocando el puntero sobre el coleccionable se mostrará la descripción detallada:

![Detalles coleccionables](../../../.gitbook/assets/nft-studio-08-detail.png)

Si selecciona un coleccionable al hacer clic en él, verás qué grupo pertenece, su cantidad, junto con el botón ****Sando.

## Enviar NFTs

**Para enviar tu coleccionable a alguien, o haz clic en el **botón Send en el coleccionable seleccionado en la Portfolio, o navega **Send la **pestaña en el menú de lado izquierdo y haz clic en **Agregar **coleccionable:

![Elegir los coleccionables](../../../.gitbook/assets/nft-studio-09-send.png)

Se te presentará un menú para seleccionar un coleccionable que desees enviar.

![Coleccionables múltiples](../../../.gitbook/assets/nft-studio-10-multiple.png)

Puedes enviar varios coleccionables en una sola transacción. Al hacer clic en la etiqueta del coleccionable, podrás editar el número de copias que deseas enviar. Puedes enviar varias familias y tipos de coleccionables en una sola transacción.

Cuando has introducido la dirección de destino, presiona **Confirma **iniciar la transacción.

![Transacción](../../../.gitbook/assets/nft-studio-11-send-transaction.png)

**Después de presionar **Send Transaction, se publicará en la red, y la tarifa de transacción se deducirá de tu equilibrio. Los coleccionables serán depositados en la dirección de destino casi inmediatamente.

## Resumen

Ahora puedes crear familias NFT, acuñar grupos NFT y enviar NFT. ¡Diviértanse! Asegúrate de compartir tus creaciones con nosotros en nuestros canales de [redes sociales.](https://www.avalabs.org/social)

Si quieres saber el fondo técnico de cómo funcionan los NFTs en la red de Avalanche o quieres crear productos usando NFT, por favor mira este [tutorial](creating-a-nft-part-1.md) de NFT. Si tienes preguntas técnicas, contacta con nosotros en nuestro servidor de [Discord](https://chat.avalabs.org/)

