const express = require("express");
const app = express();
const http = require("http");
const cors = require('cors');
const { Server } = require("socket.io");
const axios = require('axios');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
});

let onlineUsers = [];
const activeRooms = new Set();

io.on("connection", (socket) => {
    socket.on("connect", () => {
        console.log("Socket.IO connected!");
    });

    socket.on("joinRoom", (data) => {
        socket.join(data);
    });

    socket.on("sendMessage", async(data) => {
        socket.to(data.room).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        io.emit("getOnlineUser", onlineUsers);
    })
})

const port = 6969;
server.listen(port, () => {
    console.clear();
    console.log(`Listening to port ${port}`);
});