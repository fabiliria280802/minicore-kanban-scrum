// rutas
require('dotenv').config();
import routesUsers from "../routes/user.routes";
import routesSprints from "../routes/sprint.routes";
import routesTasks from "../routes/task.routes";
import routesSubtasks from "../routes/subtask.routes";

// models
// config fk
import { Task, Subtask, Sprint, User } from './index';
// conexión db
import connection from "../db/connection";
// adicionales
import express, { Application } from "express";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT ?? "4002";
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
    this.app.use(cors({
      origin: 'http://localhost:4200',
      credentials: true
    }));
  }
  routes() {
    this.app.use("/api/users", routesUsers);
    this.app.use("/api/sprints", routesSprints);
    this.app.use("/api/tasks", routesTasks);
    this.app.use("/api/subtasks", routesSubtasks);
  }
  async connectDB() {
    try {
      await connection.authenticate();
      console.log("Conexión a la base de datos exitosa");
      await User.sync();
      await Sprint.sync();
      await Task.sync();
      await Subtask.sync();
      console.log("Base de datos online");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  }
}

export default Server;

