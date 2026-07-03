import connection from "../database/db.js";
import { getUserByEmail, createUser, deleteUser, getUserById } from "../models/user.model.js";
import bcrypt from "bcrypt";

export const loginView = async (req, res) => {
    res.render("login", {
        title: "Login",
        about: "Introduce tus credenciales"
    })
}

export const processLoginInfo = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                error: "Datos incompletos"
            })
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                error: "Usuario no encontrado"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {

            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                es_admin: user.es_admin
            }

            res.redirect("/dashboard/index");

        } else {
            return res.render("login", {
                title: "Login",
                about: "Introduce tus credenciales",
                error: "Password invalido"
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("Error interno en el servidor")
    }
}

export const destroyLogin = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log("Error al destruir la sesión: ", error)
            return res.status(500).json({
                message: "Error al cerrar la sesión"
            })
        }

        res.redirect("/login")
    })
}

export const createNewUser = async (req, res) => {
    try {
        const { nameUser, emailUser, passUser, adminUser, es_admin } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passUser, saltRounds);

        // Si viene del HTML Form es 'adminUser = "on"', si viene de API JSON es 'es_admin'
        const isadmin = adminUser === "on" || es_admin === true || es_admin === 1 || es_admin === "1" || es_admin === "on";

        const insertId = await createUser({
            name: nameUser,
            email: emailUser,
            password: hashedPassword,
            es_admin: isadmin ? 1 : 0
        });
        
        res.status(201).json({
            message: `Usuario creado con exito`,
            userId: insertId
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor: ", error
        });
    }
}

export const deleteExistingUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await deleteUser(id);

        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: `Usuario con ID ${id} eliminado con éxito`
        });
    } catch (error) {
        console.error("Error en deleteExistingUser: ", error);
        res.status(500).json({
            message: "Error interno del servidor al eliminar el usuario",
            error: error.message
        });
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json({ payload: [user] });
    } catch (error) {
        console.error("Error en getUser: ", error);
        res.status(500).json({
            message: "Error interno del servidor al consultar el usuario",
            error: error.message
        });
    }
}