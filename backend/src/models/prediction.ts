import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

const Prediction = sequelize.define("prediction", {
  idprediction: {
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
  predictedPointsLower: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  predictedPointsUpper: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  confidenceInterval: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Prediction;
