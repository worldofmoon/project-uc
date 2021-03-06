import { Injectable } from '@angular/core';
import { Doacao, editarDoacao } from './controle-doacao.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import axios from 'axios'


@Injectable({ providedIn: 'root' })

export class ControleDoacaoService {

    private doacoes: Doacao[] = [];
    private listaDoacoesAtualizada = new Subject<{ doacoes: Doacao[] }>();

    getListaDeDoacoesAtualizadaObservable() {
        return this.listaDoacoesAtualizada.asObservable();
    }

    constructor(private httpClient: HttpClient, private router: Router) { }

    parseStatus(intStatus: number): string {
        if (intStatus === 0) return 'Aguardando aprovação da ong';
        if (intStatus === 1) return 'Aguardando retirada';
        if (intStatus === 2) return 'Em manutenção';
        if (intStatus === 3) return 'Equipamento doado';
    }

    parseDate(inDate) {
        if (inDate) {
            const date = new Date(inDate);
            return date.toLocaleString();
        } else {
            return 'Aguardando';
        }

    }

    getControleDoacoes(): void {

        axios.get('http://localhost:3000/api/donations/', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
            .then(resp => {
                const doacoes = resp.data.map(doacao => ({
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
                console.log(doacoes)
            })

    }

    editarDoacao(status: number) {
        const dadosDoacao = {
          status: status
        };
    
        this.httpClient.post<{ mensagem: string, id: string }>('http://localhost:3000/api/donations', dadosDoacao, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).subscribe((dados) => {
          const doacao: editarDoacao = {
            status: status
          };
        });
      }

    getListaDoacoesAtualizadaObservable() {
        return this.listaDoacoesAtualizada.asObservable();
    }

}


