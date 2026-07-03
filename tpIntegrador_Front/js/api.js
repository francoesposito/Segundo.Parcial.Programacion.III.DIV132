/**
 * ========================================================================
 * CLIENTE DE API / FETCHING DE DATOS (api.js)
 * ========================================================================
 * Propósito:
 * - Centralizar todas las llamadas HTTP (fetch) al servidor backend.
 * - Proveer funciones reutilizables por el resto de los scripts del Frontend.
 * 
 * Funciones y lógica esperadas:
 * - URL_BASE: Variable o constante que define la dirección del backend (ej: http://localhost:3000/api).
 * - getProducts(): Obtener el catálogo completo de productos.
 * - getProductById(id): Obtener la información detallada de un producto específico.
 * - createSale(saleData): Registrar una nueva venta en el backend (descuenta stock).
 * - sendSurvey(surveyData): Enviar las respuestas de la encuesta de satisfacción al backend.
 */

const URL_BASE = "http://localhost:3000/api"

async function getProducts() {
    try {
        const response = await fetch(`${URL_BASE}/products`)

        if (!response.ok) {
            console.log("Error del servidor: ", response.statusText)
            return;
        }

        const resultado = await response.json();

        return resultado.payload
        
        
    } catch (error) {
        console.error("Error obteniendo productos: ", error)
        return;
    }
}

async function getProductById(id) {
    try {
        const response = await fetch(`${URL_BASE}/products/${id}`);

        if (!response.ok) {
            console.log("Error del servidor: ", response.statusText)
            return null;
        }

        const resultado = await response.json();

        return resultado.payload;
    } catch (error) {
        console.error("Error al obtener producto por id: ", error)
        return null;
    }
}

async function createSale(saleData){
    try {
        const response = await fetch(`${URL_BASE}/sales`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(saleData)
        })

        const resultado = await response.json();

        if (!response.ok) {
            console.error("Error al registrar la venta: ", resultado.error || response.statusText)
            return null;
        }

        return resultado;
    } catch (error) {
        console.error("Error de red al registrar la venta: ", error);
        return null;
    }
}