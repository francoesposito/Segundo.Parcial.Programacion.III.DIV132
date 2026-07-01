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

function renderizarProducto(producto) {
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

const contenedorUsuarios = document.getElementById("contenedor-usuarios");
const getUserForm = document.getElementById("getUser-form");
const urlUserBase = "http://localhost:3000/api/users";

if (getUserForm) {
    getUserForm.addEventListener("submit", async event => {
        event.preventDefault();

        const idUser = event.target.idUser.value.trim();

        if (!idUser) {
            mostrarErrorUsuario("Ingresá un id válido");
            return;
        }

        try {
            const response = await fetch(`${urlUserBase}/${idUser}`);
            const datos = await response.json();

            if (!response.ok) {
                mostrarErrorUsuario(datos.message || "Usuario no encontrado");
                return;
            }

            const usuario = datos.payload[0];
            renderizarUsuario(usuario);

        } catch (error) {
            mostrarErrorUsuario("Error de conexión con el servidor");
        }
    });
}

function renderizarUsuario(usuario) {
    let htmlUsuario = `
    <ul>
        <li class="lista-producto">
            <p style="margin: 0; font-size: 11px;">
                <strong>ID:</strong> ${usuario.id} / 
                <strong>Nombre:</strong> ${usuario.name} / 
                <strong>Email:</strong> ${usuario.email} / 
                <strong>Password (hash):</strong> <span style="font-family: monospace; font-size: 9px; word-break: break-all;">${usuario.password}</span> / 
                <strong>Admin:</strong> ${usuario.es_admin ? "Sí" : "No"}
            </p>
            <input type="button" id="deleteUser-button" value="Eliminar Usuario" style="background-color: #5c2c2c !important; border-color: #8c3f3f #3a1a1a #3a1a1a #8c3f3f !important; margin-left: 15px;">
        </li>
    </ul>
    `;

    contenedorUsuarios.innerHTML = htmlUsuario;
    
    const deleteUserButton = document.getElementById("deleteUser-button");
    if (deleteUserButton) {
        deleteUserButton.addEventListener("click", event => {
            event.stopPropagation();

            const confirmacion = confirm(`¿Querés eliminar al usuario "${usuario.name}" (ID ${usuario.id})?`);

            if (!confirmacion) {
                alert("Eliminación cancelada");
            } else {
                eliminarUsuario(usuario.id);
            }
        });
    }
}

function mostrarErrorUsuario(mensaje) {
    contenedorUsuarios.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}

function mostrarExitoUsuario(mensaje) {
    contenedorUsuarios.innerHTML = `
        <p class="mensaje mensaje-exito">${mensaje}</p>
    `;
}

async function eliminarUsuario(id) {
    try {
        const response = await fetch(`${urlUserBase}/${id}`, {
            method: "DELETE"
        });

        const result = await response.json();
        
        if (!response.ok) {
            mostrarErrorUsuario(result.message);
            return;
        }

        mostrarExitoUsuario(result.message);
        
    } catch (error) {
        console.error("Error en la solicitud DELETE usuario: ", error);
        alert("Ocurrió un error al eliminar el usuario");
    }
}