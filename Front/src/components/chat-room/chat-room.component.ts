import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'router-outlet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatbox', { static: false }) chatbox!: ElementRef<HTMLDivElement>; // Referência ao chatbox no DOM
  @ViewChild('emojiBox', { static: false }) emojiBox!: ElementRef<HTMLDivElement>; // Referência ao emojiBox no DOM

  userName: string | null = null;
  userColor: string | null = null;
  newMessage: string = '';
  isConnected: boolean = false;
  colors: string[] = [
    'red', 'blue', 'purple', 'green', 'orange', 'brown',
    'cyan', 'grey21', 'MediumBlue', 'Teal', 'DarkOliveGreen',
    'DarkMagenta', 'DeepPink', 'Crimson'
  ];
  emojis: string[] = ['😀', '😂', '❤️', '👍', '🔥', '🎉']; // Exemplos de emojis
  emojiBoxVisible: boolean = false;

  constructor(private webSocket: SocketService) {}

  ngOnInit(): void {
    this.webSocket.connect();

    // Escuta mensagens do servidor
    this.webSocket.on('connection', (data: string) => {
      this.addMessageToChatbox(data, this.userColor || 'black');
    });
  }

  connect(): void {
    if (!this.isConnected) {
      this.userName = `user${Math.floor(1000 + Math.random() * 9000)}`;
      this.userColor = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.isConnected = true;
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      const message = `${this.userName}: ${this.newMessage}`;
      this.addMessageToChatbox(message, this.userColor || 'black');
      this.webSocket.sendMessage('message', message); // Envia para o servidor
      this.newMessage = ''; // Limpa o campo
    }
  }

  toggleEmojiBox(): void {
    this.emojiBoxVisible = !this.emojiBoxVisible;
  }

  addEmoji(emoji: string): void {
    this.newMessage += emoji;
    this.toggleEmojiBox(); // Opcional: fecha o emojiBox após selecionar
  }

  private addMessageToChatbox(message: string, color: string): void {
    const chatbox = this.chatbox.nativeElement;
    const newMessageElement = document.createElement('p');
    newMessageElement.innerText = message;
    newMessageElement.style.color = color;
    chatbox.appendChild(newMessageElement);
  }
}

