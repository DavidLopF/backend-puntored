const express = require("express");
const corse = require("cors");
const logger = require('morgan');
const colors = require('colors');

class Server {
    constructor() {
        this.port = process.env.PORT
        this.app = express();
        this.server = require('http').Server(this.app);

        this.middlewares();

        this.auth = '/api/auth';
        this.supplier = '/api/supplier';
        this.recharge = '/api/recharge';

        this.routes();

    }

    middlewares() {
        this.app.use(corse());

        this.app.use(logger('dev'));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(express.static(__dirname + '/public'));

       
    }

    routes() {

        this.app.use(this.auth, require('./routes/auth'));
        this.app.use(this.supplier, require('./routes/supplier'));
        this.app.use(this.recharge, require('./routes/recharge'));

        this.app.get('/', (req, res) => {
            res.render('home');
        });

        this.app.use((req, res, next) => {
            res.status(404).send('404 Not Found');
        });


       
    }

    launcher() {
        this.server.listen(this.port, () => {
            console.log(colors.bgMagenta.white.bold('Server running on port ' + this.port));
        });
    }

}


module.exports = Server;

