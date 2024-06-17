require('dotenv').config();
import { Sequelize } from 'sequelize';

const dbHost: string = process.env.DB_HOST || 'Gambito';
const dbUser: string = process.env.DB_USER || 'Rogue';
const dbPassword: string = process.env.DB_PASSWORD || 'Logan';
const dbName: string = process.env.DB_NAME || 'Mystique';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;

