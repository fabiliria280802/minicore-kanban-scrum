import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

const Task = sequelize.define("task", {
  idtask: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idsprint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sprints',
      key: 'idsprint',
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
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assignedUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Task;
