import "dotenv/config";
import express from "express";
import http from "node:http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", socket => {
  console.log("Client connected");

  socket.on("scale", args => {
    console.log("Recived args: " + args);
    io.emit("scale", [
      {
        name: "Device 1",
        posX: 20,
        posY: 20,
      },
      {
        name: "Device 2",
        posX: 30,
        posY: 10,
      },
      {
        name: "Device 3",
        posX: 15,
        posY: 60,
      },
    ]);
  });

  socket.on("message", message => {
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
