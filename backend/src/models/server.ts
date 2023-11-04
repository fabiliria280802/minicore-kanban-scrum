import express, { Application } from 'express';

class Server{
    
    private app: Application;
    private port: string;
    constructor(){
        this.port = '3000';
        this.app = express();
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
}

export default Server;