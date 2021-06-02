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


  constructor(private httpClient: HttpClient, private router: Router) { }

  getDoacoes(): void {
    this.httpClient.get<{ mensagem: string; doacoes: Doacao[] }>('http://localhost:3000/api/donations/', { headers: { Authorization: 'Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIyNTg3MzY2fQ.2_Syoe8avcvVgQ55kKxvPyW_pu-6sJsaxthsvdVhK8ElOpVa2cpfAfpCukOJyCaawFTLsG656mbPfpdayQvNgA' } })
      .pipe(map((dados) => {
        return dados.doacoes.map(doacao => {
          return {
            id: doacao.id,
            createdAt: doacao.createdAt,
            collectionDate: doacao.collectionDate,
            computer: {
              title: doacao.computer.title,
              description: doacao.computer.description
            }
          }
        })
      }))
      .subscribe((doacoes) => {
        this.doacoes = doacoes;
        this.listaDoacoesAtualizada.next([...this.doacoes]);
        console.log(doacoes)
      }
      )
  }

  // adicionarDoacao(title: string, description: string, collectionDate: string) {
  //   /*const doacao: Doacao = {
  //     item: item,
  //     descricao: descricao,
  //     dataDoacao: dataDoacao,
  //   };*/
  //   const dadosDoacao = new FormData();
  //   dadosDoacao.append('title', title);
  //   dadosDoacao.append('collectionDate',collectionDate);
  //   dadosDoacao.append('descricao',description);
  //   this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/donations/', dadosDoacao).subscribe((dados) => {
  //       //console.log(dados.mensagem);
  //       const doacao: Doacao = {
  //         id: dados.id,
  //         title: dados.computer.title,
  //         description: description,
  //         collectionDate: collectionDate
  //       };
  //       this.doacoes.push(doacao);
  //       this.listaDoacoesAtualizada.next([...this.doacoes]);
  //       this.router.navigate(['/']);
  //     });
  // } 

  removerDoacao(id: string): void {
    this.httpClient.delete(`http://localhost:3000/api/donations/${id}`).subscribe(() => {
      this.doacoes = this.doacoes.filter((cli) => {
        return cli.id !== id
      });
      this.listaDoacoesAtualizada.next([...this.doacoes]);
    });
  }

  getListaDoacoesAtualizadaObservable() {
    return this.listaDoacoesAtualizada.asObservable();
  }

  getDoacao(idDoacao: string) {
    //return {...this.doacoes.find((cli) => cli.id === idDoacao)};
    return this.httpClient.get<{ _id: string, item: string, description: string, dataDoacao: string }>(`http://localhost:3000/api/donations/${idDoacao}`);
  }

  // atualizarDoacao (id: string, title: string, description: string, collectionDate: string) {
  //   const doacao: Doacao = { id, title, description, collectionDate};
  //   console.log(doacao);
  //   this.httpClient.put(`http://localhost:3000/api/donations/${id}`, doacao)
  //   .subscribe((res => {
  //     const copia = [...this.doacoes];
  //     const indice = copia.findIndex(cli => cli.id === doacao.id);
  //     copia[indice] = doacao;
  //     this.doacoes = copia;
  //     console.log(this.doacoes);
  //     this.listaDoacoesAtualizada.next([...this.doacoes]);
  //     this.router.navigate(['/']);
  //   }));
  // }
}
