import sequelize from '../db/connection';
import { DataTypes } from 'sequelize'; 

const Subtask = sequelize.define('subtask', {
    idsubtask: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    description: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    status: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    priority: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    idtask: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assignedUser:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default Subtask;