const contenedorProductos = document.getElementById("contenedor-productos");
const getProductForm = document.getElementById("getProduct-form");
const contenedorForm = document.getElementById("contenedor-form");
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

function renderizarProducto(producto) {
    let htmlProducto = `<ul>
        <li class="lista-producto">
            <img src="${producto.image}" alt="${producto.name}">
            <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
            <input type="button" id="updateProduct-button" value="Actualizar Producto">
        </li>
    </ul>`;

    contenedorProductos.innerHTML = htmlProducto;

    const updateProductButton = document.getElementById("updateProduct-button");

    updateProductButton.addEventListener("click", event => {
        event.stopPropagation();

        const confirmacion = confirm("Querés actualizar este producto?");

        if (!confirmacion) {
            alert("Actualizacion cancelada");
        } else {
            formularioPutProducto(event, producto);
        }
    });
}

async function formularioPutProducto(event, producto) {
    event.stopPropagation();

    const htmlForm = `
    <hr>
    <form id="updateProduct-form" class="form-alta">

        <input type="hidden" name="id" value="${producto.id}">

        <label for="nameProd">Nombre</label>
        <input type="text" name="name" id="nameProd" value="${producto.name}" required>

        <label for="imageProd">Imagen</label>
        <input type="text" name="image" id="imageProd" value="${producto.image}" required>

        <label for="categoryProd">Categoria</label>
        <select name="category" id="categoryProd" required>
            <option value="carreras">carreras</option>
            <option value="disparos">disparos</option>
            <option value="aventuras">aventuras</option>
        </select>

        <label for="priceProd">Precio</label>
        <input type="number" name="price" id="priceProd" value="${producto.price}" required>

        <label for="activeProd">Activo</label>
        <select name="active" id="activeProd">
            <option value="1">activo</option>
            <option value="0">inactivo</option>
        </select>
        
        <div>
            <input type="submit" value="Actualizar producto">
        </div>
    </form>
    `;

    contenedorForm.innerHTML = htmlForm;

    const updateProductForm = document.getElementById("updateProduct-form");

    updateProductForm.addEventListener("submit", event => {
        actualizarProducto(event);
    });
}

async function actualizarProducto(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    
    // Convertir precio a número
    data.price = Number(data.price);
    // Convertir activo a número
    data.active = Number(data.active);

    try {
        // Corregido: Mandar el ID del producto en la URL del PUT
        const response = await fetch(`http://localhost:3000/api/products/${data.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if(!response.ok) {
            mostrarError(result.message);
            return;
        }

        mostrarExito(result.message);

    } catch (error) {
        mostrarError("Error al conectar con el servidor");
    }

}

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