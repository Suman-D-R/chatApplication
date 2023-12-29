import dotenv from 'dotenv';
dotenv.config();

import socketIo from 'socket.io';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import database from './config/database';
import {
  appErrorHandler,
  genericErrorHandler,
  notFound
} from './middlewares/error.middleware';
import logger, { logStream } from './config/logger';

import morgan from 'morgan';

const app = express();
const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined', { stream: logStream }));

database();

app.use(`/api/${api_version}`, routes());
app.use(appErrorHandler);
app.use(genericErrorHandler);
app.use(notFound);

const server = app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

const io = socketIo(server,{
  cors: {
    origin: 'http://localhost:3001'
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Listen for a message event
  socket.on('message', (data) => {
    socket.data = data;
    console.log('Message from client:', data);

    // Example: Broadcast the message to all connected clients
    io.emit('message', socket.data);
  });

  // Example: Listen for a disconnect event
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


export default app;
