import sequelize from "../db/connection";
import { DataTypes } from "sequelize";

const Prediction = sequelize.define("prediction", {
  idprediction: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
