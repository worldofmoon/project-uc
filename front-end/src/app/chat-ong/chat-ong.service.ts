import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatOng, ListaMensagens } from '../chat-ong/chat-ong.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ChatOngService {

  chatOng: ChatOng[] = [];
  private mensagens: ListaMensagens[] = [];
  private listaMensagensAtualizada = new Subject<{ mensagens: ListaMensagens[] }>();

  getListaChatOngAtualizadaObservable() {
    return this.listaMensagensAtualizada.asObservable();
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  
  parseDate(inDate) {
    const date = new Date(inDate);
    const options = {
      year: '2-digit',
      month: 'long',
      day: '2-digit'
  };
    return date.toLocaleString('pt-BR', options);
  }

  parseHour(inDate) {
    const date = new Date(inDate);
    const options = {
      hour: '2-digit',
      minute: '2-digit'
  };
    return date.toLocaleString('pt-BR', options);
  }

  sendMessage(to: number, content: string) {
    const message = {
      to: to,
      content: content
    };

    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/messages/', message, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).subscribe((dados) => {
      const message: ChatOng = {
        to: to,
        content: content
      };
    });
  }

  getMensagens(): void {

    axios.get('http://localhost:3000/api/messages/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
        const mensagens = resp.data[0].messages.map(mensagem => ({
          content: mensagem.content,
          createdAt: this.parseDate(mensagem.createdAt),
          createdHour: this.parseHour(mensagem.createdAt),
          fromUserName: mensagem.fromUser.firstName,
          fromUserId: mensagem.fromUser.id,
          toUserName: mensagem.toUser.firstName,
          toUserId: mensagem.toUser.id,
          
        }))
        this.mensagens = mensagens.reverse();
        this.listaMensagensAtualizada.next({
          mensagens: [...this.mensagens]

        });
        console.log(mensagens);
        
      })
  }

  getListaMessagensAtualizadaObservable() {
    return this.listaMensagensAtualizada.asObservable();
  }
   
  
}
