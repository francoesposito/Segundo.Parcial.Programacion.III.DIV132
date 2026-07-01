export const loggerURL = (req, res, next) => {
    let fecha = new Date();
    console.log(`[${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}] ${req.method} ${req.url}`);
    
    next();
}


export const validateId = (req, res, next) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            error: "El id debe ser un numero entero positivo"
        });
    }

    req.id = id;

    next();
}

const categoriasValidas = ["aventuras", "disparos", "carreras"];
export const validateProduct = (req, res, next) => {

    const { name, category } = req.body;
    const price = Number(req.body.price);

    const errores = [];

    if (!name || !category || isNaN(price)) {
        errores.push("Datos invalidos, asegurate de incluir todos los campos");
    }

    if (typeof name !== "string" || name.trim().length < 2) {
        errores.push("El nombre debe tener al menos 2 caracteres");
    }

    if (isNaN(price) || price <= 0) {
        errores.push("El precio debe ser un numero mayor a 0");
    }

    if(!categoriasValidas.includes(category)) {
        errores.push("Categoria invalida");
    };

    if (errores.length > 0) {
        return res.status(400).json({
            message: "Datos invalidos", errores
        });
    }

    next();
}

export const requireLogin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    next();
}

export const requireAdmin = (req, res, next) => {
    if (!req.session.user.es_admin) {
        return res.status(403).json({
            message: "Acceso denegado"
        }); 
    }
    next();
};

