# 🌐 Universal Socket.IO WebSocket System

A fully reusable real-time socket setup supporting:

- ✅ One-to-One
- ✅ One-to-Many
- ✅ Many-to-One
- ✅ Broadcast
- ✅ Room Chat

Works with any frontend (JS/React/Flutter) and backend (Laravel, Python, Node, etc.)

---

## 🚀 Setup (Backend)

```bash
cd universal_socket
npm init -y
npm install express socket.io
node socketServer.js
```

Server will start at:  
👉 http://localhost:3000

---

## 💻 Frontend Usage (JavaScript)

```js
import { io } from "socket.io-client";
const socket = io("http://localhost:3000");

socket.emit("register", "userId1");
socket.emit("one_to_one", { toUserId: "userId2", message: "Hello!" });
socket.on("receive_one_to_one", (data) => console.log(data));
```

Or by including via CDN:

```html
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js"></script>
<script>
  const socket = io("http://localhost:3000");
  socket.emit("register", "userId1");
  socket.emit("one_to_one", { toUserId: "userId2", message: "Hello!" });
  socket.on("receive_one_to_one", (data) => console.log(data));
</script>
```

---

## 📱 Flutter Usage

```dart
final socket = SocketService();
socket.connect("userId1");

socket.listenAll((event, data) {
  print("📨 $event -> $data");
});

socket.sendOneToOne("userId2", "Hello userId2");
socket.broadcast("Hi all!");
```

---

## 🧩 Communication Types

| Type        | Emit Event      | Description                     |
| ----------- | --------------- | ------------------------------- |
| One-to-One  | `one_to_one`    | Send message to specific user   |
| One-to-Many | `one_to_many`   | Send message to multiple users  |
| Many-to-One | `many_to_one`   | Multiple senders to one target  |
| Broadcast   | `broadcast_all` | Send message to all users       |
| Room Chat   | `room_message`  | Send message inside joined room |

---

## 🪄 Shortcut Command (Instant Socket Server)

```bash
npx express-generator && npm i socket.io && node -e "require('socket.io')(3000,{cors:{origin:'*'}}).on('connection',s=>{s.onAny((e,d)=>console.log(e,d));})"
```

---

## ⚙️ Integration Tips

- Works with any backend (Laravel, Python, Go)
- Use `.env` for SOCKET_URL (e.g., `SOCKET_URL=http://localhost:3000`)
- Add JWT auth middleware if needed
- Scale with Redis adapter for multi-instance apps

---

## 🧠 Author Notes

Drop `/universal_socket` into any backend folder → run `node socketServer.js` → plug client SDK → done! 🔥
