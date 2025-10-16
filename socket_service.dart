import 'package:socket_io_client/socket_io_client.dart' as IO;

class SocketService {
  static final SocketService _instance = SocketService._internal();
  late IO.Socket socket;

  factory SocketService() => _instance;

  SocketService._internal() {
    socket = IO.io(
      'http://localhost:3000',
      IO.OptionBuilder().setTransports(['websocket']).disableAutoConnect().build(),
    );
  }

  void connect(String userId) {
    socket.connect();
    socket.onConnect((_) {
      print('🟢 Connected: ${socket.id}');
      socket.emit('register', userId);
    });
  }

  void sendOneToOne(String toUserId, String message) {
    socket.emit('one_to_one', {'toUserId': toUserId, 'message': message});
  }

  void sendOneToMany(List<String> toUserIds, String message) {
    socket.emit('one_to_many', {'toUserIds': toUserIds, 'message': message});
  }

  void sendManyToOne(String toUserId, String message) {
    socket.emit('many_to_one', {'toUserId': toUserId, 'message': message});
  }

  void broadcast(String message) {
    socket.emit('broadcast_all', {'message': message});
  }

  void joinRoom(String room) {
    socket.emit('join_room', room);
  }

  void sendRoomMessage(String room, String message) {
    socket.emit('room_message', {'room': room, 'message': message});
  }

  void listenAll(Function(String, dynamic) callback) {
    socket.onAny(callback);
  }

  void disconnect() {
    socket.disconnect();
  }
}
