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
  taskdescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expectedTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  doneTime: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  conclutiontime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  assignedFullName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Task;
