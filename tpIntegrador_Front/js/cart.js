/**
 * ========================================================================
 * LÓGICA DEL CARRITO DE COMPRAS (cart.js)
 * ========================================================================
 * Propósito:
 * - Administrar la persistencia temporal del carrito usando localStorage.
 * - Gestionar el listado de productos agregados, sumas de totales e impuestos.
 * - Procesar la confirmación y el envío del pedido al backend.
 */


function getCart() {
    const carrito = localStorage.getItem("carrito");
    let carritoParse = [];
    if (carrito != null) {
        try {
            carritoParse = JSON.parse(carrito);
        } catch (e) {
            console.error("Error al parsear el carrito:", e);
            carritoParse = [];
        }
    }
    return Array.isArray(carritoParse) ? carritoParse : [];
}

function saveCart(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    updateCartCount();
}

function addToCart(productId, quantity, name, price) {
    let carrito = getCart();

    const productoExistente = carrito.find(producto => producto.id == productId);

    if (productoExistente) {
        productoExistente.quantity += quantity;
    } else {
        let nuevoProducto = {
            id: productId,
            name: name,
            price: price,
            quantity: quantity
        };
        carrito.push(nuevoProducto);
    }
    
    saveCart(carrito);
}

function agregarAlCarritoDirecto(productId, name, price) {
    addToCart(productId, 1, name, price);
    alert(`Agregado: 1 x ${name} al carrito`);
}

function removeFromCart(productId) {
    let carrito = getCart();
    const productoExistente = carrito.find(producto => producto.id == productId);

    if (carrito.length === 0) {
        alert(`No hay ningún producto guardado en el carrito`);
        return;
    }

    if (productoExistente) {
        productoExistente.quantity--;
        const name = productoExistente.name;
        
        carrito = carrito.filter(producto => producto.quantity > 0);
        alert(`Un/una unidad de "${name}" fue eliminada del carrito`);
    }

    saveCart(carrito);
    renderCart();
}

function clearCart() {
    saveCart([]);
    renderCart();
}

function updateCartCount() {
    const cartCountEl = document.getElementById("cart-count");
    if (!cartCountEl) return;

    const carrito = getCart();
    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.innerText = `(${totalItems})`;
}

function renderCart() {
    const container = document.getElementById("cart-container");
    const formContainer = document.getElementById("checkout-form-container");
    if (!container) return;

    const carrito = getCart();

    if (carrito.length === 0) {
        container.innerHTML = "<p>Tu carrito está vacío.</p>";
        if (formContainer) formContainer.style.display = "none";
        return;
    }

    if (formContainer) formContainer.style.display = "block";

    let html = `
        <table class="lista-producto" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
                <tr style="border-bottom: 2px solid var(--steam-border);">
                    <th style="text-align: left; padding: 10px;">Juego</th>
                    <th style="text-align: center; padding: 10px;">Precio</th>
                    <th style="text-align: center; padding: 10px;">Cantidad</th>
                    <th style="text-align: center; padding: 10px;">Subtotal</th>
                    <th style="text-align: center; padding: 10px;">Acción</th>
                </tr>
            </thead>
            <tbody>
    `;

    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        html += `
            <tr style="border-bottom: 1px solid var(--steam-border);">
                <td style="padding: 10px;"><strong>${item.name}</strong></td>
                <td style="text-align: center; padding: 10px;">$${Number(item.price).toFixed(2)}</td>
                <td style="text-align: center; padding: 10px;">
                    <input type="number" value="${item.quantity}" min="1" style="width: 50px; text-align: center;" 
                        onchange="cambiarCantidad(${item.id}, this.value)">
                </td>
                <td style="text-align: center; padding: 10px;">$${subtotal.toFixed(2)}</td>
                <td style="text-align: center; padding: 10px;">
                    <button class="btn btn-danger" onclick="removeFromCart(${item.id})" style="padding: 3px 8px !important; font-size: 10px;">Eliminar</button>
                </td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
        <div class="cart-total">
            TOTAL A PAGAR: $${total.toFixed(2)}
        </div>
    `;

    container.innerHTML = html;
}

function cambiarCantidad(productId, val) {
    const qty = parseInt(val) || 1;
    let carrito = getCart();
    const product = carrito.find(p => p.id == productId);
    if (product) {
        product.quantity = qty;
        saveCart(carrito);
        renderCart();
    }
}

async function checkout() {
    const nameInput = document.getElementById("customer-name");
    const paymentSelect = document.getElementById("payment-method");
    if (!nameInput || !paymentSelect) return;

    const customer_name = nameInput.value.trim();
    const payment_method = paymentSelect.value;

    if (!customer_name || !payment_method) {
        alert("Por favor completa todos los datos.");
        return;
    }

    const carrito = getCart();
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    const total_price = carrito.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const productsMapped = carrito.map(item => ({
        id_product: item.id,
        price: item.price,
        quantity: item.quantity
    }));

    const saleData = {
        customer_name,
        total_price,
        products: productsMapped
    };

    const response = await createSale(saleData);

    if (response && response.id) {
        alert("¡Compra confirmada con éxito!");

        localStorage.setItem("ultimo_ticket", JSON.stringify({
            sale_id: response.id,
            customer_name,
            total_price,
            products: carrito,
            date: new Date().toISOString()
        }));

        localStorage.removeItem("carrito");
        
        window.location.href = "ticket.html";
    } else {
        alert("Hubo un error al procesar la compra. Revisa el stock disponible.");
    }
}