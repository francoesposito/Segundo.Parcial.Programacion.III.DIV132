// Modelos

import connection from "../database/db.js";

export const getUserByEmail = async (email) => {
    sql = "SELECT * FROM users WHERE email = ?"

    const [rows] = await connection.query(sql, [email]);

    return rows[0]
}

export const createUser = async (data) => {
    const {name, email, password, es_admin} = data
    
    let sql = "INSERT INTO users (name, email, password, es_admin) VALUES (?, ?, ?, ?)"
    
    const [result] = await connection.query(sql, [name, email, password, es_admin ? 1 : 0]);

    return result.insertId;
}
