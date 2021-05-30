import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup, NgForm, Validators } from '@angular/forms';
import { Doacao } from '../doacao.model';
import { DoacaoService } from '../doacao.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
//import { debounceTime } from 'rxjs/operators';
//import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-cadastro-doacao',
  templateUrl: './cadastro-doacao.component.html',
  styleUrls: ['./cadastro-doacao.component.css']
})

export class CadastroDoacaoComponent implements OnInit {
  private modo: string = "criar";
  private idDoaco: string;
  private doacao: Doacao;
  form: FormGroup;
  isDisplayed = true;
  name = "Maria";
  
  showMe() {
    if(this.isDisplayed) {
        this.isDisplayed = false;
    } else {
        this.isDisplayed = true;
    }
  }

  ngOnInit() {
    this.form = new FormGroup({
      item: new FormControl (null, {
      validators: [Validators.required, Validators.minLength(3)]
      }),
      dataDoacao: new FormControl (null, {
      validators: [Validators.required]
      }),
      descricao: new FormControl (null, {
      validators: [Validators.required]
    })
  })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has("idDoacao")) {
        this.modo = "editar";
        this.idDoaco = paramMap.get("idDoacao");
        this.doacaoService.getDoacao(this.idDoaco).subscribe( dadosCli => {
          this.doacao = {
            // _id = id do mongoDB
            id: dadosCli._id,
            item: dadosCli.item,
            dataDoacao: dadosCli.dataDoacao,
            descricao: dadosCli.descricao
          };
          this.form.setValue({
            item: this.doacao.item,
            dataDoacao: this.doacao.dataDoacao,
            descricao: this.doacao.descricao
          })
        });
      }
      else{
        this.modo = "criar";
        this.idDoaco = null;
      }
    });
  }

  constructor(public doacaoService: DoacaoService, public route: ActivatedRoute, private router:Router) {}

  onAdicionarDoacao() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.doacaoService.adicionarDoacao(
        this.form.value.item,
        this.form.value.descricao,
        this.form.value.dataDoacao
      );
    }
    else {
      this.doacaoService.atualizarDoacao(
        this.idDoaco,
        this.form.value.item,
        this.form.value.descricao,
        this.form.value.dataDoacao
      )
    }    
    this.form.reset();
  }


  gotoChat() {
    this.router.navigate(['chat-doador']);
  }

} 