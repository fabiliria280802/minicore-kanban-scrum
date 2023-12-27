import mysql from "mysql";
import keys from "../keys";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("minicore-kanban-scrum", "root", "28081409", {
  host: "localhost",
  dialect: "mysql",
});

//const connection = mysql.createConnection(keys);
//export default connection;
export default sequelize;
