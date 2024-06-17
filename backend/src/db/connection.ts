import { Sequelize } from 'sequelize';

const dbHost: string = process.env.DB_HOST ?? (() => { throw new Error('DB_HOST is not defined'); })();
const dbUser: string = process.env.DB_USER ?? (() => { throw new Error('DB_USER is not defined'); })();
const dbPassword: string = process.env.DB_PASSWORD ?? (() => { throw new Error('DB_PASSWORD is not defined'); })();
const dbName: string = process.env.DB_NAME ?? (() => { throw new Error('DB_NAME is not defined'); })();
const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  port: dbPort,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;

