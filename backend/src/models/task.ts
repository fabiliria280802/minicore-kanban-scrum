import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";

export enum TaskStatus {
  todo = 'Por hacer',
  doing = 'Avanzada',
  done = 'Finalizada',
}

export enum TaskPoints {
  none = 0,
  one = 1,
  three = 3,
  five = 5,
  eight = 8,
  thirteen = 13,
}

export enum TaskPriority {
  low = 'Baja',
  medium = 'Media',
  high = 'Alta',
}

class Task extends Model {
  public id!: number;
  public idsprint!: number;
  public iduser!: number;
  public title!: string;
  public taskdescription!: string;
  public status!: TaskStatus;
  public points!: TaskPoints;
  public priority!: TaskPriority;
  public expectedTime!: number | null;
  public doneTime!: number | null;
  public conclutiontime!: string | null;
  public assignedFullName!: string | null;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idsprint: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'sprints',
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
  taskdescription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isIn: [[TaskPoints.none, TaskPoints.one, TaskPoints.three, TaskPoints.five, TaskPoints.eight, TaskPoints.thirteen]],
    },
  },
  priority: {
    type: DataTypes.ENUM(...Object.values(TaskPriority)),
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
}, {
  sequelize,
  modelName: 'tasks',
});

export default Task;