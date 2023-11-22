---
tags: [Nodos]
description: Ejecutar un validador y hacer stake con Avalanche utilizando la infraestructura de Microsoft Azure proporciona recompensas extremadamente competitivas. Encuentra más información aquí.
sidebar_label: Microsoft Azure
pagination_label: Ejecutar un Nodo Avalanche con Microsoft Azure
sidebar_position: 2
---

# Ejecutar un Nodo Avalanche con Microsoft Azure

:::caution
Este documento fue escrito por un miembro de la comunidad, es posible que alguna información esté desactualizada.
:::

Ejecutar un validador y hacer stake con Avalanche proporciona recompensas extremadamente competitivas, entre el 9,69% y el 11,54%, dependiendo del tiempo durante el cual hagas el stake. La tasa máxima se obtiene haciendo stake durante un año, mientras que la tasa más baja es para 14 días. Además, no hay penalizaciones, por lo que no tienes que preocuparte por una falla de hardware o un error en el cliente que te haga perder parte o todo tu stake. En cambio, con Avalanche, solo necesitas mantener actualmente al menos un 80% de tiempo de actividad para recibir recompensas. Si no cumples con este requisito, no te penalizan, pero no recibes las recompensas. **Tampoco necesitas poner tus claves privadas en un nodo para comenzar a validar en ese nodo.** Incluso si alguien irrumpe en tu entorno en la nube y obtiene acceso al nodo, lo peor que pueden hacer es apagar el nodo.

No solo ejecutar un nodo validador te permite recibir recompensas en AVAX, sino que más adelante también podrás validar otras Subnets en el ecosistema y recibir recompensas en el token nativo de sus Subnets.

