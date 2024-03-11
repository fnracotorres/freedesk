import 'dotenv/config';
import io from 'socket.io-client';

const socket = io(process.env.SOCKET_IO_CLIENT_PORT);

socket.on('message', message => {
  console.log(`Received message: ${message}`);
});

setTimeout(() => {
  socket.emit('message', 'Hello from Node.js client!');
});
