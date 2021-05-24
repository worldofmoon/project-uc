import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
//import { debounceTime } from 'rxjs/operators';
//import { MatDialog } from '@angular/material';
import { DoacaoService } from '../doacao.service';

@Component({
  selector: 'app-cadastro-doacao',
  templateUrl: './cadastro-doacao.component.html',
  styleUrls: ['./cadastro-doacao.component.css']
})

export class CadastroDoacaoComponent implements OnInit {
  constructor(public doacaoService: DoacaoService, private router: Router) {}
  isDisplayed = true;
  name = "Maria";

  onAdicionarDoacao(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.doacaoService.adicionarDoacao(
      form.value.item,
      form.value.descricao,
      form.value.dataDoacao,
      
    );
    form.resetForm();

  }

  showMe() {
    if(this.isDisplayed) {
        this.isDisplayed = false;
    } else {
        this.isDisplayed = true;
    }
  }

  gotoChat() {
    this.router.navigate(['chat-doador']);
  }

  ngOnInit() {}
} 