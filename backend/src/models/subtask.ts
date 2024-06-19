import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";

export enum SubtaskStatus {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

class Subtask extends Model {
  public id!: number;
  public idtask!: number;
  public iduser!: number;
  public title!: string;
  public subtaskdescription!: string;
  public subtaskstatus!: SubtaskStatus;
}

Subtask.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idtask: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
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
    type: DataTypes.ENUM(...Object.values(SubtaskStatus)),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'subtasks',
});

export default Subtask;