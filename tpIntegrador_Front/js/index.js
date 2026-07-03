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

    if (!allProducts || allProducts.length === 0) {
        container.innerHTML = "<p>No hay productos disponibles en este momento.</p>";
        return;
    }

    renderProductCards(allProducts);
}

async function initProductDetail() {
    const detailContainer = document.getElementById("product-detail");
    if (!detailContainer) return;

    const urlParms = new URLSearchParams(window.location.search);
    const productId = urlParms.get("id")

    if (!productId) {
        detailContainer.innerHTML = "<p>Error: No se especificó ningún producto</p>"
        return;
    }

    detailContainer.innerHTML = "<p>Cargando detalles del producto...</p>"
    const responseData = await getProductById(productId);
    const product = responseData && responseData.length ? responseData[0] : null;

    if (!product) {
        detailContainer.innerHTML = "<p>Error: El producto no existe o no se pudo cargar.</p>";
        return;
    }

    detailContainer.innerHTML = `
        <div class="product-detail-card">
                <img src="${getImageUrl(product.image)}" alt="${product.name}" class="detail-img">
                <div class="detail-info">
                    <h2>${product.name}</h2>
                    <p class="category">Categoría: <strong>${product.category}</strong></p>
                    <p class="price">$${Number(product.price).toFixed(2)}</p>
                    
                    <div class="purchase-actions">
                        <label for="quantity">Cantidad:</label>
                        <input type="number" id="quantity" value="1" min="1" max="99">
                        
                        <button class="btn btn-primary" id="btn-add-to-cart">
                            Agregar al Carrito
                        </button>
                    </div>
                    
                    <a href="index.html" class="btn btn-secondary">Volver al Catálogo</a>
                </div>
            </div>
        `;
    
        const btnAdd = document.getElementById("btn-add-to-cart");
        if (btnAdd) {
            btnAdd.addEventListener("click", () => {
                const qtyInput = document.getElementById("quantity")
                const quantity = parseInt(qtyInput.value) || 1;

                if (typeof addToCart === "function") {
                    addToCart(product.id, quantity, product.name, product.price)
                    alert(`Agregado: ${quantity} x ${product.name} al carrito`);
                } else {
                    console.error("La función addToCart no está disponible.")
                }
            });
        }
}   

function getImageUrl(imagePath) {
    if (!imagePath) return 'img/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return `http://localhost:3000${imagePath}`;
    return `http://localhost:3000/uploads/${imagePath}`;
}

function renderProductCards(products) {
    const container = document.getElementById("products-container");
    if (!container) return;

    container.innerHTML = "";

    products.forEach(product => {
        let card = `
        <div class="card">
            <img src="${getImageUrl(product.image)}" alt="${product.name}" class="product-img">
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
}

function filterByCategory(category){   
    const filteredProducts = (category === "Todos") 
    ? allProducts 
    : allProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());

    renderProductCards(filteredProducts);
}