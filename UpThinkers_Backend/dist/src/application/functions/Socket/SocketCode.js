"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSocket = void 0;
const chatRepository_1 = require("./chatRepository");
const connectSocket = (io) => {
    io.on('connection', (socket) => {
        console.log("scoket connected");
        socket.on('join', (Data) => { socket.join(Data); });
        socket.on('new_message', (Data) => {
            io.to(Data.to).emit('incoming_message', Data);
            chatRepository_1.chatRepoLayer.addChat(Data);
        });
        socket.on("online", (data) => {
            io.to(data.personId).emit("online", data);
        });
        socket.on("custom_message", (data) => {
            console.log("custom message found");
            io.to(data.personId).emit("custom_message", data);
        });
    });
};
exports.connectSocket = connectSocket;
