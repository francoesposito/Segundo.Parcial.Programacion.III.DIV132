import connection from "../database/db.js";

//////////////////////////////
//          Model           //
//////////////////////////////

// Ej: TransacciÃ³n SQL -> Inserta en sales (padre) y luego en sales_products (hijo)
export const createSale = async (customerName, totalPrice, products) => {
    const conn = await connection.getConnection();

    try {
        await conn.beginTransaction();

        let sql1 = "INSERT INTO sales (customer_name, date, total_price) VALUES (?, NOW(), ?)";
        const [saleResult] = await conn.query(sql1, [customerName, totalPrice]);
        const saleId = saleResult.insertId;

        let sql2 = "INSERT INTO sales_products (id_sale, id_product, quantity) VALUES (?, ?, ?)";
        const insertPromises = products.map(product => {
            return conn.query(sql2, [saleId, product.id_product, product.quantity]);
        });

        await Promise.all(insertPromises);
        await conn.commit();
        return saleId;

    } catch (error) {
        await conn.rollback();
        throw error;
    } finally {
        conn.release();
    }
};

// Ej. devuelve filas combinadas planas:
// | sale_id | customer_name | product_name | quantity |
// | 1       | Franco        | Teclado      | 1        |
// | 1       | Franco        | Mouse        | 2        |
export const getAllSales = async () => {
    const sql = `
        SELECT 
            s.id AS sale_id,
            s.customer_name,
            s.date,
            s.total_price,
            sp.quantity,
            p.id AS product_id,
            p.name AS product_name,
            p.price AS product_price
        FROM sales s
        LEFT JOIN sales_products sp ON s.id = sp.id_sale
        LEFT JOIN products p ON sp.id_product = p.id
        ORDER BY s.date DESC
    `;

    const [rows] = await connection.query(sql);
    return rows;
};
