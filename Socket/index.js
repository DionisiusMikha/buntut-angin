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
    socket.on("nyambung", () => {
        console.log("Socket.IO connected!");
    });

    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((o) => o.userId === userId) && 
            onlineUsers.push({
                userId,
                socketId: socket.id
            })
        io.emit("getOnlineUsers", onlineUsers);
    })

    socket.on("joinRoom", (data) => {
        socket.join(data);
    });

    socket.on("sendMessage", async(message) => {
        socket.to(message.room).emit("receiveMessage", message);
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