import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.emit("register", "user1");
socket.emit("one_to_one", { toUserId: "user2", message: "Hey user2!" });
socket.emit("one_to_many", { toUserIds: ["user2", "user3"], message: "Hey everyone!" });
socket.emit("many_to_one", { toUserId: "admin", message: "Hi admin!" });
socket.emit("broadcast_all", { message: "Announcement for all users!" });

socket.emit("join_room", "room_1");
socket.emit("room_message", { room: "room_1", message: "Room 1 message" });

socket.onAny((event, data) => {
  console.log(`📨 ${event}:`, data);
});
