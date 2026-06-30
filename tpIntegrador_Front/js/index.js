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

let allProducts = [];

async function initCatalog() {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = "<p>Cargando productos...</p>";

    allProducts = await getProducts();

    if (allProducts.lenght === 0) {
        container.innerHTML = "<p>No hay productos disponibles en este momento.</p>";
        return;
    }

    renderProductCards(products);
}

async function initProductDetail() {
    const detailContainer = document.getElementById("product-detail");
}

function renderProductCards(products) {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = "";


    products.forEach(product => {
        let card = `
        <div class="card">
            <img src="${product.image || 'img/placeholder.png'}" alt="${product.name}" class="product-img">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${Number(product.price).toFixed(2)}</p>
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-detail">Ver Detalle</a>
                    <button class="btn btn-add" onclick="agregarAlCarritoDirecto(${product.id}, '${product.name}', ${product.price})">
                        Agregar
                    </button>
                </div>
        </div>
        `
        container.innerHTML += card
        
    });
};

function filterByCategory(category){   

    const filteredProducts = (category === "Todos") 
    ? allProducts 
    : allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase)

    renderProductCards(filteredProducts)
}