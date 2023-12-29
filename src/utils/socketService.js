// socketService.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:3020'); // Replace with your server's URL

const socketService = {
  on: (event, callback) => {
    socket.on(event, callback);
  },
  emit: (event, data) => {
    socket.emit(event, data);
  },
  disconnect: () => {
    socket.disconnect();
  },
};

export default socketService;
