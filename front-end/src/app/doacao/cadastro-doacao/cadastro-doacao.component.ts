import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
//import { debounceTime } from 'rxjs/operators';
//import { MatDialog } from '@angular/material';
//import { Router } from '@angular/router';
import { DoacaoService } from '../doacao.service';

@Component({
  selector: 'app-cadastro-doacao',
  templateUrl: './cadastro-doacao.component.html',
  styleUrls: ['./cadastro-doacao.component.css']
})
export class CadastroDoacaoComponent {
  constructor(public doacaoService: DoacaoService) {}
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

}
export class ContentComponent implements OnInit {

  constructor(private router: Router) { }
  gotoChat() {
    this.router.navigate(['chat-doador']);
   }ter.navigate(['chat-ong']);
   }
}

