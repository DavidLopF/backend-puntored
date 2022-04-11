const pg = require('pg');
const colors = require('colors');



class PostgresConection {
    constructor() {
        try {
            const conection = 'postgres://xgoaqvxghpezto:31f28209a5418053200c9e1600245a53408dcf7b36c67f61643495b69163be4b@ec2-34-194-158-176.compute-1.amazonaws.com:5432/d6516oupchpj20'
            this.client = new pg.Client(conection);
            
        }catch (e) {
            console.log(e);
        }
    }

    async getUser(username) {
        this.client.connect();
        const res = await this.client.query(`SELECT * FROM public.user WHERE username = '${username}'`);
        if (res.rows.length > 0) {
            return res.rows[0];
            this.client.end();
        } else {
            return false;
            this.client.end();
        }
       
    }

    async insertUser(username, password) {
        this.client.connect()
        await this.client.query(`INSERT INTO public.user (username, password) VALUES ('${username}', '${password}')`);
        if (this.client.query) {
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

    async getAllTicketsOfAproacion() {
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