const contenedorProductos = document.getElementById("contenedor-productos");
const postProductForm = document.getElementById("postProduct-form")

function validarFormulario(data) {
    const errores = [];

    if (!data.name || data.name.trim().lenght < 1) {
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
        <p class="mensaje mensaje-${tipo}">Errores: ${cantidadErrores} Mensaje: ${mensaje}</p>
    `;
}

postProductForm.addEventListener("submit", async event => {
    event.preventDefault();

    const formularioAlta = event.target;

    const formData = new FormData(formularioAlta);

    const data = Object.fromEntries(formData.entries());

    console.log(data)
    
    data.price = Number(data.price)

    const errores = validarFormulario(data);
    const cantidadErrores = errores.length;
    
    if (errores.length > 0) {
        mostrarMensaje("error", errores, cantidadErrores)
    }

    try {
        const response = await fetch("http://localhost:300/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }) 
        console.log(response);

        const result = await response.json();

        if (!response.ok) {
            mostrarMensaje("error", result.message);
            return;
        }

        const infoProducto = `${result.message} con id ${result.productId}`;

        mostrarMensaje("exito", infoProducto, 0)

        console.log(infoProducto);


    } catch (error) {
        console.error("Error al enviar los datos: ", error);
    }


})