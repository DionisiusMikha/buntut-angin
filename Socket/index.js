const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUser = []

io.on("connection", (socket) => {
    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((u) => u.userId === message.recipientId);

        if (user){
            io.to(user.socketId).emit("getMessage", message);
        }
    })
})

const port = 6969;
io.listen(port);