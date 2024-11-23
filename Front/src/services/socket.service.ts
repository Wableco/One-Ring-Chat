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
  /** envia uma mensagem para o servidor
   * @param eventName nome do evento que deseja enviar
   * @param data objeto que deseja enviar
   */
  sendMessage(eventName: string, data: any): void {
    this.ws.emit(eventName, data);
  }

  /** Abre um "listener" / como se fosse um ouvinto
   * @param eventName o Evento que precisa ouvir que será vindo do servidor
   * @function callback seria uma Arrow function ()=>{} que será executada. (ex: transformar dados de acordo com o que foi recebido)
   */
  on(eventName: string, callback: (data: any) => void) {
    this.ws.on(eventName, callback);
  }

  disconnect() {
    if (this.ws) {
      this.ws.disconnect();
    }
  }
}
