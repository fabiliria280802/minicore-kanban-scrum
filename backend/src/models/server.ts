//rutas
import routesUsers from "../routes/user.routes";
import routesSprints from "../routes/sprint.routes";
import routesTasks from "../routes/task.routes";
import routesSubtasks from "../routes/subtask.routes";
//models
import Task from "./task";
import Subtask from "./subtask";
import Sprint from "./sprint";
import User from "./user";
//conexion db
import connection from "../db/connection";
//adicionales
import express, { Application } from "express";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? "4000";
    this.middlewares();
    this.routes();
    this.connectDB();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto " + this.port);
    });
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }
  routes() {
    this.app.use("/api/users", routesUsers);
    this.app.use("/api/sprints", routesSprints);
    this.app.use("/api/tasks", routesTasks);
    this.app.use("/api/subtasks", routesSubtasks);
  }
  async connectDB() {
    /*connection.connect((err)=>{
            if(err){
                console.log(err);
                return;
            }
            console.log("Base de datos online");
        })*/
    try {
      await User.sync();
      await Task.sync();
      await Subtask.sync();
      await Sprint.sync();
      console.log("Base de datos online");
    } catch (error) {
      console.log("No se pudo conectar");
    }
  }
}

export default Server;
