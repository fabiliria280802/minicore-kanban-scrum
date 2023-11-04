import express, { Application } from 'express';
import routesUsers from '../routes/user.routes'

class Server{
    
    private app: Application;
    private port: string;
    constructor(){
        this.port = process.env.PORT ?? '4000';
        this.app = express();
        this.routes();
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
    routes(){
        this.app.use('/api/users', routesUsers);
    }
}

export default Server;