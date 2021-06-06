import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalNotCadastroComponent } from '../modal-not-cadastro/modal-not-cadastro.component';
import { MatDialog } from '@angular/material';
import { CadastroService } from './shared/cadastro.services';
import { stringify } from '@angular/core/src/util';
import axios from 'axios'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin;
  theEvent;
  key;
  regex;
  keys;
  getCadastro;
  logado;
  message;
  admin = undefined;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private cadastroService: CadastroService
  ) { }

  ngOnInit() {
    this.formLogin = this.fb.group({
      email: '',
      password: ''
    });
    this.logado = localStorage.getItem('cadastro');
    this.getMe()
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('cadastro');
    this.ngOnInit();
    this.router.navigate(['home']);
  }
  async login() {
    const user = {
      email: this.formLogin.get('email').value,
      password: this.formLogin.get('password').value
    }
    const result = await this.cadastroService.login(user);
    
    if (result) {
      this.ngOnInit();

      console.log(this.admin)
      if (this.admin == false) {
        this.router.navigate(['cadastro-doacao']);
      } else {
        this.router.navigate(['controle-doacao']);
      }
    } else {
      this.openDialog();
    }
    this.admin = undefined;
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalNotCadastroComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getMe(): void {
    axios.get('http://localhost:3000/api/users/me', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(resp => {
         this.admin = resp.data.isAdmin;
      })
  }
}
