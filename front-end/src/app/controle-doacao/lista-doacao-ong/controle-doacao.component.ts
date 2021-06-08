import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Doacao, editarDoacao } from '../controle-doacao.model';
import { ControleDoacaoService } from '../controle-doacao.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-controle-doacao',
  templateUrl: './controle-doacao.component.html',
  styleUrls: ['./controle-doacao.component.css']
})
export class ControleDoacaoComponent implements OnInit, OnDestroy {
  doacoes: Doacao[] = [];
  private doacoesSubscription: Subscription;
  user = "Doador";
  doacaoSelecionada = {}

  constructor(public controleDoacaoService: ControleDoacaoService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.controleDoacaoService.getControleDoacoes();
    this.doacoesSubscription = this.controleDoacaoService
      .getListaDeDoacoesAtualizadaObservable()
      .subscribe((dados: { doacoes: [] }) => {
        this.doacoes = dados.doacoes;
      });
    this.getNome()
  }

  ngOnDestroy(): void {
    this.doacoesSubscription.unsubscribe();
  }

  gotoOngChat() {
    this.router.navigate(['chat-ong']);
  }

  getNome(): void {
    const self = this;
    axios.get('http://localhost:3000/api/users/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
        self.user = resp.data.firstName
      })

  }

  editar(event) {
    const doacaoSelecionada = event.target.id
    const status = parseInt(this.doacaoSelecionada[doacaoSelecionada])
    axios.patch(`http://localhost:3000/api/donations/${doacaoSelecionada}/status`, {status}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    .then(resp => {
      console.log("foi")
    })
 }

 changeClient(status, doacaoid){
   this.doacaoSelecionada[doacaoid] = status
 }

}
