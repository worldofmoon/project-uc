import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Cliente } from './cliente.model';
import { ClienteService } from './cliente.service';
import { mainModule } from 'process';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})

export class CadastroClientesComponent implements OnInit {
  private modo: string = "criar";
  public cliente: Cliente;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup ({
      firstName: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      lastName: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      email: new FormControl (null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl (null, {
        validators: [Validators.required, Validators.minLength(8)]
      }),
      senhaConfirm: new FormControl (null, {
        validators: [Validators.required, this.validarSenhas]
      })
    });
  }



  constructor(public clienteService: ClienteService, public route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {}

  onSalvarCliente() {
    console.log(this.form.getRawValue());
    if (this.form.invalid) {
      return;
    }
    if (this.modo === "criar") {
      this.clienteService.adicionarCliente(
        this.form.value.firstName,
        this.form.value.lastName,
        this.form.value.email,
        this.form.value.password
      );
    }
    this.form.reset();
    this.router.navigate(['cadastro-concluido']);
  }

  validarSenhas = (senhaConfirm: FormControl): ValidatorFn => {
    console.log(senhaConfirm.value); // imprimindo o valor da confirmação de senha
    if (this.form) {
      console.log(this.form.value.senha); // imprimindo o vlaor da senha
    }
    return null;
  }



<<<<<<< HEAD


=======
}
>>>>>>> b8aac5153af248f143c45b9ca014a85982c2fac5
