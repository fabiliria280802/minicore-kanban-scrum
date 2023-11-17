import express, { Application } from 'express';
import routesUsers from '../routes/user.routes';
import routesSprints from '../routes/sprint.routes';
import routesTasks from '../routes/task.routes';
import routesSubtasks from '../routes/subtask.routes';
import connection from '../db/connection';
import cors from 'cors';

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
        this.app.use(cors());
    }
    routes(){
        this.app.use('/api/users', routesUsers);
        this.app.use('/api/sprints', routesSprints);
        this.app.use('/api/tasks', routesTasks);
        this.app.use('/api/subtasks', routesSubtasks);
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