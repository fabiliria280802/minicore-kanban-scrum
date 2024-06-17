require('dotenv').config();
import { Sequelize } from 'sequelize';

const dbHost: string = process.env.DB_HOST || 'bvqarnycdzwzhelzirlo-mysql.services.clever-cloud.com';
const dbUser: string = process.env.DB_USER || 'uraaehwcpsexoszv';
const dbPassword: string = process.env.DB_PASSWORD || 'AhifG2DdVi4bmvIKfJBe';
const dbName: string = process.env.DB_NAME || 'bvqarnycdzwzhelzirlo';
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;

