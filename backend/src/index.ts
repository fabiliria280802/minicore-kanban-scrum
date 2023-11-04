import { configDotenv } from 'dotenv';
import Server from "./models/server";

configDotenv();

const server = new Server();

server.listen();