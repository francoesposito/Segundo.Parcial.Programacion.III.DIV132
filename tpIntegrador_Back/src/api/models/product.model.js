import connection from "../database/db.js";

//////////////////////////////
//          Model           //
//////////////////////////////

// Ej: SELECT * FROM products WHERE active = 1 LIMIT 4 OFFSET 0
export const getAllProducts = async (limit, offset) => {
    let sql = "SELECT * FROM products WHERE active = 1";
    const params = [];

    if (limit !== undefined && offset !== undefined) {
        sql += " LIMIT ? OFFSET ?";
        params.push(Number(limit), Number(offset));
    }

    const [rows] = await connection.query(sql, params);
    return rows;
};

// Ej: SELECT COUNT(*) as total FROM products WHERE active = 1
export const countProducts = async () => {
    const [rows] = await connection.query("SELECT COUNT(*) as total FROM products WHERE active = 1");
    return rows[0].total;
};

// Ej: SELECT * FROM products WHERE id = 5
export const getProductById = async (id) => {
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0]; 
};

// Ej: INSERT INTO products (name, image, category, price, active) VALUES ('Mouse', 'mouse.jpg', 'Hardware', 3500, 1)
export const createProduct = async (data) => {
    const { name, image, category, price } = data;
    const [result] = await connection.query(
        "INSERT INTO products (name, image, category, price, active) VALUES (?, ?, ?, ?, 1)",
        [name, image, category, price]
    );
    return result.insertId;
};

// Ej: UPDATE products SET name = 'Mouse RGB', price = 3800 WHERE id = 5
export const updateProduct = async (id, data) => {
    const { name, image, category, price } = data;
    const [result] = await connection.query(
        "UPDATE products SET name = ?, image = ?, category = ?, price = ? WHERE id = ?",
        [name, image, category, price, id]
    );
    return result.affectedRows > 0;
};

// Ej: UPDATE products SET active = 0 WHERE id = 5 (Baja Lógica)
export const deleteProduct = async (id) => {
    const [result] = await connection.query(
        "UPDATE products SET active = 0 WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};

// Ej: UPDATE products SET active = 1 WHERE id = 5
export const activateProduct = async (id) => {
    const [result] = await connection.query(
        "UPDATE products SET active = 1 WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};
