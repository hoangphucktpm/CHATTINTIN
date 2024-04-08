import { io } from 'socket.io-client';

const socket = io("http://localhost:8080");

socket.on('connect', () => {
  console.log('Socket status: Connected');
});

socket.on('disconnect', () => {
  console.log('Socket status: Disconnected');
});

export default socket;