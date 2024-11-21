import { io, Socket } from "socket.io-client";

const ws: Socket = io("ws://localhost:3000");

//mensagen iniciar notificando a conexão feito com sucesso
ws.on("connection", (msg) => {
  console.log(msg);

  //solicita a entrada em uma sala informando o username
  ws.emit("joinRoom", { username: "joão" });
});

// entra ou cria uma sala
ws.on("joinRoom", (msg) => {
  console.log(msg);
});

ws.on("message", (msg) => {
    const { user, message } = msg
  console.log(`[${user}]:  ${message}`);
});

//notifica quando outro usuario disconecta
ws.on("disconnected", (msg) => {
  console.log(msg);
});
// // metodo para fechar a conexão
// ws.close()

ws.on("rooms", (msg) => {
  console.log(msg);
});

process.stdin.on("data", (data: Buffer) => {
  let cmd = data.toString();

  if (cmd.includes("next")) {
    ws.emit("nextRoom");
  } else if (cmd.includes("rooms")) {
    ws.emit("rooms");
  } else if (cmd.includes("close")) {
    ws.close();
  } else {
    ws.emit("message", cmd);
  }
});
