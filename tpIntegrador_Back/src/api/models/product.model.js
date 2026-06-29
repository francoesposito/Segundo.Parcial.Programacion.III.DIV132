import connection from "../database/db.js";

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

export const countProducts = async () => {
    const [rows] = await connection.query("SELECT COUNT(*) as total FROM products WHERE active = 1");
    return rows[0].total;
};

export const getProductById = async (id) => {
    const [rows] = await connection.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0]; 
};

export const createProduct = async (data) => {
    const { name, image, category, price } = data;
    const [result] = await connection.query(
        "INSERT INTO products (name, image, category, price, active) VALUES (?, ?, ?, ?, 1)",
        [name, image, category, price]
    );
    return result.insertId;
};

export const updateProduct = async (id, data) => {
    const { name, image, category, price } = data;
    const [result] = await connection.query(
        "UPDATE products SET name = ?, image = ?, category = ?, price = ? WHERE id = ?",
        [name, image, category, price, id]
    );
    return result.affectedRows > 0;
};

export const deleteProduct = async (id) => {
    const [result] = await connection.query(
        "UPDATE products SET active = 0 WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};

export const activateProduct = async (id) => {
    const [result] = await connection.query(
        "UPDATE products SET active = 1 WHERE id = ?",
        [id]
    );
    return result.affectedRows > 0;
};
