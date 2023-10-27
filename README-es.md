# Avalanche Docs

<div align="center">
  <img src="static/AvalancheLogoRed.png?raw=true">
</div>

---

## Resumen

Este repositorio contiene el contenido para la Documentación del Desarrollador de Avalanche
desplegada en [https://docs.avax.network](https://docs.avax.network).

El sitio está construido usando [Docusaurus 2](https://docusaurus.io/).

## Contribuir

¡Contribuir al sitio de documentación es una excelente manera de involucrarse con la comunidad de desarrollo de Avalanche!
Así es cómo empezar:

### Arreglos Rápidos

Para pequeños errores tipográficos o correcciones, es fácil contribuir sin necesidad de clonar/bifurcar el
repositorio. Simplemente:

- Desplázate hasta el final de la página y haz clic en "Editar esta página"
- Hacer un fork del repositorio
- Anotar la ruta en la parte superior de la página
  (por ejemplo: `avalanche-docs/docs/learn/avalanche/intro.md`)
- Hacer clic en "Cancel changes"
- Navegar a la ruta de la página en español
  (`avalanche-docs/i18n/es/docusaurus-plugin-content-docs/current/learn/avalanche/intro.md`)
- Hacer clic en "Edit this file"
- Realiza los cambios en la página directamente en la interfaz gráfica de Github
- Haz clic en "Commit changes ..."
- Edita el `commit message` para describir el cambio en 4 palabras o menos,
  e incluye cualquier detalle adicional en la descripción
- Haz clic en "Sign off and commit changes" para crear una solicitud de extracción con tus cambios propuestos

![](https://github.com/ava-labs/avalanche-docs/blob/master/static/img/quick-edit-readme.gif)

### Nuevo Contenido o Cambios Extensos

Para proponer nueva documentación o ediciones grandes a nuestras páginas existentes, sigue los pasos correspondientes:

- **Miembros de la Organización de Github de Ava Labs:** Clona el repositorio
  `git clone https://github.com/ava-labs/avalanche-docs.git`
- **Contribuidores Externos:** Bifurca el repositorio a través de la interfaz gráfica de GitHub
- Haz checkout a una nueva rama `git checkout -b <tu-nombre/nombre-de-la-rama>`
- Realiza los cambios en tu rama
- `git add .`
- **`yarn build` para asegurarte de que la construcción pase**
- `git push`
- Ve a [GitHub](https://github.com/ava-labs/avalanche-docs)
  y abre una nueva solicitud de extracción

### Estructura y Sintaxis

- La documentación se encuentra en el directorio [docs](docs). La ruta de un documento corresponde
  con su extensión de dominio. Por ejemplo: la guía que muestra cómo
  [Ejecutar un Nodo Avalanche Manualmente](https://docs.avax.network/nodes/run/node-manually)
  se encuentra en este repositorio en `docs/nodes/run/node-manually`, y está alojada en
  [https://docs.avax.network/nodes/run/node-manually](https://docs.avax.network/nodes/run/node-manually).
- La barra lateral izquierda de la página está controlada principalmente por
  [sidebars.json](sidebars.json), donde las subsecciones a veces se ordenan por su
  campo de metadatos [`sidebar_position`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#sidebar_position).
- Nuestra guía de estilo se puede encontrar [aquí](style-guide.md).
- Este repositorio utiliza una serie de herramientas de verificación de estilo, linting y formateo. Consulta
  [style-checker-notes.md](style-checker-notes.md) para más detalles y cómo corregir los errores.
- Todos los archivos de imagen deben incluirse en
  [static/img/<subdirectorio-correspondiente>](static/img).
- La documentación extensa de Docusaurus se puede encontrar [aquí](https://docusaurus.io/docs).

### Solicitud de Extracción (PR)

- Todas las PR deben hacerse contra la rama `master`.
- Después de una construcción exitosa, Cloudflare Pages comentará en la PR con un enlace a
  \*.avalanche-docs.pages.dev donde puedes verificar tus cambios.
- Una vez que tu PR se haya fusionado en `master`, [https://docs.avax.network/](https://docs.avax.network/)
  se actualizará con tus cambios.

### Instalación

```zsh
yarn
```

### Desarrollo Local

```zsh
yarn start
```

Este comando inicia un servidor de desarrollo local y abre una ventana del navegador. La mayoría de los cambios se reflejan en vivo sin tener que reiniciar el servidor.

### Construcción

```zsh
yarn build
```

Este comando genera contenido estático en el directorio `build` y puede ser servido utilizando cualquier servicio de alojamiento de contenido estático.

**Por favor, asegúrate de ejecutar este comando para ver si hay algún error en la construcción del paquete,**
**y arréglalos antes de empujar tus cambios.**

## Búsqueda

La búsqueda está alimentada por Algolia y el archivo de configuración se encuentra
[aquí](https://github.com/algolia/docsearch-configs/blob/master/configs/avax.json).

## Solicitudes de Nuevo o Faltante Contenido

_La información que estoy solicitando está relacionada con un proyecto específico, es decir, AvalancheGo, AvalancheNetworkRunner, etc.:_

- Por favor, levanta un **Issue de Documentación Faltante** en el repositorio de GitHub de ese proyecto y
  detalla minuciosamente tu solicitud. Incluye referencias a cualquier página existente relevante para tu
  solicitud.

_La información que estoy solicitando es de naturaleza explicativa y actualmente no existe:_

- Por favor, abre un nuevo [Issue](https://github.com/ava-labs/avalanche-docs/issues/new/choose)
  en este repositorio y detalla minuciosamente tu solicitud de acuerdo con la plantilla del issue.
  Si es urgente, por favor crea un nuevo ticket en el
  [Panel de Propuestas de Mejora de la Documentación de Desarrollo](https://github.com/orgs/ava-labs/projects/15/views/1).

_Información errónea o faltante en la documentación no relacionada con un proyecto específico necesita
edición:_

- Si entiendes lo suficiente el problema como para proporcionar una corrección, sigue los pasos
  [aquí](https://github.com/ava-labs/avalanche-docs#quick-fixes).
- Si no, levanta un [Issue](https://github.com/ava-labs/avalanche-docs/issues/new/choose).
