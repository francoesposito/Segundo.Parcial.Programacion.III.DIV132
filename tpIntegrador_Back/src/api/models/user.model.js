// Modelos

import connection from "../database/db.js";

// Ej: SELECT * FROM users WHERE email = 'admin@example.com'
export const getUserByEmail = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.query(sql, [email]);
    return rows[0];
}

// Ej: INSERT INTO users (name, email, password, es_admin) VALUES ('Admin', 'admin@example.com', 'hash...', 1)
export const createUser = async (data) => {
    const {name, email, password, es_admin} = data
    const sql = "INSERT INTO users (name, email, password, es_admin) VALUES (?, ?, ?, ?)"
    const [result] = await connection.query(sql, [name, email, password, es_admin ? 1 : 0]);
    return result.insertId;
}
