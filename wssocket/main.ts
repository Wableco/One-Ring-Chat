import { Server, Socket } from "socket.io";
import { IRoom, findRoom, joinRoom } from "./utils";

const ws = new Server(3000);

let rooms: Array<IRoom> = [
  {
    id: 1,
    person1: {
      status: 1,
      name: "",
      userID: "",
    },
    person2: {
      status: 1,
      name: "",
      userID: "",
    },
  },
];

ws.on("connection", (ws: Socket) => {
  console.log('alguem conectou')
  ws.emit("connection", { message: "Você conectou ao servidor WebSocket" });

  ws.on("joinRoom", joinRoom(rooms, ws));

  ws.on("message", (msg) => {

    let room = rooms.find(findRoom(ws.id))

    if(room){
        ws.to(`${room.id}`).emit('message', {user: room.person1.userID === ws.id ? room.person1.name : room.person2.name , message: msg})
    }

  });

  ws.on("rooms", () => {
    console.log(rooms)
  });

  ws.on("nextRoom", () => {
    let room = rooms.find(findRoom(ws.id));
    // let index = rooms.findIndex(findRoom(ws.id));
    if (room) {
      ws.leave(`${room.id}`);
      let person = room.person1.userID === ws.id ? room.person1.name : room.person2.name;
      
      joinRoom(rooms, ws)({ username: person });
      
      if (room.person1.userID === ws.id) {
        ws.to(`${room.id}`).emit('joinRoom', {message: "Usuario saiu da sala", user: room.person1.name})

        room.person1.userID = "";
        room.person1.name = "";
        room.person1.status = 1;
      } else {
        ws.to(`${room.id}`).emit('joinRoom', {message: "Usuario saiu da sala", user: room.person2.name})

        room.person2.userID = "";
        room.person2.name = "";
        room.person2.status = 1;
      }

      if (
        room.person1.status === 1 &&
        room.person2.status === 1 &&
        room.id != 1
      ) {
        let index = rooms.findIndex((element) => element.id === room.id);
        rooms.splice(index, 1);
      }

    }
  });

  ws.on("disconnect", (msg) => {
    let room = rooms.find(
      (element) =>
        element.person1.userID === ws.id || element.person2.userID === ws.id
    );

    if (room) {
      if (room.person1.userID === ws.id) {
          ws.to(`${room.id}`).emit("disconnected", {
            message: "Usuario disconectado",
            user: room.person1.name,
          });
        room.person1.status = 1;
        room.person1.name = "";
        room.person1.userID = "";
      } else {
          ws.to(`${room.id}`).emit("disconnected", {
            message: "Usuario disconectado",
            user: room.person2.name,
          });
        room.person2.status = 1;
        room.person2.name = "";
        room.person2.userID = "";
      }

      if (
        room.person1.status === 1 &&
        room.person2.status === 1 &&
        room.id != 1
      ) {
        let index = rooms.findIndex((element) => element.id === room.id);
        rooms.splice(index, 1);
        ws.leave(`${room.id}`);
      }
    }

  });
});

console.log("############-initiated-############")