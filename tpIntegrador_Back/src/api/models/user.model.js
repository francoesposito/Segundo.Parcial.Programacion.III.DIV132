import connection from "../database/db.js";

export const getUserByEmail = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.query(sql, [email]);
    return rows[0];
}

export const createUser = async (data) => {
    const {name, email, password, es_admin} = data
    const sql = "INSERT INTO users (name, email, password, es_admin) VALUES (?, ?, ?, ?)"
    const [result] = await connection.query(sql, [name, email, password, es_admin ? 1 : 0]);
    return result.insertId;
}

export const deleteUser = async (id) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const [result] = await connection.query(sql, [id]);
    return result.affectedRows > 0;
}

export const getUserById = async (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await connection.query(sql, [id]);
    return rows[0];
}
