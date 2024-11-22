import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'router-outlet',
  standalone: true,
  imports: [],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css'
})
export class ChatRoomComponent {

  constructor(private webSocket: SocketService){}

  ngOnInit(){
    this.webSocket.connect()

    this.webSocket.on("connection",(data)=>console.log(data))
  }
}
