const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let users = {}; // { userId: socketId }

io.on('connection', (socket) => {
  console.log('🟢 Connected:', socket.id);

  socket.on('register', (userId) => {
    users[userId] = socket.id;
    console.log(`👤 User Registered: ${userId} -> ${socket.id}`);
  });

  socket.on('one_to_one', (data) => {
    const { toUserId, message } = data;
    const receiverSocketId = users[toUserId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_one_to_one', { from: socket.id, message });
    }
  });

  socket.on('one_to_many', (data) => {
    const { toUserIds, message } = data;
    toUserIds.forEach(uid => {
      const receiverSocketId = users[uid];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receive_one_to_many', { from: socket.id, message });
      }
    });
  });

  socket.on('many_to_one', (data) => {
    const { toUserId, message } = data;
    const receiverSocketId = users[toUserId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_many_to_one', { from: socket.id, message });
    }
  });

  socket.on('broadcast_all', (data) => {
    io.emit('receive_broadcast', { from: socket.id, message: data.message });
  });

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`🏠 ${socket.id} joined ${room}`);
  });

  socket.on('room_message', (data) => {
    const { room, message } = data;
    io.to(room).emit('receive_room_message', { from: socket.id, message });
  });

  socket.on('disconnect', () => {
    console.log('🔴 Disconnected:', socket.id);
    for (let uid in users) {
      if (users[uid] === socket.id) delete users[uid];
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Socket.IO running on port ${PORT}`));
