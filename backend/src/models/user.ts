import sequelize from '../db/connection';
import { DataTypes } from 'sequelize';

const User = sequelize.define('user',{
    iduser:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;