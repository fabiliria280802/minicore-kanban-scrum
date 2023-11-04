import express, { Application } from 'express';
import routesUsers from '../routes/user.routes'
import connection from '../db/connection';
class Server{
    
    private app: Application;
    private port: string;
    constructor(){
        this.app = express();
        this.port = process.env.PORT ?? '4000';
        this.middlewares();
        this.routes();
        this.connectDB();
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port);
        });
    }
    middlewares(){
        this.app.use(express.json());
    }
    routes(){
        this.app.use('/api/users', routesUsers);
    }
    connectDB(){
        connection.connect((err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Base de datos online");
        })
    }
}

export default Server;