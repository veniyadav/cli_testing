const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",   // ⚠️ For dev only. Secure with domains in production.
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("📡 Client connected");

  socket.on("video", (data) => {
    socket.broadcast.emit("video", data); // broadcast to all except sender
  });

  socket.on("audio", (data) => {
    socket.broadcast.emit("audio", data);
  });
});

server.listen(3000, () => console.log("✅ Server listening on port 3000"));
