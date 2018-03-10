import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { IMessage } from '../../interfaces/message.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  messages: IMessage[];
  message: string;
  user: any = {};

  constructor(private chatService: ChatService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.chatService.allMessages().subscribe((messages: IMessage[]) => {
      this.messages = messages.reverse();
    });
    this.afAuth.authState.subscribe(user => {
      this.user.name = user.displayName;
      this.user.uid = user.uid;
    });
  }

  sendMessage(): void {
    if (this.message.trim().length === 0) {
      return;
    }
    this.chatService.addMessage(this.message, this.user);
    this.message = '';
  }

  logout(): void {
    this.afAuth.auth.signOut();
    location.reload();
  }

}
