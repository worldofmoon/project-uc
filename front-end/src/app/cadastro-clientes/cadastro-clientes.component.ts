import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { mainModule } from 'process';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})

export class CadastroClientesComponent implements OnInit {
  private modo: string = "criar";
  private idCliente: string;
  public cliente: Cliente;
  form: FormGroup;
  
  ngOnInit() {
    this.form = new FormGroup ({
      nome: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      endereco: new FormControl (null, {
        validators: [Validators.required]
      }),
      fone: new FormControl (null, {
        validators: [Validators.required]
      }),
      nasc: new FormControl (null, {
        validators: [Validators.required]
      }),
      email: new FormControl (null, {
        validators: [Validators.required, Validators.email]
      }),
      senha: new FormControl (null, {
        validators: [Validators.required]
      })
    })
    /*this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.modo = "criar";
      this.idCliente = null;
    });*/
  }

  constructor(public clienteService: ClienteService, public route: ActivatedRoute, private router: Router) {}

  onSalvarCliente() {
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        this.form.value.nome,
        this.form.value.nasc,
        this.form.value.endereco,
        this.form.value.fone,
        this.form.value.email,
        this.form.value.senha
      );
    }
    this.form.reset();
    this.router.navigate(['cadastro-concluido']);
  }

}
  
  /*
  formCadastro;
  valoresForm: Object;
  conversao;
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    // this.formCadastro
    localStorage.clear();
    this.formCadastro = this.fb.group({
      nome: [''],
      cpf: [''],
      email: [''],
      telefone: [''],
      endereco: ['']
    });
    // console.log(this.valoresForm);
    // setTimeout(() => {
    //   this.formCadastro.patchValue({
    //     'nome': 'Nicolas Daniel Victor da Conceição',
    //     'cpf': '16938868719',
    //     'email': 'nnicolasdanielvictordaconceicao@lubeka.com.br',
    //     'telefone': '(94) 3565-6035',
    //     'endereco': 'Quadra Quatro',
    //     });
    // }, 2000);
    this.formCadastro.valueChanges.pipe(
      debounceTime(1000))
      .subscribe(res => {
        console.log(res);
        this.valoresForm = res;
      });
  }
  cadastro() {
    this.conversao = JSON.stringify(this.valoresForm);
    console.log(this.conversao);
    localStorage.setItem('cadastro', this.conversao);

    // verificar modal aqui
    this.verificaCadastro();
  }

  verificaCadastro() {
    setTimeout(() => {
      if (localStorage.getItem('cadastro')) {
        // TODO REDIRECIIONAR PARA PAGINA DE CADASTRO CONCLUIDO
        this.router.navigate(['cadastro-concluido']);
      } else {
        return false;
      }
    }, 200);
  }

}*/
