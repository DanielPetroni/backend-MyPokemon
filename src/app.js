const express = require('express')
const routes = require('./routes')

class App {
    constructor() {
        this.server = express()
        this.middewares();
        this.routes();
    }

    middewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;