Los requisitos de hardware para ejecutar un validador son relativamente modestos: 8 núcleos de CPU, 16 GB de RAM y 1 TB de SSD. Además, no utiliza cantidades enormes de energía. El [mecanismo de consenso revolucionario](https://medium.com/ava-hub/avalanche-consensus-the-biggest-breakthrough-since-nakamoto-66e9917fd656) de Avalanche es capaz de escalar a millones de validadores participando en el consenso a la vez, ofreciendo una descentralización sin precedentes.

Actualmente, la cantidad mínima requerida para hacer stake y convertirse en un validador es de 2,000 AVAX. Alternativamente, los validadores también pueden cobrar una pequeña tarifa para permitir a los usuarios delegar su stake con ellos y ayudar a cubrir los costos de funcionamiento. Puedes usar una calculadora [aquí](https://vscout.io/) para ver cuántas recompensas ganarías al ejecutar un nodo, en comparación con la delegación.

En este artículo, repasaremos el proceso de configurar un nodo en Microsoft Azure. Este tutorial asume que no tienes experiencia previa con Microsoft Azure y pasará por cada paso con la menor cantidad de suposiciones posible.

En el momento de este artículo, el precio de spot para una máquina virtual con 2 núcleos y 8 GB de memoria cuesta tan solo $0.01060 por hora, lo que equivale a aproximadamente $113.44 al año, **¡un ahorro del 83.76% en comparación con los precios normales de pago por uso.** En comparación, una máquina virtual en AWS con 2 núcleos y 4 GB de memoria con precios de spot es de alrededor de $462 al año.

## Configuración inicial de la suscripción

### Configurar la autenticación de dos factores

Primero, necesitarás una cuenta de Microsoft, si no tienes una, verás la opción de crear una en el siguiente enlace. Si ya tienes una, asegúrate de configurar la autenticación de dos factores para asegurar tu nodo yendo al siguiente enlace y luego seleccionando "Verificación en dos pasos" y siguiendo los pasos proporcionados.

[https://account.microsoft.com/security](https://account.microsoft.com/security)

![Imagen para el artículo](https://miro.medium.com/max/1135/1*tr3rEcrvI4rEpC7KPYqg6g.png)

Una vez que se haya configurado la autenticación de dos factores, inicia sesión en el portal de Azure yendo a [https://portal.azure.com](https://portal.azure.com/) e inicia sesión con tu cuenta de Microsoft. Cuando inicies sesión, no tendrás una suscripción, así que necesitamos crear una primero. Selecciona "Suscripciones" como se muestra a continuación:

![Imagen para el artículo](https://miro.medium.com/max/648/1*5Jp8oXzczaEND-z9_QZaQA.png)

Luego selecciona "+ Agregar" para agregar una nueva suscripción.

![Imagen para el artículo](https://miro.medium.com/max/374/1*Lw3HklSSC8NDN2ftQEVgYA.png)

Si quieres usar precios de instancia de spot (que serán considerablemente más baratos), no puedes usar una cuenta de prueba gratuita (y recibirás un error al validar), así que **asegúrate de seleccionar Pago por uso.**

![Imagen para el artículo](https://miro.medium.com/max/789/1*TO5Uh07OkH_QdwludEgapg.png)

Ingresa tus detalles de facturación y confirma tu identidad como parte del proceso de registro. Cuando llegues a Agregar soporte técnico, selecciona la opción sin soporte (a menos que quieras pagar extra por soporte) y presiona Siguiente.

![Imagen para el artículo](https://miro.medium.com/max/783/1*5KJOATvu3giAr6ygO3rF6Q.png)

## Crear una Máquina Virtual

Ahora que tenemos una suscripción, podemos crear la Máquina Virtual Ubuntu para nuestro Nodo Avalanche. Selecciona el ícono en la parte superior izquierda para abrir el menú y elige "+ Crear un recurso".

![Imagen para el artículo](https://miro.medium.com/max/565/1*3nSPwgEM3oIgrIlIo-TS1w.png)

Selecciona Ubuntu Server 18.04 LTS (esto normalmente estará bajo la sección popular o, alternativamente, búscalo en el marketplace).

![Imagen para el artículo](https://miro.medium.com/max/605/1*Y0iZEZExC36c7FXqPlrPuw.png)

Esto te llevará a la página de Crear una máquina virtual, como se muestra a continuación:

![Imagen para el artículo](https://miro.medium.com/max/775/1*cv0z0mt6Uavx5MkiazpiUA.png)

Primero, ingresa un nombre para la máquina virtual, puede ser cualquier cosa, pero en mi ejemplo, lo he llamado Avalanche (esto también cambiará automáticamente el nombre del grupo de recursos para que coincida).

Luego selecciona una región de la lista desplegable. Selecciona una de las recomendadas en una región que prefieras, ya que suelen ser las más grandes con la mayoría de las características habilitadas y precios más baratos. En este ejemplo, he seleccionado Europa del Norte.

![Imagen para el artículo](https://miro.medium.com/max/769/1*XOpa22qSdNI-0PW5oIyUhQ.png)

Tienes la opción de usar precios de spot para ahorrar cantidades significativas en costos de funcionamiento. Las instancias de spot utilizan una estructura de precios de mercado de oferta y demanda. A medida que aumenta la demanda de instancias, el precio de la instancia de spot aumenta. Si no hay capacidad suficiente, entonces tu VM se apagará. Sin embargo, las posibilidades de que esto suceda son increíblemente bajas, especialmente si seleccionas la opción solo de capacidad. Incluso en el improbable caso de que se apague temporalmente, solo necesitas mantener al menos un 80% de tiempo de actividad para recibir las recompensas de stake y no hay penalizaciones implementadas en Avalanche.

Selecciona Sí para instancia de spot de Azure, selecciona el tipo de desalojo solo capacidad y **asegúrate de establecer la política de desalojo en Detener / Desasignar. Esto es muy importante, de lo contrario, la VM será eliminada**.

![Imagen para el artículo](https://miro.medium.com/max/756/1*zWWiYhloPdnKEXGhZJA3dQ.png)

Elige "Seleccionar tamaño" para cambiar el tamaño de la Máquina Virtual y, desde el menú, selecciona D2s_v4 bajo la selección de la serie D v4 (este tamaño tiene 2 núcleos, 8 GB de memoria y habilita SSD Premium). En su lugar, puedes usar instancias F2s_v2, que tienen 2 núcleos, 4 GB de memoria y habilitan SSD Premium, pero el precio de spot en realidad es más barato para la VM más grande actualmente con precios de instancia de spot. Puedes usar [este enlace](https://azure.microsoft.com/en-us/pricing/details/virtual-machines/linux/) para ver los precios en las diferentes regiones.

![Imagen para el artículo](https://miro.medium.com/max/957/1*JzebwGho6qDFbzlqCJSN9w.png)

Una vez que hayas seleccionado el tamaño de la Máquina Virtual, selecciona "Ver historial de precios y comparar precios en regiones cercanas" para ver cómo ha cambiado el precio de spot en los últimos 3 meses y si es más barato usar una región cercana que pueda tener más capacidad disponible.

En el momento de este artículo, el precio spot para D2s_v4 en Europa del Norte cuesta $0.07975 por hora, o alrededor de $698.61 al año. Con el precio spot, el precio cae a $0.01295 por hora, lo que equivale a unos $113.44 al año, ¡un ahorro del 83.76%!

Hay algunas regiones que son aún más baratas, como el Este de EE.UU., que cuesta $0.01060 por hora o alrededor de $92.86 al año.

A continuación, puedes ver el historial de precios de la VM en los últimos 3 meses para Europa del Norte y regiones cercanas.

Más barato que Amazon AWS

Como comparación, una instancia c5.large cuesta $0.085 USD por hora en AWS. Esto suma ~$745 USD al año. Las instancias spot pueden ahorrar un 62%, reduciendo ese total a $462.

El siguiente paso es cambiar el nombre de usuario para la VM, para que coincida con otros tutoriales de Avalanche cambia el nombre de usuario a Ubuntu. De lo contrario, tendrás que cambiar varios comandos más adelante en este artículo y reemplazar Ubuntu con tu nuevo nombre de usuario.

Discos

Selecciona Siguiente: Discos para luego configurar los discos para la instancia. Hay 2 opciones de discos, ya sea Premium SSD que ofrecen un mayor rendimiento con un disco de 64 GB que cuesta alrededor de $10 al mes, o está el SSD estándar que ofrece un rendimiento más bajo y cuesta alrededor de $5 al mes. También tienes que pagar $0.002 por 10,000 unidades de transacción (lecturas / escrituras y eliminaciones) con el SSD estándar, mientras que con los SSD Premium todo está incluido. Personalmente, elegí el SSD Premium para un mayor rendimiento, pero también porque es probable que los discos se utilicen mucho y así incluso podrían resultar más baratos a largo plazo.

Selecciona Siguiente: Redes para pasar a la configuración de red.

Configuración de Red

Quieres usar una IP estática para que la IP pública asignada a la nodo no cambie en caso de que se detenga. Bajo IP pública selecciona "Crear nueva".

Luego selecciona "Estática" como tipo de asignación.

Luego necesitamos configurar el grupo de seguridad de red para controlar el acceso entrante a la nodo Avalanche. Selecciona "Avanzado" como tipo de grupo de seguridad de red de la NIC y selecciona "Crear nuevo".

Por razones de seguridad, quieres restringir quién puede conectarse de forma remota a tu nodo. Para hacer esto, primero querrás averiguar cuál es tu IP pública existente. Esto se puede hacer yendo a Google y buscando "cuál es mi IP".

Es probable que se te haya asignado una IP pública dinámica para tu hogar, a menos que lo hayas solicitado específicamente, por lo que tu IP pública asignada puede cambiar en el futuro. Aún se recomienda restringir el acceso a tu IP actual, y luego en caso de que tu IP de casa cambie y ya no puedas conectarte de forma remota a la VM, simplemente puedes actualizar las reglas de seguridad de red con tu nueva IP pública para poder conectarte de nuevo.

NOTA: Si necesitas cambiar las reglas del grupo de seguridad de red después de la implementación si tu IP de casa ha cambiado, busca "avalanche-nsg" y puedes modificar la regla para SSH y el puerto 9650 con la nueva IP. Sin embargo, el puerto 9651 debe permanecer abierto para todos, ya que así es como se comunica con otros nodos Avalanche.

Ahora que tienes tu IP pública, selecciona la regla de permitir ssh por defecto a la izquierda bajo reglas de entrada para modificarla. Cambia Origen de "Cualquiera" a "Direcciones IP" y luego ingresa tu dirección IP pública que encontraste en Google en el campo Dirección IP de origen. Cambia la Prioridad hacia abajo a 100 y luego presiona Guardar.

Luego selecciona "+ Agregar una regla de entrada" para agregar otra regla para el acceso RPC, esto también debería estar restringido solo a tu IP. Cambia Origen a "Direcciones IP" e ingresa tu IP pública devuelta por Google en el campo IP de origen. Esta vez cambia el campo "Rangos de puerto de destino" a 9650 y selecciona "TCP" como protocolo. Cambia la prioridad a 110 y dale un nombre de "Avalanche_RPC" y presiona Agregar.

Selecciona "+ Agregar una regla de entrada" para agregar una regla final para el Protocolo Avalanche para que otros nodos puedan comunicarse con tu nodo. Esta regla debe estar abierta para todos, así que deja "Origen" en "Cualquiera". Cambia el rango de puerto de destino a "9651" y cambia el protocolo a "TCP". Ingresa una prioridad de 120 y un nombre de Avalanche_Protocol y presiona Agregar.

El grupo de seguridad de red debería verse como el siguiente (aunque tu dirección IP pública será diferente) y presiona OK.

Deja los demás ajustes como predeterminados y luego presiona "Revisar + crear" para crear la máquina virtual.

Primero realizará una prueba de validación. Si recibes un error aquí, asegúrate de haber seleccionado el modelo de suscripción de pago por uso y no estás usando la suscripción de prueba gratuita, ya que las instancias spot no están disponibles. Verifica que todo se vea correcto y presiona "Crear".

Luego deberías recibir un aviso que te pide generar un nuevo par de claves para conectar tu máquina virtual. Selecciona "Descargar clave privada y crear recurso" para descargar la clave privada a tu PC.

Una vez que tu implementación haya terminado, selecciona "Ir al recurso".

Cambiar el tamaño del disco provisionado

Por defecto, la VM de Ubuntu se provisionará con un SSD Premium de 30 GB. Deberías aumentar esto a 250 GB, para permitir el crecimiento de la base de datos.

Para cambiar el tamaño del disco, la VM necesita detenerse y desasignarse. Selecciona "Detener" y espera a que el estado muestre "desasignado". Luego selecciona "Discos" en la izquierda.

Selecciona el nombre del disco que está actualmente provisionado para modificarlo.

Selecciona "Tamaño + rendimiento" a la izquierda, bajo configuración, y cambia el tamaño a 250 GB y presiona "Redimensionar".

Hacer esto ahora también extenderá automáticamente la partición dentro de Ubuntu. Para volver a la página de resumen de la máquina virtual, selecciona Avalanche en la configuración de navegación.

Luego inicia la VM.

## Conéctate a la Node de Avalanche

Las siguientes instrucciones muestran cómo conectarse a la Máquina Virtual desde una máquina con Windows 10. Para instrucciones sobre cómo conectarse desde una máquina Ubuntu, consulta el tutorial de AWS.

En tu PC local, crea una carpeta en la raíz de la unidad C: llamada Avalanche y luego mueve el archivo Avalanche_key.pem que descargaste antes a la carpeta. Luego haz clic derecho en el archivo y selecciona Propiedades. Ve a la pestaña de seguridad y selecciona "Avanzado" en la parte inferior.

Selecciona "Deshabilitar herencia" y luego "Quitar todos los permisos heredados de este objeto" para eliminar todos los permisos existentes sobre ese archivo.

Luego selecciona "Agregar" para agregar un nuevo permiso y elige "Seleccionar un principal" en la parte superior. En la ventana emergente, ingresa tu cuenta de usuario que usas para iniciar sesión en tu máquina. En este ejemplo, inicio sesión con un usuario local llamado Seq, es posible que tengas una cuenta de Microsoft con la que inicias sesión, así que usa la cuenta con la que inicias sesión en tu PC y presiona "Comprobar nombres" y debería subrayarlo para verificar y presiona OK.

Luego, desde la sección de permisos, asegúrate de que solo estén seleccionados "Leer y ejecutar" y "Leer" y presiona OK.

Debería verse algo como lo siguiente, excepto con un nombre de PC / cuenta de usuario diferente. Esto simplemente significa que el archivo de clave no se puede modificar o acceder por ninguna otra cuenta en esta máquina por motivos de seguridad, para que no puedan acceder a tu Node de Avalanche.

### Encuentra la IP pública de tu Node de Avalanche

Desde el Portal de Azure, toma nota de tu dirección IP pública estática que se ha asignado a tu nodo.

Para iniciar sesión en la node de Avalanche, abre el símbolo del sistema buscando `cmd` y seleccionando "Símbolo del sistema" en tu máquina con Windows 10.

Luego usa el siguiente comando y reemplaza "EnterYourAzureIPHere" con la dirección IP estática que se muestra en el portal de Azure.

ssh -i C:\Avalanche\Avalanche_key.pem ubuntu@EnterYourAzureIPHere

para mi ejemplo es:

ssh -i C:\Avalanche\Avalanche_key.pem ubuntu@13.74.10.81

La primera vez que te conectes, recibirás un mensaje pidiendo que continúes, ingresa "yes".

Ahora deberías estar conectado a tu Node.

La siguiente sección está tomada del excelente tutorial de Colin para [configurar una Node de Avalanche en AWS de Amazon](/nodes/run/third-party/aws-node.md).

### Actualiza Linux con parches de seguridad

Ahora que estamos en nuestra node, es una buena idea actualizarla a los últimos paquetes. Para hacer esto, ejecuta los siguientes comandos, uno a la vez, en orden:

```text
sudo apt update
sudo apt upgrade -y
sudo reboot
```

Esto pondrá nuestra instancia al día con los últimos parches de seguridad para nuestro sistema operativo. También reiniciará la node. Daremos a la node un minuto o dos para que se reinicie, luego iniciaremos sesión nuevamente, igual que antes.

### Configura la Node de Avalanche

Ahora necesitaremos configurar nuestra node de Avalanche. Para hacer esto, sigue el tutorial [Configurar Node de Avalanche con el instalador](/nodes/run/with-installer/installing-avalanchego.md) que automatiza el proceso de instalación. Necesitarás la "IP pública IPv4" copiada del Portal de Azure que configuramos anteriormente.

Una vez que la instalación esté completa, ¡nuestra node debería estar iniciando! Podemos ejecutar el siguiente comando para echar un vistazo al estado más reciente de la node AvalancheGo:

```text
sudo systemctl status avalanchego
```

Para verificar el estado del bootstrap, necesitaremos hacer una solicitud al RPC local usando `curl`. Esta solicitud es la siguiente:

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

La node puede tardar algún tiempo (más de una hora en este momento) en bootstrap. Bootstrapping significa que la node descarga y verifica el historial de las cadenas. Dale un poco de tiempo. Una vez que la node haya terminado de bootstrap, la respuesta será:

```text
{
    "jsonrpc": "2.0",
    "result": {
        "isBootstrapped": true
    },
    "id": 1
}
```

Siempre podemos usar `sudo systemctl status avalanchego` para echar un vistazo al estado más reciente de nuestro servicio, como antes.

### Obtén tu NodeID

Absolutamente debemos obtener nuestra NodeID si planeamos hacer alguna validación en esta node. Esto se obtiene del RPC también. Llamamos al siguiente comando curl para obtener nuestra NodeID.

```text
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.getNodeID"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

Si todo va bien, la respuesta debería verse algo así:

```text
{"jsonrpc":"2.0","result":{"nodeID":"NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR"},"id":1}
```

Esa parte que dice "NodeID-Lve2PzuCvXZrqn8Stqwy9vWZux6VyGUCR" es nuestro
NodeID, el cual debemos copiar y guardar en nuestras notas. No hay nada
confidencial o seguro acerca de este valor, pero es absolutamente necesario cuando
enviemos este nodo para que sea un validador.

### Haz una copia de seguridad de tus claves de staking

Lo último que se debe hacer es hacer una copia de seguridad de nuestras claves de staking en caso de que nuestra instancia se corrompa o se termine. Es una buena práctica para nosotros mantener estas claves. Para hacer una copia de seguridad, usamos el siguiente comando:

```text
scp -i C:\Avalanche\avalanche_key.pem -r ubuntu@EnterYourAzureIPHere:/home/ubuntu/.avalanchego/staking C:\Avalanche
```

Como antes, necesitaremos reemplazar "EnterYourAzureIPHere" con el valor apropiado que obtuvimos. Esto hace una copia de seguridad de nuestra clave de staking y certificado de staking en la carpeta C:\Avalanche que creamos antes.

![Image for post](https://miro.medium.com/max/358/1*nqsjJAv2fkcLKPri5idN-Q.png)
