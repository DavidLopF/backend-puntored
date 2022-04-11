CREATE TABLE public.USER(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);



CREATE TABLE public.SUPPLIER (
    supplier_id INTEGER NOT NULL,
    supplier_name VARCHAR(255) NOT NULL,
    supplier_logo VARCHAR(255) NOT NULL,
    PRIMARY KEY (supplier_id)
);

CREATE TABLE public.TRANSACTION (
    transaction_id VARCHAR(255) NOT NULL,
    client_trans_id INTEGER NOT NULL,
    transaction_date  VARCHAR(255) NOT NULL,
    active Boolean NOT NULL,
    PRIMARY KEY (transaction_id),
    FOREIGN KEY (client_trans_id) REFERENCES public.USER(user_id)
);



CREATE TABLE public.TICKET (
    ticket_id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(255) NOT NULL,
    ticket_number VARCHAR(255) NOT NULL,
    supplier_trans_id INTEGER NOT NULL,
         INTEGER NOT NULL,
    footer VARCHAR(255) NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES public.TRANSACTION(transaction_id),
    FOREIGN KEY (supplier_trans_id) REFERENCES public.SUPPLIER(supplier_id)
);

/*
    drop database
*/
DROP TABLE public.TICKET;
DROP TABLE public.TRANSACTION;
DROP TABLE public.USER ;
DROP TABLE public.SUPPLIER;

