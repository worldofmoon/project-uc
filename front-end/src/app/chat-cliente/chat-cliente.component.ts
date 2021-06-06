import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatCliente, ListaMensagens } from './chat-cliente.model';
import { ChatClienteService } from './chat-cliente.service'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-chat-cliente',
  templateUrl: './chat-cliente.component.html',
  styleUrls: ['./chat-cliente.component.css']
})
export class ChatClienteComponent implements OnInit {
  private modo: string = "enviar";
  form: FormGroup;
  private message: ChatCliente;
  private mensagensSubscription: Subscription;
  mensagens: ListaMensagens[] = [];
  user;

  constructor(public chatClienteService: ChatClienteService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.chatClienteService.getMensagens();
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(8)]
      })
    });
    // this.mensagensSubscription = this.chatClienteService
    // .getListaDeMessagensAtualizadaObservable()
    // .subscribe((dados: {mensagens: []}) => {
    //  this.mensagens = dados.mensagens;
      
    // });
    this.getMe()

  }

  onEnviarMensagem() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "enviar") {
      this.chatClienteService.sendMessage(
        this.form.value.content
      );
    }
    this.form.reset();
  }

  backToDonations() {
    this.router.navigate(['cadastro-doacao']);
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


