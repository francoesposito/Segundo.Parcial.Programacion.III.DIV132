function initTicket() {
	const container = document.getElementById('ticket-container');
	container.innerHTML = '<div class="checkout-box"><h2>Compra realizada</h2><p>Gracias por tu compra.</p></div>';
	const btn = document.getElementById('boton_imprimir');
    btn.addEventListener('click', imprimirTicket);
}

function imprimirTicket() {

    const data = JSON.parse(localStorage.getItem("ultimo_ticket"));
    const carrito = data.products;

    let idProductos = [];

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("GAME INDEX", 70, y);

    y += 8;
    doc.setFontSize(14);
    doc.text("Ticket de compra", 70, y);

    y += 5;
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(12);
    doc.text("Cliente: " + data.customer_name, 20, y);

    y += 8;
    doc.text("Fecha: " + new Date(data.date).toLocaleDateString(), 20, y);

    y += 8;
    doc.line(20, y, 190, y);

    // Productos
    y += 10;

    carrito.forEach(producto => {

        idProductos.push(producto.id);

        const subtotal = producto.price * producto.quantity;

        doc.text(
            producto.name + " x" + producto.quantity + " - $" + subtotal,
            20,
            y
        );

        y += 10;
    });

    // Total
    const precioTotal = carrito.reduce(
        (total, producto) => total + (producto.price * producto.quantity),
        0
    );

    y += 5;
    doc.line(20, y, 190, y);

    y += 10;
    doc.setFontSize(16);
    doc.text("TOTAL: $" + precioTotal, 20, y);

    y += 15;
    doc.setFontSize(12);
    doc.text("Gracias por su compra", 60, y);

    let nombreUsuario = data.customer_name.replace(/\s+/g, "_");
    let fecha = new Date();
    let nombreTicket = `pedido-${nombreUsuario}-${fecha.toISOString()}.pdf`;

    doc.save(nombreTicket);
}