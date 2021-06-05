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

  getChatOng(): void {

    axios.get('http://localhost:3000/api/messages/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
        const messages = resp.data.map(message => ({
          id: doacao.id,
          title: doacao.computer.title,
          collectionDate: this.parseDate(doacao.collectionDate),
          description: doacao.computer.description,
          address: doacao.address,
          status: this.parseStatus(doacao.status),
          firstName: doacao.giver.firstName

        }))
        this.doacoes = doacoes;
        this.listaDoacoesAtualizada.next({
          doacoes: [...this.doacoes]

        });
      })

  }


}
