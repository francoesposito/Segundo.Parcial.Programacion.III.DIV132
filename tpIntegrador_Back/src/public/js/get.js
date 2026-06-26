const contenedorProductos = document.getElementById("contenedor-productos")
const getProductFrom = document.getElementById("getProduct-form")

getProductFrom.addEventListener("submit", async event => {
    event.preventDefault();

    const idProd = event.target.idProd.value.trim()

    if (!idProd) {
            mostrarError("Ingresá un id válido")
            return
    }

    const formData = new FormData(event.target);
    console.log(formData);

    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${urlBase}/${idProd}`)
        console.log(response)

        const data = await response.json();

        if (!response.ok) {
            mostrarError(data.message)
            return
        }

        console.log(data.payload[0]);  // {id: 41, name: 'Fernetazo Chabona', image: 'https://pointlaventanita.com/wp-content/uploads/2024/05/chabona.webp', category: 'drink', price: '2300.00', …}
        const producto = data.payload[0];

        const htmlProducto = `
            <ul>
                <li class="lista-producto">
                    <img src="${producto.image}" alt="${producto.name}">
                    <p>Id: ${producto.id} / Nombre: ${producto.name} / <strong>Precio: $${producto.price}</strong></p>
                </li>
            </ul>
        `;

        contenedorProductos.innerHTML = htmlProducto;


    } catch (error) {
        console.error("Error al obtener productos: ", error)

        mostrarError("Error de conexion con el servidor")
    }

})


function mostrarError(mensaje) {
    contenedorProductos.innerHTML = `
        <p class="mensaje mensaje-error">${mensaje}</p>
    `;
}