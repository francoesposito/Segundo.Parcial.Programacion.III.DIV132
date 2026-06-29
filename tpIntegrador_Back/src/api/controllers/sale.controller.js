import { createSale, getAllSales } from "../models/sale.model.js";

export const getSales = async (req, res) => {
    try {
        const rows = await getAllSales();
        const salesMap = {};

        rows.forEach(row => {
            if (!salesMap[row.sale_id]) {
                salesMap[row.sale_id] = {
                    id: row.sale_id,
                    customer_name: row.customer_name,
                    date: row.date,
                    total_price: row.total_price,
                    products: []
                };
            }

            if (row.product_id) {
                salesMap[row.sale_id].products.push({
                    id: row.product_id,
                    name: row.product_name,
                    price: row.product_price,
                    quantity: row.quantity
                });
            }
        });

        const salesList = Object.values(salesMap);
        res.status(200).json({ payload: salesList });
    } catch (error) {
        console.error("Error en getSales controller: ", error.message);
        res.status(500).json({ error: "Error interno al obtener las ventas" });
    }
};

export const create = async (req, res) => {
    try {
        const { customer_name, total_price, products } = req.body;

        if (!customer_name || !total_price || !products || !products.length) {
            return res.status(400).json({ error: "Datos de venta incompletos" });
        }

        const saleId = await createSale(customer_name, total_price, products);

        res.status(201).json({
            message: "Venta registrada con exito",
            id: saleId
        });
    } catch (error) {
        console.error("Error en create sale controller: ", error.message);
        res.status(500).json({ error: "Error interno al registrar la venta" });
    }
};
