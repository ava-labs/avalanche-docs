# Crear NFTs con la Cartera Avalanche

## Tokens no fungibles en Avalanche

[Avalanche](../platform/) apoya nativamente la creación de activos digitales, incluidos activos de límite fijo, activos de límite variable y fichas no fungibles \(NFTs\).

Algunos activos son fungibles, lo que significa que todas las unidades de ese activo son perfectamente intercambiables. Las notas de una moneda son fungible, por ejemplo: una nota de $5 es la tratada igual que cualquier otra nota de $5. Algunos activos, por el contrario, no son fungibles. Es decir, los elementos no son únicos e perfectamente intercambiables. El inmueble no es fungible porque cada pedazo de tierra es distinto.

Las fichas no fungibles son una forma útil de representar la prueba de la propiedad de un activo único.

## NFT Studio en Avalanche Wallet

El **estudio NFT** en la [cartera de Avalanche](https://wallet.avax.network/) se puede utilizar para crear NFTs. En este tutorial crearemos un activo **Collectible**: un NFTs genérico con una imagen y una descripción, o con una carga útil personalizada. Puede crearlos utilizando un simple punto y una interfaz de clic y no se requiere ningún conocimiento técnico.

Para acceder al **estudio NFT** entra en la Cartera Avalanche. En el lado izquierdo, seleccione **Estudio**:

![NFT Studio](../../../.gitbook/assets/nft-studio-01-select.png)

Esto abre el estudio NFT. Hay dos opciones: **Nueva Familia**, para la creación de una nueva familia de NFTs, y **Mint Collectible** para crear nuevos activos en las familias existentes. Necesitamos crear nuestra primera familia de NFTs, así que haga clic **en Nueva Familia**.

### Crear Familia NFT

Allí se le pedirá que introduzca el nombre de su familia coleccionable, así como un símbolo \(ticker\). Los nombres no tienen que ser únicos.

![Crear nueva familia](../../../.gitbook/assets/nft-studio-02-family.png)

También tendrá que introducir un valor para **Número de Grupos**, que especifica cuántos coleccionables distintos que tienen la familia recién creada. Elija cuidadosamente, porque una vez creado, los parámetros de la familia coleccionable no pueden cambiar.

Cuando termines, presione **Crear** para crear la familia coleccionable. La tarifa de transacción se deducirá del saldo de su billetera. Cuando se crea la familia, verá el ID de transacción \(TxID\), así como los parámetros para la familia. Puede utilizar el TxID para buscar la transacción en [el explorador](https://explorer.avax.network/), pero no es necesario anotarlo.

Presione **Volver a Studio** para volver, y estamos listos para crear nuestros primeros coleccionables. Prensa **Collectible**.

### Mint NFTS

Después de presionar **Mint Collectible** se le presentará una lista de todas las familias coleccionables que todavía tienen grupos coleccionables que no han sido creados todavía.

![Seleccione una familia](../../../.gitbook/assets/nft-studio-03-select-family.png)

Seleccione la familia que creó antes. Se le pedirá que llene un formulario con los parámetros del nuevo coleccionable.

![Mint Collectible](../../../.gitbook/assets/nft-studio-04-mint.png)

De forma predeterminada, se seleccionará un tipo **genérico** de coleccionable. Es un NFT que tiene un **Título**, una **URL** para la imagen y una **Descripción**. Introduzca los datos requeridos, así como la **Cantidad**, que determinará cuántas copias del coleccionable se crean. Como antes, introduzca los datos cuidadosamente: no podrá cambiar nada una vez que se acuñen las fichas de datos. Verás una vista previa de los datos en los que puedes comprobar cómo se verá tu coleccionable.

Si desea tener algo más además de una imagen coleccionable, seleccione **Personalidad**.

![Collectable personalizado](../../../.gitbook/assets/nft-studio-05-custom.png)

Un coleccionable personalizado puede contener una cadena codificada **UTF-8**, una **URL** o una carga útil **JSON**. El tamaño de los datos no puede superar los 1024 bytes.

Cuando termines, presione a **Mint** para crear lo coleccionable. La tarifa de transacción se deducirá de su billetera, y un coleccionable recién creado se colocará en su billetera.

### Vea sus coleccionables

Una visión general de tus coleccionables siempre es visible en la parte superior de la pantalla, junto con tus equilibrios.

![Descripción general](../../../.gitbook/assets/nft-studio-06-overview.png)

Para ver sus coleccionables con más detalle, seleccione **Cartera** del menú de la izquierda. Se le presentará una pantalla que muestra todos sus activos, con fichas seleccionadas de forma predeterminada. Cambie la selección a **Collectibles** haciendo clic en la pestaña correspondiente.

![Lista de coleccionables](../../../.gitbook/assets/nft-studio-07-collectibles.png)

Para cada colección genérica, se mostrará una imagen, junto con el título, y el número que indica cuántas copias del coleccionable están en su cartera. Coloque sobre el coleccionable con su puntero mostrará la descripción detallada:

![Detalles coleccionables](../../../.gitbook/assets/nft-studio-08-detail.png)

Si selecciona un coleccionable haciendo clic en él, verá a qué grupo pertenece, su cantidad, junto con el botón **Enviar** .

## Enviar NFTs

Para enviar su coleccionable a alguien, haga clic en el botón **Enviar** en el coleccionable seleccionado en la Cartera, o navegue a **Enviar** pestaña en el menú lateral izquierdo y haga clic en **Agregar Collectible**:

![Elegir los coleccionables](../../../.gitbook/assets/nft-studio-09-send.png)

Se le presentará un menú para seleccionar un coleccionable que desea enviar.

![Múltiples coleccionables](../../../.gitbook/assets/nft-studio-10-multiple.png)

Puede enviar múltiples coleccionables en una sola transacción. Al hacer clic en la etiqueta del coleccionable le permitirá editar el número de copias que desea enviar. Puede enviar varias familias y tipos coleccionables en una sola transacción.

Cuando haya introducido la dirección de destino, presione **Confirme** para iniciar la transacción.

![Transacción](../../../.gitbook/assets/nft-studio-11-send-transaction.png)

Después de presionar **Enviar** Transacción, se publicará en la red, y la tarifa de transacción se deducirá de su balance. Los coleccionables se depositarán en la dirección de destino poco después.

## Resumen

Ahora puede crear familias NFT, grupos de menta NFT y enviar NFTs. ¡Diviértete! Asegúrate de compartir tus creaciones con nosotros en nuestros [canales de redes sociales](https://www.avalabs.org/social)!

Si desea saber el fondo técnico de cómo funcionan los NFTs en la red Avalanche o desea construir productos utilizando NFTs, por favor consulte este [tutorial NFT](creating-a-nft-part-1.md). Si tiene preguntas técnicas, contacte con nosotros en nuestro servidor [de](https://chat.avalabs.org/) Discordia.

