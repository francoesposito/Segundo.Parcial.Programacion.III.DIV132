/**
 * ========================================================================
 * LÓGICA DE INICIO Y VISTA DE PRODUCTOS (index.js)
 * ========================================================================
 * Propósito:
 * - Orquestar la pantalla de bienvenida y el catálogo en index.html y product-detail.html.
 * - Coordinar los filtros por categoría y la interacción inicial con el usuario.
 * 
 * Funciones y lógica esperadas:
 * - initCatalog(): Cargar la lista inicial de productos desde api.js y mostrarlos en pantalla.
 * - filterByCategory(category): Filtrar dinámicamente los productos mostrados según su categoría.
 * - renderProductCards(products): Renderizar los elementos visuales de cada producto.
 * - initProductDetail(): En product-detail.html, leer el ID del producto desde los parámetros URL (query params),
 *   cargar sus detalles usando api.js (getProductById) y renderizar la ficha detallada.
 * - Configurar escuchadores de eventos para los botones de agregar al carrito y navegación.
 */
