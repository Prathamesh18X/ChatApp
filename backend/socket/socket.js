import { Server } from "socket.io";//initial Statement
import http from "http";
import express from "express";

const app = express(); //step 1:. load app from server.js

const server = http.createServer(app);//Step 2: create server using http.createServer(app)
const io = new Server(server, { //Step 3: create io using new Server(server) and add cross origin cors
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};

export const getGroupReceiverSocketIds = (receiverIds) => {
	return receiverIds.map((receiverId) => userSocketMap[receiverId]);
}
const userSocketMap = {};// {userId: socketId}

io.on("connection", (socket) => {//step 5: test the connection and connected IDs
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	// io.emit() is used to send events to all the connected clients
	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	// socket.on() is used to listen to the events. can be used both on client and server side
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});

export { app, io, server };//step 4: export app , server and io

