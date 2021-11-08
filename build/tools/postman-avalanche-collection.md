# Colección de Postman

## ¿Qué es Postman?

Postman es una herramienta gratuita que utilizan los desarrolladores para enviar de forma rápida y fácil solicitudes REST, SOAP y GraphQL y probar las API. Está disponible como herramienta en línea y como aplicación para Linux, MacOS y Windows. Postman permite realizar rápidamente llamadas a la API y ver las respuestas en un formato agradable que permite realizar búsquedas.

Hemos hecho una colección de Postman para [Avalanche](https://docs.avax.network), que incluye todas llamadas públicas a la API disponibles en [la instancia de AvalancheGo](../release-notes/avalanchego.md), lo que te permite emitir comandos rápidamente a tu nodo y ver la respuesta, sin tener que copiar y pegar largos y complicados`curl` comandos.

Además de la colección de API, también está el entorno de ejemplo de Avalanche para Postman, que define variables comunes como la dirección IP del nodo, tus direcciones de Avalanche y elementos comunes similares de las consultas, para que no tengas que introducirlos varias veces.

Ambos te permitirán vigilar fácilmente tu nodo, comprobar su estado y realizar consultas rápidas para conocer detalles sobre su funcionamiento.

## Configuración

### Instalación de Postman

Postman puede instalarse localmente o utilizarse como aplicación web. Recomendamos instalar la aplicación, ya que simplifica su funcionamiento. Puedes descargar Postman desde su [página web](https://www.postman.com/downloads/). Te recomendamos que te registres usando tu dirección de correo electrónico, ya que así tu espacio de trabajo puede tener respaldado y podrás compartirlo entre la aplicación web y la aplicación instalada en tu computadora.

![Descarga Postman](../../.gitbook/assets/postman_01_download.png)

Después de instalar la aplicación, ejecútala. Te pedirá que crees una cuenta o que inicies sesión. Hazlo. Repetimos, no es necesario, pero sí recomiendado.

### Importación de colecciones

Selecciona `New workspace` desde la pestaña Workspaces y sigue las indicaciones para crear un nuevo espacio de trabajo. Aquí es donde se hará el resto del trabajo.

![Nuevo espacio de trabajo](../../.gitbook/assets/postman_02_workspace.png)

Estamos listos para importar la colección. En el encabezado de la pestaña Worskspaces selecciona `New` y cambia a la pestaña `Link`.

![Importación de colección](../../.gitbook/assets/postman_03_import.png)

Pega el enlace a la colección en el campo de entrada de la URL:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman reconocerá el formato del contenido del archivo y ofrecerá importar el archivo como una colección. Completa la importación. Ahora tendrás la colección de Avalanche en tu Workspace.

![Contenido de la colección](../../.gitbook/assets/postman_04_collection.png)

### Importación de entorno

Luego, tenemos que importar las variables de entorno. Ahora, en el encabezado de la pestaña Worskspaces, selecciona `New`y cambia a la pestaña `Link`. Esta vez, pega el enlace al JSON del entorno:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman reconocerá el formato del archivo:

![Importación de entorno](../../.gitbook/assets/postman_05_environment.png)

Impórtalo a tu espacio de trabajo. Ahora, tenemos que editar ese entorno para que se ajuste a los parámetros reales de tu instalación particular. Estos son los parámetros que se diferencian de los valores predeterminados en el archivo importado.

Haz clic en el ícono de ojo junto al menú desplegable de entorno:

![Contenido del entorno](../../.gitbook/assets/postman_06_variables.png)

Selecciona el botón `Edit` para cambiar los valores predeterminados. Como mínimo, tendrás que cambiar la dirección IP de tu nodo, que es el valor de la variable `host`. Cámbialo a la IP de tu nodo (cambia los valores `initial` y `current`). Además, si tu nodo no se está ejecutando en la misma máquina donde instalaste Postman, asegúrate de que tu nodo está aceptando las conexiones en el puerto de la API desde el exterior marcando la [opción de línea de comandos](../references/command-line-interface.md#http-server) apropiada.

Ahora hemos completado todo y estamos listos para consultar el nodo.

## Realizar llamadas a la API

Abre uno de los grupos de llamadas de la API, por ejemplo `Health`. Haz clic en llamada `health`:

![Llamada de la API](../../.gitbook/assets/postman_07_making_calls.png)

Verás que el formato de la llamada utiliza las variables de entorno `http`, `host` y `port`. Haz clic en `Send`. Se enviará la solicitud y pronto verás la respuesta, en la pestaña `Body` en el `Response`:

![Respuesta](../../.gitbook/assets/postman_08_response.png)

Para ver la llamada real y las variables que se envían al nodo, cambia a la pestaña `Body` en las pestañas de llamada a la API. Allí puedes cambiar rápidamente las variables para ver la respuesta a diferentes consultas.

## Conclusión

Si completaste el tutorial, ahora puedes emitir llamadas a la API rápidamente desde tu nodo sin hacer contacto con los comandos curl en la terminal. Esto te permite ver rápidamente el estado de tu nodo, rastrear los cambios o volver a comprobar el estado o la vida de tu nodo.

## Contribución

Esperamos mantener esta colección actualizada continuamente con las [API de Avalanche](https://docs.avax.network/build/avalanchego-apis) y también agregar [visualizaciones de datos](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data). Si puedes ayudar a mejorar la colección de Postman de Avalanche de alguna manera, primero crea una rama de características derivando de `master`, luego haz las mejoras en tu rama de características y, por último, crea una [solicitud de extracción](https://github.com/ava-labs/avalanche-docs/pulls) para fusionar tu trabajo con el `master`.

Si tienes alguna otra pregunta o sugerencia,  [contáctanos](https://chat.avalabs.org/).

