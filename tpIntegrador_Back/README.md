# Documentacion del Backend - Autoservicio Kiosco

Este proyecto contiene el servidor de la aplicacion de autoservicio de kiosco, desarrollado en Node.js utilizando Express y MySQL como motor de base de datos relacional.

## Arquitectura del Servidor

La aplicacion sigue el patron Modelo-Vista-Controlador (MVC) para estructurar el codigo de manera modular y mantenible.

### Directorios Principales
* src/api/config: Variables de entorno del servidor.
* src/api/database: Configuracion de la conexion y pool de conexiones a la base de datos.
* src/api/models: Consultas SQL puras estructuradas como modulos (DAO).
* src/api/controllers: Lógica intermedia que recibe peticiones y envia respuestas HTTP.
* src/api/routes: Mapeo de verbos HTTP y endpoints.
* src/api/middlewares: Validaciones de datos y de sesion.
* src/views: Plantillas HTML dinamicas renderizadas por el servidor usando EJS.
* src/public: Archivos estaticos para el panel de administracion (CSS, JS).

## Base de Datos

El motor utiliza un pool de conexiones mediante la libreria mysql2/promise para la reutilizacion eficiente de conexiones.

### Tablas del Sistema
* products: Registro de productos (id, name, image, category, price, active).
* users: Cuentas de usuarios administradores (id, name, email, password, es_admin).
* sales: Transacciones generales de venta (id, customer_name, date, total_price).
* sales_products: Tabla intermedia que asocia productos y cantidades a cada venta (id_sale, id_product, quantity).

## Rutas y Endpoints

### API REST (JSON)
* GET /api/products: Obtiene productos activos (soporta paginacion mediante query params ?page=1&limit=4).
* GET /api/products/:id: Obtiene un producto individual.
* POST /api/products: Registra un producto.
* PUT /api/products/:id: Actualiza un producto.
* DELETE /api/products/:id: Baja logica de un producto (cambia active a 0).
* GET /api/sales: Obtiene el listado de ventas realizadas estructurado en formato anidado.
* POST /api/sales: Registra una venta procesando cabecera y detalles bajo una transaccion de base de datos.

### Vistas Administrativas (EJS)
* GET /login: Pantalla de inicio de sesion para administradores.
* POST /login: Procesa las credenciales de administrador de forma segura.
* GET /logout: Cierra la sesion del usuario actual y destruye la cookie de sesion.
* GET /dashboard/index: Vista del catalogo completo de productos.
* GET /dashboard/consultar: Vista para buscar producto por ID.
* GET /dashboard/crear: Formulario de creacion de producto.
* GET /dashboard/modificar: Formulario de edicion de producto.
* GET /dashboard/eliminar: Interfaz de confirmacion de baja logica de producto.
