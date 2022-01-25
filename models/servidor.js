const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');
class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        //Base de datos
        this.conectarDB();
        //Middlewares
        this.app.use( cors() );
        this.app.use( express.json() );
        //Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes(){
        this.app.use('/api/cacao', require('../routes/cacao'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Aplicación ejecutandose en la direccion http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;