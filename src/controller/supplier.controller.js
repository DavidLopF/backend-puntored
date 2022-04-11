const { json } = require("express/lib/response");
const request = require("request");
const Database = require("../db/config");
const database = new Database();
const colors = require("colors");

class supplierController {

    getSuppliers() {
        return (req, res) => {
            request.get({
                url: "https://puntored-prueba-tecnica.herokuapp.com/puntored/api/recharge/suppliers",
                headers: {
                    'Authorization': 'Bearer ' + req.headers.authorization
                }
            }, async (err, response, body) => {
                if (body == "") {
                    return res.status(400).send("Token invalido");
                } else {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Error en el servidor");

                    } else {

                        let resService = JSON.parse(body);
                        resService = resService.data.suppliers
                        const suppliers = await database.getALlSuppliers();
                        if (suppliers.length === resService.length) {
                            return res.status(200).send(JSON.parse(body));
                        } else {
                            let result = await database.deleteAllSuppliers();
                            if (result) {
                                resService.forEach(async (supplier) => {
                                    result = await database.insertSupplier(supplier.supplierId, supplier.supplierName, supplier.supplierLogo);

                                    if (!result) {
                                        return res.status(500).send("Error en el servidor");
                                    }
                                })

                                return res.status(200).send(JSON.parse(body));
                            }
                        }
                    }

                }
            });
        };
    }
}


module.exports = supplierController;