import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatOng, ListaMensagens } from '../chat-ong/chat-ong.model';
import { ChatOngService } from '../chat-ong/chat-ong.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import axios from 'axios'

@Component({
  selector: 'app-chat-ong',
  templateUrl: './chat-ong.component.html',
  styleUrls: ['./chat-ong.component.css']
})
export class ChatOngComponent implements OnInit {
  private modo: string = "enviar";
  form: FormGroup;
  private message: ChatOng;
  private mensagensSubscription: Subscription;
  mensagens: ListaMensagens[] = [];
  user;

  constructor(public chatOngService: ChatOngService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.chatOngService.getMensagens();
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      })
    });
    this.mensagensSubscription = this.chatOngService
    .getListaMessagensAtualizadaObservable()
    .subscribe((dados: {mensagens: []}) => {
     this.mensagens = dados.mensagens;
      
    });
    this.getMe()
  }

  backToControlDonations() {
    this.router.navigate(['controle-doacao']);
  }

  getMe(): void {
    const self = this;
    axios.get('http://localhost:3000/api/users/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
         self.user = resp.data.id;
         console.log(this.user)
      })
  }

}
