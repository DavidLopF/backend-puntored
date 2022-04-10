const { Pool } = require('pg');
const colors = require('colors');


class PostgresConection {
    constructor() {

        try {
            this.pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_DATABASE,
                password: process.env.DB_PASS,
                port: process.env.DB_PORT,
            });
        } catch (err) {
            console.log(colors.red(err));
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
            return true;
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
}

module.exports = PostgresConection;