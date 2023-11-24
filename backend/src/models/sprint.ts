import sequelize from '../db/connection';
import { DataTypes } from 'sequelize';

const Sprint = sequelize.define('sprint',{
    idsprint:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.INTEGER,
        allowNull: true
    },
    doingPorcentage:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    donePorcentage:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default Sprint;