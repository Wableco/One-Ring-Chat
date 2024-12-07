import { io, Socket } from "socket.io-client";

const ws: Socket = io("ws://localhost:3000");

let user = "anonymous" 

//mensagen iniciar notificando a conexão feito com sucesso
ws.on("connection", (msg) => {
  console.log(msg);

  console.log("digite seu usuario com 'user=' + seu nome de usuario: ")

  //solicita a entrada em uma sala informando o username
});

// entra ou cria uma sala
ws.on("joinRoom", (msg) => {
  console.log(msg.message);
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

process.stdin.on("data", (data: Buffer) => {
  let cmd = data.toString();

  if (cmd.includes("next")) {
    ws.emit("nextRoom");
  } else if (cmd.includes("rooms")) {
    ws.emit("rooms");
  } else if(cmd.includes("cls")){
    console.clear()
  }
  else if(cmd.includes("user=")){
    user = cmd.slice("user=".length).split('\r')[0]
    console.log(user)
    ws.emit("joinRoom", {username: user})
  }
  else if (cmd.includes("close")) {
    ws.close();
  } else {
    ws.emit("message", cmd);
  }
});
