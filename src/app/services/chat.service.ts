import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import  { Observable} from "rxjs";
import {AuthService} from "./auth.service";
import * as firebase from 'firebase/app';

import {ChatMessage} from  '../models/chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  sendMessage(message) {
    console.log(message);
  }
  constructor() { }
}
