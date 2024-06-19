import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection';

export enum UserType {
  Admin = 'Administrador',
  Dev = 'Desarrollador',
  Viewer = 'Visualizador'
}

export enum UserPosition {
  ScrumMaster = 'Scrum Master',
  ProductOwner = 'Product Owner',
  DeveloperBackend = 'Desarrollador Backend',
  DeveloperFrontend = 'Desarrollador Frontend',
  DeveloperFullStack = 'Desarrollador FullStack',
  QualityAssurance = 'QA',
  UXDesigner = 'UX Designer',
  UXWriter = 'UX Writer',
  Architect = 'Arquitecto',
  Intern='Pasante'
}

class User extends Model {
  public id!: number;
  public fullname!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public type!: UserType;
  public position!: UserPosition;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(...Object.values(UserType)),
    allowNull: false,
  },
  position: {
    type: DataTypes.ENUM(...Object.values(UserPosition)),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'users',
});

export default User;


