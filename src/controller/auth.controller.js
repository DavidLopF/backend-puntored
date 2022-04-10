const request = require("request");
const Database = require("../db/config");
const database = new Database();



class authController {

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
                } else {
                    const user = await database.getUser(username);

                    if (user) {
                        return res.status(200).json({
                            message: "Usuario logueado",
                            token: body.data.token
                        })
                    } else {
                        const result = await database.insertUser(username, password);
                        if (result) {
                            return res.status(200).json({
                                message: "Usuario logueado",
                                token: body.data.token
                            })
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