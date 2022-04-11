const request = require("request");
const Database = require("../db/config");
const database = new Database();
const colors = require("colors");



class authController {

    getlogin() {
        return (req, res) => {
            res.render("index");
        };
    }
    login() {
        return (req, res) => {
            const { username, password } = req.body;
            request.post({
                url: "https://puntored-prueba-tecnica.herokuapp.com/auth",
                json: true,
                body: {
                    username: username,
                    password: password
                }
            }, async (err, response, body) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en el servidor");
                }


                if (body.error) {
                    return res.status(400).send(body.error);


                } else if (!body.state) {
                    return res.render("error", {
                        message: "Usuario o contraseña incorrectos",
                        status: 400,
                        url: "/api/auth"
                    });

                } else if (body.state) {


                    const user = await database.getUser(username);

                    if (user) {
                        return res.render("panel", {
                            message: `Bienvenido  a Puntored, ${username}`,
                            token: body.data.token,
                            userId: user.user_id,
                        });
                    } else {
                        const result = await database.insertUser(username, password);
                        if (result) {
                            return res.res.render("panel", {
                                message: `Bienvenido  a Puntored, ${username}`,
                                token: body.data.token,
                                userId: re.user_id,
                            });
                        } else {
                            return res.status(500).send("Error en el servidor");
                        }
                    }

                }
            });
        };
    }
}

module.exports = authController;