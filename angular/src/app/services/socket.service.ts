import { Injectable } from '@angular/core';
import io, { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private ws!: Socket;

  constructor() {}

  connect() {
    this.ws = io('ws://localhost:3000');
  }

  sendMessage(eventName: string, data: any): void {
    this.ws.emit(eventName, data);
  }

  on(eventName: string, callback: (data: any) => void) {
    this.ws.on(eventName, callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.disconnect();
    }
  }
}
