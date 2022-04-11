const { Pool } = require('pg');
const colors = require('colors');



class PostgresConection {
    constructor() {
        try {
            this.pool = new Pool({
                user: "vudfovjwyhsggr",
                password: "02fdd1071b99ab04593bcd48c0e8a5b3cd2bc934b042f272dbf3f320460946b7",
                database: "d6588jjfpchkk9",
                port: 5432,
                host: "ec2-3-225-213-67.compute-1.amazonaws.com",
                ssl: { rejectUnauthorized: false }
            });

        } catch (error) {
            console.log(error);



        }
    }

    async getUser(username) {

        const res = await this.pool.query(`SELECT * FROM public.user WHERE username = '${username}'`);
        if (res.rows.length > 0) {
            return res.rows[0];

        } else {
            return false;

        }

    }

    async insertUser(username, password) {

        await this.pool.query(`INSERT INTO public.user (username, password) VALUES ('${username}', '${password}')`);
        if (this.pool.query) {
            const get = await this.getUser(username);
            return get;
        } else {
            return false;
        }
    }

    async getALlSuppliers() {
        const res = await this.pool.query(`SELECT * FROM public.supplier`);
        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return false;
        }
    }

    async getSupplierByLogo(logo) {
        const res = await this.pool.query(`SELECT * FROM public.supplier WHERE supplier_logo = '${logo}'`);
        if (res.rows.length > 0) {
            return res.rows[0];
        } else {
            return false;
        }

    }

    async insertSupplier(supplier_id, supplier_name, supplier_logo) {
        await this.pool.query(`INSERT INTO public.supplier (supplier_id, supplier_name, supplier_logo) VALUES ('${supplier_id}', '${supplier_name}', '${supplier_logo}')`);
        if (this.pool.query) {
            return true;
        } else {
            return false;
        }

    }

    async deleteAllSuppliers() {
        await this.pool.query(`DELETE FROM public.supplier`);
        if (this.pool.query) {
            return true;
        } else {
            return false;
        }
    }

    async insertTransaction(transaction) {
        await this.pool.query(`INSERT INTO public.transaction (transaction_id, client_trans_id, transaction_date, active) 
        VALUES ('${transaction.transactionId}', '${transaction.clientTransId}', '${transaction.date}', true)`);
        if (this.pool.query) {
            return true;
        } else {
            return false;
        }
    }


    async insertTicket(ticket) {
        await this.pool.query(`INSERT INTO public.ticket (transaction_id, ticket_number, amount, footer, supplier_trans_id) 
        VALUES ('${ticket.transactionId}', '${ticket.ticketNumber}', '${ticket.amount}', '${ticket.footer}', '${ticket.supplierId}')`);
        if (this.pool.query) {
            return true;
        } else {
            return false;
        }
    }

    async getAllTransactionsOfUser(id) {

        //traer todas las transacciones con el ticket
        const res = await this.pool.query(`SELECT * FROM public.transaction WHERE user_id = '${id}'`);
        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return false;
        }
    }

    async getAllTicketsOfAprobacion() {
        const res = await this.pool.query(`
        SELECT *
        FROM public.TRANSACTION 
        LEFT JOIN public.ticket ON ticket.transaction_id = TRANSACTION.transaction_id
        `);
        if (res.rows.length > 0) {
            return res.rows;
        } else {
            return false;
        }
    }
}

module.exports = PostgresConection;