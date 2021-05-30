import { Injectable } from '@angular/core';
import { Doacao } from './doacao.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DoacaoService {
  private doacoes: Doacao[] = [];
  private listaDoacoesAtualizada = new Subject<Doacao[]>();
/*
  getDoacoes(): Doacao[] {
    return [...this.doacoes];
  }

  adicionarDoacao(item: string, descricao: string, dataDoacao: Date) {
    const doacao: Doacao = {
      item: item,
      descricao: descricao,
      dataDoacao: dataDoacao,
    };
    this.doacoes.push(doacao);
    this.listaDoacoesAtualizada.next([...this.doacoes]);
  }
*/
  getListaDeDoacoesAtualizadaObservable() {
    return this.listaDoacoesAtualizada.asObservable();
  }


  constructor(private httpClient: HttpClient, private router:Router) {}

  getDoacoes(): void {
    this.httpClient.get < { mensagem: string; doacoes: Doacao[] } >('http://demo2735368.mockable.io/donations')
     .pipe(map((dados) => {
       return dados.doacoes.map(doacao => {
         // _id é como vem o id do mongoDB
         return { id: doacao.id, item: doacao.item, descricao: doacao.descricao, dataDoacao: doacao.dataDoacao}
       })
     })) 
     .subscribe((doacoes) => {
        this.doacoes = doacoes;
        this.listaDoacoesAtualizada.next([...this.doacoes]);
      }
    )
  }

  adicionarDoacao(item: string, descricao: string, dataDoacao: string) {
    /*const doacao: Doacao = {
      item: item,
      descricao: descricao,
      dataDoacao: dataDoacao,
    };*/
    const dadosDoacao = new FormData();
    dadosDoacao.append('item', item);
    dadosDoacao.append('dataDoacao',dataDoacao);
    dadosDoacao.append('descricao',descricao);
    this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/donations', dadosDoacao).subscribe((dados) => {
        //console.log(dados.mensagem);
        const doacao: Doacao = {
          id: dados.id,
          item: item,
          dataDoacao: dataDoacao,
          descricao: descricao
        };
        this.doacoes.push(doacao);
        this.listaDoacoesAtualizada.next([...this.doacoes]);
        this.router.navigate(['/']);
      });
  } 
  
  removerDoacao (id: string): void {
    this.httpClient.delete(`http://localhost:3000/donations/${id}`).subscribe(() => {
      this.doacoes = this.doacoes.filter((cli) => {
      return cli.id !== id
      });
      this.listaDoacoesAtualizada.next([...this.doacoes]);
      });
    }
  
    getListaDoacoesAtualizadaObservable() {
    return this.listaDoacoesAtualizada.asObservable();
  }

  getDoacao (idDoacao: string) {
    //return {...this.doacoes.find((cli) => cli.id === idDoacao)};
    return this.httpClient.get<{_id: string, item: string, descricao: string, dataDoacao: string}>(`http://localhost:3000/donations/${idDoacao}`);
  }

  atualizarDoacao (id: string, item: string, descricao: string, dataDoacao: string) {
    const doacao: Doacao = { id, item, descricao, dataDoacao};
    console.log(doacao);
    this.httpClient.put(`http://localhost:3000/donations/${id}`, doacao)
    .subscribe((res => {
      const copia = [...this.doacoes];
      const indice = copia.findIndex(cli => cli.id === doacao.id);
      copia[indice] = doacao;
      this.doacoes = copia;
      console.log(this.doacoes);
      this.listaDoacoesAtualizada.next([...this.doacoes]);
      this.router.navigate(['/']);
    }));
  }
}
