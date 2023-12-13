const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUser = []

io.on("connection", (socket) => {
    socket.on("addNewUser", (userId) => {
        !onlineUser.some((o) => o.userId === userId) && 
            onlineUser.push({
                userId,
                socketId: socket.id
            });
        io.emit("getOnlineUser", onlineUser);
    })

    socket.on("sendMessage", (message) => {
        const user = onlineUser.find((u) => u.userId === message.recipientId);

        if (user){
            io.to(user.socketId).emit("getMessage", message);
        }
    })

    socket.on("disconnect", () => {
        onlineUser = onlineUser.filter((o) => o.socketId !== socket.id);

        io.emit("getOnlineUser", onlineUser);
    })
})

const port = 6969;
io.listen(port);