import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  constructor(private api: ApiService) {}
  messageText: string = '';
  messages: any[] = [];
  user!: User;
  @Input() roomId!: string;
  private webSocket!: WebSocket;
  private readonly serverUrl = `ws://localhost:3000/chatroom`; // Replace with your server URL

  ngOnInit() {
    this.api.getMe().subscribe((next) => {
      this.user = next;
    });
    const websocketUrl = `${this.serverUrl}/${this.roomId}`;
    this.webSocket = new WebSocket(websocketUrl);

    // WebSocket event listeners
    this.webSocket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.webSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(this.messages);
      console.log('Received message:', message);
      for (const item of message) {
        this.messages.push(item);
      }
      this.messageText = '';
    };

    this.webSocket.onclose = () => {
      console.log('WebSocket connection closed');
      // Perform any necessary clean-up or reconnection logic
    };

    this.webSocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      // Handle any errors that occur during the WebSocket connection
    };
  }

  ngOnDestroy() {
    if (this.webSocket) {
      this.webSocket.close();
    }
  }

  sendMessage() {
    if (this.messageText === '') {
      return;
    }
    if (this.webSocket.readyState === WebSocket.OPEN) {
      this.webSocket.send(
        JSON.stringify({
          senderName: this.user.username,
          message: this.messageText,
        }),
      );
    }
  }
}
