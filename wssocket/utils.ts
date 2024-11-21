import { Socket } from "socket.io";

export interface IRoom {
  id: number;
  person1: {
    /** "0" = conectado | "1" = disconectado */
    status: 0 | 1;
    name: string;
    userID: string;
  };
  person2: {
    /** "0" = conectado | "1" = disconectado */
    status: 0 | 1;
    name: string;
    userID: string;
  };
}
/**busca uma sala disponivel */
export const findAvailableRoom = (element: IRoom) =>
  (element.person1.status === 0 && element.person2.status === 1) ||
  (element.person2.status === 0 && element.person1.status === 1) ||
  (element.person2.status === 1 && element.person1.status === 1);

/**encontra a sala em que o usuario se encontra */
export const findRoom = (id: string) => (element: IRoom) =>
  element.person1.userID === id || element.person2.userID === id;


export const joinRoom = (rooms: Array<IRoom>, ws: Socket) => (msg: { username: string; }) => {
  //Busca uma sala disponivel
  const room = rooms.find(findAvailableRoom);
  //Entra em uma sala disponivel
  if (room) {
    ws.join(`${room.id}`);
    let index = rooms.find((element) => element.id === room.id);
    if (index) {
      if (index.person1.status === 1) {
        index.person1.status = 0;
        index.person1.name = msg.username;
        index.person1.userID = ws.id;
      } else {
        index.person2.status = 0;
        index.person2.name = msg.username;
        index.person2.userID = ws.id;
      }
    }

    ws.to(`${room.id}`).emit("joinRoom", { message: "Usuario conectado!", roomID: room.id });
  }
  //Cria uma sala
  else {
    rooms.sort((a, b) => a.id - b.id);

    let id = rooms.map((element, index) => {
      let current = element.id;
      let previous = rooms[index - 1]?.id || 0;

      if (current - previous > 1) {
        return previous + 1;
      } else {
        return current + 1;
      }
    });

    id.sort((a, b) => b - a);

    let room: IRoom = {
      id: id[0],
      person1: { status: 0, name: msg.username, userID: ws.id },
      person2: { status: 1, name: "", userID: "" },
    };

    rooms.push({ ...room });
    ws.join(`${id}`);
    ws.emit("joinRoom", { message: "Bem vindo a nova Sala!", roomID: id[0] });
  }
}