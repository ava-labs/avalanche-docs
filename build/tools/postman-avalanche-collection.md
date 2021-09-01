# Colección Postman

## ¿Qué es Postman?

Postman es una herramienta gratuita utilizada por los desarrolladores para enviar rápidamente y fácilmente solicitudes de REST, SOAP y GraphQL y probar API. Está disponible como una herramienta en línea y una aplicación para Linux, MacOS y Windows. Postman te permite emitir rápidamente llamadas de API y ver las respuestas en una forma muy formateada y buscable.

Hemos hecho una colección de Postman para [Avalanche](https://docs.avax.network), que incluye todas las llamadas de API públicas disponibles en la [instancia](../release-notes/avalanchego.md) de AvalancheGo, que te permite emitir comandos rápidamente a tu nodo y ver la respuesta, sin tener que copiar y pegar comandos largos y `curl`complicados.

Junto con la colección API, también hay el ejemplo de entorno de Avalanche para Postman, que define variables comunes como la dirección IP del nodo, tus direcciones de Avalanche y elementos comunes similares de las consultas, por lo que no tienes que introducirlas varias veces.

Combinado, te permitirán mantener fácilmente pestañas en tu nodo, consultar en tu estado y hacer preguntas rápidas para averiguar detalles sobre su funcionamiento.

## Configuración

### Instalación de Postman

Postman puede ser instalado localmente o utilizado como una aplicación web. Recomendamos instalar la aplicación, ya que simplifica la operación. Puedes descargar Postman desde tu [sitio web](https://www.postman.com/downloads/). Se recomienda que te registres con tu dirección de correo electrónico ya que entonces tu espacio de trabajo puede ser fácilmente respaldado y compartido entre la aplicación web y la aplicación instalada en tu computadora.

![Descargar Postman](../../.gitbook/assets/postman_01_download.png)

Después de instalar la aplicación, ejecutarla. Te pedirá que crees una cuenta o te inicies sesión. Hazlo. Una vez más, no es necesario, pero recomendado.

### Importación de la colección

Selecciona de la pestaña de Workspaces y sigue las indicaciones para crear un nuevo espacio `New workspace`de trabajo. Esto hará el resto de la obra.

![Nuevo espacio de trabajo](../../.gitbook/assets/postman_02_workspace.png)

Estamos listos para importar la colección. En el encabezado de la pestaña de Worskspaces selecciona `New`y cambia a la `Link`pestaña.

![Colección de importación](../../.gitbook/assets/postman_03_import.png)

Allí, en el campo de entrada de URL pega el enlace a la colección:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Avalanche.postman_collection.json
```

Postman reconocerá el formato del contenido de archivo y ofrecerá importar el archivo como una colección. Completa la importación. Ahora tendrás la colección de Avalanche en tu espacio de trabajo.

![Contenido](../../.gitbook/assets/postman_04_collection.png)

### Importación de medio ambiente

A continuación, tenemos que importar las variables de entorno. Una vez más, el encabezado de la pestaña de Worskspaces selecciona `New`y cambia a la `Link`pestaña. Esta vez, pega el enlace al entorno JSON:

```text
https://raw.githubusercontent.com/ava-labs/avalanche-postman-collection/master/Example-Avalanche-Environment.postman_environment.json
```

Postman reconocerá el formato del archivo:

![Importación de medio ambiente](../../.gitbook/assets/postman_05_environment.png)

Importarlo a tu espacio de trabajo. Ahora, necesitaremos editar ese entorno para adaptarse a los parámetros reales de tu instalación particular. Estos son los parámetros que difieren de los valores por defecto en el archivo importado.

Haz clic en el icono de ojo al lado del entorno

![Contenido de medio ambiente](../../.gitbook/assets/postman_06_variables.png)

Selecciona el `Edit`botón para cambiar las faltas por defecto. Como mínimo, tendrás que cambiar la dirección IP de tu nodo, que es el valor de la `host`variable. Cambila a la IP de tu nodo \(cambia tanto el `initial`y los `current`valores\). Además, si tu nodo no se está ejecutando en la misma máquina donde instalaste Postman, asegúrate de que tu nodo esté aceptando las conexiones en el puerto de API desde fuera al revisar la [opción](../references/command-line-interface.md#http-server) de línea de comandos adecuada.

Ahora hemos ordenado todo y estamos listos para consultar el nodo.

## Hacer llamadas de API

`Health`Abre uno de los grupos de llamadas de la API, por ejemplo `getLiveness`Llamada de doble click:

![Llamada de API](../../.gitbook/assets/postman_07_making_calls.png)

`http`Verás ese formato de la llamada usa las variables `host`y del `port`entorno. Haz clic `Send`. La solicitud será enviada, y pronto verás la respuesta, en la pestaña en la `Body`pestaña siguiente:`Response`

![Respuesta](../../.gitbook/assets/postman_08_response.png)

Para ver la llamada real y las variables enviadas al nodo, cambia a la `Body`pestaña en las pestañas de llamadas de la API. Allí puedes cambiar rápidamente las variables para ver la respuesta a las diferentes consultas.

## Conclusión

Si has completado el tutorial, ahora eres capaz de emitir rápidamente llamadas de API a tu nodo sin meterte con los comandos de curl en la terminal. Esto te permite ver rápidamente el estado de tu nodo, rastrear cambios o comprobar la salud o la vida de tu nodo.

## Aportación

Esperamos mantener continuamente esta colección actualizada con las [API](https://docs.avax.network/build/avalanchego-apis) de Avalanche, y también añadir [visualizaciones](https://learning.postman.com/docs/sending-requests/visualizer/#visualizing-response-data) de datos. `master``master`Si eres capaz de ayudar a mejorar la colección de Avalanche Postman de cualquier manera, primero crea una rama de característica al ramificarse de , la siguiente haz las mejoras en tu rama de característica y por último crea una [solicitud](https://github.com/ava-labs/avalanche-docs/pulls) de tire para fusionar tu trabajo en .

Si tienes alguna otra pregunta o sugerencias, ven [a hablar con nosotros](https://chat.avalabs.org/).

