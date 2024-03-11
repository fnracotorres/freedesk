import "dotenv/config";
import express from "express";
import http from "node:http";
import { Server } from "socket.io";
import { default as client } from "socket.io-client";

const socket = client(process.env.SOCKET_IO_CLIENT_PORT);

socket.on("message", (message) => {
  console.log(`Received message: ${message}`);
});

setTimeout(() => {
  socket.emit("message", "Hello from Node.js client!");
});
const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    console.log(`Received message: ${message}`);

    io.emit("message", `Server: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(process.env.SOCKET_IO_SERVER_PORT, () => {
  console.log(`Server listening on port ${process.env.SOCKET_IO_SERVER_PORT}`);
});
