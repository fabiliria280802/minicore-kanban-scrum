import { DataType } from 'sequelize';
import sequelize from '../db/connection';

const Task = sequelize.define('task',{
    idtask:{
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataType.STRING,
        allowNull: false
    },
    description:{
        type: DataType.STRING,
        allowNull: false
    },
    status:{
        type: DataType.STRING,
        allowNull: false
    },
    priority:{
        type: DataType.STRING,
        allowNull: false
    },
    iduser:{
        type: DataType.INTEGER,
        allowNull: false
    },
    idsprint:{
        type: DataType.INTEGER,
        allowNull: false
    }
})