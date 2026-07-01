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
    <form id="updateProduct-form" class="form-alta" enctype="multipart/form-data">

        <input type="hidden" name="id" value="${producto.id}">
        <!-- Guardamos la ruta de la imagen vieja por si no se sube una nueva -->
        <input type="hidden" name="image" value="${producto.image}">

        <label for="nameProd">Nombre</label>
        <input type="text" name="name" id="nameProd" value="${producto.name}" required>

        <label for="imageProd">Carátula (Imagen)</label>
        <input type="file" name="image" id="imageProd" accept="image/*">

        <label for="categoryProd">Categoria</label>
        <select name="category" id="categoryProd" required>
            <option value="carreras" ${producto.category === 'carreras' ? 'selected' : ''}>carreras</option>
            <option value="disparos" ${producto.category === 'disparos' ? 'selected' : ''}>disparos</option>
            <option value="aventuras" ${producto.category === 'aventuras' ? 'selected' : ''}>aventuras</option>
        </select>

        <label for="priceProd">Precio</label>
        <input type="number" name="price" id="priceProd" value="${producto.price}" required>

        <label for="activeProd">Activo</label>
        <select name="active" id="activeProd">
            <option value="1" ${producto.active == 1 ? 'selected' : ''}>activo</option>
            <option value="0" ${producto.active == 0 ? 'selected' : ''}>inactivo</option>
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

    try {
        const response = await fetch(`http://localhost:3000/api/products/${formData.get("id")}`, {
            method: "PUT",
            body: formData
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