BancoApp - App de Banca Móvil
Este proyecto es una aplicación móvil de banca, en la que los usuarios tienen la posibilidad de registrar cuentas, acceder a ellas, crear códigos QR para transacciones, escanear estos códigos QR para obtener fondos y consultar el registro de operaciones. La aplicación se ha creado con Expo Go, vinculada con un backend creado en Node.js.

Software necesario
Node.js (Recomendado usar la versión LTS)
Expo Go (para ver la aplicación móvil en tu dispositivo)
MySQL (para gestionar la base de datos)
Dependencias
Expo SDK
Axios
Bcryptjs
QRCode




Se cambio debido a problemas y esta mejor adaptado
actualmente login y register con una ventana al bano en si de a app
edgar daniel romero ortiz
alejandro ramirez cota
para correr la app los comandos son npm install expo para después ingresar npx expo start para hacer que el proyecto genere el codigo Qr el cual se escaneara por medio de la aplicación expo go

La aplicación móvil bancaria es una herramienta moderna y funcional diseñada para gestionar cuentas financieras de manera segura y eficiente. Su objetivo principal es permitir a los usuarios realizar transacciones bancarias básicas y personalizar su experiencia, manteniendo un diseño minimalista y moderno.

La aplicación permite registrar nuevos usuarios mediante correo electrónico y contraseña. Estos datos se almacenan de forma segura en una base de datos gestionada a través de MySQL Workbench, garantizando la integridad de la información. Una vez registrados, los usuarios pueden iniciar sesión para acceder a todas las funcionalidades.

En la interfaz principal, los usuarios tienen la posibilidad de realizar retiros y depósitos, además de consultar un registro detallado de sus movimientos. Este historial incluye información como fecha, hora, tipo de transacción y monto, ofreciendo una visión clara de las operaciones realizadas.

La aplicación también cuenta con una sección de configuración donde los usuarios pueden personalizar aspectos como su perfil, seguridad (incluyendo opciones biométricas) y preferencias de diseño, como el cambio entre tema claro y oscuro. Todo esto se presenta en un entorno visual limpio, optimizado para la navegación y diseñado para adaptarse a cualquier dispositivo móvil.

Esta solución combina funcionalidad, seguridad y diseño moderno para facilitar el manejo de las finanzas personales desde la comodidad de un dispositivo móvil.
