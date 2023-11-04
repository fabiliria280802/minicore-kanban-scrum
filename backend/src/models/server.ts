import express, { Application } from 'express';
import routesUsers from '../routes/user.routes'

class Server{
    
    private app: Application;
    private port: string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT ?? '4000';
        this.middlewares();
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
    middlewares(){
        this.app.use(express.json());
    }
}

export default Server;