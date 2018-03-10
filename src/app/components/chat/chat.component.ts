import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  messages: IMessage[];
  message: string;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.allMessages().subscribe((messages: IMessage[]) => {
      this.messages = messages.reverse();
    });
  }

  sendMessage(): void {
    if (this.message.trim().length === 0) {
      return;
    }
    this.chatService.addMessage(this.message);
    this.message = '';
  }

}
