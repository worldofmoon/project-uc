import { Injectable } from '@angular/core';
import { Cliente } from './cliente.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private clientes: Cliente[] = [];
  private listaClientesAtualizada = new Subject<Cliente[]>();

  constructor(private httpClient: HttpClient, private router: Router) {}


  adicionarCliente(nome: string, sobrenome: string, email: string,  senha: string) {
    const dadosCliente = new FormData();
    dadosCliente.append('nome', nome);
    dadosCliente.append('sobrenome', sobrenome);
    dadosCliente.append('email', email);
    dadosCliente.append('senha', senha);

    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/users', dadosCliente).subscribe((dados) => {
      const cliente: Cliente = {
        id: dados.id,
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
      };
      this.clientes.push(cliente);
      this.listaClientesAtualizada.next([...this.clientes]);
      this.router.navigate(['cadasto-concluido']);
    });
  } 
}