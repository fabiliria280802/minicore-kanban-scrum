import sequelize from "../db/connection";
import { DataTypes, Model } from "sequelize";

export enum SprintStatus {
  toStart = 'Por iniciar',
  initialize = 'Iniciado',
  completed = 'Completado',
}

class Sprint extends Model {
  public id!: number;
  public title!: string;
  public initialDate!: Date;
  public finalDate!: Date;
  public committedPoints!: number | null;
  public fulfilledPoints!: number | null;
  public pendingPoints!: number | null;
  public noFulfilledPoints!: number | null;
  public toDoPorcentage!: number | null;
  public doingPorcentage!: number | null;
  public donePorcentage!: number | null;
  public sprintstatus!: SprintStatus | null;
  public predictedPointsLower!: number | null;
  public predictedPointsUpper!: number | null;
  public confidenceInterval!: string | null;
}

Sprint.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isCorrectFormat(value: string) {
        if (!value.startsWith("Sprint #")) {
          throw new Error('El título debe empezar con "Sprint #"');
        }
      },
    },
  },
  initialDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  finalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  committedPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  fulfilledPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  pendingPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  noFulfilledPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  toDoPorcentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  doingPorcentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  donePorcentage: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  sprintstatus: {
    type: DataTypes.ENUM(...Object.values(SprintStatus)),
    allowNull: true,
  },
  predictedPointsLower: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  predictedPointsUpper: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  confidenceInterval: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'sprints',
});

export default Sprint;