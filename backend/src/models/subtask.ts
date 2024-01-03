import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

const Subtask = sequelize.define("subtask", {
  idsubtask: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idtask: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'tasks',
      key: 'idtask',
    },
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'iduser',
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtaskdescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtaskstatus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Subtask;
