import { Server } from 'socket.io';
import http from 'http';

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:4173', 'http://localhost:5173'],
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected to socket');
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

export const emitUpdate = (event, data) => {
  if (io) {
    io.emit(event, data);
    console.log(`Emitted ${event}:`, data);
  }
};
