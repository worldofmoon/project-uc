import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatOng } from '../chat-ong/chat-ong.model';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ChatOngService {
  private chatOng: ChatOng[] = [];
  private listaChatOngAtualizada = new Subject<{ chatOng: ChatOng[] }>();

  getListaChatOngAtualizadaObservable() {
    return this.listaChatOngAtualizada.asObservable();
  }


  constructor() { }

   
   
  
}
