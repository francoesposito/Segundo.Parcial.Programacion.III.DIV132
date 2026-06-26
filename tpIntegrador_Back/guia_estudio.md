# 📚 Guía de Estudio Completa - Backend (tpIntegrador_Back)

Esta guía recopila toda la información de arquitectura, base de datos, modelos, controladores y flujo del servidor implementados hasta el momento. Úsenla junto a su compañero para repasar y preparar la defensa oral del Trabajo Integrador.

---

## 🏗️ 1. Arquitectura General (Patrón MVC)

El proyecto utiliza el patrón **Modelo-Vista-Controlador (MVC)** para separar las responsabilidades. Esto evita tener un código "espagueti" y facilita el mantenimiento y testeo de la aplicación.

### Las tres capas clave del Backend:
1. **Entrada y Ruteo (`index.js` & `*.routes.js`):** Reciben las solicitudes HTTP externas y las direccionan al controlador adecuado según el método (GET, POST, etc.) y la URL.
2. **Controlador (`*.controller.js`):** Maneja la lógica de Express. Lee lo que envía el usuario (parámetros, cuerpo JSON), invoca a los modelos y decide qué responder (estado HTTP y JSON).
3. **Modelo (`*.model.js`):** Es la única capa que conoce la base de datos SQL. Ejecuta las consultas en MySQL y retorna objetos limpios de JavaScript.

---

## 🗄️ 2. Base de Datos y Conexión (`db.js`)

La conexión a la base de datos se realiza en `src/api/database/db.js` utilizando la librería `mysql2/promise`.

### Conceptos Clave para la Defensa:
* **Pool de Conexiones:** En lugar de abrir y cerrar una sola conexión para cada petición (lo cual es sumamente lento y satura el servidor), el *Pool* mantiene un grupo de conexiones abiertas y listas para ser reutilizadas.
* **mysql2/promise:** Nos permite usar `async/await` en lugar de callbacks tradicionales, logrando un código mucho más limpio y fácil de leer.
* **Variables de Entorno (`.env`):** Las credenciales de acceso (usuario, contraseña, host) están separadas del código en un archivo `.env` por seguridad (para no subirlas a GitHub).

---

## 🗃️ 3. Capa de Modelos (Consultas SQL)

### A. Productos (`product.model.js`)
* **getAllProducts(limit, offset):** Retorna los productos donde `active = 1`. Soporta cláusulas `LIMIT` y `OFFSET` para no sobrecargar el frontend (paginación).
* **getProductById(id):** Busca por clave primaria.
* **createProduct(data):** Inserta un producto con estado activo (`active = 1`) por defecto.
* **updateProduct(id, data):** Modifica los campos específicos de un producto mediante un UPDATE.
* **deactivateProduct(id):** Realiza una **Baja Lógica** cambiando `active = 0`. El producto no se elimina físicamente de la tabla, solo deja de mostrarse en el kiosco.
* **Prevenir Inyección SQL:** En todas las consultas usamos placeholders (`?`). Esto evita que un atacante inyecte código SQL malicioso a través de los formularios.

### B. Usuarios (`user.model.js`)
* **getUserByEmail(email):** Devuelve el usuario para verificar el login.
* **createUser(data):** Inserta un usuario administrador (las contraseñas deben ser encriptadas antes con `bcrypt` en el controlador).

### C. Ventas e Intermedia (`sale.model.js`)
* **Transacciones de Base de Datos (`createSale`):** Registrar una venta requiere escribir en dos tablas (`sales` y `sales_products`). Para evitar que se guarde la cabecera pero fallen los productos, usamos una transacción:
  * `conn.beginTransaction()`: Inicia el bloque seguro.
  * `conn.commit()`: Si todo salió bien, guarda de forma permanente todos los cambios.
  * `conn.rollback()`: Si algo falla, deshace todo lo hecho en esa tanda para no dejar datos huérfanos.
