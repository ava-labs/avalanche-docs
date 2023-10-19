---
etiquetas: [Construir, Subredes]
descripción: En este artículo, discutimos características diferenciadoras a menudo pasadas por alto de las Subredes, con un enfoque principal en aplicaciones basadas en EVM, para ayudar a los desarrolladores a determinar el mejor lugar para lanzar su aplicación.
sidebar_label: ¿C-Chain o Subred?
pagination_label: Cuándo construir en una Subred vs. en la C-Chain
---

# Cuándo construir en una Subred vs. en la C-Chain

En este artículo, discutimos características diferenciadoras a menudo pasadas por alto de las Subredes, con un enfoque principal en aplicaciones basadas en EVM. El objetivo es identificar los pros y los contras de construir una aplicación en [C-Chain](/learn/avalanche/avalanche-platform#c-chain) versus [Subnet-EVM](https://github.com/ava-labs/subnet-evm), y ayudar a los desarrolladores a tomar decisiones más informadas.

## Cuándo usar una Subred

Hay muchas ventajas en ejecutar tu propia Subred. Si encuentras que una o más de estas son una buena coincidencia para tu proyecto, entonces una Subred podría ser una buena solución para ti. Pero asegúrate de revisar las razones para usar la C-Chain en su lugar, ya que algunos compromisos involucrados podrían hacer que sea una solución preferida.

### Queremos nuestro propio token de gas

C-Chain es una cadena de Máquina Virtual Ethereum (EVM); requiere que las tarifas de gas se paguen en su token nativo. Es decir, la aplicación puede crear sus propios tokens de utilidad (ERC-20) en la C-Chain, pero el gas debe pagarse en AVAX. Mientras tanto, [Subnet-EVM](https://github.com/ava-labs/subnet-evm) crea efectivamente una cadena EVM específica de la aplicación con control total sobre las monedas nativas (gas). El operador puede preasignar los tokens nativos en la génesis de la cadena, y acuñar más utilizando el contrato de precompilación de [Subnet-EVM](https://github.com/ava-labs/subnet-evm). Y estas tarifas pueden ser quemadas (como las quemaduras de AVAX en la C-Chain) o configuradas para ser enviadas a una dirección que puede ser un contrato inteligente.

Ten en cuenta que el token de gas de la Subred es específico de la aplicación en la cadena, por lo que es desconocido para las partes externas. Mover activos a otras cadenas requiere contratos de puente de confianza (o la próxima función de comunicación entre Subredes).

### Queremos mayor rendimiento

El objetivo principal del límite de gas en la C-Chain es restringir el tamaño del bloque y, por lo tanto, prevenir la saturación de la red. Si un bloque puede ser arbitrariamente grande, tarda más en propagarse, lo que potencialmente degrada el rendimiento de la red. El límite de gas de la C-Chain actúa como un disuasivo contra cualquier abuso del sistema, pero puede ser bastante limitante para aplicaciones de alto rendimiento. A diferencia de la C-Chain, una Subred puede ser de un solo inquilino, dedicada a la aplicación específica y, por lo tanto, alojar su propio conjunto de validadores con mayores requisitos de ancho de banda, lo que permite un límite de gas más alto y, por lo tanto, un mayor rendimiento de transacción. Además, [Subnet-EVM](https://github.com/ava-labs/subnet-evm) admite actualizaciones de configuración de tarifas que pueden ser adaptables al aumento del tráfico de la aplicación.

Las cargas de trabajo de la Subred están aisladas de la Red Primaria; lo que significa que el efecto del vecino ruidoso de una carga de trabajo (por ejemplo, la creación de NFT en la C-Chain) no puede desestabilizar la Subred o aumentar su precio de gas. Este modelo de aislamiento de fallas en la Subred puede proporcionar una mayor confiabilidad de la aplicación.

### Queremos un control de acceso estricto

La C-Chain es abierta y sin permisos, donde cualquiera puede implementar e interactuar con contratos. Sin embargo, por razones regulatorias, algunas aplicaciones pueden necesitar un mecanismo de control de acceso consistente para todas las transacciones en cadena. Con [Subnet-EVM](https://github.com/ava-labs/subnet-evm), una aplicación puede requerir que "solo los usuarios autorizados puedan implementar contratos o realizar transacciones". Las listas de permitidos solo son actualizadas por los administradores, y la lista de permitidos en sí está implementada dentro del contrato de precompilación, por lo que es más transparente y auditable para asuntos de cumplimiento.

### Necesitamos personalización de EVM

Si tu proyecto está implementado en la C-Chain, entonces tu entorno de ejecución está dictado por la configuración de la C-Chain. Cambiar cualquiera de los parámetros de ejecución significa que la configuración de la C-Chain tendría que cambiar, y eso es costoso, complejo y difícil de cambiar. Entonces, si tu proyecto necesita otras capacidades, diferentes parámetros de ejecución o precompilaciones que la C-Chain no proporciona, entonces las Subredes son una solución que necesitas. Puedes configurar la EVM en una Subred para que se ejecute como quieras, agregando precompilaciones y configurando parámetros de tiempo de ejecución según lo que tu proyecto necesite.

## Cuándo usar la C-Chain

Todas las razones para usar una Subred mencionadas anteriormente son muy atractivas para los desarrolladores y podrían hacer parecer que cada nuevo proyecto debería considerar lanzar una Subred en lugar de usar la C-Chain. Por supuesto, las cosas rara vez son tan simples y sin compromisos. Aquí hay algunas ventajas de la C-Chain que debes tener en cuenta.

### Queremos alta composabilidad con activos de la C-Chain

La C-Chain es una mejor opción para una integración perfecta con activos y contratos existentes en la C-Chain. Es más fácil construir una aplicación DeFi en la C-Chain, ya que proporciona piscinas de liquidez más grandes y, por lo tanto, permite un intercambio eficiente entre activos populares. Una Subred DeFi aún puede soportar composabilidad de contratos sobre activos de la C-Chain, pero requiere algún tipo de sistema fuera de la cadena a través del contrato de puente. En otras palabras, una Subred puede ser una mejor opción si la aplicación no necesita una alta composabilidad con los activos existentes en la C-Chain. Además, el próximo soporte para la comunicación entre Subredes simplificará en gran medida el proceso de puente.

### Queremos alta seguridad

La seguridad de la Red Primaria de Avalanche es una función de la seguridad de los validadores y delegadores de stake subyacentes. Algunos eligen la C-Chain para lograr máxima seguridad utilizando miles de validadores de la Red Primaria de Avalanche. Algunos pueden optar por no depender de la seguridad completa de la cadena base.

El enfoque más adecuado es escalar la seguridad a medida que la aplicación acumula más valor y adopción de sus usuarios. Y una Subred puede proporcionar seguridad elástica y bajo demanda para tener en cuenta dicho crecimiento orgánico.

### Queremos un costo inicial bajo

La C-Chain tiene ventajas económicas de implementación de bajo costo, mientras que se requiere que cada validador de una Subred valide la Red Primaria al apostar AVAX (mínimo 2,000 AVAX para Mainnet). Para la tolerancia a fallas, recomendamos al menos cinco validadores para una Subred, aunque no hay ningún requisito de que el propietario de la Subred deba poseer todos estos 5 validadores, aún aumenta los costos iniciales.

### Queremos costos operativos bajos

La C-Chain es ejecutada y operada por miles de nodos, es altamente descentralizada y confiable, y toda la infraestructura (exploradores, indexadores, intercambios, puentes) ya ha sido construida por equipos dedicados que los mantienen sin cargo adicional. Un proyecto implementado en la C-Chain puede aprovechar todo eso básicamente de forma gratuita. Por otro lado, si ejecutas tu propia Subred, básicamente estás a cargo de ejecutar tu propia red L1. Tú (o alguien con quien te asocias o pagas) deberá hacer todas esas cosas y, en última instancia, serás responsable de ellas. Si no tienes el deseo, los recursos o las asociaciones para operar una plataforma de alta disponibilidad 24/7, probablemente es mejor que implementes en la C-Chain.

## Conclusión

Aquí presentamos algunas consideraciones a favor de ejecutar tu propia Subred y a favor de implementar en la C-Chain. Debes sopesar cuidadosamente y considerar qué tiene más sentido para ti y tu proyecto: implementar en una Subred o implementar en la C-Chain.

Pero, también hay una tercera opción: implementar en la C-Chain ahora, y luego moverte a tu propia Subred más adelante. Si una aplicación tiene una tasa de transacción relativamente baja y no tiene circunstancias especiales que la hagan inviable en la C-Chain, puedes comenzar con la implementación en la C-Chain para aprovechar la infraestructura técnica existente, y luego expandirte a una Subred. De esa manera, puedes concentrarte en trabajar en el núcleo de tu proyecto y una vez que tengas un ajuste sólido de producto/mercado y hayas ganado suficiente tracción como para que la C-Chain te esté