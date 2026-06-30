/**
 * ========================================================================
 * LÓGICA DEL CARRITO DE COMPRAS (carrito.js)
 * ========================================================================
 * Propósito:
 * - Administrar la persistencia temporal del carrito usando localStorage.
 * - Gestionar el listado de productos agregados, sumas de totales e impuestos.
 * - Procesar la confirmación y el envío del pedido al backend.
 * 
 * Funciones y lógica esperadas:
 * - getcarrito(): Recuperar el array de productos del localStorage.
 * - savecarrito(carrito): Guardar el array de productos en el localStorage.
 * - addTocarrito(productId, quantity, name, price): Agregar un item (o actualizar su cantidad si ya existe).
 * - removeFromcarrito(productId): Eliminar un producto del carrito.
 * - clearcarrito(): Vaciar por completo el carrito.
 * - rendercarrito(): Dibujar dinámicamente la tabla del carrito en carrito.html, recalculando subtotales y total.
 * - checkout(): Capturar método de pago, validar stock y enviar la orden a través de api.js (createSale).
 */

function getCarrito() {
    const carrito = localStorage.getItem("carrito");

    let carritoParse = [];

    if (carrito != null) {
        carritoParse = JSON.parse(carrito);
    }

    return carritoParse;
}

function saveCarrito(carrito) {
    const carritoJSON = JSON.stringify(carrito);
    localStorage.setItem("carrito", carritoJSON);
}

function addToCarrito(productId, quantity, name, price) {
    let carrito = getCarrito();

    const productoExistente = carrito.find(producto => producto.id == productId);

    if (productoExistente) {
        productoExistente.cantidad += quantity;
        return;
    }

    let nuevoProducto = {
        id : productId ,
        name : name,
        price : price,
        quantity : quantity
    }
    
    carrito.push(nuevoProducto);
}

function removeFromCarrito(productId) {
    let carrito = getCarrito();

    const productoExistente = carrito.find(producto => producto.id == productId);

    if (carrito.length == 0) {
        alert(`No hay ningún producto guardado en el carrito`);
        return
    }

    if (productoExistente) {
        productoExistente.cantidad--;
        carrito = carrito.filter(producto => producto.cantidad > 0);
        alert(`Un/una: ${nombreProducto} fue eliminado del carrito`);
    }

    saveCarrito(carrito);
}

function clearCarrito() {
    localStorage.setItem("carrito", []);
}