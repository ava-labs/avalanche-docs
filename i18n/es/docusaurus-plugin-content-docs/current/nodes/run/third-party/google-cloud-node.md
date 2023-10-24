---
tags: [Nodos]
description: Ejecuta un Nodo Avalanche en la Plataforma de Google Cloud.
sidebar_label: Google Cloud
pagination_label: Ejecutar un Nodo Avalanche con Google Cloud Platform
sidebar_position: 3
---

# Ejecutar un Nodo Avalanche con Google Cloud Platform

:::caution
Este documento fue escrito por un miembro de la comunidad, alguna información puede estar desactualizada.
:::

## Introducción

La Plataforma de Google Cloud (GCP) es una plataforma de alojamiento escalable, confiable y de confianza. Google opera una cantidad significativa de su propia infraestructura de red global. Su [red de fibra](https://cloud.google.com/blog/products/networking/google-cloud-networking-in-depth-cloud-cdn) puede proporcionar conectividad global altamente estable y consistente. En este artículo, aprovecharemos GCP para implementar un nodo en el que Avalanche pueda instalarse a través de [terraform](https://www.terraform.io/). Aprovechar `terraform` puede parecer excesivo, pero te distinguirá como operador y administrador, ya que te permitirá una mayor flexibilidad y proporcionará la base sobre la cual puedes construir fácilmente más automatización.

## Convenciones

- `Items` resaltados de esta manera son términos utilizados en GCP y se pueden buscar para obtener más referencias en la documentación de Google sobre sus productos en la nube.

## Notas importantes

- El tipo de máquina utilizado en esta documentación es solo de referencia y el tamaño real que uses dependerá completamente de la cantidad que se apueste y se delege al nodo.

## Descripción arquitectónica

Esta sección tiene como objetivo describir la arquitectura del sistema que los pasos en la sección de [Instrucciones de configuración](#instrucciones-de-configuración) implementan cuando se ejecutan. Esto se hace para que el ejecutor no solo pueda implementar la arquitectura de referencia, sino también comprender y potencialmente optimizarla para sus necesidades.

### Proyecto

Crearemos y utilizaremos un único `Proyecto` GCP para la implementación de todos los recursos.

#### Habilitación de servicios

Dentro de nuestro proyecto GCP, deberemos habilitar los siguientes servicios en la nube:

- `Compute Engine`
- `IAP`

### Redes

#### Red de cómputo

Implementaremos un único objeto de `Red de cómputo`. Esta unidad es donde implementaremos todos los objetos de red subsiguientes. Proporciona un límite lógico y un contexto de securitización en caso de que desees implementar otras pilas de cadenas u otra infraestructura en GCP.

#### IP pública

Avalanche requiere que un validador se comunique de salida en la misma dirección IP pública que anuncia para que otros pares se conecten a él. Dentro de GCP, esto excluye la posibilidad de usar un enrutador NAT en la nube para las comunicaciones de salida y nos obliga a vincular la IP pública que provisionamos a la interfaz de la máquina. Proveeremos una única dirección IPv4 estática `EXTERNAL` `Compute Address`.

#### Subredes

Para fines de esta documentación, implementaremos una única `Subred de cómputo` en la `Región` US-EAST1 con un rango de direcciones /24 que nos brinda 254 direcciones IP (no todas utilizables, pero para fines de documentación generalizada).

### Cómputo

#### Disco

Provisionaremos un único disco `PD-SSD` de 400GB que se adjuntará a nuestra VM.

#### Instancia

Implementaremos una única `Instancia de cómputo` de tamaño `e2-standard-8`. Las observaciones de las operaciones utilizando esta especificación de máquina sugieren que está sobredimensionada en memoria y se podría reducir a 16GB utilizando una especificación de máquina personalizada; pero revisa y ajusta según sea necesario (¡¡la belleza de la virtualización de cómputo!!).

#### Zona

Implementaremos nuestra instancia en la `Zona` `US-EAST1-B`.

#### Firewall

Provisionaremos las siguientes reglas de `Firewall de cómputo`:

- IAP INGRESS para SSH (TCP 22) - esto solo permite que las fuentes de IAP de GCP entren por SSH.
- P2P INGRESS para pares AVAX (TCP 9651)

Estos son obviamente puertos predeterminados y se pueden adaptar a tus necesidades según lo desees.

## <a name="instrucciones-de-configuración"></a> Instrucciones de configuración

### Cuenta de GCP

1. Si aún no tienes una cuenta de GCP, crea una [aquí](https://console.cloud.google.com/freetrial)

Obtendrás algunos dólares gratis para ejecutar una prueba, la prueba es completa en cuanto a funciones, pero tu uso comenzará a agotar tus dólares gratis, así que apaga todo lo que no necesites y/o agrega una tarjeta de crédito a tu cuenta si tienes la intención de ejecutar cosas a largo plazo para evitar cierres de servicio.

### Proyecto

Inicia sesión en la `Consola en la nube` de GCP y crea un nuevo `Proyecto` en tu organización. Usemos el nombre `my-avax-nodes` por el bien de esta configuración.

1. ![Seleccionar menú desplegable del proyecto](/img/cloud_console_project_dropdown.png)
2. ![Hacer clic en el botón Nuevo proyecto](/img/cloud_console_new_project_button.png)
3. ![Crear nuevo proyecto](/img/cloud_console_create_new_project.png)

### Estado de Terraform

Terraform utiliza archivos de estado para componer una diferencia entre la configuración de infraestructura actual y el plan propuesto. Puedes almacenar este estado en una variedad de lugares diferentes, pero usar el almacenamiento de GCP es un enfoque razonable dada la ubicación donde estamos implementando, así que nos quedaremos con eso.

1. ![Seleccionar Navegador de almacenamiento en la nube](/img/cloud_storage_browser.png)
2. ![Crear nuevo bucket](/img/cloud_storage_create_bucket.png)

La autenticación a GCP desde terraform tiene algunas opciones diferentes que se describen [aquí](https://www.terraform.io/language/settings/backends/gcs). Elije la opción que se alinee con tu contexto y asegúrate de completar esos pasos antes de continuar.

:::note

Dependiendo de cómo planees ejecutar tus operaciones de terraform, es posible que necesites habilitar o no el acceso público al bucket. Obviamente, no exponer el bucket para acceso "público" (incluso si está autenticado) es preferible. Si planeas simplemente ejecutar comandos de terraform desde tu máquina local, entonces deberás abrir el acceso. Recomiendo emplear un pipeline completo de CI/CD utilizando GCP Cloud Build, que si se utiliza significa que el bucket se puede marcar como "privado". Se puede encontrar una guía completa de configuración de Cloud Build en este contexto [aquí](https://cloud.google.com/architecture/managing-infrastructure-as-code).

:::

### Clonar el repositorio de GitHub

He proporcionado una construcción rudimentaria de terraform para aprovisionar un nodo en el que ejecutar Avalanche, que se puede encontrar [aquí](https://github.com/ava-labs/avalanche-docs/tree/master/static/scripts/terraform-gcp/projects/my-avax-project). La documentación a continuación asume que estás utilizando este repositorio, pero si tienes otro esqueleto de terraform, se aplicarán pasos similares.

### Configuración de Terraform

1. Si ejecutas terraform localmente, por favor [instálalo](https://learn.hashicorp.com/tutorials/terraform/install-cli).
2. En este repositorio, navega hasta el directorio `terraform`.
3. En el directorio `projects`, cambia el nombre del directorio `my-avax-project` para que coincida con el nombre de tu proyecto GCP que creaste (no es necesario, pero es bueno ser consistente).
4. Bajo la carpeta que acabas de renombrar, localiza el archivo `terraform.tfvars`.
5. Edita este archivo y completa los valores que tengan sentido para tu contexto y guárdalo.
6. Localiza el archivo `backend.tf` en el mismo directorio.
7. Edita este archivo asegurándote de reemplazar la propiedad `bucket` con el nombre del bucket de GCS que creaste anteriormente.

Si no deseas usar el almacenamiento en la nube para persistir el estado de terraform, simplemente cambia el `backend` a algún otro proveedor deseable.

### Ejecución de Terraform

Terraform nos permite ver qué haría si lo ejecutáramos sin aplicar realmente ningún cambio... esto se llama operación de `plan`. Este plan luego se lleva a cabo (opcionalmente) mediante un `apply`.

#### Plan

1. En una terminal que pueda ejecutar el binario `tf`, `cd` al directorio ~`my-avax-project` que renombraste en el paso 3 de `Configuración de Terraform`.
2. Ejecuta el comando `tf plan`.
3. Deberías ver una salida JSON en la salida estándar de la terminal que muestra las operaciones que terraform ejecutará para aplicar el estado previsto.

#### Apply

1. En una terminal que pueda ejecutar el binario `tf`, haz `cd` al directorio `~my-avax-project` que renombraste en el paso 3 de la "Configuración de Terraform".
2. Ejecuta el comando `tf apply`.

Si quieres asegurarte de que Terraform haga **exactamente** lo que viste en la salida de `apply`, opcionalmente puedes solicitar que la salida del `plan` se guarde en un archivo para alimentarlo a `apply`. Esto generalmente se considera una buena práctica en entornos altamente fluidos donde ocurren cambios rápidos desde múltiples fuentes.

## Conclusión

Establecer prácticas de CI/CD utilizando herramientas como GitHub y Terraform para gestionar tus activos de infraestructura es una excelente manera de asegurar capacidades básicas de recuperación ante desastres y asegurarte de tener un lugar para incrustar cualquier ~ajuste que tengas que hacer operativamente, evitando el riesgo de pasarlos por alto cuando tengas que escalar de 1 nodo a 10. Tener un pipeline automatizado también te da un lugar para construir una casa más grande... lo que comienza como tu interés en construir y gestionar un solo nodo AVAX hoy puede cambiar rápidamente a construir una operación de infraestructura para muchas cadenas diferentes trabajando con varios miembros del equipo. ¡Espero que esto te haya inspirado a dar un salto hacia la automatización en este contexto!