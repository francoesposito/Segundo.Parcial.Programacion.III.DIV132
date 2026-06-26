const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const urlBase = "http://localhost:3000/api/products";

getProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim();

    if (!idProd) {
        mostrarError("Ingresá un id válido");
        return;
    }

    try {
        const response = await fetch(`${urlBase}/${idProd}`);
        const datos = await response.json();

        if (!response.ok) {
            mostrarError(datos.message);
            return;
        }

        const producto = datos.payload[0];

        renderizarProducto(producto);

    } catch (error) {
        mostrarError("Error de conexion con el servidor")
    }
})

function renderizarProducto() {
    let htmlProducto = `
    <ul>
        <li class="lista-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
            <input type="button" id="deleteProduct-button" value="Eliminar Producto">
        </li>
    </ul>
    `;

    contenedorProductos.innerHTML = htmlProducto;
    
    const deleteProductButton = document.getElementById("deleteProduct-button");

    deleteProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Querés eliminar este producto?");

        if(!confirmacion) {
            alert("Eliminacion cancelada");
        } else {
            eliminarProducto(producto.id);
        }
    })
};

function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}

function mostrarExito(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}

async function eliminarProducto(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        
        if (!response.ok) {
            mostrarError(result.message);
            return;
        }

        mostrarExito(result.message);
        
    } catch (error) {
        console.error("Error en la solicitud DELETE: ", error);
        alert("Ocurrio un error al eliminar un producto");
    }
}