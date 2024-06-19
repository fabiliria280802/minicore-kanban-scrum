"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPosition = exports.UserType = void 0;
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
var UserType;
(function (UserType) {
    UserType["Admin"] = "Administrador";
    UserType["Dev"] = "Desarrollador";
    UserType["Viewer"] = "Visualizador";
})(UserType || (exports.UserType = UserType = {}));
var UserPosition;
(function (UserPosition) {
    UserPosition["ScrumMaster"] = "Scrum Master";
    UserPosition["ProductOwner"] = "Product Owner";
    UserPosition["DeveloperBackend"] = "Desarrollador Backend";
    UserPosition["DeveloperFrontend"] = "Desarrollador Frontend";
    UserPosition["DeveloperFullStack"] = "Desarrollador FullStack";
    UserPosition["QualityAssurance"] = "QA";
    UserPosition["UXDesigner"] = "UX Designer";
    UserPosition["UXWriter"] = "UX Writer";
    UserPosition["Architect"] = "Arquitecto";
    UserPosition["Intern"] = "Pasante";
})(UserPosition || (exports.UserPosition = UserPosition = {}));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserType)),
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(UserPosition)),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    modelName: 'users',
});
exports.default = User;
