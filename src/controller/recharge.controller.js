const request = require("request");
const Database = require("../db/config");


class rechargeController {

    constructor() {
        this.database = new Database();
    }

    getViewTransactions() {
        return (req, res) => {
            res.render("transactions");
        }
    }

    getViewPanel() {
        return (req, res) => {
            res.render("panel");
        }
    }

    getALLTransactions() {
        return async (req, res) => {
            const id = req.params.id;
            const transaction = await this.database.getAllTicketsOfAprobacion();
            const supplier = await this.database.getALlSuppliers();

            //poner el nombre de los proveedores en el ticket
            for (let i = 0; i < transaction.length; i++) {
                for (let j = 0; j < supplier.length; j++) {
                    if (transaction[i].supplier_trans_id == supplier[j].supplier_id) {
                        transaction[i].supplierName = supplier[j].supplier_name;
                    }
                    transaction[i].transaction_date = transaction[i].transaction_date.toString().substring(0, 10)
                }
            }

    
            
            res.status(200).json({
                message: "Transacciones",
                body: transaction
            });
        }
    }

    getTicket() {
        return (req, res) => {
            res.render("ticket");
        }
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
                                return res.status(200).json({
                                    message: "Compra exitosa",
                                    body: responseServer
                                });

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