import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

const Sprint = sequelize.define("sprint", {
  idsprint: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idprediction: {
    type: DataTypes.INTEGER,
    references: {
      model: 'sprints',
      key: 'idsprint',
    },
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
  //Puntos comprometidos
  committedPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //finalizado = puntos hechos
  fulfilledPoints: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //Avanzado
  pendingPoints:{
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //por hacer
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
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default Sprint;
