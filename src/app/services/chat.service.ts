import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMessage } from '../interfaces/message.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<IMessage>;

  constructor(private afs: AngularFirestore) { }

  allMessages(): Observable<IMessage[]> {
    this.itemsCollection = this.afs.collection<IMessage>('chats', ref =>
      ref.orderBy('date', 'desc').limit(5)
    );
    return this.itemsCollection.valueChanges();
  }

  addMessage(message: string, user: any) {
    let newMessage: IMessage = {
      name: user.name,
      message: message,
      date: new Date().getTime(),
      uid: user.uid
    };
    return this.itemsCollection.add(newMessage);
  }

}
