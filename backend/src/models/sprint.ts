import sequelize from '../db/connection';
import { DataTypes } from 'sequelize';

const Sprint = sequelize.define('sprint',{
    idsprint:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isCorrectFormat(value: string) {
            if (!value.startsWith('Sprint #')) {
              throw new Error('El título debe empezar con "Sprint #"');
            }
          }
        }
      },
    initialDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    finalDate:{
        type: DataTypes.DATE,
        allowNull: false
    },
    committedPoints:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fulfilledPoints:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    noFulfilledPoints:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    toDoPorcentage:{
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    doingPorcentage:{
        type: DataTypes.DECIMAL,
        allowNull: true
    },
    donePorcentage:{
        type: DataTypes.DECIMAL,
        allowNull: true
    },
});

export default Sprint;