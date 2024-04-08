import { io } from 'socket.io-client';
import { myIP } from '../apis/api';

const socket = io(`http://${myIP}:8080`);

socket.on('connect', () => {
  console.log('Socket status: Connected');
});

socket.on('disconnect', () => {
  console.log('Socket status: Disconnected');
});

export default socket;