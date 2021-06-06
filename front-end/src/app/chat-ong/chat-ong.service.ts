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
  private usuarios: ListaMensagens[] = [];
  private listaMensagensAtualizada = new Subject<{ usuarios: ListaMensagens[] }>();

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

  sendMessage(userSelecionado: number, content: string) {
    const message = {
      to: userSelecionado,
      content: content
    };

    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/messages/', message, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).subscribe((dados) => {
      const message: ChatOng = {
        to: userSelecionado,
        content: content
      };
    });
  }

  getMensagens(): void {

    axios.get('http://localhost:3000/api/messages/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
        const usuarios = resp.data.map(usuario => ({
          user: usuario.user.firstName,
          userId: usuario.user.id,
          mensagens: usuario.messages.map(conteudo => ({
            content: conteudo.content,
            createdAt: this.parseDate(conteudo.createdAt),
            createdHour: this.parseHour(conteudo.createdAt),
            fromUserName: conteudo.fromUser.firstName,
            fromUserId: conteudo.fromUser.id,
            toUserName: conteudo.toUser.firstName,
            toUserId: conteudo.toUser.id,

          }))

        }))
        this.usuarios = usuarios.reverse();
        this.listaMensagensAtualizada.next({
          usuarios: [...this.usuarios]

        });
      })
  }

  getListaMessagensAtualizadaObservable() {
    return this.listaMensagensAtualizada.asObservable();
  }

}
