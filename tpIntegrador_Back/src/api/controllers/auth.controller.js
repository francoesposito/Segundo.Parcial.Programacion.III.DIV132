import connection from "../database/db.js"
import { getUserByEmail, createUser} from "../models/user.model.js"

export const loginView = async (req, res) => {
    res.rend("login", {
        title: "Login",
        about: "Introduce tus credenciales"
    })
}

export const processLoginInfo = async (req, res) => {
    try {
        
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login")
        }

        const user = getUserByEmail(email)

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        }

        res.redirect("/dashboard/index")
    } catch (error) {
        console.log(error)
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