---
etiquetas: [Propuestas de la Comunidad Avalanche, ACPs]
descripción: Una Propuesta de la Comunidad Avalanche es un documento conciso que introduce un cambio o una mejor práctica para su adopción en la Red Avalanche. Las ACPs deben proporcionar especificaciones técnicas claras de cualquier propuesta y una justificación convincente para su adopción. Las ACPs son un marco abierto para proponer mejoras y reunir consenso en torno a los cambios en la Red Avalanche. Cualquier persona puede proponer ACPs.
palabras clave:
  [
    avalanche,
    nodos,
    preferencia,
    mejoras avalanche,
    código abierto,
    acps,
    propuestas de la comunidad avalanche,
  ]
sidebar_label: Propuestas de la Comunidad Avalanche
sidebar_position: 0
---

# ¿Qué es una Propuesta de la Comunidad Avalanche (ACP)?

[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" width="30" height="30"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>](https://github.com/avalanche-foundation/ACPs)

Una Propuesta de la Comunidad Avalanche es un documento conciso que introduce un cambio o una mejor práctica para su adopción en la [Red Avalanche](https://www.avax.com). Las ACPs deben proporcionar especificaciones técnicas claras de cualquier propuesta y una justificación convincente para su adopción.

Las ACPs son un marco abierto para proponer mejoras y reunir consenso en torno a los cambios en la Red Avalanche. Cualquier persona puede proponer ACPs y se fusionarán en este repositorio siempre que estén bien formateadas y sean coherentes. Una vez que una abrumadora mayoría de la Red/Comunidad Avalanche ha [señalado su apoyo a una ACP](https://docs.avax.network/nodes/configure/avalanchego-config-flags#avalanche-community-proposals), puede programarse su activación en la Red Avalanche por parte de los Clientes de la Red Avalanche (ANCs). En última instancia, depende de los miembros de la Red/Comunidad Avalanche adoptar las ACPs que apoyan ejecutando un ANC compatible, como [AvalancheGo](https://github.com/ava-labs/avalanchego).

## Pistas de ACP

Hay tres tipos de ACP:

- Una ACP de `Pista de Estándares` describe un cambio en el diseño o la función de la Red Avalanche, como un cambio en el protocolo de red P2P, el diseño de la Cadena-P, la arquitectura de las Subredes, o cualquier cambio/adición que afecte a la interoperabilidad de los Clientes de la Red Avalanche (ANCs).
- Una ACP de `Pista de Mejores Prácticas` describe un patrón de diseño o una interfaz común que se debe utilizar en toda la Red Avalanche para facilitar la integración con Avalanche o para que las Subredes interoperen entre sí. Esto incluiría cosas como proponer una interfaz de contrato inteligente, no proponer un cambio en cómo se ejecutan los contratos inteligentes.
- Una ACP de `Pista Meta` describe un cambio en el proceso de las ACPs o sugiere una nueva forma para que la Comunidad Avalanche colabore.
- Una ACP de `Pista de Subred` describe un cambio en una Subred en particular. Esto incluiría cosas como cambios de configuración o actualizaciones coordinadas de la Subred.

## Estados de las ACPs

Hay cuatro estados de una ACP:

- Una ACP `Propuesta` se ha fusionado en la rama principal del repositorio de ACPs. Se está discutiendo activamente por la Comunidad Avalanche y puede modificarse en función de los comentarios.
- Una ACP `Implementable` se considera "lista para su implementación" por parte del autor y ya no cambiará significativamente en

El autor debe primero intentar determinar si hay apoyo para su idea publicando en la categoría "Ideas" de las Discusiones de GitHub. Vetar una idea públicamente antes de llegar tan lejos como escribir un ACP tiene como objetivo ahorrar tiempo tanto al autor potencial como a la comunidad Avalanche en general. Preguntar primero a la comunidad Avalanche si una idea es original ayuda a evitar que se gaste demasiado tiempo en algo que está garantizado a ser rechazado basado en discusiones previas (buscar en Internet no siempre funciona). También ayuda a asegurar que la idea sea aplicable a toda la comunidad y no solo al autor. Pequeñas mejoras o parches a menudo no necesitan estandarización entre múltiples proyectos; estos no necesitan un ACP y deben ser inyectados en el flujo de trabajo de desarrollo relevante con una presentación de parche al rastreador de problemas ANC aplicable.

### Paso 2: Proponer un ACP a través de una solicitud de extracción (PR)

Una vez que el autor se siente seguro de que una idea tiene una buena oportunidad de ser aceptada, se debe redactar un ACP y enviarlo como una solicitud de extracción (PR). Este borrador debe estar escrito en estilo ACP como se describe a continuación. Se recomienda encarecidamente que un solo ACP contenga una sola propuesta clave o una nueva idea. Cuanto más enfocado esté el ACP, más éxito tiende a tener. Si tienes dudas, divide tu ACP en varios enfoques bien definidos. El número de PR del ACP se convertirá en su número asignado.

### Paso 3: Construir consenso en las Discusiones de GitHub y proporcionar una implementación (si corresponde)

Los ACPs serán fusionados por los mantenedores de ACPs si la propuesta está generalmente bien formateada y coherente. Los editores de ACPs intentarán fusionar cualquier cosa que valga la pena discutir, independientemente de la viabilidad o complejidad, que no sea un duplicado o esté incompleto. Después de que un ACP se fusiona, se abrirá una Discusión oficial de GitHub para el ACP y se vinculará a la propuesta para su discusión comunitaria. Se recomienda que el autor o miembros de la Comunidad Avalanche de apoyo publiquen un resumen no técnico acompañante de su ACP para consumo general en esta Discusión de GitHub. El ACP debe ser revisado y ampliamente apoyado antes de que se inicie una implementación de referencia, nuevamente para evitar desperdiciar el tiempo del autor y de la comunidad Avalanche, a menos que una implementación de referencia ayude a las personas a estudiar el ACP.

### Paso 4: Marcar el ACP como `Implementable` a través de una solicitud de extracción (PR)

Una vez que un ACP es considerado completo por el autor, debe ser marcado como `Implementable`. En este punto, todas las preguntas abiertas deben ser abordadas y se debe proporcionar una implementación de referencia asociada (si corresponde). Como se mencionó anteriormente, la Fundación Avalanche se reúne periódicamente para recomendar la ratificación de ACPs específicos, pero en última instancia, depende de los miembros de la Red/Comunidad Avalanche adoptar los ACPs que apoyan ejecutando un Cliente de Red Avalanche compatible (ANC), como [AvalancheGo](https://github.com/ava-labs/avalanchego).

### [Opcional] Paso 5: Marcar el ACP como `Stale` a través de una solicitud de extracción (PR)

Un ACP puede ser reemplazado por un ACP diferente, volviendo el original obsoleto. Si esto ocurre, el ACP original se marcará como `Stale`. Los ACPs también pueden ser marcados como `Stale` si el autor abandona el trabajo en él durante un período prolongado de tiempo (12+ meses). Los ACPs pueden ser reabiertos y movidos de vuelta a `Proposed` si el autor reinicia el trabajo.

## ¿Qué debe incluir un ACP exitoso?

Cada ACP debe tener las siguientes partes:

- `Preambulo`: Tabla en formato Markdown que contiene metadatos sobre el ACP, incluyendo el número del ACP, un título descriptivo corto, el autor y opcionalmente la información de contacto de cada autor, etc.
- `Resumen`: Descripción concisa (~200 palabras) del ACP
- `Motivación`: Justificación para adoptar el ACP y el problema/especificidad/oportunidad específica que aborda
- `Especificación`: Descripción completa de la semántica de cualquier cambio que permita a cualquier miembro de la ANC/Comunidad Avalanche implementar el ACP
- `Consideraciones de seguridad`: Implicaciones de seguridad del ACP propuesto

Cada ACP puede tener las siguientes partes:

- `Preguntas abiertas`: Preguntas que deben resolverse antes de la implementación

Cada ACP de `Ruta de estándares` debe tener las siguientes partes:

- `Compatibilidad hacia atrás`: Lista de cambios incompatibles hacia atrás requeridos para implementar el ACP y su impacto en la Comunidad Avalanche
- `Implementación de referencia`: Código, documentación y telemetría (de una red local) del cambio de ACP

Cada ACP de `Ruta de mejores prácticas` puede tener las siguientes partes:

- `Compatibilidad hacia atrás`: Lista de cambios incompatibles hacia atrás requeridos para implementar el ACP y su impacto en la Comunidad Avalanche
- `Implementación de referencia`: Código, documentación y telemetría (de una red local) del cambio de ACP

### Formatos y plantillas de ACP

Cada ACP tiene asignado un subdirectorio único en el directorio `ACPs`. El nombre de este subdirectorio debe tener la forma `N-T` donde `N` es el número del ACP y `T` es el título del ACP con cualquier espacio reemplazado por guiones. Los ACPs deben estar escritos en formato [markdown](https://daringfireball.net/projects/markdown/syntax) y almacenados en `ACPs/N-T/README.md`. Por favor, consulta la [plantilla de ACP](https://github.com/avalanche-foundation/ACPs/blob/main/ACPs/TEMPLATE.md) para ver un ejemplo del diseño correcto.

### Archivos auxiliares

Los ACPs pueden incluir archivos auxiliares como diagramas o fragmentos de código. Dichos archivos deben almacenarse en el subdirectorio del ACP (`ACPs/N-T/*`). No hay una convención de nomenclatura requerida para los archivos auxiliares.

### Derechos de autor renunciados

Los autores de los ACPs deben renunciar a cualquier reclamo de derechos de autor antes de que un ACP se fusione en el repositorio. Esto se puede hacer incluyendo el siguiente texto en un ACP:

```text
## Derechos de autor

Derechos de autor y derechos relacionados renunciados a través de [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
```

## Contribuciones

Antes de contribuir a los ACPs, por favor lee los [Términos de Contribución de los ACPs](https://github.com/avalanche-foundation/ACPs/blob/main/CONTRIBUTING.md).