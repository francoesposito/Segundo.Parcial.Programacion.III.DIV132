const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form")
const postUserForm = document.getElementById("postUser-form")

function validarFormulario(data) {
    const errores = [];

    if (!data.name || data.name.trim().length < 1) {
        errores.push("El nombre debe tener al menos un caracter")
    }

    if (!data.price || isNaN(data.price) || Number(data.price) < 0) {
        errores.push("El precio debe ser un numero mayor a 0")
    }

    if (!data.category) {
        errores.push("Debe seleccionarse una categoría")
    }

    return errores;
}

function mostrarMensaje(tipo, mensaje, cantidadErrores){
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-${tipo}">Errores: ${cantidadErrores || 0} Mensaje: ${mensaje}</p>
    `;
}

postProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formularioAlta = event.target;
    const formData = new FormData(formularioAlta);

    // Creamos objeto para la validacion local
    const validationData = {
        name: formData.get("name"),
        price: Number(formData.get("price")),
        category: formData.get("category")
    };

    const errores = validarFormulario(validationData);
    const cantidadErrores = errores.length;
    
    if (errores.length > 0) {
        mostrarMensaje("error", errores.join(", "), cantidadErrores);
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            body: formData // Enviamos FormData directamente para soportar la subida del archivo
        });
        
        console.log(response);
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message || "Error al crear producto", 1);
            return;
        }

        const infoProducto = `${result.message} con id ${result.id}`;
        mostrarMensaje("exito", infoProducto, 0);
        console.log(infoProducto);
        formularioAlta.reset();

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
        mostrarMensaje("error", "Error de conexion con el servidor", 1);
    }
});

postUserForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = Object.fromEntries(formData.entries());
    console.table(data);

    const jsonData = JSON.stringify(data);
    console.log(jsonData);

    try {
        
        const response = await fetch("http://localhost:3000/api/users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        });

        console.log(response);
        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }
        
        const infoUser = `${result.message} con id ${result.userId}`
        mostrarMensaje("exito", infoUser)
        console.log(infoUser);

        event.target.reset();

    } catch (error) {
        console.error("Error al enviar los datos: ", error);
    }

});
