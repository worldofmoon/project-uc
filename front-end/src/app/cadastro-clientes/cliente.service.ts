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

//para conexão com back:
// substituir este codigo pelo comentado

 /* getClientes(): Cliente[] {
    return [...this.clientes];
  }*/
  constructor(private httpClient: HttpClient, private router: Router) {}

  getClientes(): void {
    this.httpClient.get < { mensagem: string; clientes: Cliente[] }>('http://localhost:3000/users')
      .pipe(map((dados) => {
        return dados.clientes.map(cliente => {
          // _id é como vem do mongoDB
          return { id: cliente.id, nome: cliente.nome, endereco: cliente.endereco, fone: cliente.fone, nasc: cliente.nasc, email:cliente.email, senha: cliente.senha }
        })
      }))
      .subscribe(
        (clientes) => {
          this.clientes = clientes;
          this.listaClientesAtualizada.next([...this.clientes]);
      }
      )
  }

  adicionarCliente(nome: string, endereco: string, fone: string, nasc: string,  email: string,  senha: string) {
    /*const cliente: Cliente = {
      nome: nome,
      nasc: nasc,
      email: email,
      fone: fone,
      endereco: endereco,
      senha: senha,
    };*/
    const dadosCliente = new FormData();
    dadosCliente.append('nome', nome);
    dadosCliente.append('endereco', endereco);
    dadosCliente.append('fone', fone);
    dadosCliente.append('nasc', nasc);
    dadosCliente.append('email', email);
    dadosCliente.append('senha', senha);

    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/users', dadosCliente).subscribe((dados) => {
      const cliente: Cliente = {
        id: dados.id,
        nome: nome,
        endereco: endereco,
        fone: fone,
        nasc: nasc,
        email: email,
        senha: senha
      };
      this.clientes.push(cliente);
      this.listaClientesAtualizada.next([...this.clientes]);
      this.router.navigate(['cadasto-concluido']);
    });
  } 

  getListaDeClientesAtualizadaObservable() {
    return this.listaClientesAtualizada.asObservable();
  }

  getCliente (idCliente: string) {
    return this.httpClient.get<{_id: string, nome: string, endereco: string, fone: string, nasc: Date,  email: string,  senha: number}>(`http://localhost:3000/users/${idCliente}`);
  }
}



