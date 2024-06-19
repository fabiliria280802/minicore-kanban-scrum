require('dotenv').config();
import Server from "./models/server";
import {seedDatabase} from './data/index';

const server = new Server();

const startServer = async () => {
  await server.connectDB();
  await seedDatabase();
  server.listen();
};

startServer();

