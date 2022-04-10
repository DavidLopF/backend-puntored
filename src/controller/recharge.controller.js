const request = require("request");
const Database = require("../db/config");



class rechargeController {

    constructor() {
        this.database = new Database();
    }

    buy() {
        return (req, res) => {

            const { clientTransId, amount, phoneNumber, supplierId } = req.body;

            request.post({
                url: "https://puntored-prueba-tecnica.herokuapp.com/puntored/api/recharge/buy",
                json: true,
                headers: {
                    'content-type': 'application/json',
                    'Authorization': 'Bearer ' + req.headers.authorization
                },
                body: {
                    clientTransId: clientTransId,
                    amount: amount,
                    phoneNumber: phoneNumber,
                    supplierId: supplierId
                },
            }, async (err, response, body) => {
                if (err) {
                    console.log(err);
                    return res.status(500).send("Error en el servidor");
                } else {
                    //saber si el body no llega undefined

                    if (body) {
                        const responseServer = body.data
                        const transaction = {
                            transactionId: responseServer.transactionId,
                            clientTransId: responseServer.clientTransId,
                            date: responseServer.date,
                        }
                        const result = await this.database.insertTransaction(transaction);

                        if (result) {
                            let supplier_logo = responseServer.ticket.logo
                            const supplier = await this.database.getSupplierByLogo(supplier_logo);

                            let monto = responseServer.ticket.body.Valor.replace(",", "");
                            monto = monto.replace("$", "");
                    


                            const ticket = {
                                transactionId: responseServer.ticket.body.Aprobacion,
                                ticketNumber: responseServer.ticket.body.Numero,
                                amount: monto,
                                footer: responseServer.ticket.footer,
                                supplierId: supplier.supplier_id,
                            }

                            const resultTicket = await this.database.insertTicket(ticket);

                            if (resultTicket) {
                                return res.status(200).send(body);
                            } else {
                                return res.status(500).send("Error generando el ticket");
                            }
                        } else {
                            return res.status(500).send("Error en el servidor");
                        }
                    } else {
                        return res.status(500).send("token vencido");
                    }
                }

            });

        }
    }
}


module.exports = rechargeController;