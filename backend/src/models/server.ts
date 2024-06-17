//rutas
import routesUsers from "../routes/user.routes";
import routesSprints from "../routes/sprint.routes";
import routesTasks from "../routes/task.routes";
import routesSubtasks from "../routes/subtask.routes";

//models
//config fk
import { Task, Subtask, Sprint, User } from './index';
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
    this.port = process.env.DB_PORT ?? "4000";
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

    // Configuración de CORS con múltiples orígenes permitidos
    const allowedOrigins = [
      'https://minicore-kanban-scrum-frontend.vercel.app',
      'https://minicore-kanban-scrum-fron-git-92a510-fabiliria280802s-projects.vercel.app'
    ];

    this.app.use(cors({
      origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin!) !== -1 || !origin) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      }
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
      await Sprint.sync();
      await User.sync();
      await Task.sync();
      await Subtask.sync();
      console.log("Base de datos online");
    } catch (error) {
      console.log("No se pudo conectar");
    }
  }
}

export default Server;
