import sequelize from '../db/connection';
import { DataTypes } from 'sequelize';

const Task = sequelize.define('task',{
    idtask:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    priority:{
        type: DataTypes.STRING,
        allowNull: false
    },
    iduser:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idsprint:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assignedUser:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Task;