* **JOIN en `getAllSales()`:** Usamos un `LEFT JOIN` para cruzar la tabla `sales` con la tabla intermedia `sales_products` y la de `products`. Esto permite traer la lista completa de ventas junto con el detalle de qué productos se vendieron en una sola consulta.

---

## 🛠️ 4. Capa de Controladores (`*.controller.js`)

El controlador se encarga exclusivamente de interactuar con Express (`req` y `res`). A continuación se explica cada función y cómo leer los parámetros del cliente:

### A. Productos (`product.controller.js`)

#### 1. `getProducts` (GET)
* **Petición:** `GET /api/products?page=2&limit=4`
* **Parámetro utilizado:** `req.query` (parámetros opcionales agregados después del `?`).
* **Ejemplo query:** `?page=1&limit=4`

#### 2. `getProduct` (GET)
* **Petición:** `GET /api/products/5`
* **Parámetro utilizado:** `req.params` (variables integradas en la ruta, ej: `/:id`).
* **Ejemplo params:** `/api/products/5`

#### 3. `create` (POST)
* **Petición:** `POST /api/products` (Enviando JSON en el cuerpo del request)
* **Parámetro utilizado:** `req.body` (cuerpo de la petición).
* **Ejemplo body:** `{ "name": "Teclado", "price": 4500, "category": "Hardware", "image": "teclado.jpg" }`

#### 4. `update` (PUT)
* **Petición:** `PUT /api/products/5` (Enviando JSON en el cuerpo)
* **Parámetro utilizado:** `req.params` (id) y `req.body` (nuevos campos).
* **Ejemplo params/body:** `/api/products/5` y `{ "name": "Teclado RGB", "price": 5000 }`

#### 5. `deactivate` (DELETE)
* **Petición:** `DELETE /api/products/5`
* **Parámetro utilizado:** `req.params` (id).
* **Ejemplo params:** `/api/products/5`

---

### B. Ventas (`sale.controller.js`)

#### 1. `getSales` (GET)
* **Petición:** `GET /api/sales`
* **Cómo funciona:** Llama a `getAllSales()` y agrupa las filas repetidas usando un mapa (`salesMap`) de JavaScript para devolver un JSON anidado mucho más limpio.
* **Ejemplo payload devuelto:**
  `json
  [{
    "id": 1,
    "customer_name": "Franco",
    "total_price": 15000,
    "products": [{ "id": 2, "name": "Teclado", "price": 7500, "quantity": 2 }]
  }]
  `

#### 2. `create` (POST)
* **Petición:** `POST /api/sales` (Enviando JSON con el cliente y los productos en el body)
* **Parámetro utilizado:** `req.body`
* **Ejemplo body:**
  `json
  {
    "customer_name": "Franco",
    "total_price": 15000,
    "products": [{ "id_product": 2, "quantity": 2 }]
  }
  `

---

## 📋 5. Glosario de Conceptos Clave para el Final / Examen

* **Middleware:** Una función intermedia que se ejecuta en Express antes de que la petición llegue al controlador final. Ejemplos: `express.json()` (para leer JSON) o un middleware de logueo.
* **Baja Lógica vs Baja Física:** 
  * *Baja Física:* Eliminar el registro de la base de datos usando `DELETE`. (Peligroso, puede romper integridad referencial con ventas viejas).
  * *Baja Lógica:* Modificar un campo de estado (ej: `active = 0`). El dato sigue existiendo en el historial, pero ya no se muestra al público.
* **Inyección SQL:** Ataque cibernético que ocurre cuando se concatenan datos del usuario directo en un string SQL, permitiendo ejecutar sentencias no deseadas. Se previene con **Placeholders (`?`)**.
* **Códigos de Estado HTTP (Status Codes):**
  * `200 OK`: Petición exitosa.
  * `201 Created`: Recurso creado exitosamente (ej: tras un POST).
  * `400 Bad Request`: Petición incorrecta o datos incompletos.
  * `404 Not Found`: El recurso solicitado (URL o ID) no existe.
  * `500 Internal Server Error`: Error interno de lógica o base de datos en el servidor.
